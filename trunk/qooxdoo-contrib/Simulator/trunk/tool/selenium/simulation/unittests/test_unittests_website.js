var baseConf = {
  autName : 'qUnitTests',
  globalTimeout : 300000,
  stepSpeed : '500',
  debug : true
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

// - Main --------------------------------------------------------------------

(function() {
  mySim.testFailed = false;

  var sessionStarted = mySim.startSession();
  if (!sessionStarted) {
    return;
  }
  
  var uri = mySim.getConfigSetting("autHost") + "" + mySim.getConfigSetting("autPath");
  uri += '&autorun=1';
  mySim.__sel.open(uri);
  
  mySim.waitForElementPresent("//span[contains(text(), 'Test suite finished')]", 300000);
  Packages.java.lang.Thread.sleep(5000);
  
  var getStatus = 'selenium.browserbot.getCurrentWindow().document.getElementById("status").innerHTML';
  
  var status = mySim.__sel.getEval(getStatus);
  var failed = /Failed: (\d+)/.exec(status);
  var totalErrors;
  if (failed && failed.length > 0) {
    totalErrors = failed[1];
  }
  else {
    totalErrors = 1;
  }
  Packages.java.lang.Thread.sleep(999999);
  
  if (!totalErrors) {
    this.log("Could not retrieve failed test count!", "error");
    totalErrors = 1;
    mySim.testFailed = true;
  }

  mySim.log("Tests with warnings or errors: " + totalErrors, "info");
    
  mySim.stop();
  mySim.logTestDuration();
})();