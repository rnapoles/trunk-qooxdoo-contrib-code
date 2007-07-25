/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */
/* ************************************************************************

#resource(image:image)
#require(qx.event.handler.DragAndDropHandler)

************************************************************************ */

/**
 * Your custom application
 */
qx.Class.define("guiBuilder.MainForm",
{
  extend : qx.core.Target,
  type : "singleton",

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

    componentTree :
    {
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.tree.Tree"
    },  

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
    
    projectTree :
    {
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.tree.Tree"
    }
  
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
       
    initUI : function(e)
    {             
      this._currentProject = '';

/*
      this._showMake = new guiBuilder.ShowMake();
      this._showMake.getIFrame().setSource("blank");
      this._showMake.setWidth(700);
      this._showMake.setHeight(600);
      this._showMake.setCentered(true);
      this._showMake.addToDocument();
      this._showMake.open();

return;
*/
           
      mainForToolBar = new qx.ui.layout.VerticalBoxLayout();   
      mainForToolBar.setLeft(0);
      mainForToolBar.setTop(0);
      mainForToolBar.setRight(0);
      mainForToolBar.setBottom(0);
      mainForToolBar.addToDocument();           

      var tb = new qx.ui.toolbar.ToolBar;
      tb.setWidth("100%");     
      tb.setMarginBottom(5);
      mainForToolBar.add(tb); 

      var tbp = new qx.ui.toolbar.Part;
      tbp.setWidth("auto");
      tb.add(tbp);

      this._newProject = new guiBuilder.NewProjectDialog();
      this._newProject.setCentered(true);
      this._newProject.setHeight(300);
      this._newProject.setWidth(250);
      this._newProject.addToDocument();
      this._newProject.loadData();
      
      var mainToolBarProjectNew = new qx.ui.toolbar.Button("New Project", "icon/16/actions/document-new.png");
      mainToolBarProjectNew.addEventListener("execute", function(e)
        {
          this._newProject.loadData();
          this._newProject.open();
        }, this);
      tbp.add(mainToolBarProjectNew);

      var loadDialog = new guiBuilder.ChooseProjectDialog();
      loadDialog.setCaption("Choose Project...")
      loadDialog.setWidth(200);
      loadDialog.setHeight(300);
      loadDialog.setCentered(true);
      loadDialog.addToDocument();
      loadDialog.setModal(true);

      var mainToolBarProjectLoad = new qx.ui.toolbar.Button("Open Project", "icon/16/actions/document-open.png");
      mainToolBarProjectLoad.addEventListener("execute", function(e)
        {
          loadDialog.loadData();          
          loadDialog.open();
        },this);
      tbp.add(mainToolBarProjectLoad);
      
      this._mainToolBarClose = new qx.ui.toolbar.Button("Close Project", "icon/16/actions/document-close.png");
      this._mainToolBarClose.setEnabled(false);
      this._mainToolBarClose.addEventListener("execute", function(e)
        {
          this._currentProject = '';
          
          var projectTree = this.getProjectTree();
          projectTree.removeAll();
          projectTree.setEnabled(false);
          projectTree.setLabel('Project');
          
          this._mainToolBarClose.setEnabled(false);
          this._toolBarProjectRefresh.setEnabled(false);
          this._toolBarProjectNewFolder.setEnabled(false);
          this._toolBarProjectDelete.setEnabled(false);

          this._mainToolBarRun.setEnabled(false);
          this._mainToolBarMSource.setEnabled(false);
          this._mainToolBarMBuild.setEnabled(false);          
        }, this);
      tbp.add(this._mainToolBarClose);

      var tbp = new qx.ui.toolbar.Part;
      tbp.setWidth("auto");
      tb.add(tbp);

      var inputDialog = new guiBuilder.InputDialog("Input content...");
      inputDialog.setCentered(true);
      inputDialog.setHeight(400);
      inputDialog.setWidth(400);
      inputDialog.setModal(true);
      inputDialog.addToDocument();      

      var mainToolBarInput = new qx.ui.toolbar.Button("Input", "icon/16/actions/document-open.png");
      mainToolBarInput.addEventListener("execute", function(e)        
        {
          inputDialog.open();
        }, this);
      tbp.add(mainToolBarInput);
     
      var tbp = new qx.ui.toolbar.Part;
      tbp.setWidth("auto");
      tb.add(tbp);

      var newDialog = new guiBuilder.NewDialog("New...");
      newDialog.setCentered(true);
      newDialog.setHeight(150);
      newDialog.setWidth(300);
      newDialog.setModal(true);
      newDialog.addToDocument();
      newDialog.addEventListener("choosen", function(e)
        { 

          this.newDocument(e.getData());
        }, this);
      this._newDialog = newDialog;
      
      var mainToolBarNew = new qx.ui.toolbar.Button("New", "icon/16/actions/document-new.png");
      mainToolBarNew.addEventListener("execute", function(e)
        {             
          newDialog.open();          
        }, this);
      tbp.add(mainToolBarNew);



      this._saveDialog = new guiBuilder.SaveDialog("Save to...");
      this._saveDialog.setHeight(350);
      this._saveDialog.setWidth(300);
      this._saveDialog.setCentered(true); 
      this._saveDialog.addToDocument();
      this._saveDialog.addEventListener("choosen", function(e)      
        {
          this.onChoosenSaveDialog(e.getData());
        }, this);
      

      this._mainToolBarSave = new qx.ui.toolbar.Button("Save", "icon/16/actions/document-save.png");
      this._mainToolBarSave.setEnabled(false);
      this._mainToolBarSave.addEventListener("execute", function(e)        
        {
          this.saveCurrentDocument();
        }, this);
      tbp.add(this._mainToolBarSave);      


      this._showMake = new guiBuilder.ShowMake();
      this._showMake.setWidth(700);
      this._showMake.setHeight(600);
      this._showMake.setCentered(true);
      this._showMake.addToDocument();
      

      var tbpMake = new qx.ui.toolbar.Part;
      tbpMake.setWidth("1*");
      tb.add(tbpMake);

      this._mainToolBarRun = new qx.ui.toolbar.Button("Run", "icon/16/actions/media-playback-start.png");
      this._mainToolBarRun.setEnabled(false);
      this._mainToolBarRun.addEventListener("execute", function(e)
        {
          var source = guiBuilder.Config.getInstance().getProjectURL()+
                       this._currentProject+'/source/index.html';
                       
          window.prompt("Please open the following url: ", source);
        }, this)
      tbpMake.add(this._mainToolBarRun);

      this._mainToolBarMSource = new qx.ui.toolbar.Button("Make source", "icon/16/apps/accessories-disk-usage.png");
      this._mainToolBarMSource.setEnabled(false);
      this._mainToolBarMSource.addEventListener("execute", function(e)
        {          
          var source = guiBuilder.Config.getInstance().getBackendURL()+
                       'make.php?project='+this._currentProject+'&mode=source';
                       
          this._showMake.getIFrame().setSource("_blank");          
          this._showMake.getIFrame().setSource(source);          
          this._showMake.open();      
        }, this);    
      tbpMake.add(this._mainToolBarMSource);

      this._mainToolBarMBuild = new qx.ui.toolbar.Button("Make build", "icon/16/apps/accessories-disk-usage.png");
      this._mainToolBarMBuild.setEnabled(false);
      this._mainToolBarMBuild.addEventListener("execute", function(e)
        {
          var source = guiBuilder.Config.getInstance().getBackendURL()+
                       'make.php?project='+this._currentProject+'&mode=build';
                       
          this._showMake.getIFrame().setSource("_blank");          
          this._showMake.getIFrame().setSource(source);          
          this._showMake.open();      
        }, this);    
      tbpMake.add(this._mainToolBarMBuild);
   

       
       
       
      var tbp = new qx.ui.toolbar.Part;
      tbp.setWidth("auto");
      tb.add(tbp);       


      var mainToolBarApiViewer = new qx.ui.toolbar.Button("API Viewer", "icon/16/apps/accessories-tip.png");
      mainToolBarApiViewer.addEventListener("execute", function(e) {
        this.getAppArea().addIFrame('http://demo.qooxdoo.org/current/apiviewer/', 'Api Viewer');
      }, this);
      tbp.add(mainToolBarApiViewer);       
      
      var mainToolBarDemos = new qx.ui.toolbar.Button("Demos", "icon/16/apps/accessories-tip.png");      
      mainToolBarDemos.addEventListener("execute", function(e) {
        this.getAppArea().addIFrame('http://demo.qooxdoo.org/current/demobrowser/', 'Demos');
      }, this);
      tbp.add(mainToolBarDemos);             

      var mainToolBarHP = new qx.ui.toolbar.Button("Qooxdoo HP", "icon/16/apps/accessories-tip.png");
      mainToolBarHP.addEventListener("execute", function(e) {
        this.getAppArea().addIFrame('http://www.qooxdoo.org/', 'Qooxdoo HP');
      }, this);      
      tbp.add(mainToolBarHP);   
      
      
      
          

      main = new qx.ui.layout.HorizontalBoxLayout();   
      main.setHeight("1*");
      main.setWidth("100%");
      main.setBackgroundColor("window");
      mainForToolBar.add(main);


      leftArea = new qx.ui.layout.VerticalBoxLayout();   
      leftArea.setWidth("auto");
      leftArea.setPaddingRight(2);  
      leftArea.setBackgroundColor("window");
      main.add(leftArea);





	  var toolBarProject = new qx.ui.toolbar.ToolBar();
      toolBarProject.setHeight("auto");
	  toolBarProject.setWidth("100%");
	  toolBarProject.setBorder("outset");
	  toolBarProject.setBorder("outset-thin");
	  toolBarProject.setBackgroundImage("guiBuilder/image/toolbarbg.png");
	  toolBarProject.setShow("icon");
      leftArea.add(toolBarProject);
   
      var labelTitle = new qx.ui.basic.Label("Project files");
      labelTitle.setHeight(22);
      labelTitle.setWidth("auto");
      labelTitle.setPadding(4);
      labelTitle._keepOnDelete = true;
      toolBarProject.add(labelTitle); 
     
      var spacer = new qx.ui.basic.HorizontalSpacer();
      toolBarProject.add(spacer);    

	  this._toolBarProjectDelete = new qx.ui.toolbar.Button();
	  this._toolBarProjectDelete.setBackgroundColor(null);
	  this._toolBarProjectDelete.setHeight("auto");
	  this._toolBarProjectDelete.setWidth("auto");
	  this._toolBarProjectDelete.setLabel("New folder");
	  this._toolBarProjectDelete.setIcon("icon/16/actions/stop.png");
	  this._toolBarProjectDelete.setIconHeight(0);
      this._toolBarProjectDelete.setEnabled(false);
      this._toolBarProjectDelete.addEventListener("execute", function(e)        
        {

        
          var selected = this.getProjectTree().getSelectedElement();        
          if (selected === false)
          {
            alert("Nothing selected!");
            return;
          } 
          
          if (selected._doNotDelete)
          {
            alert("Could not delete entry!");
            return;
          }

          if (!confirm("Really delete selected file/folder?"))
            return false; 
          
          if (selected._fullDir)
          {
            var fullDir = selected._fullDir;
          } else {
            var parent = selected.getParentFolder();
            
            var parentDir = '';
            if (parent._fullDir)
              parentDir = parent._fullDir;
              
            fullDir = parentDir+selected.getLabel();
          }
          
          fullDir = this._currentProject+'/'+fullDir;
              
          guiBuilder.files.rpc.Project.getInstance().deleteFile(fullDir, function(e)
            {
              var data = e.getData();
              var result = data['result'];
              
              if (result !== true)
              {
                alert("Deleting failed! "+result);
                return;                
              }  
              
              var selected = this.getProjectTree().getSelectedElement();    
              selected.setParent(null);
              selected.dispose();
            }, this);
                  
        }, this);
	  toolBarProject.add(this._toolBarProjectDelete); 

	  this._toolBarProjectNewFolder = new qx.ui.toolbar.Button();
	  this._toolBarProjectNewFolder.setBackgroundColor(null);
	  this._toolBarProjectNewFolder.setHeight("auto");
	  this._toolBarProjectNewFolder.setWidth("auto");
	  this._toolBarProjectNewFolder.setLabel("New folder");
	  this._toolBarProjectNewFolder.setIcon("icon/16/actions/folder-new.png");
	  this._toolBarProjectNewFolder.setIconHeight(0);
      this._toolBarProjectNewFolder.setEnabled(false);
      this._toolBarProjectNewFolder.addEventListener("execute", function(e)
        {
          var selected = this.getProjectTree().getSelectedElement();        
          if (selected === false)
          {
            alert("Nothing selected!");
            return;
          }
          
          if (!selected._fullDir)
          {
            alert("Please select a directory");
            return;
          }
          
          var result = window.prompt("Please enter directory name:");
          if (result == null)
            return;
          
          var fullDirName = this._currentProject+'/'+selected._fullDir+result;
          
          guiBuilder.files.rpc.Project.getInstance().newDirectory(fullDirName, function(e)
            {
              var data = e.getData();
              var result = data['result'];
              
              var selected = this.getProjectTree().getSelectedElement();
              
              var newTreeFolder = new qx.ui.tree.TreeFolder(result['dirBaseName']);
              newTreeFolder._baseDir = result['dirName']+'/';
              newTreeFolder._fullDir = result['fullDirName']+'/';      
              selected.add(newTreeFolder);             
            }, this);
                    
        }, this);
	  toolBarProject.add(this._toolBarProjectNewFolder);
 
	  this._toolBarProjectRefresh = new qx.ui.toolbar.Button();
	  this._toolBarProjectRefresh.setBackgroundColor(null);
	  this._toolBarProjectRefresh.setHeight("auto");
	  this._toolBarProjectRefresh.setWidth("auto");
	  this._toolBarProjectRefresh.setLabel("Refresh");
	  this._toolBarProjectRefresh.setIcon("icon/16/actions/view-refresh.png");
	  this._toolBarProjectRefresh.setIconHeight(0);
      this._toolBarProjectRefresh.setEnabled(false);
      this._toolBarProjectRefresh.addEventListener("execute", function(e)
        {
          this.loadProject(this._currentProject);        
        }, this);
	  toolBarProject.add(this._toolBarProjectRefresh);
	



      var leftVSplitPane = new qx.ui.splitpane.VerticalSplitPane;
      leftVSplitPane.setHeight("1*");
      leftVSplitPane.setWidth(250);
      leftArea.add(leftVSplitPane);     
      
      
      appArea = new guiBuilder.AppArea();   
      appArea.setWidth("1*");
      appArea.setHeight("100%");    
      appArea.setMarginRight(2);
      main.add(appArea)

      this.setAppArea(appArea);
      
      toolArea = new qx.ui.layout.VerticalBoxLayout();
      toolArea.setWidth(250);
      toolArea.setHeight("100%");
      main.add(toolArea);
      this._toolArea = toolArea;





      var projectTree = new qx.ui.tree.Tree('Project');      
      projectTree.setHeight("100%");
      projectTree.setWidth("100%");
      projectTree.setBackgroundColor("white");
      projectTree.setBorder("inset");
      projectTree.setEnabled(false);
      projectTree.setOverflow("auto");
      projectTree._baseDir = '/';
      projectTree._fullDir = '/';
      projectTree._doNotDelete = true;
      this.setProjectTree(projectTree);
      
      leftVSplitPane.addTop(projectTree); 
      








	  var toolBarFormTree = new qx.ui.toolbar.ToolBar();
      toolBarFormTree.setHeight("auto");
	  toolBarFormTree.setWidth("100%");
	  toolBarFormTree.setBorder("outset");
	  toolBarFormTree.setBorder("outset-thin");
	  toolBarFormTree.setBackgroundImage("guiBuilder/image/toolbarbg.png");
	  toolBarFormTree.setShow("icon");
	  toolArea.add(toolBarFormTree);
	  
	  var formTreeToolbarLabel = new qx.ui.basic.Label('Widgets of the form');
	  formTreeToolbarLabel.setHeight("100%");
	  formTreeToolbarLabel.setPaddingLeft(4);
	  formTreeToolbarLabel.setPaddingTop(3);
	  toolBarFormTree.add(formTreeToolbarLabel);
	  
	  var spacer = new qx.ui.basic.HorizontalSpacer();
	  toolBarFormTree.add(spacer);
	  
	  formTreeToolbarCopy = new qx.ui.toolbar.Button();
	  formTreeToolbarCopy.setBackgroundColor(null);
	  formTreeToolbarCopy.setHeight("auto");
	  formTreeToolbarCopy.setWidth("auto");
	  formTreeToolbarCopy.setLabel("Copy");
	  formTreeToolbarCopy.setIcon("icon/16/actions/edit-copy.png");
	  formTreeToolbarCopy.setIconHeight(0);
      formTreeToolbarCopy.addEventListener("execute", this.clickedFormTreeToolbarCopy, this);	  
	  toolBarFormTree.add(formTreeToolbarCopy);


	  formTreeToolbarCut = new qx.ui.toolbar.Button();
	  formTreeToolbarCut.setBackgroundColor(null);
	  formTreeToolbarCut.setHeight("auto");
	  formTreeToolbarCut.setWidth("auto");
	  formTreeToolbarCut.setLabel("Cut");
	  formTreeToolbarCut.setIcon("icon/16/actions/edit-cut.png");
	  formTreeToolbarCut.setIconHeight(0);
      formTreeToolbarCut.addEventListener("execute", this.clickedFormTreeToolbarCut, this);	
	  toolBarFormTree.add(formTreeToolbarCut);

	  this._formTreeToolbarPaste = new qx.ui.toolbar.Button();
	  this._formTreeToolbarPaste.setBackgroundColor(null);
	  this._formTreeToolbarPaste.setHeight("auto");
	  this._formTreeToolbarPaste.setWidth("auto");
	  this._formTreeToolbarPaste.setLabel("Paste");
	  this._formTreeToolbarPaste.setIcon("icon/16/actions/edit-paste.png");
	  this._formTreeToolbarPaste.setIconHeight(0);
	  this._formTreeToolbarPaste.setEnabled(false);
      this._formTreeToolbarPaste.addEventListener("execute", this.clickedFormTreeToolbarPaste, this);	  	  	  
	  toolBarFormTree.add(this._formTreeToolbarPaste);

	  formTreeToolbarClone = new qx.ui.toolbar.Button();
	  formTreeToolbarClone.setBackgroundColor(null);
	  formTreeToolbarClone.setHeight("auto");
	  formTreeToolbarClone.setWidth("auto");
	  formTreeToolbarClone.setLabel("Clone");
	  formTreeToolbarClone.setIcon("icon/16/actions/edit-copy.png");
	  formTreeToolbarClone.setIconHeight(0);
      formTreeToolbarClone.addEventListener("execute", this.clickedFormTreeToolbarClone, this);		  
	  toolBarFormTree.add(formTreeToolbarClone);
	  
	  var separator = new qx.ui.toolbar.Separator();
	  toolBarFormTree.add(separator);
	  
	  formTreeToolbarDelete = new qx.ui.toolbar.Button();
	  formTreeToolbarDelete.setBackgroundColor(null);
	  formTreeToolbarDelete.setHeight("auto");
	  formTreeToolbarDelete.setWidth("auto");
	  formTreeToolbarDelete.setLabel("Delete");
	  formTreeToolbarDelete.setIcon("icon/16/actions/stop.png");
	  formTreeToolbarDelete.setIconHeight(0);
      formTreeToolbarDelete.addEventListener("execute", this.clickedFormTreeToolbarDelete, this);	  
	  toolBarFormTree.add(formTreeToolbarDelete);	  



      formTree = new qx.ui.tree.Tree("Form");   
      formTree.setOverflow("scrollY");
      formTree.setBorder("inset");
      formTree.setBackgroundColor("white");
      formTree.setWidth("100%");
      formTree.setHeight("1*");                 
      formTree.setEnabled(false);
      //toolArea.add(formTree);
      toolArea.add(formTree);
      
      this.setFormTree(formTree);




	  var toolBarComponents = new qx.ui.toolbar.ToolBar();
      toolBarComponents.setHeight("auto");
	  toolBarComponents.setWidth("100%");
	  toolBarComponents.setBorder("outset");
	  toolBarComponents.setBorder("outset-thin");
	  toolBarComponents.setBackgroundImage("guiBuilder/image/toolbarbg.png");
	  toolBarComponents.setShow("icon");
      toolArea.add(toolBarComponents);

      var labelTitle = new qx.ui.basic.Label("Widgetlibrary");
      labelTitle.setHeight(22);
      labelTitle.setWidth("100%");
      labelTitle.setPadding(4);
      labelTitle._keepOnDelete = true;
      toolBarComponents.add(labelTitle); 
      
      componentTree = new qx.ui.tree.Tree("Components");   
      componentTree.setOverflow("scrollY");
      componentTree.setBorder("inset");
      componentTree.setBackgroundColor("white");
      componentTree.setWidth("100%");
      componentTree.setHeight("1*");                 
      toolArea.add(componentTree);
      this.setComponentTree(componentTree);
      
                  

      
      formTree.getManager().addEventListener("changeSelection", this.formTreeElementSelected, this);
      formTree.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"]);
      formTree.supportsDrop = this.supportDropFormTree;
      formTree.addEventListener("dragdrop", this.formTreeItemDrop, this);
      
      appArea._treeItem = formTree;
      appArea._appParent = this;
      formTree._component = appArea;
      
      pGrid = new guiBuilder.propertyeditor.Grid();
      pGrid.setHeight("100%");
      pGrid.setWidth("100%");  
      pGrid.setAppArea(appArea);
      leftVSplitPane.addBottom(pGrid);                  
      this.setPropertyGrid(pGrid);
      
      
      this.fillComponentTree();
      
      o = this;
      this._onTimerForAddEvent = function() { o.onTimerForAddEvent(); }            
      
      // LAST BUT NOT LEAST; CREATE THE DEFAULT APP SPACE!
      appArea.setPropertyGrid(pGrid);
      appArea.setFormTree(formTree);      
      appArea.addStartpage();
      //appArea.addAppSpace();                     
    },
    
       
    
    fillComponentTree : function() 
    {
      var url = '../config/components/basic.xml';      
      var req = new qx.io.remote.Request(url, "GET", qx.util.Mime.XML); 

      req.addEventListener("completed", this.onCompletefillComponentTree, this); 

      req.send();    
    },
    
    onCompletefillComponentTree : function(e)
    {       
      var nodesAll = e.getData().getContent();        
      nodes = nodesAll.childNodes[0]; // skip entry item
            
      this._parsedComponentXML = new Object;
      
      var categoryList = new Object;     
      
      var componentTree = this.getComponentTree(); 
      
      var i = 0;
      for (var i=0; i<nodes.childNodes.length; i++)
      {
        var node = nodes.childNodes[i];
                
        if (node.nodeType == 1)        
        {   
          var entryProperties = new Object;
          var entryPropertiesInit = new Object;
          var entryEvents = new Object;
          
          entryProperties     = this.loadPropertiesForEntry(nodes, entryProperties, node.tagName);   
          entryPropertiesInit = this.loadPropertiesInitForEntry(nodes, entryPropertiesInit, node.tagName);   
          entryEvents         = this.loadEventsForEntry(nodes, entryEvents, node.tagName);             
                    
          // this.debug('--');          
          //this.debug(entryProperties);
          //this.debug('##############################');          
          //this.debug(entryPropertiesInit);

          entryName = node.attributes['class'].value;
          var componentInfo = new Object;
          componentInfo['properties']     = entryProperties;
          componentInfo['propertiesInit'] = entryPropertiesInit;          
          componentInfo['events']         = entryEvents;
          componentInfo['node']           = node;                              
          this._parsedComponentXML[entryName] = componentInfo;

          
          if (node.attributes['showEntry'].value != 'false')
          {
            categoryName = node.attributes['category'].value;
            if (!categoryList[categoryName])
            {
              categoryList[categoryName] = new qx.ui.tree.TreeFolder(categoryName);
              componentTree.add(categoryList[categoryName]);              
              categoryList[categoryName].open();
            }
            
            var iconTree = null;
            if (node.attributes['iconTree'])
              iconTree = node.attributes['iconTree'].value;
            
            var newEntry = new qx.ui.tree.TreeFile(node.attributes['shortName'].value, iconTree);
            newEntry._properties     = entryProperties;
            newEntry._propertiesInit = entryPropertiesInit;            
            newEntry._events         = entryEvents;            
            newEntry._className  = node.attributes['class'].value;
            newEntry._shortName  = node.attributes['shortName'].value;

            if (node.attributes['icon'])
              newEntry._icon       = node.attributes['icon'].value;
            if (node.attributes['iconTree'])
              newEntry._iconTree   = node.attributes['iconTree'].value;

            if (node.attributes['allowedParent'])
              newEntry._allowedParent  = node.attributes['allowedParent'].value;                  
            if (node.attributes['allowedChild'])                        
              newEntry._allowedChild  = node.attributes['allowedChild'].value;                              

            if (node.attributes['handler'])
              newEntry._handler  = node.attributes['handler'].value;

            if (node.attributes['loadHandler'])
              newEntry._loadHandler  = node.attributes['loadHandler'].value;
            if (node.attributes['saveHandler'])
              newEntry._saveHandler  = node.attributes['saveHandler'].value;
            
            if (node.attributes['nonvisual'])
              newEntry._nonvisual  = true;            

            newEntry._parent     = false;
            if (node.attributes['parent'])
              newEntry._parent = true;
            
            newEntry.addEventListener("dragstart", this.treeDragStart, this);            
            categoryList[categoryName].add(newEntry);
          }
          
        }
        
      }           

      this.getAppArea()._parsedComponentXML = this._parsedComponentXML;      
    },
    
    
    
    

    loadPropertiesForEntry : function(sourceXML, targetObject, className)    
    {
      var xmlDataFound = false;
            
      var i = 0;
      for (var i=0; i<sourceXML.childNodes.length; i++)
      {
        var node = sourceXML.childNodes[i];
                
        if (node.nodeType == 1)        
        {             
          if (className == node.tagName)
          {  
            xmlDataFound = node;
          }  
        }
        
      }
            
      if (xmlDataFound == false)
        return targetObject;
               
                 
      if (xmlDataFound.attributes['extend'])
      {
        extendClassName = xmlDataFound.attributes['extend'].value;
        newExtendClassName = '';
        for (var i=0; i<extendClassName.length; i++) 
        {
          if (extendClassName[i] == '.')
          {
            newExtendClassName = newExtendClassName+'_';
          } else {
            newExtendClassName = newExtendClassName+extendClassName[i];
          } 
        }    
        
        //this.debug(' ######## extend: '+xmlDataFound.attributes['extend'].value+'('+newExtendClassName+')');        
        
        targetObject = this.loadPropertiesForEntry(sourceXML, targetObject, newExtendClassName); 
      }

      if (!xmlDataFound.childNodes)
        return targetObject;

      var propertiesXML = false;
      
      var i = 0;
      for (var i=0; i<xmlDataFound.childNodes.length; i++)
      { 
        node = xmlDataFound.childNodes[i];
        if (node.nodeType == 1) 
        {
          if (node.tagName == 'properties')
          {
            propertiesXML = node;
          }
        }
      }            
      
      if (propertiesXML == false)
        return targetObject;
        
      if (!propertiesXML.childNodes)
        return targetObject;        
        
      var i = 0;
      for (var i=0; i<propertiesXML.childNodes.length; i++)
      { 
        node = propertiesXML.childNodes[i];      

        if (node.nodeType == 1) 
        {
          //this.debug(className+' - '+node.attributes['name'].value);
          propName = node.attributes['name'].value;
          targetObject[propName] = node;
        }
      }        
      
      return targetObject;
    },
    
    
    
        
        
        
    
    loadPropertiesInitForEntry : function(sourceXML, targetInitObject, className)    
    {
      var xmlDataFound = false;
            
      var i = 0;
      for (var i=0; i<sourceXML.childNodes.length; i++)
      {
        var node = sourceXML.childNodes[i];
                
        if (node.nodeType == 1)        
        {             
          if (className == node.tagName)
          {  
            xmlDataFound = node;
          }  
        }
        
      }
            
      if (xmlDataFound == false)
        return targetInitObject;
               
                 
      if (xmlDataFound.attributes['extend'])
      {
        extendClassName = xmlDataFound.attributes['extend'].value;
        newExtendClassName = '';
        for (var i=0; i<extendClassName.length; i++) 
        {
          if (extendClassName[i] == '.')
          {
            newExtendClassName = newExtendClassName+'_';
          } else {
            newExtendClassName = newExtendClassName+extendClassName[i];
          } 
        }    
        
        //this.debug(' ######## extend: '+xmlDataFound.attributes['extend'].value+'('+newExtendClassName+')');        
        
        targetInitObject = this.loadPropertiesInitForEntry(sourceXML, targetInitObject, newExtendClassName); 
      }

      if (!xmlDataFound.childNodes)
        return targetInitObject;

      var propertiesXML = false;
      
      var i = 0;
      for (var i=0; i<xmlDataFound.childNodes.length; i++)
      { 
        node = xmlDataFound.childNodes[i];
        if (node.nodeType == 1) 
        {
          if (node.tagName == 'properties_init')
          {
            propertiesXML = node;
          }
        }
      }            
      
      if (propertiesXML == false)
        return targetInitObject;
        
      if (!propertiesXML.childNodes)
        return targetInitObject;        
        
         //this.debug(targetInitObject);
        
      var i = 0;
      for (var i=0; i<propertiesXML.childNodes.length; i++)
      { 
        node = propertiesXML.childNodes[i];      

        if (node.nodeType == 1) 
        {
          propName = node.attributes['name'].value;          
          targetInitObject[propName] = node;
        }
      }        

      
      
      return targetInitObject;
    },
    







    loadEventsForEntry : function(sourceXML, targetObject, className)    
    {
      var xmlDataFound = false;
            
      var i = 0;
      for (var i=0; i<sourceXML.childNodes.length; i++)
      {
        var node = sourceXML.childNodes[i];
                
        if (node.nodeType == 1)        
        {             
          if (className == node.tagName)
          {  
            xmlDataFound = node;
          }  
        }
        
      }
            
      if (xmlDataFound == false)
        return targetObject;
               
                 
      if (xmlDataFound.attributes['extend'])
      {
        extendClassName = xmlDataFound.attributes['extend'].value;
        newExtendClassName = '';
        for (var i=0; i<extendClassName.length; i++) 
        {
          if (extendClassName[i] == '.')
          {
            newExtendClassName = newExtendClassName+'_';
          } else {
            newExtendClassName = newExtendClassName+extendClassName[i];
          } 
        }    
        
        //this.debug(' ######## extend: '+xmlDataFound.attributes['extend'].value+'('+newExtendClassName+')');        
        
        targetObject = this.loadEventsForEntry(sourceXML, targetObject, newExtendClassName); 
      }

      if (!xmlDataFound.childNodes)
        return targetObject;

      var eventsXML = false;
      
      var i = 0;
      for (var i=0; i<xmlDataFound.childNodes.length; i++)
      { 
        node = xmlDataFound.childNodes[i];
        if (node.nodeType == 1) 
        {
          if (node.tagName == 'events')
          {
            eventsXML = node;
          }
        }
      }            
      
      if (eventsXML == false)
        return targetObject;
        
      if (!eventsXML.childNodes)
        return targetObject;        
        
      var i = 0;
      for (var i=0; i<eventsXML.childNodes.length; i++)
      { 
        node = eventsXML.childNodes[i];      

        if (node.nodeType == 1) 
        {
          //this.debug(className+' - '+node.attributes['name'].value);
          eventName = node.textContent;
          targetObject[eventName] = eventName;
        }
      }        
      
      return targetObject;
    },
    




    
    
    onTimerForAddEvent : function() 
    {
    },
    
    
    testCreateForm : function(e)
    {

      var nodesAll = e.getData().getContent();        

      appArea = this.getAppArea().getCurrentAppSpace();

      var builder = new guiBuilder.content.load.XML();
      builder._parsedComponentXML = this._parsedComponentXML;

      appArea.removeAll();      
      builder.load(nodesAll, appArea);      

      this.getAppArea().rebuildFormTree(appArea);    
      
    },
    
    clickedFormTreeToolbarCopy : function(e)
    {
      this.handleCopyCut('COPY');
    },

    clickedFormTreeToolbarCut : function(e)
    { 
      if (this.handleCopyCut('CUT'))
      {
        var element = this.getFormTree().getManager().getSelectedItem();
        var component = element._component;
        
        component.setParent(null);
        component.dispose();
        
        var appArea = this.getAppArea().getCurrentAppSpace();
        this.getAppArea().rebuildFormTree(appArea);  
        appArea.dispatchComponentChange(); 
      }            
      
    },    
    
    handleCopyCut : function(mode)
    {
      var element = this.getFormTree().getManager().getSelectedItem();
      
      if (!element._component || !element._component._name)
      {
        alert("Could not copy widget!");        
        return false;      
      }      
      
      this._modeCopyCut = mode;

      var component = element._component;
 
      var appArea = this.getAppArea();
      var appSpace = appArea.getCurrentAppSpace()
      var saveScreen = new guiBuilder.content.save.XML();
      saveScreen._parsedComponentXML = this._parsedComponentXML;
      var result = saveScreen.generateSingle(component, appSpace);      
      saveScreen.dispose();
      
      this._formTreeToolbarPaste.setEnabled(true);      
      
      this._pasteComponentXML = result;
            
      return true;
    },
    
    clickedFormTreeToolbarPaste : function(e)
    {
      var element = this.getFormTree().getManager().getSelectedItem();

      if (!element._component)
      {
        alert("Could not copy widget!");        
        return false;      
      }      

      var component = element._component;

      if (!component._parent && !component._isAppSpace)
      {
        alert("Can not place the content here");        
        return false;      
      }      
      
      this.handlePaste(component);
    },

    clickedFormTreeToolbarClone : function(e)
    {
      var element = this.getFormTree().getManager().getSelectedItem();

      if (!element._component)
      {
        alert("Could not copy widget!");        
        return false;      
      }      

      var component = element._component;      
      if (!component._name)
      {
        alert("Could not copy widget (seems not to be allowed)!");        
        return false;      
      }      
      
      
      var parent = component.getParent();      
      if (!parent._parent && !parent._isAppSpace)
      {
        alert("The parent widget allows no cloning");        
        return false;      
      }      
            
      this.handleCopyCut('COPY');      
      this.handlePaste(parent);
      
      this.getAppArea().dispatchComponentChange(); 
      
      this._pasteComponentXML = false;
      this._formTreeToolbarPaste.setEnabled(false);
    },
    
    handlePaste : function(parent)
    {   
      if (!this._pasteComponentXML)
        return false;      
      var componentXML = this._pasteComponentXML;

      var doc = qx.xml.Document.fromString(componentXML);
      
      appArea = this.getAppArea().getCurrentAppSpace();

      var builder = new guiBuilder.content.load.XML();
      builder._parsedComponentXML = this._parsedComponentXML;
      builder.loadSingle(doc, parent, appArea);      

      this.getAppArea().rebuildFormTree(appArea);    
      this.getAppArea().dispatchComponentChange(); 
      
      if (this._modeCopyCut == 'CUT')
        this._formTreeToolbarPaste.setEnabled(false);
    },    
    
    clickedFormTreeToolbarDelete : function(e) 
    {              
    
      element = this.getFormTree().getManager().getSelectedItem();
      
      if (!element._component  || element._component._doNotDelete)
      {
        alert("Could not delete element!");
        
        return false;
      }
      
      element.destroy();
      
      var component = element._component;
      
      if (component.removeAll)
      {
        component.removeAll();
      }            
      
      if (component.getParent)
      {
        parent = component.getParent();
        if (parent.remove)
        {
          parent.remove(component);
        }
      }
      
      component.dispose();
      component = null;      

      this.getAppArea().dispatchComponentChange(); 
      
      this.getPropertyGrid().removeData();     
    },
    
   
    
    formTreeItemDrop : function(e) {
      var vType = e.getDropDataTypes()[0];
      var vSource = e.getData(vType);
      var vTarget = e.getCurrentTarget();

      if(e._ignore)
        return false;            
      e._ignore = true;
      
      var vName = vSource._labelObject.getText();
            
      if (!vSource._component)
      {
        return false;
      }
      if (!vTarget._component)
      {
        return false;
      }         
      vSource._component.setParent(vTarget._component);
      vTarget.add(vSource);
      vTarget.open();
    },
        
    appAreaOver : function(e) {
    },

    treeDragStart: function(e) {
      e.addData("qx.ui.tree.AbstractTreeElement", e.getCurrentTarget());
      e.addAction("move");
      e._from = 'ComponentTree';
      e.startDrag();    
    },    
    
    formTreeDragStart : function(e) {
      e.addData("qx.ui.tree.AbstractTreeElement", e.getCurrentTarget());
      e.addAction("move");
      e._from = 'FormTree';
      e.startDrag();    
    },
    

    
    supportDropFormTree : function(vDragCache)
    {
      return true;
    },
    
    formTreeElementSelected : function(e) {
      selected = e.getData()[0];
      
      if (!selected)
      {
        return false
      }
      
      if (!selected._component)
      {
        this.getPropertyGrid().removeData();
        return false;
      }
      
      this.getPropertyGrid().setDataByObject(selected._component);
      
    },
    
    
    newProject : function(projectName)
    {       

      var projectRPC = guiBuilder.files.rpc.Project.getInstance();
      projectRPC.newProject(projectName, function(e)      
        {
          var data = e.getData();
          var result = data['result'];        
          
          this.loadProject(result['projectName']);
        }, this);
      
    },        
    
    loadProject : function(projectName)
    {
      var projectRPC = guiBuilder.files.rpc.Project.getInstance();
      projectRPC.getFilesOfProject(projectName, this._loadProjectResultFiles, this);
      this._currentProject = projectName;
    },
    
    _loadProjectResultFiles : function(e)
    {
      var data = e.getData();
      var result = data['result']['content'];

      var projectTree = this.getProjectTree();      
      projectTree.removeAll();
      projectTree.setEnabled(true);
      projectTree.setLabel(this._currentProject); 
       
      this._addDirToProjectTree(result, '', projectTree);
      
      this._mainToolBarClose.setEnabled(true);
      this._toolBarProjectRefresh.setEnabled(true);
      this._toolBarProjectNewFolder.setEnabled(true);
      this._toolBarProjectDelete.setEnabled(true);
      
      this._mainToolBarRun.setEnabled(true);
      this._mainToolBarMSource.setEnabled(true);
      this._mainToolBarMBuild.setEnabled(true);
    },
    
    _addDirToProjectTree : function(dirArray, baseDir, treeItem)
    { 
      var children = dirArray['c'];
      
      var i = 0;
      for (i in children)
      {
        var child = children[i];
        
        if (child['c'])
        {
          var newTreeItem = new qx.ui.tree.TreeFolder(i);
          newTreeItem._baseDir = baseDir;
          newTreeItem._fullDir = baseDir+i+'/';
          newTreeItem._load    = true;
          
          newTreeItem.addEventListener("changeOpen", function(e)
            {
              var sender = e.getCurrentTarget();
              if (sender._load === true)
                return;
                                                     
              var pathToLoad  = this._currentProject+'/'+sender._fullDir;
              
              if (!this._pathToLoadHistory)              
              {
                this._pathToLoadHistory = new Object();
              }
              
              this._pathToLoadHistory[pathToLoad] = sender;
                            
              var projectRPC = guiBuilder.files.rpc.Project.getInstance();
              projectRPC.getFilesOfProject(pathToLoad, function(e)
                {
                  var data = e.getData();
                  var result = data['result']['content'];
                  var pathToLoadInside = data['result']['path'];
                   
                  var treeItemInside = this._pathToLoadHistory[pathToLoadInside] 

                  treeItemInside._loadingChild.setDisplay(false);                                               
                  
                  this._addDirToProjectTree(result, treeItemInside._fullDir, treeItemInside); 
                  
                  
                }, this);
              
            }, this);
          
          treeItem.add(newTreeItem);

          if (child['l'] == 0)
          {
            newTreeItem._load = false;
            var loadItem = new qx.ui.tree.TreeFile('loading...'+i);            
            newTreeItem.add(loadItem);

            newTreeItem._loadingChild = loadItem;
          }
        }       
        
        this._addDirToProjectTree(child, baseDir+i+'/', newTreeItem);
      }
      
      var i = 0;
      for (i in children)
      {
        var child = children[i];
        
        if (!child['c'])
        {
          var newTreeItem = new qx.ui.tree.TreeFile(i);
          newTreeItem._baseDir = baseDir;
          newTreeItem.addEventListener("dblclick", function(e)
            {
              var target = e.getTarget();

              var fileName    = target._baseDir+target.getLabel();
              var projectName = this._currentProject;
              
              if (this.getAppArea().isFileAllreadyOpen(projectName, fileName) === true)
                return false;
              
              var projectRPC = guiBuilder.files.rpc.Project.getInstance();
              projectRPC.getFileContent(projectName, fileName, this._onGetFileContent, this);
                    
              e.stopPropagation();
            }, this)          
          treeItem.add(newTreeItem);
        }  
      }  
    },
    
    _onGetFileContent : function(e)
    {
      var data = e.getData();
      var result = data['result'];
      
      var fileType = 'text';
      
      if (result['fileType'] == '.qdo')
        var fileType = 'xmlform';

      var openFile = new guiBuilder.content.openFile();
      openFile.setProjectName(result['projectName']);
      openFile.setFileName(result['fileName']);
      openFile.setFullFileName(result['fullFileName']);
      openFile.setModified(false);

      if (fileType == 'xmlform')
      {        
// too slow :/      
//        this._toolArea.setDisplay(true);          



        var appSpace = this.getAppArea().addAppSpace(openFile);

        var content = qx.xml.Document.fromString(result['content']);
        
        var xmlHandler = new guiBuilder.content.load.XML();
        xmlHandler._parsedComponentXML = this._parsedComponentXML;
        xmlHandler.load(content, appSpace);

        this.getAppArea().switchTabByButton(appSpace._button);        

      }
      
      if (fileType == 'text')
      {              
// too slow :/      
//        this._toolArea.setDisplay(false);              

        this.getAppArea().addEditor(result['content'], openFile);
      }  

    },
    
    newDocument : function(docType)
    {

      if (docType == 'CANVAS')
      {
        var openFile = new guiBuilder.content.openFile();
        openFile.setProjectName(this._currentProject);
        openFile.setFileName('');
        openFile.setFullFileName('');
        openFile.setModified(true);
  
        if (this._currentProject != '')
          this._mainToolBarSave.setEnabled(true);
  
        this.getAppArea().addAppSpace(openFile);  
      }

      if (docType == 'WINDOW')
      {
        var openFile = new guiBuilder.content.openFile();
        openFile.setProjectName(this._currentProject);
        openFile.setFileName('');
        openFile.setFullFileName('');        
        openFile.setModified(true);

        if (this._currentProject != '')        
          this._mainToolBarSave.setEnabled(true);
          
        this.getAppArea().addAppSpace(openFile);  
      }

      if (docType == 'TEXT')
      {
        var openFile = new guiBuilder.content.openFile();
        openFile.setProjectName(this._currentProject);
        openFile.setFileName('');
        openFile.setFullFileName('');        
        openFile.setModified(true);
  
        if (this._currentProject != '')        
          this._mainToolBarSave.setEnabled(true);
  
        this.getAppArea().addEditor(null, openFile);  
      }
      
    },
    
    saveCurrentDocument : function()
    {
      if (this._currentProject == '')
      {
        alert("No project open");
        return;
      }
    
      var appArea = this.getAppArea();
      
      var children = appArea.getBar().getChildren();
      var childCount = appArea.getBar().getChildrenLength();    
   
      var activeTab = null;

      var i = 0;
      for (i = 0; i < childCount; i++)      
      {
        var child = children[i];
        
        if (child.getChecked())
          activeTab = child;
      }        
      
      if (activeTab === false)
      {
        alert("Could not find active document");
        return;
      }
      
      if (!activeTab._openFile)
      {
        alert("Can not save this");
        return;
      }

      var defaultFileName = 'unknown.qdo';
      if (activeTab._tabType == 'EDITOR')
        defaultFileName = 'unknown.js';

      var fileName = activeTab._openFile.getFileName();
      if (fileName == '')
      {
        this._saveDialog._activeTab = activeTab;
        this._saveDialog.setProjectName(this._currentProject);
        this._saveDialog.setDefaultFileName(defaultFileName);
        this._saveDialog.open();
        return;        
      }                  
      
      if (!activeTab._tabType)
      {
        alert("Unknown document type");
        return;       
      }

      var fullFileName = activeTab._openFile.getFullFileName();
      var project = guiBuilder.files.rpc.Project.getInstance();
      
      if (activeTab._tabType == 'EDITOR')
      {
        var value = activeTab._editor.getValue();
        activeTab._editor._tempValue = value;                
      }

      if (activeTab._tabType == 'FORM')
      {      
        appSpace = this.getAppArea().getCurrentAppSpace()
        var saveScreen = new guiBuilder.content.save.XML();
        saveScreen._parsedComponentXML = this._parsedComponentXML;
        var value = saveScreen.generate(appSpace);
        saveScreen.dispose();      
        
        appSpace = this.getAppArea().getCurrentAppSpace()
        saveScreen = new guiBuilder.content.save.JavaScriptClass();
        saveScreen._parsedComponentXML = this._parsedComponentXML;
        var valueJs = saveScreen.generate(appSpace);     
        saveScreen.dispose();        

        /* Save the javascript file*/
        var fullFileNameJS = fullFileName.replace(".qdo", ".js");  
        var className = this.getClassNameByFileName(fullFileNameJS);

        valueJs = valueJs.replace('#CLASSNAME#', className);
        valueJs = '/** '+"\n"+
                  ' * PLEASE DO NOT EDIT THIS FILE!'+"\n"+
                  ' * IT IS AUTOGENERATED FROM THE QDO FILE '+"\n"+
                  ' */'+"\n"+
                  valueJs;
        
        project.saveFileContent(this._currentProject, fullFileNameJS, valueJs, function(e){}, this);              
      }

      /* Save the form xml file*/      
      project.saveFileContent(this._currentProject, fullFileName, value, function(e)
        {
          this._mainToolBarSave.setEnabled(false);
        }, this);
      
      activeTab._openFile.setModified(false);            
      activeTab.setLabel(activeTab._openFile.getFileName());
    },
    
    getClassNameByFileName : function(fileName)
    {
      var nameParts = fileName.split("/");
      
      var partCount = nameParts.length-1;
      
      var className = '';
      for (var i = 3; i <= partCount; i++)
      {
        var part = nameParts[i];
        
        if (i < partCount)
        {
          className += part+'.';
        } else {
          className += part.replace('.js', '');        
        }        
      }
      
      return className;
    },
    
    onChoosenSaveDialog : function(fileName)
    {
      var activeTab = this._saveDialog._activeTab;
     
      var baseName = fileName.substring(fileName.lastIndexOf("/")+1);
      
      activeTab._openFile.setFileName(baseName);
      activeTab._openFile.setFullFileName(fileName); 
      
      this.addFileToProjectFileTree(fileName);
      
      this.saveCurrentDocument();
    },
    
    addFileToProjectFileTree: function(fileName)
    {
      var fileNameP = fileName;
      var fileNameArray = fileName.split("/");
      
      var treeFolder = false;
      var parentFolder = this.getProjectTree();
      var i = 0;
      var baseDir = '';
      for (i in fileNameArray)
      {
        if (i == 0)
          continue;
        
        if (i == fileNameArray.length-1)
          continue;
        
        fileName = fileNameArray[i];

        baseDir += fileName+'/';       
        
        parentFolder = this._getTreeFolderByName(parentFolder, fileName);
        if (parentFolder === false)
        {
          alert("NOOOO "+fileName+' - '+i);
          return false;
        } 
        treeFolder = parentFolder;
      }
            
      if (treeFolder === false)
        return false;
        
      var shortFileName = fileNameArray[fileNameArray.length-1];  
      var newTreeItem = new qx.ui.tree.TreeFile(shortFileName);
      newTreeItem._baseDir = baseDir;
      newTreeItem._fullDir = baseDir+shortFileName+'/';      
      newTreeItem.addEventListener("dblclick", function(e)
        {
          var target = e.getTarget();

          var fileName    = target._baseDir+target.getLabel();
          var projectName = this._currentProject;
              
          if (this.getAppArea().isFileAllreadyOpen(projectName, fileName) === true)
            return false;
              
          var projectRPC = guiBuilder.files.rpc.Project.getInstance();
          projectRPC.getFileContent(projectName, fileName, this._onGetFileContent, this);
                    
          e.stopPropagation();
        }, this);
      treeFolder.add(newTreeItem);                  
    },
    
    _getTreeFolderByName : function(parent, name)
    {
      var children = parent.getItems(false, true);
            
      var treeFolder = false;
      for (i in children)
      {
        if (i == 0)
          continue;
      
        if (children[i].getLabel() == name)
          return children[i];            
      }
      
      return false;
    }
        
  }
  
});
