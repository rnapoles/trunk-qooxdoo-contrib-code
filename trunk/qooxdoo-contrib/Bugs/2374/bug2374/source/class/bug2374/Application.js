/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2374/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2374"
 */
qx.Class.define("bug2374.Application",
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

      // Document is the application root
      var doc = this.getRoot();
      var element = document.getElementById('testDiv');

      var effect = new qx.fx.effect.core.Scale(element);
      effect.set({
        scaleTo : 0,
        scaleX : false,
        scaleFromCenter : false
      });

      var button1 = new qx.ui.form.Button("scale down");
      var button2 = new qx.ui.form.Button("reset");

      button1.addListener("execute", function(){
        effect.start();
      }, this);

			
      button2.addListener("execute", function(){
        qx.bom.element.Style.setCss(element, 'font-size:12pt;text-align:center;font-family:"Trebuchet MS","Lucida Grande",Verdana,sans-serif;color:white;left:240px;top:90px;position:absolute;width:200px;height:55px;background-color:#134275;z-Index:2;');
      }, this);
			
      // Add button to document at fixed coordinates
      doc.add(button1, {left: 100, top: 50});
      doc.add(button2, {left: 100, top: 80});

    }
  }
});
