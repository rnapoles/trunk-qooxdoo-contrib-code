qx.Class.define("guiBuilder.AppArea",
{
  extend : qx.ui.pageview.tabview.TabView,

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

    formTree :
    {
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.tree.Tree"
    }, 
        
    propertyGrid :
    {
      _legacy : true,
      type    : "object",
      instance  : "guiBuilder.propertyeditor.Grid"
    },      
    
    currentAppSpace : 
    {
      _legacy : true,
      type : "object",
      init: null
    },
    
    currentNonVisualAppSpace : 
    {
      _legacy : true,
      type : "object",
      init: null
    }
        
  },

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function() {
    this.base(arguments);   

    this.setBackgroundColor("window");
    this._doNotDelete = true;
    
    this._typeCounter = new Object;
    
    this.getPane().setPaddingBottom(2);
    
    this.placeNewButton();
  },
  
  members :
  {
    placeNewButton : function()
    { 
      return false;
    },
    
    addStartpage : function()
    {
      /* First a new tabbutton and page is needed */
      var startButton = new qx.ui.pageview.tabview.Button("  * Start *  ");
      startButton.setShowCloseButton(true);
      startButton.setCloseButtonImage("icon/16/actions/edit-delete.png");
      startButton.setChecked(true);     
      startButton.addEventListener("click", this.switchTab, this); 
      startButton.addEventListener("closetab", this.closeTab, this);
      startButton._tabType = 'START';
      this.getBar().add(startButton);      
             
      var appPage = new qx.ui.pageview.tabview.Page(startButton);      
      this.getPane().add(appPage);    
      
      var vertical = new qx.ui.layout.VerticalBoxLayout();  
      vertical.setTop(0);
      vertical.setRight(0);
      vertical.setBottom(0);
      vertical.setLeft(0);                  
      vertical.setPadding(20);
      vertical.setBackgroundColor("white");
      vertical.setSpacing(30);
      appPage.add(vertical);
      
      var logoImage = new qx.ui.basic.Image();
      logoImage.setWidth("100%");
      logoImage.setHeight(123);
      logoImage.setBackgroundImage('guiBuilder/image/logo.png');      
      vertical.add(logoImage);
      
//      var label1 = new qx.ui.basic.Label("<h1>Qooxdoo Weida</h1>");
//    vertical.add(label1);

      var horS = new qx.ui.layout.HorizontalBoxLayout();
      horS.setWidth("100%");
      horS.setHeight("auto");
      horS.setSpacing(80);
      vertical.add(horS);
      
      var vertLeft = new qx.ui.layout.VerticalBoxLayout();
      vertLeft.setWidth("1*");
      vertLeft.setHeight("100%");
      vertLeft.setSpacing(30);
      vertLeft.setPaddingLeft(20);      
      horS.add(vertLeft);

      var vertRight = new qx.ui.layout.VerticalBoxLayout();
      vertRight.setWidth("1*");
      vertRight.setHeight("100%");
      vertRight.setSpacing(30);      
      horS.add(vertRight);
      
      var labelCP = new qx.ui.basic.Label('<span style="color: blue;">Create project</span>');      
      labelCP.setCursor("pointer");      
      labelCP.addEventListener("click", function(e) {
          guiBuilder.MainForm.getInstance()._newProject.loadData();
          guiBuilder.MainForm.getInstance()._newProject.open();
        }, this);   
      vertLeft.add(labelCP);
      
      var openProjectBox = new qx.ui.layout.VerticalBoxLayout();
      openProjectBox.setMarginBottom(10);
      openProjectBox.setHeight("auto");
      openProjectBox.setWidth("100%");
      openProjectBox.setSpacing(10);      
      vertLeft.add(openProjectBox);
      
      var labelOP = new qx.ui.basic.Label('<b>Open project:</b>');      
      labelOP.setCursor("pointer");      
      openProjectBox.add(labelOP);

      var labelLoadingProjects = new qx.ui.basic.Label('Loading list...');      
      labelLoadingProjects.setCursor("pointer");      
      openProjectBox.add(labelLoadingProjects);

      guiBuilder.files.rpc.Project.getInstance().getProjectList(function(e)
        {
          labelLoadingProjects.setDisplay(false);
        
          var data = e.getData();
          var result = data['result'];
      
          var i = 0;
          for (i in result)
          {
            var projectName = result[i];
            
            var labelProject = new qx.ui.basic.Label('<span style="color: blue;">'+projectName+'</span>');
            labelProject.setCursor("pointer");
            labelProject._projectName = projectName;
            labelProject.setPaddingLeft(10);      
            labelProject.addEventListener("click", function(e) 
              {
                guiBuilder.MainForm.getInstance().loadProject(e.getTarget()._projectName);
              }, this);
            openProjectBox.add(labelProject);          
          }                    
        }, this);
         
      var labelCF = new qx.ui.basic.Label('<span style="color: blue;">Create file</span>');
      labelCF.setCursor("pointer");
      labelCF.addEventListener("click", function(e)        
        {
          guiBuilder.MainForm.getInstance()._newDialog.open();
        }, this);
      vertRight.add(labelCF);

      var openURLBox = new qx.ui.layout.VerticalBoxLayout();
      openURLBox.setMarginBottom(10);
      openURLBox.setHeight("auto");
      openURLBox.setWidth("100%");
      openURLBox.setSpacing(10);
      vertRight.add(openURLBox)

      var labelOP = new qx.ui.basic.Label('<b>Websites:</b>');      
      labelOP.setCursor("pointer");      
      openURLBox.add(labelOP);

      var labelAV = new qx.ui.basic.Label('<span style="color: blue;">Open Api Viewer</span>');
      labelAV.setCursor("pointer");
      labelAV.setPaddingLeft(10);
      labelAV.addEventListener("click", function(e)
        {
          this.addIFrame('http://demo.qooxdoo.org/current/apiviewer/', 'Api Viewer');
        }, this);
      openURLBox.add(labelAV);
      
      var labelQD = new qx.ui.basic.Label('<span style="color: blue;">Open Qooxdoo Demos</span>');
      labelQD.setCursor("pointer");
      labelQD.setPaddingLeft(10);      
      labelQD.addEventListener("click", function(e)
        {
          this.addIFrame('http://demo.qooxdoo.org/current/demobrowser/', 'Demos');
        }, this);      
      openURLBox.add(labelQD);
      
      var labelQH = new qx.ui.basic.Label('<span style="color: blue;">Open Qooxdoo Homepage</span>');
      labelQH.setCursor("pointer");
      labelQH.setPaddingLeft(10);      
      labelQH.addEventListener("click", function(e)
        {
          this.addIFrame('http://www.qooxdoo.org/', 'Qooxdoo HP');
        }, this);      
      openURLBox.add(labelQH);
                                           
      var newsVert = new qx.ui.layout.VerticalBoxLayout();
      newsVert.setWidth("100%");
      newsVert.setHeight("1*");
      newsVert.setSpacing(8);
      newsVert.setOverflow("auto");
      newsVert.setPaddingLeft(20);
      vertical.add(newsVert);

      var newsLabel = new qx.ui.basic.Label("<b>News:</b> ");
      newsVert.add(newsLabel);
      
      guiBuilder.files.rpc.Project.getInstance().getNews(function(e)
        {
          var data = e.getData();
          var result = data['result'];
          
          var i = 0;
          for (i in result)
          {
            var newsEntry = result[i];
            
            var labelNews = new qx.ui.basic.Label('<span style="color: blue;">'+newsEntry['title']+'</span>');
            labelNews.setPaddingLeft(10);
            labelNews.setCursor("pointer"); 
            labelNews._link = newsEntry['link'];            
            labelNews.addEventListener("click", function(e)
              {
                var target = e.getTarget();
                this.addIFrame(target._link, target.getText());
              }, this);  
            newsVert.add(labelNews);
          }  
        }, this);
      
    },
    
    addIFrame : function(url, tabName)
    {    
      /* First a new tabbutton and page is needed */
      var apiButton = new qx.ui.pageview.tabview.Button("  "+tabName+"  ");
      apiButton.setShowCloseButton(true);
      apiButton.setCloseButtonImage("icon/16/actions/edit-delete.png");
      apiButton.setChecked(true);     
      apiButton.addEventListener("click", this.switchTab, this); 
      apiButton.addEventListener("closetab", this.closeTab, this);
      apiButton._tabType = 'IFRAME';
      this.getBar().add(apiButton);      
             
      var appPage = new qx.ui.pageview.tabview.Page(apiButton);      
      this.getPane().add(appPage);

      this.placeNewButton();         
      
      var iFrame = new qx.ui.embed.Iframe();
      iFrame.setSource(url); 
      iFrame.setTop(0);            
      iFrame.setRight(0);            
      iFrame.setBottom(0);            
      iFrame.setLeft(0);                              
      iFrame.setBorder(null);
      appPage.add(iFrame);
      
      this.getPropertyGrid().removeData(); 
      this.getFormTree().destroyContent();       
      this.getFormTree().setEnabled(false);
    },

    addEditor : function(content, openFile)
    {    

      var fileName = openFile.getFileName();
      if (fileName == '')
        fileName = '[Unknown]';
        
      if (openFile.getModified() === true)
        fileName += ' [*]';    

      var mainForm = guiBuilder.MainForm.getInstance();
      if (mainForm._currentProject != '')
        mainForm._mainToolBarSave.setEnabled(openFile.getModified() )
    
      /* First a new tabbutton and page is needed */
      var apiButton = new qx.ui.pageview.tabview.Button(fileName);
      apiButton.setShowCloseButton(true);
      apiButton.setCloseButtonImage("icon/16/actions/edit-delete.png");
      apiButton.setChecked(true);     
      apiButton.addEventListener("click", this.switchTab, this); 
      apiButton.addEventListener("closetab", this.closeTab, this);
      apiButton._tabType = 'EDITOR';
      apiButton._openFile = openFile;
      this.getBar().add(apiButton);      
             
      var appPage = new qx.ui.pageview.tabview.Page(apiButton);      
      this.getPane().add(appPage);

      //this.placeNewButton();         
      
      //var editor = new qx.ui.form.TextArea();      
      var editor = new guiBuilder.CodeEditor();
      
      if (content != null)
        editor.setValue(content);      
      
      editor.setHeight("100%");
      editor.setWidth("100%");


      editor._button = apiButton;
      editor._openFile = openFile;
      
      apiButton._editor = editor;
      
      editor.setBorder("inset");

      appPage.add(editor);
      
      
      this.getPropertyGrid().removeData(); 
      this.getFormTree().destroyContent();       
      this.getFormTree().setEnabled(false);
    },
    
    addAppSpace : function(openFile) 
    {                                 
      var fileName = openFile.getFileName();
      if (fileName == '')
        fileName = '[Unknown]';
        
      if (openFile.getModified() === true)
        fileName += ' [*]';
      
      var mainForm = guiBuilder.MainForm.getInstance();
      if (mainForm._currentProject != '')
        mainForm._mainToolBarSave.setEnabled(openFile.getModified() )
      
      /* First a new tabbutton and page is needed */
      var appButton = new qx.ui.pageview.tabview.Button(fileName);
      appButton.setShowCloseButton(true);
      appButton.setCloseButtonImage("icon/16/actions/edit-delete.png");
      appButton.setChecked(true);     
      appButton.addEventListener("click", this.switchTab, this); 
      appButton.addEventListener("closetab", this.closeTab, this);
      appButton._tabType = 'FORM';      
      appButton._openFile = openFile;
      this.getBar().add(appButton);      
             

      

      var appPage = new qx.ui.pageview.tabview.Page(appButton);      
      this.getPane().add(appPage);

      this.placeNewButton();

      /* Then  we create the new app space */
      var app = new qx.ui.layout.CanvasLayout();
      //app.setBorder("inset"); looks better without
      app.setBackgroundColor('#EEEEEE');
      app.setWidth("100%");                
      app.setHeight("1*");
      app.addEventListener("dragdrop", this.appAreaDrop, this);                      
      app.supportsDrop = this.supportDrop;
      app.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"]);    
      app._doNotDelete = true;
      app.setOverflow("auto");
      app._openFile = openFile;
      app._button = appButton;
      
      /* And now the label for the feld bellow */
      var bottomInfoLabel = new qx.ui.basic.Label("Non-Visual components");
      bottomInfoLabel.setBackgroundColor("#BBBBBB");
      bottomInfoLabel.setPadding(4);   
      bottomInfoLabel.setWidth("100%");   
      
      /* The container for the atoms of the non visual components */
      var nonVisualCompContainer = new qx.ui.layout.HorizontalBoxLayout();
      nonVisualCompContainer.setWidth("100%");
      nonVisualCompContainer.setHeight(88);
      nonVisualCompContainer.setOverflow("scrollX"); 
      nonVisualCompContainer.setSpacing(10);
      nonVisualCompContainer.setPadding(8);
      nonVisualCompContainer.addEventListener("dragdrop", this.appNonVisualAreaDrop, this);                      
      nonVisualCompContainer.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"])
      nonVisualCompContainer.supportsDrop = this.supportDrop;
      nonVisualCompContainer._openFile = openFile;
      nonVisualCompContainer._button = appButton;
      
      /* All of them will be put on this */
      var verticalMiddleContainer = new qx.ui.layout.VerticalBoxLayout();
      verticalMiddleContainer.setLeft(0);
      verticalMiddleContainer.setRight(0);
      verticalMiddleContainer.setTop(0);
      verticalMiddleContainer.setBottom(0);
      
      /* And the edit fields we need */
      var xmlEditField = new guiBuilder.CodeEditor(false);
      xmlEditField.setWidth("100%");
      xmlEditField.setHeight("100%");
      xmlEditField.setReadOnly(true);      

      var jsSimpleEditField = new guiBuilder.CodeEditor(false);
      jsSimpleEditField.setWidth("100%");
      jsSimpleEditField.setHeight("100%");
      jsSimpleEditField.setReadOnly(true);
      
      var jsClassEditField = new guiBuilder.CodeEditor(false);
      jsClassEditField.setWidth("100%");
      jsClassEditField.setHeight("100%");    
      jsClassEditField.setReadOnly(true);      
            
      
      /* Then we create the bottom buttons tabs*/
      var appAreaViews = new qx.ui.pageview.tabview.TabView();
      appAreaViews.setLeft(0);
      appAreaViews.setRight(0);      
      appAreaViews.setTop(0);
      appAreaViews.setBottom(0);      
      appAreaViews.setPlaceBarOnTop(false);

      appAreaViews.getPane().setPadding(0);
      
      var formButton = new qx.ui.pageview.tabview.Button(" Form ");
      formButton.setChecked(true)
      appAreaViews.getBar().add(formButton);     
      var formPage = new qx.ui.pageview.tabview.Page(formButton);      
      appAreaViews.getPane().add(formPage);

      var xmlButton = new qx.ui.pageview.tabview.Button(" XML ");
      xmlButton.addEventListener("click", this.switchToXMLTab, this);
      appAreaViews.getBar().add(xmlButton);     
      var xmlPage = new qx.ui.pageview.tabview.Page(xmlButton);      
      appAreaViews.getPane().add(xmlPage);
     
      var jsSimpleButton = new qx.ui.pageview.tabview.Button(" JS Simple Code ");
      jsSimpleButton.addEventListener("click", this.switchToJSSimpleTab, this);
      appAreaViews.getBar().add(jsSimpleButton);     
      var jsSimplePage = new qx.ui.pageview.tabview.Page(jsSimpleButton);      
      appAreaViews.getPane().add(jsSimplePage);
      
      var jsClassButton = new qx.ui.pageview.tabview.Button(" JS Class Code ");
      jsClassButton.addEventListener("click", this.switchToJSClassTab, this);
      appAreaViews.getBar().add(jsClassButton);     
      var jsClassPage = new qx.ui.pageview.tabview.Page(jsClassButton);      
      appAreaViews.getPane().add(jsClassPage);            
            
      appPage.add(appAreaViews);
            
      formPage.add(verticalMiddleContainer);
      verticalMiddleContainer.add(app);
      verticalMiddleContainer.add(bottomInfoLabel);
      verticalMiddleContainer.add(nonVisualCompContainer);
      xmlPage.add(xmlEditField);
      jsSimplePage.add(jsSimpleEditField);
      jsClassPage.add(jsClassEditField);
      
      
      
      /* Last we combine all */    

      appButton._appSpace = app;
      appButton._appNonVisualSpace = nonVisualCompContainer;
      appPage._appSpace   = app;
      appPage._appNonVisualSpace   = nonVisualCompContainer;
      app._tabButton = appButton;     
      app._treeItem = this._treeItem;          
      app._treeItem._component = app;
      app._xmlEditField      = xmlEditField;
      app._jsSimpleEditField = jsSimpleEditField;
      app._jsClassEditField  = jsClassEditField;
      app._parentAppArea = this;
      app._appNonVisualSpace   = nonVisualCompContainer;      
      
      app._allowChildMove = true;
      app._isAppSpace = true;
      
      this.setCurrentAppSpace(app);  
      this.setCurrentNonVisualAppSpace(nonVisualCompContainer);
      this.rebuildFormTree(app);         
      this.getPropertyGrid().removeData();
      
      this.getFormTree().setEnabled(true);      
      
      return app;
    },
        
    closeTab : function(e)
    {
      var btn = e.getData();      
      if (btn._openFile && btn._openFile.getModified() === true)
        if (!confirm("Really close the tab and lost changes?"))
          return false;
    

      var pagesArray = this.getPane().getChildren();
      var pageSearched = null;

      for(var i = 0, l = pagesArray.length; i < l; i++)
      {
        var tmpPage = pagesArray[i];
        if(tmpPage.getButton() === btn){
          pageSearched = tmpPage;
        }
      }

      if (btn._editor)
      {
        btn._editor.setParent(null);
        btn._editor.dispose();
      }
      
      if(pageSearched)
      {
        var itemsList = this.getBar().getChildren();
        var lengthList = itemsList.length;
        var btnIndex = itemsList.indexOf(btn);

        // never remove the last tab
        btn.getManager().remove(btn);
         
        // TODO: Have problems here :/
        this.getBar().remove(btn);
        pageSearched.setParent(null);

        pageSearched.dispose();
        btn.dispose();

        if( lengthList == 1 ) 
        {
          this.addStartpage();
        }
      }
      
      var itemsList = this.getBar().getChildren();
      var lengthList = itemsList.length-1;
      
      if (btnIndex > lengthList)
      {
        itemsList[lengthList].setChecked(true);
      } else {
        itemsList[btnIndex].setChecked(true);
      }  
      
      
      e.stopPropagation();      
    },
    
    switchTab : function(e)
    {
      var sender = e.getCurrentTarget();
      
      this.switchTabByButton(sender);
    },

    switchTabByButton : function(sender)
    {
      var mainForm = guiBuilder.MainForm.getInstance();

      if (sender._tabType == 'FORM')
      {

// too slow :/      
//        mainForm._toolArea.setDisplay(true);   
//        mainForm._toolArea.setWidth(250);                   



              
        appSpace = sender._appSpace;
        appNonVisualSpace = sender._appNonVisualSpace;
      
        // assign the current appSpace to the root element of the form tree
        appSpace._treeItem._component = appSpace;    
      
        this.setCurrentNonVisualAppSpace(appNonVisualSpace);
        this.setCurrentAppSpace(appSpace);  
        this.rebuildFormTree(appSpace);      
        this.getPropertyGrid().removeData();   
        
        this.getFormTree().setEnabled(true);   
      } else {
        this.getPropertyGrid().removeData();
        this.getFormTree().destroyContent();  

        this.getFormTree().setEnabled(false);                

// too slow :/
//        mainForm._toolArea.setDisplay(false);  
//        mainForm._toolArea.setWidth(1);
      }
      
      if (sender._openFile)
      {        
        if (mainForm._currentProject != '')        
        {
          if (sender._openFile.getModified() === true)
          {
            mainForm._mainToolBarSave.setEnabled(true);      
          } else {
            mainForm._mainToolBarSave.setEnabled(false);        
          }  
        }  
      } else {
        var mainForm = guiBuilder.MainForm.getInstance();
        mainForm._mainToolBarSave.setEnabled(false);
      }
      
    },
    
    
    switchToJSClassTab : function(e)
    {
      appSpace = this.getCurrentAppSpace()
      saveScreen = new guiBuilder.content.save.JavaScriptClass();
      saveScreen._parsedComponentXML = this._parsedComponentXML;
      var result = saveScreen.generate(appSpace);
      appSpace._jsClassEditField.setValue(result);
      
      saveScreen.dispose();
    },

    switchToJSSimpleTab : function(e)
    {
      appSpace = this.getCurrentAppSpace()
      var saveScreen = new guiBuilder.content.save.JavaScript();
      saveScreen._parsedComponentXML = this._parsedComponentXML;
      var result = saveScreen.generate(appSpace);
      appSpace._jsSimpleEditField.setValue(result);
      
      saveScreen.dispose();      
    },
        
    switchToXMLTab : function(e)
    {
      appSpace = this.getCurrentAppSpace()
      var saveScreen = new guiBuilder.content.save.XML();
      saveScreen._parsedComponentXML = this._parsedComponentXML;
      var result = saveScreen.generate(appSpace);
      
      appSpace._xmlEditField.setValue(result);

      saveScreen.dispose();      
    },
    
    resetPropertyEditor : function()
    {
    },
    
    rebuildFormTree : function(appSpace)
    {
      this.getFormTree().destroyContent();        
      this._rebuildFormTreeLoop(appSpace, appSpace);                                    
    },
    
    _rebuildFormTreeLoop : function(parent, component)
    {               
      if (component.getChildren)
      {
        var children = component.getChildren();
        var childCount = component.getChildrenLength();
      
        var i = 0;
        for (i = 0; i < childCount; i++)
        {
          if (children[i]._name)
          { 
            var comp = children[i];           
            if (comp._parent)
            { 
              var iconTree = null;
              if (children[i]._iconTree)
                iconTree = children[i]._iconTree;
                
              var newTreeItem = new qx.ui.tree.TreeFolder(comp._name, iconTree, iconTree);
              newTreeItem.setFont(qx.ui.core.Font.fromString("10px sans-serif"));
              parent._treeItem.add(newTreeItem);
              parent._treeItem.open();
              children[i]._treeItem = newTreeItem;
              newTreeItem._component = children[i];      
              newTreeItem.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"]);
              newTreeItem.addEventListener("dragstart", this._appParent.formTreeDragStart, this._appParent); 
              newTreeItem.addEventListener("dragdrop", this._appParent.formTreeItemDrop, this._appParent);            
            } else {
              var iconTree = null;
              if (children[i]._iconTree)
                iconTree = children[i]._iconTree;
              
              var newTreeItem = new qx.ui.tree.TreeFile(comp._name, iconTree);
              newTreeItem.setFont(qx.ui.core.Font.fromString("10px sans-serif"));              
              parent._treeItem.add(newTreeItem);        
              parent._treeItem.open();              
              children[i]._treeItem = newTreeItem;
              newTreeItem._component = children[i];      
              
              
                
              newTreeItem.addEventListener("dragstart", this._appParent.formTreeDragStart, this._appParent);               
            }    

            if (children[i]._handler)
            {
              var thisAppSpace = this;
              eval(children[i]._handler+'.rebuildFormTreeLoop(children[i], thisAppSpace);');
            }
            
            this._rebuildFormTreeLoop(children[i], children[i]);
          }
        }
      }          
      
    },

    setComponentProperties : function(widget, name, value)
    {
      // TODO : find a cheaper way to find the setter
      // NOTE : the name is LOWERCASE - hence we iterate all properties of the widget
      //         to try and find a matching one
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

    appNonVisualAreaDrop : function(e) 
    {
      var vType = e.getDropDataTypes()[0];
      var vSource = e.getData(vType);
      var vTarget = e.getCurrentTarget();

            
      /* The following lines avoid a multiple times adding. Qooxdoo calls all 
         components that are stacked when they are accept drag and drop events. 
         With that only the top-most component is handled */
      if(e._ignore)
        return false;            
      e._ignore = true;             
     
      appNonVisualSpace = this.getCurrentNonVisualAppSpace();
      
     /* ############ Now we create the shown comp ############ */   
     var nonVisual = new guiBuilder.NonVisualComp();
     
     var iconName = "icon/32/actions/system-run.png";
     if (vSource._icon)
       iconName = vSource._icon;
     nonVisual.setIcon(iconName)
     appNonVisualSpace.add(nonVisual);
     
     var classConstructor = qx.Class.getByName(vSource._className);
     if (!classConstructor) {
       throw this._newError("constructor not found", { className : className });
     }
     var addComp = new classConstructor();
     addComp._attr = new Object;  // we need to create this very early!          
     addComp._properties = vSource._properties;
     addComp._events = vSource._events;
     nonVisual.setChildComponent(addComp);

     nonVisual._nonvisual = vSource._nonvisual;
      
     if (!vSource._nonvisual)     
     {
       alert("Please drop visual components to the are above");
       return false;
     }      
     
     /* ############ now we set the init values ############ */
     //this.setComponentProperties(widget, prop, value);
     
     if (vSource._propertiesInit)
     {
       for (var propertyName in vSource._propertiesInit)
       {
         value = vSource._propertiesInit[propertyName].attributes['value'].value;
         
         // is it a number ?
         var n = new Number(value);
         if (!isNaN(n)) 
         {
           value = n.valueOf();
         }  
         
         this.setComponentProperties(addComp, propertyName, [ value ]);
       }
     }


     vTarget._openFile.setModified(true);
     var fileName = vTarget._openFile.getFileName();
     if (fileName == '')
       fileName = '[Unknown]';
     vTarget._button.setLabel(fileName+' [*]');
     
     var mainForm = guiBuilder.MainForm.getInstance();
     if (mainForm._currentProject != '')
       mainForm._mainToolBarSave.setEnabled(true);

     
     /* ############ The component needs a name :) ############ */     
     var shortName = vSource._shortName;
     if (!this._typeCounter[shortName])
     {
       this._typeCounter[shortName] = 0;
     }
     
     this._typeCounter[shortName] = this._typeCounter[shortName]+1;
     var compName = shortName+this._typeCounter[shortName];   
     addComp._name = compName;
     nonVisual.setLabel(compName);

     
     nonVisual.addEventListener("click", this.formElementClicked, this);  
     
    },
    
    
    
    
    appAreaDrop : function(e) 
    {
      var vType = e.getDropDataTypes()[0];
      var vSource = e.getData(vType);
      var vTarget = e.getCurrentTarget();
            
      /* The following lines avoid a multiple times adding. Qooxdoo calls all 
         components that are stacked when they are accept drag and drop events. 
         With that only the top-most component is handled */
      if(e._ignore)
        return false;            
      e._ignore = true;             
      
      if (vSource._allowedParent)
      {
        var splitted = vSource._allowedParent.split(",");        
        var allowedTarget = false;
        
        for (a in splitted)
        {
          if (splitted[a] == vTarget.classname)
          {
            allowedTarget = true;
          }
        }
        
        if (!allowedTarget)
        { 
          this.debug("Not an allowed target "+vTarget.classname+' need '+vSource._allowedParent);
          //alert('Need to be placed on: '+vSource._allowedParent);        
          //e.stopPropagation();
          return false;
        }  
      }
     
     if (vSource._className == 'virtual')
     {
       /* This code executes a special class function to handle the new created 
          object as it is needed (class is named in the basic.xml) */
       if (vSource._handler)
       {
         eval(vSource._handler+'.createOfVirtual(vTarget, vSource, this);');
       }      
       
       return true;
     }
     
     var classConstructor = qx.Class.getByName(vSource._className);
     if (!classConstructor) {
       throw this._newError("constructor not found", { className : className });
     }

     var addComp = new classConstructor();
     
     addComp._attr     = new Object;  // we need to create this very early!
     addComp._listener = new Object;  // we need to create this very early!
     
     if (vSource._nonvisual)     
     {
       alert("Please drop non-visual components to \nthe special area below");
       return false;
     }
     
     /* This code executes a special class function to handle the new created 
        object as it is needed (class is named in the basic.xml) */
     if (vSource._handler)
     {
       eval(vSource._handler+'.afterCreatedOnAppSpace(addComp, this);');
     }
     
     addComp._properties = vSource._properties;
     addComp._events = vSource._events;     
     if (vSource._icon)
       addComp._icon       = vSource._icon;
     if (vSource._iconTree)
       addComp._iconTree   = vSource._iconTree;

     /* ############ Add the component to its parent ############ */     
     vTarget.add(addComp); 
     
     /* ############ now we set the init values ############ */
     //this.setComponentProperties(widget, prop, value);
     
     if (vSource._propertiesInit)
     {
       for (var propertyName in vSource._propertiesInit)
       {
         if (vSource._propertiesInit[propertyName].attributes['set'])
           if (vSource._propertiesInit[propertyName].attributes['set'].value == "false")
             continue;
       
         value = vSource._propertiesInit[propertyName].attributes['value'].value;
         
         // is it a number ?
         var n = new Number(value);
         if (!isNaN(n)) 
         {
           value = n.valueOf();
         }  
                  
         // this is sometimes needed to overwrite attributes         
         if (value == '#NULL#') 
           value = null;
         
         this.setComponentProperties(addComp, propertyName, [ value ]);
       }
     }

     /* ############ The component needs a name :) ############ */     
     var shortName  = vSource._shortName;
     shortNameFirst = shortName.substr(0, 1);
     shortName      = shortNameFirst.toLowerCase()+shortName.substr(1);
     if (!this._typeCounter[shortName])
     {
       this._typeCounter[shortName] = 0;
     }
     
     this._typeCounter[shortName] = this._typeCounter[shortName]+1;
     var compName = shortName+this._typeCounter[shortName];   
     addComp._name = compName;
     addComp._handler = vSource._handler;

     if (vSource._iconTree)
       addComp._iconTree   = vSource._iconTree;
     
     /* ############ at last we create the form tree items and the event handlers ############ */
     addComp.addEventListener("click", this.formElementClicked, this);     
           
     if (vSource._parent) 
     {
       var iconTree = null;
       if (vSource._iconTree)
          iconTree = vSource._iconTree;                
          
       var newTreeItem = new qx.ui.tree.TreeFolder(addComp._name, iconTree, iconTree);
       newTreeItem.setFont(qx.ui.core.Font.fromString("10px sans-serif"));
       vTarget._treeItem.add(newTreeItem);        
       vTarget._treeItem.open();           
       addComp._treeItem = newTreeItem;
       newTreeItem._component = addComp;      
       newTreeItem.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"]);
       newTreeItem.addEventListener("dragstart", this._appParent.formTreeDragStart, this._appParent); 
       newTreeItem.addEventListener("dragdrop", this._appParent.formTreeItemDrop, this._appParent);
 
       addComp._parent = true;
       addComp.addEventListener("dragdrop", this.appAreaDrop, this);                  
       addComp.supportsDrop = this.supportDrop;
       addComp.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"]);        
     } else {
        var iconTree = null;
        if (vSource._iconTree)
          iconTree = vSource._iconTree;                
          
        var newTreeItem = new qx.ui.tree.TreeFile(addComp._name, iconTree);
        newTreeItem.setFont(qx.ui.core.Font.fromString("10px sans-serif"));        
        vTarget._treeItem.add(newTreeItem);        
        vTarget._treeItem.open();                   
        addComp._treeItem = newTreeItem;
        newTreeItem._component = addComp;      
        newTreeItem.addEventListener("dragstart", this._appParent.formTreeDragStart, this._appParent);           
     }       

     /* This code executes a special class function to handle the new created 
        object as it is needed (class is named in the basic.xml) */
     if (vSource._handler)
     {
       eval(vSource._handler+'.afterFinishCreatedOnAppSpace(addComp, this);');
     }

     if (vTarget._openFile)
     {
       vTarget._openFile.setModified(true);
       var fileName = vTarget._openFile.getFileName();
       if (fileName == '')
         fileName = '[Unknown]';
       vTarget._button.setLabel(fileName+' [*]');
     }
     
     var mainForm = guiBuilder.MainForm.getInstance();
     if (mainForm._currentProject != '')     
       mainForm._mainToolBarSave.setEnabled(true);
     
//      this.debug("------------------");
//      this.debug(this._parsedComponentXML);
//      this.debug("------------------");   
      
    }, 



    handleMouseDown : function(e)
    { 
      target = e.getTarget();
      if (target._afterDD)
      {
        if (target.getParent()._allowChildMove)
        {      
          target.setCapture(true);
          target._offsetX = e.getPageX() - target.getLeft();
          target._offsetY = e.getPageY() - target.getTop();
        }
        this.debug("START");
      }        

    },
    
    handleMouseMove : function(e)
    {
      //this.debug("i");     
      target = e.getTarget();
      if (target.getCapture())
      {
        target.setLeft(e.getPageX() - target._offsetX);
        target.setTop(e.getPageY() - target._offsetY);
        
        //this.debug("X");        
      }
    },
          
    handleMouseUp : function(e)
    {
      target = e.getTarget();
      if (target._afterDD)
      {    
        target.setCapture(false);
        this.debug("END");
      }  
    },




    formElementClicked : function(e) {
      var target = e.getTarget();
//this.debug('1');
      // the shown atom only contains the real objekt, but it doesn't it itself
      if (target._nonvisual)
      {
        target = target.getChildComponent();
        this.getPropertyGrid().setDataByObject(target);
      } else {

        // non visual components are not in the tree
        if (target._treeItem)
        {
          this.getFormTree().setSelectedElement(target._treeItem);
        } else {
          this.getPropertyGrid().setDataByObject(target);
        }  
      }
//this.debug('2');

      e.stopPropagation();
    },
    
    supportDrop : function(vDragCache) { // this allowes to define from where the drag comes
      return true; //!vDragCache.sourceWidget.contains(this);
    },
    
    getAllComponentsByClassName : function(className)
    {
      var oArray = new Array();
      
      var appArea = this.getCurrentAppSpace();
      var result = this.getAllComponentsByClassNameIterator(appArea, className, oArray);
      
      
      
      var appNonVisualArea = this.getCurrentNonVisualAppSpace();
      var children = appNonVisualArea.getChildren();
      var childCount = appNonVisualArea.getChildrenLength();
      
      var i = 0;
      for (i = 0; i < childCount; i++)
      {
        if (children[i].classname == 'guiBuilder.NonVisualComp')
        {
          child = children[i].getChildComponent();
        
          if (child.classname == className)
          { 
            oArray.push(children[i]);
          }
        }  
      }
           
      return result;
    },
    
    getAllComponentsByClassNameIterator : function(component, className, oArray)
    {
      if (component.classname == className)
      {
        oArray.push(component);
      }
      
      if (component.getChildren)
      {
        var children = component.getChildren();
        var childCount = component.getChildrenLength();
      
        var i = 0;
        for (i = 0; i < childCount; i++)
        {
          if (children[i]._name)
          {
            oArray = this.getAllComponentsByClassNameIterator(children[i], className, oArray);
          }
        }
      }    
      
      return oArray;          
    },
    
    isFileAllreadyOpen : function(projectName, fileName)    
    {
      var buttonBar = this.getBar();
      
      var children = buttonBar.getChildren();
      var childCount = buttonBar.getChildrenLength();    

      var i = 0;
      for (i = 0; i < childCount; i++)      
      {
        var child = children[i];
        
        if (!child._openFile)
          continue;
        
        var cProjectName = child._openFile.getProjectName();
        var cFileName    = child._openFile.getFullFileName();
        
        cFileName = cFileName.substr(projectName.length+1);
         
        if (cFileName == fileName && cProjectName == projectName)
        {
          child.setChecked(true);
          return true;
        }
      }
      
      return false;      
    },
    
    dispatchComponentChange : function()
    {
      var currentAppSpace = this.getCurrentAppSpace();

      if (currentAppSpace == null)
        return;
      
      currentAppSpace._openFile.setModified(true);
        
      var fileName = currentAppSpace._openFile.getFileName();
      if (fileName == '')
         fileName = '[Unknown]';
      currentAppSpace._button.setLabel(fileName+' [*]');      
      
      var mainForm = guiBuilder.MainForm.getInstance();
      if (mainForm._currentProject != '')
        mainForm._mainToolBarSave.setEnabled(true);      
    }
    
    
  }
});