var baseConf = {
  'autName' : 'APIViewer',
  'globalTimeout' : 300000,
  'stepSpeed' : '500',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*custom /usr/lib/firefox-3.0.10/firefox -no-remote -P selenium-3',
  'autHost' : 'http://localhost',
  'autPath' : '/~dwagner/workspace/qooxdoo.trunk/framework/api/index.html',
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
var qxAppInst = simulation.Simulation.QXAPPINSTANCE;
var logHtml = selWin + "." + qxAppInst + ".logelem.innerHTML";

simulation.Simulation.prototype.runTest = function()
{
  // Make sure the locale is 'en' to simplify dealing with log messages.
  var setLocale = "qx.locale.Manager.getInstance().setLocale('en')";  
  this.runScript(setLocale, "Setting application locale to EN");
  
  // Add a function that finds span tags with the given content
  var getSpanByContent = function(content) {
    var found = false;
    var spans = selenium.browserbot.getCurrentWindow().document.getElementsByTagName("span");
    for (var i=0,l=spans.length; i<l; i++) {
      if (spans[i].innerHTML.indexOf(content) == 0) {
        found = true;
      }
    }
    return found;
  };
  
  this.addOwnFunction("getSpanByContent", getSpanByContent);
  
  this.checkSearch();
  this.checkView("getActive", "Expand properties");
  this.checkView("addChildrenToQueue", "Show Inherited");
  this.checkView("_activateMoveHandle", "Show Protected");
  this.checkView("__computeMoveCoordinates", "Show Private");
  
};

simulation.Simulation.prototype.checkSearch = function()
{
  this.qxClick("qxh=app:viewer/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/child[1]", "", "Clicking search button");
  /*
  this.qxType("qxh=app:viewer/[@_searchView]/qx.ui.container.Composite/qx.ui.form.TextField", "qx.ui.window.Windo");
  Packages.java.lang.Thread.sleep(2000);
  // execute typeKeys once so all needed events are fired.
  this.qxTypeKeys("qxh=app:viewer/[@_searchView]/qx.ui.container.Composite/qx.ui.form.TextField", "w");
  */
 
  // Temporary workaround until QxSelenium.qxType and qxType work reliably.
  this.__sel.type("xpath=//input", "qx.ui.window.Windo");
  // execute typeKeys once so all needed events are fired.
  this.__sel.typeKeys("xpath=//input", "w");
  
  Packages.java.lang.Thread.sleep(1000);
  
  this.qxTableClick("qxh=app:viewer/[@_searchView]/qx.ui.table.Table","row=0");
  
  Packages.java.lang.Thread.sleep(4000);

  // Check if the HTML embed's content has changed.
  var classViewerHtmlScript = selWin + '.document.getElementById("ClassViewer").innerHTML';
  var classViewerHtml = this.getEval(classViewerHtmlScript);
  if (!(classViewerHtml.indexOf("qx.ui.window.Window") > 0)) {
    this.log("Unexpected class viewer HTML content", "error");
  }
  else {
    this.log("Successfully opened search result", "info");
  }  
};

simulation.Simulation.prototype.checkView = function(newMethodName, buttonLabel)
{
  this.qxClick("qxh=app:viewer/qx.ui.toolbar.ToolBar/child[2]/qx.ui.toolbar.MenuButton", "", "Clicking View menu button");
  this.qxClick('qxh=app:viewer/qx.ui.toolbar.ToolBar/child[2]/qx.ui.toolbar.MenuButton/qx.ui.menu.Menu/[@label="' + buttonLabel + '"]', "", "Clicking " + buttonLabel);
  Packages.java.lang.Thread.sleep(3000);
  var foundNewMethod = this.getEval(selWin + ".qx.Simulation.getSpanByContent('" + newMethodName + "');", "Checking for " + buttonLabel + " documentation");
  
  if (String(foundNewMethod) != "true") {
    this.log("Documentation for " + newMethodName + " not found, possible problem with " + buttonLabel, "error");
  }
  else {
    this.log(buttonLabel + " checked: OK", "info");
  }
};

// - Main --------------------------------------------------------------------
(function() { 
  mySim.testFailed = false;

  var sessionStarted = mySim.startSession();
  
  if (!sessionStarted) {
    return;
  }

  var isAppReady = mySim.waitForCondition(simulation.Simulation.ISQXAPPREADY, 60000, 
                                          "Waiting for qooxdoo application");


  if (!isAppReady) {
    mySim.testFailed = true;
    mySim.stop();
    return;
  }

  try {
    mySim.addGlobalErrorHandler();
    mySim.runTest();
  }
  catch(ex) {
    mySim.testFailed = true;
    var msg = "Unexpected error while running test!";
    if (mySim.getConfigSetting("debug")) {
      print(msg + "\n" + ex);
    }
    mySim.log(msg + "<br/>" + ex, "error");
  }

  mySim.logGlobalErrors();
  mySim.logResults();

  mySim.stop();

})();