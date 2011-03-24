/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(contribdemobrowser/*)
#asset(demobrowser/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "contribdemobrowser"
 */
qx.Class.define("contribdemobrowser.Application",
{
  extend : qx.application.Standalone,

  construct : function()
  {
    this.base(arguments);

    // Include CSS files
    qx.bom.Stylesheet.includeFile("demobrowser/css/style.css");
    qx.bom.Stylesheet.includeFile("demobrowser/css/sourceview.css");
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden
    main : function()
    {
      this.base(arguments);

      // Enable logging in source (or debug build)
      if (qx.core.Environment.get("qx.debug"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      // Initialize the viewer
      this.viewer = new contribdemobrowser.DemoBrowser;
      this.getRoot().add(this.viewer, {edge:0});
    },

    // overridden
    finalize : function()
    {
      this.base(arguments);

      this.viewer.dataLoader("script/demodata.json");
    }
  },


  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeObjects("viewer");
  }
});
