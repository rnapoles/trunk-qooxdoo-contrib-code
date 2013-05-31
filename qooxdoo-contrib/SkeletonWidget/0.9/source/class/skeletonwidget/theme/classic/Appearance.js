/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#ignore(auto-use)

************************************************************************* */

/**
 * Button appearacne theme.
 */
qx.Theme.define("skeletonwidget.theme.classic.Appearance",
{
  title: "Classic mixin for skeletonwidget.SimpleButton",

  appearances :
  {    
    "simple-button" : 
    {
      include : "button",
       
      style : function(states) {
        return {
          backgroundColor : "#DFEBFD"
        }
      }
    }
    
  }
});
