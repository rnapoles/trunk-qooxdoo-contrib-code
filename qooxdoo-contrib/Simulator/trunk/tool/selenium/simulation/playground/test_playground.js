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

simulation.Simulation.prototype.initLocators = function()
{
  this.locators = {
    header : "qxhv=*/[@classname=playground.view.Header]",
    toolbar : "qxhv=*/[@classname=playground.view.Toolbar]",
    samples : "qxhv=*/qx.ui.splitpane.Pane/child[0]/[@classname=playground.view.Samples]",
    editor : "qxhv=*/qx.ui.splitpane.Pane/child[0]/[@classname=playground.view.Editor]",
    playArea : "qxhv=child[0]/qx.ui.splitpane.Pane/child[1]/[@classname=playground.view.PlayArea]",
    logView : "qxhv=child[0]/qx.ui.splitpane.Pane/child[1]/[@classname=qxc.ui.logpane.LogView]"
  };
  
  this.locators.headerButtonDesktop = this.locators.header + "/[@label=Desktop]";
  this.locators.headerButtonMobile = this.locators.header + "/[@label=Mobile]";
  this.locators.toolbarButtonRun = this.locators.toolbar + "/[@label=Run]";
  this.locators.toolbarButtonSamples = this.locators.toolbar + "/[@label=Samples]";
  this.locators.toolbarButtonSyntax = this.locators.toolbar + "/[@label=Syntax Highlighting]";
  this.locators.toolbarButtonLog = this.locators.toolbar + "/[@label=Log]";
  this.locators.toolbarButtonShorten = this.locators.toolbar + "/[@label=Shorten URL]";
  this.locators.toolbarButtonApi = this.locators.toolbar + "/[@label=API Viewer]";
  this.locators.toolbarButtonManual = this.locators.toolbar + "/[@label=Manual]";
  this.locators.toolbarButtonDemo = this.locators.toolbar + "/[@label=Demo Browser]";
  this.locators.samplesList = this.locators.samples + "/qx.ui.list.List";
  this.locators.samplesListWidgetCell = this.locators.samplesList + "/qx.ui.virtual.core.Pane/qx.ui.container.Composite/qx.ui.virtual.layer.WidgetCell";
  this.locators.samplesFileMenu = this.locators.samples + "/qx.ui.toolbar.ToolBar";
  this.locators.samplesButtonSave = this.locators.samplesFileMenu + "/[@icon=drive-harddisk]";
  this.locators.samplesButtonDelete = this.locators.samplesFileMenu + "/[@icon=user-trash]";
  this.locators.samplesButtonRename = this.locators.samplesFileMenu + "/[@icon=insert-text]";
  this.locators.playAreaRia = this.locators.playArea + "/[@classname=playground.view.RiaPlayArea]";
  this.locators.playAreaRiaButtonMaximize = this.locators.playAreaRia + "/*/qx.ui.form.Button";
  this.locators.playAreaRiaRoot = this.locators.playAreaRia + "/qx.ui.container.Scroll/qx.ui.root.Inline";
  this.locators.logViewButtonClear = this.locators.logView + "/*/[@label=Clear]";
  this.locators.logViewEmbedHtml = this.locators.logView + "/qx.ui.embed.Html";
}


simulation.Simulation.prototype.getSampleLabels = function()
{
  var sampleLabelGetter = 'var labels = [];'
  + 'for (var i=0; i<this.getChildren().length; i++) {'
  +   'var kid = this.getChildren()[i];'
  +   'if (kid.classname === "qx.ui.form.ListItem") {'
  +     'labels.push(kid.getLabel());'
  +   '}'
  + '}'
  + 'return labels;';
  var resultJson = this.__sel.getRunInContext(this.locators.samplesListWidgetCell, sampleLabelGetter);
  eval("var result = " + resultJson);
  
  return eval(result);
};

simulation.Simulation.prototype.testSamples = function()
{
  var sampleNames = this.getSampleLabels();
  for (var i=0, l=sampleNames.length; i<l; i++) {
    var sampleName = sampleNames[i];
    this.log("Selecting sample " + sampleName, "debug");
    this.__sel.qxClickAt(this.locators.samplesList + "/*/[@label=" + sampleName + "]");
    //TODO: replace with sample load check
    java.lang.Thread.sleep(2000);
    this.logGlobalErrors();
    this.clearGlobalErrorStore();
  }
};

simulation.Simulation.prototype.testSamplesPaneToggle = function()
{
  this.qxClick(this.locators.toolbarButtonSamples);
  java.lang.Thread.sleep(2000);
  try {
    this.__sel.qxClick(this.locators.samplesList);
  }
  catch(ex) {
    this.log("Sample pane closed correctly", "debug");
    this.qxClick(this.locators.toolbarButtonSamples);
    return;
  }
  
  this.log("Sample pane was not closed!", "error");
};

simulation.Simulation.prototype.testSyntaxHighlightingToggle = function()
{
  if (this.isLegacyIe()) {
    return;
  }
  this.qxClick(this.locators.toolbarButtonSyntax);
  java.lang.Thread.sleep(2000);
  
  var plainTextEditorLocator = this.locators.editor + "/qx.ui.form.TextArea";
  var isHighlightingDisabled = false;
  try {
    isHighlightingDisabled = this.__sel.isElementPresent(plainTextEditorLocator);
  }
  catch(ex) {}
  
  if (isHighlightingDisabled) {
    this.log("Syntax highlighting disabled correctly", "debug");
  }
  else {
    this.log("Syntax highlighting was not disabled correctly!", "error");
  }
};

simulation.Simulation.prototype.isLegacyIe = function()
{
  var getBrowserName = selWin + ".qx.core.Environment.get('browser.name');"
  var browserName = String(this.getEval(getBrowserName));
  
  var getBrowserVersion = selWin + ".qx.core.Environment.get('browser.version');"
  var browserVersion = String(this.getEval(getBrowserVersion));
  browserVersion = parseInt(browserVersion, 10);
  
  return browserName == "ie" && browserVersion < 9;
};

simulation.Simulation.prototype.runTest = function()
{
  this.initLocators();
  // Log any errors caught during startup
  this.logGlobalErrors();
  this.clearGlobalErrorStore();
  this.testSamplesPaneToggle();
  this.testSyntaxHighlightingToggle();
  this.testSamples();
  /*
  Modify code, run, check result in play area
  Save modified sample
  Rename saved sample
  Delete saved sample
  Check for AUT errors
  */
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
