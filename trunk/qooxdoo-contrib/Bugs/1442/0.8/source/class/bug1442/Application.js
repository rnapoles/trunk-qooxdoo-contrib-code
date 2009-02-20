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

       // Create a textfield with keypress and keydown listener
      var input = new qx.ui.form.TextField();
      var labeld = new qx.ui.basic.Label("keydown:");
      var labelp = new qx.ui.basic.Label("keypress:");
      var keydown = new qx.ui.basic.Label();
      var keypress = new qx.ui.basic.Label();
  
      // Add an event listener
      
      input.addListener("keydown", function(e) {
        keydown.setContent(e.getKeyIdentifier())
      });
      input.addListener("keypress", function(e) {
        keypress.setContent(e.getKeyIdentifier())
        if (e.getKeyIdentifier() == "A") {
          e.preventDefault();
        }
      });
    
  
      // Document is the application root
      var doc = this.getRoot();
  
      /*
      doc.addListener("keydown", function(e) 
      {keydown.setContent(e.getKeyIdentifier())}, this, true);
      doc.addListener("keypress", function(e) 
      {keypress.setContent(e.getKeyIdentifier())}, this, true);
      */
  
  
      // Add button to document at fixed coordinates
      doc.add(input, {left: 10, top: 10});
      doc.add(labeld, {left: 10, top: 40});
      doc.add(labelp, {left: 10, top: 70});
      doc.add(keydown, {left: 100, top: 40});
      doc.add(keypress, {left: 100, top: 70});
    }
  }
});
