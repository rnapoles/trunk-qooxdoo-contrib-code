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
  var packageList = [];
  var snippet = selWin + '.qx.lang.Json.stringify(' + selWin + "." + qxAppInst + '.runner.testList)';
  var fullList = String(this.__sel.getEval(snippet));
  fullList = eval(fullList);
  
  for (var i=0,l=fullList.length; i<l; i++) {
    var test = fullList[i];
    var testClass = test.substring(test.indexOf(this.testNameSpace) + this.testNameSpace.length + 1, test.indexOf(":"));
    var testPackage;
    if (testClass.substr(0,1) === testClass.substr(0,1).toUpperCase()) {
      testPackage = testClass;
    } else {
      var match = /^(.*?)\./.exec(testClass);
      if (match[1]) {
        testPackage = match[1];
      }
    }
    var fullPackageName = this.testNameSpace + "." + testPackage;
    if (testPackage) {
      var known = false;
      for (var x=0,y=packageList.length; x<y; x++) {
        if (packageList[x] == fullPackageName) {
          known = true;
        }
      }
      if (!known) {
        packageList.push(fullPackageName);
      }
    }
  }
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
  /*
  this.autUri = String(this.__sel.getEval(selWin + "." + 'qx.core.Setting.get("qx.testPageUri")'));
  this.autUri += "?testclass=";
  */
  this.testNameSpace = String(this.__sel.getEval(selWin + "." + qxAppInst + ".runner._testNameSpace"));
  
  var packages = false;
  var include = this.getIncludeList();
  
  if (include.length > 0) {
    packages = include;
  }
  else {
    packages = this.getPackageList();
    packages.sort();
  }

  if (!packages) {
    this.log("ERROR: Unable to get list of test packages.", "error");
    this.testFailed = true;
    return;
  }

  if (this.getConfigSetting("debug")) {
    print("Initial test package list: " + packages);
  }
  
  packages = this.removeIgnored(packages);

  function entryAt(array, entry) {
    for (var i=0;i<array.length;i++) {
      if (array[i] === entry) {
        return i;
      }
    }
    return false;
  }

  /* Workaround for stability issues: Move qx.test.ui and qx.test.Xml to the 
  back of the queue.  
  if (entryAt(packages, "qx.test.ui") >= 0) {
    var temp = packages.splice(entryAt(packages, "qx.test.ui"), 1);
    packages = packages.concat(temp);
  }
  if (entryAt(packages, "qx.test.Xml") >= 0) {
    temp = packages.splice(entryAt(packages, "qx.test.Xml"), 1);
    packages = packages.concat(temp);
  }
  */

  if (this.getConfigSetting("debug")) {
    print("Final test package list: " + packages);
  }

  var elapsedTotal = 0;
  for (var i=0; i<packages.length; i++) {
    var loaded = this.loadPackage(packages[i]);
    if (loaded) {
      this.runPackage(packages[i]);
    }
  }

};

/**
 * Runs a test package and logs the results.
 * 
 * @param packageName {String} The name of the package to be processed
 * @return void
 */
simulation.Simulation.prototype.runPackage = function(packageName)
{
  if (this.getConfigSetting("debug")) {
    print("Starting tests in package " + packageName);
  }
  
  var testAppWindow = selWin + "." + qxAppInst + ".runner.view.getIframeWindow()";
  if (this.getConfigSetting("logAutGlobalErrors") && !packageName.indexOf(("qx.test.io.remote") == 0 )) {
    this.addGlobalErrorHandler(testAppWindow);
  }
  
  var packageStartDate = new Date();

  this.__sel.getEval(selWin + "." + qxAppInst + ".runner.view.run()");

  Packages.java.lang.Thread.sleep(1000);
  
  var isPackageDone = mySim.waitForCondition(isStatusFinished, 600000,
                    "Waiting for test package " + packageName + " to finish", "info");

  if (!isPackageDone) {
    isPackageDone = mySim.waitForCondition(isStatusFinished, 600000,
                    "Waiting for test package " + packageName + " to finish");
  }

  if (!isPackageDone) {
    this.testFailed = true;
  }
  
  this.logErrors();
  
  if (this.getConfigSetting("logAutGlobalErrors") && !packageName.indexOf(("qx.test.io.remote") == 0 )) {
    this.logGlobalErrors(testAppWindow);
  }
  
  if (this.getConfigSetting("getAutLog")) {
    this.logAutLog();
  }

  if (this.getConfigSetting("debug")) {
    if (isPackageDone) {
      this.logTestDuration(packageStartDate, "Test package " + packageName);
    }
  }
};


/**
 * Loads a test package.
 * 
 * @param packageName {String} The name of the package to be processed
 */
simulation.Simulation.prototype.loadPackage = function(packageName)
{
  if (this.getConfigSetting("debug")) {
    print("Loading package: " + packageName);
  }
  
  try {
    this.__sel.open("about:blank");
  } catch(ex) {
    Packages.java.lang.Thread.sleep(5000);
    try {
      this.__sel.open("about:blank");      
    } catch(ex) {
      this.log("WTF is wrong with this crap??? " + ex, "error");
      this.testFailed = true;
      return false;
    }
  }
  
  Packages.java.lang.Thread.sleep(2000);
  
  try {
    this.qxOpen(this.getConfigSetting("autHost") + this.getConfigSetting("autPath") + "?testclass=" + packageName);
    Packages.java.lang.Thread.sleep(2000);
  } catch(ex) {
    this.log("Unable to load package " + packageName + ": " + ex, "error");
    this.testFailed = true;
    return false;
  }
  
  var isAutReady = this.waitForCondition(isStatusReady, 120000,
                   "Waiting for test package " + packageName + " to load");

  if (!isAutReady) {
    this.testFailed = true;
    return false;
  }
  
  this.addGlobalErrorHandler();
  return true;
};


/**
 * Gets HTML content from the result iframe, splits it up into individual test
 * results, removes successful results and logs the rest.
 * 
 * @return void
 */
simulation.Simulation.prototype.logErrors = function()
{
  var testResults = selWin + "." + qxAppInst + ".runner.view.getTestResults()";
  var snippet = selWin + ".qx.lang.Json.stringify(" + testResults + ")";
  var results = String(this.__sel.getEval(snippet));
  results = results.replace(/\'/g, "\\'");
  eval("results = " + results);
  
  if (!results || typeof results !== "object") {
    this.log("Unable to retrieve test result HTML!", "error");
    return;
  }
  
  for (var key in results) {
    if (results[key].state !== "success") {
      var msg = '<div class="testResult ' + results[key].state + '"><h3>' + key + '</h3>';
      if (results[key].messages && results[key].messages.length > 0) {
        for (var i=0,l=results[key].messages.length; i<l; i++) {
          var line = results[key].messages[i];
          line = line.replace(/\'/g, "\\'");
          line = line.replace(/\n/g, "<br/>");
          line = line.replace(/\r/g, "");
          msg += line + "<br/>";
        }
      }
      msg += '</div>';
      this.log(msg, "error");
    }
  }
};


/**
 * Logs the HTML content of the Test Runner's AUT log component.
 */
simulation.Simulation.prototype.logAutLog = function()
{
  var findElem = 'selenium.page().findElement(\'' + locators.logEmbed + '\')';
  var logContent = this.getEval(findElem + '.innerHTML');
  this.log("AUT Log contents:", "info");
  this.log(logContent);
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
  
  var isSuiteReady = mySim.waitForCondition(isStatusReady, 360000,
                                            "Waiting for test suite to load");

  if (!isSuiteReady) {
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
