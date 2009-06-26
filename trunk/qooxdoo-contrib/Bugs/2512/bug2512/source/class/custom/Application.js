/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "custom"
 */
qx.Class.define("custom.Application",
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

			this.inlineIsle = new qx.ui.root.Inline(document.getElementById("overlay"), true, true);
			this.inlineIsle.setBackgroundColor("red");
			/*this.inlineIsle.setBlockerColor("#90c4f9");
			this.inlineIsle.setBlockerOpacity(0.6);
			this.inlineIsle.block();*/
			this.inlineIsle.setLayout(new qx.ui.layout.Dock());

		this.setupLoginPanel();
    },

		setupLoginPanel: function()
		{
			//return;
			if (this.loginPanel)
			{
				editor.services.SelectionOverlayService.getInstance().disableSelectionMode();
				document.getElementById("overlay").show();
				return;
			}
			this.loginPanel = new qx.ui.container.Composite(new qx.ui.layout.VBox(20));
			this.loginPanel.set({"alignX": "center", "alignY": "middle", "width": 500, "allowStretchX": false, "allowStretchY": false});
			var decorator = new qx.ui.decoration.Uniform(1, "solid", "#2b5172");
			decorator.set({"backgroundColor": "#4a93de"});
			this.loginPanel.setDecorator(decorator);

			this.inlineIsle.add(this.loginPanel, {"edge": "center"});
			
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
			this.passwordField = new qx.ui.form.PasswordField();
			groupBox.add(this.passwordField);
			
			var bottomLine = new qx.ui.container.Composite(new qx.ui.layout.HBox(20));
			bottomLine.setMarginTop(15);
			
			this.keepAuthenticationCheckBox = new qx.ui.form.CheckBox("Remember me");
			var button = new qx.ui.form.Button("Login");
			button.set({"width": 100});
			bottomLine.add(this.keepAuthenticationCheckBox);
			bottomLine.add(new qx.ui.core.Spacer(), {"flex": 1});
			bottomLine.add(button);
		
			groupBox.add(bottomLine);
			this.loginPanel.add(groupBox);
		}
  }
});
