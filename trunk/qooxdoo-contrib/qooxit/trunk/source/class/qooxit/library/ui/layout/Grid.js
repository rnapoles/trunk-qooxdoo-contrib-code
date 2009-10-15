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
 * Implementation of a Grid layout (in a Composite container)
 */
qx.Class.define("qooxit.library.ui.layout.Grid",
{
  extend : qooxit.library.ui.AbstractElement,

  members :
  {
    // overridden
    factory : function()
    {
      // Return a Composite container with a grid layout
      return new qx.ui.container.Composite(new qx.ui.layout.Grid());
    }
  }
}
