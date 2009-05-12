importClass(Packages.com.thoughtworks.selenium.QxSelenium);

// - Config Section ------------------------------------------------------------
var config = {
  selServer   : "localhost",
  selPort     : 4444,
  testBrowser : "*custom /usr/lib/firefox-3.0.5/firefox -no-remote",
  autHost     : "http://172.17.13.245:8000",
  autPath     : "/application/demobrowser/source/"
};

var stepSpeed  = "1000"; // millisecs after each command
var logPause = 5000; // millisecs to wait after loading sample
var selWin = 'selenium.browserbot.getCurrentWindow()'; // get application iframe
var qxAppInst = 'qx.core.Init.getApplication().viewer'; // get demobrowser instance
var setPlayDemos = qxAppInst + '.setPlayDemos("all")'; // set demobrowser to 'autorun'
var getSampleCategory = selWin + '.' + qxAppInst + '.tree.getSelectedItem().getParent().getLabel()'; // get category name
var getSampleLabel = selWin + '.' + qxAppInst + '.tree.getSelectedItem().getLabel()'; // get sample name
var getNextSampleCategory = selWin + '.' + qxAppInst + '.tree.getNextSiblingOf(' + selWin + '.' + qxAppInst + '.tree.getSelectedItem()).getParent().getLabel()';
var getNextSampleLabel = selWin + '.' + qxAppInst + '.tree.getNextSiblingOf(' + selWin + '.' + qxAppInst + '.tree.getSelectedItem()).getLabel()';
var selectNextSample = qxAppInst + '.tree.addToSelection(' + qxAppInst + '.tree.getNextSiblingOf(' + qxAppInst + '.tree.getSelectedItem()))';
var runSample = qxAppInst + '.runSample()'; // play currently selected sample
var runNextSample = qxAppInst + '.playNext()'; // play next sample
var qxLog = selWin + '.' + qxAppInst + '.f2.getContentElement().getDomElement().innerHTML'; // content of log iframe
var isQxReady = 'var qxReady = false; try { if (selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer) { qxReady = true; } } catch(e) {} qxReady;'; // check if demobrowser application instance exists
var isLogDone = 'var logDone = false; var log = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer.f2.getContentElement().getDomElement().innerHTML; if (log.length >= 52 && log.indexOf("Dispose") < 0 ) { logDone = true; } logDone;'; // check if sample is finished
var usrAgent = 'navigator.userAgent';
var platform = 'navigator.platform';

var currentSample = "current";
var lastSample = "last";

/*
 * List of demos to ignore. Format: Category:Demo (using the tree items' labels),
 * i.e. spaces instead of underscores.
 * var ignore = ['data:Gears','showcase:Browser','widget:Iframe','test:Serialize'];
 */ 
var ignore = ['data:Gears','showcase:Browser','widget:Iframe','test:Serialize','test:Flash','bom:Iframe', 'treevirtual:TreeVirtual Selections'];

/*
 * List of demos to run. All others will be ignored.
 * var include = ['ui:Font','progressive:ProgressiveTable','widget:SelectBox'];
 */
var include = [];

// - Config End ----------------------------------------------------------------

var currentDate = new Date();
var logsWithErrors = 0;

// store command line parameters in config object
for (i in arguments) {
  if (arguments[i].indexOf("=") >0) {
    var tempArr = arguments[i].split("=");
    config[tempArr[0]] = tempArr[1];
  }
}

/*
*  Selects sample number [entry] from tree. Used to select a specific sample or category.
*/
function treeSelect(entry)
{
  entry = entry ? entry : 0;
  return 'qx.core.Init.getApplication().viewer.tree.select(qx.core.Init.getApplication().viewer.tree.getItems()[' + entry + '])';
}

/*
 * Open/create a log file and return the file object.
 */
function getLogFile()
{
  var logFileName = config.logFile ? config.logFile :  "demobrowser_" + currentDate.getTime() + ".log";
  var fstream = new java.io.FileWriter(logFileName, true);
  var out = new java.io.BufferedWriter(fstream);
  return out;
}

/*
*  Write a message to Selenium's browser side log and the local log file.
*/
function browserLog(msg)
{
  msg = msg ? String(msg) : "";
  print(msg);
  msg = msg.replace(/\'/g, "\\'");
  msg = msg.replace(/\n/g, "<br/>");
  msg = msg.replace(/\r/g, "<br/>");  
  var prefix = 'qxSimulator_' + currentDate.getTime();
  var logFile = getLogFile();
  logFile.write(prefix + ': ' + msg);
  logFile.newLine();
  logFile.close();
  return 'LOG.error("' + prefix + ': " + \'' + msg + '\');';
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
*  Runs the given script, then gets the current sample's name and log output and sends them to Selenium's log.
*/
function sampleRunner(script)
{
  var scriptCode = script ? script : runSample;  
  
  var skip = false;
  // If we have an ignore list, check if the next sample is in there.
  if (ignore.length > 0 && scriptCode.indexOf('playNext') > 0 ) {
    try {
      var nextSampleCategory = sel.getEval(getNextSampleCategory);
      var nextSampleLabel = sel.getEval(getNextSampleLabel);

      // Category "Demos" means there's a category folder selected, 
      // so look at the first sample inside.
      if (nextSampleCategory == "Demos") {
        sel.runScript(selectNextSample);
        nextSampleCategory = sel.getEval(getNextSampleCategory);
        nextSampleLabel = sel.getEval(getNextSampleLabel);
      }

      print("Next Sample: " + nextSampleCategory + ":" + nextSampleLabel);
      for (var i = 0; i < ignore.length; i++) {
        var ignoreCategory = ignore[i].substring(0, ignore[i].indexOf(':'));
        if (nextSampleCategory == ignoreCategory) {
          var ignoreSample = ignore[i].substr(ignore[i].indexOf(':') + 1);
          if (nextSampleLabel == ignoreSample) {
            sel.runScript(selectNextSample);
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
    sel.getEval(browserLog('<h3>SKIPPED ' + nextSampleCategory + ' - ' + nextSampleLabel + '</h3>'));
    return nextSampleLabel;
  } else {
    // run the sample
    try {
      sel.runScript(scriptCode);
    }
    catch(ex) {
      //print("Error while running script: " + ex);
      sel.getEval(browserLog("<DIV>ERROR while running script: " + ex + "</DIV>"));
    }

    /*
    Packages.java.lang.Thread.sleep(2000);
    try {      
      killBoxes();
    }
    catch(ex) {
      //print("Error while trying to close dialog boxes: " + ex);
      sel.getEval(browserLog("<DIV>ERROR while trying to close dialog boxes: " + ex + "</DIV>"));
    }
    */
    
    Packages.java.lang.Thread.sleep(2000);
    
    var currentSample = "Unknown demo";
    var category = "Unknown category"; 
    
    try {  
      currentSample = sel.getEval(getSampleLabel);
      category = sel.getEval(getSampleCategory);
    } catch(ex) {
      //print("ERROR: Unable to get determine current demo: " + ex);
      sel.getEval(browserLog('<DIV>Unable to determine current demo: ' + ex + '</DIV>'));  
    }
  }
  
  // wait for the sample to finish, then get its log output
  Packages.java.lang.Thread.sleep(logPause);
  /*
  try {
    sel.waitForCondition(isLogDone, "120000");
  }
  catch(ex) {
    print("Unable to determine if demo was loaded: " + category + " - " + currentSample);
    sel.getEval(browserLog('<DIV>Unable to determine if demo was loaded: ' + category + ' - ' + currentSample + '</DIV>'));
  }
  */
  print(category + " - " + currentSample + ": Processing log");

  var sampleLog = '';
  try {
    sampleLog = sel.getEval(qxLog);
  }
  catch(ex) {
    //print("Unable to get log for demo " + category + ' - ' + currentSample);
    sel.getEval(browserLog('<DIV>Unable to get log for demo: ' + category + ' - ' + currentSample + '</DIV>'));
  }
  
  sel.getEval(browserLog('<h3>Last loaded demo: ' + category + ' - ' + currentSample + '</h3>'));

  // we're only interested in logs containing warnings or errors
  if (sampleLog.indexOf('level-warn') > 0 || sampleLog.indexOf('level-error') > 0) {
    logsWithErrors++;
    sel.getEval(browserLog('<DIV style="padding-top: 8px; padding-right: 8px; padding-bottom: 8px; padding-left: 8px" class="qxappender">'));

    /* Selenium uses http get requests to pass messages to the server log.
    * If the log message is too long, the server throws an http exception.
    * So we need to chop the message into bits and make multiple calls.
    */
    var logArray = getLogArray(sampleLog);
    // we can speed this up since we don't have to wait for the browser
    sel.setSpeed("150");

    for (var j=0, l=logArray.length; j<l; j++) {
      var line = logArray[j] + '</DIV>';
      // only log relevant lines
      if (line.indexOf('level-debug') < 0 && line.indexOf('level-info') < 0) {
        print("Warning or Error found");
        line = line.replace(/\'/g, "\\'");
        line = line.replace(/\n/g, "<br/>");
        line = line.replace(/\r/g, "<br/>");
        sel.getEval(browserLog(line));
      }
    }
    sel.getEval(browserLog('</DIV>'));
    sel.setSpeed(stepSpeed);    
  }
  return currentSample;
}

function getDemoChooser(category, sample)
{
  var func = 'function chooseDemo(category, sample) {';
  func +=      'var viewer = qx.core.Init.getApplication().viewer;';
  func +=      'var tree = viewer.tree;'; 
  func +=      'items = tree.getItems();';
  func +=      'for (var i=1; i<items.length; i++) {';
  func +=        'if (items[i].getParent().getLabel() == category) {';
  func +=          'if (items[i].getLabel() == sample) {';
  func +=            'items[i].getParent().setOpen(true);';
  func +=            'tree.addToSelection(items[i]);';
  func +=            'viewer.runSample();';
  func +=          '}';
  func +=        '}';
  func +=      '}';
  func +=    '}';
  func +=    'chooseDemo("' + category + '","' + sample + '");';
  return func;
}

function killBoxes()
{
  // Demos might pop up alert boxes that will break the test if they aren't removed
  // before the next Selenium action. getAlert() simulates clicking "OK".
  if (sel.isAlertPresent()) {
    var al = sel.getAlert();
    print("Dismissed alert box:");
    print(al);
  }
  
  // Ditto for confirmation dialogs.
  if (sel.isConfirmationPresent()) {
    sel.chooseCancelOnNextConfirmation();
    var con = sel.getConfirmation();
    print("Dismissed confirmation dialog:");
    print(conf);
  }  
}

function getTestDuration(startTime)
{
  var stopTime = new Date();
  var elapsed = stopTime.getTime() - startTime.getTime();
  return elapsed;
}

function logTestDuration(elapsed)
{
  elapsed = (elapsed / 1000);
  min = Math.floor(elapsed / 60);
  sec = Math.round(elapsed % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  //print("Test run finished in: " + min + " minutes " + sec + " seconds.");
  sel.getEval(browserLog("<p>Test run finished in: " + min + " minutes " + sec + " seconds.</p>"));
}

function logEnvironmentInfo()
{
  var agent = sel.getEval(usrAgent);
  var plat = sel.getEval(platform);
  
  sel.getEval(browserLog("<h1>Demobrowser results from " + currentDate.toLocaleString() + "</h1>"));
  sel.getEval(browserLog("<p>Platform: " + plat + "</p>"));
  sel.getEval(browserLog("<p>User agent: " + agent + "</p>"));
}

function runTest()
{
  //sel.runScript(setPlayDemos);

  var startTime = new Date();
  
  print("Starting sample playback");
  
  if (include.length === 0) {
    sel.runScript(treeSelect(2));
    sel.runScript(qxAppInst + '.tree.getSelectedItem().setOpen(true)');
    currentSample = sampleRunner(runSample);
    while (currentSample != lastSample) {
      lastSample = currentSample;
      print("Done playing " + lastSample + ", starting next sample");

      try {      
        killBoxes();
      }
      catch(ex) {
        //print("Error while trying to close dialog boxes: " + ex);
        sel.getEval(browserLog("<DIV>ERROR while trying to close dialog boxes: " + ex + "</DIV>"));
      }

      currentSample = sampleRunner(runNextSample);
    }
  }
  else {
    sel.getEval(browserLog("<p>Selective run: " + include.length + " demos selected.</p>"));
    for (var j=0; j<include.length; j++) {
      var cat = include[j].substring(0, include[j].indexOf(':'));
      var sam = include[j].substr(include[j].indexOf(':') + 1);
      var runIncluded = getDemoChooser(cat, sam);
      currentSample = sampleRunner(runIncluded);
      try {      
        killBoxes();
      }
      catch(ex) {
        //print("Error while trying to close dialog boxes: " + ex);
        sel.getEval(browserLog("<DIV>ERROR while trying to close dialog boxes: " + ex + "</DIV>"));
      }
    }
  }

  logTestDuration(getTestDuration(startTime));

  sel.getEval(browserLog("<p>Samples with warnings or errors: " + logsWithErrors + "</p>"));
}

// - Main --------------------------------------------------------------------

var sel = false;

(function() {
  print("Starting test session with browser " + config.testBrowser);
  try {
    sel = new QxSelenium(config.selServer,config.selPort,config.testBrowser,config.autHost);
    if (sel) {
      sel.start();
      sel.setTimeout(300000);
      sel.open(config.autHost + config.autPath);
      sel.setSpeed(stepSpeed);
    }
  }
  catch(ex) {
    logEnvironmentInfo();
    var msg = "<DIV>ERROR: Unable to set up test run: " + ex + "</DIV>";
    if (sel) {
      sel.getEval(browserLog(msg));
      sel.stop();
    }
    else {
      browserLog(msg);
    }    
    return;
  }
  
  logEnvironmentInfo();
  
  try {
    sel.waitForCondition(isQxReady, "300000");
  }
  catch(ex) {
    var msg = "<DIV>ERROR: Unable to find qooxdoo instance.</DIV>";
    if (sel) {
      sel.getEval(browserLog(msg));
      sel.stop();
    }
    else {
      browserLog(msg);
    }
    return;
  }
  
  try {
    runTest();
  }
  catch(ex) {    
    var msg = "<DIV>ERROR: Unexpected error while running samples:<br/>" + ex + "</DIV>";
    if (sel) {
      sel.getEval(browserLog(msg));
    }
    else {
      browserLog(msg);
    }
  }
  
  if (sel) {
    sel.stop();
  }
  print("Test session finished.");
})();
