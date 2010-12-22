/* ************************************************************************

   Copyright:
     2010 Guilherme R. Aiolfi

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Guilherme R. Aiolfi (guilhermeaiolfi)

   ======================================================================

   This class contains code and resources based on the following work:

   * Aristo
     http://github.com/280north/aristo

     License:
       http://creativecommons.org/licenses/by-sa/3.0/us/

     Authors:
       * 280 North, Inc., http://280north.com/
       * Sofa, http://madebysofa.com/

************************************************************************ */

/**
 * Aristo color theme
 */
qx.Theme.define("aristo.theme.Color",
{
  colors :
  {
		"text-label": "#4f4f4f",
		"text-disabled": "#A7A7A7",
		"text-hovered": "#4f4f4f",
		"text-placeholder" : "#A7A7A7",
		"text-selected": "#FFFFFF",
		"text-input" : "#4f4f4f",
		"text-light" : "#a4a4a4",
		"text-title" : "#2a4d60",
		"text-active" : "#4f4f4f",
		"text-inactive" : "#4f4f4f",
		
		"invalid" : "#c82c2c",


		"border-light": "#d1d1d1",
		"border-main"							: "#949494",
		"border-input"						: "#d1d1d1",//"#949494",
		"border-separator" 				: "#808080",
		
		"background-application": "#FFFFFF",
		"background-light" : "#EEEEEE",
		"background-item-selected": "#5f83b9",
		"background-splitpane" 		: "#AFAFAF",
		"background-toolbar"  		: "#d4d4d4",
		"background-dark" 				: "#949494",
		"background-menu"					: "#fbfbfb",
		"background-medium"				: "#c2c2c2",
		"background-tip" 					: "#b8def5",
		"background-pane" 				: "#F3F3F3",
		"background-splitpane"		: "#AFAFAF",
		"background-odd" 					: "#E4E4E4",
		
		
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
    "table-row-background-focused-selected" : "#5f83b9",
    "table-row-background-focused" : "#80B4EF",
    "table-row-background-selected" : "#5f83b9",

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

    "progressive-table-header"              		 : "#AAAAAA",

    "progressive-table-row-background-even" 		 : "#F4F4F4",
    "progressive-table-row-background-odd"  		 : "#E4E4E4",

    "progressive-progressbar-background"         : "gray",
    "progressive-progressbar-indicator-done"     : "#CCCCCC",
    "progressive-progressbar-indicator-undone"   : "white",
    "progressive-progressbar-percent-background" : "gray",
    "progressive-progressbar-percent-text"       : "white"
  }
});
