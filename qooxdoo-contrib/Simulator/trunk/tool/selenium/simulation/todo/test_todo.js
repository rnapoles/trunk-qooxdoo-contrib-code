var baseConf = {
  autName : 'ToDo',
  globalTimeout : 300000,
  stepSpeed : '250',
  debug : true,
  applicationLog : false,
  disposerDebug : false
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

simulation.Simulation.prototype.clearItem = function(itemLabel)
{
  var labelLocator = '//label[contains(text(), "' + itemLabel + '")]';
  //Synthetic click events on the label will not trigger checkbox selection
  //changes in Opera, so we need to click the checkbox itself
  // "qxClick" will have no effect in IE
  if (this.getWebsiteEnvironment("browser.name") == "ie"
    && this.getWebsiteEnvironment("browser.documentmode") < 9)
  {
    try {
      this.__sel.click(labelLocator + "/preceding-sibling::input");
    } catch(ex) {
      if (ex.message.indexOf("Unbekannter Fehler") == -1) {
        this.log(ex.message, "warn");
      }
    }
  }
  else {
    this.__sel.qxClick(labelLocator + "/preceding-sibling::input");
  }
  this.__sel.click("clear");
};

simulation.Simulation.prototype.testClearItem = function(itemLabel)
{
  var labelLocator = '//label[contains(text(), "' + itemLabel + '")]';
  this.assertElementPresent(labelLocator);
  this.clearItem(itemLabel);
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
  var openUri = this.getConfigSetting("autHost") + "" + this.getConfigSetting("autPath");
  this.__sel.open(openUri);
};

mySim.runTest = function()
{
  var customItemLabel = "Pass the Test";
  this.waitForElementPresent("add");

  var labelLocator = '//label[contains(text(), "' + customItemLabel + '")]';
  // check if the custom item is already present from an aborted previous run
  while (this.__sel.isElementPresent(labelLocator)) {
    this.clearItem(customItemLabel);
  }

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
  this.reload();

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

  try {
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

  mySim.logResults();

  mySim.stop();

})();
