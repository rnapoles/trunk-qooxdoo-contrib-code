/* ************************************************************************

   Copyright:


   License:

   Authors:
     Simon Bull

************************************************************************ */

/* ************************************************************************



************************************************************************ */


/**
 * This mixin implements mdi.ui.window.core.IEventHandler.
 */
qx.Mixin.define("mdi.ui.window.core.MEventHandler",
{


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */


  /**
   * This is not a true constructor.
   *
   * This method invoked by the framework when a class that includes this mixin
   * is instantiated.  It cannot be used to construct an instance of this mixin.
   */
  construct : function()
  {
      // Initialise a local reference to window Manager
      // Note, not called "__manager" because that would shadow the private
      // member called mdi.ui.window.core.MManagerHandler#__manager
      __windowManager = this.getWindowManager();
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    // The window Manager instance which will do all the real work
    __windowManager : null,


    /**
     * Open the Window widget(s) referred to by a given Model.
     *
     * This method notifies its window Manager of a user interactin with a
     * given window Model.
     *
     * @type member
     * @param model {qx.ui.window.mdi.Model} A Window to open.
     * @return {void}
     */
    openWindow : function(model)
    {
        this.__windowManager.openWindow(model);
    },


    /**
     * Select the Window widget(s) referred to by a given Model.
     *
     * This method notifies its window Manager of a user interactin with a
     * given window Model.
     *
     * @type member
     * @param model {qx.ui.window.mdi.Model} A Window to select.
     * @return {void}
     */
    selectWindow : function(model)
    {
        this.__windowManager.selectWindow(model);
    },


    /**
     * Minimise the Window widget(s) referred to by a given Model.
     *
     * This method notifies its window Manager of a user interactin with a
     * given window Model.
     *
     * @type member
     * @param model {qx.ui.window.mdi.Model} A Window to minimise.
     * @return {void}
     */
    minimiseWindow : function(model)
    {
        this.__windowManager.minimiseWindow(model);
    },


    /**
     * Maximise the Window widget(s) referred to by a given Model.
     *
     * This method notifies its window Manager of a user interactin with a
     * given window Model.
     *
     * @type member
     * @param model {qx.ui.window.mdi.Model} A Window to maximise.
     * @return {void}
     */
    maximiseWindow : function(model)
    {
        this.__windowManager.maximiseWindow(model);
    },


    /**
     * Restore the Window widget(s) referred to by a given Model.
     *
     * This method notifies its window Manager of a user interactin with a
     * given window Model.
     *
     * @type member
     * @param model {qx.ui.window.mdi.Model} A Window to restore.
     * @return {void}
     */
    restoreWindow : function(model)
    {
        this.__windowManager.restoreWindow(model);
    },


    /**
     * Close the Window widget(s) referred to by a given Model.
     *
     * This method notifies its window Manager of a user interactin with a
     * given window Model.
     *
     * @type member
     * @param model {qx.ui.window.mdi.Model} A Window to close.
     * @return {void}
     */
    closeWindow : function(model)
    {
        this.__windowManager.closeWindow(model);
    }

  }

});
