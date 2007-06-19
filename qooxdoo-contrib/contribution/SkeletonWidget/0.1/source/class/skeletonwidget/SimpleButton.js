/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#resource(image:image)
#embed(skeletonwidget.image/*)

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
    this.base(arguments, text, qx.core.Setting.get("skeletonwidget.resourceUri") + "/image/test.png");

    if (!this.self(arguments).__initialized )
    {
      this.self(arguments).__initialized = true;
      this.self(arguments).__initialize();
    }
  },
  
  
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    __initialized : false,
    __initialize : function()
    {
      var changeListener = function(newAppearanceTheme)
      {
        // include appearance for SimpleButton
        qx.Theme.patch(newAppearanceTheme, skeletonwidget.MSimpleButtonAppearance);
      };
      
      changeListener(qx.theme.manager.Appearance.getInstance().getAppearanceTheme());
      qx.theme.manager.Appearance.getInstance().addEventListener("changeAppearanceTheme", changeListener);
    }
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