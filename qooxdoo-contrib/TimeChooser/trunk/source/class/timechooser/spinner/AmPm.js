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
 * A Spinner that allows selection of "AM" and "PM" (in the appropriate locale)
 */
qx.Class.define("timechooser.spinner.AmPm",
{
  extend : qx.ui.form.Spinner,

  construct : function(value)
  {
    this.__bInSuperclassConstructor = true;
    this.base(arguments);
    this.__bInSuperclassConstructor = false;
    
    this.__am = this.tr("AM");
    this.__pm = this.tr("PM");
    this.__toggle[this.__am] = this.__pm;
    this.__toggle[this.__pm] = this.__am;

    // The text field needn't be quite so wide as our superclass'
    var textField = this._getChildControl("textfield");
    textField.setWidth(24);

    // Allow wrapping by default
    this.setWrap(true);

    // Set an initial value to use in case the parameter value is invalid
    this.setValue(this.__am);
    this.setValue(value);

    //
    // Put the up/down buttons below the text field instead of to the right
    //

    // Get the various controls in the spinner
    var upButton = this._getChildControl("upbutton");
    var downButton = this._getChildControl("downbutton");
    var textField = this._getChildControl("textfield");

    // Remove all of them from the grid layout
    this._removeAll();

    // Re-insert them so in the preferred locations
    this._add(textField,  { column: 0, row: 0, colSpan: 2, rowSpan : 1 });
    this._add(downButton, { column: 0, row: 1, colSpan: 1, rowSpan : 1 });
    this._add(upButton,   { column: 1, row: 1, colSpan: 1, rowSpan : 1 });
  },

  members :
  {
    __am : null,
    __pm : null,
    __toggle : { },

    /**
     * Transform the value passed to the setter for property 'value'.  In this
     * case, we convert it to upper case.
     *
     * @param value {String}
     *   We expect it the value to be "AM" or "PM" (possibly lower or mixed
     *   case).  We don't actually validate it here, but rather let the
     *   {@link #_checkValue} method do that for us as the next step.
     *
     * @return {String}
     *   The (possibly) modified value.
     */
    _transformValue : function(value)
    {
      // Attempt to convert the value to upper case
      try
      {
        value = value.toUpperCase();
      }
      catch(e)
      {
        // don't error; let _checkValue catch it
      }

      return value;
    },

    /**
     * Check the value to ensure it's valid.  In this spinner, we allow only
     * the (localized) values "AM" and "PM".
     *
     * @param value {String}
     *   "AM" or "PM" to pass this predicate
     *
     * @return {Boolean}
     *   <i>true</i> if the value is one of the allowed values;
     *   <i>false</i> otherwise.
     */
    _checkValue : function(value)
    {
      // Allow superclass to set initial 0 value before imposing restrictions
      if (this.__bInSuperclassConstructor)
      {
        return true;
      }

      // We allow only two possible values
      return (value == this.__am || value == this.__pm);
    },

    // overridden
    _applyValue : function(value, old)
    {
      var upButton = this._getChildControl("upbutton");
      var downButton = this._getChildControl("downbutton");
      var textField = this._getChildControl("textfield");

      // up button enabled/disabled
      if (value == this.__am)
      {
        // Only enable the button if the spinner itself is enabled
        if (this.getEnabled()) {
          upButton.resetEnabled();
        }
      }
      else
      {
        // Only disable the buttons if wrapping is disabled
        if (!this.getWrap()) {
          upButton.setEnabled(false);
        }
      }

      // down button enabled/disabled
      if (value == this.__pm)
      {
        // Only enable the button if the spinner itself is enabled
        if (this.getEnabled()) {
          downButton.resetEnabled();
        }
      }
      else
      {
        // Only disable the buttons if wrapping is disabled
        if (!this.getWrap()) {
          downButton.setEnabled(false);
        }
      }

      // Save the last valid value of the spinner
      this._lastValidValue = value;

      // Write the value of the spinner to the textfield
      textField.setValue(value + "");
    },

    // overridden
    _onTextChange : function(e)
    {
      // Get the value entered in the text field
      var textField = this._getChildControl("textfield");
      var value = textField.getValue().toUpperCase();

      // Is this a valid value?
      if (! this._checkValue(value))
      {
        // Nope.  Revert to previous valid value
        textField.setValue(this._lastValidValue);
      }
      else
      {
        // Sure, it's valid.  Use it.
        this.setValue(value);
      }
    },

    // overridden
    _countUp : function()
    {
      var value = this.getValue();
      var wrap = this.getWrap();
      if (value == this.__am || wrap)
      {
        this.setValue(this.__toggle[value]);
      }
    },

    // overridden
    _countDown : function()
    {
      var value = this.getValue();
      var wrap = this.getWrap();
      if (value == this.__pm || wrap)
      {
        this.setValue(this.__toggle[value]);
      }
    }
  }
});
