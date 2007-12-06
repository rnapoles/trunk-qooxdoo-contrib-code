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

qx.Class.define("inspector.objectFinder.models.AllObjectsByHashModel", {
  
  extend : qx.core.Object,  
  implement : inspector.objectFinder.IModel, 
    
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
     * Fetches the data from the objects db, removes the objects from the
     * inspector application and filters it if a filter is given.
     * @param clearData {object} A Object containing two elements
     *                          object: A list of Objects
     *                          dbKey : A list of the corresponding dbKeys
     * @param filter {String | RegExp} The term to search for in the data.
     * @return {Array} A filterd and cleaned list objects containing
     *      0     - the hashode of the object
     *      1     - the classname of the object
     *      dbKey - the key in the objects db
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
          data.push({0:objects[key].toHashCode(), 1:objects[key].classname, dbKey:dbKeys[key]});                    
        }
      }
            
      // apply a filfer if needed
      if (filter != null) {
        // create a new temporary array to store the filterd data
        var newData = [];
        // try to search with a RegExp object
        try {
          // create a RegExp object to perform the search
          var regExp = new RegExp(filter);
          // go threw all objects
          for (var i = 0; i < data.length; i++) {
            // if the search text is part of the classname or hash value
            if (regExp.test(data[i][1]) || regExp.test(data[i][0])) {
              // add the object to the filterd data
              newData.push(data[i]);
            }          
          } 
        } catch (e) {
          // alert the user it the search string was incorrect
          alert(e);
        }
        // set the filterd data
        data = newData;
      }
      // return the data
      return data;
    },
    
    
    /**
     * Tells the ObjectFinder how to set the nams of the columns of its table.
     * @return {Array} An Array containing Strings as names.
     */
    getColumnNames: function() {
      return ["Hash", "Classname"];
    },
    
    
		/**
		 * Tells the ObjectFinder if the columns of the table match exactly one object
		 * so that they can be selected.
		 * @return {boolean} true, if the selection should be on
		 */
    getSelectable: function() {
      return true;
    },
    
    
    /**
     * Tells the ObjectFider which name he should display in the views menu for 
     * this data mode.
     * @return {String} The name of the data model.
     */
    getMenuName: function() {
      return "by Hash";
    }
  }
});