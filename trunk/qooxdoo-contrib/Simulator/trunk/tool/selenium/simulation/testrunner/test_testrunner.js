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
var logTestResults = 'function getResultArray() {  var resultArr = [];  var html = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer.f1.getContentElement().getDomElement().innerHTML;  var htmlLength = html.length;  var c = 0;  while (c < htmlLength) {    var chunk = html.substr(c, 500);    resultArr.push(chunk);    c += 500;  }  return resultArr;} var now = new Date(); var resArr = getResultArray(); for (var i=0,l=resArr.length; i<l;i++) {   LOG.error("qxSimulator_" + now.getTime() + ":" + resArr[i]); }';
var packageFunc= 'function getPkg() {';
packageFunc+= '  var temp = {};';
packageFunc+= '  var iter = ' + selWin + '.' + qxAppInst + '.tests.handler.ttree.getIterator("depth");';
packageFunc+= '  var curr;';
packageFunc+= '  while (curr = iter()) {';
packageFunc+= '    pack = curr.pwd()[3];';
packageFunc+= '    if (pack) {';
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
*  Write a message to Selenium's browser side log
*/
function browserLog(msg)
{
  msg = msg ? msg : "";
  return 'LOG.error("qxSimulator_' + currentDate.getTime() + ': " + \'' + msg + '\');';
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

function getBrowser(agent)
{
  var browser = false;
  var regFF = /.*(Firefox)\/([\d\.]*)/;
  var match = regFF.exec(agent);
  if (match) {
    browser = match[1] + " " + match[2];
  }

  if (!browser) {
    var regOp = /.*(Opera)\/([\d\.]*)/;
    var match = regOp.exec(agent);
    if (match) {
      browser = match[1] + " " + match[2];
    }
  }

  if (!browser) {
    var regIe = /.*MSIE ([\d\.]*)/;
    var match = regIe.exec(agent);
    if (match) {
      browser = "Internet Explorer " + match[1];
    }
  }

  if (!browser) {
    var regCh = /.*(Chrome)\/([\d\.]*)/;
    var match = regCh.exec(agent);
    if (match) {
      browser = match[1] + " " + match[2];
    }
  }

  if (!browser) {
    var regSa = /Version\/([\d\.]+).*(Safari)/;
    var match = regSa.exec(agent);
    if (match) {
      browser = match[2] + " " + match[1];
    }
  }

  return browser;
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
  var browser = getBrowser(agent);

  sel.getEval(browserLog("<h1>Test Runner results from " + currentDate.toLocaleString() + "</h1>"));
  sel.getEval(browserLog("<p>Application under test: <a href=\"" + config.autHost + config.autPath + "\">" + config.autHost + config.autPath + "</a>"));
  if (browser) {
    sel.getEval(browserLog("<p>Browser: " + browser + " on " + plat + "</p>"));
  }
  sel.getEval(browserLog("<p>User agent: " + agent + "</p>"));
}

function isAutReady()
{
  print("Waiting for application to load...");
  try {
    sel.waitForCondition(isStatusReady,testPause);
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

function logTestDuration(startTime)
{
  var stopTime = new Date();
  var elapsed = stopTime.getTime() - startTime.getTime();
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
  print("Split result into " + logArray.length + " array entries.")
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
        if (line.indexOf('<DIV') >= 0) {
          line = line.substring(0,line.indexOf('<DIV class'));
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
  if (!isRunnerReady()) {
    return;
  }

  logBrowserInfo();

  if (!isAutReady()) {
    return;
  }

  print("Starting tests for " + config.autHost + config.autPath);
  var startTime = new Date();  
  sel.runScript(qxAppInst + '.runTest();');
  
  if (!isTestsDone()) {
    return;
  }

  logTestDuration(startTime); 

  var result = getResultLog();
  
  if (!result) {
    return;
  }

  logErrors(result);

}

// - Main --------------------------------------------------------------------

print("Starting Test Runner session with browser " + config.testBrowser);
var sel = new QxSelenium(config.selServer,config.selPort,config.testBrowser,config.autHost);
sel.start();
sel.open(config.autHost + config.autPath);
sel.setSpeed(stepSpeed);

runTests();
if (!testFailed) {
  sel.getEval(browserLog("<p>Tests with warnings or errors: " + errWarn + "</p>"));
}
sel.stop();
print("Test Runner session finished.");
