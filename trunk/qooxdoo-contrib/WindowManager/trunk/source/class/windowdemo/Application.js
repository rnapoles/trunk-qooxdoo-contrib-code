/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#resource(image:image)

************************************************************************ */

/**
 * Your windowdemo application
 */
qx.Class.define("windowdemo.Application",
{
  extend : qx.application.Gui,


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     */
    main : function()
    {
      this.base(arguments);

      // Define alias for windowdemo resource path
      qx.io.Alias.getInstance().add("windowdemo", qx.core.Setting.get("windowdemo.resourceUri"));
      
      // Extend Qx's default theme
      qx.Theme.patch(qx.theme.classic.Appearance, ext.theme.classic.Appearance);

      // Assemble startup UI
      var assembler = windowdemo.init.Assembler.getInstance();
      assembler.addTitleBar();
      assembler.addMenuBar();
      WORKSPACE = assembler.addWorkspace();

      // Define supported window types
      //
      // If you do not specify a height and width, blocker height and width cannot
      // be calculated correctly -- blockers will appear to be failing.
      //
      // If you do not specify a minHeight and minWidth, overflow settings will
      // now work correctly.
      var supportedWindowTypes = [
      {
        classname    : "ext.ui.window.Window",
        caption      : "Generic Window",
        icon         : "apps/preferences-desktop-wallpaper",
        minIcon      : "apps/preferences-desktop-wallpaper",
        height       : 300,
        minHeight    : 128,
        width        : 300,
        minWidth     : 128,
        maxNumber    : 10,
        modal        : false,
        clickToFocus : true
      },

      {
        classname    : "ext.ui.window.UsersImageWindow",
        caption      : "Users Window",
        icon         : "apps/system-users",
        minIcon      : "apps/system-users",
        height       : 300,
        minHeight    : 128,
        width        : 300,
        minWidth     : 128,
        maxNumber    : 10,
        modal        : false,
        clickToFocus : true
      },

      {
        classname    : "ext.ui.window.ServicesImageWindow",
        caption      : "Services Window",
        icon         : "places/services",
        minIcon      : "places/services",
        height       : 300,
        minHeight    : 128,
        width        : 300,
        minWidth     : 128,
        maxNumber    : 10,
        modal        : false,
        clickToFocus : true
      },

      {
        classname    : "ext.ui.window.AlarmImageWindow",
        caption      : "Alarm Window",
        icon         : "apps/accessories-tip",
        minIcon      : "apps/accessories-tip",
        height       : 300,
        minHeight    : 128,
        width        : 300,
        minWidth     : 128,
        maxNumber    : 10,
        modal        : false,
        clickToFocus : true
      } ];

      WINDOW_MANAGER = new ext.manager.object.WindowManager(supportedWindowTypes);
    }

  },




  /*
  *****************************************************************************
     SETTINGS
  *****************************************************************************
  */

  settings : {
    "windowdemo.resourceUri" : "./resource"
  }
  
});




/*
---------------------------------------------------------------------------
  GLOBAL CONSTANTS
---------------------------------------------------------------------------
*/

/*
  A shortcut to the qx.ui.core.ClientDocument instance.

  This is initialised by xfc.init.Assembler.
*/

var DOC = null;

/*
  A shortcut to our workspace.  The workspace is a layout into which the XFC
  UI is rendered.

  This is initialised by xfc.init.Assembler.
*/

var WORKSPACE = null;

/*
  A shortcut to our window manager.  The window manager is responsible for
  creating, positioning and disposing all window instances.

  This is initialised by xfc.init.Assembler.
*/

var WINDOW_MANAGER = null;
