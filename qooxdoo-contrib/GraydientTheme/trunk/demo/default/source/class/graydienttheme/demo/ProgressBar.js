qx.Class.define("graydienttheme.demo.ProgressBar",
{
  extend: qx.ui.groupbox.GroupBox,
  
  construct: function()
  {
    this.base(arguments);

    this.createControls();
  },

  members :
  {
    createControls: function()
    {
	  var layout = new qx.ui.layout.Canvas();
      this.set({layout: layout, contentPadding: 10});
	  
      var box = new qx.ui.layout.VBox();
      var container = new qx.ui.container.Composite(box);

      var pb = new qx.ui.indicator.ProgressBar(0, 200);
      pb.set({height: 16, width: 200});
      
      var slider = new qx.ui.form.Slider().set({minimum:0, maximum: 200});
      var info = new qx.ui.basic.Label();

      this.add(container, {left: 0, top: 0});
      container.add(pb);
      container.add(slider);
      container.add(info);

      box.setSpacing(10);
      container.setPadding(20);
      info.setValue("Completed: 0 (0%)");

      //set up the progressbar value with slider's value
      slider.addListener("changeValue", function(e) {
        pb.setValue(e.getData());
      });

      //get real time change from the progressbar
      pb.addListener("change", function(e) {
        info.setValue("Completed: " + pb.getValue() + " (" + e.getData() + "%)");
        info.setTextColor("black");
      });

      //when complete make the info text green
      pb.addListener("complete", function(e) {
        info.setTextColor("green");
      });
    }
  }
});
