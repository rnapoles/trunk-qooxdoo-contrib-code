/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#ignore(auto-use)

************************************************************************* */

qx.Theme.define("ext.theme.classic.Appearance",
{
  title: "Classic mixin for ext",

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
    },

    "list" : {
      style : function(states) {
        return {
          overflow        : "hidden",
          backgroundColor : "white"
        };
      }
    },

    // Override the default window-statusbar
    // So that we can set ChildrenAlign properties
    "window-statusbar" : {
      style : function(states) {
        return {
          horizontalChildrenAlign : "right",
          verticalChildrenAlign   : "middle",
          width                   : "100%",
          height                  : 20,
          paddingTop              : 1,
          paddingRight            : 1,
          paddingBottom           : 1,
          paddingLeft             : 1
        };
      }
    },


    "statusbar-text-field" : {
      style : function(states) {
        var font = new qx.ui.core.Font(11, ["Segoe UI", "Corbel", "Calibri", "Tahoma", "Lucida Sans Unicode", "sans-serif"]);
        font.setBold(false);

        return {
          //hideFocus       : true,  // will be themeable in 0.7.2
          border          : "inset-thin",
          backgroundColor : "background",
          paddingTop      : 1,
          paddingRight    : 3,
          paddingBottom   : 1,
          paddingLeft     : 3,
          font            : font
        };
      }
    },


    "statusbar-text-field-busy" : {
      style : function(states) {
        var font = new qx.ui.core.Font(11, ["Segoe UI", "Corbel", "Calibri", "Tahoma", "Lucida Sans Unicode", "sans-serif"]);
        font.setBold(true);

        return {
          //hideFocus       : true,  // will be themeable in 0.7.2
          border          : "inset-thin",
          textColor       : "white",
          backgroundColor : "window-active-caption",
          paddingTop      : 1,
          paddingRight    : 3,
          paddingBottom   : 1,
          paddingLeft     : 3,
          font            : font
        };
      }
    },


    // Override the default window-statusbar-text
    // So that we include the "font" attribute
    "window-statusbar-text" : {
      style : function(states) {
        var font = new qx.ui.core.Font(11, ["Segoe UI", "Corbel", "Calibri", "Tahoma", "Lucida Sans Unicode", "sans-serif"]);
        return {
          paddingTop    : 1,
          paddingRight  : 4,
          paddingBottom : 1,
          paddingLeft   : 4,
          cursor        : "default",
          font          : font
        };
      }
    },


    "window-busy-blocker" : {
      style : function(states) {
        return {
          backgroundColor : "window-inactive-caption",
          opacity         : 0.0,
          cursor          : "wait"
        };
      }
    },


    "window-focus-blocker" : {
      style : function(states) {
        return {
          backgroundColor : "window-active-caption",
          opacity         : 0.15,
          cursor          : "default"
        };
      }
    },


    "titlebar-font" : {
      style : function(states) {
        var font = new qx.ui.core.Font(11, ["Segoe UI", "Corbel", "Calibri", "Tahoma", "Lucida Sans Unicode", "sans-serif"]);
        font.setBold(true);
        return {
          font       : font,
          textColor  : "white",
          marginLeft : 4
        };
      }
    },


    "workspace" : {
      style : function(states) {
        return { border : "inset-thin" };
      }
    },


    "pane-content" : {
      style : function(states) {
        return {
          backgroundColor : "white",
          height          : "100%",
          width           : "100%",
          border          : "inset-thin"
        };
      }
    },


    "split-pane-content" : {
      style : function(states) {
        return {
          backgroundColor : "white",
          border          : "inset-thin",
          overflow        : "auto"
        };
      }
    }

  }
});