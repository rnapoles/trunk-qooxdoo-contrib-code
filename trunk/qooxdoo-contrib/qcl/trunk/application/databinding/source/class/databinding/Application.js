/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(databinding/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "databinding"
 */
qx.Class.define("databinding.Application",
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
     * @return {void} 
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
       * Main layout
       */
       var container = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
       container.setPadding(5);
       this.getRoot().add(container);

       var tabView = new qx.ui.tabview.TabView();
       
       container.add(tabView);
       tabView.add( ( new databinding.Table() ).createPage() );
       //tabView.add( ( new databinding.TreeVirtual() ).createPage() );
       
        
    }
  }
});