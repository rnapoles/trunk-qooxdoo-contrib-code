var baseConf = {
  'autName' : 'TutorialMobiletweets',
  'globalTimeout' : 120000,
  'stepSpeed' : '250',
  'debug' : false,
  'applicationLog' : false
};

var args = arguments ? arguments : "";
var simSvn = baseConf.simulatorSvn;
for (var i=0; i<args.length; i++) {
  if (args[i].indexOf('simulatorSvn') >= 0) {
    simSvn = args[i].substr(args[i].indexOf('simulatorSvn=') + 13);
  }
}

load([simSvn + "/trunk/tool/selenium/simulation/Simulation.js"]);

var sim = new simulation.Simulation(baseConf,args);

var selWin = simulation.Simulation.SELENIUMWINDOW;
var qxAppInst = simulation.Simulation.QXAPPINSTANCE;

simulation.Simulation.prototype.runTest = function() {
  var backButtonLocator = "css=.navigationbar-backbutton";

  this.__sel.type("css=.text-field", "linuxfoundation");
  this.qxClick("css=.button");
  try {
    this.waitForElementPresent(backButtonLocator, 3000);
  }
  catch(ex) {
    this.log("Back button not displayed after clicking 'Show'!", "error");
    return;
  }

  try {
    this.waitForElementPresent("css=.list-item", 1000);
  }
  catch(ex) {
    this.log("No list items displayed!", "error");
  }

  this.qxClick(backButtonLocator);
  Packages.java.lang.Thread.sleep(3000);
  if (this.isElementVisible(backButtonLocator)) {
    this.log("Back button still visible after clicking it!", "error");
  }
};

// - Main --------------------------------------------------------------------
(function() {
  sim.testFailed = false;

  var sessionStarted = sim.startSession();

  if (!sessionStarted) {
    return;
  }

  var isAppReady = sim.waitForCondition(simulation.Simulation.ISQXAPPREADY, 60000,
    "Waiting for qooxdoo application");


  if (!isAppReady) {
    sim.testFailed = true;
    sim.stop();
    return;
  }

  //sim.setupApplicationLogging();
  sim.addGlobalErrorHandler();
  sim.runTest();
  sim.logGlobalErrors();
  sim.logResults();

  sim.stop();

})();
