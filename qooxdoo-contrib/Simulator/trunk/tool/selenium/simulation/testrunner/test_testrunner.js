importClass(Packages.com.thoughtworks.selenium.QxSelenium);

// - Config Section ------------------------------------------------------------
var config = {
  selServer   : "localhost",
  selPort     : 4444,
  testBrowser : "*custom /usr/lib/firefox-3.0.5/firefox -no-remote -P selenium-3",
  autHost     : "http://172.17.12.142",
  autPath     : "/~dwagner/workspace/qooxdoo.trunk/framework/test/"
};

var stepSpeed  = "250"; // millisecs after each command
var testPause = 1800000; // millisecs to wait for all tests to finish
var selWin = 'selenium.browserbot.getCurrentWindow()'; // get application iframe
var qxAppInst = 'qx.core.Init.getApplication().viewer'; // get demobrowser instance
var qxStatusText = '.widgets["statuspane.systeminfo"].getContent().toString()'; // content of status text field
var isStatusReady = selWin + '.' + qxAppInst + qxStatusText + ' == "Ready" || ' + selWin + '.' + qxAppInst + qxStatusText + ' == "Enabled auto-reload"'; // check if test run has finished
var testResults = selWin + '.' + qxAppInst + '.f1.getContentElement().getDomElement().innerHTML'; // content of result iframe
var testResultsLength = selWin + '.' + qxAppInst + '.f1.getContentElement().getDomElement().innerHTML.length';
var isQxReady = 'var qxReady = false; try { if (selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer) { qxReady = true; } } catch(e) {} qxReady;'; // check if testrunner instance exists
var usrAgent = 'navigator.userAgent';
var platform = 'navigator.platform';

var packageFunc= 'function getPkg() {';
packageFunc+= '  var temp = {};';
packageFunc+= '  var iter = ' + selWin + '.' + qxAppInst + '.tests.handler.ttree.getIterator("depth");';
packageFunc+= '  var curr;';
packageFunc+= '  while (curr = iter()) {';
packageFunc+= '    var path = curr.pwd();';
packageFunc+= '    if (path[3]) {';
packageFunc+= '      var pack = path[1] + "." + path[2] + "." + path[3];';
packageFunc+= '      temp[pack] = "";';
packageFunc+= '    }';
packageFunc+= '  }';
packageFunc+= '  return temp;';
packageFunc+= '}';
packageFunc+= 'var packObj = getPkg();';
packageFunc+= 'var packStr = "";';
packageFunc+= 'for (pack in packObj) {';
packageFunc+= '  packStr += pack + ",";';
packageFunc+= '}';
packageFunc+= 'packStr;';

// - Config End ----------------------------------------------------------------

var currentDate = new Date();
var errWarn = 0;
var testFailed = false;

// store command line parameters in config object
for (i in arguments) {
  if (arguments[i].indexOf("=") >0) {
    var tempArr = arguments[i].split("=");
    config[tempArr[0]] = tempArr[1];
  }
}

/*
 * Open/create a log file and return the file object.
 */
function getLogFile()
{
  var logFileName = config.logFile ? config.logFile :  "testrunner_" + currentDate.getTime() + ".log";
  var fstream = new java.io.FileWriter(logFileName, true);
  var out = new java.io.BufferedWriter(fstream);
  return out;
}

/*
*  Write a message to Selenium's browser side log and the local log file.
*/
function browserLog(msg)
{
  msg = msg ? msg : "";
  var prefix = 'qxSimulator_' + currentDate.getTime();
  var logFile = getLogFile();
  logFile.write(prefix + ': ' + msg);
  logFile.newLine();
  logFile.close();
  return 'LOG.error("' + prefix + ': " + \'' + msg + '\');';
}

/*
* Generated HTML elements are uppercase in IE
*/
function getLogArray(result)
{
  var logArray = [];
  if (result.indexOf("</div>") >0 ) {
    logArray = result.split("</div>");
  } else if (result.indexOf("</DIV>") >0 ) {
    logArray = result.split("</DIV>");
  }
  return logArray;
}

function getResultChunk(startAt, chars)
{
  return selWin + '.' + qxAppInst + '.f1.getContentElement().getDomElement().innerHTML.substr(' + startAt + ',' + chars + ')';
}

function getPackageArray()
{
  var packs = sel.getEval(packageFunc);
  packs = String(packs);
  packs = packs.substr(0,packs.length-1);
  var packArr = packs.split(',');
  return packArr;
}

function logBrowserInfo()
{
  var agent = sel.getEval(usrAgent);
  var plat = sel.getEval(platform);

  sel.getEval(browserLog("<h1>Test Runner results from " + currentDate.toLocaleString() + "</h1>"));
  sel.getEval(browserLog("<p>Application under test: <a href=\"" + config.autHost + config.autPath + "\">" + config.autHost + config.autPath + "</a>"));
  sel.getEval(browserLog("<p>Platform: " + plat + "</p>"));
  sel.getEval(browserLog("<p>User agent: " + agent + "</p>"));
}

function isAutReady()
{
  print("Waiting for application to load...");
  try {
    sel.waitForCondition(isStatusReady,"120000");
    return true;
  }
  catch(ex) {
    testFailed = true;
    print("Test file not loaded: " + ex);
    sel.getEval(browserLog("<DIV>ERROR: Test file not loaded: " + ex + "</DIV>"));
    return false;
  }
}

function isRunnerReady()
{
  try {
    sel.waitForCondition(isQxReady, "60000");
    return true;
  }
  catch(ex) {
    testFailed = true;
    print("Couldn't find qx instance in AUT window. " + ex);
    sel.getEval(browserLog("<DIV>ERROR: Unable to find qx instance in AUT window: " + ex + "</DIV>"));
    return false;
  }
}

function isTestsDone()
{
  print("Waiting for tests to finish...");
  try {
    sel.waitForCondition(isStatusReady,testPause);
    return true;
  }
  catch(ex) {
    testFailed = true;
    print("Test run did not finish correctly: " + ex);
    sel.getEval(browserLog("<DIV>ERROR: Test run did not finish correctly: " + ex + "</DIV>"));
    return false;
  }
}

function getTestDuration(startTime)
{
  var stopTime = new Date();
  var elapsed = stopTime.getTime() - startTime.getTime();
  return elapsed;
}

function logTestDuration(elapsed)
{
  elapsed = (elapsed / 1000);
  min = Math.floor(elapsed / 60);
  sec = Math.round(elapsed % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  print("Test run finished in: " + min + " minutes " + sec + " seconds.");
  sel.getEval(browserLog("<p>Test run finished in: " + min + " minutes " + sec + " seconds.</p>"));
}

function logErrors(result)
{
  var logArray = getLogArray(result);
  print("Split result into " + logArray.length + " array entries.");
  // we can speed this up since we don't have to wait for the browser
  sel.setSpeed("500");
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
      errWarn++;
      print("Logging line " + line);
      sel.getEval(browserLog(line));
    }
  }
  print(errWarn + " lines logged");
}

function getResultLog()
{
  print("Getting log...");
  try {
    var result = sel.getEval(testResults);
    print("Got log");
    return result;
  }
  catch(ex) {
    testFailed = true;
    print("Could not get test results: " + ex);
    sel.getEval(browserLog("<DIV>ERROR: Could not get test results: " + ex + "</DIV>"));
    return false;
  }
}

function runTests()
{
  if (!isAutReady()) {
    return;
  }

  print("Starting tests for " + config.autHost + config.autPath);
  var startTime = new Date();  
  sel.runScript(qxAppInst + '.runTest();');
  
  if (!isTestsDone()) {
    return;
  }

  logTestDuration(getTestDuration(startTime)); 

  var result = getResultLog();
  
  if (!result) {
    return;
  }

  logErrors(result);
}

function runTestsSteps()
{
  if (!isAutReady()) {
    sel.getEval(browserLog("<DIV>Timeout while loading test suite.</DIV>"));
    return;
  }

  var packages = getPackageArray();
  print("TEST PACKAGES: " + packages);
  var autUri = sel.getEval(selWin + '.document.getElementsByTagName("input")[0].value');
  autUri = autUri.substring(0,autUri.indexOf('=')+1);
    
  var elapsedTotal = 0;
  for (var i=0; i<packages.length; i++) {
    print("Loading package: " + packages[i]);
    sel.type("dom=document.getElementsByTagName('input')[0]", autUri + packages[i]);
    sel.runScript(qxAppInst + '.reloadTestSuite();');
    
    if (!isAutReady()) {
      sel.getEval(browserLog("<DIV>Failed while attempting to load package " + packages[i] + "</DIV>"));
      return;
    }
  
    print("Starting tests in package " + packages[i]);
    var startTime = new Date();
    sel.runScript(qxAppInst + '.runTest();');
    
    if (!isTestsDone()) {
      return;
    }
  
    elapsedTotal += getTestDuration(startTime); 
  
    var result = getResultLog();
    
    if (!result) {
      return;
    }
  
    logErrors(result);

  }  
  logTestDuration(elapsedTotal);

}

// - Main --------------------------------------------------------------------

print("Starting Test Runner session with browser " + config.testBrowser);
browserLog("<h1>Test Runner results from " + currentDate.toLocaleString() + "</h1>");
var sel = new QxSelenium(config.selServer,config.selPort,config.testBrowser,config.autHost);
sel.start();
sel.setTimeout(120000);
sel.open(config.autHost + config.autPath);
sel.setSpeed(stepSpeed);

if (isRunnerReady()) {
  logBrowserInfo();
  runTestsSteps();
}

if (!testFailed) {
  print("Test run finished successfully.");
  sel.getEval(browserLog("<p>Tests with warnings or errors: " + errWarn + "</p>"));
}

sel.stop();
print("Test Runner session finished.");
