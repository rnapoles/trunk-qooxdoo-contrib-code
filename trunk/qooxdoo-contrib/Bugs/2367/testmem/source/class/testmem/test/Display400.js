qx.Class.define("testmem.test.Display400",
{
  extend : testmem.test.AbstractDisplay,

  construct : function()
  {
    this.base(arguments);
    this._count = 20;    
    this._size = 15;
  }  
});
