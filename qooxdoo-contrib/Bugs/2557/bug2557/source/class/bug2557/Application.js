/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2557/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2557"
 */
qx.Class.define("bug2557.Application",
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
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var textField = new qx.ui.form.TextField();
      textField.focus();
      
      var doc = this.getRoot();
      doc.add(textField, {left: 100, top: 50});

      textField.addListener("keyup", function(e) {
        this.debug("keyup: " + e.getKeyIdentifier());
      }, this);
      
      textField.addListener("keydown", function(e) {
        this.debug("keydown: " + e.getKeyIdentifier());
      }, this);
      
      textField.addListener("keypress", function(e) {
        this.debug("keypress: " + e.getKeyIdentifier());
      }, this);
    }
  }
});
