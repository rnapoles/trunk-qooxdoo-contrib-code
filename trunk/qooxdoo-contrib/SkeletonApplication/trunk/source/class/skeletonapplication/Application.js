/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#embed(qx.icontheme/32/status/dialog-information.png)

************************************************************************ */

/**
 * Your custom application
 */
qx.Class.define("skeletonapplication.Application",
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

      // Merge appearance theme of skeleton widget into current appearance theme
      qx.Theme.patch(qx.theme.manager.Appearance.getInstance().getAppearanceTheme(),
        skeletonwidget.theme.classic.Appearance);
    
      // Create button
      var button1 = new skeletonwidget.SimpleButton("First Button");

      // Set button location
      button1.setTop(50);
      button1.setLeft(50);

      // Add button to document
      button1.addToDocument();

      // Attach a tooltip
      button1.setToolTip(new qx.ui.popup.ToolTip("A nice tooltip", "icon/32/status/dialog-information.png"));

      // Add an event listener
      button1.addEventListener("execute", function(e) {
        alert("Hello World!");
      });
    },


    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    close : function(e)
    {
      this.base(arguments);

      // Prompt user
      // return "qooxdoo application: Do you really want to close the application?";
    },


    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    terminate : function(e) {
      this.base(arguments);
    }
  }
  
});
