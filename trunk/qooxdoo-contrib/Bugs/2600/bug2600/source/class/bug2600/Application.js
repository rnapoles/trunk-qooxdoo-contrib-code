/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2600/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2600"
 */
qx.Class.define("bug2600.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var textField = new qx.ui.form.TextField();
      textField.setValue("abcde");
      
      textField.addListener("focus", function(e)
      {
        textField.selectAllText();
      }, this);
      
      
      var button = new qx.ui.form.Button("focus()");
      button.addListener("execute", function() {
        textField.focus();
      }, this);
      
      var doc = this.getRoot();
      doc.add(textField, {left: 100, top: 50});
      doc.add(button, {left: 100, top: 150});
    }
  }
});
