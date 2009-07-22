qx.Class.define("testmem.test.Display100",
{
  extend : testmem.test.AbstractDisplay,

  construct : function()
  {
    this.base(arguments);
    this._count = 10;    
    this._size = 30;
  }  
});
