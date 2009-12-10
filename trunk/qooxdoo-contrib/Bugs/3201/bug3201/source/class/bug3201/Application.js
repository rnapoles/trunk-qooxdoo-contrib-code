/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3201/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3201"
 */
qx.Class.define("bug3201.Application",
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

      var textArea1 = new qx.ui.form.TextArea("");
      
      var doc = this.getRoot();
      doc.add(textArea1, {edge: 20});

      doc.addListener("keydown", function(e) {
        textArea1.setValue(textArea1.getValue() + "keydown: " +
          e.getKeyIdentifier() + "\n");
      });
      
      doc.addListener("keypress", function(e) {
        textArea1.setValue(textArea1.getValue() + "keypress: " +
          e.getKeyIdentifier() + "\n");
      });
      
      doc.addListener("keyup", function(e) {
        textArea1.setValue(textArea1.getValue() + "keyup: " +
          e.getKeyIdentifier() + "\n");
      });
    }
  }
});
