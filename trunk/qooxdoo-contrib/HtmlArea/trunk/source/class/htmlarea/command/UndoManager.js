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

************************************************************************ */

/**
 * Decorator for CommandManager instance 
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
    this.__commands  = null;
    this.__doc       = null;
    
    this.__populateCommandList();
    editorInstance.addEventListener("keypress", this._handleKeyPress, this);
  },
  
  
  members :
  {
    /* Set this flag if an undo operation is performed */
    __undoOperation : false,

    /* Variable to hold the actions for redo  */
    __redoAction : null,

    /* Flag if a redo operation is possible */
    __redoPossible : false,
    
    /* Flag for the undo-mechanism to monitor the content changes */
    __startTyping : false,
    
    /**
     * TODOC
     */
    setContentDocument : function(doc)
    {
      this.__doc = doc;
      this.__commandManager.setContentDocument(doc);
    },
    
    /**
     * TODOC
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
    },
    
    
    /**
     * TODOC
     */
    execute : function(command, value)
    {
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
          this.__commandManager.execute(command, value); 
        }
        else
        {
          /* Call the responsible method */
          this[command].call(this);
          
          /* (re)set the focus in the editor */
          this.__commandManager.__focusAfterExecCommand();
        }
      }
      else
      {
        /* Collect undo info */
        this.__collectUndoInfo(command, value, this.__commandManager.getCommandObject(command));
        
        /* Execute the command */
        this.__commandManager.execute(command, value);
      }
    },
    
    
    /**
     * Service method to check if an undo operation is currently possible
     * 
     * @type member
     * @return {Boolean} Whether an undo is possible or not
     */
    isUndoPossible : function()
    {
      /* If no undo history entry is available but content was edited */
      return this.__undoStack.length > 0 || this.__startTyping;
    },
    
    
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
     * TODOC
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
  
         /* Need to inform the toolbar, because context has changed */
         this.__editorInstance.__startExamineCursorContext();
         
         return result;
       }
     },
     
     
     /**
      * TODOC
      */
    __undoCustom : function(undoInfo)
    {
      /* Fill the info for the (possible) redo */
      this.__redoAction = undoInfo;
      
      /* Add the (different) needed parameter for the redo */
      switch(undoInfo.command)
      {
        case "backgroundcolor":
          this.__redoAction.parameter = [ qx.bom.element.Style.get(this.__doc.body, "backgroundColor") ];
        break;
  
        case "backgroundimage":
          this.__redoAction.parameter = [ qx.bom.element.Style.get(this.__doc.body, "backgroundImage"),
                                          qx.bom.element.Style.get(this.__doc.body, "backgroundRepeat"),
                                          qx.bom.element.Style.get(this.__doc.body, "backgroundPosition") ];
        break;
      }
      
      /* Undo changes by applying the corresponding command */
      return this.__commandManager.execute(undoInf.command, undoInfo.parameter);
      //this[undoInfo.method].apply(this, undoInfo.parameter);
    },
    
    
    /**
     * TODOC
     */
    __undoCommand : qx.core.Variant.select("qx.client", {
      "mshtml" : function(undoInfo)
      {
        this.__commandManager.__currentRange = undoInfo.range;
        this.__redoAction = undoInfo;
        
        return this.__commandManager.execute(undoInfo.command, undoInfo.value);
        //this._execCommand(undInfo.cmd, false, null, false);
      },
      
      "default" : function(undoInfo)
      {
        this.__redoAction = undoInfo;
        
        /* Use the native undo command */
        return this.__doc.execCommand("Undo", false, null);
      }
    }),
    
    
    /**
     * TODOC 
     */
    __undoContent : qx.core.Variant.select("qx.client", {
      "mshtml" : function(undoInfo)
      {
        /* Populate the info for a possible redo */
        var redoObject = this.__getUndoRedoObject();
        redoObject.actionType = "Content";
        redoObject.range      = undoInfo.range;
        redoObject.content    = undoInfo.range.htmlText;
        redoObject.marker     = undoInfo.range.getBookmark();
       
        this.__redoAction     = redoObject;

       /* Select and clear the range */
       undoInfo.range.select();
       undoInfo.range.pasteHTML("");

       /* Move the cursor back to the original position using the bookmark */
       undoInfo.range.moveToBookmark(undoInfo.marker);
       undoInfo.range.select();
       undoInfo.range.collapse(false);
       
       return true;
      },
      
      "default" : function(undoInfo)
      {
        this.__redoAction = undoInfo;
        
        /* Use the native undo command */
        return this.__doc.execCommand("Undo", false, null);
      }
    }),
    
     /**
      * TODOC
      */
     redo : function()
     {
       if (this.__redoPossible)
       {
         var result;
         
         /* Pass the redo-handling to the specialized methods ("__redo" + actionType) */
         result = this["__redo" + this.__redoAction.actionType].call(this, this.__redoAction);
        
         /* Need to inform the toolbar, because context has changed */
         this.__editorInstance.__startExamineCursorContext();

         /* Resetting flag and redo info */
         this.__redoPossible = false;
         this.__redoAction   = null;
        
         return result;
      }
    },
    
    
    /**
     * TODOC
     */
    __redoCustom : function(redoInfo)
    {
      return this.__commandManager.execute(redoInfo.command, redoInfo.value);
      //this[this.__redoAction.method].apply(this, this.__redoAction.parameter);
    },
    
    
    /**
     * TODOC
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
        undoObject.marker     = rng.getBookmark();
        
        this.__addToUndoStack(undoObject);
        
        return true;
      },
      "default" : function(redoInfo)
      {
        return this.__doc.execCommand("Redo", false, null);      
      }
    }),
    
    
    /**
     * TODOC
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
        undoObject.marker     = rng.getBookmark();
        
        this.__addToUndoStack(undoObject);
        
        return true;
      },
      "default" : function(redoInfo)
      {
        return this.__doc.execCommand("Redo", false, null);      
      }
    }),
    
    
    /**
     * TODOC
     */
    __collectUndoInfo : function(command, value, commandObject)
    {
      var undoObject           = this.__getUndoRedoObject();
      undoObject.commandObject = commandObject;
      undoObject.command       = command;
      undoObject.value         = value;
      
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
        }
        
        undoObject.actionType = "Custom";
        undoObject.parameter  = parameters;
      }
      else
      {
        if (qx.core.Variant.isSet("qx.client", "gecko"))
        {
          /* 
           * Ignore the command if the range currently manipulated is collapsed. 
           * If the range is collapsed gecko marks this manipulation NOT as an 
           * extra action.
           * 
           * -> no extra undo step
           */
          if (this.__editorInstance.getRange().collapsed)
          {
            return;
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
          
          this.__commandManager.__currentRange.select();
          
          if (this.__commandManager.__currentRange.text.length > 0)
          {
            undoObject.actionType = "Command";
            undoObject.range      = this.__commandManager.__currentRange;
            undoObject.marker     = this.__commandManager.__currentRange.getBookmark();
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
           var marker = rng.getBookmark();

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
     * TODOC
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
          this.__startTyping = false;
        break;
        
        default:
          /* Mark the redo as not possible anymore */
          this.__redoPossible = false;
          
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
            this.__addToUndoStack(undoObject);
            
            /* Mark the beginning of typing */
            this.__startTyping = true;
          }
       }
    }
  },
  
  
  /**
   * Destructor
   */
  destruct : function()
  {
    
  }
});