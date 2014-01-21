var baseConf = {
  'autName' : 'Skeleton',
  'globalTimeout' : 300000,
  'stepSpeed' : '250',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*custom /usr/lib/firefox-3.0.11/firefox -no-remote -P selenium-3',
  'browserId' : 'Firefox 3.0.11',
  'autHost' : 'http://localhost',
  'autPath' : '/~dwagner/workspace/qooxdoo.trunk/framework/api/index.html',
  'simulatorSvn' : '/home/dwagner/workspace/qooxdoo.contrib/Simulator',
  'applicationLog' : false,
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

var selWin = 'selenium.qxStoredVars["autWindow"]';
var qxAppInst = simulation.Simulation.QXAPPINSTANCE;

simulation.Simulation.prototype.websiteTest = function()
{
  var collectionMethods = ["animate", "getAttribute", "setStyle", "emit", "insertAfter", "getChildren"];
  var statics = ["env.get", "array.remove", "string.hyphenate", "type.get"];
  var snippet = "typeof " + simulation.Simulation.SELENIUMWINDOW + ".q.";

  var typeCheck;
  this.log("Checking Collection methods", "info");
  for (var i=0, l=collectionMethods.length; i<l; i++) {
    typeCheck = snippet + "prototype." + collectionMethods[i] + " == 'function'";
    if (String(this.getEval(typeCheck)) != "true") {
      this.log("Collection method " + collectionMethods[i] + " is not a function!", "error");
    }
  }

  this.log("Checking static methods", "info");
  for (i=0, l=statics.length; i<l; i++) {
    typeCheck = snippet + statics[i] + " == 'function'";
    if (String(this.getEval(typeCheck)) != "true") {
      this.log("Collection method " + statics[i] + " is not a function!", "error");
    }
  }
};

simulation.Simulation.prototype.nativeTest = function()
{
  var eventDivLocator = '//html/body/div[@id="logger"]';
  var eventDivElem = '.document.getElementById("logger")';
  eventDivLocator = '//html/body/div';
  eventDivElem = '.document.getElementsByTagName("div")[0]';

  this.__sel.focus(eventDivLocator);
  this.__sel.typeKeys(eventDivLocator, 'A');
  var divContent = this.getEval(selWin + eventDivElem + '.innerHTML', "Getting logger div content.");
  if (divContent.indexOf("A") === 0) {
    this.log("qooxdoo event system seems to work.", "info");
  }
  else {
    this.log("Unexpected logger div content. Possible problem with the qooxdoo event system.", "error");
  }
};

simulation.Simulation.prototype.guiTest = function()
{
  this.log("Clicking qooxdoo button - should open an alert box", "info");
  this.qxClick("qxh=qx.ui.form.Button");
  this.killBoxes();
};

simulation.Simulation.prototype.mobileTest = function()
{
  this.waitForElementPresent("qx_id_8");
  this.qxClick("qx_id_8");
  this.waitForElementPresent("xpath=//div[text() = 'Content of Page 2']");
};

simulation.Simulation.prototype.runTest = function()
{
  var appType = this.getApplicationType();
  switch(appType) {
    case "website":
      this.websiteTest();
      break;
    case "native":
      this.nativeTest();
      break;
    case "inline":
    case "standalone":
      this.guiTest();
      break;
    case "mobile":
      this.mobileTest();
      break;
    default:
      this.log("No test case for application type " + appType, "warn");
  }
};

// - Main --------------------------------------------------------------------
(function() {
  mySim.testFailed = false;

  var sessionStarted = mySim.startSession();

  if (!sessionStarted) {
    return;
  }

  if (mySim.getConfigSetting("autPath").indexOf("websiteapplication") == -1) {
    var isAppReady = mySim.waitForCondition(simulation.Simulation.ISQXAPPREADY, 60000, "Waiting for qooxdoo application");
    if (!isAppReady) {
      mySim.testFailed = true;
      mySim.stop();
      return;
    }
  }

  try {
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

  mySim.logResults();

  mySim.stop();

})();
