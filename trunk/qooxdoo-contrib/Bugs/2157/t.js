var test = function () {
  this.__containerElement.setStyle("foo", "bar");
  this.__containerElement.style.foo = "bar";
  this.__containerElement = "bar";
}

test();


qx.Class.define("t", 
{
  extend : qx.core.Object,
  
  members :
  {
    foo : function()
    {
      this.__containerElement.setStyle("foo", "bar");
      this.__containerElement.style.foo = "bar";
      this.__containerElement = "bar";
    }
  }
});