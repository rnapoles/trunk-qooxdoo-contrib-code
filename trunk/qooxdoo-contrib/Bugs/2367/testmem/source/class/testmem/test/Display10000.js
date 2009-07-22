qx.Class.define("testmem.test.Display10000",
{
  extend : testmem.test.AbstractDisplay,

  construct : function()
  {
    this.base(arguments);
    this._count = 100;    
    this._size = 3;
  }  
});
