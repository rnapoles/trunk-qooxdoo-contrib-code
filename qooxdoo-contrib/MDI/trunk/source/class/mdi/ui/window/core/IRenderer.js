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
 * A Renderer is a Widget container which is capable of rendering a
 * representation of an mdi.ui.window.Model.  A WindowManager should have
 * at least one Renderer, but may have many.
 *
 * The most commonly used implementation of IRenderer is Desktop.  Docks,
 * Virtual Desktops, and Tabbed Views are equally plausible, and can all
 * be shown to the user simultaneously.
 *
 * This is the minimum interface which must be implemented by all MDI
 * Window Renderers.
 */
qx.Interface.define("mdi.ui.window.core.IRenderer",
{

  members :
  {

    /**
     * Set this Renderer's WindowManager.
     *
     * @type member
     * @param manager {mdi.ui.window.core.IManager} The WindowManager instance.
     * @return {void}
     */
    setWindowManager : function(manager)
    {
        this.assertInterface(manager, mdi.ui.window.core.IManager);
    },


    /**
     * Get this Renderer's WindowManager.
     *
     * @type member
     * @return {mdi.ui.window.core.IManager} The WindowManager instance.
     */
    getWindowManager : function() {},


    /**
     * Add a Window to this Renderer via its Model, causing a representation
     * of the Window to be rendered.
     *
     * @type member
     * @return {mdi.ui.window.Model} A window Model instance.
     */
    addWindow : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Remove a Window from this WindowRenderer via its Model, causing the
     * representation of it to be unrendered.
     *
     * @type member
     * @return {mdi.ui.window.Model} The window Model instance.
     */
    removeWindow : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Ask whether this IRenderer has a representation of a logical window
     * (Model) instance.
     *
     * @type member
     * @return {boolean} True if this IRenderer has a representation of the
     *         logical window, else false if it does not.
     */
    hasWindow : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Find a button
     *
     * @type member
     * @param {mdi.ui.window.Model} A window Model.
     * @return null|{mdi.ui.window.core.IWidget} null or an IWidget instance.
     */
    getWidgetForModel : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    }
  }
});