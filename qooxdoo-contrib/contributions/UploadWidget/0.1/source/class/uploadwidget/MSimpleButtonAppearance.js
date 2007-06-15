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
qx.Theme.define("skeletonwidget.MSimpleButtonAppearance",
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
