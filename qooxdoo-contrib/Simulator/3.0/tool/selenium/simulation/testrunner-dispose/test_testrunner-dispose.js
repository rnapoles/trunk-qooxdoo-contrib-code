var baseConf = {
  'autName' : 'Testrunner-Dispose',
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

var ignore = [];
var include = [];

simulation.Simulation.prototype.runTest = function()
{
  var packages = [];
  if (include.length > 0) {
    packages = include;
  }
  else {
    packages = this.getTestClasses(); 
  }
  
  if (ignore.length > 0) {

    for (var x = 0; x < packages.length; x++) {
      for (var j = 0; j < ignore.length; j++) {
        if (packages[x] == ignore[j]) {
          packages.splice(x, 1);
        }
      }
    }

  }
  
  // Get the current test application's URI from the input field.
  this.autUri = this.getEval(selWin + '.document.getElementsByTagName("input")[0].value', 'Getting AUT URI');
  this.autUri = this.autUri.substring(0, this.autUri.indexOf('=')+1);

  var elapsedTotal = 0;
  for (var i=0; i<packages.length; i++) {
    this.processPackage(packages[i]);
  }
  
};

simulation.Simulation.prototype.getTestClasses = function()
{
  var getClasses = function()
  {
    var iter = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer.tests.handler.ttree.getIterator("depth");
    var curr;
    var classes = [];
    while (curr = iter()) {
      if (curr.type == "class") {
        var fullname = curr.pwd();
        fullname.shift();         
        classes.push(fullname.join(".") + "." + curr.label);
      }
    }
    return classes.join("|");
  }
  
  var classes = this.getEval('(' + getClasses + ')();', 'Getting test class names');
  classes = String(classes);
  if (classes == "false" || classes == "null") {
    return false;
  }

  var classArr = classes.split('|');
  return classArr;  
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
  this.qxType("xpath=//input", this.autUri + packageName);
  this.runScript(qxAppInst + '.reloadTestSuite();', "Calling reloadTestSuite");

  var isAutReady = this.waitForCondition(isStatusReady, 120000,
                   "Waiting for test package " + packageName + " to load");

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
    isPackageDone = mySim.waitForCondition(isStatusReady, 300000,
                    "Waiting for test package " + packageName + " to finish");
  }

  if (!isPackageDone) {
    this.testFailed = true;
    return;
  }

  if (this.getConfigSetting("debug")) {
    this.logTestDuration(packageStartDate, "Test package " + packageName);
  }

  /*
  var result = this.getEval(testResults, 'Getting result HTML');

  if (result) {
    this.logErrors(result);
  }
  */
 
  this.logDisposeMessages();

};

simulation.Simulation.prototype.logDisposeMessages = function() {
  var clearLog = selWin + '.' + qxAppInst + ".logappender.clear();";
  this.getEval(clearLog, "Clearing log");
  
  var registerAppender = selWin + '.' + qxAppInst + ".iframe.getWindow().qx.log.Logger.register(" + selWin + '.' + qxAppInst + ".logappender);"
  //print(registerAppender);
  this.getEval(registerAppender, "Registering log appender");

  var shutDown = selWin + '.' + qxAppInst + ".iframe.getWindow().qx.core.ObjectRegistry.shutdown();";
  //print(shutDown);
  this.getEval(shutDown, "Shutting down AUT");

  var getLogContents = selWin + '.' + qxAppInst + ".logelem.innerHTML";
  var logContents = this.getEval(getLogContents, "Getting AUT log contents");
  this.logErrors(logContents);
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

      line =  '<div class="qxappender">' + line + '</div>';      
      this.errWarn++;
      if (this.getConfigSetting("debug")) {
        print("Logging line " + line);
      }
      this.log(line, "error");
    }
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

  var isSuiteReady = mySim.waitForCondition(isStatusReady, 240000,
                                            "Waiting for test suite to load");

  if (!isSuiteReady) {
    mySim.testFailed = true;
    mySim.stop();
    return;
  }

  try {
    mySim.setupApplicationLogging();
    mySim.runTest();
  }
  catch(ex) {
    var msg = "Unexpected error while running tests!";
    if (mySim.getConfigSetting("debug")) {
      print(msg + "\n" + ex);
    }
    mySim.log(msg, "error");
  }

  if (!mySim.testFailed) {
    if (mySim.getConfigSetting("debug")) {
      print("Test run finished successfully.");
    }
    mySim.log("Classes with warnings or errors: " + mySim.getTotalErrorsLogged(), "info");
  }

  mySim.stop();
  mySim.logTestDuration();

})();
