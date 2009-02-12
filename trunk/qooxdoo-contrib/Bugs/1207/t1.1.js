(function() {
  var z="hello";
  try{throw new Error}catch(a){alert(a)}
  alert(z);
})();


/* correct Code:
(function(){var b="hello";
try{throw new Error;
}catch(c){alert(c);
}alert(b);
})();
*/
