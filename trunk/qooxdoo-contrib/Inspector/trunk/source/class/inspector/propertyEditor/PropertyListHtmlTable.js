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
     * Martin Wittemann (martin_wittemann)

************************************************************************ */

qx.Class.define("inspector.propertyEditor.PropertyListHtmlTable",
{
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
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  { 

    /*
    *********************************
       ATTRIBUTES
    *********************************
    */     
    _showInherited: null,
    _htmlTable: null,

    /*
    *********************************
       PUBLIC
    *********************************
    */
    build: function() {
      // only build a list if a widget is set
      if (this._controller.getWidget() != null) {
        this._makeNewHtmlTable(this._controller.getWidget());        
      }
    },
    
    update: function(classkey) {
      this.build();
    },
    
    getComponents: function() {
      return [this._filter];
    },
    
    containsProperty: function(key, classname) {
      return false;  
    },
    
    switchInheritedStatus: function(e) {
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (switchInheritedStatus) in 'PropertyList'!");  
    },
    
    /**
     * This function hides or shows the inherited properties of the current 
     * displayed widget. 
     */
    switchInheritedStatus: function() {
      // rebuild the view
      this.build();
    },    
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */
    _makeNewHtmlTable: function(widget) {            
      if (this._controller.getInheritedStatus()) {
        // get the data
        var data = this._getData(widget);
        // store the data in variables
        var groupNames = data.names;      
        var properties = data.props;
      
      } else {
        // add a null in front becaus the array goes 1..n
        var groupNames = [null, widget.classname];
        var properties = [null , qx.Class.getByName(widget.classname).$$properties];
      }
      
      // clear the former text
      this._htmlTable.setText("");
      
      // end the table
      this._htmlTable.setText("</table>" + this._htmlTable.getText());

      // go backwords threw the properties array
      for(var i = properties.length - 1; i > 0 ; i--) {
        
        // go threw all properties in the current class
        for (var key in properties[i]) {
          // ignore the property groups  
          if (properties[i][key].group == null) {
            // read value
            var getterName = "get" + qx.lang.String.toFirstUp(key);
            try {
              var value = widget[getterName].call(widget);              
            } catch (e) {
              var value = "<font color='red'>" + e + "</font>";
            }
            // write the key and value to the view
            this._htmlTable.setText("<tr><td valign='top'>" + key + ": </td><td>" + value + "</td></tr>" + this._htmlTable.getText());
          }                
        }        
        // add the classname to the view
        this._htmlTable.setText("<tr><td colspan='2'><b>" + groupNames[i] + "</b></td></tr>" + this._htmlTable.getText()); 
      }     
      // beginn the table for the properties
      this._htmlTable.setText("<table>" + this._htmlTable.getText());        
    }

  }

});
