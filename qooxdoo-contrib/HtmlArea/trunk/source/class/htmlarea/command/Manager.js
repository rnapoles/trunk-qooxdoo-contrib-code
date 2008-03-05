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
 * Available commands for the HtmlArea component
 *
 *
 */
qx.Class.define("htmlarea.command.Manager",
{
  extend : qx.core.Object,

  construct : function(editorInstance)
  {
    this.base(arguments);

    this.__editorInstance = editorInstance;
    this.__doc            = null;

    this.__commands       = null;
    this.__populateCommandList();

    this.__editorInstance.addEventListener("focusOut", this._handleFocusOut, this);
  },

  statics :
  {
    /**
     * Possible values for the style property background-position
     */
    __backgroundPosition : "|top|bottom|center|left|right|right top|left top|left bottom|right bottom|",

    /**
     * Possible values for the style property background-repeat
     */
    __backgroundRepeat : "repeat repeat-x repeat-y no-repeat"
  },

  members :
  {
    /* ****************************************************************
     *                BASIC / INITIALISATION
     * **************************************************************** */

    /**
     * Set the contentDocument on which this manager should execute
     * his commands
     *
     * @type member
     * @param doc {Object} contentDocument of the editor instance
     * @return {void}
     */
    setContentDocument : function(doc)
    {
      this.__doc = doc;
    },


    /*
     * Store the current range for IE browser to support execCommands
     * fired from e.g. toolbar buttons. If the HtmlArea looses the selection
     * because the user e.g. clicked at a toolbar button the last selection
     * has to be stored in order to perform the desired execCommand correctly.
     */
    __currentRange    : null,


    /**
     * Returns the current stored range
     *
     * @type member
     * @return {Range} Range object
     */
    getCurrentRange : function ()
    {
      if (this.__currentRange != null)
      {
        return this.__currentRange;
      }

      /* Fallback is getting a new range from the editor */
      return this.__editorInstance.getRange();
    },


    /**
     * Eventlistener for focus out events to save the current selection.
     * NOTE: this method is currently only used for mshtml.
     *
     * @type member
     * @param e {qx.event.type.Event} focus out event
     * @return {void}
     */
    _handleFocusOut : qx.core.Variant.select("qx.client", {
      "mshtml" : function(e)
      {
        this.__currentRange     = this.__editorInstance.getRange();
      },
      "default" : function() {}
    }),


    /* ****************************************************************
     *                  COMMAND PROCESSING
     * **************************************************************** */

    /**
     * Returns the commandobject of the given command name
     *
     * @type member
     * @param commandName {String} name of the command
     * @return {Object ? null} commandObject or null if no command is available for the given command name
     */
    getCommandObject : function(commandName)
    {
      if (this.__commands[commandName])
      {
        return this.__commands[commandName];
      }
      else
      {
        return null;
      }
    },

    /**
     * Populate the internal "commands" object with the available commands and their settings.
     *
     * @type member
     * @return {void}
     */
    __populateCommandList : function()
    {
      this.__commands = {
        bold                  : { useBuiltin : true, identifier : "Bold", method : null },
        italic                : { useBuiltin : true, identifier : "Italic", method : null },
        underline             : { useBuiltin : true, identifier : "Underline", method : null },
        strikethrough         : { useBuiltin : true, identifier : "StrikeThrough", method : null },

        fontfamily            : { useBuiltin : true, identifier : "FontName", method : null },
        fontsize              : { useBuiltin : true, identifier : "FontSize", method : null },

        textcolor             : { useBuiltin : true, identifier : "ForeColor", method : null },
        textbackgroundcolor   : { useBuiltin : true, identifier : qx.core.Variant.isSet("qx.client", "gecko|opera") ? "Hilitecolor" : "BackColor", method : null },

        backgroundcolor       : { useBuiltin : false, identifier : null, method : "__setBackgroundColor" },
        backgroundimage       : { useBuiltin : false, identifier : null, method : "__setBackgroundImage" },

        justifyleft           : { useBuiltin : true, identifier : "JustifyLeft", method : null },
        justifyright          : { useBuiltin : true, identifier : "JustifyRight", method : null },
        justifycenter         : { useBuiltin : true, identifier : "JustifyCenter", method : null },
        justifyfull           : { useBuiltin : true, identifier : "JustifyFull", method : null },

        indent                : { useBuiltin : true, identifier : "Indent", method : null },
        outdent               : { useBuiltin : true, identifier : "Outdent", method : null },

        copy                  : { useBuiltin : true, identifier : "Copy", method : null },
        cut                   : { useBuiltin : true, identifier : "Cut", method : null },
        paste                 : { useBuiltin : true, identifier : "Paste", method : null },
        
        insertorderedlist     : { useBuiltin : true, identifier : "InsertOrderedList", method : null },
        insertunorderedlist   : { useBuiltin : true, identifier : "InsertUnorderedList", method : null },

        inserthorizontalrule  : { useBuiltin : true, identifier : "InsertHorizontalRule", method : null },
        insertimage           : { useBuiltin : true, identifier : "InsertImage", method : null },

        selectall             : { useBuiltin : true, identifier : "SelectAll", method : null },
        selectedtext          : { useBuiltin : false, identifier : null, method : "__getSelectedText" },
        selectedhtml          : { useBuiltin : false, identifier : null, method : "__getSelectedHtml" },

        inserthtml            : { useBuiltin : false, identifier : "InsertHtml", method : "__insertHtml" },
        resethtml             : { useBuiltin : false, identifier : null, method : "__resetHtml" },
        gethtml               : { useBuiltin : false, identifier : null, method : "__getHtml" },
        removeFormat          : { useBuiltin : true, identifier : "RemoveFormat", method : null },

        stylewithcss          : { useBuiltin : false, identifier : "styleWithCSS", method : "__styleWithCSS" },
        usecss                : { useBuiltin : false, identifier : "useCSS", method : "__useCSS" }
      }
    },


    /**
     * Executes the given command
     *
     * @type member
     * @param {String} Command to execute
     * @param {String ? Integer ? null} Value of the command (if any)
     * @return {Boolean} Result of operation
     */
    execute : function(command, value)
    {
      if (!this.__editorInstance.isLoaded() || 
          !this.__editorInstance.isEditable())
      {
        this.error("editor not ready! '"+command+"':'"+value+"'");
        return false;
      }

      /* Normalize */
      command = command.toLowerCase();
      value   = value != null ? value : null;

      /* Check if the given command is supported */
      if (this.__commands[command])
      {
        var commandObject = this.__commands[command];

        /* Pass all useBuiltin commands right to the browser */
        if (commandObject.useBuiltin)
        {
          return this.__executeCommand(commandObject.identifier, false, value);
        }
        else
        {
          /* Call the specialized method */
          if (commandObject.method != null && this[commandObject.method])
          {
            return this[commandObject.method].call(this, value, commandObject);
          }
          else
          {
            this.error("The method '"+ commandObject.method +"' you calling to execute the command '"+ command +"' is not available!");
          }
        }
      }
      else
      {
        this.error("Command " + command + " is currently not supported!");
      }
    },


    /**
     * Internal method to deal with special cases when executing commands
     *
     * @type member
     * @param command {String} command to execute
     * @param ui {Boolean} Whether to show an ui when executing a command. Default is false.
     * @param value {String ? Integer ? null} value of the command
     * @return {Boolean} Success of operation
     */
    __executeCommand : function(command, ui, value)
    {
      try
      {
        /* The document object is the default target for all execCommands */
        var execCommandTarget = this.__doc;

        if (!qx.core.Client.getInstance().isOpera()) {
          this.__doc.body.focus();
        }

        /*
         * IE looses the selection if the user clicks on any other element e.g. a toolbar item
         * To manipulate the selected text correctly IE has to execute the command on the previously
         * saved Text Range object rather than the document object.
         *
         * Ignore the "SelectAll" command otherwise the range handling would interfere with it.
         */
        if (qx.core.Variant.isSet("qx.client", "mshtml") && command != "selectall")
        {
          /*
           * Select the content of the Text Range object to set the cursor at the right position
           * and to give user feedback. Otherwise IE will set the cursor at the first position of the
           * editor area
           */
          this.__currentRange.select();

          /*
           * If the saved Text Range object contains no text
           * collapse it and execute the command at the document object
           */
          execCommandTarget = this.__currentRange.text.length > 0 ? this.__currentRange : this.__doc;
        }

        var result = execCommandTarget.execCommand(command, ui, value);

        /* Debug info */
        if (qx.core.Variant.isSet("qx.debug", "on"))
        {
          this.debug("execCommand " + command + " with value " + value + " succeded");
        }

        /* (re)-focus the editor after the execCommand */
        this.__focusAfterExecCommand();

        /* Reset the startTyping flag to mark the next insert of any char as a new undo step */
        this.__startTyping = false;
      }
      catch(ex)
      {
        if (qx.core.Variant.isSet("qx.debug", "on"))
        {
          this.debug("execCommand " + command + " with value " + value + " failed");
        }

        return false;
      }

      return result;
    },



    /* ************************************************************
     *          CUSTOM COMMAND IMPLEMENTATION
     * *********************************************************** */

     /**
      * Command used at startup to setup the iframe as an editable area.
      *
      * @type member
      * @param value {Boolean} value of the command
      * @param commandObject {Object} command infos
      * @return {Boolean} Succes of operation
      */
     __styleWithCSS : function(value, commandObject)
     {
       return this.__doc.execCommand(commandObject.identifier, false, value);
     },


     /**
      * Command used at startup to setup the iframe as an editable area. This
      * command is a fallback to the "styleWithCSS" command.
      *
      * @type member
      * @param value {Boolean} value of the command
      * @param commandObject {Object} command infos
      * @return {Boolean} Success of the operation
      */
     __useCSS : function(value, commandObject)
     {
       return this.__doc.execCommand(commandObject.identifier, false, value);
     },


     /**
      * Inserts custom HTML code at the selection point.
      *
      * @type member
      * @param value {String} HTML code to insert
      * @param commandObject {Object} command infos
      * @return {Boolean} Success of the operation
      */
     __insertHtml : function(value, commandObject)
     {
       var ret;

       if (qx.core.Variant.isSet("qx.client", "mshtml"))
       {
         this.__editorInstance._visualizeFocus();

         var currentRange = this.__editorInstance.getRange();
         currentRange.pasteHTML(value);

         ret = true;
       }
       else
       {
         ret = this.__doc.execCommand(commandObject.identifier, false, value);
       }

       return ret;
     },


     /**
      * Internal method to set a background color for the whole document
      *
      * @type member
      * @param value {String} color info
      * @param commandObject {Object} command infos
      * @return {Boolean} Success of operation
      */
     __setBackgroundColor : function(value, commandObject)
     {
       /* Normalize */
       value = value != null && typeof value == "string" ? value : "transparent";

       /* Set the new background color */
       qx.bom.element.Style.set(this.__doc.body, "backgroundColor", value);

       return true;
     },


     /**
      * TODOC
      */
     __setBackgroundImage : function(value, commandObject)
     {
       var url, repeat, position;

       /* Check for value */
       if (value == null)
       {
         url = null;
       }
       else
       {
         url      = value[0];
         repeat   = value[1];
         position = value[2];
       }

       /* If url is null remove the background image */
       if (url == null || typeof url != "string")
       {
         qx.bom.element.Style.set(this.__doc.body, "backgroundImage", "");
         qx.bom.element.Style.set(this.__doc.body, "backgroundRepeat", "");
         qx.bom.element.Style.set(this.__doc.body, "backgroundPosition", "");

         return true;
       }

       /*
        * Normalize the url parameter. Especially when doing undo/redo operations the url
        * *can* be passed in as full CSS like 'url(SOMEURL)' rather than just 'SOMEURL'.
        */
       else
       {
         /* Quick test for 'url(' */
         if (url.search(/^url.*\(/) == -1)
         {
           url = "url(" + url + ")";
         }
       }

       /*
        * Return silently if the parameter "repeat" is not valid and report
        * the error in debug mode
        */
       if (repeat != null && htmlarea.command.Manager.__backgroundRepeat.indexOf(repeat) < 0 )
       {
         if (qx.core.Variant.isSet("qx.debug", "on"))
         {
           this.error("The value '" +repeat + "' is not allowed for parameter 'repeat'. Possible values are '" + htmlarea.command.Manager.__backgroundRepeat + "'");
         }
         return false;
       }
       else
       {
         repeat = "no-repeat";
       }

       /*
        * Return silently if the parameter "position" is not valid
        * and report the error in debug mode
        */
       if (position != null && htmlarea.command.Manager.__backgroundPosition.indexOf('|'+position+'|') < 0)
       {
         if (qx.core.Variant.isSet("qx.debug", "on"))
         {
           this.error("The value '" + position + "' is not allowed for parameter 'position'. Possible values are '" + htmlarea.command.Manager.__backgroundPosition + "'");
         }
         return false;
       }
       else
       {
         if (!position) {
           position = "top";
         }
       }


       /*
        * Don't use the "background" css property to prevent overwriting the
        * current background color
        */
       qx.bom.element.Style.set(this.__doc.body, "backgroundImage", url);
       qx.bom.element.Style.set(this.__doc.body, "backgroundRepeat", repeat);
       qx.bom.element.Style.set(this.__doc.body, "backgroundPosition", position);

       return true;
     },


     /**
     * Returns the content of the actual range as text
     *
     * @type member
     * @return {String} selected text
     */
    __getSelectedText : function()
    {
      var range = this.getCurrentRange();
      if (range)
      {
        return (typeof range == "string") ? range : range.toString();
      }

      return "";
    },


    /**
     * returns the content of the actual range as text
     *
     * @TODO: need to be implemented correctly
     * @return {String} selected text
     */
    __getSelectedHtml : function()
    {
      var tmpBody = document.createElement("body");
      var range   = this.getCurrentRange();

      if (!range) {
        return "";
      };

      if (range.cloneContents)
      {
        tmpBody.appendChild(range.cloneContents());
      }
      else if (typeof (range.item) != 'undefined' || typeof (range.htmlText) != 'undefined')
      {
        return range.item ? range.item(0).outerHTML : range.htmlText;
      }
      else
      {
        return range.toString();
      }

      return tmpBody.innerHTML;
    },


     /**
     * (Re)-focuses the editor after an execCommand was executed
     *
     * @type member
     * @param context {Object} current context object for window.setTimeout method
     * @return void
     */
    __focusAfterExecCommand : function()
    {
      var that = this.__editorInstance;

      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        window.setTimeout(function(e)
        {
          /*
           * IE needs to change the activeChild to the editor component
           * otherwise the e.g. pressed button (to set the selected content bold)
           * will receive the following events
           * call _visualizeFocus to get the right feedback to the user (editor is active)
           */
          qx.ui.core.ClientDocument.getInstance().setActiveChild(that);
          that._visualizeFocus();
        }, 50);
      }
      else if (qx.core.Variant.isSet("qx.client", "webkit"))
      {
        /*
         * Webkit needs a mix of both (IE/Gecko). It is needed to (re)set the editor widget
         * as the active child and to focus the editor widget (again).
         */
         window.setTimeout(function(e)
         {
           qx.ui.core.ClientDocument.getInstance().setActiveChild(that);
           that.getContentWindow().focus();
         }, 50);
       }
       else
       {
         /* for all other browser a short delayed focus on the contentWindow should do the job */
         window.setTimeout(function(e) {
           that.getContentWindow().focus();
         }, 50);
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