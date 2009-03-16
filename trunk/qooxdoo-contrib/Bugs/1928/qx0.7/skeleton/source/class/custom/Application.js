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

      qx.io.Alias.getInstance().add("custom", qx.core.Setting.get("custom.resourceUri"));

      var textfield = new qx.ui.form.TextField();
      textfield.setTop(50);
      textfield.setLeft(50);
      textfield.addToDocument();

      var win = new qx.ui.window.Window("Window");
      win.setModal(true);
      win.setTop(150);
      win.setLeft(150);
      win.addToDocument();
      
      textfield.addEventListener("keypress", function(e) {
        if (e.getKeyIdentifier() == "Enter") {
          win.open()
        }
      }, this);
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
