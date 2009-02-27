qx.Class.define("mamba.ui.ToolbarButton",
{
  extend : mamba.ui.TextButton,

  construct : function(toolbar, idMap, capabilities)
  {
    var buttonId = "#" + idMap.button;
    var buttonEl = $(buttonId)[0];
    if (buttonEl == null) {
      throw new Error("Element with id " + buttonId + " for toolbar button doesn't exist");
    }
    this.base(arguments, buttonEl);

    this._toolbar = toolbar;

    this._selCount;
    this._prop;
    this._notProp;

    this._id = buttonId;  // "#button_"+id;
    this._menuId = "#" + idMap.menu;  // "div#menu_"+id;
    this._toggleId = "#" + idMap.toggle;  // "#toggle_"+id;

    this._init(capabilities);
  },

  properties: {
    type: { init: "normal", check: [ "normal", "menu", "toggle" ] },
    toggleContentVisible: {
      init: false,
      check: "Boolean",
      apply : "_applyToggleContentVisible",
      event : "changeToggleContentVisible"
    }
  },

  members :
  {
    /**
     * TODOC
     *
     * @param capabilities {var} TODOC
     * @return {void}
     */
    _init : function(capabilities)
    {
      // Set Button Type
      if ($(this._menuId).get(0)) {
        this.setType("menu");
        this._bindMenu();
      } else if ($(this._toggleId).get(0)) {
        $(this._toggleId).get(0)._toggleButton = this;
        this.setType("toggle");
      }

      this._initEventHandlers();

      this._setCapabilities(capabilities);
      this._setOnChangeCheckboxes();
      this._checkVisibility();
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _setOnChangeCheckboxes : function()
    {
      var self = this;
      var cb = this._toolbar.getCheckboxElements();
      var onchangeEvent = $.browser.msie ? "propertychange" : "change";

      if (cb) {

          $(this._toolbar.getCheckboxAllElement()).bind(onchangeEvent, function() {
            self._checkVisibility();
          });

          for (var i=0, l=cb.length; i<l; i++)
          {
            $(cb[i]).bind(onchangeEvent, function()
            {
              // self.debug("onchange checkbox "+ this.value +", handler of " +self._id, "log");
              self._checkVisibility();
            });
          }
      }
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _checkVisibility : function()
    {
      var checkedCheckboxesIndices = [];
      var checkboxEls = this._toolbar.getCheckboxElements();

      if (checkboxEls) {

          for (var i=0, l=checkboxEls.length; i<l; i++)
          {
            if (checkboxEls[i].checked) {
              checkedCheckboxesIndices.push(i);
            }
          }

          /*
                if(checkedCheckboxesIndices.length > 0) {
                  this.debug("checkbox index = " +checkedCheckboxesIndices[0], "log");
                } else {
                  this.debug("checkbox index = NONE", "log");
                }
              */
          var enabled = this._checkSelCount(checkedCheckboxesIndices.length)
              && this._checkProp(checkedCheckboxesIndices)
              && this._checkNotProp(checkedCheckboxesIndices);
          this.setEnabled(enabled);
      }
    },


    /**
     * TODOC
     *
     * @param selCount {var} TODOC
     * @return {boolean} TODOC
     */
    _checkSelCount : function(selCount)
    {
      // if(this._id == "#button_googleSitemaps") console.log("selCount = " +selCount +", this._selCount = " +this._selCount);
      if (!this._selCount) return true;

      var value;

      if (selCount == 0) {
        value = "none";
      } else if (selCount == 1) {
        value = "one";
      } else {
        value = "some";
      }

      for (var i=0, l=this._selCount.length; i<l; i++)
      {
        if (this._selCount[i] == value) {
          return true;
        }
      }

      return false;
    },


    /**
     * TODOC
     *
     * @param checkedCheckboxesIndices {var} TODOC
     * @return {boolean | var} TODOC
     */
    _checkProp : function(checkedCheckboxesIndices)
    {
      // if(this._id == "#button_googleSitemaps") debugger;
      if (!this._prop) return true;

      var propLengt = this._prop.length;
      var enabled = true;

      for (var i=0, l=checkedCheckboxesIndices.length; i<l; i++)
      {
        for (var j=0; j<propLengt; j++) {
          enabled = enabled && mamba.nxfix.ListItemCapabilities.get(this._toolbar.getListId(), checkedCheckboxesIndices[i], this._prop[j]);
        }
      }

      return enabled;
    },


    /**
     * TODOC
     *
     * @param checkedCheckboxesIndices {var} TODOC
     * @return {boolean | var} TODOC
     */
    _checkNotProp : function(checkedCheckboxesIndices)
    {
      // if(this._id == "#button_googleSitemaps") debugger;
      if (!this._notProp) return true;

      var notPropLength = this._notProp.length;
      var enabled = true;

      for (var i=0, l=checkedCheckboxesIndices.length; i<l; i++)
      {
        for (var j=0; j<notPropLength; j++) {
          enabled = enabled && !mamba.nxfix.ListItemCapabilities.get(this._toolbar.getListId(), checkedCheckboxesIndices[i], this._notProp[j]);
        }
      }

      return enabled;
    },


    /**
     * TODOC
     *
     * @param cap {var} TODOC
     * @return {void}
     */
    _setCapabilities : function(cap)
    {
      if (cap)
      {
        this._prop = cap.prop ? cap.prop.split(",") : null;
        this._notProp = cap.notprop ? cap.notprop.split(",") : null;
        this._selCount = cap.selcount ? cap.selcount.split(",") : null;
      }
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _initEventHandlers : function()
    {
      var self = this;

      if (self.getType() == "menu") {
        this.addListener("click", self.toggleMenu, self);

        $(self._menuId).bind("mouseover", function(e) {
          self.showMenu();
        });

        $(self._id).bind("mouseleave", function(e) {
          self.hideMenu();
        });

        $(self._menuId).bind("mouseleave", function(e) {
          self.hideMenu();
        });
      } else if (self.getType() == "toggle") {
        this.addListener("click", self.toggleContent, self);
      }
    },

    isMenuVisible : function() {
      return this._menuIsVisible;
    },

    toggleMenu : function() {
      if (this.isMenuVisible()) {
        this.hideMenu();
      } else {
        this.showMenu();
      }
    },

    showMenu : function() {
      if (this.getEnabled() && this.getType() == "menu") {
        $(this._menuId).show();
        this._menuIsVisible = true;
      }
    },

    hideMenu : function() {
      if (this.getType() == "menu") {
        $(this._menuId).hide();
        this._menuIsVisible = false;
      }
    },

    // Bind Menu
    /**
     * TODOC
     *
     * @return {void}
     */
    _bindMenu : function()
    {
      var button = $(this._id).get(0);
      var menu = $(this._menuId).get(0);

      var offset = $(button).offset();

      var posXMenu = offset.left;
      var posYMenu = offset.top + button.offsetHeight;

      menu.style.position = "absolute";
      menu.style.left = "5000px";
      menu.style.top = posYMenu + "px";

      menu.style.display = "block";
      offset = $(menu).offset();
      menu.style.display = "none";

      if($.browser.msie) {
        offset.top = offset.top + 1;
      }

      menu.style.left = posXMenu + "px";
      menu.style.top = (2*posYMenu - offset.top) + "px";
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    execute : function()
    {
      var buttonEl = this.getButtonElement();
      var buttonJQ = $(buttonEl);

      if (buttonEl.nodeName.toLowerCase() === "input") {
        buttonJQ.trigger("click");
      } else {
        buttonJQ.trigger("mousedown");
      }
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    toggleContent : function() {
      this.setToggleContentVisible(! this.getToggleContentVisible());
    },


    _applyToggleContentVisible: function(value, old) {
      if (value) {
        this.getToggleContent().show();
      } else {
        this.getToggleContent().hide();
      }
    },


    /**
     * Returns the element toggled by this button.
     *
     * @return {jQuery} the element toggled by this button.
     */
    getToggleContent: function() {
      return $(this._toggleId);
    }

  },

  statics : {
    getToggleButtonForContentElement : function(toggleContentEl) {
      return toggleContentEl._toggleButton;
    }
  }

});