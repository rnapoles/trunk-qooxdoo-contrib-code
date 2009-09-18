/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2796/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2796"
 */
qx.Class.define("bug2796.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var tableModel = new qx.ui.table.model.Simple();
      var tableColumns = [ "Name", "Age", "Emp ID", "Salary"];
      tableModel.setColumns(tableColumns);
      tableModel.setEditable(false);
      
      var rowData = this.createMainTableRows();
      tableModel.setData(rowData);
      
      var table = new qx.ui.table.Table(tableModel);
      var mainTableWidth = parseInt(screen.availWidth - 7);
      
      table.set(
      {
        rowHeight: 20,
        width: mainTableWidth - 500,
        showCellFocusIndicator: false,
        statusBarVisible: false
      });
      table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.NO_SELECTION);
      var mainTcm = table.getTableColumnModel();
      mainTcm.setColumnWidth(0, parseInt(mainTableWidth/25));
      mainTcm.setColumnWidth(1, parseInt(mainTableWidth/25));
      mainTcm.setColumnWidth(2, parseInt(mainTableWidth/25));
      mainTcm.setColumnWidth(3, parseInt(mainTableWidth/25));
            
      table.addListener("cellClick", function(event) {
        alert("cellClick happened");
      },this);
            
      table.addListener("click", function(event) {
        alert("Click happened");
      },this);
            
      var tableContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(10)).set(
      {
        width : 1300,
        height: 500
      });
        
      tableContainer.add(table);

      var doc = this.getRoot();
      doc.add(tableContainer, {left: 100, top: 50});

    },
    
    createMainTableRows : function()
    {
      var names= ["Brian", "Maria", "Jones","Chuck"];
      var age=[25,24,27,31];
      var emp =[2345,3456,5432,1990];
      var salary= ["25k","20k","30k","80k"];
      
      var rowData = [];
      var rowContents = [];
      
      for(var num=0;num<4;num++)
      {
        rowContents = [];
        rowContents[0]= names[num];
        rowContents[1]= age[num];
        rowContents[2]= emp[num];
        rowContents[3]= salary[num];
        rowData.push(rowContents);
      }
      return rowData;
    }
  }
});
