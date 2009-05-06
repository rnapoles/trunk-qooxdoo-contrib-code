/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006-2009 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (d_wagner)

************************************************************************ */

/**
 * This class represents automated interaction tests ("Simulations") of 
 * qooxdoo-based applications. It contains generic functionality such as 
 * logging and error handling that is reused across multiple Simulations.
 *
 * Actual Simulations should extend this class with their own methods containing
 * code specific to the application to be tested, such as simulated user 
 * interaction using qooxdoo locators[1].
 * 
 * This code is intended to be run through Mozilla Rhino as described in the
 * Simulator manual[2].
 * 
 * [1] http://qooxdoo.org/contrib/project/simulator/selenium-user-extension
 * [2] http://qooxdoo.org/contrib/project/simulator#javascript
 */

importClass(Packages.com.thoughtworks.selenium.QxSelenium);

var simulation = simulation || {};

simulation.Simulation = function(baseConf, args)
{
  /*
   * Basic sanity check: No sense in continuing without a QxSelenium instance.
   */
  if (typeof QxSelenium == "undefined") {
    throw new Error("Global QxSelenium object not found! Make sure the qooxdoo " 
    + "Selenium user extensions are installed in your Selenium client.");
  }
  
  /*
   * Frequently used Javascript code snippets meant to be run in the tested 
   * application's context through the getEval() method. 
   */
  simulation.Simulation.SELENIUMWINDOW = 'selenium.browserbot.getCurrentWindow()';
  simulation.Simulation.QXAPPINSTANCE = 'qx.core.Init.getApplication()';
  simulation.Simulation.ISQXAPPREADY = 'var qxReady = false; try { if (' 
    + simulation.Simulation.SELENIUMWINDOW + '.' 
    + simulation.Simulation.QXAPPINSTANCE 
    + ') { qxReady = true; } } catch(e) {} qxReady;';


  this.debug = true;
  this.config = baseConf ? baseConf : {};
  this.totalErrors = 0;
  this.startDate = new Date();

  /* 
   * If the script was called with any external arguments (e.g. on the Rhino
   * command line), add those settings to the config map, overriding any 
   * properties already defined in baseConf. 
   */
  if (args) {
    var argConf = this.getConfig(args);
    for (prop in argConf) {
      this.config[prop] = argConf[prop];
    }
  }

  // Create QxSelenium instance.
  try {
    this.__sel = new QxSelenium(this.config.selServer,this.config.selPort,this.config.testBrowser,this.config.autHost);
  }
  catch(ex) {
    throw new Error("Unable to create QxSelenium instance: " + ex);
  }  

};

/*
 * Split an array of 'key=value' strings (e.g. Rhino's arguments property) and 
 * store them in a map.
 */
simulation.Simulation.prototype.getConfig = function(args)
{ 
  conf = {}; 
  for (i in args) {
    if (args[i].indexOf("=") >0) {
      var tempArr = args[i].split("=");
      conf[tempArr[0]] = tempArr[1];
    }
  }
  return conf;
};

/*
 * Start the Selenium session and set some basic options.
 */
simulation.Simulation.prototype.startSession = function()
{
  if (this.debug) {
    print("Starting " + this.config.autName + " session with browser " + this.config.testBrowser);
  }

  try {
    this.__sel.start();
    this.__sel.setTimeout(this.config.globalTimeout);
    this.__sel.open(this.config.autHost + this.config.autPath);
    this.__sel.setSpeed(this.config.stepSpeed);
  }
  catch (ex) {
    var msg = "ERROR: Unable to start test session: " + ex;
    print(msg);
    this.logToBrowser(msg, "error", "file");
    return false;
  }
  return  true;
};

/*
 * Wrapper around Selenium's getEval() that catches and logs any exceptions so 
 * they won't cause the entire test to fail.
 */
simulation.Simulation.prototype.getEval = function(code, description)
{
  if (!code) {
    throw new Error("No code specified for getEval()");
  }

  var desc = description ? description : "Unable to evaluate script";

  var ret = false;
  try {
    ret = this.__sel.getEval(code);
  }
  catch(ex) {
    this.logToBrowser("ERROR: " + desc + ": " + ex, "error");
    print("ERROR: " + desc + ": " + ex + " \nScript code:\n  " + code);
  }

  return ret;
};

/*
 * Wrapper around Selenium's runScript() that catches and logs any exceptions so 
 * they won't cause the entire test to fail.
 */
simulation.Simulation.prototype.runScript = function(code, description)
{
  if (!code) {
    throw new Error("No code specified for runScript()");
  }

  var desc = description ? description : "Unable to evaluate script";

  try {
    this.__sel.runScript(code);
  }
  catch(ex) {
    this.logToBrowser("ERROR: " + desc + ": " + ex, "error");
    print("ERROR: " + desc + ": " + ex + " \nScript code:\n  " + code);
  }

  return;
};

/*
 * Wrapper around QxSelenium's qxClick() that catches and logs any exceptions so 
 * they won't cause the entire test to fail.
 */
simulation.Simulation.prototype.qxClick = function(locator, description)
{
  if (!locator) {
    throw new Error("No locator specified for qxClick()");
  }

  var desc = description ? description : "Executing qxClick";

  try {
    this.__sel.qxClick(locator);
  }
  catch(ex) {
    this.logToBrowser("ERROR: " + desc + ": " + ex, "error");
    print("ERROR: " + desc + ": " + ex + " \nLocator:\n  " + locator);
  }

  return;
};

/*
 * Wrapper around Selenium's type() that catches and logs any exceptions so 
 * they won't cause the entire test to fail.
 */
simulation.Simulation.prototype.type = function(locator, text)
{
  if (!locator) {
    throw new Error("No locator specified for type()");
  }
  
  if (!text) {
    throw new Error("No text specified for type()");
  }

  try {
    this.__sel.type(locator, text);
  }
  catch(ex) {
    print("ERROR: Unable to enter text: " + ex + " \nText:\n  " + text);
  }

  return;
};

/*
 * Open/create a log file and return the file object.
 */
simulation.Simulation.prototype.getLogFile = function()
{
  var logFileName = this.config.logFile ? this.config.logFile :  this.config.autName + "_" + this.startDate.getTime() + ".log";
  var fstream = new java.io.FileWriter(logFileName, true);
  var out = new java.io.BufferedWriter(fstream);
  return out;
};

/*
 * Format a message according to the error level, then write it to the local 
 * log file and the Selenium server's browser-side log.
 */
simulation.Simulation.prototype.logToBrowser = function(text, level, browserLog)
{
  var msg = text ? text : "";
  var lvl = level ? level : "debug";
  var browser = browserLog ? browserLog : "browser";

  msg = String(msg);
  msg = msg.replace(/\n/,'');
  msg = msg.replace(/\r/,'');
  msg = msg.replace(/'/, '\'');

  if (this.debug) {
    print("Logging message: " + msg);
  }
  
  // Wrap the message in a paragraph tag if it doesn't look HTML formatted.
  if (msg.substr(0,1) !== "<") {    
    msg = "<p>" + msg + "</p>";   
  }

  msg = '<div class="qxappender"><div class="level-' + lvl + '">' + msg + "</div></div>";

  var prefix = 'qxSimulator_' + this.startDate.getTime();
  var logFile = this.getLogFile();
  logFile.write(prefix + ': ' + msg);
  logFile.newLine();
  logFile.close();
  
  if (browser == "browser") {
    var message = 'LOG.error("' + prefix + ': " + \'' + msg + '\');';
    this.getEval(message);
  }

};

/*
 * Log information about the test environment. 
 */
simulation.Simulation.prototype.logEnvironment = function()
{
  var agent = this.getEval('navigator.userAgent');
  var plat = this.getEval('navigator.platform');

  this.logToBrowser("<h1>" + this.config.autName + " results from " + this.startDate.toLocaleString() + "</h1>", "info");
  this.logToBrowser("<p>Application under test: <a href=\"" + this.config.autHost + this.config.autPath + "\">" + this.config.autHost + this.config.autPath + "</a></p>", "info");
  this.logToBrowser("Platform: " + plat, "info");
  this.logToBrowser("User agent: " + agent, "info");
};

/*
 * Wrapper around Selenium's waitForCondition() function. Logs any exceptions
 * (e.g. because the timeout was reached) along with an optional description.
 */
simulation.Simulation.prototype.waitForCondition = function(condition, timeout, description)
{
  if (!condition) {
    throw new Error("No condition to wait for specified.");
  }
  
  if (!timeout) {
    throw new Error("No timeout specified for waitForCondition()");
  }

  var desc = description ? description : "Waiting for condition";   

  if (this.debug) {
    print(desc);
  }

  try {
    this.__sel.waitForCondition(condition, timeout.toString());
    return true;
  }
  catch(ex) {
    if (this.debug) {
      print(ex);
    }
    this.logToBrowser(desc, "error");
    return false;
  }
};

/*
 * Log the amount of time passed since the given start date. 
 */
simulation.Simulation.prototype.logTestDuration = function(sDate, desc)
{
  var startDate = sDate ? sDate : this.startDate;
  var description = desc ? desc : "Test run";
  
  var stopDate = new Date();
  var elapsed = stopDate.getTime() - startDate.getTime();
  elapsed = (elapsed / 1000);
  min = Math.floor(elapsed / 60);
  sec = Math.round(elapsed % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  print(description + " finished in: " + min + " minutes " + sec + " seconds.");
  this.logToBrowser(description + " finished in: " + min + " minutes " + sec + " seconds.", "info");
};

/*
 * Adds a function to the "qx.Simulation" namespace of the application under 
 * test. This function can then be called using 
 * Simulation.getEval("selenium.browserbot.getCurrentWindow().qx.Simulation.funcName();") 
 */
simulation.Simulation.prototype.addOwnFunction = function(funcName, func)
{  
  if (!funcName) {
    throw new Error("Please choose a name for the function to be added.");
  }
  
  if (!func) {
    throw new Error("No function specified.");
  }
  
  var ns = String(this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation'));
  if (ns == "null" || ns == "undefined") {
    this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation = {};');
  }
  
  if (typeof func == "function") {
    func = func.toString();    
  }

  func = func.replace(/\n/,'');
  func = func.replace(/\r/,'');
  //func = func.replace(/'/, '\'');
  
  this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation.' + funcName + ' = ' + func);
};

/*
 * Demos might pop up alert boxes that will break the test if they aren't 
 * removed before the next Selenium action. getAlert() simulates clicking "OK".
 */
simulation.Simulation.prototype.killBoxes = function()
{
  var retVal = {
    'alert' : false,
    'confirmation' : false
  };

  try {
    if (this.__sel.isAlertPresent()) {
      var al = this.__sel.getAlert();
      retVal.alert = String(al);
      this.logToBrowser("Dismissed alert box: " + al, "info");
    }
  }
  catch(ex) {
    this.logToBrowser("ERROR while checking for alert box: " + ex, "error");
  }

  // Ditto for confirmation dialogs.
  try {
    if (this.__sel.isConfirmationPresent()) {
      this.__sel.chooseCancelOnNextConfirmation();
      var con = this.__sel.getConfirmation();
      retVal.confirmation = String(con);
      this.logToBrowser("Dismissed confirmation dialog " + con, "info");
    }
  }
  catch(ex) {
    this.logToBrowser("ERROR while checking for dialog box: " + ex, "error");
  }

  if (retVal.alert || retVal.confirmation) {
    return retVal;  
  }

  else {
    return false;
  }

};

simulation.Simulation.prototype.getObjectGetterFunction = function()
{
  var func = function(parent, classname)
  {
    var obj = null;
    for (prop in parent) {
      var property = parent[prop];
      try {
        if (typeof property == "object") {
          if (property.classname == searchterm) {
            obj = property;
          }
        }
      }
      catch(ex) {}
    }
    return obj;
  };

  return func;  
};

/*
 * Call Selenium's stop method, which *should* also close the browser. This 
 * won't work in older versions of Firefox (<=2.0.0).
 */
simulation.Simulation.prototype.stop = function()
{
  this.__sel.stop();
  if (this.debug) {
    print("Simulation finished.");
  }
};

