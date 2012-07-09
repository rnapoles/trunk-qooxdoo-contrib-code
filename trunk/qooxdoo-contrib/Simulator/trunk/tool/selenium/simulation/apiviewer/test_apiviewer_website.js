var baseConf = {
  autName : 'WebsiteAPIViewer',
  globalTimeout : 300000,
  stepSpeed : '250',
  debug : true,
  applicationLog : false,
  disposerDebug : false
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

simulation.Simulation.prototype.runTest = function()
{
  // build warning
  var warning = this.__sel.isVisible("warning");
  if (warning) {
    var warningContent = String(this.getEval(simulation.Simulation.SELENIUMWINDOW + '.document.getElementById("warning").innerHTML'));
    this.log(warningContent, "error");
    return;
  }
  
  // missing function(s)
  if (this.__sel.isElementPresent("//b[starts-with(text(), '!!')]")) {
    this.log("At least one documented method is missing!", "error");
  }
  
  // content scrolls when clicking a list entry
  var q = simulation.Simulation.SELENIUMWINDOW + ".q";
  this.__sel.click("//a[@href = '#Css']");
  var scrollTop = parseInt(String(this.getEval(q + '("#content").getScrollTop()')));
  if (scrollTop < 6500) {
    this.log("Expected content scrollTop to be > 6800 after clicking 'Css' but found " + scrollTop, "error");
  }
  
  // syntax highlighting
  if (!this.__sel.isElementPresent("//pre[@class = 'javascript']/span[@class = 'string']")) {
    this.log("Syntax highlighting is not active!", "error");
  }
  
  // toggle plugin API
  this.__sel.click("plugintoggle");
  if (!this.__sel.isVisible("//div[@id = 'plugintoggle']/span[text() = 'hide']")) {
    this.log("Plugin toggle text did not change after click!", "error");
  }
  if (!this.__sel.isVisible("q.$attach")) {
    this.log("q.$attach documentation is not displayed!", "error");
  }
  
  // MDN link
  if (!this.__sel.isElementPresent('//a[@href = "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean"]')) {
    this.log("MDN links not displayed!", "error");
  }
  
  // Internal link
  var extendsLink = "//div[contains(@class, 'return-desc')]/p/a[@href = '#Script']";
  if (!this.__sel.isElementPresent(extendsLink)) {
    this.log("'Extends' link to Script module not found!", "error");
  }
  else {
    var scrollTopBefore = parseInt(String(this.getEval(q + '("#content").getScrollTop()')));
    this.__sel.click(extendsLink);
    var scrollTopAfter = parseInt(String(this.getEval(q + '("#content").getScrollTop()')));
    
    if (scrollTopBefore == scrollTopAfter) {
      this.log("Clicking 'Extends' link did not change content scroll position!", "error");
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

  try {
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

  mySim.logResults();

  mySim.stop();

})();