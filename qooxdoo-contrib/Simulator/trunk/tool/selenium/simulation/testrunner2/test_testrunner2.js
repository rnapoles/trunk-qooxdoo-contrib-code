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
  
  this.autUri = String(this.__sel.getEval(selWin + "." + 'qx.core.Environment.get("qx.testPageUri").toString()'));
  this.autUri += "?testclass=";
  
  this.__sel.qxClickAt("qxhv=*/qx.ui.tree.VirtualTree/child[0]/child[0]/child[0]/child[0]");
  
  var packages = false;
  var include = this.getIncludeList();
  
  if (include.length > 0) {
    packages = include;
  }
  else {
    packages = this.getPackageList();
    //packages.sort();
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

  this.qxClick("qxhv=*/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/child[0]");

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
 * @return void
 */
simulation.Simulation.prototype.loadPackage = function(packageName)
{
  if (this.getConfigSetting("debug")) {
    print("Loading package: " + packageName);
  }
  // Enter the test app URI with the current package's name after 'testclass='.
  this.qxType("qxhv=*/qx.ui.toolbar.ToolBar/*/qx.ui.form.TextField", this.autUri + packageName);
  //this.runScript(qxAppInst + '.reloadTestSuite();', "Calling reloadTestSuite");

  var isAutReady = this.waitForCondition(isStatusReady, 120000,
                   "Waiting for test package " + packageName + " to load");

  if (!isAutReady) {
    this.testFailed = true;
    return;
  }
  return true;

};


simulation.Simulation.prototype.logErrors = function()
{
  var findElem = 'selenium.page().findElement(\'xpath=//*[@qxclass="testrunner2.view.widget.TestResultView"]\').innerHTML';
  var result = this.getEval(findElem);
  result = String(result);
  
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

  for (var i=0, l=logArray.length; i<l; i++) {
    var line = logArray[i];

    // workaround for (rhino?) issue with replace() and single quotes.
    line = line.split("'");
    line = line.join("\'");

    // ignore successful results
    if ( (line.indexOf('<div') >= 0 || line.indexOf('<DIV') >= 0) 
        && line.indexOf('testResult success') < 0
        && line.indexOf('testResult skip') < 0) {

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
      this.log(line, "error");
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

  //try {
    mySim.addGlobalErrorHandler();
    mySim.runTest();
  /*
  }
  catch(ex) {
    var msg = "Unexpected error while running tests: " + ex;
    if (mySim.getConfigSetting("debug")) {
      print(msg + "\n");
    }
    mySim.log(msg, "error");
  }
  */
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
