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
var testPause = 360000; // millisecs to wait for all tests to finish
var selWin = 'selenium.browserbot.getCurrentWindow()'; // get application iframe
var qxAppInst = 'qx.core.Init.getApplication().viewer'; // get demobrowser instance
var qxStatusText = '.widgets["statuspane.systeminfo"].getContent()["__txt"]'; // content of status text field
var isStatusReady = selWin + '.' + qxAppInst + qxStatusText + ' == "Ready" || ' + selWin + '.' + qxAppInst + qxStatusText + ' == "Enabled auto-reload"'; // check if test run has finished
var testResults = selWin + '.' + qxAppInst + '.f1.getContentElement().getDomElement().innerHTML'; // content of result iframe
var testResultsLength = selWin + '.' + qxAppInst + '.f1.getContentElement().getDomElement().innerHTML.length';
var isQxReady = 'var qxReady = false; try { if (selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer) { qxReady = true; } } catch(e) {} qxReady;'; // check if testrunner instance exists
var usrAgent = 'navigator.userAgent';
var platform = 'navigator.platform';
/*
function getResultArray() {
  var resultArr = [];
  var html = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer.f1.getContentElement().getDomElement().innerHTML;
  var htmlLength = html.length;
  var c = 0;
  while (c < htmlLength) {
    var chunk = html.substr(c, 500);
    resultArr.push(chunk);
    c += 500;
  }
  return resultArr;
}
var now = new Date();
var resArr = getResultArray();
for (var i=0,l=resArr.length; i<l;i++) {
  LOG.error('qxSimulator_' + now.getTime() + ':' + resArr[i]);
}
*/
var logTestResults = 'function getResultArray() {  var resultArr = [];  var html = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer.f1.getContentElement().getDomElement().innerHTML;  var htmlLength = html.length;  var c = 0;  while (c < htmlLength) {    var chunk = html.substr(c, 500);    resultArr.push(chunk);    c += 500;  }  return resultArr;} var now = new Date(); var resArr = getResultArray(); for (var i=0,l=resArr.length; i<l;i++) {   LOG.error("qxSimulator_" + now.getTime() + ":" + resArr[i]); }';

// - Config End ----------------------------------------------------------------

var currentDate = new Date();
var errWarn = 0;

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

function getResultChunk(startAt, chars)
{
  return selWin + '.' + qxAppInst + '.f1.getContentElement().getDomElement().innerHTML.substr(' + startAt + ',' + chars + ')';
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
    var regSa = /.*(Safari)\/([\d\.]*)/;
    var match = regSa.exec(agent);
    if (match) {
      browser = match[1] + " " + match[2];
    }
  }  

  return browser;
}

function runTests()
{
  sel.waitForCondition(isQxReady, "60000");
  var agent = sel.getEval(usrAgent);
  var plat = sel.getEval(platform);

  var browser = getBrowser(agent);

  sel.getEval(browserLog("<h1>Test Runner results from " + currentDate.toLocaleString() + "</h1>"));
  sel.getEval(browserLog("<p>Application under test: <a href=\"" + config.autHost + config.autPath + "\">" + config.autHost + config.autPath + "</a>"));
  if (browser) {
    sel.getEval(browserLog("<p>Browser: " + browser + " on " + plat + "</p>"));
  }
  sel.getEval(browserLog("<p>User agent: " + agent + "</p>"));

  print("Waiting for application to load...")
  sel.waitForCondition(isStatusReady,testPause);

  print("Starting tests for " + config.autHost + config.autPath);
  sel.runScript(qxAppInst + '.runTest();');

  print("Waiting for tests to finish...");
  sel.waitForCondition(isStatusReady,testPause);
  print("Getting log...");

  //var result = sel.getEval(testResults);

  var htmlLength = sel.getEval(testResultsLength);
  print("Result is " + htmlLength + " characters long.")
  var c = 0;
  var result = '';
  while (c < htmlLength) {
    var chunk = sel.getEval(getResultChunk(c, 500));
    result += chunk;
    c += 500;
  }  

  print("Got log");

  
  var logArray = getLogArray(result);
  // we can speed this up since we don't have to wait for the browser
  sel.setSpeed("500");
  for (var i=0, l=logArray.length; i<l; i++) {
    var line = logArray[i] + '</div></div>';
    // only log warnings and errors
    if ( (line.indexOf('<div') >= 0 || line.indexOf('<DIV') >= 0) && line.indexOf('testResult success') < 0) {
      // strip uninformative stack trace
      if (line.indexOf('Stack trace:') > 0) {
        line = line.substring(0,line.indexOf('Stack trace:')) + '</div>';
      }
      line = line.replace(/\<br\>/gi, "<br/>");
      line = line.replace(/\'/g, "\\'");
      line = line.replace(/\n/g, "<br/>");
      line = line.replace(/\r/g, "<br/>");
      errWarn++;
      print("Logging line")
      sel.getEval(browserLog(line));
    }
  }
  print(errWarn + " lines logged");

}

// - Main --------------------------------------------------------------------

print("Starting Test Runner session with browser " + config.testBrowser);
var sel = new QxSelenium(config.selServer,config.selPort,config.testBrowser,config.autHost);
sel.start();
sel.open(config.autHost + config.autPath);
sel.setSpeed(stepSpeed);

runTests();

sel.getEval(browserLog("<p>Tests with warnings or errors: " + errWarn + "</p>"));
sel.stop();
print("Test Runner session finished.");


