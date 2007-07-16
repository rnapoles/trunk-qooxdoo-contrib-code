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
qx.OO.defineClass("windowdemo.Application", qx.component.AbstractApplication,
function () {
  qx.component.AbstractApplication.call(this);
});

qx.Settings.setDefault("resourceUri", "./resource");


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


/*
---------------------------------------------------------------------------
  METHODS
---------------------------------------------------------------------------
*/

qx.Proto.initialize = function(e)
{
  // Define alias for windowdemo resource path
  qx.manager.object.AliasManager.getInstance().add("windowdemo", qx.Settings.getValueOfClass("windowdemo.Application", "resourceUri"));
};


qx.Proto.main = function(e)
{
  // Extend Qx's default theme
  this._extendTheme();

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
    }

  ];

  WINDOW_MANAGER = new ext.manager.object.WindowManager(supportedWindowTypes);
};


/*
  Extend the default appearance theme.
*/
qx.Proto._extendTheme = function()
{
  var theme = qx.manager.object.AppearanceManager.getInstance().getAppearanceTheme();

  // Override default list
  theme.registerAppearance("list",
  {
    setup : function()
    {
      this.bgcolor = new qx.renderer.color.Color("white");
    },

    initial : function(vTheme) {
      return {
        overflow : "hidden",
        backgroundColor : this.bgcolor
      }
    }
  });

  // Override the default window-statusbar
  // So that we can set ChildrenAlign properties
  theme.registerAppearance("window-statusbar",
  {
    initial : function(vTheme) {
      return {
        horizontalChildrenAlign : "right",
        verticalChildrenAlign : "middle",
        width : "100%",
        height : 20,
        paddingTop : 1,
        paddingRight : 1,
        paddingBottom : 1,
        paddingLeft : 1
      }
    }
  });

  theme.registerAppearance("statusbar-text-field",
  {
    setup : function() {
        this.font = new qx.renderer.font.Font(11, '"Segoe UI", Corbel, Calibri, Tahoma, "Lucida Sans Unicode", sans-serif');
        this.font.setBold(false);
        this.bgcolor = new qx.renderer.color.ColorObject("threedface");
    },

    initial : function(vTheme) {
      return {
        hideFocus : true,
        border : qx.renderer.border.BorderPresets.getInstance().thinInset,
        color : this.color,
        backgroundColor : this.bgcolor,
        paddingTop : 1,
        paddingRight : 3,
        paddingBottom : 1,
        paddingLeft : 3,
        allowStretchY : false,
        allowStretchX : true,
        font : this.font
      }
    }
  });

  theme.registerAppearance("statusbar-text-field-busy",
  {
    setup : function() {
        this.font = new qx.renderer.font.Font(11, '"Segoe UI", Corbel, Calibri, Tahoma, "Lucida Sans Unicode", sans-serif');
        this.font.setBold(true);
        this.color = new qx.renderer.color.Color("white");
        this.bgcolor = new qx.renderer.color.ColorObject("activecaption");
    },

    initial : function(vTheme) {
      return {
        hideFocus : true,
        border : qx.renderer.border.BorderPresets.getInstance().thinInset,
        color : this.color,
        backgroundColor : this.bgcolor,
        paddingTop : 1,
        paddingRight : 3,
        paddingBottom : 1,
        paddingLeft : 3,
        allowStretchY : false,
        allowStretchX : true,
        font : this.font
      }
    }
  });

  // Override the default window-statusbar-text
  // So that we include the "font" attribute
  theme.registerAppearance("window-statusbar-text",
  {
    setup : function()
    {
      this.font = new qx.renderer.font.Font(11, '"Segoe UI", Corbel, Calibri, Tahoma, "Lucida Sans Unicode", sans-serif');
    },

    initial : function(vTheme) {
      return {
        paddingTop : 1,
        paddingRight : 4,
        paddingBottom : 1,
        paddingLeft : 4,
        cursor : "default",
        font : this.font
      }
    }
  });

  theme.registerAppearance("titlebar-font",
  {
    setup : function()
    {
      this.font = new qx.renderer.font.Font(12, '"Segoe UI", Corbel, Calibri, Tahoma, "Lucida Sans Unicode", sans-serif');
      this.font.setBold(true);
      this.color = new qx.renderer.color.Color("white");
    },

    initial : function(vTheme)
    {
      return {
        font : this.font,
        color : this.color,
        marginLeft : 4
      }
    }
  });

  theme.registerAppearance("workspace",
  {
    initial : function(vTheme)
    {
      return {
        border : qx.renderer.border.BorderPresets.getInstance().thinInset
      };
    }
  });

  theme.registerAppearance("pane-content",
  {
    initial : function(vTheme)
    {
      return {
        backgroundColor : "white",
        height : "100%",
        width : "100%",
        border : qx.renderer.border.BorderPresets.getInstance().thinInset
      };
    }
  });

  theme.registerAppearance("split-pane-content",
  {
    initial : function(vTheme)
    {
      return {
        backgroundColor : "white",
        border : qx.renderer.border.BorderPresets.getInstance().thinInset,
        overflow : "auto"
      };
    }
  });

  theme.registerAppearance("window-busy-blocker",
  {
    setup : function()
    {
      this.bgcolor = new qx.renderer.color.ColorObject("inactivecaption");
    },

    initial : function(vTheme)
    {
      return {
        backgroundColor : this.bgcolor,
        opacity : 0.0,
        cursor : "wait"
      };
    }
  });


  theme.registerAppearance("window-focus-blocker",
  {
    setup : function()
    {
      this.bgcolor = new qx.renderer.color.ColorObject("activecaption");
    },

    initial : function(vTheme)
    {
      return {
        backgroundColor : this.bgcolor,
        opacity : 0.15,
        cursor : "default"
      };
    }
  });
}


qx.Proto.finalize = function(e)
{
  // After initial rendering...
};


qx.Proto.close = function(e)
{
  // Prompt user
  // e.returnValue = "[qooxdoo application: Do you really want to close the application?]";
};


qx.Proto.terminate = function(e)
{
  // alert("terminated");
};
