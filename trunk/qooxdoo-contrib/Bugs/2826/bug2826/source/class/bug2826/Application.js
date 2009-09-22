/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2826/*)
#asset(qx/icon/Tango/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2826"
 */
qx.Class.define("bug2826.Application",
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

      var optionMenu = new qx.ui.menu.Menu();
      optionMenu.add(new qx.ui.menu.RadioButton("Option 1"));
      optionMenu.add(new qx.ui.menu.RadioButton("Option 2"));
      optionMenu.add(new qx.ui.menu.RadioButton("Option 3"));

      var actionMenu = new qx.ui.menu.Menu();
      actionMenu.add(new qx.ui.menu.RadioButton("Action 1"));
      actionMenu.add(new qx.ui.menu.RadioButton("Action 2"));
      actionMenu.add(new qx.ui.menu.RadioButton("Action 3"));

      var groupOptions = new qx.ui.form.RadioGroup;
      groupOptions.add.apply(groupOptions, optionMenu.getChildren());

      var groupActions = new qx.ui.form.RadioGroup;
      groupActions.add.apply(groupActions, actionMenu.getChildren());

      var menu = new qx.ui.menu.Menu();
      menu.add(new qx.ui.menu.Button("Undo", "icon/16/actions/edit-undo.png").set({enabled: false}));
      menu.add(new qx.ui.menu.Button("Redo", "icon/16/actions/edit-redo.png"));
      menu.add(new qx.ui.menu.Button("Cut", "icon/16/actions/edit-cut.png"));
      menu.add(new qx.ui.menu.Button("Copy", "icon/16/actions/edit-copy.png"));
      menu.add(new qx.ui.menu.Button("Paste", "icon/16/actions/edit-paste.png"));
      menu.add(new qx.ui.menu.Button("Options", "icon/16/actions/system-search.png"));
      menu.add(new qx.ui.menu.Button("Actions", "icon/16/actions/contact-new.png"));
      menu.add(new qx.ui.menu.Button("Print", "icon/16/actions/document-print.png"));

      var button = new qx.ui.form.MenuButton("Menu Button", "icon/22/apps/preferences-users.png", menu);
      
      var testbutton = new qx.ui.form.Button("test");
      testbutton.addListener("execute", function(e) {
        button.open(true);
      });
      
      var doc = this.getRoot();
      doc.add(testbutton, {left: 100, top: 50});
      doc.add(button, {left: 100, top: 150});
    }
  }
});
