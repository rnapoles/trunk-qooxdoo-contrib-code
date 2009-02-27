qx.Class.define("mamba.ui.Toolbar",
{
  extend : qx.core.Object,

  /**
   * 
   * @param {Object} id
   * @param {Object} listId
   * @param allCount {Integer} The total number of list entries 
   * @param filteredCount {Integer} The number of list entries that match to
   *        the current filter or search.
   */
  construct : function(id, listId, allCount, filteredCount)
  {
    this._id = id;
    this._listId = listId;
    this._allCount = allCount;
    this._filteredCount = filteredCount;
    this._buttons = {};

    mamba.ui.ToolbarList.init(listId);
  },

  members :
  {
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getId : function() {
      return this._id;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getListId : function() {
      return this._listId;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getCheckboxElements : function() {
      return this._checkboxEls;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getCheckboxAllElement : function() {
      return this._checkboxAlEl;
    },


    /**
     * TODOC
     *
     * @param nCheckboxAllFieldName {Number} TODOC
     * @return {void} 
     */
    setCheckboxAllElement : function(nCheckboxAllFieldName)
    {
      this._checkboxAlEl = $("[name=" + nCheckboxAllFieldName + "]").get(0);
      this._setOnClickCheckboxAll();
      this._observeCheckboxes();
      this._registerFooterEvents();
    },


    /**
     * TODOC
     *
     * @param nCheckboxFieldName {Number} TODOC
     * @return {void} 
     */
    setCheckboxElements : function(nCheckboxFieldName) {
      this._checkboxEls = document.getElementsByName(nCheckboxFieldName);
    },


    /**
     * TODOC
     *
     * @param id {var} TODOC
     * @param button {var} TODOC
     * @return {void} 
     */
    registerButton : function(id, button) {
      this._buttons[id] = button;

      if (button.getType() == "toggle") {
        button.addListener("changeToggleContentVisible",
            this._createToggleButtonHandler(button));
        this._updateToogleVisibility();
      }
    },


    _createToggleButtonHandler: function(button) {
      var self = this;
      return function(evt) {
        if (evt.getData()) {
          // The toggle content of our button was shown
          // -> Hide the other toggle contents
          for (var id in self._buttons) {
            var btn = self._buttons[id];
            if (btn != button && btn.getType() == "toggle") {
              btn.setToggleContentVisible(false);
            }
          }
        }
      };
    },


    /**
     * TODOC
     *
     * @param id {var} TODOC
     * @return {var} TODOC
     */
    getButton : function(id) {
      return this._buttons[id];
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getButtons : function() {
      return this._buttons;
    },


    /**
     * If there was a search or filter applied the corresponding search or
     * filter details are shown
     */
    _updateToogleVisibility: function() {
      // Try to examin the toggle button belonging to the search or filter
      // details to show
      var activeToggleButton = null;
      for (var id in this._buttons) {
        var button = this._buttons[id];
        if (button.getType() == "toggle") {
          var inputJQ = button.getToggleContent().find("input[@type='text']");
          if (inputJQ.length > 0) {
            // This toggle element has an text input elem inside
            // -> Check whether it was filled when the page was loaded 
            var value = inputJQ.attr("value");
            if (value != null && value != "") {
              // The input elem was prefilled -> We have the active button for shure
              activeToggleButton = button;
              break;
            }
          } else {
            // This toggle element has no input elem inside
            // -> Assume that this is the active button if there was a filter applied
            if (this._allCount != this._filteredCount) {
              activeToggleButton = button;
              // NOTE: No break here, since we are not shure
            }
          }
        }
      }

      if (activeToggleButton != null) {
        activeToggleButton.setToggleContentVisible(true);
      }
    },


    /**
     * TODOC
     *
     * @return {void} 
     */
    _checkAll : function()
    {
      var isIe = $.browser.msie;
      var jCheckboxAll = $(this._checkboxAlEl);
      jCheckboxAll.attr('checked', true);

      for (var i=0, l=this._checkboxEls.length; i<l; i++)
      {
        this._checkboxEls[i].checked = true;

        if (!isIe) {
          $(this._checkboxEls[i]).change();
        }
      }
    },


    /**
     * TODOC
     *
     * @return {void} 
     */
    _checkNone : function()
    {
      var isIe = $.browser.msie;
      var jCheckboxAll = $(this._checkboxAlEl);
      jCheckboxAll.attr('checked', false);

      for (var i=0, l=this._checkboxEls.length; i<l; i++)
      {
        this._checkboxEls[i].checked = false;

        if (!isIe) {
          $(this._checkboxEls[i]).change();
        }
      }
    },


    /**
     * TODOC
     *
     * @return {void} 
     */
    _setOnClickCheckboxAll : function()
    {
      var self = this;
      var jCheckboxAll = $(this._checkboxAlEl);

      jCheckboxAll.click(function(e)
      {
        var status = jCheckboxAll.attr("checked");
        (status) ? self._checkAll() : self._checkNone();
      });
    },


    /**
     * TODOC
     *
     * @return {void} 
     */
    _registerFooterEvents : function()
    {
      var self = this;

      $(".otableSelectAll").click(function(e) {
        self._checkAll();
      });

      $(".otableSelectNone").click(function(e) {
        self._checkNone();
      });
    },


    /**
     * TODOC
     *
     * @return {void} 
     */
    _observeCheckboxes : function()
    {
      var self = this;
      var jCheckboxAll = $(this._checkboxAlEl);
      var jCheckboxes = $(this._checkboxEls);
      var countAllCheckboxes = jCheckboxes.length;

      jCheckboxes.click(function(e)
      {
        var countSelected = 0;

        for (var i=0; i<countAllCheckboxes; i++)
        {
          if (jCheckboxes.get(i).checked) countSelected++;
        }

        var status = (countAllCheckboxes == countSelected);
        jCheckboxAll.attr('checked', status);
      });
    }
  }
});