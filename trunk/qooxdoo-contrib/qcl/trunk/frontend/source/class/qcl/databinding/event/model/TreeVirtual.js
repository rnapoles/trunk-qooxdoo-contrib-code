/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#module(treevirtual)

************************************************************************ */

/**
 * A tree data model extending simple tree data model which fires events
 * similar to qx.data.Array. The events are only fired if the tree is modified
 * programmatically by the user through the add, prune, or move methods. 
 * In contrast, the ..data() methods are assumed to be used by the databinding 
 * controller.
 */
qx.Class.define("qcl.databinding.event.model.TreeVirtual",
{

  extend : qcl.databinding.event.model.SimpleTreeDataModel,


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
    * This is the only property of the model, which will be bound to the
    * data store's corresponding property 
    *
   data : 
   {
     check: "Array",
     event: "changeData",
     init:  null
   }*/
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
     * The changeLength event will be fired every time the length of the
     * array changes.
     */
    "changeLength": "qx.event.type.Event",
    
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
    // private members
    __nodeIdMap : [],
    
    
    // overridden
    setValue : function(columnIndex, rowIndex, value)
    {
      if (columnIndex == this._treeColumn)
      {
        // Ignore requests to set the tree column data using this method
        return;
      }

      // convert from rowArr to nodeArr, and get the requested node
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
        if  (this.hasListener("changeBubble") )
        {
          var data =
          {
            "value"    : value,
            "name"     :  "data[" + node.nodeId + "].columnData[" + columnIndex + "]",
            "old"      : oldValue
          };
          this.fireDataEvent("changeBubble", data);
        }        
      }
    },

    /**
    * Set state attributes of a node.
    *
    * @param nodeReference {Object | Integer}
    *   The node to have its attributes set.  The node can be represented
    *   either by the node object, or the node id (as would have been
    *   returned by addBranch(), addLeaf(), etc.)
    *
    * @param attributes {Map}
    *   Each property name in the map may correspond to the property names of
    *   a node which are specified as <i>USER-PROVIDED ATTRIBUTES</i> in
    *   {@link #SimpleTreeDataModel}.  Each property value will be assigned
    *   to the corresponding property of the node specified by nodeId.
    *
    * @return @return {Int} The id of the node
    */
   setState : function(nodeReference, attributes) 
   {
      var nodeId = this.base(arguments,nodeReference, attributes);
      
      /*
       * event for databinding listeners
       */
      if  (this.hasListener("changeBubble") )
      {
        for ( key in attributes )
        {
          
          var data =
          {
            "value"    : value,
            "name"     : key,
            "old"      : null /* @todo */
          };
          this.fireDataEvent("changeBubble", data);
          
        }
      }    
     return nodeId;
   },
    
    
    /**
     * Add a node to the tree.
     *
     * NOTE: This method is for <b>internal use</b> and should not be called by
     *       users of this class.  Instead, call {@link #addBranch} or {@link
     *       #addLeaf}.  There is no guarantee that the interface to this
     *       method will remain unchanged over time.
     *
     * @param parentNodeId {Integer}
     *   The node id of the parent of the node being added
     *
     * @param label {String}
     *   The string to display as the label for this node
     *
     * @param bOpened {Integer}
     *   <i>true</i> if the tree should be rendered in its opened state;
     *   <i>false</i> otherwise.
     *
     * @param bHideOpenCloseButton {Boolean}
     *   <i>true</i> if the open/close button should be hidden (not displayed);
     *   </i>false</i> to display the open/close button for this node.
     *
     * @param type {Integer}
     *   The type of node being added.  The type determines whether children
     *   may be added, and determines the default icons to use.  This
     *   parameter must be one of the following values:
     *   <dl>
     *     <dt>qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH</dt>
     *     <dd>
     *       This node is a branch.  A branch node may have children.
     *     </dd>
     *     <dt>qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF</dt>
     *     <dd>
     *       This node is a leaf, and may not have children
     *     </dd>
     *   </dl>
     *
     * @param icon {String}
     *   The relative (subject to alias expansion) or full path of the icon to
     *   display for this node when it is not a selected node.
     *
     * @param iconSelected {String}
     *   The relative (subject to alias expansion) or full path of the icon to
     *   display for this node when it is a selected node.
     *   <p>
     *   NOTE: As of 13 Mar 2009, this feature is disabled by default, by
     *         virtue of the fact that the tree's "alwaysUpdateCells" property
     *         has a setting of 'false' now instead of 'true'. Setting this
     *         property to true allows the icon to change upon selection, but
     *         causes problems such as single clicks not always selecting a
     *         row, and, in IE, double click operations failing
     *         completely. (For more information, see bugs 605 and 2021.) To
     *         re-enable the option to have a unique icon that is displayed
     *         when the node is selected, issue
     *         <code>tree.setAlwaysUpdateCells(true);</code>
     *
     * @return {Integer} The node id of the newly-added node.
     *
     * @throws TODOC
     */
    _addNode : function(parentNodeId,
                        label,
                        bOpened,
                        bHideOpenCloseButton,
                        type,
                        icon,
                        iconSelected)
    {
      var nodeId = this.base(arguments,
                              parentNodeId,
                              label,
                              bOpened,
                              bHideOpenCloseButton,
                              type,
                              icon,
                              iconSelected);
        if (this.hasListener("change"))
        {
          var data =
          {
            "start"    : nodeId,
            "end"      : nodeId,
            "type"     : "add"
          };
          this.fireDataEvent("change", data);
          this.fireDataEvent("changeLength");
        } 
        
        return nodeId;       
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

      if ( ! newNode )
      {
        this.warn( "No node exists for index " +  nodeId );
        return [];
      }
      
      /*
       * skip if this node has already been added (if the tree model is child-centric)
       */
      if ( newNode.__isAdded )
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
        parentNodeId   : newNode.parentNodeId,
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
      data[nodeId].__isAdded = true;
      
      /*
       * save server node id in map
       */
      if ( newNode.data && newNode.data.id != undefined )
      {
        this.__nodeIdMap[newNode.data.id] = newNodeId;
      }
      
    /* 
     * Configure the parent-children relationship in the data. The data either
     * contains references to the parent (parent-centric) or to the children
     * (child-centric)
     */
     var childIds = data[nodeId].children;
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
                 
         // mark node as already added
         data[childNodeId].__isAdded = true;
         
         // add ids to list
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
      //this.info( "Adding # "+ newNodeId + " to parent #" + parentNodeId );
      
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
    addTreeData : function( parentNodeId, treeData )
    {
      var nodeIds = [];
      
      // add new data
      for ( var i=0; i< treeData.length; i++ )
      {
        node = treeData[i];
        if ( ! node ) continue;
        nodeIds.concat( this.__addNodeData( parentNodeId, treeData, i ) );
      };
      
      return nodeIds;
    },
    
    
    /**
     * Removes a whole node and children from the internal data without
     * dispatching events. 
     * @param nodeId {Int}
     * @return {Int} The node id of the top node removed
     */
    _removeNodeData : function( nodeId )
    {
      return this.prune( nodeId, new Boolean(nodeId), false );
    },
    
    
    /**
     * Prune the tree by removing, recursively, all of a node's children.  If
     * requested, also remove the node itself.
     *
     * @param nodeReference {Object | Integer}
     *   The node to be pruned from the tree.  The node can be represented
     *   either by the node object, or the node id (as would have been
     *   returned by addBranch(), addLeaf(), etc.)
     *
     * @param bSelfAlso {Boolean}
     *   If <i>true</i> then remove the node identified by <i>nodeId</i> as
     *   well as all of the children.
     *
     * @return {int} The id of the deleted node
     */
    prune : function(nodeReference, bSelfAlso, fireEvents)
    {
       var nodeId = this.base(arguments, nodeReference, bSelfAlso);
        
       // fire event
       if (fireEvents !== false && this.hasListener("change"))
       {
         var data =
         {
           "start"    : nodeId,
           "end"      : nodeId,
           "type"     : "remove"
         };
         this.fireDataEvent("change", data);
         this.fireDataEvent("changeLength");
       }        
       return nodeId;
    },


    /**
     * Move a node in the tree.
     *
     * @param moveNodeReference {Object | Integer}
     *   The node to be moved.  The node can be represented
     *   either by the node object, or the node id (as would have been
     *   returned by addBranch(), addLeaf(), etc.)
     *
     * @param parentNodeReference {Object | Integer}
     *   The new parent node, which must not be a LEAF.  The node can be
     *   represented either by the node object, or the node id (as would have
     *   been returned by addBranch(), addLeaf(), etc.)
     *
     * @return {Array} An array containing the id of the moved node, the id of
     *   the node's previous parent and the id of the id's new parent
     */
    move : function(moveNodeReference,
                    parentNodeReference)
    {
       var idArr = this.base(arguments, moveNodeReference, parentNodeReference);
        
       // fire event
       if ( this.hasListener("change") )
       {
         for (var i=0; i<3; i++)
         {
           var data =
           {
             "start"    : idArr[i],
             "end"      : idArr[i],
             "type"     : "order"
           };
           this.fireDataEvent("change", data);
         }
       }        
       return idArr;
    },

    /**
     * Add data to an additional column (a column other than the tree column)
     * of the tree.
     *
     * @param nodeId {Integer}
     *   A node identifier, as previously returned by {@link #addBranch} or
     *   {@link addLeaf}.
     *
     * @param columnIndex {Integer}
     *   The column number to which the provided data applies
     *
     * @param data {var}
     *   The cell data for the specified column
     *
     * @return {void}
     */
    setColumnData : function(nodeId, columnIndex, data)
    {
      var old = this._nodeArr[nodeId].columnData[columnIndex];
      this._nodeArr[nodeId].columnData[columnIndex] = data;
      
       // fire event
       if (this.hasListener("changeBubble"))
       {
          var evd =
          {
            "value"    : data,
            "name"     : "data[" + nodeId + "].columnData[" + columnIndex + "]",
            "old"     : old
          };
          this.fireDataEvent("changeBubble", evd );
       }         
    },

    /**
     * Set state attributes of a node.
     *
     * @param nodeReference {Object | Integer}
     *   The node to have its attributes set.  The node can be represented
     *   either by the node object, or the node id (as would have been
     *   returned by addBranch(), addLeaf(), etc.)
     *
     * @param attributes {Map}
     *   Each property name in the map may correspond to the property names of
     *   a node which are specified as <i>USER-PROVIDED ATTRIBUTES</i> in
     *   {@link #SimpleTreeDataModel}.  Each property value will be assigned
     *   to the corresponding property of the node specified by nodeId.
     *
     * @return {Int} The id of the node
     */
    setState : function(nodeReference, attributes)
    {
       var nodeId = this.base(arguments, nodeReference, attributes);
       var old = this.getData()[nodeId].data;
       
       // fire event
       if ( this.hasListener("changeBubble") )
       {
          var data =
          {
            "value"    : attributes,
            "name"     : "data[" + nodeId + "].data",
            "old"     : old
          };
          this.fireDataEvent("changeBubble", data);
       }
       
       // look for server id changes
       if ( attributes.data && attributes.data.id && attributes.data.id != old.data.id )
       {
         this.__nodeIdMap[nodeId] = attributes.data.id;
       }
       return nodeId;          
    },
    
    getServerNodeId : function( clientNodeId )
    {
      if ( ! clientNodeId ) return 0;
      try
      {
        var serverNodeId =  this.getData()[clientNodeId].data.id;
      }
      catch(e)
      {
        this.error("No server node id for client node #" + clientNodeId );
      }
      return serverNodeId;
    },
    
    getClientNodeId : function( serverNodeId )
    {
      if ( ! serverNodeId ) return 0;
      var clientNodeId = this.__nodeIdMap[serverNodeId];
      if ( typeof clientNodeId == undefined )
      {
        this.error("No client node id for server node #" + serverNodeId );
      }
      return clientNodeId;
      
    }
     
     
  }
});
