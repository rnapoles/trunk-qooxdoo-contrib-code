/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2045/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2045"
 */
qx.Class.define("bug2045.Application",
{
  extend : qx.legacy.application.Gui,




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


      var label = new qx.legacy.ui.basic.Label(this.tr("Login Name:"));
      // Set button location
      label.setTop(50);
      label.setLeft(50);

      // Add button to document
      label.addToDocument();

    }
  }
});
