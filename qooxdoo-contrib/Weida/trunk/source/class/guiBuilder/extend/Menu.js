qx.Class.define("guiBuilder.extend.Menu",
{
  extend : qx.ui.menu.Menu,
  
  members :
  {
  
    /**
     * TODOC
     *
     * @type member
     * @return {void}
     */
    _beforeAppear : function()
    {
      // Intentionally bypass superclass and call super.super._beforeAppear
      qx.ui.layout.CanvasLayout.prototype._beforeAppear.call(this);

      // zIndex handling
      this.bringToFront();     
      
      // setup as global active widget
      this._makeActive();
      
      this.setZIndex(999999);
    },

    /**                                                                                                                                                      
     * TODOC                                                                                                                                                 
     *                                                                                                                                                       
     * @type member                                                                                                                                          
     * @param value {var} Current value                                                                                                                      
     * @param old {var} Previous value                                                                                                                       
     */                                                                                                                                                      
    _applyOpenItemOFF : function(value, old)                                                                                                                    
    {                                                                                                                                                        
      var vMakeActive = false;                                                                                                                               
                                                                                                                                                             
      if (old)                                                                                                                                               
      {                                                                                                                                                      
        var vOldSub = old.getMenu();                                                                                                                         
                                                                                                                                                             
        if (vOldSub)                                                                                                                                         
        {                                                                                                                                                    
          vOldSub.setParentMenu(null);                                                                                                                       
          vOldSub.setOpener(null);                                                                                                                           
          vOldSub.hide();                                                                                                                                    
        }                                                                                                                                                    
      }                                                                                                                                                      
                                                                                                                                                             
      if (value)                                                                                                                                             
      {                                                                                                                                                      
        var vSub = value.getMenu();                                                                                                                          
                                                                                                                                                             
        if (vSub)                                                                                                                                            
        {                                                                                                                                                    
          vSub.setOpener(value);                                                                                                                             
          vSub.setParentMenu(this);                                                                                                                          
                                                                                                                                                             
          var pl = value.getElement();                                                                                                                       
          var el = this.getElement();                                                                                                                        
                                                                                                                                                             
          var valueTop = 50+this.getSubMenuVerticalOffset();
          vSub.setTop(valueTop);                                                                 
                                                                                                                                                             
 
          var valueLeft = qx.html.Dimension.getBoxWidth(el) + this.getSubMenuHorizontalOffset();                                 
          vSub.setLeft(valueLeft);                                                                                                                               
                                                                                                                                                              
          vSub.show();                                                                                                                                       
        }                                                                                                                                                    
      }                                                                                                                                                      
    }
    
  }
});