qx.Class.define("guiBuilder.popup.property.TreeItems",
{
  extend : qx.ui.window.Window,

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */
    
    appArea :
    {
      _legacy : true,
      type    : "object",
      instance  : "guiBuilder.AppArea"
    },
    
    relatedComponent :
    {
      _legacy  : true,
      type     : "object",
      instance : "qx.ui.tree.Tree"
    },
    
    relatedProperties : 
    {
      _legacy : true,
      type    : "object"
    }    
    
  },


  construct : function() {
    this.base(arguments);   
    
    this.setWidth(600);
    this.setHeight(400);
    
    this.setShowMaximize(false);
    this.setShowMinimize(false);
    this.setResizable(false);
    this.setCentered(true);
        
	HorizontalBoxLayout1 = new qx.ui.layout.HorizontalBoxLayout();
	HorizontalBoxLayout1.setHeight("100%");
	HorizontalBoxLayout1.setWidth("100%");
	HorizontalBoxLayout1.setBorder("outset");
	HorizontalBoxLayout1.setSpacing(5);
	HorizontalBoxLayout1.setPaddingLeft(5);
	HorizontalBoxLayout1.setPaddingRight(5);
	HorizontalBoxLayout1.setPaddingBottom(5);
	HorizontalBoxLayout1.setPaddingTop(5);
	this.add(HorizontalBoxLayout1);
	
	this._treePreview = new qx.ui.tree.Tree();
	this._treePreview.setHeight(380);
	this._treePreview.setWidth("1*");
	this._treePreview.setBorder("inset");
	this._treePreview.setBackgroundColor("white");		
	this._treePreview.setOverflow("scroll");

    this._treePreview.getManager().addEventListener("changeSelection", this.treePreviewElementSelected, this);
	
	HorizontalBoxLayout1.add(this._treePreview);
	
	VerticalBoxLayout1 = new qx.ui.layout.VerticalBoxLayout();
	VerticalBoxLayout1.setHeight("100%");
	VerticalBoxLayout1.setWidth("50%");
	VerticalBoxLayout1.setBackgroundColor("window");
	VerticalBoxLayout1.setSpacing(5);
	HorizontalBoxLayout1.add(VerticalBoxLayout1);
	
	buttonNewFolder = new qx.ui.form.Button();
	buttonNewFolder.setHeight("auto");
	buttonNewFolder.setWidth("100%");
	buttonNewFolder.setLabel("Add new folder");
	buttonNewFolder.setPaddingLeft(4);
	buttonNewFolder.setIcon("icon/16/actions/edit-add.png");
	buttonNewFolder.addEventListener("execute", this.buttonNewFolderClicked, this);
	VerticalBoxLayout1.add(buttonNewFolder);
	
	buttonNewFile = new qx.ui.form.Button();
	buttonNewFile.setHeight("auto");
	buttonNewFile.setWidth("100%");
	buttonNewFile.setLabel("Add new file");
	buttonNewFile.setPaddingLeft(4);
	buttonNewFile.setIcon("icon/16/actions/edit-add.png");
	buttonNewFile.addEventListener("execute", this.buttonNewFileClicked, this);	
	VerticalBoxLayout1.add(buttonNewFile);

	buttonDelete = new qx.ui.form.Button();
	buttonDelete.setHeight("auto");
	buttonDelete.setWidth("100%");
	buttonDelete.setLabel("Delete selected");
	buttonDelete.setPaddingLeft(4);
	buttonDelete.setIcon("icon/16/actions/edit-delete.png");
	buttonDelete.addEventListener("execute", this.buttonDeleteClicked, this);	
	VerticalBoxLayout1.add(buttonDelete);
	
	Terminator1 = new qx.ui.basic.Terminator();
	Terminator1.setHeight(4);
	Terminator1.setWidth(100);
	VerticalBoxLayout1.add(Terminator1);
	
	
    this._pPopupGrid = new guiBuilder.PropertyGrid();
    this._pPopupGrid.setHeight("1*");
    this._pPopupGrid.setWidth(290);  
	VerticalBoxLayout1.add(this._pPopupGrid);    
	
	this._pPopupGrid.setDataByObject(this);
	
	this._treePreview.setSelectedElement(this._treePreview);
	
  },
  
  members :
  {
    
    initData : function()
    {
      this._treePreview._realComp = this.getRelatedComponent();      
      
      this.initDataTreeItems(this.getRelatedComponent());
    },
    
    
    
    
    initDataTreeItems : function(parent)
    {
      var listItems = parent.getItems(false, true);

      componentXML = this.getAppArea()._parsedComponentXML;
            
      for (a in listItems)
      {
        var singleItem = listItems[a];

        if (singleItem.classname == 'qx.ui.tree.TreeFolder')
        {
          treeFolderInfo = componentXML['qx.ui.tree.TreeFolder'];
          
          
          
          var newTreeItem = singleItem.superclass.self(arguments).copy(singleItem);  //;new qx.ui.tree.TreeFolder(singleItem.getLabel());
          newTreeItem._properties = treeFolderInfo['properties'];
          newTreeItem._events = treeFolderInfo['events'];          
          newTreeItem._realComp = singleItem;
          newTreeItem._attr = singleItem._attr;
          newTreeItem._listener = new Object; 
          selected.add(newTreeItem);
          newTreeItem.open();
          
          this.initDataTreeItems(singleItem);
        }
        
        if (singleItem.classname == 'qx.ui.tree.TreeFile')        
        {
          treeFileInfo = componentXML['qx.ui.tree.TreeFile'];
                      
          var newTreeItem = new qx.ui.tree.TreeFile(singleItem.getLabel());
          newTreeItem._properties = treeFileInfo['properties'];            
          newTreeItem._realComp = singleItem;      
          newTreeItem._attr = singleItem._attr; 
          selected.add(newTreeItem);
        }
        
      }
      
    },



        
    buttonNewFolderClicked : function(e)
    {       
      var selected = this._treePreview.getSelectedElement();

      if (selected.classname == 'qx.ui.tree.TreeFile')
        return false;

      selectedReal = selected._realComp;
      
      componentXML = this.getAppArea()._parsedComponentXML;
      
      if (!componentXML['qx.ui.tree.TreeFolder'])
      {
        this.debug("Could not find treefolder properties in xml!");
        return false;
      }
      
      treeFolderInfo = componentXML['qx.ui.tree.TreeFolder'];
      
      var newTreeItemReal = new qx.ui.tree.TreeFolder("Example");      
      newTreeItemReal._attr = new Object;
      selectedReal.add(newTreeItemReal);
      selectedReal.open();   
    
      var newTreeItem = new qx.ui.tree.TreeFolder("Example");
      newTreeItem._properties = treeFolderInfo['properties'];      
      newTreeItem._realComp = newTreeItemReal;
      newTreeItem._attr = new Object;      
      selected.add(newTreeItem);
      selected.open();        
          
      
    }, 
    
    buttonNewFileClicked : function(e)
    {     
      var selected = this._treePreview.getSelectedElement();

      if (selected.classname == 'qx.ui.tree.TreeFile')
        return false;

      selectedReal = selected._realComp

      componentXML = this.getAppArea()._parsedComponentXML;
      
      if (!componentXML['qx.ui.tree.TreeFile'])
      {
        this.debug("Could not find teefile properties in xml!");
        return false;
      }

      treeFileInfo = componentXML['qx.ui.tree.TreeFile'];

      var newTreeItemReal = new qx.ui.tree.TreeFile("Example");
      newTreeItemReal._attr = new Object;      
      selectedReal.add(newTreeItemReal);
      selectedReal.open();
    
      var newTreeItem = new qx.ui.tree.TreeFile("Example");
      newTreeItem._properties = treeFileInfo['properties'];            
      newTreeItem._realComp = newTreeItemReal;      
      newTreeItem._attr = new Object;      
      selected.add(newTreeItem);
      selected.open();
    },
    
    buttonDeleteClicked : function(e)
    {
    },
    
    treePreviewElementSelected : function(e)
    {
      selected = e.getData()[0];
      
      this.debug("treePreviewElementSelected");
      this._pPopupGrid.setDataByObject(selected);
    }
    
  }
});