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
 * Main application class for qooxit
 */
qx.Class.define("qooxit.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // We want to use some of the high-level node operation convenience
      // methods rather than manually digging into the TreeVirtual helper
      // classes.  Include the mixin that provides them.
      qx.Class.include(qx.ui.treevirtual.TreeVirtual,
                       qx.ui.treevirtual.MNode);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;

        // support additional cross-browser console. Press F7 to toggle
        // visibility
        qx.log.appender.Console;
      }

      // Create a splitpane as the main workspace
      var horizSplit = new qx.ui.splitpane.Pane("horizontal");
      this.getRoot().add(horizSplit, { edge : 0 });

      // Create a VBox for the left pane
      var leftPane = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      horizSplit.add(leftPane, 1);

      // Create a VBox for the right pane
      var rightPane = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      horizSplit.add(rightPane, 2);

      //
      // The right pane shows the generated source code, or the generated page.
      // Add a tabview to select which.
      //
      var tabView = new qx.ui.tabview.TabView();
      rightPane.add(tabView, { flex : 1 } );

      // Create the Live page
      var pageLive = new qx.ui.tabview.Page(this.tr("Live Application View"));
      pageLive.setLayout(new qx.ui.layout.VBox());
      tabView.add(pageLive);

      // Create the Source page
      var pageSource = new qx.ui.tabview.Page(this.tr("Source View"));
      pageSource.setLayout(new qx.ui.layout.VBox());
      tabView.add(pageSource);


      //
      // The left pane shows two trees. The top is the available widgets; the
      // bottom is  the hierarchical representation of the application being
      // built.
      //

      // Add a top label
      var label = new qx.ui.basic.Label();
      label.setRich(true);
      label.setValue(this.tr("Available Layouts & Widgets ") +
                     "<span style='color:blue; font-weight:bold;'>" +
                     this.tr("(drag from this tree)") +
                     "</span>");
      leftPane.add(label);

      // Add the available layouts and widgets tree
      var availableTree = new qx.ui.tree.Tree();
      leftPane.add(availableTree, { flex : 2 } );

      // Create the (hidden) root of the available layouts and widgets tree
      var availableRoot = new qx.ui.tree.TreeFolder("Root");
      availableRoot.setOpen(true);
      availableTree.setRoot(availableRoot);
      availableTree.setHideRoot(true);

      // Add a top label
      label = new qx.ui.basic.Label();
      label.setRich(true);
      label.setValue(this.tr("Application Layout & Widget Hierarchy ") +
                     "<span style='color:blue; font-weight:bold;'>" +
                     this.tr("(drag to or within this tree, or right-click)") +
                     "</span>");
      leftPane.add(label);

      // Add the application hierarchy tree
      var applicationTree = new qx.ui.tree.Tree();
      applicationTree.setDroppable(true);

      applicationTree.addListener(
        "drop",
        function(e)
        {
          var factory = e.getData("qooxit/available");
          var orig = e.getOriginalTarget();
          var folder = orig.getLayoutParent();
          var related = e.getRelatedTarget();
          var label = related.getLabel();

          this.debug("data=" + factory +
                     ", related=" + related + 
                     ", source label=" + related.getLabel() +
                     ", dropTarget=" + e.getTarget() +
                     ", origTarget=" + folder);
          
          // Add a node to the Application tree
          folder.add(new qx.ui.tree.TreeFile(label));

          // Add the node to the window by calling its factory
          pageLive.add(factory(label));

          // Clear the selection from the source and destination trees
          folder.getTree().resetSelection();
          related.getTree().resetSelection();
        },
        this);

      leftPane.add(applicationTree, { flex : 1 } );

      // Create the (hidden) root of the application hierarchy tree
      var applicationRoot =
        new qx.ui.tree.TreeFolder(this.tr("Application Root"));
      applicationRoot.setOpen(true);
      applicationTree.setRoot(applicationRoot);

      // Allow the defer sections to run, so that library classes can
      // register themselves, then populate the tree of available classes.
      var timer = qx.util.TimerManager.getInstance();
      timer.start(function(root, timerId)
                  {
                    this.populateAvailable(root);
                  },
                  0,
                  this,
                  availableRoot,
                  100);
    },

    populateAvailable : function(root)
    {
      // Add all registered classes
      var list = qooxit.library.Library.getClasses();
      for (var i = 0; i < list.length; i++)
      {
        this.addClass(root, list[i]);
      }
    },

    /**
     * Add a class to the Available menu.
     *
     * @param root {qx.ui.tree.AbstractTreeItem}
     *   The root of the AVailable menu tree
     *
     * @param clazz {qooxit.library.ui.Abstract}
     *   The class being added to the menu.
     *
     * @return {Void}
     */
    addClass : function(root, clazz)
    {
      // Instantiate the specified class
      var classInstance = clazz.getInstance();

      // Ascertain the menu for this class
      var menuHierarchy = classInstance.getMenuHierarchy();

      // Find or create this menu item and get the tree parent to insert our
      // new tree item.
      var treeItem = this.findMenuItem(root, menuHierarchy);

      // This item has to be draggable to be dropped into the applciation view
      treeItem.setDraggable(true);

      // Allow the item to be copied
      treeItem.addListener("dragstart",
                           function(e)
                           {
                             e.addAction("copy");
                             e.addType("qooxit/available");
                           });

      // If it is dropped, provide the factory for adding it to the application
      // tree.
      treeItem.addListener("droprequest",
                           function(e)
                           {
                             e.addData("qooxit/available",
                                       classInstance.factory);
                           });
    },

    /**
     * Recursively find the menu item in the tree which is associated with the
     * provided hierarchy. If the item is not found, it is created.
     *
     * @param root {qx.ui.tree.AbstractTreeItem}
     *   The current node of the tree we are searching
     *
     * @param menuHierarchy {Array}
     *   A list of remaining hierarchy elements to be located.
     *   NOTE: This function is destructive of the array. It shifts items off
     *         the beginning of the array as they are found.
     *
     * @return {qx.ui.tree.AbstractTreeItem}
     *   The found or newly-created folder.
     */
    findMenuItem : function(root, menuHierarchy)
    {
      // Get the non-recursive list of items in the tree at this level
      var items = root.getItems(false, true);

      // Get the current name we're looking for.
      var current = menuHierarchy.shift();

      // For each item in the tree...
      for (var item = 0; item < items.length; item++)
      {
        // ... does it match our current item in the hierarchy?
        if (items[item].getLabel() == current)
        {
          // Yup. Are there any more?
          if (menuHierarchy.length == 0)
          {
            // Nope. The requested hierarchy was found and terminates here.
            return items[item];
          }

          // There are more. Call recursively.
          return this.findMenuItem(items[item], menuHierarchy);
        }
      }

      // This item wasn't here. Put it back on the hierarchy array
      menuHierarchy.unshift(current);

      // Recursively create the rest of the hierarchy
      while (menuHierarchy.length > 0)
      {
        // Get the item to be added
        current = menuHierarchy.shift();

        // Create a new folder for this level of the hierarchy
        var folder = new qx.ui.tree.TreeFolder(current);

        // The folder is open by default
        folder.setOpen(true)

        // Add it to its parent
        root.add(folder);

        // The new parent is the just-added folder
        root = folder;
      }

      // The last item we added was the one we were looking for.
      return folder;
    }
  }

/*
    _addAvailableContainers : function(root)
    {

      // Add some containers
      this.__addItem(layoutFolder,
                     "Vertical Box (qx.ui.layout.VBox)",
                     {
                       factory : function(param)
                       {
                         return new qx.ui.container.Composite(
                           new qx.ui.layout.VBox());
                       }
                     });
      this.__addItem(layoutFolder,
                     "Horizontal Box (qx.ui.layout.HBox)",
                     {
                       factory : function(param)
                       {
                         return new qx.ui.container.Composite(
                           new qx.ui.layout.HBox());
                       }
                     });
      this.__addItem(layoutFolder,
                     "Grid (qx.ui.layout.Grid)",
                     {
                       factory : function(param)
                       {
                         return new qx.ui.container.Composite(
                           new qx.ui.layout.Grid());
                       }
                     });
    },

    _addAvailableWidgets : function(widgetFolder)
    {
      this.__addItem(widgetFolder,
                     "Label (qx.ui.basic.Label)",
                     {
                       factory : function(param)
                       {
                         return new qx.ui.basic.Label("Hello world!");
                       }
                     });
      this.__addItem(widgetFolder,
                     "Tree (qx.ui.tree.Tree)",
                     {
                       factory : function(param)
                       {
                         var tree = new qx.ui.tree.Tree(param);

                         var root = new qx.ui.tree.TreeFolder("Root");
                         root.setOpen(true);
                         for (var i = 0; i < 10; i++)
                         {
                           var item = new qx.ui.tree.TreeFile("Item " + i);
                           root.add(item);
                         }
                         tree.setRoot(root);
                         return tree;
                       }
                     });

      this.__addItem(
        widgetFolder,
        "Tree (qx.ui.treevirtual.TreeVirtual)",
        {
          factory : function(param)
          {
            // tree
            var tree = new qx.ui.treevirtual.TreeVirtual(
              [
                "Tree",
                "Permissions",
                "Last Accessed"
              ]);
            tree.set(
              {
                width  : 400
              });
            tree.setAlwaysShowOpenCloseSymbol(true);
            
            // Obtain the resize behavior object to manipulate
            var resizeBehavior = tree.getTableColumnModel().getBehavior();
            
            // Ensure that the tree column remains sufficiently wide
            resizeBehavior.set(0, { width:"1*", minWidth:180  });
            
            // tree data model
            var dataModel = tree.getDataModel();
            
            var te1 = dataModel.addBranch(null, "Desktop", true);
            tree.nodeSetLabelStyle(te1,
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
            tree.nodeSetCellStyle(te, "background-color: cyan;");
            
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

            return tree;
          }
        });
      this.__addItem(
        widgetFolder,
        "Table (qx.ui.table.Table)",
        {
          factory : function(param)
          {
            // table model
            var tableModel = new qx.ui.table.model.Simple();
            tableModel.setColumns([ "ID", "Number 1", "Number 2", "Image" ]);
            
            var image = [
              "icon/16/actions/dialog-ok.png",
              "icon/16/actions/dialog-cancel.png"
            ];
            
            var rowData = [];
            for (var row = 0; row < 100; row++)
            {
              var x = Math.random() * 1000;
              rowData.push([ row, x, x, image[Math.floor(x) % 2] ]);
            }
            tableModel.setData(rowData);
            tableModel.setColumnEditable(1, true);
            tableModel.setColumnEditable(2, true);
            
            // table
            var table = new qx.ui.table.Table(tableModel);
            
            table.setMetaColumnCounts([1, -1]);
            var selectionMode =
              qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION;
            table.getSelectionModel().setSelectionMode(selectionMode);
            
            var newRenderer =
              new qx.ui.table.cellrenderer.Conditional("right", "", "", "");

            newRenderer.addNumericCondition(">", 0,   null,
                                            "#FF0000", null, null);
            newRenderer.addNumericCondition(">", 50,  null,
                                            "#EE0011", null, null);
            newRenderer.addNumericCondition(">", 100, null,
                                            "#DD0022", null, null);
            newRenderer.addNumericCondition(">", 150, null,
                                            "#CC0033", null, null);
            newRenderer.addNumericCondition(">", 200, null,
                                            "#BB0044", null, null);
            newRenderer.addNumericCondition(">", 250, null,
                                            "#AA0055", null, null);
            newRenderer.addNumericCondition(">", 300, null,
                                            "#990066", null, null);
            newRenderer.addNumericCondition(">", 350, null,
                                            "#880077", null, null);
            newRenderer.addNumericCondition(">", 400, null,
                                            "#770088", null, null);
            newRenderer.addNumericCondition(">", 450, null,
                                            "#660099", null, null);
            newRenderer.addNumericCondition(">", 500, null,
                                            "#5500AA", null, null);
            newRenderer.addNumericCondition(">", 550, null,
                                            "#4400BB", null, null);
            newRenderer.addNumericCondition(">", 600, null,
                                            "#3300CC", null, null);
            newRenderer.addNumericCondition(">", 650, null,
                                            "#2200DD", null, null);
            newRenderer.addNumericCondition(">", 700, null,
                                            "#1100EE", null, null);
            newRenderer.addNumericCondition(">", 750, null,
                                            "#0000FF", null, null);
            newRenderer.addNumericCondition(">", 800, null,
                                            "#0033FF", null, null);
            newRenderer.addNumericCondition(">", 850, null,
                                            "#0066FF", null, null);
            newRenderer.addNumericCondition(">", 900, null,
                                            "#0099FF", null, null);
            newRenderer.addNumericCondition(">", 950, "center",
                                            "#00CCFF", null, "bold");

            table.getTableColumnModel().setDataCellRenderer(2, newRenderer);
            
            var renderer = new qx.ui.table.cellrenderer.Image(19, 16);
            table.getTableColumnModel().setDataCellRenderer(3, renderer);
            
            return table;
          }
        });
    }
*/
});
