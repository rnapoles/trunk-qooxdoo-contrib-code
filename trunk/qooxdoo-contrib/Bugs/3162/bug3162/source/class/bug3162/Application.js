/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3162/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3162"
 */
qx.Class.define("bug3162.Application",
{
  extend : qx.application.Inline,

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

      var __isle = new qx.ui.root.Inline(document.getElementById('mainmenu'), true, true);
      var canvas = new qx.ui.layout.Canvas();
      __isle.setLayout(canvas);
      
      toolbar = new qx.ui.toolbar.ToolBar();
          
      // create and add Part 1 to the toolbar
      var part1 = new qx.ui.toolbar.Part();
      var newButton = new qx.ui.toolbar.MenuButton("Menu Example");
      
      var menu = new qx.ui.menu.Menu();
      menu.add(new qx.ui.menu.Button("Sub MenuItem"));
      
      newButton.setMenu(menu);
      
      var copyButton = new qx.ui.toolbar.Button("MenuItem");
      var cutButton = new qx.ui.toolbar.Button("MenuItem");
      var pasteButton = new qx.ui.toolbar.Button("MenuItem");
  
      part1.add(newButton);
      part1.add(new qx.ui.toolbar.Separator());
      part1.add(copyButton);
      part1.add(cutButton);
      part1.add(pasteButton);
      toolbar.add(part1);
  
      __isle.add(toolbar,{left:0,top:0,bottom:0,right:0});  
    }
  }
});
