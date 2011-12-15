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
  tabContainer : '/qx.ui.container.SlideBar/qx.ui.core.scroll.ScrollPane/qx.ui.container.Composite'
};

simulation.Simulation.prototype.runTest = function()
{
  // Make sure the locale is 'en' to simplify dealing with log messages.
  var setLocale = "qx.locale.Manager.getInstance().setLocale('en')";  
  this.runScript(setLocale, "Setting application locale to EN");
  
  this.checkUrlParameter();
  
  // Log any errors caught during showcase startup
  this.logGlobalErrors();
  this.clearGlobalErrorStore();
  
  var tabNames = this.getTabNames();
  for (var i=0,l=tabNames.length; i<l; i++) {
    this.testTab(tabNames[i]);
  }
};

simulation.Simulation.prototype.checkUrlParameter = function()
{
  var selectedTheme = "qx.theme.Simple";
  
  var urlWithParam = this.getConfigSetting("autHost") + "" 
  + this.getConfigSetting("autPath") + "?qx.theme=" + selectedTheme;
  this.qxOpen(urlWithParam);
  var isAppReady = this.waitForCondition(simulation.Simulation.ISQXAPPREADY, 60000, 
                                          "Waiting for qooxdoo application");

  if (!isAppReady) {
    this.testFailed = true;
    this.log("checkUrlParameter: Application was not reloaded correctly!", "error");
    return;
  }
  
  this.addGlobalErrorHandler();
  
  var environmentTheme = "";
  var themeGetter = selWin + ".qx.core.Environment.get(\"qx.theme\")";
  try {
    environmentTheme = this.__sel.getEval(themeGetter); 
  }
  catch(ex) {
    this.log("checkUrlParameter: Unable to query theme environment setting!", "error");
    return;
  }
  
  if (environmentTheme != selectedTheme) {
    this.log("checkUrlParameter: Expected theme " + selectedTheme + " but core.environment says " + environmentTheme, "error");
    return;
  }
  
  this.log("checkUrlParameter: Theme setting from URL applied correctly", "info");
};

simulation.Simulation.prototype.getTabNames = function()
{
  var labelGetter = 'var labels = [];\
  var pages = this.getChildren();\
  for (var i=0,l=pages.length; i<l; i++) {\
    labels.push(pages[i].getLabel());\
  }\
  return labels;';
  
  var strVal = String(this.__sel.getRunInContext(locators.tabView, labelGetter));
  try {
    return eval(strVal);
  } catch(ex) {
    return strVal.split(",");
  }
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
  // Log any errors caught during demo startup 
  this.logGlobalErrors();
  this.clearGlobalErrorStore();
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