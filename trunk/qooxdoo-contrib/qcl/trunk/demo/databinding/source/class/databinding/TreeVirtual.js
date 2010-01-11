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
    /**
     * Create a pane for the treevirtual databinding demo
     * @return {qx.ui.container.Composite}
     */
    createPane : function()
    {
      
      /*
       * pane container
       */
      var container = new qx.ui.container.Composite(
          new qx.ui.layout.VBox()
      );

      /*
       * controls and tree
       */
      var tree = this.treeWidget = this.createTree();
      container.add( this.createControls( tree ) );      
      container.add( tree, { 'flex': 1 } );
      container.add( this.createButtonPane( tree ) );
        
      /*
       * the marshaler prepares requests in the store and transforms
       * the received data into a model 
       */
      var marshaler = new qcl.data.marshal.TreeVirtual();

      /*
       * The setQueryParams method allows to pass additional information to 
       * the server. Here, we pass sample, unnecessary data just for 
       * testing
       */
      marshaler.setQueryParams( [ "foo",1,2,3 ] );              
      
      /*
       * Configure jsonpc-store
       */
      var store = this.store = new qcl.data.store.JsonRpc(
        null, // use main application's server url 
        "databinding.TreeData",
        marshaler
      );
      

      /*
       * Create a controller that connects tree data model and data store
       */
      this.treeController = new qcl.data.controller.TreeVirtual(tree,store);
     
      /*
       * bind the server-supplied status text to the tree's status bar.
       */
      store.bind("model.statusText", tree, "additionalStatusBarText", {
        converter : function( text ){
          return " | " + text;
        }
      } ); 
      
      
      /*
       * turn event transport on
       */
      store.setUseEventTransport(true);

      /* 
       * add change event listeners
       */
      tree.getDataModel().addListener("change", function(event)
      {
        var data = event.getData();
        this.info(" | Tree change: " + data.type + ", start:" + data.start + ", end:" + data.end);
      },
      this);

      tree.getDataModel().addListener("changeBubble", function(event)
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
        this.info(" | Tree changeBubble: " + data.name + ":" + valueChange.join(","));
      }, this);
      
      
      /*
       * return the completed page
       */
      return container;
    },
    
    /**
     * Create a new tree widget
     * @return {qx.ui.treevirtual.TreeVirtual}
     */
    createTree : function()
    {

      var tree = new qx.ui.treevirtual.TreeVirtual(
          [ 'Folders', '#' ], 
          { dataModel : new qcl.data.model.TreeVirtual() }
      );
      tree.setSelectionMode(qx.ui.treevirtual.TreeVirtual.SelectionMode.SINGLE);
      tree.setBackgroundColor("white");
      tree.setAlwaysShowOpenCloseSymbol(false);
      tree.setStatusBarVisible(true);
      tree.setShowCellFocusIndicator(true);

      tree.getTableColumnModel().getBehavior().set(0,
      {
        width    : "10*",
        minWidth : 200
      });

      tree.getTableColumnModel().getBehavior().set(1,
      {
        width    : "1*",
        minWidth : 70
      });

      return tree;
    },
    
    /*
     * create controls for a tree
     * return {qx.ui.toolbar.ToolBar}
     */
    createControls : function( tree )
    {

      var bar = new qx.ui.toolbar.ToolBar();
      var button, part;

      part = new qx.ui.toolbar.Part();
      bar.add(part);    
            
      /*
       * Button to add a child folder
       */
      var buttonAdd = button = new qx.ui.toolbar.Button("Add");
      part.add( button );
      button.addListener("execute", function(e)
      {
        
        /*
         * use selected node or root node as parent
         */
        if ( tree.getSelectedNodes().length )
        {
          var selectedNode = tree.getSelectedNodes()[0];
        }
        else
        {
          var selectedNode = tree.getDataModel().getData()[0];
        }
        
        /*
         * add child folder
         */
        var dataModel = tree.getDataModel();
        var nodeId = dataModel.addBranch(
            selectedNode.nodeId, 
            "Child Node " + (selectedNode.children.length + 1),
            true
        );

        /*
         * fake server node ids. This is needed because we have no
         * server-supplied tree data yet - in a real scenario, the
         * server will supply those after adding the new node to 
         * the database
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
      var buttonRemove = button = new qx.ui.toolbar.Button("Delete");
      button.set({ enabled : false });
      part.add( button );
      button.addListener("execute", function(e)
      {
        var selectedNodes = tree.getSelectedNodes();
        var dataModel = tree.getDataModel();
        tree.getSelectionModel()._clearSelection();

        for (var i=0; i<selectedNodes.length; i++) {
          dataModel.prune(selectedNodes[i].nodeId, true);
        }

        dataModel.setData();
      },
      this);
      
      /*
       * Button to rename a node
       */
      var buttonRename = button = new qx.ui.toolbar.Button("Rename");
      button.set({ enabled : false });
      part.add(button);
      button.addListener("execute", function(e)
      {
        var node = tree.getSelectedNodes()[0];
        if ( ! node ) return;
        var dataModel = tree.getDataModel();
        var name = prompt( "New name of the node", node.label );
        dataModel.setState( node, { label : name } );
        dataModel.setData();
      },
      this);     
      
      part = new qx.ui.toolbar.Part();
      bar.add(part);        

      /*
       * button to create synchronized tree in a window
       */
      var button = new qx.ui.toolbar.Button("Clone tree");
      part.add( button );
      button.addListener("execute", function(e)
      {
        /*
         * create a window
         */
        var win = new qx.ui.window.Window("Create synchronized Tree");
        win.setLayout(new qx.ui.layout.VBox());
         
        win.set( { width:300, height:300 } );
        win.moveTo( Math.floor(Math.random()*300), Math.floor( Math.random()*300) );

        /*
         * create tree with tree controls
         */
        var tree = this.createTree();
        var controls = this.createControls( tree );
        win.add( controls );
        win.add( tree, { 'flex': 1 } );
        
        /*
         * create controller
         */
        new qcl.data.controller.TreeVirtual( tree, this.store );
        
        /*
         * we need to copy the initial data from the first tree.
         */
        tree.getDataModel().copyData( this.treeWidget.getDataModel().getData() );
        
        /*
         * bind status text to window caption
         */
        this.store.bind( "model.statusText", win, "caption" );
        
        /*
         * display window
         */
        win.open();

      },
      this);            
      
      /*
       * Button to clear the tree
       */
      button = new qx.ui.toolbar.Button("Clear tree");
      part.add( button );
      button.addListener("execute", function(e)
      {
        tree.getDataModel().prune(0);
        tree.getDataModel().setData();
      },
      this);  
      
      /*
       * Event Listeners
       */
      tree.addListener("changeSelection", function(event)
      {
        var enabled = ( event.getData().length > 0 );
        buttonRemove.setEnabled(enabled);
        buttonAdd.setEnabled(enabled);
        buttonRename.setEnabled(enabled);
      },this);   
             
      
      return bar;
    },
    
    /**
     * Creates a pane with the control buttons
     * @return {qx.ui.container.Composite}
     */
    createButtonPane : function( tree )
    {
       var container = new qx.ui.container.Composite(new qx.ui.layout.VBox());
       //container.setDecorator("main");
      
      /*
       * Retrieve tree data from backend
       */
      var hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
      hbox.setPadding(5);
      hbox.add( new qx.ui.basic.Label("Retrieve tree data:"));
      container.add(hbox);
      
      /*
       * Button to start request
       */
      button = this.buttonAddJsonRpcData = new qx.ui.form.Button("START");
      hbox.add(button);
      button.addListener("execute", function(e)
      {
        
        this.getServerTreeData(tree);
        
      }, this );

      /*
       * Button to cancel the json-rpc requests
       */
      this.buttonCancelAddJsonRpcData = new qx.ui.form.Button("STOP");
      hbox.add(this.buttonCancelAddJsonRpcData);
      this.buttonCancelAddJsonRpcData.setEnabled(false);
      this.buttonCancelAddJsonRpcData.addListener("execute", function(e)
      {
        /*
         * set global flag to true which should be available in the closure further up.
         */
        window.abortJsonRpcLoad = true;
        
        /*
         * button stuff
         */
        this.buttonCancelAddJsonRpcData.setEnabled(false);
        this.buttonAddJsonRpcData.setEnabled(true);
      },
      this);
    
      /*
       * Checkbox for binding tree selection to table
       */
      var checkbox = new qx.ui.form.CheckBox("Bind tree selection to table");
      hbox.add( checkbox );
      checkbox.addListener("changeValue", function(event)
      {
        if ( event.getData() && ! this.__selectionChangeEvent )
        {
          this.treeWidget.addListener("changeSelection", function(event)
          {
            var selection = event.getData();
            if ( selection.length )
            {
              var tableController = this.application.tableDemo.tableController;
              
              /*
               * set the second parameter passed to the getRowData function 
               * to the node label
               */
              tableController.getStore().getMarshaler().getQueryParams()[1]= { label : selection[0].label, id : selection[0].id };
              tableController.getTarget().getTableModel().reloadData();
            }
          }, this );
          this.__selectionChangeEvent = true;
        }
        else
        {
          alert("Unbinding not implemented. Please reload the application");
        }
      },
      this);
      
      return container;   
    },
    
    
    /**
     * Retrieve tree data from the server, and synchronize the 
     * attached trees
     * @param tree
     * @return
     */
    getServerTreeData : function(tree)
    {
      /*
       * clear all bound trees
       */
      this.store.setModel(null);

      /*
       * calling getNodeCount() method on server with no 
       * parameters. It returns the number of nodes on the
       * server.
       */
      this.store.load("getNodeCount", [], function(data)
      {
        this.info( "Tree has " + data.nodeCount + " nodes.");
      }, this);

      /* 
       * get some local variable references for the closure
       */
      var cancelButton = this.buttonCancelAddJsonRpcData;
      var startButton = this.buttonAddJsonRpcData;      
      var store = this.store;
      
      /*
       * global flag to abort loading
       */
      window.abortJsonRpcLoad = false; 

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
        if ( data === true )
        {
          
          cancelButton.setEnabled(true);
          startButton.setEnabled(false);
          
          /*
           * call the load method and request the top level nodes.
           * It will pull no more than
           * 10 folders (plus children) at a time to avoid timeouts.
           * You can play with the value of 10 to see whatever
           * works best, given the bandwith and server speed. When
           * done loading, call the loadTree function again with
           * the result. 
           */
          store.load("getNodeData", [ store.getStoreId(), [0], 10 ], loadTree);
        }
        
        /*  
         * After the data has returned from the server, the function is
         * called again, and the data passed to the function.
         * We use a global flag to signal if the loading process should
         * be aborted. The data passed from the server has a 'nodeData' and a
         * 'queue' property. The 'nodeData' property will be used by the 
         * controller to build the tree in the tree model. The 'queue' property
         * is an array of child ids which still have to be retrieved. If this
         * array is empty, we're done loading.
         */
        else if ( ! window.abortJsonRpcLoad && data && typeof data == "object" 
                  && data.queue instanceof Array && data.queue.length )
        {
          
          /*
           * now call the load method of the store with the queue of node ids that
           * still have to be retrieved. When
           * done loading, call the loadTree function again with
           * the result. 
           */
          store.load("getNodeData", [ store.getStoreId(), data.queue, 10 ], loadTree );
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
    }
  }
});