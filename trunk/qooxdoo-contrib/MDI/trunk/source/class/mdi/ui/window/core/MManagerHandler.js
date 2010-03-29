/* ************************************************************************

   Copyright:


   License:

   Authors:
     Simon Bull

************************************************************************ */

/* ************************************************************************



************************************************************************ */


/**
 * This mixin implements the getManager and setManager methods required
 * by mdi.ui.window.core.IRenderer.
 *
 * This mixin should be included in all IRenderers.
 */
qx.Mixin.define("mdi.ui.window.core.MManagerHandler",
{


  members :
  {

    // A local reference to the window Manager instance.
    // Must be set via setWindowManager after Renderer construction.
    __manager : null,


    //  -----  Implement IRenderer  -----


    /**
     * Set this IRenderer's IManager.
     *
     * @type member
     * @param manager {mdi.ui.window.core.IManager} A window Manager.
     */
    setWindowManager : function(manager)
    {
        this.__manager = manager;
    },


    /**
     * Get this IRenderer's IManager.
     *
     * @type member
     * @return {mdi.ui.window.core.IManager} The window Manager.
     */
    getWindowManager : function()
    {
        return this.__manager;
    }

  }

});
