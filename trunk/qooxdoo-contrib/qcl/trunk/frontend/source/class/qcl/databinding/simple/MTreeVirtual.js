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
  ---------------------------------------------------------------------------
    PROPERTIES
  ---------------------------------------------------------------------------
  */

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
      
      if ( ! data instanceof Array )
      {
        console.warn("Invalid rpc data." );
        return;
      }
      
      //console.log("Received " + data.length + " nodes." );
        
      // prune parent of first node, this assumes that all nodes 
      // sent have the same parent.       
      var parentNodeId = this.getParentNodeId(data[0]);
      
      //console.log("Parent node of 1st element: #"+parentNodeId);
      
      if ( parentNodeId !== null )
      {
        //console.log("Pruning node #"+parentNodeId);
        dataModel.prune(parentNodeId);  
        dataModel.setState(parentNodeId,{bOpened:true});        
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
          console.warn("Cannot find parent node for node server#" + node.data.id);
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
          console.warn("Node for node id "+ node + " does not exist:" + e);
          return;
        }
        
        if ( typeof(node) == "object" )
        {
          parentNodeId = node.parentNodeId;
          //console.log("Getting parentNodeId from object:"+ parentNodeId);          
        }
        else
        {
          console.warn("Node for node id "+ node + " does not exist.");
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
          console.warn("No node data!");
          return;
        }
        
        if ( typeof (node.data.parentId) == "number" )
        {
          // get parent node from data.parentId
          var parentNodeId = map[node.data.parentId];
          if ( typeof(parentNodeId) != "number" )
          {
            console.warn("Cannot find data.parentId #" + node.data.parentId );
            return 0;
          }        
        }   
        else 
        {
          console.warn("Cannot get parent node of node server#" + node.data.id);
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
            
            // remove last element
            ids.pop();
            
            // check if first node exists
            if ( typeof(map[ids[0]]) == "undefined" )
            {
              console.warn("First element in hierarchy must be loaded already!");
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
            }
            for ( var i=1; i<ids.length; i++)
            {
              this.__nodeIndexLoadChildren[ids[i]] = true;
            }
            //console.log("Loading first node of hierarchy id... server#"+ids[0]);
            loadNodeChildrenFunc(ids[0]);
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
    selectByServerNodeId : function (nodeId,loadNodeChildrenFunc,loadIdHierarchyFunc)
    {
      //console.log("selectByServerNodeId(" + nodeId + ")");
      var treeNodeId = this.getServerNodeIdMap()[nodeId];
      if ( treeNodeId )
      {
        //console.log("Selecting already loaded node #" + treeNodeId);
        // load has already been loaded, select it with a small timeout
        qx.client.Timer.once(function(){
          var row = this.getDataModel().getRowFromNodeId(treeNodeId); 
          if ( typeof(row) == "number" )
          {
            //console.log("Selecting row #" + row);
            this.scrollCellVisible(0,row);
            this.getSelectionModel().clearSelection();
            this.getSelectionModel().addSelectionInterval(row,row);        
            this.setServerNodeIdSelected(parseInt(nodeId));   
          }
          else
          {
            console.warn("No row number available for node client#" + treeNodeId + ", server#" + nodeId);  
          }
        },this,100);
      }
      else
      {
        //console.log("Cannot select, loading unloaded node #" + nodeId );
        if ( ! this.__nodeLoadedCheckSelectEvent )
        {
          // event listener that waits for nodes to be loaded. if the server-side id matches, the node is selected
          //console.log("Attaching nodeLoadedCheckSelectEvent event listener...");
          this.addEventListener("nodeLoaded",function(event){
            var node = event.getData();
            //console.log("Loaded node #"+node.data.id + ", we want to select #" + this.__selectNodeByServerId );
            var selId = this.getServerNodeIdToSelect();
            var isSelId = this.getServerNodeIdSelected();
            if ( selId && node.data && node.data.id == selId ) 
            {
              this.selectByServerNodeId(selId);
              this.setServerNodeIdToSelect(null); 
            }
            else if (isSelId)
            {
              this.selectByServerNodeId(isSelId);
            }
          },this);
          this.__nodeLoadedCheckSelectEvent = true;
        }
        // save node id for later, when the node has been loaded
        this.setServerNodeIdToSelect(parseInt(nodeId));   
        
        // load node(s)
        //console.log("Instead of selecting, we are Loading node server#"+nodeId);
        this.loadNodeByServerId(nodeId,loadNodeChildrenFunc,loadIdHierarchyFunc);
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
        // update node
        var model = this.getDataModel();
        model.setState(nodeId,node);
        model.setData();
      }
    }
  }
});
