/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(qx/icon/${qx.icontheme}/32/apps/internet-feed-reader.png)

************************************************************************ */

/**
 * This is the main application class of your custom application "custom"
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

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      var grid = new qx.ui.layout.Grid(10, 10);
      var container = new qx.ui.container.Composite(grid).set({
        padding: 10
      });
      this.getRoot().add(container);
      
      var image = new qx.ui.basic.Image();
      container.add(image, {row: 0, column: 0, rowSpan: 4});
      
      var btnInvalid = new qx.ui.form.Button("invalid source");
      btnInvalid.addListener("execute", function() {
        image.setSource("http://foo.bar.com/juhu.png");
      });
      container.add(btnInvalid, {row: 0, column: 1});
      
      var btnValid = new qx.ui.form.Button("valid source from resources");
      btnValid.addListener("execute", function() {
        image.setSource("icon/32/apps/internet-feed-reader.png");
      });
      container.add(btnValid, {row: 1, column: 1});
      
      var btnValidExternal = new qx.ui.form.Button("valid external source");
      btnValidExternal.addListener("execute", function() {
        image.setSource("http://resources.qooxdoo.org/images/logo.gif");
      });
      container.add(btnValidExternal, {row: 2, column: 1});   
      
      var btnBlank = new qx.ui.form.Button("reset source");
      btnBlank.addListener("execute", function() {
        image.resetSource();
      });
      container.add(btnBlank, {row: 3, column: 1});         
    }
  }
});
