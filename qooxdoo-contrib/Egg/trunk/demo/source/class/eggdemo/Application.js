/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(eggdemo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "eggdemo"
 */
qx.Class.define("eggdemo.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * 
     */
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on")) {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }
      this.getRoot().add(new egg.ui.form.TimeField(new Date()));
    }
  }
});
/*
h:mm a
10:08 PM

h:mm:ss a
10:08:20 PM

h:mm:ss a z
10:08:00 PM GMT+1:00

h:mm:ss a v
10:07:41 PM ?
 */
