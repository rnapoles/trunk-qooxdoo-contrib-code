/* ************************************************************************

   Copyright:

   License:

   Authors:

#asset(timezonedate.demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "timezonedate"
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
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        var appender;
        appender = qx.log.appender.Native;
        appender = qx.log.appender.Console;
      }

      var tzDate;

      this.debug("test 1");
      tzDate = new timezonedate.TimezoneDate(0);
      this.assertEquals((new Date(0)).getTime(), tzDate.getTime());
      this.debug("date: " + tzDate);

      this.debug("test 2");
      tzDate = new timezonedate.TimezoneDate("1970-01-01T00:00Z");
      this.assertEquals((new Date(0)).getTime(), tzDate.getTime());
      this.debug("date: " + tzDate);

      this.debug("test 3");
      tzDate = new timezonedate.TimezoneDate("1970-01-01T04:00-04:00");
      tzDate.setOutputFormatter(tzDate.constructor._formatRfc2822);
      this.assertEquals((new Date(0)).getTime(), tzDate.getTime());
      this.debug("date: " + tzDate);
      this.debug(tzDate.format(240));
    }
  }
});
