/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2716/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2716"
 */
qx.Class.define("bug2716.Application",
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

      var doc = this.getRoot();
      doc.setBackgroundColor("transparent");
      doc.setBlockerColor("#90c4f9");
      doc.setBlockerOpacity(0.6);
      doc.block();

      this.loginPanel = new qx.ui.container.Composite(new qx.ui.layout.VBox(20));
      this.loginPanel.set({"alignX": "center", "alignY": "middle", "width": 500, "allowStretchX": false, "allowStretchY": false});
      var decorator = new qx.ui.decoration.Uniform(1, "solid", "#2b5172");
      decorator.set({"backgroundColor": "#4a93de"});
      this.loginPanel.setDecorator(decorator);

      doc.add(this.loginPanel);
      
      var groupBox = new qx.ui.groupbox.GroupBox("Login", null);
      groupBox.setMargin(20);
      groupBox.setLayout(new qx.ui.layout.VBox());
      
      this.loginPanel.resultMessage = new qx.ui.basic.Label("");
      this.loginPanel.resultMessage.setMarginBottom(20);
      this.loginPanel.resultMessage.exclude();
      groupBox.add(this.loginPanel.resultMessage);
      
      groupBox.add(new qx.ui.basic.Label("Login"));
      this.userNameField = new qx.ui.form.TextField();
      groupBox.add(this.userNameField);

      groupBox.add(new qx.ui.basic.Label("Password"));
      this.passwordField = new qx.ui.form.TextField();
      groupBox.add(this.passwordField);
      
      var bottomLine = new qx.ui.container.Composite(new qx.ui.layout.HBox(20));
      bottomLine.setMarginTop(15);
      
      this.keepAuthenticationCheckBox = new qx.ui.form.CheckBox("Remember me");
      var button = new qx.ui.form.Button("Login");
      button.set({"width": 100});
      bottomLine.add(this.keepAuthenticationCheckBox);
      bottomLine.add(new qx.ui.core.Spacer(), {"flex": 1});
      bottomLine.add(button);
      qx.ui.core.FocusHandler.getInstance().addRoot(this.loginPanel);

      groupBox.add(bottomLine);
      button.addListener("focus", function(){this.debug("focus event received");}, this);
      button.addListener("blur", function(){this.debug("blur event received");}, this);
      button.focus();
      
      this.loginPanel.add(groupBox);
    }
  }
});
