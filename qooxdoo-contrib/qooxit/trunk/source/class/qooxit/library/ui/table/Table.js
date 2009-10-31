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

  members :
  {
    // overridden
    factory : function(parent, name, options)
    {
      // Were options given to us?
      if (! options)
      {
        // Nope. Create default option values
        options =
          {
            columns : [ "ID", "Number 1", "Number 2", "Image" ],
            custom  :
            {
              tableColumnModel : function(obj)
              {
                return new qx.ui.table.columnmodel.Resize(obj);
              }
            },
            width   : 400,
            height  : 200
          };

        // Create the input specifications
        var spec =
          {
            columns : qx.lang.Function.bind(
              function(options)
              {
                this.warn("implement columns input");
              },
              this),

            custom  : qx.lang.Function.bind(
              function(options)
              {
                this.warn("implement custom input");
              },
              this),

            width   : "Integer",

            height  : "Integer"
          };

        // Generate the options window for the user to make selections
        this.optionsWindow(name, spec, options).addListener(
          "beforeClose",
          function(e)
          {
            // Create the table using the user-specified options
            this.__createTable(parent, e.getTarget().getUserData("options"));
          },
          this);
      }
      else
      {
        // Use the provided options without user intervention, e.g. when
        // restoring from a previously saved configuration.
        this.__createTable(parent, options);
      }
    },

    /**
     * Create the table using the specified options.
     *
     * @param parent {qx.ui.core.Widget}
     *   The container to which the table should be added
     *
     * @param options {Map}
     *   The map of options as documented by the "spec" passed to
     *   this.optionsWindow().
     *
     * @return {Void}
     */
    __createTable : function(parent, options)
    {
      // table model
      var tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns(options.columns);

      var image = [
        "icon/16/actions/dialog-ok.png",
        "icon/16/actions/dialog-cancel.png"
      ];

      var rowData = [];
      for (var row = 0; row < 100; row++)
      {
        var x = Math.random() * 1000;
        rowData.push([ row, x, x, image[Math.floor(x) % 2] ]);
      }
      tableModel.setData(rowData);
      tableModel.setColumnEditable(1, true);
      tableModel.setColumnEditable(2, true);

      // table
      var table = new qx.ui.table.Table(tableModel, options.custom);

      table.setMetaColumnCounts([1, -1]);
      var selectionMode =
        qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION;
      table.getSelectionModel().setSelectionMode(selectionMode);

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

      parent.add(table);
    },

    _snippets :
    {
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
      },

      sampleData :
      {
        brief : "Sample data",

        description :
          "Add sample data to the table.",

        code : function(o)
        {
        }
      }
    }
  }
});
