(function() {
    var e = 123;

    function foo()
    {
        try {
            var x = 1+2;
        } catch(e) {

        }

        alert(e); // alerts "undefined" in IE and "123" in other browsers
    }

    foo();

})()

