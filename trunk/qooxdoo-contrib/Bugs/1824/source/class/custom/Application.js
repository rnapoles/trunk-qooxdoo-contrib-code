///dsdsfdd


/**
 * comment before class
 */
qx.Class.define("custom.Application",
{
  extend : qx.application.Standalone,


  members :
  {
    _foo : 12,
  
    /**
     * @param foo {Int} juhu
     * @lint ignoreUnused(x, y)
     * @lint ignoreDeprecated(alert)
     * @lint ignoreUndefined(button1, foo)
     */
    main : function()
    {
      /** comment after main */
      // Call super class
      this.base(arguments);
      alert("Hello World!");

      var x = 12, y=12;
      
      button1.addListener("execute", 
        function(e) {
          alert("Hello World!");
        }
      );
    }
  }
});
