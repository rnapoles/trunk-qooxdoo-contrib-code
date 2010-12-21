var baseConf = {
  'autName' : 'Playground',
  'globalTimeout' : 300000,
  'stepSpeed' : '250',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*custom /usr/lib/firefox-3.0.10/firefox -no-remote -P selenium-3',
  'autHost' : 'http://localhost',
  'autPath' : '/~dwagner/workspace/qooxdoo.trunk/application/playground/build/index.html',
  'simulatorSvn' : '/home/dwagner/workspace/qooxdoo.contrib/Simulator',
  'editor' : 'Ace'
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

var locators = {
  menuButton : 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/qx.ui.toolbar.MenuButton',
  syntaxHighlightingButton : 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/qx.ui.form.ToggleButton',
  editorTextArea : 'qxh=qx.ui.container.Composite/qx.ui.splitpane.Pane/[@classname="playground.view.Editor"]/qx.ui.form.TextArea',
  runButton : 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/child[0]',
  playgroundApplication : 'qxh=qx.ui.container.Composite/qx.ui.splitpane.Pane/qx.ui.splitpane.Pane/qx.ui.container.Composite/qx.ui.container.Scroll/qx.ui.root.Inline',
  logButton : 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/qx.ui.toolbar.CheckBox',
  sampleMenuButton : 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/qx.ui.toolbar.MenuButton',
  gitHubButton : 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/child[3]',
  gistMenu : 'qxh=[@classname="playground.view.gist.GistMenu"]',
  gistUserNameField : 'qxh=[@classname="playground.view.gist.GistMenu"]/child[0]/qx.ui.form.TextField',
  gistLoadButton : 'qxh=[@classname="playground.view.gist.GistMenu"]/[@classname="playground.view.gist.UserNameMenuItem"]/qx.ui.form.Button',
  gistMenuButton : 'qxh=[@classname="playground.view.gist.GistMenu"]/child[5]',
  shortenUrlButton : 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/[@label="URL"]'
};

if (mySim.getConfigSetting("branch") == "branch_1_2_x") {
  locators.menuButton = 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/qx.ui.toolbar.Part/qx.ui.toolbar.MenuButton';
  locators.syntaxHighlightingButton = 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/child[0]/qx.ui.form.ToggleButton';
  locators.runButton = 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/qx.ui.toolbar.Part/child[0]',
  locators.logButton = 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/child[2]/qx.ui.toolbar.CheckBox';
  locators.sampleMenuButton = 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/qx.ui.toolbar.Part/qx.ui.toolbar.MenuButton',
  locators.gitHubButton = 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/qx.ui.toolbar.Part/child[3]';
  locators.shortenUrlButton = 'qxh=qx.ui.container.Composite/[@classname="playground.view.Toolbar"]/child[2]/[@label="URL"]'
}

var getLogHtml = function()
{
  var logWidget = selenium.getQxWidgetByLocator('qxh=qx.ui.container.Composite/qx.ui.splitpane.Pane/child[1]/[@classname="playground.view.Log"]/qx.ui.embed.Html');
  return logWidget.getContentElement().getDomElement().innerHTML;
};

var getSampleNames = function(sampleMenuButtonLocator)
{  
  var menuWidget = selenium.getQxWidgetByLocator(sampleMenuButtonLocator);
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
  var logHtml = selWin + ".qx.Simulation.getLogHtml()";
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
  var logHtml = selWin + ".qx.Simulation.getLogHtml()";
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

simulation.Simulation.prototype.getAceActive = function()
{
  try {
    return this.__sel.isVisible('xpath=//div[contains(@class, "ace_editor")]');
  } catch(ex) {
    this.log("Unable to check syntax highlighting: " + ex, "error");
    return false;
  }
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

simulation.Simulation.prototype.checkEdit = function(sampleName)
{
  try {
    this.qxClick(locators.syntaxHighlightingButton, '', 'Deactivating syntax highlighting');
    var newButtonLabel = "Simulator was here";
    var playAreaCode = new String(this.__sel.qxObjectExecFunction(locators.editorTextArea, 'getValue'));
    var modifiedCode = playAreaCode.replace(/First Button/, newButtonLabel);
    this.__sel.type(locators.editorTextArea, modifiedCode);
    this.qxClick(locators.syntaxHighlightingButton, '', 'Deactivating syntax highlighting');
    this.qxClick(locators.runButton, '', 'Pressing Run button');
  } catch(ex) {
    this.log("Could not edit sample " + sampleName + ": " + ex, "error");
    return false;
  }
  
  var modifiedSampleName = sampleName + " (modified)";

  var sampleLoaded = this.isSampleLoaded(modifiedSampleName);
  var sampleStarted = this.isSampleStarted(modifiedSampleName);

  this.logGlobalErrors();
  this.clearGlobalErrorStore();  

  if (!sampleLoaded || !sampleStarted) {
    this.log("Modified sample " + sampleName + " did not start correctly!", "error");
    return false;
  }
  
  try {
    var playAppButtonLoc = locators.playgroundApplication + '/qx.ui.form.Button';
    var playAppButtonLabel = new String(this.__sel.qxObjectExecFunction(playAppButtonLoc, 'getLabel'));
    if (playAppButtonLabel == newButtonLabel) {
      this.log("Successfully ran modified sample " + sampleName, "info");
    } else {
      this.log("Modification of sample " + sampleName + " failed!", "error");
    }
  } catch(ex) {
    this.log("Error checking modified sample " + sampleName + ": " + ex, "error");
    return false;
  }
  
  return true;
  
};

simulation.Simulation.prototype.checkCodeFromUrl = function(pattern)
{
  var newButtonLabel = "A flying monkey";
  try {
    var hash = String(this.getEval(selWin + ".location.hash")).substr(1);
    var newHash = hash.replace(pattern, newButtonLabel);
    // Modifying the URL hash doesn't trigger a reload, so Selenium.load will 
    // wait forever. Workaround: Load a different page first. 
    this.__sel.open(this.getConfigSetting("autHost"));
    // Now open the Playground with the modified code
    this.qxOpen(this.getConfigSetting("autPath") + "#" + encodeURIComponent(newHash));
    // There will be an alert box if running the URI code failed
    if (this.__sel.isAlertPresent()) {
      var al = this.__sel.getAlert();
      this.log("Running code from URI failed: " + al);
    }
    this.addGlobalErrorHandler();
  } catch(ex) {
    this.log("Unable to load Playground with URI code: " + ex);
    return;
  }
  
  try {
    var playAppButtonLoc = locators.playgroundApplication + '/qx.ui.form.Button';
    var playAppButtonLabel = new String(this.__sel.qxObjectExecFunction(playAppButtonLoc, 'getLabel'));
    if (playAppButtonLabel.indexOf(newButtonLabel) >= 0) {
      this.log("Successfully ran sample code from URL", "info");
    } else {
      this.log("Running sample code from URL failed!", "error");
    }
  } catch(ex) {
    this.log("Error while running sample code from URL: " + ex, "error");
    return;
  }
  
};

simulation.Simulation.prototype.checkSyntaxHighlighting = function(editor)
{
  var browser = this.getConfigSetting("testBrowser").toLowerCase();
  if( browser.indexOf("firefox") >= 0 && browser.indexOf("1.5") >= 0 ) {
    this.log("Skipping syntax highlighting check in Firefox 1.5", "info");
    return;
  }
  
  // Check if syntax highlighting is on
  if (!this["get" + editor + "Active"]()) {
    this.qxClick(locators.syntaxHighlightingButton, '', 'Activating syntax highlighting');
  }
  
  if (this["get" + editor + "Active"]()) {
    this.log("Syntax highlighting is active", "info");
    // Turn off syntax highlighting
    this.qxClick(locators.syntaxHighlightingButton, '', 'Deactivating syntax highlighting');
    Packages.java.lang.Thread.sleep(500);
    if (this["get" + editor + "Active"]()) {
      this.log("Syntax highlighting was not deactivated!", "error");
    } else {
      this.log("Syntax highlighting deactivated correctly", "info");
    }
    // And turn it on again
    this.qxClick(locators.syntaxHighlightingButton, '', 'Deactivating syntax highlighting');
    Packages.java.lang.Thread.sleep(500);
    if (this["get" + editor + "Active"]()) {
      this.log("Syntax highlighting reactivated correctly", "info");
    } else {
      this.log("Syntax highlighting was not reactivated!", "error");
    }
  } else {
    this.log("Syntax highlighting is not active!", "error");
  }  
};

simulation.Simulation.prototype.runTest = function()
{
  //this.__sel.windowmaximize();
  // Make sure the locale is 'en' to simplify dealing with log messages.
  var setLocale = "qx.locale.Manager.getInstance().setLocale('en')";
  this.runScript(setLocale, "Setting application locale to EN");    
   
  // Open log pane
  this.qxClick(locators.logButton, "", 'Opening log pane');
  
  // Add log html getter
  this.addOwnFunction("getLogHtml", getLogHtml);
  
  // Load the first sample again to make sure we get the english log output.
  this.qxClick(locators.runButton, '', 'Pressing Run button');

  this.addOwnFunction("getSampleNames", getSampleNames);  
  var sampleNames = this.getEval(selWin + ".qx.Simulation.getSampleNames('" + locators.menuButton +"');", "Getting sample names");
  sampleNames = String(sampleNames);
  var sampleArr = sampleNames.split(",");
  print("Found " + sampleArr.length + " samples: " + sampleArr); 

  // Log any errors that might have occurred since the application was started 
  this.logGlobalErrors();
  this.clearGlobalErrorStore();
  
  locators.sampleMenuLocator = locators.sampleMenuButton + '/qx.ui.menu.Menu';
  
  // Click the menu button so the menu is created
  this.qxClick(locators.sampleMenuButton, '', 'Clicking menu button');
  var sampleMenuFirstChild = this.__sel.qxObjectExecFunction(locators.sampleMenuLocator + '/child[0]', 'toString');
  
  if (sampleMenuFirstChild.indexOf("MenuSlideBar") > 0) {
    locators.sampleMenuLocator += '/qx.ui.menu.MenuSlideBar';
  }
  // Close the menu
  this.qxClick(locators.sampleMenuButton, '', 'Clicking menu button');
  
  var editor = this.getConfigSetting("editor");
  if (editor) {
    this.checkSyntaxHighlighting(editor);
  }
  
  var editOk = this.checkEdit(sampleArr[0]);
  
  /*
   * This opens a TinyURL window which sends a request to PayPal that causes a
   * certificate warning to pop up, breaking the test.
  if (editOk) {
    this.checkUrlShortening();
  }
  */
  
  this.checkSampleLoad(sampleArr);
  
  this.checkGistFromList();
  
  //this.checkGistFromUrl();
  
};

simulation.Simulation.prototype.checkSampleLoad = function(sampleArr)
{
  // Select and check each sample
  for (var i=0; i<sampleArr.length; i++) {
    if (sampleArr[i] !== "") {
    // Webbrowser and YQL Binding cause mixed content warning popups in IE
    // when SSL is used.
    if ( (sampleArr[i] == "Webbrowser" || sampleArr[i] == "YQL Binding")
           && this.getConfigSetting("autHost").indexOf("https:") == 0 
       && this.getConfigSetting("testBrowser").indexOf("iexplore") >= 0 ) {
      this.log("Skipping sample " + sampleArr[i] + " in IE/SSL", "info");
      continue;
    }
      this.__sel.chooseOkOnNextConfirmation();
      print("Selecting next sample: " + sampleArr[i]);
      this.qxClick(locators.sampleMenuButton, '', 'Clicking menu button');
      this.qxClick(locators.sampleMenuLocator + '/child[' + i + ']', '', 'Selecting sample ' + sampleArr[i]);

      try {
        this.__sel.getConfirmation();
      } catch(ex) {
        // An exception here just means there was no dialog box
      }    
      
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

simulation.Simulation.prototype.checkGistFromList = function()
{
  this.qxClick(locators.gitHubButton, "", "Clicking Gist button");
  
  var filterActive = String(this.__sel.qxObjectExecFunction(locators.gistMenu + "/child[1]", "getValue"));
  if (filterActive == "true") {
    this.log("Gist filter is active", "info");
  }
  else {
    this.qxClick(locators.gistMenu + "/child[1]", "", "Activating Gist filter");
  }
  
  // Loading the gist list won't work unless the text field's list item is 
  // focused (qx bug #3456), so we click it first.
  this.qxClick(locators.gistUserNameField, "");
  this.qxType(locators.gistUserNameField, "danielwagner");
  
  // Selenium Bug: http://jira.openqa.org/browse/SEL-646
  // Pressing Return only works in IE and FF, so click the button instead for
  // the other browsers.
  var browser = this.getConfigSetting("testBrowser");
  if (browser.indexOf("googlechrome") >= 0 || browser.indexOf("opera") >= 0
    || browser.indexOf("safari") >= 0) {
    this.qxClick(locators.gistLoadButton, "", "Clicking Gist load button");
  }
  else {
    this.__sel.keyPress(locators.gistUserNameField, "13");
  }
  
  var checkGistReady = function()
  {
    try {
      var item = selenium.getQxWidgetByLocator('qxh=[@classname="playground.view.gist.GistMenu"]/child[5]');
      if (item.getLabel().toString().indexOf("[qx]") >= 0) {
        return true;
      }
    } catch(ex) {
      return false;
    } 
  };
  
  this.addOwnFunction("checkGistReady", checkGistReady);
  
  try {
    this.__sel.waitForCondition("selenium.browserbot.getCurrentWindow().qx.Simulation.checkGistReady()", 25000);
  } 
  catch(ex) {
    this.log("Gists not loaded after 25 seconds", "warn");
    return;
  }
  
  var gistLabel = this.__sel.qxObjectExecFunction(locators.gistMenu + '/child[5]', "getLabel");
  this.log("Found a Gist with the label " + gistLabel, "info");
  this.qxClick(locators.gistMenu + '/child[5]', "", "Selecting Gist");
  
  Packages.java.lang.Thread.sleep(3000);
  
  var sampleStarted = this.isSampleStarted(gistLabel);

  this.logGlobalErrors();
  this.clearGlobalErrorStore();  

  if (sampleStarted) {
    this.log("Gist " + gistLabel + " started without errors.", "info");
  }
  else {
    this.log("Gist " + gistLabel + " did not load and/or start correctly.", "error");        
  }
  
};

simulation.Simulation.prototype.checkGistFromUrl = function()
{
  var url = this.getConfigSetting("autHost") + this.getConfigSetting("autPath") + "#gist=279900";
  this.__sel.open(url);
};

simulation.Simulation.prototype.checkUrlShortening = function()
{
  this.qxClick(locators.shortenUrlButton, "", "Clicking Shorten URL");
  Packages.java.lang.Thread.sleep(2000);
  var winTitles = this.__sel.getAllWindowTitles();
  var found = false;
  for (prop in winTitles) {
    if (winTitles[prop].match(/tinyurl/i)) {
      found = true;
      break;
    }
  }
  if (found) {
    this.log("TinyURL.com window opened", "info");
  }
  else {
    this.log("TinyURL.com window not opened!", "error");
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
