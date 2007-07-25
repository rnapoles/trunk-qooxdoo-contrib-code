qx.Class.define("guiBuilder.handler.ButtonViewButton",
{
  extend : qx.core.Object,

  
  statics :
  {
    createOfVirtual : function(formObject, treeItem, appArea)
    {
      /* First we create the button and the page */
      var tabButton = new qx.ui.pageview.buttonview.Button("New");
      tabButton.setChecked(true);
      formObject.getBar().add(tabButton);

      var tabPage = new qx.ui.pageview.buttonview.Page(tabButton);
      formObject.getPane().add(tabPage);      
      
      /* Next we add the events and infos to the page */                  
      tabPage._parent = true;
      tabPage.addEventListener("dragdrop", appArea.appAreaDrop, appArea);                  
      tabPage.supportsDrop = appArea.supportDrop;
      tabPage.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"]);      

      /* our button needs a name */
      var shortName = 'buttonViewButton';
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
      var shortName = 'buttonViewPage';
      if (!appArea._typeCounter[shortName])
      {
        appArea._typeCounter[shortName] = 0;
      }      
      appArea._typeCounter[shortName] = appArea._typeCounter[shortName]+1;
      var compName = shortName+appArea._typeCounter[shortName];   
      tabPage._name = compName;         

      var newTreeItemBar = formObject._treeItemBar;
      var newTreeItemPane = formObject._treeItemPane;
      
      var originalFont = qx.ui.core.Font.fromString("10px sans-serif");
      
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
  
    afterCreatedOnAppSpace : function(formObject, appArea)
    {
    },
    
    afterFinishCreatedOnAppSpace : function(formObject, appArea)
    {           
    },
    
    rebuildFormTreeLoop : function(parent, component)    
    {
    }    
        
  }
  
});