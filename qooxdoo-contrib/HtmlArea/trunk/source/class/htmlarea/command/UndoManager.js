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
 * Decorator for CommandManager instance
 *
 * @type member
 * @param commandManager {htmlarea.command.Manager} commandManager instance to decorate
 */
qx.Class.define("htmlarea.command.UndoManager",
{
  extend : qx.core.Target,

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
  },
  
  events : 
  {
    /** 
      * Holds information about the state of undo/redo
      * Keys are "undo" and "redo".
      * Possible values are 0 and -1 to stay in sync with
      * the kind the "cursorContext" event works.
      * (1 = active/pressed, 0 = possible/not pressed, -1 = disabled)
      */
    "undoRedoState" : "qx.event.type.DataEvent"
  },


  members :
  {
    /* Flag if a redo operation is possible */
    __redoPossible : false,

    /* Flag if a undo operation is possible */
    __undoPossible : false,

    /* Flag for the undo-mechanism to monitor the content changes */
    __startTyping : false,
    
    /* Internal id to mark elements for IE which are inserted via "insertHtml" command */
    __undoId : 0,

    
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
    },
    
    
    /**
     * Executes the given command and collects (if necessary) undo information.
     *
     * @type member
     * @param {String} Command to execute
     * @param {String ? Integer ? null} Value of the command (if any)
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

          /* Check if last undo removed all content from area: */
          if ( (command == "redo") && this.__editorInstance.containsOnlyPlaceholder() ){
            /* Clear body element to remove dummy element from area. */
            this.__doc.body.innerHTML = "";
          }

          /* Call the responsible method */
          result = this[command].call(this);

          /* (re)set the focus in the editor */
          this.__commandManager.__focusAfterExecCommand();
        }
      }
      else
      {
        /*
         * Manipulate the HTML string to insert to easily undo the command in IE
         */
        if (qx.core.Client.getInstance().isMshtml() && command == "inserthtml")
        {
          /* Backup an existing id and add the undo info to the id attribute */
          value = value.replace(/\s(id=['|"])/, 'old_$1');
          value = value.replace(/^(<[a-z]*)\s(.*)/, '$1 id="undo_' + this.__undoId + '" $2');
        }
        
        /* Collect undo info */
        this.__collectUndoInfo(command, value, this.__commandManager.getCommandObject(command));
        
        if (qx.core.Client.getInstance().isMshtml() && command == "inserthtml")
        {
          this.__undoId++;
        }

        /* Execute the command */
        result = this.__commandManager.execute(command, value);
      }
      
      return result;
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

       /*
        * Check if any content changes occured
        * only needed for non-mshtml - for mshtml exists an own implementation
        */
       if (!qx.core.Variant.isSet("qx.client", "mshtml"))
       {
         if (this.__startTyping)
         {
           var undoObject = this.__getUndoRedoObject();
           undoObject.actionType = "Content";
           this.__addToUndoStack(undoObject);
         }
       }

       /*
        * Look after the change history
        * if any custom change was found undo it manually
        */
       if (this.__undoStack.length > 0)
       {
         var undoStep = this.__undoStack.pop();

         /* Pass the undo-handling to the specialized methods ("__undo" + actionType) */
         result = this["__undo"+undoStep.actionType].call(this, undoStep);

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

      this.__redoStack.push(redoAction);

      /* 
       * Special undo handling for "insertHtml" in IE
       * Instead of working with ranges just remove the inserted html node
       * with the special id value.
       */
      if (qx.core.Client.getInstance().isMshtml() && undoInfo.command == "inserthtml")
      { 
        var undoId   = undoInfo.parameter[0];
        var undoNode = this.__doc.getElementById(undoId); 
        
        /* User *could* already removed the node e.g. an image */
        if (undoNode)
        {
          undoNode.parentNode.removeChild(undoNode);
        }        
        
        /*undoInfo.range.collapse(false);
        undoInfo.range.select();*/
      }
      else
      {
        if (undoInfo.command == "inserthyperlink")
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
        else
        {
          /* Undo changes by applying the corresponding command */
          return this.__commandManager.execute(undoInfo.command, undoInfo.value);  
        }
      }
    },


    /**
     * Undo a browser-supported command.
     *
     * @type member
     * @param undoInfo {Object} Undo info object
     * @return {Boolean}
     */
    __undoCommand : qx.core.Variant.select("qx.client", {
      "mshtml" : function(undoInfo)
      {
        this.__commandManager.__currentRange = undoInfo.range;

        return this.__commandManager.execute(undoInfo.command, undoInfo.value);
      },

      "default" : function(undoInfo)
      {
        this.__redoStack.push(undoInfo);

        /* Use the native undo command */
        return this.__doc.execCommand("Undo", false, null);
      }
    }),


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
        /* Populate the info for a possible redo */
        var redoObject = this.__getUndoRedoObject();
        redoObject.actionType = "Content";
        redoObject.range      = undoInfo.range;
        redoObject.content    = undoInfo.range.htmlText;
        redoObject.marker     = this.__getBookmark(undoInfo.range);

        this.__redoStack.push(redoObject);

       /* Select and clear the range */
       undoInfo.range.select();
       try
       {
         undoInfo.range.pasteHTML("");
       }
       /* Sometimes pasteHTML fails with an "unknown error" */
       catch(e)
       {
         if (qx.core.Variant.isSet("qx.debug", "on")) {
           this.debug("pasteHTML failed: "+e);
         }

         this.__doc.body.innerHTML = "";
       }

       /* Move the cursor back to the original position using the bookmark */
       undoInfo.range.moveToBookmark(undoInfo.marker);
       undoInfo.range.select();
       undoInfo.range.collapse(false);

       return true;
      },

      "default" : function(undoInfo)
      {
        this.__redoStack.push(undoInfo);


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

           /* Pass the redo-handling to the specialized methods ("__redo" + actionType) */
           result = this["__redo" + redoStep.actionType].call(this, redoStep);

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
      this.__undoStack.push(redoInfo);

      return this.__commandManager.execute(redoInfo.command, redoInfo.value);
    },
    
    
    /**
     * Redo a browser-supported command.
     *
     * @type member
     * @param redoInfo {Object} Redo info object
     * @return {Boolean}
     */
    __redoCommand : qx.core.Variant.select("qx.client", {
      "mshtml" : function(redoInfo)
      {
        var redoRange = redoInfo.range;
        var rng       = this.__doc.body.createTextRange();

        rng.collapse(false);
        rng.setEndPoint("StartToStart", redoRange);

        /*
         * Content redo
         * Select, collapse the range and insert the saved content
         */
        this.__commandManager.__currentRange = rng;
        this.__commandManager.execute(redoInfo.command, redoInfo.value);
        /*rng.select();
        rng.collapse(false);
        rng.pasteHTML(redoInfo.content);*/

        /*
         * Move the start of the range backwards to occupy the inserted content
         * Select it for user feedback
         */
        //rng.moveStart("character", -redoInfo.content.length);
        rng.select();

        /* Update the undo history */
        var undoObject = this.__getUndoRedoObject();
        undoObject.actionType = "Content";
        undoObject.range      = rng;
        undoObject.content    = rng.htmlText;
        undoObject.marker     = this.__getBookmark(rng);

        this.__addToUndoStack(undoObject);

        return true;
      },

      "default" : function(redoInfo)
      {
        /* Update the undo history */
        this.__addToUndoStack(redoInfo);
        
        return this.__doc.execCommand("Redo", false, null);
      }
    }),


    /**
     * Redo a content manipulation
     *
     * @type member
     * @param redoInfo {Object} Redo info object
     * @return {Boolean}
     */
    __redoContent : qx.core.Variant.select("qx.client", {
      "mshtml" : function(redoInfo)
      {
        var redoRange = redoInfo.range;
        var rng       = this.__doc.body.createTextRange();

        rng.collapse(false);
        rng.setEndPoint("StartToStart", redoRange);

        /*
         * Content redo
         * Select, collapse the range and insert the saved content
         */
        rng.select();
        rng.collapse(false);
        rng.pasteHTML(redoInfo.content);

        /*
         * Move the start of the range backwards to occupy the inserted content
         * Select it for user feedback
         */
        rng.moveStart("character", -redoInfo.content.length);
        rng.select();

        /* Update the undo history */
        var undoObject = this.__getUndoRedoObject();
        undoObject.actionType = "Content";
        undoObject.range      = rng;
        undoObject.content    = rng.htmlText;
        undoObject.marker     = this.__getBookmark(rng);

        this.__addToUndoStack(undoObject);

        return true;
      },

      "default" : function(redoInfo)
      {
        this.__addToUndoStack(redoInfo);
        return this.__doc.execCommand("Redo", false, null);
      }
    }),    
    
    
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
      
      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        this.__commandManager.__commands["inserthtml"].customUndo = true;
      }
    },
    

    /**
     * Collects the necessary info about the current action and adds this
     * info to the undo history.
     * 
     * @type member
     * @param command {String} command to execute
     * @param {String ? Integer ? null} Value of the command (if any)
     * @param {Object} internal commandObject
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
          
          case "inserthtml":
            parameters.push("undo_" + this.__undoId);
          break;
          
          case "inserthyperlink":
            /*
             * SPECIAL CASE
             * If the hyperlinks gets inserted on a selection treat it as a command step
             */
            if (!this.__editorInstance.__getSelection().isCollapsed)
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
          if (this.__editorInstance.__getSelection().isCollapsed)
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
          /* Check for __currentRange object */
          if (this.__commandManager.__currentRange == null)
          {
            this.__commandManager.__currentRange = this.__editorInstance.getRange();
          }

          var text = this.__commandManager.__currentRange.text;
          if (text && text.length > 0)
          {
            undoObject.actionType = "Command";
            undoObject.range      = this.__commandManager.__currentRange;
            undoObject.marker     = this.__getBookmark(this.__commandManager.__currentRange);
          }
          else
          {
            undoObject.actionType = "Command";
          }
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
         var undoRange = this.__createUndoRange();

         /* Add it to the undoStack */
         undoObject.actionType = "Content";
         undoObject.range      = undoRange.range;
         undoObject.marker     = undoRange.bookmark;

         //undoObject.actionType = "Content";

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
      * Utility method to add an entry to the undoStack. This method
      * is called from {@link __updateUndoRedoStatus} to update the status of
      * undo/redo. If the passed in changeInfo is a (simple) string it is
      * added as the type of the change otherwise the map is pushed as is to
      * the undoStack.
      *
      * @type member
      * @param changeInfo {Object} Infos of the change
      *
      * @return {void}
      */
     __addToUndoStack : function(changeInfo)
     {
       this.__undoStack.push(changeInfo);
     },


     /**
      * This method is currently only used from mshtml browser.
      * The goal is to create a new range and a corresponding bookmark.
      * These infos are added to the undoStack to determine the (content)
      * changes done so far, undo these correctly and move the cursor
      * accordingly at the original position.
      *
      * @type member
      * @return {Object} Map containing of a range and a bookmark.
      */
     __createUndoRange : qx.core.Variant.select("qx.client", {
         "mshtml" : function()
         {
           var rng    = this.__editorInstance.getRange();
           var marker = this.__getBookmark(rng);

           return { range    : rng,
                    bookmark : marker };
         },

         "default" : function()
         {
           return { range    : null,
                    bookmark : null };
         }
     }),


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
          this.__undoPossible = true;
          
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
            var undoObject = this.__getUndoRedoObject();

            /*
             * For IE save the current range and add it to the
             * undo stack to safely undo this content manipulation
             * afterwards.
             */
            if (qx.core.Variant.isSet("qx.client", "mshtml"))
            {
              var undoRange = this.__createUndoRange();

              /* Add it to the undoStack */
              undoObject.actionType = "Content";
              undoObject.range      = undoRange.range;
              undoObject.marker     = undoRange.bookmark;
            }
            else
            {
              undoObject.actionType = "Content";
            }

            /* Add undo infos to the stack */
            //this.__addToUndoStack(undoObject);

            /* Mark the beginning of typing */
            this.__startTyping = true;
            
            /* undo is now possible */
            this.__undoPossible = true;
            
            /* Fire an update event  */
            this.__updateUndoRedoState();
          }
       }
    },
    
    
    /**
     * Fires the "undoRedoState" event to inform external components (like a toolbar)
     * about the current state of the undo/redo.
     * The event itself it fired with a timeout to not interfere with the current key event.
     * 
     * @type member
     * @return {void} 
     */
    __updateUndoRedoState : function() 
    {
      var self = this;      
      window.setTimeout(function(e) {
        self.dispatchEvent(new qx.event.type.DataEvent("undoRedoState", { undo : self.isUndoPossible() ? 0 : -1,
                                                                        redo : self.isRedoPossible() ? 0 : -1 }));
      }, 200);
    },
    
    
    /**
     * Utility method to get a bookmark of the given range object.
     * Works only for IE.
     * 
     * @type member
     * @param rng {Range} given range object
     * @return {Bookmark ? null}
     */
    __getBookmark : qx.core.Variant.select("qx.client",
    { "mshtml" : function(rng)
      {
        try
        {
          return rng.getBookmark();
        }
        catch (e)
        {
          return null;
        }
      },
      
      "default" : function()
      {
        return null;
      }
    })
  },


  /**
   * Destructor
   */
  destruct : function()
  {

  }
});
