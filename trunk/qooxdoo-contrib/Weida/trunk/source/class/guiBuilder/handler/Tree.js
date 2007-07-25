qx.Class.define("guiBuilder.handler.Tree",
{
  extend : qx.core.Object,

  
  statics :
  {
    afterCreatedOnAppSpace : function(formObject, appArea)
    {
    },
    
    afterFinishCreatedOnAppSpace : function(formObject, appArea)
    {     
      
    },     
    
    rebuildFormTreeLoop : function(component, appArea)    
    {     

      parentTree = component._treeItem;
      
      guiBuilder.handler.Tree._initDataTreeItems(component, parentTree, appArea);
    },

    _initDataTreeItems : function(parent, parentTree, appArea)
    {
      var listItems = parent.getItems(false, true);
            
      componentXML = appArea._parsedComponentXML;
      
      var a = null;
      for (a in listItems)
      {
        var singleItem = listItems[a];

        /* getList contains also the parent itsels, if we don't skip it we go into an endless loop*/        
        if (parent == singleItem)   continue

                        
        if (singleItem.classname == 'qx.ui.tree.TreeFolder')
        {
          treeFolderInfo = componentXML['qx.ui.tree.TreeFolder'];          
          
          var newTreeItem = new qx.ui.tree.TreeFolder(singleItem._name);
          parentTree.add(newTreeItem);
          singleItem._treeItem = newTreeItem;
          newTreeItem._component = singleItem;     
          parentTree.open();     
          newTreeItem.open();
          
          guiBuilder.handler.Tree._initDataTreeItems(singleItem, newTreeItem, appArea);
        }
        
        if (singleItem.classname == 'qx.ui.tree.TreeFile')        
        {
          treeFileInfo = componentXML['qx.ui.tree.TreeFile'];
                      
          var newTreeItem = new qx.ui.tree.TreeFile(singleItem._name);
          singleItem._treeItem = newTreeItem;
          newTreeItem._component = singleItem;
          parentTree.add(newTreeItem);
        }
        
      }
      
    }
        
  }
  
});