/**
 * Initializes the height of the container boxes.
 */
qx.Class.define("mamba.container.PopupMenu",
{
  extend : qx.core.Object,

  statics: {
    debugMode : false
  },

  /**
     * Creates a new PopupMenu
     *
     * @param mainJQ {jQuery} the main element containing all elements of
     *        the popup menu (the content element and all trigger elements).
     * @param contentJQ {jQuery} the element containing the content of the
     *        popup menu.
     */
  construct : function(mainJQ, contentJQ)
  {
    this.mainJQ = mainJQ;
    this.contentJQ = contentJQ;

    var self = this;

    mainJQ.bind("mouseleave", function(e) {
      self.hide();
    });

    if (mamba.container.PopupMenu.debugMode) {
      window.setTimeout(function(){
        self.show();
      });
    }
  },

  properties :
  {

    /** Controls whether text wrap is activated or not. */
    alignRight :
    {
      check : "Boolean",
      init  : false
    },

    showTab :
    {
      check : "Boolean",
      init  : false
    },

    defaultDeltaX :
    {
      check : "Integer",
      init  : 0
    },

    defaultDeltaY :
    {
      check : "Integer",
      init  : 0
    }
  },

  members :
  {
    borderLeft : 5,
    borderRight : 5,
    borderTop : 4,
    borderBottom : 6,
    topCenterOverlap : 3,


    /**
     * Adds an element that triggers the appearance of the menu when hovered.
     *
     * @param hoverJQ {jQuery} the element triggering the popup menu when the
     *        user hovers over it
     * @param hoverDelay {Integer ? 0} the delay to wait between hovering and
     *        appearance of the popup menu (in millis)
     * @return {void}
     */
    addHoverTrigger : function(hoverJQ, hoverDelay)
    {
      var self = this;

      hoverJQ.mouseover(function() {
        self.showDelayed(hoverDelay);
      }).mouseout(function() {
        self.cancelShowDelayed();
      });
    },


    /**
     * Adds an element that triggers the appearance of the menu on mousedown.
     *
     * @param clickJQ {jQuery ? null} the element triggering the popup menu
     *        on mouse down
     * @param clickDelay {Integer ? 0} the delay between the mouse down event and
     *        the appearance of the popup menu (in millis)
     * @return {void}
     */
    addMouseDownTrigger : function(clickJQ, clickDelay)
    {
      var self = this;

      clickJQ.mouseup(function() {
        self.show();
      }).mousedown(function() {
        self.showDelayed(clickDelay);
      });
    },


    /**
     * TODOC
     *
     * @param delay {var} TODOC
     * @param x {var} TODOC
     * @param y {var} TODOC
     * @return {void}
     */
    showDelayed : function(delay, x, y)
    {
      if (this._showTimer == null)
      {
        var self = this;

        this._showTimer = window.setTimeout(function() {
          this._showTimer = null;
          self.show(x, y);
        }, delay);
      }
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    cancelShowDelayed : function() {
      window.clearTimeout(this._showTimer);
      this._showTimer = null;
    },


    /**
     * TODOC
     *
     * @param x {var} TODOC
     * @param y {var} TODOC
     * @return {void}
     */
    show : function(x, y) {
      if (this.isShowing()) {
        // Nothing to do
        return; 
      }

      this.cancelShowDelayed();
      var self = this;

      var contentElem = this.contentJQ[0];

      // NOTE: We show the element but set visibility to hidden and do the real
      //       showing in a timeout in order to be able to measure the element
      //       correctly
      contentElem.style.visibility = "hidden";
      contentElem.style.display = "block";
      contentElem.style.left = "0px";

      window.setTimeout(function() {
        self._reallyShow(x, y);
      });
    },


    /**
     * TODOC
     *
     * @param contentElem {var} TODOC
     * @param x {var} TODOC
     * @param y {var} TODOC
     * @return {void}
     */
    _reallyShow : function(x, y) {
      if (! this.isShowing()) {
        // The menu is not visible any more (it was opened and immediately closed)
        // -> Don't show it
        return;
      }

      var contentElem = this.contentJQ[0];
      var width = contentElem.offsetWidth;

      if (x == null) {
        if (this.getAlignRight()) {
          x = mamba.DomUtil.elemAbsRight(this.mainJQ) - width + this.getDefaultDeltaX();
        } else {
          x = mamba.DomUtil.elemAbsLeft(this.mainJQ) + this.getDefaultDeltaX();
        }
      }

      if (y == null) {
        y = mamba.DomUtil.elemAbsBottom(this.mainJQ) + this.getDefaultDeltaY();
      }

      //console.log("mainJQ x: "+x+"  mainJQ y: "+y+" contentElem.width"+width  );

      if (contentElem._decorationElem != null) {
        contentElem._decorationElem.style.display = "block";
      } else {
        var height = contentElem.offsetHeight;

        var decoElem = document.createElement("div");
        decoElem.className = "popup-menu-decoration";
        decoElem.style.left = x + "px";
        decoElem.style.top = y + "px";
        decoElem.innerHTML
          = '<div class="popup-menu-left" style="height:'
                + (this.borderTop + height) + 'px"></div>'
          + '<div class="popup-menu-right" style="left:'
                + (this.borderLeft + width) + 'px; height:'
                + (this.borderTop + height) + 'px"></div>'
          + '<div class="popup-menu-center" style="left:'
                + (this.borderLeft - this.topCenterOverlap) + 'px; width:'
                + (width + 2 * this.topCenterOverlap) + 'px"></div>'
          + '<div class="popup-menu-bottom-left" style="top:'
                + (this.borderTop + height) + 'px"></div>'
          + '<div class="popup-menu-bottom-center" style="left:'
                + this.borderLeft + 'px; top:' + (this.borderTop + height)
                + 'px; width:' + width + 'px"></div>'
          + '<div class="popup-menu-bottom-right" style="top:'
                + (this.borderTop + height) + 'px; left:'
                + (this.borderLeft + width) + 'px"></div>';

        contentElem.parentNode.insertBefore(decoElem, contentElem);
        contentElem._decorationElem = decoElem;
      }

      contentElem.style.left = (x + this.borderLeft) + "px";
      contentElem.style.top = (y + this.borderTop) + "px";
      contentElem.style.visibility = "visible";

      if (this.getShowTab()) {
        this.showTab();
      }
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    hide : function() {
      if (! this.isShowing()) {
        // Nothing to do
        return; 
      }

      if (mamba.container.PopupMenu.debugMode) {
        return;
      }

      this.cancelShowDelayed();

      var contentElem = this.contentJQ[0];
      contentElem.style.display = "none";

      if (contentElem._decorationElem != null) {
        contentElem._decorationElem.style.display = "none";
      }

      if (this.getShowTab()) {
        this.hideTab();
      }
    },


    isShowing : function() {
      var contentElem = this.contentJQ[0];
      return contentElem.style.display == "block";
    },


    /**
     * TODOC
     *
     * @param x {var} TODOC
     * @param y {var} TODOC
     * @return {void}
     */
    toggle : function(x, y)
    {
      var contentElem = this.contentJQ[0];

      if (contentElem.style.display == "none") {
        this.show(x, y);
      } else {
        this.hide();
      }
    },
    

    /**
     * Shows the tab like decoration around the customer and contract
     * popuplinks in the header
     *
     * @return {void}
     */
    showTab : function()
    {
      // show and position lower tab border
      var decoJQ = this.mainJQ.find(".header-tab-deco");

      var width =  this.mainJQ.width();
      var x = 0;

      if (this.getAlignRight()) {
        x = mamba.DomUtil.elemAbsRight(this.mainJQ) - width;
      } else {
        x = mamba.DomUtil.elemAbsLeft(this.mainJQ) + this.getDefaultDeltaX();
      }

      var y = mamba.DomUtil.elemAbsBottom(this.mainJQ) + this.getDefaultDeltaY();

      decoJQ.css({
        position: "absolute",
        display: "block",
        marginLeft: 0,
        marginTop: 0,
        top: y,
        left: x,
        width: width
      });

      // add decoratoin
      this.mainJQ.find(".header-tab").each(function()
      {
        if (this.id == "ro")
        {
          var cssObj =
          {
            "background-image"    : "url('img-mamba/background/header-tab-ro.png')",
            "background-position" : "right top"
          };
          $(this).css(cssObj);
        }

        if (this.id == "lo")
        {
          var cssObj =
          {
            "background-image"    : "url('img-mamba/background/header-tab-lo.png')",
            "background-position" : "left top"
          };

          $(this).css(cssObj);
        }
      });

      this.mainJQ.find(".header-tab-text").each(function() {
        $(this).css({ "color" : "black" });
      });

      this.mainJQ.find(".header-tab-img").each(function() {
        $(this).attr("src", "img-mamba/buttons/arrow-down-black.png");
      });
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    hideTab : function()
    {
      this.mainJQ.find(".header-tab").each(function()
      {
        if (this.id == "ro")
        {
          var cssObj = { "background-image" : "url(none)" };
          $(this).css(cssObj);
        }

        if (this.id == "lo")
        {
          var cssObj =
          {
            "background-image"    : "url(none)",
            "background-position" : "left top"
          };

          $(this).css(cssObj);
        }
      });

      this.mainJQ.find(".header-tab-text").each(function() {
        $(this).css({ "color" : "white" });
      });

      this.mainJQ.find(".header-tab-img").each(function() {
        $(this).attr("src", "img-mamba/buttons/arrow-down.png");
      });

      $(".header-tab-deco").css({"display": "none"});
    }

  }
});