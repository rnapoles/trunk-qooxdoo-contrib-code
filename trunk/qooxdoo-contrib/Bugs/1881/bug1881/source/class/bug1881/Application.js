/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1881/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1881"
 */
qx.Class.define("bug1881.Application",
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
			

      var label = new qx.ui.basic.Label("What do you need for the beach?");

      // create the main layout
      var mainLayout = new qx.ui.layout.VBox();
      mainLayout.setSpacing(10);

      // add the main layout to a container widget and to the document root
      var container = new qx.ui.container.Composite(mainLayout);
      container.setPadding(20);

      this.getRoot().add(container, {left:0,top:0});

      container.add(label);

      // Create some radio buttons
      var cbOil = new qx.ui.form.CheckBox("Sun Oil");
      var cbTowel = new qx.ui.form.CheckBox("Towel");
      var cbBeer = new qx.ui.form.CheckBox("Beer");
      var cbBT =  new qx.ui.form.CheckBox("Bathing togs");

      this._checkBoxes = [ cbOil, cbTowel, cbBeer, cbBT ];

      // Add them to the container
      container.add(cbOil);
      container.add(cbTowel);
      container.add(cbBeer);
      container.add(cbBT);

      // Add button to document at fixed coordinates
      doc.add(container, {left: 100, top: 50});

    }
  }
});
