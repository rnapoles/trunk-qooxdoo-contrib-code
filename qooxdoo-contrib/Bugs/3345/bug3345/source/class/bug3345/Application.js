/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3345/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3345"
 */
qx.Class.define("bug3345.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      this.getRoot().add(this.createToolBar(), {top: 50});  
    },
    
    createToolBar : function () {
      var tb = new qx.ui.toolbar.ToolBar()
  
      var btn = new qx.ui.toolbar.MenuButton("entry");
      tb.add(btn);
  
      btn.setMenu(this.createEntryMenu());
  
      return tb;
    },

    createEntryMenu : function () {
      var menu = new qx.ui.menu.Menu();
  
      var problem = new qx.ui.menu.Button("problem");
      var noproblem = new qx.ui.menu.Button("noproblem");
  
      problem.addListener("click", function (e) {
        try
        {
          this.debug("problem clicked");
          var win = this.getWindow();
          qx.core.Init.getApplication().getRoot().add(win);
        } catch(e) {
          this.error(e);
        }
      }, this);
  
      noproblem.addListener("click", function (e) {
        try
        {
          this.debug("noproblem clicked");
          var win = this.getWindowNoProblem();
          qx.core.Init.getApplication().getRoot().add(win);
        } catch(e) {
          this.error(e);
        }
      }, this);
  
      menu.add(problem);
      menu.add(noproblem);
      return menu;
    },
    
    getWindow : function () {
      var win = new qx.ui.window.Window("Window Name");
      win.setLayout(new qx.ui.layout.Basic());
      var tree = new qx.ui.tree.Tree().set({
        selectionMode : "one",
        hideRoot : true,
        rootOpenClose : true,
        width: 400,
        height: 300
      });
      win.add(tree);
      win.open();
      return win;     
    },
    
    getWindowNoProblem : function () {
      var win = new qx.ui.window.Window("No Problem");
      win.setLayout(new qx.ui.layout.Basic());
      var atm = new qx.ui.basic.Atom("NoProblem Window");
      win.add(atm);
      win.open();
      return win;
    }
  }
});