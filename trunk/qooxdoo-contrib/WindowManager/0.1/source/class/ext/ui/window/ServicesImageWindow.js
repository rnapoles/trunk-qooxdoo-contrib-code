/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 - 2007

   Authors:
     * Simon Bull (sbull)

************************************************************************ */

/* ************************************************************************

#module(ui_window)

************************************************************************ */


/*
  A trivial window subclass to play with.
*/
qx.OO.defineClass("ext.ui.window.ServicesImageWindow", ext.ui.window.AbstractImageWindow,
function(vCaption, vIcon, vWindowManager, vMinIcon)
{
  ext.ui.window.AbstractImageWindow.call(this, vCaption, vIcon, vWindowManager, vMinIcon, "places/services");
});


/*
---------------------------------------------------------------------------
  DISPOSER
---------------------------------------------------------------------------
*/


qx.Proto.dispose = function()
{

  if (this.getDisposed()) {
    return true;
  }

  return ext.ui.window.AbstractImageWindow.prototype.dispose.call(this);
}
