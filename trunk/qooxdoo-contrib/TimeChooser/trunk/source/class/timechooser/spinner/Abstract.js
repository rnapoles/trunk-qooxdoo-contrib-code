/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2008 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman

************************************************************************ */

/**
 * Abstract spinner for the time chooser components
 */
qx.Class.define("timechooser.spinner.Abstract",
{
  extend : qx.ui.form.Spinner,
  type   : "abstract",

  construct : function(value)
  {
    this.base(arguments);

    // Set the initial layout format
    this.initLayoutFormat();
  },

  properties :
  {
    /**
     * Specify the spinner's layout format.  Valid values are 'below/vertical'
     * and 'below/horizontal'.
     */
    layoutFormat :
    {
      init  : "below/vertical",
      check : function(value) { return this._checkLayoutFormat(value); },
      apply : "_applyLayoutFormat"
    }
  },

  members :
  {
    /**
     * Check function for layoutFormat property.  We ensure that the value
     * being set is one of the allowed values.
     *
     * @param value {String}
     *   Value being set
     *
     * @return {Boolean}
     *   <i>true</i> if the value is allowed;
     *   <i>false</i> otherwise.
     */
    _checkLayoutFormat : function(value)
    {
      this.warn("In checkLayoutFormat");
      return (value == 'below/vertical' ||
              value == 'below/horizontal');
    },

    /**
     * Apply function for layoutFormat property.
     * Re-layout the buttons according to the specified value.
     *
     * @param value {String}
     *   New value
     *
     * @param old {String}
     *   Previous value
     *
     * @return {Void}
     */
    _applyLayoutFormat : function(value, old)
    {
      //
      // Put the up/down buttons below the text field instead of to the right
      //

      // Get the various controls in the spinner
      var upButton = this._getChildControl("upbutton");
      var downButton = this._getChildControl("downbutton");
      var textField = this._getChildControl("textfield");

      // Cause the buttons' labels to center properly
      upButton.setCenter(true);
      downButton.setCenter(true);

      // Remove all of them from the grid layout
      this._removeAll();

      // Re-insert them in the preferred locations.
      // Which layout format was requested?
      switch(value)
      {
      case 'below/vertical':
        var layout = new qx.ui.layout.Grid();
        layout.setColumnFlex(0, 1);
        this._setLayout(layout);
        this._add(textField,  { column: 0, row: 0, colSpan: 2, rowSpan : 1 });
        this._add(upButton,   { column: 0, row: 1, colSpan: 1, rowSpan : 1 });
        this._add(downButton, { column: 0, row: 2, colSpan: 1, rowSpan : 1 });
        break;

      case 'below/horizontal':
        var layout = new qx.ui.layout.Grid();
        layout.setColumnFlex(0, 1);
        layout.setRowFlex(0,1);
        layout.setRowFlex(1,1);
        this._setLayout(layout);
        this._add(textField,  { column: 0, row: 0, colSpan: 2, rowSpan : 1 });
        this._add(downButton, { column: 0, row: 1, colSpan: 1, rowSpan : 1 });
        this._add(upButton,   { column: 1, row: 1, colSpan: 1, rowSpan : 1 });
        break;
      }
    }
  }
});
