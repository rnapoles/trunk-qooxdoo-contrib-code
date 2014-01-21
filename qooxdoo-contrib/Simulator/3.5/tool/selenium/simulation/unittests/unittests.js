simulation.Simulation.prototype.getFailedTests = function()
{
  var selWin = simulation.Simulation.SELENIUMWINDOW;
  var qxAppInst = simulation.Simulation.QXAPPINSTANCE;
  
  var prefix = selWin + "." + qxAppInst;
  
  var errorGetter = selWin + ".qx.lang.Json.stringify(" + prefix + ".runner.view.getFailedResults())";
  var resultsString;
  try {
    resultsString = this.__sel.getEval(errorGetter);
    resultsString = String(resultsString);
    eval("var results=" + resultsString);
    return results;
  }
  catch(ex) {
    this.log("Couldn't get results: " + ex.message, "error");
    return null;
  }
};


simulation.Simulation.prototype.logFailedTests = function(results)
{
  for (var testName in results) {
    var result = results[testName];
    
    var message = "";
    for (var i=0,l=result.messages.length; i<l; i++) {
      var msg = result.messages[i];
      msg = this.replaceStrings(msg);
      message += msg + "<br/><br/>";
    }
    
    var level = "info";
    switch(result.state) {
      case "skip":
        level = "info";
        break;
      default:
        level = "error";
    };
    
    var html = '<div class="testResult ' + level + '">'
      + '<h3>' + testName + '</h3>' + message + '</div>';
    
    this.log(html, level);
  }
};

simulation.Simulation.prototype.replaceStrings = function(line)
{
  try {
    line = line.replace(/\<br\>/gi, "<br/>");
    line = line.replace(/\'/g, "\\'");
    line = line.replace(/\n/g, "");
    line = line.replace(/\r/g, "");
  }
  catch(ex) {
    line = "";
  }
  return line;
};
