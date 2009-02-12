function()
{
  qx.Class.define("qx.core.BaseArray",
  {
    extend : Array
  });

  function foo()
  {
    var Array = function() {};
  };
}

/* falsch:
function(){qx.Class.define("qx.core.BaseArray",
{extend:b});
function a(){var b=function(){};
}}
*/
