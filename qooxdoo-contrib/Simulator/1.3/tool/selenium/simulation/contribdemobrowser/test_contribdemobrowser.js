var baseConf = {
  autName : 'ContribDemoBrowser',
  globalTimeout : 300000,
  stepSpeed : '1000',
  selServer : 'localhost',
  selPort : 4444,
  testBrowser : '*opera',
  //autHost : 'http://localhost',
  //autPath : '/~dwagner/workspace/qooxdoo.trunk/application/feedreader/build/index.html',
  simulatorSvn : '/home/dwagner/workspace/qooxdoo.contrib/Simulator',
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

simulation.Simulation.prototype.__demos = {};

simulation.Simulation.prototype.locators = {
  selectQxVersion : "qxhv=*/qx.ui.form.SelectBox",
  buttonNext : 'qxhv=*/[@label="Next"]',
  tree : 'qxhv=*/qx.ui.tree.Tree',
  treeRoot : 'qxhv=*/qx.ui.tree.Tree/[@label="Demos"]'
};

simulation.Simulation.prototype.runTest = function()
{
  var qxVersions = this.getQxVersions();
  
  for (var i=0; i<qxVersions.length; i++) {
    this.__qxVersion = qxVersions[i];
    this.__demos[this.__qxVersion] = [];
    this.log("Testing demos compatible with qx version " + this.__qxVersion, "info");
    this.qxClick(this.locators.selectQxVersion);
    Packages.java.lang.Thread.sleep(2000);
    this.qxClick(this.locators.selectQxVersion + '/[@label="' + this.__qxVersion + '"]');
    Packages.java.lang.Thread.sleep(1000);
    this.qxClick(this.locators.treeRoot);
    this.testAllDemos();
  }
};

simulation.Simulation.prototype.getQxVersions = function()
{
  var labelGetter = "var items = this.getChildren();\
  var labels = [];\
  for (var i=0; i<items.length; i++) {\
    labels.push(items[i].getLabel());\
  }\
  return labels;"; 
  var stringResult = String(this.__sel.getRunInContext(this.locators.selectQxVersion, labelGetter));
  return eval(stringResult);
};

simulation.Simulation.prototype.getTreeSelectionLabel = function()
{
  var labelGetter = "var item = this.getSelection()[0];\
  var labels = [item.getLabel()];\
  var item = item.getParent();\
  while (item != this.getRoot()) {\
    labels.unshift(item.getLabel());\
    item = item.getParent();\
  }\
  return labels;";
  var stringResult = String(this.__sel.getRunInContext(this.locators.tree, labelGetter));
  var evaledResult = eval(stringResult);
  return evaledResult.join(" ");
};

simulation.Simulation.prototype.waitForDemoApp = function()
{
  this.__sel.waitForCondition(this.isDemoReady, 15000);
};

simulation.Simulation.prototype.testAllDemos = function()
{
  var nextItem = null;
  var selectedItem = "foo";
  this.qxClick(this.locators.buttonNext);
  while (selectedItem != nextItem) {
    selectedItem = this.getTreeSelectionLabel();
    this.__demos[this.__qxVersion].push(selectedItem);
    this.testDemo(this.__qxVersion + ": " + selectedItem);
    this.qxClick(this.locators.buttonNext);
    nextItem = this.getTreeSelectionLabel();
  }
};

simulation.Simulation.prototype.testDemo = function(demoName)
{
  this.log("Testing demo " + demoName, "info");
  try {
    this.waitForDemoApp();
  } catch(ex) {
    this.log("Error while waiting for demo " + demoName + " to load: " + ex, "error");
    return;
  }
  // TODO: attach global error handler to demo, get demo errors
};

var mySim = new simulation.Simulation(baseConf,args);

(function() { 
  mySim.testFailed = false;
  
  mySim.isDemoReady = simulation.Simulation.SELENIUMWINDOW + '.'  
  + simulation.Simulation.QXAPPINSTANCE
  + '.viewer._iframe.getWindow().qx.core.Init.getApplication()';

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
    if (mySim.getConfigSetting("debug")) {
      print(msg + "\n" + ex);
    }
    mySim.log(msg, "error");
  }

  mySim.logGlobalErrors();
  mySim.logResults();

  mySim.stop();

})();
