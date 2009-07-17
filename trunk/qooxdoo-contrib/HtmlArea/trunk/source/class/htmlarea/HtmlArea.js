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

   Contributors:
     * Petr Kobalicek (e666e)

************************************************************************ */

/* ************************************************************************

#asset(htmlarea/static/blank.html)

************************************************************************ */

/**
 * Rich text editor widget which encapsulates the low-level {@link htmlarea.HtmlAreaNative}
 * component to offer editing features.
 * 
 * 
 * Optimized for the use at a RIA.
 */
qx.Class.define("htmlarea.HtmlArea",
{
  extend : qx.ui.core.Widget,
  
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

  /**
   * Constructor
   *
   * @param value {String} Initial content
   * @param styleInformation {String | Map | null} Optional style information for the editor's document
   *                                               Can be a string or a map (example: { "p" : "padding:2px" }
   * @param source {String} source of the iframe
   * 
   * @lint ignoreDeprecated(_keyCodeToIdentifierMap)
   */
  construct : function(value, styleInformation, source)
  {
    // **********************************************************************
    //   INIT
    // **********************************************************************
    this.base(arguments);
    
    this._setLayout(new qx.ui.layout.Grow);
    
    this.addListenerOnce("appear", this.__setupAtAppear);
    this.addListener("appear", this.forceEditable);
    
    this.__postponedProperties = [];
    
    this.__el = qx.bom.Element.create("div");
    this.__editorComponent = new htmlarea.HtmlAreaNative(this.__el, value, styleInformation, source);
  },


 /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events:
  {
    /**
     * Thrown when the editor gets an error at loading time.
     */
    "loadingError"     : "qx.event.type.Data",

    /**
     * Only available if messengerMode is active. This event returns the current content of the editor.
     */
    "messengerContent" : "qx.event.type.Data",

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
    "focusOut"         : "qx.event.type.Event",
    
    /**
     * This event is dispatched when the editor gets a right click.
     */
    "contextmenu"      : "qx.event.type.Data",
    
    /** 
     * Holds information about the state of undo/redo
     * Keys are "undo" and "redo".
     * Possible values are 0 and -1 to stay in sync with
     * the kind the "cursorContext" event works.
     * (1 = active/pressed, 0 = possible/not pressed, -1 = disabled)
     */
    "undoRedoState"    : "qx.event.type.Data"
  },



  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Checks if the given node is a block node
     *
     * @type static
     * @param node {Node} Node
     * @return {Boolean} whether it is a block node
     */
    isBlockNode : function(node) {
      return htmlarea.HtmlAreaNative.isBlockNode(node);
    },


    /**
     * Checks if one element is in the list of elements that are allowed to contain a paragraph in HTML
     *
     * @param node {Node} node to check
     * @return {Boolean}
     */
    isParagraphParent : function(node) {
      return htmlarea.HtmlAreaNative.isParagraphParent(node);
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
      init  : "xhtml",
      apply : "_applyContentType"
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
      init  : false,
      apply : "_applyMessengerMode"
    },


    /**
     * Toggles whether a p element is inserted on each line break or not.
     * A "normal" linebreak can be achieved using the combination "Shift+Enter" anyway
     */
    insertParagraphOnLinebreak :
    {
      check : "Boolean",
      init  : true,
      apply : "_applyInsertParagraphOnLinebreak"
    },
    
    
    /**
     * If true we add a linebreak after control+enter
     */
    insertLinebreakOnCtrlEnter :
    {
      check : "Boolean",
      init  : true,
      apply : "_applyInsertLinebreakOnCtrlEnter"
    },

    
    /**
     * Function to use in postprocessing html. See getHtml() and __getHtml().
     */
    postprocess:
    {
      check: "Function",
      nullable: true,
      init: null,
      apply : "_applyPostprocess"
    },


    /**
     * Toggles whether to use Undo/Redo
     */
    useUndoRedo :
    {
      check : "Boolean",
      init  : true,
      apply : "_applyUseUndoRedo"
    },
    
    /**
     * appearance
     */
    appearance :
    {
      refine : true,
      init   : "htmlarea"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __postponedProperties : null,
    __editorComponent : null,
    __isReady : null,
    __commandManager : null,
    __isEditable : null,
    __firstLineSelected : null,
    __currentEvent : null,
    __storedSelectedHtml : null,
    __iframe : null,
    __isLoaded : null,
    __handleFocusEvent : null,
    __handleBlurEvent : null,
    __handleFocusOutEvent : null,
    __handleMouseEvent : null,
    __handleContextMenuEvent : null,
    __styleInformation : null,
    __contentWrap : null,
    
    
    /*
    ---------------------------------------------------------------------------
      MODIFIERS
    ---------------------------------------------------------------------------
    */
    
    _applyContentType : function(value, old)
    {
      if (this.__editorComponent != null) {
        this.__editorComponent.setContentType(value);
      } else {
        this.__postPoneProperty({ name: "contentType", value: value });
      } 
    },

    
    _applyEditable : function(value, old)
    {
      if (this.__editorComponent != null) {
        this.__editorComponent.setContentType(value);
      } else {
        this.__postPoneProperty({ name: "editable", value: value });
      }
    },
    
    
    _applyMessengerMode : function(value, old)
    {
      if (this.__editorComponent != null) {
        this.__editorComponent.setMessengerMode(value);
      } else {
        this.__postPoneProperty({ name: "messengerMode", value: value });
      }
    },
    
    
    _applyInsertParagraphOnLinebreak : function(value, old)
    {
      if (this.__editorComponent != null) {
        this.__editorComponent.setInsertParagraphOnLinebreak(value);
      } else {
        this.__postPoneProperty({ name: "insertParagraphOnLinebreak", value: value });
      }
    },
    
    
    _applyInsertLinebreakOnCtrlEnter : function(value, old)
    {
      if (this.__editorComponent != null) {
        this.__editorComponent.setInsertLinebreakOnCtrlEnter(value);
      } else {
        this.__postPoneProperty({ name: "insertLinebreakOnCtrlEnter", value: value });
      }
    },
    
    
    _applyPostprocess : function(value, old)
    {
      if (this.__editorComponent != null) {
        this.__editorComponent.setPostProcess(value);
      } else {
        this.__postPoneProperty({ name: "postprocess", value: value });
      }
    },
    
    
    _applyUseUndoRedo : function(value, old)
    {
      if (this.__editorComponent != null) {
        this.__editorComponent.setUseUndoRedo(value);
      } else {
        this.__postPoneProperty({ name: "useUndoRedo", value: value });
      }
    },

    
    /**
     * Collects data of properties which are set before the component is ready.
     * This way the properties set at the widget can be applied postponed.
     * 
     * @param propertyData {Map} name and value of the property to postpone
     * @return {void}
     */
    __postPoneProperty : function(propertyData) {
      this.__postponedProperties.push(propertyData);
    },
    
    
    /**
     * Cycles through the list of postponed property data and applies them
     * to the underlying editor component.
     * 
     * @return {void}
     */
    __applyPostponedProperties : function() 
    {
      var propertyNameCamelCase, propertyValue;
      for (var i=0, j=this.__postponedProperties.length; i<j; i++) {
        propertyNameCamelCase = qx.lang.String.camelCase(this.__postponedProperties[i].name);
        propertyValue = this.__postponedProperties[i].value;
        this.__editorComponent["set" + propertyNameCamelCase](propertyValue);
      }
    },
    
    
    /**
     * Listener method which is executed once at startup (with "appear" event).
     * Does basic setup of the editing component, listener delegation and
     * applies postponed properties.
     * 
     * @param e {qx.event.type.Event} event instance
     * @return {void}
     */
    __setupAtAppear : function(e)
    {
      this.__setupEditorComponent();
      this.__setupDelegateListeners();
      this.__applyPostponedProperties();
    },
    
    /**
     * Adds the low-level editing component to the widget
     * 
     * @return {void}
     */
    __setupEditorComponent : function()
    {
      var domElement = this.getContentElement().getDomElement();
      qx.dom.Element.insertBegin(this.__el.firstChild, domElement);
    },
    
    
    /**
     * Setup listeners for events of the low-level editing component and fires
     * them at the editing widget.
     */
    __setupDelegateListeners : function()
    {
      this.__editorComponent.addListener("ready", this.__delegateEvent, this);
      this.__editorComponent.addListener("focused", this.__delegateEvent, this);
      this.__editorComponent.addListener("focusout", this.__delegateEvent, this);
      
      this.__editorComponent.addListener("loadingError", this.__delegateDataEvent, this);
      this.__editorComponent.addListener("cursorContext", this.__delegateDataEvent, this);
      this.__editorComponent.addListener("contextmenu", this.__delegateDataEvent, this);
      this.__editorComponent.addListener("undoRedoState", this.__delegateDataEvent, this);
      this.__editorComponent.addListener("messengerContent", this.__delegateDataEvent, this);      
    },
    
    
    /**
     * Clones the incoming event and fires it at itself to let the application
     * developers listen to the widget instance.
     * 
     * @param e {qx.event.type.Event} event instance
     * @return {void}
     */
    __delegateEvent : function(e)
    {
      var clone = e.clone();
      this.fireEvent(clone.getType());
    },
    
    
    /**
     * Clones the incoming data event and fires it at itself to let the application
     * developers listen to the widget instance.
     * 
     * @param e {qx.event.type.Data} event instance
     * @return {void}
     */
    __delegateDataEvent : function(e)
    {
      var clone = e.clone();
      this.fireDataEvent(clone.getType(), e.getData());
    },
    
    
    /**
     * Returns the iframe object which is used to render the content
     * 
     * @return {Iframe} iframe DOM element
     */
    getIframeObject : function() {
      return this.__editorComponent.getIframeObject();
    },
    
    /**
     * Getter for command manager.
     * 
     * @return {htmlarea.manager.Manager?htmlarea.manager.UndoManager} manager instance
     */
    getCommandManager : function() {
      return this.__editorComponent.getCommandManager();
    },
        

    /**
     * Setting the value of the editor
     * 
     * @param value {String} new content to set
     * @return {void}
     */
    setValue : function(value) {
       this.__editorComponent.setValue(value);
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
    getValue : function() {
      return this.__editorComponent.getValue();
    },

    
    /**
     * Getting the computed value of the editor.
     * This method returns the current value of the editor traversing
     * the elements below the body element. With this method you always
     * get the current value, but it is much more expensive. So use it
     * carefully.
     * 
     * @param skipHtmlEncoding {Boolean ? false} whether the html encoding of text nodes should be skipped
     * @return {String} computed value of the editor
     */
    getComputedValue : function(skipHtmlEncoding) {
      return this.__editorComponent.getHtml(skipHtmlEncoding);
    },


    /**
     * Returns the complete content of the editor
     * 
     * @return {String}
     */
    getCompleteHtml : function() {
      return this.__editorComponent.getCompleteHtml();
    },


    /**
     * Returns the document of the iframe
     * 
     * @return {Object}
     */
    getContentDocument : function() {
      return this.__editorComponent.getContentDocument();
    },
    
    /**
     * Returns the body of the document
     * 
     * @return {Object}
     */
    getContentBody : function() {
      return this.__editorComponent.getContentBody();
    },
    
    
    /**
     * Returns the body of the document
     * 
     * @return {Object}
     */
    getContentWindow : function() {
      return this.__editorComponent.getContentWindow();
    },
    
    
    /** 
     * Returns all the words that are contained in a node.
     * 
     * @type member
     * @param node {Object} the node element where the text should be retrieved from.
     * @return {String[]} all the words.
     */
    getWords : function(node) {
      return this.__editorComponent.getWords(node);
    },
    
    
    /**
     * *** IN DEVELOPMENT! ***
     * Returns all words
     * 
     * @return {Map} all words
     */
    getWordsWithElement : function() {
      return this.__editorComponent.getWordsWithElement();
    },
    

    /**
     * *** IN DEVELOPMENT! ***
     * Returns all text nodes
     * 
     * @return {Array} Text nodes
     */
    getTextNodes : function() {
      return this.__editorComponent.getTextNodes();
    },

    
    /**
     * Whether the editor is ready to accept commands etc.
     * 
     * @return {Boolean} ready or not
     */
    isReady : function() {
      return this.__editorComponent.isReady();
    },
        
    
    /**
     * Forces the htmlArea to reset the document editable. This method can
     * be useful (especially for Gecko) whenever the HtmlArea was hidden and 
     * gets visible again.
     */
    forceEditable : function() {
      this.__editorComponent.forceEditable();
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
    isLoaded : function() {
      return this.__editorComponent.isLoaded();
    },


    /**
     * Whether the documet is in editable mode
     * 
     * @return {Boolean}
     */
    isEditable : function() {
      return this.__editorComponent.isEditable();
    },


    /**
     * Inserts html content on the current selection
     * 
     * @param value {String} html content
     * @return {Boolean} Success of operation
     */
    insertHtml : function(value) {
      return this.__editorComponent.insertHtml(value);
    },


    /**
     * Removes all formatting styles on the current selection content
     * 
     * @return {Boolean} Success of operation
     */
    removeFormat : function() {
      return this.__editorComponent.removeFormat();
    },


    /**
     * Sets the current selection content to bold font style
     * 
     * @return {Boolean} Success of operation
     */
    setBold : function() {
      return this.__editorComponent.setBold();
    },


    /**
     * Sets the current selection content to italic font style
     * 
     * @return {Boolean} Success of operation
     */
    setItalic : function() {
      return this.__editorComponent.setItalic();
    },


    /**
     * Sets the current selection content to underline font style
     * 
     * @return {Boolean} Success of operation
     */
    setUnderline : function() {
      return this.__editorComponent.setUnderline();
    },


    /**
     * Sets the current selection content to strikethrough font style
     * 
     * @return {Boolean} Success of operation
     *
     */
    setStrikeThrough : function() {
      return this.__editorComponent.setStrikeThrough();
    },


    /**
     * Sets the current selection content to the specified font size
     * 
     * @param value {Number} Font size
     * @return {Boolean} Success of operation
     */
    setFontSize : function(value) {
      return this.__editorComponent.setFontSize(value);
    },


    /**
     * Sets the current selection content to the specified font family
     * 
     * @param value {String} Font family
     * @return {Boolean} Success of operation
     */
    setFontFamily : function(value) {
      return this.__editorComponent.setFontFamily(value);
    },


    /**
     * Sets the current selection content to the specified font color
     * 
     * @param value {String} Color value (supported are Hex,
     * @return {Boolean} Success of operation
     */
    setTextColor : function(value) {
      return this.__editorComponent.setTextColor(value);
    },


    /**
     * Sets the current selection content to the specified background color
     * 
     * @param value {String} Color value (supported are Hex,
     * @return {Boolean} Success of operation
     */
    setTextBackgroundColor : function(value) {
      return this.__editorComponent.setTextBackgroundColor(value);
    },


    /**
     * Left-justifies the current selection
     * 
     * @return {Boolean} Success of operation
     */
    setJustifyLeft : function() {
      return this.__editorComponent.setJustifyLeft();
    },


    /**
     * Center-justifies the current selection
     *
     * @return {Boolean} Success of operation
     */
    setJustifyCenter : function() {
      return this.__editorComponent.setJustifyCenter();
    },


    /**
     * Right-justifies the current selection
     *
     * @return {Boolean} Success of operation
     */
    setJustifyRight : function() {
      return this.__editorComponent.setJustifyRight();
    },


    /**
     * Full-justifies the current selection
     *
     * @return {Boolean} Success of operation
     */
    setJustifyFull : function() {
      return this.__editorComponent.setJustifyFull();
    },


    /**
     * Indents the current selection
     * 
     * @return {Boolean} Success of operation
     */
    insertIndent : function() {
      return this.__editorComponent.insertIndent();
    },


    /**
     * Outdents the current selection
     * 
     * @return {Boolean} Success of operation
     */
    insertOutdent : function() {
      return this.__editorComponent.insertOutdent();
    },


    /**
     * Inserts an ordered list
     * 
     * @return {Boolean} Success of operation
     */
    insertOrderedList : function() {
      return this.__editorComponent.insertOrderedList();
    },


    /**
     * Inserts an unordered list
     *
     * @return {Boolean} Success of operation
     */
    insertUnorderedList : function() {
      return this.__editorComponent.insertUnorderedList();
    },


    /**
     * Inserts a horizontal ruler
     * 
     * @return {Boolean} Success of operation
     */
    insertHorizontalRuler : function() {
      return this.__editorComponent.insertHorizontalRuler();
    },


    /**
     * Insert an image
     *
     * @param attributes {Map} Map of HTML attributes to apply
     * @return {Boolean} Success of operation
     */
    insertImage : function(attributes) {
      return this.__editorComponent.insertImage(attributes);
    },


    /**
     * Inserts a hyperlink
     *
     * @param url {String} URL for the image to be inserted
     * @return {Boolean} Success of operation
     */
    insertHyperLink : function(url) {
      return this.__editorComponent.insertHyperLink(url);
    },

    /**
     * Alias for setBackgroundColor("transparent");
     *
     * @return {Boolean} if succeeded
     */
    removeBackgroundColor : function() {
      return this.__editorComponent.removeBackgroundColor();
    },


    /**
     * Sets the background color of the editor
     * 
     * @param value {String} color
     * @return {Boolean} if succeeded
     */
    setBackgroundColor : function(value) {
      return this.__editorComponent.setBackgroundColor(value);
    },


    /**
     * Alias for setBackgroundImage(null);
     * 
     * @return {Boolean} if succeeded
     */
    removeBackgroundImage : function () {
      return this.__editorComponent.removeBackgroundImage();
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
    setBackgroundImage : function(url, repeat, position) {
      return this.__editorComponent.setBackgroundImage(url, repeat, position);
    },


    /**
     * Selects the whole content
     * 
     * @return {Boolean} Success of operation
     */
    selectAll : function() {
      return this.__editorComponent.selectAll();
    },


    /**
     * Undo last operation
     * 
     * @return {void}
     */
    undo : function() {
      return this.__editorComponent.undo();
    },


    /**
     * Redo last undo
     * 
     * @return {void}
     */
    redo : function() {
      return this.__editorComponent.redo();
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
    resetHtml : function() {
      this.__editorComponent.resetHtml();
    },


    /**
     * Get html content (call own recursive method)
     * 
     * @param skipHtmlEncoding {Boolean ? false} whether the html encoding of text nodes should be skipped
     * @return {String} current content of the editor as XHTML
     */
    getHtml : function(skipHtmlEncoding) {
      return this.__editorComponent.getHtml(skipHtmlEncoding);
    },

    /**
     * Helper function to examine if HTMLArea is empty, except for
     * place holder(s) needed by some browsers.
     * 
     * @return {Boolean} True, if area is empty - otherwise false.
     */
    containsOnlyPlaceholder : function()
    {
      return this.__editorComponent.containsOnlyPlaceHolder();
    },


    /*
      -----------------------------------------------------------------------------
      PROCESS CURSOR CONTEXT
      -----------------------------------------------------------------------------
    */
    
    
    /**
     * Returns the information about the current context (focusNode). It's a
     * map with information about "bold", "italic", "underline", etc.
     * 
     * @return {Map} formatting information about the focusNode
     */
    getContextInformation : function() {
      return this.__editorComponent.getContextInformation();
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
    getSelection : function() {
      return this.__editorComponent.getSelection();
    },


    /**
     * Returns the currently selected text.
     * 
     * @return {String} Selected plain text.
     */
    getSelectedText : function() {
      return this.__editorComponent.getSelectedText();
    },
    

    /**
     * Returns the content of the actual range as text
     * 
     * @TODO: need to be implemented correctly
     * @return {String} selected text
     */
    getSelectedHtml : function() {
      return this.__editorComponent.getSelectedHtml();
    },
    
    
    /**
     * Clears the current selection
     * 
     * @return {void}
     */
    clearSelection : function() {
      this.__editorComponent.clearSelection();
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
    getRange : function() {
      return this.__editorComponent.getRange();
    },


    /*
      -----------------------------------------------------------------------------
      NODES
      -----------------------------------------------------------------------------
    */
    /**
      returns the node where the selection ends
    */
    getFocusNode : function() {
      return this.__editorComponent.getFocusNode();
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
   * @return {void}
   */
  destruct : function()
  {
    //try
    //{
      /* TODO: complete disposing */
      //var doc = this.getContentDocument();
      
      // ************************************************************************
      //   WIDGET KEY EVENTS
      // ************************************************************************
//      qx.event.Registration.removeListener(doc.body, "keydown",  this._handleKeyPress, this);
//      qx.event.Registration.removeListener(doc.body, "keyup",    this._handleKeyPress, this);
//      qx.event.Registration.removeListener(doc.body, "keypress", this._handleKeyPress, this);
      
      // ************************************************************************
      //   WIDGET FOCUS/BLUR EVENTS
      // ************************************************************************
//      var focusBlurTarget = qx.bom.client.Engine.WEBKIT ? this.__iframe.getWindow() : doc.body;
//      qx.event.Registration.removeListener(focusBlurTarget, "focus", this.__handleFocusEvent);
//      qx.event.Registration.removeListener(focusBlurTarget, "blur",  this.__handleBlurEvent);
//      qx.event.Registration.removeListener(doc, "focusout", this.__handleFocusOutEvent);
      
  
      // ************************************************************************
      //   WIDGET MOUSE EVENTS
      // ************************************************************************
//      qx.event.Registration.removeListener(doc.body, qx.bom.client.Engine.MSHTML ? "click" : "mouseup", this.__handleMouseEvent, this);
//      qx.event.Registration.removeListener(doc.body, qx.bom.client.Engine.WEBKIT ? "contextmenu" : "mouseup", this.__handleContextMenuEvent);
    //} catch (ex) {};
    

    this._disposeFields("__commandManager", "__handleFocusEvent", "__handleBlurEvent", "handleFocusOut", "handleMouseEvent", "__contentWrap");
  }
});
