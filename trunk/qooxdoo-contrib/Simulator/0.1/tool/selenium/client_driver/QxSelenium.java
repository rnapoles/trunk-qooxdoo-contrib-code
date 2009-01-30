/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Thomas Herchenroeder (thron7)

************************************************************************ */

package com.thoughtworks.selenium;

public class QxSelenium extends DefaultSelenium
{
  public QxSelenium(String serverHost, int serverPort, String browserStartCommand, String browserURL) {
    super(serverHost, serverPort, browserStartCommand, browserURL);
  }

  public String qxClick(String locator) {
    return this.commandProcessor.doCommand("qxClick", new String[] {locator,});
  }

  public String qxClick(String locator, String opts) {
    return this.commandProcessor.doCommand("qxClick", new String[] {locator, opts,});
  }

  public String qxClickAt(String locator) {
    return this.commandProcessor.doCommand("qxClickAt", new String[] {locator,});
  }
 
  public String qxClickAt(String locator, String opts) {
    return this.commandProcessor.doCommand("qxClickAt", new String[] {locator, opts,});
  }

  public String getViewport() {
    return this.commandProcessor.doCommand("getViewport", new String[] {});
  }

  public String captureScreenshot(String filename, String geometry) {
    return this.commandProcessor.doCommand("captureScreenshot", new String[] {filename, geometry});
  }

}
