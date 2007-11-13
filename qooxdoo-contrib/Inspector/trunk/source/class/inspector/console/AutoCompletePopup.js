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

qx.Class.define("inspector.console.AutoCompletePopup", {
  
  extend: qx.ui.popup.Popup,  
    
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(main) {
    // call the constructor of the superclass
    this.base(arguments);
    
    // store the reference to the controller
    this._controller = main;
    
    // initialize the popup    
    this.setBackgroundColor("#FFFFFF");
    this.setBorder("black");
    this.setHeight(140);
    this.setWidth(300);    
    this.addToDocument();
    
    // initialize the table model
    this._tableModel = new qx.ui.table.model.Simple();
    this._tableModel.setColumns(["", "function"]);
    
    // initialize table
    this._table = new qx.ui.table.Table(this._tableModel);
    this._table.setWidth(298);
    this._table.setHeight(138);
    this._table.setShowCellFocusIndicator(false);
    this._table.setColumnVisibilityButtonVisible(false);
    this._table.setStatusBarVisible(true);
    this._table.getTableColumnModel().setColumnWidth(0, 22);
    this._table.getTableColumnModel().setColumnWidth(1, 260);
    var renderer = new qx.ui.table.cellrenderer.Image(18, 18);
    this._table.getTableColumnModel().setDataCellRenderer(0, renderer);
    this._table.setRowHeight(20);     
    this.add(this._table);
    
    // add the click event listener to the table
    this._table.addEventListener("click", function(e) {
      // if it is a click on the pane
      if (e.getTarget().classname == "qx.ui.table.pane.Pane") {
        this._controller.chooseAutoCompleteValue();
      }
    }, this);
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
    // the main element ot the autcomplete popup
    _table: null,
    _tableModel: null,
    
    
    /*
    *********************************
       PUBLIC
    *********************************
    */  
    /**
     * @internal
     * @return the components of the console
     */
    getComponents: function() {
      return [this, this._table, this._tableModel];
    },
    
    
    /**
     * Moves manually the selection in the table up. If the selection 
     * is at the upper end, a wraparound will be performed and the 
     * selection is at the last position.
     * @see AutoCompletePopup#selectionDown
     */
    selectionUp: function() {
      // get the current selectend row
      var selectedIndex = this._table.getSelectionModel().getLeadSelectionIndex();
      // if the selection is not 0
      if (selectedIndex > 0) {
        // go down in the selection count
        selectedIndex--;
      } else {
        // go to the max selection (wrap around function)
        selectedIndex = this._tableModel.getData().length - 1;
      }
      // select and focus the row
      this._table.getSelectionModel().addSelectionInterval(selectedIndex, selectedIndex);
      this._table.setFocusedCell(0, selectedIndex, true);
    },
    
    
    /**
     * Moves manually the selection down  in the table. If the selection
     * is at the lower end, a wraparound will be performed and the
     * selection is at the first position.
     * @see AutoCompletePopup#selectionUp
     */
    selectionDown: function() {
      // get the current selected row
      var selectedIndex = this._table.getSelectionModel().getLeadSelectionIndex();
      // get the last row id      
      var maxIndex = this._tableModel.getData().length - 1;
      // if the selection is not the last row      
      if (selectedIndex != maxIndex) {
        // go up in the selection count
        selectedIndex++;
      } else {
        // strat from the beginning
        selectedIndex = 0;
      }
      // select and focus the row
      this._table.getSelectionModel().addSelectionInterval(selectedIndex, selectedIndex);
      this._table.setFocusedCell(0, selectedIndex, true);
    },
    
        
    /**
     * Opens the autocomplete popup and shows the content concerning the 
     * given attributes. 
     * This incudes evaluating the objectRef and fetching the arrtibutes 
     * during runntime of the given object. The information will be 
     * transformed into an array and set in the tabel.   
     * @param objectRef {String} The code currently in the consoles textfield
     * @param left {Number} The left position to open the popup. 
     * @param top {Number} The top position to topen the popup.
     */
    open: function(objectRef, left, top) {     
      // select the first entry
      this._table.getSelectionModel().setSelectionInterval(0, 0);
      this._table.setFocusedCell(0, 0, true);
      
      // try to get the part after the last dot          
      var searchTerm = objectRef.substring(objectRef.lastIndexOf(".") + 1);
      
      // if there is no dot in the textfield
      if (objectRef == searchTerm) {
        // hide the popup
        this.hide();
        // stop forther processing
        return;
      } else {
        // cut of the stuff after the last dot
        objectRef = objectRef.substring(0, objectRef.lastIndexOf("."));
      }

      // get the object reference
      var object = (function(text, ans){return eval(text)}).call(this._controller.getWidget(), objectRef, this._controller.getAns());        
      
      // check if it has returned an qooxdoo object
      if (!(object instanceof qx.core.Object)) {
        // hide the popup
        this.hide();
        // stop forther processing
        return;
      } else {
        // write the classname to the header cell
        this._tableModel.setColumnNamesByIndex(["", object.classname]);        
      }
      
      // generate the search object
      var regExp = new RegExp("^" + searchTerm);
      // create an array to stor the fitting functions
      var data = [];
      
      // go threw everytring in the object
      for (var name in object) {
        // apply the search term
        if (regExp.test(name)) {
          
          // check for the scope of the property / method
          if (name.substring(0,2) ==  "__") {
              var scope = "private";
            } else if (name.substring(0,1) == "_") {
              var scope = "protected";
            } else {
              var scope = "public";
            }   
          
          // if it is a function
          if (object[name] instanceof Function) {
            // add the opening bracket for the function arguments
            var functionString = name + "(";
            for (var j = 0; j < object[name].arity; j++) {
              // if it is the last argument
              if (j == object[name].arity - 1) {
                // add a character beginning by a,b,c,d,...
                functionString += unescape("%" + (61 + j));                               
              } else {
                // add a character beginning by a,b,c,d,... and a training comma
                functionString += unescape("%" + (61 + j) + ", " );                
              }
            }
            // add the ending bracket for the function arguments
            functionString += ")";

            // create the image uri
            var image = qx.io.Alias.getInstance().resolve("inspector/image/autocomplete/method_" + scope + "18.gif")  
            // add the function string to the data
            data.push([image, functionString]);

          // if it is no function
          } else {
            // create the image uri
            var image = qx.io.Alias.getInstance().resolve("inspector/image/autocomplete/property_" + scope + "18.gif")            
            // add the name of the attribute to the data
            data.push([image, name]);
          }        
        } 
      }
      
       // load the data
      this._tableModel.setData(data);
      // sort the data by name
      this._tableModel.sortByColumn(1, true);            
      // set the popup to the current position
      this.setLeft(left);
      this.setTop(top);
      // show the popup
      this.show();
      // bring the popup in front of the console  
      this.setZIndex(this._controller.getZIndexOfWindow() + 1);
    },    

    
    /**
     * Hides the autcomplete popup.
     */
    hide: function() {
      this.setVisibility(false);
    },
    
    
    /**
     * @return true if the autocomplete popus is visible and displayed.
     */
    isOnScreen: function() {
      return this.getDisplay() && this.getVisibility();
    },
    
    
    /**
     * Takes the current selected element of the table and returns it to the user.
     * @return {String} The current selected string.
     */
    getCurrentSelection: function() {
      var selectedIndex = this._table.getSelectionModel().getLeadSelectionIndex();
      // if something is selected
      if (selectedIndex != -1) {
        // return the data in the model as a string
        return this._tableModel.getData()[selectedIndex][1] + "";
      }
      return null;
    }
   },  
  
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    this._controller = null;
  }  
});