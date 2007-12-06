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

************************************************************************ */

var config =
{
    serverHost : "localhost",
    serverPort : 4444,
    browserStartCommand : "*firefox",
    browserUrl : "http://localhost:8080",
    appUrl : "/Simulator/trunk/source/index.html",
    speed : "1000",
    sleep : 2000
};

function simulation()
{
  sel.qxClick('button');
//  sel.stop();
}

function init()
{
  importClass(Packages.com.thoughtworks.selenium.QxSelenium);
  
  sel = new QxSelenium(config.serverHost, config.serverPort, 
      config.browserStartCommand, config.browserUrl);
  
  sel.setSpeed(config.speed);
  
  sel.start();
  sel.open(config.browserUrl + config.appUrl);
  
  Packages.java.lang.Thread.sleep(config.sleep);
}

init();

simulation();
