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
qx.OO.defineClass("ext.strategy.position.MaximiseStrategy", qx.core.Object,
function(vWorkspace) {


  qx.core.Object.call(this);


  // ************************************************************************
  //   WORKSPACE
  // ************************************************************************

  this._workspace = vWorkspace;

});


/*
---------------------------------------------------------------------------
  CONSTANTS
---------------------------------------------------------------------------
*/


/*
  A number of pixels in from the workspace top to position widgets.
*/
ext.strategy.position.MaximiseStrategy.TOP_PADDING  = 2;


/*
---------------------------------------------------------------------------
  IMPL
---------------------------------------------------------------------------
*/


/*
  This method will maximise a widget within the workspace.
*/
qx.Proto.position = function(vWidget)
{

  // Determine Workspace bounds
  var wsTop        = this._workspace.getTop();
  var wsLeft       = this._workspace.getLeft();
  var wsHeight     = this._workspace._computeBoxHeight();
  var wsWidth      = this._workspace._computeBoxWidth();

  // Position our widget
  var yPos = wsTop + ext.strategy.position.MaximiseStrategy.TOP_PADDING;
  var xPos = wsLeft;
  vWidget.setSpace(xPos, wsWidth, yPos, wsHeight);

}
