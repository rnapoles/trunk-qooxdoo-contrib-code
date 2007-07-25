qx.Class.define("guiBuilder.ChooseProjectDialog",
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
       
    this._projectList = new qx.ui.form.List();
    this._projectList.setHeight("1*");
    this._projectList.setWidth("100%");
    this._projectList.setBorder("inset");
    this._projectList.setZIndex(0);
    this._projectList.addEventListener('dblclick', this.chooseClicked, this)
    verticalBoxLayout1.add(this._projectList);

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
    
    this._buttonChoose = new qx.ui.form.Button();
    this._buttonChoose.setHeight("auto");
    this._buttonChoose.setWidth("auto");
    this._buttonChoose.setLabel("Choose");
    this._buttonChoose.setIconWidth(0);
    this._buttonChoose.setEnabled(false);
    this._buttonChoose.addEventListener("execute", this.chooseClicked, this);
    hBoxBottom.add(this._buttonChoose);
    this.setButtonCreate(this._buttonChoose);    
            
  },
  
  members:
  {
    
    chooseClicked : function(e)
    { 
      var selected = this._projectList.getSelectedItem();
      if (selected == null)
      {
        alert("Please choose a project");
        return false;
      }
      
      guiBuilder.MainForm.getInstance().loadProject(selected.getLabel());
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
      
      this._buttonChoose.setEnabled(true);
    }
  }
  
});