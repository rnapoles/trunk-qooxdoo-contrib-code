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

      var container = new qx.ui.layout.BoxLayout();

      var main = new qx.ui.layout.HorizontalBoxLayout;
      main.setPadding(10);

      main.set(
      {
        width   : "100%",
        height  : "100%",
        spacing : 10
      });

      // Tab view
      var tf1 = new qx.ui.pageview.tabview.TabView;
      tf1.set({ width : "1*" });
      main.add(tf1);

      var t1_1 = new qx.ui.pageview.tabview.Button("Edit");
      var t1_2 = new qx.ui.pageview.tabview.Button("Find");
      var t1_3 = new qx.ui.pageview.tabview.Button("Backup");
      t1_1.setChecked(true);
      tf1.getBar().add(t1_1, t1_2, t1_3);

      var p1_1 = new qx.ui.pageview.tabview.Page(t1_1);
      var p1_2 = new qx.ui.pageview.tabview.Page(t1_2);
      var p1_3 = new qx.ui.pageview.tabview.Page(t1_3);
      tf1.getPane().add(p1_1, p1_2, p1_3);

      p1_2.add(new qx.ui.form.TextField("Find Anywhere"));
      p1_3.add(new qx.ui.form.TextField("Backup Input"));

      var c1 = new qx.ui.form.CheckBox("Place bar on top");
      var c2 = new qx.ui.form.CheckBox("Align tabs to left");

      c1.setTop(0);
      c1.setChecked(true);

      c2.setTop(20);
      c2.setChecked(true);

      p1_1.add(c1, c2);

      c1.addEventListener("changeChecked", function(e) {
        tf1.setPlaceBarOnTop(e.getValue());
      });

      c2.addEventListener("changeChecked", function(e) {
        tf1.setAlignTabsToLeft(e.getValue());
      });

      // Inner tab view
      var tf2 = new qx.ui.pageview.tabview.TabView;

      tf2.set(
      {
        left   : 0,
        top    : 50,
        right  : 0,
        bottom : 0
      });

      p1_2.add(tf2);

      var t2_1 = new qx.ui.pageview.tabview.Button("Search for Files", "icon/16/actions/document-open.png");
      var t2_2 = new qx.ui.pageview.tabview.Button("Search the Web", "icon/16/categories/applications-internet.png");
      var t2_3 = new qx.ui.pageview.tabview.Button("Search in Mails", "icon/16/apps/internet-email-client.png");
      t2_1.setChecked(true);
      tf2.getBar().add(t2_1, t2_2, t2_3);

      var p2_1 = new qx.ui.pageview.tabview.Page(t2_1);
      var p2_2 = new qx.ui.pageview.tabview.Page(t2_2);
      var p2_3 = new qx.ui.pageview.tabview.Page(t2_3);
      tf2.getPane().add(p2_1, p2_2, p2_3);

      var t2_1 = new qx.ui.form.TextField("Files...");
      var t2_2 = new qx.ui.form.TextField("Web...");
      var t2_3 = new qx.ui.form.TextField("Mails...");

      t2_1.set(
      {
        top   : 2,
        left  : 0,
        width : 140
      });

      t2_2.set(
      {
        top   : 2,
        left  : 0,
        width : 140
      });

      t2_3.set(
      {
        top   : 2,
        left  : 0,
        width : 140
      });

      p2_1.add(t2_1);
      p2_2.add(t2_2);
      p2_3.add(t2_3);

      var b2_1 = new qx.ui.form.Button("Search", "icon/16/actions/edit-find.png");
      var b2_2 = new qx.ui.form.Button("Search", "icon/16/actions/edit-find.png");
      var b2_3 = new qx.ui.form.Button("Search", "icon/16/actions/edit-find.png");

      b2_1.set(
      {
        top  : 0,
        left : 150
      });

      b2_2.set(
      {
        top  : 0,
        left : 150
      });

      b2_3.set(
      {
        top  : 0,
        left : 150
      });

      p2_1.add(b2_1);
      p2_2.add(b2_2);
      p2_3.add(b2_3);

      function dosearch(e) {
        alert("Searching...");
      }

      b2_1.addEventListener("click", dosearch);
      b2_2.addEventListener("click", dosearch);
      b2_3.addEventListener("click", dosearch);

      // Bar view
      var bs = new qx.ui.pageview.buttonview.ButtonView;

      bs.set(
      {
        width       : "1*",
        barPosition : "left"
      });

      main.add(bs);

      var bsb1 = new qx.ui.pageview.buttonview.Button("Display", "icon/16/devices/video-display.png");
      var bsb2 = new qx.ui.pageview.buttonview.Button("Colorize", "icon/16/actions/format-color.png");
      var bsb3 = new qx.ui.pageview.buttonview.Button("Icons", "icon/16/apps/preferences-desktop-theme.png");
      var bsb4 = new qx.ui.pageview.buttonview.Button("Applications", "icon/16/actions/system-run.png");
      var bsb5 = new qx.ui.pageview.buttonview.Button("System", "icon/16/devices/video-display.png");

      bsb1.setChecked(true);

      bsb1.set(
      {
        iconPosition            : "left",
        horizontalChildrenAlign : "left"
      });

      bsb2.set(
      {
        iconPosition            : "left",
        horizontalChildrenAlign : "left"
      });

      bsb3.set(
      {
        iconPosition            : "left",
        horizontalChildrenAlign : "left"
      });

      bsb4.set(
      {
        iconPosition            : "left",
        horizontalChildrenAlign : "left"
      });

      bsb5.set(
      {
        iconPosition            : "left",
        horizontalChildrenAlign : "left"
      });

      bs.getBar().add(bsb1, bsb2, bsb3, bsb4, bsb5);
      bs.getBar().setHorizontalChildrenAlign("center");
      bs.getBar().setVerticalChildrenAlign("bottom");

      var p1 = new qx.ui.pageview.buttonview.Page(bsb1);
      var p2 = new qx.ui.pageview.buttonview.Page(bsb2);
      var p3 = new qx.ui.pageview.buttonview.Page(bsb3);
      var p4 = new qx.ui.pageview.buttonview.Page(bsb4);
      var p5 = new qx.ui.pageview.buttonview.Page(bsb5);
      bs.getPane().add(p1, p2, p3, p4, p5);

      p1.add(new qx.ui.form.TextField("Display Input"));
      p2.add(new qx.ui.form.TextField("Paint Input"));
      p3.add(new qx.ui.form.TextField("Icons Input"));
      p4.add(new qx.ui.form.TextField("Applications Input"));
      p5.add(new qx.ui.form.TextField("System Input"));

      var r1 = new qx.ui.form.RadioButton("Top", "top");
      var r2 = new qx.ui.form.RadioButton("Right", "right");
      var r3 = new qx.ui.form.RadioButton("Bottom", "bottom");
      var r4 = new qx.ui.form.RadioButton("Left", "left", null, true);

      r1.setTop(50);
      r2.setTop(70);
      r3.setTop(90);
      r4.setTop(110);

      p1.add(r1, r2, r3, r4);

      var rm = new qx.ui.selection.RadioManager(null, [ r1, r2, r3, r4 ]);

      rm.addEventListener("changeSelected", function(e) {
        bs.setBarPosition(e.getValue().getValue());
      });


      container.add(main);
      container.setDimension(400, 600);
      container.setOverflow("scroll");

      // Set button location
      container.setTop(50);
      container.setLeft(50);

      // Add button to document
      container.addToDocument();

    },


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
