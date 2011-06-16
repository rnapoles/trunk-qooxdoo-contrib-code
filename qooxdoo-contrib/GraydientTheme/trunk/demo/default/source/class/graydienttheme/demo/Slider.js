qx.Class.define("graydienttheme.demo.Slider",
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

	  this.addListenerOnce("appear", function(e)
      {
        this.add(this._createVerticalLayout(), {left:20, top:20});
        this.add(this._createHorizontalLayout(), {left:20, top:340});
	  }, this);
    },

    _createVerticalLayout : function()
    {
      var sliders = []

      sliders.push(this._createSliderGroup(new qx.ui.form.Slider().set({
        maximum: 1000,
        value: 100
      })));

      sliders.push(this._createSliderGroup(new qx.ui.form.Slider().set({
        minimum: -100,
        maximum: 100,
        singleStep: 5,
        pageStep: 20,
        value: 0
      })));

      sliders.push(this._createSliderGroup(new qx.ui.form.Slider().set({
        minimum: -600,
        maximum: -200,
        singleStep: 10,
        pageStep: 50,
        value: -300
      })));

      sliders.push(this._createSliderGroup(new qx.ui.form.Slider().set({
        minimum: 25,
        maximum: 75,
        singleStep: 5,
        pageStep: 10,
        value: 25
      })));

      var grid = new qx.ui.layout.Grid();
      var container = new qx.ui.container.Composite(grid);

      container.setPadding(20);
      container.setWidth(530);
      container.setHeight(300);

      grid.setSpacing(5);
      grid.setRowFlex(0, 1);
      grid.setRowFlex(1, 1);
      grid.setRowFlex(2, 1);

      grid.setRowAlign(0, "left", "top");
      grid.setRowAlign(1, "left", "middle");
      grid.setRowAlign(2, "left", "bottom");

      var col = 0;

      for (var i=0; i<sliders.length; i++)
      {
        var group = sliders[i];
        group.slider.setOrientation("vertical");

        container.add(group.slider, {row: 0, column: col, rowSpan: 3, colSpan: 1});

        container.add(group.minimum, {row: 0, column: col+1});
        container.add(group.value, {row: 1, column: col+1});
        container.add(group.maximum, {row: 2, column: col+1});

        grid.setColumnMinWidth(col+1, 80);
        grid.setColumnWidth(col+2, 20);

        col += 3;
      }

      return container;
    },


    _createHorizontalLayout : function()
    {
      var sliders = []

      sliders.push(this._createSliderGroup(new qx.ui.form.Slider().set({
        maximum: 1000,
        value: 100
      })));

      sliders.push(this._createSliderGroup(new qx.ui.form.Slider().set({
        minimum: -100,
        maximum: 100,
        singleStep: 5,
        pageStep: 20,
        value: 0
      })));

      sliders.push(this._createSliderGroup(new qx.ui.form.Slider().set({
        minimum: -600,
        maximum: -200,
        singleStep: 10,
        pageStep: 50,
        value: -300
      })));

      sliders.push(this._createSliderGroup(new qx.ui.form.Slider().set({
        minimum: 25,
        maximum: 75,
        singleStep: 5,
        pageStep: 10,
        value: 25
      })));

      var grid = new qx.ui.layout.Grid();
      var container = new qx.ui.container.Composite(grid);

      container.setPadding(20);
      container.setWidth(400);
      container.setHeight(400);

      grid.setSpacing(5);
      grid.setColumnFlex(0, 1);
      grid.setColumnFlex(1, 1);
      grid.setColumnFlex(2, 1);

      grid.setColumnAlign(0, "left", "bottom");
      grid.setColumnAlign(1, "center", "bottom");
      grid.setColumnAlign(2, "right", "bottom");

      var row = 0;
      for (var i=0; i<sliders.length; i++)
      {
        var group = sliders[i];
        group.slider.setOrientation("horizontal");

        group.value.setWidth(100);
        group.value.setTextAlign("center");

        container.add(group.minimum, {row: row, column: 0});
        container.add(group.value, {row: row, column: 1});
        container.add(group.maximum, {row: row, column: 2});

        container.add(group.slider, {row: row+1, column: 0, colSpan: 3, rowSpan: 1});

        grid.setRowHeight(row+2, 20);

        row += 3;
      }

      return container;
    },


    _createSliderGroup : function(slider)
    {
      var group =
      {
        slider: slider,
        minimum: new qx.ui.basic.Label("Min: " + slider.getMinimum().toString()),
        maximum: new qx.ui.basic.Label("Max: " + slider.getMaximum().toString()),
        value: new qx.ui.basic.Label(slider.getValue().toString())
      };

      slider.addListener("changeValue", function(e) {
        group.value.setValue(slider.getValue().toString());
      });

      return group;
    }


  }

});

