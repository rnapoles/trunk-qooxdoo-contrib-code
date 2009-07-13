var baseConf = {
  'autName' : 'APIViewer',
  'globalTimeout' : 300000,
  'stepSpeed' : '250',
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
  
  this.qxClick("qxh=app:viewer/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/child[1]", "", "Clicking search button");
  
  this.type("qxh=app:viewer/[@_searchView]/qx.ui.container.Composite/qx.ui.form.TextField", "qx.ui.window.Windo");
  // execute typeKeys once so all needed events are fired. 
  this.typeKeys("qxh=app:viewer/[@_searchView]/qx.ui.container.Composite/qx.ui.form.TextField", "w");
  
  Packages.java.lang.Thread.sleep(2000);
  
  this.qxTableClick("qxh=app:viewer/[@_searchView]/qx.ui.table.Table","row=0");
  
  Packages.java.lang.Thread.sleep(4000);

  // Check if the HTML embed's content has changed.
  var classViewerHtmlScript = selWin + '.document.getElementById("ClassViewer").innerHTML';
  var classViewerHtml = this.getEval(classViewerHtmlScript);
  if (!(classViewerHtml.indexOf("qx.ui.window") > 0)) {
    this.log("Unexpected class viewer HTML content", "error");
  }
  else {
    this.log("Successfully opened search result", "info");
  }
  
  // Select a specific class from the tree, expand properties, ...
  
};


// - Main --------------------------------------------------------------------
(function() { 
  mySim.testFailed = false;
  mySim.errWarn = 0;

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

  if (!mySim.testFailed) {
    if (mySim.getConfigSetting("debug")) {
      print("Test run finished successfully.");
    }
    var errors = mySim.getTotalErrorsLogged() + mySim.errWarn;
    mySim.log("APIViewer ended with warnings or errors: " + errors, "info");
  }

  mySim.logTestDuration();
  mySim.stop();

})();