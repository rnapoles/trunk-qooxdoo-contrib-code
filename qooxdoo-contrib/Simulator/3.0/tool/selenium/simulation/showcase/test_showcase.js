var baseConf = {
  'autName' : 'Showcase',
  'globalTimeout' : 300000,
  'stepSpeed' : '500',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*custom /usr/lib/firefox-3.0.10/firefox -no-remote -P selenium-3',
  'autHost' : 'http://localhost',
  'autPath' : '/~dwagner/workspace/qooxdoo.trunk/applicaton/showcase/build/index.html',
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
  previewList : 'qxh=inline:showcase//[@classname="showcase.ui.PreviewList"]',
  virtualListContactsWindow : 'qxhv=inline:showcase//qx.ui.container.Stack/qx.ui.container.Composite/qx.ui.window.Desktop/[@caption=Contacts]'
};

simulation.Simulation.prototype.runTest = function()
{
  // Make sure the locale is 'en' to simplify dealing with log messages.
  var setLocale = "qx.locale.Manager.getInstance().setLocale('en')";  
  this.runScript(setLocale, "Setting application locale to EN");
  
  // Log any errors caught during showcase startup
  this.logGlobalErrors();
  this.clearGlobalErrorStore();
  
  this.checkUrlParameter();
  
  var hasNext = true;
  var demoCount = 0;
  while (hasNext) {
    try {
      this.log("Selecting demo " + demoCount, "info");
      this.__sel.qxClick(locators.previewList + "/child[" + demoCount + "]");
      this.testDemo();
      demoCount++;
    } catch(ex) {
      hasNext = false;
    }
  }
  
};

simulation.Simulation.prototype.testDemo = function()
{
  // Give the demo part some time to appear
  Packages.java.lang.Thread.sleep(5000);
  // Log any errors caught during demo startup 
  this.logGlobalErrors();
  this.clearGlobalErrorStore();
};

simulation.Simulation.prototype.checkUrlParameter = function()
{
  var selectedDemo = /(#.*)$/.exec(this.getConfigSetting("autPath"));
  if (!selectedDemo || selectedDemo[1] !== "#virtuallist") {
    return;
  }
  
  try {
    this.__sel.qxClick(locators.virtualListContactsWindow);
    this.log("checkUrlParameter: Demo selected via URL loaded correctly", "info");
  }
  catch(ex) {
    this.log("checkUrlParameter: " + ex.message, "error");
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