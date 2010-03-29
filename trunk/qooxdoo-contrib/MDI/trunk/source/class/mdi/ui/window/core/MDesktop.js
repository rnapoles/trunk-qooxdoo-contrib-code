/* ************************************************************************

   Copyright:


   License:

   Authors:
     Simon Bull

************************************************************************ */

/* ************************************************************************

#asset(mdi/*)

************************************************************************ */



/**
 * This mixin is coped vertabum from qx.ui.window.MDesktop, except where
 * members have been renamed to avoid namespace clashes with mdi.ui.window
 * .mdi classes.
 *
 * This implmentation provides the underlying rendering capability of
 * actual window widget instances.
 */
qx.Mixin.define("mdi.ui.window.core.MDesktop",
{
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * The currently active window
     */
    activeWindow :
    {
      // Renamed to support mdi.ui.window.*
      check : "mdi.ui.window.DesktopItem",
      apply : "_applyActiveWindow",
      init  : null,
      nullable : true
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {


    /**
     * A collection of mdi.ui.window.DesktopItem instances.
     */
    __windows : null,


    /**
     * qx.ui.window.Desktop#__manager has been rebranded as __desktopManager to
     * avoid name conflict with mdi.ui.window.Desktop#__manager.
     */
    __desktopManager : null,


    /**
     * Was qx.ui.window.Desktop#getWindowManager.
     * Renamed to avoid conflict with mdi.ui.window.core.IEventHandler#getWindowManager.
     *
     * Get the desktop's window manager. Each desktop must have a window manager.
     * If none is configured the default window manager {@link qx.ui.window.Window#DEFAULT_MANAGER_CLASS}
     * is used.
     */
    getDesktopWindowManager : function()
    {
      if (!this.__desktopManager)
      {
        //this.setDesktopWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
        this.setDesktopWindowManager(new qx.ui.window.Manager());
      }
      return this.__desktopManager;
    },


    /**
     * Was qx.ui.window.Desktop#setDesktopWindowManager.
     * Renamed to avoid conflict with mdi.ui.window.core.IEventHandler#setDesktopWindowManager.
     *
     * Sets the desktop's window manager
     *
     * @param manager {qx.ui.window.IWindowManager} The window manager
     */
    setDesktopWindowManager : function(manager)
    {
      if (this.__desktopManager) {
        this.__desktopManager.setDesktop(null);
      }

      manager.setDesktop(this);
      this.__desktopManager = manager;
    },


    /**
     * Whether the configured layout supports a maximized window
     * e.g. is a Canvas.
     *
     * @return {Boolean} Whether the layout supports maximized windows
     */
    supportsMaximize : function() {
      return true;
    },


    /**
     * Event handler. Called if one of the managed windows changes its active
     * state.
     *
     * @param e {qx.event.type.Event} the event object.
     */
    _onChangeActive : function(e)
    {
      if (e.getData()) {
        this.setActiveWindow(e.getTarget());
      } else if (this.getActiveWindow() == e.getTarget()) {
        this.setActiveWindow(null);
      }
    },


    // property apply
    _applyActiveWindow : function(value, old)
    {
      this.getDesktopWindowManager().changeActiveWindow(value, old);
      if (value) {
        value.setActive(true);
      }
      if (old) {
        old.resetActive();
      }
    },


    /**
     * Event handler. Called if one of the managed windows changes its modality
     *
     * @param e {qx.event.type.Event} the event object.
     */
    _onChangeModal : function(e) {
      this.getDesktopWindowManager().updateStack();
    },


    /**
     * Event handler. Called if one of the managed windows changes its visibility
     * state.
     */
    _onChangeVisibility : function() {
      this.getDesktopWindowManager().updateStack();
    },


    /**
     * Overrides the method {@link qx.core.Widget#_afterAddChild}
     *
     * @param win {qx.core.Widget} added widget
     */
    _afterAddChild : function(win)
    {
      if (qx.Class.isDefined("qx.ui.window.Window") && win instanceof qx.ui.window.Window) {
        this._addWindow(win);
      }
    },


    /**
     * Handles the case, when a window is added to the desktop.
     *
     * @param win {qx.ui.window.Window} Window, which has been added
     */
    _addWindow : function(win)
    {

      if (!qx.lang.Array.contains(this.getWindows(), win))
      {
        this.getWindows().push(win);
        win.addListener("changeActive", this._onChangeActive, this);
        win.addListener("changeModal", this._onChangeModal, this);
        win.addListener("changeVisibility", this._onChangeVisibility, this);
      }
      if (win.getActive()) {
        this.setActiveWindow(win);
      }

      this.getDesktopWindowManager().updateStack();
    },


    /**
     * Overrides the method {@link qx.core.Widget#_afterRemoveChild}
     *
     * @param win {qx.core.Widget} removed widget
     */
    _afterRemoveChild : function(win)
    {
      if (qx.Class.isDefined("qx.ui.window.Window") && win instanceof qx.ui.window.Window) {
        this._removeWindow(win);
      }
    },


    /**
     * Handles the case, when a window is removed from the desktop.
     *
     * @param win {qx.ui.window.Window} Window, which has been removed
     */
    _removeWindow : function(win)
    {
      qx.lang.Array.remove(this.getWindows(), win);
      win.removeListener("changeActive", this._onChangeActive, this);
      win.removeListener("changeModal", this._onChangeModal, this);
      win.removeListener("changeVisibility", this._onChangeVisibility, this);
      this.getDesktopWindowManager().updateStack();
    },


    /**
     * Get a list of all windows added to the desktop (including hidden windows)
     *
     * @return {qx.ui.window.Window[]} Array of managed windows
     */
    getWindows : function()
    {
      if (!this.__windows) {
        this.__windows = [];
      }
      return this.__windows;
    }


  },


  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeArray("__windows");
    this._disposeObjects("__manager");
  }


});