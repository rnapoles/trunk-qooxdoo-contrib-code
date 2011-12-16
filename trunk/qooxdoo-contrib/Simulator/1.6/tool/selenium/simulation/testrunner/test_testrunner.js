var baseConf = {
  'debug' : true
};

var args = arguments ? arguments : "";
var simSvn = baseConf.simulatorSvn;
for (var i=0; i<args.length; i++) {
  if (args[i].indexOf('simulatorSvn') >= 0) {
    simSvn = args[i].substr(args[i].indexOf('simulatorSvn=') + 13);
  }
}

load([simSvn + "/trunk/tool/selenium/simulation/Simulation.js"]);
var mySim = new simulation.Simulation(baseConf,args);

var selWin = simulation.Simulation.SELENIUMWINDOW;
var qxAppInst = simulation.Simulation.QXAPPINSTANCE;
var suiteState = selWin + "." + qxAppInst + ".runner.getTestSuiteState()";
var testCount = selWin + "." + qxAppInst + ".runner.getTestCount()";


var locators = {
  toolbarButtonRun : "qxhv=*/[@icon=media-playback-start]",
  toolbarButtonStackTrace : "qxhv=*/[@icon=document-properties]",
  toolbarButtonReload : "qxhv=*/[@icon=view-refresh]"
};

simulation.Simulation.prototype.getSuiteState = function()
{
  return String(this.getEval(suiteState));
};

simulation.Simulation.prototype.waitForSuiteState = function(state, timeout)
{
  var timeout = timeout || 60000;
  var suiteStateCheck = suiteState + " == \"" + state + "\"";
  return this.waitForCondition(suiteStateCheck, timeout);
};

simulation.Simulation.prototype.getResultCounts = function()
{
  var failed = selWin + "." + qxAppInst + ".runner.view.getFailedTestCount()";
  var skipped = selWin + "." + qxAppInst + ".runner.view.getSkippedTestCount()";
  var successful = selWin + "." + qxAppInst + ".runner.view.getSuccessfulTestCount()";
 
  var failedCount = parseInt(String(this.getEval(failed)), 10);
  var skippedCount = parseInt(String(this.getEval(skipped)), 10);
  var successfulCount = parseInt(String(this.getEval(successful)), 10);
  
  return {
    failed : failedCount,
    skipped : skippedCount,
    successful : successfulCount
  }
};

simulation.Simulation.prototype.getTestCount = function()
{
  return parseInt(String(this.getEval(testCount)), 10);
};

simulation.Simulation.prototype.getShowStackTrace = function()
{
  var code = selWin + "." + qxAppInst + ".runner.view.getShowStackTrace()";
  var showStackTrace = String(this.getEval(code));
  return showStackTrace === "true";
};

simulation.Simulation.prototype.runTest = function()
{
  if (!this.waitForSuiteState("ready")) {
    this.testFailed = true;
    this.log("Test suite not loaded within one minute, aborting!", "error");
    return;
  }
  this.log("Suite loaded, running tests", "debug");
  
  var tests = [
    this.testRunTests,
    this.testToggleStackTrace,
    this.testReload
  ];
  
  for (var i=0, l=tests.length; i<l; i++) {
    try {
      tests[i].call(this);
    }
    catch(ex) {
      this.testFailed = true;
      this.log(ex.message, "error");
      return;
    }
  }
};


simulation.Simulation.prototype.testRunTests = function()
{
  var testCountBefore = this.getTestCount();
  if (!testCountBefore > 0) {
    throw new Error("No tests queued!");
  }
  this.qxClick(locators.toolbarButtonRun);
  if (!this.waitForSuiteState("finished")) {
    throw new Error("Test suite was not finished within one minute!");
  }
  if (!this.getTestCount() === 0) {
    throw new Error("Suite is finished but not all tests were executed!");
  }
  
  var resultCounts = this.getResultCounts();
  var totalResults = resultCounts.success + resultCounts.skipped + resultCounts.failed;
  if (!totalResults == testCountBefore) {
    throw new Error("Got " + totalResults + " results for " + testCountBefore + " tests!");
  }
  
  if (resultCounts.successful > 0 && !this.__sel.isElementPresent("css=.success")) {
    throw new Error("Got successful results but no element with class .success!");
  }
  
  if (resultCounts.skipped > 0 && !this.__sel.isElementPresent("css=.skip")) {
    throw new Error("Got skipped results but no element with class .skip!");
  }
  
  if (resultCounts.failed > 0 && !this.__sel.isElementPresent("css=.error")) {
    throw new Error("Got failed results but no element with class .error!");
  }
};

simulation.Simulation.prototype.testToggleStackTrace = function()
{
  var stackTraceActive = this.getShowStackTrace();
  if (stackTraceActive && !this.__sel.isVisible("css=.trace")) {
    throw new Error("Stack trace display is active but found no element with class .trace!");
  }
  
  if (!stackTraceActive && this.__sel.isVisible("css=.trace")) {
    throw new Error("Stack trace display is inactive but found an element with class .trace!");
  }
  
  this.qxClick(locators.toolbarButtonStackTrace);
  var stackTraceActiveAfter = this.getShowStackTrace();
  if (stackTraceActive == stackTraceActiveAfter) {
    throw new Error("Clicking the stack trace toggle did not change the property!");
  }
  
  if ((stackTraceActiveAfter && !this.__sel.isVisible("css=.trace")) ||
    (!stackTraceActiveAfter && this.__sel.isVisible("css=.trace")) )
  {
    throw new Error("Stack trace display toggle did not work!");
  }
};

simulation.Simulation.prototype.testReload = function()
{
  this.qxClick(locators.toolbarButtonReload, "", "Clicking Reload button");
  var state = this.getSuiteState();

  var loaded = this.waitForSuiteState("ready", 10000);
  if (!loaded) {
    throw new Error("Test suite did not finish reloading within 10s!");
  }

  if (this.__sel.isElementPresent("css=.success") || 
    this.__sel.isElementPresent("css=.skip") || 
    this.__sel.isElementPresent("css=.error"))
  {
    throw new Error("Results view was not cleared after reload!");
  }
};

// - Main --------------------------------------------------------------------

(function() {
  mySim.testFailed = false;

  var sessionStarted = mySim.startSession();

  if (!sessionStarted) {
    return;
  }

  var isAppReady = mySim.waitForCondition(simulation.Simulation.ISQXAPPREADY, 240000,
    "Waiting for qooxdoo application");


  if (!isAppReady) {
    mySim.testFailed = true;
    mySim.stop();
    return;
  }

  try {
    mySim.addGlobalErrorHandler();
    mySim.setupApplicationLogging();
    mySim.runTest();
  }
  catch(ex) {
    var msg = "Unexpected error while running tests: " + ex;
    if (mySim.getConfigSetting("debug")) {
      print(msg + "\n");
    }
    mySim.log(msg, "error");
  }
  mySim.logGlobalErrors();

  if (!mySim.testFailed) {
    if (mySim.getConfigSetting("debug")) {
      print("Test run finished successfully.");
    }
    
    var totalErrors = mySim.getTotalErrorsLogged() + mySim.getTotalWarningsLogged();
    mySim.log("Tests with warnings or errors: " + totalErrors, "info");
  }

  mySim.stop();
  mySim.logTestDuration();

})();
