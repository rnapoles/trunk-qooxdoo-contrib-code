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


var tableModel = new qx.ui.table.model.Simple();
tableModel.setColumns([ "ID", "Number 1", "Number 2", "Image" ]);

var image = [
  "icon/16/actions/dialog-ok.png",
  "icon/16/actions/dialog-cancel.png"
];

// table
var table = new qx.ui.table.Table(tableModel);
table.set(
  {
    width  : 400,
    height : 200
  });

table.setMetaColumnCounts([1, -1]);
var selectionMode =
    qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION;
table.getSelectionModel().setSelectionMode(selectionMode);

var rowData = [];
for (var row = 0; row < 100; row++)
{
  var x = Math.random() * 1000;
  rowData.push([ row, x, x, image[Math.floor(x) % 2] ]);
}
tableModel.setData(rowData);
tableModel.setColumnEditable(1, true);
tableModel.setColumnEditable(2, true);
var renderer = new qx.ui.table.cellrenderer.Image(19, 16);
table.getTableColumnModel().setDataCellRenderer(3, renderer);

this.getRoot().add(table, {left:10, top:10});

    }
  }
});
