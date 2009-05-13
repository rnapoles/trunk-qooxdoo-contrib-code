/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(databinding/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "databinding"
 */
qx.Class.define("databinding.Application",
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
     * @return {void} 
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

      /*
       * Main layout
       */

      var qxHsplit1 = new qx.ui.splitpane.Pane("horizontal");

      qxHsplit1.setOrientation("horizontal");

      this.getRoot().add(qxHsplit1,
      {
        width  : "100%",
        height : "100%"
      });

      var qxGrow1 = new qx.ui.layout.Grow();
      var _container1 = new qx.ui.container.Composite();
      _container1.setLayout(qxGrow1);
      this._container1 = _container1;
      _container1.setDecorator("main");
      qxHsplit1.add(_container1);

      /*
       * Tree widget
       */
      this.treeWidget = new qx.ui.treevirtual.TreeVirtual([ 'Folders', '#' ], { dataModel : new qcl.databinding.event.model.TreeVirtual() });
      this.treeWidget.setSelectionMode(qx.ui.treevirtual.TreeVirtual.SelectionMode.SINGLE);
      this.treeWidget.setBackgroundColor("white");
      this.treeWidget.setAlwaysShowOpenCloseSymbol(true);
      this.treeWidget.setStatusBarVisible(true);
      this.treeWidget.setShowCellFocusIndicator(true);

      this.treeWidget.getTableColumnModel().getBehavior().set(0,
      {
        width    : "10*",
        minWidth : 200
      });

      this.treeWidget.getTableColumnModel().getBehavior().set(1,
      {
        width    : "1*",
        minWidth : 70
      });

      this._container1.add(this.treeWidget);

      this.treeWidget.setSelectionMode(qx.ui.treevirtual.TreeVirtual.SelectionMode.SINGLE);
      this.treeWidget.setBackgroundColor("white");
      this.treeWidget.setAlwaysShowOpenCloseSymbol(true);
      this.treeWidget.setStatusBarVisible(true);
      this.treeWidget.setShowCellFocusIndicator(false);

      this.treeWidget.getTableColumnModel().getBehavior().set(0,
      {
        width    : "10*",
        minWidth : 200
      });

      this.treeWidget.getTableColumnModel().getBehavior().set(1,
      {
        width    : "1*",
        minWidth : 70
      });

      this.treeWidget.getDataModel().addBranch(null, "Top Node", true);
      this.treeWidget.getDataModel().setData();

      /*
       * Button pane
       */

      this._container1.add(this.treeWidget);

      var qxVbox1 = new qx.ui.layout.VBox(10, null, null);

      var _container2 = new qx.ui.container.Composite();
      _container2.setLayout(qxVbox1);
      this._container2 = _container2;

      _container2.setPadding(10);
      _container2.setDecorator("main");

      qxHsplit1.add(_container2);

      qxVbox1.setSpacing(10);

      /*
       * text field with tree path
       */
      this.textField = new qx.ui.form.TextField();
      _container2.add(this.textField);

      this.treeWidget.addListener("changeSelection", function(e)
      {
        var nodes = e.getData();
        this.textField.setValue(this.treeWidget.getHierarchy(nodes[0].nodeId).join('/'));
        this.buttonRemove.setEnabled(true);
        this.buttonAdd.setEnabled(true);
        this.buttonAddSibling.setEnabled(true);
      },
      this);

      /*
       * Button to clear field
       */
      this.buttonClear = new qx.ui.form.Button("Clear tree");
      _container2.add(this.buttonClear);

      this.buttonClear.addListener("execute", function(e)
      {
        var dataModel = this.treeWidget.getDataModel();
        dataModel.clearData();
      },
      this);

      /*
       * Button to add a child folder
       */
      this.buttonAdd = new qx.ui.form.Button("Add child node");
      this.buttonAdd.set({ enabled : false });
      _container2.add(this.buttonAdd);

      this.buttonAdd.addListener("execute", function(e)
      {
        var selectedNode = this.treeWidget.getSelectedNodes()[0];
        var dataModel = this.treeWidget.getDataModel();
        dataModel.addBranch(selectedNode.nodeId, "Child Node " + (selectedNode.children.length + 1), true);
        dataModel.setData();
      },
      this);

      /*
       * Button to add a sibling folder
       */
      this.buttonAddSibling = new qx.ui.form.Button("Add sibling node");
      _container2.add(this.buttonAddSibling);
      this.buttonAddSibling.setEnabled(false);

      this.buttonAddSibling.addListener("execute", function(e)
      {
        var selectedNode = this.treeWidget.getSelectedNodes()[0];
        var dataModel = this.treeWidget.getDataModel();
        var parentNode = dataModel.getData()[selectedNode.parentNodeId] || 0;
        dataModel.addBranch(parentNode.nodeId, "Sibling Node " + (parentNode.children.length + 1), true);
        dataModel.setData();
      },
      this);

      /*
       * Button to remove a node
       */

      this.buttonRemove = new qx.ui.form.Button("Remove");
      this.buttonRemove.set({ enabled : false });
      _container2.add(this.buttonRemove);

      this.buttonRemove.addListener("execute", function(e)
      {
        var selectedNodes = this.treeWidget.getSelectedNodes();
        var dataModel = this.treeWidget.getDataModel();
        this.treeWidget.getSelectionModel()._clearSelection();

        for (var i=0; i<selectedNodes.length; i++) {
          dataModel.prune(selectedNodes[i].nodeId, true);
        }

        dataModel.setData();
      },
      this);

      /* 
       * event listeners
       */
      this.treeWidget.getDataModel().addListener("change", function(event)
      {
        var data = event.getData();
        this.info("Tree change: " + data.type + ", start:" + data.start + ", end:" + data.end);
      },
      this);

      this.treeWidget.getDataModel().addListener("changeBubble", function(event)
      {
        var data = event.getData();
        var valueChange = [];

        if (data.value && typeof data.value == "object")
        {
          for (var key in data.value)
          {
            if (!data.old || !key in data.old) {
              valueChange.push("New key '" + key + "' with value '" + data.value[key] + "'");
            } else if (data.old[key] != data.value[key]) {
              valueChange.push("Key '" + key + "' changed from '" + data.old[key] + "' to '" + data.value[key] + "'");
            }
          }
        }
        else
        {
          valueChange.push("Changed from '" + data.old + "' to '" + data.value + "'");
        }

        this.info("Tree changeBubble: " + data.name + ":\n" + valueChange.join("\n"));
      },
      this);

      /*
       * Button to add batch data
       */
      this.buttonAddRaw = new qx.ui.form.Button("Add raw data structure");
      _container2.add(this.buttonAddRaw);

      this.buttonAddRaw.addListener("execute", function(e)
      {
        // clone the array
        var treeData = [];
        this.treeData.forEach(function(node) {
          treeData.push(node ? qx.lang.Object.clone(node) : null);
        });
        var selectedNodes = this.treeWidget.getSelectedNodes();
        this.treeWidget.getDataModel().addTreeData(
            selectedNodes.length ? 
                selectedNodes[0].nodeId : 0, treeData);
        this.treeWidget.getDataModel().setData();
      },
      this);

      /*
       * Get data from JSON-RPC backend
       */
      var store = new qcl.databinding.event.store.JsonRpc(
        /* url */ "../services/index.php",
        /* service */ "qcl.Databinding",
        /* method */ null,
        /* marshaler */ new qcl.databinding.event.marshal.TreeVirtual
      );

      var controller = new qcl.databinding.event.controller.TreeVirtual(null, this.treeWidget);
      store.bind("model", controller, "model");

      /*
       * Button to start request
       */
      this.buttonAddJsonRpcData = new qx.ui.form.Button("Get data from jsonrpc");
      _container2.add(this.buttonAddJsonRpcData);

      this.buttonAddJsonRpcData.addListener("execute", function(e)
      {
        /* 
         * get some local variable references for the closure
         */
        var tree = this.treeWidget;
        var cancelButton = this.buttonCancelAddJsonRpcData;
        var startButton = this.buttonAddJsonRpcData;
        
        /*
         * clear the tree
         */
        tree.getDataModel().clearData();

        /*
         * calling getNodeCount() method on server with no 
         * parameters. it returns the number of nodes on the
         * server.
         */
        store.load("getNodeCount", [], function(data)
        {
          var nodeCount = data.nodeCount;

          var counter = 0;
          abortJsonRpcLoad = false;  // global flag

          /*
           * Create a function that can recursively call itself
           * in order to load folder children, as long as there
           * are some left on the server. 
           */
          (function loadTree(data)
          {
            
            /*
             * if the function is called with boolean 'true', this
             * is interpreted as the start of the loading process. 
             */
            if (data === true)
            {
              
              /*
               * do some nice ui stuff
               */
              tree.setAdditionalStatusBarText(" | Tree has " + nodeCount + " nodes ...");
              cancelButton.setEnabled(true);
              startButton.setEnabled(false);
              
              /*
               * call the load method with no arguments which means that
               * the top level nodes are requested.
               */
              store.load("getNodeData", [], loadTree);
            }
            
            /*  
             * After the data has returned from the server, the function is
             * called again, and the data passed to the function.
             * We use a global flag to signal if the loading process should
             * be aborted. The data passed from the server has a 'nodes' and a
             * 'queue' property. The 'nodes' property will be used by the 
             * controller to build the tree in the tree model. The 'queue' property
             * is an array of child ids which still have to be retrieved. If this
             * array is empty, we're done loading.
             */
            else if ( ! abortJsonRpcLoad && data && typeof data == "object" 
                      && data.queue instanceof Array && data.queue.length )
            {
              /*
               * display loading progress
               */
              counter += data.nodes.length;
              var parentNodeId = data.parentNodeId;
              tree.setAdditionalStatusBarText(" | Loaded " + counter + " of " + nodeCount + " nodes...");
              
              /*
               * now call the load method of the store with the queue of node ids that
               * still have to be retrieved. It will pull no more than
               * 10 folders (plus children) at a time to avoid timeouts.
               * You can play with the value of 10 to see whatever
               * works best, given the bandwith and server speed. When
               * done loading, call the loadTree function again with
               * the result. 
               */
              store.load("getNodeData", [ data.queue, 10 ], loadTree );
            }
             
            /*
             * if no data, an error occurred
             */
            else if (data === null)
            {
              tree.setAdditionalStatusBarText(" | *** An error occurred ***");
              cancelButton.setEnabled(false);
              startButton.setEnabled(true);
            }
             
            /*
             * else, we're done.
             */
            else
            {
              tree.setAdditionalStatusBarText(" | Finished loading " + nodeCount + " nodes.");
              cancelButton.setEnabled(false);
              startButton.setEnabled(true);
            }
          })(true);
        });
      },
      this);

      /*
       * Button to cancel the json-rpc requests
       */
      this.buttonCancelAddJsonRpcData = new qx.ui.form.Button("Cancel jsonrpc tree loading");
      _container2.add(this.buttonCancelAddJsonRpcData);
      this.buttonCancelAddJsonRpcData.setEnabled(false);
      this.buttonCancelAddJsonRpcData.addListener("execute", function(e)
      {
        /*
         * set global flag to true which should be available in the closure further up.
         */
        abortJsonRpcLoad = true;
        
        /*
         * button stuff
         */
        this.buttonCancelAddJsonRpcData.setEnabled(false);
        this.buttonAddJsonRpcData.setEnabled(true);
      },
      this);
    },

    /**
     * An example for tree data that is child-centric and not 
     * parent-centric
     */
    treeData : [ /* root node omitted */ null,
    {
      nodeId   : 1,
      label    : "Node (1)",
      bOpened  : true,
      children : [ 2, 3 ]
    },
    {
      nodeId : 2,
      label  : "Node (2)"
    },
    {
      nodeId : 3,
      label  : "Node (3)"
    },
    {
      nodeId   : 4,
      label    : "Node (4)",
      children : [ 5 ]
    },
    {
      nodeId   : 5,
      bOpened  : true,
      label    : "Node (5)",
      children : [ 6 ]
    },
    {
      nodeId   : 6,
      label    : "Node (6)",
      children : [ 7 ]
    },
    {
      nodeId : 7,
      label  : "Node (7)"
    },
    {
      nodeId : 8,
      label  : "Node (8)"
    } ]
  }
});