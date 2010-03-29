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
 * objects which support window behaviours.
 *
 * These methods will be invoked by window Manager on each of its
 * renderers.  The renderers will operate on the Widgets they manage.
 *
 * This interface is implemented by Dock and Desktop, for example.
 */
qx.Interface.define("mdi.ui.window.core.IBehaviourHandler",
{


  members :
  {


    /**
     * Open the widget referred to by a Model.
     *
     * This method
     *
     * @type member
     * @param model {mdi.ui.window.Model} The window Model whose
     *        representation should be opened.
     * @return {void}
     */
    openWidget : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Select the widget referred to by a Model.
     *
     * @type member
     * @param model {mdi.ui.window.Model} The window Model whose
     *        representation should be selected.
     * @return {void}
     */
    selectWidget : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Minimise the widget referred to by a Model.
     *
     * @type member
     * @param model {mdi.ui.window.Model} The window Model whose
     *        representation should be minimised.
     * @return {void}
     */
    minimiseWidget : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Maximise the widget referred to by a Model.
     *
     * @type member
     * @param model {mdi.ui.window.Model} The window Model whose
     *        representation should be maximised.
     * @return {void}
     */
    maximiseWidget : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Restore the widget referred to by a Model.
     *
     * @type member
     * @param model {mdi.ui.window.Model} The window Model whose
     *        representation should be restored.
     * @return {void}
     */
    restoreWidget : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Close the widget referred to by a Model.
     *
     * @type member
     * @param model {mdi.ui.window.Model} The window Model whose
     *        representation should be closed.
     * @return {void}
     */
    closeWidget : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    }

  }
});