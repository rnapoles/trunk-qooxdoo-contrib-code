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
  extend : qx.application.Gui,




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
      qx.io.Alias.getInstance().add("custom", qx.core.Setting.get("custom.resourceUri"));

      var layout = new qx.ui.layout.VerticalBoxLayout();
      layout.addToDocument();

      // Create button
      var button1 = new qx.ui.form.Button("First Button", "custom/image/test.png");
      layout.add(button1);
      this.b1 = button1;

      // Set button location
      //button1.setTop(50);
      //button1.setLeft(50);

      // Add button to document
      //button1.addToDocument();

      // Attach a tooltip
      button1.setToolTip(new qx.ui.popup.ToolTip("A nice tooltip", "icon/32/status/dialog-information.png"));

      button1.setHtmlProperty("id","button");
      button1.setUserData("thefatbutton", "this is for the simulator");

      // textfield
      var tf = new qx.ui.form.TextField();
      layout.add(tf);
      tf.setHtmlProperty("id","tf");

      // Add an event listener
      button1.addEventListener("execute", function(e) {
        tf.setValue("I was pressed!" + e);
      });


      //# tabview
      var tv = new qx.ui.pageview.tabview.TabView();
      layout.add(tv);
      tv.set({
        height : 200,
        width  : 300,
        padding: 10
      });
      var b1 = new qx.ui.pageview.tabview.Button("First Tab");
      tv.getBar().add(b1);
      b1.setHtmlProperty("id","First");
      var p1 = new qx.ui.pageview.tabview.Page(b1);
      tv.getPane().add(p1);

      var b2 = new qx.ui.pageview.tabview.Button("Second Tab");
      tv.getBar().add(b2);
      b2.setHtmlProperty("id","Second");
      var p2 = new qx.ui.pageview.tabview.Page(b2);
      tv.getPane().add(p2);

      // create some arbitrary object nestings
      this.c1={};
      this.c1.c2 = {};
      this.c1.c2.c3={};
      this.c1.c2.c3.First=b1;
      this.c1.c2.Second=b2;


      //this.tracker = new custom.MouseTracker();
      //this.tracker.window.open();

      this.selsh = new simulator.Shell();
      this.selsh.window.open();

      // activate Inspector
      inspector.Inspector.init();

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
