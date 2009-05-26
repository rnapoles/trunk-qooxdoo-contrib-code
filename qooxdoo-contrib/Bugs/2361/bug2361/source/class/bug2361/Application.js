/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2361/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2361"
 */
qx.Class.define("bug2361.Application",
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

      var textarea = new qx.ui.form.TextArea; //new bug2361.TextArea;
      textarea.setMaxLength(10);
      
      textarea.addListener("changeValue", function(e){
        console.info("TA changeValue: " + e.getData());
      }, this)

      textarea.addListener("input", function(e){
        console.info("TA input: " + e.getData());
      }, this)
			


      var textfield = new qx.ui.form.TextField; //new bug2361.TextArea;
      textfield.setMaxLength(10);
      
      textfield.addListener("changeValue", function(e){
        console.info("TF changeValue: " + e.getData());
      }, this)

      textfield.addListener("input", function(e){
        console.info("TF input: " + e.getData());
      }, this)
			



      doc.add(textarea, {left: 100, top: 50});
      doc.add(textfield, {left: 100, top: 250});

    }
  }
});
