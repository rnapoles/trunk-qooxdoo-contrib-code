/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Authors:
     * Simon Bull (sbull)

************************************************************************ */

/* ************************************************************************

#module(ui_window)

************************************************************************ */

/*
Abstract superclass of all positioning strategies that position widgets
within a CanvasLayout.

@param vWorkspace A CanvasLayout that widgets should be positioned within.

@author sbull
*/

qx.Class.define("ext.strategy.position.AbstractPositionStrategy",
{
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vWorkspace)
  {
    qx.core.Object.call(this);

    // ************************************************************************
    //   WORKSPACE
    // ************************************************************************
    var w = this._workspace = vWorkspace;
    this.computeBounds();
    w.addEventListener("changeInnerWidth", this._handleresizeworkspace, this);
    w.addEventListener("changeInnerHeight", this._handleresizeworkspace, this);
    DOC.addEventListener("windowresize", this._handleresizeworkspace, this);

    // ************************************************************************
    //   SUPPORTED ORIGINS (Should be overridden by subclass)
    // ************************************************************************
    this._supportedOrigins = [];

    // ************************************************************************
    //   SUPPORTED DIRECTIONS (Should be overridden by subclass)
    // ************************************************************************
    this._supportedDirections = [];

    // ************************************************************************
    //   ORIGIN (Should be overridden by subclass)
    // ************************************************************************
    this._origin = null;

    // ************************************************************************
    //   DIRECTION (Should be overridden by subclass)
    // ************************************************************************
    this._direction = null;

    // ************************************************************************
    //   ZEROETH WIDGET POSITION
    // ************************************************************************
    this._zeroethTop = null;
    this._zeroethLeft = null;

    // ************************************************************************
    //   LAST WIDGET POSITION
    // ************************************************************************
    this._lastTop = null;
    this._lastLeft = null;
  },




  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics : { ABSTRACT_CLASS : "ext.strategy.position.AbstractPositionStrategy" },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      UTILITIES
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    getOrigin : function() {
      return this._origin;
    },


    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    getDirection : function() {
      return this._direction;
    },


    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    getAllWidgets : function() {
      return this._widgets;
    },


    /**
     * TODOC
     *
     * @type member
     * @return {Number} TODOC
     */
    getNumberOfWidgets : function()
    {
      var n = 0;
      var all = this._widgets;

      for (var i=0; i<all.length; i++)
      {
        var w = all[i];

        if (w != null) {
          n++;
        }
      }

      return n;
    },

    /*
      Determine the pixel coordinates of the workspace bounds.
    */

    /**
     * TODOC
     *
     * @type member
     * @return {void} 
     */
    computeBounds : function()
    {
      this._workspaceTop = this._workspace.getTop();
      this._workspaceLeft = this._workspace.getLeft();
      this._workspaceHeight = this._workspace._computeBoxHeight();
      this._workspaceWidth = this._workspace._computeBoxWidth();
      this._workspaceBottom = this._workspaceTop + this._workspaceHeight;
      this._workspaceRight = this._workspaceLeft + this._workspaceWidth;
    },

    /*
      @return true if vOrigin is a supported orgin, else false.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vOrigin {var} TODOC
     * @return {var} TODOC
     */
    isValidOrigin : function(vOrigin)
    {
      var isValid = false;

      if (this._supportedOrigins.indexOf(vOrigin) != -1) {
        isValid = true;
      } else {
        this.warn("isValidOrigin() Unsupported origin=" + vOrigin);
      }

      return isValid;
    },

    /*
      @return true if vDirection is a supported direction, else false.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vDirection {var} TODOC
     * @return {var} TODOC
     */
    isValidDirection : function(vDirection)
    {
      var isValid = false;

      if (this._supportedDirections.indexOf(vDirection) != -1) {
        isValid = true;
      } else {
        this.warn("isValidDirection() Unsupported direction=" + vDirection);
      }

      return isValid;
    },




    /*
    ---------------------------------------------------------------------------
      EVENTS
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void} 
     */
    _handleresizeworkspace : function(e) {
      this.warn("_handleresizeworkspace() Event handler not overriden by " + this);
    }
  }
});
