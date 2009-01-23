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
     * Jonathan Weiß (jonathan_rass)

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
     * When executing these commands, IE 6 sometimes selects the last <span> tag
     * completly by mistake. It is necessary to check if the range is still
     * collapsed after executing one of these commands.
     */
    __invalidFocusCommands :
    {
      "Bold"          : true,
      "Italic"        : true,
      "Underline"     : true,
      "StrikeThrough" : true
    },

    /*
     * Store the current range for IE browser to support execCommands
     * fired from e.g. toolbar buttons. If the HtmlArea looses the selection
     * because the user e.g. clicked at a toolbar button the last selection
     * has to be stored in order to perform the desired execCommand correctly.
     */
    __currentRange    : null,

    /*
     * Save the type of the last selection. IE if blur() was executed on the htmlare and
     * it gets focused again, still _has_ a selection. But this selection can only be used
     * to execute commands on it, because we can not get any information about it any longer.
     */
    __lastSelectionType : "none",
    
    /**
     * Computed pixel sizes for values size attribute in <font> tag
     */
    __fontSizeNames : [ 10, 12, 16, 18, 24, 32, 48 ],
    
    
    /*
     * In Gecko-browser hyperlinks which are based on *collapsed* selection are inserted as DOM nodes. 
     * To keep track of these nodes they are equipped with an unique id (-> "qx_link" + __hyperLinkId)
     */
    __hyperLinkId : 0,


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
     * save the current selection.
     * NOTE: this method is currently only used for mshtml.
     *
     * @type member
     * @return {void}
     */
    storeCurrentRange : qx.core.Variant.select("qx.client",
    {

      "mshtml" : function()
      {
        if (this.__editorInstance)
        {
          this.__currentRange      = this.__editorInstance.getRange();

          var sel = this.__editorInstance.__getSelection();
          this.__lastSelectionType = sel ? sel.type : "";
        }
      },

      "default" : function() {}

    }),


    /**
     * invalidates the current selection.
     * NOTE: this method is currently only used for mshtml.
     *
     * @type member
     * @return {void}
     */
    invalidateCurrentRange : qx.core.Variant.select("qx.client",
    {

      "mshtml" : function()
      {
        this.__currentRange      = null;
        this.__lastSelectionType = null;
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
        fontsize              : { useBuiltin : false, identifier : "FontSize", method : "__setFontSize" },

        textcolor             : { useBuiltin : true, identifier : "ForeColor", method : null },
        textbackgroundcolor   : { useBuiltin : false, identifier : null, method : "__setTextBackgroundColor" },

        backgroundcolor       : { useBuiltin : false, identifier : null, method : "__setBackgroundColor" },
        backgroundimage       : { useBuiltin : false, identifier : null, method : "__setBackgroundImage" },

        justifyleft           : { useBuiltin : false, identifier : "JustifyLeft", method : "__setTextAlign" },
        justifyright          : { useBuiltin : false, identifier : "JustifyRight", method : "__setTextAlign" },
        justifycenter         : { useBuiltin : false, identifier : "JustifyCenter", method : "__setTextAlign" },
        justifyfull           : { useBuiltin : false, identifier : "JustifyFull", method : "__setTextAlign" },

        indent                : { useBuiltin : false, identifier : "Indent", method : "__setInOutdent" },
        outdent               : { useBuiltin : false, identifier : "Outdent", method : "__setInOutdent" },

        copy                  : { useBuiltin : true, identifier : "Copy", method : null },
        cut                   : { useBuiltin : true, identifier : "Cut", method : null },
        paste                 : { useBuiltin : true, identifier : "Paste", method : null },
        
        insertorderedlist     : { useBuiltin : false, identifier : "InsertOrderedList", method : "__insertList" },
        insertunorderedlist   : { useBuiltin : false, identifier : "InsertUnorderedList", method : "__insertList" },

        inserthorizontalrule  : { useBuiltin : false, identifier : "InsertHtml", method : "__insertHr" },
        insertimage           : { useBuiltin : false, identifier : "InsertImage", method : "__insertImage" },

        inserthyperlink       : { useBuiltin : false, identifier : "CreateLink", method : "__insertHyperLink" },

        selectall             : { useBuiltin : false, identifier : "SelectAll", method : "__selectAll" },
        selectedtext          : { useBuiltin : false, identifier : null, method : "__getSelectedText" },
        selectedhtml          : { useBuiltin : false, identifier : null, method : "__getSelectedHtml" },

        inserthtml            : { useBuiltin : false, identifier : "InsertHtml", method : "__insertHtml" },
        resethtml             : { useBuiltin : false, identifier : null, method : "__resetHtml" },
        gethtml               : { useBuiltin : false, identifier : null, method : "__getHtml" },
        removeformat          : { useBuiltin : true, identifier : "RemoveFormat", method : null },

        stylewithcss          : { useBuiltin : false, identifier : "styleWithCSS", method : "__styleWithCSS" },
        usecss                : { useBuiltin : false, identifier : "useCSS", method : "__useCSS" }
      }
    },


    /**
     * Executes the given command
     *
     * @type member
     * @param command {String} Command to execute
     * @param value {String ? Integer ? null} Value of the command (if any)
     * @return {Boolean} Result of operation
     */
    execute : function(command, value)
    {
      if (!this.__editorInstance.__isReady)
      {
        this.error("editor not ready! '"+command+"':'"+value+"'");
        return false;
      }

      if (!this.__editorInstance.isSeeable())
      {
        this.error("editor not visible! '"+command+"':'"+value+"'");
        return false;
      }

      /* Normalize */
      command = command.toLowerCase();
      value   = value != null ? value : null;

      /* Check if the given command is supported */
      if (this.__commands[command])
      {
        var commandObject = this.__commands[command];

        /**
         * We have to make sure that the elements inside the selection are
         * inside a paragraph before executing a command. Otherwise executing
         * commands will cause problems for our paragraph handling.
         */
        if (this.__paragraphMissing()) {
          this.__insertHelperParagraph();
        }

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
     * Checks if the focus node is not inside a paragraph tag.
     *
     * @type member
     * @return {Boolean} True if no paragraph is found, otherwise false.
     */
    __paragraphMissing : function()
    {
      var focusNode = this.__editorInstance.__getSelection().focusNode;
      var isInParagraph = false;
      var bodyIsFocusNode = false;

      if (focusNode)
      {
        if (focusNode.nodeType == 3)
        {
          // Check the focus node is inside a paragraph tag.
          var parents = qx.dom.Hierarchy.getAncestors(focusNode);

          for(var i=0, j=parents.length; i<j; i++)
          {
            if (parents[i].tagName == "P")
            {
              isInParagraph = true;
              break;
            }
          }

        }
        else if (focusNode.nodeType == 1 && focusNode.tagName == "BODY")
        {
          // TODO: Additional checks needed?
          bodyIsFocusNode = true;
        }
      }

      return bodyIsFocusNode || (!isInParagraph);
    },

    /**
     * Inserts a paragraph tag around selection or at the insert point
     * using executeCommand.
     *
     * @type member
     */
    __insertHelperParagraph : function()
    {
      this.__executeCommand("formatBlock", false, "p");
    },
        
    
    /**
     * Returns the styles of each child element of the given paragraph element.
     * Used internally for paragraph-handling. 
     * 
     * *** ONLY RELEVANT FOR IE ***
     * 
     * @param paragraphElement {Element} paragraph DOM Element
     * @return {Map} Map of all styles. Key is the execCommand identifier and
     *               the value is the (optional) value for the execCommand
     * @signature function(paragraphElement)
     */
    __getParagraphStyles : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function(paragraphElement)
      {
        var styles = {};
        if (paragraphElement && paragraphElement.nodeName.toLowerCase() === "p")
        {
          // Get all the child elements
          // Do *not* use "getDescendants" of "qx.dom.Hierarchy" since
          // this method relies on the "qx.lang.Array.fromCollection" method
          // which was broken in 0.7.x
          var childElements = paragraphElement.getElementsByTagName("*");
          
          // check every child element and collect infos for formatting
          // the current empty paragraph at the next execCommand
          for (var i=0, j=childElements.length; i<j; i++)
          {
            switch(childElements[i].nodeName.toLowerCase())
            {
              case "em":
                styles["Italic"] = null;
              break;
              
              case "strong":
                styles["Bold"] = null;
              break;
              
              case "u":
                styles["Underline"] = null;
              break;
              
              case "strike":
                styles["StrikeThrough"] = null;
              break;
              
              case "font":
                var element = childElements[i];
                
                // size attribute
                var fontSize = element.getAttribute("size");
                if (fontSize !== "")
                {
                  styles["FontSize"] = fontSize; 
                }
                
                // family
                var fontFamily = element.getAttribute("face");
                if (fontFamily !== "")
                {
                  styles["FontName"] = fontFamily;
                }
                
                // styles like color, background-color etc.
                var elementColor = element.getAttribute("color");
                if (elementColor !== "")
                {
                  styles["ForeColor"] = elementColor;
                }
                
                var elementBgColor = element.style.backgroundColor;
                if (elementBgColor !== "")
                {
                  styles["BackColor"] = elementBgColor;
                }                  
              break;
            }
          }          
        }
        return styles;
      },
      
      "default" : function() { 
        return {};
      }
    }),
    

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
        
        /* Flag indicating if range was empty before executing command. Needed for IE bug. */
        var emptyRange = false;
        var range;

        /* Request current range explicitly, if command is one of the invalid focus commands. */
        if(
          (qx.core.Variant.isSet("qx.client", "mshtml")) &&
          (qx.core.Client.getInstance().getVersion() < 7) &&
          (this.__invalidFocusCommands[command])
        )
        {
          this.__currentRange = this.__editorInstance.getRange(); 
        }

        /* Body element must have focus before executing command */
        this.__doc.body.focus();

        /*
         * IE looses the selection if the user clicks on any other element e.g. a toolbar item
         * To manipulate the selected text correctly IE has to execute the command on the previously
         * saved Text Range object rather than the document object.
         *
         * Ignore the "SelectAll" command otherwise the range handling would interfere with it.
         */
        if (qx.core.Variant.isSet("qx.client", "mshtml"))
        {
          if (!this.__currentRange)
          {
            execCommandTarget = this.__doc;
          }
          else
          {
            if(command != "selectall")
            {
              /*
               * Select the content of the Text Range object to set the cursor at the right position
               * and to give user feedback. Otherwise IE will set the cursor at the first position of the
               * editor area
               */
              this.__currentRange.select();
  
              if(
                  /*
                   * If the saved Text Range object contains no text
                   * collapse it and execute the command at the document object
                   */
                  (
                    (this.__currentRange.text) &&
                    (this.__currentRange.text.length > 0)
                  )
                  ||
                  /*
                   * Selected range is a control range with an image inside.
                   */
                  (
                    (this.__currentRange.length == 1) &&
                    (this.__currentRange.item(0)) &&
                    (this.__currentRange.item(0).tagName == "IMG")
                  )
                )
              {
                execCommandTarget = this.__currentRange; 
              }
              else
              {
                execCommandTarget = this.__doc;
              }
              
            }
          }

          /* 
           * IE has the unwanted behavior to select text after executing some commands
           * (see this.__invalidFocusCommands).
           * If this happens, we have to collapse the range afterwards.    
           */
          if( (qx.core.Variant.isSet("qx.client", "mshtml")) && (this.__invalidFocusCommands[command]) )
          {
            range = this.getCurrentRange();

            /* Check if range is empty */
            if (range.text == "") {
              emptyRange = true;
            }
          }

        }
        
        // If the current paragraph is an empty one take over the collected 
        // formatting elements of the previous paragraph and apply them here
        if (qx.core.Variant.isSet("qx.client", "mshtml"))
        {
          // look for an *empty* paragraphs which are a result of a line-break
          var rngParent = this.__editorInstance.getRange().parentElement();
          if (rngParent.nodeName.toLowerCase() === "p" && rngParent.childNodes.length === 0)
          {
            var previousElement = rngParent.previousSibling; 
            if (previousElement && previousElement.nodeName.toLowerCase() == "p")
            {
              // get the styles of the previous paragraph and apply them
              var paraStyles = this.__getParagraphStyles(previousElement);
              for (var pStyle in paraStyles)
              {
                this.__doc.execCommand(pStyle, false, paraStyles[pStyle]);
              }          
            }
          }
        }

        var result = execCommandTarget.execCommand(command, ui, value);

        /* If range has been empty before executing command, collapse range */
        if (emptyRange)
        {
          if (range.text != "") {
            range.collapse();
          }
        }

        
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
      * @param commandObject {Object} command information
      * @return {Boolean} Success of the operation
      */
    __insertHtml : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function(value, commandObject)
      {
        this.__editorInstance.getContentDocument().body.focus();

        /* Special handling if a "br" element should be inserted */
        if (value == htmlarea.HtmlArea.simpleLinebreak)
        {
          return this.__insertBrOnLinebreak(); 
        }
        else
        {
          /* this.__currentRange can be a wrong range!*/
          var storedRange = this.getCurrentRange();

          /* in this case, get the range again (we lose the cursor position by doing that) */
          var actualRange = this.__editorInstance.getRange();

          if(storedRange)
          {
            if (this.__lastSelectionType == "Control")
            {
              storedRange.collapse();
            }

            /* Try to pasteHTML on the stored range */
            try
            {
              storedRange.pasteHTML(value);
              storedRange.collapse(false);
              storedRange.select();
            }
            catch(e)
            {
              /* If this fails, use the range we read explicitly */
              actualRange.pasteHTML(value);
              actualRange.collapse(false);
              actualRange.select();
            }
          }

         return true;
        }
      },

      "default" : function (value, commandObject)
      {
        /* Body element must have focus before executing command */
        this.__editorInstance.getContentWindow().focus();

        var returnValue = this.__doc.execCommand(commandObject.identifier, false, value);

        /* (re)-focus the editor after the execCommand */
        this.__focusAfterExecCommand();
        
        return returnValue;
      }
    }),


    /**
    * Inserts a paragraph when hitting the "enter" key
    *
    * @type member
    * @signature function()
    * @return {Boolean} whether the key event should be stopped or not
    */
    insertParagraphOnLinebreak : qx.core.Variant.select("qx.client",
    {
      "gecko" : function()
      {
        // get the current styles as structure
        var helperStyleStructure = this.__getCurrentStylesGrouped();
        
        // check for "text-align" -> this has to be applied at the paragraph
        // element instead of the inner span elements
        var textAlign = "";
        if (helperStyleStructure.child["text-align"])
        {
          textAlign = ' style="text-align:' + helperStyleStructure.child["text-align"] + ';"';
          delete helperStyleStructure.child["text-align"];
        }
        // generate the span elements to preserve the styling
				var helperStyle = this.generateHelperString(helperStyleStructure);
				
				/* Generate unique ids to find the elements later */
				var spanId = "__placeholder__" + Date.parse(new Date());
				var paragraphId = "__paragraph__" + Date.parse(new Date());

				var helperString = '<span id="' + spanId + '"></span>';
				var paragraphString = '<p id="' + paragraphId + '"' + textAlign + '>';
				
				var spanNode;
				var paragraphNode;
				var brNode;

        /* 
         * A paragraph will only be inserted, if the paragraph before it has content.
         * Therefore we also insert a helper node, then the paragraph and the style
         * nodes after it.
         */
        this.execute("inserthtml", helperString + paragraphString + helperStyle);

        /* Fetch elements */
        spanNode      = this.__doc.getElementById(spanId);
        paragraphNode = this.__doc.getElementById(paragraphId);

        /* We do net need to pollute the generated HTML with IDs */
        paragraphNode.removeAttribute("id");

        /*
         * If the previous paragraph only contains the helperString, it was empty before.
         * Empty paragraphs are problematic in Gecko, because they are not rendered properly.
         */
        if(paragraphNode.previousSibling.innerHTML == helperString)
        {
          var helperNodeFragment = this.__generateHelperNodes();
          brNode             = this.__doc.createElement("br");

          var mozDirty = this.__doc.createAttribute("_moz_dirty");
          mozDirty.nodeValue = "";
          brNode.setAttributeNode(mozDirty);

          var type     = this.__doc.createAttribute("type");
          type.nodeValue = "_moz"; 
          brNode.setAttributeNode(type);

          /* Insert a bogus node to set the lineheight and the style nodes to apply the styles. */
          paragraphNode.previousSibling.appendChild(helperNodeFragment);
          paragraphNode.previousSibling.appendChild(brNode);

          //paragraphNode.previousSibling.innerHTML = styleNodes + '<br _moz_dirty="" type="_moz"/>'; 
        }
        /* We do net need to pollute the generated HTML with IDs */
        spanNode.removeAttribute("id");

        return true;
      },

      /**
       * Webkit does not copy the paragraph's background color, and text
       * alignment so do this manually.
       */
      "webkit" : function()
      {

        var styles = this.getCurrentStyles();
        var elementStyleString = "";

        // We need to copy the background color and text alignment for Webkit
        var relevantStyles = {
          "background-color" : true,
          "text-align": true
        };

        // Iterate over current styles and save relevant ones to string.
        for(var style in styles)
        {
          if (relevantStyles[style]) {
            elementStyleString += style + ":" + styles[style] + ";"
          }
        }

        // Insert the HTML containing the generated style string.
        this.__editorInstance.insertHtml("<p style='" + elementStyleString + "'><br class='webkit-block-placeholder' />");
      },

      "default" : function(){}
      }),


     /**
      * ONLY IE
      * Inserts a simple linebreak ('<br>') at the current position.
      * 
      * @type member
      * @return {Boolean} Returns true if an br element is inserted
      */
     __insertBrOnLinebreak : qx.core.Variant.select("qx.client", 
     {
       "mshtml" : function()
       {
         var rng = this.__editorInstance.getRange();
         var parentElement = rng.parentElement().nodeName.toLowerCase();
         
         /* 
          * Only insert the "br" element if we are currently NOT inside a list.
          * If we are return "false" to let the browser handle this (event is not stopped).
          */
         if (parentElement != "li")
         {
           rng.pasteHTML(htmlarea.HtmlArea.simpleLinebreak);
           rng.collapse(false);
           rng.select();
           
           return true;
         }
                
         return false;
       },
       
       "default" : function()
       {
         return false;
       }
     }),
     

     /**
      * Helper function to set a text align on a range.
      * In IE we need to explicitly get the current range before executing
      * the font size command on it.
      *
      * @type member
      * @param value {String} text align value
      * @param commandObject {Object} command object
      * @return {Boolean} Success of operation
      */
     __setTextAlign : function(value, commandObject)
     {
       /* Get Range for IE, or document in other browsers */
       var commandTarget = qx.core.Variant.isSet("qx.client", "mshtml") ? this.getCurrentRange() : this.__doc; 

       /* Execute command on it */
       var returnValue = commandTarget.execCommand(commandObject.identifier, false, value);

       /* Focus the editor */
       this.__focusAfterExecCommand();

       return returnValue;
     },



     /**
      * Helper function to set a text align on a range.
      * In IE we need to explicitly get the current range before executing
      * the font size command on it.
      *
      * @type member
      * @param value {String} text align value
      * @param commandObject {Object} command object
      * @return {Boolean} Success of operation
      */
     __setInOutdent : qx.core.Variant.select("qx.client",
     {
        "webkit" : function(value, commandObject)
        {
          /* Current selection */
          var sel = this.__editorInstance.__getSelection();
          var node = sel.focusNode.parentNode;

          var range = sel.getRangeAt(0);
          var ancestor = range.commonAncestorContainer;
          var children = ancestor.childNodes;
          var marginLeft;

          /**
           * Selection is collapsed, we just need to indent or outdent a single element.
           */
          if (sel.isCollapsed)
          {
            marginLeft = this.__calculateMargin(node, commandObject.identifier);
            node.style.marginLeft = marginLeft;
          }
          else
          {
            /*
             * We have a (possible) selection over more than one element.
             * Loop over all children inside the selection ans set the margin.
             */
            for(var i=0, j=children.length; i<j; i++)
            {
              if(sel.containsNode(children[i]))
              {
                marginLeft = this.__calculateMargin(children[i], commandObject.identifier);
                children[i].style.marginLeft = marginLeft;
              }
            }

            // The anchor node is a text node, so calculate and set the margin on its parent
            if(sel.anchorNode.nodeType == 3)
            {
              marginLeft = this.__calculateMargin(sel.anchorNode.parentElement, commandObject.identifier);
              sel.anchorNode.parentElement.style.marginLeft = marginLeft;
            }
            // The anchor node is a element node, so calculate and set the margin on itself
            else if (sel.anchorNode.nodeType == 1)
            {
              marginLeft = this.__calculateMargin(sel.anchorNode, commandObject.identifier);
              sel.anchorNode.style.marginLeft = marginLeft;
            }

            // The focus node is a text node, so calculate and set the margin on its parent
            if(sel.focusNode.nodeType == 3)
            {
              marginLeft = this.__calculateMargin(sel.focusNode.parentElement, commandObject.identifier);
              sel.focusNode.parentElement.style.marginLeft = marginLeft;
            }
            // The focus node is a element node, so calculate and set the margin on itself
            else if (sel.focusNode.nodeType == 1)
            {
              marginLeft = this.__calculateMargin(sel.focusNode, commandObject.identifier);
              sel.focusNode.style.marginLeft = marginLeft;
            }
          }


          return true;
        },

        "default" : function(value, commandObject)
        {
          /* Get Range for IE, or document in other browsers */
          var commandTarget = qx.core.Variant.isSet("qx.client", "mshtml") ? this.getCurrentRange() : this.__doc;

          /* Execute command on it */
          var returnValue = commandTarget.execCommand(commandObject.identifier, false, value);

          /* Focus the editor */
          this.__focusAfterExecCommand();

          return returnValue;
        }
      }),

      /**
       * Calculates the new margin for the given element based on the command identifier.
       *
       * @param node {Object} DOM element from which the margin should be calculated
       * @param identifier {Object} command object
       * @return {String} Calculated margin in pixel and "px".
       */
      __calculateMargin : function(node, identifier)
      {
        var marginValue = node.style.marginLeft;
        var pos = marginValue.indexOf("px");
        var level, marginLeft;

        // No margin set
        if (pos == -1) {
          level = 0;
        }
        else
        {
          // Remove "px" from integer value
          var tmp = marginValue.split("px");
          level = Math.abs(tmp[0]);
        }

        if (identifier == "Indent")
        {
          marginLeft = (level + 20) + "px";
        }
        else
        {
          if (level > 0) {
            marginLeft = (level - 20) + "px";
          } else {
            marginLeft = "0px";
          }
        }

        return marginLeft;
      },
     
     /**
      * Inserts a list.
      * Ensures that the list is inserted without indents. If any indents are
      * present they are removed. 
      * For IE the indents have to removed before the list is inserted and for 
      * Webkit it is necessary to remove the blockquotes after the insertion.
      * 
      * @type member
      * @param value {String} value of the command
      * @param commandObject {Object} command object
      * @return {Boolean} Success of operation
      */
     __insertList : function(value, commandObject)
     {
       // See http://bugzilla.qooxdoo.org/show_bug.cgi?id=1608 for details
       if (qx.core.Variant.isSet("qx.client", "mshtml"))
       {
         // Get the focusNode as starting node for looking after blockquotes. 
         var focusNode = this.__editorInstance.getFocusNode();
         this.__manualOutdent(focusNode);
       }
       
       /* Body element must have focus before executing command */
       this.__editorInstance.getContentWindow().focus();

       // If a saved range is available use it
       var target = this.__currentRange !== null ? this.__currentRange : this.__doc;
       var returnValue = target.execCommand(commandObject.identifier, false, value);
       
       /* (re)-focus the editor after the execCommand */
       this.__focusAfterExecCommand();
       
       if (qx.core.Variant.isSet("qx.client", "webkit"))
       {
         // Get the parent of the current focusNode as starting node for 
         // looking after blockquotes for webkit.
         var focusNode = this.__editorInstance.getFocusNode();
         this.__manualOutdent(focusNode.parentNode);
       }
       
       return returnValue;
     },
     
     
     /**
      * This little helper method takes a node as argument and looks along the 
      * parent hierarchy for any "blockquote" elements and removes them.
      * 
      * @type member
      * @param startNode {Node} starting point of the lookup
      * @return {void}
      */
     __manualOutdent : function(startNode)
     {
       var blockquotes = [];
       var parent = startNode.parentNode;
       
       while (parent.nodeName.toLowerCase() == "blockquote")
       {
         blockquotes.push(parent);
         parent = parent.parentNode;
       }
       
       // if indents are found move the focusNode to the current parent
       // -> the first parent node which is *no* blockquote
       if (blockquotes.length > 0)
       {
         // move focus node out of blockquotes
         parent.appendChild(startNode);
         
         // delete blockquote nodes
         // only the last in the array is needed since the it will also remove
         // the child "blockquote" elements
         parent.removeChild(blockquotes[blockquotes.length-1]);
       }
     },



    /**
     * Inserts an image
     * 
     * @type member
     * @param attributes {Map} map with attributes which should be applied (e.g. "src", "border", "width" and "height")
     * @param commandObject {Object} command object
     * @return {Boolean} Success of operation
     */
     __insertImage : qx.core.Variant.select("qx.client", {
       "gecko" : function(attributes, commandObject)
       {
         /* Only insert an image if the src attribute info is available */
         if (attributes.src)
         {
           /* Insert the image via the execCommand and add the attributes afterwards */
           this.__doc.execCommand(commandObject.identifier, false, attributes.src);
           
           /* Remove the "src" attribute from the map */
           delete attributes.src;
           
           /* Get the image node */
           var sel = this.__editorInstance.__getSelection();

           // TODO: need to revert the execCommand if no selection exists?
           if (sel)
           {
             var anchorNode = sel.anchorNode;
             var offset = sel.anchorOffset;
             var img = anchorNode.childNodes[offset-1];
             
             var attrNode;
             for (var attribute in attributes)
             {
               attrNode = this.__doc.createAttribute(attribute);
               attrNode.nodeValue = attributes[attribute];
               
               img.setAttributeNode(attrNode);
             }
             
             // Gecko does not transfer the styles of the previous sibling to the 
             // element which comes right after the inserted image.
             // -> we have to insert a corresponding span element for ourselves
             
             // these elements can have influence on the format
             var formatElements = { "font": true,
                                    "span": true };
             var startNode = null;
             var sibling = true;
             
             // check if the image is one the same hierarchy level
             // IMPORTANT: if e.g. the user copy-and-pastes a text styled with
             // FONT elements Gecko does add the image inside this font element
             if (qx.dom.Node.isElement(img.previousSibling) && formatElements[img.previousSibling.nodeName.toLowerCase()])
             {
               startNode = img.previousSibling;
             }
             else if (formatElements[img.parentNode.nodeName.toLowerCase()])
             {
               startNode = img.parentNode;
               sibling = false;
             }
             
             // documentFragment - will hold the span(s)
             var documentFragment = this.__doc.createDocumentFragment();
             var inline;
             
             if (sibling && startNode != null)
             {
               // if the image is a sibling of the format elements we have to
               // check for the current styles and apply them with span element(s)
               var formatElements = this.__generateImageFormatElements(startNode);
               
               // append the elements to the documentFragment
               documentFragment.appendChild(formatElements.root);
               
               // set the inline element to later insert a text node
               inline = formatElements.inline;
             }
             else
             {
               // if the image is within a e.g. "font" element or a "font" 
               // element with several nested "span" elements
               // -> just add a "span" element and use the inheritance
               inline = this.__doc.createElement("span");
               documentFragment.appendChild(inline);
             }
               
             // the inner-most span needs a TextNode for selection
             var inlineText = this.__doc.createTextNode("");
             inline.appendChild(inlineText);
             
             // get the image parent node 
             var imageParent = img.parentNode;
             
             // image is last child -> append
             if (img == imageParent.lastChild)
             {
               imageParent.appendChild(documentFragment);
             }
             // image is anywhere in between -> use nextSibling 
             else
             {
               imageParent.insertBefore(documentFragment, img.nextSibling);
             }
             
             // get the current range and select the *content* of the new span
             var rng = this.__editorInstance.getRange();
             rng.selectNodeContents(inline);
           }
           
           return true;
         }
         else
         {
           return false;
         }
       },

       "mshtml" : function(attributes, commandObject)
       {
         /* Put together the HTML for the image */
         var img = "<img ";
         for (var attrName in attributes)
         {
           img += attrName + "='" + attributes[attrName] + "' ";
         }
         img += "/>";

         /* 
          * IE *does not* support the "insertHtml" command and
          * the "insertImage" command is not sufficient.
          * We need to add the given attributes to the image, so the
          * only working solution is to use the "pasteHTML" method of the
          * TextRange Object. 
          */
         var currRange = this.getCurrentRange();

         try
         {
           currRange.select();

           currRange.pasteHTML(img);
         }
         catch (exc)
         {
           // we can't pasteHtml so we check if we have selected an image and
           // replaces all attributes
           if (this.__lastSelectionType.toLowerCase() == "control")
           {
             if (currRange && currRange.length > 0)
             {
               var item = currRange(0);
               item.setAttribute("border", "0");
               item.setAttribute("hight",  "auto");
               item.setAttribute("width",  "auto");

               if (item.tagName.toLowerCase() == "img")
               {
                 for (var attrName in attributes)
                 {
                   item.setAttribute(attrName, attributes[attrName]);
                 }
               }
             }
           }
         }
       },

       "default" : function(attributes, commandObject)
       {
         /* For all other browsers use the execCommand directly */
         return this.__doc.execCommand(commandObject.identifier, false, attributes.src);  
       }
     }),
     
     
     /**
      * Generate "span" elements to "save" the formatting after an image
      * was inserted.
      * 
      * @param startNode {Node} start node for getting current styles
      * @return {Node} format elements
      */
     __generateImageFormatElements : function(startNode)
     {
       // be sure to check for childs of the previous sibling
       // e.g. a font element with a nested span inside
       while (startNode.firstChild && startNode.firstChild.nodeType == 1)
       {
         startNode = startNode.firstChild;
       }
       
       // get the current style of this element
       var grouped = this.__getCurrentStylesGrouped(startNode);
       
       var root, inlineStyle, legacyFont; 
       var styles = "";
       var parent = null;
       var inline = null;
       var child = grouped.child;
       
       while (child)
       {
         // Since non-default font sizes are managed by "font" tags with "size"
         // attributes it is necessary to handle this in a special way
         // if a "legacy-font-size" entry is within the grouped styles it is 
         // necessary to create a font element to achieve the correct format
         inline = this.__doc.createElement(child["legacy-font-size"] ? "font" : "span");
         
         inlineStyle = this.__doc.createAttribute("style");
         inline.setAttributeNode(inlineStyle);
         
         // apply the styles
         for (var styleKey in child)
         {
           if (styleKey != "child" && styleKey != "legacy-font-size")
           {
             styles += styleKey + ":" + child[styleKey] + ";";
           }
           else if (styleKey == "legacy-font-size")
           {
             legacyFont = this.__doc.createAttribute("size");
             legacyFont.nodeValue = child[styleKey];
             inline.setAttributeNode(legacyFont);
           }
         }
         inlineStyle.nodeValue = styles;
         
         if (parent != null)
         {
           parent.appendChild(inline);
         }
         else
         {
           root = inline;
         }
         
         parent = inline;
         child = child.child;
         styles = "";
       }
       
       return { root : root,
                inline : inline };
     },


     /**
      * Inserts a hyperlink. In Gecko browser these is achieved by
      * inserting DOM nodes.
      * IE is using the "CreateLink" execCommand.
      * 
      * @type member
      * @param url {String} url to insert
      * @param commandObject {Object} command object
      * @return {Boolean} result
      */
     __insertHyperLink : qx.core.Variant.select("qx.client",
     {
       "gecko" : function(url, commandObject)
       {
         var sel      = this.__editorInstance.__getSelection();
         var rng      = this.__editorInstance.__createRange(sel);

         /* 
          * SPECIAL CASE
          * If the selection is collapsed insert a link with
          * the URL as text.
          */
         if (sel.isCollapsed)
         {
           /* Only use the link id for links which are based on a collapsed selection */
           var linkId   = "qx_link" + (++this.__hyperLinkId);
           
           /* Create and insert the link as DOM nodes */
           var linkNode = this.__doc.createElement("a");
           var hrefAttr = this.__doc.createAttribute("href");
           var idAttr   = this.__doc.createAttribute("id");
           var linkText = document.createTextNode(url);
           
           idAttr.nodeValue   = linkId;
           linkNode.setAttributeNode(idAttr);
           
           hrefAttr.nodeValue = url;
           linkNode.setAttributeNode(hrefAttr);
           
           linkNode.appendChild(linkText);
           rng.insertNode(linkNode);
           rng.selectNode(linkNode);
           
           sel.collapseToEnd();
           
           return true;
         }
         else
         {
           /* Use the execCommand if any selection is available */
           return this.__doc.execCommand(commandObject.identifier, false, url);
         }
       },
       
       "mshtml" : function(url, commandObject)
       {
         /* 
          * Check for a valid text range. If it is available (=text selected) insert the
          * link via the "insertLink" execCommand otherwise insert the link with the URL 
          * as link text.  
          */
         try
         {
           if (this.__currentRange != null && this.__currentRange.text != "")
           {
             return this.__currentRange.execCommand(commandObject.identifier, false, url);
           }
           else
           {
             return this.__insertHtml(' <a href="' + url + '">' + url + '</a> ', commandObject);
           }
         } 
         catch(e)
         {
           if (qx.core.Variant.isSet("qx.debug", "on"))
           {
             this.debug("inserthyperlink failed!");
           }
           return false;
         }
       },
       
       "default" : function(url, commandObject)
       {
         return this.__doc.execCommand(commandObject.identifier, false, url);
       }
     }),
     
     /**
      * Internal method to insert an horizontal ruler in the document
      *
      * @type member
      * @param value {String} empty value
      * @param commandObject {Object} command infos
      * @return {Boolean} Success of operation
      */
     __insertHr : function(value, commandObject)
     {
       var htmlText = "<hr />";
  
       /*
        * Gecko needs some extra HTML elements to keep
        * the current style setting after inserting the
        * <hr> tag.
        */
       if (qx.core.Variant.isSet("qx.client", "gecko")) {
         htmlText += this.generateHelperString();
       }
  
       return this.__insertHtml(htmlText, commandObject);
     },
     

     /**
      * Helper function which generates a string containing HTML which can be used to apply the
      * current style to an element.
      * 
      * *** ONLY IN USE FOR GECKO ***
      * 
      * @type member
      * @param groupedStyles {Map} Data structure with grouped styles.
      *                            Structure of the "__getCurrentStylesGrouped" method.
      * @return {String} String containing tags with special style settings.
      */
     generateHelperString : function(groupedStyles)
     {
       var formatString = "";
       var spanBegin = '<span style="';
       var closings = [];
       
       // retrieve the current styles as structure if no parameter is given
       var structure = groupedStyles != null ? groupedStyles : this.__getCurrentStylesGrouped();
       
       // first traverse the "child" chain
       var child = structure.child;
       var legacyFont = false;
       while (child)
       {
         legacyFont = child["legacy-font-size"] != null;
         
         // Since non-default font sizes are managed by "font" tags with "size"
         // attributes it is necessary to handle this in a special way
         // if a "legacy-font-size" entry is within the grouped styles it is 
         // necessary to create a font element to achieve the correct format
         formatString += legacyFont ? '<font style="' : spanBegin;         
         for (var style in child)
         {
           formatString += (style != "child" && style != "legacy-font-size") ? style + ':' + child[style] + ';' : "";
         }
         formatString += legacyFont ? '" size="'+ child["legacy-font-size"] +'">' : '">';
         
         // memorize the element to close and adjust object structure
         closings.unshift(legacyFont ? "</font>" : "</span>");
         child = child.child;
       }
       
       // SPECIAL CASE: only one font element
       // Gecko "optimizes" this by removing the empty font element completely
       if (closings.length == 1 && closings[0] == "</font>")
       {
         formatString += "<span></span>";
       }
       
       // close the elements
       for (var i=0, j=closings.length; i<j; i++)
       {
         formatString += closings[i];
       }
       
       return formatString;
     },
     

     /**
      * Helper function which generates a documentFragment of <span>-tags 
      * which can be used to apply the current style to an element.
      * 
      * *** ONLY IN USE FOR GECKO ***
      * 
      * @type member
      * @return {DocumentFragment} documentFragment containing styled elements
      */
     __generateHelperNodes : function()
     {
       var fragment = this.__doc.createDocumentFragment();
       
       // retrieve the current styles as structure
       var structure = this.__getCurrentStylesGrouped();
       
       // first traverse the "child" chain
       var parent = fragment; 
       var child = structure.child;
       var element;
       var legacyFont = false;
       while (child)
       {
         legacyFont = child["legacy-font-size"] != null;
         
         element = this.__doc.createElement(legacyFont ? "font" : "span");
         parent.appendChild(element);
         
         // attach styles
         for (var style in child)
         {
           if (style != "child" && style != "legacy-font-size")
           {
             qx.bom.element.Style.set(element, style, child[style]);
           }
         }
         
         if (legacyFont)
         {
           var sizeAttr = this.__doc.createAttribute("size");
           sizeAttr.nodeValue = child["legacy-font-size"];
           element.setAttributeNode(sizeAttr);
         }
         
         parent = element;
         child = child.child;
       }
       
       return fragment;
     },
     
     
     /**
      * Works with the current styles and creates a hierarchy which can be 
      * used to create nodes or strings out of the hierarchy.
      * 
      * *** ONLY IN USE FOR GECKO ***
      * 
      * @param elem {Node ? null} optional element as root node
      * @return {Map} Hierarchy with style information 
      */
     __getCurrentStylesGrouped : function(elem)
     {
       var grouped = {};
       var child = null;
       
       /* Fetch current styles */
       var collectedStyles = this.getCurrentStyles(elem);
       
       child = grouped.child = {};
       
       /* Cycle over collected styles and generate output string */
       for(var attribute in collectedStyles)
       {
         // "text-decoration" is special
         if (attribute != "text-decoration")
         {
           child[attribute] = collectedStyles[attribute];
         }
       }
       
       // Check for any text-decorations -> special handling, because one has
       // create for each text-decoration one corresponding span element to 
       // ensure the correct rendering in Gecko
       if (collectedStyles["text-decoration"])
       {
         var textDecorations = collectedStyles["text-decoration"];
         
         /*
          * An extra <span> is needed for every text-decoration value,
          * because the color of a decoration is based on the element's color. 
          */
         for(var i=0, j=textDecorations.length; i<j; i++)
         {
           if (child == null)
           {
             child = grouped.child = {};
           }
           else
           {
             child = child.child = {};
           }
           
           child['color'] = textDecorations[i]['color'];
           child['text-decoration'] = textDecorations[i]['text-decoration'];
         }
       }
       
       // SPECIAL HANDLING
       // if any "text-decoration" is used it is necessary to add an extra inner 
       // child to make sure an inner span is created which holds the color 
       if (collectedStyles['color'] && collectedStyles['text-decoration'])
       {
         child = child.child = {};
         child['color'] = collectedStyles['color'];
       }   
       
       return grouped;
     },
     

     /**
      * Internal helper function which retrieves all style settings, which are set
      * on the focus node and saves them on a span element.
      *
      * @type member
      * @param elem {Element ? null} optional element reference the lookup should start
      * @return {Map} map with all style settings with style attributes as keys.
      */
     getCurrentStyles : function(elem)
     {
       if (elem == null)
       {
         /* Current selection */
         var sel = this.__editorInstance.__getSelection();
         
         /* Check the focusNode - if not available return a empty map */
         if (!sel || sel.focusNode == null)
         {
           return {};
         }
         
         /* Get HTML element on which the selection has ended */
         elem = (sel.focusNode.nodeType == 3) ? sel.focusNode.parentNode : sel.focusNode;
       }

       /*
        * Name of styles, which apply on the element, will be saved here.
        */
       var usedStyles = {};

       /* This map will be build to save the style settings over the <hr> element. */
       var styleSettings = {};
  
       /* Retrieve element's computed style. */
       var decoration = this.__editorInstance.getContentWindow().getComputedStyle(elem, null);
  
       /* Get element's ancestors to fetch all style attributes, which apply on element. */
       var parents = qx.dom.Hierarchy.getAncestors(elem);

       /* List of parent elements plus the element itself. */
       var elementAndParents = qx.lang.Array.insertBefore(parents, elem, parents[0]);

       /* Helper vars */
       var styleAttribute;
       var styleValue;
       var i, j;

       /* Read style attributes set on element and all parents */
       for(i=0; i<elementAndParents.length; i++)
       {
         elem = elementAndParents[i];
         /* Cycle though style properties */
         for (j=0; j<elem.style.length; j++)
         {
           styleAttribute = elem.style[j];
           if (styleAttribute.length > 0)
           {
             /* We only need the names of the attributes */
             usedStyles[styleAttribute] = true;
           }
         }

         /*
          * We need to save the font size, which is set on font tags,
          * separately.
          */
         if( (elem.tagName.toUpperCase() == "FONT") && (elem.size) )
         {
           usedStyles["legacy-font-size"] = elem.size;
         }

       } // for


       /* Cycle through saved style names and fetch computed value for each of it. */
       for(var style in usedStyles)
       {
         styleValue = decoration.getPropertyValue(style);

         /* 
          * The attribute "background-color" is special, since it can have "transparent" as value.
          * In this case, we have to retrieve the _real_ color value from a parent element
          */
         if( (style == "background-color") && (styleValue == "transparent") )
         {
           styleSettings[style] = this.__getBackgroundColor(parents);
         }
         /*
          * The attribute "text-decoration" is even more special. ;-) __getTextDecorations() generates an
          * array containing all text-decoration styles and colors, that are visible on element.
          */
         else if(style == "text-decoration")
         {
           styleSettings[style] = this.__getTextDecorations(elementAndParents);
         }
         /*
          * We need to treat font-size special ...
          */
         else if(style == "legacy-font-size")
         {
           styleSettings[style] = usedStyles[style];
         }
         else
         {
           /* Store all other style values */
           styleSettings[style] = styleValue;
         }
       }

       return styleSettings;
     },


     /**
      * Helper function which walks over all given parent
      * elements and stores all text-decoration values and colors. 
      * 
      * Returns an array containing all computed values of "text-decoration"
      * and "text-color".
      *
      * @type member
      * @param parents {Array} List with element's parents.
      * @return {Array} List containing style information about element's parents.
      */
     __getTextDecorations : function(parents)
     {
       var elem, decorationValue, colorValue;
       var decorationValues = [];

       /* Cycle through parents */
       for(var i=0; i<parents.length; i++)
       {
         elem = parents[i];

         /* Retrieve computed style */
         var parentDecoration = this.__editorInstance.getContentWindow().getComputedStyle(elem, null);
         
         /* Store values */
         decorationValue = parentDecoration.getPropertyValue("text-decoration");
         colorValue = parentDecoration.getPropertyValue("color");

         /* Check if text-decoration is valid */
         if (decorationValue != "none")
         {
           /* Add parent's decoration style values to array */
           decorationValues.push({
             'text-decoration' : decorationValue,
             'color'           : colorValue
           });
         }
       }

       /* Return collected values */
       return decorationValues;
     },


     /**
      * Helper function which walks over all given parent
      * elements and searches for an valid value for "background-color". 
      * 
      * Returns the computed value of "background-color" of one parent
      * element, if it contains a _real_ color. 
      *
      * @type member
      * @param parents {Array} List with element's parents.
      * @return {String} Background color value. 
      */
     __getBackgroundColor : function(parents)
     {
       var elem, parentDecoration, parentStyleValue;

       /* Cycle through parents */
       for(var i=0; i<parents.length; i++)
       {
         elem = parents[i];

         /* Retrieve computed style*/
         parentDecoration = this.__editorInstance.getContentWindow().getComputedStyle(elem, null);
         parentStyleValue = parentDecoration.getPropertyValue("background-color");

         /* Check if computed value is valid */
         if (parentStyleValue != "transparent")
         {
           /* Return computed value */
           return parentStyleValue;
         }

       }
     },

     /**
      * Internal method to change the font size of the selection.
      * Most of the code is used to change the size of the bullet points
      * synchronous to it's content.
      *
      * @type member
      * @param value {String} font size number (as used for <font> tags)
      * @param commandObject {Object} command infos
      * @return {Boolean} Success of operation
      */
     __setFontSize : function(value, commandObject)
     {
       /* Current selection and range */
       var sel = this.__editorInstance.__getSelection();

       var rng = (qx.core.Variant.isSet("qx.client", "mshtml")) ?
           this.getCurrentRange() :
           rng = sel.getRangeAt(0);
       
       /* <ol> or <ul> tags, which are selected, will be saved here */
       var lists = [];

       /* Flag indicating whether a whole <li> tag is selected  */
       var listEntrySelected;
       
       /* Helper vars */
       var listTypes = ["OL", "UL"];
       var tmp, i, j, element;

       /*
        * At first the selection is examined to figure out
        * a) whether several lists or
        * b) one single <ol> or <li> tag is selected 
        */

       /* Fetch selected element node to examine what is inside the selection */
       element = (qx.core.Variant.isSet("qx.client", "mshtml")) ?
           rng.parentElement() :
           rng.commonAncestorContainer; 

       /* If it is the <body> tag, a whole bunch of elements has been selected */
       if (element.tagName == "BODY")
       {
         for (i=0; i<listTypes.length; i++)
         {
           /* Search for list elements... */
           tmp = element.getElementsByTagName(listTypes[i]);
           for (j=0; j<tmp.length; j++)
           {
             if (tmp[j])
             {
               /* ... and add them to list */
               lists.push(tmp[j]);
             }
           }
         }
       }
       /* A list tag has been (possibly only partly) selected */
       else if(qx.lang.Array.contains(listTypes, element.tagName))
       {
         lists.push(element);
       }

       /* We have found some list elements */
       if(lists.length > 0)
       {
         /* Walk through all list elements and check if they are selected */
         for(i=0; i<lists.length; i++)
         {
           var listElement = lists[i];
  
           /* 
            * Check if the entire list element has been selected.
            * 
            * Note: If more than one element is selected in IE,
            * they are all selected completely. This is a good thing, since
            * IE does not support anchorOffset or nodeOffset. :-)
            */
           listEntrySelected = (qx.core.Variant.isSet("qx.client", "mshtml")) ?
               /*
                * Element is selected or <body> tag is selected
                * (in this case, the list item inside the selection is selected, too)
                */
               ( (listElement == element) || (element.tagName == "BODY") ) :

               /* In other browsers, we can test more preciously */
               sel.containsNode(listElement, false);
  
           /* Walk through all list entries in list element: */
           for(j=0; j<listElement.childNodes.length; j++)
           {
             var listEntryElement = listElement.childNodes[j];
  
             /*
              * Anchor node and focus nodes are special:
              * 1. they are always text nodes
              * 2. the selection "stops" on the text nodes, so that it's parent element is not completely selected
              * 
              * For these reasons, focus node and anchor node are checked separately 
              */
             if(
               /*
                * Whole list is selected
                * Note: IE will never come further than this line
                */
               listEntrySelected ||

               /* Check if the complete focus text node selected */
               (
                   sel.focusNode.nodeValue &&
                   qx.dom.Hierarchy.contains(listEntryElement, sel.focusNode) &&
                   (sel.focusOffset == sel.focusNode.nodeValue.length)
               ) ||

               /* Check if the complete anchor text node selected */
               (
                   qx.dom.Hierarchy.contains(listEntryElement, sel.anchorNode) &&
                   (sel.anchorOffset == 0)
               ) ||

               /* Otherwise, check if the actual <li> tag is completely(!) selected */
               (sel.containsNode(listEntryElement, false))
             )
             {
               /* Set font size on <li> tag */
               listEntryElement.style.fontSize = (this.__fontSizeNames[value] || value) + "px";
             } // if

           } // for
         } // for

       /* No lists are selected */
       }else{

         /* Check if element is inside a list entry */
         
         /* Retrieve selected element node */
         var parentElement = (qx.core.Variant.isSet("qx.client", "mshtml")) ? element : sel.focusNode;

         /* Get all parents */
         var parents = qx.dom.Hierarchy.getAncestors(parentElement);
         for(i=0; i<parents.length; i++)
         {

           /* Element is a list entry */
           if(parents[i].tagName == "LI") {
             
             if
             (
               (
                 (qx.core.Variant.isSet("qx.client", "gecko"))
                 &&
                 (
                   /* Selection starts at the beginning... */
                   (sel.anchorOffset == 0) &&
    
                   /* ... and ends at the end of list entry's content*/
                   (sel.focusNode.nodeValue && (sel.focusOffset == sel.focusNode.nodeValue.length) ) &&
    
                   /* Selection starts inside the list entry's first child... */
                   qx.dom.Hierarchy.contains(parents[i].firstChild, sel.anchorNode) &&
    
                   /* ... and ends inside the last child */
                   qx.dom.Hierarchy.contains(parents[i].lastChild, sel.focusNode)
                  )
               )
               ||
               (
                 /* In IE just check if the HTML of the range is equal to the actual list entry */
                 (qx.core.Variant.isSet("qx.client", "mshtml")) &&
                 (rng.htmlText == parents[i].innerHTML)
               )
             ){
               /* Set font size on <li> tag */
               parents[i].style.fontSize = (this.__fontSizeNames[value] || value) + "px";
             }

             /* We only need to modify the nearest <li> tag */
             break;

           } // if
         } // for
           
       }

       /* Focus and select range in IE before executing command */
       if (qx.core.Variant.isSet("qx.client", "mshtml"))
       {
         this.__doc.body.focus();

         // if we have actually an existing range we have to select it
         if (this.__currentRange)
         {
           this.__currentRange.select();
         }
       }
       /*
        * Gecko uses span tags to save the style settings over block elements.
        * These span tags contain CSS which has a higher priority than the
        * font tags which are inserted via execCommand().
        * For each span tag inside the selection the CSS property has to be 
        * removed to hand over the control to the font size value of execCommand().
        */
       else if(qx.core.Variant.isSet("qx.client", "gecko"))
       {
         var parent = rng.commonAncestorContainer;

         /* Check if selection is a DOM element */
         if(parent.nodeType === 1)
         {
           /* 
            * Remove the font size property if it is available, otherwise it 
            * will interfere with the setting of the "font" element.
            * If we try to set the font size with the CSS property we will
            * have to transform the font sizes 1-7 to px values which will 
            * never work out correctly.
            */
           var spans = parent.getElementsByTagName("span");
           for (i=0; i<spans.length; i++) {
             if (spans[i].style.fontSize)
             {
               spans[i].style.fontSize = null;
             }
           }
         }
       }

       /* Execute command on selection */
       return this.__doc.execCommand("FontSize", false, value);
     },


     /**
      * Internal method to set a background color for text.
      * Special implementation for Webkit to imitate the behaviour of IE.
      * If the selection is collapsed Webkit sets the background color
      * to the whole word which is currently under the caret.
      *
      * @param value {String} color to set
      * @param commandObject {Object} command infos
      * @return {Boolean} success of operation
      */
     __setTextBackgroundColor : qx.core.Variant.select("qx.client", {
       "mshtml" : function(value, commandObject)
       {
         /* Body element must have focus before executing command */
         this.__doc.body.focus();

         /* Select range if it exists */
         if (this.__currentRange) {
           this.__currentRange.select();
         }

         this.__doc.execCommand("BackColor", false, value);

         /* Focus the editor */
         this.__focusAfterExecCommand();
         return true;
       },

       "gecko|opera" : function(value, commandObject)
       {
         /* Body element must have focus before executing command */
         this.__doc.body.focus();
         
         this.__doc.execCommand("HiliteColor", false, value);
         
         /* Focus the editor */
         this.__focusAfterExecCommand();
       },
       
       "webkit" : function(value, commandObject) 
       {
         var sel = this.__editorInstance.__getSelection();
         var rng = this.getCurrentRange();
         
         /* check for a range */
         if (!sel.isCollapsed)
         {
            /* Body element must have focus before executing command */
            this.__doc.body.focus();
           
           this.__doc.execCommand("BackColor", false, value);
           
           /* Focus the editor */
           this.__focusAfterExecCommand();
           
           /* collapse the selection */
           sel.collapseToEnd();
           
           return true;
         }
         else
         {
           /* 
            * Act like an IE browser 
            * -> if the selection is collapsed select the whole word and
            * perform the action on this selection.
            */
           var right  = sel.anchorOffset;
           var left   = sel.anchorOffset;
           var rng    = sel.getRangeAt(0);
           var anchor = sel.anchorNode;
           
           /* Check the left side - stop at a linebreak or a space */
           while (left > 0)
           {
             if (anchor.nodeValue.charCodeAt(left) == 160 || anchor.nodeValue.charCodeAt(left) == 32)
             {
               break;
             }
             else
             {
               left--;
             }
           }
           
           /* Check the right side - stop at a linebreak or a space */
           while (right < anchor.nodeValue.length)
           {
             if (anchor.nodeValue.charCodeAt(right) == 160 || anchor.nodeValue.charCodeAt(right) == 32)
             {
               break;
             }
             else
             {
               right++
             }
           }
           
           /* Set the start and end of the range to cover the whole word */
           rng.setStart(sel.anchorNode, sel.anchorNode.nodeValue.charAt(left) == " " ? left + 1 : left);
           rng.setEnd(sel.anchorNode, right);
           sel.addRange(rng);
           
           /* Body element must have focus before executing command */
           this.__doc.body.focus();
           
           this.__doc.execCommand("BackColor", false, value);
           
           /* Focus the editor */
           this.__focusAfterExecCommand();
           
           /* Collapse the selection */
           sel.collapseToEnd();
           
           return true;
         }          
       }
     }),
     
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
      * Sets the background image of the document
      * 
      * @type member
      * @param value {Array} Array consisting of url [0], background-repeat [1] and background-position [2]
      * @param commandObject {Object} command infos
      * @return {Boolean} Success of operation
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
      * Selects the whole text.
      * IE uses an own implementation because the execCommand is not reliable.
      * 
      * @type member
      * @return {Boolean} Success of operation
      */
     __selectAll : qx.core.Variant.select("qx.client", {
       "mshtml" : function(value, commandObject)
       {
         var rng = this.__doc.body.createTextRange();
         rng.select();
         
         return true;
       },
      
       "default" : function(value, commandObject)
       {
         return this.__executeCommand(commandObject.identifier, false, value);
       }
     }),


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
     * @return void
     */
    __focusAfterExecCommand : qx.core.Variant.select("qx.client", {
      
      "mshtml" : function()
      {
        qx.client.Timer.once(function(e)
        {
          /*
           * IE needs to change the activeChild to the editor component
           * otherwise the e.g. pressed button (to set the selected content bold)
           * will receive the following events
           * call _visualizeFocus to get the right feedback to the user (editor is active)
           */
          qx.ui.core.ClientDocument.getInstance().setActiveChild(this.__editorInstance);

          /* 
           * sometimes IE can't select the range, but this is not important, so 
           * we can ignore it
           */
          try
          {
            /* Select range before focus body element */
            var range = this.getCurrentRange();
  
            if (range)
            {
              range.select();
            }
          }
          catch (e)
          {
            this.debug ("can't select range in __focusAfterExecCommand.");
          }

          this.__editorInstance._visualizeFocus();
        }, this, 50);
      },
        
      "webkit" : function()
      {
        /*
         * Webkit needs a mix of both (IE/Gecko). It is needed to (re)set the editor widget
         * as the active child and to focus the editor widget (again).
         */
         qx.client.Timer.once(function(e)
         {
           qx.ui.core.ClientDocument.getInstance().setActiveChild(this);
           this.getContentWindow().focus();
         }, this.__editorInstance, 50);
       },
        
       "default" : function()
       {
         /* for all other browser a short delayed focus on the contentWindow should do the job */
         qx.client.Timer.once(function(e) {
           this.getContentWindow().focus();
         }, this.__editorInstance, 50);
       }
    })
    
  },


  /**
   * Destructor
   */
  destruct : function()
  {
    this._disposeFields("__doc", "__editorInstance", "__commands");
  }
});
