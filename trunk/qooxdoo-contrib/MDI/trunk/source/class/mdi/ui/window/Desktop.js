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
 * The desktop is a Widget, which can act as container for windows. It can be
 * used to define a clipping region for internal windows e.g. to create
 * an MDI like application.
 */
qx.Class.define("mdi.ui.window.Desktop",
{
  extend : qx.ui.core.Widget,

  include : [qx.ui.core.MChildrenHandling,
             qx.ui.core.MBlocker,
             mdi.ui.window.core.MDesktop,
             mdi.ui.window.core.MEventHandler,
             mdi.ui.window.core.MBehaviourHandler,
             mdi.ui.window.core.MManagerHandler],

  implement : [mdi.ui.window.core.IRenderer,
               mdi.ui.window.core.IEventHandler,
               mdi.ui.window.core.IBehaviourHandler,
               mdi.ui.window.position.IPositionerHandler],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */


  /**
   * Construct a new Desktop instance.
   */
  construct : function()
  {
    this.base(arguments);

    this._setLayout(new qx.ui.layout.Canvas());
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */


  members :
  {


    //  -----  Impl of IRenderer  -----


    /**
     * Add a Window to this WindowRenderer, causing a representation of it
     * to be rendered.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Model instance.
     */
    addWindow : function(model)
    {
        var win = new mdi.ui.window.DesktopItem(model.getCaption(), model.getIcon());
        win.set({
            width  : model.getInitialWidth(),
            height : model.getInitialHeight()
        });

        // set references
        win.setModel(model);
        win.setWindowManager(this.getWindowManager());
        win.setRenderer(this);

        // Position and render window
        this.positionWindow(win);
        this.add(win);

        // TODO  This addWindow call was made by windowManager.
        // Should windowManager call open too?
        win.open(this);
    },


    /**
     * Remove a Window Model from this WindowRenderer.
     *
     * This should only ever be called after the Window has been closed.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Model instance to remove.
     */
    removeWindow : function(model)
    {
        // TODO return window instance to Pool for recycling
    },


    /**
     * Ask whether this IRenderer has a representation of a logical window
     * (Model) instance.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Model instance to check.
     * @return {boolean} True if this IRenderer has a representation of the
     *         logical window, else false if it does not.
     */
    hasWindow : function(model)
    {
        this.warn("hasWindow() not implemented");
    },


    /**
     * Find a DesktopItem
     *
     * @type member
     * @param {mdi.ui.window.Model} A window Model.
     * @return null|{mdi.ui.window.core.IWidget} null or a DesktopItem instance.
     */
    getWidgetForModel : function(model)
    {
        var item = null;

        var items = this.getWindows();

        for (var i = 0, l = items.length; i < l; i++)
        {
            var nextItem = items[i];
            if (nextItem.getModel() == model)
            {
                item = nextItem;
                break;
            }
        }
        return item;
    },


    //  -----  IPositionerHandler Impl  -----


    /**
     * Set the positioning Strategy.
     *
     * @type member
     * @param strategy {mdi.ui.window.position.IPositioner} An IPositioner.
     * @return {void}
     */
    setPositioner : function(positioner)
    {
        this.__positioningStrategy = positioner;
    },


    /**
     * Get the current positioning Strategy.
     *
     * @type member
     * @return {mdi.ui.window.position.IPositioner} An IPositioner instance.
     */
    getPositioner : function(positioner)
    {
        if (!this.__positioningStrategy)
        {
            this.error("getStrategy() Strategy has not been set!");
        }
        return this.__positioningStrategy;
    },


    /**
     * Position a single window.
     *
     * @type member
     * @param window {mdi.ui.window.DesktopItem} A window to position.
     * @return {void}
     */
    positionWindow : function(window)
    {
        this.getPositioner().positionWindow(window);
    },


    /**
     * Position all windows.
     *
     * @type member
     * @return {void}
     */
    positionWindows : function()
    {
        this.getPositioner().positionWindows(window);
    },


    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */


    /**
     * Destructor. This is responsible for freeing up all the memory reserved by the object.
     * There are 4 methods to use to dispose memory:
     *
     * _disposeFields:  Supports multiple arguments. Deleting each key name given from the instance.
     *                  This is the fastest of the three methods. It basically does the same as the
     *                  nullify used in qooxdoo 0.6.
     * _disposeObjects: Supports multiple arguments. Dispose the objects (qooxdoo objects) under
     *                  each key and finally delete the key from the instance like _disposeFields.
     * _disposeArray:*   Disposes the array under the given key, but disposes all entries in this
     *                  array first. It must contain instances of qx.core.Object only.
     * _disposeMap:*     Disposes the map under the given key, but disposes all entries in this map
     *                  first. It must contain instances of qx.core.Object only.
     *
     * * Only Qx 0.8+. For Qx 0.7 use _disposeObjectDeep()
     */
    destruct : function()
    {
      //this._disposeObjects("__renderers");
    }
  }
});