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
  A trivial window subclass to play with.
*/
qx.OO.defineClass("ext.ui.window.UsersImageWindow", ext.ui.window.AbstractImageWindow,
function(vCaption, vIcon, vWindowManager, vMinIcon)
{
  ext.ui.window.AbstractImageWindow.call(this, vCaption, vIcon, vWindowManager, vMinIcon, "apps/system-users");
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
