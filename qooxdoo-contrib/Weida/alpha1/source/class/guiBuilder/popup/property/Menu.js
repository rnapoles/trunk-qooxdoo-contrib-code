qx.Class.define("guiBuilder.popup.property.Menu",
{
  extend : qx.ui.window.Window,

  construct : function() 
  {
    this.base(arguments);   

    this.setModal(true);
    this.setShowClose(false);
    this.setShowMaximize(false);
    this.setShowMinimize(false);
    this.setResizable(false);


	var HorizontalBoxLayout1 = new qx.ui.layout.HorizontalBoxLayout();
	HorizontalBoxLayout1.setHeight(500);
	HorizontalBoxLayout1.setWidth(800);	
	
	this.add(HorizontalBoxLayout1);

	
	this._MenuArea = new qx.ui.layout.CanvasLayout();
	this._MenuArea.setHeight("100%");
	this._MenuArea.setWidth("1*");
	this._MenuArea.setBorder("inset");
	this._MenuArea.setOverflow("scroll");
	HorizontalBoxLayout1.add(this._MenuArea);


	var TerminatorWidth = new qx.ui.basic.Terminator();
	TerminatorWidth.setHeight(1);
	TerminatorWidth.setWidth(800);
	this._MenuArea.add(TerminatorWidth);

	
	var TerminatorHeight = new qx.ui.basic.Terminator();
	TerminatorHeight.setHeight(1000);
	TerminatorHeight.setWidth(1);
	this._MenuArea.add(TerminatorHeight);
   

	var VerticalBoxLayout2 = new qx.ui.layout.VerticalBoxLayout();
	VerticalBoxLayout2.setHeight("100%");
	VerticalBoxLayout2.setWidth(310);
	VerticalBoxLayout2.setOverflow("hidden");
	VerticalBoxLayout2.setSpacing(8);
	VerticalBoxLayout2.setPaddingLeft(6);
	VerticalBoxLayout2.setPaddingRight(6);
	VerticalBoxLayout2.setPaddingBottom(6);
	VerticalBoxLayout2.setPaddingTop(6);
	HorizontalBoxLayout1.add(VerticalBoxLayout2);

	
	var ButtonAddSubMenu = new qx.ui.form.Button();
	ButtonAddSubMenu.setHeight("auto");
	ButtonAddSubMenu.setWidth("100%");
	ButtonAddSubMenu.setLabel("Add sub-menu");
	ButtonAddSubMenu.setPaddingLeft(4);
	ButtonAddSubMenu.setIcon("icon/16/actions/window-new.png");
	ButtonAddSubMenu.addEventListener("execute", this.addSubMenu, this);
	VerticalBoxLayout2.add(ButtonAddSubMenu);
	
	var ButtonDelEntry = new qx.ui.form.Button();
	ButtonDelEntry.setHeight("auto");
	ButtonDelEntry.setWidth("100%");
	ButtonDelEntry.setLabel("Delete selected");
	ButtonDelEntry.setPaddingLeft(4);
	ButtonDelEntry.setIcon("icon/16/actions/edit-delete.png");
	ButtonDelEntry.addEventListener("execute", this.removeEntry, this);
	VerticalBoxLayout2.add(ButtonDelEntry);
		
	this._pPopupGrid = new guiBuilder.propertyeditor.Grid();
    this._pPopupGrid.setHeight("1*");
    this._pPopupGrid.setWidth(300);  
	VerticalBoxLayout2.add(this._pPopupGrid);   


	var ButtonClose = new qx.ui.form.Button();
	ButtonClose.setHeight("auto");
	ButtonClose.setWidth("100%");
	ButtonClose.setLabel("Close");
	ButtonClose.setPaddingLeft(4);
	VerticalBoxLayout2.add(ButtonClose);
	
	ButtonClose.addEventListener("execute", this.closeAndSaveWindow, this);  
	
	this.setSelectedEntry(null);
  },


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

    selectedEntry :
    {
      _legacy : true,
      type    : "object"
    },
    
    appArea :
    {
      _legacy : true,
      type    : "object",
      instance  : "guiBuilder.AppArea"
    },
    
    relatedComponent :
    {
      _legacy  : true,
      type     : "object"
    },
    
    relatedProperties : 
    {
      _legacy : true,
      type    : "object"
    }    
    
  },
  


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */    
  
  members :
  {
    initData : function()
    {
      vMenu = this.getRelatedComponent();
    
      vMenu.setParent(this._MenuArea);            
      vMenu.show();
      
      this.attachAdds(vMenu);
        
      this._defineMenuLoop(vMenu);
    },

    closeAndSaveWindow : function(e)
    {
      this._cleanEntries(this.getRelatedComponent());
      this._unDefineMenuLoop(vMenu);
      this.close();
    },

    _cleanEntries : function(component)
    {

      if (component.classname == "qx.ui.menu.Menu" || 
          component.classname == "guiBuilder.extend.Menu")
      {
        this.debug("##1");
        this.removeAdds(component);      
        this.debug("##2");        
      }  
              
      if (component.getChildren)
      {
        var children = component.getChildren();
        var childCount = component.getChildrenLength();        

        var i = 0;
        for (i = 0; i < childCount; i++)
        {        
          var comp = children[i];         

          this._cleanEntries(comp);                             
                              
          if (comp.getMenu)
          {
            var subMenu = comp.getMenu();
            if (subMenu != null)               
              this._cleanEntries(subMenu);                
          }
        } 
      }   
    },
    
    removeEntry : function(e)
    {
      if (this.getSelectedEntry() == null)
        return false;
        
      var selected = this.getSelectedEntry();
      selected.getParent().remove(selected);
      selected.dispose();
      
      this.setSelectedEntry(null);
      this._pPopupGrid.removeData();
      
      
    },
    
    addSubMenu : function(e)
    {
      if (this.getSelectedEntry() == null)
        return false;
        
      var selected = this.getSelectedEntry();
      if (selected.getMenu() != null)
      {
        this.debug("We already have a menu there");
        return false;
      }
            
      var menu = new guiBuilder.extend.Menu;      
      menu.setZIndex(99999);
      this._MenuArea.add(menu);
      
      this.attachAdds(menu);
      
      selected.setMenu(menu);
    },
    
    menItemSelected : function(e)
    {
      selected = e.getTarget();
      
      this._pPopupGrid.setAppArea(this.getAppArea());      
      this._pPopupGrid.setDataByObject(selected);
      
      this.setSelectedEntry(selected);
    },
       
    attachAdds : function(vMenu)
    {
      vMenu._emptyButton = new qx.ui.menu.Button(" ");
      vMenu.add(vMenu._emptyButton);   
    
      this.attachAddButton(vMenu);
      this.attachAddCheckBox(vMenu);       
      this.attachAddRadioButton(vMenu);      
      this.attachAddSeparator(vMenu);                        
    },    
    
    removeAdds : function(vMenu)
    {      
      var parent = vMenu.getParent();


      if (vMenu.classname == "qx.ui.menu.Menu" || 
          vMenu.classname == "guiBuilder.extend.Menu")
      {
        parent = vMenu;
      }
      
      vMenu.remove(parent._emptyButton);
      vMenu.remove(parent._addButton);
      vMenu.remove(parent._addCheckBox);
      vMenu.remove(parent._addRadioButton);
      vMenu.remove(parent._addSeparator);

      parent._emptyButton.dispose();
      parent._addButton.dispose();
      parent._addCheckBox.dispose();
      parent._addRadioButton.dispose();
      parent._addSeparator.dispose();                  
    },



    attachAddButton : function(vMenu)      
    {
      vMenu._addButton = new qx.ui.menu.Button("<i>Add button</i>");
      vMenu._addButton.addEventListener("execute", this.onAddButtonPressed, this);      
      vMenu.add(vMenu._addButton);    
    },
    attachAddCheckBox : function(vMenu)      
    {
      vMenu._addCheckBox = new qx.ui.menu.Button("<i>Add checkbox</i>");
      vMenu._addCheckBox.addEventListener("execute", this.onAddCheckBoxPressed, this);      
      vMenu.add(vMenu._addCheckBox);    
    },
    attachAddRadioButton : function(vMenu)      
    {
      vMenu._addRadioButton  = new qx.ui.menu.Button("<i>Add radio button</i>");
      vMenu._addRadioButton.addEventListener("execute", this.onAddRadioButtonPressed, this);      
      vMenu.add(vMenu._addRadioButton);    
    },
    attachAddSeparator : function(vMenu)      
    {
      vMenu._addSeparator = new qx.ui.menu.Button("<i>Add separator</i>");
      vMenu._addSeparator.addEventListener("execute", this.onAddSeparatorPressed, this);      
      vMenu.add(vMenu._addSeparator);
    },


    _initNewEntry : function(addComp, propEntries)
    {
      var appArea = this.getAppArea();
      
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
          
          appArea.setComponentProperties(addComp, propertyName, [ value ]);
        }
      }    
    },

    onAddButtonPressed : function(e)
    {            
      var target = e.getTarget();
      
      /* Do make it easier we simply remove the existing add button */
      var vParent = target.getParent();
      this.removeAdds(vParent);
      
      vMenu = vParent.getParent();

      var appArea = this.getAppArea();

      /* our button needs a name */
      var shortName = 'MenuButton';
      if (!appArea._typeCounter[shortName])
      {
        appArea._typeCounter[shortName] = 0;
      } 
      appArea._typeCounter[shortName] = appArea._typeCounter[shortName]+1;
      var compName = shortName+appArea._typeCounter[shortName];   
            
      /* And create a normal button instead*/      
      var newButton = new qx.ui.menu.Button(compName);     
      newButton._name = compName;   
      
      
      var propEntries = appArea._parsedComponentXML['qx.ui.menu.Button'];      
      newButton._properties = propEntries['properties'];
      newButton._events = propEntries['events'];      
      newButton._attr = new Object;     
      newButton._listener = new Object; 
      newButton.addEventListener("click", this.menItemSelected, this);   
      
      this._initNewEntry(newButton, propEntries);      

      vMenu.add(newButton);

      /* At the end we add a new add button */      
      this.attachAdds(vMenu);
    },

    onAddCheckBoxPressed : function(e)
    {            
      var target = e.getTarget();
      
      /* Do make it easier we simply remove the existing add button */
      var vParent = target.getParent();
      this.removeAdds(vParent);
      
      vMenu = vParent.getParent();

      var appArea = this.getAppArea();

      /* our button needs a name */
      var shortName = 'MenuCheckBox';
      if (!appArea._typeCounter[shortName])
      {
        appArea._typeCounter[shortName] = 0;
      } 
      appArea._typeCounter[shortName] = appArea._typeCounter[shortName]+1;
      var compName = shortName+appArea._typeCounter[shortName];   
            
      /* And create a normal button instead*/      
      var newButton = new qx.ui.menu.CheckBox(compName);     
      newButton._name = compName;   
            
      var propEntries = appArea._parsedComponentXML['qx.ui.menu.CheckBox'];      
      newButton._properties = propEntries['properties'];
      newButton._events = propEntries['events'];      
      newButton._attr = new Object;     
      newButton._listener = new Object; 
      newButton.addEventListener("click", this.menItemSelected, this);   

      this._initNewEntry(newButton, propEntries);          

      vMenu.add(newButton);

      /* At the end we add a new add button */      
      this.attachAdds(vMenu);
    },

    onAddSeparatorPressed : function(e)
    {            
      var target = e.getTarget();
      
      /* Do make it easier we simply remove the existing add button */
      var vParent = target.getParent();
      this.removeAdds(vParent);
      
      vMenu = vParent.getParent();

      var appArea = this.getAppArea();

      /* our button needs a name */
      var shortName = 'MenuSeparator';
      if (!appArea._typeCounter[shortName])
      {
        appArea._typeCounter[shortName] = 0;
      } 
      appArea._typeCounter[shortName] = appArea._typeCounter[shortName]+1;
      var compName = shortName+appArea._typeCounter[shortName];   
            
      /* And create a normal button instead*/      
      var newButton = new qx.ui.menu.Separator(compName);     
      newButton._name = compName;   
     
      var propEntries = appArea._parsedComponentXML['qx.ui.menu.Separator'];      
      newButton._properties = propEntries['properties'];
      newButton._events = propEntries['events'];      
      newButton._attr = new Object;     
      newButton._listener = new Object; 
      newButton.addEventListener("click", this.menItemSelected, this);   
      
      this._initNewEntry(newButton, propEntries);          

      vMenu.add(newButton);

      /* At the end we add a new add button */      
      this.attachAdds(vMenu);
    },    

    onAddRadioButtonPressed : function(e)
    {            
      var target = e.getTarget();
      
      /* Do make it easier we simply remove the existing add button */
      var vParent = target.getParent();
      this.removeAdds(vParent);
      
      vMenu = vParent.getParent();

      var appArea = this.getAppArea();

      /* our button needs a name */
      var shortName = 'MenuRadioButton';
      if (!appArea._typeCounter[shortName])
      {
        appArea._typeCounter[shortName] = 0;
      } 
      appArea._typeCounter[shortName] = appArea._typeCounter[shortName]+1;
      var compName = shortName+appArea._typeCounter[shortName];   
            
      /* And create a normal button instead*/      
      var newButton = new qx.ui.menu.RadioButton(compName);     
      newButton._name = compName;   
      
      var propEntries = appArea._parsedComponentXML['qx.ui.menu.RadioButton'];      
      newButton._properties = propEntries['properties'];
      newButton._events = propEntries['events'];      
      newButton._attr = new Object;     
      newButton._listener = new Object; 
      newButton.addEventListener("click", this.menItemSelected, this);   
      
      this._initNewEntry(newButton, propEntries);          

      vMenu.add(newButton);

      /* At the end we add a new add button */      
      this.attachAdds(vMenu);
    },        
    
    
    _defineMenuLoop : function(component)
    {

      if (component.classname == "qx.ui.menu.Menu" || 
          component.classname == "guiBuilder.extend.Menu")
      {
        component.setParent(this._MenuArea);                    
        component._specialMode = true;
      }  
              
      if (component.getChildren)
      {
        var children = component.getChildren();
        var childCount = component.getChildrenLength();        

        var i = 0;
        for (i = 0; i < childCount; i++)
        {        
          var comp = children[i];         

          this._defineMenuLoop(comp);                             
                              
          if (comp.getMenu)
          {
            var subMenu = comp.getMenu();
            if (subMenu != null)               
              this._defineMenuLoop(subMenu);                

          }

        } 

      }  
    },






  _unDefineMenuLoop : function(component)
  {
  }        









    
  }
});