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

qx.Class.define("custom.Application",
{
  extend : qx.application.Gui,

  members :
  {
    main : function()
    {
      this.base(arguments);

      qx.io.Alias.getInstance().add("custom", qx.core.Setting.get("custom.resourceUri"));

      var comboBox = new qx.ui.form.ComboBox()
      comboBox.setTop(50);
      comboBox.setLeft(50);
      comboBox.addToDocument();

      for (var i = 0; i < 10; i++) 
      {
        var listItem = new qx.ui.form.ListItem("ListItem"+ i);
        comboBox.add(listItem);  
        
        if (i == 7) {
          listItem.setEnabled(false);
        }
        
        if (i % 3 == 0) {
          listItem.setDisplay(false);
        }
      }
    }
  },

  settings : {
    "custom.resourceUri" : "./resource"
  }
});
