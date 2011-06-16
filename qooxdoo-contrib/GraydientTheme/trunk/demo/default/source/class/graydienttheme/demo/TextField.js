qx.Class.define("graydienttheme.demo.TextField",
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
      var layout = new qx.ui.layout.Canvas();
      this.set({layout: layout, contentPadding: 10});

      var box = new qx.ui.layout.VBox();
      box.setSpacing(10);

      var container = new qx.ui.container.Composite(box);
      container.setPadding(20);

      var input1 = new qx.ui.form.TextField("max15").set({
        maxLength: 15
      });
      input1.focus();
      input1.addListener("changeValue", function(e) {
        this.debug("ChangeValue: " + e.getData());
      }, this);
      container.add(input1);

      var input4 = new qx.ui.form.TextField("Web 2.0").set({
        font: qx.bom.Font.fromString("20px sans-serif"),
        padding: 6
      });
      container.add(input4);

      var input6 = new qx.ui.form.TextField("read only").set({
        readOnly: true
      });
      container.add(input6);

      var input9 = new qx.ui.form.TextArea("text\narea");
      container.add(input9);

      var input10 = new qx.ui.form.TextArea("text\narea\nnowrap");
      input10.setWrap(false);
      container.add(input10);

      var input11 = new qx.ui.form.TextArea("text\narea\nmonospace");
      input11.setFont("monospace");
      container.add(input11);

      var controls = new qx.ui.container.Composite(new qx.ui.layout.VBox(8));
      controls.setPadding(20);

      var btnLiveUpdate = new qx.ui.form.Button("Toggle live update");
      btnLiveUpdate.addListener("execute", function() {
        input1.toggleLiveUpdate()
      });
      controls.add(btnLiveUpdate);

      var btnEnabled = new qx.ui.form.Button("Toggle enabled");
      var enable = false;
      btnEnabled.addListener("execute", function() {
        container.setEnabled(enable);
        enable = !enable;
      });
      controls.add(btnEnabled);

      controls.add(new qx.ui.core.Spacer(null, 20));

	  this.addListenerOnce("appear", function(e)
      {
        this.add(container, {left:0,top:0});
		this.add(controls, {left:200, top:0});
	  }, this);
    }

  }
});

