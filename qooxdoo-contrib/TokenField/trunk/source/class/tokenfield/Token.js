/* ************************************************************************

   Copyright:
     2010 Guilherme R. Aiolfi

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Guilherme R. Aiolfi (guilhermeaiolfi)

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
  extend : qx.ui.form.AbstractSelectBox,
  implement : [
    qx.ui.core.IMultiSelection,
    qx.ui.form.IModelSelection
  ],
  include : [
    qx.ui.core.MMultiSelectionHandling,
    qx.ui.form.MModelSelection
  ],

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
      init  : "vertical",
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
    tokenLimit :
    {
      init     : null,
      nullable : true
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
    this.base(arguments);

    this.cache = new tokenfield.Cache();

    this._setLayout(new qx.ui.layout.Flow());

    var textField = this._createChildControl("textfield");

    var label = this._createChildControl("label");
    this.getApplicationRoot().add(label, { top: -10, left: -1000 });
    label.setAppearance(textField.getAppearance());
    textField.bind("value", label, "value");
    textField.addListener("keypress", function(e){
    	//label.setValue(textField.getValue());
    	textField.setWidth(label.getBounds()["width"] + 8);
    }, this);
    
    textField.addListener("mousedown", function(e) {
      e.stop();
    });

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
    textField.setMinWidth(6);

    this._dummy = new qx.ui.form.ListItem();
    this._dummy.setEnabled(false);
    this._dummy.setLabel(this.getHintText());
    this.getChildControl('list').add(this._dummy);
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    SELECTION_MANAGER : tokenfield.SelectionManager,

    /*
    ---------------------------------------------------------------------------
       WIDGET CREATION
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
      	case "label":
      		control = new qx.ui.basic.Label();
      		//control.setWidth(10);
      		control.hide();
      		break;
      	
        case "button":
          return null;
          break;

        case "textfield":
          control = new qx.ui.form.TextField();
          control.setFocusable(false);
          control.addState("inner");
          //control.addListener("changeValue", this._onTextFieldChangeValue, this);
          control.addListener("blur", this.close, this);
          this._add(control);
          break;

        case "list":
          // Get the list from the AbstractSelectBox
          control = this.base(arguments, id);

          // Change selection mode
          control.setSelectionMode("single");
          break;
          
        case "popup":
          control = new qx.ui.popup.Popup(new qx.ui.layout.VBox);
          control.setAutoHide(true);
          control.setKeepActive(true);
          control.addListener("mouseup", this.close, this);
          control.add(this.getChildControl("list"));
          
          control.addListener("changeVisibility", this._onPopupChangeVisibility, this);
          break;
      }

      return control || this.base(arguments, id);
    },
  
    // overridden
    tabFocus : function()
    {
      var field = this.getChildControl("textfield");

      field.getFocusElement().focus();
      //field.selectAllText();
    },
    
    tabBlur : function()
    {
    	var field = this.getChildControl("textfield");

      field.getFocusElement().blur();
    },

    // overridden
    /**
     * @lint ignoreReferenceField(_forwardStates)
     */
    _forwardStates : {
      focused : true
    },

    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */

    // overridden
    _onBlur : function(e)
    {
    	return;
    },
    
    /**
     * Toggles the popup's visibility.
     *
     * @param e {qx.event.type.Mouse} Mouse click event
     */
    _onClick : function(e) {
    	if (this.__selected)
    	{
    		this.__selected.removeState("head");
    	}
    	this.__selected = null;
    	this.toggle();
    },

    // overridden
    _onKeyPress : function(e)
    {
      var key = e.getKeyIdentifier();
      var list = this.getChildControl("popup");

      if (key == "Down" && !list.isVisible())
      {
        this.open();
        e.stopPropagation();
        e.stop();
      }
      else if (key == "Backspace" || key == "Delete")
      {
        var textfield = this.getChildControl('textfield');
        var value = textfield.getValue();
        var children = this._getChildren();
        var index = children.indexOf(textfield);
        if (value == null || value == "" && !this.__selected)
        {
        	if (key == "Delete" && index < (children.length - 1))
        	{
        		this.__selected = children[index+1];
        		this.__selected.addState("head");
        		this.focus();
        	}
        	else if (key == "Backspace" && index > 0)
        	{
        		this.__selected = children[index-1];
        		this.__selected.addState("head");
        		this.focus();
        	}
        }
        else if (this.__selected)
        {
        	this._deselectItem(this.__selected);
        	this.__selected = null;
        	this.tabFocus();
        	e.stop();
        }
      }
      else if (key == "Left" || key == 'Right')
      {
      	var textfield = this.getChildControl('textfield');
      	var start = textfield.getTextSelectionStart();
      	var length = textfield.getTextSelectionLength();
      	var children = this._getChildren();
      	var n_children = children.length;
      	
      	var item = this.__selected? this.__selected : textfield;
      	var index = children.indexOf(item);
      	if (item == textfield)
      	{
      		if (key == 'Left')
      			index -= 1;
      		else
      			index += 1;
      	}
      	
      	var index_textfield = children.indexOf(textfield);
      	
				if (key == "Left" && index >= 0 && start == 0 && length == 0)
				{
					this._addBefore(textfield, children[index]);
				}
				else if (key == "Right" && index < n_children && start == textfield.getValue().length)
				{
					this._addAfter(textfield, children[index]);
				}
				
				if (this.__selected)
      	{
      		this.__selected.removeState("head");
      	}
      	this.__selected = null;
      	
      	// I really don't know, but FF needs the timer to be able to set the focus right
      	// when there is a selected item and the key == 'Left'
      	qx.util.TimerManager.getInstance().start(function(){
      		this.tabFocus();
        },null,this,null,20);
				
      }	
      else if (key == "Enter" || key == "Space")
      {
      	if (this._preSelectedItem && this.getChildControl('popup').isVisible())
        {
          this._selectItem(this._preSelectedItem);
          this._preSelectedItem = null;
          this.toggle();
        }
        else if (key == "Space")
        {
          var textfield = this.getChildControl('textfield');
          textfield.setValue(textfield.getValue() + " ");
          e.stop();
        }
      }
      else if (key == "Escape")
      {
      	this.close();
      }
      else if (key != "Left" && key != "Right")
      {
        this.getChildControl("list").handleKeyPress(e);
      }
    },


    /**
     * Event listener for <code>input</code> event on the textfield child
     *
     * @param e {qx.event.type.Data} Data Event
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

    // overridden
    _onListMouseDown : function(e)
    {
      this._selectItem(this._preSelectedItem);
    },

    // overridden
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

    // overridden
    _onPopupChangeVisibility : function(e)
    {
    	this.tabFocus();
    },

    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */

    /**
     * Fire a event to search for a string
     *
     * @param str {String} query to search for
     */
    search : function(str)
    {
      this.getChildControl('list').removeAll();
      this._dummy.setLabel(this.getSearchingText());
      this.getChildControl('list').add(this._dummy);
      this.open();

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
     * Removes an item from the selection
     *
     * @param item {qx.ui.form.ListItem} The List Item to be removed from the selection
     */
    _deselectItem : function(item)
    {
    	if (item && item.constructor == qx.ui.form.ListItem)
    	{
    		this.removeFromSelection(item);
    		item.destroy();
    	}
    },
    /**
     * Adds an item to the selection
     *
     * @param item {qx.ui.form.ListItem} The List Item to be added to the selection
     */
    _selectItem : function(item)
    {
      if (item && item.constructor == qx.ui.form.ListItem)
      {
        var item = new qx.ui.form.ListItem(item.getModel().get(this.getLabelPath()));
        
        item.setAppearance("tokenitem");
        item.getChildControl('icon').setAnonymous(false);
        item.getChildControl('icon').addListener("click", function(e) 
        { 
        	if (this.__selected)
        	{
        		this.__selected.removeState("head");
        		this.__selected = null;
        	}
        	this._deselectItem(item); 
        	e.stop(); 
        	this.tabFocus(); 
        }, this); 
        
        item.addListener("click", function(e)
        {
        	item.addState("head");
        	if (this.__selected != null && this.__selected != item)
        	{
        		this.__selected.removeState("head");
        	}
        	this.__selected = item;
        	e.stop();
        }, this);
        item.setIconPosition("right");

        item.getChildControl('icon').addListener("mouseover", function() { item.addState('close'); });
        item.getChildControl('icon').addListener("mouseout", function() { item.removeState('close'); });
        
        if (this.getStyle() != "facebook")
        {
          item.getChildControl("label").setWidth(this.getWidth() - 29);
        }

        this._addBefore(item, this.getChildControl('textfield'));
        this.addToSelection(item);

        this.getChildControl('textfield').setValue("");
      }
    },


    /**
     * Highlight the searched string fragment
     *
     * @param value {String} The phrase containing the frament to be highlighted
     * @param query {String} The string fragment that should be highlited
     * @return {String} TODOC
     */
    highlight : function(value, query) {
      return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + query + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>");
    }

  }
});