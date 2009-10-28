/* ************************************************************************

   Copyright:
     2009 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

#asset(qooxit/*)
************************************************************************ */

/**
 * Implementation of a Vertical Box layout (in a Composite container)
 */
qx.Class.define("qooxit.library.ui.layout.VBox",
{
  extend : qooxit.library.ui.Abstract,
  type   : "singleton",

  properties :
  {
    category :
    {
      refine : true
      init   : "Container"
    }
  },

  members :
  {
    // overridden
    factory : function()
    {
      // Return a Composite container with a vertical box layout
      return new qx.ui.container.Composite(new qx.ui.layout.VBox());
    },

    // overridden
    getMenuHierarchy : function()
    {
      return [ "Layouts" ];
    }
  }
});
