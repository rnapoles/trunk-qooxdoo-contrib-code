/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "1072"
 */
qx.Class.define("custom.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      var tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "ID", "A number", "A date", "Boolean test" ]);
      var rowData = [];
      var now = new Date().getTime();
      var dateRange = 400 * 24 * 60 * 60 * 1000; // 400 days
      for (var row = 0; row < 100; row++) {
        var date = new Date(now + Math.random() * dateRange - dateRange / 2);
        rowData.push([ row, Math.random() * 10000, date, (Math.random() > 0.5) ]);
      }
      tableModel.setData(rowData);
      tableModel.setColumnEditable(1, true);
      tableModel.setColumnEditable(2, true);

      var table = new qx.ui.table.Table(tableModel);
      with (table) {
        set({width:350, height:300});
        setMetaColumnCounts([1, -1]);
        getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
        getTableColumnModel().setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());
      };
      this.getRoot().add(table, {left: 20, top: 20});

      var btn = new qx.ui.form.Button("Change metacolumns");
      this.getRoot().add(btn, left: 20, top: 400);
      btn.addToDocument();
      btn.addEventListener("execute", function(event) {
          table.setMetaColumnCounts([ -1 ]);
      }, this);
      
    }
  }
});
