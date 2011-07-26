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

/* ************************************************************************

#asset(dragdroptree/*)
#asset(qx/icon/${qx.icontheme}/16/mimetypes/text-plain.png)
#asset(qx/icon/${qx.icontheme}/16/places/folder.png)

************************************************************************ */

/**
 * This is the main application class of your custom application "dragdroptree"
 */
qx.Class.define("dragdroptree.Application",
{
  extend : qx.application.Standalone,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // support native logging capabilities, e.g. Firebug for Firefox
      qx.log.appender.Native;
      // support additional cross-browser console. Press F7 to toggle visibility
      qx.log.appender.Console;
     
      /*
       * main layout
       */
      var hbox1 = new qx.ui.container.Composite( new qx.ui.layout.HBox(10) );
      hbox1.setPadding(10);
      this.getRoot().add( hbox1, {edge:0} );
      
      /*
       * tree
       */
      var tree = new qcl.ui.treevirtual.DragDropTree(['Folder']);
      this._tree = tree;
      tree.setWidth( 300 );
      tree.setEnableDragDrop(true);
      tree.addListener("drop", function(e) {
        if ( e.supportsType("qx/treevirtual-node") )
        {
          tree.moveNode( e );  
        }
        else if ( e.supportsType("qx/list-item") )
        {
          var data = e.getData("qx/list-item");
          var nodes = [];
          data.forEach(function( listitem ){
            node = tree.createLeaf();
            node.label = listitem.getLabel();
            node.icon  = listitem.getIcon();
            nodes.push(node);
          },this);
          tree.importNode(e,nodes);
        }
      });
      hbox1.add(tree);
      
      /*
       * list
       */
      var list = new qx.ui.form.List();
      this._list = list;
      list.setWidth(200);
      list.setDraggable(true);
      list.setDroppable(true);
      
      // start dragging from this list
      list.addListener("dragstart", function(e)
      {
        // Register supported types
        e.addType("qx/list-item");
        
        // Register supported actions
        //e.addAction("copy");
        e.addAction("move");
      });
      
      // drag other widget's data over the list
      list.addListener("dragover", function(e)
      {
        var type = e.getCurrentType();
        switch( type )
        {
          case "qx/treevirtual-node":
            var tree = e.getRelatedTarget();
            try
            {
              if( tree.getSelectedNodes()[0].type !== qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF)
              {
                e.preventDefault();
              }
            }
            catch(e)
            {
              console.warn(e);
            };
            break;
        }
      });

      // drop from this list
      list.addListener("droprequest", function(e)
      {
        var action = e.getCurrentAction();
        var type = e.getCurrentType();
        var result;

        switch(type)
        {
          case "qx/list-item":
            result = this.getSelection();

            if (action == "copy")
            {
              var copy = [];
              for (var i=0, l=result.length; i<l; i++) {
                copy[i] = result[i].clone();
              }
              result = copy;
            }
            break;
        }

        if ( result )
        {
          // Remove selected items on move
          if (action == "move")
          {
            var selection = this.getSelection();
            for (var i=0, l=selection.length; i<l; i++) {
              this.remove(selection[i]);
            }
          }
          // Add data to manager
          e.addData(type, result);
        }
      });
      
      // drop on this list
      list.addListener("drop", function(e)
      {        
        var action = e.getCurrentAction() || "move";
        var source = e.getRelatedTarget();
        
        if ( e.supportsType("qx/treevirtual-node") )
        {
          var selectedNodes = e.getData("qx/treevirtual-node");
          selectedNodes.forEach( function( node ) 
          {
            if ( node.type == qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF )
            {
              var label = node.label;
              var icon  = node.icon || "icon/16/places/folder.png";
              var item  = new qx.ui.form.ListItem( label, icon );
              list.add(item);
              if( action == "move" )
              {
                source.getDataModel().prune(node,true); // this doesn't work with mult-selection in the tree
              }
              source.getDataModel().setData();
            }
            else
            {
              alert("You can only drag tree leaf into a list, not a folder");
            }
          },this);  
        }
      });
      
      
      hbox1.add(list);
      
      /*
       * commands
       */
      var vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(10) );
      vbox.setWidth(300);
      hbox1.add(vbox);
     
      var label = new qx.ui.basic.Label("<h2>TreeVirtual Drag & Drop</h2>");
      label.setRich(true);
      vbox.add( label );
      
      label = new qx.ui.basic.Label(
        "This demo shows the features of the qcl.ui.treevirtual.DragDropTree widget. " +
        "You can drag items from the List widget into the tree and drag them back into " +
        "the list. By contrast, you're not allowed to drag tree folders into the list. " +
        "You can reorder the nodes in the tree and drop them into each other to create a " +
        "tree hierarchy. By selecting 'Reordering only', you limit drag and drop to " +
        "reordering."
      );
      label.setRich(true);
      vbox.add( label );
      
      var button = new qx.ui.form.CheckBox("Enable drag & drop");
      button.addListener("changeValue",function(e){
        tree.setEnableDragDrop(e.getData())
      },this);
      button.setValue(true);
      vbox.add(button);
      
      var button = new qx.ui.form.CheckBox("Reordering only");
      
      button.addListener("changeValue",function(e){
        tree.setAllowReorderOnly(e.getData())
      },this);
      button.setValue(false);
      vbox.add(button);
      
      button = new qx.ui.form.Button("Reset");
      button.setMaxWidth(50);
      button.addListener("execute",function(){
        this.loadData();
      },this);
      vbox.add(button);
      
      /*
       * populate widgets
       */
      this.loadData();
           
    },

    loadData : function()
    {
      /*
       * load tree data
       */
      var tree = this._tree;
      tree.getDataModel().clearData();
      
      var data = [
        {"title":"01 Mogwai","parentId":1,"visible":true,"folder":true},
        {"title":"02 Incubus","parentId":1,"visible":true,"folder":true},
        {"title":"03 dredg","parentId":1,"visible":true,"folder":true},
        {"title":"04 Oceansize","parentId":1,"visible":true,"folder":true},
        {"title":"05 Radiohead","parentId":1,"visible":true,"folder":true},
        {"title":"06 Yourcodenameis:milo","parentId":1,"visible":true,"folder":true},
        {"title":"07 Tool","parentId":1,"visible":true,"folder":true},
        {"title":"08 Aereogramme","parentId":1,"visible":true,"folder":true},
        {"title":"09 Rishloo","parentId":1,"visible":true,"folder":true},
        {"title":"10 Balmorhea","parentId":1,"visible":true,"folder":true}    
      ]; 
      
      var nodeId;
      data.forEach(function(node)
      {
        node.parentId = node.parentId == 1 ? null : node.parentId;

        if(node.folder)
        {
          nodeId = tree.getDataModel().addBranch(node.parentId, node.title, node.visible, false, false);
          tree.setNodeDragType && tree.setNodeDragType(nodeId, "folder");
        }
        else
        {
          nodeId = tree.getDataModel().addLeaf(node.parentId, node.title, node.visible);
          tree.setNodeDragType && tree.setNodeDragType(nodeId, "leaf");
        }
      }, this);

      tree.setNodeDragType(0, "root");
      tree.getDataModel().setData();
      
      /*
       * list
       */
      var list = this._list;
      list.removeAll();
      var data = [ "Drake Frederick","William Rivera","Herrod Justice","Fletcher Ratliff","Grady Goff",
        "Vincent Sloan","Neville Howard","Mason Butler","Forrest Burke","Chadwick Ochoa","Colt Hayes",
        "Seth Howe","Norman Farley","Malcolm Rojas","Tobias Simmons","Clinton Craig","Cain Clemons"];
      
      data.forEach( function(label){
        var item = new qx.ui.form.ListItem(label,"icon/16/mimetypes/text-plain.png");
        list.add( item );
      },this);
      
    }
  }
});