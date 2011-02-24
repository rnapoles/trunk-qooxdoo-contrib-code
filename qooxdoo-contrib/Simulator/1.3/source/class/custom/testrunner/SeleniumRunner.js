/* This is just a template for further work:
 * - the run()/runAll() method needs to take parameter(s) to identify, which tests/testclasses to run
 * - the result object needs to collect results, rather than write out to console or other media
 * - runAll() has to pass back results, maybe as Json where:
 *   {'testName': {'pass': true, 'log': <string>, 'error': <string>}, ...}
 */
qx.Class.define("custom.testrunner.SeleniumRunner",
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
  }
});