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

qx.Interface.define("inspector.propertyEditor.PropertyListController",
{
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {

    getWidget: function() {
      return true;
      // throw an exception if the method is caled on the abstract class
      // throw new Error("Abstract method call (getWidget) in 'PropertyListController'!");
    },
    
    setSelectedProperty: function(layout) {
      return true;
      // throw an exception if the method is caled on the abstract class
      // throw new Error("Abstract method call (setSelectedProperty) in 'PropertyListController'!");
    },
    
    getSelectedProperty: function() {
      return true;
      // throw an exception if the method is caled on the abstract class
      // throw new Error("Abstract method call (getSelectedProperty) in 'PropertyListController'!");
    },
    
    getInheritedStatus: function() {
      return true;
      // throw an exception if the method is caled on the abstract class
      // throw new Error("Abstract method call (getInheritedStatus) in 'PropertyListController'!");
    },
    
    getGroupStatus: function() {
      return true;
      // throw an exception if the method is caled on the abstract class
      // throw new Error("Abstract method call (getGroupStatus) in 'PropertyListController'!");        
    },
    
    gotoSelectedWidget: function() {
      return true;
      // throw an exception if the method is caled on the abstract class
      // throw new Error("Abstract method call (gotoSelectedWidget) in 'PropertyListController'!");
    }
    
  }

});
