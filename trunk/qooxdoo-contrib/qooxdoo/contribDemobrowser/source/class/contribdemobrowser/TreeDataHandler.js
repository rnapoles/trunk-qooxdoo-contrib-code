/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Thomas Herchenroeder (thron7)
     * Fabian Jakobs (fjakobs)
     * Daniel Wagner (d_wagner)

************************************************************************ */

qx.Class.define("contribdemobrowser.TreeDataHandler", {

  extend : demobrowser.TreeDataHandler,
  
  members :
  {
  
    /**
     * return the full name of a test from its model node
     *
     * @param node {Tree} a model node
     * @return {var} fullName {String} like "demobrowser.test.Class.testEmptyClass"
     */
    getFullName : function(node)  // node is a tree node
    {
      if (!node) {
        return "";
      }

      var path = this.getPath(node);

      if (node.type && node.type == "test") {
        path = path.concat(node.label);
      }

      return path.join("|");
    }
    
  }
  
});