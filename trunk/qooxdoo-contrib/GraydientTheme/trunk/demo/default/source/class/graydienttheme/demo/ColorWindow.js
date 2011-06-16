qx.Class.define("graydienttheme.demo.ColorWindow",
{
  extend: qx.ui.window.Window,

  construct: function()
  {
    this.base(arguments);

    this.setCaption("Color Selector");
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
      var layout = new qx.ui.layout.VBox(16);
    
      this.set({
        layout: layout
      });
    
      var box = new qx.ui.container.Composite().set(
      {
        layout: new qx.ui.layout.VBox(),
        padding    : 3,
        allowGrowX : true,
        allowGrowY : true
      });
    
	  var mycolor = new qx.ui.control.ColorSelector;
      box.add(mycolor);
	  this.add(box, {flex: 1});
	  
	  this.addListenerOnce("appear", this.center, this);
    }
  }

});

