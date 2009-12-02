/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3102/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3102"
 */
qx.Class.define("bug3102.Application",
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

      var checkBox = new qx.ui.form.CheckBox("CheckBox");
      var radioButton = new qx.ui.form.RadioButton("RadioGroup");
      
      var doc = this.getRoot();
      doc.add(checkBox, {left : 100, top: 50});
      doc.add(radioButton, {left : 100, top: 100});
      
      var command1 = new qx.ui.core.Command("Alt+1");
      var command2 = new qx.ui.core.Command("Alt+2");
      checkBox.setCommand(command1);
      radioButton.setCommand(command2);
      
      checkBox.addListener("execute", function(e) {
        this.debug("execute checkBox");
      }, this);
      
      radioButton.addListener("execute", function(e) {
        this.debug("execute radioButton");
      }, this);
      
      command1.addListener("execute", function(e) {
        this.debug("execute command1");
      }, this);
      
      command2.addListener("execute", function(e) {
        this.debug("execute command2");
      }, this);
    }
  }
});
