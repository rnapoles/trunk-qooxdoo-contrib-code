/**
  The ToolbarManager manages the Toolbar instances of one webpage and is
  adds their buttons to them.
*/
qx.Class.define("mamba.ui.ToolbarManager",
{
  statics :
  {
    _toolbars : {},
    _waitingToolbarButtons: {},
    _waitingMenuButtons: {},

    _idPrefixes :
    {
      button : "button_",
      menu   : "menu_",
      toggle : "toggle_"
    },


    /**
     * TODOC
     *
     * @param toolbarId {var} TODOC
     * @return {var} TODOC
     */
    get : function(toolbarId) {
      return this._toolbars[toolbarId];
    },


    /**
     * TODOC
     *
     * @param button {var} TODOC
     * @param menu {var} TODOC
     * @param toggle {var} TODOC
     * @return {void}
     */
    setIdPrefixes : function(button, menu, toggle)
    {
      this._idPrefixes.button = button;
      this._idPrefixes.menu = menu;
      this._idPrefixes.toggle = toggle;
    },


    /**
     * TODOC
     *
     * @param button {var} TODOC
     * @param menu {var} TODOC
     * @param toggle {var} TODOC
     * @return {var} TODOC
     */
    getIdPrefixes : function(button, menu, toggle) {
      return this._idPrefixes;
    },


    /**
     * TODOC
     *
     * @param buttonId {var} TODOC
     * @return {Map} TODOC
     */
    _getIdMap : function(buttonId)
    {
      var id = buttonId.substring(this._idPrefixes.button.length);

      var map =
      {
        button : buttonId,
        menu   : this._idPrefixes.menu + id,
        toggle : this._idPrefixes.toggle + id
      };

      return map;
    },


    /**
     * TODOC
     *
     * @param toolbarId {var} TODOC
     * @param listId {var} TODOC
     * @param checkboxFieldName {var} TODOC
     * @param checkboxAllFieldName {var} TODOC
     * @param allCount {Integer} The total number of list entries 
     * @param filteredCount {Integer} The number of list entries that match to
     *        the current filter or search.
     * @return {void}
     */
    add : function(toolbarId, listId, checkboxFieldName, checkboxAllFieldName,
      allCount, filteredCount)
    {
      if (!toolbarId || !listId) {
        throw "Missing arguments to create toolbar widget";
      }

      var t = this._toolbars[toolbarId] = new mamba.ui.Toolbar(toolbarId,
          listId, parseInt(allCount), parseInt(filteredCount));

      if (checkboxFieldName) {
        t.setCheckboxElements(checkboxFieldName);
      }

      if (checkboxAllFieldName) {
        t.setCheckboxAllElement(checkboxAllFieldName);
      }

      // Check whether there are toolbar buttons waiting for registration
      var toolbarButtonMap = this._waitingToolbarButtons[toolbarId];
      if (toolbarButtonMap) {
        for (buttonId in toolbarButtonMap) {
          this.registerToolbarButton(toolbarId, buttonId, toolbarButtonMap[buttonId]);
        }
      }

      // Check whether there are menu buttons waiting for registration
      var menuButtonMap = this._waitingMenuButtons[toolbarId];
      if (menuButtonMap) {
        for (buttonId in menuButtonMap) {
          this.registerMenuButton(toolbarId, buttonId, menuButtonMap[buttonId]);
        }
      }
    },


    /**
     * TODOC
     *
     * @param toolbarId {var} TODOC
     * @param buttonMap {var} TODOC
     * @return {void}
     */
    registerToolbarButton : function(toolbarId, buttonId, buttonInfo) {
      var toolbar = this.get(toolbarId);

      if (toolbar) {
        var idMap = this._getIdMap(buttonId);
        var btn = new mamba.ui.ToolbarButton(toolbar, idMap, buttonInfo);
        toolbar.registerButton(buttonId, btn);
      } else {
        // The toolbar is not yet created -> Register the button later
        if (this._waitingToolbarButtons[toolbarId] == null) {
          this._waitingToolbarButtons[toolbarId] = {};
        }

        this._waitingToolbarButtons[toolbarId][buttonId] = buttonInfo;
      }
    },


    /**
     * TODOC
     *
     * @param toolbarId {var} TODOC
     * @param buttonMap {var} TODOC
     * @return {void}
     */
    registerMenuButton : function(toolbarId, buttonId, buttonInfo) {
      var toolbar = this.get(toolbarId);

      if (toolbar) {
        //var idMap = this._getIdMap(buttonId);
        //var btn = new mamba.ui.ToolbarButton(toolbar, idMap, buttonId);
        //toolbar.registerButton(buttonId, btn);
      } else {
        // The toolbar is not yet created -> Register the button later
        if (this._waitingMenuButtons[toolbarId] == null) {
          this._waitingMenuButtons[toolbarId] = {};
        }

        this._waitingMenuButtons[toolbarId][buttonId] = buttonInfo;
      }
    },

    /**
     * Toggles the conentent of a toggle button.
     *
     * @param {String} toggleContentId the ID of the DOM element showing the
     *        content toggled by a toggle button.
     */
    toggleContent : function(toggleContentId) {
      var toggleContentEl = document.getElementById(toggleContentId);
      var toggleBtn = mamba.ui.ToolbarButton.getToggleButtonForContentElement(toggleContentEl);
      toggleBtn.toggleContent();
    }

  }
});