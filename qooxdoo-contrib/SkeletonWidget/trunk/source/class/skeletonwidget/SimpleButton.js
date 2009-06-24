/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(skeletonwidget/*)

************************************************************************ */

/**
 * A simple button
 */
qx.Class.define("skeletonwidget.SimpleButton",
{
  extend : qx.ui.form.Button,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(text)
  {
    this.base(arguments, text, "skeletonwidget/image/test.png");
  },
  
  
   /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : 
  {
    appearance :
    {
      refine : true,
      init : "simple-button"
    }
  },
  
  
  /*
  *****************************************************************************
     SETTINGS
  *****************************************************************************
  */

  settings : {
    "skeletonwidget.resourceUri" : "./resource"
  }
  
});