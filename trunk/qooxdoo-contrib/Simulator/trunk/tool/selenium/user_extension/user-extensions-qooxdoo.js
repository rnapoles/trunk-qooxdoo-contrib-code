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
     * Robert Zimmermann    (rz)
     * Thomas Herchenroeder (thron7)

************************************************************************ */

/**
 * Selenium Extension for testing Applications build with qooxdoo
 *   see http://qooxdoo.org
 *
 * This extension covers the following commands to test applications build with qooxdoo:
 *  1.) special click commands: "qxClick" and "qxClickAt"
 *  2.) special qooxdoo element-locator "qx=" and "qxp="
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
 * changed to work with selenium 0.8.3
 *
 * TODO:
 *  - Ask qooxdoo developers to provide qooxdoo UserData's on core qooxdoo widgets.
 *    - Widgets: Window, TreeView
 *
 * Version: 0.3
 * 
 */
// ***************************************************
// Handling of MouseEventParameters
// ***************************************************
/**
* Helper to parse a param-String and provide access to the parameters with default-value handling
*
* @param customParameters string with name1=value1, name2=value2 whitespace will be ignored/stripped
* @param isIEevent boolean if true treat buttons IE-like, false treat it like all other user-agents do
*/
function MouseEventParameters(customParameters)
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
}

MouseEventParameters.MOUSE_BUTTON_MAPPING_IE =
{
  "left"   : 1,
  "right"  : 2,
  "middle" : 4
};

MouseEventParameters.MOUSE_BUTTON_MAPPING_OTHER =
{
  "left"   : 0,
  "right"  : 2,
  "middle" : 1
};


/**
 * TODOC
 *
 * @type member
 * @param buttonName {var} TODOC
 * @return {var} TODOC
 */
MouseEventParameters.prototype.getButtonValue = function(buttonName)
{
  if (document.createEventObject)
  {
    LOG.debug("MouseEventParameters.prototype.getButtonValue - using IE Button-Mapping");
    return MouseEventParameters.MOUSE_BUTTON_MAPPING_IE[buttonName];
  }
  else
  {
    LOG.debug("MouseEventParameters.prototype.getButtonValue - using OTHER Button-Mapping");
    return MouseEventParameters.MOUSE_BUTTON_MAPPING_OTHER[buttonName];
  }
};


/**
 * Returns an value if found for given paramName.
 *  If not found, given defaultValue is returned
 * 
 * Type-conversion is donne for string, boolean and number automatically
 *  based on type of the given defaultValue.
 *
 * @type member
 * @param paramName {var} string name of parameter to search for
 * @param defaultValue {var} <different types> default value to be returned, if no value is found
 *            the type is important, see documentation above for details
 * @return {var} TODOC
 */
MouseEventParameters.prototype.getParamValue = function(paramName, defaultValue)
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
function triggerMouseEventQx(eventType, element, eventParamObject)
{
  if (!eventParamObject)
  {
    // this can only be, if the internal call-chain is wrong
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
  /* for event dbugging
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
  */

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
    evt = document.createEventObject();

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
}


/**
 * Clicks on a qooxdoo-element.
 * mousedown, mouseup will be fired instead of only click (which is named execute in qooxdoo)
 * 
 * eventParams example: button=left|right|middle, clientX=300, shiftKey=true
 *             for a full list of properties see "function triggerMouseEventQx"
 *
 * @type member
 * @param locator {var} an element locator
 * @param eventParams {var} additional parameter for the mouse-event to set. e.g. clientX.
 *            if no eventParams are set, defaults will be: left-mousebutton, all keys false and all coordinates 0
 * @return {void} 
 */
Selenium.prototype.doQxClick = function(locator, eventParams)
{
  var element = this.page().findElementOrNull(locator);
  this.clickElementQx(element, eventParams);
};


/**
 * Clicks on a qooxdoo-element.
 * mousedown, mouseup will be fired instead of only click
 * additionaly to doQxClick the x-/y-coordinates of located element will be determined.
 * TODO: implement it like doFooAt, where additional coordinates will be added to the element-coords
 * 
 * eventParams example: button=left|right|middle, clientX=300, shiftKey=true
 *             for a full list of properties see "function triggerMouseEventQx"
 *
 * @type member
 * @param locator {var} an element locator
 * @param eventParams {var} additional parameter for the mouse-event to set. e.g. clientX.
 *            if no eventParams are set, defaults will be: left mousebutton, all keys false and all coordinates 0
 * @return {void} 
 */
Selenium.prototype.doQxClickAt = function(locator, eventParams)
{
  var element = this.page().findElementOrNull(locator);
  var coordsXY = getClientXY(element);
  LOG.debug("computed coords: X=" + coordsXY[0] + " Y=" + coordsXY[1]);

  // TODO: very dirty no checking, maybe refactoring needed to get doQxClick and doQxClickAt to work smoothly together.
  var newEventParamString = eventParams + ",clientX=" + coordsXY[0] + ",clientY=" + coordsXY[1];
  LOG.debug("newEventParamString=" + newEventParamString);
  this.clickElementQx(element, newEventParamString);
};


/**
 * TODOC
 *
 * @type member
 * @param element {var} TODOC
 * @param eventParamString {var} TODOC
 * @return {void} 
 */
Selenium.prototype.clickElementQx = function(element, eventParamString)
{
  var additionalParamsForClick = new MouseEventParameters(eventParamString);

  triggerEvent(element, 'focus', false);
  triggerMouseEventQx('mouseover', element, additionalParamsForClick);
  triggerMouseEventQx('mousedown', element, additionalParamsForClick);
  triggerMouseEventQx('mouseup', element, additionalParamsForClick);
  triggerMouseEventQx('click', element, additionalParamsForClick);
  // do not blur or mouseout as additional events won't be fired correctly
// FIXME: include original "click" functionality
};

/**
 * Check wheather an qooxdoo Element is enabled or not
 *
 * @type member
 * @param locator {var} an element locator
 * @return {var} TODOC
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
    var qxObject = this.page().findElementOrNull(qxxLocator);

    return qxObject.getEnabled();
  }
  else
  {
    throw new SeleniumError("Error: No qooxdoo-Locator given. This command only runs with qooxdoo-Locators");
  }
};

// ****************************************
// qooxdoo-locator (qx=) and special (qxx=)
// ****************************************
/**
 * Finds an qooxdoo-Object (!) identified by qooxdoo userData attribute
 *  Note: Here the Selenium locator abstraction is used to get an js-object _not_ an DOM-element
 * 
 * locator syntax: qxx=oneId/childId1/childId2
 *   note: childs can also be found directly if their qooxdoo-Id is unique in the current application state
 *         if multiple id's exist in qooxdoo, the first found is used!
 * trailing and preceeding "/" are invalid (like qx=/el1/el2/) and will be ignored
 * also surplus "/" are ignored (like qx=el1//el2)
 *
 * @type member
 * @param qxLocator {var} TODOC
 * @param inDocument {var} TODOC
 * @param inWindow {var} TODOC
 * @return {var} TODOC
 */
PageBot.prototype.locateElementByQxx = function(qxLocator, inDocument, inWindow)
{
  LOG.info("Locate qooxdoo-Object by qooxdoo-UserData-Locator=" + qxLocator + ", inDocument=" + inDocument + ", inWindow=" + inWindow);

  var qxObject = this._findQxObjectInWindow(qxLocator, inWindow);

  if (qxObject) {
    return qxObject;
  }
};


/**
 * Finds an element identified by qooxdoo userData attribute
 * 
 * locator syntax: qx=oneId/childId1/childId2
 *   note: childs can also be found directly if their qooxdoo-Id is unique in the current application state
 *         if multiple id's exist in qooxdoo, the first found is used!
 * trailing and preceeding "/" are invalid (like qx=/el1/el2/) and will be ignored
 * also surplus "/" are ignored (like qx=el1//el2)
 *
 * @type member
 * @param qxLocator {var} TODOC
 * @param inDocument {var} TODOC
 * @param inWindow {var} TODOC
 * @return {var} TODOC
 */
PageBot.prototype.locateElementByQx = function(qxLocator, inDocument, inWindow)
{
  LOG.info("Locate Element by qooxdoo-UserData-Locator=" + qxLocator + ", inDocument=" + inDocument + ", inWindow=" + inWindow);

  var qxObject = this._findQxObjectInWindow(qxLocator, inWindow);

  if (qxObject) {
    return qxObject.getElement();
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
 * @param qxLocator {var} TODOC
 * @param inDocument {var} TODOC
 * @param inWindow {var} TODOC
 * @return {null | var} TODOC
 * @throws TODOC
 */
PageBot.prototype.locateElementByQxp = function(qxLocator, inDocument, inWindow)
{
  LOG.info("Locate Element by qooxdoo-UserData-XPath-Locator=" + qxLocator + ", inDocument=" + inDocument + ", inWindow=" + inWindow);

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

  var qxElement = qxObject.getElement();
  var resultElement = this._findElementUsingFullXPath('descendant::' + xpathPart, qxElement, inWindow);
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
 * @param qxLocator {var} TODOC
 * @param inDocument {var} TODOC
 * @param inWindow {var} TODOC
 * @return {var | null} TODOC
 */
PageBot.prototype.locateElementByQxh = function(qxLocator, inDocument, inWindow)
{
  LOG.info("Locate Element by qooxdoo-Object-Hierarchy-Locator=" + qxLocator + ", inDocument=" + inDocument + ", inWindow=" + inWindow);

  var qxObject = this._findQxObjectInWindowQxh(qxLocator, inWindow);

  if (qxObject) {
    return qxObject.getElement();
  } else {
    return null;
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

  if (inWindow.qx)
  {
    LOG.debug("qxLocator: qooxdoo seems to be present in AUT window. Try to get the Instance");
    qxAppRoot = inWindow.qx.core.Init.getInstance().getApplication();
    this._globalQxObject = inWindow.qx;
  }

  // qxAppRoot = inWindow.qx.ui.core.ClientDocument.getInstance();
  else
  {
    LOG.error("qx-Locator: qx-Object not defined. inWindow=" + inWindow + ", inWindow.qx=" + inWindow.qx);

    // do not throw here, as if the locator fails in the first place selenium will call this
    // again with all frames (and windows?) which won't result in "element not found" but in
    // qooxdoo not beeing availabel.
    return null;
  }

  LOG.debug("qxLocator All basic checks passed.");

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

  // the AUT window must contain the qx-Object
  if (inWindow.qx)
  {
    LOG.debug("qxLocator: qooxdoo seems to be present in AUT window. Try to get the Instance using (qx.ui.core.ClientDocument.getInstance())");
    qxResultObject = inWindow.qx.ui.core.ClientDocument.getInstance();
  }
  else
  {
    LOG.error("qx-Locator: qx-Object not defined. inWindow=" + inWindow + ", inWindow.qx=" + inWindow.qx);

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
    LOG.debug("qxResultObject=" + qxResultObject + ", element=" + qxResultObject.getElement());
    return qxResultObject;
  }
  else
  {
    LOG.error("qx-locator: element not found for locator: qx-locator=" + qxLocator);

    // have to throw this error, as otherwise Selenium will loop through all frames an cause an
    // unexpected error trying to access qx
    throw new SeleniumError("qooxdoo-Element " + qxLocator + " not found");
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
  // some regexps
  var IDENTIFIER = new RegExp('^[a-z$][a-z0-9_\.$]*$', 'i');
  var NTHCHILD = /^child\[\d+\]$/i;
  var ATTRIB = /^\[.*\]$/;

  if (path.length == 0) {
    return null;
  }

  if (root == null) {
    throw new SeleniumError("QxhPath: Cannot determine descendant from null root for: " + path);
  }

  var el = null;  // the yet to find current element
  var step = path[0];  // the current part of the QPath expression

  LOG.debug("Qxh Locator: Inspecting current step: " + step);

  // get a suitable element from the current step, dispatching on step type
  if (step.match(IDENTIFIER))
  {
    if (step.indexOf('qx.') != 0)  // 'foo' format
    {
      el = this._getQxElementFromStep1(root, step);  // i seem to be loosing 'this' in the recursion?!
    }

    // el = PageBot.prototype._getQxElementFromStep1(root,step);
    else
    {  // 'qx....' format
      el = this._getQxElementFromStep2(root, step);
    }
  }

  // el = PageBot.prototype._getQxElementFromStep2(root,step);
  else if (step.match(NTHCHILD))  // 'child[n]' format
  {
    el = this._getQxElementFromStep3(root, step);
  }

  // el = PageBot.prototype._getQxElementFromStep3(root, step);
  else if (step.match(ATTRIB))  // '[@..=...]' format
  {
    el = this._getQxElementFromStep4(root, step);
  }

  // el = PageBot.prototype._getQxElementFromStep4(root, step);
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
  var npath = path.slice(1);

  if (npath.length == 0) {
    return el;
  }
  else
  {
    // basically we tail recurse, but catch exceptions
    try {
      var res = this._searchQxObjectByQxHierarchy(el, npath);
    }
    catch(e)
    {
      if (e.a instanceof Array)
      {
        // prepend the current step
        e.a.unshift(step);
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

// 'button1' (from 'w.button1')
/**
 * TODOC
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
      return root[member];
    }
  }

  return null;
};

// 'qx.ui.form.Button'
/**
 * TODOC
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

  childs = this._getQxNodeDescendants(root);

  for (var i=0; i<childs.length; i++)
  {
    curr = childs[i];

    if (curr instanceof qxclass) {
      return curr;
    }
  }

  return null;
};

// 'child[3]'
/**
 * TODOC
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
  m = /child\[(\d+)\]/i.exec(childspec);

  if ((m instanceof Array) && m.length > 1) {
    idx = m[1];
  } else {
    return null;
  }

  childs = this._getQxNodeDescendants(root);

  if (idx < 0 || idx >= childs.length) {
    return null;
  } else {
    return childs[idx];
  }
};

// '[@label="hugo"]'
/**
 * TODOC
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
  var curr;
  var m;

  // var iWindow = this.getCurrentWindow(); // need to get to qx.Class
  // var iWindow = Window;
  function getQx(obj)
  {
    if (!obj) {
      return null;
    }

    if (!obj.superclass) {
      return obj;  // qx hopefully
    } else {
      arguments.callee(obj.superclass);
    }
  }

  /*
  var globalQxObject = getQx(root.constructor); // have to use constructor to get superclass
   //if ((! iWindow) || (! iWindow.qx))
  if (! globalQxObject)
  {
    throw new SeleniumError("Qxh Locator: Need global qx object to search by attribute");
  } else 
  {
    //var qx = iWindow.qx;
    var qx = globalQxObject;
  }
  */

  if (this._globalQxObject) {
    var qx = this._globalQxObject;
  } else {
    throw new SeleniumError("Qxh Locator: Need global qx object to search by attribute");
  }

  // extract attribute and value
  m = /\[@([^=]+)=(.+)\]$/.exec(attribspec);

  if ((m instanceof Array) && m.length > 2)
  {
    attrib = m[1];
    attval = m[2];

    // strip possible quotes from attval
    if (attval.match(/^['"].*['"]$/)) {
      attval = attval.slice(1, attval.length - 1);
    }

    // it's nice to match against regexp's
    rattval = new RegExp(attval);
  }
  else
  {
    return null;
  }

  /*
  if (!root.getChildren)
  {
    throw new SeleniumError("QxhPath: Not traversing a widget hierarchy (built with add())");
  } else
  {
    childs = root.getChildren();
  }
  */

  childs = this._getQxNodeDescendants(root);

  for (var i=0; i<childs.length; i++)
  {
    curr = childs[i];

    // check properties first
    // var qxclass = qx.Class.getByName(curr.classname);
    var hasProp = qx.Class.hasProperty(curr.constructor, attrib);  // see qx.Class API

    if (hasProp)
    {
      var currval = curr.get(attrib);
      LOG.debug("Qxh Locator: Attribute Step: Checking for qooxdoo property ('" + attrib + "' is: " + currval + ")");

      if (currval.match(rattval)) {
        return curr;
      }
    }

    // then, check normal JS attribs
    else if ((attrib in curr) && ((curr[attrib]).match(rattval)))
    {
      LOG.debug("Qxh Locator: Attribute Step: Checking for JS object property");
      return curr;
    }

    // last, if it is a @label attrib, try check the label of the widget
    else if (/^label$/i.exec(attrib))
    {
      LOG.debug("Qxh Locator: Attribute Step: Checking for qooxdoo widget label");

      // try getLabel() method
      if (curr.getLabel)
      {
        if ((curr.getLabel()).match(rattval)) {
          return curr;
        }
      }
    }
    else
    {
      LOG.debug("Qxh Locator: Attribute Step: No match for current child");
    }
  }

  return null;
};  // _getQxElementFromStep4()

// using different approaches to locate a node's direct descendants (children of some kind)
/**
 * TODOC
 *
 * @type member
 * @param node {Node} TODOC
 * @return {var} TODOC
 */
PageBot.prototype._getQxNodeDescendants = function(node)
{
  var descArr = [];

  // check TreeFolder items
  if (node.getItems) {
    descArr.concat(node.getItems());
  }

  // check widget children (built with w.add())
  else if (node.getChildren) {
    descArr.concat(node.getChildren());
  }

  // use JS object members
  else
  {
    for (var m in node) {
      descArr.push(node[m]);
    }
  }

  return descArr;
};  // _getQxNodeDescendants()
