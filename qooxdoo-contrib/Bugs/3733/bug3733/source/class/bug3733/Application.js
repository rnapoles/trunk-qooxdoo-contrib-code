/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3733/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3733"
 */
qx.Class.define("bug3733.Application",
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
     * 
     * @lint ignoreDeprecated(alert)
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

      // Create a horizontal split pane
      var pane = new qx.ui.splitpane.Pane("vertical").set({
        width : 450,
        height : 600
      });
      this.getRoot().add(pane);
      
      var table = this.createTable();
      pane.add(table, 1);
      
      var box = new qx.ui.core.Widget();
      pane.add(box, 1);      
    },
    
    createTable : function()
    {
      // Create the initial data
      var rowData = this.createRandomRows(20);

      // table model
      var tableModel = this._tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "ID", "A number", "A date", "Boolean" ]);
      tableModel.setData(rowData);

      // table
      var table = new qx.ui.table.Table(tableModel);
      table.setFocusCellOnMouseMove(true);
      return table;
    },
    
    
    nextId : 0,
    createRandomRows : function(rowCount)
    {
      var rowData = [];
      var now = new Date().getTime();
      var dateRange = 400 * 24 * 60 * 60 * 1000; // 400 days
      for (var row = 0; row < rowCount; row++) {
        var date = new Date(now + Math.random() * dateRange - dateRange / 2);
        rowData.push([ this.nextId++, Math.random() * 10000, date, (Math.random() > 0.5) ]);
      }
      return rowData;
    }      
  }
});
