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
var sel = new QxSelenium("localhost",4444,"*firefox","http://demo.qooxdoo.org");
var useRunningSession = false;
var closeBrowser = false;
var cycleTests = false;
var stepSpeed  = "1000"; // millisecs after each command
// - Config End ----------------------------------------------------------------


function Form (sel)
{
  sel.qxClick('//div[text()="Form"]')
  
  // fill 'Name' field
  sel.type('//input[@type="text"]', "Rampano Zampano")

  // increase spinner
  sel.qxClick('//img[@src="./resource/qx/widget/Windows/arrows/up_small.gif"]')
  sel.qxClick('//img[@src="./resource/qx/widget/Windows/arrows/up_small.gif"]')
  sel.qxClick('//img[@src="./resource/qx/widget/Windows/arrows/up_small.gif"]')
  sel.qxClick('//img[@src="./resource/qx/widget/Windows/arrows/up_small.gif"]')

  // select 'Network' from combo
  sel.qxClick('//img[@src="./resource/qx/widget/Windows/arrows/down.gif"]')
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

} // Form()

function Tooltip (sel) 
{
  sel.qxClick('//div[text()="Tooltip"]')

  // doesn't work !?
  sel.mouseOver('//img[@src="./resource/qx/icon/Nuvola/32/actions/system-run.png"]');
  sel.mouseOver('//img[@src="./resource/qx/icon/Nuvola/32/apps/accessories-archiver.png"]');
  sel.mouseOver('//img[@src="./resource/qx/icon/Nuvola/32/apps/accessories-disk-usage.png"]');
} // Tooltip()

function Menu_and_Toolbar (sel)
{
  sel.qxClick('//div[text()="Menu and Toolbar"]')

  // walk through menus - one to open, one to close
  sel.qxClick('//div[text()="File"]')
  sel.qxClick('//div[text()="File"]')
  sel.qxClick('//div[text()="Edit"]')
  sel.qxClick('//div[text()="Edit"]')
  sel.qxClick('//div[text()="View"]')
  sel.qxClick('//div[text()="View"]')
  sel.qxClick('//div[text()="Options"]')
  sel.qxClick('//div[text()="Options"]')
  sel.qxClick('//div[text()="Help"]')
  sel.qxClick('//div[text()="Help"]')

  // click toolbar
  var ospeed = sel.getSpeed();
  sel.setSpeed("250");
  sel.mouseDown('//div[text()="New"]')
  sel.mouseUp('//div[text()="New"]')
  sel.mouseDown('//div[text()="Copy"]')
  sel.mouseUp('//div[text()="Copy"]')
  sel.mouseDown('//div[text()="Cut"]')
  sel.mouseUp('//div[text()="Cut"]')
  sel.mouseDown('//div[text()="Paste"]')
  sel.mouseUp('//div[text()="Paste"]')
  //sel.setSpeed(ospeed);  // dysfunct - getSpeed() returns undef
  sel.setSpeed(stepSpeed);

  sel.mouseUp('//img[@src="./resource/qx/icon/Nuvola/22/actions/edit-add.png"]');
  sel.qxClick('//div[text()="Radio1"]')
  sel.qxClick('//div[text()="Radio2"]')
  sel.qxClick('//div[text()="Radio3"]')

  // go through radios
  sel.qxClick('//div[text()="Show Icons"]')
  sel.qxClick('//div[text()="Show Label"]')
  sel.qxClick('//div[text()="Show Icons and Label"]')

  sel.qxClick('//div[text()="Centered"]')
  sel.qxClick('//div[text()="Right Aligned"]')
  sel.qxClick('//div[text()="Left Aligned"]')

  sel.qxClick('//div[text()="Icons: 32 Pixel"]')
  sel.qxClick('//div[text()="Icons: 22 Pixel"]')
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
  sel.qxClick('//img[@src="./resource/qx/widget/Windows/tree/cross_plus.gif"]')
  sel.qxClick('//img[@src="./resource/qx/widget/Windows/tree/cross_plus.gif"]')
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

  sel.dragdrop('//img[@src="./resource/qx/widget/Windows/splitpane/knob-horizontal.png"]',"+100,+0");
  sel.dragdrop('//img[@src="./resource/qx/widget/Windows/splitpane/knob-horizontal.png"]',"-150,+0");

  
} // SplitPane()


function Localization (sel) 
{
  sel.qxClick('//div[text()="Localization"]')
  
  // Localized ComboBox
  sel.qxClick('//div[text()="Localized ComboBox:"]/following-sibling::div/descendant::img[@src="./resource/qx/widget/Windows/arrows/down.gif"]');
  //sel.qxClick('//div[text()="Localized ComboBox:"]/following-sibling::div/descendant::div[text()="Copy"]');
  sel.qxClick('//div[text()="Paste"]');

  // Command Menu
  sel.qxClick('//div[starts-with(text(),"Command Menu")]');

  // Date chooser
  sel.qxClick('//img[@src="./resource/qx/icon/Nuvola/16/apps/accessories-date.png"]');
  sel.qxClick('//div[text()="Choose a date"]/../following-sibling::div/descendant::div[text()="15"]');
  sel.doubleClick('//div[text()="Choose a date"]/../following-sibling::div/descendant::div[text()="15"]');

  // Choose a locale
  sel.qxClick('//div[starts-with(text(),"Choose")]/following-sibling::div/descendant::img[@src="./resource/qx/widget/Windows/arrows/down.gif"]');
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
  sel.qxClick('//div[text()="Open Modal Dialog 1"]/preceding-sibling::div/img[@src="./resource/qx/icon/Nuvola/16/actions/edit-find.png"]'); // trick: look for the button text, but then click the image
  sel.qxClick('//div[text()="First Modal Dialog"]/following-sibling::div/descendant::img[@src="./resource/qx/widget/Windows/window/close.gif"]');

} // Internal_Window()


function Themes (sel) 
{
  sel.qxClick('//div[text()="Themes"]');

  // Theming Window
  sel.qxClick('//div[text()="Open theming window"]/preceding-sibling::div/img[@src="./resource/qx/icon/Nuvola/16/actions/edit-find.png"]'); // clicking text() alone is not working
  sel.qxClick('//div[text()="Theme: Ext"]/preceding-sibling::div/img[@src="./resource/qx/icon/Nuvola/16/actions/dialog-ok.png"]');
  Packages.java.lang.Thread.sleep(2000);
  
} // Themes()

// - Main --------------------------------------------------------------------

// not possible to re-use existing sessionId, therefor
//if (arguments.length < 1) 
if (true)
{
  sel.start();
  //sel.open("http://localhost/~thron7/qooxdoo.div/themen/selenium/showcase/build/");
  sel.open("http://demo.qooxdoo.org/0.7.2/showcase/index.html");
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
  Form(sel);
  Tooltip(sel);
  Menu_and_Toolbar(sel);
  */
  Tab(sel);
  /*
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

