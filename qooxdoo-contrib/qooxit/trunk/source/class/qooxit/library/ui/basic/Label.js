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

  construct : function()
  {
    // Set the options specification for this widget
    this.setOptionsSpec(
      {
        value   :
        {
          type   : "String",
          value  : "",
          prompt : this.tr("Value")
        },

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
        value   : "",
        width   : 400,
        height  : 200
      }
    }
  },

  members :
  {
    // overridden
    factory : function(options)
    {
      // Return a Label widget
      return new qx.ui.basic.Label(options.value);
    },

    _snippets :
    {
      sampleData :
      {
        brief : "Sample data",

        description :
          "Add sample data to the label.",

        overrides :
        {
          value : "Hello there, world!"
        }
      }
    }
  }
});
