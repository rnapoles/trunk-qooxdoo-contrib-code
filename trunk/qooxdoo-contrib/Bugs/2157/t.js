var test = function () {
  this.__containerElement.setStyle("foo", "bar");
  this.__containerElement.style.foo = "bar";
}

test();
