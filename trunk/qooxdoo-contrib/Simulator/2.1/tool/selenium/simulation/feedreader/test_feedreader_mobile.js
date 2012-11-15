var baseConf = {
  autName : 'Feedreader (Mobile View)',
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

simulation.Simulation.prototype.addListItemLabelGetter = function()
{
  var titleGetter = function() {
    var labels = [];
    var items = selenium.browserbot.getCurrentWindow().document.getElementsByClassName("list-itemlabel");
    for (var i=0,l=items.length; i<l; i++) {
      if (selenium.browserbot.getCurrentWindow().qx.dom.Hierarchy.isRendered(items[i])) {
        labels.push(items[i].textContent);
      }
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


simulation.Simulation.prototype.checkFeeds = function(titles)
{
  var feedTitles = [];
  // remove single quotes from feed titles, e.g. Surfin' Safari
  for (var i=0,l=titles.length; i<l; i++) {
    if (titles[i].indexOf("'") >= 0) {
      titles[i] = titles[i].substr(0, titles[i].indexOf("'"));
    }
    feedTitles.push(titles[i]);
  }
  
  var firstArticleTitle = null;
  
  for (var i=0,l=feedTitles.length; i<l; i++) {
    var feedTitleLocator = "//div[contains(text(),'" +  feedTitles[i] + "')]";
    this.waitForElementPresent(feedTitleLocator);

    try {
      this.__sel.qxClick(feedTitleLocator);
      this.waitForElementPresent(this.backButtonLocator, 2000);
    }
    catch(ex) {
      this.log("Error while clicking feed title '" + feedTitles[i] + "': " + ex.message, "error");
      continue;
    }
    try {
      var articleTitles = this.getListItemLabels();
    }
    catch(ex) {
      this.log("Couldn't get article titles for '" + feedTitles[i] + "': " + ex.message, "error");
      continue;
    }
    if (articleTitles.length == 0) {
      this.log("Feed " + feedTitles[i] + " has no articles!", "warn");
      var firstArticleTitle = null;
    }
    else if (articleTitles[0] == firstArticleTitle) {
      this.log("Found the same article title for '" + feedTitles[i-1] + "' and '" + feedTitles[i] + "'", "error");
    }
    else {
      this.log("Found " + articleTitles.length + " articles in feed '" + feedTitles[i] + "'", "info");
      this.checkRandomArticle(articleTitles);
      Packages.java.lang.Thread.sleep(2000);
    }
    firstArticleTitle = feedTitles[0];
    
    this.__sel.qxClick(this.backButtonLocator);
  }
};


simulation.Simulation.prototype.checkRandomArticle = function(titles)
{
  var index = Math.floor(Math.random() * (titles.length));
  var title = titles[index].replace(/([^a-z0-9\ -'"])/gi, "");
  var labelLoc = "//div[text() = '" + titles[index] + "']";
  
  try {
    this.__sel.qxClick(labelLoc);
  }
  catch(ex) {
    this.log("Error while clicking article '" + title + "': " + ex.message, "error");
    return;
  }
  
  try {
    this.waitForElementPresent("//a[text() = 'read more ...']");
  }
  catch(ex) {
    this.log("Content of article '" + title + "' is not displayed!", "error");
  }
  
  this.__sel.qxClick(this.backButtonLocator);
};


mySim.runTest = function()
{
  this.feedLoadTimeout = 30000;  
  this.backButtonLocator = "//div[@class='navigationbar-backbutton']";
  
  this.waitForElementPresent("//h1[contains(text(), 'Feed Reader')]");
  this.addListItemLabelGetter();
  var titles = this.getListItemLabels();
  this.checkFeeds(titles);
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
