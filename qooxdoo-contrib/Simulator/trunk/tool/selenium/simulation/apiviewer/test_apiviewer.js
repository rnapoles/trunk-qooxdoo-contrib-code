importClass(Packages.com.thoughtworks.selenium.QxSelenium);

// - Config Section ------------------------------------------------------------
var config = {
  selServer   : "localhost",
  selPort     : 4444,
  testBrowser : "*custom /usr/lib/firefox-3.0.8/firefox -no-remote -P selenium-3",
  autHost     : "http://172.17.12.142",
  autPath     : "/qx/trunk/qooxdoo/framework/api/index.html"
};

var stepSpeed  = "250"; // millisecs after each command
var testPause = 360000; // millisecs to wait for all tests to finish
var selWin = "selenium.browserbot.getCurrentWindow()"; // get application iframe
var qxApp = "qx.core.Init.getApplication().viewer";
var isQxReady = 'var qxReady = false; try { if (' + selWin + "." + qxApp + ') { qxReady = true; } } catch(e) {} qxReady;'; // check if testrunner instance exists

var setLocale = "qx.locale.Manager.getInstance().setLocale('en')";
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
    var regIe8Comp = /.*MSIE 7\.0.*(Trident)/;
    var match = regIe8Comp.exec(agent);
    if (match) {
      browser = "Internet Explorer 8 in IE7 compatibility mode";
    }
    var regIe8Std = /.*MSIE 8\.0.*(Trident)/;
    var match1 = regIe8Std.exec(agent);
    if (match1) {
      browser = "Internet Explorer 8 in standards mode";
    }
    if (!browser) {
      var regIe = /.*MSIE ([\d\.]*)/;
      var match2 = regIe.exec(agent);
      if (match2) {
        browser = "Internet Explorer " + match2[1];
      }
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

function runTests()
{
  // Make sure the locale is 'en' to simplify dealing with log messages.  
  sel.runScript(setLocale);
  
  try {
    sel.qxClick("qxh=app:viewer/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/child[1]");
  }
  catch(ex) {
    totalErrors++;
    print("Pressing Search button failed: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Pressing Search button failed: ' + ex + '</div></div>'));    
  }
  
  try {    
    sel.type("qxh=app:viewer/[@_searchView]/qx.ui.container.Composite/qx.ui.form.TextField", "Windo");
    // Use typeKeys for the last letter because it simulates all events (keyDown, keyUp, keyPress).
    // Otherwise the search function won't be called.
    sel.typeKeys("qxh=app:viewer/[@_searchView]/qx.ui.container.Composite/qx.ui.form.TextField", "w");
  }
  catch(ex) {
    totalErrors++;
    print("Entering search term failed: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Entering search term failed: ' + ex + '</div></div>'));    
  }
  
  try {
    sel.qxClickAt("qxh=app:viewer/[@_searchView]/qx.ui.table.Table/qx.ui.container.Composite/qx.ui.table.pane.Scroller/qx.ui.table.pane.Pane","100,100");
  }
  catch(ex) {
    totalErrors++;
    print("Selecting search result failed: " + ex);
    sel.getEval(browserLog('<div class="qxappender"><div class="level-error">Selecting search result failed: ' + ex + '</div></div>'));    
  }
  // Check if the HTML embed's content has changed.
  //app._classViewer.getHtml()
  
  // Select a specific class from the tree, expand properties, ... 
  
  

  sel.getEval(browserLog("<p>API Viewer ended with warnings or errors: " + totalErrors + "</p>"));
  
}

// - Main --------------------------------------------------------------------

print("Starting API Viewer session with browser " + config.testBrowser);
var sel = new QxSelenium(config.selServer,config.selPort,config.testBrowser,config.autHost);
sel.start();
sel.setTimeout(60000);
sel.open(config.autHost + config.autPath);
sel.setSpeed(stepSpeed);

var agent = sel.getEval(usrAgent);
var plat = sel.getEval(platform);

var browser = getBrowser(agent);

sel.getEval(browserLog("<h1>API Viewer results from " + currentDate.toLocaleString() + "</h1>"));
sel.getEval(browserLog("<p>Application under test: <a href=\"" + config.autHost + config.autPath + "\">" + config.autHost + config.autPath + "</a>"));
if (browser) {
  sel.getEval(browserLog("<p>Browser: " + browser + " on " + plat + "</p>"));
}
sel.getEval(browserLog("<p>User agent: " + agent + "</p>"));

try {
  sel.waitForCondition(isQxReady, "60000");
  runTests();  
}
catch(ex) {
  print("Couldn't find qx instance in AUT window.");
  sel.getEval(browserLog("<DIV>ERROR: Unable to find qx instance in AUT window.</DIV>"));
}

sel.stop();
print("API Viewer session finished.");
