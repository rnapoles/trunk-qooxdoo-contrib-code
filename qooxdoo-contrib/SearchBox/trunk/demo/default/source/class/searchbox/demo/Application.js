/* ************************************************************************

   Copyright:
     Copyright (C) 2009 Arcode Corporation
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Dave Bagget (Main code)
     * Christian Boulanger (Contributionizing, small changes)

************************************************************************ */

/* ************************************************************************

#asset(searchbox.demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "searchbox"
 */
qx.Class.define("searchbox.demo.Application",
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
      if (qx.core.Variant.isSet("qx.debug", "on"))
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

      var search_box = new searchbox.SearchBox("Search...",{
        idle :    "icon/16/action/dialog-ok.png",
        waiting : "icon/16/action/dialog-close.png",
        viewing : "icon/16/action/dialog-apply.png"
      });
      search_box.setWidth(200);
      this.getRoot().add( search_box, {top:100,left:100});
    }
  }
});
