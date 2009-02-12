var foo = function()
{
  var arguments = "pop,push,indexOf";

  var Foo = function() {};
  Foo.prototype.concat = function() {
    alert(arguments[0]);
  }
}

/* results into this:
var foo=function(){var a="pop,push,indexOf";
var b=function(){};
b.prototype.concat=function(){alert(a[0]);
};
};
*/
