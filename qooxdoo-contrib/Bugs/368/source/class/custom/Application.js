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


      var container = new qx.ui.layout.CanvasLayout().set({
        border: "black",
        width: 200,
        height: 100,
        left: 300,
        top: 10,
        overflow: "hidden"
      });
      
      var input1 = new qx.ui.form.TextField().set({
        left: 10,
        top: 10,
        width: 100
      });      
      container.add(input1);

      var input2 = new qx.ui.form.TextField().set({
        left: 250,
        top: 10,
        width: 100
      });      
      container.add(input2);
      
      container.addToDocument();


      // Create button
      var button1 = new qx.ui.form.Button("block");

      // Set button location
      button1.setTop(50);
      button1.setLeft(50);

      // Add button to document
      button1.addToDocument();

      // Add an event listener
      button1.addEventListener("execute", function(e) {
        qx.ui.core.Widget.disableScrolling(container);
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
    "custom.resourceUri" : "./resource"
  }
});
