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
This positioning strategy will maximise windows within a CanvasLayout.

@param vWorkspace A CanvasLayout that widgets should be positioned within.

@author sbull
*/
qx.OO.defineClass("ext.strategy.position.TileStrategy", ext.strategy.position.AbstractPositionStrategy,
function(vWorkspace) {


  ext.strategy.position.AbstractPositionStrategy.call(this, vWorkspace);

});


/*
---------------------------------------------------------------------------
  CONSTANTS
---------------------------------------------------------------------------
*/


/*
  A number of pixels in from the workspace top to position widgets.
*/
ext.strategy.position.TileStrategy.TOP_PADDING  = 2;


/*
---------------------------------------------------------------------------
  IMPL
---------------------------------------------------------------------------
*/


/*
  This method will arrange a collection of widgets within the workspace.

  @param vWidgets An Array of widgets to be arranged.
*/
qx.Proto.arrange = function(vWidgets)
{
  if (vWidgets == null || vWidgets.length < 1)
  {
    this.warn("arrange() Cannot arrange vWidgets=" + vWidgets);
    return;
  }


  // Determine Workspace bounds
  var wsTop        = this._workspace.getTop();
  var wsLeft       = this._workspace.getLeft();
  var wsHeight     = this._workspace._computeBoxHeight();
  var wsWidth      = this._workspace._computeBoxWidth();
  var wsBottom     = wsTop + wsHeight;
  var wsRight      = wsLeft + wsWidth;



  // Position our widget
  var yPos = wsTop + ext.strategy.position.TileStrategy.TOP_PADDING;
  var xPos = wsLeft;
  vWidget.setSpace(xPos, wsWidth, yPos, wsHeight);

}