importClass(Packages.com.thoughtworks.selenium.QxSelenium);

// - Config Section ------------------------------------------------------------
var config = {
  selServer   : "localhost",
  selPort     : 4444,
  testBrowser : "*custom /usr/lib/firefox-3.0.6/firefox -no-remote -P selenium-3",
  autHost     : "http://172.17.12.142",
  autPath     : "/~dwagner/workspace/qooxdoo.trunk/application/feedreader/source/"
};

var stepSpeed  = "250"; // millisecs after each command
var testPause = 360000; // millisecs to wait for all tests to finish
var selWin = "selenium.browserbot.getCurrentWindow()"; // get application iframe
var qxApp = "qx.core.Init.getApplication()";
var treeFunc = getObjectByClassnameSel("selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication()","qx.ui.tree.Tree");
var listFunc = getObjectByClassnameSel("selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication()","feedreader.view.List");
var prefWinFunc = getObjectByClassnameSel(selWin + "." + qxApp + ".getRoot()","feedreader.view.PreferenceWindow");
var addFeedWinFunc = getObjectByClassnameSel(selWin + "." + qxApp + ".getRoot()","feedreader.view.AddFeedWindow");
var treeReset = treeFunc + ".resetSelection()";
var treeSelect = treeFunc + ".addToSelection(" + treeFunc + ".getItems()[1])"; // select qooxdoo news feed
var staticFeedsLabel = treeFunc + ".getItems()[0].getContentElement().getChildren()[2].getChildren()[0].getContent().toString()";
var addFeedWindowLabel = addFeedWinFunc + ".getCaption().toString()";
var isPrefWindowVisible = prefWinFunc + ".getVisibility() == 'visible'";
var isPrefWindowHidden = prefWinFunc + ".getVisibility() == 'hidden'";
var isAddFeedWindowVisible = addFeedWinFunc + ".getVisibility() == 'visible'";
var isAddFeedWindowHidden = addFeedWinFunc + ".getVisibility() == 'hidden'";
var isQxReady = 'var qxReady = false; try { if (selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication()) { qxReady = true; } } catch(e) {} qxReady;'; // check if testrunner instance exists
var usrAgent = 'navigator.userAgent';
var platform = 'navigator.platform';
var totalErrors = 0;

// - Config End ----------------------------------------------------------------

var currentDate = new Date();

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

function getVisibleFunc()
{
  var func = '';
  func += 'function getPrefWinVisibility() {';
  func += '  var visibility = "hidden";';
  func += '  var app = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication();';
  func += '  for (prop in app) {';
  func += '    try {';
  func += '      if (typeof app[prop] == "object") {';
  func += '        if(app[prop].classname == "feedreader.view.PreferenceWindow") {';
  func += '        visibility = app[prop].getVisibility();';
  func += '      }';
  func += '    }';
  func += '    catch(ex) {}';
  func += '  }';
  func += '  return visibility;';
  func += '}';
  func += 'getPrefWinVisibility() == "visible";';
  return func;  
}

function getObjectByClassnameSel(parent,classname)
{
  var func = '';
  func += '(function() {';
  func += '  var parent = ' + parent + ';';  
  func += '  var searchterm = "' + classname + '";';
  func += '  var obj = null;';  
  func += '  for (prop in parent) {';
  func += '    var property = parent[prop];';
  func += '    try {';
  func += '      if (typeof property == "object") {';
  func += '        if(property.classname == searchterm) {';
  func += '          obj = property;';
  func += '        }';
  func += '      }';
  func += '    }';
  func += '    catch(ex) {}';
  func += '  }';
  func += '  return obj;';
  func += '})()';

  return func;  
}

function checkArticle()
{
  print("Checking for article");
  var article = null;
  try {
    var tempFunc = getObjectByClassnameSel(selWin + "." + qxApp, "feedreader.view.Article");
    tempFunc += ".getArticle()"
    article = sel.getEval(tempFunc);
  }
  catch(ex) {
    totalErrors ++;
    print("ERROR while selecting article: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Failed to select article: ' + ex + ' </div></div>'));    
  }  

  if (article != "null") {
    print("Article found.");
  }
  else {
    totalErrors ++;
    print("ERROR: No Article found.");
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">No article found after selecting the first item of the first feed.</div></div>'));    
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

function runTests()
{

  var startTime = new Date();

  print("Waiting for feeds to load...");
  
  var lastFeedNum = sel.getEval(treeFunc + ".getItems().length - 1"); 
   
  var isLastFeedLoaded = treeFunc + ".getItems()[" + lastFeedNum + "].getIcon().indexOf('internet-feed-reader.png') >= 0";
  
  try {
    sel.waitForCondition(isLastFeedLoaded, testPause);
  }
  catch(ex) {
    print("Couldn't determine if all feeds loaded correctly.");
    sel.getEval(browserLog("<DIV>ERROR: Unable to determine if all feeds loaded correctly.</DIV>"));
    return;
  }
  
  print("Getting last feed's label");
  var getLastFeedLabel = treeFunc + ".getItems()[" + lastFeedNum + "].getLabel()";
  var lastFeedLabel = sel.getEval(getLastFeedLabel); 
  print("Last feed's label: " + lastFeedLabel);
 
  sel.setSpeed("1000");
  
  sel.getEval(treeReset);

  print("Selecting first feed from list.");  
  try {
    sel.qxClick("qxh=app:qx.ui.tree.Tree/child[1]");  
  }
  catch(ex) {
    totalErrors ++;
    print("ERROR while selecting feed: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Failed to select feed: ' + ex + ' </div></div>'));    
  }
  
  print("Selecting first feed item.");
  
  try {
    sel.qxClick('qxh=app:[@classname="feedreader.view.List"]/qx.ui.form.List/child[0]');  
  }
  catch(ex) {
    totalErrors ++;
    print("ERROR while selecting article: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Failed to select article: ' + ex + ' </div></div>'));    
  }  

  checkArticle();
  
  print("Getting initial 'Static Feeds' label.");
  var oldLabel = null;
  try {
    oldLabel = sel.getEval(staticFeedsLabel);
  }
  catch(ex) {
    totalErrors ++;
    print("ERROR getting 'Static Feeds' label: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Failed to get Static Feeds label: ' + ex + ' </div></div>'));    
  }

  print("Initial label: " + oldLabel);

  // Use the preferences window to change the application language
  print("Clicking Preferences button.");  
  try {    
    sel.qxClick("qxh=qx.ui.container.Composite/child[1]/qx.ui.toolbar.Part/child[5]");
    print("Waiting for Preferences window to open.");    
    
    sel.waitForCondition(isPrefWindowVisible, 10000);    
  }
  catch(ex) {
    totalErrors ++;
    print("ERROR while opening language window: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Failed to open language window: ' + ex + ' </div></div>'));    
  }
  
  Packages.java.lang.Thread.sleep(2000);
    
  print("Selecting language.");
  try {        
    sel.qxClick('qxh=app:[@caption=".*"]/qx.ui.groupbox.GroupBox/[@label="Italiano"]');
    Packages.java.lang.Thread.sleep(2000);
    // click again just to be sure (bug #2193)
    sel.qxClick('qxh=app:[@caption=".*"]/qx.ui.groupbox.GroupBox/[@label="Italiano"]');
  }
  catch(ex) {
    totalErrors ++;
    print("ERROR while selecting language: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Failed to select language: ' + ex + ' </div></div>'));    
  }
  
  print("Clicking OK.");
  try {      
    sel.qxClick('qxh=app:[@caption=".*"]/qx.ui.container.Composite/[@label="OK"]');    
    print("Waiting for Preferences window to close.");
    Packages.java.lang.Thread.sleep(2000);
    if (sel.getEval(isPrefWindowVisible) == "true") {
      sel.qxClick('qxh=app:[@caption=".*"]/qx.ui.container.Composite/[@label="OK"]');
    }
    sel.waitForCondition(isPrefWindowHidden, 10000);
  }
  catch(ex) {
    totalErrors ++;
    print("ERROR while clicking OK in Preferences window: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Failed to click OK button in Preferences window: ' + ex + ' </div></div>'));    
  }    
    
  print("Getting new 'Static Feeds' label.");
  var newLabel = null;
  try {
    newLabel = sel.getEval(staticFeedsLabel);
  }
  catch(ex) {
    totalErrors ++;
    print("ERROR getting 'Static Feeds' label: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Failed to get Static Feeds label: ' + ex + ' </div></div>'));    
  }
  
  print("New label: " + newLabel);
  
  if (oldLabel != newLabel) {
    print("Language changed successfully.")
  } 
  else {
    totalErrors ++;
    print("ERROR: Unexpected Label: " + newLabel);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Unexpected Label "' + newLabel + '" . Language selection failed?</div></div>'));    
  }  
  
  // Add a feed
  print("Adding new feed.");
  try {
    sel.qxClick('qxh=qx.ui.container.Composite/child[1]/qx.ui.toolbar.Part/child[0]');
    print("Waiting for Add Feed window to open.");
    sel.waitForCondition(isAddFeedWindowVisible, 10000);
    Packages.java.lang.Thread.sleep(2000);    
    var addLabel = sel.getEval(addFeedWindowLabel);
    print("Add Feed window's label: " + addLabel);
    if (addLabel.indexOf('Aggiungi') < 0 ) {
      totalErrors ++;
      print('ERROR: Feed window has unexpected title "' + addLabel + '". Possible translation problem.');
      sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Feed window has unexpected title ' + addLabel + '. Possible translation problem.</div></div>'));
    }
    print("Entering new feed title.");
    sel.type('qxh=app:[@caption=".*feed.*"]/qx.ui.groupbox.GroupBox/child[1]', 'Golem');
    print("Entering new feed URL.");
    sel.type('qxh=app:[@caption=".*feed.*"]/qx.ui.groupbox.GroupBox/child[3]', 'http://rss.golem.de/rss.php?feed=ATOM1.0');
    print("Clicking 'Add'.");
    sel.qxClick('qxh=app:[@caption=".*feed.*"]/qx.ui.form.Button');
    print("Waiting for Add Feed window to close.");
    Packages.java.lang.Thread.sleep(2000);
    var winVis = sel.getEval(isAddFeedWindowVisible);
    if (winVis == "true") {
      print("Window still visible, clicking again " + winVis);
      sel.qxClick('qxh=app:[@caption=".*feed.*"]/qx.ui.form.Button');
    }
    sel.waitForCondition(isAddFeedWindowHidden, 10000);
  }
  catch(ex) {
    totalErrors ++;
    print("ERROR while adding feed: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Error while adding feed: ' + ex + ' </div></div>'));    
  }

  print("Waiting for new feed to load.");
  var newLastFeedNum = null;
  try {
    newLastFeedNum = sel.getEval(treeFunc + ".getItems().length - 1");  
    var isNewLastFeedLoaded = treeFunc + ".getItems()[" + newLastFeedNum + "].getIcon().indexOf('internet-feed-reader.png') >= 0";
    sel.waitForCondition(isNewLastFeedLoaded, testPause);
  }
  catch(ex) {
    totalErrors++;
    print("ERROR: New feed did not load correctly. " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">New feed did not load correctly: ' + ex + ' </div></div>'));    
  }
    
  try {
    var getLastFeedLabel = treeFunc + ".getItems()[" + newLastFeedNum + "].getLabel()";
    var lastFeedLabel = sel.getEval(getLastFeedLabel);
    print("New Feed's label: " + lastFeedLabel);
  }
  catch(ex) {
    totalErrors++;
    print("ERROR: Unable to get new feed label: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Unable to get new feed label: ' + ex + ' </div></div>'));    
  }
  
  if (lastFeedLabel == "Golem") {
    print("New feed entry in list.")
  }
  else {
    totalErrors++;
    print("ERROR: Unexpected feed Label.");
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Unexpected label. New feed not added?</div></div>'));
  }
  
  print("Selecting new feed.");
  try {
    var treeLastSelect = treeFunc + ".addToSelection(" + treeFunc + ".getItems()[" + newLastFeedNum + "])";
    sel.getEval(treeLastSelect);    
  }
  catch(ex) {
    totalErrors++;
    print("ERROR: Unable to select new feed: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Unable to select new feed: ' + ex + '</div></div>'));    
  }
  
  print("Selecting first item from new feed.");
  
  try {
    sel.qxClick('qxh=app:[@classname="feedreader.view.List"]/qx.ui.form.List/child[0]');  
  }
  catch(ex) {
    totalErrors ++;
    print("ERROR while selecting article from new feed: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Failed to select article from new feed: ' + ex + ' </div></div>'));    
  }
  
  checkArticle();
  
  logTestDuration(getTestDuration(startTime));

  sel.getEval(browserLog("<p>Feedreader ended with warnings or errors: " + totalErrors + "</p>"));
  

}

// - Main --------------------------------------------------------------------

print("Starting Feedreader session with browser " + config.testBrowser);
var sel = new QxSelenium(config.selServer,config.selPort,config.testBrowser,config.autHost);
sel.start();
sel.setTimeout(120000);
sel.open(config.autHost + config.autPath);
sel.setSpeed(stepSpeed);

var agent = sel.getEval(usrAgent);
var plat = sel.getEval(platform);
var now = currentDate.toLocaleString();

sel.getEval(browserLog("<h1>Feedreader results from " + now + "</h1>"));
sel.getEval(browserLog("<p>Application under test: <a href=\"" + config.autHost + config.autPath + "\">" + config.autHost + config.autPath + "</a>"));
sel.getEval(browserLog("<p>Platform: " + plat + "</p>"));
sel.getEval(browserLog("<p>User agent: " + agent + "</p>"));

try {
  sel.waitForCondition(isQxReady, "60000");
}
catch(ex) {
  print("Couldn't find qx instance in AUT window.");
  sel.getEval(browserLog("<DIV>ERROR: Unable to find qx instance in AUT window.</DIV>"));
}

try {
  runTests();
}
catch(ex) {
  print("Unexpected error during test run: " + ex);
  sel.getEval(browserLog("<DIV>ERROR: Unexpected error during test run: " + ex + "</DIV>"));
}

sel.stop();
print("Test Runner session finished.");
