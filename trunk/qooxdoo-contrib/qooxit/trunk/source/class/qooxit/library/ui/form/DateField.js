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
 * Implementation of a qx.ui.form.DateField widget
 */
qx.Class.define("qooxit.library.ui.form.DateField",
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
      // Instantiate a date field
      var dateField = new qx.ui.form.DateField();

      // Give it the current date as a default
      dateField.setValue(new Date());

      // Set an initial date format that is understandable everywhere
      dateField.setDateFormat(new qx.util.format.DateFormat("dd-MMM-yyyy"));

      // Return the date field
      return dateField;
    }
  }
});
