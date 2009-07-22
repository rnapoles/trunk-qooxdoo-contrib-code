qx.Class.define("testmem.test.Display3600",
{
  extend : testmem.test.AbstractDisplay,

  construct : function()
  {
    this.base(arguments);
    this._count = 60;    
    this._size = 5;
  }  
});
