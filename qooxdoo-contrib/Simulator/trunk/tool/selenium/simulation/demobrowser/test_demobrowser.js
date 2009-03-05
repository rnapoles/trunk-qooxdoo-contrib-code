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
var logPause = 4000; // millisecs to wait after loading sample
var selWin = 'selenium.browserbot.getCurrentWindow()'; // get application iframe
var qxAppInst = 'qx.core.Init.getApplication().viewer'; // get demobrowser instance
var setPlayDemos = qxAppInst + '.setPlayDemos("all")'; // set demobrowser to 'autorun'
var getSampleCategory = selWin + '.' + qxAppInst + '.tree.getSelectedItem().getParent().getLabel()'; // get category name
var getSampleLabel = selWin + '.' + qxAppInst + '.tree.getSelectedItem().getLabel()'; // get sample name
var runSample = qxAppInst + '.runSample()'; // play currently selected sample
var runNextSample = qxAppInst + '.playNext()'; // play next sample
var qxLog = selWin + '.' + qxAppInst + '.f2.getContentElement().getDomElement().innerHTML'; // content of log iframe
var isQxReady = 'var qxReady = false; try { if (selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer) { qxReady = true; } } catch(e) {} qxReady;'; // check if demobrowser application instance exists
var isLogDone = 'var logDone = false; var log = selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().viewer.f2.getContentElement().getDomElement().innerHTML; if (log.length >= 52 && log.indexOf("Dispose") < 0 ) { logDone = true; } logDone;'; // check if sample is finished
var usrAgent = 'navigator.userAgent';
var platform = 'navigator.platform';

/*
 * List of demos to ignore. Format: Category:Demo (using the tree items' labels),
 * i.e. spaces instead of underscores. These demos will be loaded, but the script
 * won't wait until they're finished and simply move on to the next demo.
 * var ignore = ['data:Gears','showcase:Browser','widget:Iframe','test:Serialize'];
 */ 
var ignore = [];

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
*  Write a message to Selenium's browser side log, using current unix time as identifier.
*/
function browserLog(msg) 
{
  msg = msg ? msg : "";
  return 'LOG.error("qxSimulator_' + currentDate.getTime() + ': " + \'' + msg + '\');';
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
  scriptCode = script ? script : runSample;
  // run the sample
  sel.runScript(script);
  killBoxes();
  Packages.java.lang.Thread.sleep(2000);  
  var currentSample = sel.getEval(getSampleLabel);
  var category = sel.getEval(getSampleCategory);
  
  var skip = false;
  if (ignore.length > 0) {
    for (var i = 0; i < ignore.length; i++) {
      var cat = ignore[i].substring(0, ignore[i].indexOf(':'));
      var sam = ignore[i].substr(ignore[i].indexOf(':') + 1);
      if (category == cat && currentSample == sam) {
        skip = true;
      }
    }
  }  
  
  if (skip) {
    print("Skipping sample: " + category + ' - ' + currentSample);
    sel.getEval(browserLog('<h3>SKIPPED ' + category + ' - ' + currentSample + '</h3>'));
    return currentSample;
  }
  
  sel.getEval(browserLog('<h3>' + category + ' - ' + currentSample + '</h3>'));
  // wait for the sample to finish, then get its log output
  Packages.java.lang.Thread.sleep(logPause);
  try {
    sel.waitForCondition(isLogDone, "120000");
  }
  catch(ex) {
    logsWithErrors++;
    print("Unable to determine if demo was loaded: " + category + " - " + currentSample);
    sel.getEval(browserLog('<DIV>Unable to determine if demo was loaded: ' + category + ' - ' + currentSample + '</DIV>'));
  }
  print(category + " - " + currentSample + ": Processing log");

  var sampleLog = '';
  try {
    sampleLog = sel.getEval(qxLog);
  }
  catch(ex) {
    print("Unable to get log for demo " + + category + ' - ' + currentSample);
    sel.getEval(browserLog('<DIV>Unable to get log for demo: ' + category + ' - ' + currentSample + '</DIV>'));
  }

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

    for (var i=0, l=logArray.length; i<l; i++) {
      var line = logArray[i] + '</DIV>';
      // only log relevant lines
      if (line.indexOf('level-debug') < 0 && line.indexOf('level-info') < 0) {
        print("Warning or Error found")
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

/*
 * Identify the browser by its user agent string.
 */
function getBrowser(agent)
{
  var browser = false;
  var regFF = /.*(Firefox)\/([\d\.]*)/;
  var match = regFF.exec(agent);
  if (match) {
    browser = match[1] + " " + match[2];
  }

  if (!browser) {
    var regOp = /.*(Opera)\/([\d\.]*)/;
    var match = regOp.exec(agent);
    if (match) {
      browser = match[1] + " " + match[2];
    }
  }

  if (!browser) {
    var regIe = /.*MSIE ([\d\.]*)/;
    var match = regIe.exec(agent);
    if (match) {
      browser = "Internet Explorer " + match[1];
    }
  }

  if (!browser) {
    var regCh = /.*(Chrome)\/([\d\.]*)/;
    var match = regCh.exec(agent);
    if (match) {
      browser = match[1] + " " + match[2];
    }
  }

  if (!browser) {
    var regSa = /.*(Safari)\/([\d\.]*)/;
    var match = regSa.exec(agent);
    if (match) {
      browser = match[1] + " " + match[2];
    }
  }

  return browser;
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
  while (sel.isAlertPresent()) {
    var al = sel.getAlert();
    print("Dismissed alert box:");
    print(al);
  }
  
  // Ditto for confirmation dialogs.
  while (sel.isConfirmationPresent()) {
    sel.chooseCancelOnNextConfirmation();
    var con = sel.getConfirmation();
    print("Dismissed confirmation dialog:");
    print(conf);
  }  
}

function runTest()
{
  //sel.runScript(setPlayDemos);
  
  var agent = sel.getEval(usrAgent);
  var plat = sel.getEval(platform);
  var browser = getBrowser(agent);
  
  sel.getEval(browserLog("<h1>Demobrowser results from " + currentDate.toLocaleString() + "</h1>"));
  if (browser) {
      sel.getEval(browserLog("<p>Browser: " + browser + " on " + plat + "</p>"));
    }
  sel.getEval(browserLog("<p>User agent: " + agent + "</p>"));
  
  print("Starting sample playback");
  
  if (include.length == 0) {
    sel.runScript(treeSelect(2));
    sel.runScript(qxAppInst + '.tree.getSelectedItem().setOpen(true)');
    currentSample = sampleRunner(runSample);
    while (currentSample != lastSample) {
      lastSample = currentSample;
      print("Done playing " + lastSample + ", starting next sample");      
      killBoxes();
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
      killBoxes();
    }
  }
  
  sel.getEval(browserLog("<p>Samples with warnings or errors: " + logsWithErrors + "</p>"));
}

// - Main --------------------------------------------------------------------

print("Starting test session with browser " + config.testBrowser);
var sel = new QxSelenium(config.selServer,config.selPort,config.testBrowser,config.autHost);
sel.start();
sel.open(config.autHost + config.autPath);
sel.setSpeed(stepSpeed);

var currentSample = "current";
var lastSample = "last";

try {
  sel.waitForCondition(isQxReady, "25000");
  runTest();
}
catch(ex) {
  print("Couldn't find qx instance in AUT window. " + ex);
  sel.getEval(browserLog("<DIV>ERROR: Unable to find qx instance in AUT window.</DIV>"));
}

sel.stop();
print("Test session finished.");
