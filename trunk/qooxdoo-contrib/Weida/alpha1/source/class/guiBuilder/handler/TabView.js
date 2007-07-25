qx.Class.define("guiBuilder.handler.TabView",
{
  extend : qx.core.Object,

  
  statics :
  {
  
    afterCreatedOnAppSpace : function(formObject, appArea)
    {
    },
    
    afterFinishCreatedOnAppSpace : function(formObject, appArea)
    {     
      /* First we create the button and the page */
      var tabButton = new qx.ui.pageview.tabview.Button("New");
      tabButton.setChecked(true);
      formObject.getBar().add(tabButton);

      var tabPage = new qx.ui.pageview.tabview.Page(tabButton);
      formObject.getPane().add(tabPage);      
      
      /* Next we add the events and infos to the page */                  
      tabPage._parent = true;
      tabPage.addEventListener("dragdrop", appArea.appAreaDrop, appArea);                  
      tabPage.supportsDrop = appArea.supportDrop;
      tabPage.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"]);      

      /* our button needs a name */
      var shortName = 'tabViewButton';
      if (!appArea._typeCounter[shortName])
      {
        appArea._typeCounter[shortName] = 0;
      }       
      appArea._typeCounter[shortName] = appArea._typeCounter[shortName]+1;
      var compName = shortName+appArea._typeCounter[shortName];   
      tabButton._name = compName;   

      var propEntries = appArea._parsedComponentXML['qx.ui.pageview.buttonview.Button'];      
      tabButton._properties = propEntries['properties'];
      tabButton._events = propEntries['events'];      
      tabButton._attr = new Object;     
      tabButton._listener = new Object; 
      tabButton.addEventListener("click", appArea.formElementClicked, appArea);   

     if (propEntries['propertiesInit'])
     {
       for (var propertyName in propEntries['propertiesInit'])
       {
         value = propEntries['propertiesInit'][propertyName].attributes['value'].value;
         
         // is it a number ?
         var n = new Number(value);
         if (!isNaN(n)) 
         {
           value = n.valueOf();
         }  
                  
         // this is sometimes needed to overwrite attributes         
         if (value == '#NULL#') 
           value = null;
         
         appArea.setComponentProperties(tabButton, propertyName, [ value ]);
       }
     }

      /* our page needs a name */
      var shortName = 'tabViewPage';
      if (!appArea._typeCounter[shortName])
      {
        appArea._typeCounter[shortName] = 0;
      }      
      appArea._typeCounter[shortName] = appArea._typeCounter[shortName]+1;
      var compName = shortName+appArea._typeCounter[shortName];   
      tabPage._name = compName;         

      var originalFont = qx.ui.core.Font.fromString("10px sans-serif");
     
      var iconURL = "guiBuilder/image/other/16x16/helperentry.png";
   
      var newTreeItemBar = new qx.ui.tree.TreeFolder('Bar', iconURL, iconURL);
      newTreeItemBar.setFont(qx.ui.core.Font.fromString("10px sans-serif italic"));
      formObject._treeItem.add(newTreeItemBar);
      formObject._treeItem.open();
      formObject._treeItemBar = newTreeItemBar;
      tabButton._treeItem = newTreeItemBar;
      newTreeItemBar._component = formObject.getBar();

      var newTreeItemPane = new qx.ui.tree.TreeFolder('Pane', iconURL, iconURL);
      newTreeItemPane.setFont(qx.ui.core.Font.fromString("10px sans-serif italic"));
      formObject._treeItem.add(newTreeItemPane);
      formObject._treeItem.open();
      formObject._treeItemPane = newTreeItemPane;
      tabPage._treeItem = newTreeItemPane;
      newTreeItemPane._component = formObject.getPane();

      
      
      var newTreeItem = new qx.ui.tree.TreeFolder(tabPage._name);
      newTreeItem.setFont(originalFont);
      newTreeItemPane.add(newTreeItem);
      newTreeItemPane.open();
      tabPage._treeItem = newTreeItem;
      newTreeItem._component = tabPage;
      newTreeItem.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"]);
      newTreeItem.addEventListener("dragstart", appArea._appParent.formTreeDragStart, appArea._appParent); 
      newTreeItem.addEventListener("dragdrop", appArea._appParent.formTreeItemDrop, appArea._appParent);

      var newTreeItem = new qx.ui.tree.TreeFile(tabButton._name);
      newTreeItem.setFont(originalFont);      
      newTreeItemBar.add(newTreeItem);
      newTreeItemBar.open();
      tabButton._treeItem = newTreeItem;
      newTreeItem._component = tabButton;
      
    },
    
    rebuildFormTreeLoop : function(component, appArea)    
    {
      var iconURL = "guiBuilder/image/other/16x16/helperentry.png";
    
      var newTreeItemBar = new qx.ui.tree.TreeFolder('Bar', iconURL, iconURL);
      newTreeItemBar.setFont(qx.ui.core.Font.fromString("10px sans-serif italic"));
      component._treeItem.add(newTreeItemBar);
      component._treeItem.open();
      component._treeItemBar = newTreeItemBar;
      newTreeItemBar._component = component.getBar();
      component.getBar()._treeItem = newTreeItemBar;

      var newTreeItemPane = new qx.ui.tree.TreeFolder('Pane', iconURL, iconURL);
      newTreeItemPane.setFont(qx.ui.core.Font.fromString("10px sans-serif italic"));
      component._treeItem.add(newTreeItemPane);
      component._treeItem.open();
      component._treeItemPane = newTreeItemPane;
      newTreeItemPane._component = component.getPane();      
      component.getPane()._treeItem = newTreeItemPane;      
      
      appArea._rebuildFormTreeLoop(component.getPane(), component.getPane());
      appArea._rebuildFormTreeLoop(component.getBar(), component.getBar());
      
    }
        
  }
  
});