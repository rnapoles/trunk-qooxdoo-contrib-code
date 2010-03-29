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
 * This is the minimum interface which must be implemented by all Positioner
 * Handlers.  This interface should be implemented by Desktop and Virtual
 * Desktop, for example.
 */
qx.Interface.define("mdi.ui.window.position.IPositionerHandler",
{

    extend : mdi.ui.window.position.IPositioner,


    members :
    {

        /**
         * Set the positioning Strategy.
         *
         * @type member
         * @param strategy {mdi.ui.window.position.IPositioner} An IPositioner.
         * @return {void}
         */
        setPositioner : function(positioner)
        {
            this.assertInterface(positioner, mdi.ui.window.position.IPositioner);
        },


        /**
         * Get the current positioning Strategy.
         *
         * @type member
         * @return {mdi.ui.window.position.IPositioner} An IPositioner instance.
         */
        getPositioner : function() {}


    }

})
