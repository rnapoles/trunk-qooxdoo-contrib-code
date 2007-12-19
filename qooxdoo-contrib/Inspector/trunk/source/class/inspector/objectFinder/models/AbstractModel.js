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
 * This abstract class is the base of all data models for the 
 * {@link inspector.objectFinder.ObjectFinder}. It defines a common method 
 * to filter the data. ({@link #_filter})
 */
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
     * This method manipulates the given clearData (should be a list ob objects 
     * without the inspector objects) and filters the data according to the 
     * given filter.
     * @param clearData {object} A Object containing two elements:
     *                          <li>object: A list of Objects</li>
     *                          <li>dbKey : A list of the corresponding dbKeys</li>
     * @param filter {String} The term to search for in the data.
     * @return {Map} A filtered and cleaned list objects containing:
     *                          <li>0: some information on the object</li>
     *                          <li>1: the classname of the object</li>
     *                          <li>dbKey: the key in the objects db</li>
     */
    dressUpData: function(clearData, filter) {
      // throw an exception if the method is called on the abstract class
      throw new Error("Abstract method call (getColumnNames) in 'AbstracModel'!");
    },
    
    
    /**
     * Should tell the ObjectFinder the names of the columns of its table .
     * @return {String[]} An Array containing strings as names.
     */
    getColumnNames: function() {
      // throw an exception if the method is called on the abstract class
      throw new Error("Abstract method call (getColumnNames) in 'AbstracModel'!");
    },
    
    
    /**
     * Should tell the ObjectFinder if the columns of the table match exactly one object
     * so that they can be selected.
     * @return {Boolean} True, if the selection should be on.
     */
    getSelectable: function() {
      // throw an exception if the method is called on the abstract class
      throw new Error("Abstract method call (getSelectable) in 'AbstracModel'!");
    },
    
    
    /**
     * Should tell the ObjectFider which name he should display in the views menu for 
     * the implementing data mode.
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
     * @param filter {String} Filter pattern.
     */
    _filter: function(data, filter) {
      // create a new temporary array to store the filtered data
      var newData = [];
      // try to search with a RegExp object
      try {
        // create a RegExp object to perform the search
        var regExp = new RegExp(filter);
        // go threw all objects
        for (var i = 0; i < data.length; i++) {
          // if the search text is part of the classname or hash value
          if (regExp.test(data[i][1]) || regExp.test(data[i][0])) {
            // add the object to the filtered data
            newData.push(data[i]);
          }          
        } 
      } catch (e) {
        // alert the user it the search string was incorrect
        alert(e);
      }
      // return the filtered data
      return newData;
    }
  }
});