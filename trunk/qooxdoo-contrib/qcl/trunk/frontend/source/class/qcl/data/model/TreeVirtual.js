/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/

   Copyright:
     2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger) 
     * Derrell Lipman

************************************************************************ */

/* ************************************************************************

#module(treevirtual)

************************************************************************ */

/**
 * A tree data model extending simple tree data model which fires events
 * similar to qx.data.Array. The events are only fired if the tree is modified
 * programmatically by the user through the add, prune, or move methods. 
 * In contrast, the ..data() methods are assumed to be used by the databinding 
 * controller and thus don't fire change events.
 * 
 * The tree data passed by the server looks like so:
 * 
 * {
 *   
 *   // obligatory properties
 *   type           : 1,   // 1 for a leaf, 2 for a branch,
 *   label          : "My Documents",
 *   
 *   // optional properties concerning layout
 *   bSelected      : true,  // true if node is selected; false otherwise.
 *   bOpened        : true,  // true (-), false (+)
 *   bHideOpenClose : false, // whether to hide the open/close button
 *   icon           : "images/folder.gif",
 *   iconSelected   : "images/folder_selected.gif",
 *   cellStyle      : "background-color:cyan"
 *   labelStyle     : "background-color:red;color:white"
 *   
 *   // optional properties concerning the tree structure 
 *   nodeId         : 1,   // optional, see below 
 *   parentNodeId   : 23,  // optional, see below
 *   children       : [ 35, 46, 99 ], // optional, see below   
 *
 *   // optional column data
 *   columnData     : [
 *                      null, // null at index of tree column (typically 0)
 *                      "text of column 1",
 *                      "text of column 2"
 *                    ],
 *                    
 *   // if you want to synchronize trees with each other or with the server,
 *   // you have to supply the parent-child relationship as it exists on the
 *   // server
 *   data           : { 
 *                      id : 1       
 *                      parentId : 0
 *                    },
 * 
 * The model supports two kind of tree structures, parent-centric trees and
 * child-centric trees. 
 * 
 * a) parent-centric trees are those which consist of nodes that contain 
 * a reference to their parent node. These refernces are stored either in
 * the nodeId and parentNodeId property or in the data property. The former 
 * can only be used if the whole tree data is provided at once, which is
 * impractical when dealing with very large trees. The latter mirrors the way
 * the tree is stored in the database on the server. The id and parent id are
 * stored as properties of the "data" property map of the node. The nodeId
 * and parentNodeId properties are determined by the client, and should not be 
 * used when dealing with the tree. Instead, only the server node id is used and,
 * if needed, translated on the fly by the getClientNodeId() method. 
 * 
 * b) child-centric trees are those which store the children ids similar to the
 * way the tree data model is stored internally. This works only with small trees 
 * that are loaded at once by the store. In this kind of tree data, each node 
 * needs to contain a 'nodeId' property and a 'children' property containing an 
 * array with the ids of the child nodes. 
 * 
 * The model data fires "change" and "changeBubble" events similar to {@link qx.data.Array}.
 * 
 * 
 */
qx.Class.define("qcl.data.model.TreeVirtual",
{

  extend : qcl.data.model.SimpleTreeDataModel,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);
  },
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  
  properties : 
  {
    /**
     * An array of the names of those node properties that should be 
     * synchronized through databinding
     */
    syncNodeProperties :
    {
      check : "Array",
      nullable: false,
      init : ["label","icon","iconSelected","columnData","data"]
    },
    
   /**
    * The controller object of this model
    */
   controller :
   {
     check : "qcl.data.controller.TreeVirtual",
     nullable : true
   }    
  },
  
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */  

  events :
  {
    /**
     * The change event which will be fired if there is a change in the array.
     * The data contains a map with three key value pairs:
     * <li>start: The start index of the change.</li>
     * <li>end: The end index of the change.</li>
     * <li>type: The type of the change as a String. This can be 'add',  
     * 'remove' or 'order'</li>
     * <li>items: The items which has been changed (as a JavaScript array).</li>
     */
    "change" : "qx.event.type.Data",
    
    /**
     * Event signaling that the model data has changed
     */
    "changeBubble" : "qx.event.type.Data"
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
    __nodeIdMap : [],
    __dontFireEvents : false,
    
    /*
    ---------------------------------------------------------------------------
       ADDED METHODS
    ---------------------------------------------------------------------------
    */             
    
    /**
     * Returns the node with the given id
     * @param nodeId {Integer}
     */
    getNode : function( nodeId )
    {
      return this.getData()[nodeId||0];
    },

    /** 
     * Adds a child node from raw map data without firing events.
     * No data check is performed, so be sure that the data is valid. The nodeId
     * and parentNodeId properties of each node will be reassigned so they do not
     * conflict with existing ids. This method is only used internally.
     *
     * @param nodeId {parentNodeId||null} The id of the node that the new branch is added to or null
     *   if this id should be retrieved from the node data
     * @param data {Array} The data from which the node is taken from 
     * @param nodeId {Int} The id of the node (index in the data array)
     * @return {Array} The ids of the nodes added
     */    
     __addNodeData : function( parentNodeId, data, nodeId )
     {
       
       /*
        * The node in the new data
        */
       var newNode = data[nodeId];

       /*
        * skip an empty node or a root node
        */
       if ( ! newNode || newNode.nodeId == 0 )
       {
         return [];
       }
       
       /*
        * skip if this node has already been added (if the tree model is child-centric)
        */
       if ( newNode.__isAdded == this.toHashCode() )
       {
         //this.info( "Node (" + nodeId + ") has already been added." );
         return [];
       }
       
       /*
        * If this is a leaf, we don't present open/close icon
        */
       if ( newNode.type && newNode.type == qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF )
       {
         // mask off the opened bit but retain the hide open/close button bit
         var bOpened = false;
         var bHideOpenCloseButton = false;
       }
       else
       {
         var bOpened = newNode.bOpened;
         var bHideOpenCloseButton = newNode.bHideOpenCloseButton;
       }

       /*
        * new node id in the tree
        */
       var newNodeId = this.getData().length;
        
       /*
        * use default parentNodeId, might be overridden further down.
        */
       var parentNodeId = parentNodeId !== null ? parentNodeId : newNode.parentNodeId;
       
       /*
        * add node id at the beginning of node id list   
        */    
       var nodeIds = [];
       nodeIds.unshift( newNodeId );
       
       //this.info("Adding new node '" + newNode.label + "' client node #" + newNodeId + "/@" + nodeId );
       //if ( newNode.data && newNode.data.id !== undefined) this.info("Server node #" +newNode.data.id );

       /*
        * set the data for this node.
        */
       var node =
       {
         type           : newNode.type||qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH,
         nodeId         : newNodeId,
         parentNodeId   : parentNodeId,
         label          : newNode.label,
         bSelected      : false,
         bOpened        : bOpened,
         bHideOpenClose : bHideOpenCloseButton,
         icon           : newNode.icon || null,
         iconSelected   : newNode.iconSelected || null,
         children       : [],
         columnData     : newNode.columnData || [],
         lastChild      : [false],
         data           : newNode.data || {}
       };
      
       /*
        * save in node array and store the original id
        */
       this.getData().push(node);
       data[nodeId].__newId = newNodeId;
       
       /*
        * mark node as already added
        */
       data[nodeId].__isAdded = this.toHashCode();
       
       /*
        * save server node id in map
        * @todo rewrite
        */
       if ( newNode.data && newNode.data.id != undefined )
       {
         this.mapServerIdToClientId( newNode.data.id, newNodeId );
       }

       
     /* 
      * Configure the parent-children relationship in the data. The data either
      * contains references to the parent (parent-centric) or to the children
      * (child-centric). This requires that the whole tree is consistent within
      * itself.
      */
      var childIds = newNode.children;
      if ( childIds instanceof Array && childIds.length )
      {
        /*
         * we have a children array and traverse this recursively
         */
        for( var i=0; i < childIds.length; i++) 
        {          
          var childNodeId = childIds[i];
          
          //this.info( "Adding Child (" + childNodeId + ") to node '" + node.label + "' #" + newNodeId + "(" + nodeId + ")");
          var childNodeIds = this.__addNodeData( newNodeId, data, childNodeId );
                  
          /*
           * mark node as already added
           */
          data[childNodeId].__isAdded = this.toHashCode();
          
          /*
           * add ids to list
           */
          nodeIds.concat( childNodeIds );
        };
        
      }

       /*  
        * if the model is parent-centric, you can override the data contained in the nodes
        * by providing the parentNodeId parameter for this method. If you don't,
        * we try to find out the parent id. This requires that the parent node already
        * exists.
        */
       else if ( parentNodeId === null || parentNodeId === undefined )
       {
         /* 
          * get id from server node id?
          * @todo rewrite using methods  
          */
         if ( node.data && node.data.parentId !== undefined )
         {
           parentNodeId = this.getClientNodeId( node.data.parentId );
           //this.info( "Server parent node #" + node.data.parentId + " => client parent node #" + parentNodeId);
         }
          
         /*
          * Else, get id from the internal reference of the new data.
          * this works only whithin one batch of data. Consecutive
          * requests cannot refer to original ids this way.
          */
         else if ( node.parentNodeId !== undefined && node.parentNodeId !== null  )
         {
           try
           {
             parentNodeId = data[ node.parentNodeId ].__newId;
             console.log(parentNodeId);
           }
           catch(e)
           {
             this.error("Cannot find parent node for node @" + nodeId + ", parent node @" + data[nodeId].parentNodeId );
           }
         }
         
         /*
          * else, no parent id is available
          */
         else 
         {
           this.error("Data neither contains parent or child ids. Cannot build tree.");
         }
       }
      
       /*
        * configure node and parent node
        */
       var parentNode = this.getData()[parentNodeId];
       if ( parentNode === undefined )
       {
         this.error("Cannot find parent node of node @" + nodeId + ", parent node #" + parentNodeId );
       }
       node.parentNodeId = parentNodeId;
       parentNode.children.push( newNodeId );
       //this.info( "Adding # "+ newNodeId + " to parent #" + parentNodeId + "(" + this.toHashCode() +")" );
       
       /*
        * return the list of ids that have been added 
        */
       return nodeIds;
     },
     
     
    /** 
     * Adds raw tree data without firing events.
     * No data check is performed, so be sure that the data is valid. The nodeId
     * and parentNodeId properties of each node will be reassigned so they do not
     * conflict with existing ids.
     * @param nodeId {parentNodeId} The id of the node that the new branch is added
     *   to
     * @param node {Array} An array of raw node map data.
     * @return {Array} The ids of the nodes added
     */        
     addData : function( parentNodeId, treeData )
     {
       var nodeIds = [];

       /*
        * add new data
        */
       for ( var i=0; i< treeData.length; i++ )
       {
         node = treeData[i];
         nodeIds.concat( this.__addNodeData( parentNodeId, treeData, i ) );
       };
       
       return nodeIds;
     },
     
    /**
     * Copies the data from another data model. Won't fire change events.
     * @param dataModel {Object}
     * @return {Void}
     */
     copyData : function( data )
     {
       //@todo check data

       /*
        * empty the target data
        */
       this.clearData();

       /*
        * add the source data except the root node
        */
       this.addData( null, data );
       this.setData();
     },

     /**
      * Removes a whole node and children from the internal data without
      * dispatching events. 
      * @param nodeId {Int}
      * @return {Void} 
      */
     _removeNodeData : function( nodeId )
     {
        this.__dontFireEvents = true;
        this.prune( nodeId, ( nodeId > 0 ) );
        this.__dontFireEvents = false;
     },
     
     /**
      * Returns the server-side node id, given its client-side id
      * @param clientNodeId {Integer}
      * @return {Integer}
      */
     getServerNodeId : function( clientNodeId )
     {
       if ( ! clientNodeId ) return 0;
       try
       {
         var serverNodeId =  this.getData()[ clientNodeId ].data.id;
       }
       catch(e)
       {
         this.error("No server node id for client node #" + clientNodeId );
       }
       return serverNodeId;
     },
     
     /**
      * Sets the server node id of a given client node id
      * @param clientNodeId {Integer}
      * @param serverNodeId {Integer}
      * @return {Void}
      */
     setServerNodeId : function ( clientNodeId, serverNodeId )
     {
        if ( ! clientNodeId ) return;
        var node = this.getNode(clientNodeId);
        if ( ! node.data ) node.data = {};
        node.data.id = serverNodeId;
     },

    /**
     * Sets the server parent node id of a given client node id
     * @param clientNodeId {Integer}
     * @param serverParentNodeId {Integer}
     * @return {Void}
     */
     setServerParentNodeId : function ( clientNodeId, serverParentNodeId )
     {
       if ( ! clientNodeId ) return;
       var node = this.getNode(clientNodeId);
       if ( ! node.data ) node.data = {};
       node.data.parentId = serverParentNodeId;
     },    
     
     /**
      * Returns the client-side node id, given its server-side  id
      * @param serverNodeId {Integer}
      * @return {Integer}
      */
     getClientNodeId : function( serverNodeId )
     {
       if ( ! serverNodeId ) return 0;
       var clientNodeId = this.__nodeIdMap[serverNodeId];
       
       if ( clientNodeId == undefined )
       {
         this.error("No client node id for server node #" + serverNodeId );
       }
       return clientNodeId;
     },
     
     /**
      * Maps the client node id to a server node id
      * @param serverNodeId {Integer}
      * @param clientNodeId {Integer}
      * @return {Void}
      */
     mapServerIdToClientId : function ( serverNodeId, clientNodeId )
     {
       this.__nodeIdMap[serverNodeId] = clientNodeId;
     },       
          
     
     /*
     ---------------------------------------------------------------------------
        OVERRIDDEN METHODS
     ---------------------------------------------------------------------------
     */  
     
    /**
     * Add a node to the tree.
     * See overridden method for details.
     */
    _addNode : function(parentNodeId,
                        label,
                        bOpened,
                        bHideOpenCloseButton,
                        type,
                        icon,
                        iconSelected)
    {
      var nodeId = this.base(
        arguments,
        parentNodeId,
        label,
        bOpened,
        bHideOpenCloseButton,
        type,
        icon,
        iconSelected
      );
      
      /*
       * fire change event
       */
      this.fireDataEvent("change",
      {
          "start"    : nodeId,
          "end"      : nodeId,
          "type"     : "add"
       });
      
      return nodeId;       
    },
    
    /**
     * Prune the tree by removing, recursively, all of a node's children.  If
     * requested, also remove the node itself.
     *
     * see overridden method for details
     *
     */
    prune : function( nodeReference, bSelfAlso, isRecursive )
    {
      
       var nodeId = ( typeof nodeReference == "object" ) ? nodeReference.nodeId : nodeReference;
      
       /*
        * fire event, but only once
        */
       if ( ! isRecursive && ! this.__dontFireEvents )
       {
         this.fireDataEvent("change",{
           "start"    : nodeId,
           "end"      : nodeId,
           "type"     : "remove"
         });
         
       }
       
       this.base(arguments, nodeReference, bSelfAlso);
    },
    

    /**
     * Move a node in the tree.
     *
     * See overridden method for details.
     */
    move : function(moveNodeReference, parentNodeReference)
    {
      /*
       * get node and node id
       */
       var nodeId = ( typeof nodeReference == "object" ) ? nodeReference.nodeId : nodeReference;
       
       /*
        * commit changes
        */
       this.base(arguments, moveNodeReference, parentNodeReference);
       
       /*
        * fire change event
        */
       this.fireDataEvent("change",{
         "start"    : nodeId,
         "end"      : nodeId,
         "type"     : "move"
       });     
    },
    
    /**
     * Sets a value.
     * See overridden method for details
     */
    setValue : function(columnIndex, rowIndex, value)
    {
      if (columnIndex == this._treeColumn)
      {
        /*
         * Ignore requests to set the tree column data using this method
         */
        return;
      }

      /*
       * convert from rowArr to nodeArr, and get the requested node
       */
      var node = this.getNodeFromRow(rowIndex);
      var oldValue = node.columnData[columnIndex];
      
      if ( oldValue != value)
      {
        node.columnData[columnIndex] = value;
        
        this.setData();

        /*
         * event for table listeners which do the 
         * visual update
         */
        if ( this.hasListener("dataChanged") )
        {
          var data =
          {
            firstRow    : node.nodeId,
            lastRow     : node.nodeId,
            firstColumn : columnIndex,
            lastColumn  : columnIndex
          };

          this.fireDataEvent("dataChanged", data);
        }
        
        /*
         * event for databinding listeners
         */
        this.fireDataEvent("changeBubble", {
          "value"    : value,
          "name"     : "data[" + node.nodeId + "].columnData[" + columnIndex + "]",
          "old"      : oldValue
        });
  
      }
    },
    

    /**
     * Set state attributes of a node.
     *
     * see overridden method for details.
     */
    setState : function( nodeReference, attributes )
    {
       /* 
        * get node and node id
        */
       var nodeId = ( typeof nodeReference == "object" ) ? nodeReference.nodeId : nodeReference;
       var node   = ( typeof nodeReference == "object" ) ? nodeReference : this.getData()[nodeReference]; 
       
       /*
        * set all attributes in the map
        */
       for ( var key in attributes )
       {
         if ( qx.lang.Array.contains( this.getSyncNodeProperties(), key ) )
         {
            this.fireDataEvent("changeBubble",{
              "value" : attributes[key],
              "name"  : "data[" + nodeId + "]." + key,
              "old"   : node[key]
            });
         }
       }
       
       /*
        * apply changes
        */
       this.base(arguments, nodeReference, attributes);        
    },
    
    /**
     * Add data to an additional column (a column other than the tree column)
     * of the tree.
     *
     * See overridden method for details
     */
    setColumnData : function( nodeId, columnIndex, data)
    {
      var old = this.getData()[nodeId].columnData[columnIndex];
      this.getData()[nodeId].columnData[columnIndex] = data;

      /*
       * event for databinding listeners
       */
      this.fireDataEvent("changeBubble", {
        "value"    : value,
        "name"     : "data[" + nodeId + "].columnData[" + columnIndex + "]",
        "old"      : oldValue
      });
    }    
  }
});
