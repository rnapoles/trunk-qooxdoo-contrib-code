var baseConf = {
  'autName' : 'Portal',
  'globalTimeout' : 300000,
  'stepSpeed' : '250',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*custom /usr/lib/firefox-3.0.10/firefox -no-remote -P selenium-3',
  'autHost' : 'http://localhost',
  'autPath' : '/qx/trunk/qooxdoo/application/portal/build/index.html',
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
var logHtml = selWin + "." + qxAppInst + ".logelem.innerHTML";


simulation.Simulation.prototype.runTest = function()
{
  var getFirstBoxGroup = selWin + '.document.getElementById("box0").parentNode.id';
  var firstBoxGroupInit = this.getEval(getFirstBoxGroup, "Getting ID of the first box parent");
  if (this.getConfigSetting("debug")) {
    print("Group box before drag: " + firstBoxGroupInit);
  }
  
  this.qxDragAndDropToObject('//div[@id="box0"]/div[@class="dragHandle"]', '//div[@id="box5"]');
  
  var firstBoxGroupAfterDrag = this.getEval(getFirstBoxGroup, "Getting ID of the first box parent");
  if (this.getConfigSetting("debug")) {
    print("Group box after drag: " + firstBoxGroupAfterDrag);
  }
  
  var getNewNextBox = selWin + '.document.getElementById("box0").nextSibling.nextSibling.id';
  var newNextBox = this.getEval(getNewNextBox, "Getting next box ID");
  if (this.getConfigSetting("debug")) {
    print("Next box after drag: " + newNextBox);
  }
  
  var dragOk = true;
  
  if (firstBoxGroupInit == firstBoxGroupAfterDrag) {
    dragOk = false;
    this.log("Box parent unchanged after drag!", "error");
  }
  
  if (String(newNextBox) != "box5") {
    dragOk = false;
    this.log("Next box after drag should be box5 but is " + newNextBox, "error");
  }
  
  if (dragOk) {
    this.log("Box successfully dragged to new position.", "info");
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
    if (mySim.debug) {
      print(msg + "\n" + ex);
    }
    mySim.log(msg + "<br/>" + ex, "error");
  }
  
  mySim.logGlobalErrors();

  if (!mySim.testFailed) {
    if (mySim.debug) {
      print("Test run finished successfully.");
    }
    mySim.log("Portal ended with warnings or errors: " + mySim.getTotalErrorsLogged(), "info");
  }

  mySim.logTestDuration();
  mySim.stop();

})();
