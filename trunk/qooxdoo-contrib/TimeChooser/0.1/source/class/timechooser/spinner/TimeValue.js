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
 * A Spinner that allows selection of numbers from a time range, padding them
 * with leading zeros to always display a two-digit number.
 */
qx.Class.define("timechooser.spinner.TimeValue",
{
  extend : timechooser.spinner.Abstract,

  /**
   * Instantiate a new spinner for hours, minutes, or seconds.
   *
   * @return {Void}
   */
  construct : function()
  {
    this.base(arguments);

    // Assume minutes or seconds.  User can set 12 or 24 hour format if needed
    this.setMinimum(0);
    this.setMaximum(59);

    // Allow wrapping by default
    this.setWrap(true);

    // Set an appropriate width for a two-digit time component
    var textField = this.getChildControl("textfield");
    textField.setWidth(26);
  },

  members :
  {
    __bInOnTextChange : false,


    /**
     * Transform the value passed to the setter for property 'value'.  In this
     * case, we prepend a leading zero if necessary.
     *
     * @param value {Number|String}
     *   The new value
     *
     * @return {String}
     *   The (possibly) modified value.
     */
    _transformValue : function(value)
    {
      // First validate it.  We validate here rather than in the _check method
      if (value > this.getMax())
      {
        value = this.getMax();
      }
      else if (value < this.getMin())
      {
        value = this.getMin();
      }

      // Zero-pad the value to two digits
      var ret = ("0" + value).substr(-2);
      return ret;
    },

    /**
     * Check the value to ensure it's valid... except that in this class we
     * already did the checking in the {@link #_transformValue} method so
     * there's nothing to be done here.  This just overrides the superclass
     * limitations.
     *
     * @param value {String}
     *   Value being set
     *
     * @return {Boolean}
     *   <i>true</i> if the value is one of the allowed values;
     *   <i>false</i> otherwise.
     */
    _checkValue : function(value)
    {
      return true;
    },
    

    // overridden
    _onTextChange : function(e)
    {
      // Ensure we always have a two-digit representation visible
      if (! this.__bInOnTextChange)
      {
        this.base(arguments, e);

        // Don't call this method recursively when we modify the value
        this.__bInOnTextChange = true;

        var textField = this.getChildControl("textfield");
        textField.setValue(("0" + this.getValue()).substr(-2));

        this.__bInOnTextChange = false;
      }
    },


    // overridden
    _countUp: function()
    {
      // Since we save textual inter values, parse them so '+' does
      // integer arithmatic instead of string concatenation
      if (this._pageUpMode)
      {
        var newValue = parseInt(this.getValue(), 10) + this.getPageStep();
      }
      else
      {
        var newValue = parseInt(this.getValue(), 10) + this.getSingleStep();
      }

      // handle the case that wraping is enabled
      if (this.getWrap() && newValue > this.getMax())
      {
        newValue = this.getMin();
      }

      this.gotoValue(newValue);
    },
    

    // overridden
    _countDown: function()
    {
      // Since we save textual inter values, parse them so '+' does
      // integer arithmatic instead of string concatenation
      if (this._pageDownMode)
      {
        var newValue = parseInt(this.getValue(), 10) - this.getPageStep();
      }
      else
      {
        var newValue = parseInt(this.getValue(), 10) - this.getSingleStep();
      }

      // handle the case that wraping is enabled
      if (this.getWrap() && newValue < this.getMin())
      {
        newValue = this.getMax();
      }

      this.gotoValue(newValue);
    }
  }
});
