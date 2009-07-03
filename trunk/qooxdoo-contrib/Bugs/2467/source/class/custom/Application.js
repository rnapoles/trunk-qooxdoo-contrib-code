/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "2467"
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

      var win = new qx.ui.window.Window();
      win.setLayout(new qx.ui.layout.Grow());
      win.set({
        width: 500
      })
      win.open();
      
      var tabview = new qx.ui.tabview.TabView();
      win.add(tabview);
      
      var page = new qx.ui.tabview.Page("General");
      page.setLayout(new qx.ui.layout.Grow());
      tabview.add(page);

      var __MCont = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({
        padding : 10,
        backgroundColor : "white"
      });      
      page.add(__MCont);
      
      this.widgets = [];

      var __lay = new qx.ui.layout.Grid();
      __lay.setRowFlex(0, 1);
      var group1 = new qx.ui.groupbox.GroupBox("Saving");
      group1.setLayout(__lay);
      __MCont.add(group1);
      this.widgets['pg_scont'] = new qx.ui.form.CheckBox(this.tr("Allow contacts backup.<br>\
      <font color='#888'>Use this option you do not have to retype contacts at each report.</font>")).set({rich:true, allowGrowX : true});
      group1.add(this.widgets['pg_scont'], {row: 0, column : 0});


      var __lay2 = new qx.ui.layout.Grid();
      __lay2.setRowFlex(0, 1);
      var group2 = new qx.ui.groupbox.GroupBox("Publishing");
      group2.setLayout(__lay2);
      __MCont.add(group2);

      var __lbl_1 = new qx.ui.basic.Label(this.tr("Published offset (in min) : ")).set({rich:true, allowGrowX : true});
      group2.add(__lbl_1, {row: 0, column : 0});

      this.widgets['pg_spub'] = new qx.ui.form.Spinner(0, 30, 60).set({singleStep: 10, margin:[0,0,0,0]}) ;
      group2.add(this.widgets['pg_spub'], {row: 0, column : 1});

      var __lbl_2 = new qx.ui.basic.Label("<font color='#888'>" + this.tr("Use this option to shift the time of publication by x min.") + "</font>").set({rich:true, allowGrowX : true});
      group2.add(__lbl_2, {row: 0, column : 2});  
    }
  }
});
