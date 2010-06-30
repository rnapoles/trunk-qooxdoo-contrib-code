/* ************************************************************************

   Copyright:
     (c) 2010 Derrell Lipman
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

#asset(timezonedate/*)

************************************************************************ */

/**
 */
qx.Class.define("timezonedate.TimezoneDate",
{
  extend : qx.core.Object,


  /**
   * Constructor
   *
   * @param initialValue {Integer|String ? current date/time} 
   *   The timestamp to which this object should be initialized. The value may
   *   in one of two forms: an integer representing the number of milliseconds
   *   since midnight on 1 Jan 1970 UTC; or a string that is in a format
   *   recognized by {#parse}.
   *
   * @param defaultTimezoneOffset {Integer ? local time zone} 
   *   The default time zone offset, i.e. the difference, in minutes, between
   *   the local and UTC representations of this date object, which is used
   *   for string output of this object if not otherwise specified. This
   *   default timezone offset is also used to interpret a String
   *   initialValue, if that string does not itself contain a timezone or
   *   timezone offset.
   *
   * @throws {Error}
   *   If parameters are not recognized.
   */
  construct : function(initialValue, defaultTimezoneOffset) 
  {
    // Determine the timezone offset to use for this object
    this.setTimezoneOffset(defaultTimezone ||
                           (new Date()).getTimezoneOffset());
    
    // What type of initial value were we given?
    if (initialValue === undefined)
    {
      // No initial value provided. Use the current time.
      this.setValue((new Date()).getTime());
    }
    else
    {
      // Let the setter handle it, parsing if necessary
      this.setValue(initialValue);
    }
  },
  
  properties :
  {
    /**
     * The value of this date object, saved as the number of milliseconds
     * since the beginning of the epoch (midnight on 1 Jan 1970 UTC).
     */
    value :
    {
      init      : 0,
      transform : "_transformValue",
      check     : "Integer"
    },

    /**
     * The difference, in minutes, between the local and UTC representations
     * of the date stored in this object. The absolute value must of this
     * number of minutes must not exceed 12 hours.
     */
    timezoneOffset : 
    {
      init  : null,

      // Ensure that the value is within bounds. It must be a number of
      // minutes within plus or minus 12 hours
      check : "value > (-12 * 60) || value <= (12 * 60)"
    }
  },
  
  members :
  {
    /**
     * Parse a date string
     *
     * @param date {String}
     *   A string matching an RFC2822 date (including the obsoleted forms) or
     *   an ISO8601 date.
     *
     * @return {Integer}
     *   The number of milliseconds since midnight, 1 Jan 1970 UTC.
     */
    parse : function(dateString)
    {
    },

    __parseRfc2822 : function(dateString)
    {
      // Enumerate the valid month names, according to RFC-2822
      var months = 
        [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

      // The calculated month value, 0-relative
      var month;

      // Enumerate the valid zone names, according to RFC-2822
      var zones =
        {
          "UT"  : 0,
          "GMT" : 0,
          "EST" : 5 * 60, 
          "EDT" : 4 * 60,
          "CST" : 6 * 60, 
          "CDT" : 5 * 60,
          "MST" : 7 * 60,
          "MDT" : 6 * 60,
          "PST" : 8 * 60, 
          "PDT" : 7 * 60
        };

      // The calculated timezone offset in minutes
      var timezoneOffset;

      // Check for an FRC2822 date
      var rfc2822 = 
        // 3-character day, and a comma and a single space
        "[A-Z][a-z][a-z], " +

        // 2-digit day of month, and a single space
        "([0-9]{2}) " +
    
        // 3-character capitalized month abbreviation, and a single space
        "([A-Z][a-z][a-z]) " +
    
        // 4-digit year and a single space
        "([0-9]{4}) " +
    
        // 6-digit time with colons after 2nd and 4th digits, and a single space
        "([0-9]{2}:[0-9]{2}:[0-9]{2}) " +
    
        // 3-character upper-case time zone, or + or minus and 4-digit offset
        "(([A-Z][A-Z][A-Z])|([+-][0-9]{4}))";

      // Convert the string to a regular expression
      var regexp = new RegExp(rfc2822);
      
      // See if the provided date string matches
      var result = dateString.match(regexp);
      if (result == null)
      {
        throw new Error("Unrecognized date string: " + dateString);
      }

      //
      // The regular expression matches. Let's do some further testing.
      //

      // Does the month match one of the legal values?
      month = months.indexOf(result[2]);
      if (month == -1)
      {
        throw new Error("Unexpected month: " + result[2]);
      }

      // What type of timezone was provided?
      if (result[8] != null)
      {
        // An alpha timezone was provided. Does it match a legal value?
        if (zones[result[8] === undefined])
        {
          throw new Error("Unexpected zone name: " + result[8]);
        }

        timezoneOffset = zones[result[8]];
      }
      else
      {
        // A numeric timezone was provided. Ensure hours and minutes values
        // are reasonable.
        var hours = result[9].substr(1, 2);
        var minutes = result[9].substr(3, 2);
        
        if (hours > 12 || minutes > 59)
        {
          throw new Error("Unrecognized time value: " + result[9]);
        }
        
        // Convert the hours and minutes to just minutes
        timezoneOffset = (hours * 60) + minutes;
        
        // If the offset was negative...
        if (result[9].substr(0, 1) == "-")
        {
          // ... then negate the timezone offset
          timezoneOffset = -timezoneOffset;
        }
      }

      // Get the number of milliseconds since 1 Jan 1970 UTC
      var time = (new Date(Date.UTC(results[3], // year
                                    month,      //month
                                    results[1], //day
                                    results[4], //hours
                                    results[5], //minutes
                                    results[6]
                                   )));
      
      // Add in the timezone offset
      time += (timezoneOffset * 60 * 1000);
      
      // Give 'em what they came for!
      return time;
    },

    /**
     * 'value' property transorm function. If the passed value is a string,
     * parse it. Otherwise, just return it as is (for additional checking by
     * the check function.)
     *
     * @param value {Integer|String}
     *   The value passed to the setter.
     *
     * @return {Integer}
     *   The number of milliseconds since midnight, 1 Jan 1970 UTC, for this
     *   date object.
     */
    _transformValue : function(value)
    {
      // If no value was provided, use current time.
      if (value === undefined)
      {
        return (new Date().getTime());
      }

      // We'll parse a string parameter to calculate the time.
      if (typeof value == "string")
      {
        return this.parse(value);
      }

      // If it's already a number, assume it's in correct format.
      if (typeof value == "number")
      {
        return value;
      }

      // It was something we don't recognize.
      throw new Error("Unrecognized type of value");
    }
  }
});
