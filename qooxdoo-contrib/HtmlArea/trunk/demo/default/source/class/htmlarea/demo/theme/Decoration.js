/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("htmlarea.demo.theme.Decoration",
{
  extend : qx.theme.modern.Decoration,

  decorations :
  {
    "main-bottom-left-right" :
    {
      decorator: qx.ui.decoration.Single,

      style :
      {
        width : 1,
        color : "border-main",
        widthTop: 0
      }
    }
  }
});