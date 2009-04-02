// syntax: compile.py --variant=qx.debug:off t.js
function() {
  if (true) {
  } else 
  {
    if (qx.core.Variant.isSet("qx.debug", "on")) 
    {
      var pw = 3;
    } else {}
  }
  foo();
}

/*
This is generated:
function(){if(true){}else{}var pwfoo();
}
*/

function() {
  if (true) {
  } else if (qx.core.Variant.isSet("qx.debug", "on")) 
  {
    var pw = 3;
  }
  foo();
}

function() {
  if (qx.core.Variant.isSet("qx.debug", "on")) {
    var pw = 3;
  }
  foo();
}

