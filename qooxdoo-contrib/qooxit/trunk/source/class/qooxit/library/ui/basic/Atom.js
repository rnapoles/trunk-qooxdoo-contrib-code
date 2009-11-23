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
 * Implementation of a qx.ui.basic.Atom widget
 */
qx.Class.define("qooxit.library.ui.basic.Atom",
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
          value  : "Atom",
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
        },

        backgroundColor :
        {
          type   : "String",
          value  : "yellow",
          prompt : this.tr("Background color")
        },

        decorator :
        {
          type   : "String",
          value  : "main",
          prompt : this.tr("Decorator")
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
        label           : "Atom",
        width           : 80,
        height          : 20,
        backgroundColor : "yellow",
        decorator       : "main"
      }
    }
  },

  members :
  {
    // overridden
    factory : function(options)
    {
      // Get an Atom
      var atom = new qx.ui.basic.Atom(options.label, options.icon);

      // Set properties
      atom.set(
        {
          backgroundColor : options.backgroundColor,
          decorator       : options.decorator,
          iconPosition    : "top",
          padding         : 5,
          allowGrowY      : false
        });

      return atom;
    }
  }
});
