/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Authors:
     * Simon Bull (sbull)

************************************************************************ */

/* ************************************************************************

#module(ui_window)

************************************************************************ */

/**
 * This singleton manages ext.strategy.position.PositionStrategy instances.
 * 
 * It is an interface to the following window positioning methods:
 * 
 * 1) positionWindow()
 * 2) maximiseWindow()
 * 3) arrangeWindows()
 */
qx.Class.define("ext.manager.position.PositionManager",
{
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vWorkspace)
  {
    qx.core.Object.call(this);

    // ************************************************************************
    //   WORKSPACE
    // ************************************************************************
    this._workspace = (this._validateWorkspace(vWorkspace)) ? vWorkspace : qx.ui.core.ClientDocument.getInstance();

    // ************************************************************************
    //   DEFAULT POSITION WINDOW STRATEGY
    // ************************************************************************
    /*
      var order = [ext.strategy.position.CornerStrategy.TOP_LEFT,
                   ext.strategy.position.CornerStrategy.BOTTOM_RIGHT,
                   ext.strategy.position.CornerStrategy.BOTTOM_LEFT,
                   ext.strategy.position.CornerStrategy.TOP_RIGHT ];
    
      this.setPositionStrategy( new ext.strategy.position.CornerStrategy(order, this._workspace) );
    */

    var origin = ext.strategy.position.CornerStrategy.TOP_LEFT;
    this.setPositionStrategy(new ext.strategy.position.CascadeStrategy(origin, this._workspace));

    // ************************************************************************
    //   DEFAULT MAXIMISE WINDOW STRATEGY
    // ************************************************************************
    this.setMaximiseStrategy(new ext.strategy.position.MaximiseStrategy(this._workspace));

    // ************************************************************************
    //   DEFAULT MINIMISE WINDOW STRATEGY
    // ************************************************************************
    this.setMinimiseStrategy(new ext.strategy.position.MinimiseStrategy(this._workspace, ext.constant.Position.BOTTOM_LEFT, ext.constant.Direction.HORIZONTAL_RIGHT, ext.constant.Direction.VERTICAL_UP, ext.constant.UI.MINIMISED_WINDOW_ICON_SIZE, ext.constant.UI.MINIMISED_WINDOW_ICON_SPACING));
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // ************************************************************************
    //   DEFAULT ARRANGE WINDOWS STRATEGY
    // ************************************************************************
    // this.setArrangeStrategy( new ext.strategy.position.Maximise(this._workspace) );
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */

    /** The PositioningStrategy implementation used to position new window instances. */
    positionStrategy :
    {
      _legacy    : true,
      type       : "object",
      allowsNull : false
    },


    /** The PositioningStrategy implementation used to maximise window instances. */
    maximiseStrategy :
    {
      _legacy    : true,
      type       : "object",
      allowsNull : false
    },


    /** The PositioningStrategy implementation used to minimise window instances. */
    minimiseStrategy :
    {
      _legacy    : true,
      type       : "object",
      allowsNull : false
    },


    /**
     * The PositioningStrategy implementation used to auto-arrange all existing
     *  window instances.
     */
    arrangeStrategy :
    {
      _legacy    : true,
      type       : "object",
      allowsNull : false
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      CONSTANTS
    ---------------------------------------------------------------------------
    */

    /*
    ---------------------------------------------------------------------------
      UTILITIES
    ---------------------------------------------------------------------------
    */

    /*
      @return true if workspace is a CanvasLayout, otherwise fase.
    */

    /**
     * TODOC
     *
     * @type member
     * @param workspace {var} TODOC
     * @return {var} TODOC
     */
    _validateWorkspace : function(workspace)
    {
      var isValidWorkspace = false;

      if (workspace != null && workspace.classname == "qx.ui.layout.CanvasLayout") {
        isValidWorkspace = true;
      }

      return isValidWorkspace;
    },




    /*
    ---------------------------------------------------------------------------
      MODIFIERS
    ---------------------------------------------------------------------------
    */

    /*
    ---------------------------------------------------------------------------
      MANAGER INTERFACE
    ---------------------------------------------------------------------------
    */

    /*
    ---------------------------------------------------------------------------
      POSITIONING INTERFACE
    ---------------------------------------------------------------------------
    */

    /*
      Position a new window instance with the current strategy.
    
      @param vWindow {qx.ui.window.Window} The window to position.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vWindow {var} TODOC
     * @return {void} 
     */
    positionWindow : function(vWindow)
    {
      var strategy = this.getPositionStrategy();
      strategy.position(vWindow);
    },

    /*
      Maximise a window instance with the current strategy.
    
      @param vWindow {qx.ui.window.Window} The window to position.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vWindow {var} TODOC
     * @return {void} 
     */
    maximiseWindow : function(vWindow)
    {
      var strategy = this.getMaximiseStrategy();
      strategy.position(vWindow);
    },

    /*
      Minimise a window instance with the current strategy.
    
      @param vWindow {qx.ui.window.Window} The window to position.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vWindow {var} TODOC
     * @return {void} 
     */
    minimiseWindow : function(vWindow)
    {
      var strategy = this.getMinimiseStrategy();
      strategy.position(vWindow);
    },

    /*
      Restore a minimised window instance with the current strategy.
    
      @param vWindow {qx.ui.window.Window} The window to position.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vWindow {var} TODOC
     * @return {void} 
     */
    restoreFromMinimised : function(vWindow)
    {
      var strategy = this.getMinimiseStrategy();
      strategy.restore(vWindow);
    },

    /*
      Arrange all window instances with the current strategy.
    
      @param vWindows {qx.ui.window.Window[]} The windows to arrange.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vWindows {var} TODOC
     * @return {void} 
     */
    arrangeWindows : function(vWindows)
    {
      var strategy = this.getArrangeStrategy();
      strategy.position(vWindows);
    },




    /*
    ---------------------------------------------------------------------------
      DISPOSER
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @return {boolean | var} TODOC
     */
    dispose : function()
    {
      if (this.getDisposed()) {
        return true;
      }

      return qx.ui.window.Manager.prototype.dispose.call(this);
    }
  }
});
