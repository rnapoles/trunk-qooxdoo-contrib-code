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
var qxAppInst = simulation.Simulation.QXAPPINSTANCE + '.viewer';
// Content of the "status" text field
var qxStatusText = '.widgets["statuspane.systeminfo"].getValue().toString()';
// Check if a test run has finished
var isStatusReady = selWin + '.' + qxAppInst + qxStatusText + ' == "Ready" || ' + selWin + '.' + qxAppInst + qxStatusText + ' == "Enabled auto-reload"';
// HTML content of the result iframe
var testResultHTML = selWin + '.' + qxAppInst + '.f1.getContentElement().getDomElement().innerHTML';
var testResults = selWin + '.qx.Simulation.sanitize(' + testResultHTML + ')';

/**
 * Runs a function in the AUT context that reads the available test packages
 * from the tree.
 *
 * @return {Array} an array of test package names
 */
simulation.Simulation.prototype.getPackageArray = function()
{
  var packageFunction = function()  {
    var packObj = {};
    var iter = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer.tests.handler.ttree.getIterator("depth");
    var curr;
    while (curr = iter()) {
      var path = curr.pwd();
      if (path[3]) {
        var pack = path[1] + "." + path[2] + "." + path[3];
        packObj[pack] = "";
      }
    }
    var packStr = "";
    for (pack in packObj) {
      packStr += pack + ",";
    }
    return packStr;
  };

  var packs = this.getEval('(' + packageFunction + ')();', 'Getting test package names');
  packs = String(packs);
  if (packs == "false" || packs == "null") {
    return false;
  }
  packs = packs.substr(0,packs.length-1);
  var packArr = packs.split(',');
  return packArr;
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
 * 
 * @return void
 */
simulation.Simulation.prototype.runTestsSteps = function()
{
  var packages = false;
  var include = this.getIncludeList();
  
  if (include.length > 0) {
    packages = include;
  }
  else {
    packages = this.getPackageArray();
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
  back of the queue. */
  if (entryAt(packages, "qx.test.ui") >= 0) {
    var temp = packages.splice(entryAt(packages, "qx.test.ui"), 1);
    packages = packages.concat(temp);
  }
  if (entryAt(packages, "qx.test.Xml") >= 0) {
    temp = packages.splice(entryAt(packages, "qx.test.Xml"), 1);
    packages = packages.concat(temp);
  }

  if (this.getConfigSetting("debug")) {
    print("Final test package list: " + packages);
  }

  // Get the current test application's URI from the input field.
  this.autUri = this.getEval(selWin + '.document.getElementsByTagName("input")[0].value', 'Getting AUT URI');
  this.autUri = this.autUri.substring(0, this.autUri.indexOf('=')+1);

  var elapsedTotal = 0;
  for (var i=0; i<packages.length; i++) {
    this.processPackage(packages[i]);
  }

};

/**
 * Runs a test package and logs the results.
 * 
 * @param packageName {String} The name of the package to be processed
 * @return void
 */
simulation.Simulation.prototype.processPackage = function(packageName)
{
  if (this.getConfigSetting("debug")) {
    print("Loading package: " + packageName);
  }
  // Enter the test app URI with the current package's name after 'testclass='.
  this.type("dom=document.getElementsByTagName('input')[0]", this.autUri + packageName);
  this.runScript(qxAppInst + '.reloadTestSuite();', "Calling reloadTestSuite");

  var isAutReady = this.waitForCondition(isStatusReady, 120000,
                   "Waiting for test package " + packageName + " to load");

  var testAppWindow = selWin + "." + qxAppInst + ".iframe.getWindow()";
  this.addGlobalErrorHandler(testAppWindow);

  if (!isAutReady) {
    this.testFailed = true;
    return;
  }

  if (this.getConfigSetting("debug")) {
    print("Starting tests in package " + packageName);
  }
  var packageStartDate = new Date();

  this.runScript(qxAppInst + '.runTest();', "Calling runTest");

  var isPackageDone = mySim.waitForCondition(isStatusReady, 600000,
                    "Waiting for test package " + packageName + " to finish", "info");

  if (!isPackageDone) {
    isPackageDone = mySim.waitForCondition(isStatusReady, 600000,
                    "Waiting for test package " + packageName + " to finish");
  }

  if (!isPackageDone) {
    this.testFailed = true;
  }
  
  this.logGlobalErrors(testAppWindow);

  if (this.getConfigSetting("debug")) {
    if (isPackageDone) {
      this.logTestDuration(packageStartDate, "Test package " + packageName);
    }
  }

};

/**
 * Gets HTML content from the result iframe, splits it up into individual test
 * results, removes successful results and logs the rest.
 * 
 * @return void
 */
simulation.Simulation.prototype.logErrors = function()
{
  // get the result HTML.
  var result = this.getEval(testResults, 'Getting result HTML');
  if (!result || result === "") {
    this.log("Unable to retrieve test result HTML!", "error");
    return;
  }
  
  // split it up into individual entries.
  var logArray = [];
  if (result.indexOf("</div>") >0 ) {
    logArray = result.split("</div>");
  } else if (result.indexOf("</DIV>") >0 ) {
    logArray = result.split("</DIV>");
  }

  if (this.getConfigSetting("debug")) {
    print("Split result into " + logArray.length + " array entries.");
  }

  // we can speed this up since we don't have to wait for the browser
  this.__sel.setSpeed("500");

  for (var i=0, l=logArray.length; i<l; i++) {
    var line = logArray[i];

    // workaround for (rhino?) issue with replace() and single quotes.
    line = line.split("'");
    line = line.join("\'");

    // ignore successful results
    if ( (line.indexOf('<div') >= 0 || line.indexOf('<DIV') >= 0) && line.indexOf('testResult success') < 0) {

      // strip uninformative stack trace
      if (line.indexOf('Stack trace:') > 0) {
        if (line.indexOf('<DIV class="trace') >= 0) {
          line = line.substring(0,line.indexOf('<DIV class="trace'));
        }
        else if (line.indexOf('<DIV class=trace') >= 0) {
          line = line.substring(0,line.indexOf('<DIV class=trace'));
        }
        else {
          line = line.substring(0,line.indexOf('<div class="trace'));
        }
      }

      // replace evil special characters
      try {
        line = line.replace(/\<br\>/gi, "<br/>");
        line = line.replace(/\'/g, "\\'");
        line = line.replace(/\n/g, "");
        line = line.replace(/\r/g, "");
      }
      catch(ex) {
        print("Error while replacing: " + ex);
      }

      // make sure all div tags are closed
      var odivs = line.match(/\<div/gi);
      var cdivs = line.match(/\<\/div/gi);
      if (odivs) {
        cdivs = cdivs ? cdivs : [];
        var divdiff = odivs.length - cdivs.length;
        if (divdiff > 0) {
          for (var j=0; j<divdiff; j++) {
            line += "</div>";
          }
        }
      }

      // log the result
      this.errWarn++;
      if (this.getConfigSetting("debug")) {
        print("Logging line " + line);
      }
      this.log(line, "error");
    }
  }

  if (this.getConfigSetting("debug")) {
    print(this.errWarn + " lines logged");
  }

};

// - Main --------------------------------------------------------------------

(function() {
  mySim.testFailed = false;
  mySim.errWarn = 0;

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
    mySim.runTestsSteps();
  }
  catch(ex) {
    var msg = "Unexpected error while running tests!";
    if (mySim.getConfigSetting("debug")) {
      print(msg + "\n" + ex);
    }
    mySim.log(msg, "error");
  }

  mySim.logGlobalErrors();

  if (!mySim.testFailed) {
    if (mySim.getConfigSetting("debug")) {
      print("Test run finished successfully.");
    }
    
    var totalErrors = mySim.getTotalErrorsLogged() + mySim.getTotalWarningsLogged();

    //mySim.log("Tests with warnings or errors: " + mySim.errWarn, "info");
    mySim.log("Tests with warnings or errors: " + totalErrors, "info");
  }

  mySim.stop();
  mySim.logTestDuration();

})();
