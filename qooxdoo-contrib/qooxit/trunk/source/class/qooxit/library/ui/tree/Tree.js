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
 * Implementation of a qx.ui.tree.Tree widget
 */
qx.Class.define("qooxit.library.ui.tree.Tree",
{
  extend : qooxit.library.ui.Abstract,
  type   : "singleton",

  members :
  {
    // overridden
    factory : function(options)
    {
      // Return a Tree widget
      var tree = new qx.ui.tree.Tree();

      return tree;
    },

    _snippets :
    {
      sampleData :
      {
        brief : "Sample data",

        description : "Create and open the root; add 10 items to the tree",

        code : function(tree)
        {
          // Create a root folder
          var root = new qx.ui.tree.TreeFolder("Root");

          // Initially show the root's children
          root.setOpen(true);

          // Add some items to the root
          for (var i = 0; i < 5; i++)
          {
            // Instantiate a branch...
            var branch = new qx.ui.tree.TreeFolder("Branch " + (i + 1));

            // ... and add it as a child of the root
            root.add(branch);

            for (var j = 0; j < 3; j++)
            {
              // Instantiate an item...
              var item = new qx.ui.tree.TreeFile("Item " + (j + 1));

              // ... and add it as a child of the current branch
              branch.add(item);
            }
          }

          // Specify which element is the root of the tree
          tree.setRoot(root);
        }
      }
    }
  }
});
