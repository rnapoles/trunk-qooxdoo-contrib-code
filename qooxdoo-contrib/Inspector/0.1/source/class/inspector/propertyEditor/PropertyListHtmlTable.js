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
 * This class is a view on properties of a qooxdoo object.
 * 
 * It displays all properties in a plan table with every value as a string.
 * If the editing of a value is possible, the value will be displayed in bold face.
 * A single click on that value changes the string into a textbox and the value 
 * can be edited.
 */
qx.Class.define("inspector.propertyEditor.PropertyListHtmlTable", {
  
  extend : inspector.propertyEditor.PropertyList,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * Creates a new instance of this view.
   * @param controller {inspector.propertyEditor.IPropertyListController} A controller for the view.
   */
  construct : function(controller) {
    // call the constructor of the superclass
    this.base(arguments, controller);
    // create and add a new label
    this._htmlTable = new qx.ui.embed.HtmlEmbed(); 
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
      if (this._controller.getQxObject() != null) {
        this._makeNewHtmlTable(this._controller.getQxObject());
      }
    },
    
    
    /**
     * Tells the view that a property has changed and need to be reloaded.
     * Because the list does not take care of every single property, the
     * list will be {@link #build}.
     * @param classkey {String} The classname and property name as a string. 
     */
    update: function(classkey) {
      this.build();
    },
    
    
    /**
     * Returns the components used in this view.
     * @internal
     * @return {qx.core.Object[]} The components of the view.
     */
    getComponents: function() {
      return [this._filter];
    },
    
    
    /**
     * Checks if the given property is in the view. This view does not take 
     * care of single properties so always <code>false</code> is returned.
     * @param key {String} The name of the property.
     * @param classname {String} the classname of the property.
     * @return {boolean} Always <code>false</code>.
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
     * Because its a simple html view, the function doesnt do anything.
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
        // add a null in front because the array goes 1..n
        var groupNames = [null, qxObject.classname];
        var properties = [null , qx.Class.getByName(qxObject.classname).$$properties];
      }
      
      // clear the former text
      this._htmlTable.setHtml("");
      
      // end the table
      this._htmlTable.setHtml("</table>" + this._htmlTable.getHtml());
      // create a variable to store the background color for the properties
      var clazz;
      // go backwards threw the properties array
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
            // set the classes for the alternating background color
            if (clazz == "ins_property_editor_html_tr_even") {
              clazz = "ins_property_editor_html_tr_odd";
            } else {
              clazz = "ins_property_editor_html_tr_even";
            }
            
            // get the setter name
            var setterName = "set" + qx.lang.String.toFirstUp(key);
            // if the property can be changed with a simple textfield
            if (properties[i][key].check == "Integer" || 
                properties[i][key].check == "String" ||
                properties[i][key].check == "NonEmptyString" ||
                properties[i][key].check == "Label" ||
                properties[i][key].check == "Float" ||
                properties[i][key].check == "Double" || 
                properties[i][key].check == "Number" ||
                properties[i][key].check == "Boolean" ||
                properties[i][key].check == "Color" && qxObject[setterName] != undefined) {
              
              // write the key and value to the view
              this._htmlTable.setHtml("<tr class='" + clazz + "'>" + 
                         "<td class='ins_property_editor_html_td'>" + key + ": </td>" + 
                         "<td class='ins_property_editor_html_td_link' onclick='" + 
                           
                           // save the current value                         
                           "var oldValue = this.innerHTML;" +
                           // create a new textbox and set the attributes 
                           "var box = document.createElement(\"input\");" +
                           "box.setAttribute(\"type\", \"text\");" + 
                           "box.setAttribute(\"value\", oldValue);" +
                           "box.setAttribute(\"class\", \"ins_property_editor_html_edit_field\");" +
                           // switch the current content to the textbox
                           "this.innerHTML = \"\";" +
                           "this.appendChild(box);" +
                           // remove the onclick listener
                           "var formerOnclick = this.onclick;" + 
                           "this.onclick = \"\";" +
                           // select the text in the textbox
                           "box.focus();" +
                           "box.select();" + 
                           // store the this reference
                           "var self = this;" +
                           "box.onkeypress = function(e) {" +
                              // get the pressed key
                           "  if (window.event) {" +
                           "    var key = window.event.keyCode;" +
                           "  } else {" +
                           "    var key = e.which" +
                           "  }" +
                              // if enter has been pressed
                           "  if (key == 13) {" +
                                // update the widget 
                           "    var success = inspector.Inspector.getInstance().updateWidgetProperty(\"" + key + "\", box.value, \"" + properties[i][key].check + "\");" +
                                // restore the old onclick function
                           "    self.onclick = formerOnclick;" + 
                                // set the new content into the page
                           "    if (success) {" +
                           "      self.innerHTML = box.value;" +
                           "    } else {" + 
                           "      self.innerHTML = oldValue;" +
                           "    }" +  
                           "  }" +   
                           "}" + 
                            
                         "'>" + value + "</td></tr>" + this._htmlTable.getHtml());
            } else {
              // write the key and value to the view
              this._htmlTable.setHtml("<tr class='" + clazz + "'>" + 
                         "<td class='ins_property_editor_html_td'>" + key + ": </td>" + 
                         "<td class='ins_property_editor_html_td'>" + value + "</td></tr>" + this._htmlTable.getHtml());              
            }
          }                
        }        
        // add the classname to the view
        this._htmlTable.setHtml("<tr class='ins_property_editor_html_tr_classname'>" + 
                      "<td colspan='2' class='ins_property_editor_html_td_classname'>" + groupNames[i] + "</td>" + 
                      "</tr>" + this._htmlTable.getHtml()); 
      }     
      // begin the table for the properties
      this._htmlTable.setHtml("<table class='ins_property_editor_html_table'>" + this._htmlTable.getHtml());        
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
