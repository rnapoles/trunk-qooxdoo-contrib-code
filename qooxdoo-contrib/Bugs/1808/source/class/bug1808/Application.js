/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1808/*)
#asset(qx/icon/Tango/32/actions/dialog-apply.png)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1808"
 */
qx.Class.define("bug1808.Application",
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

      var widget = new qx.ui.form.ListItem("Some text", "icon/32/actions/dialog-apply.png");      
      var scroll = new qx.ui.container.Scroll();
      var resize = new qx.ui.container.Resizer(new qx.ui.layout.Grow());            

      widget.set({
        allowShrinkX: false,
        allowShrinkY: false,
        height: 200
      });
      
      scroll.add(widget);
      resize.add(scroll);  
      /*
      widget.set({
        minWidth: 23,
        minHeight: 23
      });
      
      scroll.set({
        width: 10,
        height: 10
      });
      */
      
      this.getRoot().add(resize);      
    }
  }
});
