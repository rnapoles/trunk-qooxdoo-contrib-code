/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(databinding/*)

************************************************************************ */

/**
 * 
 */
qx.Class.define("databinding.TreeVirtual",
{
  extend : qx.core.Object,
  
  /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

  members :
  {
     
    createPage : function()
    {

      var page1 = new qx.ui.tabview.Page("Tree");
      page1.setLayout(new qx.ui.layout.VBox());
      
      var qxHsplit1 = new qx.ui.splitpane.Pane("horizontal");
      qxHsplit1.setOrientation("horizontal");
      page1.add(qxHsplit1)
      
      var qxGrow1 = new qx.ui.layout.Grow();
      var _container1 = new qx.ui.container.Composite(qxGrow1);
      this._container1 = _container1;
      _container1.setDecorator("main");
      qxHsplit1.add(_container1);

      // ******************************************************
      // Tree widget
      // ******************************************************
      
      this.treeWidget = new qx.ui.treevirtual.TreeVirtual([ 'Folders', '#' ], { dataModel : new qcl.databinding.event.model.TreeVirtual() });
      this.treeWidget.setSelectionMode(qx.ui.treevirtual.TreeVirtual.SelectionMode.SINGLE);
      this.treeWidget.setBackgroundColor("white");
      this.treeWidget.setAlwaysShowOpenCloseSymbol(false);
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
      
      // ******************************************************
      // Button pane
      // ******************************************************
      
      this._container1.add(this.treeWidget);
      var qxVbox1 = new qx.ui.layout.VBox(10, null, null);
      var _container2 = new qx.ui.container.Composite();
      _container2.setLayout(qxVbox1);
      this._container2 = _container2;

      _container2.setPadding(10);
      _container2.setDecorator("main");

      qxHsplit1.add(_container2);

      qxVbox1.setSpacing(10);
      
      _container2.add( new qx.ui.basic.Label("TreeVirtual Databinding with a JSONRPC backend.") );
      
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
        this.buttonRename.setEnabled(true);
      },
      this);
      
      // ******************************************************
      // Configure JSON-RPC store
      // ******************************************************
      
      
      var store = new qcl.databinding.event.store.JsonRpc(
        /* url */ "../services/index.php",
        /* service */ "qcl.TreeData",
        /* method */ null,
        /* marshaler */ new qcl.databinding.event.marshal.TreeVirtual
      );

      var controller = new qcl.databinding.event.controller.TreeVirtual(null, this.treeWidget);
      
      /*
       * bind the store's model to the controller's model
       */
      store.bind("model", controller, "model");
      
      /*
       * bind the store's data events to the controller and
       * vice versa
       */
      store.bind ("dataEvent", controller, "dataEvent" );
      controller.bind( "dataEvent", store, "dataEvent" )
      
      /*
       * bind the server-supplied status text to the tree's status bar.
       */
      store.bind("model.statusText", this.treeWidget, "additionalStatusBarText", {
        converter : function( text ){
          return " | " + text;
        }
      } );      
      
      // ******************************************
      // Create synchronized tree
      // ******************************************

      _container2.add( new qx.ui.basic.Label("1. Create one or more synchronized trees") );
      this.buttonCreateSynchronizedTree = new qx.ui.form.Button("Create cloned and synchronized tree");
      _container2.add( this.buttonCreateSynchronizedTree );
      this.buttonCreateSynchronizedTree.addListener("execute", function(e)
      {
        
        var w2 = new qx.ui.window.Window("Synchronized Tree");
        w2.setLayout( new qx.ui.layout.Grow() );
        w2.set( { width:300, height:300 } );
        w2.moveTo( Math.floor(Math.random()*300), Math.floor( Math.random()*300) );
        w2.open();

        var tree2 = new qx.ui.treevirtual.TreeVirtual(
            [ 'Folders'], 
            { dataModel : new qcl.databinding.event.model.TreeVirtual() }
        );
        
        tree2.setSelectionMode(qx.ui.treevirtual.TreeVirtual.SelectionMode.SINGLE);
        tree2.setBackgroundColor("white");
        tree2.setAlwaysShowOpenCloseSymbol(false);
        tree2.setStatusBarVisible(true);
        tree2.setShowCellFocusIndicator(false);
        w2.add( tree2 );
        
        var controller2 = new qcl.databinding.event.controller.TreeVirtual( null, tree2 );
        
        /*
         * we need to copy the initial data from the first tree by jsonfying it.
         */
        tree2.getDataModel().copyData( this.treeWidget.getDataModel().getData() );
        
        /*
         * bind status text to window caption
         */
        store.bind( "model.statusText", w2, "caption" );
        
        /*
         * bind store model to controller
         */
        store.bind( "model", controller2, "model" );
        
        /*
         * bind the store's data events to the controller and
         * vice versa
         */
        controller2.bind( "dataEvent", store, "dataEvent" );      
        store.bind ("dataEvent", controller2, "dataEvent" );
        

      },
      this);      
      
      
      // ******************************************
      
      _container2.add( new qx.ui.basic.Label("2. Retrieve tree data (Stop whenever you have enough)") );



      
      /*
       * Button to start request
       */
      this.buttonAddJsonRpcData = new qx.ui.form.Button("START");
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
         * clear all bound trees
         */
        store.setModel(null);

        /*
         * calling getNodeCount() method on server with no 
         * parameters. it returns the number of nodes on the
         * server.
         */
        store.load("getNodeCount", [], function(data)
        {
          var nodeCount = data.nodeCount;
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
      this.buttonCancelAddJsonRpcData = new qx.ui.form.Button("STOP");
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
      
      
      // ******************************************************
 
      
      _container2.add( new qx.ui.basic.Label("3. Manipulate the main tree to see the synchronization of changes") );
      
      /*
       * Button to add a child folder
       */
      this.buttonAdd = new qx.ui.form.Button("Add child node");
      _container2.add(this.buttonAdd);

      this.buttonAdd.addListener("execute", function(e)
      {
        if ( this.treeWidget.getSelectedNodes().length )
        {
          var selectedNode = this.treeWidget.getSelectedNodes()[0];
        }
        else
        {
          var selectedNode = this.treeWidget.getDataModel().getData()[0];
        }
        
        var dataModel = this.treeWidget.getDataModel();
        
        var nodeId = dataModel.addBranch(
            selectedNode.nodeId, 
            "Child Node " + (selectedNode.children.length + 1),
            true
        );

        /*
         * fake server node ids
         */
        var node = dataModel.getNode( nodeId );
        dataModel.setServerNodeId( nodeId, nodeId );
        dataModel.setServerParentNodeId( nodeId, node.parentNodeId );
        dataModel.mapServerIdToClientId( nodeId, nodeId );
        dataModel.mapServerIdToClientId( node.parentNodeId, node.parentNodeId );        
        
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
        var nodeId = dataModel.addBranch(
              parentNode.nodeId, 
              "Sibling Node " + (parentNode.children.length + 1), 
        true);
        
        /*
         * fake server node ids
         */
        var node = dataModel.getNode( nodeId );
        dataModel.setServerNodeId( nodeId, nodeId );
        dataModel.setServerParentNodeId( nodeId, node.parentNodeId );
        dataModel.mapServerIdToClientId( nodeId, nodeId );
        dataModel.mapServerIdToClientId( node.parentNodeId, node.parentNodeId );
        
        dataModel.setData();
      },
      this);

      /*
       * Button to remove a node
       */
      this.buttonRemove = new qx.ui.form.Button("Prune node");
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
       * Button to rename a node
       */
      this.buttonRename = new qx.ui.form.Button("Rename node");
      this.buttonRename.set({ enabled : false });
      _container2.add(this.buttonRename);

      this.buttonRename.addListener("execute", function(e)
      {
        var node = this.treeWidget.getSelectedNodes()[0];
        if ( ! node ) return;
        var dataModel = this.treeWidget.getDataModel();
        var name = prompt( "New name of the node", node.label );
        dataModel.setState( node, { label : name } );
        dataModel.setData();
      },
      this);      
      
      /*
       * Button to prune tree
       */
      this.buttonPrune = new qx.ui.form.Button("Prune root node");
      _container2.add(this.buttonPrune);

      this.buttonPrune.addListener("execute", function(e)
      {
        this.treeWidget.getDataModel().prune(0);
        this.treeWidget.getDataModel().setData();
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

      // ******************************************************
      // Cross-window tree synchronization
      // ******************************************************
 
      _container2.add( new qx.ui.basic.Label("4. Synchronize with other browser windows (works only with 3.,not with 2.)") );
      var openNewWindowButton = new qx.ui.form.Button("Open new browser window.");
      _container2.add( openNewWindowButton );
      openNewWindowButton.addListener("execute",function(){
        window.open(document.location);
      });
     
      var serverSyncCheckBox = new qx.ui.form.ToggleButton( "Use message transport, polling in intervals of ... seconds:");
      _container2.add(  serverSyncCheckBox );
      serverSyncCheckBox.bind("checked",store,"useEventTransport");
      
      var spinner = new qx.ui.form.Spinner( 3,3,10);
      _container2.add( spinner );
      spinner.bind("value", store, "interval" );
      
      return page1;
     
    }
  }
});