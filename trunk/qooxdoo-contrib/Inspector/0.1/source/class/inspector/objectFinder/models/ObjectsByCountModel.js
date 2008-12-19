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
 * This model is responsible for generating the data containing 
 * the amount of the objects class existing in the application and the 
 * corresponding classnames.
 */
qx.Class.define("inspector.objectFinder.models.ObjectsByCountModel", {
  
  extend: inspector.objectFinder.models.AbstractModel,
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function() {    
    this.base(arguments);
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {    
    /*
    *********************************
       IMODEL IMPLEMENTATIONS
    *********************************
    */  
    /**
     * This method manipulates the given clearData (should be a list ob objects 
     * without the inspector objects) and filters the data according to the 
     * given filter.
     * @param clearData {object} A Object containing two elements:
     *                          - object: A list of Objects -
     *                          - dbKey : A list of the corresponding dbKeys -
     * @param filter {String} The term to search for in the data.
     * @return {Map} A filtered and cleaned list objects containing:
     *                          - 0: the amount of the object -
     *                          - 1: a classname -
     *                          - dbKey: the key in the objects db -
     */
    dressUpData: function(clearData, filter) {
      // create a temp data objects
      var tempData = {};
      // get the objects out of the data
      var objects = clearData.object;

      // go threw all objects, count them and put the count into a hash 
      for (var key in objects) {
        // if the class has not been seen jet
        if (tempData[objects[key].classname] == undefined) {
          // create a entry for the class
          tempData[objects[key].classname] = 0;
        }
        // add one ocurance for the class
        tempData[objects[key].classname] = tempData[objects[key].classname] + 1;                                        
      }
      // create the data array
      var data = [];
      // go threw all values of the hash and put them into the array
      for (var key in tempData) {
        data.push([tempData[key], key]);
      }
     
      // apply a filter if needed
      if (filter != null || filter != "") {
        return this._filter(data, filter);
      }
      // return the data
      return data;
    },
    
    
    /**
     * Tells the ObjectFinder table that the first column is the count 
     * and the second column is the classname.
     * @return {String[]} ["Count", "Classname"]
     */
    getColumnNames: function() {
      return ["Count", "Classname"];
    },
    
    
    /**
     * Tells the ObjectFinder that the columns in the table does 
     * not contain single objects and that the columns can not 
     * be selected.
     * @return {boolean} false.
     */
    getSelectable: function() {
      return false;
    },
    
    
    /**
     * Tells the ObjectFider that the name of the DataModel in the menu is
     * "by count".
     * @return {String} by count
     */
    getMenuName: function() {
      return "by count";
    }
  }
});