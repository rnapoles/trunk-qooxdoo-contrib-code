qx.Class.define("retrotheme.demo.DateChooser",
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
      this.set({layout: layout, contentPadding: 10});
    
	  this.addListenerOnce("appear", function(e)
      {
        this.add(this.createDateChooser());
	  }, this);
    },
    
    createDateChooser: function()
    {
      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox(8));
      var containerTop = new qx.ui.container.Composite(new qx.ui.layout.HBox(20));
      var containerRight = new qx.ui.container.Composite(new qx.ui.layout.VBox(8));
      var containerRightTop = new qx.ui.container.Composite(new qx.ui.layout.HBox(20));
      var containerRightBottom = new qx.ui.container.Composite(new qx.ui.layout.HBox(8));
      var containerButtons = new qx.ui.container.Composite(new qx.ui.layout.VBox(8));
      var containerDescription = new qx.ui.container.Composite(new qx.ui.layout.VBox(2));
      containerRightTop.add(containerButtons);
      containerRightTop.add(containerDescription);
      containerRight.add(containerRightTop);
      containerRight.add(containerRightBottom);
      containerTop.add(containerRight)
      container.add(containerTop);

      // Date chooser
      var chooser = new qx.ui.control.DateChooser();
      containerTop.addBefore(chooser, containerRight);

      // date label
      var label = new qx.ui.basic.Label("select a date");
      container.add(label);

      // listener for the change event
      chooser.addListener("changeValue", function(e) {
        label.setValue("Change: " + e.getData());
      }, this);

      // listener for the execute event
      chooser.addListener("execute", function(e) {
        var currentDate = chooser.getValue();
        label.setValue("Execute: " + currentDate);
      }, this);

      // set current Date control
      var setDateButton = new qx.ui.form.Button("Set current date");
      setDateButton.setAlignX("center");
      containerButtons.add(setDateButton);
      setDateButton.addListener("execute", function(e) {
        chooser.setValue(new Date());
      });

      // show a specific month
      var setMonthButton = new qx.ui.form.Button("Show January 1981");
      containerButtons.add(setMonthButton);
      setMonthButton.addListener("execute", function(e) {
        chooser.showMonth(0, 1981);
      });

      // reset the selection
      var removeSelectionButton = new qx.ui.form.Button("Remove the selection");
      containerButtons.add(removeSelectionButton);
      removeSelectionButton.addListener("execute", function(e) {
        chooser.setValue(null);
      });

      // Description
      var headerLabel = new qx.ui.basic.Label("Description");
      headerLabel.setFont("bold");
      containerDescription.add(headerLabel);
      containerDescription.add(new qx.ui.basic.Label("- Use the cursors keys to move the selection."));
      containerDescription.add(new qx.ui.basic.Label("- Page-keys / shift + page-keys switch months/years."));
      containerDescription.add(new qx.ui.basic.Label("- Double-click or enter/space-key will fire an execute event."));
      containerDescription.add(new qx.ui.basic.Label("- Escape will remove the selection."));

      return container;
    }
  }

});

