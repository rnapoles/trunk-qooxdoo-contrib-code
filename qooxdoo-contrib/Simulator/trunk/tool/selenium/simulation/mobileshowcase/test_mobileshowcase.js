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
  this.waitForElementPresent("//div[@class='navigationbar-backbutton']");
};

simulation.Simulation.prototype.goBack = function() {
  this.qxClick("//div[@class='navigationbar-backbutton']");
  this.waitForElementPresent("//h1[text() = 'Overview']");
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
    /*
    if (this[testMethodName] && typeof this[testMethodName] == "function") {
      this[testMethodName]();
    }
    */
    this.log("Going back " + i, "info");
    this.goBack();
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
