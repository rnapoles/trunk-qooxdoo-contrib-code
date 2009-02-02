/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#resource(custom.image:image)

// List all static resources that should be copied into the build version,
// if the resource filter option is enabled (default: disabled)
#embed(qx.icontheme/32/status/dialog-information.png)
#embed(custom.image/test.png)

************************************************************************ */

/**
 * Your custom application
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
     * TODOC
     *
     * @type member
     */
    main : function()
    {
      this.base(arguments);

      // Define alias for custom resource path
      //qx.io.Alias.getInstance().add("custom", qx.core.Setting.get("custom.resourceUri"));

      var doc = this.getRoot();
      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox)
      doc.add(container)   

      // Create button
      var button1 = new qx.ui.form.Button("First Button", "custom/image/test.png");
      container.add(button1);
      this.b1 = button1;

      // Attach a tooltip
      button1.setToolTip(new qx.ui.tooltip.ToolTip("A nice tooltip", "icon/32/status/dialog-information.png"));
      
      button1.getContentElement().setAttribute("id", "button");
      button1.setUserData("thefatbutton", "this is for the simulator");

      // textfield
      var tf = new qx.ui.form.TextField();
      container.add(tf);      
      tf.getContentElement().setAttribute("id", "tf");

      // Add an event listener
      button1.addListener("execute", function(e) {
        tf.setValue("I was pressed!" + e);
      });


      //# tabview
      var tv = new qx.ui.tabview.TabView();
      container.add(tv);
      tv.set({
        height : 200,
        width  : 300,
        padding: 10
      });                  

      var p1 = new qx.ui.tabview.Page("First Tab");      
      p1.getContentElement().setAttribute("id", "First");
      tv.add(p1);

      var p2 = new qx.ui.tabview.Page("Second Tab");
      p2.getContentElement().setAttribute("id", "Second");
      tv.add(p2);

      // create some arbitrary object nestings
      this.c1={};
      this.c1.c2 = {};
      this.c1.c2.c3={};
      this.c1.c2.c3.First=p1;
      this.c1.c2.Second=p2;


      //this.tracker = new custom.MouseTracker();
      //this.tracker.window.open();

      this.selsh = new custom.simulator.Shell("Simulator Shell");
      doc.add(this.selsh);
      this.selsh.open();

      // activate Inspector
      //inspector.Inspector.init();

    }, //construct


    /**
     * TODOC
     *
     * @type member
     */
    close : function()
    {
      this.base(arguments);

      // Prompt user
      // return "Do you really want to close the application?";
    },


    /**
     * TODOC
     *
     * @type member
     */
    terminate : function() {
      this.base(arguments);
    }
  },




  /*
  *****************************************************************************
     SETTINGS
  *****************************************************************************
  */

  settings : {
    "custom.resourceUri" : "./resource"
  }
});
