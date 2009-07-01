var baseConf = {
  'autName' : 'Testrunner Dispose',
  'globalTimeout' : 120000,
  'stepSpeed' : '250',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*custom /usr/lib/firefox-3.0.10/firefox -no-remote -P selenium-3',
  'autHost' : 'http://localhost',
  'autPath' : '/~dwagner/workspace/qooxdoo.trunk/framework/test/index.html',
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
//load([simSvn + "/trunk/tool/selenium/simulation/testrunner/test_testrunner.js"]);

var mySim = function() {
  
};

mySim.prototype = new simulation.Simulation(baseConf,args);

mySim.prototype.runTestsSteps = function()
{
  print("I overwrote something!");
};

// - Main --------------------------------------------------------------------

(function() {
  mySim.testFailed = false;

  var sessionStarted = mySim.startSession();

  if (!sessionStarted) {
    return;
  }

  var isAppReady = mySim.waitForCondition(simulation.Simulation.ISQXAPPREADY, 240000,
                                          "Waiting for qooxdoo application");


  if (!isAppReady) {
    mySim.testFailed = true;
    mySim.stop();
    return;
  }

  var isSuiteReady = mySim.waitForCondition(isStatusReady, 240000,
                                            "Waiting for test suite to load");

  if (!isSuiteReady) {
    mySim.testFailed = true;
    mySim.stop();
    return;
  }

  try {
    mySim.runTestsSteps();
  }
  catch(ex) {
    var msg = "Unexpected error while running tests!";
    if (mySim.getConfigSetting("debug")) {
      print(msg + "\n" + ex);
    }
    mySim.log(msg, "error");
  }

  if (!mySim.testFailed) {
    if (mySim.getConfigSetting("debug")) {
      print("Test run finished successfully.");
    }
    mySim.log("Tests with warnings or errors: " + mySim.getTotalErrorsLogged(), "info");
  }

  mySim.logTestDuration();
  mySim.stop();

})();