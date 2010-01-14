/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3323/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3323"
 */
qx.Class.define("bug3323.Application",
{
  extend : qx.application.Inline,


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

      var htmlElement = document.getElementById("isle");
      var inlineIsle = new qx.ui.root.Inline(htmlElement, true, true);
      inlineIsle.add(new qx.ui.form.TextField(), {left: 20, top: 20});
      inlineIsle.add(new qx.ui.form.TextField(), {left: 20, top: 70});
      
      var blocker = new qx.ui.core.Blocker(inlineIsle);
      blocker.setColor("#90c4f9");
      blocker.setOpacity(0.6);
      blocker.block();

      var loginPanel = new qx.ui.container.Composite(new qx.ui.layout.VBox(20));
      loginPanel.set({"alignX": "center", "alignY": "middle", "width": 500, "allowStretchX": false, "allowStretchY": false});
      var decorator = new qx.ui.decoration.Uniform(1, "solid", "#2b5172");
      decorator.set({"backgroundColor": "#4a93de"});
      loginPanel.setDecorator(decorator);

      var groupBox = new qx.ui.groupbox.GroupBox("Login", null);
      groupBox.setMargin(20);
      groupBox.setLayout(new qx.ui.layout.VBox());
      
      loginPanel.resultMessage = new qx.ui.basic.Label("");
      loginPanel.resultMessage.setMarginBottom(20);
      loginPanel.resultMessage.exclude();
      groupBox.add(loginPanel.resultMessage);
      
      groupBox.add(new qx.ui.basic.Label("Login"));
      var userNameField = new qx.ui.form.TextField();
      groupBox.add(userNameField);

      groupBox.add(new qx.ui.basic.Label("Password"));
      var passwordField = new qx.ui.form.TextField();
      groupBox.add(passwordField);
      
      var bottomLine = new qx.ui.container.Composite(new qx.ui.layout.HBox(20));
      bottomLine.setMarginTop(15);
      
      var keepAuthenticationCheckBox = new qx.ui.form.CheckBox("Remember me");
      var button = new qx.ui.form.Button("Login");
      button.set({"width": 100});
      bottomLine.add(keepAuthenticationCheckBox);
      bottomLine.add(new qx.ui.core.Spacer(), {"flex": 1});
      bottomLine.add(button);
      qx.ui.core.FocusHandler.getInstance().addRoot(loginPanel);

      groupBox.add(bottomLine);
      button.addListener("focus", function(){this.debug("focus event received");}, this);
      
      loginPanel.add(groupBox);
      loginPanel.setZIndex(300);

      this.getRoot().add(loginPanel, {left: 200, top: 50});
      
      button.focus();
    }
  }
});
