/* ************************************************************************

   Copyright:
     2009 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

#asset(qooxit/*)
************************************************************************ */

/**
 * Implementation of a qx.ui.treevirtual.TreeVirtual widget
 */
qx.Class.define("qooxit.library.ui.treevirtual.TreeVirtual",
{
  extend : qooxit.library.ui.Abstract,
  type   : "singleton",

  members :
  {
    // overridden
    factory : function(parent, name, options)
    {
      // Since the getElementOptions() method isn't yet implemented, kludge it
      // for the moment;
      var options =
        {
          columns : [ "Tree", "Permissions", "Last Accessed" ],
          width   : 400,
          height  : 200
        }

      // Instantiate a tree object
      var tree = new qx.ui.treevirtual.TreeVirtual(options.columns);

      // Set tree attributes
      tree.set(
        {
          width  : options.width,
          height : options.height
        });

      // Add the tree to its parent
      parent.add(tree);
    },

    _snippets :
    {
      resizeBehavior :
      {
        brief : "Resize behavior",

        description :
          "Allow the tree to adjust its width and column sizes based on " +
          "the space available in its container.",

        code : function(tree)
        {
          // Obtain the resize behavior object to manipulate
          var resizeBehavior = tree.getTableColumnModel().getBehavior();

          // Ensure that the tree column remains sufficiently wide
          resizeBehavior.set(0, { width:"1*", minWidth:180  });
        }
      },

      openCloseButtonAlways :
      {
        brief : "Retain open/close button always",

        description :
          "Force the open/close symbol to be displayed even when " +
          "there are no children of a node.",

        code : function(tree)
        {
          // Don't let the open/close symbol disappear when no children
          tree.setAlwaysShowOpenCloseSymbol(true);
        }
      },

      sampleData :
      {
        brief : "Sample data",

        description :
          "Add sample data to the tree.",

        code : function(o)
        {
          //
          // Add a bunch of data to the model, for demonstration.
          //
          var dataModel = o.getDataModel();
          var te1 = dataModel.addBranch(null, "Desktop", true);
          o.nodeSetLabelStyle(te1,
                              "background-color: red; " +
                              "color: white;" +
                              "font-weight: bold;");

          var te1_1;

          dataModel.addBranch(te1, "Files", true);

          te1_1 = dataModel.addBranch(te1, "Workspace", true);
          var te = dataModel.addLeaf(te1_1, "Windows (C:)");
          dataModel.setColumnData(te, 1, "-rwxr-xr-x");
          dataModel.setColumnData(te, 2, "2007-01-30 22:54:03");
          te = dataModel.addLeaf(te1_1, "Documents (D:)");
          dataModel.setColumnData(te, 1, "-rwxr-xr-x");
          dataModel.setColumnData(te, 2, "2007-01-30 22:54:03");

          dataModel.addBranch(te1, "Network", true);

          te = dataModel.addBranch(te1, "Trash", true);
          o.nodeSetCellStyle(te, "background-color: cyan;");

          var te2 = dataModel.addBranch(null, "Inbox", true);

          te = dataModel.addBranch(te2, "Spam", false);

          for (var i = 1; i < 200; i++)
          {
            dataModel.addLeaf(te, "Spam Message #" + i);
          }

          dataModel.addBranch(te2, "Sent", false);
          dataModel.addBranch(te2, "Trash", false);
          dataModel.addBranch(te2, "Data", false);
          dataModel.addBranch(te2, "Edit", false);

          dataModel.setData();
        }
      }
    }
  }
});
