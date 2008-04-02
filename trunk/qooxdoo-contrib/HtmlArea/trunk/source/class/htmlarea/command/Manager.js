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
     * Computed pixel sizes for values size attribute in <font> tag
     */
    __fontSizeNames : [ 10, 12, 16, 18, 24, 32, 48 ],


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
        this.__currentRange = this.__editorInstance.getRange();
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
        textbackgroundcolor   : { useBuiltin : true, identifier : qx.core.Variant.isSet("qx.client", "gecko|opera") ? "Hilitecolor" : "BackColor", method : null },

        backgroundcolor       : { useBuiltin : false, identifier : null, method : "__setBackgroundColor" },
        backgroundimage       : { useBuiltin : false, identifier : null, method : "__setBackgroundImage" },

        justifyleft           : { useBuiltin : false, identifier : "JustifyLeft", method : "__setTextAlign" },
        justifyright          : { useBuiltin : false, identifier : "JustifyRight", method : "__setTextAlign" },
        justifycenter         : { useBuiltin : false, identifier : "JustifyCenter", method : "__setTextAlign" },
        justifyfull           : { useBuiltin : false, identifier : "JustifyFull", method : "__setTextAlign" },

        indent                : { useBuiltin : true, identifier : "Indent", method : null },
        outdent               : { useBuiltin : true, identifier : "Outdent", method : null },

        copy                  : { useBuiltin : true, identifier : "Copy", method : null },
        cut                   : { useBuiltin : true, identifier : "Cut", method : null },
        paste                 : { useBuiltin : true, identifier : "Paste", method : null },
        
        insertorderedlist     : { useBuiltin : true, identifier : "InsertOrderedList", method : null },
        insertunorderedlist   : { useBuiltin : true, identifier : "InsertUnorderedList", method : null },

        inserthorizontalrule  : { useBuiltin : false, identifier : "InsertHtml", method : "__insertHr" },
        insertimage           : { useBuiltin : true, identifier : "InsertImage", method : null },

        inserthyperlink       : { useBuiltin : true, identifier : "CreateLink", method : null },

        selectall             : { useBuiltin : false, identifier : "SelectAll", method : "__selectAll" },
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
        
        /* Flag indicating if range was empty before executing command. Needed for IE bug. */
        var emptyRange = false;

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

          /* 
           * IE has the unwanted behavior to select text after setting font weight to bold.
           * If this happens, we have to collapse the range afterwards.    
           */
          if(command == "Bold")
          {
            var range = this.getCurrentRange();
            /* Check if range is empty */
            if (range.text == "") {
              emptyRange = true;
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
     __insertHtml : function(value, commandObject)
     {
       var ret;

       if (qx.core.Variant.isSet("qx.client", "mshtml"))
       {
         /* Special handling if a "br" element should be inserted */
         if (value == htmlarea.HtmlArea.simpleLinebreak)
         {
           ret = this.__insertBrOnLinebreak(); 
         }
         else
         {
           this.__editorInstance._visualizeFocus();

           /* Exec command on saved range object */
           var range = this.__editorInstance.getStoredRange();

           if(range)
           {
             range.pasteHTML(value);
             range.collapse(false);
             range.select();
           }

           ret = true;
         }
       }
       else
       {
         /* Body element must have focus before executing command */
         this.__doc.body.focus();

         ret = this.__doc.execCommand(commandObject.identifier, false, value);

         /* (re)-focus the editor after the execCommand */
         this.__focusAfterExecCommand();
       }

       return ret;
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
     __setTextAlign : function(value, commandObject)
     {
       /* Get Range for IE, or document in other browsers */
       var commandTarget = qx.core.Variant.isSet("qx.client", "mshtml") ? this.getCurrentRange() : this.__doc; 

       /* Execute command on it */
       return commandTarget.execCommand(commandObject.identifier, false, value);
     },
     

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
        * the current style setting after inserint the
        * <hr> tag.
        */

       if (qx.core.Variant.isSet("qx.client", "gecko")) {
         htmlText += this.__keepStyleAfterBlockElement();
       }
  
       return this.__insertHtml(htmlText, commandObject);
     },


     /**
      * Internal helper function which retrieves all style settings, which are set
      * on the focus node and saves them on a span element.
      *
      * @type member
      * @return {String} the span element.
      */
     __keepStyleAfterBlockElement : function()
     {
       /* Current selection */
       var sel = this.__editorInstance.__getSelection();
       
       /* Get HTML element on which the selection has ended */
       var elem = (sel.focusNode.nodeType == 3) ? sel.focusNode.parentNode : sel.focusNode;

       /*
        * Name of styles, which apply on the element, will be saved here.
        * font-size is stored here as default, because <font size="xy"> does not
        * appear as style property.
        */
       var usedStyles = { "font-size" : true };
       
       /* This string will be build to save the style settings over the <hr> element. */
       var styleSettings = '<span style="';
  
       /* Retrieve element's computed style. */
       var decoration = window.getComputedStyle(elem, null);
  
       /* Get element's ancestors to fetch all style attributes, which apply on element. */
       var parents = qx.dom.Hierarchy.getAncestors(elem);
  
       /* Helper vars */
       var styleAttribute;
       var styleValue;
       var parentStyleValue;
       var parentDecoration;
       var i, j;
       
       /* These style properties have to be handled specially */
       var specialStyles = {
         "background-color" : "transparent",
         "text-decoration"  : "none"
       };
  
       /* 
        * NOTE that element's own styles are read first!
        * Afterwards, cycle through parents.
        */
       for(i=0; i<=parents.length; i++)
       {
         /* Cycle though style properties */
         for (j=0; j<=elem.style.length; j++)
         {
           styleAttribute = elem.style[j];
           if (styleAttribute.length > 0)
           {
             /* We only need the names of the attributes */
             usedStyles[styleAttribute] = true;
           }
         }
         /* Set pointer to element's next parent. */
         elem = parents[i];
       }
  
       /* Cycle through saved style names and fetch computed value for each of it. */
       for(style in usedStyles)
       {
         styleValue = decoration.getPropertyValue(style);
         
         /*
          * For some style properties the element's parents properties
          * have to be examined.
          */
         if( specialStyles[style] && (specialStyles[style] == styleValue) ){
           styleValue = this.__getSpecialStyle(parents, style, styleValue);
         }

         /* Store style settings */
         styleSettings += style + ":" + styleValue + "; ";
       }

       styleSettings += '">';
       
       return styleSettings;
     },


     /**
      * Helper function which walks over all given parent
      * elements and compares the computed value of the selected
      * style property with the given one.
      * 
      * Returns the computed value of a parent element 
      * if it differs in the given on (that means, that the value is usable).
      *
      * @type member
      * @param value {Array} List with element's parents.
      * @param value {String} Style property name.
      * @param value {String} Style value, which can not be used.
      * @return {String} Computed value. 
      */
     __getSpecialStyle : function(parents, styleName, invalidValue)
     {
       var elem, parentDecoration, parentStyleValue;
       var styleSettings = "";

       /* Cycle through parents */
       for(var i=0; i<parents.length; i++)
       {
         elem = parents[i];

         /* Retrieve computed style*/
         parentDecoration = window.getComputedStyle(elem, null);
         parentStyleValue = parentDecoration.getPropertyValue(styleName);

         /* Check if computed value is valid */
         if (parentStyleValue != invalidValue)
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
             if (tmp[j]) {
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
           listElement = lists[i];
  
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
             listEntryElement = listElement.childNodes[j];
  
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

       /* Execute command on selection */
       if (qx.core.Variant.isSet("qx.client", "mshtml")) {
         return rng.execCommand("FontSize", false, value);
       } else {
         return this.__doc.execCommand("FontSize", false, value);
       }

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
