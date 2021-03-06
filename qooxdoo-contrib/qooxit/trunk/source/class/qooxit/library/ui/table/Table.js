/* ************************************************************************

   Copyright:
     2009 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

#asset(qooxit/*)
************************************************************************ */

/**
 * Implementation of a qx.ui.table.Table widget
 */
qx.Class.define("qooxit.library.ui.table.Table",
{
  extend : qooxit.library.ui.Abstract,
  type   : "singleton",

  construct : function()
  {
    // Set the options specification for this widget
    this.setOptionsSpec(
      {
        columns :
        {
/* see comment in library/ui/Abstract regarding ComboBox
          type   : "ComboBox",
          value  : [ "Column 1", "Column 2" ],
          prompt : this.tr("Column Headings")
*/
          type   : qx.lang.Function.bind(
            function(item, options)
            {
              this.warn("implement " + item + " input");
            },
            this)
        },

        custom  :
        {
          type   : qx.lang.Function.bind(
            function(item, options)
            {
              this.warn("implement " + item + " input");
            },
            this)
        },

        width   :
        {
          type   : "Integer",
          min    : 1,
          max    : 5000,
          value  : 400,
          prompt : this.tr("Width")
        },

        height  :
        {
          type   : "Integer",
          min    : 1,
          max    : 5000,
          value  : 100,
          prompt : this.tr("Height")
        }
      });
  },

  properties :
  {
    optionsSpec :
    {
      init : null
    },

    defaultOptions :
    {
      init :
      {
        columns : [ "ID", "Column 1" ],
        custom  :
        {
          tableColumnModel :
            "return new qx.ui.table.columnmodel.Resize(obj);"
        },
        width   : 400,
        height  : 200
      }
    }
  },

  members :
  {
    // overridden
    factory : function(options)
    {
      // table model
      var tableModel = new qx.ui.table.model.Simple();

      // Set the columns to be used
      tableModel.setColumns(options.columns);

      // Generate custom.
      // TODO: This needs to be generalized for all members of options.custom
      var custom =
        {
          tableColumnModel :
            new Function("obj", options.custom.tableColumnModel)
        };

      // table
      var table = new qx.ui.table.Table(tableModel, custom);
      table.set(
        {
          width  : options.width,
          height : options.height
        });

      return table;
    },

    _snippets :
    {
      sampleData :
      {
        brief : "Sample data",

        description :
          "Add sample data to the table.",

        overrides :
        {
          columns : [ "ID", "Number 1", "Number 2", "Image" ]
        },

        code : function(table)
        {
          var image =
            [
              "icon/16/actions/dialog-ok.png",
              "icon/16/actions/dialog-cancel.png"
            ];

          table.setMetaColumnCounts([1, -1]);
          var selectionMode =
            qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION;
          table.getSelectionModel().setSelectionMode(selectionMode);

          var rowData = [];
          for (var row = 0; row < 100; row++)
          {
            var x = Math.random() * 1000;
            rowData.push([ row, x, x, image[Math.floor(x) % 2] ]);
          }

          var tableModel = table.getTableModel();
          tableModel.setData(rowData);
          tableModel.setColumnEditable(1, true);
          tableModel.setColumnEditable(2, true);

          var newRenderer =
            new qx.ui.table.cellrenderer.Conditional("right", "", "", "");

          newRenderer.addNumericCondition(">", 0,   null,
                                          "#FF0000", null, null);
          newRenderer.addNumericCondition(">", 50,  null,
                                          "#EE0011", null, null);
          newRenderer.addNumericCondition(">", 100, null,
                                          "#DD0022", null, null);
          newRenderer.addNumericCondition(">", 150, null,
                                          "#CC0033", null, null);
          newRenderer.addNumericCondition(">", 200, null,
                                          "#BB0044", null, null);
          newRenderer.addNumericCondition(">", 250, null,
                                          "#AA0055", null, null);
          newRenderer.addNumericCondition(">", 300, null,
                                          "#990066", null, null);
          newRenderer.addNumericCondition(">", 350, null,
                                          "#880077", null, null);
          newRenderer.addNumericCondition(">", 400, null,
                                          "#770088", null, null);
          newRenderer.addNumericCondition(">", 450, null,
                                          "#660099", null, null);
          newRenderer.addNumericCondition(">", 500, null,
                                          "#5500AA", null, null);
          newRenderer.addNumericCondition(">", 550, null,
                                          "#4400BB", null, null);
          newRenderer.addNumericCondition(">", 600, null,
                                          "#3300CC", null, null);
          newRenderer.addNumericCondition(">", 650, null,
                                          "#2200DD", null, null);
          newRenderer.addNumericCondition(">", 700, null,
                                          "#1100EE", null, null);
          newRenderer.addNumericCondition(">", 750, null,
                                          "#0000FF", null, null);
          newRenderer.addNumericCondition(">", 800, null,
                                          "#0033FF", null, null);
          newRenderer.addNumericCondition(">", 850, null,
                                          "#0066FF", null, null);
          newRenderer.addNumericCondition(">", 900, null,
                                          "#0099FF", null, null);
          newRenderer.addNumericCondition(">", 950, "center",
                                          "#00CCFF", null, "bold");

          table.getTableColumnModel().setDataCellRenderer(2, newRenderer);

          var renderer = new qx.ui.table.cellrenderer.Image(19, 16);
          table.getTableColumnModel().setDataCellRenderer(3, renderer);
        }
      },

      resizeBehaviorFirstColumn :
      {
        brief : "Modify resize behavior for column 0",

        description :
          "Force a minimum width on the first column, but allow it to grow " +
          "and consume available space not consumed by other columns.",

        code : function(o)
        {
          // Obtain the resize behavior object to manipulate
          var resizeBehavior = o.getTableColumnModel().getBehavior();

          // Force a minimum width on the first column, but allow it to grow
          resizeBehavior.set(0, { width:"1*", minWidth:180  });
        }
      }
    }
  }
});
