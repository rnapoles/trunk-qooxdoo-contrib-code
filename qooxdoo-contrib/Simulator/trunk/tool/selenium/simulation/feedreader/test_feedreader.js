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
var tree = selWin + ".qx.core.Init.getApplication()._treeView"; // get feed tree
var lastFeedNum = tree +".getItems().length - 1";
var treeReset = tree + ".resetSelection()";
var treeSelect = tree + ".addToSelection(" + tree + ".getItems()[1])"; // select qooxdoo news feed
var list = selWin + ".qx.core.Init.getApplication()._listView._list"; // get feed item list
var listSelect = list +  ".addToSelection(" + list + ".getChildren()[0])"; // select first feed item
var article = selWin + ".qx.core.Init.getApplication()._articleView.getArticle()"; // the article - null if no item selected
var isArticle = article + " instanceof selenium.browserbot.getCurrentWindow().feedreader.model.Article";
var staticFeedsLabel = tree + ".getItems()[0].getContentElement().getChildren()[2].getChildren()[0].getDomElement().childNodes[0].value";
var isQxReady = 'var qxReady = false; try { if (selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication()._treeView) { qxReady = true; } } catch(e) {} qxReady;'; // check if testrunner instance exists
var usrAgent = 'navigator.userAgent';
var platform = 'navigator.platform';
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

  sel.getEval(browserLog("<h1>Feedreader results from " + currentDate.toLocaleString() + "</h1>"));
  sel.getEval(browserLog("<p>Application under test: <a href=\"" + config.autHost + config.autPath + "\">" + config.autHost + config.autPath + "</a>"));
  if (browser) {
    sel.getEval(browserLog("<p>Browser: " + browser + " on " + plat + "</p>"));
  }
  sel.getEval(browserLog("<p>User agent: " + agent + "</p>"));

  print("Waiting for feeds to load..."); 
  var lastFeed = sel.getEval(lastFeedNum);
  var isLastFeedLoaded = tree + ".getItems()[" + lastFeed + "].getIcon().indexOf('internet-feed-reader.png') >= 0";
  sel.waitForCondition(isLastFeedLoaded, testPause);
  
  var getLastFeedLabel = tree + ".getItems()[" + lastFeed + "].getLabel()";
  var lastFeedLabel = sel.getEval(getLastFeedLabel); 
  print("Last feed's label: " + lastFeedLabel);
  
  
  sel.setSpeed("1000");

  // select a feed/item.
  sel.getEval(treeReset);
  print("Selecting first feed from list.");
  sel.getEval(treeSelect);
  print("Selecting first feed item.");
  sel.getEval(listSelect);
  print("Checking for article");
  var isArt = sel.getEval(isArticle);
  if (isArt) {
    print("Article found.");
  }
  else {
    totalErrors ++;
    print("ERROR: No Article found.");
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">No article found after selecting the first item of the first feed.</div></div>'));    
  }
  
  // Use the preferences window to change the application language 
  sel.qxClick('qxh=app:[@_toolBarView]/qx.ui.toolbar.Part/[@label="Preferences"]');
  sel.qxClick('qxh=app:[@_prefWindow]/qx.ui.groupbox.GroupBox/[@label="Deutsch"]');
  sel.qxClick('qxh=app:[@_prefWindow]/qx.ui.container.Composite/[@label="OK"]');
  var label = sel.getEval(staticFeedsLabel);
  if (label.indexOf("Vordefinierte Quellen") >= 0) {
    print("Language changed successfully.")
  } 
  else {
    totalErrors ++;
    print("ERROR: Unexpected Label.");
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Unexpected Label. Language selection failed?</div></div>'));    
  }
  
  // Add a feed
  print("Adding new feed.");
  sel.qxClick('qxh=app:[@_toolBarView]/qx.ui.toolbar.Part/[@label="Add feed"]');
  sel.type('qxh=app:[@_addFeedWindow]/[@_titleTextfield]', 'Golem');
  sel.type('qxh=app:[@_addFeedWindow]/[@_urlTextfield]', 'http://rss.golem.de/rss.php?feed=ATOM1.0');
  sel.qxClick('qxh=app:[@_addFeedWindow]/[@label="Add"]');
  
  lastFeed = sel.getEval(lastFeedNum);
  isLastFeedLoaded = tree + ".getItems()[" + lastFeed + "].getIcon().indexOf('internet-feed-reader.png') >= 0";
  print("Waiting for new feed to load.");
  sel.waitForCondition(isLastFeedLoaded, testPause);
  
  var getLastFeedLabel = tree + ".getItems()[" + lastFeed + "].getLabel()";
  var lastFeedLabel = sel.getEval(getLastFeedLabel); 
  
  if (lastFeedLabel == "Golem") {
    print("New feed entry in list.")
  }
  else {
    totalErrors++;
    print("Error: Unexpected Feed Label.");
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Unexpected Label. New feed not added?</div></div>'));
  }
  
  print("Selecting new feed.");
  var treeLastSelect = tree + ".addToSelection(" + tree + ".getItems()[" + lastFeed + "])";
  sel.getEval(treeLastSelect);
  print("Selecting first item from new feed.");
  sel.getEval(listSelect);
  
  isArt = sel.getEval(isArticle);
  if (isArt) {
    print("New feed article found.");
  }
  else {
    totalErrors ++;
    print("ERROR: No Article found.");
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">No article found after selecting the first item of the newly added feed.</div></div>'));   
  }
  
  sel.getEval(browserLog("<p>Feedreader ended with warnings or errors: " + totalErrors + "</p>"));
  

}

// - Main --------------------------------------------------------------------

print("Starting Feedreader session with browser " + config.testBrowser);
var sel = new QxSelenium(config.selServer,config.selPort,config.testBrowser,config.autHost);
sel.start();
sel.open(config.autHost + config.autPath);
sel.setSpeed(stepSpeed);

runTests();

sel.stop();
print("Test Runner session finished.");
