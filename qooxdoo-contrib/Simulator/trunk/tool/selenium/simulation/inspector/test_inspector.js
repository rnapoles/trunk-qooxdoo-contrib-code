var baseConf = {
  'autName' : 'Inspector',
  'globalTimeout' : 300000,
  'stepSpeed' : '250',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*custom /usr/lib/firefox-3.0.11/firefox -no-remote -P selenium-3',
  'browserId' : 'Firefox 3.0.11',
  'autHost' : 'http://localhost',
  'autPath' : '/qx/trunk/qooxdoo/component/inspector/build/index.html',
  'simulatorSvn' : '/home/dwagner/workspace/qooxdoo.contrib/Simulator',
  'debug' : true,
  'inspectedApplication' : '/qx/trunk/qooxdoo/application/feedreader/build/',
  'expectedWindows' : "inspector.objects.ObjectsWindow,inspector.widgets.WidgetsWindow,inspector.property.PropertyWindow,inspector.console.ConsoleWindow"
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

var selWin = 'selenium.qxStoredVars["autWindow"]';
var qxAppInst = simulation.Simulation.QXAPPINSTANCE;

simulation.Simulation.prototype.addAppChecker = function()
{
  checkApp = function() {
    var ready = false;
    try {
      if (selenium.qxStoredVars["autWindow"].qx.core.Init.getApplication()._loadedWindow.qx.core.Init.getApplication()) {
        ready = true;
      }
    }
    catch(ex) {}
    return ready;
  };
  
  this.addOwnFunction("checkApp", checkApp);
};

simulation.Simulation.prototype.addWindowChecker = function()
{
  checkWindows = function(expectedWindows) {
    var windowClassNames = expectedWindows.split(",");
    var foundWindows = [];
    var kids = selenium.qxStoredVars['autWindow'].qx.core.Init.getApplication().getRoot().getChildren();
    for (var i=0,l=kids.length; i<l; i++) {
      for (var j=0,m=windowClassNames.length; j<m; j++) {
        var kidName = kids[i].classname;
        var windowClassName = windowClassNames[j];
        if (kidName == windowClassName) {
         foundWindows.push(kidName);
        }
      }
    }
    return foundWindows.join(",");
  };
  
  this.addOwnFunction("checkWindows", checkWindows);
};

simulation.Simulation.prototype.checkWindows = function()
{
  this.addWindowChecker();
  var expectedWindows = this.getConfigSetting("expectedWindows");
  var callCheckWindows = selWin + ".qx.Simulation.checkWindows('" + expectedWindows + "');";
  var foundWindows = this.getEval(callCheckWindows, "Checking inspector windows");
  
  var foundArray = String(foundWindows).split(",");
  var expectedArray = expectedWindows.split(",");
  
  if (this.getConfigSetting("debug")) {
    print("Expected windows: " + expectedWindows);
    print("Found windows: " + String(foundWindows));
  }
  
  function filterArr(item) {
    for (var i=0; i<foundArray.length; i++) {
      if (item == foundArray[i]) {
        return false;
      }
    }
    return true;
  }
  
  missingArray = expectedArray.filter(filterArr);
  
  if (missingArray.length > 0) {
    this.log("Expected window(s) not present: " + missingArray.join(","), "error");
  }
  else {
    this.log("Found all expected Inspector window objects: " + expectedWindows, "info");
  }
};

simulation.Simulation.prototype.runTest = function()
{
  var inspectedAppPath = this.getConfigSetting("inspectedApplication");
  if (this.getConfigSetting("debug")) {
    print("Loading application " + inspectedAppPath + " in Inspector");
  }
  // Temporary workaround until QxSelenium.qxType and qxType work reliably.
  this.__sel.type("xpath=//input", inspectedAppPath);
  Packages.java.lang.Thread.sleep(10000);

  var inspectedAppLoaded = "selenium.qxStoredVars['autWindow'].qx.core.Init.getApplication()._loadedWindow.qx.core.Init.getApplication()";
  var isAppReady = mySim.waitForCondition(inspectedAppLoaded, 100000, 
                                          "Waiting for inspected application");
  
  if (isAppReady) {
    this.log("Inspected application loaded in Inspector", "info");
  }
  else {
    this.testFailed = true;
    this.log("Inspected application not loaded!", "error");    
    return;
  }

  this.checkWindows();
  
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