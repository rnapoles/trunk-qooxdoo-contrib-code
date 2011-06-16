/* ************************************************************************

   Copyright:
     2011 Norbert Schröder

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

/* ************************************************************************

#asset(graydienttheme/decoration/*)

************************************************************************ */

qx.Theme.define("graydienttheme.theme.Decoration",
{
  aliases: {
    decoration : "graydienttheme/decoration"
  },

  decorations:
  {
    /*
    ---------------------------------------------------------------------------
      APPLICATION
    ---------------------------------------------------------------------------
    */

    "app-header":
    {
      decorator: [
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MLinearBackgroundGradient
      ],
      
      style: {
        widthBottom: 1,
        colorBottom: "border-app-header",
        gradientStart: ["app-header-start", 0],
        gradientEnd: ["app-header-end", 100]
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      BUTTON
    ---------------------------------------------------------------------------
    */
    "button-box":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MBoxShadow,
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: {
        radius: 2,
        shadowLength: 1,
        shadowBlurRadius: 1,
        shadowColor: "shadow-button",
        gradientStart: ["button-box-start", 0],
        gradientEnd: ["button-box-end", 100]
      }
    },
    
    "button-box-hovered":
    {
      include: "button-box",

      style: {
        gradientStart: ["button-box-hovered-start", 0],
        gradientEnd: ["button-box-hovered-end", 100]
      }
    },
    
    "button-box-pressed":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: 
      {
        radius: 2,
        width: 1,
        color: "border-button",
        gradientStart: ["button-box-hovered-start", 0],
        gradientEnd: ["button-box-hovered-end", 100]
      }
    },
    
    "button-box-invalid":
    {
      include: "button-box-pressed",
      
      style: 
      {
        color: "invalid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      CHECK BOX
    ---------------------------------------------------------------------------
    */

    "checkbox":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style:
      {
        radius: 2,
        width: 1,
        color: "border-checkbox",
        gradientStart: ["checkbox-start", 0],
        gradientEnd: ["checkbox-end", 100]
      }
    },

    "checkbox-focused":
    {
      include: "checkbox",
      
      style:
      {
        color: "border-focused",
        gradientStart: ["checkbox-focused-start", 0],
        gradientEnd: ["checkbox-focused-end", 100]
      }
    },
    
    "checkbox-disabled":
    {
      include: "checkbox",
      
      style:
      {
        color: "border-disabled",
        gradientStart: ["checkbox-disabled-start", 0],
        gradientEnd: ["checkbox-disabled-end", 100]
      }
    },

    "checkbox-invalid":
    {
      include: "checkbox",
      
      style:
      {
        color: "invalid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      COMBO BOX
    ---------------------------------------------------------------------------
    */
    "combobox-button":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: 
      {
        radius: 2,
        width: [1, 1, 1, 0],
        color: "border-light",
        gradientStart: ["button-box-start", 0],
        gradientEnd: ["button-box-end", 100]
      }
    },
    
    "combobox-button-hovered":
    {
      include: "combobox-button",

      style: 
      {
        gradientStart: ["button-box-hovered-start", 0],
        gradientEnd: ["button-box-hovered-end", 100]
      }
    },
    
    "combobox-button-pressed":
    {
      include: "button-box-pressed"
    },
    
    /*
    ---------------------------------------------------------------------------
      CORE
    ---------------------------------------------------------------------------
    */

    "border-blue":
    {
      decorator: qx.ui.decoration.Uniform,

      style:
      {
        width: 4,
        color: "background-selected"
      }
    },


    "main":
    {
      decorator: qx.ui.decoration.Uniform,

      style:
      {
        width: 1,
        color: "background-selected"
      }
    },

    "main-dark":
    {
      decorator: qx.ui.decoration.Uniform,

      style:
      {
        width: 1,
        color: "button-border"
      }
    },

    "popup":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MBoxShadow,
        qx.ui.decoration.MBackgroundColor
      ],

      style:
      {
        radius: 3,
        width: 1,
        color: "border-popup",
        shadowLength: 2,
        shadowBlurRadius: 5,
        shadowColor: "shadow",
        backgroundColor: "red"
      }
    },
    
    "selected":
    {
      decorator: [
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: 
      {
        gradientStart: ["button-box-start", 0],
        gradientEnd: ["button-box-end", 100]
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      DATE CHOOSER
    ---------------------------------------------------------------------------
    */

    "datechooser-date-pane":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        widthTop: 1,
        colorTop: "gray",
        style: "solid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      GROUP BOX
    ---------------------------------------------------------------------------
    */
    "group-box" :
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MBackgroundColor
      ],

      style:
      {
        radius: 3,
        width: 1,
        color: "background-selected-light",
        backgroundColor: "background-medium"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      HOVER BUTTON
    ---------------------------------------------------------------------------
    */
    "hover-button":
    {
      decorator: [
        qx.ui.decoration.MSingleBorder
      ],
      
      style:
      {
        width: 1,
        color: "transparent"
      }
    },
    
    "hover-button-hovered":
    {
      include: "button-box-pressed"
    },
    
    /*
    ---------------------------------------------------------------------------
      LIST
    ---------------------------------------------------------------------------
    */
    "list-item":
    {
      decorator: [
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style:
      {
        gradientStart: ["menu-button-start", 10],
        gradientEnd: ["menu-button-end", 90]
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      MENU
    ---------------------------------------------------------------------------
    */

    "menu":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MBoxShadow,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: {
        radius: 2,
        width: 1,
        color: "border-menu",
        shadowLength: 1,
        shadowBlurRadius: 1,
        shadowColor: "shadow-button",
        gradientStart: ["menu-start", 0],
        gradientEnd: ["menu-end", 100]
      }
    },
    
    "menu-separator":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        widthTop: 1,
        colorTop: "gray",

        widthBottom: 1,
        colorBottom: "white"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      MENUBAR
    ---------------------------------------------------------------------------
    */

    "menubar":
    {
      include: "toolbar"
    },
    
    "menubar-button-hovered":
    {
      decorator: [
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: {
        gradientStart: ["button-box-start", 10],
        gradientEnd: ["button-box-end", 90]
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      MENU-BUTTON
    ---------------------------------------------------------------------------
    */

    "menu-button":
    {
      decorator: [
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: {
        gradientStart: ["menu-button-start", 0],
        gradientEnd: ["menu-button-end", 100]
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      RADIO BUTTON
    ---------------------------------------------------------------------------
    */
    "radiobutton":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style:
      {
        radius: 10,
        width: 1,
        color: "border-checkbox",
        gradientStart: ["checkbox-start", 0],
        gradientEnd: ["checkbox-end", 100]
      }
    },
    
    "radiobutton-checked":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MDoubleBorder,
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style:
      {
        radius : 10,
        width: 1,
        color: "border-checkbox",
        innerWidth: 2,
        innerColor: "background-medium",
        gradientStart: ["menu-button-start", 0],
        gradientEnd: ["menu-button-end", 100]
      }
    },

    "radiobutton-focused":
    {
      include: "radiobutton",
      
      style:
      {
        color: "border-focused",
        gradientStart: ["button-box-hovered-start", 0],
        gradientEnd: ["button-box-hovered-end", 100]
      }
    },
    
    "radiobutton-checked-focused":
    {
      include: "radiobutton-checked",

      style:
      {
        color: "border-focused",
        innerColor: "background"
      }
    },

    "radiobutton-disabled":
    {
      include: "radiobutton",
      
      style:
      {
        color: "border-disabled"
      }
    },
    
    "radiobutton-checked-disabled":
    {
      include: "radiobutton-checked",

      style:
      {
        color: "border-focused",
        innerColor: "background"
      }
    },

    "radiobutton-invalid":
    {
      include: "radiobutton",
      
      style:
      {
        color: "invalid"
      }
    },
    
    "radiobutton-checked-invalid":
    {
      include: "radiobutton-checked",

      style:
      {
        color: "invalid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      SCROLLBAR
    ---------------------------------------------------------------------------
    */
    "scrollbar-slider-horizontal":
    {
      decorator: 
      [
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: 
      {
        gradientStart: ["scrollbar-slider-start", 0],
        gradientEnd: ["scrollbar-slider-end", 100]
      }
    },
    
    "scrollbar-slider-vertical":
    {
      include: "scrollbar-slider-horizontal",

      style: 
      {
        orientation: "horizontal"
      }
    },
    
    "scroll-knob-horizontal":
    {
      decorator: [
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: {
        gradientStart: ["scroll-knob-start", 0],
        gradientEnd: ["scroll-knob-end", 100]
      }
    },
    
    "scroll-knob-vertical":
    {
      include: "scroll-knob-horizontal",

      style:
      {
        orientation: "horizontal"
      }
    },
    
    "scroll-knob-horizontal-pressed":
    {
      decorator: [
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: {
        gradientStart: ["scroll-knob-pressed-start", 0],
        gradientEnd: ["scroll-knob-pressed-end", 100]
      }
    },

    "scroll-knob-vertical-pressed":
    {
      include: "scroll-knob-horizontal-pressed",

      style:
      {
        orientation: "horizontal"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      SEPARATOR
    ---------------------------------------------------------------------------
    */

    "separator-horizontal":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        widthLeft: 1,
        colorLeft: "border-separator"
      }
    },

    "separator-vertical":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        widthTop: 1,
        colorTop: "border-separator"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      SLIDER
    ---------------------------------------------------------------------------
    */
    "slider-horizontal":
    {
      decorator: qx.ui.decoration.HBox,
      
      style:
      {
        baseImage: "decoration/slider/slider-horizontal.png"
      }
    },

    "slider-vertical":
    {
      decorator: qx.ui.decoration.VBox,
      
      style:
      {
        baseImage: "decoration/slider/slider-vertical.png"
      }
    },
    
    "slider-knob-horizontal":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: 
      {
        radius: 10,
        width: 1,
        color: "border-button",
        gradientStart: ["slider-knob-start", 0],
        gradientEnd: ["slider-knob-end", 100]
      }
    },
    
    "slider-knob-vertical":
    {
      include: "slider-knob-horizontal",
      
      style: 
      {
        orientation: "horizontal"
      }
    },
    
    "slider-knob-horizontal-pressed":
    {
      include: "slider-knob-horizontal",

      style: 
      {
        gradientStart: ["slider-knob-pressed-start", 0],
        gradientEnd: ["slider-knob-pressed-end", 100]
      }
    },
    
    "slider-knob-vertical-pressed":
    {
      include: "slider-knob-horizontal-pressed",

      style: 
      {
        orientation: "horizontal"
      }
    },
    
    "slider-knob-horizontal-invalid":
    {
      include: "slider-knob-horizontal",

      style: 
      {
        color: "invalid"
      }
    },
    
    "slider-knob-vertical-invalid":
    {
      include: "slider-knob-vertical",

      style: 
      {
        color: "invalid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      SPINNER
    ---------------------------------------------------------------------------
    */
    "spinner-button":
    {
      include: "scroll-knob-horizontal"
    },

    "spinner-button-hovered":
    {
      include: "scroll-knob-horizontal-pressed"
    },

    "spinner-button-checked":
    {
      include: "scroll-knob-horizontal-pressed"
    },
    
    /*
    ---------------------------------------------------------------------------
      SPLITPANE
    ---------------------------------------------------------------------------
    */

    "splitter-horizontal":
    {
      decorator: qx.ui.decoration.VBox,

      style:
      {
        baseImage: "decoration/slider/slider-vertical.png"
      }
    },
    
    "splitter-vertical":
    {
      decorator: qx.ui.decoration.HBox,
    
      style:
      {
        baseImage: "decoration/slider/slider-horizontal.png"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      TABLE
    ---------------------------------------------------------------------------
    */

    "statusbar":
    {
      include: "toolbar"
    },

    "table-scroller-focus-indicator":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        width: 2,
        color: "table-focus-indicator",
        style: "solid"
      }
    },

    "table-header":
    {
      include: "button-box",

      style:
      {
        radius: 0
      }
    },
    
    "table-header-cell-hovered":
    {
      include: "button-box-hovered",

      style:
      {
        radius: 0,
        shadowLength: 0
      }
    },

    "table-header-column-button": 
    {
      include: "table-header"
    },
    
    "table-header-column-button-hovered": 
    {
      include: "table-header-cell-hovered"
    },

    "table-header-cell":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        widthRight: 1,
        color: "button-border"
      }
    },

    /*
    ---------------------------------------------------------------------------
      TABVIEW
    ---------------------------------------------------------------------------
    */
    "tabview-pane":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: 
      {
        radius: 3,
        width: 1,
        color: "border-tabview-pane",
        gradientStart: ["tabview-pane-start", 0],
        gradientEnd: ["tabview-pane-end", 100]
      }
    },

    "tabview-button-top": 
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MLinearBackgroundGradient
      ],
      
      style:
      {
        radius: [3, 3, 0, 0],
        width: [0, 1, 0 , 0],
        color: "border-button",
        gradientStart: ["tabview-button-start", 10],
        gradientEnd: ["tabview-button-end", 90]
      }
    },
    
    "tabview-button-hovered-top": 
    {
      include: "tabview-button-top",
      
      style:
      {
        gradientStart: ["tabview-button-hovered-start", 10],
        gradientEnd: ["tabview-button-hovered-end", 90]
      }
    },
    
    "tabview-button-checked-top": 
    {
      include: "tabview-button-top",

      style: {
        gradientStart: ["tabview-button-checked-start", 10],
        gradientEnd: ["tabview-button-checked-end", 90]
      }
    },
    
    "tabview-button-bottom": 
    {
      include: "tabview-button-top",
      
      style:
      {
        radius: [0, 0, 3, 3]
      }
    },
    
    "tabview-button-hovered-bottom": 
    {
      include: "tabview-button-hovered-top",
      
      style:
      {
        radius: [0, 0, 3, 3]
      }
    },
    
    "tabview-button-checked-bottom": 
    {
      include: "tabview-button-checked-top",
      
      style:
      {
        radius: [0, 0, 3, 3]
      }
    },
    
    "tabview-button-left": 
    {
      include: "tabview-button-top",
      
      style:
      {
        radius: [3, 0, 0, 3],
        width: [0, 0, 1 , 0]
      }
    },
    
    "tabview-button-hovered-left": 
    {
      include: "tabview-button-hovered-top",
      
      style:
      {
        radius: [3, 0, 0, 3],
        width: [0, 0, 1 , 0]
      }
    },
    
    "tabview-button-checked-left": 
    {
      include: "tabview-button-checked-top",
      
      style:
      {
        radius: [3, 0, 0, 3],
        width: [0, 0, 1 , 0]
      }
    },
    
    "tabview-button-right": 
    {
      include: "tabview-button-top",
      
      style:
      {
        radius: [0, 3, 3, 0],
        width: [0, 0, 1 , 0]
      }
    },
    
    "tabview-button-hovered-right": 
    {
      include: "tabview-button-hovered-top",
      
      style:
      {
        radius: [0, 3, 3, 0],
        width: [0, 0, 1 , 0]
      }
    },
    
    "tabview-button-checked-right": 
    {
      include: "tabview-button-checked-top",
      
      style:
      {
        radius: [0, 3, 3, 0],
        width: [0, 0, 1 , 0]
      }
    },
    
    "tabview-bar-button":
    {
      include: "button-box",
      
      style:
      {
        shadowLength: 0
      }
    },
    
    "tabview-bar-button-hovered":
    {
      include: "button-box-hovered",
      
      style:
      {
        shadowLength: 0
      }
    },
    
    "tabview-bar-button-pressed":
    {
      include: "button-box-pressed"
    },
    
    "keyboard-focus":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        width: 1,
        color: "black",
        style: "dotted"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      TEXT FIELD
    ---------------------------------------------------------------------------
    */
    "inset":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MBackgroundColor
      ],

      style:
      {
        radius: 3,
        width: 1,
        color: "border-light", 
        backgroundColor: "background"
      }
    },

    "inset-focused":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MLinearBackgroundGradient
      ],
      
      style:
      {
        radius: 3,
        width: 1,
        color: "border-focused",
        gradientStart: ["inset-focused-start", 0],
        gradientEnd: ["inset-focused-end", 100]
      }
    },

    "inset-invalid":
    {
      include: "inset",
      
      style:
      {
        color: "invalid"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      TOOLBAR
    ---------------------------------------------------------------------------
    */

    "toolbar":
    {
      decorator: [
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: {
        widthBottom: 1,
        colorBottom: "border-toolbar",
        gradientStart: ["toolbar-start", 10],
        gradientEnd: ["toolbar-end", 90]
      }
    },
    
    "toolbar-button":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MLinearBackgroundGradient
      ],
      
      style:
      {
        radius: 2,
        gradientStart: ["transparent", 0],
        gradientEnd: ["transparent", 100]
      }
    },
    
    "toolbar-button-hovered":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MLinearBackgroundGradient
      ],
      
      style:
      {
        radius: 2,
        gradientStart: ["button-box-hovered-start", 0],
        gradientEnd: ["button-box-hovered-end", 100]
      }
    },
    
    "toolbar-button-pressed":
    {
      include: "button-box-pressed"
    },
    
    "toolbar-splitbutton-left":
    {
      include: "toolbar-button"
    },
    
    "toolbar-splitbutton-left-hovered":
    {
      include: "toolbar-button-hovered",
      
      style:
      {
        radius: [2, 0, 2, 0]
      }
    },
    
    "toolbar-splitbutton-left-pressed":
    {
      include: "toolbar-button-pressed",
      
      style:
      {
        radius: [2, 0, 2, 0]
      }
    },
    
    "toolbar-splitbutton-right":
    {
      include: "toolbar-button"
    },
    
    "toolbar-splitbutton-right-hovered":
    {
      include: "toolbar-button-hovered",
      
      style:
      {
        radius: [0, 2, 0, 2]
      }
    },
    
    "toolbar-splitbutton-right-pressed":
    {
      include: "toolbar-button-pressed",
      
      style:
      {
        radius: [0, 2, 0, 2]
      }
    },
    
    "toolbar-separator":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        widthLeft: 1,
        widthRight: 1,

        colorLeft: "border-toolbar-separator-left",
        colorRight: "border-toolbar-separator-right",

        styleLeft: "solid",
        styleRight: "solid"
      }
    },
    
    "toolbar-part":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "decoration/toolbar/toolbar-part.png",
        backgroundRepeat: "repeat-y"
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      TOOLTIP
    ---------------------------------------------------------------------------
    */

    "tooltip-error":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MBackgroundColor
      ],

      style: {
        radius: 5,
        backgroundColor: "invalid"
      }
    },

    /*
    ---------------------------------------------------------------------------
      WINDOW
    ---------------------------------------------------------------------------
    */
    "window":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MBoxShadow
      ],

      style:
      {
        radius: 4,
        width: 1,
        color: "border-window",
        shadowLength: 1,
        shadowBlurRadius: 3,
        shadowColor: "shadow"
      }
    },

    "window-active":
    {
      include: "window",

      style:
      {
        shadowLength: 3,
        shadowBlurRadius: 5
      }
    },

    "window-caption-active": 
    {
      decorator: [
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: {
        gradientStart: ["window-caption-active-start", 10],
        gradientEnd: ["window-caption-active-end", 90]
      }
    },
    
    "window-caption-inactive": 
    {
      decorator: [
        qx.ui.decoration.MLinearBackgroundGradient
      ],

      style: {
        gradientStart: ["window-caption-inactive-start", 10],
        gradientEnd: ["window-caption-inactive-end", 90]
      }
    }
    
    
  }
});