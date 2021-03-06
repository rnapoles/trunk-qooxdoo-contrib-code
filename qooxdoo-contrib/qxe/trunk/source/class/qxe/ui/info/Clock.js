/* ************************************************************************

   qxe - qooxdoo extension framework

   Copyright:
     2010-2011 Cost Savers, http://www.cost-savers.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Stefan Andersson (sand)

************************************************************************ */

/**
 * An abstract class for all info clock classes.
 *
 * - integrate internet time
 */
qx.Class.define("qxe.ui.info.Clock",
{
  extend : qx.ui.core.Widget,
  type : "abstract",


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    var interval = this.getInterval();

    var timer = this._timer = qx.util.TimerManager.getInstance();
    this._timerId = timer.start(this._onInterval, interval, this, null, interval);
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "clock"
    },

   /*
    ---------------------------------------------------------------------------
      FEATURES
    ---------------------------------------------------------------------------
    */

    /*
     * The current value of the interval (this should be used internally only).
     */
    interval :
    {
      check : "Number",
      init : 1000
    },

    /*
     * The current zone.
     */
    zoneOffset :
    {
      check : "Number",
      init : -1
    },

    /*
     * The zone method:
     * true :  zone based on web browser setting
     * false : zone based on ip address
     */
    zoneMethod :
    {
      check : "Boolean",
      init : false
    },

    /*
     * Central Daylight Time 
     * CDT is 5 hours behind of Coordinated Universal Time (UTC)
     *
     * Note that CDT is a daylight saving time/summer time zone. It is generally only used during 
     * the summer in the places listed below, during the winter CST is used instead
     */
    CDT :
    {
      check : "Number",
      init : 5
    },

    /*
     * Central Standard Time
     *
     * CST is 6 hours behind of Coordinated Universal Time (UTC)
     *
     * Note that most places observe daylight saving time/summer time during summer,
     * and are therefore using CDT instead in the summer.
     */
    CST :
    {
      check : "Number",
      init : 6
    },

    /*
     * Show seconds.
     */
    showSeconds :
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
    /** Timer instance */
    __timer : null,
    /** Timer id */
    __timerId : null,


    /*
    ---------------------------------------------------------------------------
      BASIC EVENT HANDLERS
    ---------------------------------------------------------------------------
    */

    /**
     * Called every clock interval.
     *
     * @param userData {json} The user data transferred
     * @param timerId {Number} The timer id
     */
    _onInterval : function(userData, timerId)
    {
      var date = new Date();
      var hours   = date.getUTCHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var offset  = this.getZoneOffset();

      // If hours < 0 add 24 for correct time
      // Else just subtract it.
      hours = (hours < offset) ? hours + 24 - offset : hours - offset;

      this.display(hours, minutes, seconds);
    },

    /**
     * Display the clock.
     */
    display : function(hours, minutes, seconds)
    {
      throw new Error("Abstract method call.");
    }
  },


  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    var timer = this.__timer;

    if (timer)
    {
      timer.stop(this.__timerId);
      timer = null;
    }
  }
});

