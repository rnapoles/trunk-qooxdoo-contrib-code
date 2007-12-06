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

qx.Class.define("inspector.objectFinder.models.AbstractModel", {
  
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
     * @param clearData {object} A Object containing two elements
     *                          object: A list of Objects
     *                          dbKey : A list of the corresponding dbKeys
     * @param filter {String | RegExp} The term to search for in the data.
     * @return {Array} A filterd and cleaned list objects containing
     *      0     - the amount of the object
     *      1     - the classname of the object
     *      dbKey - the key in the objects db
     */
    dressUpData: function(clearData, filter) {
      // throw an exception if the method is called on the abstract class
      throw new Error("Abstract method call (getColumnNames) in 'AbstracModel'!");
    },
    
    
    /**
     * Tells the ObjectFinder how to set the nams of the columns of its table.
     * @return {Array} An Array containing Strings as names.
     */
    getColumnNames: function() {
      // throw an exception if the method is called on the abstract class
      throw new Error("Abstract method call (getColumnNames) in 'AbstracModel'!");
    },
    
    
    /**
     * Tells the ObjectFinder if the columns of the table match exactly one object
     * so that they can be selected.
     * @return {boolean} true, if the selection should be on
     */
    getSelectable: function() {
      // throw an exception if the method is called on the abstract class
      throw new Error("Abstract method call (getSelectable) in 'AbstracModel'!");
    },
    
    
    /**
     * Tells the ObjectFider which name he should display in the views menu for 
     * this data mode.
     * @return {String} The name of the data model.
     */
    getMenuName: function() {
      // throw an exception if the method is called on the abstract class
      throw new Error("Abstract method call (getMenuName) in 'AbstracModel'!");
    },
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */
    /**
     * Common method used to filter the data.
     * @param data {Object} the data to filter.
     * @param filter {String | RegExp} Filter pattern.
     */
    _filter: function(data, filter) {
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
      // return the filterd data
      return newData;
    }
  }
});