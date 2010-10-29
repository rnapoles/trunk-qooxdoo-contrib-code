var baseConf = {
  'autName' : 'Demobrowser',
  'globalTimeout' : 300000,
  'stepSpeed' : '250',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*custom /usr/lib/firefox-3.0.10/firefox -no-remote -P selenium-3',
  'autHost' : 'http://localhost',
  'autPath' : '/~dwagner/workspace/qooxdoo.trunk/application/demobrowser/build/index.html',
  'simulatorSvn' : '/home/dwagner/workspace/qooxdoo.contrib/Simulator',
  'debug' : true,
  'logAll' : false,
  'ignore' : 'data:Gears,showcase:Browser,widget:Iframe,test:Serialize,bom:Iframe,progressive:*,legacy:*',
  'sampleGlobalErrorLogging' : false,
  'shutdownSample' : false,
  'reloadBrowser' : false
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
var qxAppInst = simulation.Simulation.QXAPPINSTANCE + '.viewer';

var logPause = 3000; // millisecs to wait after loading sample
var selectNextSample = qxAppInst + '.tree.addToSelection(' + qxAppInst + '.tree.getNextNodeOf(' + qxAppInst + '.tree.getSelection()[0]))';
var runSample = qxAppInst + '.runSample()'; // play currently selected sample
var getSampleCategory = selWin + '.' + qxAppInst + '.tree.getSelection()[0].getParent().getLabel()'; // get category name
var getSampleLabel = selWin + '.' + qxAppInst + '.tree.getSelection()[0].getLabel()'; // get sample name
var getNextSampleCategory = selWin + '.' + qxAppInst + '.tree.getNextNodeOf(' + selWin + '.' + qxAppInst + '.tree.getSelection()[0]).getParent().getLabel()';
var getNextSampleLabel = selWin + '.' + qxAppInst + '.tree.getNextNodeOf(' + selWin + '.' + qxAppInst + '.tree.getSelection()[0]).getLabel()';
var qxLog = selWin + '.' + qxAppInst + '.f2.getContentElement().getDomElement().innerHTML'; // content of log iframe
var shutdownSample = selWin + '.' + qxAppInst + '._infosplit.getChildren()[0].getWindow().qx.core.ObjectRegistry.shutdown()';
mySim.currentSample = "current";
mySim.lastSample = "last";
mySim.demoFrame = selWin + '.' + qxAppInst + '._iframe'; 
mySim.demoWin = mySim.demoFrame + ".getWindow()";
mySim.demoQx = mySim.demoWin + ".qx";
mySim.demoQxApp = mySim.demoQx + '.core.Init.getApplication()';

/*
*  Returns a command that selects sample number [entry] from the sample tree 
*  when run through Selenium's runScript() method.
*/
function treeSelect(entry)
{
  entry = entry ? entry : 0;
  return qxAppInst + '.tree.setSelection([' + qxAppInst + '.tree.getItems()[' + entry + ']])';
}

/*
* Generated HTML elements are uppercase in IE
*/
function getLogArray(result)
{
  var logArray = [];
  if (result.indexOf("</div>") >0 ) {
    logArray = result.split("</div>");
  } else if (result.indexOf("</DIV>") >0 ) {
    logArray = result.split("</DIV>");
  }
  return logArray;
}

/*
 * This function is added to the AUT's context using the Simulation.addOwnFunction()
 * method. It allows the selection of a specific demo using the category/demo 
 * name.
 */
var chooseDemo = function(category, sample) 
{
  var viewer = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer;
  var tree = viewer.tree; 
  items = tree.getItems();
  for (var i=1; i<items.length; i++) {
    if (items[i].getParent().getLabel() == category) {
      if (items[i].getLabel() == sample) {
        items[i].getParent().setOpen(true);
        tree.addToSelection(items[i]);
        viewer.runSample();
      }
    }
  }
};

/*
 * This function is added to the AUT's context using the Simulation.addOwnFunction()
 * method. It returns an array containing the names of all demos in a given
 * category.
 */
var getDemosByCategory = function(category)
{
  var viewer = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer;
  var tree = viewer.tree; 
  items = tree.getItems();
  var samples = [];
  for (var i=1; i<items.length; i++) {
    if (items[i].getParent().getLabel() == category) {
      samples.push(items[i].getLabel());
    }
  }
  return samples;
};

simulation.Simulation.prototype.waitForDemoApp = function()
{
  this.__sel.waitForCondition(this.demoWin, 20000);
  this.__sel.waitForCondition(this.demoQx, 20000);
  this.__sel.waitForCondition(this.demoQxApp, 20000);
};

/*
*  Runs the given script, then gets the current sample's name and log output and
*  sends them to Selenium's log.
*/
simulation.Simulation.prototype.sampleRunner = function(script)
{
  var scriptCode = script ? script : runSample;
  
  var skip = false;
  // If we have an ignore list, check if the next sample is in there.
  var ignore = this.ignore;
  if (ignore.length > 0 && scriptCode.indexOf('playNext') > 0 ) {
    try {
      var nextSampleCategory = this.getEval(getNextSampleCategory, "Getting category of next sample");
      var nextSampleLabel = this.getEval(getNextSampleLabel, "Getting label of next sample");
  
      // Category "Demos" means there's a category folder selected, 
      // so look at the first sample inside.
      if (nextSampleCategory == "Demos") {
        this.runScript(selectNextSample, "Selecting next sample from tree");
        this.runScript(qxAppInst + '.tree.getSelection()[0].setOpen(true)', "Opening category");
        nextSampleCategory = this.getEval(getNextSampleCategory, "Getting category of next sample");
        nextSampleLabel = this.getEval(getNextSampleLabel, "Getting label of next sample");
      }
  
      print("Next Sample: " + nextSampleCategory + ":" + nextSampleLabel);
      for (var i = 0; i < ignore.length; i++) {
        var ignoreCategory = ignore[i].substring(0, ignore[i].indexOf(':'));
        if (nextSampleCategory == ignoreCategory) {
          var ignoreSample = ignore[i].substr(ignore[i].indexOf(':') + 1);
          if (nextSampleLabel == ignoreSample || ignoreSample == "*") {
            this.runScript(selectNextSample, "Selecting next sample from tree");
            skip = true;
          }
        }
      }
    }
    catch(ex) {
      /* If we can't identify the next sample, we've either reached the end of
         the list, or something went wrong. */
      print("Unable to retrieve next sample's category and/or label.");
      return;
    }
  } 

  if (skip) {
    //print("Skipping sample: " + nextSampleCategory + ' - ' + nextSampleLabel);
    this.log('SKIPPED ' + nextSampleCategory + ' - ' + nextSampleLabel, "info");
    return [nextSampleCategory,nextSampleLabel];
  }
  else {
    this.log('Loading demo ' + nextSampleCategory + ' - ' + nextSampleLabel, "debug");
    // run the sample
    this.runScript(scriptCode, "Running sample");
    
    try {
      this.waitForDemoApp();
    } catch(ex) {
      this.log("Error while waiting for demo " + nextSampleCategory + " - " + nextSampleLabel + " to load: " + ex, "error");
    }
    
    if (this.getConfigSetting("sampleGlobalErrorLogging")) {
      try {
        this.addErrorHandlerToDemo();
      } catch(ex) {
        this.log("Could not add global error handler to demo " + nextSampleCategory + ":" + nextSampleLabel);
      }
    }
    
    var currentSample = "Unknown demo";
    var category = "Unknown category";
    
    var sampleTemp = this.getEval(getSampleLabel, "Getting current sample label");
    
    if (!sampleTemp) {
      // try again
      sampleTemp = this.getEval(getSampleLabel, "Getting current sample label");
      if (!sampleTemp) {
        this.log("Unable to determine current demo", "error");
      }
    }
    else {
      currentSample = sampleTemp;
    }
    
    var categoryTemp = this.getEval(getSampleCategory, "Getting current sample category");
    
    if (!categoryTemp) {
      // try again
      categoryTemp = this.getEval(getSampleCategory, "Getting current sample category");
      if (!categoryTemp) {
        this.log("Unable to determine current category", "error");
      }
    }
    else {
      category = categoryTemp;
    }
  }

  // wait for the sample to finish loading, then get its log output
  Packages.java.lang.Thread.sleep(logPause);
  
  // Shut down the sample application
  if (this.getConfigSetting("shutdownSample")) {
    this.getEval(shutdownSample, "Shutting down sample application");
    Packages.java.lang.Thread.sleep(2000);
  }

  print(category + " - " + currentSample + ": Processing log");

  var sampleLog = this.getEval(qxLog, "Getting log for sample " + category + " - " + currentSample);  

  //this.log('Last loaded demo: ' + category + ' - ' + currentSample, "debug");
  
  var expectedLogEntries = [
    "Load runtime",
    "Main runtime",
    "Finalize runtime"
  ];
  
  if (this.getConfigSetting("shutdownSample", false)) {
    expectedLogEntries.push("ObjectRegistry: Disposed");
  }
  
  if (sampleLog) {
    for (var i = 0, l = expectedLogEntries.length; i < l; i++) {
      if (sampleLog.indexOf(expectedLogEntries[i]) < 0) {
        errWarn = true;
      }
    }
  }
  else {
    this.log("Unable to get log for sample " + category + "-" + currentSample, "error");
  }
  
  if (this.getConfigSetting("sampleGlobalErrorLogging")) {
    try {
      this.log("Global error log contents for " + category + ":" + currentSample, "debug");
      this.logGlobalErrors();
    } 
    catch (ex) {
      this.log("Unable to log global errors: " + ex, "error");
    }
  }
  
  //Packages.java.lang.Thread.sleep(120000);

  // we're only interested in logs containing warnings or errors
  var isErrWarn = false;
  if (sampleLog.indexOf('level-warn') > 0 || sampleLog.indexOf('level-error') > 0) {
    this.log("Sample " + category + "-" + currentSample + " has incomplete log!","warn");
    isErrWarn = true;
  }
  if (isErrWarn || this.getConfigSetting("logAll")) {

    /* Selenium uses http get requests to pass messages to the server log.
    * If the log message is too long, the server throws an http exception.
    * So we need to chop the message into bits and make multiple calls.
    */
    var logArray = getLogArray(sampleLog);
    // we can speed this up since we don't have to wait for the browser
    this.__sel.setSpeed("150");

    this.log('<div class="qxappender">');
    for (var j=0, l=logArray.length; j<l; j++) {
      var line = logArray[j] + '</DIV>';
      // only log relevant lines
      if ( (line.indexOf('level-debug') < 0 && line.indexOf('level-info') < 0) 
          || this.getConfigSetting("logAll")) {
        print("Warning or Error found");
        line = line.replace(/\'/g, "\\'");
        line = line.replace(/\n/g, "<br/>");
        line = line.replace(/\r/g, "<br/>");
        //line = '<div class="qxappender"'> + line + '</div>';
        if (line.indexOf('level-error')) {
          this.log(line, "error");
        }
        else if (line.indexOf('level-warn')) {
          this.log(line, "warn");
        }
        else if (line.indexOf('level-info')) {
          this.log(line, "info");
        }
        else {
          this.log(line, "debug");
        }
      }
    }
    this.log("</div>");

    this.__sel.setSpeed(this.getConfigSetting("stepSpeed"));  
  }
  else {
    this.log("No errors/warnings found", "info");
  }
  
  return [category,currentSample];
};

simulation.Simulation.prototype.addErrorHandlerToDemo = function()
{
  this.addGlobalErrorHandler(selWin + '.' + qxAppInst + ".viewer._iframe.getWindow()");
};

simulation.Simulation.prototype.runTest = function()
{
  print("Starting sample playback");

  var ignore = [];
  
  try {
    ignore = this.getConfigSetting("ignore").split(",");
    if (this.getConfigSetting("debug")) {
      print("Ignore list configured: " + ignore);
    }
  }
  catch(ex) {
    if (this.getConfigSetting("debug")) {
      print("No ignore list configured.");
    }
  }
  
  this.ignore = ignore;

  var include = [];
  
  try {
    include = this.getConfigSetting("include").split(",");
    if (this.getConfigSetting("debug")) {
      print("Include list configured: " + include);
    }
  }
  catch(ex) {
    if (this.getConfigSetting("debug")) {
      print("No include list configured.");
    }
  }
  
  // Remove the text from the search field so no demos are filtered
  this.qxType('qxh=[@classname=demobrowser.DemoBrowser]/qx.ui.splitpane.Pane/qx.ui.container.Composite/qx.ui.container.Composite/qx.ui.form.TextField', "");

  if (include.length === 0) {
    this.runScript(treeSelect(2), "Selecting first category");
    this.runScript(qxAppInst + '.tree.getSelection()[0].setOpen(true)', "Opening first category");
    var finalSampleScript = selWin + '.' + qxAppInst + '.tree.getItems()[' + selWin + '.' + qxAppInst + '.tree.getItems().length - 1].getLabel()';
    var finalSample = this.getEval(finalSampleScript, "Getting final sample name");
    var finalCategoryScript = selWin + '.' + qxAppInst + '.tree.getItems()[' + selWin + '.' + qxAppInst + '.tree.getItems().length - 1].getParent().getLabel()';
    var finalCategory = this.getEval(finalCategoryScript, "Getting final category name");
    print("Final demo: " + finalCategory + ":" + finalSample);
    var currentCatSam = this.sampleRunner(runSample);
    this.currentCategory = this.lastCategory = currentCatSam[0];
    this.currentSample = currentCatSam[1];
    
    if (this.getConfigSetting("theme", false)) {
      var chosenTheme = this.getConfigSetting("theme");
      this.log("Switching theme to " + chosenTheme, "info");
      this.qxClick('qxh=[@classname="demobrowser.DemoBrowser"]/qx.ui.toolbar.ToolBar/child[1]/[@label="Theme"]', "", "Clicking Theme button");
      this.qxClick('qxh=[@classname="demobrowser.DemoBrowser"]/qx.ui.toolbar.ToolBar/child[1]/[@label="Theme"]/qx.ui.menu.Menu/[@label="' + chosenTheme + '"]', "", "Selecting theme " + chosenTheme);    
    }
    
    while (this.currentSample != this.lastSample) {
      if (this.lastCategory) {
        if (this.currentCategory != this.lastCategory && this.getConfigSetting("reloadBrowser")) {
          print("New category, reloading application");
          this.log("New category " + this.currentCategory + ", reloading application", "debug");
          this.qxOpen();
          this.addGlobalErrorHandler();
          this.addOwnFunction("chooseDemo", chooseDemo);
          this.getEval(selWin + ".qx.Simulation.chooseDemo('" + this.currentCategory + "','" + this.currentSample + "');");
        }
      }
      
      if (this.currentCategory != finalCategory || (this.currentCategory == finalCategory && this.currentSample != finalSample) ) {
        this.lastCategory = this.currentCategory;
        this.lastSample = this.currentSample;        
        print("Done playing " + this.lastSample + ", starting next sample");
        
        this.killBoxes();
        var runNextSample = qxAppInst + '.playNext()';
        var currentCatSam = this.sampleRunner(runNextSample);
        this.currentCategory = currentCatSam[0];
        this.currentSample = currentCatSam[1];
      }
      else {
        this.currentCategory = this.lastCategory;
        this.currentSample = this.lastSample;
      }
    }
  }
  else {
    this.log("Selective run: " + include.length + " demos/categories selected.", "info");
    this.addOwnFunction("chooseDemo", chooseDemo);
    this.addOwnFunction("getDemosByCategory", getDemosByCategory);
    for (var j=0; j<include.length; j++) {
      var cat = include[j].substring(0, include[j].indexOf(':'));
      var sam = include[j].substr(include[j].indexOf(':') + 1);
      // If the demo name is a wildcard, run all demos from the category 
      if (sam == "*") {
        var getDemos = selWin + ".qx.Simulation.getDemosByCategory('" + cat + "');";
        var categoryDemos = this.getEval(getDemos, "Getting demos in category " + cat);
        var categoryDemoArr = categoryDemos.split(",");
        for (var k=0; k<categoryDemoArr.length; k++) {
          var runIncluded = "qx.Simulation.chooseDemo('" + cat + "','" + categoryDemoArr[k] + "');";
          var currentCatSam = this.sampleRunner(runIncluded);
          this.currentCategory = currentCatSam[0];
          this.currentSample = currentCatSam[1];
          this.killBoxes();
        }
      }
      else {
        if (this.currentCategory && cat != this.currentCategory && this.getConfigSetting("reloadBrowser")) {
          print("New category, reloading application");
          this.log("New category " + this.currentCategory + ", reloading application", "debug");
          this.qxOpen();
          this.addGlobalErrorHandler();
          this.addOwnFunction("chooseDemo", chooseDemo);
          this.addOwnFunction("getDemosByCategory", getDemosByCategory);
        }
        
        var runIncluded = "qx.Simulation.chooseDemo('" + cat + "','" + sam + "');";
        var currentCatSam = this.sampleRunner(runIncluded);
        this.currentCategory = currentCatSam[0];
        this.currentSample = currentCatSam[1];
        this.killBoxes();
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

  var isAppReady = mySim.waitForCondition(simulation.Simulation.ISQXAPPREADY, 20000, 
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
  
  mySim.log("Global error log contents for Demobrowser", "debug");
  mySim.logGlobalErrors();
  mySim.logResults();

  mySim.stop();

})();