/*
#require(qx.log.appender.Native)
#require(qx.log.appender.Console)

#require(tablecolumnmenugrid.*)
*/

qx.Class.define("custom.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      var vBox = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      this.getRoot().add(vBox, { edge : 10 });

      // Create the initial data
      var nextId = 0;
      var rowCount = 20;
      var rowData = [];
      var now = new Date().getTime();
      var dateRange = 400 * 24 * 60 * 60 * 1000; // 400 days
      for (var row = 0; row < rowCount; row++)
      {
        var date = new Date(now + Math.random() * dateRange - dateRange / 2);
        rowData.push(
          [
            nextId++,
            Math.random() * 10000,
            date,
            (Math.random() > 0.5)
          ]);
      }

      // table model
      var tableModel = this._tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "ID", "A number", "A date", "Boolean" ]);
      tableModel.setData(rowData);

      // Customize the table column model.  We want one that automatically
      // resizes columns.
      var custom =
      {
        tableColumnModel : function(obj) {
          return new qx.ui.table.columnmodel.Resize(obj);
        },

        // Let's try the grid version of the column visibility menu button
        columnMenu : function() {
          return new tablecolumnmenugrid.Button();
        }
      };

      // table
      var table = new qx.ui.table.Table(tableModel, custom);

      var tcm = table.getTableColumnModel();

      // Display a checkbox in column 3
      tcm.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());

      // Obtain the behavior object to manipulate
      var resizeBehavior = tcm.getBehavior();

      // This uses the set() method to set all attriutes at once; uses flex
      resizeBehavior.set(0, { width:"1*", minWidth:40, maxWidth:80  });

      // We could also set them individually:
      resizeBehavior.setWidth(1, "50%");
      resizeBehavior.setMinWidth(1, 100);
      resizeBehavior.setMaxWidth(1, 320);

      vBox.add(table);

      // Create a checkbox to hide or show a column
      var tableColumnModel = table.getTableColumnModel();
      var checkbox = new qx.ui.form.CheckBox("Show ID column");
      checkbox.setChecked(true);
      checkbox.addListener(
        "changeChecked",
        function(e)
        {
          tableColumnModel.setColumnVisible(0, e.getData());
        });
      vBox.add(checkbox);

      tableColumnModel.addListener(
        "visibilityChanged",
        function(e)
        {
          var data = e.getData();
          if (data.col == 0)
          {
            checkbox.setChecked(data.visible);
          }
        });
    }
  }
});
