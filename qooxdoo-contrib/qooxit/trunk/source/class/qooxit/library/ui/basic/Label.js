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
 * Implementation of a qx.ui.basic.Label widget
 */
qx.Class.define("qooxit.library.ui.basic.Label",
{
  extend : qooxit.library.ui.Abstract,
  type   : "singleton",

  members :
  {
    // overridden
    factory : function()
    {
      // Return a Label widget
      return new qx.ui.basic.Label("Hello world!");
    }
  }
});
