/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 - 2007

   License:
     LGPL 2.1: http://www.gnu.org/licenses/lgpl.html

   Authors:
     * Simon Bull (sbull)

************************************************************************ */

/* ************************************************************************

#module(ui_window)

************************************************************************ */


/*
  This trivi
*/
qx.OO.defineClass("ext.ui.window.AbstractImageWindow", ext.ui.window.Window,
function(vCaption, vIcon, vWindowManager, vMinIcon, vContentIcon)
{
  ext.ui.window.Window.call(this, vCaption, vIcon, vWindowManager, vMinIcon);

  // ************************************************************************
  //   TOOLBAR
  // ************************************************************************

  var tb = this._toolbar = new qx.ui.toolbar.ToolBar;
  with(tb)
  {
    setTop(ext.constant.UI.BEZEL_WIDTH);
    setLeft(ext.constant.UI.BEZEL_WIDTH);
    setRight(ext.constant.UI.BEZEL_WIDTH);
  };

  var br = this._refresh = new qx.ui.toolbar.Button("Refresh", "icon/16/actions/reload.png");
  tb.add(br);

  this._pane.add(tb);


  // ************************************************************************
  //   CONTENT
  // ************************************************************************

  var c = this._content = new qx.ui.layout.CanvasLayout();
  with (c) {
    setTop(ext.constant.UI.TOOLBAR_HEIGHT + ext.constant.UI.BEZEL_WIDTH);
    setBottom(ext.constant.UI.BEZEL_WIDTH);
    setLeft(ext.constant.UI.BEZEL_WIDTH);
    setRight(ext.constant.UI.BEZEL_WIDTH);
    setAppearance("pane-content");
    setOverflow("hidden");
  }
  this._pane.add(c);


  // ************************************************************************
  //   CONTENT ICON
  // ************************************************************************

  var ci = this._contentIcon = new qx.ui.basic.Image("icon/128/" + vContentIcon + ".png");
  this._content.add(ci);

});


ext.ui.window.AbstractImageWindow.ABSTRACT_CLASS = "ext.ui.window.AbstractImageWindow";


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

  if (this._contentIcon)
  {
    this._contentIcon.dispose();
    this._contentIcon = null;
  }

  if (this._refresh)
  {
    this._refresh.dispose();
    this._refresh = null;
  }

  if (this._toolbar)
  {
    this._toolbar.dispose();
    this._toolbar = null;
  }

  return ext.ui.window.Window.prototype.dispose.call(this);
}
