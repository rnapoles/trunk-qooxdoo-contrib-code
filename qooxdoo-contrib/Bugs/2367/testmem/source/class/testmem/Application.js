qx.Class.define("testmem.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    widgets : null,
    
    main : function()
    {
      this.base(arguments);

      qx.log.appender.Native;
      qx.log.appender.Console;

      var value = 50;
      this.widgets = this.generateBoxes(value);
      
      var toggle = new qx.ui.form.Button("Toggle visibility");
      toggle.addListener("execute", function()
      {
        var children = this.widgets.getChildren();
        for (var i = 0, l = children.length; i < l;  i++) {
          if (children[i].isVisible()) {
            children[i].setVisibility("hidden");
          } else {
            children[i].setVisibility("visible");
          }
        }
      }, this);

      var root = this.getRoot();
      root.add(toggle, {left: 10, top: 10});
      root.add(this.widgets, {left: 0, top: 50});
    },

    generateBoxes : function(value)
    {
      var box = new qx.ui.container.Composite(new qx.ui.layout.Grid());

      var width = parseInt((qx.bom.Viewport.getWidth()) / value);
      var height = parseInt((qx.bom.Viewport.getHeight() - 50)/ value);
      
      for (var y=0; y<value; y++)
      {
        for (var x=0; x<value; x++)
        {
          box.add((new qx.ui.core.Widget()).set({
            backgroundColor : ((x+y) % 2 == 0) ? "red" : "blue",
            width : width,
            allowShrinkY : false,
            allowShrinkX : false,
            height : height
          }), {column: x, row: y});
        }
      }

      return box;
    }
  }
});
