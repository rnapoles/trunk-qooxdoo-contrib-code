/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2615/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2615"
 */
qx.Class.define("bug2615.Application",
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

      // Create a button
      var button1 = new qx.ui.form.Button("Block", "bug2615/test.png");

      // Document is the application root
      var doc = this.getRoot();
			
      // Add button to document at fixed coordinates
      doc.add(button1, {left: 100, top: 50});

      // Add an event listener
      button1.addListener("execute", function(e) {
        this.debug("block");
        this.getRoot().setBlockerColor("red");
        this.getRoot().setBlockerOpacity(0.5);
	this.getRoot().block();

        qx.event.Timer.once(function(e) {
          this.debug("unblock");
          this.getRoot().unblock();
	}, this, 5000); 
      }, this);

      var button2 = new qx.ui.form.Button("Block 2", "bug2615/test.png");
			
      // Add button to document at fixed coordinates
      doc.add(button2, {left: 300, top: 50});

      // Add an event listener
      button2.addListener("execute", function(e) {
        this.debug("block");
        this.getRoot().setBlockerColor("blue");
        this.getRoot().setBlockerOpacity(0.5);
	this.getRoot().blockContent();

        qx.event.Timer.once(function(e) {
          this.debug("unblock");
          this.getRoot().unblockContent();
	}, this, 5000); 
      }, this);
    }
  }
});
