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
 * This is the minimum interface which must be implemented by all MDI
 * WindowManagers.
 *
 * @see mdi.ui.window.Manager
 */
qx.Interface.define("mdi.ui.window.core.IManager",
{


  members :
  {


    //  -----  Renderer Management  -----


    /**
     * Add a window Renderer to this WindowManager.
     *
     * @type member
     * @param renderer {mdi.ui.window.core.IRenderer} The window Renderer.
     * @return {void}
     */
    addRenderer : function(renderer)
    {
        this.assertInterface(renderer, mdi.ui.window.core.IRenderer);
    },


    /**
     * Get all window Renderers.
     *
     * @type member
     * @return [{mdi.ui.window.core.IRenderer}] An Array of window Renderers.
     */
    getAllRenderers : function() {},


    /**
     * Remove all window Renderers.
     *
     * @type member
     * @return {void}
     */
    removeAllRenderers : function() {},



    //  -----  Window Management  -----


    /**
     * Add a Window (via its Proxy) to this WindowManager.
     *
     * @type member
     * @param proxy {mdi.ui.window.Model} A window to add.
     * @return {void}
     */
    addWindow : function(proxy)
    {
        this.assertInterface(proxy, mdi.ui.window.Model);
    },


    /**
     * Remove a Window (via its Proxy) from this WindowManager.
     *
     * @type member
     * @param proxy {mdi.ui.window.Model} A window to remove.
     * @return {void}
     */
    removeWindow : function(proxy)
    {
        this.assertInterface(proxy, mdi.ui.window.Model);
    },


    /**
     * Remove all managed Windows (via their proxies).
     *
     * @type member
     * @return {void}
     */
    removeAllWindows : function() {},


    /**
     * Ask whether this WindowManager is managing a Window instance.
     *
     * @type member
     * @param proxy {mdi.ui.window.Model} A Window instance.
     * @return {boolean} True if this WindowManager is managing the Window,
     *         else false if it is not.
     */
    hasWindow : function(proxy)
    {
        this.assertInterface(proxy, mdi.ui.window.Model);
    },


    /**
     * Ask whether this WindowManager has at least one Window of a named type.
     *
     * @type member
     * @param windowTypeName {String} The name of a Window type.  This is
     *        the name by which windows of a user defined "type" are known,
     *        as defined by its Proxy (@see mdi.ui.window.Model).
     * @return {boolean} True if this WindowManager has at least one Window,
     *         of the named type, else false if it does not.
     */
    hasWindowOfType : function(windowTypeName)
    {
        this.assertInterface(windowTypeName, String);
    },


    /**
     * Get all managed Window proxies.
     *
     * @type member
     * @return [{mdi.ui.window.Model}] An Array of managed Windows.
     */
    getAllWindows : function() {},


    /**
     * Get all managed window proxies of a named type.
     *
     * @type member
     * @param windowTypeName {String} The name of a Window type.  This is
     *        the name by which windows of a user defined "type" are known,
     *        as defined by its Proxy (@see mdi.ui.window.Model).
     * @return [{mdi.ui.window.Model}] An Array of managed Windows.
     */
    getAllWindowsOfType : function(windowTypeName)
    {
        this.assertInterface(windowTypeName, String);
    },


    /**
     * Get the top-most (highest z-order) managed Window proxy of a named
     * type.
     * Useful for getting the most recently touched Window of a particular
     * type, for example.
     *
     * @type member
     * @param windowTypeName {String} The name of a Window type.  This is
     *        the name by which windows of a user defined "type" are known,
     *        as defined by its Proxy (@see mdi.ui.window.Model).
     * @return {mdi.ui.window.Model} A managed Window of the named type,
     *         or null if there are no such managed Windows.
     */
    getTopWindowOfType : function(windowTypeName)
    {
        this.assertInterface(windowTypeName, String);
    },


    /**
     * Get all managed Window proxies with a specified state.
     * Useful for getting all minimised Windows, for example.
     *
     * @type member
     * @param state {String} The name of a state.
     * @return [{mdi.ui.window.Model}] An Array of managed Windows.
     */
    getAllWindowsWithState : function(state)
    {
        this.assertInterface(state, String);
    },


    /**
     * Get all managed Window proxies of a named type which have a specified
     * state.
     * Useful for getting all minimised Query Results Windows, for example.
     *
     * @type member
     * @param windowTypeName {String} The name of a Window type.  This is
     *        the name by which windows of a user defined "type" are known,
     *        as defined by its Proxy (@see mdi.ui.window.Model).
     * @param state {String} The name of a state.
     * @return [{mdi.ui.window.Model}] An Array of managed Windows.
     */
    getAllWindowsOfTypeWithState : function(windowTypeName, state)
    {
        this.assertInterface(windowTypeName, String);
        this.assertInterface(state, String);
    }


  }
});
