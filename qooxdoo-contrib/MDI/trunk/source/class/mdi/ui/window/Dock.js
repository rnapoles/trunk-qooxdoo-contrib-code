/* ************************************************************************

   Copyright:


   License:

   Authors:
     Simon Bull

************************************************************************ */

/* ************************************************************************

#optional(mdi.ui.window.Window)


************************************************************************ */

/**
 * The is a container for window proxies.  It is implemented by a toolbar
 * with a radio button for each window.  The active window is the selected
 * radio button.
 */
qx.Class.define("mdi.ui.window.Dock",
{
  extend : qx.ui.toolbar.ToolBar,

  include : [mdi.ui.window.core.MEventHandler,
             mdi.ui.window.core.MBehaviourHandler,
             mdi.ui.window.core.MManagerHandler],

  implement : [mdi.ui.window.core.IRenderer,
               mdi.ui.window.core.IEventHandler,
               mdi.ui.window.core.IBehaviourHandler],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */


  /**
   * Construct a new Dock instance.
   */
  construct : function()
  {
      this.base(arguments);

      this.__radioManager = new qx.ui.form.RadioGroup();
      this.__radioManager.setAllowEmptySelection(true);

      // TODO -- Solve outstanding issue; prevent Dock toolbar from
      // growing wider than the Desktop when a) too many buttons are
      // added to it, or b) when browser window is made too narrow
      // to fit existing buttons.
  },


  members :
  {

    // A radioButton manager (assuming radio button impl)
    __radioManager : null,

    // A group of RadioButtons (assuming radio button impl)
    __buttons : null,



    //  -----  Impl of IRenderer  -----


    /**
     * Add a Window to this WindowRenderer, causing a representation of it
     * to be rendered.
     *
     * @type member
     * @return {mdi.ui.window.Model} The Model instance.
     */
    addWindow : function(model)
    {
        var button = new mdi.ui.window.DockItem(model.getCaption(), model.getIcon());

        button.setModel(model);
        button.addListener("click", this.__selectViaWindowManager, this);

        this.__radioManager.add(button);
        this.add(button);
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
        var widget = this.getWidgetForModel(model);

        if (widget)
        {
            //widget.unsetModel();
            widget.removeListener("click", this.__selectViaWindowManager, this);

            this.__radioManager.remove(widget);
            this.remove(widget);
        }
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
        this.warn("hasWindow() no impl");
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
        var button = null;
        var buttons = this.__radioManager.getItems();

        for (var i = 0, l = buttons.length; i < l; i++)
        {
            var nextButton = buttons[i];
            if (nextButton.getModel() == model)
            {
                button = nextButton;
                break;
            }
        }
        return button;
    },


    //  -----  Private Impl  -----


    /**
     * Event handler invoked by clicking a Dock button.
     *
     * This method will make a DeskTopItem (a Window) visible
     * and focussed.
     *
     * @param e {qx.?.Event} A mouse click event.
     */
    __selectViaWindowManager : function(e)
    {
        var dockItem = e.getTarget();
        var model = dockItem.getModel();

        // Notify window Wanager
        this.getWindowManager().selectWindow(model);

        return true;
    }



  }
});