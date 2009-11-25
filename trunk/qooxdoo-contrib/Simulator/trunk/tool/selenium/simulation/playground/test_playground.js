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
  var locator = "qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/qx.ui.toolbar.MenuButton";  
  var menuWidget = selenium.getQxWidgetByLocator(locator);
  var kids = menuWidget.getMenu().getChildren();  
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
  
  var logMsgs = this.getEval(logHtml, "Getting log output from sample " + sample);
  if (this.logSampleWarnings(logMsgs, sample)) {
    sampleStarted = false;
  }
  
  return sampleStarted;
};

simulation.Simulation.prototype.logSampleWarnings = function(logCont, sample) 
{
  var reg = /(<div class="?level-(?:warn|error)"?>.*<\/div>)/gi;
  foundErrors = false;
  logWarn = reg.exec(logCont);
  try {
    if (logWarn) {      
      var level = "warn";
      if (logWarn[1].indexOf("level-error") > 0 ) {
        foundErrors = true;
        level = error;
      }
      this.log("Found errors and/or warnings in sample " + sample, "warn");
      this.log(logWarn[1], level);
    }
  }
  catch(ex) {}
  
  return foundErrors;
};

simulation.Simulation.prototype.getCodeMirrorActive = function()
{
  try {
    var codeMirrorIframe = this.__sel.isVisible('xpath=//iframe[@class="code-mirror-iframe"]');
    var codeMirrorHighlight = this.__sel.isElementPresent('xpath=//span[@class="js-keyword"]');
    codeMirrorHighlight = new String(codeMirrorHighlight);
    if (codeMirrorIframe && codeMirrorHighlight == "true") {
      return true;
    } else {
      return false;
    }
  } catch(ex) {
    this.log("Unable to check syntax highlighting: " + ex, "error");
    return false;
  }
};

simulation.Simulation.prototype.runTest = function()
{
  //this.__sel.windowmaximize();
  // Make sure the locale is 'en' to simplify dealing with log messages.
  var setLocale = "qx.locale.Manager.getInstance().setLocale('en')";
  this.runScript(setLocale, "Setting application locale to EN");    
   
  // Open log pane
  this.qxClick('qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/child[2]/qx.ui.toolbar.CheckBox', "", 'Opening log pane');
  
  // Load the first sample again to make sure we get the english log output.
  this.qxClick('qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/child[0]', '', 'Pressing Run button');

  this.addOwnFunction("getSampleNames", getSampleNames);  
  var sampleNames = this.getEval(selWin + ".qx.Simulation.getSampleNames();", "Getting sample names");
  sampleNames = String(sampleNames);
  var sampleArr = sampleNames.split(",");
  print("Found " + sampleArr.length + " samples: " + sampleArr); 

  // Log any errors that might have occurred since the application was started 
  this.logGlobalErrors();
  this.clearGlobalErrorStore();
      
  var sampleMenuButtonLocator = 'qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/qx.ui.toolbar.MenuButton';
  var sampleMenuLocator = sampleMenuButtonLocator + '/qx.ui.menu.Menu';
  
  // Click the menu button so the menu is created
  this.qxClick(sampleMenuButtonLocator, '', 'Clicking menu button');
  var sampleMenuFirstChild = this.__sel.qxObjectExecFunction(sampleMenuLocator + '/child[0]', 'toString');
  
  if (sampleMenuFirstChild.indexOf("MenuSlideBar") > 0) {
    sampleMenuLocator += '/qx.ui.menu.MenuSlideBar';
  }
  // Close the menu
  this.qxClick(sampleMenuButtonLocator, '', 'Clicking menu button');
  
  // Check if syntax highlighting is on  
  if (this.getCodeMirrorActive()) {
    this.log("Syntax highlighting is active", "info");
    // Turn off syntax highlighting
    this.qxClick('qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/child[0]/qx.ui.form.ToggleButton', '', 'Deactivating syntax highlighting');
    Packages.java.lang.Thread.sleep(500);
    if (this.getCodeMirrorActive()) {
      this.log("Syntax highlighting was not deactivated!", "error");
    } else {
      this.log("Syntax highlighting deactivated correctly", "info");
    }
    // And turn it on again
    this.qxClick('qxh=qx.ui.container.Composite/qx.ui.toolbar.ToolBar/child[0]/qx.ui.form.ToggleButton', '', 'Deactivating syntax highlighting');
    Packages.java.lang.Thread.sleep(500);
    if (this.getCodeMirrorActive()) {
      this.log("Syntax highlighting reactivated correctly", "info");
    } else {
      this.log("Syntax highlighting was not reactivated!", "error");
    }
  } else {
    this.log("Syntax highlighting is not active!", "error");
  }
  
  // Select and check each sample
  for (var i=0; i<sampleArr.length; i++) {
    if (sampleArr[i] !== "") {
      print("Selecting next sample: " + sampleArr[i]);
      this.qxClick(sampleMenuButtonLocator, '', 'Clicking menu button');
	    this.qxClick(sampleMenuLocator + '/child[' + i + ']', '', 'Selecting sample ' + sampleArr[i]);

      var boxCont = this.killBoxes();
	    Packages.java.lang.Thread.sleep(2000);
	  
      var sampleLoaded = this.isSampleLoaded(sampleArr[i]);
      var sampleStarted = this.isSampleStarted(sampleArr[i]);

      this.logGlobalErrors();
      this.clearGlobalErrorStore();  

      if (sampleLoaded && sampleStarted) {
        print(sampleArr[i] + " loaded and started.");
        this.log("Sample " + sampleArr[i] + " started without errors.", "info");
      }
      else {
        this.log(sampleArr[i] + " did not load and/or start correctly.", "error");        
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
    mySim.addGlobalErrorHandler();
    mySim.runTest();
  }
  catch(ex) {
    mySim.testFailed = true;
    var msg = "Unexpected error while running test!";
    if (mySim.debug) {
      print(msg + "\n" + ex);
    }
    mySim.log(msg + "<br/>" + ex, "error");
  }
  
  mySim.logGlobalErrors();
  mySim.logResults();

  mySim.stop();

})();
