var baseConf = {
  'autName' : 'Widgetbrowser',
  'globalTimeout' : 300000,
  'stepSpeed' : '500',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*firefox3',
  'autHost' : 'http://172.17.12.142',
  'autPath' : '/qx/trunk/qooxdoo/applicaton/showcase/build/index.html',
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
var locators = {
  tabView : 'qxh=child[0]/qx.ui.container.Scroll/qx.ui.core.scroll.ScrollPane/[@classname="widgetbrowser.view.TabView"]',
  tabContainer : '/qx.ui.container.SlideBar/qx.ui.core.scroll.ScrollPane/qx.ui.container.Composite',
  themeSelectBox : 'qxh=child[0]/[@classname="widgetbrowser.view.Header"]/qx.ui.form.SelectBox',
  themeListItem : 'qxh=*/qx.ui.popup.Popup/qx.ui.form.List/[@label="THEME"]',
  stateButtonLocator : 'qxhv=qx.ui.container.Composite/qx.ui.container.Scroll/[@classname="widgetbrowser.view.TabView"]/[@classname="widgetbrowser.view.TabPage"]/child[1]/[@label="STATE"]'
};

simulation.Simulation.prototype.runTest = function()
{
  // Make sure the locale is 'en' to simplify dealing with log messages.
  var setLocale = "qx.locale.Manager.getInstance().setLocale('en')";
  this.runScript(setLocale, "Setting application locale to EN");

  // Log any errors caught during showcase startup
  this.logGlobalErrors();
  this.clearGlobalErrorStore();

  var legacyIe = this.getEnvironment("engine.name") == "mshtml" &&
    this.getEnvironment("browser.documentmode") < 9;

  var tabNames = this.getTabNames();
  var themeNames = this.getThemeNames();

  for (var i = themeNames.length - 1; i >= 0; i--) {
    var theme = themeNames[i];
    this.selectTheme(theme);
    for (var j = tabNames.length - 1; j >= 0; j--) {
      // IE running in an Application Compatibility VPC Image-based VM will crash 
      // when trying to destroy a Flash object
      if (tabNames[j] == "Embed" && legacyIe) {
        continue;
      }
      this.testTab(tabNames[j]);
    }
  }
};


simulation.Simulation.prototype.getTabNames = function()
{
  var labelGetter = 'var labels = [];' +
    'var pages = this.getChildren();' +
    'for (var i=0,l=pages.length; i<l; i++) {' +
    '  labels.push(pages[i].getLabel());' +
    '}' +
    'return labels;';

  var strVal = String(this.__sel.getRunInContext(locators.tabView, labelGetter));
  try {
    return eval(strVal);
  } catch(ex) {
    return strVal.split(",");
  }
};

simulation.Simulation.prototype.getThemeNames = function()
{
  var themeGetter = 'var themes = [];' +
    'var items = this.getChildren();' +
    'for (var i=0,l=items.length; i<l; i++) {' +
    '  themes.push(items[i].getLabel());' +
    '}' +
    'return themes;';

  var strVal = String(this.__sel.getRunInContext(locators.themeSelectBox, themeGetter));
  try {
    return eval(strVal);
  } catch(ex) {
    return strVal.split(",");
  }
};


simulation.Simulation.prototype.selectTheme = function(themeName)
{
  this.log("Selecting theme: " + themeName, "info");
  this.__sel.qxClick(locators.themeSelectBox);
  Packages.java.lang.Thread.sleep(1000);
  this.__sel.qxClick(locators.themeListItem.replace("THEME", themeName));
  Packages.java.lang.Thread.sleep(3000);
  this.logGlobalErrors();
  this.clearGlobalErrorStore();
};


simulation.Simulation.prototype.testTab = function(tabName)
{
  this.log("Clicking Tab " + tabName, "info");
  if (tabName.indexOf('/') >= 0) {
    tabName = /(.*?)\//.exec(tabName)[1];
  }
  this.qxClick(locators.tabView + locators.tabContainer + '/[@label=' + tabName + ']');
  // Give the demo part some time to appear
  Packages.java.lang.Thread.sleep(5000);
  this.testStates();
  this.logGlobalErrors();
  this.clearGlobalErrorStore();
};


simulation.Simulation.prototype.testStates = function(tabName)
{
  var states = ["Disabled", "Hovered", "Focused", "Invalid", "Selected", "Hide some", "Overflow"];
  for (var i=0,l=states.length; i<l; i++) {
    var state = states[i];
    var buttonLocator = locators.stateButtonLocator.replace("STATE", state);
    if (this.__sel.isElementPresent(buttonLocator)) {
      this.log("Testing state: " + state, "debug");
      this.__sel.qxClick(buttonLocator);
      Packages.java.lang.Thread.sleep(1000);
      this.__sel.qxClick(buttonLocator);
      Packages.java.lang.Thread.sleep(1000);
    }
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
    mySim.setupApplicationLogging();
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
