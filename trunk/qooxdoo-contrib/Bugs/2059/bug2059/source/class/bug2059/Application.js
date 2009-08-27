/* ************************************************************************

#asset(qx/icon/Tango/16/actions/edit-cut.png)
#asset(qx/icon/Tango/16/actions/edit-copy.png)
#asset(qx/icon/Tango/16/actions/edit-paste.png)

************************************************************************ */

qx.Class.define("bug2059.Application",
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

      var list = new qx.ui.form.List;
      list.setContextMenu(this.getContextMenu());

      for (var i=0; i<20; i++) {
        list.add(new qx.ui.form.ListItem("Item " + i));
      }

      var button = new qx.ui.form.Button("Block root");
      
      var doc = this.getRoot();
      doc.add(list, {left: 100, top: 50});
      doc.add(button, {left: 250, top: 50})
      
      doc.setBlockerColor("red");
      doc.setBlockerOpacity(0.3);
      
      button.addListener("execute", function() {
        doc.block();
        
        qx.event.Timer.once(function() {
          doc.unblock();
        }, 2000);
      });
    },

    getContextMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var cutButton = new qx.ui.menu.Button("Cut", "icon/16/actions/edit-cut.png");
      var copyButton = new qx.ui.menu.Button("Copy", "icon/16/actions/edit-copy.png");
      var pasteButton = new qx.ui.menu.Button("Paste", "icon/16/actions/edit-paste.png");

      menu.add(cutButton);
      menu.add(copyButton);
      menu.add(pasteButton);
      
      menu.setAppearance("myContextMenu");
      menu.syncAppearance();

      return menu;
    }
  }
});
