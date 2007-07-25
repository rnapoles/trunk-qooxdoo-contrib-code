qx.Class.define("guiBuilder.handler.SplitPane",
{
  extend : qx.core.Object,

  
  statics :
  {
    afterCreatedOnAppSpace : function(formObject, appArea)
    {
    },
    
    afterFinishCreatedOnAppSpace : function(formObject, appArea)
    {      
      var layout1 = formObject.getFirstArea();
      layout1._parent = true;
      layout1.addEventListener("dragdrop", appArea.appAreaDrop, appArea);                  
      layout1.supportsDrop = appArea.supportDrop;
      layout1.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"])

      var layout2 = formObject.getSecondArea();
      layout2._parent = true;
      layout2.addEventListener("dragdrop", appArea.appAreaDrop, appArea);                  
      layout2.supportsDrop = appArea.supportDrop;
      layout2.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"])      

      var iconURL = "guiBuilder/image/other/16x16/helperentry.png";
      
      var newTreeItem = new qx.ui.tree.TreeFolder('First', iconURL, iconURL);
      newTreeItem.setFont(qx.ui.core.Font.fromString("10px sans-serif italic"));
      formObject._treeItem.add(newTreeItem);
      formObject._treeItem.open();
      formObject._treeItemBar = newTreeItem;
      layout1._treeItem = newTreeItem;
      newTreeItem._component = layout1;

       newTreeItem.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"]);
       newTreeItem.addEventListener("dragstart", appArea._appParent.formTreeDragStart, appArea._appParent); 
       newTreeItem.addEventListener("dragdrop", appArea._appParent.formTreeItemDrop, appArea._appParent);


      var newTreeItem = new qx.ui.tree.TreeFolder('Second', iconURL, iconURL);
      newTreeItem.setFont(qx.ui.core.Font.fromString("10px sans-serif italic"));
      formObject._treeItem.add(newTreeItem);
      formObject._treeItem.open();
      formObject._treeItemBar = newTreeItem;
      layout2._treeItem = newTreeItem;
      newTreeItem._component = layout2;

       newTreeItem.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"]);
       newTreeItem.addEventListener("dragstart", appArea._appParent.formTreeDragStart, appArea._appParent); 
       newTreeItem.addEventListener("dragdrop", appArea._appParent.formTreeItemDrop, appArea._appParent);      
      
    },
    
    rebuildFormTreeLoop : function(component, appArea)    
    {
      var iconURL = "guiBuilder/image/other/16x16/helperentry.png";

      var layout1 = component.getFirstArea();
      var layout2 = component.getSecondArea();
      
      var newTreeItem = new qx.ui.tree.TreeFolder('First', iconURL, iconURL);
      newTreeItem.setFont(qx.ui.core.Font.fromString("10px sans-serif italic"));
      component._treeItem.add(newTreeItem);
      component._treeItem.open();
      component._treeItemBar = newTreeItem;
      layout1._treeItem = newTreeItem;
      newTreeItem._component = layout1;

       newTreeItem.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"]);
       newTreeItem.addEventListener("dragstart", appArea._appParent.formTreeDragStart, appArea._appParent); 
       newTreeItem.addEventListener("dragdrop", appArea._appParent.formTreeItemDrop, appArea._appParent);


      var newTreeItem = new qx.ui.tree.TreeFolder('Second', iconURL, iconURL);
      newTreeItem.setFont(qx.ui.core.Font.fromString("10px sans-serif italic"));
      component._treeItem.add(newTreeItem);
      component._treeItem.open();
      component._treeItemBar = newTreeItem;
      layout2._treeItem = newTreeItem;
      newTreeItem._component = layout2;

       newTreeItem.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"]);
       newTreeItem.addEventListener("dragstart", appArea._appParent.formTreeDragStart, appArea._appParent); 
       newTreeItem.addEventListener("dragdrop", appArea._appParent.formTreeItemDrop, appArea._appParent);      
      
    
    
    
      appArea._rebuildFormTreeLoop(component.getFirstArea(), component.getFirstArea());
      appArea._rebuildFormTreeLoop(component.getSecondArea(), component.getSecondArea());      
    }
        
  }
  
});