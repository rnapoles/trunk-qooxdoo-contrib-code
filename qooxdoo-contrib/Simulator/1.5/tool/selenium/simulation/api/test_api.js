var baseConf = {
  'autName' : 'API',
  'globalTimeout' : 300000,
  'stepSpeed' : '250',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*custom /usr/lib/firefox-3.0.11/firefox -no-remote -P selenium-3',
  'browserId' : 'Firefox 3.0.11',
  'autHost' : 'http://localhost',
  'autPath' : '/~dwagner/workspace/qooxdoo.trunk/framework/api/index.html',
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

var selWin = 'selenium.qxStoredVars["autWindow"]';
var qxAppInst = simulation.Simulation.QXAPPINSTANCE;


simulation.Simulation.prototype.runTest = function()
{  
  // Make sure the locale is 'en' to simplify dealing with log messages.
  var setLocale = "qx.locale.Manager.getInstance().setLocale('en')";  
  this.runScript(setLocale, "Setting application locale to EN");
  
  this.logDocErrors();
  
};

simulation.Simulation.prototype.logDocErrors = function() 
{
  if (this.getConfigSetting("debug")) {
    print("Getting classes with documentation errors");
  }
  var getDocWarnings = function(){  
    function checkItems(items, parentLabel){
      for (var i = 0; i < items.length; i++) {
        var icon = items[i].getIcon();
        if (icon.indexOf("_warning") >= 0) {
          if (icon.match(/(class)|(interface)|(mixin)/)) {
            warn.push(parentLabel + "." + items[i].getLabel());
          }
          else {
            items[i].setOpen(true);
            var newParentLabel = false;
            if (parentLabel) {
              newParentLabel = parentLabel + "." + items[i].getLabel();
            }
            var kids = items[i].getChildren();
            checkItems(kids, newParentLabel);
          }
        }
      }
    }
    var warn = [];
    initialItems = selenium.qxStoredVars["autWindow"].qx.core.Init.getApplication().viewer.getChildren()[2].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren();
    checkItems(initialItems, "qx");
    return warn.join("|");
  };
  
  this.addOwnFunction("getDocWarnings", getDocWarnings);
  var docWarnings = this.getEval("selenium.qxStoredVars['autWindow'].qx.Simulation.getDocWarnings();");
  
  var docString = String(docWarnings);
  
  if (docString == "") {
    this.log("No documentation errors found.", "info");
    return;
  }
  
  var docArray = docString.split("|");
  
  var ignoreList = [];
  
  try {
    ignoreList = this.getConfigSetting("ignore").split(",");
    if (this.getConfigSetting("debug")) {
      print("Ignore list configured: " + ignoreList);
    }
  }
  catch(ex) {
    if (this.getConfigSetting("debug")) {
      print("No ignore list configured.");
    }
  }
    
  function filterArr(item) {
    for (var i=0; i<ignoreList.length; i++) {
      if (item.indexOf(ignoreList[i]) >= 0) {
        return false;
      }
    }
    return true;
  }
  
  docArray = docArray.filter(filterArr);
  
  if (docArray.length > 0) {
    var baseUrl = this.getConfigSetting("autHost") + this.getConfigSetting("autPath");
    this.log("Classes with documentation errors (Excluded: " 
             + ignoreList.join() + ")", "info");
    for (var i=0;i<docArray.length; i++) {
      var apiLink = ' <a href="' + baseUrl + '#' + docArray[i] + '">' + docArray[i] + '</a>';      
      this.log(apiLink, "warn");
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

  //mySim.logGlobalErrors();
  mySim.logResults();

  mySim.stop();

})();