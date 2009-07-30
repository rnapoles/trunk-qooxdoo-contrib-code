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
  'ignore' : 'data:Gears,showcase:Browser,widget:Iframe,test:Serialize,bom:Iframe,virtual:List,virtual:Cells,virtual:ListBinding,virtual:Messenger,progressive:*,legacy:*'
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

var logPause = 5000; // millisecs to wait after loading sample
var selectNextSample = qxAppInst + '.tree.addToSelection(' + qxAppInst + '.tree.getNextSiblingOf(' + qxAppInst + '.tree.getSelection()[0]))';
var runSample = qxAppInst + '.runSample()'; // play currently selected sample
var getSampleCategory = selWin + '.' + qxAppInst + '.tree.getSelection()[0].getParent().getLabel()'; // get category name
var getSampleLabel = selWin + '.' + qxAppInst + '.tree.getSelection()[0].getLabel()'; // get sample name
var getNextSampleCategory = selWin + '.' + qxAppInst + '.tree.getNextSiblingOf(' + selWin + '.' + qxAppInst + '.tree.getSelection()[0]).getParent().getLabel()';
var getNextSampleLabel = selWin + '.' + qxAppInst + '.tree.getNextSiblingOf(' + selWin + '.' + qxAppInst + '.tree.getSelection()[0]).getLabel()';
var qxLog = selWin + '.' + qxAppInst + '.f2.getContentElement().getDomElement().innerHTML'; // content of log iframe
var shutdownSample = selWin + '.' + qxAppInst + '.infosplit.getChildren()[0].getWindow().qx.core.ObjectRegistry.shutdown()';
mySim.currentSample = "current";
mySim.lastSample = "last";

/*
*  Returns a command that selects sample number [entry] from the sample tree 
*  when run through Selenium's runScript() method.
*/
function treeSelect(entry)
{
  entry = entry ? entry : 0;
  return qxAppInst + '.tree.select(' + qxAppInst + '.tree.getItems()[' + entry + '])';
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
    // run the sample
    this.runScript(scriptCode, "Running sample");
    
    //this.addErrorHandlerToDemo();
    
    //this.killBoxes();
    //Packages.java.lang.Thread.sleep(2000);
    
    if (nextSampleCategory == "progressive" && nextSampleLabel == "ProgressiveLoader") {
      print("Giving ProgressiveLoader some extra time.");
      Packages.java.lang.Thread.sleep(12000);
    }
    else {
      Packages.java.lang.Thread.sleep(2000);      
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
  //this.getEval(shutdownSample, "Shutting down sample application");
  //Packages.java.lang.Thread.sleep(2000);

  print(category + " - " + currentSample + ": Processing log");

  var sampleLog = this.getEval(qxLog, "Getting log for sample " + category + " - " + currentSample);  

  this.log('<h3>Last loaded demo: ' + category + ' - ' + currentSample + '</h3>', "info");
  
  /*
  var errorsBefore = this.getTotalErrorsLogged(); 
  
  if (isGlobalEventReady) {
    this.logGlobalErrors();
  }

  var errorsAfter = this.getTotalErrorsLogged();
  
  */
  
  //Packages.java.lang.Thread.sleep(120000);

  // we're only interested in logs containing warnings or errors
  var isErrWarn = false;
  if (sampleLog.indexOf('level-warn') > 0 || sampleLog.indexOf('level-error') > 0) {
    isErrWarn = true;
  }
  if (isErrWarn || this.getConfigSetting("logAll")) {
    if (isErrWarn) {
      this.errWarn++;
    }

    /* Selenium uses http get requests to pass messages to the server log.
    * If the log message is too long, the server throws an http exception.
    * So we need to chop the message into bits and make multiple calls.
    */
    var logArray = getLogArray(sampleLog);
    // we can speed this up since we don't have to wait for the browser
    this.__sel.setSpeed("150");

    for (var j=0, l=logArray.length; j<l; j++) {
      var line = logArray[j] + '</DIV>';
      // only log relevant lines
      if ( (line.indexOf('level-debug') < 0 && line.indexOf('level-info') < 0) 
          || this.getConfigSetting("logAll")) {
        print("Warning or Error found");
        line = line.replace(/\'/g, "\\'");
        line = line.replace(/\n/g, "<br/>");
        line = line.replace(/\r/g, "<br/>");
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

    this.__sel.setSpeed(this.getConfigSetting("stepSpeed"));  
  }
  return [category,currentSample];
};

simulation.Simulation.prototype.addErrorHandlerToDemo = function()
{
  var sampleQxReady = selWin + '.' + qxAppInst + ".infosplit.getChildren()[0].getWindow().qx";
  
  mySim.waitForCondition(sampleQxReady, 10000, 
                         "Waiting for sample's qx");
                         
  var sampleQxEventReady = selWin + '.' + qxAppInst + ".infosplit.getChildren()[0].getWindow().qx.event";
  
  mySim.waitForCondition(sampleQxEventReady, 10000, 
                         "Waiting for sample's qx.Event");                           
  
  var globalEventReady = selWin + '.' + qxAppInst + ".infosplit.getChildren()[0].getWindow().qx.event.GlobalError";
  
  var isGlobalEventReady = mySim.waitForCondition(globalEventReady, 10000, 
                                        "Waiting for qx.event.GlobalError");
  if (isGlobalEventReady) {
    this.addGlobalErrorHandler(selWin + '.' + qxAppInst + ".infosplit.getChildren()[0].getWindow()");
  }   
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

  if (include.length === 0) {
    this.runScript(treeSelect(2), "Selecting first category");
    this.runScript(qxAppInst + '.tree.getSelection()[0].setOpen(true)', "Opening first category");
    var finalSampleScript = selWin + '.' + qxAppInst + '.tree.getItems()[' + selWin + '.' + qxAppInst + '.tree.getItems().length - 1].getLabel()';
    var finalSample = this.getEval(finalSampleScript, "Getting final sample name");
    var finalCategoryScript = selWin + '.' + qxAppInst + '.tree.getItems()[' + selWin + '.' + qxAppInst + '.tree.getItems().length - 1].getParent().getLabel()';
    var finalCategory = this.getEval(finalCategoryScript, "Getting final category name");
    print("Final demo: " + finalCategory + ":" + finalSample);
    var currentCatSam = this.sampleRunner(runSample);
    this.currentCategory = currentCatSam[0];
    this.currentSample = currentCatSam[1];
    
    while (this.currentSample != this.lastSample) {
      print("currentCat " + this.currentCategory + " currentSam " + this.currentSample);
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
  mySim.errWarn = 0;

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
  
  mySim.logGlobalErrors();

  if (!mySim.testFailed) {
    if (mySim.getConfigSetting("debug")) {
      print("Test run finished successfully.");
    }
    mySim.log("Demos with warnings or errors: " + mySim.errWarn, "info");
  }

  mySim.logTestDuration();
  mySim.stop();

})();