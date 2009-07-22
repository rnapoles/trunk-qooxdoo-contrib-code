qx.Class.define("testmem.test.Display1600",
{
  extend : testmem.test.AbstractDisplay,

  construct : function()
  {
    this.base(arguments);
    this._count = 40;    
    this._size = 7;
  }  
});
