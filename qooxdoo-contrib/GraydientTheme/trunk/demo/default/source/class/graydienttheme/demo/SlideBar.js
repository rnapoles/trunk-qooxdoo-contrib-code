qx.Class.define("graydienttheme.demo.SlideBar",
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

      var slideBar1 = new qx.ui.container.SlideBar();
      slideBar1.set({
        width: 300
      });

      slideBar1.setLayout(new qx.ui.layout.HBox(3));

      var icons = [
        "audio-card.png","audio-input-microphone.png","battery.png",
        "camera-photo.png","camera-web.png","computer.png","display.png",
        "drive-harddisk.png","drive-optical.png","input-keyboard.png",
        "network-wired.png","network-wireless.png"
      ];

      for (var i=0; i<icons.length; i++)
      {
        slideBar1.add((new qx.ui.basic.Image("icon/48/devices/" + icons[i])).set({
          decorator: "main",
          padding: 4
        }));
      }

      var toggle = new qx.ui.form.ToggleButton("Toggle size");

      toggle.addListener("changeValue", function(e) {
        slideBar1.setWidth(e.getData() ? 800 : 300);
      });
	  
	  var rich = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla.';
      var richWidget = new qx.ui.embed.Html(rich);
      richWidget.setOverflow("hidden", "hidden");
      // richWidget.setDecorator("box-white");
      richWidget.setWidth(200);
      richWidget.setHeight(1700);
	  richWidget.setPadding([5, 0, 5, 5]);
	  
	  var slideBar2 = new qx.ui.container.SlideBar("vertical");
      slideBar2.set({
        height: 200,
		layout: new qx.ui.layout.VBox()
      });
	  slideBar2.add(richWidget);

	  this.addListenerOnce("appear", function(e)
      {
	    this.add(new qx.ui.basic.Label("<b>With icons:</b>").set({rich: true}), {left: 20, top: 20});
        this.add(slideBar1, {left: 20, top: 40});
		this.add(toggle, {left: 20, top: 120});
		this.add(new qx.ui.basic.Label("<b>With text:</b>").set({rich: true}), {left: 20, top: 170});
		this.add(slideBar2, {left: 20, top: 190});
	  }, this);
    }

  }

});

