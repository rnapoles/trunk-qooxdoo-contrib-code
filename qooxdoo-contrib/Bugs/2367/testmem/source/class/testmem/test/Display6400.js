qx.Class.define("testmem.test.Display6400",
{
  extend : testmem.test.AbstractDisplay,

  construct : function()
  {
    this.base(arguments);
    this._count = 80;    
    this._size = 3;
  }  
});
