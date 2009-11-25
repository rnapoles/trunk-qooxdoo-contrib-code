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
 * Implementation of a qx.ui.core.Widget
 */
qx.Class.define("qooxit.library.ui.core.Widget",
{
  extend : qooxit.library.ui.Abstract,
  type   : "singleton",

  construct : function()
  {
    // Set the options specification for this widget
    this.setOptionsSpec(
      {
        width   :
        {
          type   : "Integer",
          min    : 1,
          max    : 5000,
          value  : 20,
          prompt : this.tr("Width")
        },

        height  :
        {
          type   : "Integer",
          min    : 1,
          max    : 5000,
          value  : 20,
          prompt : this.tr("Height")
        }
      });
  },

  properties :
  {
    optionsSpec :
    {
      init : null
    },

    defaultOptions :
    {
      init :
      {
        width   : 20,
        height  : 20
      }
    }
  },

  members :
  {
    // overridden
    factory : function(options)
    {
      // Return a Widget
      var widget = new qx.ui.core.Widget();

      // Set options
      widget.setWidth(options.width);
      widget.setHeight(options.height);

      // Give 'em what they came for
      return widget;
    }
  }
});
