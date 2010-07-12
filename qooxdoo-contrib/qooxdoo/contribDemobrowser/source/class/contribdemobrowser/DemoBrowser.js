/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * 
 */
qx.Class.define("contribdemobrowser.DemoBrowser",
{
  extend : demobrowser.DemoBrowser,

  construct : function()
  {
    this.base(arguments);
  },
  
  members :
  {
    /**
     * Creates the application header.
     */
    _createHeader : function()
    {
      var layout = new qx.ui.layout.HBox();
      var header = new qx.ui.container.Composite(layout);
      header.setAppearance("app-header");
    
      var title = new qx.ui.basic.Label("Contrib Demo Browser");
    
      header.add(title);    
      return header;
    }
  }
});
