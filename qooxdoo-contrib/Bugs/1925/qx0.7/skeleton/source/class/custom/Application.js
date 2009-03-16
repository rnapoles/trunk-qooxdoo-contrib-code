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

      var testMenu = new qx.ui.form.ComboBox();
      var testItem = new qx.ui.form.ListItem(this.tr("test"));
      testMenu.add(testItem);
      testMenu.addToDocument();
      qx.locale.Manager.getInstance().setLocale("de");
  
      /*
      var testMenu = new qx.ui.form.ComboBox();
      var testItem = new qx.ui.form.ListItem(this.tr("test"));
      testMenu.add(testItem);
      testMenu.addToDocument();
      testMenu.setSelected(testItem);
      qx.locale.Manager.getInstance().setLocale("de");
      */
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
