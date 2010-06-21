/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(virtualdata.demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "virtualdata"
 */
qx.Class.define("virtualdata.demo.Application",
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
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      // We want to use some of the high-level node operation convenience
      // methods rather than manually digging into the TreeVirtual helper
      // classes.  Include the mixin that provides them.
      qx.Class.include(qx.ui.treevirtual.TreeVirtual,
                       qx.ui.treevirtual.MNode);
      // Use an HBox to hold the tree and the groupbox
      var hBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(20));
      this.getRoot().add(hBox, { edge : 30 });

      // tree
      var tree = new qx.ui.treevirtual.TreeVirtual(
          [
            "Tree",
            "Permissions",
            "Last Accessed"
          ],
          {
            dataModel : new virtualdata.model.SimpleTreeDataModel()
          }
      );
      tree.set({
        width  : 350,
        showCellFocusIndicator : false
      });
      
      tree.getSelectionModel().setSelectionMode(qx.ui.treevirtual.TreeVirtual.SelectionMode.MULTIPLE_INTERVAL);


      // Obtain the resize behavior object to manipulate
      var resizeBehavior = tree.getTableColumnModel().getBehavior();

      // Ensure that the tree column remains sufficiently wide
      resizeBehavior.set(0, { width:"1*", minWidth:150  });

      hBox.add(tree);

      // tree data model
      var dataModel = tree.getDataModel();

      var te1 = dataModel.addBranch(null, "Desktop", true);
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

      var te2 = dataModel.addBranch(null, "Inbox", true);

      te = dataModel.addBranch(te2, "Spam", false);

      for (var i = 1; i < 3000; i++)
      {
        dataModel.addLeaf(te, "Spam Message #" + i);
      }

      dataModel.addBranch(te2, "Sent", false);
      dataModel.addBranch(te2, "Trash", false);
      dataModel.addBranch(te2, "Data", false);
      dataModel.addBranch(te2, "Edit", false);

      dataModel.setData();

      var commandFrame = new qx.ui.groupbox.GroupBox("Binding two trees");
      commandFrame.setLayout(new qx.ui.layout.VBox(5));
      hBox.add(commandFrame);

      var buttonRemove = new qx.ui.form.Button("Remove node");
      //buttonRemove.set({ enabled: false });
      commandFrame.add(buttonRemove);
      buttonRemove.addListener(
        "execute",
        function(e)
        {
          var selectedNodes = tree.getSelectedNodes();
          for (var i = 0; i < selectedNodes.length; i++)
          {
            dataModel.prune(selectedNodes[i].nodeId, true);
          }
          tree.resetSelection();
          dataModel.setData();
        });
        
      var buttonAdd = new qx.ui.form.Button("Add node");
      //buttonAdd.set({ enabled: false });
      commandFrame.add(buttonAdd);
      var nodeCounter = 1;
      buttonAdd.addListener(
        "execute",
        function(e)
        {
          var selectedNodes = tree.getSelectedNodes();
          if ( selectedNodes.length )
          {
            var newNode = dataModel.addLeaf( selectedNodes[0].nodeId, "New Node #" + nodeCounter++ );
            dataModel.setData();
          }
        });   
        
      var label = new qx.ui.basic.Label(
        "<p>Select the 'workspace' folder in the left tree and click on 'Add node' repeatedly." +
        "You should see the added nodes appear immediately in the right tree.</p> " +
        "<p>Similarly, if you remove a node in the left tree, it should disappear in the right tree."+
        "This way, you can keep several instances of a tree widget in one application in sync (for example, in a filesystem browser).</p>"
      );
      label.set({
        width : 150,
        rich  : true
      });
      
      commandFrame.add( label );
                    
      ////// Databinding the second tree
                    
      var tree2 = new qx.ui.treevirtual.TreeVirtual(
          [
            "Tree",
            "Permissions",
            "Last Accessed"
          ],
          {
            dataModel : new virtualdata.model.SimpleTreeDataModel()
          }
      );
      tree2.set(
        {
          width  : 350
        });        
      tree2.setAlwaysShowOpenCloseSymbol(true);

      // Obtain the resize behavior object to manipulate
      var resizeBehavior = tree2.getTableColumnModel().getBehavior();

      // Ensure that the tree column remains sufficiently wide
      resizeBehavior.set(0, { width:"1*", minWidth:150  });

      hBox.add(tree2);
      
      tree.getDataModel().bind("model",tree2.getDataModel(),"model");
      tree2.getDataModel().setData();
    }
  }
});
