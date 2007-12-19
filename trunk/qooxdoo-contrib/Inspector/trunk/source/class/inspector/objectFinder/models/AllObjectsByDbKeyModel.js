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
 * the db key of the objects and the classnames.
 */
qx.Class.define("inspector.objectFinder.models.AllObjectsByDbKeyModel", {
  
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
     * This method creates out of the given clearData Map a Map containing 
     * its dbKeys and its classname.
     * @param clearData {object} A Object containing two elements:
     *                          - object: A list of Objects -
     *                          - dbKey : A list of the corresponding dbKeys -
     * @param filter {String} The term to search for in the data.
     * @return {Map} A filtered and cleaned list objects containing:
     *                          - 0: the dbKey of the object -
     *                          - 1: the classname of the object -
     *                          - dbKey: the key in the objects db -
     */
    dressUpData: function(clearData, filter) {
      // create a data array
      var data = [];
      // get all objects form the object db
      var objects = clearData.object;
      var dbKeys = clearData.dbKey;
      
      //  go threw all objects
      for (var key in objects) {
        // IE Bug: only take the qooxdoo objects and not the added functions
        if (objects[key] instanceof qx.core.Object) {
          // add the object to the data array
          data.push({0:dbKeys[key], 1:objects[key].classname, dbKey:dbKeys[key]});                    
        }
      }
            
      // apply a filter if needed
      if (filter != null || filter != "") {
        return this._filter(data, filter);
      }
      // return the data
      return data;
    },
    
    
    /**
     * Tells the ObjectFinder table that the first column is the Dbkey 
     * and the second column is the classname.
     * @return {String[]} ["DbKey", "Classname"]
     */
    getColumnNames: function() {
      return ["DbKey", "Classname"];
    },
    
    
    /**
     * Tells the ObjectFinder that the columns in the table contain 
     * single objects and that every column can be selected.
     * @return {boolean} true
     */
    getSelectable: function() {
      return true;
    },
    
    
    /**
     * Tells the ObjectFider that the name of the DataModel in the menu is
     * "by DbKey".
     * @return {String} by DbKey
     */
    getMenuName: function() {
      return "by DbKey";
    }
  }
});