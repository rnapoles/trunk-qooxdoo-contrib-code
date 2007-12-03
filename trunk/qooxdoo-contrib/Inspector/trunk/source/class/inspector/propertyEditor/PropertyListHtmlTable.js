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

qx.Class.define("inspector.propertyEditor.PropertyListHtmlTable", {
  
  extend : inspector.propertyEditor.PropertyList,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(controller) {
    // call the constructor of the superclass
    this.base(arguments, controller);
    // create and add a new label
    this._htmlTable = new qx.ui.basic.Label(); 
    this.add(this._htmlTable);
    
    // override the padding
    this.setPadding(0);
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
    // main element of the view
    _htmlTable: null,


    /*
    *********************************
       PUBLIC
    *********************************
    */
    /**
     * Tells the view to build a list of the widget in the controller.
     */
    build: function() {
      // only build a list if a widget is set
      if (this._controller.getWidget() != null) {
        this._makeNewHtmlTable(this._controller.getWidget());        
      }
    },
    
    
    /**
     * Tells the view that a property has changed and need to be reloaded.
     * @param classkey {String} The classname and property name as a string. 
     */
    update: function(classkey) {
      this.build();
    },
    
    
    /**
     * @internal
     * @return The components of the view.
     */
    getComponents: function() {
      return [this._filter];
    },
    
    
    /**
     * Checks if the given property is in the view.
     * @param key {String} The name of the property.
     * @param classname {String} the classname of the property.
     */
    containsProperty: function(key, classname) {
      return false;  
    },
       
    
    /**
     * This function hides or shows the inherited properties of the current 
     * displayed widget. 
     */
    switchInheritedStatus: function() {
      // rebuild the view
      this.build();
    },    
		
		
		/**
		 * Because its a simpe html view, the function doesnt do anything.
		 */
		recalculateLayout: function() {
			// just do nothing
		},
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */
    /**
     * Creates a new HTML table and adds it to the label in this view.
     * This table contains all properties of the given object
     * @param qxObject {qx.core.Object} The object to show the properties of.
     */
    _makeNewHtmlTable: function(qxObject) {            
      if (this._controller.getInheritedStatus()) {
        // get the data
        var data = this._getData(qxObject);
        // store the data in variables
        var groupNames = data.names;      
        var properties = data.props;
      
      } else {
        // add a null in front becaus the array goes 1..n
        var groupNames = [null, qxObject.classname];
        var properties = [null , qx.Class.getByName(qxObject.classname).$$properties];
      }
      
      // clear the former text
      this._htmlTable.setText("");
      
      // end the table
      this._htmlTable.setText("</table>" + this._htmlTable.getText());
      // create a variable to store the bacground color for the properties
      var bgColor;
      // go backwords threw the properties array
      for(var i = properties.length - 1; i > 0 ; i--) {        
        // go threw all properties in the current class
        for (var key in properties[i]) {        
          // ignore the property groups  
          if (properties[i][key].group == null) {
            // read value
            var getterName = "get" + qx.lang.String.toFirstUp(key);
            try {
              var value = qxObject[getterName].call(qxObject);              
            } catch (e) {
              var value = "<font color='red'>" + e + "</font>";
            }
            if (bgColor == "#EBEBE0") {
              bgColor = "#FFFFE0";
            } else {
              bgColor = "#EBEBE0";
            }
            // write the key and value to the view
            this._htmlTable.setText("<tr style='font: 12px Verdana; background-color:" + bgColor + ";'><td valign='top'>" + key + ": </td><td>" + value + "</td></tr>" + this._htmlTable.getText());
          }                
        }        
        // add the classname to the view
        this._htmlTable.setText("<tr style='font: 14px Verdana; background-color:#D7D7A7;'><td colspan='2'><b>" + groupNames[i] + "</b></td></tr>" + this._htmlTable.getText()); 
      }     
      // beginn the table for the properties
      this._htmlTable.setText("<table border='0' width='100%' cellspacing='1' cellpadding='4' style='background-color:#C0C0C0'>" + this._htmlTable.getText());        
    }
  },
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    this._disposeFields("_htmlTable");
  }
});
