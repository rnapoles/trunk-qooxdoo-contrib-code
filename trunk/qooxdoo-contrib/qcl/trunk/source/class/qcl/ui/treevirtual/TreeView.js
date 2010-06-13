/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2009 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
  
************************************************************************ */

/* ************************************************************************
#asset(persist/*)
************************************************************************ */

/**
 * Base class for virtual tree widgets which load their data from different datasources
 * 
 */
qx.Class.define("qcl.ui.treevirtual.TreeView",
{
  extend : qx.ui.container.Composite,
  include : [qcl.ui.MLoadingPopup],

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
  properties :
  {
    /**
     * The headers of the tree columns
     */
    columnHeaders :
    {
      check : "Array",
      nullable : false
    },
    
    /** 
     * The datasource of this folderTree 
     */
    datasource :
    {
      check : "String",
      init  : false,
      event : "changeDatasource",
      apply : "_applyDatasource",
      event : "changeDatasource"
    },

    /** 
     * The server-side id of the currently selected node  
     */
    nodeId :
    {
      check : "Integer",
      init  : null,
      event : "changeNodeId",
      apply : "_applyNodeId",
      event : "changeNodeId"
    },

    /** 
     * The currently selected node
     */
    selectedNode :
    {
      check    : "Object",
      nullable : true,
      event    : "changeSelectedNode",
      apply    : "_applySelectedNode"
    },

    /** 
     * The currently selecte node type
     */
    selectedNodeType :
    {
      check    : "String",
      nullable : true,
      event    : "changeSelectedNodeType"
    },

    
    /**
     * Callback function if tree is used as a chooser dialogue
     */
    callback :
    {
      check    : "Function",
      nullable : true
    },

    /**
     * The widget displaying the tree
     * FIXME: rename?
     */
    treeView :
    {
      check : "qx.ui.treevirtual.TreeVirtual",
      nullable : true,
      apply : "_applyTreeView",
      event : "changeTreeView"
    },    
    
    /**
     * The marshaler responsible for preparing the request and
     * turning the response into model data.
     */
    marshaler :
    {
      check : "qx.core.Object",
      nullable : true
    },
    
    /**
    * The current controller
    */
   controller :
   {
     check : "qx.core.Object",
     nullable : true
   },
   
   /**
    * The current data store 
    */
   store :
   {
     check : "qx.core.Object",
     nullable : true
   },    
 
   /**
    * The name of the service which supplies the tree data
    */
   serviceName :
   {
     check : "String",
     nullable : false
   },
   
   /**
    * Use a cache to save tree data
    */
   useCache :
   {
      check : "Boolean",
      init : true
   },
  
   
   /**
    * The service method used to query the number of nodes in the tree
    */
   nodeCountMethod :
   {
     check : "String",
     init : "getNodeCount"
   },   
   
   /**
    * The service method used to query the number of nodes in the tree
    */
   childNodeDataMethod :
   {
     check : "String",
     init : "getChildNodeData"
   },      
   
   /**
    * The number of nodes that are transmitted in each request
    */
   childrenPerRequest :
   {
      check : "Integer",
      nullable : false,
      init : 50
   },
   
   /**
    * The member property name of the tree widget 
    */
   treeWidgetContainer :
   {
      check : "qx.ui.core.Widget",
      nullable : true
   },
   
   /**
    * The type of model that is displayed as tree data.
    * Used to identify server messages.
    */
   modelType : 
   {
      check: "String"
   },
   
    /**
     * Enable/disable drag and drop
     */
    enableDragDrop :
    {
      check : "Boolean",
      init  : false,
      event : "changeEnableDragDrop"
    },
    
    /**
     * Whether Drag & Drop should be limited to reordering
     */
    allowReorderOnly : 
    {
      check : "Boolean",
      init  : false,
      event : "changeAllowReorderOnly"
    }   
   
   
  },
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function()
  {
    this.base(arguments);
    
    /*
     * Marshaler
     */
    this.setMarshaler( new virtualdata.marshal.TreeVirtual() );    
    
    this.__datasources = {}; 
    
    this.__prompt = new dialog.Prompt();
    this.setTreeWidgetContainer(this);
    
    /*
     * server databinding
     */
    this.__lastTransactionId = 0;
    qx.event.message.Bus.subscribe("folderTreeUpdateNode",  this._updateNode,this);
    qx.event.message.Bus.subscribe("folderTreeAddNode",     this._addNode,this);
    qx.event.message.Bus.subscribe("folderTreeDeleteNode",  this._deleteNode,this);
    qx.event.message.Bus.subscribe("folderTreeMoveNode",    this._moveNode,this);
    qx.event.message.Bus.subscribe("folderTreeReorder",     this._reorderNodeChildren,this);
    
    /*
     * drag & drop
     */
    this.setAllowReorderOnly(true);
    
    /*
     * pupup
     */
    this.createPopup();
  },
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {

    /*
    ---------------------------------------------------------------------------
       PRIVATE MEMBERS
    ---------------------------------------------------------------------------
     */
    
   /**
    * The status label widget
    */
   _statusLabel : null,   
   
   /**
    * A map of references to controller,store and tree widget 
    * connected to each datasource
    */
   __datasources : null,
      
   /**
    * Data sent with automatic server requests
    * @type mixed
    */
   __optionalRequestData : null,
   
   /**
    * reusable prompt box
    * @type {dialog.Prompt}
    */
   __prompt : null,
   
   /**
    * Attempts to select a node
    * @type Number
    */
   __selectAttempts : 0,    
   
   
   __lastTransactionId : 0,
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */       

   /**
    * Handles the change in the datasource property of the widget
    */
    _applyDatasource : function( value, old )
    {
      if( value )
      {
        this._setupTree( value, true );  
      }
    },
   
   /**
    * Applies the new tree view
    * @param value
    * @param old
    * @return
    */
   _applyTreeView : function ( value, old )
   {
     if ( old )
     {
       old.setVisibility("excluded");
     }
     value.setVisibility("visible");
   },
   
   /**
    * Applies the node id
    * @param value
    * @param old
    * @return
    */
   _applyNodeId : function ( value, old )
   {
      //this.selectByServerNodeId( value ); // FIXME
   },   
   
   _applySelectedNode : function ( value, old )
   {
      // empty stub
   },   


   
   /*
    ---------------------------------------------------------------------------
     INTERNAL METHODS
    ---------------------------------------------------------------------------
    */ 
   
   /**
    * Returns a map with all the objects that are needed for a datasource: A tree,
    * a store, and a controller.
    * @param datasource {String}
    * @return {Map} A map containting the keys treeWidget, store and controller
    */
   _getDatasourceObjects : function( datasource )
   {
     if ( this.__datasources[datasource] == undefined )
     {
        this.__datasources[datasource] = {
          treeWidget : null,
          store      : null,
          controller : null
        };
     }
     return this.__datasources[datasource];
   },

   /**
    * Creates a tree and sets up the databinding for it.
    * @param datasource {String}
    */
   _createTree : function( datasource )
   {

     var ds = this._getDatasourceObjects( datasource );
     
     /*
      * tree
      */
     var tree = new qcl.ui.treevirtual.DragDropTree( 
      this.getColumnHeaders(),{
       dataModel        : new virtualdata.model.SimpleTreeDataModel,
       tableColumnModel : function(obj) { return new qx.ui.table.columnmodel.Resize(obj);}       
     } );
     tree.set({
       allowStretchY : true,
       alwaysShowOpenCloseSymbol : false,
       statusBarVisible : false,
       backgroundColor : "white",
       useTreeLines : true,
       showCellFocusIndicator : false,
       rowFocusChangeModifiesSelection : false
     });
     
     /*
      * drag & drop
      */
     this.bind("enableDragDrop", tree, "enableDragDrop");
     this.bind("allowReorderOnly", tree, "allowReorderOnly");
     tree.addListener("dragstart", this._on_dragstart, this );
     tree.addListener("dragend", this._on_dragend, this );
     tree.addListener("drop", this._on_drop, this );
     
     tree.getTableColumnModel().getBehavior().setMinWidth( 0, 80 );
     tree.getTableColumnModel().getBehavior().setWidth( 0, "10*" );
     tree.getTableColumnModel().getBehavior().setMinWidth( 1, 20 );
     tree.getTableColumnModel().getBehavior().setWidth( 1, "1*" );     
     
     tree.addListener("appear", function(){
        // FIXME: remove table header
       //tree.setHeaderCellHeight(0);
     },this);

     /*
      * event listeners
      */
     tree.addListener("changeSelection", this._on_treeChangeSelection, this );
     tree.addListener("click", this._on_treeClick, this );
     tree.addListener("dblclick", this._on_treeDblClick, this );

     
     ds.treeWidget = tree;
     this.getTreeWidgetContainer().add( tree, { flex : 10, height: null } );
     
     /*
      * Store
      * FIXME: we don't need a qcl AND a virtualdata jsonrpc store!
      */
     ds.store = new qcl.data.store.JsonRpc( 
       null, this.getServiceName(), this.getMarshaler() 
     );
     //ds.store.registerStore();   
     
     /*
      * Controller
      */
     ds.controller = new virtualdata.controller.TreeVirtual( 
         tree, 
         ds.store
     );
    
     return ds;
      
    },     
    
    /**
     * Creates the tree and optionally loads the data
     * @param datasource {String}
     * @param doLoad {Boolean|undefined}
     * @todo rewrite
     */
    _setupTree : function( datasource, doLoad )
    {
      //try{
        var loadData = false;
        if ( datasource )
        {
          if ( ! this._getDatasourceObjects( datasource ).treeWidget )
          {
            this._createTree( datasource );
            loadData = true;
          }
          var ds = this._getDatasourceObjects( datasource );
          this.setTreeView( ds.treeWidget );
          this.setStore( ds.store );
          this.setController( ds.controller );
  
          if ( doLoad && loadData )
          {
            this._loadTreeData( datasource, 0 );
          }
        }
      //}catch(e){console.warn(e);} 
    },    
    
    
    /**
     * Retrieve tree data from the server, and synchronize the 
     * attached trees
     * @param datasource {String}
     * @param nodeId {Integer}
     * @return
     */
     _loadTreeData : function( datasource, nodeId )
     {
       if ( ! datasource )
       {
         this.error("Invalid arguments: no datasource given");
       }
       // @todo: get from datasource, passing the datasource argument makes no sense.
       var store = this.getStore();
       var tree  = this.getTreeView();
       var controller = this.getController();
       var nodeId = nodeId || 0;

       /*
        * clear all bound trees
        */
       store.setModel(null);

       var datasource = this.getDatasource();
       var storeId = store.getStoreId();
       this.clearSelection();
       
       this.showPopup("Loading folder data ...", this);

       /*
        * get node count and transaction id from server
        */
       store.load( this.getNodeCountMethod(), [ datasource, this.getOptionalRequestData() ], function(data)
       {
         var nodeCount     = data.nodeCount;
         var transactionId = data.transactionId;
         
         /*
          * if no tree, return 
          */
         if ( ! nodeCount )
         {
            this.hidePopup();
            return;
         }
         
         /*
          * now asynchronously retrieve tree cache, based on the transaction id
          */
         this.getCachedTreeData( transactionId, function( treeData )
         {
           /*
            * use cached data if available, if the node count matches
            * and if the transaction id is not out of date
            */
           if ( treeData ){
             /*
              * set the tree data
              */
             tree.getDataModel().setData( treeData );
             controller.remapNodeIds();
             this.hidePopup();
             return;
           }
           
           /*
            * we don't have (valid) cached data
            */
           else
           {
             var counter = 0;
             
             //this.getTreeView().setEnabled(false);
             
             /*
              * Create a function that can recursively call itself
              * in order to load folder children, as long as there
              * are some left on the server. 
              */
             ( qx.lang.Function.bind( function loadTree(data)
             {
               /*
                * if the function is called with boolean 'true', this
                * is interpreted as the start of the loading process. 
                */
               if ( data === true )
               {
                 store.load(
                  this.getChildNodeDataMethod(), 
                  [ datasource, nodeId, this.getChildrenPerRequest(), 
                    true, storeId, this.getOptionalRequestData() ], 
                  qx.lang.Function.bind( loadTree, this )
                 );
               }

               /*  
                * After the data has returned from the server, if there are nodes left
                * to be loaded, the function is called again, and the nodes to load passed to 
                * the function.
                */
               else if ( qx.lang.Type.isObject( data ) 
                        && qx.lang.Type.isArray( data.queue ) 
                        && data.queue.length )
               {
                 counter += data.nodeData.length;
                 this.showPopup("Loading folder data... " +  Math.floor( 100* (counter/nodeCount) ) + "%", this );
                 store.load(
                   this.getChildNodeDataMethod(), 
                   [ datasource, data.queue, this.getChildrenPerRequest(), 
                     true, storeId, this.getOptionalRequestData() ], 
                   qx.lang.Function.bind( loadTree, this )
                 );
               }

               /*
                * if no data, an error occurred
                */
               else if (data === null)
               {
                /*
                 * @todo: fire event
                 */
                this.hidePopup();
                this.getTreeView().setEnabled(true);
               }

               /*
                * else, we're done.
                */
               else
               {
                /*
                 * @todo: fire data event
                 */
                 this.getTreeView().setEnabled(true);
                 
                 /*
                  * save new cache
                  */
                 this.cacheTreeData( transactionId );
                 
                 this.hidePopup();
                 
               } // end if
             }, this) )( true );  // end function loadTree
           };  // end if
         }, this ); // end method call this.getCachedTreeData
       }, this ); // end method call store.load
    },
    
    /**
     * Returns the id used to cache tree data in the browser. Defaults
     * to datasource plus user name or anoymous.
     * @param datasource {String}
     */
    getTreeCacheId : function(datasource)
    {
      if ( datasource === undefined )
      {
        datasource = this.getDatasource();
      }
      var activeUser = this.getApplication().getAccessManager().getActiveUser();
      return this.getServiceName() + "-" + datasource + "-" + ( activeUser.isAnonymous() ? "anonymous" : activeUser.getUsername() );
    },
     
    /**
     * Returns optional request data for automatically called 
     * server requests
     * @return {unknown}
     */
    getOptionalRequestData : function()
    {
      return this.__optionalRequestData;
    },
    
    /**
     * Sets optional request data for automatically called 
     * server requests
     * @param data {unknown}
     * @return {void}
     */
    setOptionalRequestData : function(data)
    {
      this.__optionalRequestData = data;
    },    
    
    /**
     * Returns the cached tree data for a given datasource. 
     *
     * @param transactionId
     * @param callback Function called with the cached data
     * @param context
     * @return {void}
     */
    getCachedTreeData : function( transactionId, callback, context )
    {
       
       /*
        * don't use a cache
        */
       if ( ! this.getUseCache() ) 
       {
         callback.call( context, null );
       }
       
       /* 
        * get cache
        */
       var persistentStore = this.getApplication().getPersistentStore();
       var storageId = this.getTreeCacheId( this.getDatasource() ); 
       persistentStore.load( storageId, function( ok, cache )
       {
         if ( ok && cache )
         {
           try
           {
             cache = qx.util.Json.parse( cache );
           }
           catch(e)
           {
             cache = null;
             context.warn("Invalid treedata cache");
           }
         }
         else
         {
           cache = null;
         }
         
        //console.warn( "Transaction from server: " + transactionId + ", on client: " + cache.transactionId );
        /*
         * Invalidate the cache if the transaction id has changed.
         */
        if ( cache && transactionId == cache.transactionId )
        {
          callback.call( context, cache.data );
        }
        else
        {
          callback.call( context, null );
        }
        
       } );
    },
    
    /**
     * Save the tree data into the cache
     * @param transactionId 
     * @return {void}
     */
    cacheTreeData : function( transactionId )
    {
       if ( this.getUseCache() && transactionId > this.__lastTransactionId ) 
       {
         this.clearSelection();
         var storageId = this.getTreeCacheId( this.getDatasource() );
         var data  = { 
           'data'          : this.getTreeView().getDataModel().getData(),
           'transactionId' : transactionId
         }
         var persistentStore = this.getApplication().getPersistentStore();
         persistentStore.save( storageId, qx.util.Json.stringify(data) ); 
         this.__lastTransactionId = transactionId; 
         //console.warn("Saving tree cache with transaction id " + transactionId);
       }
    },
    
    /**
     * Clears the client-side cache of tree data 
     * @param id {String} Id for cached data
     * @return {void}
     */
    clearTreeCache : function()
    {
      storageId = this.getTreeCacheId( this.getDatasource() );
      var persistentStore = this.getApplication().getPersistentStore();
      persistentStore.save( storageId, "" );
    },    

    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */   
    
    /**
     * Called when user clicks on node
     */
    _on_treeClick : function(){
    
      // do nothing at this point
      
    },

    /**
     * Called when user double-clicks on node
     */
    _on_treeDblClick : function(){
      var selNode = this.getSelectedNode();
      if ( ! selNode ) return;
      var dataModel = this.getTreeView().getDataModel();
      dataModel.setState( selNode, {'bOpened':!selNode.bOpened} );
      dataModel.setData();
    },

    /**
     * Handler for event 'treeOpenWhileEmpty'
     * @param event {qx.event.type.Event} Event object
     * @return {void} void
     */
    _on_treeOpenWhileEmpty : function(event)
    {


    },

    
    /** 
     * Handler for event 'changeSelection' on the treeVirtual widget in 
     * the folderTree widget
     *
     * @param event {qx.event.type.Event} Event object
     * @return {void} void
     */
    _on_treeChangeSelection : function( event )
    {
      /*  
       * reset selected row cache 
       */
      this.setSelectedNode( null );
      this.setSelectedNodeType( null );

      /*
       * get new selection
       */
      var selection = event.getData();
      if (selection.length == 0) return;

      /*
       * get data
       */
      var tree          = this.getTreeView();
      var app           = this.getApplication();
      var node          = selection[0];
      var data          = node.data;
      var datasource    = data.datasource || this.getDatasource();
      var nodeId        = parseInt(data.id);
//      var nodeType    = tree.getNodeType(node);

      /* 
       * update properties
       */
      this.setSelectedNode( node );
      this.setNodeId( nodeId );
      
      
      
//      this.setSelectedNodeType( nodeType );
      
      return;      
      
      /*
       * load children only if the selection change was done by the user
       */
      if ( node.children.length != data.childCount )
      {
        if ( nodeId != tree.getServerNodeIdSelected() )
        {
          ////console.log("Node client#"+nodeId+", server#"+nodeId+": loading "+node.data.childCount+" children.");
          this.loadChildFolders( datasource, nodeId );
        }
      }

      /*
       * remember server-side id of node currently selected
       */
      tree.setServerNodeIdSelected( nodeId );
      //console.log("Selecting folder server#"+nodeId);
      
    },
    
    /*
    ---------------------------------------------------------------------------
       DRAG & DROP
    ---------------------------------------------------------------------------
    */   
    
    /**
     * Called when the user starts dragging a node
     * @param e {qx.event.type.Drag}
     */
    _on_dragstart : function(e)
    {
      this.__dragsession = true;
    },    
    
    /**
     * Called when the drag session ends
     * @param e {qx.event.type.Drag}
     */
    _on_dragend : function(e)
    {
      this.__dragsession = false;
    },        
    
    /**
     * Called when a dragged element is dropped onto the tree widget.
     * Override for your own behavior
     * @param e {qx.event.type.Drag}
     */
    _on_drop : function(e)
    {
      if ( e.supportsType("qx/treevirtual-node") )
      {
        this.moveNode( e );  
      }
    },
    
    /*
    ---------------------------------------------------------------------------
       SERVER DATABINDING
    ---------------------------------------------------------------------------
    */  
    
    /**
     * @todo rewrite the cache stuff! if the transaction id doesnt'change,
     * no need to update the cache!
     */
    _updateNode : function(e)
    {
      var data = e.getData();
      var tree = this.getTreeView();
      if( ! tree ) return;
      var dataModel = tree.getDataModel();
      var controller = this.getController();
      if( data.datasource == this.getDatasource() 
        && data.modelType == this.getModelType() )
      {
        var nodeId = controller.getClientNodeId( data.nodeData.data.id );
        //console.warn( "updating client #" + nodeId + " server #" + data.nodeData.data.id);
        if( nodeId )
        {
          dataModel.setState( nodeId, data.nodeData );
          dataModel.setData();
          controller.setTransactionId( data.transactionId );
          this.cacheTreeData( data.transactionId );          
        }
      }
    },
    
    _addNode : function(e)
    {
      var data = e.getData();
      var tree = this.getTreeView();
      if( ! tree ) return;
      var dataModel = tree.getDataModel();
      var controller = this.getController();
      if( data.datasource == this.getDatasource() 
        && data.modelType == this.getModelType() )
      {
        var parentNodeId = controller.getClientNodeId( data.nodeData.data.parentId );
        //console.warn( "adding node to #" + parentNodeId );
        if( parentNodeId )
        {
          if ( data.nodeData.isBranch )
          {
            var nodeId = dataModel.addBranch( parentNodeId );
          }
          else
          {
            var nodeId = dataModel.addLeaf( parentNodeId )
          }
          dataModel.setState( nodeId, data.nodeData );
          dataModel.setData();
          controller.setTransactionId( data.transactionId );
          this.cacheTreeData( data.transactionId );          
        }
      }
    },
    
    _moveNode : function(e)
    {
      var data = e.getData();
      var tree = this.getTreeView();
      if( ! tree ) return;
      var dataModel = tree.getDataModel();
      var controller = this.getController();
      if( data.datasource == this.getDatasource() 
        && data.modelType == this.getModelType() )
      {
        var nodeId   = controller.getClientNodeId( data.nodeId );
        var parentNodeId = controller.getClientNodeId( data.parentId );
        //console.warn( "moving #" + nodeId + " to #" + parentNodeId );
        if( nodeId && parentNodeId !== undefined )
        {          
          var node = dataModel.getData()[nodeId];
          var oldParentNode = dataModel.getData()[node.parentNodeId]; 
          var newParentNode = dataModel.getData()[parentNodeId];
          node.parentNodeId = parentNodeId;
          oldParentNode.children.splice( oldParentNode.children.indexOf( nodeId ),1 );
          newParentNode.children.push( nodeId );
          dataModel.setData();
          controller.setTransactionId( data.transactionId );
          this.cacheTreeData( data.transactionId );          
        }
      }
    },
    
    _deleteNode : function(e)
    {
      var data = e.getData();
      var tree = this.getTreeView();
      if( ! tree ) return;
      var dataModel = tree.getDataModel();
      var controller = this.getController();
      if( data.datasource == this.getDatasource() 
        && data.modelType == this.getModelType() )
      {
        var nodeId = controller.getClientNodeId( data.nodeId );
        //console.warn( "deleting #" + nodeId );
        if( nodeId )
        {
          dataModel.prune( nodeId, true );
          dataModel.setData();
          controller.setTransactionId( data.transactionId );
          this.cacheTreeData( data.transactionId );          
        }
      }
    },
    
    /**
     * Called by a server message to reorder the child nodes of
     * a given node.
     * @param e {qx.event.message.Message}
     */
    _reorderNodeChildren : function(e)
    {
      var data = e.getData();
      var tree = this.getTreeView();
      if( ! tree ) return;
      
      /*
       * check if the message concerns us
       */
      var dataModel = tree.getDataModel();
      var controller = this.getController();
      if( data.datasource != this.getDatasource() 
        || data.modelType != this.getModelType() ) return;
     
      /*
       * get the node data
       */
      var nodeId = controller.getClientNodeId( data.nodeId );
      var parentNodeId = controller.getClientNodeId( data.parentNodeId );
      var parentNode = dataModel.getData()[parentNodeId];
      
      /*
       * reorder node children
       */
      var pnc = parentNode.children;
      var oldPos = pnc.indexOf( nodeId );
      if( oldPos == data.position )
      {
        //this.debug("Node already at new position");
        return;
      }
      pnc.splice( oldPos,1 );
      pnc.splice( data.position,0, nodeId );
      //this.debug("Changed child position");
      
      /*
       * render tree
       */
      dataModel.setData();
      
      /*
       * save new tree state in cache
       */
      controller.setTransactionId( data.transactionId );
      this.cacheTreeData( data.transactionId );          
    },
    
    /*
    ---------------------------------------------------------------------------
       PUBLIC API
    ---------------------------------------------------------------------------
    */  
    
    /**
     * Clears the tree and loads a datasource into the tree display,
     * optionally with a pre-selected node
     * @param datasource {String}
     * @param nodeId {Int} Optional
     */ 
    load : function( datasource, nodeId )
    {
      /*
       * clear tree and load new tree data
       */
      if ( datasource)
      {
        this._loadTreeData( datasource, nodeId );  
      }
      else
      {
        this.warn( "Cannot load: no datasource!");
      }
    },
    
    /**
     * Reload the widget
     * @return {void} void
     */
    reload : function()
    {
      /*
       * clear the tree and reload
       */
      var datasource = this.getDatasource();
      this.clearTree();
      this.load( datasource );
    },    
    
    /**
     * Empties the tree view
     */
    clearTree : function()
    {
      this.getTreeView().resetSelection();
      this.getTreeView().getDataModel().prune(0);
    },
 
    /**
     * Selects a tree node by its server-side node id 
     * @param serverNodeId {} 
     */
    selectByServerNodeId : function( serverNodeId )
    {
      var clientId = this.getController().getClientNodeId( serverNodeId );
      var row = this.getTreeView().getDataModel().getRowFromNodeId( clientId ); 
      this.clearSelection();
      this.getTreeView().getSelectionModel().setSelectionInterval( row, row );
    },
    
    /**
     * Clears the selection
     */
    clearSelection : function()
    {
      this.getTreeView().getSelectionModel().resetSelection();
    }    
    
  }
});
