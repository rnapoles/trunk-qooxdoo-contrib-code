/* ************************************************************************

   qxe - qooxdoo extension framework

   Copyright:
     2010-2011 Cost Savers, http://www.cost-savers.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Stefan Andersson (sand)

************************************************************************ */

/* ************************************************************************

#asset(qxe/demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "qxe Clock indicator"
 */
qx.Class.define("qxe.demo.Application",
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
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      // Document is the application root
      var doc = this.getRoot();

      var internetClock = new qxe.ui.info.InternetClock();
//      var analogClock = new qxe.ui.info.AnalogClock();
      var binaryClock = new qxe.ui.info.BinaryClock();
      var digitalClock = new qxe.ui.info.DigitalClock();

      doc.add(internetClock, {left: 50, top: 50});
//      doc.add(analogClock, {left: 50, top: 50});
      doc.add(binaryClock, {left: 50, top: 150});
      doc.add(digitalClock, {left: 50, top: 300});
    }
  }
});

