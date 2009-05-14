/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Thomas Herchenroeder (thron7)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

qx.Class.define("progressbar.ProgressBar",
{
  extend : qx.ui.container.Composite,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(label)
  {
    this.base(arguments);
	this.setLayout(new qx.ui.layout.HBox(10));

    var label = label || "Progress:";

    this.label = new qx.ui.basic.Label(label);
    this.add(this.label);
    this.setLabel(label);

    this.hull = new qx.ui.container.Composite();
	this.hull.setLayout(new qx.ui.layout.Canvas());
	this.hull.set({ allowGrowY: true });
    this.add(this.hull, { width: "100%" });

    this.hull.set(
    {
      backgroundColor : "#C1ECFF"
    });

    this.bar = new qx.ui.basic.Atom();
    this.bar.set(
    {
      width: 1,
	  allowGrowY: true,
	  allowStretchY: true,
      backgroundColor: "#0000FF"
    });
    //this.bar.setStyleProperty("fontSize", 0);  // for IE
    this.hull.add(this.bar);

    this._statusLabel = new qx.ui.basic.Label("(0/0 - 0%)");
    if (!this.isShowStepStatus() || !this.isShowPcntStatus())
      this._statusLabel.setVisibility("hidden");
    this.add(this._statusLabel);

	this.hull.addListener("resize", function(e) {
		if (this.getProportion())
			this._update(this.getProportion(), e.getData().width);
	}, this);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    status : { check : "Integer" },

    label :
    {
      check : "String",
      apply : "_applyLabel"
    },

    barWidth :
    {
      check : "Integer",
      apply : "_applyBarWidth"
    },

    showStepStatus :
    {
      check : "Boolean",
      init  : false,
      apply : "_applyShowStepStatus"
    },

    showPcntStatus :
    {
      check : "Boolean",
      init  : false,
      apply : "_applyShowPcntStatus"
    },

    barColor :
    {
      check : "Color",
      apply : "_applyBarColor"
    },
	
	proportion :
	{
		apply : "_applyProportion",
		check : "String",
		nullable: true
	}
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
	_statusLabel : null,
	
    /**
     * For future testing only.
     *
     * @internal
     * @type member
     * @return {void}
     */
    showOff : function()
    {
		var timer = qx.util.TimerManager.getInstance();
		timer.start(function(data, timerId) {
			if (data.percent >= 100) {
				timer.stop(timerId);
				return;
			}
			data.percent++;
			this.set({ proportion: data.percent + "%" });
		}, 1000, this, { percent: 0 });
    },

    // update with increment
    /**
     * TODOC
     *
     * @type member
     * @return {void}
     */
    increment : function() {},


    /**
     * TODOC
     *
     * @type member
     * @return {void}
     */
    reset : function()
    {
      this._statusLabel.setContent("");
      this.bar.setWidth(0);
    },

    /**
     * Updates the progress bar to show a different proportion complete
     *
     * @type member
     * @param val {String} val can be either a fraction ("5/12") specifying the degree
     *            of completeness with discrete values (like 5 of 12 items have
     *            been complete); or a percentage ("68%") of the degree of
     *            completeness.
     * @return {boolean} true if it successfully changed the bar
     * @throws Error if the val could not be interpretted
	 * @deprecated use the proportion property instead
	 * @see proportion property
     */
    update : function(val) {
		this._update(val);
	},

    /**
     * Updates the progress bar to show a different proportion complete
     *
     * @type member
     * @param val {String} val can be either a fraction ("5/12") specifying the degree
     *            of completeness with discrete values (like 5 of 12 items have
     *            been complete); or a percentage ("68%") of the degree of
     *            completeness.
	 * @param hullWidth {Integer} passed during the resize event because it's not available directly
     * @return {boolean} true if it successfully changed the bar
     * @throws Error if the val could not be interpretted
	 * @deprecated use the proportion property instead
	 * @see proportion property
     */
    _update : function(val, hullWidth)
	{
		hullWidth = hullWidth || this.hull.getWidth();
		if (!hullWidth) {
			var bounds = this.hull.getBounds();
			if (bounds)
				hullWidth = bounds.width;
		}
		if (!hullWidth) {
			this.debug("Cannot update progress bar because cannot find the width of the hull");
			return;
		}
		var paramError = "Parameter to 'update' function must be a string representing a fraction or a percentage.";  // type error
		var quotVal, pcntVal;

		if (typeof (val) != 'string')
			throw new Error(paramError);

		var quotText = "0/1";
		var pcnt = 0;
	  
		if (val.indexOf("/") > -1) {
			// handle curr/total spec
			var quot = val.split("/");

			if ((quot.length != 2) || (isNaN(quot[0] = parseInt(quot[0]))) || (isNaN(quot[1] = parseInt(quot[1]))) || (quot[0] <= 0) || (quot[1] <= 0) || (quot[0] > quot[1]))
				throw new Error(paramError);
			pcnt = Math.round(quot[0] / quot[1] * 100);
			quotText = val;
		}

		// alternative use properties, e.g. this.setPcntStatus(..)
		else if (val[val.length - 1] = "%") {  // ends in '%'
			// handle percent spec
			pcnt = parseInt(val.slice(0, val.length - 1));

			if (pcnt == NaN || (pcnt < 0 || pcnt > 100))
				throw new Error(paramError);
			quotText = pcnt + "/100";
		} else

			// throw invalid update spec exception
			throw new Error(paramError);

		var newWidth = Math.round(hullWidth / 100 * pcnt);
		this.bar.setWidth(newWidth);
		
		var ss = this.isShowStepStatus();
		var sp = this.isShowPcntStatus();
		if (ss || sp) {
			var statusText = "(";
			if (ss) {
				statusText += quotText;
				if (sp)
					statusText += " - ";
			}
			if (sp)
				statusText += pcnt + "%";
			statusText += ")";
			
			this._statusLabel.setContent(statusText);
		}
			
		return true;
	},
	
	/**
	 * Called by the rendering engine to apply dimensions
	 * @Override
	 */
	renderLayout : function(left, top, width, height) {
		this.base(arguments, left, top, width, height);
		this.bar.setHeight(height);
	},

	/**
	 * Schedules an update of the bar to match the set proportion
	 */
	_scheduleUpdate : function() {
		if (this.getProportion())
			qx.util.DeferredCallManager.getInstance().schedule(new qx.util.DeferredCall(function() {
				this.update(this.getProportion());
			}, this));
	},

	/**
	 * Implements the proportion property; can be either a fraction ("5/12") specifying the 
	 * degree of completeness with discrete values (like 5 of 12 items have been complete); 
	 * or a percentage ("68%") of the degree of completeness.
	 */
	_applyProportion : function(val)
    {
		this.update(val);
    },

	
    /**
     * TODOC
     *
     * @type member
     * @param newLabel {var} TODOC
     * @return {void}
     */
    _applyLabel : function(newLabel) {
      this.label.setContent(newLabel);
    },


    /**
     * TODOC
     *
     * @type member
     * @param newWidth {var} TODOC
     * @return {void}
     */
    _applyBarWidth : function(newWidth) {
      this.hull.setWidth(newWidth);
    },


    /**
     * TODOC
     *
     * @type member
     * @param newStatus {var} TODOC
     * @return {void}
     */
    _applyShowStepStatus : function(newStatus)
    {
      if (newStatus || this.isShowPcntStatus()) {
        this._statusLabel.setVisibility("visible");
      } else if (!newStatus && !this.isShowPcntStatus()) {
        this._statusLabel.setVisibility("hidden");
      }
    },


    /**
     * TODOC
     *
     * @type member
     * @param newStatus {var} TODOC
     * @return {void}
     */
    _applyShowPcntStatus : function(newStatus)
    {
      if (newStatus || this.isShowStepStatus()) {
        this._statusLabel.setVisibility("visible");
      } else if (!newStatus && !this.isShowStepStatus()) {
        this._statusLabel.setVisibility("hidden");
      }
    },



    /**
     * TODOC
     *
     * @type member
     * @param newColor {var} TODOC
     * @return {void}
     */
    _applyBarColor : function(newColor) {
      this.bar.setBackgroundColor(newColor);
    }
  },


  destruct : function ()
  {
    this._disposeObjects(
      "label",
      "hull",
      "bar",
	  "_statusLabel"
    );
  }

});
