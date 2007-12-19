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
/**
 * This class is the object finder window.
 * 
 * It shwos all existing objects in the application in a table sorted 
 * by different parameters.
 */
qx.Class.define("inspector.objectFinder.ObjectFinder", {
  
  extend: inspector.components.AbstractWindow,  
  
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * Creates an instance of the object finder. 
   * @param main {inspector.Inspector} Reference to the inspector main class.
   * @param name {String} The title of the windows caption bar.
   */
  construct : function(main, name) {
    // create data models
    this._createDataModels();
    // call the constructor of the superclass
    this.base(arguments, main, name);
    
    // initialize the popup for the pollution report
    this._popup = new qx.ui.popup.Popup();
    this._popup.addToDocument();
    this._popup.add(new qx.ui.basic.Label());
    this._popup.setBackgroundColor("#FFFAD3");
    this._popup.setBorder("black");
    this._popup.setPadding(5, 10);
    this._popup.setHeight(500);
    this._popup.setWidth(350);
    this._popup.setOverflow("auto");
    
    // load the objects into the table after the component is completely loaded
    var self = this;
    window.setTimeout(function() {
      // load
      self.reload();
      // if a widget is selected, select it on open
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
    _popup: null,
    
    // buttons and tooltips
    _menu: null,
    _reloadButton: null,
    _reloadToolTip: null,
    _findField: null,
    _autoReloadToolTip: null,
    _objectSummaryToolTip: null,
    _pollutionToolTip: null,
    
    // timers
    _reloadTimer: null,    
    _searchTimer: null,
    
    // data models
    _currentModel: null,
    _models: null,
    
    /*
    *********************************
       PUBLIC
    *********************************
    */  
    /**
     * Returns the components of the widget finder.
     * @internal
     * @return {qx.core.Object[]} List of all components which should be
     *    omitted in the tree view of the developers application.
     */
    getComponents: function() {
      return [this, this._table, this._reloadToolTip, this._menu,
              this._autoReloadToolTip, this._popup, 
              this._objectSummaryToolTip, this._pollutionToolTip];
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
     * @internal
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
      // get the filtered data
      var data = this._getData(this._findField.getComputedValue());
      // set the new data in the model
      this._setData(data);
    },
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */
    /**
     * Sets the selection of the table to the current selection mode of
     * the data model.
     */
    _setTableSelectionEnabled: function() {
      // get the selection model
      var selectionModel = this._table.getSelectionModel();
      // if the selection in the current data model is on
      if (this._currentModel.getSelectable()) {
        // enable the selection
        selectionModel.setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);
      } else {
        // otherwise, disable the selection
        selectionModel.setSelectionMode(qx.ui.table.selection.Model.NO_SELECTION);
      }
    },
    
    
    /**
     * Set the header of the table to the values from the current data model. 
     */
    _setTableHeader: function() {
      this._tableModel.setColumns(this._currentModel.getColumnNames());
    },
    
    
    /**
     * Uses the current set model to get the data to display.
     * @param filter {String} The restriction as a string.
     */    
    _getData: function(filter) {
        return this._currentModel.dressUpData(this._getClearObjects(), filter);
    },
    
    
    /**
     * Removes the inspector objects from the set of all objects 
     * containing in the document.
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
     * Sets the given data in the table model and reorders 
     * it like the data was ordered.
     * @param data {String[][]} A list of objects
     */
    _setData: function(data) {
      // set the data in the model
      this._tableModel.setData(data);
      // resort the data corresponding the former sort
      this._tableModel.sortByColumn(this._tableModel.getSortColumnIndex() ,this._tableModel.isSortAscending());      
    },
    
    
    /**
     * Starts a timer which automatically reloads the table every 200 ms 
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
     * Creates all data models and sets the default model.
     */
    _createDataModels: function() {
      // create the models array
      this._models = [];
      // add the models
      this._models.push(new inspector.objectFinder.models.AllObjectsByHashModel());
      this._models.push(new inspector.objectFinder.models.AllObjectsByDbKeyModel());
      this._models.push(new inspector.objectFinder.models.ObjectsByCountModel());
      
      // set the default model
      this._currentModel = this._models[0];
    },
    
    
    /*
    *********************************
       CONSTRUCTOR HELPERS
    *********************************
    */
    /**
     * Helper function to create the dynamic menu for the 
     * available data models. 
     */
    _createViewsMenu: function() {
      // create the menu itself
      this._menu = new qx.ui.menu.Menu();
      this._menu.addToDocument(); 
      
      // create an array for all view buttons
      var viewButtons = [];
      // go threw all data models      
      for (var i = 0; i < this._models.length; i++) {
        // create a temp button for the current model
        var viewButton = new qx.ui.menu.RadioButton(this._models[i].getMenuName());
        // add it to the buttons array
        viewButtons.push(viewButton);  
        // save the current model for further processing 
        viewButton.setUserData("model", this._models[i]);
        
        // add an event listener 
        viewButton.addEventListener("execute", function (e) {
          // if the radiobutton has been checked
          if (e.getCurrentTarget().getChecked()) {            
            // save the new model as current model
            this._currentModel = e.getCurrentTarget().getUserData("model");
            // change the selection and model and header of the table
            this._setTableSelectionEnabled();
            this._setTableHeader();       
            // reload the table
            this.reload();
          }
        }, this);
        
        // add the button to the menu
        this._menu.add(viewButton);    
        
        // check the first button
        if (i == 0) {
          viewButton.setChecked(true);
        }    
      }
      
      // radio manager for the view buttons      
      new qx.ui.selection.RadioManager(null, viewButtons);
      
      // add the menu button
      var menuButton = new qx.ui.toolbar.MenuButton("View", this._menu, qx.io.Alias.getInstance().resolve("inspector/image/menuarrow.png"));
      menuButton.setIconPosition("right");
      this._toolbar.add(menuButton);
      
      // add a click listener so that the menu is always on front of the property editor window
      menuButton.addEventListener("click", function() {
        // move the menu in front
        this._menu.setZIndex(this.getZIndex() + 1);
      }, this);
      
      // add a separator
      this._toolbar.add(new qx.ui.toolbar.Separator());
    },
    
    
    /**
     * Helper which creates and adds a button for the pollution 
     * report to the toolbar. This method also registers the needed 
     * event listener which generates the report.
     */
    _createPollutionButton: function() {
      // pollution button
      var pollutionButton = new qx.ui.toolbar.Button(null, qx.io.Alias.getInstance().resolve("inspector/image/icons/pollution.png"));
      this._toolbar.add(pollutionButton);
      // add the tooltip to the pollution button
      this._pollutionToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.POLLUTION_BUTTON_TOOLTIP_TEXT, null);
      pollutionButton.setToolTip(this._pollutionToolTip);
      // add the event listener for the summary button to show the popup
      pollutionButton.addEventListener("click", function(e) {
        // fetch the data
        var data = qx.dev.Pollution.extract("window");
        
        // create the message
        var message = "";
        // if no pollution is detected
        if (data.length == 0) {
          message += "<i>No pollution detected!</i>";
        }
        for (var i = 0; i < data.length; i++) {
          // print out the name of the object
          message += "<tr><td>" + data[i]["key"] + ": </td>";
          // if the object is a qooxdoo object
          if (data[i]["value"] instanceof qx.core.Object) {
            // add the name, hashcode and a link to select the element
            message += "<td><u style='cursor: pointer;' " + 
                       "onclick=\"inspector.Inspector.getInstance().setWidgetByDbKey(" + 
                       data[i]["value"].getDbKey() + ", '');\";>" + data[i]["value"].classname + 
                       " [" + data[i]["value"].toHashCode() + "]</u></td></tr>";
          } else {
            // print out the reference otherwise
            message += "<td>" + data[i]["value"] + "</td></tr>";
          }          
        }
        // build the table around the message
        message = "<table><tbody style='font-size:12px'>" + 
                  "<tr><td><font size='4'>Pollution Report</font></b></td><td>&nbsp;</td></tr>" + 
                  message + "</tbody></table>";        
        
        // set the text to the label in the popup
        this._popup.getChildren()[0].setText(message);
        // set the position of the poopup
        this._popup.setTop(e.getPageY() + 3);
        this._popup.setLeft(e.getPageX() + 3);
        // show the popup
        this._popup.show();
        
      }, this);
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
        // Make the window 25% of the screen height high 
        this.setHeight(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.25);                
      }
    },
    
    
    /**
     * Creates the table including the table model. Also register the 
     * handler which handles the change of the selection of the table.
     */
    _createMainElement: function() {      
      // initialize the table model
      this._tableModel = new qx.ui.table.model.Simple();
      this._setTableHeader();
      this._tableModel.sortByColumn(0, true);
      // initialize table
      this._table = new inspector.components.Table(this._tableModel);
      this._table.setHeight("1*");
      
      // set the selection
      this._setTableSelectionEnabled();
      // set the names which should appear in the statusbar
      this._table.setRowContentName("object");
      this._table.setRowsContentName("objects");      
      
      this._table.setWidth(320);
      this._table.setShowCellFocusIndicator(false);
      this._table.setColumnVisibilityButtonVisible(false);            
      this._mainLayout.add(this._table);
      // initialize the column model
      var columnModel = this._table.getTableColumnModel();
      columnModel.setColumnWidth(0,50);
      columnModel.setColumnWidth(1,254);
      
      // register the selection change handler
      this._table.getSelectionModel().addEventListener("changeSelection", function(e) {
        // get the selection model
        var model = e.getTarget();
        // get the selected row id
        var rowId = model.getLeadSelectionIndex();
        // if a rowId of -1 is returned (by resorting the table)
        if (rowId == -1) {
          // remove the selection
          model.clearSelection();
          this._table.setFocusedCell(null, null, false);
        } else {
          // get the db key of the data
          var dbKey = this._tableModel.getData()[rowId].dbKey;
          // get the belonging widget
          var widget = qx.core.Object.getDb()[dbKey];
          // if the widget still exist
          if (widget != null) {
            // tell the inspector to select the widget
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
      // tell the toolbar to center its children
      this._toolbar.setVerticalChildrenAlign("middle");
      // create the dynamic menu for the added data models
      this._createViewsMenu();
      
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
        if (e.getValue()) {
          this._enableAutoReload();
        } else {
          this._disableAutoReload();
        }
      },this);
      // add the tooltip to the autoreload button
      this._autoReloadToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.AUTO_RELOAD_BUTTON_TOOLTIP_TEXT, null);      
      autoReloadButton.setToolTip(this._autoReloadToolTip);      
      
      // add a separator
      this._toolbar.add(new qx.ui.toolbar.Separator());
      
      // create a button for the pollution report
      this._createPollutionButton();
                  
      // add a spacer
      this._toolbar.add(new qx.ui.basic.HorizontalSpacer());
      
      // create and add a find textfield
      this._findField = new inspector.components.SearchTextField();
      this._toolbar.add(this._findField);
      // set the reference which is the this reference in the executed function
      this._findField.setContext(this);
      // set the function, which should be executed on a input change
      this._findField.setExecutionFunction(function() {          
        // fetch the objecty data
        var newData = this._getData(this._findField.getComputedValue());
        // set the new data
        this._setData(newData);
      });
    }
  },
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    this._disposeFields("_reloadButton", "_reloadToolTip", "_autoReloadToolTip", "_objectSummaryToolTip", 
                        "_pollutionToolTip", "_findField", "_tableModel", "_table", "_popup", "_models",
                        "_menu", "_currentModel");
  }
});