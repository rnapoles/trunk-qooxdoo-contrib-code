/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

qx.Class.define("inspector.objectFinder.ObjectFinder", {
  
  extend : inspector.AbstractWindow,  

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */  
  statics: {
    // the therm which is in the search textfield by default
    SEARCH_TERM: "Search..."
  },
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(main, name) {
    // call the constructor of the superclass
    this.base(arguments, main, name);

    // initialize the popup for the objects summary
    this._objectsPopup = new qx.ui.popup.Popup();
    this._objectsPopup.addToDocument();
    this._objectsPopup.add(new qx.ui.basic.Label());
    this._objectsPopup.setBackgroundColor("#FFFAD3");
    this._objectsPopup.setBorder("black");
    this._objectsPopup.setPadding(5, 10);
    this._objectsPopup.setHeight(500);
    this._objectsPopup.setWidth(350);
    this._objectsPopup.setOverflow("auto");

    // load the obecjts into the table after the component is completely loaded
    var self = this;
    window.setTimeout(function() {
      // load
      self.reload();
      // if a widget is selected, selet is on open
      var currentWidget = self._inspector.getWidget();
      if (currentWidget != null) {
        self.selectObject(currentWidget);
      }
    }, 0);
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    /*
    *********************************
       ATTRIBUTES
    *********************************
    */
    // the main elements of the object finder
    _table: null,
    _tableModel: null,
    _objectsPopup: null,
    
    // buttons and tooltips
    _reloadButton: null,
    _reloadToolTip: null,
    _findField: null,
    _autoReloadToolTip: null,
    _objectSummaryToolTip: null,
    
    // timers
    _reloadTimer: null,    
    _searchTimer: null,
    
    
    /*
    *********************************
       PUBLIC
    *********************************
    */  
    /**
     * Returns the components of the widget finder.
     * @internal
     * @return {Array} List of all components which should be
     *    ommited in the tree view of the developers application.
     */
    getComponents: function() {
      return [this, this._table, this._reloadToolTip, 
              this._autoReloadToolTip, this._objectsPopup, 
              this._objectSummaryToolTip];
    },
    
    
    /**
     * Selects an object in the list. If the object could not 
     * be found in the list in case the list is not up to date
     * the selection of the list will be removed. 
     * @param object {qx.core.Object} The object to select.
     */
    selectObject: function(object) {
      // flag to mark if the item was selected
      var selected = false;    
      // get the current data of the document    
      var currentData = this._tableModel.getData();
      // go threw the data
      for (var key in currentData) {
        // if the widget is found
        if (currentData[key][0] == object.toHashCode()) {
          // mark as selected
          selected = true;                    
          // select the object in the table
          var selectionModel = this._table.getSelectionModel();
          selectionModel.setSelectionInterval(key, key);
          this._table.setFocusedCell(0, key, true);
        }
      }        
      // if the object could not be selected in the table
      if (!selected) {
        // remove the selection
        this._table.getSelectionModel().clearSelection();
        this._table.setFocusedCell(null, null, false);
      }
    },
    
    
    /**
     * Returns the hashcode of the currently selected object. 
     * If none is selected, null will be returned.
     * @return {String} The hash code of the current selected object.
     */
    getSelectedWidgetHash: function() {
      // get the id of the selected row
      var rowId = this._table.getSelectionModel().getAnchorSelectionIndex();
      // get the selected row
      var row = this._tableModel.getData()[rowId];      
      if (row != null) {
        return row[0];        
      }
      return null;
    },
    
    
    /**
     * Reads the data of the document and updates the tablemodel.
     */
    reload: function() {
      // check if the search term is in the textfield
      if (this._findField.getComputedValue() != inspector.objectFinder.ObjectFinder.SEARCH_TERM) {        
        // if not get the filterd data
        var data = this._getData(this._findField.getComputedValue());
      } else {
        // if no filter is applied get the whole data
        var data = this._getData();
      }	
      // set the new data in the model
      this._setData(data);		
    },


    /*
    *********************************
       PROTECTED
    *********************************
    */    
    /**
     * Fetches the data from the objects db, removes the objects from the
     * inspector application and filters it if a filter is given.
     * @param filter {String | RegExp} The term to search for in the data.
     * @return {Array} A filterd and cleaned list objects containing
     *      0     - the hashode of the object
     *      1     - the classname of the object
     *      dbKey - the key in the objects db
     */
    _getData: function(filter) {
      // create a data array
      var data = [];
      // get all objects form the object db
      var objectsAndKeys = this._getClearObjects();      
      var objects = objectsAndKeys.object;
      var dbKeys = objectsAndKeys.dbKey;
      
      //  go threw all objects
      for (var key in objects) {
        // IE Bug: only take the qooxdoo objects and not the added functions
				if (objects[key] instanceof qx.core.Object) {
					// add the object to the data array
	        data.push({0:objects[key].toHashCode(), 1:objects[key].classname, dbKey:dbKeys[key]});					
				}
      }
			
      // apply a filfer if needed
      if (filter != null) {
        // create a new temporary array to store the filterd data
        var newData = [];
        // try to search with a RegExp objectt
        try {
          // create a RegExp object to perform the search
          var regExp = new RegExp(filter);
          // go threw all objects
          for (var i = 0; i < data.length; i++) {
            // if the search text is part of the classname or hash value
            if (regExp.test(data[i][1]) || regExp.test(data[i][0])) {
              // add the object to the filterd data
              newData.push(data[i]);
            }          
          } 
        } catch (e) {
          // alert the user it the search string was incorrect
          alert(e);
        }
        // set the filterd data
        data = newData;
      }
      // return the data
      return data;
    },
    
    
    /**
     * Removes the inspector objects from the set of all objects 
     * containing in the docuement.
     * @return {Object} A object containing two array:
     *    objects - A list containing the objects without the inspector objects
     *    dbKey   - A list of the fitting keys in the original objects db.
     */
    _getClearObjects: function() {
      // get the array of excludes
      var excludes = this._inspector.getExcludes();
			// get a copy of the objects db
      var objects = qx.lang.Array.clone(qx.core.Object.getDb());
      // create a array to store the references of the original db
      var dbKeys = new Array(objects.length);
      for (var i = 0; i < dbKeys.length; i++) {
        dbKeys[i] = i;
      }
      
      // go threw all excludes
      for (var i = excludes.length -1; i >= 0; i--) {
        // calculate the lenght of the area to remove
        var length = excludes[i].end - excludes[i].begin + 1;
        // remove the area from the objects and keys array
        objects.splice(excludes[i].begin, length);
        dbKeys.splice(excludes[i].begin, length);
      }
      
      // return the two arrays in an object
      return {object:objects, dbKey:dbKeys};
    },
    
    
    /**
     * Sets the given data in the table model and reordes 
     * it like the data was orderd.
     * @param data {Array} A list of objects created by {@link inspector.objectFinder.ObjectFinder#_getData}
     */
    _setData: function(data) {
      // set the data in the model
      this._tableModel.setData(data);
      // resort the data corresponding the former sort
      this._tableModel.sortByColumn(this._tableModel.getSortColumnIndex() ,this._tableModel.isSortAscending());      
    },


    /**
     * Starts a timer which automaticly reloads the table every 200 ms 
     * if the window is on screen.
     */
    _enableAutoReload: function() {
      // disable the reload button
      this._reloadButton.setEnabled(false);
      // set the timer to reload the objects
      var self = this;    
      this._reloadTimer = window.setInterval(function() {
        if (self.getDisplay() && self.getVisibility()) {
          self.reload.call(self);
        }
      }, 200);   
    },
    
    
    /**
     * Stops the automatic reload timer.
     */
    _disableAutoReload: function () {
      // enable the reload button
      this._reloadButton.setEnabled(true);
      // switch off the reload timer 
      window.clearTimeout(this._reloadTimer);
    },
       
    
    /**
     * This function creates the data for the objects summary. 
     * @return {Array} A list containing key, data pairs as array.
     *    0 - classname of the object
     *    1 - the count of the objects int the document
     */
    _getObjectsCountArray: function() {
      // create a temp data objects
      var tempData = {};
      // get all objects form the object db
      var objects = this._getData();
      // go threw all objects, count them and put the count into a hash 
      for (var key in objects) {
				// if the class has not been seen jet
        if (tempData[objects[key][1]] == undefined) {
					// create a entry for the class
          tempData[objects[key][1]] = 0;
        }
				// add one ocurance for the class
        tempData[objects[key][1]] = tempData[objects[key][1]] + 1;									    
      }
      // create the data array      
      var data = [];
      // go threw all values of the hash and put them into the array
      for (var key in tempData) {
        data.push([key, tempData[key]]);
      }
      // sort the data that the object with the hights count is on top
      data.sort(function(a, b) {return b[1] - a[1]});        
      // return the data
      return data;
    },
       
   
    /*
    *********************************
       OVERWRITTEN PROTTECTED FUNCTIONS
    *********************************
    */
    /**
     * Sets the height of the table.
     * @param delta {Number} The change value of the height.
     */
    _setMainElementHeight: function(delta) {
      this._table.setHeight(this._table.getHeight() + delta);
    },
    
    
    /**
     * Sets the width of the table and classname column.
     * @param delta {Number} The change value of the width.
     */
    _setMainElementWidth: function(delta) {
      // set the width of the table
      this._table.setWidth(this._table.getWidth() + delta);
      // set the width of the classname column
      var columnModel = this._table.getTableColumnModel();
      columnModel.setColumnWidth(1,columnModel.getColumnWidth(1) + delta);
      
    },
    
    
    /**
     * Sets the start position of the window.
     */
    _setApearancePosition: function() {
      // if left is not set
			if (this.getLeft() == null) {
				// position the window to the right 
	      this.setLeft(this.getParent().getOffsetWidth() - this._windowWidth);				
			}
			// if the height is not set
			if (this.getHeight() == "auto") {
	      // Make the window 25% of the screen heigth heigh 
	      this.setHeight(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.25);				
			}
    },
    
		
		 /**
     * Returns the name of the window. This name is used to stor the 
     * position an the size of the window in a cookie.
     * @return name {String} The name of the window.
     */
    _getName: function() {
      return "ObjectFinder"; 
    },    
    
    /**
     * Creates the table including the table model. Also register the 
     * handler which handles the cahnge of the selection of the tabel.
     */
    _createMainElement: function() {
      // initialize the table model
      this._tableModel = new qx.ui.table.model.Simple();
      this._tableModel.setColumns(["Hash", "Classname"]);
      this._tableModel.sortByColumn(0, true);
      // initialize table
      this._table = new qx.ui.table.Table(this._tableModel);
      this._table.setHeight("1*");
      
			this._table.setWidth(320);
      this._table.setShowCellFocusIndicator(false);
      this._table.setColumnVisibilityButtonVisible(false);			
      this._mainLayout.add(this._table);
      // initialize the column model
      var columnModel = this._table.getTableColumnModel();
      columnModel.setColumnWidth(0,50);
      columnModel.setColumnWidth(1,254);
			
      // reset the colors of not focused
      var renderer = this._table.getDataRowRenderer();
      renderer.setBgcolFocusedSelectedBlur(renderer.getBgcolFocusedSelected());
      renderer.setBgcolSelectedBlur(renderer.getBgcolSelected());
      
      // register the selction change handler
      this._table.getSelectionModel().addEventListener("changeSelection", function(e) {
        // get the selection model
        var model = e.getTarget();
        // get the selected row id
        var rowId = model.getLeadSelectionIndex();
        // if a rowId of -1 is returnd (by resorting the table)
        if (rowId == -1) {
          // remove the selection
          model.clearSelection();
          this._table.setFocusedCell(null, null, false);
        } else {
          // get the db key of the data
          var dbKey = this._tableModel.getData()[rowId].dbKey;
          // get the belonging widget
          var widget = qx.core.Object.getDb()[dbKey];
          // if the widget still exitst
          if (widget != null) {
            // tell the inspector to selet the widget
            this._inspector.setWidget(widget, this);                            
          } else {
            // remove the widget from the table
            this._tableModel.removeRows(rowId, 1);
          }          
        }
      }, this);
    },
    
    
    /**
     * Adds the buttons and the search textfield to the toolbar.
     * Also register the handlers for the search field and the buttons.
     */
    _addToolbarButtons: function() {
			// tell the toolbar to senter ist children
			this._toolbar.setVerticalChildrenAlign("middle");
			
      // create and add the reload button
      this._reloadButton = new qx.ui.toolbar.Button(null, qx.io.Alias.getInstance().resolve("inspector/image/icons/reload.png"));
      this._toolbar.add(this._reloadButton);
      // add the event listener for the reload
      this._reloadButton.addEventListener("click", function() {
        this.reload();
      }, this);
      // set the tooltip to the reload button
      this._reloadToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.RELOAD_BUTTON_TOOLTIP_TEXT, null);
      this._reloadButton.setToolTip(this._reloadToolTip);
      
      // create and add a autoreload button
      var autoReloadButton = new qx.ui.toolbar.CheckBox(null, qx.io.Alias.getInstance().resolve("inspector/image/icons/autoreload.png"));
      this._toolbar.add(autoReloadButton);
      // add the change event listener
      autoReloadButton.addEventListener("changeChecked", function (e) {
        if (e.getData()) {
          this._enableAutoReload();
        } else {
          this._disableAutoReload();
        }
      },this);
      // add the tooltip to the autoreload button
      this._autoReloadToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.AUTO_RELOAD_BUTTON_TOOLTIP_TEXT, null);      
      autoReloadButton.setToolTip(this._autoReloadToolTip);      

      // add a seperator
      this._toolbar.add(new qx.ui.toolbar.Separator());

      // add the objects summary button
      var objectsButton = new qx.ui.toolbar.Button(null, qx.io.Alias.getInstance().resolve("inspector/image/icons/objectsummary.png"));
      this._toolbar.add(objectsButton);
      // add the tooltip to the objects summary button
      this._objectSummaryToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.OBJECT_SUMMARY_BUTTON_TOOLTIP_TEXT, null);
      objectsButton.setToolTip(this._objectSummaryToolTip);
      // add the event listener for the summary button to show the popup
      objectsButton.addEventListener("click", function(e) {
        // fetch the data
        var data = this._getObjectsCountArray();
        // variable to save the summ of all objects
        var sum = 0; 
        // create the test message
        var message = "";
        for (var key = 0; key < data.length; key++) {
          message += "<tr><td>" + data[key][0] + ": </td><td>" + data[key][1] + "</td></tr>";
          sum += data[key][1];
        }
        message = "<table><tbody style='font-size:12px'>" + 
                  "<tr><td><font size='4'>Objects Summary</font></b></td><td>" + sum + "&nbsp;(Total)</td></tr>" + 
                  message + "</tbody></table>";
                
        // set the text to the lable in the popup
        this._objectsPopup.getChildren()[0].setText(message);
        // set the position of the poopup
        this._objectsPopup.setTop(e.getPageY() + 3);
        this._objectsPopup.setLeft(e.getPageX() + 3);
        // show the popup
        this._objectsPopup.show();
        this._objectsPopup.bringToFront();        
      }, this);
      
      // add a spacer
      this._toolbar.add(new qx.ui.basic.HorizontalSpacer());
      
      // create and add a find textfield
      this._findField = new qx.ui.form.TextField(inspector.objectFinder.ObjectFinder.SEARCH_TERM);
      this._toolbar.add(this._findField);
      // add a click event listener for removing the search text and selecting the containing text
      this._findField.addEventListener("click", function (e) {
        // select the whole text
        e.getTarget().setSelectionStart(0);
        e.getTarget().setSelectionLength(e.getTarget().getComputedValue().length);
        // remove the search term
        if (e.getTarget().getComputedValue() == inspector.objectFinder.ObjectFinder.SEARCH_TERM) {
          e.getTarget().setValue("");
        }
      });
      
      // add a listener which adds the search test if the focus is lost and the textfield ist empty
      this._findField.addEventListener("focusout", function (e) {
        // if the textfield is empty, add the search term
        if (this.getComputedValue() == "") {
          this.setValue(inspector.objectFinder.ObjectFinder.SEARCH_TERM);
        }
      }, this._findField);
      
      // add the filter function to the search field
      this._findField.addEventListener("input", function(e) {
        // if a search timer is set
        if (this._searchTimer) {
          // remove the old search timer
          window.clearTimeout(this._searchTimer);
        }
        // get the value of the textfield
        var filterText = e.getData();
        // store the this reference for the timeout        
        var self = this;        
        this._searchTimer = window.setTimeout(function() {          
          // fetch the objecty data
          var newData = self._getData(filterText);
					// set the new data
          self._setData(newData);
        }, 300);
      }, this);
    }       
   }
});
