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
 * An mdi.ui.window.Manager is a central piece of application infrastructure
 * for an MDI GUI.  It facilitates the use of multiple content windows within
 * a single application.
 *
 * The Manager implementation manages two collections;
 *  1) Window Renderer instances,
 *  2) Window Model instances.
 *
 * Renderers are one or more places where the window instances should be
 * represented in the GUI, such as on a desktop, in a virtual desktop, in a
 * dock, and so on.  See mdi.ui.window.core.IRenderer.
 *
 * Models are light-weight (non-Widget) reference objects which proxy one or more
 * rendered Widgets (one per renderer) which collectively represent a single
 * logical "Window" in the GUI.  For example, a Desktop Window and a Dock Button
 * are two Widgets which represent one logical Window.  See mdi.ui.window.Model.
 *
 * The WindowManager does not manage any Window Widget instances -- these are the
 * responsibility of the appropriate renderer (in this case, the Desktop).
 */
qx.Class.define("mdi.ui.window.Manager",
{
  extend : qx.core.Object,

  implement : [mdi.ui.window.core.IManager,
               mdi.ui.window.core.IEventHandler],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
      this.base(arguments);

      this.__renderers = [];

      this.__modelsOfType = {};
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // An Array of window renderers which will display representations of
    // the window instances managed by this WindowManager.
    __renderers : null,


    // A Map (keyed by type) of currently managed models of each type.
    __modelsOfType : null,



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
        if (!qx.lang.Array.contains(this.__renderers, renderer))
        {
            this.__renderers[this.__renderers.length] = renderer;
            renderer.setWindowManager(this);
        }
    },


    /**
     * Remove a window Renderer from this WindowManager.
     *
     * @type member
     * @param renderer {mdi.ui.window.core.IRenderer} The window Renderer.
     * @return {void}
     */
    removeRenderer : function(renderer)
    {
        if (qx.lang.Array.contains(this.__renderers, renderer))
        {
            renderer.removeAll();
            qx.lang.Array.remove(this.__renderers, renderer);
        }
    },


    /**
     * Get all window Renderers.
     *
     * @type member
     * @return [{mdi.ui.window.core.IRenderer}] An Array of window Renderers.
     */
    getAllRenderers : function()
    {
        return this.__renderers;
    },


    /**
     * Remove all window Renderers.
     *
     * @type member
     * @return {void}
     */
    removeAllRenderers : function()
    {
        // Loop backward as we are modifiying the collection in each iteration
        for (var i = this.__renderers.length - 1; i > -1; i--)
        {
            this.removeRenderer(this.__renderers[i]);
        }
    },


    //  -----  Window Instance Management  -----


    /**
     * Add a Window to this WindowManager.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A window Model to add.
     * @return {void}
     */
    addWindow : function(model)
    {
        if (!this.hasWindow(model))
        {
            var type = model.getType();
            if (!this.__modelsOfType[type])
            {
                this.__modelsOfType[type] = [];
            }

            var modelsOfType = this.__modelsOfType[type];
            modelsOfType[modelsOfType.length] = model;

            // Notify all renderers -- make them render
            for (var i = 0, l = this.__renderers.length; i < l; i++)
            {
                this.__renderers[i].addWindow(model);
            }

            // Ensure the new window is selected by all renderers
            // null as the 2nd arg means no renderer will be skipped
            this.selectWindow(model, null);
        }
    },


    /**
     * Remove a Window from this WindowManager.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A window to remove.
     * @return {void}
     */
    removeWindow : function(model)
    {
        if (this.hasWindow(model))
        {
            // Remove window
            qx.lang.Array.remove(this.__modelsOfType[model.getType()], model);

            // Update all renderers
            for (var i = 0, l = this.__renderers.length; i < l; i++)
            {
                this.__renderers[i].removeWindow(model);
            }
        }
    },


    /**
     * Remove all managed Windows.
     *
     * @type member
     * @return {void}
     */
    removeAllWindows : function()
    {
        // Loop backward as we are modifiying the collection each iteration
        var all = this.getAllWindows();
        for (var i = all.length - 1; i > -1; i--)
        {
            this.removeWindow(all[i]);
        }
    },


    /**
     * Ask whether this WindowManager is managing a Window instance.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Window model.
     * @return {boolean} True if this WindowManager is managing the Window,
     *         else false if it is not.
     */
    hasWindow : function(model)
    {
        return qx.lang.Array.contains(this.getAllWindows(), model);
    },


    /**
     * Ask whether this WindowManager has at least one Window of a named type.
     *
     * @type member
     * @param type {String} The name of a Window type.
     * @return {boolean} True if this WindowManager has at least one Window,
     *         of the named type, else false if it does not.
     */
    hasWindowOfType : function(type)
    {
        /*
        // Test 1
        var test = [];
            test[0] = 0;
            test[1] = 1;
        this.info("<test-1-before> test.length=" + test.length);
            test[0] = null;
            test[1] = null;
        this.info("<test-1-after> test.length=" + test.length);

        // Test 2
        test = [];
            test[0] = 0;
            test[1] = 1;
        this.info("<test-2-before> test.length=" + test.length);
            qx.lang.Array.remove(test, test[1]);
            qx.lang.Array.remove(test, test[0]);
        this.info("<test-2-after> test.length=" + test.length);
        */

        return (   (this.__modelsOfType[type] != null)
                && (this.__modelsOfType[type].length > 0)  );

               // TODO what is the length of an Array that formerly contained
               // n elements, which were later assigned null?
               // See test 1 and 2 (above)
    },


    /**
     * Get all managed Windows.
     *
     * @type member
     * @return [{mdi.ui.window.Model}] An Array of managed Windows.
     */
    getAllWindows : function()
    {
        var all = [];
        for (key in this.__modelsOfType)
        {
            all = qx.lang.Array.append(all, this.getAllWindowsOfType(key));
        }
        return all;
    },


    /**
     * Get all managed Windows of a named type.
     *
     * @type member
     * @param type {String} The name of the type of Windows to get.
     * @return [{mdi.ui.window.Model}] An Array of managed Windows.
     */
    getAllWindowsOfType : function(type)
    {
        var allWindowsOfType = [];
        if (this.hasWindowOfType(type))
        {
            allWindowsOfType = this.__modelsOfType[type];
        }
        return allWindowsOfType;
    },


    /**
     * Get the top-most (highest z-order) managed Window of a named type.
     * Useful for getting the most recently touched Window of a particular
     * type, for example.
     *
     * @type member
     * @param windowDefName {String} The name of the type of Window to get.
     * @return {mdi.ui.window.Model} A managed Window of the named type,
     *         or null if there are no such managed Windows.
     */
    getTopWindowOfType : function(windowDefName)
    {
        var top = null;
        if (this.hasWindowOfType(windowDefName))
        {
            var allWindowsOfType = this.__modelsOfType[windowDefName];

            // Since allWindowOfType will be short it may not be worth maintaining in-situ sort
            for (var i = 0, l = allWindowsOfType.length; i < l; i++)
            {
                var nextWindow = allWindowsOfType[i];
                if (   top == null
                    || top.getZIndex() < nextWindow.getZIndex())
                {
                    top = nextWidow;
                }
            }
        }
        return top;
    },


    /**
     * Get all managed Windows with a specified state.
     * Useful for getting all minimised Windows, for example.
     *
     * @type member
     * @param state {String} The name of a state.
     * @return [{mdi.ui.window.Model}] An Array of managed Windows.
     */
    getAllWindowsWithState : function(state)
    {
        var allWindowsWithState = [];

        var all = this.getAll();
        for (var i = 0, l = all.length; i < l; i++)
        {
            var nextWindow = all[i];
            if (nextWindow.hasState(state))
            {
                allWindowsWithState[allWindowsWithState.length](nextWindow);
            }
        }
        return allWindowsWithState;
    },


    /**
     * Get all managed Windows of a named type which have a specified state.
     * Useful for getting all minimised Query Results Windows, for example.
     *
     * @type member
     * @param windowDefName {String} The name of the type of Window to get.
     * @param state {String} The name of a state.
     * @return [{mdi.ui.window.Model}] An Array of managed Windows.
     */
    getAllWindowsOfTypeWithState : function(windowDefName, state)
    {
        var allWindowsOfTypeWithState = [];
        var allWindowsOfType = this.getAllWindowsOfType(windowDefName);
        for (var i = 0, l = allWindowsOfType.length; i < l; i++)
        {
            var nextWindow = allWindowsOfType[i];
            if (nextWindow.hasState(state))
            {
                allWindowsOfTypeWithState[allWindowsOfTypeWithState.length] = nextWindow;
            }
        }
        return allWindowsOfTypeWithState;
    },



    //  -----  Implement IEventHandling  -----


    /**
     * Get this window Manager instance.
     *
     * @type member
     * @return {mdi.ui.window.core.IManager} The window Manager.
     */
    getWindowManager : function()
    {
        return this;
    },


    /**
     * Open a Window.
     *
     * @type member
     * @param window {mdi.ui.window.Model} A Window to open.
     * @return {void}
     */
    openWindow : function(window)
    {
        this.addWindow(window);
    },


    /**
     * Select a Window.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Model to select.
     * @param invoker {mdi.ui.window.core.IRenderer} The invoking renderer
     *        -- will be ignored in order to avert an infinite loop.
     * @return {void}
     */
    selectWindow : function(model, invoker)
    {
        // Update all renderers except the invoking renderer
        for (var i = 0, l = this.__renderers.length; i < l; i++)
        {
            var nextRenderer = this.__renderers[i];
            if (nextRenderer != invoker)
            {
                nextRenderer.selectWidget(model);
            }
        }
    },


    /**
     * Minimise a Window.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Window to minimise.
     * @param invoker {mdi.ui.window.core.IRenderer} The invoking renderer
     *        -- will be ignored in order to avert an infinite loop.
     * @return {void}
     */
    minimiseWindow : function(model, invoker)
    {
        // Update all renderers except the invoking renderer
        for (var i = 0, l = this.__renderers.length; i < l; i++)
        {
            var nextRenderer = this.__renderers[i];
            if (nextRenderer != invoker)
            {
                nextRenderer.minimiseWidget(model);
            }
        }
    },


    /**
     * Maximise a Window.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Window to maximise.
     * @param invoker {mdi.ui.window.core.IRenderer} The invoking renderer
     *        -- will be ignored in order to avert an infinite loop.
     * @return {void}
     */
    maximiseWindow : function(model, invoker)
    {
        // Update all renderers except the invoking renderer
        for (var i = 0, l = this.__renderers.length; i < l; i++)
        {
            var nextRenderer = this.__renderers[i];
            if (nextRenderer != invoker)
            {
                nextRenderer.maximiseWidget(model);
            }
        }
    },


    /**
     * Restore a Window.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Window to restore.
     * @param invoker {mdi.ui.window.core.IRenderer} The invoking renderer
     *        -- will be ignored in order to avert an infinite loop.
     * @return {void}
     */
    restoreWindow : function(model, invoker)
    {
        // Update all renderers except the invoking renderer
        for (var i = 0, l = this.__renderers.length; i < l; i++)
        {
            var nextRenderer = this.__renderers[i];
            if (nextRenderer != invoker)
            {
                nextRenderer.restoreWidget(model);
            }
        }
    },


    /**
     * Close a Window.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Window to close.
     * @return {void}
     */
    closeWindow : function(model, invoker)
    {
        // Update all renderers except the invoking renderer
        for (var i = 0, l = this.__renderers.length; i < l; i++)
        {
            var nextRenderer = this.__renderers[i];
            if (nextRenderer != invoker)
            {
                nextRenderer.closeWidget(model);
            }
        }

        this.removeWindow(model);
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
      this._disposeObjects("__renderers");
    }
  }
});
