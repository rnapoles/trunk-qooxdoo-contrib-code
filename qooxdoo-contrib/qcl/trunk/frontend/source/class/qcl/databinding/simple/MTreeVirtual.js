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

  properties : {},




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
     * @return {Array} TODOC
     */
    handleServerData : function( data )
    {
      var dataModel = this.getDataModel();
			var pruneParent = true; // prune parent node once
      
      if ( data && typeof data == "object" && data.length )
      {
			  
        // prune parent of first node, this assumes that all nodes 
        // sent have the same parent.
        var parentNodeId = data[0].parentNodeId || 0; 
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
			    
          // index node id to data properties put into user data
          if ( node.index )
          {
            if (!this.getUserData(node.index.name))
            {
              this.setUserData(node.index.name,{});  
            }                    
            this.getUserData(node.index.name)[node.index.key]=nodeId;
            delete node.index;
          }
          
			    // set node state, including custom properties
			    delete node.parentNodeId;
					dataModel.setState( nodeId, node );
					
					// drag data alias
					if (this.setNodeType && node.data && node.data.type)
					{
						this.setNodeType( nodeId, node.data.type );
					}

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
     * returns the values of the given column in the selected indexes as an array
     *
     * @type member
     * @param column {String | Number} Column id or column index
     * @param condition {Map} if given, the column will only be added if the column identified by the key matches the value
     * @return {Array} TODOC
     */
    getSelectionColumnValues : function(column, condition)
    {


      return values;
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
