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
//var autHost = "http://demo.qooxdoo.org";
var autHost = "http://localhost";
//var autPath = "/0.7.2/showcase/index.html";
var autPath = "/~thron7/.workspace/packages/qooxdoo-0.7.3-pre-sdk/frontend/application/showcase/source/index.html";
var useRunningSession = false;
var closeBrowser = false;
var cycleTests = false;
var stepSpeed  = "1000"; // millisecs after each command
var noAutoIds  = false;
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
} // Menu_and_Toolbar()


function Tab (sel) 
{
  sel.qxClick('//div[text()="Tab"]')

  // left pane
  sel.qxClick('//div[text()="Find"]')
  sel.qxClick('//div[text()="Backup"]')
  //sel.qxClick('//div[text()="Edit"]');  // this finds the 'Edit' menu from Menu_and_Toolbar :-)
  sel.qxClick('qxh=*/[@label="Tab"]/[@page]/*/[@label="Edit"]');

  sel.qxClick('//div[text()="Place bar on top"]')
  sel.qxClick('//div[text()="Align tabs to left"]')
  sel.qxClick('//div[text()="Place bar on top"]')
  sel.qxClick('//div[text()="Align tabs to left"]')

  // right pane
  sel.qxClick('//div[text()="Colorize"]')
  sel.qxClick('//div[text()="Icons"]')
  sel.qxClick('//div[text()="Applications"]')
  sel.qxClick('//div[text()="System"]')
  sel.qxClick('//div[text()="Display"]')

  sel.qxClick('//div[text()="Top"]')
  sel.qxClick('//div[text()="Right"]')
  sel.qxClick('//div[text()="Bottom"]')
  sel.qxClick('//div[text()="Left"]')
  
} // Tab()


function Tree (sel) 
{
  sel.qxClick('//div[text()="Tree"]')

  /*
  sel.qxClick('//div[text()="Desktop"]')
  sel.qxClick('//div[text()="Workspace"]')
  sel.qxClick('//div[text()="Inbox"]')
  */
  sel.qxClick('//img[contains(@src,"cross_plus.gif")]')
  sel.qxClick('//img[contains(@src,"cross_plus.gif")]')
  //sel.qxClick('//img[@src="./resource/qx/widget/Windows/tree/cross_plus.gif"]'); // not working because of context node?!

  sel.qxClick('//div[text()="Use tree lines?"]')
  sel.qxClick('//div[text()="Use tree lines?"]')
  
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
  
} // List()


function ListView (sel) 
{
  sel.qxClick('//div[text()="ListView"]')

  // nothing works here
  sel.qxClick('//div[text()="E-Mail 3"]');
  sel.qxClick('//div[text()="E-Mail 9"]', "shiftKey=true");
  sel.qxClick('//div[text()="E-Mail 6"]', "ctrlKey=true");
  
} // ListView()


function Table (sel) 
{
  sel.qxClick('//div[text()="Table"]')

  // selections not working
  sel.qxClick('//div[text()="3"]');
  sel.qxClick('//div[text()="9"]', "shiftKey=true");
  sel.qxClick('//div[text()="6"]', "ctrlKey=true");

  sel.qxClick('//div[text()="A number"]');
  sel.qxClick('//div[text()="A number"]');
  
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

  sel.dragAndDrop('//img[contains(@src,"knob-horizontal.png")]',"+100,+0");
  sel.dragAndDrop('//img[contains(@src,"knob-horizontal.png")]',"-150,+0");

  
} // SplitPane()


function Localization (sel) 
{
  sel.qxClick('//div[text()="Localization"]')
  
  // Localized ComboBox
  sel.qxClick('//div[text()="Localized ComboBox:"]/following-sibling::div/descendant::img[contains(@src,"down.gif")]');
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

} // Internal_Window()


function Themes (sel) 
{
  sel.qxClick('//div[text()="Themes"]');

  // Theming Window
  sel.qxClick('//div[text()="Open theming window"]/preceding-sibling::div/img[contains(@src,"edit-find.png")]'); // clicking text() alone is not working
  sel.qxClick('//div[text()="Theme: Ext"]/preceding-sibling::div/img[contains(@src,"dialog-ok.png")]');
  Packages.java.lang.Thread.sleep(2000);
  
} // Themes()

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

while (doTests)
{
  // go throught the Showcase tabs and test
  /*
  */
  Form(sel);
  Tooltip(sel);
  Menu_and_Toolbar(sel);
  /*
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

