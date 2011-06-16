qx.Class.define("graydienttheme.demo.CheckBox",
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
      var layout = new qx.ui.layout.VBox(8);
    
      this.set({layout: layout, contentPadding: 10});
    
      var label = new qx.ui.basic.Label("What do you need for the beach?");
      var cbOil = new qx.ui.form.CheckBox("Sun Oil");
      var cbTowel = new qx.ui.form.CheckBox("Towel");
      var cbBeer = new qx.ui.form.CheckBox("Beer");
      var cbBT =  new qx.ui.form.CheckBox("Bathing togs");
	  cbBT.setTriState(true);

      this._checkBoxes = [ cbOil, cbTowel, cbBeer, cbBT ];

	  this.addListenerOnce("appear", function(e)
      {
        this.add(label);
        this.add(cbOil);
        this.add(cbTowel);
        this.add(cbBeer);
        this.add(cbBT);
	  }, this);
	}

  }

});

