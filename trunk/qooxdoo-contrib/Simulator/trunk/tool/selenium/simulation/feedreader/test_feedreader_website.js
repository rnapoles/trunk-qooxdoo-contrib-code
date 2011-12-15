var baseConf = {
  autName : 'Feedreader (Website View)',
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

//var selWin = simulation.Simulation.SELENIUMWINDOW;
//var qxAppInst = simulation.Simulation.QXAPPINSTANCE;


simulation.Simulation.prototype.checkArticle = function()
{
  var articleScript = 'selenium.getQxObjectFunction(\'' + locators.articleView + '\', "getArticle")';
  var article = this.getEval(articleScript, "Checking for article");

  var modelClassName = "qx.data.model";
  if (String(article).indexOf(modelClassName) >= 0) {
    this.log("Article found.", "info");
  }
  else {
    this.log("ERROR: No Article found.", "error");    
  }  
};

simulation.Simulation.prototype.getInnerHtmlFromCollection = function(query)
{
  var getter="var titles = [];" +
  "var coll = selenium.browserbot.getCurrentWindow().qx.bom.Collection.query('" + query + "');" +
  "for (var i=0, l=coll.length; i<l; i++) {" +
    "titles.push(coll[i].innerHTML)" +
  "}" +
  "selenium.browserbot.getCurrentWindow().qx.lang.Json.stringify(titles);";
  
  try {
    var stringResult = "var temp=" + String(this.__sel.getEval(getter));
  }
  catch(ex) {
    this.log("Couldn't get innerHTML for selector " + query + ": " + ex.message);
    return [];
  }
  eval(stringResult);
  return temp;
};


simulation.Simulation.prototype.getFeedTitles = function()
{
  return this.getInnerHtmlFromCollection("#tree .feed-item");
};


simulation.Simulation.prototype.getArticleTitles = function()
{
  return this.getInnerHtmlFromCollection("#listContainer .article-title");
};


simulation.Simulation.prototype.checkFeeds = function(titles)
{
  var firstArticleTitle = null;
  
  // Ignore IEBlog since it frequently contains enclosed elements like video
  // that cause older browsers to bug out.
  var feedTitles = [];
  for (var i=0,l=titles.length; i<l; i++) {
    if (titles[i] !== "IEBlog") {
      feedTitles.push(titles[i]);
    }
  }
  
  for (var i=0,l=feedTitles.length; i<l; i++) {
    try {
      this.__sel.click('//div[contains(text(),"' +  feedTitles[i] + '")]');
    }
    catch(ex) {
      this.log("Error while clicking feed title '" + feedTitles[i] + "': " + ex.message);
      continue;
    }
    Packages.java.lang.Thread.sleep(2500);
    try {
      var articleTitles = this.getArticleTitles();
    }
    catch(ex) {
      this.log("Couldn't get article titles for '" + feedTitles[i] + "': " + ex.message, "error");
      continue;
    }
    if (articleTitles.length == 0) {
      this.log("Feed " + feedTitles[i] + " has no articles!", "error");
      var firstArticleTitle = null;
    }
    else if (articleTitles[0] == firstArticleTitle) {
      this.log("Found the same article title for '" + feedTitles[i-1] + "' and '" + feedTitles[i] + "'", "error");
    }
    else {
      this.log("Found " + articleTitles.length + " articles in feed '" + feedTitles[i] + "'", "info");
      this.checkRandomArticle(articleTitles);
    }
    firstArticleTitle = feedTitles[0];
  }
};


simulation.Simulation.prototype.checkRandomArticle = function(titles)
{
  var index = Math.floor(Math.random() * (titles.length));
  var labelLoc = "//label[text() = '" + titles[index] + "']";
  
  try {
    this.__sel.click(labelLoc);
  }
  catch(ex) {
    this.log("Error while clicking article '" + titles[index] + "': " + ex.message, "error");
    return;
  }
  Packages.java.lang.Thread.sleep(1500);
  
  var visible = this.__sel.isVisible(labelLoc + "/following-sibling::div[@class='article-content']");
  if (!visible) {
    this.log("Content of article '" + titles[index] + "' is not displayed!", "error");
  }
  else {
    this.log("Content of article '" + titles[index] + "' displayed correctly.", "info");
  }
};


simulation.Simulation.prototype.waitForElementPresent = function(locator, timeout)
{
  var condition = 'selenium.isElementPresent("' + locator + '")';
  this.__sel.waitForCondition(condition, timeout || 5000);
};

mySim.runTest = function()
{
  this.feedLoadTimeout = 30000;  
  
  this.waitForElementPresent("//div[contains(text(), 'User Feeds')]");
  var titles = this.getFeedTitles();
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
