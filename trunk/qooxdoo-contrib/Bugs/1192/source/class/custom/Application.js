/* ************************************************************************
#require(qx.log.appender.Console)
#require(qx.log.appender.Native)
************************************************************************ */

qx.Class.define("custom.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);
  
      var win = new qx.ui.window.Window().set({
        contentPadding: 0
      });
      win.setLayout(new qx.ui.layout.Grow());
      win.open();
      
      var rowData = this.createRandomRows(10);

      var tableModel = this._tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "ID", "A number", "A date", "Boolean" ]);
      tableModel.setData(rowData);

      var custom =
      {
        tableColumnModel : function(obj) {
          return new qx.ui.table.columnmodel.Resize(obj);
        }
      };

      var table = new qx.ui.table.Table(tableModel, custom);
      win.add(table);
      table.set(
        {
          width: 400,
          height: 400
        });

      table.setMetaColumnCounts([ 1, -1 ]);

      var tcm = table.getTableColumnModel();

      // Obtain the behavior object to manipulate
      var resizeBehavior = tcm.getBehavior();

      // This uses the set() method to set all attriutes at once; uses flex
      resizeBehavior.set(0, { width:"1*", minWidth:180 });

      tcm.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());

      var renderer =
        new qx.ui.table.headerrenderer.Icon("icon/16/apps/office-calendar.png",
                                            "A date");
      tcm.setHeaderCellRenderer(2, renderer);

      
      //this.getRoot().add(table);
    },

    nextId : 0,
    createRandomRows : function(rowCount)
    {
      var rowData = [];
      var now = new Date().getTime();
      var dateRange = 400 * 24 * 60 * 60 * 1000; // 400 days
      for (var row = 0; row < rowCount; row++)
      {
        var date = new Date(now + Math.random() * dateRange - dateRange / 2);
        rowData.push([
                       this.nextId++,
                       Math.random() * 10000,
                       date,
                       (Math.random() > 0.5)
                     ]);
      }
      return rowData;
    },

    close : function()
    {
      this.base(arguments);
    },


    terminate : function() {
      this.base(arguments);
    }
  }
});