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

qx.Class.define("inspector.propertyEditor.PropertyList",
{
  extend : qx.ui.layout.VerticalBoxLayout,
  type : "abstract",

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(controller) {
    // call the constructor of the superclass
    this.base(arguments);
    // configure the current list
    this.setWidth(320);
    this.setHeight(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.4);
    this.setBorder("inset");
    this.setPaddingLeft(5);
    this.setPaddingRight(5);
    this.setPaddingTop(2);
    this.setPaddingBottom(2);            
    this.setOverflow("auto");
    this.setSpacing(5);
    this.setMinHeight(10);
    
    // save the reference to the controller
    this._controller = controller;
    
    // create the Filter for sorting 
    this._filter = new inspector.propertyEditor.Filter();
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
    _controller: null,
    _filter: null,


    /*
    *********************************
       PUBLIC
    *********************************
    */
    build: function() {
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (build) in 'PropertyList'!");
    },
    
    update: function(key, classname) {
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (update) in 'PropertyList'!");
    },
    
    getComponents: function() {
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (getComponents) in 'PropertyList'!");
    },
    
    containsProperty: function(key, classname) {
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (containsProperty) in 'PropertyList'!");      
    },

    switchInheritedStatus: function() {
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (switchInheritedStatus) in 'PropertyList'!");  
    },
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */
   
   _getDataInherited: function(widget) {
      // the first superclass is the class of the selected widget
      var superclass = widget;

      // create new properties array to store the propertey of a class
      var properties = [];
      // create new classnames array to store the classnames
      var classnames = [];
      // create new groupNames array to store the names of the groups
      var groupNames = [];

      // go threw the inheritance of the selected widget
      for (var i = 1; ; i++) {
        // store the properties and classnames in seperate array
        properties[i] = qx.Class.getByName(superclass.classname).$$properties;
        // sorte the classname in the groupnames array        
        groupNames[i] = superclass.classname;
        // create an array for the classes for the property
        classnames[i] = [];
        // go threw all properties in the class and save the classname
        for (var j in properties[i]) {
          classnames[i][j] = superclass.classname;
        }
        // go threw all classes to the qx.core.Object class
        if(qx.Class.getByName("qx.core.Object") == superclass) {
          break;  
        }       
        // set the new class
        superclass = qx.Class.getByName(superclass.classname).superclass;
      }
      // return the data as an object
      return {names: groupNames, props: properties, classes: classnames};
   },
   
   
   _getDataGrouped: function(widget) {
     // get all properties
     var data = this._getDataInherited(widget);
     var allProperties = data.props;
     // empty the filter
     this._filter.empty();
     // og threw all properties an insert them into the filter
     for (var index in allProperties) {
       var classname = data.names[index];
       for (var propertyName in allProperties[index]) {
         this._filter.sortIn(propertyName, allProperties[index][propertyName], classname);
       }
     }     
     // return the data as an object      
     return this._filter.getResult();     
   },
    
    
   _getData: function(widget) {
     // check for the status of the groupButton
     if (this._controller.getGroupStatus()) {
       return this._getDataGrouped(widget);    
     } else {
       return this._getDataInherited(widget);
     }
   } 
    
  }

});
