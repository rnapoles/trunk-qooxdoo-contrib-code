/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3407/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3407"
 */
qx.Class.define("bug3407.Application",
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

      var currentImg = new qx.ui.basic.Image();
      currentImg.set({ scale : true, 
                       allowShrinkX: true, 
                       allowShrinkY: true, 
                       maxWidth: 200, 
                       maxHeight: 200 });
 
       this.getRoot().add(currentImg);
       currentImg.setSource("http://resources.qooxdoo.org/images/sf_cca_finalist.png");

       var btn = new qx.ui.form.Button("RESET PIC"); 
       this.getRoot().add(btn);
       btn.addListener('execute', function(e)
       {
         currentImg.resetSource();             
       });			
    }
  }
});
