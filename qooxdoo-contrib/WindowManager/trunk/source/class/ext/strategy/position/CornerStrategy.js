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
This positioning strategy will cyclically position widgets in the corners of
a CanvasLayout.

@param vOrder An Array of four integers whose values are each one of
              TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT.  These
              represent the order that corners should be used by this
              positioning strategy.
@param vWorkspace A CanvasLayout that widgets should be positioned within.

@author sbull
*/

qx.Class.define("ext.strategy.position.CornerStrategy",
{
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vOrder, vWorkspace)
  {
    qx.core.Object.call(this);

    this.debug("constructor() vOrder=" + vOrder);
    this.debug("constructor() vWorkspace=" + vWorkspace);

    // ************************************************************************
    //   CORNER ORDER
    // ************************************************************************
    this._order = (this._validateOrder(vOrder)) ? vOrder : [ ext.strategy.position.CornerStrategy.TOP_LEFT, ext.strategy.position.CornerStrategy.TOP_RIGHT, ext.strategy.position.CornerStrategy.BOTTOM_LEFT, ext.strategy.position.CornerStrategy.BOTTOM_RIGHT ];

    // ************************************************************************
    //   WORKSPACE
    // ************************************************************************
    this._workspace = vWorkspace;

    // ************************************************************************
    //   NUMBER OF WIDGETS POSITIONED
    // ************************************************************************
    this._positionedWidgets = 0;
  },




  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /*
    ---------------------------------------------------------------------------
      CONSTANTS
    ---------------------------------------------------------------------------
    */

    TOP_LEFT     : 0,
    TOP_RIGHT    : 1,
    BOTTOM_LEFT  : 2,
    BOTTOM_RIGHT : 3,

    /*
      A number of pixels in from the workspace top to position widgets.
    */

    TOP_PADDING  : 2
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
      IMPL
    ---------------------------------------------------------------------------
    */

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
      // Determine Workspace bounds
      var wsTop = this._workspace.getTop();
      var wsLeft = this._workspace.getLeft();
      var wsHeight = this._workspace._computeBoxHeight();
      var wsWidth = this._workspace._computeBoxWidth();
      var widgetHeight = vWidget._computeBoxHeight();
      var widgetWidth = vWidget._computeBoxWidth();

      // Determine which corner to position this widget in
      var corner = this._order[this._positionedWidgets % 4];

      // Now position the widget
      switch(corner)
      {
        case ext.strategy.position.CornerStrategy.TOP_LEFT:

          var yPos = wsTop + ext.strategy.position.CornerStrategy.TOP_PADDING;
          var xPos = wsLeft;
          vWidget.setSpace(xPos, widgetWidth, yPos, widgetHeight);

          break;

        case ext.strategy.position.CornerStrategy.TOP_RIGHT:

          var yPos = wsTop + ext.strategy.position.CornerStrategy.TOP_PADDING;
          var xPos = wsWidth - widgetWidth - wsLeft;
          vWidget.setSpace(xPos, widgetWidth, yPos, widgetHeight);
          break;

        case ext.strategy.position.CornerStrategy.BOTTOM_RIGHT:

          var yPos = wsHeight - widgetHeight + wsTop;
          var xPos = wsWidth - widgetWidth - wsLeft;
          vWidget.setSpace(xPos, widgetWidth, yPos, widgetHeight);
          break;

        case ext.strategy.position.CornerStrategy.BOTTOM_LEFT:

          var yPos = wsHeight - widgetHeight + wsTop;
          var xPos = wsLeft;
          vWidget.setSpace(xPos, widgetWidth, yPos, widgetHeight);
          break;

        default:

          this.warn("position() Can't position widget in corner=" + corner);

          var yPos = wsTop + ext.strategy.position.CornerStrategy.TOP_PADDING;
          var xPos = wsLeft;
          vWidget.setSpace(xPos, widgetWidth, yPos, widgetHeight);
          break;
      }

      // Increment counter
      this._positionedWidgets++;
    },




    /*
    ---------------------------------------------------------------------------
      UTILITIES
    ---------------------------------------------------------------------------
    */

    /*
      @return true if order is an Array of four elements, each with a value
              representing a corner.  Otherwise return fase.
    */

    /**
     * TODOC
     *
     * @type member
     * @param order {var} TODOC
     * @return {var} TODOC
     */
    _validateOrder : function(order)
    {
      var isValidOrder = false;

      if (order != null && order.length == 4)
      {
        // Check that each point is one of the allowed values
        var allValidValues = true;

        for (var i=0; i<order.length; i++)
        {
          if (order[i] == ext.strategy.position.CornerStrategy.TOP_LEFT || order[i] == ext.strategy.position.CornerStrategy.TOP_RIGHT || order[i] == ext.strategy.position.CornerStrategy.BOTTOM_LEFT || order[i] == ext.strategy.position.CornerStrategy.BOTTOM_RIGHT) {}

          // Do nothing
          else
          {
            allValidValues = false;
            break;
          }
        }

        if (allValidValues) {
          isValidOrder = true;
        }
      }

      return isValidOrder;
    }
  }
});
