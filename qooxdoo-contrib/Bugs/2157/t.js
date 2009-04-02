// syntax: ecmalint.py -g qx t.js

// this one is not detected since it is outside a qx.Class.define
var test = function () {
  this.__private11("foo", "bar");           // private in a direct call
  this.__private12.setStyle("foo", "bar");  // private in a call
  this.__private13 = "bar";                 // private in a direct assignment
  this.__private14.style.foo = "bar";       // private in an assignment
}


// this is detected
qx.Class.define("t", 
{
  // construct is checked
  construct: function()
  {
    this.__private21("foo", "bar");           // private in a direct call
    this.__private22.setStyle("foo", "bar");  // private in a call
    this.__private23 = "bar";                 // private in a direct assignment
    this.__private24.style.foo = "bar";       // private in an assignment
  },

  // members are checked
  members :
  {
    foo : function()
    {
      this.__private31("foo", "bar");           // private in a direct call
      this.__private32.setStyle("foo", "bar");  // private in a call
      this.__private33 = "bar";                 // private in a direct assignment
      this.__private34.style.foo = "bar";       // private in an assignment

      a.b.__private35(1,2);
      a.b.__private36.style = "bar";
    },

    // protected's are checked
    bar : function()
    {
      this._protected11("foo", "bar");           // protected in a direct call
      this._protected12.setStyle("foo", "bar");  // protected in a call
      this._protected13 = "bar";                 // protected in a direct assignment
      this._protected14.style.foo = "bar";       // protected in an assignment

      a.b._protected15(1,2);
      a.b._protected16.style = "bar";
    },

    // check rval positions
    baz : function()
    {
      var a1 = this.a.__private41;               // private in rval position
      var a2 = this.a.__private42();             // private in rval as call
      var a3 = this.a.__private43[0];            // private in rval as accessor
      var a4 = this._protected44;                // protected in rval position
    },

    // the next one is ok and *mustn't* be warned about
    __private51 : 0,

    chip : function()
    {
      var a1 = this.__private51;
    }
  }
});
