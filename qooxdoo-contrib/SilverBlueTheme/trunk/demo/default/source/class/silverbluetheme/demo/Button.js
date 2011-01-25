qx.Class.define("silverbluetheme.demo.Button",
{
  extend: qx.ui.groupbox.GroupBox,

  construct: function()
  {
    this.base(arguments);

    this._createControls();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members:
  {
    _createControls: function()
    {
      var layout = new qx.ui.layout.VBox();
      this.setLayout(layout);

      var container = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));

      this.addNormalButtons(container);
      this.addToggleButton(container);
	  this.addToggleButtonGroup(container);
      this.addRepeatButton(container);
      this.addHoverButton(container);

	  this.addListenerOnce("appear", function(e)
	  {
        this.add(container);
	  }, this);
    },

    addNormalButtons : function(container)
    {
      var btn1 = new qx.ui.form.Button("Button A", "icon/22/apps/media-video-player.png");
      container.add(btn1);

      var btn2 = new qx.ui.form.Button("Button B", "icon/22/apps/internet-mail.png");
      btn2.setEnabled(false);
      container.add(btn2);
    },

    addToggleButton : function(container)
    {
      var button = new qx.ui.form.ToggleButton("Toggle Button", "icon/22/apps/internet-web-browser.png");
      button.focus();
      container.add(button);

      button.addListener("changeValue", function(e) {
        this.debug("Checked: " + e.getData());
      }, this);
    },

	addToggleButtonGroup: function(container)
    {
      var button1 = new qx.ui.form.ToggleButton("On");
      var button2 = new qx.ui.form.ToggleButton("Off");

      var group = new qx.ui.form.RadioGroup();
      group.add(button1, button2);

      container.add(button1);
      container.add(button2);
    },

    addRepeatButton : function(container)
    {
      var button = new qx.ui.form.RepeatButton(null, "icon/22/actions/list-add.png");
      container.add(button);

      // Label
      var label = new qx.ui.basic.Label("0");
      label.setDecorator("input");
      label.setTextColor("text-active");
      label.setPadding(2, 4);
      container.add(label);

      // Listener
      button.addListener("execute", function()
      {
        var tempValue = parseInt(label.getValue()) + 1;
        label.setValue(tempValue.toString());
      });
    },


    addHoverButton : function(container)
    {
      var button = new qx.ui.form.HoverButton("Hover").set({
        padding: 8
      });
      container.add(button);

      // Label
      var label = new qx.ui.basic.Label("0");
      label.setDecorator("input");
      label.setTextColor("text-active");
      label.setPadding(2, 4);
      container.add(label);

      // Listener
      button.addListener("execute", function()
      {
        var tempValue = parseInt(label.getValue()) + 1;
        label.setValue(tempValue.toString());
      });
    }

  }

});

