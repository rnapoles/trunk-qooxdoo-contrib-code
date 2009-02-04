/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1864/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1864"
 */
qx.Class.define("bug1864.Application",
{
  extend : qx.application.Inline,



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

      var rootElement = document.getElementById("root");
      var inline = new qx.ui.root.Inline(rootElement, true, true);
      
      var menu2 = new qx.ui.menu.Menu;
      var m2Btn1 = new qx.ui.menu.Button("Button 1", null, null);
      var m2Btn2 = new qx.ui.menu.Button("Button 2", null, null);
      var m2Btn3 = new qx.ui.menu.Button("Button 3", null, null);
      menu2.add(m2Btn1);
      menu2.add(m2Btn2);
      menu2.add(m2Btn3);
     
      var menu = new qx.ui.menu.Menu;
      var mBtn1 = new qx.ui.menu.Button("Button 1", null, null, menu2);
      var mBtn2 = new qx.ui.menu.RadioButton("RadioButton", null, null);
      var mBtn3 = new qx.ui.menu.RadioButton("RadioButton 2", null, null);

      var radioGroup = new qx.ui.form.RadioGroup(mBtn2, mBtn3);
      
      menu.add(mBtn1);
      menu.add(mBtn2);
      menu.add(mBtn3);
      
      var formButton = new qx.ui.form.MenuButton("Menu", null, menu);
      inline.add(formButton);
    }
  }
});
