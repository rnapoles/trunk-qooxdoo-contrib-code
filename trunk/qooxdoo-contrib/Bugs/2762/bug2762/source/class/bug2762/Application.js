/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2762/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2762"
 */
qx.Class.define("bug2762.Application",
{
  extend : qx.application.Native,



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

      var helper = document.createElement("div");
      document.body.appendChild(helper);

      this._doc = new qx.html.Root(helper);
      this._doc.setAttribute("id", "doc");

      var el = new qx.html.Element("input");
      el.setAttribute("value", "vanillebaer");
      this._doc.add(el);
      
      el.setTextSelection(0, 4);
    }
  }
});
