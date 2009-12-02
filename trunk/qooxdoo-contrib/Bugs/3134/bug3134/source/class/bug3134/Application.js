/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3134/*)

************************************************************************ */

qx.Class.define("bug3134.Application",
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

      var textField = new qx.ui.form.TextField("");
      var textArea = new qx.ui.form.TextArea("");
      
      textField.addListener("keydown", function(e) {
        e.preventDefault();
      }, this);
      
      textField.addListener("keypress", function(e) {
        textArea.setValue(textArea.getValue() + "keypress\n");
      }, this);
      
      var doc = this.getRoot();
      doc.add(textField, {left: 20, top: 20});
      doc.add(textArea, {left: 20, top: 50, bottom: 20});
    }
  }
});
