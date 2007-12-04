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
      var clazz;
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
              var value = "<span class='ins_property_editor_html_error'>" + e + "</span>";
            }
            if (clazz == "ins_property_editor_html_tr_even") {
              clazz = "ins_property_editor_html_tr_odd";
            } else {
              clazz = "ins_property_editor_html_tr_even";
            }
            // write the key and value to the view
            this._htmlTable.setText("<tr class='" + clazz + "'>" + 
                       "<td class='ins_property_editor_html_td'>" + key + ": </td>" + 
                       "<td class='ins_property_editor_html_td'>" + value + "</td></tr>" + this._htmlTable.getText());
          }                
        }        
        // add the classname to the view
        this._htmlTable.setText("<tr class='ins_property_editor_html_tr_classname'>" + 
                      "<td colspan='2' class='ins_property_editor_html_td_classname'>" + groupNames[i] + "</td>" + 
                      "</tr>" + this._htmlTable.getText()); 
      }     
      // beginn the table for the properties
      this._htmlTable.setText("<table class='ins_property_editor_html_table'>" + this._htmlTable.getText());        
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
