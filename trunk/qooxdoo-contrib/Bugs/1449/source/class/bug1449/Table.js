qx.Class.define("bug1449.Table",
{
  extend : qx.ui.table.Table,
  
  properties :
  {
    statusBarVisible :
    {
      refine : true,
      init : false
    },
    
    columnVisibilityButtonVisible :
    {
      refine : true,
      init : false
    }      
  }
});