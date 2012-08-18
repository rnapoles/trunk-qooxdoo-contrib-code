/* ************************************************************************

   Copyright:
     2010-2012 Norbert Schröder

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

/* ************************************************************************

#asset(retrotheme/decoration/*)

************************************************************************ */

qx.Theme.define("retrotheme.theme.Decoration",
{
  aliases: {
    decoration: "retrotheme/decoration"
  },
  
  decorations :
  {
    /*
    ---------------------------------------------------------------------------
      CORE
    ---------------------------------------------------------------------------
    */
    
    "keyboard-focus" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        width : 1,
        color : "black",
        style : "dotted"
      }
    },
    
    "selected":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundColor: "selected"
      }
    },
    
    "selected-dragover" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        backgroundColor: "selected",
        bottom: [2, "solid", "#33508D"]
      }
    },
    
    "dragover" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        bottom: [2, "solid", "#33508D"]
      }
    },
    
    "border-invalid" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        top : [1, "solid", "red"],
        right : [1, "solid", "red"],
        bottom : [1, "solid", "red"],
        left : [1, "solid", "red"]
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      BUTTON
    ---------------------------------------------------------------------------
    */
    "button":
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        backgroundColor: "background-button",

        width : 1,
        colorTop : "border-outset-light",
        colorLeft: "border-outset-light",
        colorBottom: "border-outset-dark",
        colorRight: "border-outset-dark",
        style : "solid"
      }
    },
    
    "button-hovered":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "selected",

        width: 1,
        colorTop : "border-outset-light",
        colorLeft: "border-outset-light",
        colorBottom: "border-outset-dark",
        colorRight: "border-outset-dark",
        style: "solid"
      }
    },
    
    "button-checked":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "selected",

        width: 1,
        colorTop : "border-inset-dark",
        colorLeft: "border-inset-dark",
        colorBottom: "border-inset-light",
        colorRight: "border-inset-light",
        style: "solid"
      }
    },
    
    "button-red-hovered":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-button-red",

        width: 1,
        colorTop : "border-outset-light",
        colorLeft: "border-outset-light",
        colorBottom: "border-outset-dark",
        colorRight: "border-outset-dark",
        style: "solid"
      }
    },
    
    "button-red-checked":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-button-red",

        width: 1,
        colorTop : "border-inset-dark",
        colorLeft: "border-inset-dark",
        colorBottom: "border-inset-light",
        colorRight: "border-inset-light",
        style: "solid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      FRAMES
    ---------------------------------------------------------------------------
    */
    "frame":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "transparent",

        width: 1,
        color: "border-frame",
        
        style: "solid"
      }
    },
    
    "main":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "transparent",

        width: 1,
        colorTop: "border-main-dark",
        colorLeft: "border-main-dark",
        colorBottom: "border-main-light",
        colorRight: "border-main-light",
        style: "solid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      GROUPBOX
    ---------------------------------------------------------------------------
    */
    
    "group" :
    {
      decorator : qx.ui.decoration.Double,

      style :
      {
        backgroundColor: "background-groupbox",
        
        width : 1,
        colorTop : "border-inset-dark",
        colorLeft: "border-inset-dark",
        colorBottom: "border-inset-light",
        colorRight: "border-inset-light",
        
        innerWidth: 1,
        innerColorTop: "border-inset-inner-dark",
        innerColorLeft: "border-inset-inner-dark",
        innerColorBottom: "border-inset-inner-light",
        innerColorRight: "border-inset-inner-light",
        
        style : "solid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      LIST
    ---------------------------------------------------------------------------
    */
    "list":
    {
      decorator: qx.ui.decoration.Double,

      style:
      {
        backgroundColor: "background-list",

        width : 1,
        colorTop : "border-inset-dark",
        colorLeft: "border-inset-dark",
        colorBottom: "border-inset-light",
        colorRight: "border-inset-light",
        
        innerWidth: 1,
        innerColorTop: "border-inset-inner-dark",
        innerColorLeft: "border-inset-inner-dark",
        innerColorBottom: "border-inset-inner-light",
        innerColorRight: "border-inset-inner-light",
        
        style: "solid"
      }
    },
    
    "list-focused":
    {
      decorator: qx.ui.decoration.Double,

      style:
      {
        backgroundColor: "background-list-focused",

        width : 1,
        colorTop : "border-inset-dark",
        colorLeft: "border-inset-dark",
        colorBottom: "border-inset-light",
        colorRight: "border-inset-light",
        
        innerWidth: 1,
        innerColorTop: "border-inset-inner-dark",
        innerColorLeft: "border-inset-inner-dark",
        innerColorBottom: "border-inset-inner-light",
        innerColorRight: "border-inset-inner-light",
        
        style: "solid"
      }
    },
    
    "listitem-selected":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-menu-button-selected",

        width : 1,
        colorTop: "border-inset-dark",
        colorLeft: "border-inset-dark",
        colorBottom: "border-toolbar",
        colorRight: "border-toolbar",
        
        style: "solid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      MENU
    ---------------------------------------------------------------------------
    */
    "menu" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        backgroundColor: "background-menu",

        width : 1,
        colorTop : "border-menu-light",
        colorLeft: "border-menu-light",
        colorBottom: "border-menu-dark",
        colorRight: "border-menu-dark",
        style : "solid"
      }
    },
    
    "menu-button" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        backgroundColor: "background-menu-button-selected",

        width : 1,
        colorTop: "border-inset-dark",
        colorLeft: "border-inset-dark",
        colorBottom: "border-toolbar",
        colorRight: "border-toolbar",
        style : "solid"
      }
    },
    
    "menu-separator" :
    {
      decorator :  qx.ui.decoration.Single,

      style :
      {
        widthTop    : 1,
        colorTop    : "black",

        widthBottom : 1,
        colorBottom : "gray"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      MENUBAR
    ---------------------------------------------------------------------------
    */
    "menubar" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        backgroundColor: "background-menubar",

        width : 1,
        colorTop : "border-outset-light",
        colorLeft: "border-outset-light",
        colorBottom: "border-outset-dark",
        colorRight: "border-outset-dark",
        style : "solid"
      }
    },
    
    "menubar-selected":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundColor: "background-menu-button-selected"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      PROGRESSBAR
    ---------------------------------------------------------------------------
    */

    "progressbar" :
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        width: 1,
        color: "border-input"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      SCROLLBAR
    ---------------------------------------------------------------------------
    */
    "scrollbar-horizontal" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        backgroundColor: "background-scrollbar",

        width : 1,
        colorTop : "border-inset-dark",
        colorLeft: "border-inset-dark",
        colorBottom: "border-inset-light",
        colorRight: "border-inset-light",
        style : "solid"
      }
    },
    
    "scrollbar-vertical" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        backgroundColor: "background-scrollbar",

        width : 1,
        colorTop : "border-inset-dark",
        colorLeft: "border-inset-dark",
        colorBottom: "border-inset-light",
        colorRight: "border-inset-light",
        style : "solid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      SEPARATOR
    ---------------------------------------------------------------------------
    */

    "separator-horizontal" :
    {
      decorator: qx.ui.decoration.Single,

      style :
      {
        widthLeft : 1,
        colorLeft : "border-separator"
      }
    },

    "separator-vertical" :
    {
      decorator: qx.ui.decoration.Single,

      style :
      {
        widthTop : 1,
        colorTop : "border-separator"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      SHADOWS
    ---------------------------------------------------------------------------
    */

    "shadow-window" :
    {
      decorator : qx.ui.decoration.Grid,

      style : {
        baseImage : "decoration/shadow/shadow.png",
        insets    : [ 4, 8, 8, 4 ]
      }
    },

    "shadow-popup" :
    {
      decorator : qx.ui.decoration.Grid,

      style : {
        baseImage : "decoration/shadow/shadow-small.png",
        insets    : [ 0, 3, 3, 0 ]
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      SPLITPANE
    ---------------------------------------------------------------------------
    */

    "splitpane" :
    {
      decorator : qx.ui.decoration.Uniform,

      style :
      {
        backgroundColor : "background-pane",

        width : 1,
        color : "transparent",
        style : "solid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      TEXT FIELD
    ---------------------------------------------------------------------------
    */

    "input" :
    {
      decorator: qx.ui.decoration.Double,

      style:
      {
        backgroundColor: "background-textfield",

        width: 1,
        colorTop : "border-inset-dark",
        colorLeft: "border-inset-dark",
        colorBottom: "border-inset-light",
        colorRight: "border-inset-light",
        
        innerWidth: 1,
        innerColorTop: "border-inset-inner-dark",
        innerColorLeft: "border-inset-inner-dark",
        innerColorBottom: "border-inset-inner-light",
        innerColorRight: "border-inset-inner-light",
        
        style: "solid"
      }
    },
    
    "input-focused":
    {
      decorator: qx.ui.decoration.Double,

      style:
      {
        backgroundColor: "background-textfield-focused",

        width: 1,
        colorTop: "border-inset-dark",
        colorLeft: "border-inset-dark",
        colorBottom: "border-inset-light",
        colorRight: "border-inset-light",
        
        innerWidth: 1,
        innerColorTop: "border-inset-inner-dark",
        innerColorLeft: "border-inset-inner-dark",
        innerColorBottom: "border-inset-inner-light",
        innerColorRight: "border-inset-inner-light",
        
        style: "solid"
      }
    },
    
    "input-disabled":
    {
      decorator: qx.ui.decoration.Double,

      style:
      {
        backgroundColor: "background-textfield-disabled",

        width: 1,
        colorTop: "border-inset-dark-medium",
        colorLeft: "border-inset-dark-medium",
        colorBottom: "border-inset-light-medium",
        colorRight: "border-inset-light-medium",
        
        innerWidth: 1,
        innerColorTop: "border-inset-inner-dark-medium",
        innerColorLeft: "border-inset-inner-dark-medium",
        innerColorBottom: "border-inset-inner-light-medium",
        innerColorRight: "border-inset-inner-light-medium",
        
        style: "solid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      TABLE
    ---------------------------------------------------------------------------
    */
    "table-header-cell":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-table-header",

        width: 1,
        colorTop: "border-outset-light",
        colorLeft: "border-outset-light",
        colorBottom: "border-outset-dark",
        colorRight: "border-outset-dark",
        style: "solid"
      }
    },
    
    "table-header-cell-selected":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "selected",

        width: 1,
        colorTop: "border-outset-light",
        colorLeft: "border-outset-light",
        colorBottom: "border-outset-dark",
        colorRight: "border-outset-dark",
        style: "solid"
      }
    },
    
    "table-statusbar":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        widthTop: 1,
        colorTop: "border-outset-light",
        style: "solid"
      }
    },
    
    "table-scroller-focus-indicator" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        width : 2,
        color : "table-focus-indicator",
        style : "solid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      TABVIEW
    ---------------------------------------------------------------------------
    */
    "tabview":
    {
      decorator: qx.ui.decoration.Double,

      style:
      {
        backgroundColor: "background-tabview",

        width: 1,
        colorTop: "border-inset-dark",
        colorLeft: "border-inset-dark",
        colorBottom: "border-inset-light",
        colorRight: "border-inset-light",
        
        innerWidth: 1,
        innerColorTop: "border-inset-inner-dark",
        innerColorLeft: "border-inset-inner-dark",
        innerColorBottom: "border-inset-inner-light",
        innerColorRight: "border-inset-inner-light",
        
        style: "solid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      TOOLBAR
    ---------------------------------------------------------------------------
    */
    "toolbar":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-toolbar",

        width: 1,
        colorTop: "border-outset-light",
        colorLeft: "border-outset-light",
        colorBottom: "border-outset-dark",
        colorRight: "border-outset-dark",
        style: "solid"
      }
    },
    
    "toolbar-part":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-toolbar"
      }
    },
    
    "toolbar-separator":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        widthLeft: 1,
        widthRight: 1,

        colorLeft: "border-inset-dark",
        colorRight: "border-inset-light",

        styleLeft: "solid",
        styleRight: "solid"
      }
    },
    
    "toolbar-button":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "transparent",

        width: 1,
        color: "transparent",
        style: "solid"
      }
    },
    
    "toolbar-button-checked":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-toolbar-selected",

        width: 1,
        colorTop: "border-inset-dark",
        colorLeft: "border-inset-dark",
        colorBottom: "border-toolbar",
        colorRight: "border-toolbar",
        style: "solid"
      }
    },
    
    "toolbar-button-hovered":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundColor: "background-toolbar-selected"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      TOOLTIP
    ---------------------------------------------------------------------------
    */
    
    "tooltip":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-tooltip",

        width: 1,
        colorTop: "border-tooltip-light",
        colorLeft: "border-tooltip-light",
        colorBottom: "border-tooltip-dark",
        colorRight: "border-tooltip-dark",
        style: "solid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      WINDOW
    ---------------------------------------------------------------------------
    */
    "window":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-window",

        width: 1,
        colorTop: "border-outset-light",
        colorLeft: "border-outset-light",
        colorBottom: "border-outset-dark",
        colorRight: "border-outset-dark",
        style: "solid"
      }
    },
    
    "window-captionbar-active":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-captionbar-active",

        width: 1,
        colorTop: "border-outset-light",
        colorLeft: "border-outset-light",
        colorBottom: "border-outset-dark",
        colorRight: "border-outset-dark",
        style: "solid"
      }
    },
    
    "window-captionbar-inactive":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-captionbar-inactive",

        width: 1,
        colorTop: "border-outset-light",
        colorLeft: "border-outset-light",
        colorBottom: "border-outset-dark",
        colorRight: "border-outset-dark",
        style: "solid"
      }
    },
    
    "window-statusbar":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-window",

        width: 1,
        colorTop: "border-outset-light",
        colorLeft: "border-outset-light",
        colorBottom: "border-outset-dark",
        colorRight: "border-outset-dark",
        
        style: "solid"
      }
    }
    
    
  }
});