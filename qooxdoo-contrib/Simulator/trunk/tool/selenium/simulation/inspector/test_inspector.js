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
  'inspectedApplication' : '/qx/trunk/qooxdoo/application/feedreader/build/'
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

mySim.locators = {
  inspectorToolBar : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar",
  inspectedAppRoot : "qxh=qx.ui.container.Composite/qx.ui.embed.Iframe/qx.ui.root.Application",
  windowWidgets : "qxh=[@classname=inspector.widgets.WidgetsWindow]",
  windowProperty : "qxh=[@classname=inspector.property.PropertyWindow]",
  windowObjects : "qxh=[@classname=inspector.objects.Window]",
  windowConsole : "qxh=[@classname=inspector.console.ConsoleWindow]",
  windowSelenium : "qxh=[@classname=inspector.selenium.SeleniumWindow]",
  buttonObjects : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/[@label=Objects]",
  buttonWidgets : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/[@label=Widgets]",
  buttonProperties : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/[@label=Properties]",
  buttonConsole : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/[@label=Console]",
  buttonSelenium : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/[@label=Selenium]"
};

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

simulation.Simulation.prototype.checkWindows = function()
{
  for (locName in this.locators) {
    if (locName.indexOf("window") == 0) {
      try {
        this.__sel.qxClick(this.locators[locName]);
        this.log("Found window " + locName.substr(6), "info");
      } catch (ex) {
        var errMsg = "Error while checking window " + locName.substr(6) + ": ";
        if (locName == "windowObjects") {
          try {
            this.__sel.qxClick("qxh=[@classname=inspector.objects.ObjectsWindow]");
            this.log("Found window Objects", "info");
          } catch(ex) {
            this.log(errMsg + ex, "error");
          }
        } else {
          this.log(errMsg + ex, "error");
        }
      }
    }
  }
};

simulation.Simulation.prototype.checkButtons = function()
{
  for (locName in this.locators) {
    if (locName.indexOf("button") == 0) {
      var loc = this.locators[locName];
      var buttonValue = null;
      try {
        buttonValue = this.__sel.qxObjectExecFunction(loc, "getValue");
      } catch(ex) {
        this.log("Error checking button value: " + ex, "error");
      }
      
      if (buttonValue == "false") {
        this.qxClick(loc, "", "Clicking button");
        Packages.java.lang.Thread.sleep(3000);
      }
     
    }
  }
};

simulation.Simulation.prototype.testInspectWidget = function()
{
  var selectedWidgetOld = String(this.__sel.qxObjectExecFunction(this.locators.inspectorToolBar + "/child[8]", "getValue"));
  
  this.qxClick(this.locators.inspectorToolBar + '/[@label="Inspect widget"]', "", "Clicking Inspect widget button");
  Packages.java.lang.Thread.sleep(2000);
  this.qxClick(this.locators.inspectedAppRoot + '/qx.ui.core.Widget', "clientX=200,clientY=200", "Clicking in inspected application");
  Packages.java.lang.Thread.sleep(100000000);
  
  var selectedWidget = String(this.__sel.qxObjectExecFunction(this.locators.inspectorToolBar + "/child[8]", "getValue"));
  if (selectedWidget == selectedWidgetOld) {
    this.log("No new widget selected!", "error");
  } else {
    this.log("Inspect widget found: " + selectedWidget, "info");
  }
};

simulation.Simulation.prototype.runTest = function()
{  
  var inspectedAppPath = this.getConfigSetting("inspectedApplication");
  if (this.getConfigSetting("debug")) {
    print("Loading application " + inspectedAppPath + " in Inspector");
  }
  this.qxType("xpath=//input", inspectedAppPath);
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

  this.checkButtons();
  this.checkWindows();
  
  // TODO: reload - workaround for inspector bug
  
  var toolbarEnabled = String(this.__sel.qxObjectExecFunction(this.locators.inspectorToolBar, "getEnabled"));
  if (toolbarEnabled == "false") {
    this.log("Inspector toolbar is disabled!", "error");
  }
  else {
    this.log("Inspector toolbar is enabled.", "info");
    //this.testInspectWidget();
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