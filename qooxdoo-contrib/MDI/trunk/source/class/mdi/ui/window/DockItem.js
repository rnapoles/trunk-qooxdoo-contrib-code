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
 * A DockItem is one of many possible representations of a LogicalWindow
 * (mdi.ui.window.Model).
 *
 * mdi.ui.window.DockItem instances are intended to be rendered by a
 * mdi.ui.window.Dock.
 */
qx.Class.define("mdi.ui.window.DockItem",
{


  extend : qx.ui.toolbar.RadioButton,


  implement : [mdi.ui.window.core.IWidget,
               mdi.ui.window.core.IBehaviour],

  include : [mdi.ui.window.core.MBehaviour],


  members :
  {


    // A local reference to the window Manager.
    // This must be set after construction.
    __manager : null,


    /**
     * Set this DockItem's WindowManager.
     *
     * @type member
     * @param manager {mdi.ui.window.core.IManager} A WindowManager.
     */
    setWindowManager : function(manager)
    {
        this.__manager = manager;
    },


    /**
     * Get this DockItem's WindowManager.
     *
     * @type member
     * @return {mdi.ui.window.core.IManager} The WindowManager instance.
     */
    getWindowManager : function()
    {
        return this.__manager;
    },


    /**
     * Set this DockItem's IRenderer (most likely a Dock).
     *
     * @type member
     * @param dock {mdi.ui.window.core.IRenderer} A renderer.
     */
    setRenderer : function(renderer)
    {
        this.__renderer = renderer;
    },


    /**
     * Get this DockItem's IRenderer.
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


    //  -----  Implement IBehaviour  -----


    /**
     * Select this window representation.
     *
     * @type member
     * @param invoker {mdi.ui.window.core.IRenderer} The Renderer that owns this
     *        logical window representation -- very probably a Dock instance.
     * @return {void}
     */
    __select : function(invoker)
    {
        this.getGroup().setSelection([this]);
    },


    /**
     * Minimise this window representation.
     *
     * @type member
     * @param invoker {mdi.ui.window.core.IRenderer} The Renderer that owns this
     *        logical window representation -- very probably a Dock instance.
     * @return {void}
     */
    __minimise : function(invoker)
    {
        this.getGroup().setSelection([]);
    },


    /**
     * Maximise this window representation.
     *
     * @type member
     * @param invoker {mdi.ui.window.core.IRenderer} The Renderer that owns this
     *        logical window representation -- very probably a Dock instance.
     * @return {void}
     */
    __maximise : function(invoker)
    {
        // No behaviour required on maximise
    },


    /**
     * Restore this window representation.
     *
     * @type member
     * @param invoker {mdi.ui.window.core.IRenderer} The Renderer that owns this
     *        logical window representation -- very probably a Dock instance.
     * @return {void}
     */
    __restore : function(invoker)
    {
        this.getGroup().setSelection([this]);
    },


    /**
     * Close this window representation.
     *
     * @type member
     * @param invoker {mdi.ui.window.core.IRenderer} The Renderer that owns this
     *        logical window representation -- very probably a Dock instance.
     * @return {void}
     */
    __close : function(invoker)
    {
        this.addState("closed");
    },


    /**
     * @override qx.ui.window.Window#open
     *
     * Open this window representation.
     *
     * Note that this method can only ever be called by the IRenderer that
     * owns this Window.
     *
     * @type member
     * @param invoker {mdi.ui.window.core.IRenderer} The Renderer that owns this
     *        logical window representation -- very probably a Dock instance.
     * @return {void}
     */
    __open : function(invoker)
    {
        this.removeState("closed");
    }


  }
});
