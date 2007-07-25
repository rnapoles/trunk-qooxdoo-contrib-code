
qx.Class.define("guiBuilder.propertyeditor.Grid",
{
  extend : qx.ui.layout.VerticalBoxLayout,
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function() {
    this.base(arguments);      
    this.setBackgroundColor("window");            
    
    this.setPropList(new Object());
    this.setEventList(new Object());

	var toolBar = new qx.ui.toolbar.ToolBar();
    toolBar.setHeight("auto");
	toolBar.setWidth("100%");
	toolBar.setBorder("outset");
	toolBar.setBorder("outset-thin");
	toolBar.setBackgroundImage("guiBuilder/image/toolbarbg.png");
	toolBar.setShow("icon");
	this.add(toolBar);
	         
    this._labelTitle = new qx.ui.basic.Label("Properties");
    this._labelTitle.setHeight(22);
    this._labelTitle.setWidth("100%");
    this._labelTitle.setPadding(4);
    this._labelTitle._keepOnDelete = true;
    toolBar.add(this._labelTitle);                                      
    
    var tabView = new qx.ui.pageview.tabview.TabView();
    tabView.setHeight("1*");
    tabView.setWidth("100%");
    tabView.getPane().setPadding(0);
    tabView.setDisplay(false);
    this.add(tabView);
    
    this._tabView = tabView;

    
    var tabProp = new qx.ui.pageview.tabview.Button("Properties");
    tabProp.setChecked(true);
    tabView.getBar().add(tabProp);                   
    var pageProp = new qx.ui.pageview.tabview.Page(tabProp);     
    tabView.getPane().add(pageProp);   

    var tabEvents = new qx.ui.pageview.tabview.Button("Events");
    tabView.getBar().add(tabEvents);                   
    var pageEvents = new qx.ui.pageview.tabview.Page(tabEvents);      
    tabView.getPane().add(pageEvents);   
    
    this._scrollerProp = new qx.ui.layout.VerticalBoxLayout();
    this._scrollerProp.setHeight("100%");
    this._scrollerProp.setWidth("100%");
    this._scrollerProp.setOverflow("scrollY");
    pageProp.add(this._scrollerProp);    
    
    this._scrollerEvent = new qx.ui.layout.VerticalBoxLayout();
    this._scrollerEvent.setHeight("100%");
    this._scrollerEvent.setWidth("100%");
    this._scrollerEvent.setOverflow("scrollY");
    pageEvents.add(this._scrollerEvent);    

    this._eventPopup = new guiBuilder.popup.Event();
    this._eventPopup.setWidth(500);
    this._eventPopup.setHeight(400);
    this._eventPopup.setCentered(true);
    this._eventPopup.setPropertyEditor(this);
    this._eventPopup.addToDocument();

    this._hidden = new qx.ui.layout.VerticalBoxLayout();
    this._hidden.setHeight(1);
    this._hidden.setWidth(1);
    this._hidden.setDisplay(false);
    this.add(this._hidden);        
    
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

    appArea :
    {
      _legacy : true,
      type    : "object",
      instance  : "guiBuilder.AppArea"
    },

    formObject :
    {
      _legacy : true,
      type    : "object"
    },
    
    propList :
    {
      _legacy : true,
      type    : "object"
    },

    eventList :
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
  
    setDataByObject : function(formObject) 
    {             
      this.removeData(false);

      this._tabView.setDisplay(true);
      this.setFormObject(formObject);

      if (!formObject._properties)      
        return false;

      this._labelTitle.setText("Properties: "+formObject.classname);      

      this.createProperties(formObject);
      this.createEvents(formObject);      

      this.sortItemsByString(this._scrollerProp);
      this.sortItemsByString(this._scrollerEvent);                        
    },
    
    createProperties : function(formObject) 
    {
      var roundIdentifier = new Date().getTime();
      
      var propList = this.getPropList();
      
      if (propList['name'])
      {
        propList['name']._roundIdentifier = roundIdentifier;      
        if (propList['name']._show == '0')
        {
          this._scrollerProp.add(propList['name']);
          propList['name']._show = '1';
        }       
        this.resetField(propList['name'], formObject, null);      
      } else {  
        var fieldComp = this.initField(formObject, 'name', null, this._scrollerProp);
        fieldComp.setData(formObject, property);
        fieldComp._roundIdentifier = roundIdentifier;        
        propList['name'] = fieldComp;
      }           

      for (var i in formObject._properties)      
      {
        var property = formObject._properties[i];
        var type     = property.attributes['type'].value;
        var propName = property.attributes['name'].value;
        
        if (propList[propName])
        {
          propList[propName]._roundIdentifier = roundIdentifier;
          this.resetField(propList[propName], formObject, property);             
                       
          if (propList[propName]._show == '0')
          {
            this._scrollerProp.add(propList[propName]);
            propList[propName]._show = '1';
          }  
            
        } else {
          var fieldComp = this.initField(formObject, type, property, this._scrollerProp);
          fieldComp._roundIdentifier = roundIdentifier;
          propList[propName] = fieldComp;
          propList[propName]._show = '1';
        }
      }  
      
      for (var i in propList)
      { 
        if (propList[i]._roundIdentifier != roundIdentifier)
        {
          this._hidden.add(propList[i]);
          propList[i]._show = '0';
        }  
      }                        
       
    },


    createEvents : function(formObject) 
    {      
      var roundIdentifier = new Date().getTime();
    
      var eventList = this.getEventList();  

      for (var i in formObject._events)      
      {
        var eventName = formObject._events[i];
        
        if (eventList[eventName])
        {
          eventList[eventName]._roundIdentifier = roundIdentifier;
          this.resetField(eventList[eventName], formObject, eventName);             
                       
          if (eventList[eventName]._show == '0')
          {
            this._scrollerEvent.add(eventList[eventName]);
            eventList[eventName]._show = '1';
          }  
            
        } else {
          var fieldComp = this.initField(formObject, 'event', eventName, this._scrollerEvent);
          fieldComp._roundIdentifier = roundIdentifier;
          eventList[eventName] = fieldComp;
          eventList[eventName]._show = '1';
        }
      }  
      
      for (var i in eventList)
      { 
        if (eventList[i]._roundIdentifier != roundIdentifier)
        {
          this._hidden.add(eventList[i]);
          eventList[i]._show = '0';
        }  
      }                        
       
    },
   
    resetField : function(fieldObject, formObject, property)
    {
      fieldObject.resetData();
      fieldObject.setData(formObject, property);
    },
    
    initField : function(formObject, fieldType, property, parentScroller)
    { 

      var fieldType = fieldType[0].toUpperCase()+fieldType.substr(1);
      
      var className = 'guiBuilder.propertyeditor.field.'+fieldType;      

      var classConstructor = qx.Class.getByName(className);

      if (!classConstructor) {
        this.debug("constructor not found for"+className);
      }

      var fieldComp = new classConstructor(formObject, property);    
      fieldComp.setAppArea(this.getAppArea());
      fieldComp.setData(formObject, property);
      fieldComp.setPropertyEditor(this);
      parentScroller.add(fieldComp);
      
      return fieldComp;
    },
   
    removeData : function(hidePanel) 
    {                     
      var propList = this.getPropList();

      if (hidePanel !== false)
        this._tabView.setDisplay(false);

      for (var i in propList)
      { 
        this._hidden.add(propList[i]);
        propList[i]._show = '0';
      }       
            
    },

    setComponentProperties : function(widget, name, value)
    {
      var n = "set" + name;

      for (var a in widget)
      {
        if (n == a.toLowerCase())
        {
          var setter = widget[a];
          break;
        }
      }

      if (!setter)
        return false;
      
      widget._attr[name] = value;     
      
      setter.apply(widget, value);
    },
    
    
    


    /**                                                                                                                                                      
     * Compare method called by the sort method                                                                                                              
     *                                                                                                                                                       
     * @type member                                                                                                                                          
     * @param a {Hash} first hash to compare                                                                                                                 
     * @param b {Hash} second hash to compare                                                                                                                
     * @return {Number} Returns -1|0|1 for the sort method to control the order of the items to sort.                                                        
     */                                                                                                                                                      
    _sortItemsCompare : function(a, b) {                                                                                                                     
      return a.key < b.key ? -1 : a.key == b.key ? 0 : 1;                                                                                                    
    },                                                                                                                                                       
                                                                                                                                                             
                                                                                                                                                             
    /**                                                                                                                                                      
     * Sorts all items by using the string of the label.                                                                                                     
     *                                                                                                                                                       
     * @type member                                                                                                                                          
     * @param vReverse {Boolean} Whether the items should be sorted reverse or not.                                                                          
     * @return {void}                                                                                                                                        
     */                                                                                                                                                      
    sortItemsByString : function(scroller)                                                                                                                   
    {                                                                                                                                                        
      var sortitems = [];                                                                                                                                    
      var items = scroller.getChildren();                                                                                                                        
                                                                                                                                                            
      for (var i=0, l=items.length; i<l; i++)                                                                                                                
      {                       
        if (items[i].getDisplay() === false)
          continue;
                                                                                                                                     
        sortitems[i] =                                                                                                                                       
        {                                                                                                                                                    
          key  : items[i].getLabel().getText(),                                                                                                                        
          item : items[i]                                                                                                                                    
        };                                                                                                                                                   
      }                                                                                                                                                      
                                                                                                                                                             
      sortitems.sort(this._sortItemsCompare);      
      for (var i=0; i<l; i++) 
      {                 
        scroller.addAt(sortitems[i].item, i);
      }                                               

    },
    
    dispatchComponentChange : function()
    {
      var appArea = this.getAppArea();
      if (appArea == null)
        return;
        
      appArea.dispatchComponentChange();  
    }
    
    
    
  }  
    
});