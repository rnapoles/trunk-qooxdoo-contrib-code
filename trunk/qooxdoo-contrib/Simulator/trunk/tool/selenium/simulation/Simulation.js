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

// Create the simulation namespace if it doesn't exist
var simulation = simulation || {};

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
 * 
 * @constructor
 * @param baseConf {Map} basic configuration settings for this Simulation
 * @param args {String} optional Rhino command line arguments 
 */
simulation.Simulation = function(baseConf, args)
{
  // Basic sanity check: No sense in continuing without QxSelenium.
  try {
    importClass(Packages.com.thoughtworks.selenium.QxSelenium);
  }
  catch(ex) {
    throw new Error("Couldn't import QxSelenium class! Make sure the qooxdoo " 
    + "Selenium user extensions are installed in your Selenium client.\n" + ex);
  }
  
  // Required configuration settings. Can't run a test without these.
  var required = ['selServer', 'selPort', 'testBrowser', 'autHost', 'autPath'];
  
  // Some default settings.
  var defaults = {
    debug : false,
    autName : "Unnamed Application",
    stepSpeed : "250",
    globalTimeout : 120000
  };
  
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


  var __totalErrorsLogged = 0;
  
  /**
   * Sets the total number of errors logged.
   * 
   * @private
   * @param errors {Integer} The new error count
   * @return {void}
   */
  setTotalErrorsLogged = function(errors) 
  {
    __totalErrorsLogged = errors;
  };
  
  /**
   * Returns the total number of errors logged by the {@link #log} method.
   * 
   * @return {Integer} Number of errors logged so far in the current Simulation
   */
  this.getTotalErrorsLogged = function()
  {
    return __totalErrorsLogged;
  };

  /**
   * Initalizes the configuration, sets defaults if necessary and validates the 
   * configuration.
   * 
   * @private
   * @param baseConf {Map} a map of configuration settings
   * @param args {String} optional space-delimited string of 'key=value' pairs
   * @return {Map} the configuration for this Simulation instance
   * @throws an exception if a required setting is missing
   */    
  function initConfig(baseConf, args)
  {
    /* 
     * If the script was called with any external arguments (e.g. on the Rhino
     * command line), add those settings to the config map, overriding any 
     * properties already defined in baseConf. 
     */
    
    var conf = baseConf || {};
    if (args) {      
      var argConf = getConfigFromArgs(args);
      for (prop in argConf) {
        conf[prop] = argConf[prop];
      }
    }

    // Check if all required keys are set.
    for (var i=0,l=required.length; i<l; i++) {
      if (!(required[i] in conf)) {
        throw new Error("Required property " + required[i] + " not in configuration!");
      }
    }

     // Set defaults if they're not already set.
    for (key in defaults) {
      if (!(key in conf)) {
        conf[key] = defaults[key];
      }
    }

    return conf;
  }
  
  var __config = initConfig(baseConf || false, args || false);
  
  /**
   * Split an array of 'key=value' strings (e.g. Rhino's arguments property) and 
   * store them in a map.
   * 
   * @private
   * @param args {String} a space-delimited string of 'key=value' pairs
   * @return {Map} a map of key-value pairs
   */
  function getConfigFromArgs(args)
  { 
    conf = {}; 
    for (i in args) {
      if (args[i].indexOf("=") >0) {
        var tempArr = args[i].split("=");
        conf[tempArr[0]] = tempArr[1];
      }
    }
    return conf;
  }
  
  /**
   * Public getter for configuration settings.
   * 
   * @param prop {String} the name of a configuration key
   * @return {String} the value of the requested configuration key
   * @throw an exception if no key was specified or the key doesn't exist in the
   *   configuration map
   */
  this.getConfigSetting = function(prop)
  {
    if (!prop) {
      throw new Error("No configuration key specified!");
    }
    else if (!(prop in __config)) {
      throw new Error("Key " + prop + " not in configuration!");
    }
    else {
      return __config[prop];
    }   
  };

  this.startDate = new Date();
  
  // Determine the name for the log file.
  if (!("logFile" in __config)) {
    var fname = __config.autName + "_" + this.startDate.getTime() + ".log";
    __config.logFile = fname; 
  }

  // Create QxSelenium instance.
  try {
    this.__sel = new QxSelenium(__config.selServer,__config.selPort,
                                __config.testBrowser,__config.autHost);
  }
  catch(ex) {
    throw new Error("Unable to create QxSelenium instance: " + ex);
  }  

};

/**
 * Increments the number of total errors logged by one
 * 
 * @return {void}
 */
simulation.Simulation.prototype.incrementTotalErrorsLogged = function()
{
  var oldCount = this.getTotalErrorsLogged();
  var newCount = oldCount + 1;
  setTotalErrorsLogged(newCount);  
};

/**
 * Start the Selenium session and set some basic options.
 * 
 * @return {Boolean} true if the Selenium session started without errors
 */
simulation.Simulation.prototype.startSession = function()
{  
  if (this.getConfigSetting("debug")) {
    print("Starting " + this.getConfigSetting("autName") + " session with browser " + this.getConfigSetting("testBrowser"));
  }

  try {
    this.__sel.start();
    this.__sel.setTimeout(this.getConfigSetting("globalTimeout"));    
    this.__sel.open(this.getConfigSetting("autHost") + "" + this.getConfigSetting("autPath"));
    this.__sel.setSpeed(this.getConfigSetting("stepSpeed"));
    this.logEnvironment();
    this.logUserAgent();
  }
  catch (ex) {
    this.logEnvironment("file");
    this.log("User agent: " + this.getConfigSetting("browserId"), "none", "file");
    var msg = "ERROR: Unable to start test session: " + ex;
    print(msg);
    this.log(msg, "error", "file");
    return false;
  }
  return true;
};

/**
 * Wrapper around Selenium's <code>getEval</code> that catches and logs any exceptions so 
 * they won't cause the entire test to fail.
 * 
 * @param code {String} JavaScript code to be evaluated
 * @param description {String} optional description that will be logged if there
 *   was an exception during evaluation 
 * @throw an exception if no code was specified
 * @return the results of the evaluation
 */
simulation.Simulation.prototype.getEval = function(code, description)
{
  if (!code) {
    throw new Error("No code specified for getEval()");
  }
  
  if (this.getConfigSetting("debug") && description) {
    print(description);
  }

  var desc = description ? description : "Evaluating script";

  var ret = false;
  try {
    ret = this.__sel.getEval(code);
  }
  catch(ex) {
    this.log("ERROR: " + desc + ": " + ex, "error");
    print("ERROR: " + desc + ": " + ex + " \nScript code:\n  " + code);
  }

  return ret;
};

/**
 * Wrapper around Selenium's <code>runScript</code> that catches and logs any exceptions so 
 * they won't cause the entire test to fail.
 * 
 * @param code {String} JavaScript code to be evaluated
 * @param description {String} optional description that will be logged if there
 *   was an exception during evaluation
 * @throw an exception if no code was specified
 * @return {void}
 */
simulation.Simulation.prototype.runScript = function(code, description)
{
  if (!code) {
    throw new Error("No code specified for runScript()");
  }

  var desc = description ? description : "Running script";

  if (this.getConfigSetting("debug")) {
    print(desc);
  }

  try {
    this.__sel.runScript(code);
  }
  catch(ex) {
    this.log("ERROR: " + desc + ": " + ex, "error");
    print("ERROR: " + desc + ": " + ex + " \nScript code:\n  " + code);
  }

  return;
};

/**
 * Wrapper around QxSelenium's qxClick method that catches and logs any 
 * exceptions so they won't cause the Simulation to fail.
 * 
 * @param locator {String} Selenium locator identifying the element that should 
 *   receive the click event
 * @param description {String} optional description that will be logged if there
 *   was an exception during evaluation
 * @throw an exception if no locator was specified
 * @return {void}
 */
simulation.Simulation.prototype.qxClick = function(locator, options, description)
{
  if (!locator) {
    throw new Error("No locator specified for qxClick()");
  }

  var desc = description ? description : "Executing qxClick";

  if (this.getConfigSetting("debug")) {
    print(desc);
  }

  try {
    this.__sel.qxClick(locator, options);
  }
  catch(ex) {
    this.log("ERROR: " + desc + ": " + ex, "error");
    print("ERROR: " + desc + ": " + ex + " \nLocator:\n  " + locator);
  }

  return;
};

/**
 * Wrapper around Selenium's type() that catches and logs any exceptions so 
 * they won't cause the entire test to fail.
 * 
 * @param locator {String} Selenium locator identifying the element that should
 *   receive the keydown/keyup/keypress events 
 * @param text {String} the text to be typed
 * @param keys {Boolean} use Selenium's "typeKeys" instead of "type" if true
 * @throw an exception if no locator or text were specified
 * @return {void}
 */
simulation.Simulation.prototype.type = function(locator, text, keys)
{
  if (!locator) {
    throw new Error("No locator specified for type()");
  }
  
  if (!text) {
    throw new Error("No text specified for type()");
  }

  if (this.getConfigSetting("debug")) {
    print("Typing: " + text);
  }
  
  var selCmd = keys ? "typeKeys" : "type"; 

  try {
    var ret = this.__sel[selCmd](locator, text);
  }
  catch(ex) {
    print("ERROR: Unable to enter text: " + ex + " \nText:\n  " + text);
  }

  return;
};

/**
 * Wrapper around Selenium's typeKeys() that catches and logs any exceptions so 
 * they won't cause the entire test to fail.
 * 
 * @param locator {String} Selenium locator identifying the element that should
 *   receive the keydown/keyup/keypress events 
 * @param text {String} the text to be typed
 * @throw an exception if no locator or text were specified
 * @return {void}
 */
simulation.Simulation.prototype.typeKeys = function(locator, text)
{
  this.type(locator, text, true);
};

/**
 * Wrapper around QxSelenium's qxTableClick() that catches and logs any 
 * exceptions so they won't cause the entire test to fail.
 * 
 * @param locator {String} Selenium locator identifying a qooxdoo table object
 * @param options {String} Options for the command, e.g 
 *  "row=4,column=3,button=right"
 * @throw an exception if no locator was specified
 * @return {void}
 */
simulation.Simulation.prototype.qxTableClick = function(locator, options)
{
  if (!locator) {
    throw new Error("No locator specified for type()");
  }
  this.__sel.qxTableClick(locator, options);
};

/**
 * Opens a log file and returns the file object.
 * 
 * @return {Object} the log file object (java.io.BufferedWriter instance)
 */
simulation.Simulation.prototype.getLogFile = function()
{
  var fstream = new java.io.FileWriter(this.getConfigSetting("logFile"), true);
  var out = new java.io.BufferedWriter(fstream);
  return out;
};

/**
 * Formats a message according to the error level, then writes it to the local 
 * log file and optionally to the Selenium server's browser-side log.
 * 
 * @param text {String} the message to be logged
 * @param level {String?"debug"} The message's error level. One of "debug", 
 *   "info", "warn", "error", "none". "none" means no formatting is applied.
 * @param browserLog {String?"browser"} "browser" also logs to the server's 
 *   browser-side log, anything else logs only to the local log file
 * @return {void}
 */
simulation.Simulation.prototype.log = function(text, level, browserLog)
{
  var msg = text ? text : "";
  var lvl = level ? level : "debug";
  var browser = browserLog ? browserLog : "browser";

  if (lvl == "error") {
    this.incrementTotalErrorsLogged();
  }  

  if (this.getConfigSetting("debug")) {
    print("Logging message: " + msg);
  }
  
  // Clean up/format non-HTML messages
  if (msg.substr(0,1) !== "<") {
    msg = this.sanitize(msg);    
    msg = "<p>" + msg + "</p>";
    if (lvl != "none") {
      msg = '<div class="qxappender"><div class="level-' + lvl + '">' + msg + "</div></div>";
    }   
  }  

  var prefix = 'qxSimulator_' + this.startDate.getTime();
  var logFile = this.getLogFile();
  logFile.write(prefix + ': ' + msg);
  logFile.newLine();
  logFile.close();
  
  if (browser == "browser") {
    var message = 'LOG.error("' + prefix + ': " + \'' + msg + '\');';
    this.getEval(message, "Logging message to browser");
  }

};

/**
 * Removes special and formatting characters from strings so they can be logged.
 * 
 * @param text {String} The string to be sanitized
 * @return {String} The sanitized string
 */
simulation.Simulation.prototype.sanitize = function(text)
{
  // The message might be a Java object, so cast it as a String just to be sure.
  text = String(text);
  text = text.replace(/\n/g,'<br/>');
  text = text.replace(/\r/g,'<br/>');
  text = text.replace(/'/g, '&quot;');
  text = text.replace(/[^\w\d\-_:;\.,\!\?\(\)\[\]#$%&= \/\<\> ]?/gi, '');
  return text;
};

/**
 * Logs information about the test environment.
 *
 * @param logTo {String} How to log the information. "browser" writes to 
 * Selenium's browser side log and the test log file, anything else writes only
 * to the test log file.
 * @return {void}
 */
simulation.Simulation.prototype.logEnvironment = function(logTo)
{
  log = logTo ? logTo : "browser";
  this.log("<h1>" + this.getConfigSetting("autName") + " results from " + this.startDate.toLocaleString() + "</h1>", "none", logTo);
  this.log("<p>Application under test: <a href=\"" + this.getConfigSetting("autHost") + this.getConfigSetting("autPath") + "\">" + this.getConfigSetting("autHost") + this.getConfigSetting("autPath") + "</a></p>", "none", logTo);
  this.log("Platform: " + environment["os.name"], "none", logTo);
};

/**
 * Logs the test browser's user agent string.
 * 
 * @return {void}
 */
simulation.Simulation.prototype.logUserAgent = function(){
  var agent = this.getEval('navigator.userAgent', "Getting user agent from browser");
  this.log("User agent: " + agent, "none");
};

/**
 * Wrapper around Selenium's waitForCondition() function. Logs any exceptions
 * (e.g. because the timeout was reached) along with an optional description.
 * 
 * @param condition {String} a JavaScript expression that will be evaluated
 * @param timeout {Integer} timeout in milliseconds
 * @param description {String} optional description that will be logged if there
 *   was an exception during evaluation
 * @throw an exception if no condition or timeout were specified
 * @return {Boolean} true if the condition was met before the timeout
 */
simulation.Simulation.prototype.waitForCondition = function(condition, timeout, 
                                                            description)
{
  if (!condition) {
    throw new Error("No condition to wait for specified.");
  }
  
  if (!timeout) {
    throw new Error("No timeout specified for waitForCondition()");
  }

  var desc = description ? description : "Waiting for condition";   

  if (this.getConfigSetting("debug")) {
    print(desc);
  }

  try {
    this.__sel.waitForCondition(condition, timeout.toString());
    return true;
  }
  catch(ex) {
    if (this.getConfigSetting("debug")) {
      print(ex);
    }
    this.log(desc, "error");
    return false;
  }
};

/**
 * Logs the amount of time passed since the given start date.
 * 
 * @param sDate {Date} the start date
 * @param desc {String} optional description
 * 
 * @return {void}
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

  if (this.getConfigSetting("debug")) {
    print(description + " finished in: " + min + " minutes " + sec + " seconds.");
  }

  this.log(description + " finished in: " + min + " minutes " + sec + " seconds.", "info");
};

/**
 * Adds a function to the "qx.Simulation" namespace of the application under 
 * test. This function can then be called using 
 * <code>Simulation.getEval("selenium.browserbot.getCurrentWindow().qx.Simulation.funcName();")</code>
 * 
 * @param funcName {String} name of the function to be added
 * @param func {Function} the function to be added
 * @return {void}
 */
simulation.Simulation.prototype.addOwnFunction = function(funcName, func)
{  
  if (!funcName) {
    throw new Error("Please choose a name for the function to be added.");
  }
  
  if (!func) {
    throw new Error("No function specified.");
  }
  
  var ns = String(this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation', 'Checking for qx.Simulation namespace'));
  if (ns == "null" || ns == "undefined") {
    this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation = {};', 'Creating qx.Simulation namespace');
  }
  
  if (typeof func != "string") {
    func = func.toString();    
  }

  func = func.replace(/\n/,'');
  func = func.replace(/\r/,'');
  //func = func.replace(/'/, '\'');
  
  this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation.' + funcName + ' = ' + func, 'Adding function ' + funcName);
};

/**
 * Dismisses any alert or dialog boxes currently open in the application under 
 * test.
 * 
 * @return {Map|false} a map containing the text content of any closed boxes in the 
 *   'alert' and 'confirmation' keys or false if no boxes were dismissed
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
      this.log("Dismissed alert box: " + al, "info");
    }
  }
  catch(ex) {
    this.log("ERROR while checking for alert box: " + ex, "error");
  }

  // Ditto for confirmation dialogs.
  try {
    if (this.__sel.isConfirmationPresent()) {
      this.__sel.chooseCancelOnNextConfirmation();
      var con = this.__sel.getConfirmation();
      retVal.confirmation = String(con);
      this.log("Dismissed confirmation dialog " + con, "info");
    }
  }
  catch(ex) {
    this.log("ERROR while checking for dialog box: " + ex, "error");
  }

  if (retVal.alert || retVal.confirmation) {
    return retVal;  
  }

  else {
    return false;
  }

};

/**
 * Adds a function <code>qx.Simulation.getObjectByClassname</code> to the AUT's 
 * window. This function takes two arguments: A parent object and a qooxdoo 
 * class name string.
 * It will search all properties of the parent object until it finds one with
 * a classname property matching the class name string; this object is then
 * returned.
 * 
 * The function should be executed through getEval like this:
 * <code>this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation.getObjectByClassname(selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication(), "qx.ui.tree.Tree")';</code>
 * 
 * TODO: Return an array of *all* objects that are instances of the wanted class
 * 
 * @return {void}
 */
simulation.Simulation.prototype.addObjectGetter = function()
{
  var getObjectByClassname = function(parent, searchterm)
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
  
  this.addOwnFunction("getObjectByClassname", getObjectByClassname);
  
};

/**
 * Call Selenium's stop method, which *should* also close the browser. This 
 * won't work in older versions of Firefox (<=2.0.0).
 * 
 * @return {void}
 */
simulation.Simulation.prototype.stop = function()
{
  this.__sel.stop();
  if (this.getConfigSetting("debug")) {
    print("Simulation finished.");
  }
};

/**
 * Create a Mozilla Console listener that logs JavaScript errors. 
 * 
 * @return {void}
 */
simulation.Simulation.prototype.addMozillaConsoleListener = function()
{
  var listenerObject =
  {
    observe:function( aMessage )
    {
      try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        if (aMessage.message.indexOf("JavaScript Error") >= 0) {
          this.log(aMessage.message, "error");
        }
      }
      catch(ex) {
        alert("Unable to access Mozilla Console message:\n" + ex);
      }
    },
  
    QueryInterface: function (iid)
    {
      try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        if (!iid.equals(Components.interfaces.nsIConsoleListener) &&
            !iid.equals(Components.interfaces.nsISupports)) {
          throw Components.results.NS_ERROR_NO_INTERFACE;
        }
        return this;
      }
      catch(ex) {
        alert("Unable to set up Mozilla Console listener:\n" + ex);
      }
    }
  };
  
  try {
    this.getEval("var listenerObject = " + listenerObject.toSource(), "Creating Mozilla Console listener object");
    
    this.getEval('netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");', 
                  "Asking for UniversalXPConnect privileges");
    this.getEval('var aConsoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);', 
                  "Getting console service");
    this.getEval('aConsoleService.registerListener(qx.Simulation.mozillaConsoleListener);', 
                  "Registering console listener");
  }
  catch(ex) {
    this.log(ex + "error");
  }
};
