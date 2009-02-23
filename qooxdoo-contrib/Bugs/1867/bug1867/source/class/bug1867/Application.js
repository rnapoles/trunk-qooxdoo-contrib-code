/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1867/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1867"
 */
qx.Class.define("bug1867.Application",
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

      var tree = new qx.ui.tree.Tree();
      
      var firstFolder = new qx.ui.tree.TreeFolder("First Folder");
      tree.setRoot(firstFolder);
      
      for (var i = 0; i < 10; i++) {
        var element = new qx.ui.tree.TreeFile("File " + i);
        firstFolder.add(element);
      }

      var doc = this.getRoot();
      doc.add(tree, {left: 100, top: 50});

      tree.addListener("changeSelection", function(e) {
        this.debug(e.getData());
      }, this);
    }
  }
});
