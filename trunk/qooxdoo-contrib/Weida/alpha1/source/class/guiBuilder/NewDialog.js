qx.Class.define("guiBuilder.NewDialog",
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
       
    mainList = new qx.ui.layout.FlowLayout();
    mainList.setHeight("1*");
    mainList.setWidth("100%");
    mainList.setBorder("inset");
    mainList.setBackgroundColor("#FFF");
    mainList.setVerticalSpacing(8);
    mainList.setZIndex(0);
    mainList.setPaddingBottom(8);
    mainList.setPaddingLeft(8);
    mainList.setPaddingRight(8);
    mainList.setPaddingTop(8);
    mainList.setOpacity(100);
    mainList.setTextColor("text");
    mainList.setTabIndex(0);
    mainList.setHorizontalSpacing(4);
    verticalBoxLayout1.add(mainList);
    this.setMainList(mainList);
    
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
    
    buttonCreate = new qx.ui.form.Button();
    buttonCreate.setHeight("auto");
    buttonCreate.setWidth("auto");
    buttonCreate.setLabel("Create");
    buttonCreate.setIconWidth(0);
    buttonCreate.setEnabled(false);
    hBoxBottom.add(buttonCreate);
    buttonCreate.addEventListener("execute", function(e)
      {        
        this.close();
        this.createDispatchDataEvent("choosen", this.getSelectedItem()._key);
      }, this);
    this.setButtonCreate(buttonCreate);    
    
    this.addItem("CANVAS", 'Canvas Form', 'icon/32/actions/edit.png');
    this.addItem("WINDOW", 'Window', 'icon/32/actions/view-pane-remove.png');
    this.addItem("TEXT", 'Textfile', 'icon/32/places/user-desktop.png');    
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
      instance  : "qx.ui.layout.FlowLayout"
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
      
      this.getButtonCreate().setEnabled(false);
      
      this.base(arguments);      
    },
  
    addItem : function(key, text, icon)
    {
      var item = new qx.ui.basic.Atom(text, icon);
      item.setHeight("auto");
      item.setWidth(82);
      item.setPadding(6);
      item.setIconPosition('top');
      item._key = key;
      item.addEventListener("mouseup", function(e)
        {
          var prevSelected = this.getSelectedItem();
          if (prevSelected != null)
          {
            prevSelected.setBackgroundColor("white");
            prevSelected.setBorder(null);          
          }
          
          var thisItem = e.getTarget();
          thisItem.setBackgroundColor("#DFEBFF");

          //thisItem.setBorder("black");
          thisItem.setBorder(qx.ui.core.Border.fromString('1px dotted black'));
          
          this.setSelectedItem(thisItem);
          
          this.getButtonCreate().setEnabled(true);
        }, this);
      this.getMainList().add(item);
    }
  }
});