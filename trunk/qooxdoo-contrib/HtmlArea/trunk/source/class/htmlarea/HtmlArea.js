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
     * Michael Haitz (mhaitz)

************************************************************************ */

/**
 * Rich text editor widget
 *
 * @param value {String} Initial content
 * @param styleInformation {String | null} Optional style information for the editor's document
 */
qx.Class.define("htmlarea.HtmlArea",
{
  extend : qx.ui.embed.Iframe,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(value, styleInformation)
  {
    // **********************************************************************
    //   INIT
    // **********************************************************************
    qx.ui.embed.Iframe.call(this);

    /* 
     * set some init values
     */
    this.__isLoaded = false;
    this.setTabIndex(1);
    this.setEnableElementFocus(false);
    this.setHideFocus(true);

    // set the optional style information - if available
    this.__styleInformation = htmlarea.HtmlArea.__formatStyleInformation(styleInformation);

    /**
     * Wrapper method for focus events
     * 
     * @param e {Object} Event object
     */
    this.__handleFocusEvent = qx.lang.Function.bind(this._handleFocusEvent, this);


    /**
     * Wrapper method for mouse events. 
     * The mouse events are primarily needed to examine the current cursor context.
     * The cursor context examines if the current text node is formatted in any manner
     * like bold or italic. An event is thrown to e.g. activate/deactivate toolbar buttons.
     * 
     * @param e {Object} Event object
     */
    this.__handleMouseEvent = qx.lang.Function.bind(this._handleMouseEvent, this);

    if (qx.core.Variant.isSet("qx.client", "mshtml"))
    {
      this.__handleFocusOut = qx.lang.Function.bind(this._handleFocusOut, this);
    }

    /*
     * catch load event - no timer needed which polls if the component is ready and 
     * to set the editor in the "editable" mode.
     */
    this.addEventListener("load", this._loaded);

    /*
     * Catch key events. The DOM key events get transformed to qooxdoo key event objects
     * to use facilities like "keyIdentifier". It is neccesary to catch the events directly 
     * at the editor instance. This is the point to which the qooxdoo key event handler 
     * dispatches all his events.
     */
    this.addEventListener("keyup", this._handleKeyUp);
    this.addEventListener("keydown", this._handleKeyDown);
    this.addEventListener("keypress", this._handleKeyPress);

    /* check for available content */
    if (typeof value == "string") {
      this.__value = value;
    }


    /*
     * "Fix" Keycode to identifier mapping in opera to suit the needs
     * of the editor component
     */
    if (qx.core.Variant.isSet("qx.client", "opera"))
    {
      /*
       * To correct the broken key handling in Opera "fix" the meanings of
       * the several keyCodes manually to the desired Identifiers
       * 
       * However for these keys it is bit more complicated:
       * 
       * KEY   RESULT   POSSIBLE SOLUTION
       * ************************************
       * $     "Home"   SHIFT + "Home"  -> $
       * (     "Down"   SHIFT + "Down"  -> (
       * '     "Right"  SHIFT + "Right" -> '
       * 
       */
      var keyEventHandler = qx.event.handler.KeyEventHandler.getInstance();
    
      /*
       * fix mapping for the keys "#", "-", "P", "S", "X"
       * for other keys there maybe also a problem with the wrong identifier,
       * but here are only these keys fixed which are needed for the smiley handling
       */   
      keyEventHandler._keyCodeToIdentifierMap[35]  = "#";
      keyEventHandler._keyCodeToIdentifierMap[45]  = "-";
      keyEventHandler._keyCodeToIdentifierMap[112] = "P";
      keyEventHandler._keyCodeToIdentifierMap[115] = "S";
      keyEventHandler._keyCodeToIdentifierMap[120] = "X";
    }
  },


 /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events:
  {
    /**
     * Thrown when the editor is loaded.
     */
    "load"             : "qx.event.type.Event",
    
    /**
     * Only available if messengerMode is active. This event returns the current content of the editor.
     */
    "messengerContent" : "qx.event.type.DataEvent",
    
    /**
     * This event consists of two boolean values. These values represent if the text in the current cursor context is bo
     */
    "cursorContext"    : "qx.event.type.DataEvent",
    
    /**
     * This event is dispatched when the editor is ready to use
     */
    "ready"            : "qx.event.type.Event",
    
    /**
     * This event is dispatched when the editor gets the focus and his own handling is done
     */
    "focused"          : "qx.event.type.Event"
  },



  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * formats the style information
     * 
     * @type static
     * @param styleInformation {Map}
     * @return {String}
     */
    __formatStyleInformation : function (styleInformation)
    {
      if (styleInformation == null || styleInformation == "") 
      {
        return "";
      }
      else if (typeof styleInformation == "object")
      {
        var str = "";
        for (var i in styleInformation)
        {
          str += i + ":" + styleInformation[i] + ";";
        }
        return str;
      }
      else
      {
        return styleInformation;
      }
    },


    /**
     * Get html content (own recursive method)
     *
     * @type static
     * @param root {Node} Root node (starting point)
     * @param outputRoot {Boolean} Controls whether the root node is also added to the output
     * @return {String} Content of current node
     */
    __getHtml : function(root, outputRoot)
    {
      var html = "";

      switch(root.nodeType)
      {
        case 1:  // Node.ELEMENT_NODE
        case 11:  // Node.DOCUMENT_FRAGMENT_NODE

          var closed;
          var i;

          if (outputRoot)
          {
            /*
             * get all of the children nodes of the div placeholder
             * but DO NOT return the placeholder div elements itself.
             * This special case is only relevant for IE browsers
             */
            if (qx.core.Variant.isSet("qx.client", "mshtml"))
            {
              if (root.tagName.toLowerCase() == "div" && root.className && root.className == "placeholder")
              {
                for (i=root.firstChild; i; i=i.nextSibling) {
                  html += htmlArea.HtmlArea.__getHtml(i, true);
                }
                return html;
              }
            }

            closed = (!(root.hasChildNodes() || htmlarea.HtmlArea.__needsClosingTag(root)));

            html = "<" + root.tagName.toLowerCase();

            var name, value;
            var attrs = root.attributes;
            var attrsl = attrs.length;
            var a;

            for (i=0; i<attrsl; ++i)
            {
              a = attrs[i];

              if (!a.specified) {
                continue;
              }

              name = a.nodeName.toLowerCase();

              if (/(_moz|contenteditable)/.test(name))
              {
                // Mozilla reports some special tags
                // here; we don't need them.
                continue;
              }

              if (name != "style")
              {
                if (qx.core.Client.getInstance().isMshtml() && !isNaN(value))
                {
                  // IE5: buggy on number values
                  // XXX: IE: String, Object, Number, Boolean, ... !!!
                  // XXX: Moz: String only
                  value = root.getAttribute(name);
                }
                else
                {
                  value = a.nodeValue;
                }
              }
              else
              {
                // IE fails to put style in attributes list
                // FIXME: cssText reported by IE is UPPERCASE
                value = root.style.cssText;
              }

              if (/(_moz|^$)/.test(value))
              {
                // Mozilla reports some special tags
                // here; we don't need them.
                continue;
              }

              if (value == null) continue;
              html += " " + name + '="' + value.toString().replace(new RegExp('"', "g"), "'") + '"';
            }

            html += closed ? " />" : ">";
          }

          for (i=root.firstChild; i; i=i.nextSibling) {
            html += htmlarea.HtmlArea.__getHtml(i, true);
          }

          if (outputRoot && !closed) {
            html += "</" + root.tagName.toLowerCase() + ">";
          }

          break;

        case 3:  // Node.TEXT_NODE

          html = htmlarea.HtmlArea.__htmlEncode(root.data);
          break;

        case 8:  // Node.COMMENT_NODE

          html = "<!--" + root.data + "-->";
          break;  // skip comments, for now.
      }

      return html;
    },


    /**
     * String containing all tags which need a corresponding closing tag
     */
    closingTags : " SCRIPT STYLE DIV SPAN TR TD TBODY TABLE EM STRONG FONT A ",


    /**
     * Checks if given element needs a closing tag
     *
     * @type static
     * @param el {Element} Element to check
     * @return {Boolean} Closing tag needed or not
     */
    __needsClosingTag : function(el) {
      return (htmlarea.HtmlArea.closingTags.indexOf(" " + el.tagName + " ") != -1);
    },


    /**
     * Encodes given string with HTML-Entities
     *
     * @type static
     * @param s {String} String to encode
     * @return {String} Encoded string
     */
    __htmlEncode : function(s)
    {
      s = s.replace(/&/ig, "&amp;");
      s = s.replace(/</ig, "&lt;");
      s = s.replace(/>/ig, "&gt;");
      s = s.replace(/\x22/ig, "&quot;");

      // \x22 means '"' -- prevent errors in editor or compressors
      s = s.replace(/\xA9/ig, "&copy;");

      return s;
    },

    /**
     * Possible values for the style property background-position
     */
    __backgroundPosition : [ "top", "bottom", "center", "left", "right" ],

    /**
     * Possible values for the style property background-repeat
     */
    __backgroundRepeat : "repeat repeat-x repeat-y no-repeat"
 },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** Selected content type. Currently only XHTML is supported. */
    contentType :
    {
      check : "String",
      init  : "xhtml"
    },


    /** Toggles the edit mode */
    editable :
    {
      check : "Boolean",
      init  : false,
      apply : "_applyEditable"
    },


    /**
     * If turned on the editor acts like a messenger widget e.g. if one hits the Enter key the current content gets
     * outputted (via a DataEvent) and the editor clears his content
     */
    messengerMode :
    {
      check : "Boolean",
      init  : false
    },
    

    /** Setting own appearance */
    appearance :
    {
      refine : true,
      init   : "html-area"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /** Initial content which is written dynamically into the iframe's document */
    __contentWrap :
    {
      "xhtml" :
      {
        doctype : '<!' + 'DOCTYPE html PUBLIC "-/' + '/W3C/' + '/DTD XHTML 1.0 Transitional/' + '/EN" "http:/' + '/www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
        html    : '<html xmlns="http:/' + '/www.w3.org/1999/xhtml" xml:lang="en" lang="en">',
        meta    : '<meta http-equiv="Content-type" content="text/html; charset=UTF-8" /><title></title>',
        style   : 'html, body { overflow-y: auto; background-color:transparent; background-image:none; margin:0px; padding:1px; }',
        body    : '<body id="bodyElement">\n',
        footer  : '</body></html>'
      }
    },
    

    /** private field which holds the content of the editor  */
    __value        : "",

    
    /** 
     * Setting the value of the editor
     * 
     * @type member
     * @param value {String} new content to set
     * @return {void}
     */
    setValue : function(value)
    {
       if (typeof value == "string")
       {
         this.__value = value;
         this.__doc.body.innerHTML = value;
       }
    },
    
    
    /** 
     * Getting the value of the editor.
     * <b>Attention</b>: The content of the editor is synced
     * at focus/blur events, but not on every input. This method
     * is not delivering the current content in a stable manner.
     * To get the current value of the editor use the {@link #getComputedValue}
     * method instead.
     * 
     * @type member
     * @return {String} value of the editor
     */
    getValue : function()
    {
      return this.__value; 
    },
    
    
    /** 
     * Getting the computed value of the editor.
     * This method returns the current value of the editor traversing
     * the elements below the body element. With this method you always
     * get the current value, but it is much more expensive. So use it
     * carefully.
     * 
     * @type member
     * @return {String} computed value of the editor
     */
    getComputedValue : function()
    {
      return this.getHtml(); 
    },


    /**
     * returns the complete content of the editor
     * 
     * @type member
     * @return {String}
     */
    getCompleteHtml : function ()
    {
      return this.__getWrappedContent(this.getHtml(), true);
    },


    /*
    ---------------------------------------------------------------------------
      INITIALIZATION
    ---------------------------------------------------------------------------
    */

    /**
     * Is executed when event "load" is fired
     *
     * @type member
     * @param e {Object} Event object
     * @return {void} 
     */
    _loaded : function(e)
    {
      if (this.__isLoaded) {
        return;
      }

      this.__isLoaded = true;

      /* setting a shortcut for the content document */
      this.__doc = this.getContentDocument();

      /*
       * For IE the document needs to be set in "designMode"
       * BEFORE the content is rendered.
       */
      if (qx.core.Client.getInstance().isMshtml()) {
        this.setEditable(true);
      }


      /*
       * render content - opens a new document and inserts
       * all needed elements plus the initial content
       */
      this.__renderContent();


      /* register all needed event listeners */
      this.__addEventListeners();


      /*
       * setting the document editable for all other browser engines
       * AFTER the content is set
       */
      if (!qx.core.Client.getInstance().isMshtml()) {
        this.setEditable(true);
      }


      /*
       * if "focused" property is set make editor
       * ready to use after startup -> user can type ahead immediately
       *
       * TODO: Webkit is not able to set the cursor at startup
       * Tried to append textNode and make new selection/range -> not worked 
       */

      if (this.getFocused())
      {
        this._visualizeFocus();

        var focusRoot = this.getFocusRoot();

        if (focusRoot) {
          focusRoot.setFocusedChild(this);
        }
      }
      
      /* dispatch the "ready" event at the end of the initialization */
      this.dispatchEvent(new qx.event.type.Event("ready"), true);
    },


    /**
     * returns style attribute as string of a given element
     *
     * @type member
     * @param elem {Object} TODOC
     * @return {String} style
     */
    __getElementStyleAsString : function(elem)
    {
      var style = "";

      if (!elem) {
        return style;
      }

      try
      {
        var styleAttrib = elem.getAttribute("style");

        if (!styleAttrib) {
          return style;
        }

        // IE returns an array when calling getAttribute
        if (qx.core.Client.getInstance().isMshtml()) {
          style = styleAttrib.cssText;
        } else {
          style = styleAttrib;
        }
      }
      catch(exc)
      {
        this.info("can't extract style from elem. ");
      }

      return style;
    },


    /**
     * returns the wrapped content of the editor
     * 
     * @type member
     * @param value {String} body.innerHTML
     * @return {String} content
     */
    __getWrappedContent : function (value, useCurrentBodyStyle)
    {
      var value = (typeof value == "string") ? value : "";

      /**
       * To hide the horizontal scrollbars in gecko browsers set the "overflow-x" explicit to "hidden"
       * In mshtml browsers this does NOT work. The property "overflow-x" overwrites the value of "overflow-y".
       **/
      var geckoOverflow = qx.core.Client.getInstance().isGecko() ? " html, body {overflow-x: hidden; } " : "";
      
      var wrap = this.__contentWrap[this.getContentType()];
      
      /**
       * When setting the content with a doctype IE7 has one major problem.
       * With EVERY char inserted the editor component hides the text/flickers. To display it again
       * it is necessary to unfocus and focus again the editor component. To avoid this unwanted
       * behaviour it is necessary to set NO DOCTYPE.
       * 
       * WRONG IMPLEMENTATION:
       * propValue = wrap.doctype + wrap.html + '<head>' + wrap.head + '</head>' + wrap.body + propValue + wrap.footer;
       **/
      
      var body = "";
      if (useCurrentBodyStyle === true)
      {
        body = wrap.body.replace('>',' style="'+this.__getElementStyleAsString(this.__doc.body)+'">');
      }
      
      /* RIGHT IMPLEMENTATION */
      return wrap.html +
             '<head>' + wrap.meta + 
             '<style type="text/css">' + wrap.style + geckoOverflow + this.__styleInformation + '</style>' +
             '</head>' + body + value + wrap.footer;
    },


    /**
     * Opens a new document and sets the content (if available)
     *
     * @type member
     * @return {void} 
     */
    __renderContent : function()
    {
      var value = this.getValue();
      
      if (typeof value == "string")
      {
         var content = this.__getWrappedContent(value);
          
         this.__doc.open(qx.util.Mime.HTML, true);
         this.__doc.writeln(content);
         this.__doc.close();
      }
    },


    /**
     * Adds all needed eventlistener
     *
     * @type member
     * @return {void} 
     */
    __addEventListeners : function()
    {
      /*
       * IMPORTANT
       * route all key events directly to the KeyEventHandler to transform DOM events to full-featured qooxdoo events.
       * Doing so the editor has not to deal with DOM events anymore.
       */

      qx.html.EventRegistration.addEventListener(this.__doc, "keypress", qx.event.handler.KeyEventHandler.getInstance().__onkeypress);
      qx.html.EventRegistration.addEventListener(this.__doc, "keyup", qx.event.handler.KeyEventHandler.getInstance().__onkeyupdown);
      qx.html.EventRegistration.addEventListener(this.__doc, "keydown", qx.event.handler.KeyEventHandler.getInstance().__onkeyupdown);

      /*
       * register event handler for focus/blur events
       * 
       * IE has to catch focus and blur events on the body element
       * Webkit is listening to the contentWindow and all others catch them at the document directly
       */

      var focusBlurTarget = qx.core.Client.getInstance().isMshtml() ? this.__doc.body : 
                            qx.core.Client.getInstance().isWebkit() ? this.getContentWindow() : this.__doc;

      qx.html.EventRegistration.addEventListener(focusBlurTarget, "focus", this.__handleFocusEvent);
      qx.html.EventRegistration.addEventListener(focusBlurTarget, "blur", this.__handleFocusEvent);

      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        qx.html.EventRegistration.addEventListener(this.__doc, "focusout", this.__handleFocusOut);
      }

      /* register mouse event - for IE one has to catch the "click" event, for all others the "mouseup" is okay */
      qx.html.EventRegistration.addEventListener(this.__doc.body, qx.core.Client.getInstance().isMshtml() ? "click" : "mouseup", this.__handleMouseEvent);
    },




    /*
    ---------------------------------------------------------------------------
      MODIFIERS
    ---------------------------------------------------------------------------
    */

    /**
     * Modifier for property "editable"
     *
     * @type member
     * @param propValue {var} Current value
     * @param propOldValue {var} Previous value
     * @param propData {var} Property configuration map
     * @return {void}
     * @throws {Error} Failed to enable rich edit functionality
     */
    _applyEditable : function(propValue, propOldValue, propData)
    {
      if (this.__doc)
      {
        /* setting the designMode - works for all browser engines */
        this.__doc.designMode = propValue ? "on" : "off";
  
        /*
         * for Gecko set additionally "styleWithCSS" and as fallback for older
         * Gecko engines "useCSS".
         */
        if (qx.core.Variant.isSet("qx.client", "gecko"))
        {
          try
          {
            /* 
             * use the new command "styleWithCSS" to turn on CSS
             * useCSS is deprecated - see http://www.mozilla.org/editor/midas-spec.html
             */
            this.__doc.execCommand("styleWithCSS", false, true);
            
            /* 
             * this command only works when the cursor is inside a paragraph. Then
             * it is needed to press the Enter key twice to get paragraphs.
             */
            //this.__doc.execCommand("insertbronreturn", false, false);
          }
          catch(ex)
          {
            try {
              this.__doc.execCommand("useCSS", false, false);
            } catch(ex) {
              throw new Error("Failed to enable rich edit functionality");
            }
          }
        }
      }
    },
    
    

    /**
     * Sets the focus on the editor component
     *
     * @type member
     * @return {void}
     */
    _visualizeFocus : function()
    {
      if (qx.core.Client.getInstance().isGecko())
      {
        this.getContentWindow().focus();
      }
      else
      {
        if (this.__isLoaded) {
          this.getContentDocument().body.focus();
        }
      }

      qx.ui.embed.Iframe.prototype._visualizeFocus.call(this);
    },
    

    /*
    ---------------------------------------------------------------------------
      EVENT HANDLING
    ---------------------------------------------------------------------------
    */

    /*
     * This flag is only needed by IE to implement the mechanism
     * of a linebreak when pressing "Ctrl+Enter". It is not possible
     * in IE to get to know that both keys are pressed together (at the 
     * keypress event). It is only possible to look at the keypress event,
     * set this flag and insert the linebreak at the keyup event.
     */
    __controlPressed : false,
    
    /*
     * flag to control the debugging output
     */
    __verboseDebug : false,

    /*
     * Flag for the undo-mechanism to monitor the content changes
     */
    __contentEdit : false,

    /*
     * Store the current range for IE browser to support execCommands
     * fired from e.g. toolbar buttons. If the HtmlArea looses the selection
     * because the user e.g. clicked at a toolbar button the last selection
     * has to be stored in order to perform the desired execCommand correctly.
     */
    __currentRange    : null,


    /**
     * All keyUp events are delegated to this method
     *
     * @type member
     * @param e {Object} Event object
     * @return {void} 
     */
    _handleKeyUp : function(e)
    {
      var keyIdentifier = e.getKeyIdentifier().toLowerCase();

      /*
       * This block inserts a linebreak when the key combination "Ctrl+Enter" was pressed. It is
       * necessary in IE to look after the keypress and the keyup event. The keypress delivers the
       * "Ctrl" key and the keyup the "Enter" key. If the latter occurs right after the first one 
       * the linebreak gets inserted.
       */
      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        if (keyIdentifier == "enter" && this.__controlPressed)
        {
          var sel = this.__getSelection();
          var rng = this.__createRange(sel);
          rng.collapse(true);
          rng.pasteHTML('<br/><div class="placeholder"></div>');
          rng.collapse(true);
        }
        /*
         * the keyUp event of the control key ends the "Ctrl+Enter"
         * session. So it is supported that the user is pressing this
         * combination several times without releasing the "Ctrl" key
         */
        else if (keyIdentifier == "control" && this.__controlPressed)
        {
          this.__controlPressed = false;
        }
        /*
         * execute the "selectAll" command identifier whenever the shortcut "Ctrl+A" is pressed
         */
        else if(keyIdentifier == "a" && this.__controlPressed)
        {
          this.selectAll();
        }
      }
    },


    /**
     * All keyDown events are delegated to this method
     *
     * @type member
     * @param e {Object} Event object
     * @return {void} 
     */
    _handleKeyDown : function(e) {},


    /**
     * All keyPress events are delegated to this method
     *
     * @type member
     * @param e {Object} Event object
     * @return {void} 
     */
   _handleKeyPress : function(e)
   {
      var keyIdentifier  = e.getKeyIdentifier().toLowerCase();
      var isCtrlPressed  = e.isCtrlPressed();
      var isShiftPressed = e.isShiftPressed();
      this.__currentEvent = e;

      // mark content changes for undo
      this.__contentEdit = true;

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        if (this.__verboseDebug)
        {
          this.debug(e.getType() + " | " + keyIdentifier + " | " + e.getCharCode());
        }
      }


      switch(keyIdentifier)
      {
        /*
         * This case is only relevant for IE. It simply sets a flag if the 
         * control key was pressed. It is used to insert a linebreak when 
         * pressing the "Ctrl+Enter" combination. The linebreak gets inserted
         * at the keyUp event at the "_handleKeyUp" method.
         */
        case "control":
          if (qx.core.Client.getInstance().isMshtml())
          {
             this.__controlPressed = true;
          }
        break;

        case "tab":
          if (qx.core.Client.getInstance().isGecko())
          {
            /* TODO - right implementation? */
            this.getFocusRoot().getFocusHandler()._onkeyevent(this.getFocusRoot(), e);
          }

          // mark the redo as not possible anymore
          this.__redoPossible = false;
          break;

        case "enter":
          // mark the redo as not possible anymore
          this.__redoPossible = false;

          /* if only "Enter" key was pressed and "messengerMode" is activated */
          if (isShiftPressed == false && isCtrlPressed == false && this.getMessengerMode() == true)
          {
            e.preventDefault();
            e.stopPropagation();

            /* dispatch data event with editor content */
            this.dispatchEvent(new qx.event.type.DataEvent("messengerContent", this.getComputedValue()), true);

            /* reset the editor content */
            this.resetHtml();
          }

          /*
           * This mechanism is to provide a linebreak when pressing "Ctrl+Enter".
           * The implementation for IE is located at the "control" block and at the
           * "_handleKeyUp" method.
           */
          if (isCtrlPressed)
          {
            e.preventDefault();
            e.stopPropagation();

            switch(qx.core.Client.getInstance().getEngine())
            {
               case "gecko":
                 /* 
                  * Insert additionally an empty div element - this ensures that
                  * the caret is shown and the cursor moves down a line correctly
                  * 
                  * ATTENTION: the "div" element itself gets not inserted by Gecko, it is
                  * only necessary to have anything AFTER the "br" element to get it work.
                  * Strange hack, I know ;-)
                  */
                 this.insertHtml("<br/><div id='placeholder'></div>");
               break;

               case "webkit":
                 /*
                  * TODO: this mechanism works well when the user already typed in some text at the
                  * current line. If the linebreak is done without any text at the current line the
                  * cursor DOES NOT correspond -> it stays at the current line although the linebreak
                  * is inserted. Navigating to the next line with the arrow down key is possible.
                  */
                 this.insertHtml("<div><br class='webkit-block-placeholder' /></div>");
               break;

               case "opera":
                 /*
                  * To insert a linebreak for Opera it is necessary to work with ranges and add the
                  * br element on node-level. The selection of the node afterwards is necessary for Opera
                  * to show the cursor correctly.
                  */
                 var sel    = this.__getSelection();
                 var rng    = this.__createRange(sel);

                 var brNode = this.__doc.createElement("br");
                 rng.collapse(true);
                 rng.insertNode(brNode);
                 rng.collapse(true);

                 rng.selectNode(brNode);
                 sel.addRange(rng);
                 rng.collapse(true);
               break;
            }
          } 

          break;

          /*
           * for all keys which are able to reposition the cursor
           * start to examine the current cursor context
           */

        case "left":
        case "right":
        case "up":
        case "down":
        case "pageup":
        case "pagedown":
        case "home":
        case "end":
          this.__startExamineCursorContext();

        break;

        // special shortcuts
        case "b": 
          if (isCtrlPressed) {
            this.__executeHotkey('setBold', true);
          } 
          break;
        case "i":
        case "k":
          if (isCtrlPressed) {
            this.__executeHotkey('setItalic', true);
          }
          break;
        case "u":
          if (isCtrlPressed) {
            this.__executeHotkey('setUnderline', true);
          }
          break;
        case "z":
          if (isCtrlPressed && !isShiftPressed) {
            this.__executeHotkey('undo', true);
          }
          else if (isCtrlPressed && isShiftPressed)
          {
            this.__executeHotkey('redo', true);
          }
          break;
        case "y":
          if (isCtrlPressed) {
            this.__executeHotkey('redo', true);
          }
          break;

        case "a":
          /*
           * Select the whole content if "Ctrl+A" was pressed
           *
           * NOTE: this code is NOT executed for mshtml. To get to
           * know if "Ctrl+A" is pressed in mshtml one need to check
           * this within the "keyUp" event. This info is not available
           * within the "keyPress" event in mshtml.
           */
          if (isCtrlPressed)
          {
            this.selectAll();
          }
          else
          {
            // mark the redo as not possible anymore
            this.__redoPossible = false;
          }
        break;
 
        default:
          // mark the redo as not possible anymore
          this.__redoPossible = false;
       }

       this.__currentEvent = null;
    },


    /**
     * executes a method and prevent default
     * 
     * @type member
     * @param method {String} name of the moethod which should be called
     * @param preventDefault {Boolean} wheater do preventDefault or not
     */
    __executeHotkey : function (method, preventDefault)
    {
      if (this[method])
      {
        this[method]();

        if (preventDefault)
        {
          this.__currentEvent.preventDefault();
          this.__currentEvent.stopPropagation();
        }
      }
    },


    /**
     * Eventlistener for focus events
     *
     * @type member
     * @param e {Object} Event object
     * @return {void} 
     */
    _handleFocusEvent : function(e)
    {
      this.setFocused(e.type == "focus" ? true : false);
      e.type == "focus" ? this.__onFocus() : this.__onBlur();
    },
    
    
    /**
     * Called with every focus event of the editor.
     * Stores the current content of the editor for later
     * comparison (see at {@link #__onBlur} method)
     * 
     * @type member
     * @return {void}
     */
   __onFocus : function()
   {
     this.__valueOnFocus = this.getComputedValue();
     this.createDispatchEvent('focused');
   },
   
   
   /**
    * Called with every blur event of the editor.
    * Compares the current value with the stored one.
    * If they are different the current content is synced
    * with the value variable.
    * 
    * @type member
    * @return {void}
    */
   __onBlur : function()
   {
      if (this.getComputedValue() != this.__valueOnFocus)
      {
        this.__value = this.getComputedValue();
      }
   },


    /**
     * Eventlistener for all mouse events.
     * This method is invoked for mshtml on "click" events and
     * on "mouseup" events for all others.
     *
     * @type member
     * @param e {Object} Event object
     * @return {void} 
     */
    _handleMouseEvent : function(e)
    {
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        //this.debug("handleMouse " + e.type);
      }

      /* TODO: transform the DOM events to real qooxdoo events - just like the key events */
      this.__startExamineCursorContext();
    },


    /**
     * Eventlistener for focus out events to save the current selection.
     * NOTE: this method is currently only used for mshtml.
     *
     * @type member
     * @param e {qx.event.type.Event} focus out event
     * @return {void}
     */
    _handleFocusOut : function(e)
    {
      this.__currentSelection = this.__getSelection();
      this.__currentRange     = this.__createRange(this.__currentSelection);
    },


    /*
    ---------------------------------------------------------------------------
      UNDO / REDO
    ---------------------------------------------------------------------------
    */
    /* Remember every change in this undo-stack */
    __undoHistory : [],

    /* set this flag if an undo operation is performed */
    __undoOperation : false,

    /* variable to hold the actions for redo  */
    __redoAction : null,

    /* flag if a redo operation is possible */
    __redoPossible : false,


    /**
     * Undo the last change
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    undo : function()
    {
      // check if any content changes occured
      if (this.__contentEdit)
      {
        this.__undoHistory.push({ customChange : false });
        this.__contentEdit = false;
      }

      // look after the change history
      // if any custom change was found undo it manually
      if (this.__undoHistory.length > 0)
      {
        var lastChange = this.__undoHistory.pop();
        if (lastChange.customChange)
        {
          // set this flag to prevent the affected methods to add
          // the upcoming change to the undo history
          this.__undoOperation = true;

          switch(lastChange.method)
          {
            case "setBackgroundColor":
              // fill the info for the (possible) redo
              this.__redoAction = { customChange : true,
                                    method       : lastChange.method,
                                    parameter    : [ this.__doc.body.style.backgroundImage,
                                                     this.__doc.body.style.backgroundRepeat,
                                                     this.__doc.body.style.backgroundPosition ] };

              this[lastChange.method].call(this, lastChange.parameter[0]);
            break;

            case "setBackgroundImage":
              // fill the info for the (possible) redo
              this.__redoAction = { customChange : true,
                                    method       : lastChange.method,
                                    parameter    : [ this.__doc.body.style.backgroundColor ] };

              this[lastChange.method].call(this, lastChange.parameter[0], lastChange.parameter[1], lastChange.parameter[2]);
            break;
          }

          // mark the undo operation over
          this.__undoOperation = false;
        }
        else
        {
          this.__redoAction = { customChange : false };
          this._execCommand("Undo", false, null);
        }

        // a redo operation is now possible
        this.__redoPossible = true;

        // need to inform the toolbar, because context has changed
        this.__startExamineCursorContext();
        return true;
      }
    },


    /**
     * Redo the last change
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    redo : function()
    {
      // a redo operation is only possible
      // if an undo operation was right before performed
      if (this.__redoPossible)
      {
        if (this.__redoAction.customChange)
        {
          switch(this.__redoAction.method  )
          {
            case "setBackgroundImage":
              this[this.__redoAction.method].call(this, this.__redoAction.parameter[0], this.__redoAction.parameter[1], this.__redoAction.parameter[2]);
            break;

            case "setBackgroundColor":
              this[this.__redoAction.method].call(this, this.__redoAction.parameter[0]);
            break;
          }
        }
        else
        {
          var returnValue = this._execCommand("Redo", false, null);

          // need to inform the toolbar, because context has changed
          this.__startExamineCursorContext();

          return returnValue;
        }

        this.__redoPossible = false;
      }

      // reset the redoAction
      this.__redoAction = null;

      // need to inform the toolbar, because context has changed
      this.__startExamineCursorContext();
    },


    /*
     * Adds the occured changes to the undo history and
     * sets a flag for the redo action.
     *
     * @type member
     * @param changeInfo {Object ? null} infos of the change.
                                         Either a map containing details or null for change through a command identifier
     * @return {void}
     */
    __updateUndoRedoStatus : function(changeInfo)
    {
      /*
       * if any editing of the content happened before
       * add the content change as undo history entry
       */
      if (this.__contentEdit)
      {
        this.__undoHistory.push({ customChange : false });
        this.__contentEdit = false;
      }

      if (changeInfo != null)
      {
        this.__undoHistory.push(changeInfo);
      }
      else
      {
        // add the execCommand as undo history entry
        this.__undoHistory.push({ customChange : false });
      }

      // after a command (other than "undo") no redo is possible
      this.__redoPossible = false;
    },


    /*
    ---------------------------------------------------------------------------
      EXEC-COMMANDS
    ---------------------------------------------------------------------------
    */


    /**
     * inserts html content on the current selection
     *
     * @type member
     * @param value {String} html content
     * @return {Boolean} Success of operation
     */
    insertHtml : function (value) {
      var ret;
      
      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        if (this.__currentRange == null)
        {
          this.__currentRange = this.__createRange(this.__getSelection());
        }
        
        this.__currentRange.select();
        this.__currentRange.pasteHTML(value);
        
        ret = true;
      }
      else
      {
        ret = this._execCommand("InsertHtml", false, value);
      }
      
      // update the undo/redo status
      this.__updateUndoRedoStatus();
      
      return ret;
    },


    /**
     * Removes all formatting styles on the current selection content
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    removeFormat : function() {
      return this._execCommand("RemoveFormat", false, null);
    },


    /**
     * Sets the current selection content to bold font style
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setBold : function() {
      return this._execCommand("Bold", false, null);
    },


    /**
     * Sets the current selection content to italic font style
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setItalic : function() {
      return this._execCommand("Italic", false, null);
    },


    /**
     * Sets the current selection content to underline font style
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setUnderline : function() {
      return this._execCommand("Underline", false, null);
    },
    
    
    /**
     * Sets the current selection content to strikethrough font style
     *
     * @type member
     * @return {Boolean} Success of operation
     *
     */
    setStrikeThrough : function()
    {
      return this._execCommand("StrikeThrough", false, null);
    },


    /**
     * Sets the current selection content to the specified font size
     *
     * @type member
     * @param value {Number} Font size
     * @return {Boolean} Success of operation
     */
    setFontSize : function(value)
    {
      /* TODO: implementation complete?
       * should numbers be the only supported unit?
       * what if "10px" is given as parameter value?
       */
      if (typeof value == "number") {
        return this._execCommand("FontSize", false, value);
      } else {
        return false;
      }
    },


    /**
     * Sets the current selection content to the specified font size
     *
     * @type member
     * @param value {Number} Font size
     * @return {Boolean} Success of operation
     */
    setFontFamily : function(value) {
      return this._execCommand("FontName", false, value);
    },


    /**
     * Sets the current selection content to the specified font color
     *
     * @type member
     * @param value {String} Color value (supported are Hex,
     * @return {Boolean} Success of operation
     */
    setTextColor : function(value) {
      return this._execCommand("ForeColor", false, value);
    },
    
    
    /**
     * Sets the current selection content to the specified background color
     *
     * @type member
     * @param value {String} Color value (supported are Hex,
     * @return {Boolean} Success of operation
     */
    setTextBackgroundColor : function(value)
    {
      // use "hilitecolor" for gecko/opera to set the background color
      // for the current selection - not for the whole block
      // IE/Safari do this per default with the "backcolor" command
      if (qx.core.Variant.isSet("qx.client", "gecko|opera"))
      {
        return this._execCommand("Hilitecolor", false, value);
      }
      else
      {
        return this._execCommand("Backcolor", false, value);
      }
    },
    
    
    /**
     * Left-justifies the current selection
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setJustifyLeft : function()
    {
      return this._execCommand("JustifyLeft", false, null);
    },
    
    
    /**
     * Center-justifies the current selection
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setJustifyCenter : function()
    {
      return this._execCommand("JustifyCenter", false, null);
    },
    
    
    /**
     * Right-justifies the current selection
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setJustifyRight : function()
    {
      return this._execCommand("JustifyRight", false, null);
    },
    
    
    /**
     * Full-justifies the current selection
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setJustifyFull : function()
    {
      return this._execCommand("JustifyFull", false, null);
    },
    
    
    /**
     * Indents the current selection
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    insertIndent : function()
    {
      return this._execCommand("Indent", false, null);
    },
    
    
    /**
     * Outdents the current selection
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    insertOutdent : function()
    {
      return this._execCommand("Outdent", false, null);
    },
    
    
    /**
     * Inserts an ordered list
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    insertOrderedList : function()
    {
      return this._execCommand("InsertOrderedList", false, null);
    },
    
    
    /**
     * Inserts an unordered list
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    insertUnorderedList : function()
    {
      return this._execCommand("InsertUnorderedList", false, null);
    },
    
    
    /**
     * Inserts a horizontal ruler
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    insertHorizontalRuler : function()
    {
      return this._execCommand("InsertHorizontalRule", false, null);
    },
    
    
    /**
     * Insert an image
     *
     * @type member
     * @param url {String} url of the image to insert
     * @return {Boolean} Success of operation
     */
    insertImage : function(url)
    {
      return this._execCommand("InsertImage", false, url);
    },


    /**
     * Alias for setBackgroundColor("transparent");
     *
     * @type member
     * @return {Boolean} if succeeded
     */
    removeBackgroundColor : function () {
      this.setBackgroundColor("transparent");
    },


    /**
     * sets the background color of the editor
     *
     * @type member
     * @param value {String} color
     * @return {Boolean} if succeeded
     */
    setBackgroundColor : function (value)
    {
      // remember the old values
      if (!this.__undoOperation)
      {
        // update the undo/redo status
        this.__updateUndoRedoStatus({ customChange    : true,
                                      method          : "setBackgroundColor",
                                      parameter       : [ this.__doc.body.style.backgroundColor ] });
      }

      this.__doc.body.style.backgroundColor = (value != null && typeof value == "string") ? value : "transparent";

      return true;
    },


    /**
     * Alias for setBackgroundImage(null);
     *
     * @type member
     * @return {Boolean} if succeeded
     */
    removeBackgroundImage : function () {
      this.setBackgroundImage();
    },


    /**
     * Inserts an background image
     *
     * @type member
     * @param url {String} url of the background image to set
     * @param repeat {String} repeat mode. Possible values are "repeat|repeat-x|repeat-y|no-repeat". Default value is "no-repeat"
     * @param position {String} Position of the background image. Possible values are "top|bottom|center|left|right". Default value is "top"
     * @return {Boolean} Success of operation
     */
    setBackgroundImage : function(url, repeat, position)
    {
      // if url is null remove the background image
      if (url == null || typeof url != "string")
      {
        this.__doc.body.style.backgroundImage = "";
        this.__doc.body.style.backgroundRepeat = "";
        this.__doc.body.style.backgroundPosition = "";
        return true;
      }

      // return silently if the parameter "repeat" is not valid
      // report the error in debug mode
      if (repeat != null && htmlarea.HtmlArea.__backgroundRepeat.indexOf(repeat) < 0 )
      {
        if (qx.core.Variant.isSet("qx.debug", "on"))
        {
          this.error("The value '" +repeat + "' is not allowed for parameter 'repeat'. Possible values are '" + htmlarea.HtmlArea.__backgroundRepeat + "'");
        }
        return false;
      }
      else
      {
        repeat = "no-repeat";
      }

      // return silently if the parameter "position" is not valid
      // report the error in debug mode
      // TODO: combination of some values possible???? i think so
      if (position != null && htmlarea.HtmlArea.__backgroundPosition.indexOf(position) < 0)
      {
        if (qx.core.Variant.isSet("qx.debug", "on"))
        {
          this.error("Wrong value for parameter 'position'. Possible values are '" + htmlarea.HtmlArea.__backgroundPosition.join(" ") + "'");
        }
        return false;
      }
      else
      {
        position = "top";
      }

      // to make an undo possible -> remember to old values in the change history
      if (!this.__undoOperation)
      {
        // update the undo/redo status
        this.__updateUndoRedoStatus({ customChange       : true,
                                      method             : "setBackgroundImage",
                                      parameter          : [ this.__doc.body.style.backgroundImage,
                                                             this.__doc.body.style.backgroundRepeat,
                                                             this.__doc.body.style.backgroundPosition ]
                                    });
      }

      // don't use the "background" css property to prevent overwriting the
      // current background color
      this.__doc.body.style.backgroundImage = "url(" + url + ")";
      this.__doc.body.style.backgroundRepeat = repeat;
      this.__doc.body.style.backgroundPosition = position;
      return true;
    },


    /**
     * Selects the whole content
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    selectAll : function()
    {
      return this._execCommand("SelectAll", false, null);
    },


    /**
     * Executes the given command
     *
     * @type member
     * @param cmd {String} given command
     * @param ui {Boolean} controls if any UI elements are shown
     * @param value {String ? null} Value for the given command (if needed)
     * @return {Boolean} Success of operation
     */
    _execCommand : function(cmd, ui, value)
    {
      var updateUndoRedoStatus = true;
      
      try
      {
        // the document object is the default target for all execCommands
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
        if (qx.core.Variant.isSet("qx.client", "mshtml") && cmd.toLowerCase() != "selectall")
        {
          // select the content of the Text Range object to set the cursor at the right position
          // and to give user feedback. Otherwise IE will set the cursor at the first position of the
          // editor area.
          this.__currentRange.select();

          // if the saved Text Range object contains no text
          // collapse it and execute the command at the document object
          if (this.__currentRange.text.length > 0)
          {
            // run the execCommand on the saved text range
            execCommandTarget = this.__currentRange;
          }
        }

        var result = execCommandTarget.execCommand(cmd, ui, value);
        if (qx.core.Variant.isSet("qx.debug", "on"))
        {
          this.debug("execCommand " + cmd + " with value " + value + " succeded");
        }

        /* (re)-focus the editor after the execCommand */
        this.__focusAfterExecCommand(this);
      }
      catch(ex)
      {
        if (qx.core.Variant.isSet("qx.debug", "on"))
        {
          this.debug("execCommand " + cmd + " with value " + value + " failed");
        }

        return false;
      }
      
      if (qx.core.Variant.isSet("qx.client", "gecko"))
      {
        /* 
         * ignore the update if an undo command is performed or
         * the range currently manipulated is collapsed. If the range
         * is collapsed gecko marks this manipulation NOT as an extra action
         * -> no extra undo step
         */
        if (cmd.toLowerCase() == "undo" || this.getRange().collapsed)
        {
          updateUndoRedoStatus = false;
        }
      }
      else
      {
        if (cmd.toLowerCase() != "undo")
        {
          updateUndoRedoStatus = false; 
        }
      }
      
      // only update the status if the flag is set
      if (updateUndoRedoStatus)
      {
        this.__updateUndoRedoStatus();
      }

      return result;
    },

    /**
     * (Re)-focuses the editor after an execCommand was executed
     *
     * @type member
     * @param context {Object} current context object for window.setTimeout method
     * @return void
     */
    __focusAfterExecCommand : qx.core.Variant.select("qx.client",
    {
       "mshtml" : function(context)
       {
          window.setTimeout(function(e)
          {
            /*
             * IE needs to change the activeChild to the editor component
             * otherwise the e.g. pressed button (to set the selected content bold)
             * will receive the following events
             * call _visualizeFocus to get the right feedback to the user (editor is active)
             */
            qx.ui.core.ClientDocument.getInstance().setActiveChild(context);
            context._visualizeFocus();
          }, 50);
       },
       
       "webkit" : function(context)
       {
         /*
        	 * Webkit needs a mix of both (IE/Gecko). It is needed to (re)set the editor widget
          * as the active child and to focus the editor widget (again).
          */
          window.setTimeout(function(e)
          {
            qx.ui.core.ClientDocument.getInstance().setActiveChild(context);
            context.getContentWindow().focus();
          }, 50);
       },
       
       "default" : function(context)
       {
         /* for all other browser a short delayed focus on the contentWindow should do the job */
         window.setTimeout(function(e) {
           context.getContentWindow().focus();
         }, 50);
       }
    }),




    /*
    ---------------------------------------------------------------------------
      CONTENT MANIPLUATION
    ---------------------------------------------------------------------------
    */

    /**
     * Resets the content of the editor
     *
     * @type member
     * @return {void}
     */
    resetHtml : function()
    {
      /* clearing the editor */
      while (this.__doc.body.firstChild) {
        this.__doc.body.removeChild(this.__doc.body.firstChild);
      }

      /*
       * Gecko needs a p element with a text-node (&nbsp;) to
       * show the caret after clearing out the content. Otherwise
       * the user is able to type ahead but right after the clearing the
       * caret is not visible (-> cursor does not blink)
       */
      if (qx.core.Client.getInstance().isGecko()) {
        this.__doc.body.innerHTML = "<p>&nbsp;</p>";
      }

      /*
       * To ensure Webkit is showing a cursor after resetting the
       * content it is necessary to create a new selection and add a range
       */
      else if (qx.core.Client.getInstance().isWebkit())
      {
        var sel = this.__getSelection();
        var rng = this.__doc.createRange();

        sel.addRange(rng);
      }
    },


    /**
     * Get html content (call own recursive method)
     *
     * @type member
     * @return {String} current content of the editor as XHTML
     */
    getHtml : function()
    {
      if (this.__doc == null) {
        return null;
      }

      return htmlarea.HtmlArea.__getHtml(this.__doc.body, false);
    },


    /*
      -----------------------------------------------------------------------------
      PROCESS CURSOR CONTEXT
      -----------------------------------------------------------------------------
    */

    /**
     * Wrapper method to examine the current context
     *
     * @type member
     * @return {void}
     */
    __startExamineCursorContext : function()
    {
      /* setting a timeout is important to get the right result */
      var o = this;

      window.setTimeout(function(e) {
        o.__examineCursorContext();
      }, 200);
    },


    /**
     * Examines the current context of the cursor (e.g. over bold text).
     * This method will dispatch the data event "cursorContext" which holds a map
     * with different keys like bold, italic, underline etc.
     * The main purpose for this event is to be able to set the states of your toolbar
     * buttons so you can e.g. visualize that the cursor is currently over bold text.
     * 
     * The possible values are
     * -1 = command is not possible at the moment. Used to disable the corresponding buttons (e.g. undo/redo are perfect candidates for this
     *  0 = command is possible at the moment. Used to enable the corresponding buttons (e.g. bold/italic/underline etc.)
     *  1 = cursor is over content which already received that command. Used to to activate the corresponding buttons (e.g. bold/italic/underline etc.)
     *
     * @type member
     * @return {void}
     */
    __examineCursorContext : function()
    {
      if (this._processingExamineCursorContext || this.getEditable() == false) {
        return;
      }

      this._processingExamineCursorContext = true;


      /*
        ----------
        focus node
        ----------
      */
      var focusNode      = this.getFocusNode();
      var focusNodeStyle = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNode.currentStyle : this.__doc.defaultView.getComputedStyle(focusNode, null);

      /*
       * BOLD
       */
      var isBold = qx.core.Variant.isSet("qx.client", "mshtml|opera") ? focusNodeStyle.fontWeight == 700 :
                                                                        focusNodeStyle.getPropertyValue("font-weight") == "bold" ||
                                                                        focusNode.nodeName.toLowerCase() == "b";

      /*
       * ITALIC
       */
      var isItalic = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNodeStyle.fontStyle == "italic" :
                                                                    focusNodeStyle.getPropertyValue("font-style") == "italic";

      /*
       * UNDERLINE
       */
      var isUnderline = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNodeStyle.textDecoration == "underline" :
                                                                       focusNodeStyle.getPropertyValue("text-decoration") == "underline";

      /*
       * STRIKETHROUGH
       */
      var isStrikeThrough = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNodeStyle.textDecoration == "line-through" :
                                                                           focusNodeStyle.getPropertyValue("text-decoration") == "line-through";

      /*
       * FONT SIZE
       */
      var fontSize = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNodeStyle.fontSize : focusNodeStyle.getPropertyValue("font-size");

      /*
       * FONT FAMILY
       */
      var fontFamily = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNodeStyle.fontFamily : focusNodeStyle.getPropertyValue("font-family");

      /*
       * ORDERED/UNORDERED LIST
       * Traverse the DOM to get the result, instead of using the CSS-Properties. In this case the CSS-Properties are not useful, e.g. Gecko always reports
       * "disc" for "list-style-type" even if it is normal text. ("disc" is the initial value)
       */
      var unorderedList = false;
      var orderedList   = false;

      // traverse the DOM upwards to determine if the focusNode is inside an ordered/unordered list
      var node = focusNode;

      // only traverse the DOM upwards if were are not already within the body element or at the top of the document
      // -> nodeType 9 = document node
      if (node != null && node.nodeName.toLowerCase() != "body" && node.parentNode.nodeType != 9)
      {
        while (node.nodeName.toLowerCase() != "body")
        {
          var nodename = node.nodeName.toLowerCase();
          if (nodename == "ol")
          {
            orderedList = true;
            break;
          }
          else if (nodename == "ul")
          {
            unorderedList = true;
            break;
          }

          node = node.parentNode;
        }
      }


      /*
       * JUSTIFY
       */
      var justifyLeft   = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNodeStyle.textAlign == "left" :
                                                                         focusNodeStyle.getPropertyValue("text-align") == "left";

      var justifyCenter = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNodeStyle.textAlign == "center" :
                                                                         focusNodeStyle.getPropertyValue("text-align") == "center";

      var justifyRight  = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNodeStyle.textAlign == "right" :
                                                                         focusNodeStyle.getPropertyValue("text-align") == "right";

      var justifyFull   = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNodeStyle.textAlign == "justify" :
                                                                         focusNodeStyle.getPropertyValue("text-align") == "justify";


      // put together the data for the "cursorContext" data event
      var eventMap = {
        bold                : isBold ? 1 : 0,
        italic              : isItalic ? 1 : 0,
        underline           : isUnderline ? 1 : 0,
        strikethrough       : isStrikeThrough ? 1 : 0,
        fontSize            : fontSize,
        fontFamily          : fontFamily,
        insertUnorderedList : unorderedList ? 1 : 0,
        insertOrderedList   : orderedList ? 1 : 0,
        justifyLeft         : justifyLeft ? 1 : 0,
        justifyCenter       : justifyCenter ? 1 : 0,
        justifyRight        : justifyRight ? 1 : 0,
        justifyFull         : justifyFull ? 1 : 0,
        undo                : (this.__undoHistory.length > 0 || this.__contentEdit) ? 0 : -1, // if no undo history entry is available but content was edited
        redo                : this.__redoPossible ? 0 : -1
      };

      this.dispatchEvent(new qx.event.type.DataEvent("cursorContext", eventMap), true);

      this._processingExamineCursorContext = false;
    },
    
  
    /*
     -----------------------------------------------------------------------------
     SELECTION
     -----------------------------------------------------------------------------
    */
      
    /**
     * Returns the current selection object
     *
     * @return {Selection} Selection object
    */
    __getSelection : qx.core.Variant.select("qx.client",
    {
       "mshtml" : function()
       {
         return this.__doc.selection;
       },

       "default" : function()
       {
         return this.getContentWindow().getSelection();
       }
    }),


    /**
     * returns the content of the actual range as text
     *
     * @return {String} selected text
     */
    getSelectedText : function()
    {
      var sel = this.__getCurrentRange();
      if (range) {
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
    getSelectedHtml : function()
    {
      var tmpBody = document.createElement("body");
      var range   = this.__getCurrentRange();

      if (!range) {
        return "";
      };

      if (range.cloneContents) {
        tmpBody.appendChild(range.cloneContents()); 
      } else if (typeof (range.item) != 'undefined' || typeof (range.htmlText) != 'undefined') {
        return range.item ? range.item(0).outerHTML : range.htmlText;
      } else {
        return range.toString();
      }

      return tmpBody.innerHTML;
    },


    /*
     -----------------------------------------------------------------------------
     TEXT RANGE
     -----------------------------------------------------------------------------
    */

    /**
     * returns the range of the current selection
     * 
     * @type member
     * @return {Range} Range object
     */
    getRange : function ()
    {
      return this.__createRange(this.__getSelection());
    },


    /**
     * returns the current stored range
     * 
     * @type member
     * @return {Range} Range object
     */
    __getCurrentRange : function ()
    {
      if (this.__currentRange != null)
      {
        return this.__currentRange;
      }
      return this.getRange();
    },


    /**
     * returns a range for the current selection
     *
     * @param sel {Selection} current selection object
     * @return {Range} Range object
     */
    __createRange : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function(sel)
      {
        if (qx.util.Validation.isValid(sel))
        {
          try {
            return sel.createRange();
          } catch(ex) {
            return this.__doc.createTextRange();
          }
        }
        else
        {
          return this.__doc.createTextRange();
        }
       },
       
       "default" : function(sel)
       {
         this.setFocused(true);

         if (qx.util.Validation.isValid(sel))
         {
           try {
             return sel.getRangeAt(0);
           } catch(ex) {
             return this._doc.createRange();
           }
         }
         else
         {
           return this._doc.createRange();
         }
       }
    }),
   
   
    /*
      -----------------------------------------------------------------------------
      NODES
      -----------------------------------------------------------------------------
    */
    /**
      returns the node where the selection ends
    */
    getFocusNode : qx.core.Variant.select("qx.client",
    {
       "mshtml" : function()
       {
         var sel = this.__getSelection();
         var rng;
      
         switch(sel.type)
         {
           case "Text":
           case "None":
             /*
              * It seems that even for selection of type "None",
              * there _is_ a correct parent element
              */
             rng = this.__createRange(sel);
             rng.collapse(false);  /* collapse to end */
             return rng.parentElement();
      
           case "Control":
             rng = this.__createRange(sel);
      
             try {
               rng.collapse(false);  /* collapse to end */
             } catch(ex) {}
      
             return rng.item(0);
      
           default:
             return this.__doc.body;
         }
       },
       
       "default" : function()
       {
         return this.__getSelection().focusNode.parentNode;
       }
    })
  },


  /*
  ---------------------------------------------------------------------------
    DESTRUCTOR
  ---------------------------------------------------------------------------
  */

  /**
   * Destructor
   *
   * @type member
   * @return {void}
   */
  destruct : function()
  {
    if (this.getDisposed()) {
      return;
    }

    /* TODO: complete disposing */
    try
    {
      // ************************************************************************
      //   WIDGET KEY EVENTS
      // ************************************************************************
      qx.html.EventRegistration.removeEventListener(this.__doc, "keydown", qx.event.handler.KeyEventHandler.getInstance().__onkeydown);
      qx.html.EventRegistration.removeEventListener(this.__doc, "keyup", qx.event.handler.KeyEventHandler.getInstance().__onkeyup);
      qx.html.EventRegistration.removeEventListener(this.__doc, "keypress", qx.event.handler.KeyEventHandler.getInstance().__onkeypress);

      // ************************************************************************
      //   WIDGET FOCUS/BLUR EVENTS
      // ************************************************************************
      qx.html.EventRegistration.removeEventListener(this.__doc, "focus", this.__handleFocusEvent);
      qx.html.EventRegistration.removeEventListener(this.__doc, "blur", this.__handleFocusEvent);

      // ************************************************************************
      //   WIDGET MOUSE EVENTS
      // ************************************************************************
      qx.html.EventRegistration.removeEventListener(this.__doc.body, qx.core.Client.getInstance().isMshtml() ? "mouseup" : "click", this.__handleMouseEvent);
    }
    catch(ex) {}

    this._disposeFields("__handleFocusEvent", "handleMouseEvent", "__doc", "__contentWrap");
  }
});
