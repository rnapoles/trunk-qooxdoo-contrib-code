/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("bug2059.theme.Appearance",
{
  extend : qx.theme.modern.Appearance,

  appearances :
  {
    "myContextMenu" : 
    {
      alias : "menu",
      include : "menu",
      
      style : function(states)
      {
        return {
          blockBackground : true,
          blockerColor : "black",
          blockerOpacity : 0.3
        };
      }
    }
  }
});