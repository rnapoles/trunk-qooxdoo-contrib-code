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

var selWin = simulation.Simulation.SELENIUMWINDOW;
var qxAppInst = simulation.Simulation.QXAPPINSTANCE;

var ignoreDocErrors = ["qx.ui.virtual"];

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
          if (icon.indexOf("class") >= 0) {
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
    initialItems = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer.getChildren()[2].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren();
    checkItems(initialItems, "qx");
    return warn;
  };
  
  this.addOwnFunction("getDocWarnings", getDocWarnings);
  var docWarnings = this.getEval("selenium.browserbot.getCurrentWindow().qx.Simulation.getDocWarnings();");
  
  // docWarnings returns an array, but Rhino gives us a string-like object.
  var docArray = String(docWarnings).split(",");
    
  function filterArr(item) {
    for (var i=0; i<ignoreDocErrors.length; i++) {
      if (item.indexOf(ignoreDocErrors[i]) >= 0) {
        return false;
      }
    }
    return true;
  }
  
  var filteredArray = docArray.filter(filterArr);
  
  if (filteredArray.length > 0) {
    var baseUrl = this.getConfigSetting("autHost") + this.getConfigSetting("autPath");
    this.log("Classes with documentation errors (Excluded: " 
             + ignoreDocErrors.join() + ")", "info");
    for (var i=0;i<filteredArray.length; i++) {
      this.errWarn++;
      var apiLink = ' <a href="' + baseUrl + '#' + filteredArray[i] + '">' + filteredArray[i] + '</a>';      
      this.log(apiLink, "warn");
    }    
  }
  
};

// - Main --------------------------------------------------------------------
(function() { 
  mySim.testFailed = false;
  mySim.errWarn = 0;

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

  if (!mySim.testFailed) {
    if (mySim.getConfigSetting("debug")) {
      print("Test run finished successfully.");
    }
    var errors = mySim.getTotalErrorsLogged() + mySim.errWarn;
    mySim.log("API ended with warnings or errors: " + errors, "info");
  }

  mySim.logTestDuration();
  //mySim.stop();

})();