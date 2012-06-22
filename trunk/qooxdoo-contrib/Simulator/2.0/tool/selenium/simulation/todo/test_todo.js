var baseConf = {
  autName : 'ToDo',
  globalTimeout : 300000,
  stepSpeed : '250',
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

simulation.Simulation.prototype.assertElementPresent = function(locator)
{
  if (!this.__sel.isElementPresent(locator)) {
    throw new Error("Element " + locator + " is not present!");
  }
};

simulation.Simulation.prototype.assertNotElementPresent = function(locator)
{
  if (this.__sel.isElementPresent(locator)) {
    throw new Error("Element " + locator + " is present!");
  }
};

simulation.Simulation.prototype.waitForElementPresent = function(locator, timeout)
{
  var condition = 'selenium.isElementPresent("' + locator + '")';
  this.__sel.waitForCondition(condition, timeout || 5000);
};

simulation.Simulation.prototype.testClearItem = function(itemLabel)
{
  var labelLocator = '//label[contains(text(), "' + itemLabel + '")]';
  this.assertElementPresent(labelLocator);
  //Synthetic click events on the label will not trigger checkbox selection
  //changes in Opera, so we need to click the checkbox itself
  this.__sel.qxClick(labelLocator + "/preceding-sibling::input");
  this.__sel.click("clear");
  this.assertNotElementPresent(labelLocator);
};

simulation.Simulation.prototype.testAddItem = function(itemLabel)
{
  this.__sel.answerOnNextPrompt(itemLabel);
  this.__sel.click("add");
  
  var labelLocator = '//label[contains(text(), "' + itemLabel + '")]';
  this.assertElementPresent(labelLocator);
};

simulation.Simulation.prototype.reload = function()
{
  this.qxOpen();
  var isAppReady = this.waitForCondition(simulation.Simulation.ISQXAPPREADY, 60000, 
                                          "Waiting for qooxdoo application");

  if (!isAppReady) {
    this.testFailed = true;
    this.log("Application was not reloaded correctly!", "error");
    return false;
  }
  
  this.addGlobalErrorHandler();
  this.setupApplicationLogging();
  
  return true;
};

mySim.runTest = function()
{
  var customItemLabel = "Pass the Test";
  this.waitForElementPresent("add");
  
  this.log("Adding custom item " + customItemLabel, "info");
  try {
    this.testAddItem(customItemLabel);
    this.log("Custom item " + customItemLabel + " added", "info");
  }
  catch(ex) {
    this.log("Could not create custom item: " + ex.message, "error");
    return;
  }
  
  this.log("Reloading application", "info");
  if (!this.reload()) {
    return;
  }
  
  this.log("Clearing custom item " + customItemLabel, "info");
  try {
    this.testClearItem(customItemLabel);
    this.log("Custom item " + customItemLabel + " cleared", "info");
  }
  catch(ex) {
    this.log("Could not clear custom item: " + ex.message, "error");
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
    mySim.log(msg, "error");
  }

  mySim.logGlobalErrors();
  mySim.logResults();

  mySim.stop();

})();
