/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(proveqooxdoo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "ProveQooxdoo"
 */
qx.Class.define("custom.Application",
{
    extend: qx.application.Standalone,



    /*
    *****************************************************************************
    MEMBERS
    *****************************************************************************
    */

    members:
  {
      /**
      * This method contains the initial application code and gets called 
      * during startup of the application
      */
      main: function() {
          // Call super class
          this.base(arguments);

          // Enable logging in debug variant
          if (qx.core.Variant.isSet("qx.debug", "on")) {
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

          var button1 = new qx.ui.basic.Label("CLICK ON ME   Resizes:");

          // Document is the application root
          var doc = this.getRoot();

          // Add button to document at fixed coordinates
          doc.add(button1,
{
    left: 1,
    top: 1
});

          win = new qx.ui.window.Window("First Window");
          win.setWidth(300);
          //win.setAllowGrowX(false);
          win.setHeight(280);
          win.setShowMinimize(false);
          this.getRoot().add(win, {
              left: 50,
              top: 70
          });
          layout = new qx.ui.layout.Grid(5, 5);

          layout.setRowFlex(0, 1);
          layout.setColumnFlex(0, 1);
          //layout.setColumnFlex(1, 1);//elimina l'errore
          win.setLayout(layout);
          /*begin optional */
          var rowData = [[1, 2, 3, 4, 5, 6, 7, 8],
          [1, 2, 3, 4, 5, 6, 7, 8],
          [1, 2, 3, 4, 5, 6, 7, 8],
          [1, 2, 3, 4, 5, 6, 7, 8],
          [1, 2, 3, 4, 5, 6, 7, 8],
          [1, 2, 3, 4, 5, 6, 7, 8]];
          var tableModel = this._tableModel = new qx.ui.table.model.Simple();
          tableModel.setColumns(["1", "2", "3", "4", "5", "6", "7", "8"]);
          var table = new qx.ui.table.Table(tableModel);
          tableModel.setData(rowData);
          win.add(table, {
              row: 0,
              column: 0
          })

          trSeries = new custom.trSeries();
          trSeries.button = button1;
          win.add(trSeries, {
              row: 0,
              column: 1
          })
          win.open();
          win.moveTo(30, 30);
          
          //trSeries.getPaneScroller(0).setVerticalScrollBarVisible(true);
          button1.addListener("click", function(e) {
              win.setHeight(win.getHeight() - 20);              
              //    trSeries.getDataModel().setData(trSeries.data);
          },
        this);

      }
  }
});
