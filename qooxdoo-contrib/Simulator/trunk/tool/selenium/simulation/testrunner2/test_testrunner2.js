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
  'logAutGlobalErrors' : true
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

var isStatusReady = selWin + "." + qxAppInst + ".runner.getTestSuiteState() == 'ready'";
var isStatusFinished = selWin + "." + qxAppInst + ".runner.getTestSuiteState() == 'finished'";


/**
 * Runs a function in the AUT context that reads the available test packages
 * from the tree.
 *
 * @return {Array} an array of test package names
 */
simulation.Simulation.prototype.getPackageList = function()
{
  var getPackages = function() {
    var model = selenium.qxStoredVars['autWindow'].qx.core.Init.getApplication().runner.getTestModel();
    var qxTest = model.getChildren().getItem(0).getChildren();
    var packages = [];
    for (var i=0,l=qxTest.length; i<l; i++) {
      packages.push(qxTest.getItem(i).fullName);
    }
    return selenium.qxStoredVars['autWindow'].qx.lang.Json.stringify(packages);
  }

  mySim.addOwnFunction("getPackages", getPackages);
  var packages = String(mySim.getEval(simulation.Simulation.SELENIUMWINDOW + ".qx.Simulation.getPackages()"));
  var packageList = eval(packages);
  
  return packageList;
};

/**
 * Gets an array of packages to be tested from the "include" config option.
 *
 * @return {Array} an array of test package names
 */
simulation.Simulation.prototype.getIncludeList = function()
{
  var include = [];
  
  try {
    var includeStr = this.getConfigSetting("include");
    this.log("Testing only the following packages: " + includeStr, "info");
    include = includeStr.split(",");
    if (this.getConfigSetting("debug")) {
      print("Include list configured: " + include);
    }
  }
  catch(ex) {
    if (this.getConfigSetting("debug")) {
      print("No include list configured.");
    }
  }
  
  return include;  
};

/**
 * Removes any package names listed in the "ignore" config option from the full
 * list of test packages.
 *
 * @param packagesOld {Array} Array of initial test package names
 * @return {Array} Array of remaining test package names
 */
simulation.Simulation.prototype.removeIgnored = function(packagesOld)
{
  var packages = packagesOld.concat([])
  var ignore = [];
  
  try {
    var ignoreStr = this.getConfigSetting("ignore");
    this.log("Ignoring the following packages: " + ignoreStr, "info");
    ignore = ignoreStr.split(",");
    if (this.getConfigSetting("debug")) {
      print("Ignore list configured: " + ignore);
    }
  } 
  catch (ex) {
    if (this.getConfigSetting("debug")) {
      print("No ignore list configured.");
    }
  }

  if (ignore.length > 0) {
    for (var x=packages.length-1; x > 0; x--) {
      for (var j = 0; j < ignore.length; j++) {
        if (packages[x] == ignore[j]) {
          packages.splice(x, 1);
        }
      }
    }
  }
  return packages;
};


/**
 * Determines which test packages should be run and processes them.
 */
simulation.Simulation.prototype.runTest = function()
{
  var stateGetter = simulation.Simulation.SELENIUMWINDOW + "." 
    + simulation.Simulation.QXAPPINSTANCE + ".runner.view.getStatus()";
  
  while (true) {
    Packages.java.lang.Thread.sleep(10000);
    var suiteState = String(this.getEval(stateGetter));
    
    switch (suiteState) {
      case "error":
        this.log("Error loading test suite", "error");
        return;
      case "finished":
        this.logErrors();
        this.logAutErrors();
        return;
      default:
        print("status: " + suiteState);
    }
  }
};


simulation.Simulation.prototype.logErrors = function()
{
  var prefix = simulation.Simulation.SELENIUMWINDOW + "." 
    + simulation.Simulation.QXAPPINSTANCE;
  
  var errorGetter = simulation.Simulation.SELENIUMWINDOW
  + ".qx.lang.Json.stringify(" + prefix + ".runner.view.getFailedResults())";
  
  var resultsString = String(this.__sel.getEval(errorGetter));
  eval("var results=" + resultsString);
    
  for (var testName in results) {
    var result = results[testName];
    
    var message = "";
    for (var i=0,l=result.messages.length; i<l; i++) {
      var msg = result.messages[i];
      msg = this.replaceStrings(msg);
      message += msg + "<br/><br/>";
    }
    
    var level = "info";
    switch(result.state) {
      case "skip":
        level = "info";
        break;
      default:
        level = "error";
    };
    
    var html = '<div class="testResult ' + level + '">'
      + '<h3>' + testName + '</h3>' + message + '</div>';
    
    this.log(html, level);
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
  var autErrors = String(this.__sel.getEval(selWin + ".qx.Simulation.getAutErrors()"));
  if (autErrors.length != "") {
    var errArr = eval(autErrors);
    for (var i=0,l=errArr.length; i<l; i++) {
      this.log(errArr[i], "error");
    }
  }
};

simulation.Simulation.prototype.replaceStrings = function(line)
{
  try {
    line = line.replace(/\<br\>/gi, "<br/>");
    line = line.replace(/\'/g, "\\'");
    line = line.replace(/\n/g, "");
    line = line.replace(/\r/g, "");
  }
  catch(ex) {
    print("Error while replacing: " + ex);
    line = "LINE REPLACED DUE TO ILLEGAL CHARACTER";
  }
  return line;
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
