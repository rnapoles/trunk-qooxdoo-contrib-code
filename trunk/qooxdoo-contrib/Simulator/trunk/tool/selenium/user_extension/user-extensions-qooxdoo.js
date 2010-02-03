/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006-2009 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Robert Zimmermann (rz)
     * Thomas Herchenroeder (thron7)
     * Daniel Wagner (d_wagner)

************************************************************************ */

/**
 * Selenium Extension for testing applications built with qooxdoo
 *   see http://qooxdoo.org
 *
 * This extension covers the following commands to test applications built with qooxdoo:
 *  1.) special click commands: "qxClick" and "qxClickAt"
 *  2.) special qooxdoo element locators "qx=" and "qxp="
 *
 * Supported Browsers:
 *  - Mozilla-Family
 *  - Internet Explorer
 *
 * qxClick and qxClickAt:
 *  Both commands fire "mousedown" followed by "mouseup", as qooxdoo mostly does
 *  not listen for "click".  Additionally these commands provide the possibility
 *  to customize mouse-events, to do eg. a right-click or
 *  click-with-shift-key-pressed, see below for details.
 * Example:
 * +----------+-----------------+------------------------------+
 * |qxClick   | <any locator>   | button=right, shiftKey=true  |
 * +----------+-----------------+------------------------------+
 *
 * qxClickAt also computes the X- and Y- coordinates of the target element.
 *
 * mouse-event-details (qxClick values):
 *  double: fire a "dblclick" event
 *   - posible values: true, false
 *   - default value : false
 *  button: the mouse-button to be pressed
 *   - possible values: left, right, middle
 *   - default value  : left
 *  clientX and clientY: coordinates where the click is donne
 *   - possible values: any positive integer
 *   - default value  : 0
 *  shiftKey, altKey, metaKey: additional modifier keys beeing pressed during click
 *   - possible values: true, false
 *   - default value  : false
 *
 * qxTableClick:
 *  This commands simulates clicking on a specific cell of a qooxdoo table.
 *  Supported options:
 *  row: the row number of the cell to be clicked
 *  col: the column number of the cell to be clicked
 *  button: the mouse-button to be pressed
 *   - possible values: left, right
 *   - default value  : left
 *  double: single or double click
 *   - possible values: true, false
 *   - default value  : left
 * Example:
 * +----------+-----------------------------+--------------------------+
 * |qxClick   | <locator finding a table>   | row=42,col=4,double=true |
 * +----------+-----------------------------+--------------------------+
 *
 * Special qooxdoo Locator:
 *  As qooxdoo HTML consists mainly of div-elements, it is mostly difficult to
 *  locate an distinct element with xpath (sometimes impossible).  If You have
 *  access to the source of the AUT build with qooxdoo You can supply UserData
 *  for the elements to interact with.
 *  "qxp=": Additional, combined Locator like qxp=myDialog/buttonOK//XPATH-descendant
 *
 * Example:
 *  customButton = new qx.ui.menu.MenuButton("Click Me", ...);
 *  customButton.setUserData("customButton", "place here anything You want, e.g. selenium");
 * Now this qooxdoo-button can be located (and clicked) like this:
 * +----------+-----------------+--+
 * |qxClick   | qx=customButton |  |
 * +----------+-----------------+--+
 * Note: The qooxdoo locator can be used with any selenium command, like
 * +----------+-----------------+--+
 * |mouseOver | qx=customButton |  |
 * +----------+-----------------+--+
 *
 * The locator can also be used hierarchically.
 * This is comfortable, if qooxdoo elements are reused in different locations.
 * Example:
 *  A OK-button is placed in a dialog box (and other dialog-boxes). And You
 *  don't want to give the same button different UserData as it is still an
 *  OK-button.  So apply an UserData for the dialog-box, e.g. "myDialog" and
 *  name the button "buttonOK" Now this button can be located with:
 *  qx=myDialog/buttonOK or e.g. qx=scndDialog/buttonOK
 *
 * dom-events reference: http://www.howtocreate.co.uk/tutorials/javascript/domevents
 *
 * EXTERNAL INTERFACES
 *  Each user extension for Selenium uses interfaces from the Selenium runtime
 *  environment, like the 'Selenium', 'PageBot', 'SeleniumError' and 'LOG' 
 *  objects, or the 'triggerEvent' and 'getClientXY' functions. For more 
 *  information, see the file 'user-extensions.js.sample' in the Selenium Core 
 *  distribution.
 *
 * Changed to work with selenium 0.8.3
 *
 * Based on the orginal Selenium user extension for qooxdoo (version: 0.3)
 * by Robert Zimmermann
 * 
 * getQxObjectFunction, qxTableClick and related methods contributed by Mr. 
 * Hericus
 * 
 * Original (qx 0.7) drag and drop code by Phaneesh Nagaraja
 */

// -- Config section ------------------------------------------------
var initGetViewportByHand = true;
// -- Config end ----------------------------------------------------

Selenium.prototype.qx = {};

// ***************************************************
// Handling of MouseEventParameters
// ***************************************************
/**
* Helper to parse a param-String and provide access to the parameters with default-value handling
*
* @param customParameters string with name1=value1, name2=value2 whitespace will be ignored/stripped
* @param isIEevent boolean if true treat buttons IE-like, false treat it like all other user-agents do
*/
Selenium.prototype.qx.MouseEventParameters = function (customParameters)
{
  this.customParameters = {};

  if (customParameters && customParameters !== "")
  {
    var paramPairs = customParameters.split(",");

    for (var i=0; i<paramPairs.length; i++)
    {
      var onePair = paramPairs[i];
      var nameAndValue = onePair.split("=");

      // rz: using String.trim from htmlutils.js of selenium to get rid of whitespace
      var name = new String(nameAndValue[0]).trim();
      var value = new String(nameAndValue[1]).trim();
      this.customParameters[name] = value;
    }
  }
};

Selenium.prototype.qx.MouseEventParameters.MOUSE_BUTTON_MAPPING_IE =
{
  "left"   : 1,
  "right"  : 2,
  "middle" : 4
};

Selenium.prototype.qx.MouseEventParameters.MOUSE_BUTTON_MAPPING_OTHER =
{
  "left"   : 0,
  "right"  : 2,
  "middle" : 1
};


/**
 * Returns the correct numeric mouse button identifier needed to create a mouse 
 * event in different browsers (IE vs. non-IE). 
 *
 * @type member
 * @param buttonName {String} The mouse button. One of "left", "right", "middle" 
 * @return {Integer} The numeric mouse button value
 */
Selenium.prototype.qx.MouseEventParameters.prototype.getButtonValue = function(buttonName)
{
  if (document.createEventObject)
  {
    LOG.debug("MouseEventParameters.prototype.getButtonValue - using IE Button-Mapping");
    return Selenium.prototype.qx.MouseEventParameters.MOUSE_BUTTON_MAPPING_IE[buttonName];
  }
  else
  {
    LOG.debug("MouseEventParameters.prototype.getButtonValue - using OTHER Button-Mapping");
    return Selenium.prototype.qx.MouseEventParameters.MOUSE_BUTTON_MAPPING_OTHER[buttonName];
  }
};


/**
 * Returns the value of a given parameter name if it's set.
 * If it's not set, the given default value is returned
 * 
 * Type conversion is done automatically for string, boolean and number
 * based on the type of the given default value.
 *
 * @type member
 * @param paramName {String} string name of the parameter to search for
 * @param defaultValue {var} <different types> default value to be returned, if no value is found
 *            the type is important, see documentation above for details
 * @return {var} The parameter value
 */
Selenium.prototype.qx.MouseEventParameters.prototype.getParamValue = function(paramName, defaultValue)
{
  if (this.customParameters[paramName])
  {
    if (paramName == "button")
    {
      // special handling for mousebutton values (IE and not IE)
      return this.getButtonValue(this.customParameters["button"]);
    }
    else
    {
      // return converted type according to type of default value
      if (typeof defaultValue == "string")
      {
        // string
        return this.customParameters[paramName];
      }

      var strValue = this.customParameters[paramName];

      if (typeof defaultValue == "boolean")
      {
        // boolean
        return strValue === "true" ? true : false;
      }

      if (typeof defaultValue == "number")
      {
        // number
        return parseInt(strValue);
      }
    }
  }
  else
  {
    // TODO: refactoring: resolve duplication
    if (paramName == "button")
    {
      // special handling for mousebutton values (IE and not IE)
      return this.getButtonValue(defaultValue);
    }
    else
    {
      return defaultValue;
    }
  }
};

// ***************************************************
// END: Handling of MouseEventParameters
// ***************************************************
/**
 * Creates a native mouse event, configures it and dispatches it on the given 
 * element.
 *
 * @type member
 * @param eventType {String} The name of the event to be created, e.g. "click", 
 * "mouseover", etc.
 * @param element {Element} The DOM element the event should be dispatched on
 * @param eventParamObject {MouseEventParameters} Parameter object
 * @return void
 */
Selenium.prototype.qx.triggerMouseEventQx = function (eventType, element, eventParamObject)
{
  if (!eventParamObject)
  {
    // this can only be if the internal call-chain is wrong
    LOG.error("triggerMouseEventQx: eventParamObject is essential");
    return;
  }

  // use custom event details or default value
  var button = eventParamObject.getParamValue("button", "left");
  var bubbles = eventParamObject.getParamValue("bubbles", true);
  var cancelable = eventParamObject.getParamValue("cancelable", true);
  var detail = eventParamObject.getParamValue("detail", 1);
  var screenX = eventParamObject.getParamValue("screenX", 0);
  var screenY = eventParamObject.getParamValue("screenY", 0);
  var clientX = eventParamObject.getParamValue("clientX", 0);
  var clientY = eventParamObject.getParamValue("clientY", 0);
  var ctrlKey = eventParamObject.getParamValue("ctrlKey", false);
  var shiftKey = eventParamObject.getParamValue("shiftKey", false);
  var altKey = eventParamObject.getParamValue("altKey", false);
  var metaKey = eventParamObject.getParamValue("metaKey", false);

  //    window     = null; //TODO: use correctly
  // for event dbugging
      LOG.debug(" * called triggerMouseEventQx, params:");
      LOG.debug("eventType=" + eventType);
      LOG.debug("element=" + element);
      LOG.debug("bubbles=" + bubbles);
      LOG.debug("cancelable=" + cancelable);
      LOG.debug("detail=" + detail);
      LOG.debug("screenX=" + screenX);
      LOG.debug("screenY=" + screenY);
      LOG.debug("clientX=" + clientX);
      LOG.debug("clientY=" + clientY);
      LOG.debug("ctrlKey=" + ctrlKey);
      LOG.debug("shiftKey=" + shiftKey);
      LOG.debug("altKey=" + altKey);
      LOG.debug("metaKey=" + metaKey);
      LOG.debug("button=" + button);
      LOG.debug(" * END triggerMouseEventQx, params:");
  //

  var evt = null;

  if (document.createEvent)
  {
    LOG.debug("triggerMouseEventQx: default-user-agent-path");
    evt = document.createEvent("MouseEvents");

    // rz: has to be "initMouseEvent" otherwise parameters like clientX won't be set
    evt.initMouseEvent(eventType, bubbles, cancelable, document.defaultView, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, null);
    element.dispatchEvent(evt);
  }
  else if (document.createEventObject)
  {
    LOG.debug("triggerMouseEventQx: IE-path");
    evt = element.ownerDocument.createEventObject();

    evt.detail = detail;
    evt.screenX = screenX;
    evt.screenY = screenY;
    evt.clientX = clientX;
    evt.clientY = clientY;
    evt.ctrlKey = ctrlKey;
    evt.altKey = altKey;
    evt.shiftKey = shiftKey;
    evt.metaKey = metaKey;
    evt.button = button;
    evt.relatedTarget = null;

    element.fireEvent('on' + eventType, evt);
  }
};


/**
 * Clicks on a qooxdoo-element.
 * mousedown, mouseup will be fired instead of only click (which is named execute in qooxdoo)
 * 
 * eventParams example: button=left|right|middle, clientX=300, shiftKey=true
 *             for a full list of properties see "function Selenium.prototype.qx.triggerMouseEventQx"
 *
 * @type member
 * @param locator {var} an element locator
 * @param eventParams {var} additional parameter for the mouse-event to set. e.g. clientX.
 *            if no eventParams are set, defaults will be: left-mousebutton, all keys false and all coordinates 0
 * @return {void} 
 */
Selenium.prototype.doQxClick = function(locator, eventParams)
{
  var element = this.page().findElement(locator);
  this.clickElementQx(element, eventParams);
};


Selenium.prototype.doQxExecute = function(locator, eventParams)
{
  var element = this.page().findElement(locator);
  if (element.qx_Widget && element.qx_Widget.execute)
  {
    element.qx_Widget.execute();
  } else
  {
    LOG.debug("qxExecute: Cannot invoke execute() on element: "+element);
  }
};


Selenium.prototype.doGetViewport = function(locator, eventParams)
{
  var docelem = this.page().findElement("dom=document"); // evtl. document.body
  //var win     = docelem.parentWindow? docelem.parentWindow : docelem.defaultView;
  var win     = selenium.browserbot.getCurrentWindow();

  // clear old geom string
  if (storedVars && storedVars['ViewportStr']) {
    delete storedVars['ViewportStr'];
  }
  
  // event handler to capture coordinates
  function eh(e)
  {
    // get coordinates
    var mouseX;
    var mouseY; // relat. mouse coords
    // this is from quirksmode.org
    if (e.pageX || e.pageY)
    {
      mouseX = e.pageX;
      mouseY = e.pageY;
      LOG.debug("pageX, pageY: "+mouseX+"'"+mouseY);
    } else if (e.clientX || e.clientY)
    {
      mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
      mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      LOG.debug("e.clientX,e.clientY,document.body.scrollLeft,document.documentElement.scrollLeft,document.body.scrollTop,document.documentElement.scrollTop:\n"+
                e.clientX+','+e.clientY+','+document.body.scrollLeft+','+document.documentElement.scrollLeft+','+document.body.scrollTop+','+document.documentElement.scrollTop);
    } else
    {
      mouseX = 0;
      mouseY = 0;
      LOG.debug("no X,Y coords from event object");
    }
    LOG.debug("e.screenX,e.screenY: "+e.screenX+','+e.screenY);
    var originX = e.screenX - mouseX;
    var originY = e.screenY - mouseY;
    width   = PageBot.prototype._getWinWidth(win);
    height  = PageBot.prototype._getWinHeight(win);
    var geom = width+'x'+height+'+'+originX+'+'+originY;
    LOG.info("Page geometry (WxH+X+Y): "+ geom);
    // write to var
    if (! storedVars)
    {
      storedVars = {};
    }
    storedVars['ViewportStr'] = geom;
    // de-register myself
    PageBot.prototype._removeEventListener(docelem, "click", eh);
  }

  // register handler
  PageBot.prototype._addEventListener(docelem, "click", eh);

  // fire a mouse event at 0,0
  if (initGetViewportByHand) {
    //alert("Please click anywhere in the document"); // destroys event handling!!!
  } else {
    // this is essentially useless since the resulting mouse event lacks screenX
    // and screenY coords
    this.doQxClickAt("dom=document", "clientX=0,clientY=0");  // 0,0
  }
  /*
  var eventParamObject = new Selenium.prototype.qx.MouseEventParameters();
  this.browserbot.triggerMouseEventQx("click", docelem,eventParamObject);
  */

};


/**
 * Clicks on a qooxdoo-element.
 * mousedown, mouseup will be fired instead of only click
 * additionaly to doQxClick the x-/y-coordinates of located element will be determined.
 * TODO: implement it like doFooAt, where additional coordinates will be added to the element-coords
 * 
 * eventParams example: button=left|right|middle, clientX=300, shiftKey=true
 *             for a full list of properties see "function Selenium.prototype.qx.triggerMouseEventQx"
 *
 * @type member
 * @param locator {var} an element locator
 * @param eventParams {var} additional parameter for the mouse-event to set. e.g. clientX.
 *            if no eventParams are set, defaults will be: left mousebutton, all keys false and all coordinates 0
 * @return {void} 
 */
Selenium.prototype.doQxClickAt = function(locator, eventParams)
{
  var element = this.page().findElement(locator);
  var coordsXY = getClientXY(element);
  LOG.debug("computed coords: X=" + coordsXY[0] + " Y=" + coordsXY[1]);

  // TODO: very dirty no checking, maybe refactoring needed to get doQxClick and doQxClickAt to work smoothly together.
  var newEventParamString = eventParams + ",clientX=" + coordsXY[0] + ",clientY=" + coordsXY[1];
  LOG.debug("newEventParamString=" + newEventParamString);
  this.clickElementQx(element, newEventParamString);
};


/**
 * Internal helper method used by qxClick and qxClickAt
 *
 * @type member
 * @param element {Element} DOM Element the click event should be dispatched to.  
 * @param eventParamString {String} Comma-separated list of additional event 
 * parameters
 * @return {void} 
 */
Selenium.prototype.clickElementQx = function(element, eventParamString)
{
  var additionalParamsForClick = new Selenium.prototype.qx.MouseEventParameters(eventParamString);    
  triggerEvent(element, 'focus', false);
  Selenium.prototype.qx.triggerMouseEventQx('mouseover', element, additionalParamsForClick);
  Selenium.prototype.qx.triggerMouseEventQx('mousedown', element, additionalParamsForClick);  
  Selenium.prototype.qx.triggerMouseEventQx('mouseup', element, additionalParamsForClick);
  if (additionalParamsForClick.getParamValue("button", "left") == 2) {
    Selenium.prototype.qx.triggerMouseEventQx('contextmenu', element, additionalParamsForClick);
  }
  else {
    if (additionalParamsForClick.getParamValue("double", false)) {
      Selenium.prototype.qx.triggerMouseEventQx('dblclick', element, additionalParamsForClick);
    }
    else {
      Selenium.prototype.qx.triggerMouseEventQx('click', element, additionalParamsForClick);
    }
  }
  
  // do not blur or mouseout as additional events won't be fired correctly
// FIXME: include original "click" functionality
};


/**
 * Check whether a qooxdoo Element is enabled or not
 *
 * @type member
 * @param locator {String} an element locator string
 * @return {Boolean} Whether the element is enabled
 * @throws TODOC
 */
Selenium.prototype.isQxEnabled = function(locator)
{
  LOG.debug("isQxEnabled: locator.substr(0,3)=" + locator.substr(0, 3));

  if (locator.substr(0, 2) === "qx")
  {
    var qxxLocator;

    if (locator.substr(0, 3) === "qx=") {
      qxxLocator = "qxx=" + locator.substr(3, locator.length - 1);
    } else if (locator.substr(0, 4) === "qxp=") {
      throw new SeleniumError("NotImplemented: isQxEnabled for qxp Locator not yet implemented.");
    } else {
      throw new SeleniumError("Error: Bad qooxdoo-Locator-Syntax for locator: " + locator);
    }

    LOG.debug("isQxEnabled: qxxLocator=" + qxxLocator);
    var qxObject = this.page().findElement(qxxLocator);
    if (qxObject) {
      return qxObject.getEnabled();
    } else {
      throw new SeleniumError("No such object: " + locator);
    }
  }
  else
  {
    throw new SeleniumError("Error: No qooxdoo-Locator given. This command only runs with qooxdoo-Locators");
  }
};


/** Returns the qx global object so that we can use qx functionality
 *
 */
Selenium.prototype.getQxGlobalObject = function () 
{
  if (this.page()._globalQxObject) {
    return this.page()._globalQxObject;
  } 
  else {
    var autWindow = this.browserbot.currentWindow;
    if (autWindow.wrappedJSObject) {
      autWindow = autWindow.wrappedJSObject;
    }
    this.page()._globalQxObject = autWindow.qx;
    return autWindow.qx;
  }
};


/**
 * Utility function to do {object instanceof qxclass} comparisons.
 * Since the qx. namespace is not directly available, we have to go through
 * some extra steps.
 * <p>
 * Use quotes around qxclass when you pass it in.
 *
 * @param object {Object} The object to check
 * @parame qxclass {String} The string name of the qx class type to compare against
 * @return returns true of object instanceof qxclass, false if not.
 */
Selenium.prototype.isQxInstanceOf = function (object, qxclass) {
  var qx = this.getQxGlobalObject();
  var myClass = qx.Class.getByName(qxclass);

  LOG.debug("isQxInstanceOf checking (" + object.classname + ") against class (" + qxclass + ")");
  try {
    if (object instanceof myClass) {
      return true;
    }
  } 
  catch (e) {
    if (object.classname === qxclass) {
      return true;
    }
  }
  return false;
};


/**
 * Uses the standard qx locators to find a table, and then returns a semicolon-
 * separated list of column IDs.
 *
 * @type member
 * @param locator {String} an element locator
 * @return {String} A list of column IDs
 */
Selenium.prototype.getQxTableColumnIds = function(locator)
{
  var qxObject = this.getQxWidgetByLocator(locator);
  
  if (qxObject) {
    if (!this.isQxInstanceOf(qxObject, "qx.ui.table.Table")) {
      throw new SeleniumError("Object is not an instance of qx.ui.table.Table: " + locator);
    }
  }
  else {
    throw new SeleniumError("No qooxdoo object found for locator: " + locator);
  }
  
  var columnIds = [];    
  var model = qxObject.getTableModel();
  var colCount = model.getColumnCount();
  for (var i=0; i<colCount; i++) {
    columnIds.push(model.getColumnId(i));
  }
  
  return columnIds.join(";");
};


/**
 * Uses the standard qx locators to find a table, and then returns the number of
 * rows from the table model.
 *
 * @type member
 * @param locator {var} an element locator
 * @return {var} The number of rows in the table.
 */
Selenium.prototype.getQxTableRows = function(locator)
{
  var qxObject = this.getQxWidgetByLocator(locator);
  
  if (qxObject) {
    if (!this.isQxInstanceOf(qxObject, "qx.ui.table.Table")) {
      throw new SeleniumError("Object is not an instance of qx.ui.table.Table: " + locator);
    }
  }
  else {
    throw new SeleniumError("No qooxdoo object found for locator: " + locator);
  }
  
  return String(qxObject.getTableModel().getRowCount());
};


/**
 * Uses the standard qx locators to find a table, and then returns the number of
 * columns from the table model.
 *
 * @type member
 * @param locator {var} an element locator
 * @return {var} The number of columns in the table.
 */
Selenium.prototype.getQxTableCols = function(locator)
{
  var qxObject = this.getQxWidgetByLocator(locator);
  
  if (qxObject) {
    if (!this.isQxInstanceOf(qxObject, "qx.ui.table.Table")) {
      throw new SeleniumError("Object is not an instance of qx.ui.table.Table: " + locator);
    }
  }
  else {
    throw new SeleniumError("No qooxdoo object found for locator: " + locator);
  }
  
  return String(qxObject.getTableModel().getColumnCount());
};


/**
 * Executes the given function of a qooxdoo object identified by a locator. If 
 * the object does not contain the referenced function, then an exception will 
 * be thrown.
 *
 * @type member
 * @param locator {var} an element locator
 * @param functionName {var} A text string that should identify the function to 
 * be executed.
 * @return {var} The return value from the function.
 */
Selenium.prototype.getQxObjectFunction = function(locator, functionName)
{
  var qxObject = this.getQxWidgetByLocator(locator);

  if (qxObject[functionName]) {
    return qxObject[functionName]();
  } 
  else {
    throw new SeleniumError("Object does not have function (" + functionName + "), " + locator);
  }  
};


/**
 * Uses the standard locators to find a qooxdoo widget and returns it.
 * 
 * @param locator {String} an element locator
 * @return {Object} The qooxdoo widget
 */
Selenium.prototype.getQxWidgetByLocator = function(locator)
{
  // Remove iframe qx object reference stored by previous locator
  this.page()._iframeQxObject = null;
  var element = this.page().findElement(locator);
  if (!element) {
    throw new SeleniumError("No such object: " + locator);
  }
  var qx = this.getQxGlobalObject();
  // If the locator crosses frame boundaries, use the target frame's qx
  if (this.page()._iframeQxObject) {
    qx = this.page()._iframeQxObject;
  }
  
  if (element.wrappedJSObject) {
    element = element.wrappedJSObject;
  }

  // this.page().findElement() returns the html element.
  var qxObject = qx.ui.core.Widget.getWidgetByElement( element );
  if (qxObject) {
    return qxObject;
  }
  else {
    throw new SeleniumError("Object is not a qooxdoo object: " + locator);
  }
};

/**
 * Uses the standard qx locators to find a table, and then returns the text
 * found in the cell at row, column position.
 *
 * @type member
 * @param locator {var} an element locator
 * @param eventParams {var} A text string that should contain "row=Y,col=X"
 * @return {var} The text found at the given table cell.
 */
Selenium.prototype.getQxTableValue = function(locator, eventParams)
{
  var qxObject = this.getQxWidgetByLocator(locator);
  
  if (qxObject) {
    if (!this.isQxInstanceOf(qxObject, "qx.ui.table.Table")) {
      throw new SeleniumError("Object is not an instance of qx.ui.table.Table: " + locator);
    }
  }
  else {
    throw new SeleniumError("No qooxdoo object found for locator: " + locator);
  }

  var additionalParamsForClick = {};
  if (eventParams && eventParams !== "") {
    var paramPairs = eventParams.split(",");

    for ( var i = 0; i < paramPairs.length; i++) {
      var onePair = paramPairs[i];
      var nameAndValue = onePair.split("=");

      // rz: using String.trim from htmlutils.js of selenium to get rid of
      // whitespace
      var name = new String(nameAndValue[0]).trim();
      var value = new String(nameAndValue[1]).trim();
      additionalParamsForClick[name] = value;
    }
  }
  var row = Number(additionalParamsForClick["row"]);
  var col = Number(additionalParamsForClick["col"]);
  LOG.debug("Targeting Row(" + row + ") Column(" + col + ")");

  return String(qxObject.getTableModel().getValue(col, row));
};

/**
 * Searches the given table for a column with the given name and returns the 
 * column index.
 * 
 * @param {qx.ui.table.Table} table The table to be searched
 * @param {String} name The column name to be searched for
 * @return {Integer|null} The found column index
 */
Selenium.prototype.getQxTableColumnIndexByName = function(table, name)
{
  var model = table.getTableModel();
  var colCount = model.getColumnCount();
  for (var i=0; i<colCount; i++) {
    var colName = model.getColumnName(i);
    if (colName == name) {
      return i;
    }
  }
  return null;
};


/**
 * Searches the table identified by the given locator for a column with the 
 * given name and returns the column index.
 * 
 * @param {String} A locator that returns the table to be searched
 * @param {String} name The column name to be searched for
 * @return {Integer|null} The found column index
 */
Selenium.prototype.getQxTableColumnIndexByNameLocator = function(locator, name)
{
  var table = this.getQxWidgetByLocator(locator);
  return this.getQxTableColumnIndexByName(table, name);
};


/**
 * Uses the standard qx locators to find a table, and then processes a click on 
 * the table at the given row/column position.  Note, your locator should only 
 * find the table itself, and not the clipper child of the table. We'll add the 
 * extra Composite/Scroller/Clipper to the locator as required.
 *
 * <p>
 * The column to click can be located using the index, ID or name by specifying 
 * one of the col, colId or colName parameters.
 * 
 * <p>
 * mousedown, mouseup will be fired instead of only click
 * in addition to to doQxClick the x-/y-coordinates of the located element will 
 * be determined.
 * TODO: implement it like doFooAt, where additional coordinates will be added 
 * to the element-coords
 * <p>
 * eventParams example: button=left|right|middle, clientX=300, shiftKey=true
 * for a full list of properties see "function 
 * Selenium.prototype.qx.triggerMouseEventQx"
 *
 * @type member
 * @param locator {var} an element locator
 * @param row {var} index of the table row to click
 * @param col {var} index of the table column to click
 * @param colId {var} ID of the column to click
 * @param colName {var} Name of the column to click
 * @param eventParams {var} additional parameter for the mouse-event to set. 
 * e.g. clientX.
 * If no eventParams are set, defaults will be: left mousebutton, all keys false
 * and all coordinates 0
 * @return {void}
 */
Selenium.prototype.doQxTableClick = function(locator, eventParams)
{
  var qxObject = this.getQxWidgetByLocator(locator);
  
  if (qxObject) {
    if (!this.isQxInstanceOf(qxObject, "qx.ui.table.Table")) {
      throw new SeleniumError("Object is not an instance of qx.ui.table.Table: " + locator);
    }
  }
  else {
    throw new SeleniumError("No qooxdoo object found for locator: " + locator);
  }

  // Now add the extra components to the locator to find the clipper itself.
  // This is the real object that we want to click on.
  
  var element = null;
  var subLocator = "qx.ui.container.Composite/qx.ui.table.pane.Scroller/qx.ui.table.pane.Clipper";
  if (locator.indexOf("qxh=") == 0) {
    var innerLocator = locator + "/" + subLocator;
    // Now add the extra components to the locator to find the header cell itself.
    // This is the real object that we want to click on.
    element = this.page().findElement(innerLocator);      
  }
  else {
    var qxhParts = subLocator.split('/');
    try {
      qxResultObject = this.page()._searchQxObjectByQxHierarchy(qxObject, qxhParts);
    } catch(ex) {
      throw new SeleniumError("qxTableHeaderClick couldn't find header cell widget: " + ex);
    }
    element = qxResultObject.getContentElement().getDomElement();
  }
  
  /* 
  element = this.page().findElement(locator + 
    "/qx.ui.container.Composite/qx.ui.table.pane.Scroller/qx.ui.table.pane.Clipper"
  );
  */
  
  if (!element) {
    throw new SeleniumError("Could not find clipper child of the table");
  }

  // Get the coordinates of the table:
  var coordsXY = getClientXY(element);
  LOG.debug("computed coords: X=" + coordsXY[0] + " Y=" + coordsXY[1]);

  var additionalParamsForClick = {};
  if (eventParams && eventParams !== "") {
    var paramPairs = eventParams.split(",");

    for (var i = 0; i < paramPairs.length; i++) {
      var onePair = paramPairs[i];
      var nameAndValue = onePair.split("=");

      // rz: using String.trim from htmlutils.js of selenium to get rid of
      // whitespace
      var name = new String(nameAndValue[0]).trim();
      var value = new String(nameAndValue[1]).trim();
      additionalParamsForClick[name] = value;
    }
  }
  
  var row = Number(additionalParamsForClick["row"]);
  var col = 0;
  if (additionalParamsForClick["col"]) {
    col = Number(additionalParamsForClick["col"]);
  } else if (additionalParamsForClick["colId"]) {
    // get column index by columnID
    var model = qxObject.getTableModel();
    col = Number(model.getColumnIndexById(additionalParamsForClick["colId"]));
    LOG.debug("Got column index " + col + " from colId");
  } else if (additionalParamsForClick["colName"]) {
    // get column index by columnName
    col = Number(this.getQxTableColumnIndexByName(qxObject, additionalParamsForClick["colName"]));
    LOG.debug("Got column index " + col + " from colName");
  } else {
    LOG.info("No column given, using column index 0.");
  }
  
  LOG.debug("Targeting Row(" + row + ") Column(" + col + ")");

  var doContextMenu = false;
  var doDoubleClick = false;
  if (additionalParamsForClick["button"] &&
      additionalParamsForClick["button"] === "right") {
    doContextMenu = true;
  }
  if (additionalParamsForClick["double"] &&
      additionalParamsForClick["double"] === "true" ) {
    doDoubleClick = true;
  }

  // Focus the table row/column so that it can receive the click events
  //qxObject.setFocusedCell(col, row, true);

  // Adjust our row number to match the rows that are currently visible:
  var first_row = qxObject.getPaneScroller(0).getTablePane().getFirstVisibleRow();
  var row_count = qxObject.getPaneScroller(0).getTablePane().getVisibleRowCount();
  LOG.debug("qxTable firstVisibleRow(" + first_row + "), visibleRowCount(" 
    + row_count + ")");

  // If our target row is below or beyond the set of rows visible, then scroll
  // it into view:
  if( row < first_row || row >= (first_row + row_count)) {
    qxObject.setFocusedCell(col, row, true); 
    // now it should be in the viewport
    first_row = qxObject.getPaneScroller(0).getTablePane().getFirstVisibleRow();
    row_count = qxObject.getPaneScroller(0).getTablePane().getVisibleRowCount();
    LOG.debug("qxTable firstVisibleRow(" + first_row + "), visibleRowCount(" 
      + row_count + ")");
  }

  // Adjust our "row" coordinate to be relative to the viewport:
  row = row - first_row;

  // Add in table height plus row height to get to the right row:
  LOG.debug("Table Header Height = " + qxObject.getHeaderCellHeight() );
  LOG.debug("Table Row Height = " + qxObject.getRowHeight() );
  coordsXY[1] = coordsXY[1] + ( row * qxObject.getRowHeight() );

  // Add in the column widths for each column:
  for (var i = 0; i < col; i++) {
    LOG.debug("Column (" + i + ") Width = (" 
      + qxObject.getTableColumnModel().getColumnWidth( i ) + ")" );
    coordsXY[0] = coordsXY[0] + 
      qxObject.getTableColumnModel().getColumnWidth( i );
  }

  LOG.debug("updated coords: X=" + coordsXY[0] + " Y=" + coordsXY[1]);
  coordsXY[0] = coordsXY[0] + 5;
  coordsXY[1] = coordsXY[1] + 5;
  LOG.debug("final coords: X=" + coordsXY[0] + " Y=" + coordsXY[1]);

  // TODO: very dirty no checking, maybe refactoring needed to get doQxClick
  // and doQxClickAt to work smoothly together.
  var newEventParamString = eventParams + ",clientX=" + coordsXY[0]
    + ",clientY=" + coordsXY[1];
  LOG.debug("newEventParamString=" + newEventParamString);

  // Always do a standard click to focus the cell
  this.clickElementQx(element, newEventParamString);

  // If requested, also do a context menu request:
  if (doContextMenu) {
    // subtract out the original element position:
    var origcoordsXY = getClientXY(element);
    coordsXY[0] = coordsXY[0] - origcoordsXY[0];
    coordsXY[1] = coordsXY[1] - origcoordsXY[1];

    LOG.debug("Calling selenium doContextMenuAt with X,Y=" + coordsXY[0] 
      + "," + coordsXY[1]);
    this.doContextMenuAt(innerLocator, coordsXY[0] + "," + coordsXY[1] );
  }

  // If requested, also do a double-click request:
  if (doDoubleClick) {
    // subtract out the original element position:
    var origcoordsXY = getClientXY(element);
    coordsXY[0] = coordsXY[0] - origcoordsXY[0];
    coordsXY[1] = coordsXY[1] - origcoordsXY[1];

    LOG.debug("Calling selenium doDoubleClickAt with X,Y=" + coordsXY[0] + "," 
      + coordsXY[1]);
    this.doDoubleClickAt(innerLocator, coordsXY[0] + "," + coordsXY[1] );
  }

};

/**
 * Uses the standard qx locators to find a table, and then processes a click on 
 * one of the column header cells. Note, your locator should only find the table 
 * itself, and not the clipper child of the table. We'll add the extra 
 * Composite/Scroller/Clipper to the locator as required.
 *
 * <p>
 * The column to click can be located using the index, ID or name by specifying 
 * one of the col, colId or colName parameters.
 * 
 * <p>
 * mousedown, mouseup will be fired instead of only click
 * in addition to to doQxClick the x-/y-coordinates of the located element will 
 * be determined.
 * TODO: implement it like doFooAt, where additional coordinates will be added 
 * to the element-coords
 * <p>
 * eventParams example: button=left|right|middle, clientX=300, shiftKey=true
 * for a full list of properties see "function 
 * Selenium.prototype.qx.triggerMouseEventQx"
 *
 * @type member
 * @param locator {var} an element locator
 * @param col {var} index of the table header column to click
 * @param colId {var} ID of the column to click
 * @param colName {var} Name of the column to click
 * @param eventParams {var} additional parameter for the mouse-event to set. 
 * e.g. clientX.
 * If no eventParams are set, defaults will be: left mousebutton, all keys false
 * and all coordinates 0
 * @return {void}
 */
Selenium.prototype.doQxTableHeaderClick = function(locator, eventParams)
{
  var qxObject = this.getQxWidgetByLocator(locator);
  
  if (qxObject) {
    if (!this.isQxInstanceOf(qxObject, "qx.ui.table.Table")) {
      throw new SeleniumError("Object is not an instance of qx.ui.table.Table: " + locator);
    }
  }
  else {
    throw new SeleniumError("No qooxdoo object found for locator: " + locator);
  }
  
  var additionalParamsForClick = {};
  if (eventParams && eventParams !== "") {
    var paramPairs = eventParams.split(",");

    for (var i = 0; i < paramPairs.length; i++) {
      var onePair = paramPairs[i];
      var nameAndValue = onePair.split("=");

      // rz: using String.trim from htmlutils.js of selenium to get rid of
      // whitespace
      var name = new String(nameAndValue[0]).trim();
      var value = new String(nameAndValue[1]).trim();
      additionalParamsForClick[name] = value;
    }
  }
  
  var col = 0;
  if (additionalParamsForClick["col"]) {
    col = Number(additionalParamsForClick["col"]);
  } else if (additionalParamsForClick["colId"]) {
    // get column index by columnID
    var model = qxObject.getTableModel();
    col = Number(model.getColumnIndexById(additionalParamsForClick["colId"]));
    LOG.debug("Got column index " + col + " from colId");
  } else if (additionalParamsForClick["colName"]) {
    // get column index by columnName
    col = Number(this.getQxTableColumnIndexByName(qxObject, additionalParamsForClick["colName"]));
    LOG.debug("Got column index " + col + " from colName");
  } else {
    LOG.info("No column given, using column index 0.");
  }
  
  var element = null;
  var subLocator = "qx.ui.container.Composite/qx.ui.table.pane.Scroller/qx.ui.container.Composite/qx.ui.table.pane.Clipper/qx.ui.table.pane.Header/child[" + col + "]";
  if (locator.indexOf("qxh=") == 0) {
    var headerCellLocator = locator + "/" + subLocator;
    // Now add the extra components to the locator to find the header cell itself.
    // This is the real object that we want to click on.
    element = this.page().findElement(headerCellLocator);      
  }
  else {
    var qxhParts = subLocator.split('/');
    try {
      qxResultObject = this.page()._searchQxObjectByQxHierarchy(qxObject, qxhParts);
    } catch(ex) {
      LOG.error("qxTableHeaderClick couldn't find header cell widget: " + ex);
    }
    element = qxResultObject.getContentElement().getDomElement();
  }
  
  if (!element) {
    throw new SeleniumError("Could not find the header cell with the index " + col);
  }
  
  var coords = getClientXY(element);
  var headerCellX = coords[0];
  var headerCellY = coords[1];
  
  var headerCellWidth = qxObject.getTableColumnModel().getColumnWidth(col);
  var headerCellHeight = qxObject.getHeaderCellHeight();
  
  var clientX = headerCellX + Math.ceil(headerCellWidth / 2);
  var clientY = headerCellY + Math.ceil(headerCellHeight / 2);
  
  var newEventParamString = eventParams + ",clientX=" + clientX
    + ",clientY=" + clientY;
  LOG.debug("newEventParamString=" + newEventParamString);

  // Click the cell header
  this.clickElementQx(element, newEventParamString);
  
};


/**
 * Get all children of a widget that are instances of the given class(es).
 * TODO: Check if we can use PageBot._getQxNodeDescendants() for this. 
 * 
 * @param {Object} parentWidget The parent qooxdoo widget
 * @param {Array} classNames A list of class name strings
 * @return {Array} A list of matching child widgets
 */
Selenium.prototype.getChildControls = function(parentWidget, classNames)
{
  // Get the child widgets  
  var children = [];
  try {
    children = parentWidget._getChildren();
  }
  catch(ex) {}
  
  /* external child widgets - shouldn't be necessary to get the child controls  
  var extChildren = [];
  try {
    extChildren = parentWidget.getChildren();
  } 
  catch(ex) {}
  
  children = children.concat(extChildren);
  */
 
  // Check the parent as well
  var widgets = [parentWidget].concat(children);
  
  var childControls = [];

  for (var i=0,l=widgets.length; i<l; i++) {
    for (var j=0,m=classNames.length; j<m; j++) {
      if (this.isQxInstanceOf(widgets[i], classNames[j])) {
        childControls.push(widgets[i]);
      }
    }
  }
  
  return childControls;
};


/**
 * Set the value of a qooxdoo text field widget which can either be the widget
 * returned by the given locator, or one of its child widgets. 
 * Does not simulate key events.
 *
 * @param {String} locator an <a href="#locators">element locator</a>
 * @param {String} value the value to set
 */
Selenium.prototype.doQxType = function(locator, value)
{
  var element = this.page().findElement(locator);
  element = this.getInputElement(element);
  
  if (this.browserbot.shiftKeyDown) {
    value = value.toUpperCase();
  }
  this.browserbot.replaceText(element, value);
};


/**
 * Simulate a user entering text into any qooxdoo widget that is either itself
 * an instance of qx.ui.form.AbstractField or has a child control that is.
 *
 * @param {String} locator an <a href="#locators">element locator</a>
 * @param {String} value the value to type
 */
Selenium.prototype.doQxTypeKeys = function(locator, value)
{
  var element = this.page().findElement(locator);
  element = this.getInputElement(element);
  
  element.focus();
  
  // Trigger the key events
  var events = ["keydown", "keypress", "keyup"];
  var keys = new String(value).split("");
  
  for (var i = 0; i < keys.length; i++) {
    var c = keys[i];
    for (var k = 0; k < events.length; k++) {
      triggerKeyEvent(element, events[k], c, true, 
        this.browserbot.controlKeyDown, 
        this.browserbot.altKeyDown, 
        this.browserbot.shiftKeyDown, 
        this.browserbot.metaKeyDown);
    }
  }

};


/**
 * Investigates a DOM element. If the element is a text field or text area, it
 * is returned. If not, the element's corresponding qooxdoo widget is checked 
 * and the first text field/text area child node is returned.  
 * 
 * @param {Object} element The DOM element to start with
 * @return {Object} The found input or textarea element
 */
Selenium.prototype.getInputElement = function(element)
{
  if (element.wrappedJSObject) {
    element = element.wrappedJSObject;
  }
  // If the locator found a text input or textarea element, return it
  if (element.tagName.toLowerCase() == "textarea" ||
      (element.tagName == "input" && element.type.toLowerCase() == "text")) {
    return element;
  }
  // Otherwise get the qooxdoo widget the element belongs to
  var qx = this.getQxGlobalObject();
  var qxWidget = qx.ui.core.Widget.getWidgetByElement(element);
  
  if (this.isQxInstanceOf(qxWidget, "htmlarea.HtmlArea")) {
    var iframe = qxWidget.getIframeObject();
    try {
      return iframe.contentDocument.body;
    } catch (ex) {
      return iframe.document.body;
    }
  }
  
  var classNames = ["qx.ui.form.AbstractField", "qx.ui.form.TextField", "qx.ui.form.TextArea", "qx.ui.form.PasswordField"];
  // Search the widget and its child controls for a text field
  var fieldWidgets = this.getChildControls(qxWidget, classNames);
  if (!fieldWidgets.length > 0) {
    throw new SeleniumError("No input/text area child found in widget " + qxWidget.classname);
  }
  
  // Get the DOM input element
  return fieldWidgets[0].getContentElement().getDomElement();
};

// ****************************************
// qooxdoo-locator (qx=) and special (qxx=)
// ****************************************
/**
 * Finds a qooxdoo object(!) identified by its userData attribute.
 * Note: Here, the Selenium locator abstraction is used to get a JS object, 
 * _not_ a DOM Element.
 * 
 * locator syntax: qxx=oneId/childId1/childId2
 *   note: children can also be found directly if their qooxdoo ID is unique in the current application state
 *         if multiple IDs exist in qooxdoo, the first match is used!
 * trailing and preceeding "/" are invalid (like qx=/el1/el2/) and will be ignored
 * also surplus "/" are ignored (like qx=el1//el2)
 *
 * @type member
 * @param qxLocator {String} A qooxdoo locator string
 * @param inDocument {Document} The AUT document object
 * @param inWindow {Window} The AUT window object
 * @return {null | Object} The found qooxdoo object
 */
PageBot.prototype.locateElementByQxx = function(qxLocator, inDocument, inWindow)
{
  LOG.info("Locate qooxdoo-Object by qooxdoo-UserData-Locator=" + qxLocator + ", inDocument=" + inDocument + ", inWindow=" + inWindow.location.href);
  this.qx.findOnlyVisible = false;

  var qxObject = this._findQxObjectInWindow(qxLocator, inWindow);

  if (qxObject) {
    return qxObject;
  }
};


/**
 * Finds an element identified by a qooxdoo userData attribute
 * 
 * locator syntax: qx=oneId/childId1/childId2
 *   note: children can also be found directly if their qooxdoo ID is unique in the current application state
 *         if multiple IDs exist in qooxdoo, the first match is used!
 * trailing and preceeding "/" are invalid (like qx=/el1/el2/) and will be ignored
 * also surplus "/" are ignored (like qx=el1//el2)
 *
 * @type member
 * @param qxLocator {String} A qooxdoo locator string
 * @param inDocument {Document} The AUT document object
 * @param inWindow {Window} The AUT window object
 * @return {null | Element} The found DOM element
 */
PageBot.prototype.locateElementByQx = function(qxLocator, inDocument, inWindow)
{
  LOG.info("Locate Element by qooxdoo-UserData-Locator=" + qxLocator + ", inDocument=" + inDocument + ", inWindow=" + inWindow.location.href);
  this.qx.findOnlyVisible = false;

  var qxObject = this._findQxObjectInWindow(qxLocator, inWindow);

  if (qxObject) {
    return qxObject.getContentElement().getDomElement();
  }
};


/**
 * Finds an element identified by qooxdoo userData attribute, followed by a xpath expression
 * 
 * locator syntax: qxp=oneId/childId1/childId2//xpath
 * 
 * TODO: Test this addition
 * credits: Sebastian Dauss
 *
 * @type member
 * @param qxLocator {String} A qooxdoo locator string
 * @param inDocument {Document} The AUT document object
 * @param inWindow {Window} The AUT window object
 * @return {null | var} TODOC
 * @throws TODOC
 */
PageBot.prototype.locateElementByQxp = function(qxLocator, inDocument, inWindow)
{
  LOG.info("Locate Element by qooxdoo-UserData-XPath-Locator=" + qxLocator + ", inDocument=" + inDocument + ", inWindow=" + inWindow.location.href);
  this.qx.findOnlyVisible = false;

  var locatorParts = qxLocator.split('//');

  if (locatorParts.length !== 2) {
    throw new SeleniumError("Error: wrong QXP locator syntax. need: qx1/qx2/.../qxn//xpath");
  }

  var qxPart = locatorParts[0];
  var xpathPart = locatorParts[1];

  if (!qxPart) {
    throw new SeleniumError("Error: wrong QXP locator syntax, qx-Part must not be empty. hint: use xpath locator instead");
  }

  if (!xpathPart) {
    throw new SeleniumError("Error: wrong QXP locator syntax, xpath-Part must not be empty. hint: use qx locator instead");
  }

  var qxObject = this._findQxObjectInWindow(qxPart, inWindow);

  if (!qxObject) {
    return null;
  }

  var qxElement = qxObject.getContentElement().getDomElement();
  
  var resultElement;
  if (this.locateElementByXPath){
  
    //Selenium 1.0: Use public function locateElementByXPath
    resultElement =       this.locateElementByXPath('descendant-or-self::node()/'+xpathPart, qxElement, inWindow);
  } else {
    //Selenium 0.9.2: Use internal function _findElementUsingFullXPath
    resultElement = this._findElementUsingFullXPath('descendant-or-self::node()/'+xpathPart, qxElement, inWindow);
  }
    
  return resultElement;
};


/**
 * Finds an element identified by qooxdoo object hierarchy, down from the Application object
 * 
 * locator syntax: qxh=firstLevelChild/secondLevelChild/thirdLevelChild
 * 
 *    where on each level the child can be identified by:
 *    - an identifier (which will be taken as a literal object member of the
 *      parent)
 *    - a special identifier starting with "qx." (this will be taken as a
 *      qooxdoo class signifying the child, e.g. "qx.ui.form.Button") [TODO]
 *    - "child[n]" (where n signifies the nth child of the current parent) [TODO]
 *    -
 *
 * @type member
 * @param qxLocator {String} A qooxdoo locator string
 * @param inDocument {Document} The AUT document object
 * @param inWindow {Window} The AUT window object
 * @return {var | null} TODOC
 */
PageBot.prototype.locateElementByQxh = function(qxLocator, inDocument, inWindow)
{
  LOG.info("Locate Element by qooxdoo-Object-Hierarchy-Locator=" + qxLocator + ", inDocument=" + inDocument + ", inWindow=" + inWindow.location.href);
  this.qx.findOnlyVisible = false;

  var qxObject = this._findQxObjectInWindowQxh(qxLocator, inWindow);

  if (qxObject) {
    return qxObject.getContentElement().getDomElement();
  } else {
    return null;
  }
};


/**
 * Finds an element identified by qooxdoo object hierarchy, down from the Application object.
 * Widgets with the "visibility" property not set to "visible" and their children are
 * ignored. 
 * 
 * locator syntax: qxhv=firstLevelChild/secondLevelChild/thirdLevelChild
 * 
 *    where on each level the child can be identified by:
 *    - an identifier (which will be taken as a literal object member of the
 *      parent)
 *    - a special identifier starting with "qx." (this will be taken as a
 *      qooxdoo class signifying the child, e.g. "qx.ui.form.Button") [TODO]
 *    - "child[n]" (where n signifies the nth child of the current parent) [TODO]
 *    -
 *
 * @type member
 * @param qxLocator {String} A qooxdoo locator string
 * @param inDocument {Document} The AUT document object
 * @param inWindow {Window} The AUT window object
 * @return {var | null} TODOC
 */
PageBot.prototype.locateElementByQxhv = function(qxLocator, inDocument, inWindow)
{
  LOG.info("Locate visible Element by qooxdoo-Object-Hierarchy-Locator=" + qxLocator + ", inDocument=" + inDocument + ", inWindow=" + inWindow.location.href);
  this.qx.findOnlyVisible = true;

  var qxObject = this._findQxObjectInWindowQxh(qxLocator, inWindow);

  if (qxObject) {
    return qxObject.getContentElement().getDomElement();
  } else {
    return null;
  }
};


/**
 * Finds an element by it's HTML ID attribute, then checks the visibility of the 
 * qooxdoo widget it belongs to. The element is returned only if the widget is
 * visible. 
 * 
 * locator syntax: qxidv=htmlId
 *
 * @type member
 * @param qxLocator {String} A qooxdoo locator string
 * @param inDocument {Document} The AUT document object
 * @param inWindow {Window} The AUT window object
 * @return {Element | null} The found element
 */
PageBot.prototype.locateElementByQxidv = function(qxLocator, inDocument, inWindow)
{
  LOG.info("Locate visible qooxdoo widget by HTML ID=" + qxLocator + ", inDocument=" + inDocument + ", inWindow=" + inWindow.location.href);
  
  if (inWindow.wrappedJSObject) {
    inWindow = inWindow.wrappedJSObject;
  }
 
  var id = qxLocator.substr(qxLocator.indexOf("=") + 1);
  
  // In some cases there are multiple widgets with the same id value on their
  // container or content elements, so we use XPath to find them all.
  try {
    var xpath = '//*[@id="' + id + '"]';
    var result = eval_xpath(xpath, inDocument, {});
  } catch(ex) {
    LOG.error("qxidv Locator: Error during XPath processing: " + ex);
    return null;
  }
  
  if (!result.length > 0) {
    LOG.error("qxidv Locator: Couldn't find an element with the ID " + id);
    return null;
  }
  
  var qx = inWindow.qx;
  
  for (var i=0,l=result.length; i<l; i++) {
    var element = result[i];
    if (element.wrappedJSObject) {
      element = element.wrappedJSObject;
    }
    try {
      var qxWidget = qx.ui.core.Widget.getWidgetByElement(element);
      if (qxWidget.isSeeable()) {
        return element;
      }
    } catch(ex) {
      continue;
    }
    
  }
  
  LOG.error("qxidv Locator: Couldn't find a visible widget for the HTML element with the ID " + id);
  return null;
};

/**
 * Returns the client document instance or null if Init.getApplication() returned null. 
 * Reason is that qooxdoo 0.7 relies on the application being set when the client document
 * is accessed  
 *
 * @type member
 * @param inWindow {var} window too get client document for
 * @return {qx.ui.core.ClientDocument | null} document or null
 */
PageBot.prototype._getClientDocument = function(inWindow){
  try {
    if ((inWindow != null)
         && (inWindow.wrappedJSObject.qx != null)
         && (inWindow.wrappedJSObject.qx.core.Init != null)
         && (inWindow.wrappedJSObject.qx.core.Init.getApplication() != null)
         && (inWindow.wrappedJSObject.qx.core.Init.getApplication().getRoot() != null)
       ){
      return inWindow.wrappedJSObject.qx.core.Init.getApplication().getRoot();
    } else{
      return null;
    }
  }
  catch(e) {
    if ((inWindow != null)
        && (inWindow.qx != null)
        && (inWindow.qx.core.Init != null)
        && (inWindow.qx.core.Init.getApplication() != null)
        && (inWindow.qx.core.Init.getApplication().getRoot() != null)
      ){
     return inWindow.qx.core.Init.getApplication().getRoot();
   } else{
     return null;
   }
  }
  
};


/**
 * TODOC
 *
 * @type member
 * @param qxLocator {var} TODOC
 * @param inWindow {var} TODOC
 * @return {null | var} TODOC
 * @throws TODOC
 */
PageBot.prototype._findQxObjectInWindowQxh = function(qxLocator, inWindow)
{
  if (!inWindow) {
    throw new Error("No AUT window. Internal Error.");
  }

  var qxResultObject = null;

  // the AUT window must contain the qx-Object
  var qxAppRoot;
  
  try {
    if (inWindow.wrappedJSObject.qx) {
      inWindow.qx = inWindow.wrappedJSObject.qx;
    }
  } catch(e) {}

  if (inWindow.qx)
  {
    this._globalQxObject = inWindow.qx;
    LOG.debug("qxLocator: qooxdoo seems to be present in AUT window. Try to get the Instance");
    
    var locAndRoot = this._getLocatorAndRoot(qxLocator, inWindow);
    qxLocator = locAndRoot.qxLocator;
    var qxAppRoot = locAndRoot.qxAppRoot;
  }

  else
  {
    LOG.debug("qx-Locator: qx-Object not defined, object not found. inWindow=" + inWindow.location.href + ", inWindow.qx=" + inWindow.qx);

    // do not throw here, as if the locator fails in the first place selenium will call this
    // again with all frames (and windows?) which won't result in "element not found" but in
    // qooxdoo not beeing availabel.
    return null;
  }

  LOG.debug("qxLocator All basic checks passed.");

  // treat qxLocator
  qxLocator = qxLocator.replace(/^[a-z]+:/i,"");  // remove optional object space spec (settled above)
  var qxhParts = qxLocator.split('/');

  try {
    qxResultObject = this._searchQxObjectByQxHierarchy(qxAppRoot, qxhParts);
  }
  catch(e)
  {
    if (e.a instanceof Array)
    {
      // throw new SeleniumError("qooxdoo-Element " + e.join('/') + " not found");
      LOG.debug("Qxh Locator: Could not resolve last element of: " + e.a.join('/'));

      // return null; // for now just return null
      throw e;
    }
    else
    {  // re-raise
      throw e;
    }
  }

  return qxResultObject;
};


/**
 * Determines the root (widget) for hierarchical qooxdoo locators. Returns the 
 * root and the relevant part of the locator (for multi-part locators).
 * 
 * @param locator {String} The complete locator string
 * @param inWindow {Object} The AUT window object
 * @return {Map} A map with the keys "qxLocator" and "qxAppRoot"
 */
PageBot.prototype._getLocatorAndRoot = function(locator, inWindow)
{
  var appRoot = null;
  // check for object space spec
  if (locator.match('^app:')) {
    appRoot = inWindow.qx.core.Init.getApplication();
  } 
  else {
    appRoot = this._getClientDocument(inWindow);
    if (appRoot == null){
      LOG.debug("qx-Locator: Cannot access Init.getApplication() (yet), cannot search. inWindow=" + inWindow.location.href + ", inWindow.qx=" + inWindow.qx);
      return null;
    }
  }
  
  if (locator.match('^inline:')) {
    if (locator.indexOf("//") < 0) {
      throw new SeleniumError("Wrong format for inline locator!");
    }
    var temp = locator.split(":");
    var locatorParts = temp[1].split("//");
    LOG.debug("Inline locator parts: " + locatorParts[0] + " and " + locatorParts[1]);
    // Get the inline root's DOM element
    try {
      var domElem = this.findElement(locatorParts[0]);
      if (domElem.wrappedJSObject) {
        domElem = domElem.wrappedJSObject;
      }
    } catch(ex) {
      throw new SeleniumError("Inline locator couldn't find element using" + 
        locatorParts[0] + ": " + ex);
    }
    
    // Get the inline root widget
    try {
      appRoot = this._globalQxObject.ui.core.Widget.getWidgetByElement(domElem);
      // If the inline root instance is configured to to respect the dom 
      // element's original dimensions, an additional div is created: 
      if (!appRoot) {
        appRoot = this._globalQxObject.ui.core.Widget.getWidgetByElement(domElem.firstChild);
      }
      
    } catch(ex) {
      throw new SeleniumError("Inline locator couldn't find Inline root: " + ex);
    }
    
    locator = locatorParts[1];
    LOG.debug("Inline locator processing qxh locator: " + locator);
  }
  
  return {
    qxLocator : locator,
    qxAppRoot : appRoot 
  };
  
};


/**
 * TODOC
 *
 * @type member
 * @param qxLocator {var} TODOC
 * @param inWindow {var} TODOC
 * @return {null | var} TODOC
 * @throws TODOC
 */
PageBot.prototype._findQxObjectInWindow = function(qxLocator, inWindow)
{
  if (!inWindow) {
    throw new Error("No AUT window. Internal Error.");
  }

  var qxResultObject;
  
  try {
    if (inWindow.wrappedJSObject.qx) {
      inWindow.qx = inWindow.wrappedJSObject.qx;
    }
  } catch(e) {}

  // the AUT window must contain the qx-Object
  if (inWindow.qx)
  {
    LOG.debug("qxLocator: qooxdoo seems to be present in AUT window. Try to get the Instance using (qx.ui.core.ClientDocument.getInstance())");
    qxResultObject = this._getClientDocument(inWindow);
    if (qxResultObject == null){
      LOG.debug("qx-Locator: Cannot access Init.getApplication() (yet), cannot search. inWindow=" + inWindow.location.href + ", inWindow.qx=" + inWindow.qx);
      return null;
    }
  }
  else
  {
    LOG.debug("qx-Locator: qx-Object not defined, object not found. inWindow=" + inWindow.location.href + ", inWindow.qx=" + inWindow.qx);

    // do not throw here, as if the locator fails in the first place selenium will call this
    // again with all frames (and windows?) which won't result in "element not found" but in
    // qooxdoo not beeing availabel.
    return null;
  }

  LOG.debug("qxLocator All basic checks passed.");

  var qxPathList = qxLocator.split("/");

  for (var i=0; i<qxPathList.length; i++)
  {
    // ignore additional "/"
    if (qxPathList[i] !== "")
    {
      if (!qxResultObject)
      {
        LOG.error("qx-locator path-element can not be searched. invalid qooxdoo object. path-element=" + qxPathList[i]);
        return null;
      }

      qxResultObject = this._searchQxObjectByQxUserData(qxResultObject, qxPathList[i]);
    }
  }

  if (qxResultObject)
  {
    LOG.debug("qxResultObject=" + qxResultObject + ", element=" + qxResultObject.getContentElement().getDomElement());
    return qxResultObject;
  }
  else
  {
    LOG.error("qx-locator: element not found for locator: qx-locator=" + qxLocator);
    return null;
  }
};


/**
 * TODOC
 *
 * @type member
 * @param obj {Object} TODOC
 * @param userDataSearchString {var} TODOC
 * @return {null | void | var} TODOC
 */
PageBot.prototype._searchQxObjectByQxUserData = function(obj, userDataSearchString)
{
  if (!obj) {
    return null;
  }

  if (!obj.getChildren) {
    return;
  }

  var children = obj.getChildren();

  if (!children || children.length === 0) {
    return;
  }

  for (var i=0; i<children.length; i++)
  {
    var child = children[i];
    var description = child.getUserData(userDataSearchString);

    if (description)
    {
      LOG.info("qx-widget found for userDataSearchString=" + userDataSearchString + " - returning Object=" + child);
      return child;
    }
    else
    {
      var result = this._searchQxObjectByQxUserData(child, userDataSearchString);

      if (result) {
        return result;
      }
    }
  }

  return null;
};


PageBot.prototype.qx = {};  // create qx name space
// some regexps, to safe stack space
PageBot.prototype.qx.IDENTIFIER = new RegExp('^[a-z$][a-z0-9_\.$]*$', 'i');
PageBot.prototype.qx.NTHCHILD = /^child\[-?\d+\]$/i;
PageBot.prototype.qx.ATTRIB = /^\[.*\]$/;

PageBot.prototype.qx.findOnlyVisible = false;


/**
 * TODOC
 *
 * @type member
 * @param root {var} TODOC
 * @param path {var} TODOC
 * @return {null | Element | var} TODOC
 * @throws TODOC
 */
PageBot.prototype._searchQxObjectByQxHierarchy = function(root, path)
{
  // recursive traverse the path
  // currently, we only return single elements, not sets of matching elements
  if (path.length == 0) {
    return null;
  }
  if (typeof(root) != "object") { // can only traverse (qooxdoo) objects
    return null;
  }
  if (root == null) {
    throw new SeleniumError("QxhPath: Cannot determine descendant from null root for: " + path);
  }

  var el = null;  // the yet to find current element
  var step = path[0];  // the current part of the QPath expression
  var npath = path.slice(1); // new path - rest of path

  LOG.debug("Qxh Locator: Inspecting current step: " + step);

  // get a suitable element from the current step, dispatching on step type
  if (step == '*')                 // this is like '//' in XPath
  {
    // this means we have to recursively look for rest of path among descendants
    LOG.debug("Qxh Locator: ... identified as wildcard (*) step");
    var res = null;

    // first check if current element matches already
    if (npath == 0)
    {
      // no more location specifier, * matches all, so return current element
      return root;
    }
    else
    {
      // there is something to match against
      try
      {
        LOG.debug("Qxh Locator: recursing with root: "+root+", path: "+npath.join('/'));
        res = this._searchQxObjectByQxHierarchy(root, npath);
      }
      catch (e)
      {
        if (e.a instanceof Array)
        {
          // it's an exception thrown by myself - just continue search
        }
        else 
        {
          throw e;
        }
      }
    }
    // check what we've got - can't be null
    if (res != null)
    {
      return res;
    }

    // then recurse with children, using original path
    var childs = this._getQxNodeDescendants(root);
    
    for (var i=0; i<childs.length; i++)
    {
      try
      {
        LOG.debug("Qxh Locator: recursing with root: "+childs[i]+", path: "+path.join('/'));
        res = this._searchQxObjectByQxHierarchy(childs[i], path);
      }
      catch (e)
      {
        if (e.a instanceof Array)
        {
          // it's an exception thrown by a descendant - just continue search
          continue;
        }
        else 
        {
          throw e;
        }
      }
      // when we reach this we have a hit
      return res;
    }

    // let's see how we came out of the loop
    // all recursion is already done, so we can terminate here
    if (res == null)
    {
      var e = new SeleniumError("Qxh Locator: Error resolving qxh path");
      e.a = [ step ]; // since we lost the e from deeper recursions just report current
      throw e;
    }
    else 
    {
      return res; // this should be superfluous
    }
  }

  else if (step.match(this.qx.IDENTIFIER))
  {
    if (step.indexOf('qx.') != 0)  // 'foo' format
    {
      LOG.debug("Qxh Locator: ... identified as general identifier");
      el = this._getQxElementFromStep1(root, step);
    }
    else
    {  // 'qx....' format
      LOG.debug("Qxh Locator: ... identified as qooxdoo class name");
      el = this._getQxElementFromStep2(root, step);
    }
  }

  else if (step.match(this.qx.NTHCHILD))  // 'child[n]' format
  {
    LOG.debug("Qxh Locator: ... identified as indexed child");
    el = this._getQxElementFromStep3(root, step);
  }

  else if (step.match(this.qx.ATTRIB))  // '[@..=...]' format
  {
    LOG.debug("Qxh Locator: ... identified as attribute specifier");
    el = this._getQxElementFromStep4(root, step);
  }

  else  // unknown step format
  {
    throw new SeleniumError("QPath: Illegal step: " + step);
  }

  // check result
  if (el == null)
  {
    var e = new SeleniumError("Qxh Locator: Error resolving qxh path");
    e.a = [ step ];
    throw e;
  }

  // recurse
  if (npath.length == 0) {
    LOG.debug("Qxh Locator: Terminating search, found match; last step :"+step+", element: "+el);
    return el;
  }
  else
  {
    // basically we tail recurse, but catch exceptions
    try {
      LOG.debug("Qxh Locator: found step (" + step + "), moving on to (" +
                npath[0] + ")" ); 
      var res = this._searchQxObjectByQxHierarchy(el, npath);
    }
    catch(e)
    {
      if (e.a instanceof Array)
      {
        // prepend the current step
        e.a.unshift(step);
        LOG.debug("Qxh Locator: ... nothing found in this branch; going up");
        throw e;
      }
      else
      {  // re-raise
        throw e;
      }
    }

    return res;
  }
};  // _searchQxObjectByQxHierarchy()


/**
 * 'button1' (from 'w.button1') - step specifier
 *
 * @type member
 * @param root {var} TODOC
 * @param step {var} TODOC
 * @return {var | null} TODOC
 */
PageBot.prototype._getQxElementFromStep1 = function(root, step)
{
  // find an object member of root with name 'step'
  LOG.debug("Qxh Locator: in _getQxElementFromStep1");
  var member;

  for (member in root)
  {
    if (member == step) {
      LOG.debug("Qxh Locator: _getQxElementFromStep1 returning object");
      return root[member];
    }
  }

  LOG.debug("Qxh Locator: _getQxElementFromStep1 returning null");
  return null;
};


/**
 * 'qx.ui.form.Button' - step specifier
 *
 * @type member
 * @param root {var} TODOC
 * @param qxclass {var} TODOC
 * @return {var | null} TODOC
 */
PageBot.prototype._getQxElementFromStep2 = function(root, qxclass)
{
  // find a child of root with qooxdoo type 'qxclass'
  LOG.debug("Qxh Locator: in _getQxElementFromStep2");
  var childs;
  var curr;

  // need to get to the global 'qx' object
  if (this._globalQxObject) {
    var qx = this._globalQxObject;
    var myClass = qx.Class.getByName(qxclass);
  } else {
    throw new SeleniumError("Qxh Locator: Need global qx object to search by attribute");
  }

  childs = this._getQxNodeDescendants(root);

  for (var i=0; i<childs.length; i++)
  {
    curr = childs[i];
    LOG.debug("Qxh Locator: Comparing found child " + curr.classname + " to wanted class " + qxclass);
    try {
      if (curr instanceof myClass || curr.classname === qxclass) {
        return curr;
      }
    } catch(e) {
      if (curr.classname === qxclass) {
        LOG.info("instanceof test failed for " + qxclass + ", falling back to classname string comparison. ");
        return curr;
      }
    }
  }

  return null;
};


/**
 * 'child[3]' - step specifier
 *
 * @type member
 * @param root {var} TODOC
 * @param childspec {var} TODOC
 * @return {null | var} TODOC
 */
PageBot.prototype._getQxElementFromStep3 = function(root, childspec)
{
  // find a child of root by index
  LOG.debug("Qxh Locator: in _getQxElementFromStep3");
  var childs;
  var idx;
  var m;

  // extract child index
  m = /child\[(-?\d+)\]/i.exec(childspec);

  if ((m instanceof Array) && m.length > 1) {
    idx = parseInt(m[1], 10);
  } else {
    return null;
  }

  childs = this._getQxNodeDescendants(root);

  // Negative index value: Reverse access  
  if (idx < 0 ) {
    if (Math.abs(idx) > childs.length) {
      return null;
    } else {
      var index = (childs.length + idx);
      return childs[index];
    }
  }  
  
  if (idx >= childs.length) {
    return null;
  } else {
    return childs[idx];
  }
};


/**
 * '[@label="hugo"]' - step specifier
 *
 * @type member
 * @param root {var} TODOC
 * @param attribspec {var} TODOC
 * @return {null | var} TODOC
 * @throws TODOC
 */
PageBot.prototype._getQxElementFromStep4 = function(root, attribspec)
{
  // find a child of root by attribute
  LOG.debug("Qxh Locator: in _getQxElementFromStep4");
  var childs;
  var attrib;
  var attval;
  var rattval;
  var actobj;
  var m;


  // need to get to the global 'qx' object
  if (this._globalQxObject) {
    var qx = this._globalQxObject;
  } else {
    throw new SeleniumError("Qxh Locator: Need global qx object to search by attribute");
  }

  // extract attribute and value
  m = /\[@([^=]+)(?:=(.+))?\]$/.exec(attribspec);

  if ((m instanceof Array) && m.length > 1)
  {
    LOG.debug("Qxh Locator: _getQxElementFromStep4: parsed spec into: "+m);
    attrib = m[1];
    if (m.length > 2 && m[2]!=null && m[2] != "")
    {
      attval = m[2];

      // strip possible quotes from attval
      if (attval.match(/^['"].*['"]$/)) {
        attval = attval.slice(1, attval.length - 1);
      }

      // it's nice to match against regexp's
      rattval = new RegExp(attval);
        
    }
  }
  else
  {
    return null;
  }

  if (attval == null) // no compare value -> attrib on root must contain obj ref
  {
    actobj = this.qx._getGeneralProperty(root, attrib, qx);
    if (typeof(actobj) == "object")
    {
      return actobj; // only return an obj ref
    } else 
    {
      return null;
    }
  }

  childs = this._getQxNodeDescendants(root);

  for (var i=0; i<childs.length; i++)
  {
    // For every child, we check various ways where it might match with the step
    // specifier (generally using regexp match to compare strings)
    actobj = childs[i];

    // check properties first
    // var qxclass = qx.Class.getByName(actobj.classname);
    if (actobj.constructor)
    {
      var hasProp = qx.Class.hasProperty(actobj.constructor, attrib);  // see qx.Class API

      if (hasProp)
      {
        var currval = actobj.get(attrib);
        LOG.debug("Qxh Locator: Attribute Step: Checking for qooxdoo property ('" + attrib + "' is: " + currval + ")");

        if (currval && currval.match(rattval)) {
          return actobj;
        }
      }
    }

    // check for userData using special key:value syntax
    if (attrib.indexOf("userData") === 0 && attval.indexOf(":") > 0 ) {
      var keyval = attval.split(":");
      LOG.debug("Qxh Locator: Attribute Step: Checking for userData field " + keyval[0] + " with value " + keyval[1]);
      
      var currval = actobj.getUserData(keyval[0]);
      
      var urattval = new RegExp(keyval[1]);
      if (currval && currval.match(urattval)) {
        return actobj;
      }      
    }

    // then, check normal JS attribs
    if ((attrib in actobj) && ((String(actobj[attrib])).match(rattval)))
    {
      LOG.debug("Qxh Locator: Attribute Step: Checking for JS object property");
      return actobj;
    }

    /*
    // last, if it is a @label attrib, try check the label of the widget
    // [this might be superfluous, since it seems that 'getLabel()' is covered
    // by 'get("label")' in the property section above]
    if (/^label$/i.exec(attrib))
    {
      LOG.debug("Qxh Locator: Attribute Step: Checking for qooxdoo widget label");

      // try getLabel() method
      if (actobj.getLabel)
      {
        if ((actobj.getLabel()).match(rattval)) {
          return actobj;
        }
      }
    }
    */
    else
    {
      LOG.debug("Qxh Locator: Attribute Step: No match for current child");
    }
  }

  return null;
};  // _getQxElementFromStep4()


/**
 * using different approaches to locate a node's direct descendants (children of
 * some kind)
 *
 * @type member
 * @param node {Node} TODOC
 * @return {var} TODOC
 */
PageBot.prototype._getQxNodeDescendants = function(node)
{
  var descArr = [];
  var c;

   /* If the node is one of the qooxdoo Iframes (html or ui.embed) containing 
    * another qooxdoo application, try to retrieve its root widget */
  if ((node.classname.indexOf("Iframe") + 6 == node.classname.length) && node.getWindow) {
    LOG.debug("getQxNodeDescendants: using getWindow() to retrieve descendants");
    try {
      // store a reference to the iframe's qx object. This is used by 
      // Selenium.getQxWidgetByLocator
      this._iframeQxObject = node.getWindow().qx;
      descArr = descArr.concat(node.getWindow().qx.core.Init.getApplication().getRoot());
    } 
    catch (ex) {
    }
  }
  
  else {
    // check external widget children (built with w.add())
    if (node.getChildren) {
      LOG.debug("getQxNodeDescendants: using getChildren() to retrieve descendants of " + node);
      // +" (got: "+ (c.length? c.length: 0)+")");
      c = node.getChildren();
      descArr = descArr.concat(c);
      if (node.getMenu) {
        LOG.debug("Getting child menu");
        descArr = descArr.push(node.getMenu());
      }
    }
    
    // check TreeFolder items: Only neccessary for qooxdoo versions < 0.8.3
    else {
      if (node.getItems) {
        LOG.debug("getQxNodeDescendants: using getItems() to retrieve descendants");
        descArr = descArr.concat(node.getItems());
      }
    }
    
    // check internal children (e.g. child controls)
    if (node._getChildren) {
      LOG.debug("getQxNodeDescendants: using _getChildren() to retrieve descendants of " + node);
      c = node._getChildren();
      descArr = descArr.concat(c);
      if (node.getMenu) {
        LOG.debug("Getting child menu");
        descArr.push(node.getMenu());
      }
    }
    
    // use JS object members
    if (!(node.getChildren || node._getChildren)) {
      LOG.debug("getQxNodeDescendants: using JS properties to retrieve descendants");
      for (var m in node) {
        descArr.push(node[m]);
      }
    }
    
  }

  // only select useful subnodes (only objects, no circular refs, etc.)
  // TODO: circular refs which are *not* immediate!
  var descArr1 = [];
  for (var i=0; i<descArr.length; i++)
  {
    var curr = descArr[i];
    if ((typeof(curr) == "object") && (curr != node) && (curr != null))
    {
      if (!descArr[i].getVisibility) {
        // always select a subnode if we can't check its visibility
        descArr1.push(descArr[i]);
      } else if (!this.qx.findOnlyVisible || (this.qx.findOnlyVisible && descArr[i].getVisibility() == "visible")) {
        // if findOnlyVisible is active, check the subnode's visibility property
        descArr1.push(descArr[i]);
      }
    }
  }

  LOG.debug("getQxNodeDescendants: returning for node immediate children: "+descArr1.length);
  return descArr1;
};  // _getQxNodeDescendants()


PageBot.prototype.qx._getGeneralProperty = function(actobj, attrib, qx)
{
  // check properties first
  // var qxclass = qx.Class.getByName(actobj.classname);
  if (actobj.constructor)
  {
    var hasProp = qx.Class.hasProperty(actobj.constructor, attrib);  // see qx.Class API

    if (hasProp)
    {
      //LOG.debug("Qxh Locator: Attribute Step: Checking for qooxdoo property ('" + attrib + "' is: " + currval + ")");
      var currval = actobj.get(attrib);
      return currval;
    }
  }

  // then, check normal JS attribs
  if (attrib in actobj)
  {
    //LOG.debug("Qxh Locator: Attribute Step: Checking for JS object property");
    return actobj[attrib];
  }

  /*
  // last, if it is a @label attrib, try check the label of the widget
  // [this might be superfluous, since it seems that 'getLabel()' is covered
  // by 'get("label")' in the property section above]
  if (/^label$/i.exec(attrib))
  {
    LOG.debug("Qxh Locator: Attribute Step: Checking for qooxdoo widget label");

    // try getLabel() method
    if (actobj.getLabel)
    {
      if ((actobj.getLabel()).match(rattval)) {
        return actobj;
      }
    }
  }
  */
  return null;
};


// code from qx.html.EventRegistration.js

PageBot.prototype._addEventListener = function(vElement, vType, vFunction) 
{
  if(vElement.attachEvent)
  {
    vElement.attachEvent("on" + vType, vFunction);
  } else
  {
    vElement.addEventListener(vType, vFunction, false);
  }
};


PageBot.prototype._removeEventListener = function(vElement, vType, vFunction) 
{
  if(vElement.detachEvent)
  {
    vElement.detachEvent("on" + vType, vFunction);
  } else
  {
    vElement.removeEventListener(vType, vFunction, false);
  }
};


PageBot.prototype._getWinWidth = function(w)
{
  var win = w||window;
  //if (win.document.body && win.document.body.clientWidth)
  if (browserVersion.isOpera)
  {
    return win.document.body.clientWidth;
  }
  else if (browserVersion.isSafari)
  {
    return win.innerWidth;
  }
  else
  {
    var doc = win.document;
    var width = doc.compatMode === "CSS1Compat" ? doc.documentElement.clientWidth : doc.body.clientWidth;
    return width; // no further correction currently
  }
};


PageBot.prototype._getWinHeight = function(w)
{
  var win = w||window;
  if (browserVersion.isOpera)
  {
    return win.document.body.clientHeight;
  }
  else if (browserVersion.isSafari)
  {
    return win.innerHeight;
  }
  else
  {
    var doc = win.document;
    var height = doc.compatMode === "CSS1Compat" ? doc.documentElement.clientHeight : doc.body.clientHeight;
    return height; // no further correction currently
  }
};

Selenium.prototype.doQxDragAndDropToObject = function(locatorOfObjectToBeDragged, locatorOfDragDestinationObject) {
 /** Drags an element and drops it on another element
  *
  * @param locatorOfObjectToBeDragged an element to be dragged
  * @param locatorOfDragDestinationObject an element whose location (i.e., whose center-most pixel) will be the point where locatorOfObjectToBeDragged  is dropped
  */
  var startX = this.getElementPositionLeft(locatorOfObjectToBeDragged);
  var startY = this.getElementPositionTop(locatorOfObjectToBeDragged);
  var destinationLeftX = this.getElementPositionLeft(locatorOfDragDestinationObject);
  var destinationTopY = this.getElementPositionTop(locatorOfDragDestinationObject);
  var destinationWidth = this.getElementWidth(locatorOfDragDestinationObject);
  var destinationHeight = this.getElementHeight(locatorOfDragDestinationObject);
  var endX = Math.round(destinationLeftX + (destinationWidth / 2));
  var endY = Math.round(destinationTopY + (destinationHeight / 2));
  var deltaX = endX - startX;
  var deltaY = endY - startY;
  var movementsString = "" + deltaX + "," + deltaY;  
  this.doQxDragAndDrop(locatorOfObjectToBeDragged, movementsString, locatorOfDragDestinationObject);
};

Selenium.prototype.getElementPositionLeft = function(locator) {       
  /**
   * Retrieves the horizontal position of an element
   *
   * @param locator an <a href="#locators">element locator</a> pointing to an element OR an element itself
   * @return number of pixels from the edge of the frame.
   */
  var element;
  if ("string"==typeof locator) {
    element = this.page().findElement(locator);
  }
  else {
    element = locator;
  }
  var x = element.offsetLeft;
  var elementParent = element.offsetParent;
  while (elementParent != null)
  {
    if(document.all)
    {
      if( (elementParent.tagName != "TABLE") && (elementParent.tagName != "BODY") )
      {
        x += elementParent.clientLeft;
      }
    }
    else // Netscape/DOM
    {
      if(elementParent.tagName == "TABLE")
      {
        var parentBorder = parseInt(elementParent.border, 10);
        if(isNaN(parentBorder))
        {
          var parentFrame = elementParent.getAttribute('frame');
          if(parentFrame != null)
          {
            x += 1;
          }
        }
        else if(parentBorder > 0)
        {
          x += parentBorder;
        }
      }
    }
    x += elementParent.offsetLeft;
    elementParent = elementParent.offsetParent;
  }
  return x;
};

Selenium.prototype.getElementPositionTop = function(locator) {
 /**
 * Retrieves the vertical position of an element
 *
 * @param locator an <a href="#locators">element locator</a> pointing to an element OR an element itself
 * @return number of pixels from the edge of the frame.
 */
  var element;
  if ("string"==typeof locator) {
    element = this.page().findElement(locator);
  }
  else {
    element = locator;
  }

  var y = 0;

  while (element != null)
  {
    if(document.all)
    {
      if( (element.tagName != "TABLE") && (element.tagName != "BODY") )
      {
        y += element.clientTop;
      }
    }
    else // Netscape/DOM
    {
      if(element.tagName == "TABLE")
      {
        var parentBorder = parseInt(element.border, 10);
        if(isNaN(parentBorder))
        {
          var parentFrame = element.getAttribute('frame');
          if(parentFrame != null)
          {
            y += 1;
          }
        }
        else if(parentBorder > 0)
        {
            y += parentBorder;
        }
      }
    }
    y += element.offsetTop;

    // Netscape can get confused in some cases, such that the height of the parent is smaller
    // than that of the element (which it shouldn't really be). If this is the case, we need to
    // exclude this element, since it will result in too large a 'top' return value.
    if (element.offsetParent && element.offsetParent.offsetHeight && element.offsetParent.offsetHeight < element.offsetHeight)
    {
      // skip the parent that's too small
      element = element.offsetParent.offsetParent;
    }
    else
    {
      // Next up...
      element = element.offsetParent;
    }
  }
  return y;
};

Selenium.prototype.getElementWidth = function(locator) {
 /**
  * Retrieves the width of an element
  *
  * @param locator an <a href="#locators">element locator</a> pointing to an element
  * @return number width of an element in pixels
  */
  var element = this.page().findElement(locator);
  return element.offsetWidth;
};
    
Selenium.prototype.getElementHeight = function(locator) {
 /**
  * Retrieves the height of an element
  *
  * @param locator an <a href="#locators">element locator</a> pointing to an element
  * @return number height of an element in pixels
  */
  var element = this.page().findElement(locator);
  return element.offsetHeight;
};

Selenium.prototype.doQxDragAndDrop = function(locator, movementsString, targetLocator) {
 /** Drags an element a certain distance and then drops it
  * @param locator an element locator
  * @param movementsString offset in pixels from the current location to which the element should be moved, e.g., "+70,-300"
  * @param targetLocator locator (optional) locator for the drop target. Neccessary for dragAndDropToObject to work in qooxdoo 0.8
  */
  var element = this.page().findElement(locator);  
  var clientStartXY = getClientXY(element);
  var clientStartX = clientStartXY[0];
  var clientStartY = clientStartXY[1];
  
  var movements = movementsString.split(/,/);
  var movementX = Number(movements[0]);
  var movementY = Number(movements[1]);
  var clientFinishX = ((clientStartX + movementX) < 0) ? 0 : (clientStartX + movementX);
  var clientFinishY = ((clientStartY + movementY) < 0) ? 0 : (clientStartY + movementY);
  var mouseSpeed = this.mouseSpeed;
  var move = function(current, dest) {
    if (current == dest) {
      return current;
    }
    if (Math.abs(current - dest) < 1) {
      return dest;
    }
    return (current < dest) ? current + 1 : current - 1;
  };
  var root = false;
  try {
    root = this.page().findElement("qxh=app:qx.ui.root.Application");
  }
  catch(ex) {
    root = this.page().findElement("//body");
  }
  
  var newEventParamString = "" + ",clientX=" + clientStartX + ",clientY=" + clientStartY;
  var additionalParamsForClick = new Selenium.prototype.qx.MouseEventParameters(newEventParamString);  
  Selenium.prototype.qx.triggerMouseEventQx('mousedown', element, additionalParamsForClick);
  Selenium.prototype.qx.triggerMouseEventQx('mouseover', root, additionalParamsForClick); 
  Selenium.prototype.qx.triggerMouseEventQx('mousemove', root, additionalParamsForClick);
  
  var clientX = clientStartX;
  var clientY = clientStartY;
  while ((clientX != clientFinishX) || (clientY != clientFinishY)) {
    //LOG.info("X : " + clientX);
    //LOG.info("Y : " + clientY);
    clientX = move(clientX, clientFinishX);
    clientY = move(clientY, clientFinishY);
    var newEventParamString = "" + ",clientX=" + clientX + ",clientY=" + clientY;
    var additionalParamsForClick = new Selenium.prototype.qx.MouseEventParameters(newEventParamString);
    Selenium.prototype.qx.triggerMouseEventQx('mousemove', root, additionalParamsForClick);
  }
  LOG.info("Final X : " + clientFinishX);
  LOG.info("Final Y : " + clientFinishY);
  var newEventParamString = "" + ",clientX=" + clientFinishX + ",clientY=" + clientFinishY;
  var additionalParamsForClick = new Selenium.prototype.qx.MouseEventParameters(newEventParamString);
  if (targetLocator) {
    var targetElement = this.page().findElement(targetLocator);
    Selenium.prototype.qx.triggerMouseEventQx('mouseover', targetElement, additionalParamsForClick);
    Selenium.prototype.qx.triggerMouseEventQx('mousemove', targetElement, additionalParamsForClick);
    Selenium.prototype.qx.triggerMouseEventQx('mouseup', targetElement, additionalParamsForClick);
  }
  else {
    Selenium.prototype.qx.triggerMouseEventQx('mousemove', root, additionalParamsForClick);
    Selenium.prototype.qx.triggerMouseEventQx('mouseup', element, additionalParamsForClick);
  }
};


/**
 * Finds an element by evaluating a JavaScript code snippet 
 * 
 * @param {String} The JavaScript code that returns the element
 * @param {Object} inDocument The AUT's document
 * @param {Object} inWindow The AUT's window object
 * @return {null | Element}
 */
PageBot.prototype.locateElementByQxscript = function(qxFunction, inDocument, inWindow)
{
  LOG.info("Locate Element by qooxdoo function= " + qxFunction + ", inDocument=" + inDocument + ", inWindow=" + inWindow.location.href);
  var qxObject = false;
  
  if (inWindow.wrappedJSObject) {
    inWindow = inWindow.wrappedJSObject;
  }

  try {
    qxObject = eval.call(inWindow, qxFunction);    
  }
  catch(ex) {
    LOG.error("locateElementByQxfunc: Error while running the code snippet: " + ex);
  }
  
  if (qxObject) {
    return qxObject.getContentElement().getDomElement();
  } else {
    return null;
  }
};
