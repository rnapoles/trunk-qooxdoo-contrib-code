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
 * Implementation of a qx.ui.form.Button widget
 */
qx.Class.define("qooxit.library.ui.form.Button",
{
  extend : qooxit.library.ui.Abstract,
  type   : "singleton",

  construct : function()
  {
    // Set the options specification for this widget
    this.setOptionsSpec(
      {
        label   :
        {
          type   : "String",
          value  : "Button",
          prompt : this.tr("Label")
        },

/*
        icon    :
        {
          type   : "String",
          value  : null,
          prompt : this.tr("Icon")
        },
*/

        width   :
        {
          type   : "Integer",
          min    : 1,
          max    : 5000,
          value  : 400,
          prompt : this.tr("Width")
        },

        height  :
        {
          type   : "Integer",
          min    : 1,
          max    : 5000,
          value  : 300,
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
        label   : "Button",
        width   : 80,
        height  : 20
      }
    }
  },

  members :
  {
    // overridden
    factory : function(options)
    {
      // Return a Label widget
      return new qx.ui.form.Button(options.label);
    }
  }
});
