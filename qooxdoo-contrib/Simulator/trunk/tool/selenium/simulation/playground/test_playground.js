importClass(Packages.com.thoughtworks.selenium.QxSelenium);

// - Config Section ------------------------------------------------------------
var config = {
  selServer   : "localhost",
  selPort     : 4444,
  testBrowser : "*custom /usr/lib/firefox-3.0.6/firefox -no-remote -P selenium-3",
  autHost     : "http://172.17.12.142",
  autPath     : "/~dwagner/workspace/qooxdoo.trunk/application/playground/source/"
};

var stepSpeed  = "250"; // millisecs after each command
var testPause = 360000; // millisecs to wait for all tests to finish
var selWin = "selenium.browserbot.getCurrentWindow()"; // get application iframe
var qxApp = "qx.core.Init.getApplication()";
var isQxReady = 'var qxReady = false; try { if (selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().playarea) { qxReady = true; } } catch(e) {} qxReady;'; // check if testrunner instance exists
var isLogVisible = selWin + "." + qxApp + ".stack.getVisibility() == 'visible'";
var isLogExcluded = selWin + "." + qxApp + ".stack.getVisibility() == 'excluded'";
var logHtml = selWin + "." + qxApp + ".logelem.innerHTML";
var currentSample = selWin + "." + qxApp + ".playAreaCaption.getContent()";
var sampleList = selWin + '.' + qxApp + '.widgets["toolbar.selectSampleButton"].getMenu().getChildren()';
var setLocale = "qx.locale.Manager.getInstance().setLocale('en')";
var usrAgent = 'navigator.userAgent';
var platform = 'navigator.platform';
var errorPre = '<div class="qxappender"><div class="level-error">';
var errorSuf = '</div></div>';
var totalErrors = 0;

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

function isSampleLoaded(sample)
{
  var sampleLoaded = false;
  
  print("Checking if " + sample + " was loaded.");
  
  var tmp = "Starting application '" + sample + "'";
  var check = logHtml + '.indexOf("' + tmp + '") > 0';
  
  var isLoaded = sel.getEval(check);  
  if (isLoaded == "true") {
    sampleLoaded = true;
  }
  return sampleLoaded;
}

function isSampleStarted(sample)
{
  var sampleStarted = false;
  print("Checking if sample " + sample + " was started successfully.");
  var check = logHtml + ".indexOf('Successfully started') > 0";  
  var isStarted = sel.getEval(check);  
  if (isStarted == "true") {
    sampleStarted = true;
  }
  return sampleStarted;
}

function logError(info, ex)
{
  totalErrors++;
  var msg = String(ex);
  msg = msg.replace(/\n/,'');
  msg = msg.replace(/\r/,'');
  msg = msg.replace(/'/, '\'');
  
  print(info + ": " + msg );
  sel.getEval(browserLog(errorPre + info + ': ' + msg + errorSuf));
}

function runTests()
{
  // Make sure the locale is 'en' to simplify dealing with log messages.
  try {   
    sel.runScript(setLocale);
  }
  catch(ex) {
    logError("Error shile setting locale", ex);
  }
  
  try {
    sel.qxClick('qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/child[0]');
  }
  catch(ex) {
    logError("Pressing run button failed", ex);   
  }
   
  // Open log pane
  try {
    print("Opening log.");
    sel.qxClick('qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/child[2]/qx.ui.toolbar.CheckBox');
    sel.waitForCondition(isLogVisible, 10000); 
  } 
  catch(ex) {
    logError("Opening log failed", ex);
  }
 
  try {
    print("Getting available samples.");
    var sampleNames = sel.getEval(getSampleNames());
    sampleNames = String(sampleNames);
    var sampleArr = sampleNames.split(",");
    print("Found " + sampleArr.length + " samples: " + sampleArr);
  }
  catch(ex) {
    logError("Getting sample names failed", ex);
  }
    
  for (var i=0; i<sampleArr.length; i++) {
    if (sampleArr[i] != "") {
      print("Selecting next sample: " + sampleArr[i]);
      try {
        sel.qxClick('qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/qx.ui.toolbar.MenuButton');
        sel.qxClick('qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/qx.ui.toolbar.MenuButton/qx.ui.menu.Menu/child[' + i + ']');
      } 
      catch (ex) {
        logError("Error while selecting sample " + sampleArr[i], ex);
      }

      while (sel.isAlertPresent()) {
        var al = String(sel.getAlert());
        logError("Found alert box", al.substring(0,75) + "...");        
      }
      
      if (checkSample(sampleArr[i])) {
        print(sampleArr[i] + " loaded and started.");
      }
      else {
        logError(sampleArr[i] + " did not load and/or start correctly.", "");        
      }
    }
  }
  
  sel.getEval(browserLog("<p>Playground ended with warnings or errors: " + totalErrors + "</p>"));
  
}

function getSampleNames()
{
  var func = 'function getNames() {';
  func +=    'var kids = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().getRoot().getChildren()[0].getChildren()[1].getChildren()[0].getChildren()[1].getMenu().getChildren();';  
  func +=    'var sampleNames = "";';
  func +=    'for(var i=0,l=kids.length; i<l; i++) {';  
  func +=    'sampleNames += kids[i].getLabel() + ",";';
  func +=    '}';
  func +=    'return sampleNames;';
  func +=    '}';
  func +=    'getNames();';
  return func;
}

function checkSample(sampleName) {
  // Check if sample started successfully
  var sampleOk = false;
  var sampleLoaded = false;
  var sampleStarted = false;
  try {
    sampleLoaded = isSampleLoaded(sampleName);
    sampleStarted = isSampleStarted(sampleName);    
  }
  catch(ex) {
    logError("Error while checking " + sampleName, ex);
  }
  
  if (sampleLoaded && sampleStarted) {
    sampleOk = true;
  }
  
  return sampleOk;
}

// - Main --------------------------------------------------------------------

print("Starting Playground session with browser " + config.testBrowser);
var sel = new QxSelenium(config.selServer,config.selPort,config.testBrowser,config.autHost);

try {
  sel.start();
  sel.setTimeout(120000);
  sel.open(config.autHost + config.autPath);
  sel.setSpeed(stepSpeed);
}
catch(ex) {
  logError("Error while initializing test",ex);
}

var agent = sel.getEval(usrAgent);
var plat = sel.getEval(platform);

sel.getEval(browserLog("<h1>Playground results from " + currentDate.toLocaleString() + "</h1>"));
sel.getEval(browserLog("<p>Application under test: <a href=\"" + config.autHost + config.autPath + "\">" + config.autHost + config.autPath + "</a>"));
sel.getEval(browserLog("<p>Platform: " + plat + "</p>"));
sel.getEval(browserLog("<p>User agent: " + agent + "</p>"));


try {
  sel.waitForCondition(isQxReady, "60000");
}
catch(ex) {
  logError("Error loading application",ex);
}

try {
  runTests();  
}
catch(ex) {
  logError("Unexpected error during test",ex);
}

sel.stop();
print("Test Runner session finished.");
