/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Thomas Herchenroeder (thron7)
     * Andreas Ecker (ecker)
     * Daniel Wagner (d_wagner)

************************************************************************ */

importClass(Packages.com.thoughtworks.selenium.QxSelenium);

var config =
{
    serverHost : "localhost",
    serverPort : 4444,
    browserStartCommand : "*firefox",
    // aut*: how to reach the Simulator sample app over a local web server
    autHost    : "localhost",
    autPort    : 80,
    autPath    : "/Simulator/trunk/source/index.html",
    speed      : "1000",  // step speed of simulation
    sleep      : 2000     // pausing at critical points to make simulation more robust
};

function simulation(keepBrowser)
{
  sel.qxClick('button'); // using HTML id 'button'
  sel.qxClick('Second'); // using HTML id 'Second'
  sel.type('tf',"");     // clear textfield
  sel.qxClick('qxh=qx.ui.form.Button'); // using qooxdoo class name
  sel.qxClick('qxh=app:c1/c2/c3/First'); // first tab, using object nesting
  sel.qxClick('qxh=[@label="First Button"]'); // using qooxdoo property
  
  var getTextValue = 'selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication().tf.getValue()';
  var textValue = sel.getEval(getTextValue);
  print("Text field value: " + textValue);
  
  if (!keepBrowser)
  {
    sel.stop();  // this would tear down the browser
  }
}

function init()
{
  var browserUrl = "http://" + config.autHost + ":" + config.autPort + 
                    config.autPath;

  // create Selenium object
  sel = new QxSelenium(config.serverHost, config.serverPort, 
      config.browserStartCommand, browserUrl);
  
  sel.setSpeed(config.speed);
  
  sel.start(); // this launches the browser
  sel.open(browserUrl);  // this opens the AUT
  
  // wait until qx application is instantiated
  var isQxReady = 'var qxReady = false;';
  isQxReady += 'try {';
  isQxReady += '  if (selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication()) {';
  isQxReady += '    qxReady = true;';
  isQxReady += '  }';
  isQxReady += '}';
  isQxReady += 'catch(e) {}';
  isQxReady += 'qxReady;';

  sel.waitForCondition(isQxReady, "60000");
}

var keepBrowser = false;

init();

for (var i in arguments)
{
  if (arguments[i]=="-keepBrowser")
  {
    keepBrowser = true;
  }
}

simulation(keepBrowser);
