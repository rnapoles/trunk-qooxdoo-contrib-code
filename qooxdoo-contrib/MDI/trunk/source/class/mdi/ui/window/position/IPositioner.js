/* ************************************************************************

   Copyright:


   License:

   Authors:
     Simon Bull

************************************************************************ */

/* ************************************************************************

#asset(mdi/*)

************************************************************************ */


/**
 * This is the minimum interface which must be implemented by all
 * window position Managers.
 *
 * @see mdi.ui.window.position.Manager
 */
qx.Interface.define("mdi.ui.window.position.IPositioner",
{


  members :
  {


        /**
         * Position a single window according to this Positioner's positioning
         * strategy.
         *
         * @type member
         * @param window {mdi.ui.window.DesktopItem} A window to position.
         * @return {void}
         */
        positionWindow : function(window)
        {
            this.assertInterface(window, mdi.ui.window.DesktopItem);
        },


        /**
         * Position all Windows according to this Positioner's positioning
         * strategy.
         *
         * @type member
         * @return {void}
         */
        positionWindows : function() {}


  }
});
