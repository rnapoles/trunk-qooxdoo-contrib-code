/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Alexander Back (aback)

************************************************************************ */

/**
 * Rich text editor widget
 * 
 * @param Content {string} Initial content
 */
qx.Class.define("htmlarea.HtmlArea",
{
  extend : qx.ui.embed.Iframe,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(value)
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
      this.setValue(value);
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
    "ready"            : "qx.event.type.Event"
  },



  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
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
    }
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
        head    : '<meta http-equiv="Content-type" content="text/html; charset=UTF-8" /><title></title><style type="text/css">html,body { overflow-x:hidden; overflow-y:auto; }</style> ',
        body    : '<body id="bodyElement" style="background-color:transparent; background-image:none; margin:0 none; padding:1px; overflow: -moz-scrollbars-none;">\n',
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

      /*
       * For IE the document needs to be set in "designMode"
       * BEFORE the content is rendered.
       */
      if (qx.core.Client.getInstance().isMshtml()) {
        this.setEditable(true);
      }


      /* setting a shortcut for the content document */
      this.__doc = this.getContentDocument();


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
         var wrap = this.__contentWrap[this.getContentType()];
   
         /*
          * When setting the content with a doctype IE7 has one major problem.
          * With EVERY char inserted the editor component hides the text/flickers. To display it again
          * it is necessary to unfocus and focus again the editor component. To avoid this unwanted
          * behaviour it is necessary to set NO DOCTYPE.
          * 
          * WRONG IMPLEMENTATION:
          * propValue = wrap.doctype + wrap.html + '<head>' + wrap.head + '</head>' + wrap.body + propValue + wrap.footer;
          */
   
         /* RIGHT IMPLEMENTATION */
         var content = wrap.html + '<head>' + wrap.head + '</head>' + wrap.body + value + wrap.footer;
         
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
      /* setting the designMode - works for all browser engines */
      this.getContentDocument().designMode = propValue ? "on" : "off";

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
          this.getContentDocument().execCommand("styleWithCSS", false, true);
          
          /* 
           * this command only works when the cursor is inside a paragraph. Then
           * it is needed to press the Enter key twice to get paragraphs.
           */
          //this.__doc.execCommand("insertbronreturn", false, false);
        }
        catch(ex)
        {
          try {
            this.getContentDocument().execCommand("useCSS", false, false);
          } catch(ex) {
            throw new Error("Failed to enable rich edit functionality");
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
          this.__doc.body.focus();
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

      if (qx.core.Variant.isSet("qx.client", "mshtml"))
       {
         if (this.__controlPressed == true)
         {
            switch(keyIdentifier)
            {
               /*
                * This block inserts a linebreak when the key combination "Ctrl+Enter" was pressed. It is
                * necessary in IE to look after the keypress and the keyup event. The keypress delivers the
                * "Ctrl" key and the keyup the "Enter" key. If the latter occurs right after the first one 
                * the linebreak gets inserted.
                */
               case "enter":
                  var sel = this.__getSelection();
                  var rng = this.__createRange(sel);
 
                  rng.collapse(true);
                  rng.pasteHTML('<br/><div class="placeholder"></div>');
                  rng.collapse(true);
               break;
               
               /*
                * select all content of the editor
                */
               case "a":
                  this._execCommand("selectAll", false, null);
               break;
            }
         }
         
         /* 
          * the keyUp event of the control key ends the "Ctrl+ANYKEY"
          * session. So it is supported that the user is pressing this
          * combination several times without releasing the "Ctrl" key
          */
         else if (keyIdentifier == "control" && this.__controlPressed == true)
         {
            this.__controlPressed = false;
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
      var keyIdentifier = e.getKeyIdentifier().toLowerCase();
      
      
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

          break;

        case "enter":
          /* if only "Enter" key was pressed and "messengerMode" is activated */
          if (e.isShiftPressed() == false && e.isCtrlPressed() == false && this.getMessengerMode() == true)
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
          if (e.isCtrlPressed() == true)
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
                 this._execCommand("insertHtml", false, "<br/><div id='placeholder'></div>");
               break;
              
               case "webkit":
       		     /*
       		      * TODO: this mechanism works well when the user already typed in some text at the
       		      * current line. If the linebreak is done without any text at the current line the
       	  	      * cursor DOES NOT correspond -> it stays at the current line although the linebreak
       	  	      * is inserted. Navigating to the next line with the arrow down key is possible.
       		      */
      	  	     this._execCommand("insertHtml", false, "<div><br class='webkit-block-placeholder' /></div>");
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
        
        /*
         * Select all content of the editor
         * Note: this block addresses Gecko and Opera. For IE one
         * has to look after keypress/keyup events and WebKit has
         * this selection feature built in.
         */
        case "a":
          if (e.isCtrlPressed())
          {
             if (qx.core.Variant.isSet("qx.debug", "on"))
             {
                this.debug("Ctrl+A pressed");
             }
             this._execCommand("selectAll", false, null);
          }
        break;
 
        default:
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
   },
   
   
   /**
    * Called with every blur event of the editor.
    * Compares the current value with the stored one.
    * If they are different the {@link #setValue} method
    * is called to sync the current content with the value 
    * variable.
    * 
    * @type member
    * @return {void}
    */
   __onBlur : function()
   {
      if (this.getComputedValue() != this.__valueOnFocus)
      {
        this.setValue(this.getComputedValue());  
      }      
   },


    /**
     * Eventlistener for all mouse events
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
      if ((qx.core.Client.getInstance().isMshtml() && e.type == "mouseup")) {
        this.__startExamineCursorContext();
      } else if (e.type == "click") {
        this.__startExamineCursorContext();
      }
    },




    /*
    ---------------------------------------------------------------------------
      EXEC-COMMANDS
    ---------------------------------------------------------------------------
    */

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
      /* 
       * Currently all commands are handled equally.
       * The switch statement is implemented for further
       * implementation steps.
       */
      switch(cmd)
      {
        default:
          try
          {
            if (!qx.core.Client.getInstance().isOpera()) {
              this.__doc.body.focus();
            }

            var result = this.__doc.execCommand(cmd, ui, value);

            /* (re)-focus the editor after the execCommand */
            this.__focusAfterExecCommand(this);
            
            var o = this;
          }
          catch(ex)
          {
            if (qx.core.Variant.isSet("qx.debug", "on"))
            {
              this.debug("execCommand " + cmd + " with value " + value + " failed");
            }
            
            return false;
          }
      }

      return result;
    },
    
    /**
     * (Re)-focuses the editor after an execCommand was executed
     * 
     * @type member
     * @param context {Object} current context object for window.setTimeout method
     * @return void
     * @signature function(context)
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
     * Examines the current context of the cursor (e.g. across bold text)
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
      var focusNode = this.getFocusNode();

      if (qx.core.Client.getInstance().isMshtml()) {
        var focusNodeStyle = focusNode.currentStyle;
      } else {
        var focusNodeStyle = this.__doc.defaultView.getComputedStyle(focusNode, null);
      }

      /*
       * BOLD
       */
      var isBold;

      if (qx.core.Client.getInstance().isMshtml() || qx.core.Client.getInstance().isOpera()) {
        isBold = focusNodeStyle.fontWeight == 700 ? true : false;
      } else {
        isBold = focusNodeStyle.getPropertyValue("font-weight") == "bold";
      }

      /*
       * ITALIC
       */
      var isItalic;

      if (qx.core.Client.getInstance().isMshtml()) {
        isItalic = focusNodeStyle.fontStyle == "italic";
      } else {
        isItalic = focusNodeStyle.getPropertyValue("font-style") == "italic";
      }

      this.dispatchEvent(new qx.event.type.DataEvent("cursorContext", [ isBold, isItalic ]), true);

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
     * @signature function()
    */
    __getSelection : qx.core.Variant.select("qx.client",
    {
       "mshtml" : function()
       {
         return this.__doc.selection
       },
       
       "default" : function()
       {
         return this.getContentWindow().getSelection();
       }
    }),
    
    
    /*
     -----------------------------------------------------------------------------
     TEXT RANGE
     -----------------------------------------------------------------------------
    */
    
    /**
     * returns a range for the current selection
     * 
     * @param sel {Selection} current selection object
     * @return {Range} Range object     
     * @signature function(sel)
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
     * Returns the node where the selection ends
     * 
     * @return {Node}
     * @signature function()
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
