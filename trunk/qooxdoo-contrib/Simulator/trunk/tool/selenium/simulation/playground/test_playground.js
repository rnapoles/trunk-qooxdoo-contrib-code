var baseConf = {
  'autName' : 'Playground',
  'globalTimeout' : 300000,
  'stepSpeed' : '250',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*custom /usr/lib/firefox-3.0.10/firefox -no-remote -P selenium-3',
  'autHost' : 'http://localhost',
  'autPath' : '/~dwagner/workspace/qooxdoo.trunk/application/playground/build/index.html',
  'simulatorSvn' : '/home/dwagner/workspace/qooxdoo.contrib/Simulator' 
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
var logHtml = selWin + "." + qxAppInst + ".logelem.innerHTML";

var getSampleNames = function()
{
  // TODO: Make this less horrible.
  var kids = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().getRoot().getChildren()[0].getChildren()[1].getChildren()[0].getChildren()[1].getMenu().getChildren();  
  var sampleNames = "";
  for(var i=0,l=kids.length; i<l; i++) {  
    sampleNames += kids[i].getLabel() + ",";
  }
  return sampleNames;
};

simulation.Simulation.prototype.isSampleLoaded = function(sample)
{
  var sampleLoaded = false;  
  var log = "Checking if " + sample + " was loaded.";   
  print(log);  
  var tmp = "Starting application '" + sample + "'";
  var check = logHtml + '.indexOf("' + tmp + '") > 0';
  var isLoaded = this.getEval(check, log);  
  if (isLoaded == "true") {
    sampleLoaded = true;
  }
  return sampleLoaded;
};

simulation.Simulation.prototype.isSampleStarted = function(sample)
{
  var sampleStarted = false;
  var log = "Checking if sample " + sample + " was started successfully.";
  print(log);
  var check = logHtml + ".indexOf('Successfully started') > 0";  
  var isStarted = this.getEval(check, log);  
  if (isStarted == "true") {
    sampleStarted = true;
  }
  return sampleStarted;
};

simulation.Simulation.prototype.runTest = function()
{
  // Make sure the locale is 'en' to simplify dealing with log messages.
  var setLocale = "qx.locale.Manager.getInstance().setLocale('en')";
  this.runScript(setLocale, "Setting application locale to EN");    
   
  // Open log pane
  this.qxClick('qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/child[2]/qx.ui.toolbar.CheckBox', 'Opening log pane');
  
  // Load the first sample again to make sure we get the english log output.
  this.qxClick('qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/child[0]', 'Pressing Run button');

  this.addOwnFunction("getSampleNames", getSampleNames);  
  var sampleNames = this.getEval("selenium.browserbot.getCurrentWindow().qx.Simulation.getSampleNames();", "Getting sample names");
  sampleNames = String(sampleNames);
  var sampleArr = sampleNames.split(",");
  print("Found " + sampleArr.length + " samples: " + sampleArr); 
   
  for (var i=0; i<sampleArr.length; i++) {
    if (sampleArr[i] !== "") {
      print("Selecting next sample: " + sampleArr[i]);
      this.qxClick('qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/qx.ui.toolbar.MenuButton', 'Clicking menu button');
      this.qxClick('qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/qx.ui.toolbar.MenuButton/qx.ui.menu.Menu/child[' + i + ']', 'Selecting sample ' + sampleArr[i]);      

      var boxCont = this.killBoxes();
      
      var sampleLoaded = this.isSampleLoaded(sampleArr[i]);
      var sampleStarted = this.isSampleStarted(sampleArr[i]);  
  
      if (sampleLoaded && sampleStarted) {
        print(sampleArr[i] + " loaded and started.");
        this.log("Sample " + sampleArr[i] + " started without errors.", "info");
      }
      else {
        this.errWarn++;
        this.log(sampleArr[i] + " did not load and/or start correctly.", "error");        
      }
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
  
  mySim.logEnvironment();   
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
    if (mySim.debug) {
      print(msg + "\n" + ex);
    }
    mySim.log(msg, "error");
  }

  if (!mySim.testFailed) {
    if (mySim.debug) {
      print("Test run finished successfully.");
    }
    mySim.log("Playground ended with warnings or errors: " + mySim.errWarn, "info");
  }

  mySim.logTestDuration();
  mySim.stop();

})();
