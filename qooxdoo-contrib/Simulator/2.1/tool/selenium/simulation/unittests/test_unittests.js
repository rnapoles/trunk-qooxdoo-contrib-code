var baseConf = {
  'autName' : 'Testrunner',
  'globalTimeout' : 120000,
  'stepSpeed' : '250',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*custom /usr/lib/firefox-3.0.10/firefox -no-remote -P selenium-3',
  'autHost' : 'http://localhost',
  'autPath' : '/~dwagner/workspace/qooxdoo.trunk/framework/test/index.html',
  'simulatorSvn' : '/home/dwagner/workspace/qooxdoo.contrib/Simulator',
  'debug' : true,
  'getAutLog' : false,
  'logAutGlobalErrors' : true,
  'ignoreGlobalErrors' : [ "testErrorEvent",
                           "no load event should be fired",
                           "loading a non existing file",
                           "Expected exception",
                           "test404",
                           "testLoadError",
                           "testRequireState",
                           "call onerror on network error",
                           "call onloadend on network error",
                           "reset responseJson when reopened",
                           "myCallback is not a function",
                           "loading failed because of network error",
                           "failure when request failed",
                           "remove script from DOM when request failed"],
  'accessInterval' : 10000,
  'packageLoadTimeout' : 30000,
  'packageRunTimeout' : 1800000
};

var args = arguments ? arguments : "";
var simSvn = baseConf.simulatorSvn;
for (var i=0; i<args.length; i++) {
  if (args[i].indexOf('simulatorSvn') >= 0) {
    simSvn = args[i].substr(args[i].indexOf('simulatorSvn=') + 13);
  }
}

load([simSvn + "/trunk/tool/selenium/simulation/Simulation.js"]);
load([simSvn + "/trunk/tool/selenium/simulation/unittests/unittests.js"]);

var mySim = new simulation.Simulation(baseConf,args);

var selWin = simulation.Simulation.SELENIUMWINDOW;
var qxAppInst = simulation.Simulation.QXAPPINSTANCE;


/**
 * Periodically checks if the test suite is done. Once it is, the results are
 * logged.
 */
simulation.Simulation.prototype.runTest = function()
{
  var accessInterval = this.getConfigSetting("accessInterval");
  var lastLoadedPackage, lastRunningPackage;
  var loadCycles = 0;
  var runCycles = 0;
  
  var getSuiteState = selWin + "." + qxAppInst + ".runner.getTestSuiteState()";
  var suiteStateCheck = getSuiteState + " !== \"loading\"";
  var suiteReady = this.waitForCondition(suiteStateCheck, 120000);
  if (!suiteReady) {
    this.log("Test suite not loaded within two minutes, aborting!", "error");
  }
  var getViewStatus = selWin + "." + qxAppInst + ".runner.view.getStatus()";
  
  while (true) {
    Packages.java.lang.Thread.sleep(accessInterval);
    //Selenium doesn't like to execute the same command multiple times
    this.__sel.getSpeed();
    var suiteState = String(this.getEval(getSuiteState));
    var viewStatus = String(this.getEval(getViewStatus));
    
    print("=========================================================");
    switch (suiteState) {
      case "error":
        this.testFailed = true;
        this.log("Error loading test suite", "error");
        return;
      case "finished":
        // testSuiteState "finished" means a package is done, need to check the
        // view's status to know if the entire test suite is done
        if (viewStatus == "finished") {
          this.logResult();
          return;
        }
      case "loading":
        var match = viewStatus.match(/Loading package (.*)/i);
        if (match && match.length > 1) {
          var loadingPackage = match[1];
          print(suiteState + " " + loadingPackage);
          
          if (lastLoadedPackage && lastLoadedPackage == loadingPackage) {
            loadCycles++;
            var loadTime = (loadCycles * accessInterval);
            var msg = "Package " + loadingPackage + " loading for " + 
            (loadTime  / 1000) + "s";
            this.log(msg, "debug");
            print(msg);
            if (loadTime >= this.getConfigSetting("packageLoadTimeout")) {
              this.testFailed = true;
              this.log("Package load timeout reached, aborting!", "error");
              this.logResult();
              return;
            }
          }
          else {
            lastLoadedPackage = loadingPackage;
            loadCycles = 0;
          }
        }
        break;
      case "running":
        var match = viewStatus.match(/Running package (.*)/i);
        if (match && match.length > 1) {
          var runningPackage = match[1];
          print(suiteState + " " + runningPackage);
          
          if (lastRunningPackage && lastRunningPackage == runningPackage) {
            var packageRunTimeout = this.getConfigSetting("packageRunTimeout")
            runCycles++;
            var runTime = (runCycles * accessInterval);
            var msg = "Package " + runningPackage + " running for " + 
            (runTime  / 1000) + "s";
            this.log(msg, "debug");
            print(msg);
            if (runTime >= packageRunTimeout) {
              this.testFailed = true;
              this.log("Package run timeout reached, aborting!", "error");
              this.logResult();
              return;
            }
          }
          else {
            lastRunningPackage = runningPackage;
            runCycles = 0;
          }
        }
        break;
      default:
        var msg = "Unexpected suite state: " + suiteState + " View status: " + 
        viewStatus;
        this.log(msg, "warn");
        return;
    }
  }
};

simulation.Simulation.prototype.logAutErrors = function()
{
  var autErrorGetter = function()
  {
    var errors = selenium.qxStoredVars['autWindow'].qx.core.Init.getApplication().runner.view.getFormattedAutErrors();
    return selenium.qxStoredVars['autWindow'].qx.lang.Json.stringify(errors);
  };
  
  this.addOwnFunction("getAutErrors", autErrorGetter);
  var autErrors = "";
  try {
    autErrors = String(this.__sel.getEval(selWin + ".qx.Simulation.getAutErrors()"));
  }
  catch(ex) {
    this.log("Couldn't get AUT errors " + ex.message, "warn");
    return;
  }
  
  if (autErrors.length != "") {
    var errArr = eval(autErrors);
    for (var i=0,l=errArr.length; i<l; i++) {
      if (!this.ignoreMessage(errArr[i])) {
        this.log(errArr[i], "warn");
      }
    }
  }
};

simulation.Simulation.prototype.logResult = function()
{
  try {
    var results = this.getFailedTests() || {};
    this.logFailedTests(results);
    this.logAutErrors();
  }
  catch(ex) {
    this.log("Unable to log test results: " + ex.message, "error");
  }
};

simulation.Simulation.prototype.ignoreMessage = function(msg) {
  var ignored = this.getConfigSetting("ignoreGlobalErrors");
  for (var i=0,l=ignored.length; i<l; i++) {
    if (msg.match(new RegExp(ignored[i]))) {
      return true;
    }
  }
  return false;
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
    mySim.setupApplicationLogging();
    mySim.addGlobalErrorHandler();
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
