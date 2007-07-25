qx.Class.define("guiBuilder.NewProjectDialog",
{  
  extend : qx.ui.window.Window,
 
  properties : 
  { 
 
    verticalBoxLayout1 : 
    { 
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.layout.VerticalBoxLayout"
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
    buttonCreate : 
    { 
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.form.Button"
    }
     
  }, 

  construct: function() { 
    this.base(arguments);
    
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
       
    var labelExistingProject = new qx.ui.basic.Label("Existing projects: ");   
    verticalBoxLayout1.add(labelExistingProject);
       
    this._projectList = new qx.ui.form.List();
    this._projectList.setHeight("1*");
    this._projectList.setWidth("100%");
    this._projectList.setBorder("inset");
    this._projectList.setZIndex(0);
    verticalBoxLayout1.add(this._projectList);

    var labelNewProject = new qx.ui.basic.Label("Name of new project: ");   
    verticalBoxLayout1.add(labelNewProject);    
    
    this._newProjectName = new qx.ui.form.TextField();
    this._newProjectName.setWidth("100%");
    verticalBoxLayout1.add(this._newProjectName);

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
    
    this._buttonCreate = new qx.ui.form.Button();
    this._buttonCreate.setHeight("auto");
    this._buttonCreate.setWidth("auto");
    this._buttonCreate.setLabel("Create");
    this._buttonCreate.setIconWidth(0);
    this._buttonCreate.setEnabled(false);
    this._buttonCreate.addEventListener("execute", this.createClicked, this);
    hBoxBottom.add(this._buttonCreate);
    this.setButtonCreate(this._buttonCreate);    
            
  },
  
  members:
  {
    
    createClicked : function(e)
    { 
      var projectName = qx.lang.String.trim(this._newProjectName.getValue());
      
      if (projectName == '')
      {
        alert("Please choose a name for the new project");
        return false;
      }
      
        var children = this._projectList.getChildren();
        var childCount = this._projectList.getChildrenLength();
      
        var i = 0;
        for (i = 0; i < childCount; i++)
        {
          var comp = children[i];            
          
          if (comp.getLabel() == projectName)
          {
            alert("This projectname already exists");
            return false;
          }
        }
            
      
      guiBuilder.MainForm.getInstance().newProject(projectName);
            
      this.close();
    },
    
    
    loadData : function()
    {
      this._projectList.removeAll();          
      guiBuilder.files.rpc.Project.getInstance().getProjectList(this.onGetProjectList, this);
    },
  
    onGetProjectList : function(e)
    {
      var data = e.getData();
      var result = data['result'];
      
      var i = 0;
      for (i in result)
      {
        var projectName = result[i];
        var listItem1 = new qx.ui.form.ListItem();
        listItem1.setValue(0);
        listItem1.setLabel(projectName);
        listItem1.setIcon("icon/16/mimetypes/empty-x-generic.png");
        listItem1.setIconHeight(0);
        this._projectList.add(listItem1);
      }  
      
      this._buttonCreate.setEnabled(true);
    }
  }
  
});