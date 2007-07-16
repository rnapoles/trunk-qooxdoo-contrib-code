/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2005-2007 by  Department of Infrastructure (DOI) State Government of Victoria

   License:
     LGPL 2.1: http://www.gnu.org/licenses/lgpl.html

   Authors:
     * Simon Bull (sbull)

************************************************************************ */

/* ************************************************************************

#module(core)

************************************************************************ */

qx.Class.define("ext.constant.UI",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    // Size of general icons throughout xfc - e.g., for toolbar buttons etc.
    ICON_SIZE                     : 16,

    // Minimised window icon size
    MINIMISED_WINDOW_ICON_SIZE    : 32,
    MINIMISED_WINDOW_ICON_SPACING : 32,

    // This is the height and width of each minimised icon (in pixels)
    // This should be smaller than MINIMISED_WINDOW_GRID_CELL_SIZE
    MINIMISED__ICON_SIZE          : 32,

    // This is the height and width of each grid cell (in pixels)
    MINIMISED__GRID_CELL_SIZE     : 64,

    // This is the amount of spacing around each grid cell (in pixels)
    MINIMISED__GRID_CELL_SPACING  : 12,

    // This is the amount of margin around the entire grid (in pixels)
    MINIMISED__GRID_MARGIN        : 12,

    // Generic Window
    MAXIMUM_CAPTION_LENGTH        : 50,
    BEZEL_WIDTH                   : 2,

    // MapWindow
    SEARCH_CRITERIA_MAX_LENGTH    : 50,

    // Generic Toolbar
    TOOLBAR_HEIGHT                : 26,

    // Vertical space between option groups in view dialog
    OPTION_GROUP_SPACING          : 12,

    // Vertical space between option group heading and options in view dialog
    OPTION_GROUP_HEADER_SPACING   : 6
  }
});
