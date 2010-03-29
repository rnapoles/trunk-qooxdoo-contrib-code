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
 * This positioning strategy cascades windows from the top-left corner of the
 * screen until this.MAX_CASCADE windows have been positioned.  Then it starts
 * again from the top-left corner.
 */
qx.Class.define("mdi.ui.window.position.CascadeStrategy",
{

  extend : qx.core.Object,


  implement : [mdi.ui.window.position.IPositioner],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(desktop)
  {
      this.base(arguments);

      // Workspace
      this.__desktop = desktop;

      // Initialise last positioned Window
      this.__lastPositionedTop  = 1;
      this.__lastPositionedLeft = 1;
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {

      /**
       * The number of pixels to shift each window (i.e, the "cascade" distance).
       */
      distance :
      {
          check : "Number",
          init : 25
      },


      /**
       * The X direction to travel in.
       * True implies increasing X (right-shift), false implies decreasing X
       * (left-shift).
       */
      xDirection :
      {
          check : "Boolean",
          init : true
      },


      /**
       * The Y direction to travel in.
       * True implies decreasing Y (down-shift), false implies increasing Y
       * (up-shift).
       */
      yDirection :
      {
          check : "Boolean",
          init : true
      }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {


    //  -----  Implement IPositioner  -----


    /**
     * Position a single window.
     *
     * @type member
     * @param window {mdi.ui.window.DesktopItem} A window to position.
     * @return {void}
     */
    positionWindow : function(window)
    {
        // Ensure travel will not push window beyond Desktop
        if ( this.__isTravelXTooFar(window) )
        {
            this.__toggleTravelX();
        }

        if ( this.__isTravelYTooFar(window) )
        {
            this.__toggleTravelY();
        }


        // Calculate new top and left
        this.__lastPositionedTop = ( this.getYDirection() ) // true means down-shift
                                 ? this.__lastPositionedTop + this.getDistance()
                                 : this.__lastPositionedTop - this.getDistance();

        this.__lastPositionedLeft = ( this.getXDirection() ) // true means right-shift
                                  ? this.__lastPositionedLeft + this.getDistance()
                                  : this.__lastPositionedLeft - this.getDistance();


        // Position window
        window.moveTo(this.__lastPositionedLeft, this.__lastPositionedTop);
    },


    /**
     * Arrange a collection of windows.
     *
     * @type member
     * @return {void}
     */
    positionWindows : function()
    {

        this.error("IMPL ME!");
    },


    //  -----  Private Implemention  -----


    /**
     * Determine whether or not the Desktop can accomodate the current X
     * travel direction.
     *
     * @type member
     * @param window {mdi.ui.window.DesktopItem} A window to check.
     * @return {Boolean} True if the present travelX direction would shift the
     *         window outside the Desktop, else false if it would not.
     */
    __isTravelXTooFar : function(window)
    {
        var isTooFar = false;

        var proposedLeft = ( this.getXDirection() ) // true means right-shift
                         ? this.__lastPositionedLeft + this.getDistance()
                         : this.__lastPositionedLeft - this.getDistance();

        var proposedRight = proposedLeft + window.getWidth();

        if (   proposedLeft < 1
            || proposedRight >= this.__getDesktopWidth() )
        {
            isTooFar = true;
        }

        return isTooFar;
    },


    /**
     * Determine whether or not the Desktop can accomodate the current Y
     * travel direction.
     *
     * @type member
     * @param window {mdi.ui.window.DesktopItem} A window to check.
     * @return {Boolean} True if the present travelY direction would shift the
     *         window outside the Desktop, else false if it would not.
     */
    __isTravelYTooFar : function(window)
    {
        var isTooFar = false;

        var proposedTop = ( this.getYDirection() ) // true means Down-shift
                        ? this.__lastPositionedTop + this.getDistance()
                        : this.__lastPositionedTop - this.getDistance();

        var proposedBottom = proposedTop + window.getHeight();

        if (   proposedTop < 1
            || proposedBottom >= this.__getDesktopHeight() )
        {
            isTooFar = true;
        }

        return isTooFar;
    },


    /**
     * Get the current pixel width of the Desktop.
     *
     * @type member
     * @return {Number} The pixel width of the Desktop.
     */
    __getDesktopWidth : function()
    {
        var box = this.__desktop.getContainerLocation("box");
        return box.right - box.left;
    },


    /**
     * Get the current pixel width of the Desktop.
     *
     * @type member
     * @return {Number} The pixel width of the Desktop.
     */
    __getDesktopHeight : function()
    {
        var box = this.__desktop.getContainerLocation("box");
        return box.bottom - box.top;
    },


    /**
     * Toggle the direction of property travelX.
     *
     * @type member
     * @return {void}
     */
    __toggleTravelX : function()
    {
        this.setXDirection( !this.getXDirection() );
    },


    /**
     * Toggle the direction of property travelY.
     *
     * @type member
     * @return {void}
     */
    __toggleTravelY : function()
    {
        this.setYDirection( !this.getYDirection() );
    }

  }
});
