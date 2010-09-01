/* ************************************************************************

   Copyright:
     2010 Guilherme R. Aiolfi
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Guilherme R. Aiolfi (gradinf@gmail.com)

************************************************************************ */

/* ************************************************************************

#asset(tokenfield/*)

************************************************************************ */

/**
 * A widget implementing the token field concept known from Mac OS X
 * @see http://developer.apple.com/mac/library/documentation/Cocoa/Conceptual/TokenField_Guide/Introduction/Introduction.html
 */
qx.Class.define("tokenfield.Token",
{
  extend : qx.ui.form.ComboBox,
  implement : [ qx.ui.core.IMultiSelection, qx.ui.form.IForm, qx.ui.form.IModelSelection ],
  include : [ qx.ui.core.MRemoteChildrenHandling, qx.ui.core.MMultiSelectionHandling, qx.ui.form.MForm, qx.ui.form.MModelSelection ],

  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */  
  events :
  {
    /**
     * This event is fired after a list item was added to the list. The
     * {@link qx.event.type.Data#getData} method of the event returns the
     * added item.
     */
    addItem    : "qx.event.type.Data",


    /**
	   * This event is fired after a list item has been removed from the list.
	   * The {@link qx.event.type.Data#getData} method of the event returns the
	   * removed item.
	   */
    removeItem : "qx.event.type.Data",
    
    
    /**
     * This event is fired when the widget needs external data. The data dispatched
     * with the event is the string fragment to use to find matching items
     * as the data. The event listener must then load the data from whereever 
     * it may come and call populateList() with the string fragment and the 
     * received data.
     */
    loadData : "qx.event.type.Data"    
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  properties :
  {
    /**
     * 
     */
    orientation :
    {
      check : [ "horizontal", "vertical" ],
      init  : "horizontal",
      apply : "_applyOrientation"
    },

    /**
     * 
     */
    appearance :
    {
      refine : true,
      init   : "token"
    },

    /**
     * 
     */
    url :
    {
      init     : null,
      event    : "changeUrl",
      nullable : true
    },

    /**
     * 
     */
    hintText : 
    { 
      init : "Type in a search term" 
    },
    
    /**
     * 
     */
    noResultsText : 
    { 
      init : "No results" 
    },
    
    /**
     * 
     */
    searchingText : 
    { 
      init : "Searching..." 
    },
    
    /**
     * 
     */
    searchDelay : 
    { 
      init : 300 
    },
    
    /**
     * 
     */
    minChars : 
    { 
      init : 2 
    },

    /**
     * 
     */
    store :
    {
      event    : "changeStore",
      init     : null,
      nullable : true
    },

    /**
     * 
     */
    tokenLimit :
    {
      init     : null,
      nullable : true
    },

    /**
     * 
     */
    jsonContainer : 
    { 
      init : null 
    },
    
    /**
     * 
     */
    method : 
    { 
      init : "GET" 
    },
    
    /**
     * 
     */
    contentType : 
    { 
      init : "json" 
    },
    
    /**
     * 
     */
    queryParam : 
    {  
      init : "q" 
    },
    
    /**
     * 
     */
    labelPath : 
    { 
      init : "label" 
    },

    /**
     * 
     */
    onResult :
    {
      init     : null,
      nullable : true
    },

    /**
     * 
     */
    style :
    { 
      init : "facebook" 
    }
  },
  
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function()
  {
    qx.ui.form.AbstractSelectBox.prototype.constructor.call(this);

    this.cache = new tokenfield.Cache();

    //this._getLayout().setReversed(true);
    this._setLayout(new qx.ui.layout.Flow());

    //var content = this._createChildControl("content");
    var textField = this._createChildControl("textfield");

    textField.addListener("mousedown", function(e) {
      e.stop();
    });

    //tokens.add(textField);
    this.addListener("click", this._onClick);

    // forward the focusin and focusout events to the textfield. The textfield
    // is not focusable so the events need to be forwarded manually.
    this.addListener("focusin", function(e) {
      textField.fireNonBubblingEvent("focusin", qx.event.type.Focus);
    }, this);

    this.addListener("focusout", function(e) {
      textField.fireNonBubblingEvent("focusout", qx.event.type.Focus);
    }, this);

    textField.setLiveUpdate(true);
    textField.addListener("input", this._onInputChange, this);
    textField.setMinWidth(100);

    this._dummy = new qx.ui.form.ListItem();
    this._dummy.setEnabled(false);
    this._dummy.setLabel(this.getHintText());
    this.getChildControl('list').add(this._dummy);

    //this._store = store;
    //this._urlFn = urlFn;
  },

  /* var controller = new qx.data.controller.List(null, this.getChildControl("list"));
              controller.bind("model", store, "model"); */

  //this.addListener("changeSelection", function(e) { debugger; console.log(e.getData()); });
  //textField.addListener("keypress", this._onKeyPress, this);
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */  
  members :
  {
    
    
    SELECTION_MANAGER : qx.ui.core.selection.Widget,



    
    /*
    ---------------------------------------------------------------------------
       WIDGET CREATION
    ---------------------------------------------------------------------------
    */        
    
    /**
     * TODOC
     *
     * @param id {var} TODOC
     * @return {null | var} TODOC
     */
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
        case "button":
          return null;
          break;

          /*   case "content":
            control = new qx.ui.container.Composite();

            control.setLayout(new qx.ui.layout.Flow());

             control.setMaxWidth(this.getMaxWidth());
                        control.setWidth(this.getMaxWidth()); 

            this._add(control);
            break; */

        case "textfield":
          control = new qx.ui.form.TextField();
          control.setFocusable(false);
          control.addState("inner");
          control.addListener("changeValue", this._onTextFieldChangeValue, this);
          control.addListener("blur", this.close, this);
          this._add(control);
          break;

        case "selectContainer":
          control = new qx.ui.container.Composite();
          control.setLayout(new qx.ui.layout.HBox());
          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
    },
    
    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */
    
    
    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void} 
     */
    _onClick : function(e) {
      this.toggle();
    },

    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void} 
     */
    _onPopupChangeVisibility : function(e)
    {
      // Synchronize the list with the current value on every
      // opening of the popup. This is useful because through
      // the quick selection mode, the list may keep an invalid
      // selection on close or the user may enter text while
      // the combobox is closed and reopen it afterwards.
      var popup = this.getChildControl("popup");

      if (popup.isVisible())
      {
        var list = this.getChildControl("list");
        var value = this.getValue();
        var item = null;

        if (value) {
          item = list.findItem(value);
        }

        if (item) {
          list.setSelection([ item ]);
        } else {
          list.resetSelection();
        }
      }
      else
      {
        // When closing the popup text should selected and field should
        // have the focus. Identical to when reaching the field using the TAB key.
        this.tabFocus();
      }
    },

    // In all cases: Remove focused state from button
    //this.getChildControl("button").removeState("selected");
    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void} 
     */
    _onKeyPress : function(e)
    {
      var key = e.getKeyIdentifier();
      var list = this.getChildControl("popup");

      if (key == "Down" && !list.isVisible())
      {
        //this.getChildControl("button").addState("selected");
        this.open();
        e.stopPropagation();
        e.stop();
      }
      else if (key == "Backspace")
      {
        var value = this.getChildControl('textfield').getValue();

        if (value == null || value == "")
        {
          var children = this._getChildren();

          if (children && children.length > 0)
          {
            var item = null;

            if (item = children[children.length - 2])
            {
              this.removeFromSelection(item);

              //console.log("removed " + item.getLabel());
              item.destroy();
            }
          }
        }
      }
      else if (key == "Enter" || key == "Space")
      {
        if (this._preSelectedItem)
        {
          this._selectItem(this._preSelectedItem);
          this._preSelectedItem = null;
        }

        this.toggle();
      }
      else
      {
        //qx.ui.form.AbstractSelectBox.prototype._onKeyPress.apply(this, [e]);
        this.getChildControl("list").handleKeyPress(e);
      }
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {boolean} TODOC
     */
    _onInputChange : function(e)
    {
      var str = e.getData();

      if (str == null || (str != null && str.length < this.getMinChars())) {
        return false;
      }

      var timer = qx.util.TimerManager.getInstance();

      // check for the old listener
      if (this.__timerId != null)
      {
        // stop the old one
        timer.stop(this.__timerId);
        this.__timerId = null;
      }

      // start a new listener to update the controller
      this.__timerId = timer.start(function()
      {
        this.search(str);
        this.__timerId = null;
      },
      0, this, null, this.getSearchDelay());
    },
    
    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void} 
     */
    _onListMouseDown : function(e)
    {
      this.base(arguments);

      this._selectItem(this._preSelectedItem);
    },    

    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void} 
     */
    _onListChangeSelection : function(e)
    {
      var current = e.getData();

      if (current.length > 0)
      {
        // Ignore quick context (e.g. mouseover)
        // and configure the new value when closing the popup afterwards
        var list = this.getChildControl("list");
        var popup = this.getChildControl("popup");
        var context = list.getSelectionContext();

        if (popup.isVisible() && (context == "quick" || context == "key")) {
          this._preSelectedItem = current[0];
        } else {
          this._preSelectedItem = null;
        }
      }
    },  
    
    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */
    
    /**
     * TODOC
     *
     * @return {void} 
     */
    refocus : function() {
      this.getChildControl("textfield").getFocusElement().focus();
    },    
    
    /**
     * TODOC
     *
     * @param str {String} TODOC
     * @return {void} 
     */
    search : function(str)
    {
      this.getChildControl('list').removeAll();
      this._dummy.setLabel(this.getSearchingText());
      this.getChildControl('list').add(this._dummy);
      this.open();

      // CB: We shouldn't be doing I/O in the widget itself,
      // this should be handled by the outside code
      
//      var url = this._urlFn.apply(this, [ str ]);
//
//      var req = new qx.io.remote.Request(url, 'GET', 'application/json');
//
//      req.addListener("completed", function(response)
//      {
//        var data = response.getContent();
//        // CB: moved to populateList()
//        this.cache.add(str, qx.data.marshal.Json.createModel(data));
//        this.populateList(this.cache.get(str), str);
//      },
//      this);
//
//      req.send();
      
      this.fireDataEvent("loadData", str );
    },
    
   
    /**
     * Populates the list with the data received from the data source
     *
     * @param str {String} The string fragment that was used for retrieving
     *    the autoocomplete data.
     * @param data {Object} A javascript object that contains
     * @return {void} 
     */
    populateList : function( str, data )
    {
      this.cache.add( str, qx.data.marshal.Json.createModel(data) );
      var result = this.cache.get(str);       
      console.log(result);
      this.getChildControl('list').removeAll();

      for (var i=0; i<result.getLength(); i++)
      {
        var label = result.getItem(i).get(this.getLabelPath());
        var item = new qx.ui.form.ListItem( this.highlight(label, str) );
        item.setModel(result.getItem(i));
        item.setRich(true);
        this.getChildControl('list').add(item);
      }
    },

    /**
     * TODOC
     *
     * @param item {var} TODOC
     * @return {void} 
     */
    _selectItem : function(item)
    {
      if (item && item.constructor == qx.ui.form.ListItem)
      {
        var item = new qx.ui.form.ListItem(item.getModel().get(this.getLabelPath()));
        item.setAppearance("tokenitem");
        item.setIconPosition("right");

        //item.setRich(true);
        if (this.getStyle() != "facebook")
        {
          item.setWidth(this.getWidth() - 4);
          item.setIconPosition("left");
        }

        this._addBefore(item, this.getChildControl('textfield'));
        this.addToSelection(item);

        //console.log("added " + item.getLabel());
        this.setValue("");
      }
    },


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param query {var} TODOC
     * @return {var} TODOC
     */
    highlight : function(value, query) {
      return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + query + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>");
    }
   
  }
});