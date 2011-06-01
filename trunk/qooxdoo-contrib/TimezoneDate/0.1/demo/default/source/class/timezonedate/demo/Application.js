/* ************************************************************************

   Copyright:
     (c) 2010, 2011 Derrell Lipman
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

#asset(timezonedate/*)

************************************************************************ */

/**
 * This is the main application class of the demo for "timezonedate"
 */
qx.Class.define("timezonedate.demo.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      var appender;

      // Call super class
      this.base(arguments);

      // Enable logging in debug environment
      if (typeof(qx.core.Environment) !== "undefined")
      {
        if (qx.core.Environment.get("qx.debug"))
        {
          appender = qx.log.appender.Native;
          appender = qx.log.appender.Console;
        }
      }

      var tzDate;

      this.debug("test 1");
      tzDate = new timezonedate.TimezoneDate(0);
      if (this.assertEquals)
      {
        this.assertEquals((new Date(0)).getTime(), tzDate.getTime());
      }
      this.debug("date: " + tzDate);

      this.debug("test 2");
      tzDate = new timezonedate.TimezoneDate("1970-01-01T00:00Z");
      if (this.assertEquals)
      {
        this.assertEquals((new Date(0)).getTime(), tzDate.getTime());
      }
      this.debug("date: " + tzDate);

      this.debug("test 3");
      tzDate = new timezonedate.TimezoneDate("1970-01-01T04:00-04:00");
      tzDate.setOutputFormatter(tzDate.constructor._formatRfc2822);
      if (this.assertEquals)
      {
        this.assertEquals((new Date(0)).getTime(), tzDate.getTime());
      }
      this.debug("date: " + tzDate);
      this.debug(tzDate.format(240));
    }
  }
});
