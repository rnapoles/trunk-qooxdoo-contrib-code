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
qx.Class.define("timechooser.TimeChooser",
{
  extend : qx.ui.container.Composite,

  /**
   * Instantiate a new time chooser.
   *
   * @param value {Integer|String}
   *   See {@link #_transformValue}
   */
  construct : function(value)
  {
    this.base(arguments, new qx.ui.layout.HBox(2));

    // Add the hour spinner.  TimeValue's default max is 59, so adjust.
    this.__hours = new timechooser.spinner.TimeValue();
    this.__hours.setMax(23);
    this.add(this.__hours);

    // Add a colon separator
    var label = new qx.ui.basic.Label("<b>:</b>");
    label.setRich(true);
    this.add(label);
    
    // Add the minutes spinner
    this.__minutes = new timechooser.spinner.TimeValue();
    this.add(this.__minutes);

    // Add another colon separator
    var label = new qx.ui.basic.Label("<b>:</b>");
    label.setRich(true);
    this.add(label);
    
    // Add the seconds spinner
    this.__seconds = new timechooser.spinner.TimeValue();
    this.add(this.__seconds);

    // Add the am/pm spinner
    this.__ampm = new timechooser.spinner.AmPm(this.tr("PM"));
    this.add(this.__ampm);

    // Initialize properties
    this.initTimeFormat();

    // Set the value
    this.setValue(value);
  },

  properties :
  {
    /**
     * The value of the time chooser widget.  The value is stored as the
     * number of seconds since midnight, so it is an integer value between 0
     * and 86399 inclusive.  The setter, however, takes a number of formats.
     * See {@link #_transformValue} for details.
     */
    value :
    {
      init      : 0,
      transform : "_transformValue",
      apply     : "_applyValue"
    },

    /**
     * The format in which to display this time select widget.  The property
     * value is always a string, and may be one of these three values:
     * <ul>
     *   <li>"12": The hours component will be limited to the range [1,12].
     *       No am/pm component will be displayed.</li>
     *   <li>"12ampm": As with format "12", the hours component will be
     *       limited to the range [1,12], but an am/pm component will also be
     *       displayed.</li>
     *   <li>"24": The hours component will be limited to the range [0,23].
     *       No am/pm component will be displayed.</li>
     * </ul>
     */
    timeFormat :
    {
      check     : "value == '12' || value == '12ampm' || value == '24';",
      init      : "12ampm",
      apply     : "_applyTimeFormat"
    },

    /**
     * Specify the spinners' layout format.  Valid values are as specified
     * for the spinners.
     */
    layoutFormat :
    {
      apply : "_applyLayoutFormat"
    },

    /**
     * When the value property's setter is called with a value deemed to be
     * relative to the "Unix epoch", this property determines whether that
     * value is converted to local time or not.
     */
    convertToLocalTime :
    {
      init  : true
    }
  },

  members :
  {
    __hours   : null,
    __minutes : null,
    __seconds : null,
    __ampm    : null,

    
    /**
     * @param value {Integer|String}
     *   The provided value may be in one of three formats:
     *   <ul>
     *     <li>A string in the format "hours:minutes:seconds[ampm]".  'hours'
     *         is a number between 0 and 23 inclusive if the ampm portion is
     *         missing, or between 1 and 12 inclusive if the ampm portion is
     *         present. 'minutes' and seconds are numbers between 0 and 59
     *         inclusive.  'ampm' is one of the *upper-case* localized string
     *         representing before noon ("AM" in English) or after noon ("PM"
     *         in English).  There is no whitespace allowed anyplace in this
     *         entire string except optionally after 'seconds'.
     *     <li>An integer less than 86400, the number of seconds in a day.  If
     *         a value of this format is provided, then the value is taken as
     *         the number of seconds past midnight.</li>
     *     <li>An integer greater than or equal to 86400 (typically much
     *         greater).  If a value of this format is provided, then the
     *         value is taken as since "Unix epoch", i.e. the number of
     *         seconds since midnight, January 1, 1970 GMT.  The {@link
     *         #convertToLocalTime} property is then consulted to determine
     *         whether the time should be converted from GMT to local
     *         time.</li>
     *   </ul>
     *
     * @return {Integer}
     *   The input value is transformed from one of those formats into an
     *   integer that represents the number of seconds since midnight, i.e. a
     *   value between 0  and 86399 inclusive.
     */
    _transformValue : function(value)
    {
      var value;

      if (typeof value == "string")
      {
        // We expect hours:minutes:seconds[:ampm]
        // Split it into its constituent parts.
        var parts = value.match(/(\d+):(\d+):(\d+)\s*(.+)?/);

        // Ensure that there are an appropriate number of parts
        if (parts.length != 4 && parts.length != 5)
        {
          throw new Error(this.tr("Invalid value for TimeChooser: ") + value);
        }

        // Calculate the value
        value =
          (parseInt(parts[1], 10) * 60 * 60) +         // hours
          (parseInt(parts[2], 10) * 60) +              // minutes
          (parseInt(parts[3], 10));                    // seconds
        
        // if there's an ampm flag and it's "PM"...
        if ((parts[4] && parts[4].toUpperCase() == this.tr("PM")) ||
            (! parts[4] && parseInt(parts[1]) >= 12))
        {
          // ... then add 12 hours
          value += (60 * 60 * 12);
        }
      }
      else if (typeof value == "number")
      {
        // A number less than the number of seconds in a day is taken literally
        if (value < (60 * 60 * 24))
        {
          // nothing to do
        }
        else
        {
          // We've got a value that is the number of seconds since
          // midnight, January 1, 1970, GMT.
          var d = new Date(value * 1000);

          // Are we supposed to convert to local time?
          if (this.getConvertToLocalTime())
          {
            // Yup.
            value =
              (d.getHours() * 60 * 60) +
              (d.getMinutes() * 60) +
              (d.getSeconds());
          }
          else
          {
            // No conversion to local time necessary.  Just take seconds
            // since midnight.
            value %= (60 * 60 * 24);
          }
        }
      }
      else
      {
        throw new Error(
          this.tr("TimeChooser value must be string or number: ") + value);
      }

      return value;
    },

    /**
     * Apply the value.  This implies resetting the values displayed in the
     * 'hours', 'minutes', 'seconds', and 'ampm' spinners.
     *
     * @param value {Integer}
     *   The new value, an integer in the range [0,86399].
     *
     * @param old {Integer}
     *   The previous value
     *
     * @return {Void}
     */
    _applyValue : function(value, old)
    {
      // Set the seconds spinner
      this.__seconds.setValue(value % 60);

      // Set the minutes spinner
      this.__minutes.setValue(Math.floor(value / 60) % 60);

      // Determine whether we're displaying in military (24-hour) format
      var timeFormat = this.getTimeFormat();
      if (this.timeFormat == "24")
      {
        // 24-hour format
        this.__hours.setValue(Math.floor(value / 60 / 60));
      }
      else
      {
        // one of the 12-hour formats
        var v = (Math.floor(value / 60 / 60)) % 12;

        // We're almost there.  A value of zero becomes 12.
        if (v == 0)
        {
          v = 12;
        }

        this.__hours.setValue(v);

        // Determine whether this is am or pm
        if (Math.floor(value / 60 / 60) > 12)
        {
          this.__ampm.setValue(this.tr("PM"));
        }
        else
        {
          this.__ampm.setValue(this.tr("AM"));
        }
      }
    },

    /**
     * Apply the specified time format.  This shows or hides the 'ampm'
     * component and resets the 'hours' component's maximum and minimum values
     * according to the specified format.
     *
     * @param value {String}
     *   One of the valid formats: "12ampm", "12", or "24".
     *   See {@link# timeFormat} for details.
     *
     * @param old {String}
     *   The previous value
     *
     * @return {Void}
     */
    _applyTimeFormat : function(value, old)
    {
      // Show or hide the am/pm indicator and limit hours, as appropriate
      switch(value)
      {
      case "12ampm":
        this.__ampm.show();
        this.__hours.setMin(1);
        this.__hours.setMax(12);
        break;

      case "12":
        this.__ampm.hide();
        this.__hours.setMin(1);
        this.__hours.setMax(12);
        break;

      case "24":
        this.__ampm.hide();
        this.__hours.setMin(0);
        this.__hours.setMax(23);
        break;
      }

      // Redisplay the time in the new format
      this._applyValue(this.getValue());
    },


    /**
     * Apply function for layoutFormat property.
     * Pass the specified layout format on to the spinners.
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
      this.__hours.setLayoutFormat(value);
      this.__minutes.setLayoutFormat(value);
      this.__seconds.setLayoutFormat(value);
      this.__ampm.setLayoutFormat(value);
    }
  }
});
