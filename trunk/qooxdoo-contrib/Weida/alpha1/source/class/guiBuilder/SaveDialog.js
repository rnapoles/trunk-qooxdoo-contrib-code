qx.Class.define("guiBuilder.SaveDialog",
{  
  extend : qx.ui.window.Window,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct: function(vLabel) { 
    this.base(arguments, vLabel);
    
    this.setAllowMaximize(false);
    this.setAllowMinimize(false);
    
    verticalBoxLayout1 = new qx.ui.layout.VerticalBoxLayout();
    verticalBoxLayout1.setHeight("100%");
    verticalBoxLayout1.setWidth("100%");
    verticalBoxLayout1.setBorder("outset");
    verticalBoxLayout1.setPaddingBottom(4);
    verticalBoxLayout1.setPaddingLeft(4);
    verticalBoxLayout1.setPaddingRight(4);
    verticalBoxLayout1.setPaddingTop(4);
    verticalBoxLayout1.setSpacing(4);
    verticalBoxLayout1.setTabIndex(0);
    this.add(verticalBoxLayout1);
    this.setVerticalBoxLayout1(verticalBoxLayout1);
       
    mainList = new qx.ui.tree.Tree('/');
    mainList.setHeight("1*");
    mainList.setWidth("100%");
    mainList.setBorder("inset");
    mainList.setBackgroundColor("#FFF");
    mainList.setOverflow("auto");
    mainList.addEventListener("click", function(e)
      {
        this.getPathLabel().setText('Path: /');
      }, this);    
    verticalBoxLayout1.add(mainList);
    this.setMainList(mainList);
    
    pathLabel = new qx.ui.basic.Label("Path: /");
    verticalBoxLayout1.add(pathLabel);
    this.setPathLabel(pathLabel);
    
    fileNameEdit = new qx.ui.form.TextArea();
    fileNameEdit.setWidth("100%");
    fileNameEdit.setHeight(24);
    verticalBoxLayout1.add(fileNameEdit);
    this.setFileNameEdit(fileNameEdit);

    
    
    hBoxBottom = new qx.ui.layout.HorizontalBoxLayout();
    hBoxBottom.setHeight("auto");
    hBoxBottom.setWidth("100%");
    hBoxBottom.setZIndex(0);
    hBoxBottom.setHorizontalChildrenAlign("right");
    hBoxBottom.setSpacing(8);
    hBoxBottom.setOpacity(100);
    verticalBoxLayout1.add(hBoxBottom);
    this.setHBoxBottom(hBoxBottom);
    
    buttonCancel = new qx.ui.form.Button();
    buttonCancel.setHeight("auto");
    buttonCancel.setWidth("auto");
    buttonCancel.setLabel("Cancel");
    buttonCancel.addEventListener("execute", function(e)
      {
        this.close();
      }, this);
    hBoxBottom.add(buttonCancel);
    this.setButtonCancel(buttonCancel);
    
    buttonSave = new qx.ui.form.Button();
    buttonSave.setHeight("auto");
    buttonSave.setWidth("auto");
    buttonSave.setLabel("Save");
    buttonSave.setIconWidth(0);
    hBoxBottom.add(buttonSave);
    buttonSave.addEventListener("execute", function(e)
      {        
        this.close();
        var resultDir = this.getProjectName()+this.getPathLabel().getText();
        var resultFileName = resultDir+this.getFileNameEdit().getValue();
        resultFileName = resultFileName.replace("Path: ", "");
        
        this.createDispatchDataEvent("choosen", resultFileName);
      }, this);
    this.setButtonSave(buttonSave);    
  
  },

  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events: {
    /**
     * Fired each time the value of the spinner changes.
     * The "data" property of the event is set to the new value
     * of the spinner.
     */
    "choosen" : "qx.event.type.DataEvent"
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
 
  properties : 
  { 
  
    projectName :    
    {
      check : "String"
    },
    
    defaultFileName : 
    {
      check : "String"
    },
        
    verticalBoxLayout1 : 
    { 
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.layout.VerticalBoxLayout"
    },
    labelTop : 
    { 
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.basic.Label"
    },
    mainList : 
    { 
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.tree.Tree"
    },
    pathLabel : 
    { 
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.basic.Label"
    },
    fileNameEdit : 
    { 
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.form.TextArea"
    },
    hBoxBottom : 
    { 
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.layout.HorizontalBoxLayout"
    },
    buttonCancel : 
    { 
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.form.Button"
    },
    buttonSave : 
    { 
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.form.Button"
    },

    selectedItem : 
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


  members:
  {
    open : function()
    {     
      var selected = this.getSelectedItem();
      if (selected != null)
      {
        selected.setBackgroundColor("white");
        selected.setBorder(null);
      }
      
      this.setSelectedItem(null);          

      this.getFileNameEdit().setValue(this.getDefaultFileName());
      this.loadProject(this.getProjectName());
      
      this.base(arguments);      
    },
    
    loadProject : function(projectName)
    {
      var projectRPC = guiBuilder.files.rpc.Project.getInstance();
      projectRPC.getDirsOfProject(projectName, this._loadProjectResultFiles, this);
      this._currentProject = projectName;
    },
    
    _loadProjectResultFiles : function(e)
    {
      var data = e.getData();
      var result = data['result'];

      var projectTree = this.getMainList();      
      projectTree.removeAll();
      projectTree.setEnabled(true);
       
      this._addDirToProjectTree(result, '', projectTree);
    },
    
    _addDirToProjectTree : function(dirArray, baseDir, treeItem)
    { 
      var children = dirArray['c'];
      
      var i = 0;
      for (i in children)
      {
        var child = children[i];
        
        var newTreeItem = new qx.ui.tree.TreeFolder(i);    
        newTreeItem._dir = baseDir+i+'/';                 
        newTreeItem.addEventListener("click", function(e)
          {
            this.getPathLabel().setText('Path: /'+e.getTarget()._dir);
            e.stopPropagation();
          }, this);
        treeItem.add(newTreeItem);

        this._addDirToProjectTree(child, baseDir+i+'/', newTreeItem);
      }  
    }
    

  }
});