/* ************************************************************************

  Bibliograph: Online Collaborative Reference Management

   Copyright:
     2007-2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
#asset(persist/*)
************************************************************************ */

/**
 * Base class for virtual tree widgets which load their data from different datasources
 * 
 */
qx.Class.define("qcl.ui.tree.TreeView",
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
     var tree = new qx.ui.treevirtual.TreeVirtual( this.getColumnHeaders(),{
       dataModel : new virtualdata.model.SimpleTreeDataModel,
        tableColumnModel : function(obj) {
          return new qx.ui.table.columnmodel.Resize(obj);
        }       
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
       var store = this.getStore();
       var tree  = this.getTreeView();
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
         //this.warn("getting tree data for " +  this.getTreeCacheId(datasource) );
         this.getCachedTreeData( this.getTreeCacheId(datasource), function( cache )
         {
           /*
            * use cached data if available, if the node count matches
            * and if the transaction id is not out of date
            */
           if ( cache && cache.treeData 
                && data.transactionId == cache.transactionId 
           ){
             /*
              * set the tree data
              */
             tree.getDataModel().setData( cache.treeData );
             this.hidePopup();
           }
           
           /*
            * we don't have (valid) cached data
            */
           else
           {
             var counter = 0;
             
             this.getTreeView().setEnabled(false);
             
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
                 //this.warn("saving tree data for " +  this.getTreeCacheId(datasource) );
                 this.cacheTreeData( this.getTreeCacheId(datasource), {
                   treeData : this.getTreeView().getDataModel().getData(),
                   transactionId : transactionId
                 } );
                 
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
     * @param storageId {String} The id of the stored data
     * @param callback Function called with the cached data
     * @param context
     * @return {void}
     */
    getCachedTreeData : function( storageId, callback, context )
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
         callback.call( context, cache );
       } );
    },
    
    /**
     * Save the tree data into the cache
     * @param storageId {String} The id of the cached data
     * @param data
     * @return {void}
     */
    cacheTreeData : function( storageId, data )
    {
       //try{
        
       if ( this.getUseCache() ) 
       {
         var persistentStore = this.getApplication().getPersistentStore();
         persistentStore.save(
           storageId,
           qx.util.Json.stringify(data)
         );        
       }
       //}catch(e){console.warn(e)}
    },
    
    /**
     * Clears the client-side cache of tree data 
     * @param id {String} Id for cached data
     * @return {void}
     */
    clearTreeCache : function( storageId )
    {
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
    },
    
    /**
     * Adds a node. If no label is supplied, the user will be prompted
     * @param serverParentNodeId {Integer}
     * @param label {String}
     */
    addNode : function( serverParentNodeId, label )
    {

      if ( label === undefined )
      {
         this.__prompt.set({
           message: this.tr( "Please enter the title of the new node:" ),
           value : "",
           callback : qx.lang.Function.bind( function( label )
           {
             this._addNode( serverParentNodeId, label );
           }, this)
         }).show();
      }
    },
    
    /**
     * Adds a node
     * @param serverParentNodeId {Integer}
     * @param label {String}
     */    
    _addNode : function( serverParentNodeId, label )
    {
      if ( ! qx.lang.Type.isNumber( serverParentNodeId ) 
        || ! qx.lang.Type.isString( label ) || ! label )
      {
        this.error("Invalid arguments");
      }
      this.getApplication().executeService(
        "bibliograph.controller.Folder","create",
        [ this.getDatasource(), {
          "label" : label,
          "parentId" : serverParentNodeId
        }]
      );
      
    },
    
    /**
     * Marks the current folder to be cut & pasted
     * @return {void} void
     */
    cutToClipboard : function()
    {

      var tree = this.treeWidget;
      var clipboard = qcl.clipboard.Manager.getInstance();

      var data =
      {
        'sourceWidget' : tree,
        'datasource'   : this.getApplication().getStateManager().getState("datasource"),
        'node'         : this.getSelectedNode()
      };

      clipboard.addData("bibliograph.types.Folder", data);
      clipboard.setAction("move");
    },


    /**
     * Marks the current folder for copy & paste
     * @return {void} void
     */
    copyToClipboard : function()
    {
      var tree      = this.treeWidget;
      var clipboard = qcl.clipboard.Manager.getInstance();

      var data =
      {
        'sourceWidget' : tree,
        'datasource'   : this.getApplication().getStateManager().getState("datasource"),
        'node'         : this.getSelectedNode()
      };

      clipboard.addData("bibliograph.types.Folder", data);
      clipboard.setAction("copy");
    },


    /**  
     * Paste from the clipboard to the folder tree
     * @param datasource {String} Optional
     * @param nodeId {Int} Optional
     * @return {void} void
     */
    pasteFromClipboard : function( datasource, nodeId )
    {
      var tree       = this.treeWidget;
      var app        = this.getApplication();
      var clipboard  = app.getClipboard();
      var targetNode = this.getSelectedNode();
      
      if ( datasource === undefined || nodeId === undefined )
      {
        datasource    = this.getDatasource();
        var nodeId  = targetNode.data.id;
      }

      if ( clipboard.getData("bibliograph.types.RecordIdList") )
      {
        var source     = clipboard.getData("bibliograph.types.RecordIdList");

        switch( clipboard.getCurrentAction() )
        {
          /*
           * copy to folder
           */        
          case "copy":
            tree.updateServer(
              "bibliograph.controllers.records.copy", 
              source.datasource,
              source.idList,
              datasource,  
              nodeId,
              true /* skip confirmation message */
            );
            break;

          /* 
           * move to folder, only allowed within same datasource
           */            
          case "move":
            if  (source.datasource != app.getStateManager().getState("datasource") )
            {
              alert(
                this.tr("Moving references between different datasource is not allowed. Use copy instead.")
              );
              return;
            }

            tree.updateServer(
              "bibliograph.controllers.records.move", 
              source.datasource, 
              source.idList, 
              source.nodeId, 
              nodeId,
              true /* skip confirmation message */
            );
            break;
        }
      }
      
      /*
       * pasting a folder
       */
      else if ( clipboard.getData("bibliograph.types.Folder") )
      {
        var sourceNode = clipboard.getData("bibliograph.types.Folder");

        switch( clipboard.getCurrentAction() )
        {
          /* 
           * move
           */
          case "move":
            
            var position = targetNode.data.children ? 
                targetNode.data.children.length : 0;
            
            /*
             * notify server
             */
            tree.updateServer(
              "bibliograph.controllers.folders.changeParent", 
              sourceNode.datasource, 
              sourceNode.node.data.id, 
              nodeId, 
              position
            );
            
            break;

          /*
           * copy
           */
          case "copy":

            if ( sourceNode.datasource == this.getDatasource() )
            {
              app.alert(
               this.tr("Copying folders within the same datasource is not allowed.")
              );
              return;
            }

            /*
             * notify server
             */
            tree.executeService(
              "bibliograph.controllers.folders.copy",
              sourceNode.datasource,
              sourceNode.node.data.id,
              datasource,
              nodeId,
              targetNode.data.children ? targetNode.data.children.length : 0,
              targetNode.nodeId
            );
            break;
        }
      }

      clipboard.clearData();
    }
  }
});
