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

/**
 * NAME
 *  test_showcase.js -- test qooxdoo's Showcase application with Selenium RC
 *
 * SYNTAX
 *  java -cp  'selenium-java-client-driver.jar:js.jar' \
 *            org.mozilla.javascript.tools.shell.Main test_showcase.js
 *
 * PREREQUISITES
 *  - the qooxdoo user-extensions for Selenium have to be available in the
 *    Selenium RC server
 *  - the Selenium RC server has to be up and running (default on 'localhost'
 *    but see the "Config Section")
 *  - the extended qooxdoo language bindings (QxSelenium.class) have to be 
 *    available in the Selenium Java client driver
 *    (selenium-java-client-driver.jar)
 *
 * DESCRIPTION
 *  This script runs a simulation (aka test) against the qooxdoo "Showcase" demo
 *  application on the qooxdoo demo web site. To do so, it connects to a
 *  Selenium RC server, requests a new browser session, loads the Showcase
 *  application and simulates user interactions on it. The simulation is
 *  slow-paced, but the speed can be adjusted in the config section. It runs
 *  through all tabs of the application and exercises most of the widgets
 *  featured on each tab.
 */

importClass(Packages.com.thoughtworks.selenium.QxSelenium);

// - Config Section ------------------------------------------------------------
var selServer   = "localhost";
var selPort     = 4444;
var testBrowser = "*firefox";
//var testBrowser = "*iexplore";
var autHost = "http://demo.qooxdoo.org";
//var autHost = "http://localhost";
var autPath = "/0.7.2/showcase/index.html";
//var autPath = "/~thron7/.workspace/packages/qooxdoo-0.7.3-pre-sdk/frontend/application/showcase/source/index.html";
var useRunningSession = false;  // hijack existing browser session -- not possible currently
var closeBrowser = false;//  close down browser session when test finishes
var cycleTests = false;  // cycle at the end of the test -- untested
var stepSpeed  = "1000"; // millisecs after each command
var noAutoIds  = true;   // whether to rely on auto-generated @id's in the app
var takeScreenshots = false; // if true, the test will take screenshots here and there
                             // to make this work, you need a patched SRC server, as
                             // described here: http://qooxdoo.org/documentation/contrib/simulator
var shotsDir = ".";      // relative to dir where you started the SRC server
// - Config End ----------------------------------------------------------------


function Form (sel)
{
  if (noAutoIds)
  {
    sel.qxClick('//div[text()="Form"]')
    
    // fill 'Name' field
    sel.type('//input[@type="text"]', "Rampano Zampano")

    // increase spinner
    sel.qxClick('//img[contains(@src,"up_small.gif")]')
    sel.qxClick('//img[contains(@src,"up_small.gif")]')
    sel.qxClick('//img[contains(@src,"up_small.gif")]')
    sel.qxClick('//img[contains(@src,"up_small.gif")]')

    // select 'Network' from combo
    sel.qxClick('//img[contains(@src,"down.gif")]')
    sel.qxClick('//div[text()="Network"]')

    // fill 'E-Mail' (problem: no disting. feature regarding 'Name')
    sel.type('//div[text()="E-Mail"]/following-sibling::div/input[@type="text"]','foo@bar.com')

    // fill 'Comment'
    sel.type('//textarea', "Ruffelpuff woz ere")
    // click 'Submit'
    sel.qxClick('//div[text()="Submit"]')

    // "Some settings"
    sel.qxClick('//div[text()="Permit others to view my favorites"]/preceding-sibling::input')
    sel.qxClick('//div[text()="Use the very high bitrate"]/preceding-sibling::input')

    // "Network speed"
    sel.qxClick('//div[text()="Modem"]/preceding-sibling::input')
    sel.qxClick('//div[text()="DSL"]/preceding-sibling::input')
    sel.qxClick('//div[text()="Direct link"]/preceding-sibling::input')
    sel.qxClick('//div[text()="Modem"]/preceding-sibling::input')
    sel.qxClick('//div[text()="DSL"]/preceding-sibling::input')
    sel.qxClick('//div[text()="Direct link"]/preceding-sibling::input')

  }
  else
  {
    sel.qxClick('qx.ui.pageview.buttonview.Button.4')
    
    // fill 'Name' field
    sel.type('//div[@id="qx.ui.form.TextField.64"]//input', "Rampano Zampano") // 'input' is native, so no auto-generated Id for it

    // increase spinner
    sel.qxClick('qx.ui.basic.Image.69')  // although 'img' is also native, for click the enclosing div is sufficient
    sel.qxClick('qx.ui.basic.Image.69')
    sel.qxClick('qx.ui.basic.Image.69')
    sel.qxClick('qx.ui.basic.Image.69')

    // select 'Network' from combo
    sel.qxClick('qx.ui.basic.Image.77')
    sel.qxClick('qx.ui.form.ListItem.84')

    // fill 'E-Mail'
    sel.type('//div[@id="qx.ui.form.TextField.97"]//input','foo@bar.com')

    // fill 'Comment'
    sel.type('//div[@id="qx.ui.form.TextArea.99"]//textarea', "Ruffelpuff woz ere")
    // click 'Submit'
    sel.qxClick('qx.ui.form.Button.100')

    // "Some settings"
    sel.qxClick('qx.ui.form.CheckBox.108')
    sel.qxClick('qx.ui.form.CheckBox.111')
    //sel.qxClick('qx.ui.form.InputCheckSymbol.113')

    // "Network speed"
    sel.qxClick('qx.ui.form.RadioButton.120')
    sel.qxClick('qx.ui.form.RadioButton.123')
    sel.qxClick('qx.ui.form.RadioButton.126')
    sel.qxClick('qx.ui.form.RadioButton.120')
    sel.qxClick('qx.ui.form.RadioButton.123')
    sel.qxClick('qx.ui.form.RadioButton.126')
    //sel.qxClick('qx.ui.form.InputCheckSymbol.125')
  }

  if (takeScreenshots) 
  {
    sel.captureScreenshot(shotsDir+"/s1.png", geometry);
  }

} // Form()

function Tooltip (sel) 
{
  sel.qxClick(noAutoIds ? '//div[text()="Tooltip"]' : 'qx.ui.pageview.buttonview.Button.8')

  // doesn't work !? - supply coordinates?! 'mouseOverAt'?!
  sel.mouseOver(noAutoIds ?
                '//img[contains(@src,"system-run.png")]' :
                'qx.ui.basic.Atom.130');
  sel.mouseOver(noAutoIds ?
                '//img[contains(@src,"accessories-archiver.png")]' :
                'qx.ui.basic.Atom.136');
  sel.mouseOver(noAutoIds ?
                '//img[contains(@src,"accessories-disk-usage.png")]' :
                'qx.ui.basic.Atom.143');
  if (takeScreenshots) 
  {
    sel.captureScreenshot(shotsDir+"/s2.png", geometry);
  }
} // Tooltip()

function Menu_and_Toolbar (sel)
{
  sel.qxClick(noAutoIds ?
                '//div[text()="Menu and Toolbar"]' :
                'qx.ui.pageview.buttonview.Button.12')

  // walk through menus - one to open, one to close
  sel.qxClick(noAutoIds ?
                '//div[text()="File"]' :
                'qx.ui.toolbar.MenuButton.463')
  sel.qxClick(noAutoIds ?
                '//div[text()="File"]' :
                'qx.ui.toolbar.MenuButton.463')
  sel.qxClick(noAutoIds ?
                '//div[text()="Edit"]' :
                'qx.ui.toolbar.MenuButton.465')
  sel.qxClick(noAutoIds ?
                '//div[text()="Edit"]' :
                'qx.ui.toolbar.MenuButton.465')
  sel.qxClick(noAutoIds ?
                '//div[text()="View"]' :
                'qx.ui.toolbar.MenuButton.467')
  sel.qxClick(noAutoIds ?
                '//div[text()="View"]' :
                'qx.ui.toolbar.MenuButton.467')
  sel.qxClick(noAutoIds ?
                '//div[text()="Options"]' :
                'qx.ui.toolbar.MenuButton.469')
  sel.qxClick(noAutoIds ?
                '//div[text()="Options"]' :
                'qx.ui.toolbar.MenuButton.469')
  sel.qxClick(noAutoIds ?
                '//div[text()="Help"]' :
                'qx.ui.toolbar.MenuButton.471')
  sel.qxClick(noAutoIds ?
                '//div[text()="Help"]' :
                'qx.ui.toolbar.MenuButton.471')

  // click toolbar
  var ospeed = sel.getSpeed();
  sel.setSpeed("250");
  sel.mouseDown(noAutoIds ?
                '//div[text()="New"]' :
                'qx.ui.toolbar.Button.477')
  sel.mouseUp(noAutoIds ?
                '//div[text()="New"]' :
                'qx.ui.toolbar.Button.477')
  sel.mouseDown(noAutoIds ?
                '//div[text()="Copy"]' :
                'qx.ui.toolbar.Button.482')
  sel.mouseUp(noAutoIds ?
                '//div[text()="Copy"]' :
                'qx.ui.toolbar.Button.482')
  sel.mouseDown(noAutoIds ?
                '//div[text()="Cut"]' :
                'qx.ui.toolbar.Button.485')
  sel.mouseUp(noAutoIds ?
                '//div[text()="Cut"]' :
                'qx.ui.toolbar.Button.485')
  sel.mouseDown(noAutoIds ?
                '//div[text()="Paste"]' :
                'qx.ui.toolbar.Button.488')
  sel.mouseUp(noAutoIds ?
                '//div[text()="Paste"]' :
                'qx.ui.toolbar.Button.488')
  //sel.setSpeed(ospeed);  // dysfunct - getSpeed() returns undef
  sel.setSpeed(stepSpeed);

  sel.mouseUp(noAutoIds ?
                '//img[contains(@src,"edit-add.png")]' :
                'qx.ui.toolbar.CheckBox.494');
  sel.qxClick(noAutoIds ?
                '//div[text()="Radio1"]' :
                'qx.ui.toolbar.RadioButton.500')
  sel.qxClick(noAutoIds ?
                '//div[text()="Radio2"]' :
                'qx.ui.toolbar.RadioButton.503')
  sel.qxClick(noAutoIds ?
                '//div[text()="Radio3"]' :
                'qx.ui.toolbar.RadioButton.506')

  // go through radios
  sel.qxClick(noAutoIds ?
                '//div[text()="Show Icons"]' :
                'qx.ui.form.RadioButton.514')
  sel.qxClick(noAutoIds ?
                '//div[text()="Show Label"]' :
                'qx.ui.form.RadioButton.517')
  sel.qxClick(noAutoIds ?
                '//div[text()="Show Icons and Label"]' :
                'qx.ui.form.RadioButton.511')

  sel.qxClick(noAutoIds ?
                '//div[text()="Centered"]' :
                'qx.ui.form.RadioButton.524')
  sel.qxClick(noAutoIds ?
                '//div[text()="Right Aligned"]' :
                'qx.ui.form.RadioButton.527')
  sel.qxClick(noAutoIds ?
                '//div[text()="Left Aligned"]' :
                'qx.ui.form.RadioButton.521')

  sel.qxClick(noAutoIds ?
                '//div[text()="Icons: 32 Pixel"]' :
                'qx.ui.form.Button.534')
  sel.qxClick(noAutoIds ?
                '//div[text()="Icons: 22 Pixel"]' :
                'qx.ui.form.Button.531')
  if (takeScreenshots) 
  {
    sel.captureScreenshot(shotsDir+"/s3.png", geometry);
  }
} // Menu_and_Toolbar()


function Tab (sel) 
{
  sel.qxClick(noAutoIds ?
                '//div[text()="Tab"]' :
                'qx.ui.pageview.buttonview.Button.16')

  // left pane
  sel.qxClick(noAutoIds ?
                '//div[text()="Find"]' :
                'qx.ui.pageview.tabview.Button.543')
  sel.qxClick(noAutoIds ?
                '//div[text()="Backup"]' :
                'qx.ui.pageview.tabview.Button.545')
  //sel.qxClick('//div[text()="Edit"]');  // this finds the 'Edit' menu from Menu_and_Toolbar :-)
  sel.qxClick(noAutoIds ?
                'qxh=*/[@label="Tab"]/[@page]/*/[@label="Edit"]' :
                'qx.ui.pageview.tabview.Button.541');

  sel.qxClick(noAutoIds ?
                '//div[text()="Place bar on top"]' :
                'qx.ui.form.CheckBox.552')
  sel.qxClick(noAutoIds ?
                '//div[text()="Align tabs to left"]' :
                'qx.ui.form.CheckBox.555')
  sel.qxClick(noAutoIds ?
                '//div[text()="Place bar on top"]' :
                'qx.ui.form.CheckBox.552')
  sel.qxClick(noAutoIds ?
                '//div[text()="Align tabs to left"]' :
                'qx.ui.form.CheckBox.555')

  // right pane
  sel.qxClick(noAutoIds ?
                '//div[text()="Colorize"]' :
                'qx.ui.pageview.buttonview.Button.591')
  sel.qxClick(noAutoIds ?
                '//div[text()="Icons"]' :
                'qx.ui.pageview.buttonview.Button.594')
  sel.qxClick(noAutoIds ?
                '//div[text()="Applications"]' :
                'qx.ui.pageview.buttonview.Button.597')
  sel.qxClick(noAutoIds ?
                '//div[text()="System"]' :
                'qx.ui.pageview.buttonview.Button.600')
  sel.qxClick(noAutoIds ?
                '//div[text()="Display"]' :
                'qx.ui.pageview.buttonview.Button.588')

  sel.qxClick(noAutoIds ?
                '//div[text()="Top"]' :
                'qx.ui.form.RadioButton.613')
  sel.qxClick(noAutoIds ?
                '//div[text()="Right"]' :
                'qx.ui.form.RadioButton.616')
  sel.qxClick(noAutoIds ?
                '//div[text()="Bottom"]' :
                'qx.ui.form.RadioButton.619')
  sel.qxClick(noAutoIds ?
                '//div[text()="Left"]' :
                'qx.ui.form.RadioButton.622')
  
  if (takeScreenshots) 
  {
    sel.captureScreenshot(shotsDir+"/s4.png", geometry);
  }
} // Tab()


function Tree (sel) 
{
  sel.qxClick('//div[text()="Tree"]')

  /* these next ones are strange: easily (and correctly) found with XPather, they show
     no reaction on qxClick *when the folder is closed*! If the folder is open, they
     work perfectly!? Therefore, the more complex XPaths further down (using id's).
  sel.qxClick('//div[text()="Desktop"]')
  sel.qxClick('//div[text()="Workspace"]')
  sel.qxClick('//div[text()="Inbox"]')
  */
  sel.qxClick(noAutoIds ?
                '//img[contains(@src,"cross_plus.gif")]' :
                '//*[@id="qx.ui.tree.TreeFolder.636"]//*[text()="Desktop"]')
  sel.qxClick(noAutoIds ?
                '//img[contains(@src,"cross_plus.gif")]' :
                '//*[@id="qx.ui.tree.TreeFolder.644"]//*[text()="Workspace"]')
  //sel.qxClick('//img[@src="./resource/qx/widget/Windows/tree/cross_plus.gif"]'); // not working because of context node?!
  if (!noAutoIds)
  {
    sel.qxClick('//*[@id="qx.ui.tree.TreeFolder.668"]//*[text()="Inbox"]');
    // i could just as well click on the descendant ('cross_plus') image (which
    // is mandatory for *closing* the folder); but clicking the label allows me (a)
    // to have a more readable locator (says what i'm after), and (b) the value of
    // the read-only "Current Folder" field is updated!
  }

  sel.qxClick('//div[text()="Use tree lines?"]')
  sel.qxClick('//div[text()="Use tree lines?"]')

  if (takeScreenshots) 
  {
    sel.captureScreenshot(shotsDir+"/s5.png", geometry);
  }
  
} // Tree()


function List (sel) 
{
  sel.qxClick('//div[text()="List"]');

  sel.qxClick('//div[text()="Item No 4"]');
  sel.qxClick('//div[text()="Item No 7"]');
  sel.qxClick('//div[text()="Item No 4"]',"shiftKey=true");
  sel.qxClick('//div[text()="Item No 6"]',"ctrlKey=true");

  sel.qxClick('//div[text()="Show Label"]');
  sel.qxClick('//div[text()="Show Icon"]');
  sel.qxClick('//div[text()="Show Both"]');
  
  if (takeScreenshots) 
  {
    sel.captureScreenshot(shotsDir+"/s6.png", geometry);
  }
} // List()


function ListView (sel) 
{
  sel.qxClick('//div[text()="ListView"]')

  // nothing works here
  sel.qxClick('//div[text()="E-Mail 3"]');
  sel.qxClick('//div[text()="E-Mail 9"]', "shiftKey=true");
  sel.qxClick('//div[text()="E-Mail 6"]', "ctrlKey=true");
  
  if (takeScreenshots) 
  {
    sel.captureScreenshot(shotsDir+"/s7.png", geometry);
  }
} // ListView()


function Table (sel) 
{
  sel.qxClick('//div[text()="Table"]')

  // selections not working
  sel.qxClick('//div[text()="3"]');
  sel.qxClick('//div[text()="9"]', "shiftKey=true");
  sel.qxClick('//div[text()="6"]', "ctrlKey=true");

  // sort by a column
  sel.qxClick('//div[text()="A number"]');
  sel.qxClick('//div[text()="A number"]');
  
  if (takeScreenshots) 
  {
    sel.captureScreenshot(shotsDir+"/s8.png", geometry);
  }
} // Table()


function SplitPane (sel) 
{
  sel.qxClick('//div[text()="SplitPane"]')

  sel.qxClick('//div[text()="Ajaxian"]')
  //sel.waitForFrameToLoad("http://www.ajaxian.com", "20000");
  Packages.java.lang.Thread.sleep(5000);
  sel.qxClick('//div[text()="Mozilla Developer News"]')
  //sel.waitForPageToLoad(20000);
  Packages.java.lang.Thread.sleep(2000);

  sel.dragAndDrop(noAutoIds ?
                    // should work in both browsers, but very slow:
                    //'qxh=*/qx.ui.splitpane.SplitPaneKnob' :
                    // doesn't work in IE:
                    '//img[contains(@src,"knob-horizontal.png") or contains(@style,"knob-horizontal.png")]':
                    '//div[@id="qx.ui.splitpane.SplitPaneKnob.1326"]',
                  "+100,+0" );
  sel.dragAndDrop(noAutoIds ?
                    //'qxh=*/qx.ui.splitpane.SplitPaneKnob' :
                    '//img[contains(@src,"knob-horizontal.png") or contains(@style,"knob-horizontal.png")]':
                    '//div[@id="qx.ui.splitpane.SplitPaneKnob.1326"]',
                  "-150,+0" );

  
  if (takeScreenshots) 
  {
    sel.captureScreenshot(shotsDir+"/s9.png", geometry);
  }
} // SplitPane()


function Localization (sel) 
{
  sel.qxClick('//div[text()="Localization"]')
  
  // Localized ComboBox
  sel.qxClick(noAutoIds ?
                '//div[text()="Localized ComboBox:"]/following-sibling::div/descendant::img[contains(@src,"down.gif")]' :
                'qx.ui.basic.Atom.1372');
  //sel.qxClick('//div[text()="Localized ComboBox:"]/following-sibling::div/descendant::div[text()="Copy"]');
  sel.qxClick('//div[text()="Paste"]');

  // Command Menu
  sel.qxClick('//div[starts-with(text(),"Command Menu")]');

  // Date chooser
  sel.qxClick('//img[contains(@src,"accessories-date.png")]');
  sel.qxClick('//div[text()="Choose a date"]/../following-sibling::div/descendant::div[text()="15"]');
  sel.doubleClick('//div[text()="Choose a date"]/../following-sibling::div/descendant::div[text()="15"]');

  // Choose a locale
  sel.qxClick('//div[starts-with(text(),"Choose")]/following-sibling::div/descendant::img[contains(@src,"down.gif")]');
  sel.qxClick('//div[text()="de"]');

  // Re-open Command Menu
  sel.qxClick('//div[starts-with(text(),"Command-Men")]');

  if (takeScreenshots) 
  {
    sel.captureScreenshot(shotsDir+"/s10.png", geometry);
  }
} // Localization()


function Native_Window (sel)
{
  sel.qxClick('//div[text()="Native Window"]')

  sel.qxClick('//div[text()="Open Native Window"]');
  sel.selectWindow(null); // re-gain focus from spawned window
  sel.type('//div[text()="Runtime Settings"]/../preceding-sibling::div/descendant::input','http://www.google.com');

  // click to update url - doesn't work
  sel.qxClick('//div[text()="Runtime Settings"]/../preceding-sibling::div/descendant::div[text()="Set Url"]');
  //sel.qxClick('//div[text()="Runtime Settings"]/../preceding-sibling::div/descendant::img[@src="./resource/qx/icon/Nuvola/16/actions/dialog-ok.png"]');

  // closing native window ??
  
} // Native_Window()


function Internal_Window (sel) 
{
  sel.qxClick('//div[text()="Internal Window"]');

  // First window
  sel.qxClick('//div[text()="First Window"]');
  sel.qxClick('//div[text()="Internet"]');
  sel.qxClick('//div[text()="Future"]');

  // Second window
  sel.qxClick('//div[text()="Second Window"]');
  sel.qxClick('//div[text()="Show Icon"]');
  sel.qxClick('//div[text()="Show Icon"]');
  sel.qxClick('//div[text()="Show Caption"]');
  sel.qxClick('//div[text()="Show Caption"]');
  sel.qxClick('//div[text()="Show Close"]');
  sel.qxClick('//div[text()="Show Close"]');
  sel.qxClick('//div[text()="Show Maximize/Restore"]');
  sel.qxClick('//div[text()="Show Maximize/Restore"]');
  sel.qxClick('//div[text()="Show Minimize"]');
  sel.qxClick('//div[text()="Show Minimize"]');

  sel.qxClick('//div[text()="Allow Close"]');
  sel.qxClick('//div[text()="Allow Close"]');
  sel.qxClick('//div[text()="Allow Maximize"]');
  sel.qxClick('//div[text()="Allow Maximize"]');
  sel.qxClick('//div[text()="Allow Minimize"]');
  sel.qxClick('//div[text()="Allow Minimize"]');
  
  sel.qxClick('//div[text()="Show Statusbar"]');
  sel.qxClick('//div[text()="Show Statusbar"]');

  // DragDrop doesn't work reliably
  /*
  //sel.dragdrop('//div[@text()="Second Window"]',"+100,+50");
  //sel.dragdrop('//div[@text()="Second Window"]',"-100,-50");
  sel.dragdrop('//img[@src="./resource/qx/icon/Nuvola/16/actions/format-color.png"]',"+100,+50");
  sel.dragdrop('//img[@src="./resource/qx/icon/Nuvola/16/actions/format-color.png"]',"-100,-50");
  */
  /*
  sel.qxClick('//div[text()="Frame"]');
  sel.dragdrop('//div[@text()="Second Window"]',"+100,+50");
  sel.dragdrop('//div[@text()="Second Window"]',"-100,-50");
  sel.qxClick('//div[text()="Translucent"]');
  sel.dragdrop('//div[@text()="Second Window"]',"+100,+50");
  sel.dragdrop('//div[@text()="Second Window"]',"-100,-50");
  */

  // Third window
  sel.qxClick('//div[text()="Third Window"]');
  //sel.qxClick('//div[text()="Open Modal Dialog 1"]'); // doesn't work
  sel.qxClick('//div[text()="Open Modal Dialog 1"]/preceding-sibling::div/img[contains(@src,"edit-find.png")]'); // trick: look for the button text, but then click the image
  sel.qxClick('//div[text()="First Modal Dialog"]/following-sibling::div/descendant::img[contains(@src,"close.gif")]');

  if (takeScreenshots) 
  {
    sel.captureScreenshot(shotsDir+"/s11.png", geometry);
  }
} // Internal_Window()


function Themes (sel) 
{
  sel.qxClick('//div[text()="Themes"]');

  // Theming Window
  sel.qxClick('//div[text()="Open theming window"]/preceding-sibling::div/img[contains(@src,"edit-find.png")]'); // clicking text() alone is not working
  sel.qxClick('//div[text()="Theme: Ext"]/preceding-sibling::div/img[contains(@src,"dialog-ok.png")]');
  Packages.java.lang.Thread.sleep(2000);
  
  if (takeScreenshots) 
  {
    sel.captureScreenshot(shotsDir+"/s12.png", geometry);
  }
} // Themes()

function prepareScreenshots(sel) 
{
  sel.getViewport();
  print("Click in the test window within 5secs!");
  sel.waitForCondition("storedVars['ViewportStr']", 5000);
  geometry = sel.getEval("storedVars['ViewportStr']");
  //sel.geometry = geom; // !cannot extend a Java object!
}

// - Main --------------------------------------------------------------------

var sel = new QxSelenium(selServer,selPort,testBrowser,autHost);

// not possible to re-use existing sessionId, therefor
//if (arguments.length < 1) 
if (true)
{
  sel.start();
  sel.open(autHost + autPath);
} else 
{
  // not possible with Java bindings (sessionId private to sel.CommandProcessor(is 
  // HttpCommandProcessor)
  sel.sessionId = arguments[0]
  useRunningSession = true;
}

Packages.java.lang.Thread.sleep(2000);
var doTests = true;

sel.setSpeed(stepSpeed);

if (takeScreenshots) 
{
  prepareScreenshots(sel);
}

while (doTests)
{
  // go throught the Showcase tabs and test
  /*
  */
  Form(sel);
  Tooltip(sel);
  Menu_and_Toolbar(sel);
  Tab(sel);
  Tree(sel);
  List(sel);
  ListView(sel);
  Table(sel);
  SplitPane(sel);
  Localization(sel);
  Native_Window(sel);
  Internal_Window(sel);
  Themes(sel);
  /*
  */
  Packages.java.lang.Thread.sleep(3000);

  if (cycleTests)
  {
    sel.refresh();
  } else 
  {
    doTests = false;
  }
}

// stop self-started session
//if (! useRunningSession) 
if (closeBrowser)
{
  sel.stop()
}

