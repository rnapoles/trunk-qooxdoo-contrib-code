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
@author sbull
*/
qx.OO.defineClass("ext.strategy.position.MinimiseStrategy",
                  ext.strategy.position.GridStrategy,
function(vWorkspace, vOrigin, vDirection, vWrap, vCellSize, vCellSpacing) {


  ext.strategy.position.GridStrategy.call(this, vWorkspace, vOrigin, vDirection,
                                          vWrap, vCellSize, vCellSpacing);

});


/*
---------------------------------------------------------------------------
  PROPERTIES
---------------------------------------------------------------------------
*/


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


qx.Proto._getWidgetIndex = function(vWidget)
{
  var all = this._widgets;
  var index = -1;
  for (var i = 0; i < all.length; i++)
  {
    var obj = all[i];
    if (obj != null && obj._hashCode == vWidget._hashCode) {
      index = i;
      break;
    }
  }
  return index;
}


/*
---------------------------------------------------------------------------
  IMPL
---------------------------------------------------------------------------
*/


/*
  Override super's position because for this class we want to position
  vWidget.getMinimisedAtom() rather than vWidget itself.
*/
qx.Proto.position = function(vWidget)
{

  // ************************************************************************
  //   ATOM
  // ************************************************************************

  var atom = vWidget.getMinimisedAtom();


  // ************************************************************************
  //   POSITION ATOM
  // ************************************************************************

  var index = this._getNextAvailableIndex();
  this._position(atom, index);
}


/*
  This method is called when a the minimised widget is double clicked.

  It removes the widget from the this._widgets Array, meaning that the
  empty gridcell is available for use again.
*/
qx.Proto.restore = function(vWidget)
{
  var atom = vWidget.getMinimisedAtom();

  // Locate this widget in this._widgets
  var index = this._getWidgetIndex(atom);

  this._widgets[index] = null;
}

