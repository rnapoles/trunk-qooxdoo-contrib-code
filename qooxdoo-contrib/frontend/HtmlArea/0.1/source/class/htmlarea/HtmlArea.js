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
    this.addEventListener("keyup", this._handleEvent);
    this.addEventListener("keydown", this._handleEvent);
    this.addEventListener("keypress", this._handleEvent);

    /* check for available content */
    if (typeof value == "string") {
      this.setValue(value);
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
             * check every img element if it is a smiley image
             * every smiley image has an additional attribute "smileytype"
             * 
             * return the ascii chars instead of the image tag
             * -> the ascii chars will get copied to the result html string
             */

            if (root.tagName.toLowerCase() == "img")
            {
              if (root.attributes.smileytype)
              {
                var type = root.attributes.smileytype.nodeValue;
                html = htmlarea.HtmlArea.__getAsciiSmiley(type);

                if (html != null) {
                  return html;
                }
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
     * 
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

      var focusBlurTarget = qx.core.Client.getInstance().isMshtml() ? this.__doc.body : qx.core.Client.getInstance().isWebkit() ? this.getContentWindow() : this.__doc;

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
      if (qx.core.Client.getInstance().isGecko())
      {
        try
        {
          /* 
           * use the new command "styleWithCSS" to turn on CSS
           * useCSS is deprecated - see http://www.mozilla.org/editor/midas-spec.html
           */
          this.__doc.execCommand("styleWithCSS", false, true);
        }
        catch(ex)
        {
          try {
            this._doc.execCommand("useCSS", false, false);
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
      switch(qx.core.Client.getInstance().getEngine())
      {
        case "gecko":
          this.getContentWindow().focus();
          break;

        case "mshtml":
        case "opera":
        case "webkit":
          if (this.__isLoaded) {
            this.__doc.body.focus();
          }
          break;
      }

      qx.ui.embed.Iframe.prototype._visualizeFocus.call(this);
    },




    /*
    ---------------------------------------------------------------------------
      EVENT HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * All key events are delegated to this method
     *
     * @type member
     * @param e {Object} Event object
     * @return {void} 
     */
    _handleEvent : function(e)
    {
      var keyIdentifier = e.getKeyIdentifier().toLowerCase();

      if (e.getType() == "keypress")
      {
        //    this.debug(e.getType() + " | " + keyIdentifier + " | " + e.getCharCode() + " | " + e.getKeyCode());
        switch(keyIdentifier)
        {
          case "tab":
            if (qx.core.Client.getInstance().isGecko())
            {
              //          this.debug("TAB");
              /* TODO - right implementation? */
              this.getFocusRoot().getFocusHandler()._onkeyevent(this.getFocusRoot(), e);
            }

            break;
          
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

          default:
            if (qx.core.Client.getInstance().isMshtml())
            {
              /* 
               * SPECIAL CASE FOR IE
               * DO NOT allow to delete an image with "Backspace"
               * this will lead IE to crash the editor component (no working focus handling etc.)
               * 
               * Recognize the control selection and clear the selection - this
               * prevents IE from crashing the editor component
               */

              if (keyIdentifier == "backspace")
              {
                var sel = this.__getSelection();
 
                if (sel.type == "Control")
                {
                  sel.clear();
                  return;
                }
              }
            }
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
     * Called with every focus event of the editor
     * 
     * @type member
     * @return {void}
     */
   __onFocus : function()
   {
     this.__valueOnFocus = this.getComputedValue();
   },
   
   
   /**
    * Called with every blur event of the editor
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
//      this.debug("handleMouse " + e.type);

      // TODO: transform the DOM events to real qooxdoo events - just like the key events
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
      // check for number
      // TODO: implementation correct? what if "10px" is given as parameter value?
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

            this.__doc.execCommand(cmd, ui, value);

            var o = this;

            if (qx.core.Client.getInstance().isMshtml())
            {
              window.setTimeout(function(e)
              {
                /* 
                 * IE needs to change the activeChild to the editor component
                 * otherwise the e.g. pressed button (to set the selected content bold)
                 * will receive the following events
                 * call _visualizeFocus to get the right feedback to the user (editor is active)
                 */

                qx.ui.core.ClientDocument.getInstance().setActiveChild(o);
                o._visualizeFocus();
              },
              50);
            }
            else if (qx.core.Client.getInstance().isWebkit())
            {
              /*
              	* Webkit needs a mix of both (IE/Gecko). It is needed to (re)set the editor widget
               * as the active child and to focus the editor widget (again).
              	*/
              window.setTimeout(function(e)
              {
                qx.ui.core.ClientDocument.getInstance().setActiveChild(o);
                o.getContentWindow().focus();
              },
              50);
            }
            else
            {
              /*
               * for all other browser a short delayed focus on the contentWindow should do the job
               */
              window.setTimeout(function(e) {
                o.getContentWindow().focus();
              }, 50);
            }
          }
          catch(ex)
          {
            //      this.debug("execCommand " + cmd + " with value " + value + " failed");
            return false;
          }
      }

      return true;
    },




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
     * get html content (call own recursive method)
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
      /*
       * setting a timeout is important to get the right result
       */
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
      //  this.debug("_examineCursorContext |" + this.getEditable());
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

      //  this.debug("examineCursor " + isBold + "  " + isItalic);
      this._processingExamineCursorContext = false;
    },
  
    /*
     -----------------------------------------------------------------------------
     SELECTION
     -----------------------------------------------------------------------------
    */
      
    /**
     * returns the current selection object
     * 
     * @return {Selection} Selection object
    */
    __getSelection : function()
    {
       if (qx.core.Variant.isSet("qx.client", "mshtml"))
       {
          return this.__doc.selection
       }  
       else
       {
          return this.getContentWindow().getSelection();
       }
    },
    
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
     */    
    __createRange : function(sel)
    {
       if (qx.core.Variant.isSet("qx.client", "mshtml"))
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
       }
       else
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
    },
   
   
    /*
      -----------------------------------------------------------------------------
      NODES
      -----------------------------------------------------------------------------
    */
    /**
      returns the node where the selection ends
    */
    getFocusNode : function()
    {
       if (qx.core.Variant.isSet("qx.client", "mshtml"))
       {
         var sel = this.__getSelection();
         var rng;
      
         switch(sel.type)
         {
           case "Text":
           case "None":
             // It seems that even for selection of type "None",
             // there _is_ a correct parent element
             rng = this.__createRange(sel);
             rng.collapse(false);  // collapse to end
             return rng.parentElement();
      
           case "Control":
             rng = this.__createRange(sel);
      
             try {
               rng.collapse(false);  // collapse to end
             } catch(ex) {}
      
             return rng.item(0);
      
           default:
             return this.__doc.body;
         }
       }
       else
       {
         return this.__getSelection().focusNode.parentNode;
       }
    }
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

    // TODO: complete disposing
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

    this._disposeFields("__handleEvent", "__handleFocusEvent", "handleMouseEvent", "__doc", "__contentWrap");
  }
});