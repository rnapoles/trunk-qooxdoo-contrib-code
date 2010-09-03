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
    textField.setMinWidth(100);

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
        case "button":
          return null;
          break;

        case "textfield":
          control = new qx.ui.form.TextField();
          control.setFocusable(false);
          control.addState("inner");
          control.setFocusable(true);
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


    /**
     * Toggles the popup's visibility.
     *
     * @param e {qx.event.type.Mouse} Mouse click event
     */
    _onClick : function(e) {
      this.toggle();
    },

    // overridden
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
        var value = this.getChildControl('textfield').getValue();
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
        var value = this.getChildControl('textfield').getValue();

        if ((value == null || value == "") && this.__selected == null && key != "Delete")
        {
          var children = this._getChildren();

          if (children && children.length > 0)
          {
            var item = null;

            if (item = children[children.length - 2])
            {
              this._deselectItem(item);
            }
          }
        }
        else if (this.__selected)
        {
        	this._deselectItem(this.__selected);
        	this.__selected = null;
        }
      }
      else if (key == "Left" || key == 'Right')
      {
      	var textfield = this.getChildControl('textfield');
      	var start = textfield.getTextSelectionStart();
      	var length = textfield.getTextSelectionLength();
      	var children = this._getChildren();
      	var n_children = children.length;
      	if (start == 0 && length == 0 && key == "Left")
      	{
      		if (this.__selected)
      		{
      			this.__selected.removeState('head');
      			var index = children.indexOf(this.__selected);
      			if (index > 0)
      			{
      				this.__selected = children[index-1];
      			}
      		}
      		else if (n_children > 1)
      		{
      			this.__selected = children[n_children - 2];
      		}
      		if (this.__selected)
      		{
      			this.__selected.addState("head");
      		}
      		e.stop();
      	}
      	else if (key == "Right" && this.__selected)
      	{
      			this.__selected.removeState('head');
      			var index = children.indexOf(this.__selected);
      			if ((index+2) < n_children)
      			{
      				this.__selected = children[index+1];
      				this.__selected.addState("head");
      			}
      			else
      			{
      				this.__selected = null;
      				this.tabFocus();
      			}
      			e.stop();
      	}
      }	
      else if (key == "Enter" || key == "Space")
      {
        if (this._preSelectedItem)
        {
          this._selectItem(this._preSelectedItem);
          this._preSelectedItem = null;
        }
        else if (key == "Space")
        {
          var textfield = this.getChildControl('textfield');
          textfield.setValue(textfield.getValue() + " ");
        }
        this.toggle();
      }
      else if (key == "Esc")
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
      // Synchronize the list with the current value on every
      // opening of the popup. This is useful because through
      // the quick selection mode, the list may keep an invalid
      // selection on close or the user may enter text while
      // the combobox is closed and reopen it afterwards.
      var popup = this.getChildControl("popup");
      if (!popup.isVisible())
      {
        // When closing the popup text should selected and field should
        // have the focus. Identical to when reaching the field using the TAB key.
        this.tabFocus();
      }
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
        	this._deselectItem(item); 
        	e.stop(); 
        	this.tabFocus(); 
        }, this); 
        
        item.addListener("click", function(e)
        {
        	if (this.__selected)
        	{
        		this.__selected.removeState("head");
        	}
        	this.__selected = item;
        	item.addState("head");
        	e.stop();
        }, this);
        item.setIconPosition("right");

        item.getChildControl('icon').addListener("mouseover", function() { item.addState('close'); });
        item.getChildControl('icon').addListener("mouseout", function() { item.removeState('close'); });
        
        if (this.getStyle() != "facebook")
        {
          item.setWidth(this.getWidth() - 4);
          item.setIconPosition("left");
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