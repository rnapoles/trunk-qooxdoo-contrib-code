var baseConf = {
  'autName' : 'Performance',
  'globalTimeout' : 20000,
  'stepSpeed' : '500',
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

var selWin = "selenium.browserbot.getCurrentWindow()";
var qxAppInst = simulation.Simulation.QXAPPINSTANCE;
var isQxAppReady = 'var qxReady = false; try { if (' 
  + selWin + '.' + qxAppInst 
  + ') { qxReady = true; } } catch(e) {} qxReady;';

simulation.Simulation.prototype.startSession = function()
{  
  if (this.getConfigSetting("debug")) {
    print("Starting " + this.getConfigSetting("autName") + " session with browser " + this.getConfigSetting("testBrowser"));
  }
  
  try {
    this.__sel = new QxSelenium(this.getConfigSetting("selServer"),this.getConfigSetting("selPort"),
                                this.getConfigSetting("testBrowser"),this.getConfigSetting("autHost"));
  }
  catch(ex) {
    throw new Error("Unable to create QxSelenium instance: " + ex);
  }

  try {
    this.__sel.start();
    this.__sel.setTimeout(this.getConfigSetting("globalTimeout"));    
    this.__sel.open(this.getConfigSetting("autHost") + "" + this.getConfigSetting("autPath"));
    this.__sel.setSpeed(this.getConfigSetting("stepSpeed"));
    
  }
  catch (ex) {
    this.logEnvironment("file");
    this.log("User agent: " + this.getConfigSetting("browserId"), "none", "file");
    var msg = "ERROR: Unable to start test session: " + ex;
    print(msg);
    this.log(msg, "error", "file");
    return false;
  }
  return true;
};

/* 
 * This is the qooxdoo-dependent code from Simulation.startSession(). This
 * should only be called after the qooxdoo application was loaded.
*/
simulation.Simulation.prototype.addQxStuff = function()
{
  try {
    /* 
     * Store the AUT window object to avoid calling 
     * selenium.browserbot.getCurrentWindow() repeatedly.
     */
    this.__sel.getEval('selenium.qxStoredVars = {}');    
    this.storeEval('selenium.browserbot.getCurrentWindow()', 'autWindow');

    this.prepareNameSpace();
    this.addSanitizer();
    this.logEnvironment();
    this.logUserAgent();
    this.addRingBuffer();
    this.addRingBufferGetter();
  }
  catch (ex) {
    this.logEnvironment("file");
    this.log("User agent: " + this.getConfigSetting("browserId"), "none", "file");
    var msg = "ERROR: Unable to prepare qooxdoo test environment: " + ex;
    print(msg);
    this.log(msg, "error", "file");
    return false;
  }
  return true;
};

simulation.Simulation.prototype.logResults = function()
{
  if (!this.testFailed) {
    if (this.getConfigSetting("debug")) {
      print("Test run finished successfully.");
    }
    
    var totalIssues = this.getTotalErrorsLogged() + this.getTotalWarningsLogged();
    this.log(this.getConfigSetting("autName") + " ended with warnings or errors: " + totalIssues, "info");
  }
  
  this.logTestDuration();
  
};


simulation.Simulation.prototype.runTest = function()
{
  Packages.java.lang.Thread.sleep(this.getConfigSetting("globalTimeout"));
};


// - Main --------------------------------------------------------------------
(function() { 
  mySim.testFailed = false;
  var sessionStarted = mySim.startSession();
  
  if (!sessionStarted) {
    return;
  }
  
  var uri = mySim.getConfigSetting("autHost") + mySim.getConfigSetting("autPath");
  uri += "?testclass=" + mySim.getConfigSetting("testclass");
  mySim.__sel.open(uri);
  
  Packages.java.lang.Thread.sleep(3000);
  
  var isAppReady = mySim.waitForCondition(isQxAppReady, 60000, "Waiting for qooxdoo application");
  
  if (!isAppReady) {
    mySim.testFailed = true;
    mySim.stop();
    return;
  }
  
  try {
    mySim.addQxStuff();
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
    return;
  }

  mySim.logRingBufferEntries();
  mySim.logResults();

  mySim.stop();

})();