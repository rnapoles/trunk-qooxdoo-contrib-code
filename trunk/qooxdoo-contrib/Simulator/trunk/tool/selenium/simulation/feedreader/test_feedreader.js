var baseConf = {
  autName : 'Feedreader',
  globalTimeout : 300000,
  stepSpeed : '250',
  selServer : 'localhost',
  selPort : 4444,
  testBrowser : '*opera',
  autHost : 'http://localhost',
  autPath : '/~dwagner/workspace/qooxdoo.trunk/application/feedreader/build/index.html',
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

var mySim = new simulation.Simulation(baseConf,args);

var selWin = simulation.Simulation.SELENIUMWINDOW;
var qxAppInst = simulation.Simulation.QXAPPINSTANCE;


simulation.Simulation.prototype.checkArticle = function()
{
  var articleScript = selWin + '.qx.Simulation.getObjectByClassname(' + selWin + '.qx.core.Init.getApplication(), "feedreader.view.Article").getArticle()';  
  var article = this.getEval(articleScript, "Checking for article");

  if (article != "null") {
    print("Article found.");
  }
  else {
    this.log("ERROR: No Article found.", "error");    
  }  
};

simulation.Simulation.prototype.checkFeeds = function()
{
  var feedChecker = function()
  {
    var qxApp = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication(); 
    var items = qxApp.getRoot().getChildren()[0].getChildren()[2].getChildren()[0].getItems();
    var invalidFeeds = [];
    for (var i=0,l=items.length; i<l; i++) {
      if (items[i].getIcon().indexOf("process-stop") >=0) {
        invalidFeeds.push(items[i].getLabel());
      }
    }
    return invalidFeeds.join("|");
  };
  
  this.addOwnFunction("checkFeeds", feedChecker);
  var invalidFeeds = this.getEval("selenium.qxStoredVars['autWindow'].qx.Simulation.checkFeeds()");
  invalidFeeds = String(invalidFeeds);
  invalidFeedArray = invalidFeeds.split("|");
  for (var i=0,l=invalidFeedArray.length; i<l; i++) {
    this.log("Feed not loaded: " + invalidFeedArray[i], "warn");
  }
  
};

mySim.runTest = function()
{
  this.addChildrenGetter();
  this.addObjectGetter();
  
  var testPause = 360000;

  var tree = selWin + '.qx.Simulation.getObjectByClassname(' + selWin +'.qx.core.Init.getApplication(), "qx.ui.tree.Tree")';
  //var tree = selWin + '.' + qxAppInst +  '.getRoot().getChildren()[0].getChildren()[2].getChildren()[0]';
  var lastFeedNum = this.getEval(tree + ".getItems().length - 1", "Getting last feed's number");
  
  var isLastFeedLoaded = tree + ".getItems()[" + lastFeedNum + "].getIcon().indexOf('internet-feed-reader.png') >= 0";  
  this.waitForCondition(isLastFeedLoaded, testPause, "Waiting for feeds to load");
  
  this.checkFeeds();
  
  var getLastFeedLabel = tree + ".getItems()[" + lastFeedNum + "].getLabel()";
  var lastFeedLabel = this.getEval(getLastFeedLabel, "Getting last feed's label");
  
  this.__sel.setSpeed("1000");
  
  this.getEval(tree + ".resetSelection()", "Resetting tree selection");
    
  this.qxClick("qxh=app:qx.ui.tree.Tree/child[0]/child[0]/child[0]", "", "Selecting first feed from list");  
  
  this.qxClick('qxh=app:[@classname="feedreader.view.List"]/qx.ui.container.Stack/qx.ui.form.List/child[0]', "", "Selecting first feed item.");
  
  this.checkArticle();
  
  var staticFeedsLabel = tree + ".getItems()[0].getContentElement().getChildren()[2].getChildren()[0].getContent().toString()";
  
  var oldLabel = this.getEval(staticFeedsLabel, "Getting label of Static Feeds");

  // Use the preferences window to change the application language  
  // Click the preferences button, then check if the prefs window opened.  
  this.qxClick("qxh=qx.ui.container.Composite/child[1]/qx.ui.toolbar.Part/child[5]", "", "Clicking Preferences button.");
  Packages.java.lang.Thread.sleep(2000);

  var prefWindowScript = selWin + '.qx.Simulation.getChildrenByClassname(' + selWin + '.qx.core.Init.getApplication().getRoot(), "feedreader.view.PreferenceWindow")[0]';
  var isPrefWindowVisible = prefWindowScript + ".getVisibility() == 'visible'";    
  this.waitForCondition(isPrefWindowVisible, 10000, "Waiting for Preferences window to open.");
  Packages.java.lang.Thread.sleep(2000);

  // Click the "Italiano" radio button.
  var radioItalian = 'qxh=app:[@caption=".*"]/qx.ui.groupbox.GroupBox/[@label="Italiano"]';
  this.qxClick(radioItalian, "", "Selecting language");
  Packages.java.lang.Thread.sleep(2000);
  // Click again just to be sure (bug #2193).
  this.qxClick(radioItalian, "", "Selecting language");
  
  // Click the "OK" button 
  var buttonOk = 'qxh=app:[@caption=".*"]/qx.ui.container.Composite/[@label="OK"]';  
  this.qxClick(buttonOk, "", "Clicking OK.");    
  Packages.java.lang.Thread.sleep(2000);
  
  // Check if the preferences window closed. Click "OK" again if it isn't.
  var prefWinVis = this.getEval(isPrefWindowVisible, "Checking if preferences window is visible");
  // getEval returns an object, not a boolean
  if (String(prefWinVis) != "false") {
    this.qxClick(buttonOk, "", "Clicking OK again.");
    Packages.java.lang.Thread.sleep(2000);
  }
  
  var isPrefWindowHidden = prefWindowScript + ".getVisibility() == 'hidden'";
  this.waitForCondition(isPrefWindowHidden, 10000, "Waiting for preferences window to close");

  // Check if the label of the "Static Feeds" tree folder has changed
  var newLabel = this.getEval(staticFeedsLabel, "Getting new 'Static Feeds' label.");
  if (oldLabel != newLabel) {
    this.log("Language changed successfully.", "info");
  }
  else {
    this.log("ERROR: Language change failed.", "error");
  }
  
  // Add a new feed
  // Click "Add Feed"
  this.qxClick('qxh=qx.ui.container.Composite/child[1]/qx.ui.toolbar.Part/child[0]', "", "Clicking Add Feed button");
  Packages.java.lang.Thread.sleep(2000);
    
  var feedWindowScript = selWin + '.qx.Simulation.getChildrenByClassname(' + selWin + '.qx.core.Init.getApplication().getRoot(), "feedreader.view.AddFeedWindow")[0]';
  var isFeedWindowVisible = feedWindowScript + ".getVisibility() == 'visible'";
  this.waitForCondition(isFeedWindowVisible, 10000, "Waiting for Add Feed window to open.");
  Packages.java.lang.Thread.sleep(2000);
  
  // Check if the Add Feed window's caption was translated.
  var addFeedWindowLabel = feedWindowScript + ".getCaption().toString()";
  var addLabel = this.getEval(addFeedWindowLabel, "Getting Add Feed window's caption");
  print("Add Feed window's label: " + addLabel);
  if (addLabel.indexOf('Aggiungi') < 0 ) {
    this.log('ERROR: Feed window has unexpected title "' + addLabel + '". Possible translation problem.', "error");
  }
  
  // Enter new feed details  
  //this.typeKeys('qxh=app:[@caption=".*feed.*"]/qx.ui.groupbox.GroupBox/child[1]', 'Golem');
  var setFeedTitle = feedWindowScript + ".getChildren()[0].getChildren()[1].setValue('Golem')";  
  this.getEval(setFeedTitle, "Setting feed title");

  //this.typeKeys('qxh=app:[@caption=".*feed.*"]/qx.ui.groupbox.GroupBox/child[3]', 'http://rss.golem.de/rss.php?feed=ATOM1.0');  
  var setFeedUrl = feedWindowScript + ".getChildren()[0].getChildren()[3].setValue('http://rss.golem.de/rss.php?feed=ATOM1.0')";  
  this.getEval(setFeedUrl, "Setting feed URL");

  this.qxClick('qxh=app:[@caption=".*feed.*"]/qx.ui.form.Button', "", "Clicking 'Add'.");
  Packages.java.lang.Thread.sleep(2000);
  
  // Check if the Add Feed Window closed.
  var feedWinVis = this.getEval(isFeedWindowVisible, "Waiting for Add Feed window to close.");
  if (String(feedWinVis) == "true") {
    print("Add Feed Window still visible, clicking again.");
    this.qxClick('qxh=app:[@caption=".*feed.*"]/qx.ui.form.Button', "", "Clicking 'Add'.");
  }

  var isFeedWindowHidden = feedWindowScript + ".getVisibility() == 'hidden'";  
  this.waitForCondition(isFeedWindowHidden, 10000, "Checking if Add Feed window is closed");
  
  // Check if the new feed loaded.
  var newLastFeedNum = this.getEval(tree + ".getItems().length - 1", "Getting last feed's number");  
  var isNewLastFeedLoaded = tree + ".getItems()[" + newLastFeedNum + "].getIcon().indexOf('internet-feed-reader.png') >= 0";
  this.waitForCondition(isNewLastFeedLoaded, testPause, "Waiting for new feed to load.");
    
  var getNewLastFeedLabel = tree + ".getItems()[" + newLastFeedNum + "].getLabel()";
  var newLastFeedLabel = this.getEval(getNewLastFeedLabel, "Getting new feed's label");
  
  if (newLastFeedLabel != lastFeedLabel) {
    this.log("New feed loaded correctly.", "info");
  }
  else {
    this.log("ERROR: New feed has unexpected label: " + newLastFeedLabel, "error");
  }
  
  // Select the new feed
  var treeLastSelect = tree + ".addToSelection(" + tree + ".getItems()[" + newLastFeedNum + "])";
  this.getEval(treeLastSelect, "Selecting new feed.");      
  
  this.qxClick('qxh=app:[@classname="feedreader.view.List"]/qx.ui.container.Stack/qx.ui.form.List/child[0]', "", "Selecting first item from new feed.");  
  
  this.checkArticle();
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
    if (mySim.getConfigSetting("debug")) {
      print(msg + "\n" + ex);
    }
    mySim.log(msg, "error");
  }

  mySim.logGlobalErrors();
  mySim.logResults();

  mySim.stop();

})();
