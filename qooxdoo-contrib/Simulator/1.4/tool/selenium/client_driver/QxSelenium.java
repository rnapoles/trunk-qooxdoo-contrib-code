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
  
  public String qxTableHeaderClick(String locator) {
    return this.commandProcessor.doCommand("qxTableHeaderClick", 
      new String[] {locator, });
  }

  public String qxTableHeaderClick(String locator, String opts) {
    return this.commandProcessor.doCommand("qxTableHeaderClick", 
      new String[] {locator, opts, });
  }  

  public String qxEditTableCell(String locator, String opts) {
    return this.commandProcessor.doCommand("qxEditTableCell", 
      new String[] {locator, opts, });
  }
  
  public String getViewport() {
    return this.commandProcessor.doCommand("getViewport", new String[] {});
  }

  public String captureScreenshot(String filename, String geometry) {
    return this.commandProcessor.doCommand("captureScreenshot", new String[] {filename, geometry});
  }

  public int getQxTableRowCount(String locator) {
    String ret = this.commandProcessor.getString("getQxTableRowCount", 
      new String[] {locator,});
    return Integer.parseInt(ret);
  }

  public int getQxTableModelColCount(String locator) {
    String ret = this.commandProcessor.getString("getQxTableModelColCount", 
      new String[] {locator,});
    return Integer.parseInt(ret);    
  }
  
  public int getQxTableVisibleColCount(String locator) {
    String ret = this.commandProcessor.getString("getQxTableVisibleColCount", 
      new String[] {locator,});
    return Integer.parseInt(ret);    
  }

  public String getQxTableValue(String locator, String opts) {
    String ret = this.commandProcessor.getString("getQxTableValue", 
      new String[] {locator, opts, });
    return ret;
  }

  public String getQxTableModelColumnIds(String locator) {
    String ret = this.commandProcessor.getString("getQxTableModelColumnIds", 
      new String[] {locator,});
    return ret;
  }
  
  public String getQxTableVisibleColumnIds(String locator) {
    String ret = this.commandProcessor.getString("getQxTableVisibleColumnIds", 
      new String[] {locator,});
    return ret;
  }
  
  public String getQxTableColumnIndexByName(String locator, String name) {
    String ret = this.commandProcessor.getString("getQxTableColumnIndexByName",
      new String[] {locator, name});
    return ret;
  }
  
  public String getQxTableSelectedRowData(String locator) {
    String ret = this.commandProcessor.getString("getQxTableSelectedRowData",
      new String[] {locator,});
    return ret;
  }

  public String getQxObjectFunction(String locator, String functionName) {
    String ret = this.commandProcessor.getString("getQxObjectFunction", 
      new String[] {locator, functionName, });
    return ret;
  }
  
  public String getRunInContext(String locator, String script) {
    String ret = this.commandProcessor.getString("getRunInContext", 
      new String[] {locator, script, });
    return ret;
  }
  
  public String getQxObjectHash(String locator) {
    String ret = this.commandProcessor.getString("getQxObjectHash", 
        new String[] {locator,});
    return ret;
  }
  
  public String getQxObjectHash(String locator, String script) {
    String ret = this.commandProcessor.getString("getQxObjectHash", 
        new String[] {locator, script,});
    return ret;
  }
  
  public String qxDragAndDrop(String locator, String opts) {
    return this.commandProcessor.doCommand("qxDragAndDrop", new String[] {locator, opts,});
  }
  
  public String qxDragAndDropToObject(String locator, String opts) {
    return this.commandProcessor.doCommand("qxDragAndDropToObject", new String[] {locator, opts,});
  }
  
  public String qxType(String locator, String value) {
    String ret = this.commandProcessor.doCommand("qxType", 
      new String[] {locator, value, });
    return ret;
  }
  
  public String qxTypeKeys(String locator, String value) {
    String ret = this.commandProcessor.doCommand("qxTypeKeys", 
      new String[] {locator, value, });
    return ret;
  }

}
