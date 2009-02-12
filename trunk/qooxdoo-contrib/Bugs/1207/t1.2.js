(function() {
    var ella = 123;

    function foo()
    {
        try {
            var x = 1+2;
        } catch(ella) {
          
          ella += 1;

        }

        alert(ella); // alerts "undefined" in IE and "123" in other browsers
    }

    foo();

})()

