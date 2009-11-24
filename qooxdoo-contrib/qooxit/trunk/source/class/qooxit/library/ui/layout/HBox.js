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
 * Implementation of a Horizontal Box layout (in a Composite container)
 */
qx.Class.define("qooxit.library.ui.layout.HBox",
{
  extend : qooxit.library.ui.Abstract,
  type   : "singleton",

  construct : function()
  {
    // Call the superclass constructor
    this.base(arguments);

    // This is a container.
    this.setIsContainer(true);
  },

  members :
  {
    // overridden
    factory : function(options)
    {
      // Instantiate a Composite container with a horizontal box layout
      return new qx.ui.container.Composite(new qx.ui.layout.HBox());
    }
  }
});
