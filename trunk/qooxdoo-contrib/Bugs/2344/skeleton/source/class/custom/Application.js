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

  members :
  {
    __te1 : null,
    __te2 : null,
    
    main : function()
    {
      this.base(arguments);
      
      var t = new qx.ui.tree.Tree("Root");

      with(t)
      {
        setBackgroundColor("white");
        setBorder("inset");
        setOverflow("scrollY");

        setHeight(null);
        setTop(48);
        setLeft(20);
        setWidth(200);
        setBottom(48);
      };

      qx.ui.core.ClientDocument.getInstance().add(t);
      this.__createTreeStructure(t);
      
      var manager = t.getManager();
      manager.setMultiSelection(false);
      manager.addEventListener("changeSelection", function(e) {
        console.log("changeSelection:", e.getData()[0].getLabel());
      });
      
      manager.setItemSelected(this.__te1, true);
      manager.setItemSelected(this.__te2, false);
      console.log("Selection:", manager.getSelectedItems()[0].getLabel());
    },
    
    __createTreeStructure : function(t)
    {
      // One icon for selected and one for unselected states
      this.__te1 = new qx.ui.tree.TreeFolder("Desktop", "icon/16/places/user-desktop.png", "icon/16/apps/accessories-dictionary.png");
      t.add(this.__te1);

      var te1_1 = new qx.ui.tree.TreeFolder("Files");
      var te1_2 = new qx.ui.tree.TreeFolder("Workspace");
      var te1_3 = new qx.ui.tree.TreeFolder("Network");
      var te1_4 = new qx.ui.tree.TreeFolder("Trash");

      this.__te1.add(te1_1, te1_2, te1_3, te1_4);

      // One icon specified, and used for both selected unselected states
      var te1_2_1 = new qx.ui.tree.TreeFile("Windows (C:)", "icon/16/devices/drive-harddisk.png");
      var te1_2_2 = new qx.ui.tree.TreeFile("Documents (D:)", "icon/16/devices/drive-harddisk.png");

      te1_2.add(te1_2_1, te1_2_2);


      this.__te2 = new qx.ui.tree.TreeFolder("Inbox");

      var te2_1 = new qx.ui.tree.TreeFolder("Presets");
      var te2_2 = new qx.ui.tree.TreeFolder("Sent");
      var te2_3 = new qx.ui.tree.TreeFolder("Trash", "icon/16/places/user-trash.png");
      var te2_4 = new qx.ui.tree.TreeFolder("Data");
      var te2_5 = new qx.ui.tree.TreeFolder("Edit");

      var te2_5_1 = new qx.ui.tree.TreeFolder("Chat");
      var te2_5_2 = new qx.ui.tree.TreeFolder("Pustefix");
      var te2_5_3 = new qx.ui.tree.TreeFolder("TINC");

      var te2_5_3_1 = new qx.ui.tree.TreeFolder("Announce");
      var te2_5_3_2 = new qx.ui.tree.TreeFolder("Devel");

      te2_5_3.add(te2_5_3_1, te2_5_3_2);

      te2_5.add(te2_5_1, te2_5_2, te2_5_3);

      var te2_6 = new qx.ui.tree.TreeFolder("Lists");

      var te2_6_1 = new qx.ui.tree.TreeFolder("Relations");
      var te2_6_2 = new qx.ui.tree.TreeFolder("Company");
      var te2_6_3 = new qx.ui.tree.TreeFolder("Questions");
      var te2_6_4 = new qx.ui.tree.TreeFolder("Internal");
      var te2_6_5 = new qx.ui.tree.TreeFolder("Products");
      var te2_6_6 = new qx.ui.tree.TreeFolder("Press");
      var te2_6_7 = new qx.ui.tree.TreeFolder("Development");
      var te2_6_8 = new qx.ui.tree.TreeFolder("Competition");

      te2_6.add(te2_6_1, te2_6_2, te2_6_3, te2_6_4, te2_6_5, te2_6_6, te2_6_7, te2_6_8);

      var te2_7 = new qx.ui.tree.TreeFolder("Personal");

      var te2_7_1 = new qx.ui.tree.TreeFolder("Bugs");
      var te2_7_2 = new qx.ui.tree.TreeFolder("Family");
      var te2_7_3 = new qx.ui.tree.TreeFolder("Projects");
      var te2_7_4 = new qx.ui.tree.TreeFolder("Holiday");

      te2_7.add(te2_7_1, te2_7_2, te2_7_3, te2_7_4);

      var te2_8 = new qx.ui.tree.TreeFolder("Big");

      for (var i=0;i<50; i++) {
        te2_8.add(new qx.ui.tree.TreeFolder("Item " + i));
      };

      var te2_9 = new qx.ui.tree.TreeFolder("Spam");

      this.__te2.add(te2_1, te2_2, te2_3, te2_4, te2_5, te2_6, te2_7, te2_8, te2_9);

      t.add(this.__te2);
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
