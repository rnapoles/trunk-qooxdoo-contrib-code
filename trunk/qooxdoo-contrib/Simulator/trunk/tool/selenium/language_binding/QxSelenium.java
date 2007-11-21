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
