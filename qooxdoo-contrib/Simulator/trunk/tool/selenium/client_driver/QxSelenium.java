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
     * Daniel Wagner (d_wagner)

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

  public String qxTableClick(String locator) {
    return this.commandProcessor.doCommand("qxTableClick", 
      new String[] {locator, });
  }

  public String qxTableClick(String locator, String opts) {
    return this.commandProcessor.doCommand("qxTableClick", 
      new String[] {locator, opts, });
  }

  public String getViewport() {
    return this.commandProcessor.doCommand("getViewport", new String[] {});
  }

  public String captureScreenshot(String filename, String geometry) {
    return this.commandProcessor.doCommand("captureScreenshot", new String[] {filename, geometry});
  }

  public int qxTableGetRows(String locator) {
    String ret = this.commandProcessor.getString("getQxTableRows", 
      new String[] {locator,});
    return Integer.parseInt(ret);
  }

  public int qxTableGetCols(String locator) {
    String ret = this.commandProcessor.getString("getQxTableCols", 
      new String[] {locator,});
    return Integer.parseInt(ret);    
  }

  public String qxTableGetValue(String locator, String opts) {
    String ret = this.commandProcessor.getString("getQxTableValue", 
      new String[] {locator, opts, });
    return ret;
  }

  public String qxObjectExecFunction(String locator, String functionName) {
    String ret = this.commandProcessor.getString("getQxObjectFunction", 
      new String[] {locator, functionName, });
    return ret;
  }

}