/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2010 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
   *  saaj <mail@saaj.me>
  
************************************************************************ */

qx.Class.define("dragdroptree.TreeModel",
{
  extend     : qx.ui.treevirtual.SimpleTreeDataModel,

  members : 
  {

    
    
  	loadData : function()
  	{
  		var data = [
        {"title":"Mogwai","parentId":1,"visible":true,"folder":true},
        {"title":"Incubus","parentId":1,"visible":true,"folder":true},
        {"title":"dredg","parentId":1,"visible":true,"folder":true},
        {"title":"Oceansize","parentId":1,"visible":true,"folder":true},
        {"title":"Radiohead","parentId":1,"visible":true,"folder":true},
        {"title":"Yourcodenameis:milo","parentId":1,"visible":true,"folder":true},
        {"title":"Tool","parentId":1,"visible":true,"folder":true},
        {"title":"Aereogramme","parentId":1,"visible":true,"folder":true},
        {"title":"Rishloo","parentId":1,"visible":true,"folder":true},
        {"title":"Balmorhea","parentId":1,"visible":true,"folder":true}    
      ];

    	this._appendNodes(data);
  	},

  	_appendNodes : function(nodes)
  	{
      if(!(nodes instanceof Array))
      {
        throw new Error("Nodes must be represented by Array");
      }

      var tree = this.getTree();
      var nodeId;
      nodes.forEach(function(node)
      {
      	node.parentId = node.parentId == 1 ? null : node.parentId;

        if(node.folder)
        {
          nodeId = this.addBranch(node.parentId, node.title, node.visible, false, false);
          tree.setNodeDragType && tree.setNodeDragType(nodeId, "folder");
        }
        else
        {
          nodeId = this.addLeaf(node.parentId, node.title, node.visible);
          tree.setNodeDragType && tree.setNodeDragType(nodeId, "leaf");
        }
      }, this);

      this.getTree().setNodeDragType(0, "root");
      this.setData();
  	}
  }

});