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

qx.Class.define("qxunit.runner._mod_head",
{
  extend : qx.core.Object,

  construct : function()
  {
    this.base(arguments);
  },

  members : {

  }
});

package com.thoughtworks.selenium;

public class QxSelenium extends DefaultSelenium
{
  public QxSelenium(String serverHost, int serverPort, String browserStartCommand, String browserURL) {
    super(serverHost, serverPort, browserStartCommand, browserURL);
  }

  public void qxClick(String locator) {
    this.commandProcessor.doCommand("qxClick", new String[] {locator,});
  }

  public void qxClick(String locator, String opts) {
    this.commandProcessor.doCommand("qxClick", new String[] {locator, opts,});
  }

  public void qxClickAt(String locator) {
    this.commandProcessor.doCommand("qxClickAt", new String[] {locator,});
  }
 
  public void qxClickAt(String locator, String opts) {
    this.commandProcessor.doCommand("qxClickAt", new String[] {locator, opts,});
  }

}
