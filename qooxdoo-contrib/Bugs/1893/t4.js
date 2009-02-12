(function()
{
  var x = "hello";

  function a()
  {
    var x = "foo";
  }

  function b()
  {
    var x = "bar";
  }
})();

/* wrong:
(function(){var c="hello";
function c(){var e="foo";    // variable capture "c" of function and var
}function e(){var c="bar";
}})();
*/
