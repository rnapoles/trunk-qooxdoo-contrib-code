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
  'windowMaximize' : true,
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
  inspectButton : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/[@label='Inspect']",
  inspectedWidgetLabel : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/child[9]",
  inspectedAppRoot : "qxh=qx.ui.container.Composite/qx.ui.embed.Iframe/qx.ui.root.Application",
  windowWidgets : "qxh=[@classname=inspector.widgets.WidgetsWindow]",
  windowWidgetsTree : "qxh=[@classname=inspector.widgets.WidgetsWindow]/[@classname=inspector.widgets.View]/qx.ui.tree.Tree",
  windowProperty : "qxh=[@classname=inspector.property.PropertyWindow]",
  windowPropertyInspectedAtom : "qxh=[@classname=inspector.property.PropertyWindow]/[@classname=inspector.property.View]/qx.ui.container.Scroll/[@classname=inspector.property.PropertyList]/qx.ui.basic.Atom",
  windowObjects : "qxh=[@classname=inspector.objects.Window]",
  windowObjectsReloadButton : "qxh=[@classname=inspector.objects.Window]/[@classname=inspector.objects.View]/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Button",
  windowObjectsTextField : "qxh=[@classname=inspector.objects.Window]/[@classname=inspector.objects.View]/qx.ui.toolbar.ToolBar/qx.ui.form.TextField",
  windowConsole : "qxh=[@classname=inspector.console.ConsoleWindow]",
  windowSelenium : "qxh=[@classname=inspector.selenium.SeleniumWindow]",
  windowSeleniumToolbarFirstPart : "qxh=[@classname=inspector.selenium.SeleniumWindow]/[@classname=inspector.selenium.View]/qx.ui.toolbar.ToolBar/child[0]",
  windowSeleniumOptionsButton : "qxh=[@classname=inspector.selenium.SeleniumWindow]/[@classname=inspector.selenium.View]/qx.ui.toolbar.ToolBar/child[3]/qx.ui.toolbar.Button",
  windowSeleniumOptions : "qxh=[@classname=inspector.selenium.OptionsWindow]",
  windowSeleniumOptionsSeleniumCoreField : "qxh=[@classname=inspector.selenium.OptionsWindow]/qx.ui.container.Composite/qx.ui.form.renderer.Single/child[2]",
  windowSeleniumOptionsUserExtensionsField : "qxh=[@classname=inspector.selenium.OptionsWindow]/qx.ui.container.Composite/qx.ui.form.renderer.Single/child[4]",
  windowSeleniumOptionsOkButton : "qxh=[@classname=inspector.selenium.OptionsWindow]/qx.ui.container.Composite/qx.ui.form.renderer.Single/qx.ui.container.Composite/[@label=OK]",
  buttonObjects : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/[@label=Objects]",
  buttonWidgets : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/[@label=Widgets]",
  buttonProperties : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/[@label=Properties]",
  buttonConsole : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/[@label=Console]",
  buttonSelenium : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/[@label=Selenium]",
  toolbarButtonOverflow : "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/[@icon=media-seek-forward\.png]",
  windowConsoleHtml : "qxh=[@classname=inspector.console.ConsoleWindow]/[@classname=inspector.console.View]/qx.ui.container.Stack/[@classname=inspector.console.ConsoleView]/qx.ui.embed.Html",
  windowConsoleTextField : "qxh=[@classname=inspector.console.ConsoleWindow]/[@classname=inspector.console.View]/qx.ui.container.Stack/[@classname=inspector.console.ConsoleView]/qx.ui.container.Composite/qx.ui.form.TextField",
  windowObjectsTable : "qxh=[@classname=inspector.objects.Window]/[@classname=inspector.objects.View]/qx.ui.table.Table",
  catchClickLayer : "qxhv=qx.ui.container.Composite/qx.ui.embed.Iframe/qx.ui.root.Application/[@testId=catchClickLayer]"
};

var selWin = 'selenium.qxStoredVars["autWindow"]';
var qxAppInst = simulation.Simulation.QXAPPINSTANCE;


simulation.Simulation.prototype.addAppChecker = function()
{
  var checkApp = function() {
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

simulation.Simulation.prototype.getSelectedWidget = function()
{
  var inspectedWidget = String(this.__sel.getQxObjectFunction(this.locators.inspectedWidgetLabel, "getValue"));
  if (inspectedWidget.indexOf("<tt>") >= 0) {
    inspectedWidget = inspectedWidget.substring(4, inspectedWidget.length - 5);
  }
  this.log("Selected widget: " + inspectedWidget, "info");
  return inspectedWidget;
};

simulation.Simulation.prototype.selectWidgetByClick = function()
{
  this.log("Selecting widget by click", "info");
  this.qxClick(this.locators.inspectButton);
  Packages.java.lang.Thread.sleep(2000);
  this.qxClick(this.locators.catchClickLayer, "clientX=55,clientY=60");
};

simulation.Simulation.prototype.checkConsole = function()
{
  var expectedWidget = this.getSelectedWidget();
  if (expectedWidget.indexOf(" ") < 0) {
    expectedWidget = expectedWidget.split("[").join(" [");
  }
  var loc = this.locators.windowConsoleTextField;
  this.__sel.type(loc, "this");
  this.qxClick(loc);
  this.__sel.keyDown(loc, "\\13");
  var html = String(this.__sel.getQxObjectFunction(this.locators.windowConsoleHtml, "getHtml"));
  if (html.indexOf(expectedWidget) >= 0) {
    this.log("this in console returned expected widget", "info");
  } else {
    this.log("this in console did not return expected widget " + expectedWidget, "error");
  }
};

simulation.Simulation.prototype.checkButtons = function()
{
  var ua = String(this.getEval("navigator.userAgent"));
  if (ua.indexOf("Linux") && ua.indexOf("Firefox/7")) {
    // FF 7 on the Linux test machine has a strange issue where windowMaximize 
    // resizes the viewport (scroll bars disappear) but not the browser window.
    // The toolbar overflow button is outside the visible part of the viewport
    // and clicking it does not open the menu.
    return;
  }
  var overflowActive = this.__sel.isElementPresent(this.locators.toolbarButtonOverflow);
  for (locName in this.locators) {
    if (locName.indexOf("button") == 0) {
      var loc = this.locators[locName];
      var buttonPresent = this.__sel.isElementPresent(loc);
      if (buttonPresent) {
        var buttonValue = null;
        try {
          buttonValue = this.__sel.getQxObjectFunction(loc, "getValue");
        } catch(ex) {
          this.log("Error checking button value: " + ex, "error");
        }
        
        if (buttonValue == "false") {
          this.qxClick(loc, "", "Clicking button");
          Packages.java.lang.Thread.sleep(2000);
        }
      }
      else {
        if (!overflowActive) {
          this.log("Button " + locName + " is not present and overflow handling is inactive!", "error");
        }
        else {
          // check if there's an entry in the overflow menu
          this.qxClick(this.locators.toolbarButtonOverflow, "", "Opening toolbar overflow menu");
          var overflowMenuLocator = this.locators.toolbarButtonOverflow + "/qx.ui.menu.Menu";
          var overflowMenuScript = 'selenium.getQxWidgetByLocator(\'' + overflowMenuLocator + '\')';
          var isOverflowMenuVisible = overflowMenuScript + ".getVisibility() == 'visible'";
          try {
            this.__sel.waitForCondition(isOverflowMenuVisible, 2000);
          } catch(ex) {
            this.log("Toolbar overflow menu didn't open!", "error");
            continue;
          }
          var buttonLabel = locName.substr(6);
          var menuButtonLocator = overflowMenuLocator + "/[@label=" + buttonLabel + "]";
          var buttonPresent = this.__sel.isElementPresent(menuButtonLocator);
          if (!buttonPresent) {
            this.log("Button " + buttonLabel + " not present in toolbar overflow menu!", "error");
            continue;
          }
          var buttonValue = null;
          try {
            buttonValue = this.__sel.getQxObjectFunction(menuButtonLocator, "getValue");
          } catch(ex) {
            this.log("Error checking overlow menu button value: " + ex, "error");
            continue;
          }
          if (buttonValue == "false") {
            this.qxClick(menuButtonLocator, "", "Clicking overflow menu button " + buttonLabel);
            Packages.java.lang.Thread.sleep(2000);
          }
        }
      }
    }
  }
};

simulation.Simulation.prototype.checkProperties = function()
{
  var expectedWidget = this.getSelectedWidget();
  expectedWidget = expectedWidget.split("[")[0];
  var inspectedWidget = String(this.__sel.getQxObjectFunction(this.locators.windowPropertyInspectedAtom, "getLabel"));
  if (inspectedWidget.indexOf("<b>") >= 0) {
    inspectedWidget = inspectedWidget.substring(3, inspectedWidget.length - 4);
  }
  if (inspectedWidget != expectedWidget) {
    this.log("Properties window: Expected selected widget to be " + expectedWidget + " but found " + inspectedWidget, "error");
  } else {
    this.log("Properties window has correct selection", "info");
  }
};

simulation.Simulation.prototype.checkObjects = function()
{
  // Refresh the view to include objects created after application start
  this.qxClick(this.locators.windowObjectsReloadButton);
  Packages.java.lang.Thread.sleep(1000);
  
  var expectedWidget = this.getSelectedWidget();
  // Check if the currently inspected widget is selected in the table
  var selected = String(this.__sel.qxTableGetSelectedRowData(this.locators.windowObjectsTable));
  var selectedRows = eval(selected);
  var selectedWidget = selectedRows[0][1] + "[" + selectedRows[0][0] + "]";
  if (!selectedWidget == expectedWidget) {
    this.log("Objects window selection: Expected " + expectedWidget + " but found " + selectedWidget, "error");
  } else {
    this.log("Objects window has correct selection", "info");
  }
  
  // Filter the table and select the first row
  this.qxType(this.locators.windowObjectsTextField, "qx.ui.toolbar.Button");
  Packages.java.lang.Thread.sleep(25000);
  var firstRowHash = String(this.__sel.qxTableGetValue(this.locators.windowObjectsTable, "row=0,col=0"));
  var firstRowWidget = String(this.__sel.qxTableGetValue(this.locators.windowObjectsTable, "row=0,col=1"));
  var firstRowWidgetFull = firstRowWidget + "[" + firstRowHash + "]";
  this.__sel.qxTableClick(this.locators.windowObjectsTable, "row=0,col=0");
  Packages.java.lang.Thread.sleep(2000);
  var selectedWidget = this.getSelectedWidget();
  if (selectedWidget != firstRowWidgetFull) {
    this.log("Objects window: Expected selected widget to be " + firstRowWidgetFull + " but found " + selectedWidget, "error");
  } else {
    this.log("Widget selection from objects table works", "info");
  }
};

simulation.Simulation.prototype.checkWidgets = function()
{
  var expectedWidget = this.getSelectedWidget();
  if ( expectedWidget.indexOf("qx.ui.") < 0 && expectedWidget.indexOf("feedreader.view.") < 0 ) {
    this.log("Selected object is not a widget, skipping Widgets window test", "warn");
    return;
  }
  
  var getTreeSelectionLabels = function(locator)
  {
    var tree = selenium.getQxWidgetByLocator(locator);
    var labels = [];
    var selection = tree.getSelection();
    for (var i=0,l=selection.length; i<l; i++) {
      labels.push(selection[i].getLabel());
    }
    return selenium.toJson(labels);
  };
  
  this.addOwnFunction("getTreeSelectionLabels", getTreeSelectionLabels);
  var treeSelection = String(this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation.getTreeSelectionLabels("' + this.locators.windowWidgetsTree + '")'));
  var treeLabels = eval(treeSelection);
  var selectedWidget = treeLabels[0].replace(" ", "");
  if (selectedWidget == expectedWidget) {
    this.log("Widgets window has correct selection", "info");
  } else {
    this.log("Widgets window: Expected selected widget to be " + expectedWidget + " but found " + selectedWidget, "error");
  }
  
  // Click the tree's root node and check if the inspected widget is updated
  this.qxClick(this.locators.windowWidgetsTree + "/child[0]");
  Packages.java.lang.Thread.sleep(1000);
  var selectedWidget = this.getSelectedWidget();
  var treeSelection = String(this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation.getTreeSelectionLabels("' + this.locators.windowWidgetsTree + '")'));
  var treeLabels = eval(treeSelection);
  var expectedWidget = treeLabels[0].replace(" ", "");
  if (selectedWidget == expectedWidget) {
    this.log("Widgets window: Setting inspected window to tree selection worked", "info");
  } else {
    this.log("Widgets window: Expected selected widget to match tree selection " + expectedWidget + " but found " + selectedWidget, "error");
  }
};

simulation.Simulation.prototype.checkSelenium = function()
{
  var firstPartEnabled = String(this.__sel.getQxObjectFunction(this.locators.windowSeleniumToolbarFirstPart, "getEnabled"));
  this.qxClick(this.locators.windowSeleniumOptionsButton);
  Packages.java.lang.Thread.sleep(1000);
  this.qxType(this.locators.windowSeleniumOptionsSeleniumCoreField, "http://172.17.12.142/selenium-core");
  this.qxType(this.locators.windowSeleniumOptionsUserExtensionsField, "http://172.17.12.142/user-extensions-qooxdoo.js");
  this.qxClick(this.locators.windowSeleniumOptionsOkButton);
  Packages.java.lang.Thread.sleep(1000);
  var firstPartEnabled = String(this.__sel.getQxObjectFunction(this.locators.windowSeleniumToolbarFirstPart, "getEnabled"));
  if (firstPartEnabled != "true") {
    this.log("Selenium toolbar not enabled!", "error");
  } else {
    this.log("Selenium toolbar enabled", "info");
  }
};

simulation.Simulation.prototype.runTest = function()
{
  var inspectedAppPath = this.getConfigSetting("inspectedApplication");
  if (this.getConfigSetting("debug")) {
    this.log("Loading application " + inspectedAppPath + " in Inspector", "debug");
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
  
  var toolbarEnabled = String(this.__sel.getQxObjectFunction(this.locators.inspectorToolBar, "getEnabled"));
  if (toolbarEnabled == "false") {
    this.log("Inspector toolbar is disabled!", "error");
    return;
  }
  else {
    this.log("Inspector toolbar is enabled.", "info");
  }
  
  var selectedWidgetInitial = this.getSelectedWidget();
  this.log("Initially selected widget: " + selectedWidgetInitial, "info");
  
  this.selectWidgetByClick();
  var selectedWidget = this.getSelectedWidget();
  if (selectedWidgetInitial == selectedWidget) {
    this.log("Selected widget did not change", "error");
  }
  
  var browser = this.getEval("navigator.userAgent");
  var launcher = this.getConfigSetting("testBrowser");
  // Simulating native key events doesn't work in WebKit
  // The Console window uses window.top to eval commands which doesn't work 
  // during IE tests because the Inspector is loaded in an Iframe 
  if (browser.indexOf("AppleWebKit") < 0 && launcher.indexOf("*iexplore") < 0
      && browser.indexOf("Firefox/4") < 0) {
    try {
      this.checkConsole();
    } catch(ex) {
      this.log("Exception while checking Console window: " + ex, "error");
    }
  }
  
  try {
    this.checkProperties();
  } catch(ex) {
    this.log("Exception while checking Properties window: " + ex, "error");
  }
  
  /*
  try {
    this.checkObjects();
  } catch(ex) {
    this.log("Exception while checking Objects window: " + ex, "error");
  }
  
  try {
    this.checkWidgets();
  } catch(ex) {
    this.log("Exception while checking Widgets window: " + ex, "error");
  }
  
  if (!this.getConfigSetting("autHost").indexOf("file") == 0 ) {
    try {
      this.checkSelenium();
    } catch(ex) {
      this.log("Exception while checking Selenium window: " + ex, "error");
    }
  }
  */

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
    mySim.setupApplicationLogging();
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