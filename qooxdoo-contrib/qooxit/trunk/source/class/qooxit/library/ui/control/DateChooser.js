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
 * Implementation of a qx.ui.control.DateChooser widget
 */
qx.Class.define("qooxit.library.ui.control.DateChooser",
{
  extend : qooxit.library.ui.Abstract,
  type   : "singleton",

  properties :
  {
    optionsSpec :
    {
      init : null
    }
  },

  members :
  {
    // overridden
    factory : function(options)
    {
      // Return a date chooser
      return new qx.ui.control.DateChooser();
    }
  }
});
