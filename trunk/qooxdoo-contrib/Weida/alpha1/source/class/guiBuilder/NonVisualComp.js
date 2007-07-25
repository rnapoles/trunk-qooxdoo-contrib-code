qx.Class.define("guiBuilder.NonVisualComp",
{
  extend : qx.ui.basic.Atom,

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
    
    childComponent :
    {
      _legacy : true,
      type    : "object"
    }
    
  },      

  construct : function() {
    this.base(arguments);   

    this.setBackgroundColor("white");
    this.setBorder(null);
    this.setIconPosition("top");
    
    this.setHeight(58);
    this.setWidth("auto");    

    this._menu = new qx.ui.menu.Menu;
    this._menu.addToDocument();

    var menuDelete = new qx.ui.menu.Button("Delete");
    menuDelete.addEventListener("execute", function(e)
      {
        if (confirm("Really?"))
        {
          this.setParent(null);         
          this.dispose();
        }
      }, this);

    this._menu.add(menuDelete);
    
    this.addEventListener("mouseup", function(e)
      { 
        if (e.isRightButtonPressed())
          this.showPopup(e.getClientX(), e.getClientY());                    
      }, this);
  },
  
  members :
  {
    showPopup : function(left, top)
    {
      this.debug('XXXXX');
      var el = this.getElement();
      
      this._menu.setLeft(left); //qx.html.Location.getPageBoxLeft(el));
      this._menu.setTop(top); //qx.html.Location.getPageBoxBottom(el));
    
      this._menu.show();
    }
  }  
});