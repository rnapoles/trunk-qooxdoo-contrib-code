/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "2040"
 */
qx.Class.define("custom.Application",
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

      var i;
      var j;
      
      var page;
      var subTabs;
      var subPage;

      var mainTabs = new qx.ui.tabview.TabView();
      this.getRoot().add(mainTabs, { edge : 10 });

      for (i = 0; i < 2; i++)
      {
        page = new qx.ui.tabview.Page("Page " + i);
        page.setLayout(new qx.ui.layout.VBox(4));
        mainTabs.add(page);

        subTabs = new qx.ui.tabview.TabView();
        subTabs.setContentPadding(0);
        page.add(subTabs, { flex : 1 });

        for (j = 0; j < 2; j++)
        {
          // Create a page
          subPage = new qx.ui.tabview.Page("Subpage " + i + "/" +j);
          subPage.setLayout(new qx.ui.layout.VBox(4));
          subTabs.add(subPage, { flex : 1 });
        }
      }
    }
  }
});
