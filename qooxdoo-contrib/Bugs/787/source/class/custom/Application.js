/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "787"
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

      var win = new qx.ui.window.Window();
      win.setLayout(new qx.ui.layout.Grow());
      win.open();
      
      var tab = new qx.ui.tabview.TabView();
      win.add(tab);
      
      var p1 = new qx.ui.tabview.Page("table");
      p1.setLayout(new qx.ui.layout.Grow());
      tab.add(p1);
      
      p1.add(this.createTable());
      
      tab.add(new qx.ui.tabview.Page("page2"));
    },
    
    createTable : function()
    {
      // Create the initial data
      var rowData = this.createRandomRows(50);

      // table model
      var tableModel = this._tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "ID", "A number", "A date", "Boolean" ]);
      tableModel.setData(rowData);

      // table
      var table = new qx.ui.table.Table(tableModel);
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
