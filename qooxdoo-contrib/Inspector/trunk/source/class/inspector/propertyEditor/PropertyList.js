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

qx.Class.define("inspector.propertyEditor.PropertyList", {
  
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
    this.setHeight("1*");
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
    
    recalculateLayout: function() {
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (recalculateLayout) in 'PropertyList'!");      
    },
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */
    /**
     * This function goes threw all superclasses of the given object and stores 
     * the properties in an object.
     * @param qxObject {qx.core.Object} The object to get the data from.
     * @return {Object} A Object contrainning tree vaules
     *    names   - An array of names of the categories (in this case the classnames)
     *    props   - An array of array of properties.
     *    classes - An array of array of classnames.
     */
    _getDataInherited: function(qxObject) {
      // the first superclass is the class of the selected widget
      var superclass = qxObject;
 
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
   
   
    /**
     * Uses the {@link inspector.propertEditor.PropertyList#_getDataInherited} function
     * to get the data. Additionally filters the data using the filter and returns 
     * an object similar to the object from the 
     * {@link inspector.propertEditor.PropertyList#_getDataInherited} function.
     * @see Filter
     * @param qxObject {Object} The qooxdoo object to get the properties from.
     */
    _getDataGrouped: function(qxObject) {
      // get all properties
      var data = this._getDataInherited(qxObject);
      var allProperties = data.props;
      // get the filter
      var filter = this._controller.getFilter();
      // empty the filter
      filter.empty();
      // og threw all properties an insert them into the filter
      for (var index = 0; index < allProperties.length; index++) {
        var classname = data.names[index];
        for (var propertyName in allProperties[index]) {
          filter.sortIn(propertyName, allProperties[index][propertyName], classname);
        }
      }     
      // return the data as an object      
      return filter.getResult();     
    },
    
    
    /**
     * Returns the grouped or inherited in subject to the 
     * status of the grouped button.
     * @param qxObject {qx.core.Object} The object to get the properties from.
     * @return An object containing the grouped porperties.  
     */
    _getData: function(qxObject) {
      // check for the status of the groupButton
      if (this._controller.getGroupStatus()) {
        return this._getDataGrouped(qxObject);    
      } else {
        return this._getDataInherited(qxObject);
      }
    } 
  },
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    this._disposeFields("_controller", "_filter");
  }
});
