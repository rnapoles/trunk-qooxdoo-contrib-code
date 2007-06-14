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

/* ************************************************************************

#resource(htmlarea:smileys)
#require(htmlarea.Settings)

************************************************************************ */


/**
 * Rich text editor widget
 * 
 * @param Content {string} Initial content
 * @param smileyMap {Object ? null} Data structure with all smilies which should be supported.
 * If not set a default set of smilies is supported.
 * <table>
 *   <tr>
 *     <td>Usage is:</td>
 *   </tr>
 *   <tr>
 *     <td>{ meaning : "chars", meaning2 : "chars2" }</td>
 *   </tr>
 *   <tr>
 *     <td>{ laugh : ":-)",</td>
 *   </tr>
     <tr>
 *     <td>twinkle : ";-)" }</td>
 *   </tr>
 * </table>
 * The key meaning is also the name of the smiley image which should be inserted. Please do not add short versions
 * of smilies like ":)" or ";)". These will be automatically added and recognized.
 * 
 */
qx.Class.define("htmlarea.HtmlArea",
{
  extend : qx.ui.embed.Iframe,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(value, smileyMap)
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

    /* create all data structures needed for smiley handline */
    this.__createSmileyDataStructures(smileyMap);
    
   
    /*
     * "Fix" Keycode to identifier mapping in opera to suit the needs
     * of the editor component
     */
    if (qx.core.Client.getInstance().isOpera())
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
    },


    /**
     * Translates the meaning (e.g. "twinkle") to the corresponding ascii characters
     *
     * @type static
     * @param smileyType {String} Smileytype to translate
     * @return {String | null} smiley or null
     */
    __getAsciiSmiley : function(smileyType) {
      return typeof htmlarea.HtmlArea.__meaning2Type[smileyType] != "undefined" ? htmlarea.HtmlArea.__meaning2Type[smileyType] : null;
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


    /** Location where the smiley images are stored */
/*
    smileyLocation :
    {
      check : "String",
      init  : qx.io.Alias.getInstance().resolve("smileys/smileys")
    },
*/

    /** File extension for smiley images */
    smileyFileExtension :
    {
      check : "String",
      init  : "gif"
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

    
    getSmileyLocation : function()
    {
      return qx.io.Alias.getInstance().resolve("smileys/smileys");
    },
    
    
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

    /* 
     * flag for controlling the insertion of a smiley
     * if flag is set during the "keypress" event, the
     * smiley gets inserted at the "keyup" event
     */
    __insertSmiley : false,


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

      /* 
       * START SMILEY HANDLING PART 1
       */

      if (qx.core.Client.getInstance().isMshtml())
      {
        /*
         * Catch the "keyup" event for the keys "Backspace" and "Delete" to easier identify smiley characters.
         * The identification in the "keypress" handler is much more difficult to handle.
         * 
         * Also insert smilies if the according flag is set. This is handled with the "keyup" event because 
         * the IE then has the full TextRange ( keypress -> ":-", keyup -> ":-)" ). If the user is typing ahead
         * the TextRange ends with ":-" when handling the keypress event. Expanding the TextRange is not possible.
         * You have to wait until the keyup event is handled to get access to the currently inserted key to process
         * the smiley handling.
         */

        if ((e.getType() == "keyup" && (keyIdentifier == "backspace" || keyIdentifier == "delete")) || (e.getType() == "keyup" && this.__insertSmiley == true))
        {
          //      this.debug("backspace delete");
          /* reset flag */
          this.__insertSmiley = false;

          /* create new TextRange */
          var search_rng = this.__doc.body.createTextRange();

          /* check for start smiley chars */
          for (var i=0, j=htmlarea.HtmlArea.__startSmileyArr.length; i<j; i++)
          {
            if (search_rng.findText(htmlarea.HtmlArea.__startSmileyArr[i]))
            {
              /* move by one character and check for any smiley chars which can occur in the middle */
              search_rng.moveEnd("character", 1);

              if (htmlarea.HtmlArea.__middleSmileyChars.indexOf(search_rng.text.charAt(1)) != -1)
              {
                /* 
                 * if middle smiley char was found move the search range one character more to access
                 * the complete smiley shortcut
                 */

                search_rng.moveEnd("character", 1);
              }

              /* 
               * get the text of the TextRange -> should contain Smiley
               * set valid flag -> assume text contains a smiley
               */

              var part = search_rng.text;
              var valid = true;

              //          this.debug("Part: |" + part + "|  " + part.length);
              if (part.length > 1)
              {
                for (var i=0, j=part.length; i<j; i++)
                {
                  /* 
                   * check all chars within the selected parts
                   * if any char IS NOT a smiley char set the flag to avoid
                   * further processing
                   */

                  if (htmlarea.HtmlArea.__smileyChars.indexOf(part.charAt(i).toLowerCase()) == -1) {
                    valid = false;
                  }
                }

                if (valid == true)
                {
                  //              this.debug("insertSmiley");
                  /*
                   * search for the right smiley and add it
                   */

                  for (var i=0, j=htmlarea.HtmlArea.__smileys.length; i<j; i++)
                  {
                    if (part.toLowerCase() == htmlarea.HtmlArea.__smileys[i])
                    {
                      this.insertSmiley(part, search_rng);
                      return;
                    }
                  }
                }
              }
            }
          }
        }
      }

      //            this.debug("|" + search_rng.text + "|");
      else  /* NON-IE PART */
      {
        if (e.getType() == "keyup" && this.__insertSmiley == true)
        {
          /* reset flag */
          this.__insertSmiley = false;

          /* create new range */
          var range = this.__getSelection().getRangeAt(0);

//                this.debug("KEYUP: " + this.__start + " " + this.__end);
          /*
           * set the start and end of the range to select the 
           * ASCII chars. The smiley insertion will replace the 
           * chars with the corresponding image
           */

          if (this.__start >= 0) {
            range.setStart(this.__container, this.__start);
          } else {
            range.setStart(this.__container, 0);
          }

//                this.debug("RANGE: |" + range.toString() + "|");
          range.setEnd(this.__container, this.__end);

//                this.debug("RANGE2: |" + range.toString() + "|");
          
          /* insert the smiley */
          this.insertSmiley(range.toString(), range);
        }
      }

      /* 
       * END SMILEY HANDLING PART 1
       */

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

          case "enter":
            /* if only "Enter" key was pressed and "messengerMode" is activated */
            if (e.isShiftPressed() == false && this.getMessengerMode() == true)
            {
              e.preventDefault();
              e.stopPropagation();

              /* dispatch data event with editor content */
              this.dispatchEvent(new qx.event.type.DataEvent("messengerContent", this.getComputedValue()), true);

              /* reset the editor content */
              this.resetHtml();
            }

            break;

            /*
             * for all keys which are able to reposition the cursor
             * start to examine the current cursor context
             * 
             * *** FALLTHROUGH ***
             * This fallthrough is especially needed for Opera
             * (due the broken key handling and the wrong keyidentifiers)
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

          default:
            /*
             * check for smiley or special indentifier chars
             * if current key is member of any of those two groups start smiley detection
             * 
             * SPECIAL CASE FOR OPERA
             * due the broken key handling in Opera it is needed to implement this extra check.
             * See at the constructor for details.
             */

            if ((htmlarea.HtmlArea.__smileyChars.indexOf(keyIdentifier) != -1 || htmlarea.HtmlArea.__specialIdentifiers.indexOf(keyIdentifier) != -1) || 
                (qx.core.Client.getInstance().isOpera() && e.isShiftPressed() && (keyIdentifier == "home" || keyIdentifier == "down" || keyIdentifier == "right")))
            {
              //          this.debug("SMILEY " + keyIdentifier);
              /*
               * manipulation of the keyIdentifier for Opera and his
               * "special" keyidentifiers
               */

              if (qx.core.Client.getInstance().isOpera())
              {
                if (e.isShiftPressed())
                {
                  switch(keyIdentifier)
                  {
                    case "home":
                      keyIdentifier = "$";
                      break;

                    case "down":
                      keyIdentifier = "(";
                      break;

                    case "right":
                      keyIdentifier = "'";
                      break;
                  }
                }
              }

              if (qx.core.Client.getInstance().isMshtml())
              {
                /* 
                 * SPECIAL CASE FOR IE
                 * DO NOT allow to delete an image (e.g. a smiley) with "Backspace"
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

                /* create new range and initialize */
                var search_rng = this.__doc.body.createTextRange();
                var checkForSmiley = false;
                var part = "";

                //            this.debug("search_rng: " + search_rng.text);
                for (var i=0, j=htmlarea.HtmlArea.__startSmileyArr.length; i<j; i++)
                {
                  /* if the current key is an start smiley character */
                  if (keyIdentifier == htmlarea.HtmlArea.__startSmileyArr[i])
                  {
                    /*
                     * check for middle smiley characters with the "findText()" method
                     * if any character is found, move the range end and set the flag
                     */

                    for (var i=0, j=htmlarea.HtmlArea.__middleSmileyArr.length; i<j; i++)
                    {
                      if (search_rng.findText(htmlarea.HtmlArea.__middleSmileyArr[i]))
                      {
                        search_rng.moveEnd("character", 1);
                        checkForSmiley = true;
                        break;
                      }
                    }

                    /*
                     * if no middle smiley character was found search for end smiley characters
                     * if any character is found, just set the flag. No need to move the range end.
                     */

                    if (checkForSmiley == false)
                    {
                      for (var i=0, j=htmlarea.HtmlArea.__endSmileyArr.length; i<j; i++)
                      {
                        if (search_rng.findText(htmlarea.HtmlArea.__endSmileyArr[i]))
                        {
                          checkForSmiley = true;
                          break;
                        }
                      }
                    }

                    /* concat smiley chars with the current range */
                    part = keyIdentifier + search_rng.text;
                  }

                  /*
                   * check for start smiley chars already contained in the range
                   * -> current key is any smiley character except any start smiley character
                   */

                  if (search_rng.findText(htmlarea.HtmlArea.__startSmileyArr[i]))
                  {
                    //                this.debug("FOUND");
                    /* move the range 2 chars to the right to cover the (possible) smiley */
                    search_rng.moveEnd("character", 2);

                    part = search_rng.text;

                    /* 
                     * check for short smiley
                     * -> current identifier is smiley char and no middle smiley char
                     */
                    if (part.length == 1 && htmlarea.HtmlArea.__smileyChars.indexOf(keyIdentifier) != -1 && 
                        htmlarea.HtmlArea.__middleSmileyChars.indexOf(keyIdentifier) == -1)
                    {
                      //                  this.debug("Part1: " + part);
                      part = part + keyIdentifier;

                      //                  this.debug("Part1: " + part);
                      checkForSmiley = true;
                    }

                    /*
                     * check for normal smiley
                     * -> current identifier is a smiley char
                     */
                    else if (part.length > 1 && htmlarea.HtmlArea.__smileyChars.indexOf(part.charAt(1).toLowerCase()) != -1 && 
                             htmlarea.HtmlArea.__smileyChars.indexOf(keyIdentifier) != -1)
                    {
                      //                  this.debug("Part2: |" + part + "|");
                      /* 
                       * if last char of the part is no smiley char
                       * -> exclude char and concat only the first two with the keyIdentifier
                       */
                      if (htmlarea.HtmlArea.__smileyChars.indexOf(part.charAt(2)) == -1) {
                        part = part.substring(0, 2) + keyIdentifier;
                      } else {
                        part = part + keyIdentifier;
                      }

                      //                  this.debug("Part2: |" + part + "|");
                      checkForSmiley = true;
                    }

                    /*
                     * Second char of part is no smiley char
                     * -> Concat first char with the keyIdentifier and enable the check for smiley
                     * Basically this is a little bit of guessing :)
                     */
                    else if (part.length > 1 && htmlarea.HtmlArea.__smileyChars.indexOf(keyIdentifier) != -1)
                    {
                      part = part.charAt(0) + keyIdentifier;

                      checkForSmiley = true;
                    }
                  }

                  /*
                   * the part variable consists of smiley characters
                   * check if it's any of the smilies
                   */
                  if (checkForSmiley == true)
                  {
                    for (var i=0, j=htmlarea.HtmlArea.__smileys.length; i<j; i++)
                    {
                      if (part.toLowerCase() == htmlarea.HtmlArea.__smileys[i])
                      {
                        /* 
                         * set the flag - this ensures that the smiley gets inserted
                         * with the next "keyup" event
                         */
                        this.__insertSmiley = true;
                        return;
                      }
                    }
                  }
                }
              }
              else  /* NON-IE PART */
              {
                var sel         = this.__getSelection();

                var rng         = sel.getRangeAt(0);
                var offset      = rng.startOffset;

                var anchor      = sel.anchorNode;
                var anchorValue = anchor.nodeValue;
                
//                this.debug("START " + offset + " " + rng.startContainer);

                if (sel.isCollapsed && anchor.nodeType == 3)
                {
                  /* only check if more than 1 char is available */
                  if (offset > 0)
                  {
                    var len            = anchorValue.length;
                    var part           = "";

                    var leftChar       = "";
                    var posSmileyLeft  = null;
                    var indexLeft      = null;

                    var rightChar      = "";
                    var posSmileyRight = null;
                    var indexRight     = null;

                    /* char was added at the end of the range */
                    if (offset == len)
                    {
                      /* check the char at the left of the cursor */
                      if (htmlarea.HtmlArea.__smileyChars.indexOf(anchorValue.charAt(len - 1).toLowerCase()) != -1)
                      {
                        /* set the index variables */
                        indexRight = 1;
                        indexLeft = 1;

                        /* concat char at the left with the current identifier */
                        part = anchorValue.substring(len - indexLeft) + keyIdentifier;

                        //                    this.debug("PART " + part);
                        /* next char at the left */
                        if (len - (indexLeft + 1) >= 0)
                        {
                          /* get the next char at the left */
                          leftChar = anchorValue.substr(len - (indexLeft + 1), 1).toLowerCase();

                          //                      this.debug("length " + len + " " + (indexLeft + 1) + " leftChar " + leftChar);
                          /* if char is smiley char -> concat it with the existing part */
                          if (htmlarea.HtmlArea.__smileyChars.indexOf(leftChar) != -1)
                          {
                            part = leftChar + part;
                            indexLeft++;
                          }
                        }
                      }
                    }
                    /* char was added before the end of the range */
                    else
                    {
                      indexLeft      = keyIdentifier == "backspace" ? 2 : 1;
                      leftChar       = anchorValue.charAt(offset - indexLeft).toLowerCase();
                      posSmileyLeft  = htmlarea.HtmlArea.__smileyChars.indexOf(leftChar);

                      indexRight     = keyIdentifier == "delete" ? 1 : 0;
                      rightChar      = anchorValue.charAt(offset + indexRight).toLowerCase();
                      posSmileyRight = htmlarea.HtmlArea.__smileyChars.indexOf(rightChar);

//                                        this.debug("|" + leftChar + "|   |" + rightChar + "|");
//                                        this.debug("posSmileyLeft: " + posSmileyLeft + " posSmileyRight: " + posSmileyRight);
                      /* at both sides there are smiley chars - this can only happen with "Delete" and "Backspace"(?) */
                      if (posSmileyLeft != -1 && posSmileyRight != -1)
                      {
                        part = leftChar + rightChar;

                        /* take a look at the left */
                        leftChar = anchorValue.charAt(offset - (indexLeft + 1)).toLowerCase();

                        //                    this.debug("NewLeftChar: |" + leftChar + "|");
                        if (htmlarea.HtmlArea.__smileyChars.indexOf(leftChar) != -1)
                        {
                          part = leftChar + part;
                          indexLeft++;
                        }

                        /* take a look at the right */
                        rightChar = anchorValue.charAt(offset + (indexRight + 1)).toLowerCase();

                        //                    this.debug("NewRightChar: |" + rightChar + "| indexRight " + indexRight);
                        if (htmlarea.HtmlArea.__smileyChars.indexOf(rightChar) != -1)
                        {
                          part = part + rightChar;

                          if (offset + (indexRight + 1) < len) {
                            indexRight++;
                          }
                        }
                      }

                      //                    this.debug("indexRight " + indexRight);
                      /* only left of the current char is a smiley char */
                      else if (posSmileyLeft != -1)
                      {
                        indexRight++;

                        part = leftChar + keyIdentifier;

                        leftChar = anchorValue.charAt(offset - (indexLeft + 1)).toLowerCase();
                        posSmileyLeft = htmlarea.HtmlArea.__smileyChars.indexOf(leftChar);

                        if (posSmileyLeft != -1)
                        {
                          part = leftChar + part;
                          indexLeft++;
                        }
                      }

                      /* only left of the current char is a smiley char */
                      else if (posSmileyRight != -1)
                      {
                        indexLeft--;
                        part = keyIdentifier + rightChar;

                        // take a look at the char at the right
                        rightChar = anchorValue.charAt(offset + (indexRight + 1)).toLowerCase();
                        posSmileyRight = htmlarea.HtmlArea.__smileyChars.indexOf(rightChar);

                        if (posSmileyRight != -1)
                        {
                          part = part + rightChar;
                          indexRight = indexRight + part.length;
                        }
                      }
                    }

//                                    this.debug("PART: |"+ part + "|");
                    /* check if the selected part is really a smiley shortcut */
                    if (part.length > 1)
                    {
                      for (var i=0, j=htmlarea.HtmlArea.__smileys.length; i<j; i++)
                      {
                        if (part.toLowerCase() == htmlarea.HtmlArea.__smileys[i])
                        {
//                                                this.debug("INSERT SMILEY offset " + offset + " indexLeft " + indexLeft + " indexRight " + indexRight);
                          this.__insertSmiley = true;
                          this.__container    = rng.commonAncestorContainer;
                          this.__start        = offset - indexLeft;
                          this.__end          = offset + indexRight;

                          return;
                        }
                      }
                    }
                  }
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
    ---------------------------------------------------------------------------
      SMILEYS
    ---------------------------------------------------------------------------
    * 
    * all Smileys are also usable without the dash e.g. ":-)" == ":)"
    * 
    * :-)             laugh
    * ;-)             twinkle
    * :-(             sad
    * :-o  and :-O    astonish
    * :-d  and :-D    laugh loud
    * :-p  and :-P    stick out tongue
    * :-|             disappointed
    * :-@             angry
    * :-s  and :-S    confused
    * 8-)             cool looking
    * :'(             crying
    * :-x             amorous
    * :-#             discreet
    * :-$             disgraced
    * 8-|             geek
    * 8o|             show teeth
    */

    /**
     * Builds all needed data structures for smiley handling
     *
     * @type member
     * @param smileyMap {Object ? null} Data structure of all smilies which should be supported
     * @return {void} 
     */
    __createSmileyDataStructures : function(smileyMap)
    {
      /* 
       * if parameter "smileyMap" is supplied build the needed data-structures
       * otherwise use the default values
       */

      if (typeof smileyMap == "object") {
        htmlarea.HtmlArea.__meaning2Type = smileyMap;
      }
      else
      {
        /*
         * map with all "standard" supported smilies
         */

        htmlarea.HtmlArea.__meaning2Type =
        {
          laugh            : ":-)",
          twinkle          : ";-)",
          sad              : ":-(",
          astonished       : ":-o",
          laugh_loud       : ":-d",
          stick_out_tongue : ":-p",
          speechless       : ":-|",
          angry            : ":-@",
          confused         : ":-s",
          cool_looking     : "8-)",
          crying           : ":'(",
          amorous          : ":-x",
          discreet         : ":-#",
          disgraced        : ":-$",
          geek             : "8-|",
          show_teeth       : "8o|"
        };
      }

      // list of all used data structures
      htmlarea.HtmlArea.__type2Meaning = {};

      htmlarea.HtmlArea.__smileyChars = "";
      htmlarea.HtmlArea.__startSmileyArr = [];
      htmlarea.HtmlArea.__middleSmileyChars = "";
      htmlarea.HtmlArea.__middleSmileyArr = [];
      htmlarea.HtmlArea.__endSmileyArr = [];
      htmlarea.HtmlArea.__specialIdentifiers = " backspace delete ";
      htmlarea.HtmlArea.__smileys = [];

      // helper variables
      var startSmileyChars = "";
      var endSmileyChars = "";

      for (var meaning in smileyMap)
      {
        var smiley = smileyMap[meaning];

        /* 
         * a short smiley e.g. is ":)" or ";)"
         * take a look if a "-" char is existent and then build the short smiley
         */
        var shortSmiley = "";

        if (smiley.indexOf("-") != -1) {
          shortSmiley = smiley.substr(0, 1) + smiley.substr(2, 1);
        }

        // adding the smilies
        htmlarea.HtmlArea.__type2Meaning[smiley] = meaning;
        htmlarea.HtmlArea.__smileys.push(smiley);

        // adding the short smilies if available
        if (shortSmiley != "")
        {
          htmlarea.HtmlArea.__type2Meaning[shortSmiley] = meaning;
          htmlarea.HtmlArea.__smileys.push(shortSmiley);
        }

        /* 
         * building up the rest of the data structures
         * looping over every smiley and build the needed data structures
         */
        for (var i=0, j=smiley.length; i<j; i++)
        {
          if (htmlarea.HtmlArea.__smileyChars.indexOf(smiley.charAt(i)) == -1) {
            htmlarea.HtmlArea.__smileyChars += smiley.charAt(i);
          }

          /* 
           * fill the different structures with their needed data
           */
          switch(i)
          {
            case 0:
              if (startSmileyChars.indexOf(smiley.charAt(i)) == -1)
              {
                startSmileyChars += smiley.charAt(i);
                htmlarea.HtmlArea.__startSmileyArr.push(smiley.charAt(i));
              }

              break;

            case 1:
              if (htmlarea.HtmlArea.__middleSmileyChars.indexOf(smiley.charAt(i)) == -1 && smiley.length == 3)
              {
                htmlarea.HtmlArea.__middleSmileyChars += smiley.charAt(i);
                htmlarea.HtmlArea.__middleSmileyArr.push(smiley.charAt(i));
              }

              break;

            case 2:
              if (endSmileyChars.indexOf(smiley.charAt(i)) == -1)
              {
                endSmileyChars += smiley.charAt(i);
                htmlarea.HtmlArea.__endSmileyArr.push(smiley.charAt(i));
              }

              break;
          }
        }
      }
    },

    /*
      this.debug(qx.io.Json.stringify(htmlarea.HtmlArea.__type2Meaning));
    
      this.debug("start " + htmlarea.HtmlArea.__startSmileyArr);
      
      this.debug("middle " + htmlarea.HtmlArea.__middleSmileyArr);
      this.debug("middle " + htmlarea.HtmlArea.__middleSmileyChars);
      
      this.debug("end " + htmlarea.HtmlArea.__endSmileyArr);
      
      this.debug("smilies " + htmlarea.HtmlArea.__smileys);
      this.debug("smileyChars " + htmlarea.HtmlArea.__smileyChars);
    */

    /**
     * Inserts a smiley (image element) at the current position
     * If the insertion is done via a menu outside the editor 
     * you only have to provide the first parameter
     *
     * @type member
     * @param type {String} any supported smiley characters
     * @param range {Range ? null} Range object
     * @return {void} 
     */
    insertSmiley : function(type, range)
    {
      var meaning, url;
      var rng = typeof range != "undefined" ? range : null;

      //  this.debug("Smiley: " + type.toLowerCase() + " " + "Meaning: " + htmlarea.HtmlArea.__type2Meaning[type.toLowerCase()] );
      // setting the meaning
      meaning = typeof htmlarea.HtmlArea.__type2Meaning[type.toLowerCase()] != "undefined" ? htmlarea.HtmlArea.__type2Meaning[type.toLowerCase()] : null;

      // setting the url
      if (meaning != null)
      {
        // chain together the url
        url = this.getSmileyLocation() + "/" + meaning + "." + this.getSmileyFileExtension();
        var img, htmlPart;

        /*
         * IE inserts the smiley using "pasteHTML" on a range object
         * if no range is given as parameter a new one is build.
         * collapse the range at the end to show the caret.
         */

        if (qx.core.Client.getInstance().isMshtml())
        {
          htmlPart = '<img src="' + url + '" smileytype="' + meaning + '"  style="width:20px;height:20px;" unselectable="on" border="0"/>';

          /*
           * if no range is available - inserting is done via a menu outside of the editor
           * create a new range from the current selection and collapse the range before 
           * inserting the image element
           */
          if (rng == null)
          {
            rng = this.__getSelection().createRange();
            rng.collapse(true);
          }

          rng.pasteHTML(htmlPart);
          rng.collapse(true);
        }

        /*
         * Gecko is using the "inserthtml" command to insert the smiley.
         * no use of ranges or selections is needed. Collapsing and showing
         * the caret is also done automatically.
         */
        else if (qx.core.Client.getInstance().isGecko())
        {
          // use the "inserthtml" command
          htmlPart = '<img src="' + url + '" smileytype="' + meaning + '" style="-moz-user-select:none;width:20px;height:20px;" border="0"/>';

          var res = this._execCommand("inserthtml", false, htmlPart);
        }

        //      this.debug("insertHtml " + res);
        else
        {
          /*
           * IMPORTANT NOTE
           * When using the execCommand "inserthtml" it is not possible (I tried many options at least)
           * to reset the lost cursor/caret. A workaround for both is to use the "insertNode" method of 
           * the Range object. Using this the caret gets not lost. The only drawback is that the caret is
           * positioned right before the image and not after it.
           * 
           * DO NOT USE the method "normalize" on "this.__doc.body". This will lead to a HIERARCHY_REQUEST_ERR
           * in Webkit.
           * The "normalize" method collapse all sibling text nodes into one single text node.
           */

          //      this.debug("insertSmiley");
          // delete contents if range is available
          if (rng != null) {
            rng.deleteContents();
          }

          var imgNode = this.__doc.createElement("img");

          var attributes =
          {
            "src"        : url,
            "smileyType" : meaning,
            "style"      : "width:20px;height:20px",
            "border"     : 0
          };

          for (var attrName in attributes)
          {
            var attrNode = this.__doc.createAttribute(attrName);
            attrNode.nodeValue = attributes[attrName];

            imgNode.setAttributeNode(attrNode);
          }

          /* insert the image node */
          rng.collapse(true);
          rng.insertNode(imgNode);
          rng.collapse(true);

          if (qx.core.Client.getInstance().isOpera())
          {
            /* 
             * create a new selection and corresponding range, select the 
             * new inserted image node and add this range to the selection.
             * This ensures - at least for Opera - that the cursor is displayed
             * after the smiley image and the user can type ahead (as expected).
             */
            var sel = this.__getSelection();
            var rng = this.__createRange(sel);
            rng.selectNode(imgNode);
            sel.addRange(rng);
            rng.collapse(true);
          }
        }
      }
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
   * Defer
   *
   * @type member
   */
  defer : function() 
  {
    qx.io.Alias.getInstance().add("smileys", qx.core.Setting.get("htmlarea.resourceUri"));
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

    this._disposeFields("__handleEvent", "__handleFocusEvent", "handleMouseEvent", "__doc", "__contentWrap", "__meaning2Type", "__type2Meaning", "__startSmileyArr",
                        "__middleSmileyArr", "__endSmileyArr", "__smileys");
  }
});