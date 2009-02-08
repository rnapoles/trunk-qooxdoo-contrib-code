/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#module(qcl.databinding)

************************************************************************ */

/**
 * Adds specific databinding methods to qx.ui.treevirtual.TreeVirtual
 *
 */
qx.Mixin.define("qcl.databinding.simple.MTreeVirtual",
{
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : {
    
    /** the map that links the client side id to server side id of the nodes **/
    serverNodeIdMap :
    {
      check : "Map",
      init : {}
    },
    
    /** the server-side id of the node that will be selected as soon as the node has been loaded **/
    serverNodeIdToSelect :
    {
      check : "Integer",
      init : null,
      nullable : true
    },
    
    /** the server-side id of the node currently selected **/
    serverNodeIdSelected :
    {
      check : "Integer",
      init : null,
      nullable : true
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * the API method called by the MDataManager to handle data returned by a
     * updateClient() call.
     *
     * @type member
     * @param data {Object}
     * @return {void}
     */
    handleServerData : function( data )
    {
      var dataModel   = this.getDataModel();
      var map         = this.getServerNodeIdMap();
      
      if ( ! ( data instanceof Array) )
      {
        //console.log("Invalid rpc data." );
        return;
      }
     
      //console.log("Received " + data.length + " nodes." );
      if ( data.length  == 0)
      {
        return;
      }
        
      // prune parent of first node, this assumes that all nodes 
      // sent have the same parent.       
      var serverParentId = data[0].data.parentId ;
      if ( serverParentId )
      {
        //console.log("Pruning node server#"+serverParentId);
        this.pruneByServerNodeId( serverParentId );  
        this.setStateByServerNodeId( serverParentId ,{bOpened:true});        
      }
              
        // add all nodes 
      for (var i=0; i<data.length;i++)
      {
        var node = data[i];
        
        //console.log(data[i]);
        
        // check node for commands; MUST NEVER BE FIRST NODE SENT!
        if ( node.command )
        {
            switch(node.command)
            {
              case "render":
                dataModel.setData();
                break;    
            }
            continue;
        }
        
        // create node
        //console.log("Creating node server#" + node.data.id);
        
        var parentNodeId = this.getParentNodeId(node);
        if (parentNodeId == null)
        {
          //console.log("Cannot find parent node for node server#" + node.data.id);
          continue;
        }
        if( node.isBranch )
        {
          var nodeId = dataModel.addBranch( parentNodeId );
          //console.log("Attaching branch client#" + nodeId + " to parent node client#"+parentNodeId);
        }
        else
        {
          var nodeId = dataModel.addLeaf( parentNodeId );
          //console.log("Attaching leaf client#" + nodeId + " to parent node client#"+parentNodeId);
        }
        
        // store server-side node id
        if ( node.data && node.data.id )
        { 
          map[node.data.id] = nodeId;
          //console.log("Storing link client#" + nodeId + ", server#"+node.data.id);
        }
        
        // set node state, including custom properties, except the parent node id
        delete node.parentNodeId;
        dataModel.setState( nodeId, node );
        
        // drag data alias FIXME: this is a hack!
        if (this.setNodeType && node.data && node.data.type)
        {
          this.setNodeType( nodeId, node.data.type );
        }
        
        // dispatch event
        this.createDispatchDataEvent("nodeLoaded",node);
      }
      // update tree
      dataModel.setData();            
    },
    
    /**
     * gets client-side node id of a node and retrieves it from the map
     * linking client and server-side ids.
     * @param  node {Object|Int}
     * @return {Int|null} parent node id
     */
    getParentNodeId : function ( node )
    {
      //console.log("Getting parent node for node server#" + node.data.id );
      
      var parentNodeId = null;
      
      /*
       * try to get parent node id from node data
       */
      if ( typeof(node) == "object" )
      {
        parentNodeId = node.parentNodeId; 
      }
      else
      {
        try
        {
          //console.log("Trying nodeGet...");
          node = this.nodeGet(node);  
        }
        catch(e)
        {
          //console.log("Node for node id "+ node + " does not exist:" + e);
          return;
        }
        
        if ( typeof(node) == "object" )
        {
          parentNodeId = node.parentNodeId;
          //console.log("Getting parentNodeId from object:"+ parentNodeId);          
        }
        else
        {
          //console.log("Node for node id "+ node + " does not exist.");
          return;
        }
      }
      
      /*
       * parent node id is not stored in the node data, for example
       * when loaded from the server, we only have a server-side 
       * node id and parent node id
       */
      if ( typeof(parentNodeId) != "number" )
      {
        //console.log("Parent node not stored in node or tree. Using node.data and map.");
        var map = this.getServerNodeIdMap();
        if ( typeof(node.data) != "object")
        {
          //console.log("No node data!");
          return;
        }
        
        if ( typeof (node.data.parentId) == "number" )
        {
          // get parent node from data.parentId
          var parentNodeId = map[node.data.parentId];
          if ( typeof(parentNodeId) != "number" )
          {
            //console.log("Cannot find data.parentId #" + node.data.parentId );
            return 0;
          }        
        }   
        else 
        {
          //console.log("Cannot get parent node of node server#" + node.data.id);
          return 0;
        }
      }   
      //console.log("Parent node of node client#" + node.nodeId + ", server #"+ node.data.id + " is #" + parentNodeId );
      return parentNodeId;  
    },
    
    /**
     * 
     * @param node {Object|Number} 
     */
    getParentNode : function ( node )
    {
      if ( typeof(node) == "object" )
      {
        return this.nodeGet(node.parentNodeId);
      }
      else
      {
        return this.nodeGet(this.getParentNodeId(node));
      }
    },

    /**
     * Loads a tree node of which the server-side Id is known
     * this will also load all ancestors and siblings of this node.
     * @type member
     * @param nodeId {Int} id of the node on the server
     * @param loadNodeChildrenFunc {Function} function that loads the children of a node from the server
     * @param loadIdHierarchyFunc {Function} function that calls the  
     * service method on the server, which dispatches a "nodeIdHierarchyLoaded"
     * event with an array of ids, starting with the top folder to the node to be
     * loaded. The first set of subnodes below the root has to be loaded already
     * for this to work.
     * 
     * @return {void} 
     */
    loadNodeByServerId : function(nodeId,loadNodeChildrenFunc,loadIdHierarchyFunc)
    {
      if ( typeof(loadNodeChildrenFunc) != "function" || typeof(loadIdHierarchyFunc) != "function" )
      {
        this.error("Missing required functions!");
      }
      
      var map = this.getServerNodeIdMap();
      if ( ! map[nodeId] )
      {
        // node has not been loaded, add event listener if it hasn't been added yet
        if ( ! this.__nodeIdHierarchyLoadedEvent )
        {
          //console.log("adding event listener nodeIdHierarchyLoaded");
          this.addEventListener("nodeIdHierarchyLoaded",function(e){
            var ids = e.getData();
            //console.log("Received node hierarchy " + ids );
            
            if ( ids instanceof Array )
            {
              if ( ids.length < 2)
              {
                //console.log("Id hierarchy must be at least one two elements: node id and parent node id.");
                return;
              }
             
              // attach event listener that waits for nodes to be loaded and checks if their children should be loaded
              if ( ! this.__nodeLoadedLoadChildrenEvent )
              { 
                //console.log("Attaching nodeLoadedLoadChildrenEvent event listener...");
                this.addEventListener("nodeLoaded",function(event){
                  var node = event.getData();
                  var serverNodeId = node.data.id;
                  //console.log("Received node server#"+serverNodeId);
                  if ( this.__nodeIndexLoadChildren[serverNodeId] ) 
                  {
                    //console.log("Node is in child load list. Loading Children... ");
                    loadNodeChildrenFunc(serverNodeId);
                    delete this.__nodeIndexLoadChildren[serverNodeId]
                  }
                },this);
                this.__nodeIndexLoadChildren = {};
                this.__nodeLoadedLoadChildrenEvent = true;
              }
              
              // remove last element
              ids.pop();
              
              // first node id, must not be 0!
              var firstNodeId = ids[0];
              
              // check if first node exists
              if ( firstNodeId && ! map[firstNodeId] )
              {
                this.__nodeIndexLoadChildren[firstNodeId]=true;
                //console.log("Added first element in hierarchy ("+firstNodeId+") to list of nodes whose children should be loaded.");
                return;
              }              
              
              for ( var i=1; i<ids.length; i++)
              {
                this.__nodeIndexLoadChildren[ids[i]] = true;
              }
              //console.log("Loading first node of hierarchy id... server#"+ids[0]);
              loadNodeChildrenFunc(ids[0]);
            }
            else
            {
              console.warn("Response must be an array! Aborting...");
            }
          });
          this.__nodeIdHierarchyLoadedEvent = true;
        }
        //console.log("requesting node hierarchy for node#" + nodeId);
        // dispatch server request
        loadIdHierarchyFunc(nodeId );
      }
      else
      {
        //console.log("node #"+nodeId +" already loaded.");
      }
    },

    /**
     * selects a node by its server-side id.
     * @param {Object} nodeId
     * @param loadNodeChildrenFunc {Function} function that loads the children of a node from the server
     * @param loadIdHierarchyFunc {Function} function that calls the  
     * service method on the server, which dispatches a "nodeIdHierarchyLoaded"
     * event with an array of ids, starting with the top folder to the node to be
     * loaded. The first set of subnodes below the root has to be loaded already
     * for this to work.
     */
    selectByServerNodeId : function (serverNodeId,loadNodeChildrenFunc,loadIdHierarchyFunc)
    {
     //console.log("selectByServerNodeId(" + serverNodeId + ","+loadNodeChildrenFunc+","+loadIdHierarchyFunc+")");
      
      /*
       * get cached client-side node id
       */
      var treeNodeId = this.getServerNodeIdMap()[serverNodeId];
      
      /*
       * has been loaded
       */
      if ( treeNodeId )
      {
       //console.log("Selecting already loaded node client#" + treeNodeId);
        
        /*
         * load has already been loaded, select it with a small timeout
         */
        qx.client.Timer.once(function(){
          try {
            var row = this.getDataModel().getRowFromNodeId(treeNodeId);  
          }
          catch(e)
          {
            console.warn(e);
          } 
          if ( typeof(row) == "number" )
          {
            var selModel = this.getSelectionModel();
            if ( selModel.isSelectedIndex(row ) )
            {
             //console.log("Row #"+row+" is already selected. Ignoring select command.");
            }
            else
            {
             //console.log("Selecting row #" + row);
              this.scrollCellVisible(0,row);
              selModel.clearSelection();
              selModel.addSelectionInterval(row,row);                      
            }
            this.setServerNodeIdSelected(parseInt(serverNodeId));   
          }
          else
          {
            console.warn("No row number available for node client#" + treeNodeId + ", server#" + serverNodeId+" - probably not loaded yet.");  
          }
        },this,100);
      }
      
      /*
       * has not been loaded
       */
      else
      {
       //console.log("Cannot select, loading node #" + serverNodeId );
        
        if ( ! this.__nodeLoadedCheckSelectEvent )
        {
          /*
           * event listener that waits for nodes to be loaded. 
           * if the server-side id matches, the node is selected
           */
         //console.log("Attaching nodeLoadedCheckSelectEvent event listener...");
          this.addEventListener("nodeLoaded",function(event){
            var node    = event.getData();
            var selId   = this.getServerNodeIdToSelect();
            var isSelId = this.getServerNodeIdSelected();
            
           //console.log("Loaded node server#"+node.data.id + ", we want to select server#" + selId );
            
            if ( selId && node.data.id == selId ) 
            {
             //console.log("Bingo! Now selecting server#" + selId );
              this.selectByServerNodeId(selId);
              this.setServerNodeIdToSelect(null);  
            }
            else if (isSelId && this.isLoaded(isSelId) )
            {
              this.selectByServerNodeId(isSelId);
            }
          },this);
          
          this.__nodeLoadedCheckSelectEvent = true;
        }
        
        /*
         * save node id for later, when the node has been loaded
         */
        this.setServerNodeIdToSelect( parseInt( serverNodeId ) );   
        
        /*
         * load node(s)
         */
        this.loadNodeByServerId(
           serverNodeId,
           loadNodeChildrenFunc,
           loadIdHierarchyFunc
        );
      }     
    },
    
    /**
     * updates a node supplied by a "server event" which usually doesn't contain a 
     * client-side nodeId
     */
    updateNode : function( node )
    {
      var nodeId = node.nodeId;
      if ( typeof(nodeId) != "number" )
      {
        var map = this.getServerNodeIdMap();
        if ( typeof(node.data) != "object" || typeof(node.data.id) != "number")
        {
          throw new Error("Cannot update node - node doesn't contain data.id property.");
        }
        nodeId = map[node.data.id];
        if ( typeof(nodeId) != "number" )
        {
          throw new Error("Cannot update node - node hasn't been loaded yet.");
        }
      }  
      // select properties to update, ideally, they should be filtered out already
      var props = {
        'label'         : node.label,
        'icon'          : node.icon,
        'iconSelected'  : node.iconSelected,
        'cellStyle'     : node.cellStyle,
        'labelStyle'    : node.labelStyle,
        'data'          : node.data,
        'columnData'    : node.columnData
      };

      // update node
      var model = this.getDataModel();
      model.setState(nodeId,props);

      // drag data alias FIXME: this is a hack!
      if (this.setNodeType && node.data.type)
      {
        //console.log("Setting d&d type of node client #"+nodeId+" to "+node.data.type);
        this.setNodeType( nodeId, node.data.type );
      }
      
      model.setData();
    },
    
    /**
     * gets the client-side node id from the server-side node id
     * @param serverNodeId {Integer}
     * @return {Integer}
     * @throws exception if node hasn't been loaded yet
     */
    getClientNodeId : function ( serverNodeId )
    {
      var map    = this.getServerNodeIdMap();
      var nodeId = map[serverNodeId];      
      if ( typeof(nodeId) != "number" )
      {
        throw new Error("Node server#"+serverNodeId+" hasn't been loaded");
      }
      return nodeId;
    },
    
    /**
     * Checks if node identified by its server-side id has already been loaded
     * @param nodeId {Integer} server-side node id
     * @return {Boolean}
     */
    isLoaded : function ( serverNodeId )
    {
      var map = this.getServerNodeIdMap();
      var isLoaded = ( typeof(map[serverNodeId]) == "number" );
      //console.log("Node server#"+serverNodeId+(isLoaded ? " is loaded.":" is not loaded."));
      return isLoaded;
    },
    
    /**
     * Checks if node identified by its server-side id has loaded its children
     * @param nodeId {Integer} server-side node id
     * @return {Boolean}
     */
    hasLoadedChildren : function ( serverNodeId )
    {
      var map    = this.getServerNodeIdMap();
      var nodeId = map[serverNodeId];
      
      // node not loaded
      if ( typeof(nodeId) != "number" ) return false;
      
      var node = this.nodeGet(nodeId);
      
      if ( typeof(node) != "object")
      {
        //console.warn("Node client#"+nodeId+"does not exist!");
        return false;
      }
      //console.log("node.children.length:"+node.children.length+",node.data.childCount:"+node.data.childCount);
      childrenLoaded = (node.children.length > 0 || node.data.childCount == 0 );
      //console.log("Children of node server#"+serverNodeId+(childrenLoaded ? " are loaded.":" are not loaded."));
      return childrenLoaded;
    },    
    
    /**
     * clears the tree, deleting the server-side node map
     */
    clear : function()
    {
      this.setServerNodeIdMap({});
      this.getSelectionModel().clearSelection();
      this.setServerNodeIdToSelect(null);
      this.setServerNodeIdSelected(null);   
      this.getDataModel().clearData();
    },
    
    /**
     * prunes a node identified by the server-side id. 
     * @param serverNodeId {Integer}
     * @param selfAlso {Boolean} Optional
     */
    pruneByServerNodeId : function( serverNodeId, selfAlso )
    {
      try 
      {
        var nodeId = this.getClientNodeId(serverNodeId);  
      } 
      catch(e) 
      {
        console.warn(e);
        return;
      }
      
      var _this = this;
      var map   = this.getServerNodeIdMap();
      var node  = this.nodeGet(nodeId);
      
      // recursive deletion function
      var delFunc = function(serverId)
      {
        var node1 = _this.nodeGet(map[serverId]); 
        if ( node1.children.length )
        {
          node1.children.forEach(function(clientId){
            var node2 = _this.nodeGet(clientId);
            delFunc(node2.data.id);
          });
        }
        delete map[serverId];
      }
      
      // remove children
      if ( node.children.length )
      {
        node.children.forEach(function(clientId){
          var node2 = _this.nodeGet(clientId);
          delFunc(node2.data.id);
        });
      }
      
      if (selfAlso)
      {
        delete map[serverNodeId];
      }
      
      // prune in tree data model
      this.getDataModel().prune(nodeId,selfAlso);

    },
    
    /**
     * sets the state of a node identified by the server-side id. 
     * @param serverNodeId {Integer}
     * @param state {Map} 
     */
    setStateByServerNodeId : function ( serverNodeId, state )
    {
      try 
      {
        var nodeId = this.getClientNodeId(serverNodeId);  
      } 
      catch(e) 
      {
        console.warn(e);
        return;
      }
      this.getDataModel().setState(nodeId,state);
    }   
  }
});
