/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Authors:
     * Simon Bull (sbull)

************************************************************************ */

/* ************************************************************************

#module(ui_window)

************************************************************************ */

/*
GridStrategy will divide the workspace into a logical grid and then position
each new widget in the next available grid cell.

The next available grid cell is always the one closest to the origin.

E.g., If a GridStrategy has divided the workspace into a logical 4x4 grid
like this:

        A B C D
        E F G H
        I J K L
        M N O P

And it has a BOTTOM_RIGHT origin, and HORIZONTAL_RIGHT direction, then
GridStrategy will place widgets in the following order:

       M, N, O, P, I, J, K, L, E, F, G etc.

If any logical cell that was used become empty, then the empty cell that
is closest to the origin will be used next.

E.g., If M, N, O, J and K are occupied (P and I are empty) then P will be
used next, followed by I and then L.

Once all cells are occupied, GridStrategy will begin again at the origin,
placing widgets on top of existing widgets.

If the workspace is resized such that any widgets are no longer visible,
they will be rearranged so that they are visible.

@param vWorkspace   A CanvasLayout that widgets should be positioned within.
@param vOrigin      A location to place the first widget in.  Should be one
                    of the constants in ext.constant.Position.
@param vDirection   A direction to offset subsequent widgets in. Should be
                    one of the constants in ext.constant.Position.
@param vWrap        A direction to offset widgets in at the end of a row or
                    col.  Should be one of the constants in ext.constant
                    .Position.  Should not be the same axis as vDirection.

@author sbull
*/

qx.Class.define("ext.strategy.position.GridStrategy",
{
  extend : ext.strategy.position.AbstractPositionStrategy,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vWorkspace, vOrigin, vDirection, vWrap)
  {
    ext.strategy.position.AbstractPositionStrategy.call(this, vWorkspace);

    // ************************************************************************
    //   SUPPORTED ORIGINS
    // ************************************************************************
    this._supportedOrigins = [ ext.constant.Position.TOP_LEFT, ext.constant.Position.TOP_RIGHT, ext.constant.Position.BOTTOM_LEFT, ext.constant.Position.BOTTOM_RIGHT ];

    // ************************************************************************
    //   SUPPORTED DIRECTIONS
    // ************************************************************************
    this._supportedDirections = [ ext.constant.Direction.HORIZONTAL_LEFT, ext.constant.Direction.HORIZONTAL_RIGHT, ext.constant.Direction.VERTICAL_UP, ext.constant.Direction.VERTICAL_DOWN ];

    // ************************************************************************
    //   ORIGIN
    // ************************************************************************
    this._origin = (this.isValidOrigin(vOrigin)) ? vOrigin : ext.constant.Position.BOTTOM_LEFT;

    // ************************************************************************
    //   DIRECTION
    // ************************************************************************
    this._direction = (this.isValidDirection(vDirection)) ? vDirection : ext.constant.Position.HORIZONAL_RIGHT;

    // ************************************************************************
    //   WRAP DIRECTION
    // ************************************************************************
    this._wrap = (this.isValidDirection(vWrap)) ? vWrap : ext.constant.Direction.VERTICAL_UP;

    // ************************************************************************
    //   ALL POSITIONED WIDGETS
    // ************************************************************************
    this._widgets = [];

    // ************************************************************************
    //   GRID COORDS FOR WIDGETS
    // ************************************************************************
    this._coords = [];

    // ************************************************************************
    //   INITIALISE LOGICAL GRID
    // ************************************************************************
    this._initGrid();

    // ************************************************************************
    //   DEBUG RENDERING
    // ************************************************************************
    this._debug = false;
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */

    /*
      The height and width of each minimised icon (in pixels)
      This should be smaller than gridCellSize.
    
      For internal use only.
    */

    iconSize :
    {
      _legacy      : true,
      type         : "number",
      defaultValue : 48,
      allowNull    : false
    },

    /*
      The height and width of each grid cell (in pixels).
    
      For internal use only.
    */

    gridCellSize :
    {
      _legacy      : true,
      type         : "number",
      defaultValue : 84,
      allowNull    : false
    },

    /*
      The amount of spacing around each grid cell (in pixels).
    
      For internal use only.
    */

    gridCellSpacing :
    {
      _legacy      : true,
      type         : "number",
      defaultValue : 6,
      allowNull    : false
    },

    /*
      The amount of margin around the entire grid (in pixels).
    
      For internal use only.
    */

    gridMargin :
    {
      _legacy      : true,
      type         : "number",
      defaultValue : 6,
      allowNull    : false
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
      MODIFIERS
    ---------------------------------------------------------------------------
    */

    /*
    ---------------------------------------------------------------------------
      UTILITIES
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    getLayout : function() {
      return this._layout;
    },


    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    getNumberOfRows : function() {
      return this._numberOfRows;
    },


    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    getNumberOfCols : function() {
      return this._numberOfCols;
    },




    /*
    ---------------------------------------------------------------------------
      IMPL
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @return {void} 
     */
    _initGrid : function()
    {
      // Reset the dimensions of the workspace, and therefore the number of logical
      // grid rows and grid cols that can now fit into it.
      this._setDimensions();

      // Set the origin grid cell
      this._setOrigin();

      // Reset the this._coords Array to reflect the new size of the workspace
      this._orderGridCells();
    },

    // if (this._debug) {
    //  this._renderGridCells();
    // }
    /*
      This method will position a widget within the workspace.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vWidget {var} TODOC
     * @return {void} 
     */
    position : function(vWidget)
    {
      var index = this._getNextAvailableIndex();
      this._position(vWidget, index);
    },

    /*
      This method will reposition all positioned widgets.
      This is called when the window has been resized.
    */

    /**
     * TODOC
     *
     * @type member
     * @return {void} 
     */
    _repositionAll : function()
    {
      this._initGrid();

      var all = this.getAllWidgets();

      for (var i=0; i<all.length; i++)
      {
        var widget = all[i];

        if (widget != null) {
          this._position(widget, i);
        }
      }

      // Flush queues
      qx.ui.core.Widget.flushGlobalQueues();
    },


    /**
     * TODOC
     *
     * @type member
     * @param vWidget {var} TODOC
     * @param index {var} TODOC
     * @return {void} 
     */
    _positionOLD : function(vWidget, index)
    {
      // ************************************************************************
      //   GRIDCELL COORD
      // ************************************************************************
      var coord = this._coords[index];
      var nextTop = coord.top;
      var nextLeft = coord.left;

      // this.info("_position() about to position widget at top=" + nextTop + ", " + nextLeft);
      // ************************************************************************
      //   POSITION NEXT WIDGET
      // ************************************************************************
      var xPos = nextLeft * (this._cellSize + this._cellSpacing);
      var yPos = nextTop * (this._cellSize + this._cellSpacing);

      vWidget.setTop(yPos);
      vWidget.setLeft(xPos);

      if (vWidget.getParent() != this._workspace) {
        vWidget.setParent(this._workspace);
      }

      // ************************************************************************
      //   MARK POSITION AS OCCUPIED
      // ************************************************************************
      this.getAllWidgets()[index] = vWidget;
    },

    /*
    */

    /**
     * TODOC
     *
     * @type member
     * @param vWidget {var} TODOC
     * @param index {var} TODOC
     * @return {void} 
     */
    _position : function(vWidget, index)
    {
      // ************************************************************************
      //   GRIDCELL COORD
      // ************************************************************************
      var cellCoord = this._coords[index];
      var topCoord = cellCoord.top;
      var leftCoord = cellCoord.left;

      // ************************************************************************
      //   ESTABLISH BASE TOP & LEFT COORDS FOR GRIDCELL
      // ************************************************************************
      var cellSize = this.getGridCellSize();
      var cellSpacing = this.getGridCellSpacing();
      var spacedSize = cellSize + (2 * cellSpacing);

      var baseTop = this._gridTop + cellSpacing;

      if (this._origin == ext.constant.Position.BOTTOM_LEFT || this._origin == ext.constant.Position.BOTTOM_RIGHT) {
        baseTop += this._verticalPadding;
      }

      var baseLeft = this._gridLeft + cellSpacing;

      if (this._origin == ext.constant.Position.TOP_RIGHT || this._origin == ext.constant.Position.BOTTOM_RIGHT) {
        baseLeft += this._horizontalPadding;
      }

      // ************************************************************************
      //   REAL TOP & LEFT COORDS FOR GRIDCELL
      // ************************************************************************
      var top = baseTop + (topCoord * spacedSize);
      var left = baseLeft + (leftCoord * spacedSize);

      // ************************************************************************
      //   CREATE GRIDCELL
      // ************************************************************************
      var gridCell = new qx.ui.layout.BoxLayout;
      gridCell.setHeight(cellSize);
      gridCell.setWidth(cellSize);
      gridCell.setTop(top);
      gridCell.setLeft(left);
      gridCell.setHorizontalChildrenAlign("center");
      gridCell.setVerticalChildrenAlign("middle");
      DOC.add(gridCell);

      // ************************************************************************
      //   POSITION WIDGET
      // ************************************************************************
      if (vWidget.getParent() != null) {
        vWidget.setParent(null);
      }

      gridCell.add(vWidget);
      vWidget.setUserData("gridCell", gridCell);

      // ************************************************************************
      //   MARK POSITION AS OCCUPIED
      // ************************************************************************
      this.getAllWidgets()[index] = vWidget;
    },

    /*
      @return The index of the next available element in this._widgets.
    */

    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    _getNextAvailableIndex : function()
    {
      var all = this.getAllWidgets();
      var index = 0;

      // We intentionally check one element beyond the current Array bounds
      // so that we can add a new element to the Array when the Array is full.
      for (var i=0; i<=all.length; i++)
      {
        index = i;

        if (all[i] == null) {
          break;
        }
      }

      return index;
    },

    /*
      This method creates an Array of coordinates that models the order in which
      widgets should be added to the logical grid.  The zeroeth element of the
      coords array contains the location that the zeroeth element of the widgets
      array should be positioned in, and so on.
    
      Coordinates are expressed as cell numbers in a browser-screen coordinate
      system like this:
    
            C o l
          0 1 2 3 4
        0 . . . . .
      R 1 . . . . .
      o 2 . . . . .
      w 3 . . . . .
        4 . . . . .
    
    */

    /**
     * TODOC
     *
     * @type member
     * @return {void} 
     */
    _orderGridCells : function()
    {
      this._coords = [];

      var minTop = 0;
      var minLeft = 0;
      var maxTop = this._numberOfRows - 1;
      var maxLeft = this._numberOfCols - 1;
      var totalCells = this._numberOfRows * this._numberOfCols;

      // Fill the 0th element of _coords manually
      var coord = this._getCellObj(this._zeroethTop, this._zeroethLeft);
      this._coords[0] = coord;

      // 1st thru nth elements
      var lastTop = this._zeroethTop;
      var lastLeft = this._zeroethLeft;

      // this.info("_orderGridCells() minTop=" + minTop + ", minLeft=" + minLeft);
      // this.info("_orderGridCells() maxTop=" + maxTop + ", maxLeft=" + maxLeft);
      // this.info("_orderGridCells() 0thTop=" + lastTop + ", 0thLeft=" + lastLeft);
      // this.info("_orderGridCells() coords[0].top=" + this._coords[0].top + ", this._coords[0].left=" + this._coords[0].left);
      // Note that we start at index 1 rather than 0, because we have
      // populated the 0th element manually (see above).
      for (var i=1; i<totalCells; i++)
      {
        var nextCoord = this._getNextGridCoord(lastTop, lastLeft, minTop, minLeft, maxTop, maxLeft);
        lastTop = nextCoord.top;
        lastLeft = nextCoord.left;
        this._coords[i] = nextCoord;
      }
    },

    /*
      This method exists purely for debugging.
    
      It renders the current logical grid.
    */

    /**
     * TODOC
     *
     * @type member
     * @return {void} 
     */
    _renderGridCells : function()
    {
      if (this._debug)
      {
        this._orderGridCells();

        // draw the whole gridspace
        var t = new qx.ui.basic.Terminator();
        t.setAppearance("debug");
        t.setSpace(this._gridLeft, this._gridWidth, this._gridTop, this._gridHeight);
        DOC.add(t);

        // draw each gridcell...
        var cellSize = this.getGridCellSize();
        var cellSpacing = this.getGridCellSpacing();
        var spacedSize = cellSize + (2 * cellSpacing);

        // Establish the base coords
        var baseTop = this._gridTop + cellSpacing;

        if (this._origin == ext.constant.Position.BOTTOM_LEFT || this._origin == ext.constant.Position.BOTTOM_RIGHT) {
          baseTop += this._verticalPadding;
        }

        var baseLeft = this._gridLeft + cellSpacing;

        if (this._origin == ext.constant.Position.TOP_RIGHT || this._origin == ext.constant.Position.BOTTOM_RIGHT) {
          baseLeft += this._horizontalPadding;
        }

        for (var ii=0; ii<this._coords.length; ii++)
        {
          var gridCoord = this._coords[ii];

          if (gridCoord != null)
          {
            var top = baseTop + gridCoord.top * spacedSize;
            var left = baseLeft + gridCoord.left * spacedSize;

            var gridCell = new qx.ui.layout.BoxLayout;
            gridCell.setAppearance("debug");
            gridCell.setHeight(cellSize);
            gridCell.setWidth(cellSize);
            gridCell.setTop(top);
            gridCell.setLeft(left);
            gridCell.setHorizontalChildrenAlign("center");
            gridCell.setVerticalChildrenAlign("middle");

            var label = new qx.ui.basic.Label("" + ii);
            label.setAppearance("debug-font");
            gridCell.add(label);

            DOC.add(gridCell);
          }
        }
      }
    },


    /**
     * TODOC
     *
     * @type member
     * @param nextTop {var} TODOC
     * @param nextLeft {var} TODOC
     * @param minTop {var} TODOC
     * @param minLeft {var} TODOC
     * @param maxTop {var} TODOC
     * @param maxLeft {var} TODOC
     * @return {Object} TODOC
     */
    _getNextGridCoord : function(nextTop, nextLeft, minTop, minLeft, maxTop, maxLeft)
    {
      // this.debug("(*) Starting from top,left=" + nextTop + "," + nextLeft);
      switch(this._direction)
      {
          // ************************************************************************
          //   MOVING LEFT
          // ************************************************************************
        case ext.constant.Direction.HORIZONTAL_LEFT:

          // this.debug("    ---> moving left");
          nextLeft--;

          if (nextLeft < minLeft)
          {
            nextLeft = maxLeft;

            if (this._wrap == ext.constant.Direction.VERTICAL_UP)
            {

              // this.debug("    ---> wrapping up");
              nextTop--;
            }
            else
            {

              // this.debug("    ---> wrapping down");
              nextTop++;
            }
          }

          break;

          // ************************************************************************
          //   MOVING RIGHT
          // ************************************************************************

        case ext.constant.Direction.HORIZONTAL_RIGHT:

          // this.debug("    ---> moving right");
          nextLeft++;

          if (nextLeft > maxLeft)
          {
            nextLeft = minLeft;

            if (this._wrap == ext.constant.Direction.VERTICAL_UP)
            {

              // this.debug("    ---> wrapping up");
              nextTop--;
            }
            else
            {

              // this.debug("    ---> wrapping down");
              nextTop++;
            }
          }

          break;

          // ************************************************************************
          //   MOVING UP
          // ************************************************************************

        case ext.constant.Direction.VERTICAL_UP:

          // this.debug("    ---> moving up");
          nextTop--;

          if (nextTop < minTop)
          {
            nextTop = maxTop;

            if (this._wrap == ext.constant.Direction.HORIZONTAL_LEFT)
            {

              // this.debug("    ---> wrapping left");
              nextLeft--;
            }
            else
            {

              // this.debug("    ---> wrapping right");
              nextLeft++;
            }
          }

          break;

          // ************************************************************************
          //   MOVING DOWN
          // ************************************************************************

        case ext.constant.Direction.VERTICAL_DOWN:

          // this.debug("    ---> moving down");
          nextTop++;

          if (nextTop > maxTop)
          {
            nextTop = minTop;

            if (this._wrap == ext.constant.Direction.HORIZONTAL_LEFT)
            {

              // this.debug("    ---> wrapping left");
              nextLeft--;
            }
            else
            {

              // this.debug("    ---> wrapping right");
              nextLeft++;
            }
          }

          break;

          // ************************************************************************
          //   DEFAULT
          // ************************************************************************

        default:

          this.error("_getNextGridCoord() cannot handle this._direction=" + this._direction);

          break;
      }

      // this.debug("(*) Next position is top,left=" + nextTop + "," + nextLeft);
      // this.debug(".");
      var obj = this._getCellObj(nextTop, nextLeft);
      return obj;
    },


    /**
     * TODOC
     *
     * @type member
     * @param top {var} TODOC
     * @param left {var} TODOC
     * @return {Object} TODOC
     */
    _getCellObj : function(top, left)
    {
      var obj = {};
      obj.top = top;
      obj.left = left;
      return obj;
    },

    /*
      This method is used to establish the number of logical rows and columns that will
      fit into the current workspace.
    */

    /**
     * TODOC
     *
     * @type member
     * @return {void} 
     */
    _setDimensions : function()
    {
      // Establish current size of logical grid
      this._computeMarginBounds();

      // Determine number of rows and cols
      var spacedCellSize = this.getGridCellSize() + (this.getGridCellSpacing() * 2);

      this._numberOfRows = Math.floor(this._workspaceHeight / spacedCellSize);
      this._numberOfCols = Math.floor(this._workspaceWidth / spacedCellSize);
    },

    /*
      Determine the pixel coordinates of the logical grid, taking into account
      the grid margin.  Note that this method requires computeBounds() to have
      been executed first.
    */

    /**
     * TODOC
     *
     * @type member
     * @return {void} 
     */
    _computeMarginBounds : function()
    {
      this.computeBounds();

      this._gridTop = this._workspaceTop + this.getGridMargin();
      this._gridLeft = this._workspaceLeft + this.getGridMargin();
      this._gridBottom = this._workspaceBottom + this.getGridMargin();
      this._gridRight = this._workspaceRight + this.getGridMargin();
      this._gridHeight = this._workspaceHeight - (2 * +this.getGridMargin());
      this._gridWidth = this._workspaceWidth - (2 * +this.getGridMargin());

      // How much "unused" space is there beyond the rows and cols?
      var spacedCellSize = this.getGridCellSize() + (this.getGridCellSpacing() * 2);
      this._verticalPadding = Math.floor(this._gridHeight % spacedCellSize);
      this._horizontalPadding = Math.floor(this._gridWidth % spacedCellSize);
    },

    /*
      This method establishes the position of the zeroeth widget in terms of
      logical grid cells.
    */

    /**
     * TODOC
     *
     * @type member
     * @return {void} 
     */
    _setOrigin : function()
    {
      switch(this.getOrigin())
      {
        case ext.constant.Position.TOP_LEFT:

          this._zeroethTop = 0;
          this._zeroethLeft = 0;
          break;

        case ext.constant.Position.TOP_RIGHT:

          this._zeroethTop = 0;
          this._zeroethLeft = this._numberOfCols - 1;
          break;

        case ext.constant.Position.BOTTOM_LEFT:

          this._zeroethTop = this._numberOfRows - 1;
          this._zeroethLeft = 0;
          break;

        case ext.constant.Position.BOTTOM_RIGHT:

          this._zeroethTop = this._numberOfRows - 1;
          this._zeroethLeft = this._numberOfCols - 1;
          break;

        default:

          this._zeroethTop = 0;
          this._zeroethLeft = 0;
          break;
      }
    },




    /*
    ---------------------------------------------------------------------------
      EVENTS
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void} 
     */
    _handleresizeworkspace : function(e) {
      this._repositionAll();
    }
  }
});
