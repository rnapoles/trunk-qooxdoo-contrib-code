/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1442/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "Bug1442"
 */
qx.Class.define("bug1442.Application",
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

      var doc = this.getRoot();

       // Create a textfield with keypress and keydown listener
      var input = new qx.ui.form.TextField();
      input.focus();
      doc.add(input, {left: 10, top: 10});
      
      var list = new qx.ui.virtual.form.List();
      doc.add(list, {left: 10, top: 40});
      var keys = new qx.data.Array();
      var controller = new qx.ui.virtual.form.ListController(keys, list);
      
      
      // Add an event listener
      input.addListener("keydown", function(e) {
        keys.unshift(new Date().getTime() + " keydown " + e.getKeyIdentifier());
      });
      input.addListener("keypress", function(e) {
        keys.unshift(new Date().getTime() + " keypress " + e.getKeyIdentifier());
      });
    
  
      // Document is the application root
  
      /*
      doc.addListener("keydown", function(e) 
      {keydown.setContent(e.getKeyIdentifier())}, this, true);
      doc.addListener("keypress", function(e) 
      {keypress.setContent(e.getKeyIdentifier())}, this, true);
      */
    }
  }
});
