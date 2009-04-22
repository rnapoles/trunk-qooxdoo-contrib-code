qx.Class.define("custom.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);
      
      // Create the initial data
      var rowData = [
        [1],
        [2],
        [3]
      ];

      // table model
      var tableModel = this._tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "ID"]);
      tableModel.setData(rowData);

      // table
      var table = new qx.ui.table.Table(tableModel);
      this.getRoot().add(table)

      table.set({
        height: 100
      });
    }
  }
});

