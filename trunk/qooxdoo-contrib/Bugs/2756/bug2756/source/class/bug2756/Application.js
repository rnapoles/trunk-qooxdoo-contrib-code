/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2756/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2756"
 */
qx.Class.define("bug2756.Application",
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

      var parent = new qx.ui.container.Composite(new qx.ui.layout.VBox());

      var container1 = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      parent.add(container1, {flex:1});
      var container2 = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      parent.add(container2, {flex:1});
      
      var iframe = new qx.ui.embed.Iframe();
      
      // Document is the application root
      var doc = this.getRoot();
      
      // Add button to document at fixed coordinates
      doc.add(parent, {edge: 100});
      
      container1.add(iframe, {flex: 1});
      
      iframe.setSource("http://www.heise.de");
      
      window.setTimeout(function() {
        iframe.setSource("http://www.web.de");
        container2.add(iframe, {flex: 1});
      }, 10000);
    }
  }
});
