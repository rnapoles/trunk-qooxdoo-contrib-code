/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/* ************************************************************************

#asset(qx/icon/${qx.icontheme}/22/actions/list-add.png)
#asset(qx/icon/${qx.icontheme}/22/actions/list-remove.png)
#asset(qx/icon/${qx.icontheme}/22/actions/edit-undo.png)
#asset(qx/icon/${qx.icontheme}/22/status/dialog-information.png)
#asset(qx/icon/${qx.icontheme}/16/apps/office-calendar.png)

************************************************************************ */

/**
 * A table with virtual scrolling, model-view-controller, renderer,
 * editing, sorting, column resizing, column reordering,
 * column hiding.
 */
qx.Class.define("bug1449.Application",
{
  extend : demobrowser.demo.table.TableDemo,

  members :
  {
    getCaption : function() {
      return "Table";
    },


    createTable : function()
    {
      // Create the initial data
      var rowData = this.createRandomRows(50);

      // table model
      var tableModel = this._tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "ID", "A number", "A date", "Boolean" ]);
      tableModel.setData(rowData);
      tableModel.setColumnEditable(1, true);
      tableModel.setColumnEditable(2, true);
      tableModel.setColumnSortable(3, false);

      // table
      var table = new bug1449.Table(tableModel);
      TABLE = table;

      table.set({
        width: 600,
        height: 400,
        decorator : null
      });

      table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);

      var tcm = table.getTableColumnModel();

      // Display a checkbox in column 3
      tcm.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());

      // use a different header renderer
      tcm.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.Icon("icon/16/apps/office-calendar.png", "A date"));

      return table;
    },


    createControls : function()
    {
      var bar = new qx.ui.toolbar.ToolBar();
      var part, checkBox;

      part = new qx.ui.toolbar.Part();
      bar.add(part);

      var table = this._table;

      checkBox = new qx.ui.toolbar.CheckBox("Statusbar");
      checkBox.set({
        checked: !table.isStatusBarVisible()
      });
         
      checkBox.addListener("changeChecked", function(evt) {
        table.setStatusBarVisible(!this.getChecked());
      },
      checkBox);
      part.add(checkBox);
      
      
      checkBox = new qx.ui.toolbar.CheckBox("Column Button");
      checkBox.set({
        checked: !table.isColumnVisibilityButtonVisible()
      });
         
      checkBox.addListener("changeChecked", function(evt) {
        table.setColumnVisibilityButtonVisible(!this.getChecked());
      },
      checkBox);
      part.add(checkBox);      

      return bar;
    }
  }
});

