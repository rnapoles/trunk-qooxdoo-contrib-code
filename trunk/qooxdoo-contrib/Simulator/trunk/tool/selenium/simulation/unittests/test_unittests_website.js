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
  
  mySim.stop();
})();