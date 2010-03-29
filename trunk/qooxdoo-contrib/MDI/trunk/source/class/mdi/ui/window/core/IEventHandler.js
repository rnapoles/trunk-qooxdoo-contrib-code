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
 * Window handlers.
 *
 * This interface is implemented by WindowManager and all WindowRenderers.
 */
qx.Interface.define("mdi.ui.window.core.IEventHandler",
{


  members :
  {



    //  -----  Manager Accessor for MWindowHandling  -----


    /**
     * Get the window Manager instance.
     *
     * @type member
     * @return {mdi.ui.window.core.IManager} The window Manager.
     */
    getWindowManager : function() {},



    //  -----  Window Behaviour Handling  -----


    /**
     * Open the Window widget(s) referred to by a given Model.
     *
     * This method notifies its window Manager of a user interactin with a
     * given window Model.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Window to open.
     * @return {void}
     */
    openWindow : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Select the Window widget(s) referred to by a given Model.
     *
     * This method notifies its window Manager of a user interactin with a
     * given window Model.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Window to select.
     * @return {void}
     */
    selectWindow : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Minimise the Window widget(s) referred to by a given Model.
     *
     * This method notifies its window Manager of a user interactin with a
     * given window Model.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Window to minimise.
     * @return {void}
     */
    minimiseWindow : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Maximise the Window widget(s) referred to by a given Model.
     *
     * This method notifies its window Manager of a user interactin with a
     * given window Model.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Window to maximise.
     * @return {void}
     */
    maximiseWindow : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Restore the Window widget(s) referred to by a given Model.
     *
     * This method notifies its window Manager of a user interactin with a
     * given window Model.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Window to restore.
     * @return {void}
     */
    restoreWindow : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Close the Window widget(s) referred to by a given Model.
     *
     * This method notifies its window Manager of a user interactin with a
     * given window Model.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Window to close.
     * @return {void}
     */
    closeWindow : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    }


  }
});