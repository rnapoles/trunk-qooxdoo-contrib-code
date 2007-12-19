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
 * This interface defines a set of methods. These methods are requeired if the 
 * model should be added to the {@link inspector.objectFinder.ObjectFinder} as a data model on the 
 * applications objects. 
 */
qx.Interface.define("inspector.objectFinder.IModel", {
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    /**
     * This method manipulates the given clearData (should be a list ob objects 
     * without the inspector objects) and filters the data according to the 
     * given filter.
     * @param clearData {object} A Object containing two elements:
     *                          - object: A list of Objects -
     *                          - dbKey : A list of the corresponding dbKeys -
     * @param filter {String} The term to search for in the data.
     * @return {Map} A filtered and cleaned list objects containing:
     *                          - 0: some information on the object -
     *                          - 1: the classname of the object -
     *                          - dbKey: the key in the objects db -
     */
    dressUpData: function(clearData, filter) {
      return true;
    },
    
    
    /**
     * Should tell the ObjectFinder the names of the columns of its table .
     * @return {String[]} An Array containing strings as names.
     */
    getColumnNames: function() {
      return true;
    },
    
    
    /**
     * Should tell the ObjectFinder if the columns of the table match exactly one object
     * so that they can be selected.
     * @return {Boolean} True, if the selection should be on.
     */
    getSelectable: function() {
      return true;
    },
    
    
    /**
     * Should tell the ObjectFider which name he should display in the views menu for 
     * the implementing data mode.
     * @return {String} The name of the data model.
     */
    getMenuName: function() {
      return true;
    }
  }
});