/* ************************************************************************

   Copyright:


   License:

   Authors:
     Simon Bull

************************************************************************ */

/* ************************************************************************



************************************************************************ */


/**
 * This mixin implements mdi.ui.window.core.IBehaviourHandler.
 */
qx.Mixin.define("mdi.ui.window.core.MBehaviourHandler",
{



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

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
        var widget = this.getWidgetForModel(model);
        if (widget)
        {
            widget.open(this);
        }
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
        var widget = this.getWidgetForModel(model);
        if (widget)
        {
            widget.select(this);
        }
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
        var widget = this.getWidgetForModel(model);
        if (widget)
        {
            widget.minimise(this);
        }
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
        var widget = this.getWidgetForModel(model);
        if (widget)
        {
            widget.maximise(this);
        }
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
        var widget = this.getWidgetForModel(model);
        if (widget)
        {
            widget.restore(this);
        }
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
        var widget = this.getWidgetForModel(model);
        if (widget)
        {
            widget.close(this);
        }
    }
  }

});
