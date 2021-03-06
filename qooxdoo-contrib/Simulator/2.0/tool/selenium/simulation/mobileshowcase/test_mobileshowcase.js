var baseConf = {
  autName : 'MobileShowcase',
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

//var selWin = simulation.Simulation.SELENIUMWINDOW;
//var qxAppInst = simulation.Simulation.QXAPPINSTANCE;

var buttonToTitle = {
  "Form Elements" : "Form",
  "Tab Bar" : "Tabs"
};

simulation.Simulation.prototype.addListItemLabelGetter = function()
{
  var titleGetter = function() {
    var labels = [];
    var items = selenium.browserbot.getCurrentWindow().document.getElementsByClassName("list-itemlabel");
    for (var i=0,l=items.length; i<l; i++) {
      labels.push(items[i].textContent);
    }
    return selenium.browserbot.getCurrentWindow().JSON.stringify(labels);
  };
  
  this.addOwnFunction("getTitles", titleGetter);
};

simulation.Simulation.prototype.getListItemLabels = function()
{
  var selWin = simulation.Simulation.SELENIUMWINDOW;
  //var qxAppInst = simulation.Simulation.QXAPPINSTANCE;
  var titlesJson = this.getEval(selWin + ".qx.Simulation.getTitles();", "Getting feed titles");
  eval("var titles = " + titlesJson);
  
  return titles;
};

simulation.Simulation.prototype.selectItem = function(itemName) {
  this.qxClick("//div[text() = '" + itemName + "']");
  itemName = buttonToTitle[itemName] || itemName; 
  this.waitForElementPresent("//h1[text() = '" + itemName + "']");
};

//TODO: Update
simulation.Simulation.prototype.testPageTransitionsOLD = function()
{
  this.log("Testing Animations", "info");
  this.waitForElementPresent("//h1[text() = 'Animation']");
  var listItems = ["Slide", "Pop", "Fade", "Dissolve", "Slide up", "Flip", "Swap", "Cube"];
  for (var i=0, l=listItems.length; i<l; i++) {
    if (listItems[i].indexOf("Action") == 0) {
      continue;
    }
    this.selectItem(listItems[i]);
    Packages.java.lang.Thread.sleep(1500);
    this.waitForElementPresent("//strong[contains(text(), 'reverse animation')]");
    this.selectItem("Animation");
  }
};

simulation.Simulation.prototype.testList = function()
{
  this.log("Testing List", "info");
  this.waitForElementPresent("//h1[text() = 'List']");
  this.qxClick("//div[text() = 'Selectable Item2']");
  this.waitForElementPresent("//div[contains(text(), 'You selected Item')]");
  this.qxClick("//div[text() = 'OK']");
};

simulation.Simulation.prototype.testEvents = function()
{
  this.log("Testing Events", "info");
  var eventContainerLocator = "//div[contains(@class, 'eventcontainer')]";
  this.waitForElementPresent(eventContainerLocator);
  this.qxClick(eventContainerLocator);
  this.waitForElementPresent("//div[contains(text(), 'touchstart touchend tap')]");
};

simulation.Simulation.prototype.testToolbar = function()
{
  this.log("Testing Toolbar", "info");
  this.waitForElementPresent("//div[contains(@class, 'toolbar')]");
  
  //click search button
  this.qxClick("//div[contains(@class, 'toolbar-button')]/descendant::div[text() = 'Search']");
  var searchDialogButtonLocator = "//div[text() = 'Search']/ancestor::div[@class= 'button']";
  this.waitForElementPresent(searchDialogButtonLocator);
  this.qxClick(searchDialogButtonLocator);
  Packages.java.lang.Thread.sleep(500);
  if (this.__sel.isVisible(searchDialogButtonLocator)) {
    throw new Error("Clicking Search did not close the search dialog!");
  }
  
  //click 'left arrow' button
  var noButtonLocator = "//div[text() = 'No']";
  var yesButtonLocator = "//div[text() = 'Yes']";
  this.qxClick("//img[contains(@src, 'arrowleft')]");
  this.waitForElementPresent(noButtonLocator);
  this.qxClick(yesButtonLocator);
  Packages.java.lang.Thread.sleep(500);
  if (this.__sel.isVisible(noButtonLocator)) {
    throw new Error("Clicking No did not close the Are you sure dialog!");
  }
  
  //click load button
  this.qxClick("//div[contains(@class, 'toolbar-button')]/descendant::div[text() = 'Take a new picture']");
  var loadingDialogLocator = "//div[text() = 'Loading...']";
  this.waitForElementPresent(loadingDialogLocator);
  //the loading dialog disappears after 5sec
  Packages.java.lang.Thread.sleep(5500);
  if (this.__sel.isVisible(loadingDialogLocator)) {
    throw new Error("Loading Dialog did not disappear!");
  }
};

//TODO: Update for new demo
simulation.Simulation.prototype.testTabBarOLD = function()
{
  for (var i=1; i<5; i++) {
    this.qxClick("//div[text() = 'Tab " + i + "']/ancestor::div[contains(@class, 'tabButton')]");
    this.waitForElementVisible("//div[text() = 'View " + i + "']");
  }
};

mySim.runTest = function()
{
  this.waitForElementPresent("//h1[text() = 'Overview']");
  
  this.addListItemLabelGetter();
  var listItems = this.getListItemLabels();
  
  for (var i=0, l=listItems.length; i<l; i++) {
    var testMethodName = "test" + listItems[i].replace(/ /i, "");
    this.log("Selecting item " + listItems[i], "info");
    this.selectItem(listItems[i]);
    if (this[testMethodName] && typeof this[testMethodName] == "function") {
      try {
        this[testMethodName]();
      }
      catch(ex) {
        this.log("Error while testing " + listItems[i] + ": " + ex.message, "error");
      }
    }
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
