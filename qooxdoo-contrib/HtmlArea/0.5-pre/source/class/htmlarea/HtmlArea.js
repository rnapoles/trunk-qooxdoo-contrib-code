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
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * Rich text editor widget
 *
 * @param value {String} Initial content
 * @param styleInformation {String | Map | null} Optional style information for the editor's document
 *                                               Can be a string or a map (example: { "p" : "padding:2px" }
 * @param source {String} source of the iframe
 */
qx.Class.define("htmlarea.HtmlArea",
{
  extend : qx.ui.embed.Iframe,
  
  /*
   * IMPORTANT NOTE
   * If you add functionality which manipulates the content of the HtmlArea
   * AND you want make these changes undo-/redo-able you have to make sure
   * to implement methods in the "Manager" and "UndoManager" classes. 
   */

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(value, styleInformation, source)
  {
    this.base(arguments, source || null);

    /* Set some init values */
    this.__isLoaded = false;
    this.__isEditable = false;
    this.__isReady = false;

    this.__firstLineSelected = false;
    this.__listEntryStyles = "";

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
    this.__handleBlurEvent = qx.lang.Function.bind(this._handleBlurEvent, this);
    this.__handleFocusOut = qx.lang.Function.bind(this._handleFocusOut, this);


    /**
     * Wrapper method for mouse events.
     * The mouse events are primarily needed to examine the current cursor context.
     * The cursor context examines if the current text node is formatted in any manner
     * like bold or italic. An event is thrown to e.g. activate/deactivate toolbar buttons.
     *
     * @param e {Object} Event object
     */
    this.__handleMouseEvent = qx.lang.Function.bind(this._handleMouseEvent, this);
    this.__handleContextMenuEvent = qx.lang.Function.bind(this._handleContextMenuEvent, this);

    /*
     * Catch load event - no timer needed which polls if the component is ready and
     * to set the editor in the "editable" mode.
     */
    this.addEventListener("load", this._loaded, this);

    /*
     * Catch key events. The DOM key events get transformed to qooxdoo key event objects
     * to use facilities like "keyIdentifier". It is neccesary to catch the events directly
     * at the editor instance. This is the point to which the qooxdoo key event handler
     * dispatches all his events.
     */
    this.addEventListener("keyup",    this._handleKeyUp,    this);
    this.addEventListener("keydown",  this._handleKeyDown,  this);
    this.addEventListener("keypress", this._handleKeyPress, this);

    /* Check for available content */
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

    /*
     * Build up this commandManager object to stack all commands
     * which are arriving before the "real" commandManager is initialised.
     * Once initialised the stacked commands will be executed.
     */
    this.__commandManager = this.__createStackCommandManager();
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
     * Thrown when the editor gets an error at loading time.
     */
    "loadingError"     : "qx.event.type.DataEvent",

    /**
     * Only available if messengerMode is active. This event returns the current content of the editor.
     */
    "messengerContent" : "qx.event.type.DataEvent",

    /**
     * This event holds a data map which informs about the formatting at the
     * current cursor position. It holds the following keys:
     * 
     * * bold
     * * italic
     * * underline
     * * strikethrough
     * * fontSize
     * * fontFamily
     * * insertUnorderedList
     * * insertOrderedList
     * * justifyLeft
     * * justifyCenter
     * * justifyRight
     * * justifyFull
     * 
     * This map can be used to control/update a toolbar states.
     */
    "cursorContext"    : "qx.event.type.DataEvent",

    /**
     * This event is dispatched when the editor is ready to use
     */
    "ready"            : "qx.event.type.Event",

    /**
     * This event is dispatched when the editor gets the focus and his own handling is done
     */
    "focused"          : "qx.event.type.Event",

    /**
     * This event is dispatched when the document receives an "focusout" event
     */
    "focusOut"         : "qx.event.type.Event",

    /**
     * This event is dispatched when the editor gets a right click.
     */
    "contextmenu"      : "qx.event.type.DataEvent",

    /** 
      * Holds information about the state of undo/redo
      * Keys are "undo" and "redo".
      * Possible values are 0 and -1 to stay in sync with
      * the kind the "cursorContext" event works.
      * (1 = active/pressed, 0 = possible/not pressed, -1 = disabled)
      */
    "undoRedoState"    : "qx.event.type.DataEvent"
  },



  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /* This string is inserted when the property "insertParagraphOnLinebreak" is false */
    simpleLinebreak : "<br>",
    
    EMPTY_DIV : "<div></div>",

    /* regex to extract text content from innerHTML */
    GetWordsRegExp     : /([^\u0000-\u0040\u005b-\u005f\u007b-\u007f]|['])+/g,
    CleanupWordsRegExp : /[\u0000-\u0040]/gi,

    /**
     * Formats the style information. If the styleInformation was passed
     * in as a map it gets converted to a string.
     *
     * @type static
     * @param styleInformation {Map} CSS styles which should be applied at startup of the editor
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
          str += i + " { " + styleInformation[i] + " }";
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
     * @param skipHtmlEncoding {Boolean ? false} whether the html encoding of text nodes should be skipped
     * @return {String} Content of current node
     */
    __getHtml : function(root, outputRoot, skipHtmlEncoding)
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
            // get all of the children nodes of the div placeholder
            // but DO NOT return the placeholder div elements itself.
            // This special case is only relevant for IE browsers
            if (qx.core.Variant.isSet("qx.client", "mshtml"))
            {
              if (root.tagName.toLowerCase() == "div" && 
                  root.className && root.className == "placeholder")
              {
                for (i=root.firstChild; i; i=i.nextSibling) {
                  html += htmlarea.HtmlArea.__getHtml(i, true, skipHtmlEncoding);
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
                if (qx.core.Client.getInstance().isMshtml())
                {
                  if (name == "id" && root.getAttribute("old_id")) {
                    value = root.getAttribute("old_id");
                  } 
                  else if (!isNaN(value))
                  {
                    // IE5: buggy on number values
                    // XXX: IE: String, Object, Number, Boolean, ... !!!
                    // XXX: Moz: String only
                    value = root.getAttribute(name);
                  } else {
                    value = a.nodeValue;
                  }
                } else {
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
              
              if (name == "old_id") {
                continue;
              }
              
              if (name == "id" && 
                  qx.lang.String.startsWith(a.nodeValue, "__paragraph__")) {
                continue;
              }

              if (value == null) continue;
              html += " " + name + '="' + value.toString().replace(new RegExp('"', "g"), "'") + '"';
            }

            html += closed ? " />" : ">";
          }

          for (i=root.firstChild; i; i=i.nextSibling) {
            html += htmlarea.HtmlArea.__getHtml(i, true, skipHtmlEncoding);
          }

          if (outputRoot && !closed) {
            html += "</" + root.tagName.toLowerCase() + ">";
          }

          break;

        case 3:  // Node.TEXT_NODE
          html = skipHtmlEncoding ? root.data : htmlarea.HtmlArea.__htmlEncode(root.data);
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
     * Checks if the given node is a block node
     *
     * @type static
     * @param node {Node} Node
     * @return {Boolean} whether it is a block node
     */
    isBlockNode : function(node) {
      if (!qx.dom.Node.isElement(node))
      {
       return false;
      }

      node = node.nodeName || node;

      return /^(body|form|textarea|fieldset|ul|ol|dl|li|div|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(node.toLowerCase());
    },


    /**
     * Checks if one element is in the list of elements that are allowed to contain a paragraph in HTML
     *
     * @param node {Node} node to check
     * @return {Boolean}
     */
    isParagraphParent : function(node)
    {
      if (!qx.dom.Node.isElement(node))
      {
        return false;
      }

      node = node.nodeName || node;

      return /^(body|td|th|caption|fieldset|div)$/.test(node.toLowerCase());
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
    },


    /**
     * Toggles whether a p element is inserted on each line break or not.
     * A "normal" linebreak can be achieved using the combination "Shift+Enter" anyway
     */
    insertParagraphOnLinebreak :
    {
      check : "Boolean",
      init  : true
    },


    /**
     * if true we add a linebreak after control+enter
     */
    insertLinebreakOnCtrlEnter :
    {
      check : "Boolean",
      init  : true
    },


    /**
     * Toggles whether to use Undo/Redo
     */
    useUndoRedo :
    {
      check : "Boolean",
      init  : true
    },


    nativeFocused : {
      check : "Boolean",
      init  : false,
      apply : "_applyNativeFocused"
    }

  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    _preventFocusEvent : false,
    _listenerAdded     : false,
    _examineCursorContextTimer : null,

    /**
     * Blocks iframe. Overwritten method from Iframe class
     * IMPORTANT: the implementation of the parent class breaks
     * the Undo/Redo in IE.
     * 
     * @type member
     * @return {void}
     */
    block : function()
    {
      if (this._blockerNode) {
        this._blockerNode.style.display = "";
      } 
    },


    /**
     * Releases iframe. Overwritten method from Iframe class
     * IMPORTANT: the implementation of the parent class breaks
     * the Undo/Redo in IE.
     * 
     * @type member
     * @return {void}
     */
    release : function()
    {
      if (this._blockerNode) {
        this._blockerNode.style.display = "none";
      }
    },


    /** Initial content which is written dynamically into the iframe's document */
    __contentWrap :
    {
      "xhtml" :
      {
        doctype : '<!' + 'DOCTYPE html PUBLIC "-/' + '/W3C/' + '/DTD XHTML 1.0 Transitional/' + '/EN" "http:/' + '/www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
        html    : '<html xmlns="http:/' + '/www.w3.org/1999/xhtml" xml:lang="en" lang="en"><title></title>',
        meta    : '<meta http-equiv="Content-type" content="text/html; charset=UTF-8" />',
        style   : qx.core.Variant.select("qx.client",
        {
           "mshtml"  : 'html { margin:0px; padding:0px; } ' +
                       'body { font-size: 100.01%; font-family : Verdana, Geneva, Arial, Helvetica, sans-serif; width:100%; height:100%; background-color:transparent; overflow:show; background-image:none; margin:0px; padding:5px; }' +
                       'p { margin:0px; padding:0px; } ',
           "default" : 'html { width:100%; height:100%;margin:0px; padding:0px; overflow-y: auto; overflow-x: auto; }' +
                       'body { font-size: 100.01%; font-family : Verdana, Geneva, Arial, Helvetica, sans-serif; background-color:transparent; overflow:show; background-image:none; margin:0px; padding:5px; }' +
                       'p { margin:0px; padding:0px; } '
        }),
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
         var doc = this.getContentDocument();

         this.__value = value;
         doc.body.innerHTML = value;
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
     * @param skipHtmlEncoding {Boolean ? false} whether the html encoding of text nodes should be skipped
     * @return {String} computed value of the editor
     */
    getComputedValue : function(skipHtmlEncoding)
    {
      return this.getHtml(skipHtmlEncoding);
    },


    /**
     * Returns the complete content of the editor
     *
     * @type member
     * @return {String}
     */
    getCompleteHtml : function ()
    {
      return this.__getWrappedContent(this.getHtml(), true);
    },


    /**
     * Returns the body of the document
     *
     * @type member
     * @return {Object}
     */
    getContentBody : function ()
    {
      var doc = this.getContentDocument();

      if (doc) {
        return doc.body;
      }

      return null;
    },


    /** 
     * Returns all the words that are contained in a node.
     * 
     * @type member
     * @param node {Object} the node element where the text should be retrieved from.
     * @return {String[]} all the words.
     */
    getWords : function(node)
    {
      if (!node) {
        node = this.getContentBody();
      }

      // Clone the node
      var nodeClone = node.cloneNode(true);

      // Replace all ">" with space "> " to creat new word borders
      nodeClone.innerHTML = nodeClone.innerHTML.replace(/>/gi, "> ");

      var text  = qx.core.Variant.isSet("qx.client", "mshtml|opera") ? nodeClone.innerText : nodeClone.textContent;
      var words = text.match(htmlarea.HtmlArea.GetWordsRegExp);

      return !words ? [] : words;
    },


    /**
     * Returns a map of words and their element node.
     * 
     * @type member
     * @return {Map}
     */
    getWordsWithElement : function()
    {
      var list = this.getTextNodes();
      var result = {};
      var i, j, words, element, word;

      for(var i=0,len1=list.length; i<len1; ++i)
      {
        element = list[i];
        words = element.nodeValue.split(" ");

        for(var j=0,len2=words.length; j<len2; ++j)
        {
          word = this._cleanupWord(words[j]);

          if(word != null && word.length > 1)
          {
            if (!result[word])
            {
              result[word] = [];
            }

            result[word].push(element);
          }
        }
      }

      return result;
    },


    /**
     * Checks if the given node is insde a (ordered or unordered) list.
     * 
     * @param node {Object} The DOM node
     * @return {Boolean} True if node is inside a list, otherwise false.
     */
    __nodeInList : function(node)
    {
      while (node.nodeName.toLowerCase() != "body")
      {
        if (node.nodeName.toLowerCase() == "li") {
          return true;
        }
        node = node.parentNode;
      }

      return false;
    },
    

    /**
     * Scrubs off HTML code from the given word
     * 
     * @type member
     * @param word {String} word to clean
     * @return {String}
     */
    _cleanupWord : function(word)
    {
      if (!word)
      {
        return null;
      }

      return word.replace(htmlarea.HtmlArea.CleanupWordsRegExp, "");
    },


    /**
     * Returns an array of all text nodes 
     * 
     * @type member
     * @return {Node[]}
     */
    getTextNodes : function()
    {
      return this._fetchTextNodes(this.getContentDocument().body);
    },


    /**
     * Fetches all text nodes of the given element
     * 
     * @type member
     * @param element {Node} element to fetch text nodes of
     * @return {Node[]}
     */
    _fetchTextNodes : function(element)
    {
      var result = [];
      var tmp;
      
      // Element node
      if(element.hasChildNodes)
      {
        for(var i=0; i<element.childNodes.length; i++)
        {
          tmp = this._fetchTextNodes(element.childNodes[i]);
          qx.lang.Array.append(result, tmp);
        }
      }

      // Text node
      if(element.nodeType == 3)
      {
        // Contains real text
        if(element.nodeValue.length > 1)
        {
          result.push(element);
        }
      }

      return result;
    },


    /*
    ---------------------------------------------------------------------------
      INITIALIZATION
    ---------------------------------------------------------------------------
    */

    __loadCounter : 0,


    /**
     * overridden
     * 
     * @see qx.ui.core.Widget#_afterAppear
     */
    _afterAppear : function ()
    {
      this.base(arguments);

      this.forceEditable();
    },


    /**
     * @param isFocused {Boolean}
     * @return {void}
     */
    _syncNativeAndQxFocus : function (isFocused)
    {
      if (this.getFocused() !== isFocused) {
        this.setFocused(isFocused);
      }
    },


    /**
     * @param isFocused {Boolean}
     * @return {void}
     */
    _syncQxAndNativeFocus : function (isFocused)
    {
      if (this.getNativeFocused() !== isFocused) {
        this.setNativeFocused(isFocused);
      }
    },


    /**
     * @param isFocused {Boolean}
     * @return {void}
     */
    _applyNativeFocused : function (isFocused)
    {
      //if (qx.core.Variant.isSet("qx.debug", "on")) {
      //  this.debug("_applyNativeFocused("+isFocused+") | isFocused()="+this.isFocused());
      //}

      this._syncNativeAndQxFocus(isFocused);

      if (isFocused)
      {
        this.addState("focused");

        this.__storedSelectedHtml = null;
        this.createDispatchEvent("focused");
      }
      else
      {
        this.removeState("focused");

        if (this.__commandManager) {
          this.__commandManager.storeCurrentRange();
        }

        // Save range text
        if (this.__storedSelectedHtml == null) {
          this.__storedSelectedHtml = this.getSelectedHtml();
        }

        this.createDispatchEvent("focusOut");
      }
    },


    /**
     * overridden
     */
    _applyFocused : function (value, old)
    {
      //if (qx.core.Variant.isSet("qx.debug", "on")) {
      //  this.debug("_applyFocused("+value+") | isNativeFocused()="+this.isNativeFocused());
      //}

      if (typeof value !== "boolean") {
        this.warn("_applyFocused: invalid value of focused property: " + value);
      }

      if (!this.__isReady || !this.isCreated() || !this.isLoaded()) {
        this.warn("_applyFocused: htmlarea is not ready yet");
      }

      var focusRoot = this.getFocusRoot();

      if (value === true)
      {
        if (focusRoot.getActiveChild() !== this)
        {
          focusRoot.setActiveChild(this);
          focusRoot.setFocusedChild(this);
        }

        if (!this.isNativeFocused()) {
          this._visualizeFocus();
        }
      }
      else
      {
        if (this.isNativeFocused()) {
          this._visualizeBlur();
        }
      }
    },


    /**
     * Should be removed if someone find a better way to ensure that the document
     * is ready in IE6
     * 
     * @type member
     * @return {void}
     */
    __waitForDocumentReady : function()
    {
      var doc = this.getContentDocument();

      // first we try to get the document
      if (!doc)
      {
        this.__loadCounter++;

        if (this.__loadCounter > 5)
        {
          this.error('cant load HtmlArea. Document is not available. ' + doc);
          this.createDispatchDataEvent("loadingError");
        }
        else
        {
          if (qx.core.Variant.isSet("qx.debug", "on")) {
            this.debug('document not available, try again...');
          }
  
          qx.client.Timer.once(function()
          {
            this.__waitForDocumentReady();
          }, this, 0);
        }
      }
      else
      {
        // reset counter, now we try to open the document
        this.__loadCounter = 0;
        this._onDocumentIsReady();
      }
    },


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

      if (qx.core.Variant.isSet("qx.client", "gecko"))
      {
        // we need some thinking time in gecko --> https://bugzilla.mozilla.org/show_bug.cgi?id=191994
        qx.client.Timer.once(function()
        {
          this._onDocumentIsReady();
        }, this, 10);
      }
      else if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        // sometimes IE does some strange things and the document is not available
        // so we wait for it
        this.__waitForDocumentReady();
      }
      else
      {
        this._onDocumentIsReady();
      }
    },
    
    /**
     * Initializes the command manager, sets the document editable, renders
     * the content and adds a needed event listeners when the document is ready
     * for it.
     * After the successful startup the "ready" event is thrown.
     * 
     * @type member
     * @return {void}
     */
    _onDocumentIsReady : function()
    {
      // Release the blocker element to ensure everything works fine
      // during startup. This is especially important to prevent that the 
      // first click of the user hits the blocker node and the focus event
      // does not arrive the HtmlArea component (=iframe document and body)
      this.release();

      /* *******************************************
       *    INTIALIZE THE AVAILABLE COMMANDS       *
       * ***************************************** */

      /* Create a new command manager instance */
      var cm = new htmlarea.command.Manager(this);

      /* Decorate the commandManager with the UndoManager if undo/redo is enabled */
      if (this.getUseUndoRedo())
      {
       cm = new htmlarea.command.UndoManager(cm, this);
      }

      /* Set the "isLoaded" flag */
      this.__isLoaded = true;

      /*
       * For IE the document needs to be set in "designMode"
       * BEFORE the content is rendered.
       */
      if (qx.core.Variant.isSet("qx.client", "mshtml")) {
        this.setEditable(true);
      }

      /*
       * Render content - opens a new document and inserts
       * all needed elements plus the initial content
       */
      this.__renderContent();

      /*
       * Setting the document editable for all other browser engines
       * AFTER the content is set
       */
      if (!qx.core.Variant.isSet("qx.client", "mshtml")) {
        this.setEditable(true);
      }

      // now we can set the ready state
      this.__isReady = true;

      /* Look out for any queued commands which are execute BEFORE this commandManager was available */
      var commandStack = this.__commandManager.stackedCommands ?  this.__commandManager.commandStack : null;

      /* Inform the commandManager on which document he should operate */
      cm.setContentDocument(this.getContentDocument());

      /* Execute the stacked commmands - if any */
      if (commandStack != null)
      {
        for (var i=0, j=commandStack.length; i<j; i++) {
          cm.execute(commandStack[i].command, commandStack[i].value);
        }
      }

      // stack is finished, set commandManager to the real one
      this.__commandManager = cm;

      this.__fireReady();
    },
    
    
    /**
     * Retry mechanism to wait until the document is ready.
     * Calls the given handler if it was successfull.
     * 
     * @type member
     * @param retry {Number} counts the number of retries
     * @param handler {Function} callback function. Called after the mechanism was successful.
     * @param scope {var} the scope of the callback function
     * @return {void}
     */
    __waitforDocumentIsReady : function(retry, handler, scope) 
    {
      var doc = this.getContentDocument();

      if (!doc || !doc.body)
      {
        if (typeof retry === "undefined") {
          retry = 0;
        }

        if (retry < 5)
        {
          qx.client.Timer.once(function () {
            this.__waitforDocumentIsReady(++retry, handler, scope);
          }, this, 10);
        } 
        else 
        {
          this.createDispatchDataEvent("loadingError");
        }

        return;
      }
      handler.call(this);
    },


    /**
     * Tries to fire the ready event and to add the event listeners.
     * This is needed because of a possible race condition while loading the body
     * 
     * @type member
     * @return {void}
     */
    __fireReady : function()
    {
      this.__waitforDocumentIsReady(undefined, function()
      {
        /* Register all needed event listeners */
        this.__addEventListeners();
  
        /* dispatch the "ready" event at the end of the initialization */
        this.createDispatchEvent("ready");
      }, this);
    },

    /**
     * Forces the htmlArea to reset the document editable. This method can
     * be useful (especially for Gecko) whenever the HtmlArea was hidden and 
     * gets visible again.
     */
    forceEditable : qx.core.Variant.select("qx.client",
    {
      "gecko" : function()
      {
        var doc = this.getContentDocument();
        if (doc)
        {
          /* 
           * Don't ask my why, but this is the only way I found to get
           * gecko back to a state of an editable document after the htmlArea
           * was hidden and visible again.
           * Yes, and there are differences in Firefox 3.x and Firefox 2.x
           */
          if (qx.bom.client.Engine.VERSION >= "1.9")
          {
            doc.designMode = "Off";
          
            doc.body.contentEditable = false;
            doc.body.contentEditable = true;
          }
          else
          {
            doc.body.contentEditable = true;
            this.__setDesignMode(true);
          }
        }
      },
        
      "default" : function() {}
    }),


    /**
     * Returns style attribute as string of a given element
     *
     * @type member
     * @param elem {Element} Element to check for style attribute  
     * @return {String} Complete style attribute as string
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
        if (qx.core.Variant.isSet("qx.client", "mshtml"))
        {
          style = styleAttrib.cssText;
        }
        else
        {
          style = styleAttrib;
        }
      }
      catch(exc)
      {
        this.error("can't extract style from elem. ");
      }

      return style;
    },


    /**
     * Returns the wrapped content of the editor
     *
     * @type member
     * @param value {String} body.innerHTML
     * @param useCurrentBodyStyle {Boolean ? null} Whether the style of the body element should be used or not
     * @return {String} content
     */
    __getWrappedContent : function (value, useCurrentBodyStyle)
    {
      var value = (typeof value == "string") ? value : "";
      var doc = this.getContentDocument();

      /**
       * To hide the horizontal scrollbars in gecko browsers set the "overflow-x" explicit to "hidden"
       * In mshtml browsers this does NOT work. The property "overflow-x" overwrites the value of "overflow-y".
       **/
      var geckoOverflow = qx.core.Client.getInstance().isGecko() ? " html, body {overflow-x: visible; } " : "";

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

      var body = "<p>&nbsp;</p>";
      if (useCurrentBodyStyle === true)
      {
        body = wrap.body.replace('>',' style="'+this.__getElementStyleAsString(doc.body)+'">');
      }

      /* CORRECT IMPLEMENTATION */
      return wrap.html +
             '<head>' + wrap.meta +
             '<style type="text/css">' + geckoOverflow + wrap.style + this.__styleInformation + '</style>' +
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
        var doc = this.getContentDocument();

        try
        {
          doc.open(qx.util.Mime.HTML, true);
          doc.write(this.__getWrappedContent(value));
          doc.close();
        }
        catch (e)
        {
          this.error("cant open document on source '"+this.getSource()+"'", e);
          this.createDispatchDataEvent("loadingError", e);
        }
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
      if (!this._listenerAdded)
      {
        this._listenerAdded = true;

        this._connectKeyListener();
        this._addFocusListener();
        this._addMouseListener();
        this._addContextMenuListener();
      }
    },


    /**
     * IMPORTANT
     * route all key events directly to the KeyEventHandler to transform DOM events to full-featured qooxdoo events.
     * Doing so the editor has not to deal with DOM events anymore.
     * 
     * @return {void}
     */
    _connectKeyListener : function ()
    {
      var keyEventHandler = qx.event.handler.KeyEventHandler.getInstance();
      var EventRegistration = qx.html.EventRegistration;
      var doc = this.getContentDocument();

      EventRegistration.addEventListener(doc, "keypress", keyEventHandler.__onkeypress);
      EventRegistration.addEventListener(doc, "keyup",    keyEventHandler.__onkeyupdown);
      EventRegistration.addEventListener(doc, "keydown",  keyEventHandler.__onkeyupdown);
    },


    /**
     * Register event handler for focus/blur events
     *
     * IE has to catch focus and blur events on the body element
     * Webkit is listening to the contentWindow and all others catch them at the document
     * directly
     * 
     * @return {void}
     */
    _addFocusListener : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function ()
      {
        var EventRegistration = qx.html.EventRegistration;
        var body = this.getContentBody();

        EventRegistration.addEventListener(body, "focus", this.__handleFocusEvent);
        EventRegistration.addEventListener(body, "blur",  this.__handleBlurEvent);
        EventRegistration.addEventListener(this.getContentDocument(), "focusout", this.__handleFocusOut);
      },

      "webkit" : function ()
      {
        var EventRegistration = qx.html.EventRegistration;
        var win = this.getContentWindow();

        EventRegistration.addEventListener(win, "focus", this.__handleFocusEvent);
        EventRegistration.addEventListener(win, "blur",  this.__handleBlurEvent);
        EventRegistration.addEventListener(this.getContentDocument(), "focusout", this.__handleFocusOut);
      },

      "default" : function ()
      {
        var EventRegistration = qx.html.EventRegistration;
        var doc = this.getContentDocument();

        EventRegistration.addEventListener(doc, "focus", this.__handleFocusEvent);
        EventRegistration.addEventListener(doc, "blur",  this.__handleBlurEvent);
        EventRegistration.addEventListener(doc, "focusout", this.__handleFocusOut);
      }
    }),


    /**
     * Register mouse event - for IE one has to catch the "click" event, for all others 
     * the "mouseup" is okay
     * 
     * @return {void}
     */
    _addMouseListener : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function () {
        qx.html.EventRegistration.addEventListener(this.getContentBody(), "click", this.__handleMouseEvent);
      },

      "default" : function () {
        qx.html.EventRegistration.addEventListener(this.getContentBody(), "mouseup", this.__handleMouseEvent);
      }
    }),


    /**
     * Register context menu event - use contextmenu for safari (because mac safari does 
     * not fire mouse up event on right click) and mousup for all other browsers 
     * (as ie does not give the right button number for the context menu)
     * 
     * @return {void}
     */
    _addContextMenuListener : qx.core.Variant.select("qx.client",
    {
      "webkit" : function () {
        qx.html.EventRegistration.addEventListener(this.getContentBody(), "contextmenu", this.__handleContextMenuEvent);
      },

      "default" : function () {
        qx.html.EventRegistration.addEventListener(this.getContentBody(), "mouseup", this.__handleContextMenuEvent);
      }
    }),


    /**
     * Returns the commandManager instance
     * 
     * @return {htmlarea.command.Manager ? htmlarea.command.UndoManager} manager
     */
    getCommandManager : function() {
      return this.__commandManager;
    },


    /**
     * Helper method to create an object which acts like
     * a command manager instance to collect all commands
     * which are executed BEFORE the command manager instance
     * is ready
     *
     * @type member
     * @return {Object} stack command manager object
     */
    __createStackCommandManager : function()
    {
      return {
        execute : function(command, value)
        {
         /* Set the flag to show the "real" commandManager a command was stacked */
         this.stackedCommands = true;

         this.commandStack.push( { command : command, value : value } );
        },

        commandStack : [],

        stackedCommands : false
      }
    },


    /**
     * Sets the designMode of the document
     * 
     * @type member
     * @param onOrOff {Boolean} Set or unset the design mode on the current document
     * @return {void}
     */
    __setDesignMode : function(onOrOff)
    {
      if (this.__isLoaded)
      {
        try
        {
          var doc = this.getContentDocument();

            // FF Bug (Backspace etc. doesnt work if we dont set it twice)
          if (qx.core.Variant.isSet("qx.client", "gecko")) {
            doc.designMode = (onOrOff !== false) ? 'Off' : 'On';
          }

          doc.designMode = (onOrOff !== false) ? 'On' : 'Off';
        }
        catch (e)
        {
          // Fails if the element is not shown actually
          // we set it aggain in _afterAppear
        }
      }
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

      if (this.__isLoaded)
      {
        this.__setDesignMode(true);

        /*
         * For Gecko set additionally "styleWithCSS" and as fallback for older
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
            this.__commandManager.execute("stylewithcss", true);
          }
          catch(ex)
          {
            try
            {
              this.__commandManager.execute("usecss", false);
            }
            catch(ex)
            {
              if (!this.__isReady)
              {
                this.error("Failed to enable rich edit functionality");
                this.createDispatchDataEvent("loadingError", ex);
              }
              else
              {
                throw new Error("Failed to enable rich edit functionality");
              }
            }
          }
        }

        this.__isEditable = propValue;
      }
    },


    /**
     * @return {void}
     */
    _focus : qx.core.Variant.select("qx.client",
    {
      "webkit|gecko" : function () {
        this.getContentWindow().focus();
      },

      "default" : function () {
        this.getContentBody().focus();
      }
    }),


    /**
     * @return {void}
     */
    _blur : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function () {
        this.getElement().blur();
      },

      "webkit" : function () {
        this.getContentWindow().blur();
      },

      "default" : function () {
        this.getContentBody().blur();
      }
    }),


    /**
     * TODOC
     *
     * @type member
     */
    _visualizeBlur : function(force)
    {
      if (!this.isNativeFocused())
      {
        if (qx.core.Variant.isSet("qx.debug", "on")) {
          this.debug("_visualizeBlur: focus already lost");
        }

        if (force !== true) {
          return;
        }
      }

      try
      {
        this._blur();
      }
      catch (exc)
      {
        this.error("_blur: " + exc);
      }

      qx.client.Timer.once(function () {
        this._syncQxAndNativeFocus(false);
      }, this, 50);
    },


    /**
     * Sets the focus on the editor component
     *
     * @type member
     * @return {void}
     */
    _visualizeFocus : function(force)
    {
      if (this._isElementVisible() && (force === true || this._isVisualizeFocusAllowed()))
      {
        if (!this._focusCurrentRange())
        {
          try {
            this._focus();
          } catch (exc) {
            this.error("_focus: " + exc);
          }
        }

        qx.client.Timer.once(function () {
          this._syncQxAndNativeFocus(true);
        }, this, 50);

        this.__startExamineCursorContext();
      }
      else
      {
        if (qx.core.Variant.isSet("qx.debug", "on")) {
          this.debug("_visualizeFocus: not allowed");
        }
      }
    },


    /**
     * @return {Boolean}
     */
    isVisible : function () {
      return this._isElementVisible();
    },


    /**
     * @return {Boolean}
     */
    _isElementVisible : function ()
    {
      var elem = this.getElement();

      if (!elem || elem && elem.offsetWidth == 0) {
        return false;
      }

      return true;
    },


    /**
     * @return {Boolean}
     */
    _isVisualizeFocusAllowed : function ()
    {
      if (this.isNativeFocused())
      {
        if (qx.core.Variant.isSet("qx.debug", "on")) {
          this.debug("_visualizeFocus: focus already set");
        }

        return false;
      }

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        if (!this.isFocused()) {
          this.debug("_visualizeFocus: no qooxdoo focus is set, try to sync after focusEvent");
        }
      }

      return true;
    },


    /**
     * @return {Boolean}
     */
    _focusCurrentRange : function ()
    {
      if (this.__commandManager && this.__commandManager.getCurrentRange)
      {
        var range = this.__commandManager.getCurrentRange();

        if (range && range.select)
        {
          try
          {
            range.select();

            return true;
          }
          catch (exc)
          {
            this.error(exc);
          }
        }
      }

      return false;
    },


    /*
    ---------------------------------------------------------------------------
      EVENT HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * All keyUp events are delegated to this method
     *
     * @type member
     * @param e {Object} Event object
     * @return {void}
     */
    _handleKeyUp : function(e)
    {
      var keyIdentifier   = e.getKeyIdentifier().toLowerCase();
      var isShiftPressed  = e.isShiftPressed();
      var isCtrlPressed   = e.isCtrlPressed();
      this.__currentEvent = e;

      //if (qx.core.Variant.isSet("qx.debug", "on")) {
      //  this.debug(e.getType() + " | " + keyIdentifier + " | " + e.getCharCode() + "|Ctrl:"+isCtrlPressed);
      //}

      /*
       * This block inserts a linebreak when the key combination "Ctrl+Enter" was pressed. It is
       * necessary in IE to look after the keypress and the keyup event. The keypress delivers the
       * "Ctrl" key and the keyup the "Enter" key. If the latter occurs right after the first one
       * the linebreak gets inserted.
       */
      if (qx.core.Variant.isSet("qx.client", "mshtml|webkit"))
      {
        /* Handle all shortcuts with "Ctrl+KEY" */
        if (isCtrlPressed)
        {
          switch(keyIdentifier)
          {
            case "enter":
              if (this.getInsertLinebreakOnCtrlEnter())
              {
                var sel = this.__getSelection();
                var rng = this.__createRange(sel);
                rng.collapse(true);
                rng.pasteHTML('<br/><div class="placeholder"></div>');
              }
              else
              {
                return;
              }
            break;

            /*
             * Execute the "selectAll" command identifier whenever the shortcut "Ctrl+A" is pressed
             */
            case "a":
              this.__executeHotkey('selectAll', true);
            break;
            
            case "b":
              this.__executeHotkey('setBold', true);
            break;
            
            case "i":
            case "k":
              this.__executeHotkey('setItalic', true);
            break;
            
            case "u":
              this.__executeHotkey('setUnderline', true);
            break;
          }
        }
        
        /*
         * Execute "undo" and "redo" commands
         * Ctrl+Z -> Undo
         * Ctrl+Y -> Redo
         * Ctrl+Shift+Z -> Redo
         * 
         * It is needed to implement this at the keyUp event handler for IE 
         * because one does not get the keyIdentifier at the keyPress event in IE.
         * (Only "Ctrl" is returned)
         * 
         * DO NOT stop this event by passing "true" to the executeHotkey method.
         * The browser handling of undo/redo is already suppressed at the "keyDown" handler.
         */
        if(keyIdentifier == "z" && isCtrlPressed && !isShiftPressed)
        {
          this.__executeHotkey('undo', false);
        }
        else if(keyIdentifier == "z" && isCtrlPressed && isShiftPressed)
        {
          this.__executeHotkey('redo', false);
        }
        else if(keyIdentifier == "y" && isCtrlPressed)
        {
          this.__executeHotkey('redo', false);
        }
      }
      
      else if (qx.core.Variant.isSet("qx.client", "gecko"))
      {
        
        if (this.__listEntryStyles != "")
        {
          qx.client.Timer.once(
            function() {
              // Insert HTML snippet containting the style settings from
              // the last list entry.
              this.__commandManager.__commandManager.execute(
                "inserthtml",
                this.__listEntryStyles);

              /*
               * Sometimes Gecko executes the command but sets the carret back
               * to the list. So we have to check if the carret is not in a list
               * any more.
               */
               var sel = this.__getSelection();
               var rng = sel.getRangeAt(0);
               var selNode = sel.focusNode;

               if (this.__nodeInList(selNode))
               {
                 // We are still in the list. The inserted HTML is the next
                 // sibling to the list element. We have to so place the
                 // carret inside it.
                 var nextToList = selNode.parentNode.nextSibling;
                 var target = nextToList.firstChild ?
                                nextToList.firstChild :
                                nextToList;

                 rng.setStart(target, 0);
                 rng.setEnd(target, 0);
               }

              this.__listEntryStyles = "";
              this.__startExamineCursorContextByKeyCode(keyIdentifier);
            },
            this,
            10);
        }

        /* These keys can change the selection */
        switch(keyIdentifier)
        {
          case "left":
          case "right":
          case "up":
          case "down":
          case "pageup":
          case "pagedown":
          case "delete":
          case "end":
            var sel    = this.__getSelection();
            var doc = this.getContentDocument();

            /* Set flag indicating if first line is selected */
            this.__firstLineSelected = (sel.focusNode == doc.body.firstChild);
          break;
        }
      }

      this.__startExamineCursorContextByKeyCode(keyIdentifier);
    },


    /**
     * @param keyCode {String}
     * @return {void}
     */
    __startExamineCursorContextByKeyCode : function (keyCode)
    {
      /* These keys can change the selection */
      switch(keyCode.toLowerCase())
      {
        case "left":
        case "right":
        case "up":
        case "down":
        case "pageup":
        case "pagedown":
        case "delete":
        case "end":
          this.__startExamineCursorContext();
        break;
      }
    },


    /**
     * All keyDown events are delegated to this method
     *
     * @type member
     * @param e {Object} Event object
     * @return {void}
     */
    _handleKeyDown : qx.core.Variant.select("qx.client",
    { 
      "mshtml|webkit" : function(e)
      {
        var keyIdentifier = e.getKeyIdentifier().toLowerCase();
        var isCtrlPressed = e.isCtrlPressed();

        //if (qx.core.Variant.isSet("qx.debug", "on")) {
        //  this.debug(e.getType() + " | " + keyIdentifier + " | " + e.getCharCode() + "|Ctrl:"+isCtrlPressed);
        //}

        /* Stop the key events "Ctrl+Z" and "Ctrl+Y" for IE (disabling the browsers shortcuts) */
        if (isCtrlPressed && (keyIdentifier == "z" || keyIdentifier == "y" || 
                              keyIdentifier == "b" || keyIdentifier == "u" || 
                              keyIdentifier == "i" || keyIdentifier == "k"))
        {
          e.preventDefault();
          e.stopPropagation();
        }
        else
        {
          if (this.__commandManager) {
            this.__commandManager.invalidateCurrentRange();
          }
        }
      },

      "default" : function(e)
      {
        var keyIdentifier = e.getKeyIdentifier().toLowerCase();
        var isCtrlPressed = e.isCtrlPressed();

        //if (qx.core.Variant.isSet("qx.debug", "on")) {
        //  this.debug(e.getType() + " | " + keyIdentifier + " | " + e.getCharCode());
        //}

        if (!(isCtrlPressed && (keyIdentifier == "z" || keyIdentifier == "y" || 
                                keyIdentifier == "b" || keyIdentifier == "u" || 
                                keyIdentifier == "i" || keyIdentifier == "k")))
        {
          if (this.__commandManager) {
            this.__commandManager.invalidateCurrentRange();
          }
        }
      }
    }),


    /**
     * All keyPress events are delegated to this method
     *
     * @type member
     * @param e {Object} Event object
     * @return {void}
     */
   _handleKeyPress : function(e)
   {
      var doc = this.getContentDocument();
      var keyIdentifier   = e.getKeyIdentifier().toLowerCase();
      var isCtrlPressed   = e.isCtrlPressed();
      var isShiftPressed  = e.isShiftPressed();
      this.__currentEvent = e;

      //if (qx.core.Variant.isSet("qx.debug", "on")) {
      //  this.debug(e.getType() + " | " + keyIdentifier + " | " + e.getCharCode() + "|Ctrl:"+isCtrlPressed);
      //}

      switch(keyIdentifier)
      {
        case "tab":
          if (qx.core.Variant.isSet("qx.client", "gecko"))
          {
            /* TODO - right implementation? */
            this.getFocusRoot().getFocusHandler()._onkeyevent(this.getFocusRoot(), e);
          }
        break;

        case "enter":

          /* If only "Enter" key was pressed and "messengerMode" is activated */
          if (!isShiftPressed && !isCtrlPressed && this.getMessengerMode())
          {
            e.preventDefault();
            e.stopPropagation();

            /* Dispatch data event with editor content */
            this.dispatchEvent(new qx.event.type.DataEvent("messengerContent", this.getComputedValue()), true);

            /* Reset the editor content */
            this.resetHtml();
          }

          /*
           * This mechanism is to provide a linebreak when pressing "Ctrl+Enter".
           * The implementation for IE is located at the "control" block and at the
           * "_handleKeyUp" method.
           */
          if (isCtrlPressed)
          {
            if (this.getInsertLinebreakOnCtrlEnter())
            {
              this.__handleCtrlEnter(doc);

              e.preventDefault();
              e.stopPropagation();
            }
            else
            {
              return;
            }
          }
          else
          {
            this.__handleEnter(isShiftPressed, e);
          }
          break;


        case "up" :
        /*
         * Firefox 2 needs some additional work to select the
         first line completely in case the selection is already
         on the first line and "key up" is pressed.
         */
        if (qx.core.Variant.isSet("qx.client", "gecko"))
        {
          if(isShiftPressed && qx.core.Client.getInstance().getVersion() < 1.9)
          {
            /* Fetch selection */
            var sel = this.__getSelection();

            /* First line is selected and */
            /* Check if the first line has been (partly) selected before and */
            /* Check if selection does not enclose the complete line already */
            if(sel.focusNode == doc.body.firstChild && this.__firstLineSelected &&
               sel.focusOffset != 0)
            {
              /* Select the complete line. */
              sel.extend(sel.focusNode, 0);
            }
          }
        }
        break;


        /*
         * Firefox 2 needs some extra work to move the cursor
         * (and optionally select text while moving) to
         * first position in the first line.
         */
        case "home":
          if (qx.core.Variant.isSet("qx.client", "gecko"))
          {
            if (qx.core.Client.getInstance().getVersion() < 1.9)
            {
              if(isCtrlPressed)
              {
                /* Fetch current selection */
                var sel = this.__getSelection();

                /*
                 * Select text from current position to first
                 * character on the first line
                 */
                if (isShiftPressed)
                {
                  /* Check if target position is not yet selected */
                  if ( (sel.focusOffset != 0) || (sel.focusNode != doc.body.firstChild) )
                  {
                    /* Extend selection to first child at position 0. */
                    sel.extend(doc.body.firstChild, 0);
                  }
                }
                else
                {
                  /* Fetch all text nodes from body element */
                  var elements = document.evaluate("//text()[string-length(normalize-space(.))>0]", doc.body, null, XPathResult.ANY_TYPE, null);
                  var currentItem;

                  /* Iterate over result */
                  while(currentItem = elements.iterateNext())
                  {
                    /* Skip CSS text nodes */
                    if(currentItem.parentNode && (currentItem.parentNode.tagName != "STYLE") )
                    {

                      /* Expand selection to first text node and collapse here */
                      try
                      {
                        // Sometimes this does not work...
                        sel.extend(currentItem, 0);
                        if (!sel.isCollapsed) {
                          sel.collapseToStart();
                        }
                      }catch(e){ }
                    
                      /* We have found the correct text node, leave loop here */
                      break;
                    }
                  } // while
                } // if
              } // if
            } // if version
          } // if gecko
        break;

        /* Special shortcuts */
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
           * NOTE: this code is NOT executed for mshtml and webkit. To get to
           * know if "Ctrl+A" is pressed in mshtml/webkit one need to check
           * this within the "keyUp" event. This info is not available
           * within the "keyPress" event in mshtml/webkit.
           */
          if (isCtrlPressed) {
            this.selectAll();
          }
        break;

       }

       this.__currentEvent = null;
    },

    /**
     * Internal function to react on the "enter" key while the crtl key is
     * pressed. It inserts special HTML code (or DOM nodes) to create a
     * line break.
     * 
     * @param doc {Object} The document element of the htmlarea's iframe.
     * @return void
     * @signature function(doc)
     */
    __handleCtrlEnter  : qx.core.Variant.select("qx.client",
    {

      "gecko" : function(doc)
      {
        /*
         * Insert additionally an empty div element - this ensures that
         * the caret is shown and the cursor moves down a line correctly
         *
         * ATTENTION: the "div" element itself gets not inserted by Gecko, it is
         * only necessary to have anything AFTER the "br" element to get it work.
         * Strange hack, I know ;-)
         */
        this.insertHtml("<br /><div id='placeholder'></div>");
      },

      "webkit" : function(doc)
      {
        /*
         * TODO: this mechanism works well when the user already typed in some text at the
         * current line. If the linebreak is done without any text at the current line the
         * cursor DOES NOT correspond -> it stays at the current line although the linebreak
         * is inserted. Navigating to the next line with the arrow down key is possible.
         */
        this.insertHtml("<div><br class='webkit-block-placeholder' /></div>");
      },

      "opera" : function(doc)
      {
        /*
         * To insert a linebreak for Opera it is necessary to work with ranges and add the
         * br element on node-level. The selection of the node afterwards is necessary for Opera
         * to show the cursor correctly.
         */
        var sel    = this.__getSelection();
        var rng    = this.__createRange(sel);

        var brNode = doc.createElement("br");
        rng.collapse(true);
        rng.insertNode(brNode);
        rng.collapse(true);

        rng.selectNode(brNode);
        sel.addRange(rng);
        rng.collapse(true);
      },

      "default" : function() {}

    }),


    /**
     * Internal function to react on the "enter" key. It uses various
     * methods to insert special HTML code and cancles the event or 
     * just forwards it to the browser.
     * 
     * @param isShiftPressed {Boolean} Flag indicating if the shift key is hold
     * down
     * @param e {qx.event.type.KeyEvent} Incoming key event
     * @return void
     * @signature function(isShiftPressed, e)
     */
    __handleEnter  : qx.core.Variant.select("qx.client",
    {

      /*
       * Special handling for IE when hitting the "Enter" key
       * instead of letting the IE insert a <p> insert manually a <br>
       * if the corresponding property is set
       */
      "mshtml" : function(isShiftPressed, e)
      {
        if (!this.getInsertParagraphOnLinebreak())
        {
          /*
           * Insert a "br" element to force a line break. If the insertion succeeds
           * stop the key event otherwise let the browser handle the linebreak e.g.
           * if the user is currently editing an (un)ordered list.
           */
          if (this.__commandManager.execute("inserthtml", htmlarea.HtmlArea.simpleLinebreak))
          {
            e.preventDefault();
            e.stopPropagation();
          }              
        }
      },


      /*
       * Special handling for Firefox when hitting the "Enter" key
       */
      "gecko" : function(isShiftPressed, e)
      {
        if (this.getInsertParagraphOnLinebreak() && !isShiftPressed)
        {
          var sel = this.__getSelection();
          if (sel)
          {
            var selNode = sel.focusNode;
            
            // check if the caret is within a word - Gecko can handle it
            if (sel.isCollapsed && qx.dom.Node.isText(selNode) && 
                sel.anchorOffset < selNode.length)
            {
              return;
            }
            
            if (qx.dom.Node.isElement(sel.focusNode)) {
              return;
            }

            // Check if the caret is inside a list:
            while (selNode.nodeName.toLowerCase() != "body")
            {
              if (selNode.nodeName.toLowerCase() == "li")
              {
                if (selNode.textContent == "")
                {
                  // We are on a list entry. The current style settings are
                  // saved on __listEntryStyles to apply them once the carret
                  // is outside the list.
                  this.__listEntryStyles = "<p>" + this.__commandManager.__commandManager.generateHelperString();
                }
                return;
              }
              selNode = selNode.parentNode;
            }
          }

          this.__commandManager.insertParagraphOnLinebreak();
          e.preventDefault();
          e.stopPropagation();
        }
      },

      "webkit" : function(isShiftPressed, e)
      {
        if (this.getInsertParagraphOnLinebreak())
        {
          var sel = this.__getSelection();

          if(isShiftPressed)
          {
            var helperString = "";
            /* Insert bogus node if we are on an empty line: */
            if(sel.focusNode.textContent == "" || sel.focusNode.parentElement.tagName == "LI")
            {
              helperString = "<br class='webkit-block-placeholder' />";
            }

            this.__commandManager.execute("inserthtml", helperString + htmlarea.HtmlArea.simpleLinebreak);

            /* Stop event */
            e.preventDefault();
            e.stopPropagation();
          }

        }
      },
      
      "default" : function() {}
    }),

    /**
     * Executes a method and prevent default
     *
     * @type member
     * @param method {String} name of the method which should be called
     * @param preventDefault {Boolean} whether do preventDefault or not
     * @return {void}
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

        // Whenever a hotkey is pressed update the current cursorContext
        // Since this examination is done within a timeout we can be sure
        // the execution is performed before we're looking at the cursor context.
        this.__startExamineCursorContext();
      }
    },


    /**
     * Eventlistener for focus events
     *
     * @type member
     * @param e {Object} Event object
     * @return {void}
     */
    _handleFocusEvent : function(e) {
      this.setNativeFocused(true);
    },


    /**
     * Eventlistener for blur events
     *
     * @type member
     * @param e {Object} Event object
     * @return {void}
     */
    _handleBlurEvent : function(e)
    {
      if (!this.isNativeFocused())
      {
        qx.client.Timer.once( function () {
          this.__value = this.getComputedValue();
        }, this, 0);
      }
    },


    /**
     * Eventlistener for focus out events to save the current selection.
     * NOTE: this method is currently only used for mshtml.
     *
     * @type member
     * @param e {qx.event.type.Event} focus out event
     * @return {void}
     */
    _handleFocusOut : function(e) {
      this.setNativeFocused(false);
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
      if (qx.core.Variant.isSet("qx.debug", "on")) {
        this.debug("handleMouseEvent | Type: " + e.type + ", Focused: " + this.isFocused() + ", NativeFocused: " + this.isNativeFocused());
      }

      // need to invalidate the stored range
      if (this.__commandManager) {
        this.__commandManager.invalidateCurrentRange();
      }

      // sync qx focus and real focus
      if (!this.isFocused()) {
        this.setFocused(true);
      }

      this.__startExamineCursorContext();
    },


    /**
     * Eventlistener for all context menu events. Fires the contextmenu event.
     *
     * @type member
     * @param e {Object} Event object
     * @return {void}
     */
    _handleContextMenuEvent : function(e)
    {
      // need to invalidate the stored range
      if (this.__commandManager) {
        this.__commandManager.invalidateCurrentRange();
      }

      var button = (e.button ? e.button : e.which);
      if (qx.event.type.MouseEvent.buttons.right == button)
      {
        if (qx.core.Variant.isSet("qx.debug", "on")) {
          this.debug("handleContextMenuEvent | Type: " + e.type + ", Focused: " + this.isFocused() + ", LastAction: " + this.isNativeFocused());
        }

        var data   = {
          x : e.clientX,
          y : e.clientY,
          target : e.target || e.srcElement
        };

        qx.client.Timer.once(function() {
          this.createDispatchDataEvent("contextmenu", data);
        }, this, 0);
      }
    },


    /*
    ---------------------------------------------------------------------------
      EXEC-COMMANDS
    ---------------------------------------------------------------------------
    */

    /**
     * Service method to check if the component is already loaded.
     * Overrides the base method.
     * 
     * @return {Boolean}
     */
    isLoaded : function ()
    {
      var loaded = this.base(arguments);
      return this.__isLoaded && loaded;
    },


    /**
     * TODOC
     * 
     * @return {Boolean}
     */
    isEditable : function () {
      return this.__isEditable;
    },


    /**
     * Inserts html content on the current selection
     *
     * @type member
     * @param value {String} html content
     * @return {Boolean} Success of operation
     */
    insertHtml : function (value) {
      return this.__commandManager.execute("inserthtml", value);
    },


    /**
     * Removes all formatting styles on the current selection content
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    removeFormat : function()
    {
      return this.__commandManager.execute("removeformat");
    },


    /**
     * Sets the current selection content to bold font style
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setBold : function()
    {
      return this.__commandManager.execute("bold");
    },


    /**
     * Sets the current selection content to italic font style
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setItalic : function()
    {
      return this.__commandManager.execute("italic");
    },


    /**
     * Sets the current selection content to underline font style
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setUnderline : function()
    {
      return this.__commandManager.execute("underline");
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
      return this.__commandManager.execute("strikethrough");
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
      return this.__commandManager.execute("fontsize", value);
    },


    /**
     * Sets the current selection content to the specified font size
     *
     * @type member
     * @param value {Number} Font size
     * @return {Boolean} Success of operation
     */
    setFontFamily : function(value) {
      return this.__commandManager.execute("fontfamily", value);
    },


    /**
     * Sets the current selection content to the specified font color
     *
     * @type member
     * @param value {String} Color value (supported are Hex,
     * @return {Boolean} Success of operation
     */
    setTextColor : function(value) {
      return this.__commandManager.execute("textcolor", value);
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
      return this.__commandManager.execute("textbackgroundcolor", value);
    },


    /**
     * Left-justifies the current selection
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setJustifyLeft : function()
    {
      return this.__commandManager.execute("justifyleft");
    },


    /**
     * Center-justifies the current selection
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setJustifyCenter : function()
    {
      return this.__commandManager.execute("justifycenter");
    },


    /**
     * Right-justifies the current selection
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setJustifyRight : function()
    {
      return this.__commandManager.execute("justifyright");
    },


    /**
     * Full-justifies the current selection
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    setJustifyFull : function()
    {
      return this.__commandManager.execute("justifyfull");
    },


    /**
     * Indents the current selection
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    insertIndent : function()
    {
      return this.__commandManager.execute("indent");
    },


    /**
     * Outdents the current selection
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    insertOutdent : function()
    {
      return this.__commandManager.execute("outdent");
    },


    /**
     * Inserts an ordered list
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    insertOrderedList : function()
    {
      return this.__commandManager.execute("insertorderedlist");
    },


    /**
     * Inserts an unordered list
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    insertUnorderedList : function()
    {
      return this.__commandManager.execute("insertunorderedlist");
    },


    /**
     * Inserts a horizontal ruler
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    insertHorizontalRuler : function()
    {
      return this.__commandManager.execute("inserthorizontalrule");
    },


    /**
     * Insert an image
     *
     * @type member
     * @param attributes {Map} Map of HTML attributes to apply
     * @return {Boolean} Success of operation
     */
    insertImage : function(attributes)
    {
      return this.__commandManager.execute("insertimage", attributes);
    },


    /**
     * Inserts a hyperlink
     *
     * @type member
     * @param url {String} URL for the image to be inserted
     * @return {Boolean} Success of operation
     */
    insertHyperLink : function(url)
    {
      return this.__commandManager.execute("inserthyperlink", url);
    },

    /**
     * Alias for setBackgroundColor("transparent");
     *
     * @type member
     * @return {Boolean} if succeeded
     */
    removeBackgroundColor : function () {
      this.__commandManager.execute("backgroundcolor", "transparent");
    },


    /**
     * Sets the background color of the editor
     *
     * @type member
     * @param value {String} color
     * @return {Boolean} if succeeded
     */
    setBackgroundColor : function (value)
    {
      this.__commandManager.execute("backgroundcolor", value);
    },


    /**
     * Alias for setBackgroundImage(null);
     *
     * @type member
     * @return {Boolean} if succeeded
     */
    removeBackgroundImage : function () {
      this.__commandManager.execute("backgroundimage");
    },


    /**
     * Inserts an background image
     *
     * @type member
     * @param url {String} url of the background image to set
     * @param repeat {String} repeat mode. Possible values are "repeat|repeat-x|repeat-y|no-repeat".
     *                                     Default value is "no-repeat"
     * @param position {String} Position of the background image. Possible values are "|top|bottom|center|left|right|right top|left top|left bottom|right bottom".
     *                          Default value is "top"
     * @return {Boolean} Success of operation
     */
    setBackgroundImage : function(url, repeat, position)
    {
      return this.__commandManager.execute("backgroundimage", [ url, repeat, position ]);
    },


    /**
     * Selects the whole content
     *
     * @type member
     * @return {Boolean} Success of operation
     */
    selectAll : function()
    {
      return this.__commandManager.execute("selectall");
    },


    /**
     * Undo last operation
     *
     * @type member
     * @return {void}
     */
    undo : function()
    {
      /* Only execute this command if undo/redo is activated */
      if (this.getUseUndoRedo())
      {
        return this.__commandManager.execute("undo");
      }
      else
      {
        return true;
      }
    },


    /**
     * Redo last undo
     *
     * @type member
     * @return {void}
     */
    redo : function()
    {
      /* Only execute this command if undo/redo is activated */
      if (this.getUseUndoRedo())
      {
        return this.__commandManager.execute("redo");
      }
      else
      {
        return true;
      }
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
      var doc = this.getContentDocument();

      /* clearing the editor */
      while (doc.body.firstChild) {
        doc.body.removeChild(doc.body.firstChild);
      }

      /*
       * Gecko needs a p element with a text-node (&nbsp;) to
       * show the caret after clearing out the content. Otherwise
       * the user is able to type ahead but right after the clearing the
       * caret is not visible (-> cursor does not blink)
       */
      if (qx.core.Variant.isSet("qx.client", "gecko")) {
        doc.body.innerHTML = "<p>&nbsp;</p>";
      }

      /*
       * To ensure Webkit is showing a cursor after resetting the
       * content it is necessary to create a new selection and add a range
       */
      else if (qx.core.Variant.isSet("qx.client", "webkit"))
      {
        var sel = this.__getSelection();
        var rng = doc.createRange();

        sel.addRange(rng);
      }
    },


    /**
     * Get html content (call own recursive method)
     *
     * @type member
     * @param skipHtmlEncoding {Boolean ? false} whether the html encoding of text nodes should be skipped
     * @return {String} current content of the editor as XHTML
     */
    getHtml : function(skipHtmlEncoding)
    {
      var doc = this.getContentDocument();

      if (doc == null) {
        return null;
      }

      return htmlarea.HtmlArea.__getHtml(doc.body, false, skipHtmlEncoding);
    },

    /**
     * Helper function to examine if HTMLArea is empty, except for
     * place holder(s) needed by some browsers.
     * 
     * @type member
     * @return {Boolean} True, if area is empty - otherwise false.
     */
    containsOnlyPlaceholder : qx.core.Variant.select("qx.client",
    {

      "mshtml" : function()
      {
        var doc = this.getContentDocument();
        return (doc.body.innerHTML == "<P>&nbsp;</P>");
      },

      "default" : function()
      {
        return false;
      }

    }),

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
      if (this._examineCursorContextTimer !== null)
      {
        if (qx.core.Variant.isSet("qx.debug", "on")) {
          this.debug("examine cursor context is running");
        }

        return;
      }

      /* setting a timeout is important to get the right result */
      this._examineCursorContextTimer = qx.client.Timer.once(function(e)
      {
        if (this.isNativeFocused()) {
          this.__examineCursorContext();
        }

        this._examineCursorContextTimer = null;
      }, this, 0);
    },


    /**
     * @return {Boolean}
     */
    _isProcessingExamineCursorContext : function () {
      return this._processingExamineCursorContext === true;
    },


    /**
     * Examines the current context of the cursor (e.g. over bold text).
     * This method will dispatch the data event "cursorContext" which holds a map
     * with different keys like bold, italic, underline etc.
     * The main purpose for this event is to be able to set the states of your toolbar
     * buttons so you can e.g. visualize that the cursor is currently over bold text.
     *
     * The possible values are
     * -1 = command is not possible at the moment. Used to disable the corresponding buttons
     *  0 = command is possible at the moment. Used to enable the corresponding buttons (e.g. bold/italic/underline etc.)
     *  1 = cursor is over content which already received that command. Used to to activate the corresponding buttons (e.g. bold/italic/underline etc.)
     *
     * @type member
     * @return {void}
     */
    __examineCursorContext : function()
    {
      if (this._isProcessingExamineCursorContext() || this.getEditable() === false) {
        return;
      }

      this._processingExamineCursorContext = true;

      var eventMap = this.getContextInformation();

      if (eventMap !== null) {
        this.createDispatchDataEvent("cursorContext", eventMap);
      }

      this._processingExamineCursorContext = false;
    },


    /**
     * Returns the information about the current context (focusNode). It's a
     * map with information about "bold", "italic", "underline", etc.
     * 
     * @return {Map} formatting information about the focusNode
     */
    getContextInformation : function()
    {
      var doc = this.getContentDocument();

      /*
        ----------
        focus node
        ----------
      */
      var focusNode = this.getFocusNode();

      if (qx.dom.Node.isText(focusNode)) {
        focusNode = focusNode.parentNode;
      }

      if (qx.core.Variant.isSet("qx.client", "mshtml")) {
        var focusNodeStyle = focusNode.currentStyle;
      } else {
        var focusNodeStyle = doc.defaultView ? doc.defaultView.getComputedStyle(focusNode, null) : null;
      }

      if (!focusNodeStyle) {
        return null;
      }

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
      var isUnderline = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNodeStyle.textDecoration.indexOf("underline") !== -1 :
                                                                       focusNodeStyle.getPropertyValue("text-decoration").indexOf("underline") !== -1;

      /*
       * STRIKETHROUGH
       */
      var isStrikeThrough = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNodeStyle.textDecoration.indexOf("line-through") !== -1 :
                                                                           focusNodeStyle.getPropertyValue("text-decoration").indexOf("line-through") !== -1;

      /*
       * FONT SIZE
       */
      var fontSize = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNodeStyle.fontSize : focusNodeStyle.getPropertyValue("font-size");
      var computedFontSize = null;

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

          if (computedFontSize == null || computedFontSize == "")
          {
            computedFontSize = this._getAttribute(node, 'size');
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
        fontSize            : (computedFontSize == null) ? fontSize : computedFontSize,
        fontFamily          : fontFamily,
        insertUnorderedList : unorderedList ? 1 : 0,
        insertOrderedList   : orderedList ? 1 : 0,
        justifyLeft         : justifyLeft ? 1 : 0,
        justifyCenter       : justifyCenter ? 1 : 0,
        justifyRight        : justifyRight ? 1 : 0,
        justifyFull         : justifyFull ? 1 : 0
      };

      return eventMap;
    },


    /**
     * returns the attribute value of a given element
     * 
     * @param element {Object}
     * @param attribute {String}
     * @return {String}
     */
    _getAttribute : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function(element, attribute) {
        try {
          return element[attribute];
        } catch (e) {
          return null;
        }
      },

      "default" : function(element, attribute) {
        try {
          return element.getAttribute(attribute);
        } catch (e) {
          return null;
        }
      }
    }),


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
         var contentDocument = this.getContentDocument();
         return contentDocument ? contentDocument.selection : null;
       },

       "default" : function()
       {
         var contentWindow = this.getContentWindow();
         return contentWindow ? contentWindow.getSelection() : null;
       }
    }),


    /**
     * Returns the currently selected text.
     *
     * @type member
     * @return {String} Selected plain text.
     */
    getSelectedText : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function()
      {
        return this.getCurrentRange(true).text;
      },

      "default" : function()
      {
        return this.getCurrentRange(true).toString();
      }
    }),


    /**
     * returns the content of the actual range as text
     *
     * @TODO: need to be implemented correctly
     * @return {String} selected text
     */
    getSelectedHtml : function()
    {
      // if a selection is stored, return it.
      if (this.__storedSelectedHtml != null) {
        return this.__storedSelectedHtml;
      }

      var range = this.getCurrentRange(true);

      if (!range) {
        return "";
      }

      if (range.cloneContents)
      {
        var tmpBody = document.createElement("body");
        tmpBody.appendChild(range.cloneContents());
        return tmpBody.innerHTML;
      }
      else if (typeof (range.item) != 'undefined' ||
               typeof (range.htmlText) != 'undefined')
      {
        return range.item ? range.item(0).outerHTML : range.htmlText;
      }
      else
      {
        return range.toString();
      }
    },


    /**
     * Clears the current selection
     * 
     * @type member
     * @return {void}
     */
    clearSelection : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function()
      {
        var selection = this.__getSelection();
        if (selection) {
          selection.empty();
        } 
      },

      "default" : function()
      {
        var selection = this.__getSelection();
        if (selection) {
          selection.collapseToStart();
        }
      }
    }),


    /**
     * Clears the current selection
     * 
     * @type member
     * @return {void}
     */
     collapseToEnd : qx.core.Variant.select("qx.client",
     {
      "mshtml" : function()
      {
        var range = this.getCurrentRange(true);
        
        if (range) {
          range.collapse();
        }
      },

      "default" : function()
      {
        var selection = this.__getSelection();

        if (selection) {
          selection.collapseToEnd();
        }
      }
    }),


    /*
     -----------------------------------------------------------------------------
     TEXT RANGE
     -----------------------------------------------------------------------------
    */


    /**
     * @param createNew {Boolean}
     * @param preventFocusEvent {Boolean}
     * @return {Range}
     */
    getCurrentRange : function (createNew, preventFocusEvent)
    {
      if (this.__commandManager)
      {
        var range = this.__commandManager.getCurrentRange(true);

        if (range != null) {
          return range;
        }
      }

      return createNew === true ? this.getRange(preventFocusEvent) : null;
    },


    /**
     * returns the range of the current selection
     *
     * @type member
     * @return {Range} Range object
     */
    getRange : function(preventFocusEvent) {
      return this.__createRange(this.__getSelection(), preventFocusEvent);
    },


    /**
     * returns a range for the current selection
     *
     * @param sel {Selection} current selection object
     * @return {Range} Range object
     */
    __createRange : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function(sel, preventFocusEvent)
      {
        var doc = this.getContentDocument();

        if (!this.isFocused()) {
          //this.setFocused(true);
        }

        if (qx.util.Validation.isValid(sel))
        {
          try {
            return sel.createRange();
          } catch(ex) {
            return doc.createTextRange();
          }
        }
        else
        {
          return doc.createTextRange();
        }
      },

      "default" : function(sel, preventFocusEvent)
      {
        var doc = this.getContentDocument();

        if (!this.isFocused()) {
          //this.setFocused(true);
        }

        if (qx.util.Validation.isValid(sel))
        {
          try {
            return sel.getRangeAt(0);
          } catch(ex) {
            return doc.createRange();
          }
        }
        else
        {
          return doc.createRange();
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

         if (!sel) {
           return this.getContentBody();
         }

         switch(sel.type)
         {
           case "Text":
           case "None":
             /*
              * It seems that even for selection of type "None",
              * there _is_ a correct parent element
              */
             rng = this.__createRange(sel);
             /* collapse to end */
             rng.collapse(false);
             return rng.parentElement();

           case "Control":
             rng = this.__createRange(sel);

             /* collapse to end */
             try {
               rng.collapse(false);
             } catch(ex) {}

             return rng.item(0);

           default:
             return this.getContentBody();
         }
       },

       "default" : function()
       {
         var sel = this.__getSelection();

         if (sel && sel.focusNode) {
           return sel.focusNode;
         }

         return this.getContentBody();
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
    /* TODO: complete disposing */
    try
    {
      if (this._listenerAdded)
      {
        var doc    = this.getContentDocument();
        var client = qx.core.Client.getInstance();
        var keyEventListener  = qx.event.handler.KeyEventHandler.getInstance();
        var EventRegistration = qx.html.EventRegistration;

        // ************************************************************************
        //   WIDGET KEY EVENTS
        // ************************************************************************
        // TODO: remove this privat method call
        EventRegistration.removeEventListener(doc, "keydown",  keyEventListener.__onkeydown);
        EventRegistration.removeEventListener(doc, "keyup",    keyEventListener.__onkeyup);
        EventRegistration.removeEventListener(doc, "keypress", keyEventListener.__onkeypress);

        // ************************************************************************
        //   WIDGET FOCUS/BLUR EVENTS
        // ************************************************************************
        if (qx.core.Variant.isSet("qx.client", "mshtml"))  {
          var focusBlurTarget = doc.body;
        } else if (qx.core.Variant.isSet("qx.client", "webkit")) {
          var focusBlurTarget = this.getContentWindow();
        } else {
          var focusBlurTarget = doc;
        }

        EventRegistration.removeEventListener(focusBlurTarget, "focus", this.__handleFocusEvent);
        EventRegistration.removeEventListener(focusBlurTarget, "blur",  this.__handleBlurEvent);
        EventRegistration.removeEventListener(doc, "focusout", this.__handleFocusOut);

        // ************************************************************************
        //   WIDGET MOUSE EVENTS
        // ************************************************************************
        EventRegistration.removeEventListener(doc.body, client.isMshtml() ? "mouseup" : "click", this.__handleMouseEvent);
        EventRegistration.removeEventListener(doc.body, client.isWebkit() ? "contextmenu" : "mouseup", this.__handleContextMenuEvent);
      }
    }
    catch(ex)
    {
      // ignore this exception
    }

    this._disposeFields("__commandManager", "__handleFocusEvent", "handleMouseEvent", "__contentWrap");
  }
});
