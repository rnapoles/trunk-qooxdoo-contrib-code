var baseConf = {
  'autName' : 'Tutorial',
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
var mySim = new simulation.Simulation(baseConf, args);

var locators = {
  buttonBackward : "//div[contains(@style, 'media-skip-backward.png')]",
  buttonHelp : "//div[text() = 'Help me out']",
  buttonRun : "//div[contains(@style, 'media-playback-start.png')]",
  buttonSelectTutorial : "//div[text() = 'Select Tutorial']",
  windowSelectTutorial : "qxhv=[@classname='tutorial.view.SelectionWindow']",
  buttonCloseWindow : "//div[contains(@style, 'close.gif')]",
  buttonForward : "//div[contains(@style, 'media-skip-forward.png')]",
  jsErrorMessage : "//div[contains(@style, 'red')]",
  aceContent : "//div[contains(@class, 'ace_content')]",
  aceIconWarning : "//div[contains(@class, 'ace_warning')]",
  aceIconError : "//div[contains(@class, 'ace_error')]",
  windowConfirm : "qxhv=[@classname='tutorial.view.Confirm']",
  windowConfirmCheckbox : "qxhv=[@classname='tutorial.view.Confirm']/qx.ui.form.CheckBox",
  windowConfirmTitle : "//div[text() = 'Confirm']",
  windowConfirmButtonCancel : "qxhv=[@classname='tutorial.view.Confirm']/[@label='Cancel']",
  windowConfirmButtonOk : "qxhv=[@classname='tutorial.view.Confirm']/[@label='Ok']"
};

simulation.Simulation.prototype.runTest = function()
{
  this.__sel.windowMaximize();
  this.__replaceCodeConfirmed = false;

  this.__isFF36 = false;
  if (this.getEnvironment("browser.name") == "firefox" &&
      parseFloat(this.getEnvironment("browser.version")) < 4 )
  {
    this.__isFF36 = true;
    // qx uses labels instead of divs for the button text but '//label'
    // doesn't find anything (?!?)
    for (var locator in locators) {
      locators[locator] = locators[locator].replace("//div[text()", "//*[@value");
    }
  }
  var titles = this.getTutorialTitles();

  for (var i=0,l=titles.length; i<l; i++) {
    this.testTutorial(titles[i][0], titles[i][1]);
  }
};

simulation.Simulation.prototype.testTutorial = function(shortTitle, longTitle)
{
  this.log("Testing tutorial '" + shortTitle + ": " + longTitle + "'", "info");
  try {
    this.selectTutorial(longTitle);
  } catch(ex) {
    this.log(ex.message, "error");
    return;
  }

  if (!this.isElementVisible("//p[text() = '" + shortTitle + "']")) {
    this.error("Tutorial title not found in page!", "error");
  }

  this.testTutorialSteps();
};

simulation.Simulation.prototype.testTutorialSteps = function()
{
  var step = 1;
  this.testTutorialStep(step);

  while (this.forwardButtonEnabled()) {
    try {
      this.qxClick(locators.buttonForward);
      step++;
      this.testTutorialStep(step);
    } catch(ex) {
      this.log("Error while testing step " + step + ": " + ex.message, "error");
    }
  }
};

simulation.Simulation.prototype.testTutorialStep = function(step)
{
  this.log(new Date().getTime() + " Testing step " + step, "debug");
  var stepLoc = "//p[starts-with(text(), 'Step " + step + "/')]";
  if (!this.isElementPresent(stepLoc)) {
    this.log("Step " + step + " title not found!", "error");
  }

  if (this.hasAce()) {
    editorContentLength = this.getEditorContentLength();
  }
  this.qxClick(locators.buttonHelp);

  if (!this.__replaceCodeConfirmed) {
    if (!this.confirmCodeReplacement()) {
      return;
    }
    this.__replaceCodeConfirmed = true;
    this.log("Confirmed code replacement", "info");
  }

  if (this.hasAce() && editorContentLength == this.getEditorContentLength()) {
    this.log("Editor content did not change!", "error");
    return;
  }

  this.logJsError();
  if (this.hasAce()) {
    this.logAceError();
  }
};

simulation.Simulation.prototype.logAceError = function() {
  if (this.isElementPresent(locators.aceIconWarning)) {
    this.log("ACE shows warning(s)!", "error");
  }
  if (this.isElementPresent(locators.aceIconError)) {
    this.log("ACE shows error(s)!", "error");
  }
};

simulation.Simulation.prototype.logJsError = function() {
  var locator, getJSerror;
  if (this.__isFF36) {
    locator = "//div[contains(@style, 'red')]";
    locator = locator.replace(/'/g, "\\'");
    getJSerror = "selenium.browserbot.findElement('" + locator + "').firstChild.value";
  }
  else {
    locator = locators.jsErrorMessage;
    locator = locator.replace(/'/g, "\\'");
    getJSerror = "selenium.browserbot.findElement('" + locator + "').innerHTML";
  }

  var jsError = String(this.__sel.getEval(getJSerror));
  if (jsError.length > 0)
  {
    this.log("JavaScript error in tutorial code: " + String(jsError), "error");
  }
};

simulation.Simulation.prototype.getEditorContentLength = function()
{
  var locator = locators.aceContent.replace(/'/g, "\\'");
  var getLength = "selenium.browserbot.findElement('" + locator + "').innerHTML.length";
  var result = this.__sel.getEval(getLength);
  return parseInt(result, 10);
};

simulation.Simulation.prototype.confirmCodeReplacement = function()
{
  try {
    this.waitForElementPresent(locators.windowConfirm, 4000);
  } catch(ex) {
    this.log("Code replacement dialog did not open!", "error");
    return false;
  }
  this.qxClick(locators.windowConfirmCheckbox);
  this.qxClick(locators.windowConfirmButtonOk);

  try {
    this.waitForElementNotPresent(locators.windowConfirm, 2000);
  }
  catch(ex) {
    this.log("Code replacement dialog was not closed!", "error");
    return false;
  }
  return true;
};

simulation.Simulation.prototype.forwardButtonEnabled = function()
{
  var isEnabled = this.__sel.getRunInContext(locators.buttonForward, "return this.isEnabled();");
  return isEnabled == "true";
};

simulation.Simulation.prototype.selectTutorial = function(title) {
  if (!this.isElementPresent(locators.windowSelectTutorial) ||
      !this.isElementVisible(locators.windowSelectTutorial))
  {
    this.qxClick(locators.buttonSelectTutorial);
    this.waitForElementPresent(locators.windowSelectTutorial, 4000);
  }
  var tutorialButton = locators.windowSelectTutorial + "/[@label='" + title + "']";
  this.qxClick(tutorialButton);
  this.waitForElementNotPresent(locators.windowSelectTutorial, 2000);
};

simulation.Simulation.prototype.getTutorialTitles = function()
{
  this.qxClick(locators.buttonSelectTutorial);
  this.waitForElementPresent(locators.windowSelectTutorial, 4000);

  var getterFunc = 'var labels = []; var children = this.getChildren();' +
  'for (var i=0; i<children.length; i++) {' +
  '  if (children[i].getLabel && children[i].getEnabled()) { ' +
  '    labels.push(children[i].getLabel()); ' +
  '  } ' +
  '}' +
  'return labels';
  var resultJson = this.__sel.getRunInContext(locators.windowSelectTutorial, getterFunc);
  eval("var titles = " + resultJson);

  var titlesList = [];

  for (var i=0,l=titles.length; i<l; i++) {
    var label = titles[i];
    var split = label.split("<br>");
    try {
      split[1] = />(.*?)</.exec(split[1])[1];
    } catch(ex) {
      this.log("Unexpected button label format: " + split[1]);
    }
    titlesList.push(split);
  }

  this.qxClick(locators.buttonCloseWindow);

  return titlesList;
};

simulation.Simulation.prototype.hasAce = function()
{
  return this.isElementPresent(locators.aceContent);
};

// - Main --------------------------------------------------------------------

(function() {
  mySim.testFailed = false;

  var sessionStarted = mySim.startSession();

  if (!sessionStarted) {
    return;
  }

  var isAppReady = mySim.waitForCondition(simulation.Simulation.ISQXAPPREADY, 240000,
    "Waiting for qooxdoo application");


  if (!isAppReady) {
    mySim.testFailed = true;
    mySim.stop();
    return;
  }

  try {
    mySim.setupApplicationLogging();
    mySim.addGlobalErrorHandler();
    mySim.runTest();
  }
  catch(ex) {
    var msg = "Unexpected error while running tests: " + ex;
    if (mySim.getConfigSetting("debug")) {
      print(msg + "\n");
    }
    mySim.log(msg, "error");
  }
  mySim.logGlobalErrors();

  if (!mySim.testFailed) {
    if (mySim.getConfigSetting("debug")) {
      print("Test run finished successfully.");
    }

    var totalErrors = mySim.getTotalErrorsLogged() + mySim.getTotalWarningsLogged();
    mySim.log("Tests with warnings or errors: " + totalErrors, "info");
  }

  mySim.stop();
  mySim.logTestDuration();

})();
