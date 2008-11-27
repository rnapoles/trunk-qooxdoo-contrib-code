/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Alexander Back (aback)
     * Jonathan Rass (jonathan_rass) 

************************************************************************ */

/**
 * Decorator for CommandManager instance to implement Undo/Redo functionality
 *
 * @type member
 * @param commandManager {htmlarea.command.Manager} commandManager instance to decorate
 */
qx.Class.define("htmlarea.command.UndoManager",
{
  extend : qx.core.Object,

  construct : function(commandManager, editorInstance)
  {
    this.base(arguments);

    this.__commandManager = commandManager;
    this.__editorInstance = editorInstance;

    /* Initialize */
    this.__undoStack = [];
    this.__redoStack = [];
    this.__commands  = null;
    this.__doc       = null;

    this.__populateCommandList();
    
    editorInstance.addEventListener("keypress", this._handleKeyPress, this);
    
    /* Bind listener to get into the right context */
    this.__handleMouseUp = qx.lang.Function.bind(this._handleMouseUp, this);
    
    if (qx.core.Variant.isSet("qx.client", "mshtml"))
    {
      /* Bind listener to get into the right context - only needed in IE */
      this.__handleMouseDown = qx.lang.Function.bind(this._handleMouseDown, this);
    }
  },
  

  members :
  {
    /* Flag if a redo operation is possible */
    __redoPossible : false,

    /* Flag if a undo operation is possible */
    __undoPossible : false,

    /* Flag for the undo-mechanism to monitor the content changes */
    __startTyping : false,
    
    /* Known action types */
   __knownActionTypes : { command : true, content : true, custom : true },
    
    /* Map with infos about custom registered handler */
    __registeredHandler : {},

    
    /* *******************************************************
     *
     *                 PUBLIC METHODS
     * 
     * *******************************************************/
    
    /**
     * Set the document instance on which the UndoManager should perform his actions.
     * 
     * @type member
     * @param doc {Document} document node to work on
     * @return {void}
     */
    setContentDocument : function(doc)
    {
      this.__doc = doc;
      this.__commandManager.setContentDocument(doc);
      
      /* Mouse up listener is used to look after internal changes like image resizing etc. */
      qx.html.EventRegistration.addEventListener(this.__doc, "mouseup", this.__handleMouseUp);
      
      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        /* Mouse down listener is used to look after internal changes like image resizing etc. */
        qx.html.EventRegistration.addEventListener(this.__doc, "mousedown", this.__handleMouseDown);
      }
    },


    /**
     * invalidates the current range.
     * 
     * @type member
     * @return {void}
     */
    invalidateCurrentRange : function ()
    {
      this.__commandManager.invalidateCurrentRange();
    },


    /**
     * stores the current range.
     * 
     * @type member
     * @return {void}
     */
    storeCurrentRange : function ()
    {
      this.__commandManager.storeCurrentRange();
    },


    /**
     * Inserts a paragraph when hitting the "enter" key.
     * Decorator method for commandManager instance.
     *
     * @type member
     * @return {Boolean} whether the key event should be stopped or not
     */
    insertParagraphOnLinebreak : function()
    {
      /* Use the internal collect method to add the command to the undo stack */
      this.__collectUndoInfo("inserthtml", "", this.__commandManager.getCommandObject("inserthtml"));
      
      return this.__commandManager.insertParagraphOnLinebreak();
    },
    
    
    /**
     * Executes the given command and collects (if necessary) undo information.
     *
     * @type member
     * @param command {String} Command to execute
     * @param value {String ? Integer ? null} Value of the command (if any)
     * @return {Boolean} Result of operation
     */
    execute : function(command, value)
    {
      var result;
      
      /* Normalize */
      command = command.toLowerCase();

      /*
       * Check for commands handled directly be this manager
       * otherwise pass it along to the command manager and collect
       * undo infos.
       */
      if (this.__commands[command])
      {
        /*
         * Pass all commands directly to the commandManager if
         * they marked as "passthrough". This way it is possible
         * to execute commands without adding them to the undoStack.
         */
        if (this.__commands[command].passthrough)
        {
          result = this.__commandManager.execute(command, value);
        }
        else
        {
          /* Call the responsible method */
          result = this[command].call(this);

          /* (re)set the focus in the editor */
          this.__commandManager.__focusAfterExecCommand();
          
          /* Check if undo/redo steps are possible */
          if (command == "undo" && this.__undoStack.length == 0)
          {
            this.__undoPossible = false;
            
            /* Fire an undo/redo state event */
            this.__updateUndoRedoState();
          }
          else if (command == "redo" && this.__redoStack.length == 0)
          {
            this.__redoPossible = false;
            
            /* Fire an undo/redo state event */
            this.__updateUndoRedoState();            
          }
        }
      }
      else
      {
        /* Collect undo info */
        this.__collectUndoInfo(command, value, this.__commandManager.getCommandObject(command));
        
        /* Execute the command */
        result = this.__commandManager.execute(command, value);
        
        /* Undo is now possible */
       this.__undoPossible = true;
      }
      
      return result;
    },
    
    
    /**
     * Public API method to add an undo step
     * 
     * @param undoRedoObject {Object} object which contains all the info to undo/redo
     * 							      the given step. This object has to define
     * 								  at least the "actionType" key to work properly.
     * 								  This object is passed to the handler methods 
     * 								  defined in the @see{registerHandler} method.
     * 					   
     * @return {void}
     */
    addUndoStep : function(undoRedoObject)
    {
      this.__addToUndoStack(undoRedoObject);
    },
        
    
    /**
     * Register a handler for a customized actionType. This handler methods 
     * (undo and redo) are called whenever the UndoManager encounters the 
     * given actionType to undo/redo the change.
     * 
     * @param actionType {String} actionType to react on with undo and redo methods 
     * @param undoHandler {function} undo method
     * @param redoHandler {function} redo method
     * @param context {Object} In this context the methods are called. When no 
     * 						   context is given the context is the UndoManager itself.
     * 
     * @return {void}
     * 
     */
    registerHandler : function(actionType, undoHandler, redoHandler, context)
    {
      this.__registeredHandler[actionType] = { undo    : undoHandler,
                                               redo    : redoHandler,
                                               context : context };
    },
    
    
    /* *******************************************************
     *
     *                  UNDO METHODS
     * 
     * *******************************************************/
    
    
    /**
     * Service method to check if an undo operation is currently possible
     *
     * @type member
     * @return {Boolean} Whether an undo is possible or not
     */
    isUndoPossible : function()
    {
      /* If no undo history entry is available but content was edited */
      return this.__undoPossible;
    },
    
    
    /**
     * Undo facade method. The different types of undo (command/custom/content)
     * are delegated to their specialized implementation.
     *
     * @type member
     * @return {Boolean}
     */
    undo : function()
    {
       var result;

       /* Check if any content changes occured */
       if (this.__startTyping)
       {
         var undoObject = this.__getUndoRedoObject();
         undoObject.actionType = "Content";
         this.__addToUndoStack(undoObject);
       }
       
       /*
        * Look after the change history
        * if any custom change was found undo it manually
        */
       
       if (this.__undoStack.length > 0)
       {
         var undoStep = this.__undoStack.pop();

         if (this.__knownActionTypes[undoStep.actionType.toLowerCase()]) 
         {
          /* Pass the undo-handling to the specialized methods ("__undo" + actionType) */
          result = this["__undo" + undoStep.actionType].call(this, undoStep);
         }
         /* Any there any handlers which are registered to this actionType? */
         else if(this.__registeredHandler[undoStep.actionType])
         {
            var handler = this.__registeredHandler[undoStep.actionType];
            result = handler.undo.call(handler.context ? context : this, undoStep);
            
            // add it automatically to the redoStack
            this.__addToRedoStack(undoStep);
         }
         else
         {
           this.error("actionType " + undoStep.actionType + " is not managed! Please provide a handler method!");
         }

         /* (re)set the flags */
         this.__startTyping  = false;

         /* A redo operation is now possible */
         this.__redoPossible = true;
         
         /* Fire an update event  */
         this.__updateUndoRedoState();
         
         return result;
       }
     },


     /**
      * Undo a custom command like setting a backgroumd image/color. These commands
      * are not supported by the browsers with an execCommand identifier. The command
      * has to be executed manually and therefore the undo mechanism.
      *
      * @type member
      * @param undoInfo {Object} Undo info object
      * @return {Boolean}
      */
    __undoCustom : function(undoInfo)
    {
      /* Fill the info for the (possible) redo */
      var redoAction = undoInfo;

      /* Add the (different) needed parameter for the redo */
      switch(undoInfo.command)
      {
        case "backgroundcolor":
          this.redoAction.parameter = [ qx.bom.element.Style.get(this.__doc.body, "backgroundColor") ];
        break;

        case "backgroundimage":
          this.redoAction.parameter = [ qx.bom.element.Style.get(this.__doc.body, "backgroundImage"),
                                        qx.bom.element.Style.get(this.__doc.body, "backgroundRepeat"),
                                        qx.bom.element.Style.get(this.__doc.body, "backgroundPosition") ];
        break;
      }

      this.__addToRedoStack(redoAction);
      
      /* Special handling for inserting hyperlinks */
      if (undoInfo.command == "inserthyperlink")
      {
        if (qx.core.Variant.isSet("qx.client", "gecko"))
        {
          /* Get the current linkId and locate the element */
          var linkId = "qx_link" + this.__commandManager.__hyperLinkId;
          var link = this.__doc.getElementById(linkId); 
          
          if (link)
          {
            /* Delete the element */
            link.parentNode.removeChild(link);
            
            return true;
          }
          else
          {
            return false;
          }
        }
      }
      else
      {
        /* Undo changes by applying the corresponding command */
        return this.__commandManager.execute(undoInfo.command, undoInfo.value);  
      }
    },


    /**
     * Undo a browser-supported command.
     *
     * @type member
     * @param undoInfo {Object} Undo info object
     * @return {Boolean}
     */
    __undoCommand : function(undoInfo)
    {
      /* Add undo step to the redoStack */
      this.__addToRedoStack(undoInfo);
      
      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        /* If the undo step is a linebreak -> perform two undo steps */
        if (undoInfo.command == "inserthtml" && undoInfo.value == htmlarea.HtmlArea.simpleLinebreak)
        {
          this.__doc.execCommand("Undo", false, null);
          
          if (this.__undoStack.length > 0)
          {
            var nextUndoStep = this.__undoStack.pop();
            this.__addToRedoStack(nextUndoStep);
          }
        }
      }
      
      /* Use the native undo command */
      return this.__doc.execCommand("Undo", false, null);
    },
    
    
    /**
     * Undo an internal change like resizing an image/add table cell
     * 
     * @type member
     * @param undoInfo {Object} Undo info object
     * @return {Boolean} Success of command
     */
    __undoInternal : function(undoInfo)
    {
      /* Add undo step to the redoStack */
      this.__addToRedoStack(undoInfo);
      
      return this.__doc.execCommand("Undo", false, null);
    },
    

    /**
     * Undo content manipulation.
     *
     * @type member
     * @param undoInfo {Object} Undo info object
     * @return {Boolean}
     */
    __undoContent : qx.core.Variant.select("qx.client", {
      "mshtml" : function(undoInfo)
      {
        /* Add undo step to the redoStack */
        this.__addToRedoStack(undoInfo);
        
        this.__doc.execCommand("Undo", false, null);
      },
      
      "default" : function(undoInfo)
      {
        /* Add undo step to the redoStack */
        this.__addToRedoStack(undoInfo);
        
        try
        {
          /*
           * IMPORTANT
           * It *could* happen that 2 content changes occuring right after another in the undo-stack.
           * Gecko is removing both of these 2 changes in *ONE* undo step. To keep the undo-stack in-sync
           * we have also to remove the previous stack entry.
           */
          if (this.__undoStack.length > 1 && this.__undoStack[this.__undoStack.length-1].actionType == "Content")
          {
            this.__undoStack.pop();
          }
          
          /* Use the native undo command */
          return this.__doc.execCommand("Undo", false, null);
        }
        catch(error)
        {
          /* It appears, that an execCommand was bound to an element which is not available when calling 'undo' */
          if (qx.core.Variant.isSet("qx.debug", "on"))
          {
            this.debug("execCommand failed! Details: " + error)
          }
        }
      }
    }),



    /* *******************************************************
     *
     *                  REDO METHODS
     * 
     * *******************************************************/

    /**
     * Service method to check if a redo operation is currently possible
     *
     * @type member
     * @return {Boolean} Whether redo is possible or not
     */
    isRedoPossible : function()
    {
      return this.__redoPossible;
    },
    
    
    /**
     * Redo facade method. The different types of redo (command/custom/content)
     * are delegated to their specialized implementation.
     *
     * @type member
     * @return {Boolean}
     */
     redo : function()
     {
       if (this.__redoPossible)
       {
         var result;

         /*
          * Look after the change history
          * if any custom change was found redo it manually
          */
         
         if (this.__redoStack.length > 0)
         {
           var redoStep = this.__redoStack.pop();
           
           if (this.__knownActionTypes[redoStep.actionType.toLowerCase()]) 
           {
            /* Pass the redo-handling to the specialized methods ("__redo" + actionType) */
            result = this["__redo" + redoStep.actionType].call(this, redoStep);
           }
           else if(this.__registeredHandler[redoStep.actionType])
           {
              var handler = this.__registeredHandler[redoStep.actionType];
              result = handler.redo.call(handler.context ? context : this, redoStep);
              
              // add it automatically to the undoStack
              this.__addToUndoStack(redoStep);
           }
           else
           {
             this.error("actionType " + redoStep.actionType + " is not managed! Please provide a handler method!");
           }

           /* (re)set the flags */
           this.__startTyping  = false;

           /* A redo operation is now possible */
           this.__undoPossible = true;

           /* Fire an update event  */
           this.__updateUndoRedoState();
         }

         return result;
      }
    },


    /**
     * Redo a custom command.
     *
     * @type member
     * @param redoInfo {Object} Redo info object
     * @return {Boolean}
     */
    __redoCustom : function(redoInfo)
    {
      /* Add redo step to the undoStack */
      this.__addToUndoStack(redoInfo);
      
      return this.__doc.execCommand("Redo", false, null);
    },
    
    
    /**
     * Redo a browser-supported command.
     *
     * @type member
     * @param redoInfo {Object} Redo info object
     * @return {Boolean}
     */
    __redoCommand : function(redoInfo)
    {
      /* Update the undo history */
      this.__addToUndoStack(redoInfo);
      
      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        /* If the redo step is a linebreak -> perform two redo steps */
        if (redoInfo.command == "inserthtml" && redoInfo.value == htmlarea.HtmlArea.simpleLinebreak)
        {
          this.__doc.execCommand("Redo", false, null);
          
          if (this.__redoStack.length > 0)
          {
            var nextRedoStep = this.__redoStack.pop();
            this.__addToUndoStack(nextRedoStep);
          }
        }
      }
      
      return this.__doc.execCommand("Redo", false, null);
    },
    
    
    /**
     * Redo an internal change like resizing an image/add table cell
     * 
     * @type member
     * @param redoInfo {Object} Undo info object
     * @return {Boolean} Success of command
     */
    __redoInternal : function(redoInfo)
    {
      /* Update the undo history */
      this.__addToUndoStack(redoInfo);
      
      return this.__doc.execCommand("Redo", false, null);
    },


    /**
     * Redo a content manipulation
     *
     * @type member
     * @param redoInfo {Object} Redo info object
     * @return {Boolean}
     */
    __redoContent : function(redoInfo)
    {
      /* Add the redo step to the undoStack */
      this.__addToUndoStack(redoInfo);
      
      return this.__doc.execCommand("Redo", false, null);
    },    
    
    
    /* *******************************************************
     *
     *             PRIVATE UTILITY METHODS
     * 
     * *******************************************************/

    /**
     * Populates the internal command list. This list determines
     * which commands are handled directly by the undo manager and
     * which commands are passed through (without added to the undo/redo
     * history).
     * 
     * @type member
     * @return {void}
     */
    __populateCommandList : function()
    {
      this.__commands = {
        undo         : { passthrough : false },
        redo         : { passthrough : false },
        
        stylewithcss : { passthrough : true },
        usecss       : { passthrough : true }
      };

      /*
       * Actions for which a special undo operation is needed because
       * the browser could not handle them automatically with the "undo"
       * execCommand. This is only needed for non-mshtml as IE uses his own
       * undo mechanism.
       */
      this.__commandManager.__commands["backgroundcolor"].customUndo = true;
      this.__commandManager.__commands["backgroundimage"].customUndo = true;      
      
      if (qx.core.Variant.isSet("qx.client", "gecko"))
      {
        this.__commandManager.__commands["inserthyperlink"].customUndo = true;
      }
    },
    

    /**
     * Collects the necessary info about the current action and adds this
     * info to the undo history.
     * 
     * @type member
     * @param command {String} command to execute
     * @param value {String ? Integer ? null} Value of the command (if any)
     * @param commandObject {Object} internal commandObject
     * @return {void}
     */
    __collectUndoInfo : function(command, value, commandObject)
    {
      var undoObject           = this.__getUndoRedoObject();
      undoObject.commandObject = commandObject;
      undoObject.command       = command;
      undoObject.value         = value;
      undoObject.actionType    = "Custom";

      if (commandObject.customUndo)
      {
        var parameters = [];
        switch(command)
        {
          case "backgroundcolor":
            parameters.push(qx.bom.element.Style.get(this.__doc.body, "backgroundColor"));
          break;

          case "backgroundimage":
            parameters.push(qx.bom.element.Style.get(this.__doc.body, "backgroundImage"),
                            qx.bom.element.Style.get(this.__doc.body, "backgroundRepeat"),
                            qx.bom.element.Style.get(this.__doc.body, "backgroundPosition"));
          break;
          
          case "inserthyperlink":
            /*
             * SPECIAL CASE
             * If the hyperlinks gets inserted on a selection treat it as a command step
             */
            if (this.__editorInstance.__getSelection() && 
                !this.__editorInstance.__getSelection().isCollapsed)
            {
              undoObject.actionType = "Command";
            }
          break;
        }

        undoObject.parameter  = parameters;
      }
      else
      {
        if (qx.core.Variant.isSet("qx.client", "gecko"))
        {
          /*
           * Ignore commands which normally act on ranges if the current range
           * is collapsed, e.g. Gecko DOES NOT mark setting a collapsed range to
           * bold as an extra action. 
           * However commands like inserting an ordered list or table which do not 
           * need to act on a range to work should be captured.
           *
           */
          if (this.__editorInstance.__getSelection() && 
              this.__editorInstance.__getSelection().isCollapsed)
          {
            switch(command)
            {
              // TODO: create a list of all commands which DO NOT need to act on a range to perform!
              case "insertorderedlist":
              case "insertunorderedlist":
              case "justifyright":
              case "inserthtml":
              case "insertimage":
                undoObject.actionType = "Command";
              break;
              
              default:
                return;
            }
          }
          else
          {
            undoObject.actionType = "Command";
          }
        }
        else
        {
          undoObject.actionType = "Command";
        }
      }

      /* Add the undoObject to the undoStack */
      this.__updateUndoStack(undoObject);
    },


    /**
      * Adds the occured changes to the undo history and
      * sets a flag for the redo action.
      *
      * @type member
      * @param changeInfo {Object ? String} Infos of the change.
      *                                     Either a map containing details or null for change through a command identifier
      * @return {void}
      */
     __updateUndoStack : function(changeInfo)
     {
       /*
        * If any editing of the content happened before
        * add the content change as undo history entry
        */
       if (this.__startTyping)
       {
         var undoObject = this.__getUndoRedoObject();
         
         /* Add it to the undoStack */
         undoObject.actionType = "Content";
         
         this.__addToUndoStack(undoObject);
         this.__startTyping = false;
       }

       /* Add the change to the undo history */
       this.__addToUndoStack(changeInfo);
       
       /* After a command (other than "undo") no redo is possible */
       this.__redoPossible = false;
       this.__redoStack    = [];
       
       /* Fire an update event  */
       this.__updateUndoRedoState();
     },


     /**
      * Helper method to get an undo object which is added to the undoStack
      *
      * @type member
      * @return {Object} undo object
      */
     __getUndoRedoObject : function()
     {
       return {
        actionType    : null,
        commandObject : null,
        command       : null,
        value         : null,
        parameter     : null,
        range         : null,
        marker        : null
      };
     },


     /**
      * Utility method to add an entry to the undoStack.
      * 
      * @type member
      * @param changeInfo {Object} Infos of the change
      *
      * @return {void}
      */
     __addToUndoStack : function(changeInfo)
     {
       if (qx.core.Variant.isSet("qx.debug", "on"))
       {
         this.debug("ADD TO UNDO STACK");
         this.debug(changeInfo.actionType + " " + changeInfo.command + " " + changeInfo.value);
       }
              
       this.__undoStack.push(changeInfo);
     },
     
     
     /**
      * Utility method to add an entry to the redoStack.
      * 
      * @type member
      * @param changeInfo {Object} Infos of the change
      *
      * @return {void}
      */
    __addToRedoStack : function(changeInfo)
    {
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        this.debug("ADD TO REDO STACK");
        this.debug(changeInfo.actionType + " " + changeInfo.command + " " + changeInfo.value);
      }
      
      this.__redoStack.push(changeInfo);
    },


     /**
     * Key press handler for the undo manager. Only acts on specific events which
     * are important to the undo manager.
     * 
     * @type member
     * @param e {qx.event.type.KeyEvent} key event instance
     * @return {void} 
     */
    _handleKeyPress : function(e)
    {
      var keyIdentifier   = e.getKeyIdentifier().toLowerCase();

      switch(keyIdentifier)
      {
        case "control":
        case "left":
        case "right":
        case "up":
        case "down":
        case "pageup":
        case "pagedown":
        case "home":
        case "end":
          /* Indicate end of typing */
          this.__startTyping  = false;
          
          /* Fire an update event  */
          this.__updateUndoRedoState();
        break;
        
        case "enter":
        case "space":
          this.__undoPossible = true;
          
          /* Fire an update event  */
          this.__updateUndoRedoState();
        break;

        default:

          /* Check if shortcut for undo/redo is used */
          if(! (e.isCtrlPressed() && (keyIdentifier == "z" || keyIdentifier == "y")) ) {
            /* Otherwise mark the redo as not possible anymore */
            this.__redoPossible = false;
            this.__redoStack    = [];
          }

          /* Indicate start of typing */
          if (!this.__startTyping)
          {
            /* Mark the beginning of typing */
            this.__startTyping = true;
            
            /* undo is now possible */
            this.__undoPossible = true;
            
            /* Fire an update event  */
            this.__updateUndoRedoState();
          }
       }
    },
    
    
    /** Holds the selected node for comparing between mouseUp and mouseDown events */ 
    __selectedNode : null,
    
    
    /**
     * Mouse down handler method.
     * Currently only implemented for IE.
     * Used to track internal changes like resizing an image or a table element.
     * 
     * @type member
     * @param e {DOM event} mouse event instance
     * @return {void}
     */
    _handleMouseDown : qx.core.Variant.select("qx.client", {
      "mshtml" : function(e)
      {
        var checkNode = e.srcElement;
        
        if (checkNode && checkNode.nodeName.toLowerCase() == "img" || checkNode.nodeName.toLowerCase() == "table" )
        {
          this.__selectedNode = { node : checkNode,
                                  content : checkNode.outerHTML 
                                };
        }
        else
        {
          this.__selectedNode = null;
        }      
      },
      
      "default" : function(e)
      {
        return true;
      }
    }),
    
    
    /**
     * Mouse up handler method.
     * Used to track internal changes like resizing an image or a table element.
     * 
     * @type member
     * @param e {DOM event} mouse event instance
     * @return {void}
     */
    _handleMouseUp : qx.core.Variant.select("qx.client",
    {
      "gecko" : function(e)
      {
        /* Get the current selected node (if available) */
        var sel = this.__editorInstance.__getSelection();

        // if no selection exists, we have no selected node
        if (!sel)
        {
          this.__selectedNode = null;
          return;
        }

        var anchorNode = sel.anchorNode;
        
        var checkNode = anchorNode.childNodes[sel.anchorOffset];
        /* We have direct access to the currently selected node (e.g. an image) */
        if (checkNode && checkNode.nodeName.toLowerCase() == "img")
        {
          /* 
           * Check for stored element
           * Store the element if is not available
           * otherwise compare the current image element with the stored one 
           */
          if (this.__selectedNode == null)
          {
            this.__selectedNode = checkNode.cloneNode(true);
          }
          else
          {
            if (this.__selectedNode.style.width != checkNode.style.width ||
                this.__selectedNode.style.height != checkNode.style.height)
            {
              /* A change occured -> add undo step and update the stored element */
              this.__addInternalUndoStep();
              this.__selectedNode = checkNode.cloneNode(true);
              return; 
            }
          }          
        }
        else if (anchorNode.nodeName.toLowerCase() == "td" || anchorNode.parentNode.nodeName.toLowerCase() == "td")
        {
          var tableNode = anchorNode.parentNode;
          /* Traverse up to the "table" element */
          while (tableNode.nodeName.toLowerCase() != "table")
          {
            tableNode = tableNode.parentNode;
          }
          
          /* 
           * Check for stored element
           * Store the element if is not available
           * otherwise compare the current table element with the stored one 
           */
          if (this.__selectedNode == null)
          {
            this.__selectedNode = tableNode.cloneNode(true);
          }
          else
          {
            /* 
             * Comparison is done inside a timeout method
             * to be sure that the changes (like adding a table cell) 
             * to the DOM are already done. 
             */
            qx.client.Timer.once(function()
            {
              /* Compare width and height and innerHTML */
              if (tableNode.style.width != this.__selectedNode.style.width ||
                  tableNode.style.height != this.__selectedNode.style.height ||
                  tableNode.innerHTML != this.__selectedNode.innerHTML)
              {
                /* A change occured -> add undo step and update the stored element */
                this.__addInternalUndoStep();
                this.__selectedNode = tableNode.cloneNode(true);
              }
            }, this, 0);
          }
        }
        else
        {
          /* Reset the stored element for every other case */
          this.__selectedNode = null;
        }
      },
      
      "default" : function(e)
      {
        var checkNode = e.srcElement;
        
        if (this.__selectedNode != null)
        {
          if (checkNode.nodeType == 1)
          {
            /* Check the clicked element otherwise check the childNodes */
            if (checkNode == this.__selectedNode.node)
            {
              if (checkNode.outerHTML != this.__selectedNode.content)
              {
                this.__selectedNode.content = checkNode.outerHTML;
                this.__addInternalUndoStep();
              }
            }
            else
            {   
              for (var i=0, j=checkNode.childNodes.length; i<j; i++)
              {
                if (checkNode.childNodes[i] == this.__selectedNode.node)
                {
                  if (checkNode.childNodes[i].outerHTML != this.__selectedNode.content)
                  {
                    this.__selectedNode.content = checkNode.childNodes[i].outerHTML;
                    this.__addInternalUndoStep();
                  }
                } 
              }
            }
          }
          else
          {
            this.__selectedNode = null;
          }
        }
      }
    }),
    
    
    /**
     * Adds an internal undo step to the undo stack.
     * 
     * @type member
     * @return {void} 
     */
    __addInternalUndoStep : function()
    {
      var undoStep = this.__getUndoRedoObject();
      undoStep.actionType = "Internal";
            
      this.__addToUndoStack(undoStep);
    },
    
    
    /**
     * Fires the "undoRedoState" event to inform external components (like a toolbar)
     * about the current state of the undo/redo.
     * The event itself is fired from the HtmlArea instance and with a timeout 
     * to not interfere with the current key event.
     * 
     * @type member
     * @return {void} 
     */
    __updateUndoRedoState : function() 
    {
      qx.client.Timer.once(function(e) {
        this.__editorInstance.dispatchEvent(new qx.event.type.DataEvent("undoRedoState", { undo : this.isUndoPossible() ? 0 : -1,
                                                                                           redo : this.isRedoPossible() ? 0 : -1 }));
      }, this, 200);
    }
  },


  /**
   * Destructor
   */
  destruct : function()
  {
    try
    {
      qx.html.EventRegistration.removeEventListener(this.__doc, "mouseup", this.__handleMouseUp);
      
      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        /* Mouse down listener is used to look after internal changes like image resizing etc. */
        qx.html.EventRegistration.removeEventListener(this.__doc, "mousedown", this.__handleMouseDown);
      }
    }
    catch(e) {}
    
    this._disposeFields("__commandManager", "__editorInstance", "__undoStack", "__redoStack", "__commands", "__doc", "__knownActionTypes", "__registeredHandler");
  }
});
