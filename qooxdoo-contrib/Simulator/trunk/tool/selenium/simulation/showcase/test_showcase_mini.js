/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Thomas Herchenroeder (thron7)

************************************************************************ */

importClass(Packages.com.thoughtworks.selenium.QxSelenium);
var sel = new QxSelenium("localhost",4444,"*firefox","http://demo.qooxdoo.org");
sel.setSpeed("1000");
sel.start();
sel.open("http://demo.qooxdoo.org/0.7.2/showcase/");
Packages.java.lang.Thread.sleep(2000);
sel.qxClick('//div[text()="Tab"]');
sel.qxClick('qxh=*/[@label="Tab"]/[@page]/*/[@label="Find"]');
sel.stop();
