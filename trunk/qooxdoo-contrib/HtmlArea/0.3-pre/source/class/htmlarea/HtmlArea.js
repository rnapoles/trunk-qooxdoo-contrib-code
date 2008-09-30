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
     * Jonathan Rass (jonathan_rass)

   Contributors:
     * Petr Kobalicek (e666e)

************************************************************************ */

/* ************************************************************************

#asset(htmlarea/static/blank.html)

************************************************************************ */

/**
 * Rich text editor widget
 */
qx.Class.define("htmlarea.HtmlArea",
{
  extend : qx.ui.core.Widget,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Constructor
   *
   * @param value {String} Initial content
   * @param styleInformation {String | Map | null} Optional style information for the editor's document
   *                                               Can be a string or a map (example: { "p" : "padding:2px" }
   * @param source {String} source of the iframe
   */
  construct : function(value, styleInformation, source)
  {
    // **********************************************************************
    //   INIT
    // **********************************************************************
    this.base(arguments);
    
    // set a layout
    this._setLayout(new qx.ui.layout.Grow);
    
    // create the iframe object
    this.__iframe = new qx.ui.embed.Iframe(qx.util.ResourceManager.toUri("htmlarea/static/blank.html"));
    this.__iframe.setFocusable(true);
    this._add(this.__iframe);
    
    /* Set some init values */
    this.__isLoaded = false;
    this.__isEditable = false;
    this.__isReady = false;
    
    this.__firstLineSelected = false;
    
    // catch load event
    this.__iframe.addListener("load", this._loaded, this);
    
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

    /* Check for available content */
    if (typeof value === "string") {
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
      var keyEventHandler = qx.event.handler.Keyboard.getInstance();

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
    "loadingError"     : "qx.event.type.Data",

    /**
     * Only available if messengerMode is active. This event returns the current content of the editor.
     */
    "messengerContent" : "qx.event.type.Data",

    /**
     * This event consists of two boolean values. These values represent if the text in the current cursor context is bo
     */
    "cursorContext"    : "qx.event.type.Data",

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
    "focusOut"         : "qx.event.type.Event"
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
     * Parse style string to map.
     *
     * Example:
     * htmlarea.HtmlArea.__parseStyle("text-align: left; text-weight: bold;");
     * 
     * @type static
     * @param str {String} String that contain valid style informations separated by ";"
     * @return {Map} Map of style names and it's values
     */
    __parseStyle: function(str)
    {
      var map = {};
      var a = str.split(";");
      var i;
    
      for (i = 0; i < a.length; i++)
      {
        var style = a[i], sep = style.indexOf(":");
        if (sep === -1) continue;
    
        var name =  qx.lang.String.trim(style.substring(0, sep));
        var value = qx.lang.String.trim(style.substring(sep+1, style.length));
        if (name && value) map[name] = value;
      }
    
      return map;
    },

    /**
     * Get html content (own recursive method)
     *
     * @type static
     * @param root {Node} Root node (starting point)
     * @param outputRoot {Boolean} Controls whether the root node is also added to the output
     * @return {String} Content of current node
     */
    __getHtml : function(root, outputRoot, postprocess)
    {
      // String builder is array for large text content
      var html = [];

      switch(root.nodeType)
      {
        // This is main area for returning html from iframe content. Content 
        // from editor can be sometimes ugly, so it's needed to do some
        // postprocess to make it beautiful.
        //
        // The initial version of this function used direct HTML rendering 
        // (each tag was rendered). This sometimes caused to render empty 
        // elements. I'm introducing here new method - store tag name and
        // attributes and use some logic to render them (or not).

        // Node.ELEMENT_NODE
        case 1:
        // Node.DOCUMENT_FRAGMENT_NODE
        case 11:

          // for() helper variable
          var i;
          // Tag in lowercase
          var tag = root.tagName.toLowerCase();
          // Attributes map
          var attributes = {};
          // Styles map (order is not important here)
          var styles = {};
          // It's self-closing tag ? (<br />, <img />, ...)
          var closed = (!(root.hasChildNodes() || htmlarea.HtmlArea.__needsClosingTag(root)));

          if (outputRoot)
          {
            // --------------------------------------------------------------
            // get all of the children nodes of the div placeholder
            // but DO NOT return the placeholder div elements itself.
            // This special case is only relevant for IE browsers
            // --------------------------------------------------------------

            if (qx.core.Variant.isSet("qx.client", "mshtml"))
            {
              if (tag == "div" && root.className && root.className == "placeholder")
              {
                for (i=root.firstChild; i; i=i.nextSibling)
                {
                  html.push(htmlarea.HtmlArea.__getHtml(i, true, postprocess));
                }
                return html.join("");
              }
            }

            // --------------------------------------------------------------
            // Parse attributes
            // --------------------------------------------------------------

            // Attributes list
            var attrs = root.attributes;
            var len = attrs.length;
            // Current attribute
            var a;

            for (i = 0; i < len; i++)
            {
              a = attrs[i];
              
              // TODO: Document this, I don't know what "specified" means
              if (!a.specified) continue;

              // Attribute name and value pair
              var name = a.nodeName.toLowerCase();
              var value = a.nodeValue;

              // Mozilla reports some special tags here; we don't need them.
              if (/(_moz|contenteditable)/.test(name))
              {
                continue;
              }

              if (name != "style")
              {
                if (qx.bom.client.Engine.MSHTML)
                {
                  if (name == "id" && root.getAttribute("old_id"))
                  {
                    value = root.getAttribute("old_id");
                  }
                  else if (!isNaN(value))
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

              // Ignore old id
              if (name == "old_id") continue;
              // Ignore attributes with no values
              if (!value) continue;
              // Ignore qooxdoo attributes (for example $$hash)
              if (name.charAt(0) === "$") continue

              // Interesting attrubutes are added to attributes array
              attributes[name] = value;
            }

            // --------------------------------------------------------------
            // Parse styles
            // --------------------------------------------------------------

            if (attributes.style !== undefined)
            {
              styles = htmlarea.HtmlArea.__parseStyle(attributes.style);
              delete attributes.style;
            }

            // --------------------------------------------------------------
            // Postprocess
            // --------------------------------------------------------------

            // Call optional postprocess function to modify tag, attributes
            // or styles in this element.
            if (postprocess)
            {
              // create postprocess-info:
              // - info.domElement - current dom element
              // - info.tag - tag name
              // - info.attributes - attributes map (stored name and value pairs)
              // - info.styles - styles map (stored name and value pairs)
              var info = {
                domElement: root,
                tag: tag,
                attributes: attributes,
                styles: styles
              };
              
              // call user defined postprocessing function
              postprocess(info);

              // remove reference to dom element (is it needed ? For IE ?)
              info.domElement = null;
              // and get tag back
              tag = info.tag;
            }
         
            // --------------------------------------------------------------
            // Generate Html
            // --------------------------------------------------------------

            // If tag is empty, we don't want it!
            if (tag)
            {
              // Render begin of tag -> <TAG
              html.push("<", tag);

              // Render attributes -> attr=""
              for (var name in attributes)
              {
                var value = attributes[name];
                html.push(" ", name, '="', value.toString().replace(new RegExp('"', "g"), "'"), '"');
              }

              // Render styles -> style=""
              if (!qx.lang.Object.isEmpty(styles))
              {
                html.push(' style="');
                for (var name in styles)
                {
                  var value = styles[name];
                  html.push(name, ":", value.toString().replace(new RegExp('"', "g"), "'"), ";");
                }
                html.push('"');
              }

              // Render end of tag -> > or />
              html.push(closed ? " />" : ">");
            }
          }
          
          // Child nodes, recursive call itself

          for (i = root.firstChild; i; i = i.nextSibling)
          {
            html.push(htmlarea.HtmlArea.__getHtml(i, true, postprocess));
          }
          
          // Close

          if (outputRoot && !closed && tag)
          {
            html.push("</", tag, ">");
          }
          break;

        // Node.TEXT_NODE
        case 3:
          html.push(htmlarea.HtmlArea.__htmlEncode(root.data));
          break;

        // Node.COMMENT_NODE
        case 8:
          // skip comments, for now ?
          html.push("<!--", root.data, "-->");
          break;
      }

      return html.join("");
    },

    // TODO: Map should be better! (Petr)
    /**
     * String containing all tags which need a corresponding closing tag
     */
    closingTags : " SCRIPT STYLE DIV SPAN TR TD TBODY TABLE EM STRONG FONT A P B I U STRIKE H1 H2 H3 H4 H5 H6 ",

    // TODO: No reason that first parameter is element, it should be only string with tag name (Petr)
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
     * Function to use in postprocessing html. See getHtml() and __getHtml().
     */
    postprocess:
    {
      check: "Function",
      nullable: true,
      init: null
    },


    /**
     * Toggles whether to use Undo/Redo
     */
    useUndoRedo :
    {
      check : "Boolean",
      init  : true
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
        html    : '<html xmlns="http:/' + '/www.w3.org/1999/xhtml" xml:lang="en" lang="en"><title></title>',
        meta    : '<meta http-equiv="Content-type" content="text/html; charset=UTF-8" />',
        style   : qx.core.Variant.select("qx.client",
        {
           "mshtml"  : 'html { margin:0px; padding:0px; } ' +
                       'body { width:100%; height:100%;background-color:transparent; overflow:show; background-image:none; margin:0px; padding:5px; }' +
                       'p { margin:0px; padding:0px; } ',
           "default" : 'html { width:100%; height:100%;margin:0px; padding:0px; overflow-y: auto; overflow-x: hidden; }' +
                       'body { background-color:transparent; overflow:show; background-image:none; margin:0px; padding:5px; }' +
                       'p { margin:0px; padding:0px; } '
        }),
        body    : '<body id="bodyElement">\n',
        footer  : '</body></html>'
      }
    },


    /** private field which holds the content of the editor  */
    __value        : "",


    /**
     * Returns the iframe object which is used to render the content
     * 
     * @return {qx.ui.embed.Iframe} iframe instance
     */
    getIframeObject : function()
    {
      return this.__iframe;
    },
    
    /**
     * replaces some content
     * 
     * @param search {Object} can be a string or regexp
     * @param replace {String} content which should be set
     * @return {Boolean}
     */
    replaceContent : function (search, replace)
    {
      if (this.__isReady)
      {
        var body = this.getContentBody();
        body.innerHTML = body.innerHTML.replace(search, replace);

        return true;
      }

      return false;
    },


    /**
     * Setting the value of the editor
     * 
     * @param value {String} new content to set
     * @return {void}
     */
    setValue : function(value)
    {
       if (typeof value === "string")
       { 
         this.__value = value;
         
         var doc = this.__iframe.getDocument();
         if (doc)
         {
           doc.body.innerHTML = value;
         }
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
     * @return {String} computed value of the editor
     */
    getComputedValue : function()
    {
      return this.getHtml();
    },


    /**
     * returns the complete content of the editor
     * 
     * @return {String}
     */
    getCompleteHtml : function ()
    {
      return this.__getWrappedContent(this.getHtml(), true);
    },


    /**
     * returns the body of the document
     * 
     * @return {Object}
     */
    getContentBody : function ()
    {
      if (this.__isReady)
      {
        return this.__iframe.getDocument().body;
      }
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
    _afterAppear : function()
    {
      this.base(arguments);

      // we need to set the designMode every time we toggle visibility back to "visible"
      this.__setDesignMode(true);
    },


    /**
     * should be removed if someone find a better way to ensure that the document
     * is ready in IE6
     * 
     * @return {void}
     */
    __waitForDocumentReady : function()
    {
      var doc = this.__iframe.getDocument();

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
  
          var self = this;
          window.setTimeout( function ()
          {
            self.__waitForDocumentReady();
          }, 0);
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
        /*
         * It seems this timeout is not needed anymore for gecko.
         * -> Keep an sharp on this one.  
         */
        this._onDocumentIsReady();
        
        // we need some thinking time in gecko --> https://bugzilla.mozilla.org/show_bug.cgi?id=191994
        /*var self = this;
        window.setTimeout( function()
        {
          self._onDocumentIsReady();
        //}, 10);*/
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
     * Starts when the iframe document is ready to set editable.
     */
    _onDocumentIsReady : function()
    {
      /* *******************************************
       *    INTIALIZE THE AVAILABLE COMMANDS       *
       * ******************************************* */

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
      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        this.setEditable(true);
      }

      /*
       * Render content - opens a new document and inserts
       * all needed elements plus the initial content
       */
      this.__renderContent();


      /* Register all needed event listeners */
      this.__addListeners();


      /*
       * Setting the document editable for all other browser engines
       * AFTER the content is set
       */
      if (!qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        this.setEditable(true);
      }

      // now we can set the ready state
      this.__isReady = true;

      /* Look out for any queued commands which are execute BEFORE this commandManager was available */
      var commandStack = this.__commandManager.stackedCommands ?  this.__commandManager.commandStack : null;

      /* Inform the commandManager on which document he should operate */
      cm.setContentDocument(this.__iframe.getDocument());

      /* Execute the stacked commmands - if any */
      if (commandStack != null)
      {
        // only focus if 
        ////this.setFocused(true);
        
        for (var i=0, j=commandStack.length; i<j; i++)
        {
          cm.execute(commandStack[i].command, commandStack[i].value);
        }
      }

      // stack is finished, set commandManager to the real one
      this.__commandManager = cm;

      /* dispatch the "ready" event at the end of the initialization */
      this.fireEvent("ready");
    },


    /**
     * Returns style attribute as string of a given element
     *
     * @param elem {Object} Element to check for styles 
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
     * @param value {String} body.innerHTML
     * @param useCurrentBodyStyle {Boolean} whether the current style of the body should be used
     * @return {String} content
     */
    __getWrappedContent : function (value, useCurrentBodyStyle)
    {
      var value = (typeof value == "string") ? value : "";
      var doc = this.__iframe.getDocument();

      /**
       * To hide the horizontal scrollbars in gecko browsers set the "overflow-x" explicit to "hidden"
       * In mshtml browsers this does NOT work. The property "overflow-x" overwrites the value of "overflow-y".
       **/
      var geckoOverflow = qx.bom.client.Engine.GECKO ? " html, body {overflow-x: hidden; } " : "";

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
     * @return {void}
     */
    __renderContent : function()
    {
      var value = this.getValue();

      if (typeof value == "string")
      {
        var doc = this.__iframe.getDocument();

        try
        {
          doc.open("text/html", true);
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
     * @return {void}
     */
    __addListeners : function()
    {
      var doc = this.__iframe.getDocument();

      qx.event.Registration.addListener(doc.body, "keypress", this._handleKeyPress, this);
      qx.event.Registration.addListener(doc.body, "keyup",    this._handleKeyUp,    this);
      qx.event.Registration.addListener(doc.body, "keydown",  this._handleKeyDown,  this);
      
      /*
       * Register event handler for focus/blur events
       *
       * IE and Gecko has to catch focus and blur events on the body element.
       * Webkit is listening to the contentWindow
       */
      var focusBlurTarget = qx.bom.client.Engine.WEBKIT ? this.__iframe.getWindow() : doc.body;
      qx.event.Registration.addListener(focusBlurTarget, "focus", this.__handleFocusEvent, this);
      qx.event.Registration.addListener(focusBlurTarget, "blur",  this.__handleFocusEvent, this);

      /* Register mouse event - for IE one has to catch the "click" event, for all others the "mouseup" is okay */
      qx.event.Registration.addListener(doc.body, qx.bom.client.Engine.MSHTML ? "click" : "mouseup", this.__handleMouseEvent, this);
                            
      //qx.bom.Element.addListener(doc.body, "mouseup", this.__handleMouseEvent, this);                            

      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        qx.event.Registration.addListener(doc.body, "focusout", this.__handleFocusOut, this);
      }
    },


    /**
     * Helper method to create an object which acts like
     * a command manager instance to collect all commands
     * which are executed BEFORE the command manager instance
     * is ready
     * 
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
     * sets the designMode of the document
     * 
     * @param onOrOff {Boolean} switch to enable/disable designMode
     * @return {void}
     */
    __setDesignMode : function (onOrOff)
    {
      var doc = this.__iframe.getDocument();

      if (this.__isLoaded && doc)
      {
        try
        {
          if (qx.core.Variant.isSet("qx.client", "gecko"))
          {
            // FF Bug (Backspace etc. doesnt work if we dont set it twice)
            doc.designMode = (onOrOff !== false) ? 'Off' : 'On';
          }

          doc.designMode = (onOrOff !== false) ? 'On' : 'Off';
        }
        catch (e)
        {
          // Fails if the element is not shown actually
          // we set it again in _afterAppear
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
     * @param propValue {var} Current value
     * @param propOldValue {var} Previous value
     * @param propData {var} Property configuration map
     * @return {void}
     * @throws {Error} Failed to enable rich edit functionality
     */
    _applyEditable : function(propValue, propOldValue, propData)
    {
      var doc = this.__iframe.getDocument();

      if (this.__isLoaded)
      {

        if (qx.core.Variant.isSet("qx.client", "gecko"))
        {
          doc.body.contentEditable = true;
        }

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
                this.fireDataEvent("loadingError", ex);
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


    /**
     * All keyUp events are delegated to this method
     * 
     * @param e {Object} Event object
     * @return {void}
     */
    _handleKeyUp : function(e)
    {
      var keyIdentifier   = e.getKeyIdentifier().toLowerCase();
      var isShiftPressed  = e.isShiftPressed();
      this.__currentEvent = e;
      
      /*
       * This block inserts a linebreak when the key combination "Ctrl+Enter" was pressed. It is
       * necessary in IE to look after the keypress and the keyup event. The keypress delivers the
       * "Ctrl" key and the keyup the "Enter" key. If the latter occurs right after the first one
       * the linebreak gets inserted.
       */
      if (qx.core.Variant.isSet("qx.client", "mshtml|webkit"))
      {
        /* Handle all shortcuts with "Ctrl+KEY" */
        if (this.__controlPressed)
        {
          switch(keyIdentifier)
          {
            case "enter":
              var sel = this.__getSelection();
              var rng = this.__createRange(sel);
              rng.collapse(true);
              rng.pasteHTML('<br/><div class="placeholder"></div>');
            break;
            
            /*
             * the keyUp event of the control key ends the "Ctrl+Enter"
             * session. So it is supported that the user is pressing this
             * combination several times without releasing the "Ctrl" key
             */
            case "control":
              this.__controlPressed = false;            
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
        if(keyIdentifier == "z" && this.__controlPressed && !isShiftPressed)
        {
          this.__executeHotkey('undo', false);
        }
        else if(keyIdentifier == "z" && this.__controlPressed && isShiftPressed)
        {
          this.__executeHotkey('redo', false);
        }
        else if(keyIdentifier == "y" && this.__controlPressed)
        {
          this.__executeHotkey('redo', false);
        }
      }
      
      else if (qx.core.Variant.isSet("qx.client", "gecko"))
      {
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
            
            var doc = this.__iframe.getDocument();
            /* Set flag indicating if first line is selected */
            this.__firstLineSelected = (sel.focusNode == doc.body.firstChild);
          break;
        }
      }
    },


    /**
     * All keyDown events are delegated to this method
     *
     * @param e {Object} Event object
     * @return {void}
     */
    _handleKeyDown : qx.core.Variant.select("qx.client",
    { 
      "mshtml|webkit" : function(e)
      {
        var keyIdentifier   = e.getKeyIdentifier().toLowerCase();
        
        if (qx.core.Variant.isSet("qx.debug", "on")) {
          this.debug(e.getType() + " | " + e.getKeyIdentifier().toLowerCase());
        }
        
        /* Stop the key events "Ctrl+Z" and "Ctrl+Y" for IE (disabling the browsers shortcuts) */
        if (this.__controlPressed && (keyIdentifier == "z" || keyIdentifier == "y" || 
                                      keyIdentifier == "b" || 
                                      keyIdentifier == "i" || keyIdentifier == "k"))
        {
          e.preventDefault();
          e.stopPropagation();
        }
        
        /* 
         * Only set the flag to true
         * Setting it to false is handled in the "keyUp" handler
         * otherwise holding the "Ctrl" key and hitting e.g. "z"
         * will start the browser shortcut at the second time.
         */
        if(keyIdentifier == "control")
        {
          this.__controlPressed = true;
        }
      },
      
      "default" : function(e) {}
    }),


    /**
     * All keyPress events are delegated to this method
     * 
     * @param e {Object} Event object
     * @return {void}
     */
   _handleKeyPress : function(e)
   {
      
      var doc = this.__iframe.getDocument();
      var keyIdentifier   = e.getKeyIdentifier().toLowerCase();
      var isCtrlPressed   = e.isCtrlPressed();
      var isShiftPressed  = e.isShiftPressed();
      this.__currentEvent = e;

      if (qx.core.Variant.isSet("qx.debug", "on")) {
        this.debug(e.getType() + " | " + keyIdentifier);
      }


      switch(keyIdentifier)
      {
        case "tab":
          if (qx.bom.client.Engine.GECKO)
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
            e.preventDefault();
            e.stopPropagation();

            switch(qx.bom.client.Engine.NAME)
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
                 this.insertHtml("<br /><div id='placeholder'></div>");
                 //this.insertHtml("<br _moz_dirty=\"\"/><div id='placeholder'></div>");
                 //this.insertHtml('<p><br type="_moz" /></p>');
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

                 var brNode = doc.createElement("br");
                 rng.collapse(true);
                 rng.insertNode(brNode);
                 rng.collapse(true);

                 rng.selectNode(brNode);
                 sel.addRange(rng);
                 rng.collapse(true);
               break;
            }
          }

          /*
           * Special handling for IE when hitting the "Enter" key
           * instead of letting the IE insert a <p> insert manually a <br>
           * if the corresponding property is set
           */
          if (qx.core.Variant.isSet("qx.client", "mshtml"))
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
          }
          /*
           * Special handling for Firefox when hitting the "Enter" key
           */
          else if(qx.core.Variant.isSet("qx.client", "gecko"))
          {
            if (this.getInsertParagraphOnLinebreak() && !isShiftPressed)
            {
              this.__insertParagraphOnLinebreak();
              e.preventDefault();
              e.stopPropagation();
            }
          }
          else if(qx.core.Variant.isSet("qx.client", "webkit"))
          {
            if (this.getInsertParagraphOnLinebreak() && isShiftPressed)
            {
              
              var sel = this.__getSelection();
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
          break;


        case "up" :
        /*
         * Firefox 2 needs some additional work to select the
         first line completely in case the selection is already
         on the first line and "key up" is pressed.
         */
        if (qx.bom.client.Engine.GECKO && qx.bom.client.Engine.FULLVERSION < 1.9 && isShiftPressed)
        {
          /* Fetch selection */
          var sel = this.__getSelection();

          /* First line is selected */
          if(sel.focusNode == doc.body.firstChild)
          {
            /* Check if the first line has been (partly) selected before. */
            if(this.__firstLineSelected)
            {
              /* Check if selection does not enclose the complete line already */
              if (sel.focusOffset != 0)
              {
                /* Select the complete line. */
                sel.extend(sel.focusNode, 0);
              }
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
          if (qx.bom.client.Engine.GECKO && qx.bom.client.Engine.FULLVERSION < 1.9)
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

          }

          this.__startExamineCursorContext();
        break;
          
        /*
         * For all keys which are able to reposition the cursor
         * start to examine the current cursor context
         */
        case "left":
        case "right":
        case "down":
        case "pageup":
        case "pagedown":
        case "delete":
        case "end":
          this.__startExamineCursorContext();
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
          if (isCtrlPressed)
          {
            this.selectAll();
          }
        break;

       }

       this.__currentEvent = null;
    },


    /**
     * Inserts a paragraph when hitting the "enter" key
     *
     * @return {Boolean} whether the key event should be stopped or not
     */
    __insertParagraphOnLinebreak : function()
    {

      var doc = this.__iframe.getDocument();
      var range  = this.getRange();
      var sel = this.__getSelection();

      /* This nodes are needed to apply the exactly style settings on the paragraph */
      var styleNodes = this.__commandManager.__commandManager.generateHelperNodes();

      /* Generate unique ids to find the elements later */
      var spanId = "__placeholder__" + Date.parse(new Date());
      var paragraphId = "__paragraph__" + Date.parse(new Date());

      var helperString = '<span id="' + spanId + '"></span>';
      var paragraphString = '<p id="' + paragraphId + '">';
      
      var spanNode;
      var paragraphNode;

      /* 
       * A paragraph will only be inserted, if the paragraph before it has content.
       * Therefore we also insert a helper node, then the paragraph and the style
       * nodes after it.
       */
      // styleNodes is array and this caused problems
      this.__commandManager.execute("inserthtml", helperString + paragraphString /* + styleNodes */);

      /* Fetch elements */
      spanNode      = this.__iframe.getWindow().document.getElementById(spanId);
      paragraphNode = this.__iframe.getWindow().document.getElementById(paragraphId);

      /* We do net need to pollute the generated HTML with IDs */
      paragraphNode.removeAttribute("id");

      /*
       * If the previous paragraph only contains the helperString, it was empty before.
       * Empty paragraphs are problematic in Gecko, because they are not rendered properly.
       */
      if(paragraphNode.previousSibling.innerHTML == helperString)
      {
        /* Insert a bogus node to set the lineheight and the style nodes to apply the styles. */
        paragraphNode.previousSibling.innerHTML = "";
        for (var i = 0; i < styleNodes.length; i++) paragraphNode.previousSibling.appendChild(styleNodes[i]);
        paragraphNode.previousSibling.innerHTML += '<br _moz_dirty="" type="_moz"/>';
      }
      else
      {
        spanNode.removeAttribute("id");
      }

      return true;
    },


    /**
     * Executes a method and prevent default
     *
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
      }
    },


    /**
     * Eventlistener for focus events
     *
     * @param e {Object} Event object
     * @return {void}
     */
    _handleFocusEvent : function(e)
    {
      //this.__iframe.setFocused(e.type == "focus");
      e.getType() == "focus" ? this.__onFocus() : this.__onBlur();
    },


    /**
     * Called with every focus event of the editor.
     * Stores the current content of the editor for later
     * comparison (see at {@link #__onBlur} method)
     * 
     * @return {void}
     */
   __onFocus : function()
   {
     this.__storedSelectedHtml = null;
     this.fireEvent("focused");
   },


   /**
    * Called with every blur event of the editor.
    * Compares the current value with the stored one.
    * If they are different the current content is synced
    * with the value variable.
    * 
    * @return {void}
    */
   __onBlur : function()
   {
     // nothing to do
   },


    /**
     * Eventlistener for all mouse events.
     * This method is invoked for mshtml on "click" events and
     * on "mouseup" events for all others.
     *
     * @param e {Object} Event object
     * @return {void}
     */
    _handleMouseEvent : function(e)
    {
      if (qx.core.Variant.isSet("qx.debug", "on")) {
        this.debug("handleMouse " + e.getType());
      }

      /* TODO: transform the DOM events to real qooxdoo events - just like the key events */
      this.__startExamineCursorContext();
    },


    /**
     * Eventlistener for focus out events to save the current selection.
     * NOTE: this method is currently only used for mshtml.
     * 
     * @param e {qx.event.type.Event} focus out event
     * @return {void}
     */
    _handleFocusOut : qx.core.Variant.select("qx.client", {
      "mshtml" : function(e)
      {
        /* Save range text */
        if (this.__storedSelectedHtml == null){
          this.__storedSelectedHtml = this.getSelectedHtml();
        }

        this.fireEvent("focusOut");
      },
      "default" : function(e) {}
    }),


    /*
    ---------------------------------------------------------------------------
      EXEC-COMMANDS
    ---------------------------------------------------------------------------
    */

    /**
     * Whether the editor has loaded
     * 
     * @return {Boolean}
     */
    isLoaded : function ()
    {
      var loaded = this.base(arguments);
      return this.__isLoaded && loaded;
    },


    /**
     * Whether the documet is in editable mode
     * 
     * @return {Boolean}
     */
    isEditable : function ()
    {
      return this.__isEditable;
    },


    /**
     * Inserts html content on the current selection
     * 
     * @param value {String} html content
     * @return {Boolean} Success of operation
     */
    insertHtml : function (value)
    {
      return this.__commandManager.execute("inserthtml", value);
    },


    /**
     * Removes all formatting styles on the current selection content
     * 
     * @return {Boolean} Success of operation
     */
    removeFormat : function()
    {
      return this.__commandManager.execute("removeformat");
    },


    /**
     * Sets the current selection content to bold font style
     * 
     * @return {Boolean} Success of operation
     */
    setBold : function()
    {
      return this.__commandManager.execute("bold");
    },


    /**
     * Sets the current selection content to italic font style
     * 
     * @return {Boolean} Success of operation
     */
    setItalic : function()
    {
      return this.__commandManager.execute("italic");
    },


    /**
     * Sets the current selection content to underline font style
     * 
     * @return {Boolean} Success of operation
     */
    setUnderline : function()
    {
      return this.__commandManager.execute("underline");
    },


    /**
     * Sets the current selection content to strikethrough font style
     * 
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
     * @param value {Number} Font size
     * @return {Boolean} Success of operation
     */
    setFontFamily : function(value) {
      return this.__commandManager.execute("fontfamily", value);
    },


    /**
     * Sets the current selection content to the specified font color
     * 
     * @param value {String} Color value (supported are Hex,
     * @return {Boolean} Success of operation
     */
    setTextColor : function(value) {
      return this.__commandManager.execute("textcolor", value);
    },


    /**
     * Sets the current selection content to the specified background color
     * 
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
     * @return {Boolean} Success of operation
     */
    setJustifyLeft : function()
    {
      return this.__commandManager.execute("justifyleft");
    },


    /**
     * Center-justifies the current selection
     *
     * @return {Boolean} Success of operation
     */
    setJustifyCenter : function()
    {
      return this.__commandManager.execute("justifycenter");
    },


    /**
     * Right-justifies the current selection
     *
     * @return {Boolean} Success of operation
     */
    setJustifyRight : function()
    {
      return this.__commandManager.execute("justifyright");
    },


    /**
     * Full-justifies the current selection
     *
     * @return {Boolean} Success of operation
     */
    setJustifyFull : function()
    {
      return this.__commandManager.execute("justifyfull");
    },


    /**
     * Indents the current selection
     * 
     * @return {Boolean} Success of operation
     */
    insertIndent : function()
    {
      return this.__commandManager.execute("indent");
    },


    /**
     * Outdents the current selection
     * 
     * @return {Boolean} Success of operation
     */
    insertOutdent : function()
    {
      return this.__commandManager.execute("outdent");
    },


    /**
     * Inserts an ordered list
     * 
     * @return {Boolean} Success of operation
     */
    insertOrderedList : function()
    {
      return this.__commandManager.execute("insertorderedlist");
    },


    /**
     * Inserts an unordered list
     *
     * @return {Boolean} Success of operation
     */
    insertUnorderedList : function()
    {
      return this.__commandManager.execute("insertunorderedlist");
    },


    /**
     * Inserts a horizontal ruler
     * 
     * @return {Boolean} Success of operation
     */
    insertHorizontalRuler : function()
    {
      return this.__commandManager.execute("inserthorizontalrule");
    },


    /**
     * Insert an image
     *
     * @param url {String} url of the image to insert
     * @return {Boolean} Success of operation
     */
    insertImage : function(url)
    {
      return this.__commandManager.execute("insertimage", url);
    },


    /**
     * Inserts a hyperlink
     *
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
     * @return {Boolean} if succeeded
     */
    removeBackgroundColor : function () {
      this.__commandManager.execute("backgroundcolor", "transparent");
    },


    /**
     * Sets the background color of the editor
     * 
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
     * @return {Boolean} if succeeded
     */
    removeBackgroundImage : function () {
      this.__commandManager.execute("backgroundimage");
    },


    /**
     * Inserts an background image
     *
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
     * @return {Boolean} Success of operation
     */
    selectAll : function()
    {
      return this.__commandManager.execute("selectall");
    },


    /**
     * Undo last operation
     * 
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
     * @return {void}
     */
    resetHtml : function()
    {
      var doc = this.__iframe.getDocument();

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
      if (qx.bom.client.Engine.GECKO) {
        doc.body.innerHTML = "<p>&nbsp;</p>";
      }

      /*
       * To ensure Webkit is showing a cursor after resetting the
       * content it is necessary to create a new selection and add a range
       */
      else if (qx.bom.client.Engine.WEBKIT)
      {
        var sel = this.__getSelection();
        var rng = doc.createRange();

        sel.addRange(rng);
      }
    },


    /**
     * Get html content (call own recursive method)
     * 
     * @return {String} current content of the editor as XHTML
     */
    getHtml : function()
    {
      var doc = this.__iframe.getDocument();
      if (doc == null) return null;

      return htmlarea.HtmlArea.__getHtml(doc.body, false, this.getPostprocess());
    },

    /**
     * Helper function to examine if HTMLArea is empty, except for
     * place holder(s) needed by some browsers.
     * 
     * @return {Boolean} True, if area is empty - otherwise false.
     */
    containsOnlyPlaceholder : qx.core.Variant.select("qx.client",
    {

      "mshtml" : function()
      {
        var doc = this.__iframe.getDocument();
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
     * -1 = command is not possible at the moment. Used to disable the corresponding buttons
     *  0 = command is possible at the moment. Used to enable the corresponding buttons (e.g. bold/italic/underline etc.)
     *  1 = cursor is over content which already received that command. Used to to activate the corresponding buttons (e.g. bold/italic/underline etc.)
     *
     * 
     * @return {void}
     */
    __examineCursorContext : function()
    {
      if (this._processingExamineCursorContext || this.getEditable() == false) {
        return;
      }

      this._processingExamineCursorContext = true;
      var doc = this.__iframe.getDocument();


      /*
        ----------
        focus node
        ----------
      */
      var focusNode      = this.getFocusNode();
      var focusNodeStyle = qx.core.Variant.isSet("qx.client", "mshtml") ? focusNode.currentStyle : doc.defaultView.getComputedStyle(focusNode, null);

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
      
      this.fireDataEvent("cursorContext", eventMap);

      this._processingExamineCursorContext = false;
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
         return this.__iframe.getDocument().selection;
       },

       "default" : function()
       {
         return this.__iframe.getWindow().getSelection();
       }
    }),


    /**
     * Returns the currently selected text.
     * 
     * @return {String} Selected plain text.
     */
    getSelectedText : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function()
      {
        return this.getRange().text;
      },

      "default" : function()
      {
        return this.getRange().toString();
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
      if (this.__storedSelectedHtml != null)
      {
        return this.__storedSelectedHtml;
      }

      var range = this.getRange();

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

    /*
     -----------------------------------------------------------------------------
     TEXT RANGE
     -----------------------------------------------------------------------------
    */

    /**
     * returns the range of the current selection
     * 
     * @return {Range} Range object
     */
    getRange : function()
    {
      return this.__createRange(this.__getSelection());
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
        var doc = this.__iframe.getDocument();
        
        if (sel)
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

       "default" : function(sel)
       {
         var doc = this.__iframe.getDocument();

         if (sel)
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
             return this.__iframe.getDocument().body;
         }
       },

       "default" : function()
       {
         var sel = this.__getSelection();

         if (sel && sel.focusNode)
         {
           return sel.focusNode.parentNode;
         }

         return this.__iframe.getDocument().body;
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
   * @return {void}
   */
  destruct : function()
  {
    /* TODO: complete disposing */
    var doc = this.__iframe.getDocument();
    
    // ************************************************************************
    //   WIDGET KEY EVENTS
    // ************************************************************************
    qx.event.Registration.removeListener(doc.body, "keydown",  this._handleKeyPress, this);
    qx.event.Registration.removeListener(doc.body, "keyup",    this._handleKeyPress, this);
    qx.event.Registration.removeListener(doc.body, "keypress", this._handleKeyPress, this);
    
    // ************************************************************************
    //   WIDGET FOCUS/BLUR EVENTS
    // ************************************************************************
    qx.event.Registration.removeListener(doc, "focus", this.__handleFocusEvent);
    qx.event.Registration.removeListener(doc, "blur",  this.__handleFocusEvent);

    // ************************************************************************
    //   WIDGET MOUSE EVENTS
    // ************************************************************************
    qx.event.Registration.removeListener(doc.body, qx.bom.client.Engine.MSHTML ? "click" : "mouseup", this.__handleMouseEvent, this);
    
    if (qx.core.Variant.isSet("qx.client", "mshtml"))
    {
      qx.event.Registration.removeListener(doc, "focusout", this.__handleFocusOut);
    }

    this._disposeFields("__commandManager", "__handleFocusEvent", "handleMouseEvent", "__contentWrap");
  }
});
