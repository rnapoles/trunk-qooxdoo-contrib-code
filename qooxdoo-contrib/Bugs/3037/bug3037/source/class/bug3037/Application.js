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

      // Commands
      var command1 = new qx.ui.core.Command("Alt+1");
      var command2 = new qx.ui.core.Command("Alt+2");
      var command3 = new qx.ui.core.Command("Alt+3");
      var command4 = new qx.ui.core.Command("Alt+4");
      var command5 = new qx.ui.core.Command("Alt+5");
      var command6 = new qx.ui.core.Command("Alt+6");
      command1.addListener("execute", this.onExecute, this);
      command2.addListener("execute", this.onExecute, this);
      command3.addListener("execute", this.onExecute, this);
      command4.addListener("execute", this.onExecute, this);
      command5.addListener("execute", this.onExecute, this);
      command6.addListener("execute", this.onExecute, this);
      
      // Menu
      var menu = new qx.ui.menu.Menu();
      var edit = new qx.ui.menubar.Button("Edit", null, menu);

      // Menu items
      var button1 = new qx.ui.menu.Button("copy", null);
      var button2 = new qx.ui.menu.Button("paste", null);
      var radioButton1 = new qx.ui.menu.RadioButton("fixed");
      var radioButton2 = new qx.ui.menu.RadioButton("fluid");
      var checkBox1 = new qx.ui.menu.CheckBox("check1");
      var checkBox2 = new qx.ui.menu.CheckBox("check2");
      button1.setCommand(command1);
      button2.setCommand(command2);
      radioButton1.setCommand(command3);
      radioButton2.setCommand(command4);
      checkBox1.setCommand(command5);
      checkBox2.setCommand(command6);
      menu.add(button1);
      menu.add(button2);
      menu.add(radioButton1);
      menu.add(radioButton2);
      menu.add(checkBox1);
      menu.add(checkBox2);

      new qx.ui.form.RadioGroup(radioButton1, radioButton2);
      
      // MenuBar
      var menubar = new qx.ui.menubar.MenuBar;
      menubar.setPaddingRight(10);
      menubar.add(edit);
      this.getRoot().add(menubar, {top:10, left: 10, right: 10});
    },
    
    onExecute : function(e) {
      this.debug(e.getTarget().toString());
    }
  }
});
