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
     * This method contains the initial application code and gets called 
     * during startup of the application
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
      
      var tabview = new qx.ui.tabview.TabView;
      
      var demos =
      [
         {
            label:   "filters",
            content: new eggdemo.Filters
         }
      ];
      
      for (var i = 0; i < demos.length; i++)
      {
         var page = new qx.ui.tabview.Page(demos[i].label);
         page.setLayout(new qx.ui.layout.VBox);
         page.add(demos[i].content);
         tabview.add(page, {flex: 1});
      }
      this.getRoot().add(tabview, {edge: 1});
    }
  }
});
