/** 
 * PLEASE DO NOT EDIT THIS FILE!
 * IT IS AUTOGENERATED FROM THE QDO FILE 
 */
qx.Class.define("guiBuilder.InputDialog",
{  
  extend : qx.ui.window.Window,
  
  construct: function(vLabel) { 
    this.base(arguments, vLabel);
    
    this.setAllowMaximize(false);
    this.setAllowMinimize(false);
    
    var verticalBoxLayout2 = new qx.ui.layout.VerticalBoxLayout();
    verticalBoxLayout2.setHeight("100%");
    verticalBoxLayout2.setWidth("100%");
    this.add(verticalBoxLayout2);
    this.setVerticalBoxLayout2(verticalBoxLayout2);
    
    var horizontalBoxLayout1 = new qx.ui.layout.HorizontalBoxLayout();
    horizontalBoxLayout1.setHeight("auto");
    horizontalBoxLayout1.setWidth("100%");
    horizontalBoxLayout1.setPaddingBottom(5);
    horizontalBoxLayout1.setPaddingLeft(5);
    horizontalBoxLayout1.setPaddingRight(5);
    horizontalBoxLayout1.setPaddingTop(5);
    horizontalBoxLayout1.setSpacing(10);
    verticalBoxLayout2.add(horizontalBoxLayout1);
    this.setHorizontalBoxLayout1(horizontalBoxLayout1);

    var manager = new qx.ui.selection.RadioManager();
    
    var qdoContent = new qx.ui.form.RadioButton();
    qdoContent.setHeight("auto");
    qdoContent.setWidth("auto");
    qdoContent.setName("defaultname");
    qdoContent.setValue("defaultvalue");
    qdoContent.setLabel("XML Form (QDO)");
    qdoContent.setOpacity(100);
    qdoContent.setManager(manager);
    qdoContent.setChecked(true);
    horizontalBoxLayout1.add(qdoContent);
    this.setQdoContent(qdoContent);
    
    var textContent = new qx.ui.form.RadioButton();
    textContent.setHeight("auto");
    textContent.setWidth("auto");
    textContent.setName("defaultname");
    textContent.setValue("defaultvalue");
    textContent.setLabel("Text");
    textContent.setOpacity(100);
    textContent.setManager(manager);
    horizontalBoxLayout1.add(textContent);
    this.setTextContent(textContent);
    
    var content = new qx.ui.form.TextArea();
    content.setHeight("1*");
    content.setWidth("100%");
    content.setOpacity(100);
    verticalBoxLayout2.add(content);
    this.setContent(content);
    
    var horizontalBoxLayout2 = new qx.ui.layout.HorizontalBoxLayout();
    horizontalBoxLayout2.setHeight("auto");
    horizontalBoxLayout2.setWidth("100%");
    horizontalBoxLayout2.setPaddingBottom(5);
    horizontalBoxLayout2.setPaddingLeft(5);
    horizontalBoxLayout2.setPaddingRight(5);
    horizontalBoxLayout2.setPaddingTop(5);
    horizontalBoxLayout2.setHorizontalChildrenAlign("right");
    verticalBoxLayout2.add(horizontalBoxLayout2);
    this.setHorizontalBoxLayout2(horizontalBoxLayout2);
    
    var buttonAdd = new qx.ui.form.Button();
    buttonAdd.setHeight("auto");
    buttonAdd.setWidth("auto");
    buttonAdd.setLabel("Add as Tab");
    buttonAdd.addEventListener("execute", function(e)
      {
        var value = this.getContent().getValue();
        
        if (this.getTextContent().getChecked())
        {
          this.addEditor(value);
        } else {
          this.addForm(value);
        }
        
        this.close();
      }, this);
    horizontalBoxLayout2.add(buttonAdd);
    this.setButtonAdd(buttonAdd);
    


    
  }, 
 
  properties : 
  { 
 
    verticalBoxLayout2 : 
    { 
      check  : "qx.ui.layout.VerticalBoxLayout"
    },
    horizontalBoxLayout1 : 
    { 
      check  : "qx.ui.layout.HorizontalBoxLayout"
    },
    qdoContent : 
    { 
      check  : "qx.ui.form.RadioButton"
    },
    textContent : 
    { 
      check  : "qx.ui.form.RadioButton"
    },
    content : 
    { 
      check  : "qx.ui.form.TextArea"
    },
    horizontalBoxLayout2 : 
    { 
      check  : "qx.ui.layout.HorizontalBoxLayout"
    },
    buttonAdd : 
    { 
      check  : "qx.ui.form.Button"
    } 
  },
  
  members :
  {
    addEditor : function(content)   
    {
      var mainForm = guiBuilder.MainForm.getInstance();
      
      var openFile = new guiBuilder.content.openFile();
      openFile.setProjectName(mainForm._currentProject);
      openFile.setFileName('');
      openFile.setFullFileName('');
      openFile.setModified(true);
        
      if (mainForm._currentProject != '')
        mainForm._mainToolBarSave.setEnabled(true);
       
      mainForm.getAppArea().addEditor(content, openFile);           
    },
    
    addForm  : function(content)
    {
      var mainForm = guiBuilder.MainForm.getInstance();

      var openFile = new guiBuilder.content.openFile();
      openFile.setProjectName(mainForm._currentProject);
      openFile.setFileName('');
      openFile.setFullFileName('');
      openFile.setModified(true);

      var appSpace = mainForm.getAppArea().addAppSpace(openFile);

      var content = qx.xml.Document.fromString(content);        
      var xmlHandler = new guiBuilder.content.load.XML();
      xmlHandler._parsedComponentXML = mainForm._parsedComponentXML;
      xmlHandler.load(content, appSpace);

      if (mainForm._currentProject != '')
        mainForm._mainToolBarSave.setEnabled(true);

      mainForm.getAppArea().switchTabByButton(appSpace._button);         
    }
  }  

});