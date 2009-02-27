qx.Class.define("mamba.ui.ToolbarList",
{
  statics :
  {
    BUTTON_SORTUP_DEFAULT    : "img-mamba/toolbar/sort-up.png",
    BUTTON_SORTUP_OVER       : "img-mamba/toolbar/sort-up-over.png",
    BUTTON_SORTUP_ACTIVE     : "img-mamba/toolbar/sort-up-pressed.png",

    BUTTON_SORTDOWN_DEFAULT    : "img-mamba/toolbar/sort-down.png",
    BUTTON_SORTDOWN_OVER       : "img-mamba/toolbar/sort-down-over.png",
    BUTTON_SORTDOWN_ACTIVE     : "img-mamba/toolbar/sort-down-pressed.png",

    CSS_CLASS_SORTUP : "sortup",
    CSS_CLASS_SORTDOWN : "sortdown",


    _lastCheckbox : {},


    /**
     * TODOC
     *
     * @param listId {var} TODOC
     * @return {void}
     */
    init : function(listId)
    {
      this._setOnClickRow(listId);
      this._setOnChangeCheckbox(listId);
      this._setOnMouseDownRow(listId);
      this._setDisableTextSelection(listId);
      this._setSortButtons(listId);

      this._setInitStyles(listId);
    },


    _setSortButtons : function(listId)
    {
      $("#" + listId +" ." +mamba.ui.ToolbarList.CSS_CLASS_SORTUP).mouseover(function(e) {
        this.src = mamba.ui.ToolbarList.BUTTON_SORTUP_OVER;
      }).mouseout(function(e) {
        this.src = mamba.ui.ToolbarList.BUTTON_SORTUP_DEFAULT;
      }).mousedown(function(e) {
        this.src = mamba.ui.ToolbarList.BUTTON_SORTUP_ACTIVE;
      });

      $("#" + listId +" ." +mamba.ui.ToolbarList.CSS_CLASS_SORTDOWN).mouseover(function(e) {
        this.src = mamba.ui.ToolbarList.BUTTON_SORTDOWN_OVER;
      }).mouseout(function(e) {
        this.src = mamba.ui.ToolbarList.BUTTON_SORTDOWN_DEFAULT;
      }).mousedown(function(e) {
        this.src = mamba.ui.ToolbarList.BUTTON_SORTDOWN_ACTIVE;
      });
    },


    /**
     * TODOC
     *
     * @param listId {var} TODOC
     * @return {void}
     */
    _setInitStyles : function(listId)
    {
      // Check selected checkbox
      $("tr.low, tr.high").each(function(e)
      {
        var jCheckbox = $(this).find("input[@type='checkbox']");

        if (jCheckbox.get(0)) {
          jCheckbox.get(0).checked ? $(this).addClass("marked") : $(this).removeClass("marked");
        }
      });
    },


    /**
     * TODOC
     *
     * @param listId {var} TODOC
     * @return {void}
     */
    _setDisableTextSelection : function(listId) {
      $('.otable').disableTextSelect();  // disable text selection
    },


    /**
     * TODOC
     *
     * @param jTarget {var} TODOC
     * @return {void}
     */
    _onBeforeShowContextMenu : function(jTarget)
    {
      var menu = this._getContextMenu();
      menu.checkVisibility();

      if (!jTarget.parent("tr").eq(0).hasClass("marked"))
      {
        if (jTarget.get(0).nodeName.toLowerCase() == "td") {
          jTarget.click();
        } else {
          jTarget.parent("td").eq(0).click();
        }
      }
    },


    /**
     * TODOC
     *
     * @param listId {var} TODOC
     * @return {void}
     */
    _setOnMouseDownRow : function(listId)
    {
      // Disable browser context menu (requires both selectors to work in IE/Safari + FF/Chrome)
      $("#" + listId).bind('contextmenu', function() {
        return false;
      });

      // [TBD] Select only rows for list with ID 'listId'
      var jTableRows = $("tr.low, tr.high");
      var jTableRowsClickable = jTableRows.find('td:not(:eq(0))');

      var menu = this._getContextMenu(listId);

      jTableRowsClickable.contextMenu(
      {
        menu : menu.getId(),

        onBeforeShow :
        {
          fct     : this._onBeforeShowContextMenu,
          context : this
        }
      });
    },


    /**
     * TODOC
     *
     * @param listId {var} TODOC
     * @return {var} TODOC
     */
    _getContextMenu : function(listId)
    {
      if (!this._contextmenu) {
        this._contextmenu = new mamba.ui.ContextMenu(listId, "toolbar_" + listId);  // this.getId());
      }

      return this._contextmenu;
    },

    // click on table row
    /**
     * TODOC
     *
     * @param listId {var} TODOC
     * @return {void}
     */
    _setOnClickRow : function(listId)
    {
      var self = this;
      var jTableRows = $("tr.low, tr.high");
      var jTableRowsClickable = jTableRows.find('td:not(:eq(0))');

      jTableRowsClickable.click(function(e)
      {
        var jRow = $(this).parent();

        if (e.shiftKey && self._lastCheckbox[listId])
        {
          var currentRowIndex = jRow.get(0).rowIndex;

          var range =
          {
            min : Math.min(currentRowIndex, self._lastCheckbox[listId]),
            max : Math.max(currentRowIndex, self._lastCheckbox[listId])
          };

          var table = document.getElementById(listId);

          for (var i=1, jRow, jCb; i<range.min; i++)
          {
            jRow = $(table.rows[i]);

            if (jRow.hasClass("marked"))
            {
              jRow.removeClass("marked");
              jCb = jRow.find("input[@type='checkbox']");

              if (jCb) {
                jCb.get(0).checked = false;
              }
            }
          }

          for (var i=range.max+1, l=table.rows.length, jRow, jCb; i<l; i++)
          {
            jRow = $(table.rows[i]);

            if (jRow.hasClass("marked"))
            {
              jRow.removeClass("marked");
              jCb = jRow.find("input[@type='checkbox']");

              if (jCb) {
                jCb.get(0).checked = false;
              }
            }
          }

          for (var i=range.min, jRow, jCb; i<=range.max; i++)
          {
            jRow = $(table.rows[i]);

            if (!jRow.hasClass("marked"))
            {
              jRow.addClass("marked");
              jCb = jRow.find("input[@type='checkbox']");

              if (jCb)
              {
                jCb.get(0).checked = true;

                if (i == range.max) {
                  jCb.change();
                }
              }
            }
          }
        }
        else
        {
          if (!e.ctrlKey)
          {
            // Uncheck all checkboxes
            jTableRows.removeClass("marked");

            jTableRows.find("input[@type='checkbox']").each(function() {
              this.checked = false;
            });
          }

          // Check selected checkbox
          var jCheckbox = jRow.find("input[@type='checkbox']");

          if (jCheckbox.get(0))
          {
            jCheckbox.get(0).checked = !jCheckbox.get(0).checked;
            jCheckbox.get(0).checked ? jRow.addClass("marked") : jRow.removeClass("marked");
            jCheckbox.change();
          }
        }

        self._lastCheckbox[listId] = jRow.get(0).rowIndex;
      });
    },

    // Click on checkbox
    /**
     * TODOC
     *
     * @return {void}
     */
    _setOnChangeCheckbox : function()
    {
      var self = this;
      var jTableRowsCheckboxes = $("tr.low, tr.high").find("input[@type='checkbox']");

      /*
           * IE only fires 'onchange' event, if the element looses his focus. So we have
           * have to use the IE specific 'onpropertychange' event.
           */

      if ($.browser.msie) {
        jTableRowsCheckboxes.bind("propertychange", this._setOnChangeCheckboxImpl);
      } else {
        jTableRowsCheckboxes.change(this._setOnChangeCheckboxImpl);
      }
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _setOnChangeCheckboxImpl : function()
    {
      var jCheckbox = $(this);

      if (jCheckbox.get(0)) {

          // Find parent table row
          var jParentRow = jCheckbox.parent().parent();

          if (jCheckbox.get(0).checked) {
            jParentRow.addClass("marked");
          } else {
            jParentRow.removeClass("marked");
          }
      }
    }
  }
});