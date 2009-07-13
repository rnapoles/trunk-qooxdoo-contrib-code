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
var qxStatusText = '.widgets["statuspane.systeminfo"].getContent().toString()';
// Check if a test run has finished
var isStatusReady = selWin + '.' + qxAppInst + qxStatusText + ' == "Ready" || ' + selWin + '.' + qxAppInst + qxStatusText + ' == "Enabled auto-reload"';
// HTML content of the result iframe
var testResultHTML = selWin + '.' + qxAppInst + '.f1.getContentElement().getDomElement().innerHTML';
var testResults = selWin + '.qx.Simulation.sanitize(' + testResultHTML + ')';

var ignore = ["qx.test.Xml","qx.test.ui","qx.test.data"];
var include = [];

/**
 * Runs a function in the AUT context that reads the available test packages
 * from the tree.
 *
 * @returns {Array} an array of test package names
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

/*
 * Prepare the list of test packages to be run.
 */
simulation.Simulation.prototype.runTestsSteps = function()
{
  var packages = this.getPackageArray();

  if (!packages) {
    this.log("ERROR: Unable to get list of test packages.", "error");
    this.testFailed = true;
    return;
  }

  if (this.getConfigSetting("debug")) {
    print("TEST PACKAGES: " + packages);
  }

  if (include.length > 0) {
    packages = include;
  }
  else if (ignore.length > 0) {

    for (var x = 0; x < packages.length; x++) {
      for (var j = 0; j < ignore.length; j++) {
        if (packages[x] == ignore[j]) {
          packages.splice(x, 1);
        }
      }
    }

  }

  function entryAt(array, entry) {
    for (var i=0;i<array.length;i++) {
      if (array[i] === entry) {
        return i;
      }
    }
  }

  var temp = packages.splice(entryAt(packages, "qx.test.ui"), 1);
  packages = packages.concat(temp);

  if (this.getConfigSetting("debug")) {
    print("TESTING PACKAGES: " + packages);
  }

  // Get the current test application's URI from the input field.
  this.autUri = this.getEval(selWin + '.document.getElementsByTagName("input")[0].value', 'Getting AUT URI');
  this.autUri = this.autUri.substring(0, this.autUri.indexOf('=')+1);

  var elapsedTotal = 0;
  for (var i=0; i<packages.length; i++) {
    this.processPackage(packages[i]);
  }

};

/*
 * Run a test package and log the results.
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

  this.addGlobalErrorHandler(selWin + "." + qxAppInst + ".iframe.getWindow()");

  if (!isAutReady) {
    this.testFailed = true;
    return;
  }

  if (this.getConfigSetting("debug")) {
    print("Starting tests in package " + packageName);
  }
  var packageStartDate = new Date();

  this.runScript(qxAppInst + '.runTest();', "Calling runTest");

  var isPackageDone = mySim.waitForCondition(isStatusReady, 300000,
                    "Waiting for test package " + packageName + " to finish");

  if (!isPackageDone) {
    isPackageDone = mySim.waitForCondition(isStatusReady, 500000,
                    "Waiting for test package " + packageName + " to finish");
  }

  if (!isPackageDone) {
    this.testFailed = true;
  }

  if (this.getConfigSetting("debug")) {
    this.logTestDuration(packageStartDate, "Test package " + packageName);
  }

  var result = this.getEval(testResults, 'Getting result HTML');

  if (result) {
    this.logErrors(result);
  }

};

/*
 * Takes HTML content from the result iframe, splits it up into individual test
 * results, removes successful results and logs the rest.
 */
simulation.Simulation.prototype.logErrors = function(result)
{
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

    // Workaround for (rhino?) issue with replace() and single quotes.
    line = line.split("'");
    line = line.join("\'");

    // only log warnings and errors
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

  var isSuiteReady = mySim.waitForCondition(isStatusReady, 240000,
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

    mySim.log("Tests with warnings or errors: " + mySim.errWarn, "info");
  }

  mySim.logTestDuration();
  mySim.stop();

})();
