/* ************************************************************************

   Copyright:
     2011 Norbert Schröder

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

qx.Theme.define("silverbluetheme.theme.Color",
{
  colors:
  {
    /*
    ---------------------------------------------------------------------------
      BACKGROUND COLORS
    ---------------------------------------------------------------------------
    */
	// application
	"background-application": "#F0F0F0",
	
	// button
	"background-button": "#12151E",
	"background-button-red": "#8F0000",
	
	// caption
	"background-captionbar-active": "#181C28",
	"background-captionbar-inactive": "#37405F",
	
	// datechooser
	"background-datechooser": "#181C28",
	"background-datechooser-week": "#37405F",
	
	// groupbox
	"background-groupbox": "#5C6170",
	
	// list
	"background-list": "#D2D2D2",
	"background-list-focused": "#E2E2E2",
	
	// menu
	"background-menu": "#181C28",
	"background-menubar": "#656B7F",
	"background-menu-button-selected": "maroon",
	
	//scrollbar
	"background-scrollbar": "#A2A2A2",
	"background-scrollbar-slider": "#6575A7",
	"background-scrollbar-slider-hovered": "blue",
	
	// splitpane
    "background-splitpane" : "#AFAFAF",
	
	// table
	"background-table-header": "#6575A7",
	
	// tabview
	"background-tabview": "#777E95",
	
	// textfield
	"background-textfield": "#E2E2E2",
	"background-textfield-focused": "#F2F2F2",
	"background-textfield-disabled": "#C2C2C2",
	
	//tooltip
	"background-tip" : "#FFFFDD",
	"background-tooltip": "#929292",
    "background-tip-error": "#C72B2B",
	
	//toolbar
	"background-toolbar": "#37405F",
	"background-toolbar-selected": "red",
	
	// window
	"background-pane": "#FFFFFF",
	"background-window": "#37405F",
	
	// misc.
	"background-light": "#F5F5F5",
	"background-medium": "#C0C0C0",
	"background-selected": "#7F949D",
	"selected": "#5F83B9",
	
	/*
    ---------------------------------------------------------------------------
      TABLE COLORS
    ---------------------------------------------------------------------------
    */
    // equal to "background-pane"
    "table-pane" : "#F3F3F3",
	
	"table-focus-indicator": "#80B4EF",
    "table-row-background-focused-selected": "#385A8D",
    "table-row-background-focused": "#BACCD4",
    "table-row-background-selected": "#385A8D",
	
	// equal to "background-pane" and "background-odd"
    "table-row-background-even" : "#F3F3F3",
    "table-row-background-odd" : "#E4E4E4",

    // equal to "text-selected" and "text-label"
    "table-row-selected" : "#fffefe",
    "table-row" : "#1a1a1a",

    // equal to "border-collumn"
    "table-row-line" : "#CCCCCC",
    "table-column-line" : "#CCCCCC",
	
	/*
    ---------------------------------------------------------------------------
      PROGRESSIVE TABLE COLORS
    ---------------------------------------------------------------------------
    */

    "progressive-table-header": "#AAAAAA",

    "progressive-table-row-background-even": "#F4F4F4",
    "progressive-table-row-background-odd": "#E4E4E4",

    "progressive-progressbar-background": "gray",
    "progressive-progressbar-indicator-done": "#CCCCCC",
    "progressive-progressbar-indicator-undone": "white",
    "progressive-progressbar-percent-background": "gray",
    "progressive-progressbar-percent-text": "white",
	
    /*
    ---------------------------------------------------------------------------
      TEXT COLORS
    ---------------------------------------------------------------------------
    */
    // other types
    "text-light": "#808080",
    "text-gray": "gray",

    // labels
    "text-label": "#101010",
	
	// "text-button": "#404040",
	"text-button": "#101010",

    // group boxes
    "text-title": "#101010",

    // text fields
    "text-input": "#101010",

    // states
    "text-hovered": "#001533",
    "text-disabled": "gray",
    "text-selected": "white",
    "text-active": "#101010",
    "text-inactive": "gray",
    "text-placeholder": "gray",
	"text-popup": "white",

	// menu-button
	"menu-button": "white",
	
	// toolbar-button
	"toolbar-button": "#101010",
	"toolbar-button-checked": "#101010",
	
	"window-caption": "white",
	
	/*
    ---------------------------------------------------------------------------
      BORDER COLORS
    ---------------------------------------------------------------------------
    */
	"border-frame": "#626262",
	
	"border-toolbar": "#8F8F8F",
	
	"border-tooltip-dark": "#424242",
	"border-tooltip-light": "#C2C2C2",
	
	"border-outset-dark": "#020202",
	"border-outset-light": "#929292",
	
	"border-inset-dark": "#222222",
	"border-inset-light": "#828282",
	
	"border-inset-dark-medium": "#323232",
	"border-inset-light-medium": "#727272",
	
	"border-inset-inner-dark": "#424242",
	"border-inset-inner-light": "#C2C2C2",
	
	"border-inset-inner-dark-medium": "#525252",
	"border-inset-inner-light-medium": "#B2B2B2",
	
	// menus, tables, scrollbars, list, etc.
	"border-main": "#CECECE",
	
	"border-menu-light": "#727272",
	"border-menu-dark": "#121212",
	
	// between toolbars
	"border-separator" : "#808080",
	
	// text fields
	"border-input" : "#334866",
	
	// disabled text fields
    "border-disabled" : "#B6B6B6",
	
	// tab view, window
    "border-pane" : "#00204D",
	
	// focus state of text fields
    "border-focused" : "#99C3FE",
	
	// invalid form widgets
    "invalid" : "#990000",
    "border-focused-invalid" : "#FF9999"
  }
});