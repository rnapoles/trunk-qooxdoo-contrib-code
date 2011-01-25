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

#asset(silverbluetheme/decoration/*)

************************************************************************ */

qx.Theme.define("silverbluetheme.theme.Decoration",
{
  aliases: {
    decoration: "silverbluetheme/decoration"
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
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "decoration/app-header.png",
        backgroundRepeat: "scale"
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      BOXES
    ---------------------------------------------------------------------------
    */
	"box-blue":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/boxes/box-blue.png"
      }
    },
	
	"box-gradient":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/boxes/box-gradient.png"
      }
    },
	
	"box-silver":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/boxes/box-silver.png"
      }
    },
	
	"box-transparent":
    {
      decorator: qx.ui.decoration.Grid,

      style:
      {
        baseImage: "decoration/boxes/box-transparent.png"
      }
    },
	
	"box-white":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/boxes/box-white.png"
      }
    },
	
    /*
    ---------------------------------------------------------------------------
      BUTTON
    ---------------------------------------------------------------------------
    */
    "button":
	{
	  decorator: qx.ui.decoration.Grid,
	  
	  style:
	  {
	    baseImage: "decoration/button/button.png",
		insets: [3]
	  }
	},
	
	"button-checked":
	{
	  decorator: qx.ui.decoration.Grid,
	  
	  style:
	  {
	    baseImage: "decoration/button/button-checked.png",
		insets: [3]
	  }
	},
	
	"button-checked-focused":
	{
	  decorator: qx.ui.decoration.Grid,
	  
	  style:
	  {
	    baseImage: "decoration/button/button-checked.png",
		insets: [3]
	  }
	},
	
	"button-focused":
	{
	  decorator: qx.ui.decoration.Grid,
	  
	  style:
	  {
	    baseImage: "decoration/button/button-hovered.png",
		insets: [3]
	  }
	},
	
	"button-hovered":
	{
	  decorator: qx.ui.decoration.Grid,
	  
	  style:
	  {
	    baseImage: "decoration/button/button-hovered.png",
		insets: [3]
	  }
	},
	
	"button-red":
	{
	  decorator: qx.ui.decoration.Grid,
	  
	  style:
	  {
	    baseImage: "decoration/button/button-red2.png",
		insets: [3]
	  }
	},
	
	"button-red-checked":
	{
	  decorator: qx.ui.decoration.Grid,
	  
	  style:
	  {
	    baseImage: "decoration/button/button-red-checked.png",
		insets: [3]
	  }
	},
	
	/*
    ---------------------------------------------------------------------------
      COMBOBOX
    ---------------------------------------------------------------------------
    */
	"combobox":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/form/combobox.png"
      }
    },
	
	"combobox-button":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/form/combobox-button.png"
      }
    },
	
	"combobox-button-hovered":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/form/combobox-button-hovered.png"
      }
    },
	
	"combobox-button-checked":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/form/combobox-button-checked.png"
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      CORE
    ---------------------------------------------------------------------------
    */
	"border-invalid":
    {
      decorator: qx.ui.decoration.Beveled,

      style:
      {
        outerColor: "invalid",
        innerColor: "white",
        innerOpacity: 0.5,
        backgroundImage: "decoration/form/input.png",
        backgroundRepeat: "repeat-x",
        backgroundColor: "background-light"
      }
    },
	
	"dragover":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        bottom: [2, "solid", "#33508D"]
      }
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
	
    "main":
    {
      decorator: qx.ui.decoration.Uniform,

      style:
      {
        width: 1,
        color: "border-frame"
      }
    },
	
	"pane":
    {
      decorator: qx.ui.decoration.Grid,

      style:
      {
        baseImage: "decoration/pane/pane.png",
        insets: [0, 2, 3, 0]
      }
    },
	
    "selected":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundColor: "background-selected"
      }
    },
	
    "selected-dragover":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-selected",
        bottom: [2, "solid", "#33508D"]
      }
    },

	/*
    ---------------------------------------------------------------------------
      GROUPBOX
    ---------------------------------------------------------------------------
    */
	"group":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/boxes/box-silver.png"
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      INPUT
    ---------------------------------------------------------------------------
    */
	"input":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/boxes/box-white.png",
		insets: [2]
      }
    },
	
	"input-focused":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/boxes/box-blue.png",
		insets: [2]
      }
    },

    "input-focused-invalid":
    {
      decorator: qx.ui.decoration.Beveled,

      style:
      {
        outerColor: "invalid",
        innerColor: "border-focused-invalid",
        backgroundImage: "decoration/form/input.png",
        backgroundRepeat: "repeat-x",
        backgroundColor: "background-light",
        insets: [2]
      }
    },

	/*
    ---------------------------------------------------------------------------
      LIST
    ---------------------------------------------------------------------------
    */
	"list":
    {
      decorator : qx.ui.decoration.Grid,

      style : {
        baseImage : "decoration/form/list.png",
		insets: [2]
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      MENU
    ---------------------------------------------------------------------------
    */

    "menu":
    {
      decorator: qx.ui.decoration.Grid,

      style:
      {
		baseImage: "decoration/menu/menu-pane.png"
      }
    },
	
	"menu-separator":
    {
      decorator:  qx.ui.decoration.Single,

      style:
      {
        widthTop: 1,
        colorTop: "#C5C5C5",

        widthBottom: 1,
        colorBottom: "#FAFAFA"
      }
    },
	
	"menu-selected":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
		backgroundImage: "decoration/menu/selected.png",
		backgroundRepeat: "scale"
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      PROGRESSIVE
    ---------------------------------------------------------------------------
    */
    "progressive-table-header":
    {
       decorator: qx.ui.decoration.Single,

       style :
       {
         width: 1,
         color: "border-main",
         style: "solid"
       }
    },

    "progressive-table-header-cell":
    {
      decorator:  qx.ui.decoration.Single,

      style:
      {
        backgroundImage: "decoration/table/header-cell.png",
        backgroundRepeat: "scale",

        widthRight: 1,
        colorRight: "#F2F2F2",
        style: "solid"
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      SCROLLBAR
    ---------------------------------------------------------------------------
    */
	"scrollbar-horizontal" :
    {
	  decorator: qx.ui.decoration.Background,
	  
	  style:
	  {
	    backgroundImage: "decoration/scrollbar/scrollbar-bg-horizontal.png"
	  }
    },

    "scrollbar-vertical" :
    {
	  decorator: qx.ui.decoration.Background,
	  
	  style:
	  {
	    backgroundImage: "decoration/scrollbar/scrollbar-bg-vertical.png"
	  }
    },

	"scrollbar-button-horizontal":
    {
	  decorator: qx.ui.decoration.Background,
	  
	  style:
	  {
		backgroundImage: "decoration/scrollbar/scrollbar-button-horizontal.png"
	  }
    },
	
	"scrollbar-button-horizontal-hovered":
    {
	  decorator: qx.ui.decoration.Background,
	  
	  style:
	  {
		backgroundImage: "decoration/scrollbar/scrollbar-button-horizontal-hovered.png"
	  }
    },
	
	"scrollbar-button-vertical":
    {
	  decorator: qx.ui.decoration.Background,
	  
	  style:
	  {
	    backgroundImage: "decoration/scrollbar/scrollbar-button-vertical.png"
	  }
    },
	
	"scrollbar-button-vertical-hovered":
    {
	  decorator: qx.ui.decoration.Background,
	  
	  style:
	  {
		backgroundImage: "decoration/scrollbar/scrollbar-button-vertical-hovered.png"
	  }
    },
	
	"scrollbar-slider-horizontal":
    {
	  decorator: qx.ui.decoration.Background,
	  
	  style:
	  {
		backgroundImage: "decoration/scrollbar/scrollbar-button-horizontal.png"
	  }
    },
	
	"scrollbar-slider-horizontal-hovered":
    {
	  decorator: qx.ui.decoration.Background,
	  
	  style:
	  {
		backgroundImage: "decoration/scrollbar/scrollbar-button-horizontal-hovered.png"
	  }
    },
	
	"scrollbar-slider-vertical":
    {
	  decorator: qx.ui.decoration.Background,
	  
	  style:
	  {
	    backgroundImage: "decoration/scrollbar/scrollbar-button-vertical.png"
	  }
    },
	
	"scrollbar-slider-vertical-hovered":
    {
	  decorator : qx.ui.decoration.Background,
	  
	  style:
	  {
		backgroundImage: "decoration/scrollbar/scrollbar-button-vertical-hovered.png"
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
      SHADOWS
    ---------------------------------------------------------------------------
    */
    "shadow-window":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/shadow/shadow.png",
        insets: [4, 8, 8, 8]
      }
    },

    "shadow-popup":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/shadow/shadow-small.png",
        insets: [0, 3, 3, 3]
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      SLIDER
    ---------------------------------------------------------------------------
    */
	"slider-horizontal":
    {
	  decorator : qx.ui.decoration.HBox,
	  
	  style:
	  {
	    baseImage: "decoration/form/slider-horizontal.png"
	  }
    },
	
	"slider-vertical":
    {
	  decorator : qx.ui.decoration.VBox,
	  
	  style:
	  {
	    baseImage: "decoration/form/slider-vertical.png"
	  }
    },
	
	"slider-knob" :
    {
      decorator : qx.ui.decoration.Background,

      style : {
        backgroundImage : "decoration/form/slider-knob.png"
      }
    },
	
	"slider-knob-hovered" :
    {
      decorator : qx.ui.decoration.Background,

      style : {
        backgroundImage : "decoration/form/slider-knob-hovered.png"
      }
    },
	
	"slider-knob-pressed" :
    {
      decorator : qx.ui.decoration.Background,

      style : {
        backgroundImage : "decoration/form/slider-knob-hovered.png"
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      SPINNER
    ---------------------------------------------------------------------------
    */
	"spinner-button":
	{
	  decorator: qx.ui.decoration.Single,
	  
	  style:
	  {
	    backgroundImage: "decoration/button/spinner-button.png",
		
		widthLeft: 1,
        colorLeft: "border-frame",
        styleLeft: "solid"
	  }
	},
	
	"spinner-button-hovered":
	{
	  decorator: qx.ui.decoration.Single,
	  
	  style:
	  {
	    backgroundImage: "decoration/button/spinner-button-hovered.png",
		
		widthLeft: 1,
        colorLeft: "border-frame",
        styleLeft: "solid"
	  }
	},
	
	"spinner-button-checked":
	{
	  decorator: qx.ui.decoration.Single,
	  
	  style:
	  {
	    backgroundImage: "decoration/button/spinner-button-hovered.png",
		
		widthLeft: 1,
        colorLeft: "border-frame",
        styleLeft: "solid"
	  }
	},

	/*
    ---------------------------------------------------------------------------
      SPLITBUTTON
    ---------------------------------------------------------------------------
    */
	"splitbutton":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/button/splitbutton.png"
      }
    },
	
	"splitbutton-hovered":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/button/splitbutton-hovered.png"
      }
    },
	
	"splitbutton-checked":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/button/splitbutton-checked.png"
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      SPLITPANE
    ---------------------------------------------------------------------------
    */
    "splitpane":
    {
      decorator: qx.ui.decoration.Uniform,

      style:
      {
        backgroundColor: "background-pane",

        width: 1,
        color: "background-splitpane",
        style: "solid"
      }
    },
	
	"splitter-horizontal":
    {
      decorator: qx.ui.decoration.VBox,
	  
	  style:
	  {
	    baseImage: "decoration/form/slider-vertical.png"
	  }
    },
	
	"splitter-vertical":
    {
      decorator: qx.ui.decoration.HBox,
	  
	  style:
	  {
	    baseImage: "decoration/form/slider-horizontal.png"
	  }
    },
	
	/*
    ---------------------------------------------------------------------------
      TABLE
    ---------------------------------------------------------------------------
    */
    "table":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        width: 1,
        color: "border-main",
        style: "solid"
      }
    },

    "table-statusbar":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        widthTop: 1,
        colorTop: "#F5F5F5",
        style: "solid"
      }
    },

    "table-scroller-header":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundImage: "decoration/table/header-cell.png",
        backgroundRepeat: "scale",

        widthBottom: 1,
        colorBottom: "border-main",
        style: "solid"
      }
    },
	
	"table-scroller-header-hovered":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundImage: "decoration/table/header-cell-hovered.png",
        backgroundRepeat: "scale",

        widthBottom: 1,
        colorBottom: "border-main",
        style: "solid"
      }
    },

    "table-header-cell":
    {
      decorator:  qx.ui.decoration.Single,

      style:
      {
        widthRight: 1,
        colorRight: "border-separator",
        styleRight: "solid",
		
		widthBottom: 1,
        colorBottom: "border-separator",
        styleBottom: "solid"
      }
    },

    "table-header-cell-hovered":
    {
      decorator:  qx.ui.decoration.Single,

      style:
      {
	    backgroundImage: "decoration/table/header-cell-hovered.png",
        backgroundRepeat: "scale",
		
        widthRight: 1,
        colorRight: "border-separator",
        styleRight: "solid",

        widthBottom: 1,
        colorBottom: "border-separator",
        styleBottom: "solid"
      }
    },

    "table-column-button":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundImage: "decoration/table/header-cell.png",
        backgroundRepeat: "scale",

        widthBottom: 1,
        colorBottom: "border-main",
        style: "solid"
      }
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
	
	/*
    ---------------------------------------------------------------------------
      TABVIEW
    ---------------------------------------------------------------------------
    */
    "tabview-pane":
    {
      decorator: qx.ui.decoration.Grid,

      style:
      {
        baseImage: "decoration/boxes/box-transparent.png",
        insets: [4, 6, 7, 4]
      }
    },

	"tabview-page-button-horizontal":
    {
	  decorator: qx.ui.decoration.Single,

      style:
      {
		widthRight: 1,
		style: "solid",
		
		colorRight: "silver"
      }
    },
	
	"tabview-page-button-vertical":
    {
	  decorator: qx.ui.decoration.Single,

      style:
      {
		widthBottom: 1,
		style: "solid",
		
		colorBottom: "silver"
      }
    },
	
	"tabview-page-button-horizontal-hovered":
    {
	  decorator: qx.ui.decoration.Single,

      style:
      {
		backgroundImage: "decoration/menu/selected.png",
		backgroundRepeat: "scale",
		
		widthRight: 1,
		style: "solid",
		
		colorRight: "silver"
      }
    },
	
	"tabview-page-button-vertical-hovered":
    {
	  decorator: qx.ui.decoration.Single,

      style:
      {
		backgroundImage: "decoration/menu/selected.png",
		backgroundRepeat: "scale",
		
		widthBottom: 1,
		style: "solid",
		
		colorBottom: "silver"
      }
    },
	
	"tabview-page-button-checked":
    {
	  decorator: qx.ui.decoration.Single,

      style:
      {
		backgroundImage: "decoration/menu/selected.png",
		backgroundRepeat: "scale",
		
		width: 1,
		style: "solid",

		colorTop: "#323232",
		colorLeft: "#323232",
		colorBottom: "#929292",
		colorRight: "#929292"
      }
    },
	
	"tabview-page-button-top-active":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/tabview/tab-button-top-active.png"
      }
    },

    "tabview-page-button-top-inactive":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/tabview/tab-button-top-inactive.png"
      }
    },
	
	"tabview-page-button-top-hovered":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/tabview/tab-button-top-hovered.png"
      }
    },

    "tabview-page-button-bottom-active":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/tabview/tab-button-bottom-active.png"
      }
    },

    "tabview-page-button-bottom-inactive":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/tabview/tab-button-bottom-inactive.png"
      }
    },
	
	"tabview-page-button-bottom-hovered":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/tabview/tab-button-bottom-hovered.png"
      }
    },

    "tabview-page-button-left-active":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/tabview/tab-button-left-active.png"
      }
    },

    "tabview-page-button-left-inactive":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/tabview/tab-button-left-inactive.png"
      }
    },
	
	"tabview-page-button-left-hovered":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/tabview/tab-button-left-hovered.png"
      }
    },

    "tabview-page-button-right-active":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/tabview/tab-button-right-active.png"
      }
    },

    "tabview-page-button-right-inactive":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/tabview/tab-button-right-inactive.png"
      }
    },
	
	"tabview-page-button-right-hovered":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/tabview/tab-button-right-hovered.png"
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      TOOLBAR
    ---------------------------------------------------------------------------
    */
	"toolbar-silver":
    {
	  decorator: qx.ui.decoration.Single,

      style:
      {
		backgroundImage: "decoration/toolbar/toolbar-gradient.png",
		backgroundRepeat: "scale",
		
		widthTop: 1,
		colorTop: "#DADEE1",
		
		widthBottom: 1,
		colorBottom: "#878C92"
      }
    },
	
    "toolbar-blue":
    {
	  decorator: qx.ui.decoration.Single,

      style:
      {
		backgroundImage: "decoration/toolbar/toolbar-blue.png",
		backgroundRepeat: "scale",
		
		widthTop: 1,
		colorTop: "#DADEE1",
		
		widthBottom: 1,
		colorBottom: "#878C92"
      }
    },
	
	"toolbar-black":
    {
	  decorator: qx.ui.decoration.Single,

      style:
      {
		backgroundImage: "decoration/toolbar/toolbar-black.png",
		backgroundRepeat: "scale",
		
		widthTop: 1,
		colorTop: "#DADEE1",
		
		widthBottom: 1,
		colorBottom: "#878C92"
      }
    },
	
	"toolbar-button" :
    {
	  decorator: qx.ui.decoration.Grid,

      style:
      {
		baseImage: "decoration/toolbar/toolbar-button.png"
      }
    },
	
	"toolbar-button-hovered" :
    {
	  decorator: qx.ui.decoration.Grid,

      style:
      {
		baseImage: "decoration/toolbar/toolbar-button-hovered.png"
      }
    },
	
	"toolbar-button-checked" :
    {
	  decorator: qx.ui.decoration.Grid,

      style:
      {
		baseImage: "decoration/toolbar/toolbar-button-checked.png"
      }
    },
	
	"toolbar-separator":
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        widthLeft : 1,
		colorLeft: "#727272",
		styleLeft : "solid",
		
        widthRight : 1,
		colorRight: "#F5F5F5",
        styleRight : "solid"
      }
	},
	
	"toolbar-part" :
    {
      decorator : qx.ui.decoration.Background,

      style :
      {
        backgroundImage  : "decoration/toolbar/toolbar-part.gif",
        backgroundRepeat : "repeat-y"
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      TOOLTIP
    ---------------------------------------------------------------------------
    */

    "tooltip-error":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/form/tooltip-error.png",
        insets: [2, 5, 5, 2]
      }
    },


    "tooltip-error-arrow":
    {
      decorator: qx.ui.decoration.Background,

      style: {
        backgroundImage: "decoration/form/tooltip-error-arrow.png",
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        insets: [0, 0, 0, 10]
      }
    },

	
	/*
    ---------------------------------------------------------------------------
      WINDOW
    ---------------------------------------------------------------------------
    */
	"window":
    {
	  decorator: qx.ui.decoration.Grid,

      style:
      {
		baseImage: "decoration/window/window.png"
      }
    },
	
	"window-captionbar-active":
    {
	  decorator: qx.ui.decoration.Grid,

      style:
      {
		baseImage: "decoration/window/captionbar-active.png"
      }
    },
	
	"window-captionbar-inactive":
    {
	  decorator: qx.ui.decoration.Grid,

      style:
      {
		baseImage: "decoration/window/captionbar-inactive.png"
      }
    },
	
	"window-statusbar":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "decoration/window/statusbar.png"
      }
    }
    
  }
});