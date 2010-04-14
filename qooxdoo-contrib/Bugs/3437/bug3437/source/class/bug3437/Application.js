/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3437/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3437"
 */
qx.Class.define("bug3437.Application",
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
tableModel.setColumns([ "Location", "Team" ]);
var table = new qx.ui.table.Table(tableModel);
var button = new qx.ui.form.Button("Delete");

var doc = this.getRoot();
doc.add(button, {left: 100, top: 20});


doc.add(table, {left:  20, top: 70});
table.getTableColumnModel().setDataCellRenderer(0,new  qx.ui.table.cellrenderer.Number);
var data = [ [1, 'team1'],
             [2, 'team2'],
             [3, 'team3']
           ];

tableModel.setData(data);
tableModel.setColumnEditable(0,true);

/* Delete 2nd row  */
button.addListener("execute", function(e) {
    tableModel.removeRows(1,1);
});

table.addListener("cellClick", function (e) {
//debugger;
    this.debug('cellClick event');
}, this);

    }
  }
});
