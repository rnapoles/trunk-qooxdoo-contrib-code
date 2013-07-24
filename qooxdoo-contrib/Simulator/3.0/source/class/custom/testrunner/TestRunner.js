// This is just a test class, to play with qx.dev.unit classes 
qx.Class.define("custom.testrunner.TestRunner",
{
  extend : qx.dev.unit.TestCase,

  statics :
  {
    runAll : function(namespace)
    {
      var suite = new qx.dev.unit.TestSuite();
      suite.add(namespace);

      var result = new qx.dev.unit.TestResult();

      result.addListener("startTest", function(e)
      {
        var test = e.getData();
        console.log("Test '" + test.getFullName() + "' started.");
      });

      result.addListener("failure", function(e)
      {
        var ex = e.getData().exception;
        var test = e.getData().test;
        console.error("Test '" + test.getFullName() + "' failed: " + ex.getMessage() + " - " + ex.getComment());
        console.error("Stack trace: " + ex.getStackTrace().join("\n"));
      });

      suite.run(result);
    }
  },

  members :
  {
    testFail : function() {
      this.fail();
    },

    testPass : function() {
      this.assert(true);
    }
  }
});