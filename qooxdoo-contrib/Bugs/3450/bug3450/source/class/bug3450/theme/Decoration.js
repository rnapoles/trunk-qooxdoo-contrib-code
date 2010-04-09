/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("bug3450.theme.Decoration",
{
  extend : qx.theme.modern.Decoration,

  decorations :
  {
   "decotest" :
   {
     decorator: qx.ui.decoration.Double,
     style :
     {
       width : [1, 1, 0, 1],
       innerWidth: [2, 0, 0, 0],
       color : "blue",//"border-tabview",
       innerColor: "green", //"effect",
       backgroundImage: "bug3450/test.png",//"qxetd/tabview-button-active-top.png",
       backgroundRepeat: "scale"
      }
   }
    
  }
});
