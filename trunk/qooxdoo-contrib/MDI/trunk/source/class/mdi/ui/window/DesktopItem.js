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
 * This class is responsible for managing Window instances and their
 * coresponding representations on a Dock.
 */
qx.Class.define("mdi.ui.window.DesktopItem",
{


  extend : qx.ui.window.Window,


  implement : [mdi.ui.window.core.IWidget,
               mdi.ui.window.core.IBehaviour],

  include : [mdi.ui.window.core.MBehaviour],


  members :
  {


    // A local reference to the window Manager.
    // This must be set after construction.
    __manager : null,


    /**
     * Set this DesktopItem's WindowManager.
     *
     * @type member
     * @param manager {mdi.ui.window.core.IManager} A WindowManager.
     */
    setWindowManager : function(manager)
    {
        this.__manager = manager;
    },


    /**
     * Get this DesktopItem's WindowManager.
     *
     * @type member
     * @return {mdi.ui.window.core.IManager} The WindowManager instance.
     */
    getWindowManager : function()
    {
        return this.__manager;
    },


    /**
     * Set this DesktopItem's IRenderer (most likely a Desktop).
     *
     * @type member
     * @param manager {mdi.ui.window.core.IRenderer} A renderer.
     */
    setRenderer : function(desktop)
    {
        this.__renderer = desktop;
    },


    /**
     * Get this DesktopItem's Desktop.
     *
     * @type member
     * @return {mdi.ui.window.core.IRenderer} The renderer instance.
     */
    getRenderer : function()
    {
        return this.__renderer;
    },


    //  -----  Implement IWidget  -----


    // A local reference to the logical window Model which this Window
    // widget represents.
    __model : null,


    /**
     * Set the logical window Model which this widget represents.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Model instance which this
     *        rendered widget represents.
     * @return {void}
     */
    setModel : function(model)
    {
        this.__model = model;
    },


    /**
     * Get the logical window Model which this widget represents.
     *
     * @type member
     * @return {mdi.ui.window.Model} A Model instance which this
     *        rendered widget represents.
     */
    getModel : function()
    {
        return this.__model;
    },


    //  -----  Override qx.ui.window.Window#minimize  -----


    /**
     * Delegate from the American spelt method provided by qx.ui.window.Window
     * to the English spelt method which is required by the interfaces in the
     * mdi.ui.window package.
     */
    // overridden
    minimize : function()
    {
        this.minimise(arguments[0]);
    },


    //  -----  Override qx.ui.window.Window#maximize  -----


    /**
     * Delegate from the American spelt method provided by qx.ui.window.Window
     * to the English spelt method which is required by the interfaces in the
     * mdi.ui.window package.
     */
    // overridden
    maximize : function()
    {
        this.maximise(arguments[0]);
    },


    //  -----  Override qx.ui.window.Window#_applyActive  -----


    // overridden
    _applyActive : function(value, old)
    {
        if (old) {
            this.removeState("active");
        }
        else {
            this.addState("active");

            // pass null to imply that this call represents a user gesture
            // I.e., this is a call "up" from the rendered widget rather than
            // a call "down" from the WindowManager.
            this.select(null);
        }
    },


    //  -----  Override qx.ui.window.Window#setLayoutParent  -----


    // overridden
    setLayoutParent : function(parent)
    {
        // Must override qx.ui.window.Window#setLayoutParent because it
        // only allows Windows to be added to qx.ui.window.IDesktop

        // There is no official "Qooxdoo" way of invoking super.super, so...
        qx.ui.core.Widget.prototype.setLayoutParent.call(this, parent);
    },


    //  -----  Implement IBehaviour  -----


    /**
     * Select this window representation.
     *
     * @type member
     * @return {void}
     */
    __select : function()
    {
        // Use qx.ui.window.Window#select.
        qx.ui.window.Window.prototype.open.call(this);
    },


    /**
     * Minimise this window representation.
     *
     * @type member
     * @return {void}
     */
    __minimise : function()
    {
        // Use qx.ui.window.Window#minimize.
        qx.ui.window.Window.prototype.minimize.call(this);
    },


    /**
     * Maximise this window representation.
     *
     * @type member
     * @return {void}
     */
    __maximise : function()
    {
        // Use qx.ui.window.Window#maximize.
        qx.ui.window.Window.prototype.maximize.call(this);
    },


    /**
     * Maximise this window representation.
     *
     * @type member
     * @return {void}
     */
    __restore : function()
    {
        // Use qx.ui.window.Window#restore.
        qx.ui.window.Window.prototype.restore.call(this);
    },


    /**
     * Open this window representation.
     *
     * @type member
     * @return {void}
     */
    __open : function()
    {
        this.removeState("closed");

        // Use qx.ui.window.Window#open.
        qx.ui.window.Window.prototype.open.call(this);
    },


    /**
     * Close this window representation.
     *
     * @type member
     * @return {void}
     */
    __close : function()
    {
        this.addState("closed");

        // Use qx.ui.window.Window#close.
        qx.ui.window.Window.prototype.close.call(this);
    }

  }
});
