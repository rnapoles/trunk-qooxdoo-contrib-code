qx.Class.define("bug1381.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);
  
      qx.log.appender.Console;
      qx.log.appender.Native;

      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      this.getRoot().add(container, { edge : 10 });

      var tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns(
        [
          "Column A",
          "Column B",
          "Column C",
          "Column D",
          "Column E",
          "Column F",
          "Column G"
        ]);

      var custom =
        {
          tableColumnModel : function(obj)
          {
            return new qx.ui.table.columnmodel.Resize(obj);
          }          
        };

      var table = new qx.ui.table.Table(tableModel, custom);
      table.setMetaColumnCounts([ 1, -1 ]);

      var tcm = table.getTableColumnModel();
      var resizeBehavior = tcm.getBehavior();

      resizeBehavior.set(0, { width:"1*", minWidth:180  });
      resizeBehavior.set(1, { width:50 });
      resizeBehavior.set(2, { width:80 });
      resizeBehavior.set(3, { width:170 });
      resizeBehavior.set(4, { width:50 });
      resizeBehavior.set(5, { width:170 });
      resizeBehavior.set(6, { width:60 });

      container.add(table, { flex : 1 });
    }
  }
});