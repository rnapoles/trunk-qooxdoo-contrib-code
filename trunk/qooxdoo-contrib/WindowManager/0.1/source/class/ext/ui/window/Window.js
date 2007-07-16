/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Authors:
     * Simon Bull (sbull)

************************************************************************ */

/* ************************************************************************

#module(ui_window)

************************************************************************ */


/*
This class is intended to be used as a superclass for "application" like
windows which run within a single paged qooxdoo client.  If a Window
needs to communicate with business services, it is intended that it do so
via ajax so that the browser need never reload the page.

When used in conjunction with the ext.manager.object.WindowManager class,
Windows can be used to support an "OS like" paradigm where multiple MDI
applications can be open within a single browser instance.

To achieve this illusion, it is recommended that the qooxdoo client be run
from a chromeless browser whose default hot keys are all disabled.  This
prevents the user from pressing "Back", for instance.


This class extends qx.ui.window.Window with the following additional features:

A basic mechanism for overriding the default statusbar with a customised
statusbar class.

A minimised Atom which represents this Window while it is in minimised state.
Double clicking the Atom will restore the Window.

Optional focus blocker which prevents the user from clicking widgets contained
in this Window while it is in the background.  A click will instead bring this
Window into focus.

Optional busy blocker which prevents the user from clicking widgets contained
in this Window while it is awaiting an ahax response (and thus sending multiple
requests for the same data).

@param vCaption {String} A caption to show in this Window's title bar.
@param vIcon {String} The path to an icon to show in this Window's title bar.
@param vMinimisedIcon {String} The path to an icon to represent this Window
                      when it is in a minimised state.
@param vWindowManager {ext.manager.object.WindowManager} A WindowManager
                      instance which will manager this Window.

@author sbull
*/
qx.OO.defineClass("ext.ui.window.Window", qx.ui.window.Window,
function(vCaption, vIcon, vMinimisedIcon, vWindowManager)
{

  qx.ui.window.Window.call(this, vCaption, vIcon, vWindowManager);


  // ************************************************************************
  //   STATUSBAR
  // ************************************************************************

  // Allow for custom statusbars.
  // As of this demo, each Window subclass must override this code to
  // customise its own statusbar.  It would be nicer to pass a statusbar
  // to the constructor, or have a setter.  To be discussed with the qx guys.
  this._statusBar = new ext.ui.window.StatusBar();
  this._statusBar.setAppearance("window-statusbar");


  // ************************************************************************
  //   UNDO MANAGER
  // ************************************************************************

  // This is beyond the scope of this demo
  //var um = this._undoMgr = new ext.manager.object.UndoManager();
  var um = this._undoMgr = {};


  // ************************************************************************
  //   MINIMISED ICON
  // ************************************************************************

  if (qx.util.Validation.isValidString(vMinimisedIcon))
  {
    var a = this._atom = new qx.ui.basic.Atom(vCaption, vMinimisedIcon);
    a.setIconPosition("top");
    a.addEventListener("dblclick", this._handleatomdblclick, this);
  }


  // ************************************************************************
  //   BLOCKER : FOCUS
  // ************************************************************************

  var fb = this._focusBlocker = new qx.ui.basic.Terminator;
  fb.setAppearance("window-focus-blocker");

  fb.addEventListener("click", this._onfocusblockerclick, this);
  fb.addEventListener("mousedown", this._onblockermousedown, this);


  // ************************************************************************
  //   BLOCKER : BUSY
  // ************************************************************************

  var bb = this._busyBlocker = new qx.ui.basic.Terminator;
  bb.setAppearance("window-busy-blocker");

  bb.addEventListener("click", this._onfocusblockerclick, this);
  bb.addEventListener("mousedown", this._onblockermousedown, this);

  // A counter to determine whether this window should be busy
  this._pendingTasks = 0;


  // ************************************************************************
  //   DEFAULT MINIMUM SIZE
  // ************************************************************************
  // Allows overflow settings to work properly
  this.setMinWidth(200);
  this.setMinHeight(150);

});


/*
---------------------------------------------------------------------------
  PROPERTIES
---------------------------------------------------------------------------
*/



/*!
  The name of the icon to represent this window when it is minimised.
  Should be of the form "mime-html" not "icon/64/mimetypes/text-html.png".
*/
qx.OO.addProperty({ name : "minimisedIcon", type : "string" });


/*!
  A flag that indicates whether this window is in the closed state.  This is
  set to true after a window's close button is clicked.

  Note that this flag is only necessary because dispose does not yet work
  properly for windows.

  TODO remove this property?
*/
qx.OO.addProperty({ name : "isClosed", type : "boolean", defaultValue : false });


/*!
  If true then this window must be explicitly clicked to bring it into focus.
*/
qx.OO.addProperty({ name : "clickToFocus", type : "boolean", defaultValue : true });


/*!
  This property maintains a private piece of state for this window.  It should
  not be modified by external code.

  True if this window is currently blocked because its clickToFocus is set to
  true and it is not the active window, otherwise false.

  Defaults to false because even if clickToFocus is true, because when a window
  is initially created it is in the active state - and therefore has focus.
*/
qx.OO.addProperty({ name : "isFocusBlocked", type : "boolean", defaultValue : false });


/*!
  This property maintains a private piece of state for this window.  It should
  not be modified by external code.

  True if this window is currently waiting for a response from an external
  service.  While isBusyBlocked is true this window will be unresponsive to
  further user interaction.
*/
qx.OO.addProperty({ name : "isBusyBlocked", type : "boolean", defaultValue : false });


/*
---------------------------------------------------------------------------
  CONSTANTS
---------------------------------------------------------------------------
*/


ext.ui.window.Window.BLOCKER_BUSY         = "busy-blocker";
ext.ui.window.Window.BLOCKER_FOCUS        = "focus-blocker";

ext.ui.window.Window.BLOCKER_CLIENT_DOC_Z = 3;

ext.ui.window.Window.BLOCKER_BUSY_Z       = 2;
ext.ui.window.Window.BLOCKER_FOCUS_Z      = 1;

ext.ui.window.Window.MINIMISE_ICON_SIZE   = 1;

qx.Clazz.STATE_MINIMISED                  = "minimised";


/*
---------------------------------------------------------------------------
  UTILITIES
---------------------------------------------------------------------------
*/


qx.Proto.getUndoManager = function() {
  return this._undoMgr;
}


qx.Proto.getFocusBlocker = function() {
  return this._focusBlocker;
}


qx.Proto.getBusyBlocker = function() {
  return this._busyBlocker;
}


qx.Proto.getMinimisedAtom = function() {
  return this._atom;
}


/*
---------------------------------------------------------------------------
  HIDE qx.ui.window.Window's STATUS METHODS
---------------------------------------------------------------------------
*/


qx.Proto.setStatus = function()
{
    this.warn("qx.ui.window.Window's setStatus() is hidden by ext.ui.window.Window.");
}

qx.Proto.getStatus = function()
{
    this.warn("qx.ui.window.Window's getStatus() is hidden by ext.ui.window.Window.");
}

qx.Proto._modifyStatus = function()
{
    this.warn("qx.ui.window.Window's _modifyStatus() is hidden by ext.ui.window.Window.");
}


/*
---------------------------------------------------------------------------
  MODIFIERS
---------------------------------------------------------------------------
*/


/*!
  Override qx.ui.window.Window._modifyModal so that we can apply our blocker.
*/
qx.Proto._modifyModal = function(propValue, propOldValue, propData)
{

  // Inform blocker
  if (this._initialLayoutDone && this.getVisibility() && this.getDisplay())
  {
    var vTop = this.getTopLevelWidget();
    propValue ? vTop.block(this) : vTop.release(this);
  }
  return true;
}


/*!
  Override qx.ui.window.Window._modifyActive so that we can apply our blocker
  when this window is inactive.
*/
qx.Proto._modifyActive = function(propValue, propOldValue, propData)
{
  //this.debug("_modifyActive(1) propValue=" + propValue + ", propOldvalue=" + propOldValue + ", propData=" + propData);
  if (propOldValue)
  {
    if (this.getFocused()) {
      this.setFocused(false);
    }

    if (this.getWindowManager().getActiveWindow() == this) {
      this.getWindowManager().setActiveWindow(null);
    }

    this.removeState("active");
    this._captionBar.removeState("active");

    if (   this.getClickToFocus() ) {
      this.setIsFocusBlocked(true);
    }
  }
  else
  {
    // Switch focus
    // Also do this if gets inactive as this moved the focus outline
    // away from any focused child.
    if (!this.getFocusedChild()) {
      this.setFocused(true);
    }

    this.getWindowManager().setActiveWindow(this);
    this.bringToFront();

    this.addState("active");
    this._captionBar.addState("active");

    if (this.getClickToFocus()) {
      this.setIsFocusBlocked(false);
    }
  }

  return true;
}


qx.Proto._modifyIsFocusBlocked = function(propValue, propOldValue, propData)
{
  if (propOldValue)
  {
    this._unblock(ext.ui.window.Window.BLOCKER_FOCUS);
  }
  else
  {
    this._block(ext.ui.window.Window.BLOCKER_FOCUS);
  }
  return true;
}


qx.Proto._modifyIsBusyBlocked = function(propValue, propOldValue, propData)
{
  if (propOldValue)
  {
    this._unblock(ext.ui.window.Window.BLOCKER_BUSY);
    this._statusBar.setStateTextValue("Ready");
    this._statusBar.setStateTextAppearance("statusbar-text-field");
  }
  else
  {
    this._block(ext.ui.window.Window.BLOCKER_BUSY);
    this._statusBar.setStateTextValue("Busy");
    this._statusBar.setStateTextAppearance("statusbar-text-field-busy");
  }

  // Ensure that UI is updated immediately
  qx.ui.core.Widget.flushGlobalQueues();

  return true;
}


/*
---------------------------------------------------------------------------
  SETUP / TEAR DOWN
---------------------------------------------------------------------------

*/


/*
  Set up this window -- which may be a brand new instance, or which may
  be a recycled instance pulled out of a Pool.

  Initialise local state.

  Add any eventListeners.
*/
qx.Proto.setUp = function()
{
  this.setIsClosed(false);
}


/*
  Teardown this window so that it is ready to be returned to a Pool of
  instances.

  Ensure that we remove all local state.

  Remove any eventListeners.
*/
qx.Proto.tearDown = function()
{

  if (this.getClickToFocus())
  {
    this.setIsFocusBlocked(false);
    this.removeTask();
  }

  this.setIsClosed(true);
  this._pendingTasks = 0;
}


/*
---------------------------------------------------------------------------
  Z-INDEX POSITIONING
---------------------------------------------------------------------------
*/


qx.Proto._sendTo = function()
{
  var vAll = (this.getWindowManager().getTrimmedAll()).sort(qx.util.Compare.byZIndex);
  var vLength = vAll.length;
  var vZ = this._minZIndex;
  for (var i=0; i<vLength; i++) {
    // Leave z-index for this._focusBlocker
    vZ += ext.ui.window.Window.BLOCKER_FOCUS_Z;

    // Leave z-index for this._busyBlocker
    vZ += ext.ui.window.Window.BLOCKER_BUSY_Z;

    vAll[i].setZIndex(vZ);

    if (vAll[i].getIsFocusBlocked()) {
      // Update vAll[i]._focusBlocker's z-index
//this.debug("_sendTo() vZ=" + vZ);
//this.debug("_sendTo() ext.ui.window.Window.BLOCKER_FOCUS_Z=" + ext.ui.window.Window.BLOCKER_FOCUS_Z);
//this.debug("_sendTo() vZ + ext.ui.window.Window.BLOCKER_FOCUS_Z=" + (vZ + ext.ui.window.Window.BLOCKER_FOCUS_Z));
      vAll[i]._focusBlocker.setZIndex(vZ + ext.ui.window.Window.BLOCKER_FOCUS_Z);
    }

    if (vAll[i].getIsBusyBlocked()) {
      // Update vAll[i]._busyBlocker's z-index last so that it is on top
      vAll[i]._busyBlocker.setZIndex(vZ + ext.ui.window.Window.BLOCKER_BUSY_Z);
    }
  }
}


/*
---------------------------------------------------------------------------
  BLOCK/UNBLOCK
---------------------------------------------------------------------------
*/


qx.Proto._block = function(blockerType)
{
  var p = this.getParent();
  var l = this.getLeft();
  var t = this.getTop();
  var w = this.getWidth();
  var h = this.getHeight();
  var z = this.getZIndex();
  var b = null;

  if (blockerType == ext.ui.window.Window.BLOCKER_FOCUS) {
    b = this._focusBlocker;
    z += ext.ui.window.Window.BLOCKER_FOCUS_Z;
  }
  else if (blockerType == ext.ui.window.Window.BLOCKER_BUSY) {
    b = this._busyBlocker;
    z += ext.ui.window.Window.BLOCKER_BUSY_Z;
  }
  else {
    this.warn("_block() unsupported arg: blockerType=" + blockerType);
  }

  // Add this._focusBlocker to this.getParent
  //this.debug("block() before block " + blockerType);
  if (b.getParent() != p)
  {
    b.setParent(p);
  }
  b.setVisibility(true);
  //this.debug("block() after block " + blockerType);

  // Make this._focusBlocker the same size as this window
  b.setSpace(l, w, t, h);
  b.setZIndex(z);
}


qx.Proto._unblock = function(blockerType)
{
  var b = null;

  if (blockerType == ext.ui.window.Window.BLOCKER_FOCUS) {
    var b = this._focusBlocker;
  }
  else if (blockerType == ext.ui.window.Window.BLOCKER_BUSY) {
    var b = this._busyBlocker;
  }
  else {
    this.warn("_unblock() unsupported arg: blockerType=" + blockerType);
  }

  //this.debug("_unblock() before unblock " + blockerType);
  b.setVisibility(false);
  //this.debug("_unblock() after unblock " + blockerType);
}


/*
---------------------------------------------------------------------------
  EVENTS : BLOCKERS
---------------------------------------------------------------------------
*/


qx.Proto._onblockermousedown = function(e)
{
  e.stopPropagation();
}


qx.Proto._onfocusblockerclick = function(e)
{
  this.setActive(true);
  e.stopPropagation();
}


/*
This method increments the pendingTask count to indicate that another ajax call
is in progress.  This Window will be marked as busy while there is at least one
pending task.
*/
qx.Proto.addTask = function()
{
    this._pendingTasks++;
    if (this._pendingTasks >= 1)
    {
        this.setIsBusyBlocked(true);
    }
}


/*
This method decrements the pendingTask count to indicate that another ajax call
has returned.  This window will be marked as ready if there are no pending
tasks.
*/
qx.Proto.removeTask = function()
{
    this._pendingTasks--;
    if (this._pendingTasks <= 0)
    {
        this.setIsBusyBlocked(false);
        this._pendingTasks = 0;
    }
}


/*
---------------------------------------------------------------------------
  MAXIMISE / MINIMISE
---------------------------------------------------------------------------
*/


/*!
  Override qx.ui.window.Window._maximize to check whether this window is
  managed by a ext.manager.object.WindowManager.  If it is, allow the window
  manager to handle maximising this window.
*/
qx.Proto._maximize = function()
{
  if (this.hasState("maximized"))
  {
    return;
  }

  // store current dimension and location
  this._previousLeft = this.getLeft();
  this._previousWidth = this.getWidth();
  this._previousRight = this.getRight();
  this._previousTop = this.getTop();
  this._previousHeight = this.getHeight();
  this._previousBottom = this.getBottom();

  // --------------------------------------------------( Start of new code )---
  var wm = this.getWindowManager();
  if (wm.classname == "ext.manager.object.WindowManager")
  {
    wm.maximiseWindow(this);
  }
  else {
  // -----------------------------------------------------( End of new code )---

    // setup new dimension and location
    this.setWidth(null);
    this.setLeft(0);
    this.setRight(0);
    this.setHeight(null);
    this.setTop(0);
    this.setBottom(0);
  }

  // update state
  this.addState("maximized");

  // toggle button
  if (this.getShowMaximize())
  {
    var cb = this._captionBar;
    var v = cb.indexOf(this._maximizeButton);

    cb.remove(this._maximizeButton);
    cb.addAt(this._restoreButton, v);
  }

  // finally focus the window
  this.focus();
}


qx.Proto._minimize = function()
{

  qx.ui.window.Window.prototype._minimize.call(this);


  // Allow minimise strategy to place restore-from-minimised atom
  var wm = this.getWindowManager();
  if (wm.classname == "ext.manager.object.WindowManager")
  {
    wm.minimiseWindow(this);
  }

  // Remove focus blocker
  this.setIsFocusBlocked(false);

  // Focus next highest z-order window
  var w = wm.getTopWindow();
  if (w != null) {
    wm.setActiveWindow(w);
  }

  this.addState(ext.ui.window.Window.STATE_MINIMISED);

}




/*
---------------------------------------------------------------------------
  EVENTS : BUTTONS
---------------------------------------------------------------------------
*/


/*!
  Override qx.ui.window.Window._onclosebuttonclick so that we can remove any
  blockers and then throw a window-closed event.
*/
qx.Proto._onclosebuttonclick = function(e)
{
  //  This is to ensure window is not maximised when it is being re-openned.
  if (this.hasState("maximized")) {

      this.restore();

      // we need to be sure that the button gets the right states after clicking
      // because the button will move and does not get the mouseup event anymore
      this._restoreButton.removeState("pressed");
      this._restoreButton.removeState("abandoned");
      this._restoreButton.removeState("over");
  }

  this.close();

  // we need to be sure that the button gets the right states after clicking
  // because the button will move and does not get the mouseup event anymore
  this._closeButton.removeState("pressed");
  this._closeButton.removeState("abandoned");
  this._closeButton.removeState("over");

  // e will be null if this method is invoked by code, rather than by a
  // runtime user gesture, so guard against null here.
  if (e != null) {
    e.stopPropagation();
  }

  // Allow close strategy to close this window
  var wm = this.getWindowManager();
  if (wm.classname == "ext.manager.object.WindowManager")
  {
    wm.closeWindow(this);
  }
};


/*
---------------------------------------------------------------------------
  EVENTS : MINIMSED ATOM
---------------------------------------------------------------------------
*/


qx.Proto._handleatomdblclick = function(e)
{

  // Remove atom from view
  this._atom.getParent().remove(this._atom);

  // Tell minimise strategy that this window has been restored
  var wm = this.getWindowManager();
  if (wm.classname == "ext.manager.object.WindowManager")
  {
    wm.restoreFromMinimised(this);
  }


  // Restore this window from minimised
  this.removeState(ext.ui.window.Window.STATE_MINIMISED);
  this.restore();
}



/*
---------------------------------------------------------------------------
  DISPOSER
---------------------------------------------------------------------------
*/


qx.Proto.dispose = function()
{
  if (this.getDisposed())
  {
    return true;
  }

  if (this._focusBlocker)
  {
    this._focusBlocker.removeEventListener("click", this._onfocusblockerclick, this);
    this._focusBlocker.removeEventListener("mousedown", this._onfocusblockermousedown, this);
    this._focusBlocker.dispose();
    this._focusBlocker = null;
  }

  if (this._busyBlocker)
  {
    this._busyBlocker.removeEventListener("click", this._onfocusblockerclick, this);
    this._busyBlocker.removeEventListener("mousedown", this._onfocusblockermousedown, this);
    this._busyBlocker.dispose();
    this._busyBlocker = null;
  }

  return qx.ui.window.Window.prototype.dispose.call(this);
}
