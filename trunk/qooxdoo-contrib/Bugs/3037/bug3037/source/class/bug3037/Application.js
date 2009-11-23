/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3037/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3037"
 */
qx.Class.define("bug3037.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      // Edit menu
      var editMenu = new qx.ui.menu.Menu();
      var edit = new qx.ui.menubar.Button("Edit", null, editMenu);
      var copyCommand = new qx.ui.core.Command("Alt+1");
      var pasteCommand = new qx.ui.core.Command("Alt+2");
      copyCommand.addListener("execute", this.onExecute, this);
      pasteCommand.addListener("execute", this.onExecute, this);

      var copyButton = new qx.ui.menu.Button("copy",null,copyCommand);
      var pasteButton = new qx.ui.menu.Button("paste",null,pasteCommand);
      editMenu.add(copyButton);
      editMenu.add(pasteButton);
      
      // View menu
      var viewMenu = new qx.ui.menu.Menu();
      var view = new qx.ui.menubar.Button("View", null, viewMenu);
      var viewFixedCommand = new qx.ui.core.Command("Alt+3");
      var viewFluidCommand = new qx.ui.core.Command("Alt+4");
      viewFixedCommand.addListener("execute", this.onExecute, this);
      viewFluidCommand.addListener("execute", this.onExecute, this);
      
      var fixedButton = new qx.ui.menu.RadioButton("fixed");
      var fluidButton = new qx.ui.menu.RadioButton("fluid");
      fixedButton.setCommand(viewFixedCommand);
      fluidButton.setCommand(viewFluidCommand);
      viewMenu.add(fixedButton);
      viewMenu.add(fluidButton);

      new qx.ui.form.RadioGroup(fixedButton, fluidButton);
      
      // Menu
      var menubar = new qx.ui.menubar.MenuBar;
      menubar.setPaddingRight(10);
      menubar.add(edit);
      menubar.add(view);
      this.getRoot().add(menubar, {top:10, left: 10});
    },
    
    onExecute : function(e) {
      this.debug(e.getTarget().toString());
    }
  }
});
