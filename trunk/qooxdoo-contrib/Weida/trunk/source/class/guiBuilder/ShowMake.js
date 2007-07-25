qx.Class.define("guiBuilder.ShowMake",
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
       

    var iFrameMain = new qx.ui.embed.Iframe();
    iFrameMain.setHeight("1*");
    iFrameMain.setWidth("100%");
    iFrameMain.setOverflow("auto");
    iFrameMain.setBackgroundColor("white");
    verticalBoxLayout1.add(iFrameMain);
    this.setIFrame(iFrameMain);
    
    hBoxBottom = new qx.ui.layout.HorizontalBoxLayout();
    hBoxBottom.setHeight("auto");
    hBoxBottom.setWidth("100%");
    hBoxBottom.setZIndex(0);
    hBoxBottom.setHorizontalChildrenAlign("right");
    hBoxBottom.setSpacing(8);
    hBoxBottom.setOpacity(100);

    this._timer = new qx.client.Timer(1000);
    this._timer.addEventListener("interval", function(e)
     {
       var iFrame = this.getIFrame();
       if (iFrame.getDisplay() === true)
         iFrame.getContentWindow().scrollBy(0,50000);
     }, this);


    verticalBoxLayout1.add(hBoxBottom);
    this.setHBoxBottom(hBoxBottom);
    
    buttonClose = new qx.ui.form.Button();
    buttonClose.setHeight("auto");
    buttonClose.setWidth("auto");
    buttonClose.setLabel("Close");
    buttonClose.addEventListener("execute", function(e)
      {
        this.close();
      }, this);
    hBoxBottom.add(buttonClose);
    this.setButtonClose(buttonClose);    
  
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
 
  properties : 
  { 
  
    url :
    {
      check : "String"
    },
    
    verticalBoxLayout1 : 
    { 
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.layout.VerticalBoxLayout"
    },

    iFrame : 
    { 
      _legacy : true,
      type    : "object"
    },

    hBoxBottom : 
    { 
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.layout.HorizontalBoxLayout"
    },
    buttonClose : 
    { 
      _legacy : true,
      type    : "object",
      instance  : "qx.ui.form.Button"
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
      this.base(arguments);      
      this._timer.setEnabled(true);      
    },
    
    close : function()
    {        
      this.base(arguments);      
      this._timer.setEnabled(false);            
    }    
             
  }
  
});