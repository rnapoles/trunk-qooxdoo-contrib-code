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
This positioning strategy cascades windows from the top-left corner of the
screen until this.MAX_CASCADE windows have been positioned.  Then it starts
again from the top-left corner.

@author sbull
*/
qx.OO.defineClass("ext.strategy.position.CascadeStrategy", qx.core.Object,
function(vOrigin, vWorkspace) {

  qx.core.Object.call(this);


  // ************************************************************************
  //   WORKSPACE
  // ************************************************************************

  this._workspace = vWorkspace;


  // ************************************************************************
  //   ORIGIN
  // ************************************************************************

  this._origin = (this._validateOrigin(vOrigin)) ? vOrigin : ext.strategy.position.CornerStrategy.TOP_LEFT;


  // ************************************************************************
  //   INITIAL TRAVEL DIRECTION
  // ************************************************************************

  this._horizontalTravel = null;
  this._verticalTravel   = null;

  switch (this._origin)
  {
    case ext.strategy.position.CornerStrategy.TOP_LEFT :

      this._horizontalTravel = ext.strategy.position.CascadeStrategy.HORIZONTAL_DIR_RIGHT;
      this._verticalTravel   = ext.strategy.position.CascadeStrategy.VERTICAL_DIR_DOWN;
      break;

    case ext.strategy.position.CornerStrategy.TOP_RIGHT :

      this._horizontalTravel = ext.strategy.position.CascadeStrategy.HORIZONTAL_DIR_LEFT;
      this._verticalTravel   = ext.strategy.position.CascadeStrategy.VERTICAL_DIR_DOWN;
      break;

    case ext.strategy.position.CornerStrategy.BOTTOM_RIGHT :

      this._horizontalTravel = ext.strategy.position.CascadeStrategy.HORIZONTAL_DIR_LEFT;
      this._verticalTravel   = ext.strategy.position.CascadeStrategy.VERTICAL_DIR_UP;
      break;

    case ext.strategy.position.CornerStrategy.BOTTOM_LEFT :

      this._horizontalTravel = ext.strategy.position.CascadeStrategy.HORIZONTAL_DIR_RIGHT;
      this._verticalTravel   = ext.strategy.position.CascadeStrategy.VERTICAL_DIR_UP;
      break;

    default :

      this._horizontalTravel = ext.strategy.position.CascadeStrategy.HORIZONTAL_DIR_RIGHT;
      this._verticalTravel   = ext.strategy.position.CascadeStrategy.VERTICAL_DIR_DOWN;
      break;
  }


  // ************************************************************************
  //   LAST WINDOW POSITION
  // ************************************************************************

  this._lastTop = this._workspace.getTop() + ext.strategy.position.CornerStrategy.TOP_PADDING;
  this._lastLeft  = this._workspace.getLeft() + ext.strategy.position.CornerStrategy.TOP_PADDING;

});


/*
---------------------------------------------------------------------------
  CONSTANTS
---------------------------------------------------------------------------
*/

// A number of pixels to move each window
ext.strategy.position.CascadeStrategy.TRAVEL = 22;


ext.strategy.position.CascadeStrategy.VERTICAL_DIR_UP      = "up";
ext.strategy.position.CascadeStrategy.VERTICAL_DIR_DOWN    = "down";
ext.strategy.position.CascadeStrategy.HORIZONTAL_DIR_LEFT  = "left";
ext.strategy.position.CascadeStrategy.HORIZONTAL_DIR_RIGHT = "right";


/*
---------------------------------------------------------------------------
  IMPL
---------------------------------------------------------------------------
*/


/*
  This method will position a widget within the workspace.
*/
qx.Proto.position = function(vWidget)
{

  // ************************************************************************
  //   DETERMINE WORKSPACE BOUNDS
  // ************************************************************************

  var wsTop        = this._workspace.getTop();
  var wsLeft       = this._workspace.getLeft();
  var wsHeight     = this._workspace._computeBoxHeight();
  var wsWidth      = this._workspace._computeBoxWidth();
  var wsBottom     = wsTop + wsHeight;
  var wsRight      = wsLeft + wsWidth;

  var widgetHeight = vWidget._computeBoxHeight();
  var widgetWidth  = vWidget._computeBoxWidth();


  // ************************************************************************
  //   DETERMINE IF TRAVEL WOULD POSITION VWIDGET OUTSIDE WORKSPACE
  // ************************************************************************

  var newWidgetTop = (this._verticalTravel == ext.strategy.position.CascadeStrategy.VERTICAL_DIR_DOWN)
    ? this._lastTop + ext.strategy.position.CascadeStrategy.TRAVEL
    : this._lastTop - ext.strategy.position.CascadeStrategy.TRAVEL;

  var newWidgetBottom = newWidgetTop + widgetHeight;

  var newWidgetLeft = (this._horizontalTravel == ext.strategy.position.CascadeStrategy.HORIZONTAL_DIR_RIGHT)
    ? this._lastLeft + ext.strategy.position.CascadeStrategy.TRAVEL
    : this._lastLeft - ext.strategy.position.CascadeStrategy.TRAVEL;

  var newWidgetRight = newWidgetLeft + widgetWidth;


  // ************************************************************************
  //   SWITCH TRAVEL DIRECTION IF NECESSARY
  // ************************************************************************

  if (newWidgetTop < wsTop || newWidgetBottom > wsBottom)
  {
    // Switch vertical travel direction
    this._verticalTravel = (this._verticalTravel == ext.strategy.position.CascadeStrategy.VERTICAL_DIR_DOWN)
      ? ext.strategy.position.CascadeStrategy.VERTICAL_DIR_UP
      : ext.strategy.position.CascadeStrategy.VERTICAL_DIR_DOWN;
  }

  if (newWidgetLeft < wsLeft || newWidgetRight > wsRight)
  {
    // Switch horizontal travel direction
    this._horizontalTravel = (this._horizontalTravel == ext.strategy.position.CascadeStrategy.HORIZONTAL_DIR_LEFT)
      ? ext.strategy.position.CascadeStrategy.HORIZONTAL_DIR_RIGHT
      : ext.strategy.position.CascadeStrategy.HORIZONTAL_DIR_LEFT;
  }


  // ************************************************************************
  //   POSITION WIDGET
  // ************************************************************************
  var yPos = this._lastTop = (this._verticalTravel == ext.strategy.position.CascadeStrategy.VERTICAL_DIR_DOWN)
    ? this._lastTop + ext.strategy.position.CascadeStrategy.TRAVEL
    : this._lastTop - ext.strategy.position.CascadeStrategy.TRAVEL;

  var xPos = this._lastLeft = (this._horizontalTravel == ext.strategy.position.CascadeStrategy.HORIZONTAL_DIR_RIGHT)
    ? this._lastLeft + ext.strategy.position.CascadeStrategy.TRAVEL
    : this._lastLeft - ext.strategy.position.CascadeStrategy.TRAVEL;

  vWidget.setSpace(xPos, widgetWidth, yPos, widgetHeight);

}


/*
---------------------------------------------------------------------------
  UTILITIES
---------------------------------------------------------------------------
*/


/*
  @return true if origin is an int that represents a corner, else false.
*/
qx.Proto._validateOrigin = function(origin)
{
  var isValidOrigin = false;

  if (origin != null)
  {
    if (   origin == ext.strategy.position.CornerStrategy.TOP_LEFT
        || origin == ext.strategy.position.CornerStrategy.TOP_RIGHT
        || origin == ext.strategy.position.CornerStrategy.BOTTOM_LEFT
        || origin == ext.strategy.position.CornerStrategy.BOTTOM_RIGHT )
    {
      isValidOrigin = true;
    }
  }

  return isValidOrigin;
}
