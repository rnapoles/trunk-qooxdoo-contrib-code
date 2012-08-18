/* ************************************************************************

   Copyright:
     2010-2012 Norbert Schröder

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

qx.Theme.define("retrotheme.theme.ColorDark",
{
  colors :
  {
    /*
    ---------------------------------------------------------------------------
      BACKGROUND COLORS
    ---------------------------------------------------------------------------
    */
    // application
    "background-application": "#525252",
    
    // button
    "background-button": "#222222",
    "background-button-red": "#8F0000",
    
    // caption
    "background-captionbar-active": "#222222",
    "background-captionbar-inactive": "#424242",
    
    // textfields, ...
    "background-light": "#FCFCFC",
    
    // datechooser
    "background-datechooser": "#222222",
    "background-datechooser-week": "#424242",
    
    // groupbox
    "background-groupbox": "#525252",
    
    // list
    "background-list": "#D2D2D2",
    "background-list-focused": "#F2F2F2",
    
    // menu
    "background-menu": "#323232",
    "background-menubar": "#727272",
    "background-menu-button-selected": "#5D7E7E",
    
    //pane
    "background-pane": "#424242",
    
    //scrollbar
    "background-scrollbar": "#626262",
    "background-scrollbar-slider": "#828282",
    "background-scrollbar-slider-hovered": "#5D7E7E",
    
    //splitpane
    "background-splitpane": "#424242",
    
    // table
    "background-table-header": "#626262",
    
    // tabview
    "background-tabview": "#525252",
    
    // textfield
    "background-textfield": "#E2E2E2",
    "background-textfield-focused": "#F2F2F2",
    "background-textfield-disabled": "#C2C2C2",
    
    //tooltip
    "background-tooltip": "#929292",
    
    //toolbar
    "background-toolbar": "#424242",
    "background-toolbar-selected": "#5D7E7E",
    
    // window
    "background-window": "#424242",
    
    "selected": "#5D7E7E",
    
    // table
    "table-focus-indicator" : "#80B4EF",
    "table-row-background-focused-selected" : "#5D7E7E",
    "table-row-background-focused" : "#80B4EF",
    "table-row-background-selected" : "#5D7E7E",
    
    /*
    ---------------------------------------------------------------------------
      TEXT COLORS
    ---------------------------------------------------------------------------
    */
    // labels
    "text-label": "white",
    "button-label": "white",

    // group boxes
    "text-title": "#FFFFFF",

    // text fields
    "text-input": "black",

    // states
    "text-hovered": "white",
    "text-disabled": "gray",
    "text-selected": "white",
    "text-active": "black",
    "text-inactive": "gray",
    "text-placeholder": "gray",
    "text-popup": "white",

    // menu-button
    "menu-button": "white",
    
    // toolbar-button
    "toolbar-button": "white",
    
    "window-caption": "white",
    
    /*
    ---------------------------------------------------------------------------
      BORDER COLORS
    ---------------------------------------------------------------------------
    */
    "border-frame": "#727272",
    
    "border-input" : "#334866",
    
    "border-disabled" : "#B6B6B6",
    
    "border-toolbar": "#8F8F8F",
    
    "border-separator" : "#808080",
    
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
    
    "border-main-light": "#929292",
    "border-main-dark": "#323232",
    
    "border-menu-light": "#727272",
    "border-menu-dark": "#121212",
    
    "invalid" : "#990000",
    "border-focused-invalid" : "#FF9999",
    
    /*
    ---------------------------------------------------------------------------
      TABLE COLORS
    ---------------------------------------------------------------------------
    */

    // equal to "background-pane"
    "table-pane" : "#F3F3F3",

    // own table colors
    // "table-row-background-selected" and "table-row-background-focused-selected"
    // are inspired by the colors of the selection decorator
    "table-focus-indicator" : "#0880EF",
    "table-row-background-focused-selected" : "#084FAB",
    "table-row-background-focused" : "#80B4EF",
    "table-row-background-selected" : "#084FAB",

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

    "progressive-table-header"              : "#AAAAAA",

    "progressive-table-row-background-even" : "#F4F4F4",
    "progressive-table-row-background-odd"  : "#E4E4E4",

    "progressive-progressbar-background"         : "gray",
    "progressive-progressbar-indicator-done"     : "#CCCCCC",
    "progressive-progressbar-indicator-undone"   : "white",
    "progressive-progressbar-percent-background" : "gray",
    "progressive-progressbar-percent-text"       : "white"
    
  }
  
});