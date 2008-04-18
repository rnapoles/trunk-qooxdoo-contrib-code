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
 * Your filesizedemo application
 */
qx.Class.define("filesizedemo.Application",
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
	  //inspector.Inspector.init();
      // Define alias for custom resource path
      qx.io.Alias.getInstance().add("filesizedemo", qx.core.Setting.get("filesizedemo.resourceUri"));

      // Create button
      var button1 = new qx.ui.form.Button("Test filesize formatting", "filesize/image/test.png");

      // Set button location
      button1.setTop(50);
      button1.setLeft(50);

      // Add button to document
      button1.addToDocument();

      // Attach a tooltip
      button1.setToolTip(new qx.ui.popup.ToolTip("A nice tooltip", "icon/32/status/dialog-information.png"));


	  var filesizeFormat1 = new filesize.FilesizeFormat();
	  var ex1 = 500;
	  var ex2 = 5000;
	  var ex2 = 50000;
	  
      // Add an event listener
      button1.addEventListener("execute", function(e) {
        alert(ex1 + " becomes " + filesizeFormat1.format(500));
      });
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
    "filesizedemo.resourceUri" : "./resource"
  }
});
