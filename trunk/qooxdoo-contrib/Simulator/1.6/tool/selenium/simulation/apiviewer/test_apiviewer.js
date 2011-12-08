var baseConf = {
  'autName' : 'APIViewer',
  'globalTimeout' : 300000,
  'stepSpeed' : '500',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*custom /usr/lib/firefox-3.0.10/firefox -no-remote -P selenium-3',
  'autHost' : 'http://localhost',
  'autPath' : '/~dwagner/workspace/qooxdoo.trunk/framework/api/index.html',
  'simulatorSvn' : '/home/dwagner/workspace/qooxdoo.contrib/Simulator',
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

var mySim = new simulation.Simulation(baseConf,args);

var selWin = simulation.Simulation.SELENIUMWINDOW;
var qxAppInst = simulation.Simulation.QXAPPINSTANCE;
var logHtml = selWin + "." + qxAppInst + ".logelem.innerHTML";

simulation.Simulation.prototype.runTest = function()
{
  this.__sel.windowMaximize();
  if (this.getConfigSetting("autPath").indexOf("~press") > 0) {
    this.checkUrlParameter();
  }
  
  // Add a function that finds span tags with the given content
  var getSpanByContent = function(content) {
    var found = false;
    var spans = selenium.browserbot.getCurrentWindow().document.getElementsByTagName("span");
    for (var i=0,l=spans.length; i<l; i++) {
      if (spans[i].innerHTML.indexOf(content) == 0) {
        found = true;
      }
    }
    return found;
  };
  
  this.addOwnFunction("getSpanByContent", getSpanByContent);
  
  var getInnerHtml = function(locator) {
    var widget = selenium.getQxWidgetByLocator(locator);
    return widget.getContentElement().getDomElement().innerHTML;
  };
  
  this.addOwnFunction("getInnerHtml", getInnerHtml);
  
  this.checkSearch();
  this.checkView("getActive", "Properties");
  //this.checkView("addChildrenToQueue", "Inherited");
  this.checkView("_activateMoveHandle", "Protected");
  this.checkView("__computeMoveCoordinates", "Private");
  
  var constructorDetail = false;
  try {
    this.__sel.click('//img[contains(@onclick, "toggleShowItemDetails(\'construct\')")]');
    constructorDetail = true;
  } catch(ex) {
    this.log("Error while opening constructor details: " + ex, "error");
  }
  
  var clickedLink = false;
  if (constructorDetail && this.getConfigSetting("browserId").indexOf("Safari 3") < 0 ) {
    try {
      this.__sel.click("link=qx.ui.core.Widget#construct");
      clickedLink = true;
    } catch(ex) {
      this.log("Error while clicking internal link: " + ex, "error"); 
    }
  }
  
  if (clickedLink) {
    // Check if the HTML embed's content has changed.
    var classViewerHtml = this.checkViewerContent();
    if (!(classViewerHtml.indexOf("qx.ui.core.Widget") > 0)) {
      this.log("Unexpected class viewer HTML content", "error");
    }
    else {
      this.log("Link opened successfully", "info");
    }
  }
};

simulation.Simulation.prototype.checkSearch = function()
{
  this.qxClick("qxh=app:viewer/qx.ui.toolbar.ToolBar/qx.ui.toolbar.Part/child[1]", "", "Clicking search button");
  
  this.qxType("qxh=app:viewer/[@_searchView]/qx.ui.container.Composite/qx.ui.form.TextField", "qx.ui.window.Windo");
  // execute typeKeys once so all needed events are fired.
  Packages.java.lang.Thread.sleep(2000);
  this.qxTypeKeys("qxh=app:viewer/[@_searchView]/qx.ui.container.Composite/qx.ui.form.TextField", "w");

  Packages.java.lang.Thread.sleep(1000);
  
  this.qxTableClick("qxh=app:viewer/[@_searchView]/qx.ui.table.Table","row=0");
  Packages.java.lang.Thread.sleep(1000);
  // Temporary workaround: Click the search result again to make sure it's
  // selected.
  this.qxTableClick("qxh=app:viewer/[@_searchView]/qx.ui.table.Table","row=0");
  Packages.java.lang.Thread.sleep(4000);

  // Check if the HTML embed's content has changed.
  var classViewerHtml = this.checkViewerContent();
  if (!(classViewerHtml.indexOf("qx.ui.window") > 0)) {
    this.log("Unexpected class viewer HTML content", "error");
  }
  else {
    this.log("Successfully opened search result", "info");
  }  
};

simulation.Simulation.prototype.checkViewerContent = function()
{
  try {
    var loc = 'qxh=[@classname="apiviewer.Viewer"]/qx.ui.splitpane.Pane/qx.ui.container.Composite/qx.ui.tabview.TabView/qx.ui.container.Stack/[@classname="apiviewer.ui.tabview.ClassPage"]/[@classname="apiviewer.ui.ClassViewer"]';
    var html = this.__sel.getEval(selWin + ".qx.Simulation.getInnerHtml('" + loc + "')");
    return html;
  } catch(ex) {
    try {
      var classViewerHtmlScript = selWin + '.document.getElementById("ClassViewer").innerHTML';
      return this.__sel.getEval(classViewerHtmlScript);
    } catch(ex) {
      return "";
    }
  }
};

simulation.Simulation.prototype.checkView = function(newMethodName, buttonLabel)
{
  /*
  this.qxClick("qxh=app:viewer/qx.ui.toolbar.ToolBar/child[2]/qx.ui.toolbar.MenuButton", "", "Clicking View menu button");
  this.qxClick('qxh=app:viewer/qx.ui.toolbar.ToolBar/child[2]/qx.ui.toolbar.MenuButton/qx.ui.menu.Menu/[@label="' + buttonLabel + '"]', "", "Clicking " + buttonLabel);
  */
 
  var active = String(this.__sel.getQxObjectFunction('qxh=app:viewer/qx.ui.toolbar.ToolBar/child[2]/[@label="' + buttonLabel + '"]', 'getValue'));
  // check if the view option is already activated
  if (active == "false") {
    this.qxClick('qxh=app:viewer/qx.ui.toolbar.ToolBar/child[2]/[@label="' + buttonLabel + '"]', "", "Clicking " + buttonLabel);
    Packages.java.lang.Thread.sleep(3000);
  }
  var foundNewMethod = this.getEval(selWin + ".qx.Simulation.getSpanByContent('" + newMethodName + "');", "Checking for " + buttonLabel + " documentation");
  
  if (String(foundNewMethod) != "true") {
    this.log("Documentation for " + newMethodName + " not found, possible problem with " + buttonLabel, "error");
  }
  else {
    this.log(buttonLabel + " checked: OK", "info");
  }
  this.qxClick('qxh=app:viewer/qx.ui.toolbar.ToolBar/child[2]/[@label="' + buttonLabel + '"]', "", "Clicking " + buttonLabel);
};

simulation.Simulation.prototype.checkUrlParameter = function()
{
  try {
    var bla = String(this.__sel.getText('//tr[@class="marked"]/td[@class="text"]/div[@_itemname="press"]'));
    this.log("URI parameter handling checked: OK", "info");
  }
  catch(ex) {
    this.log("Expected element not found after opening with URL parameter!");
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
    if (mySim.getConfigSetting("debug")) {
      print(msg + "\n" + ex);
    }
    mySim.log(msg + "<br/>" + ex, "error");
  }

  mySim.logGlobalErrors();
  mySim.logResults();

  mySim.stop();

})();