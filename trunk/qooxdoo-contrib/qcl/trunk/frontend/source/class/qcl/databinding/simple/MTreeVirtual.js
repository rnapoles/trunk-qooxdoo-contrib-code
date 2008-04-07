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
     * returns the selected indexes as an array
     *
     * @type member
     * @param data {Object}
     * @return {void}
     */
    handleServerData : function( data )
    {
      var dataModel   = this.getDataModel();
			var map         = this.getServerNodeIdMap();
			var pruneParent = true; // prune parent node once
      
      if ( data && typeof data == "object" && data.length )
      {
				var parentNodeId = data[0].parentNodeId;
				if ( parentNodeId === null )
				{
					if ( data.node && data.node.id )
					{
						if ( typeof map[data.node.id] == "undefined" )
						{
							// get parent node from map
							parentNodeId = map[data.node.id].parentNodeId;
						}
						else
						{
							this.warn("Parent node of node '" + data.label + "' has not been loaded yet. Skipping." );
						}	
					}
					else
					{
						this.warn("Cannot attach node '" + data.label + "'. Neither parent node id nor server-side id is available. Skipping." );
					}	
				}
				
        // prune parent of first node, this assumes that all nodes 
        // sent have the same parent.
        dataModel.prune(parentNodeId);  
        dataModel.setState(parentNodeId,{bOpened:true});
        
        for (var i=0; i<data.length;i++)
			  {
			    var node = data[i];
			    
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
			    if( node.isBranch )
			    {
			      var nodeId = dataModel.addBranch( node.parentNodeId || 0 );
			    }
			    else
			    {
			      var nodeId = dataModel.addLeaf( node.parentNodeId || 0 );								      
			    }
          
					// store server-side node id
					if ( node.data && node.data.id )
					{ 
						map[node.data.id] = nodeId;
					}
					
			    // set node state, including custom properties
			    delete node.parentNodeId;
					dataModel.setState( nodeId, node );
					
					// drag data alias
					if (this.setNodeType && node.data && node.data.type)
					{
						this.setNodeType( nodeId, node.data.type );
					}
					
					// dispatch event
					this.createDispatchDataEvent("nodeLoaded",node);
			  }
			  // update tree
			  dataModel.setData();            
      }
      else
      {
        this.warn("Invalid rpc data!");
      }
    },


    /**
     * Loads a tree node of which the server-side Id is known
     * this will also load all ancestors and siblings of this node.
     * @type member
     * @param nodeId {Int} id of the node on the server
     * @param loadNodeFunc {Function} function that loads a node from the server
     * @param loadIdHierarchyFunc {Function} function that calls the  
     * service method on the server, which dispatches a "nodeIdHierarchyLoaded"
     * event with an array of ids, starting with the top folder to the node to be
     * loaded. 
     * 
     * @return {void} 
     */
    loadNodeByServerId : function(nodeId,loadNodeFunc,loadIdHierarchyFunc)
    {
			if ( ! this.getServerNodeIdMap()[nodeId] )
			{
				// node has not been loaded, add event listener if it hasn't been added yet
				if ( ! this.__nodeIdHierarchyLoadedEvent )
				{
					this.addEventListener("nodeIdHierarchyLoaded",function(ids)
					{
						// load all of the nodes along the hierarchy of nodes
						ids.forEach(function(id){
							loadNodeFunc(id)
						},this); 
					});
					this.__nodeIdHierarchyLoadedEvent = true;
				}
				// dispatch server request
				loadIdHierarchyFunc(nodeId );
			}
    },

		/**
		 * selects a node by its server-side id.
		 * @param {Object} nodeId
		 */
		selectByServerNodeId : function (nodeId)
		{
			var treeNodeId = this.getServerNodeIdMap()[nodeId];
			if ( treeNodeId )
			{
				// load has already been loaded, select it with a small timeout
	      qx.client.Timer.once(function(){
          var row = this.getDataModel()._nodeRowMap[treeNodeId]; // todo: getRowFromNodeId(nodeId); in current trunk 
          this.scrollCellVisible(0,row);
          this.getSelectionModel().addSelectionInterval(row,row);
	      },this,500);
			}
			else
			{
				if ( ! this.__nodeLoadedEvent )
				{
					// event listener that waits for nodes to be loaded. if the server-side id matches, the node is selected
					this.addEventListener("nodeLoaded",function(node){
			      if ( this.__selectNodeByServerId && node.data && node.data.id == this.__selectNodeByServerId ) 
						{
							this.__selectNodeByServerId = null;
							this.selectByServerNodeId(node.data.id);
						}
					});
					this.__nodeLoadedEvent = true;
				}
				// save node id for later, when the node has been loaded
				this.__selectNodeByServerId = nodeId;		
				
				// load node(s)
				this.loadNodeByServerId(nodeId);
			}			
		},
		

    /**
     * returns the values of a column as a map
     *
     * @type member
     * @param column {String | Number} Column id or column index
     * @param rowsToValues {Boolean} If true, map rows to values, if undefined or false, map values to rows
     * @return {Map} TODOC
     */
    getColumnValueMap : function(column, rowsToValues)
    {

      return map;
    }
  }
});
