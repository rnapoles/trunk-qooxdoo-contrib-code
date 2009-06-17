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

      var url = qx.io.Alias.getInstance().resolve("custom/image.rar"); 
      
      var iframe = new qx.ui.embed.Iframe();
      iframe.setFrameName("attachmentdownload_dummy_target");
      iframe.setDimension(0,0);
      iframe.setVisibility(false);
      qx.ui.core.ClientDocument.getInstance().add(iframe);

      var button = new qx.ui.form.Button("load file");
      button.setTop(50);
      button.setLeft(50);
      button.addToDocument();
      
      button.addEventListener("execute", function() {
        iframe.setSource(null);
        iframe.setSource(url);
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
