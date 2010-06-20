/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(tabledemo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "tabledemo"
 */
qx.Class.define("tabledemo.Application",
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

      var layout = {
        "id":{"header":"ID","width":50,"visible":false},
        "author":{"header":"Author","width":"1*"},
        "year":{"header":"Year","width":50},
        "title":{"header":"Title","width":"3*"}
      };
      
      var table = this.createTable( layout );
      table.set({
        'width' : 500,
        'height' : 300
      });
      this.getRoot().add(table,{left:10,top:10});
      
      /*
       * marshaler, set the datasource and a null 
       * value for query data.
       */
      var marshaler = new virtualdata.marshal.Table();
      
      /*
       * create store
       */
      var store = new virtualdata.store.JsonRpc( "../services/index.php", "tabledemo.TableController", marshaler );

      /*
       * the controller propagates data changes between table and store. note
       * that you don't have to setup the bindings manually
       */
      var controller = new virtualdata.controller.Table( table, store );  
      
      /*
       * you can provide the marshaler with arguments that should be sent 
       * with each request
       */
      marshaler.setQueryParams(["foo",1]);
      
      /*
       * create a reload button
       */
      var reloadButton = new qx.ui.form.Button("Reload");
      reloadButton.addListener("execute",function(){
        controller.reload();
      },this);
      this.getRoot().add( reloadButton, {left:550,top:10});
        
      /*
       * now, load the data
       */
      controller.reload();      
    },
    
    /**
     * Create a new table instance. Expects a map, keys 
     * being the column ids, the values maps of information
     * on the columns.
     * 
     * @param columnLayout {Map}
     * <pre>
     * {
     *    column1 : {
     *      header : "Column 1",
     *      editable : true/false,
     *      visible : true/false,
     *      renderer : "Boolean", // from the qx.ui.table.cellrenderer namespace
     *      editor : "CheckBox", // from the qx.ui.table.celleditor namespace
     *      width : 12|"2*"
     *    },
     *    
     *    column2 : { ....}
     * }
     * </pre>
     * @return {qx.ui.table.Table}
     */
    createTable : function( columnLayout )
    {

      /*
       * analyze table info
       */
      var columnIds = [], columnHeaders = [];
      for ( var columnId in columnLayout )
      {
        columnIds.push( columnId );
        columnHeaders.push( columnLayout[columnId].header );
      }
      
      var tableModel = new virtualdata.model.Table();

      /*
       * set column labels and id
       */
      tableModel.setColumns( columnHeaders, columnIds );
      
      /*
       * set columns editable
       */
      for( var i=0; i<columnIds.length; i++)
      {
        tableModel.setColumnEditable(i, columnLayout[ columnIds[i] ].editable || false );
      }
      
      /*
       * create table
       */
      var custom = { tableColumnModel : function(obj){ return new qx.ui.table.columnmodel.Resize(obj); } };
      var table = new qx.ui.table.Table( tableModel, custom );

      /*
       * Use special cell editors a
       * nd cell renderers
       */
      var tcm = table.getTableColumnModel();
      for( var i=0; i<columnIds.length; i++)
      {      
        if ( columnLayout[ columnIds[i] ].visible !== undefined )
        {
          tcm.setColumnVisible(i, columnLayout[ columnIds[i] ].visible);
        }
        
        if ( columnLayout[ columnIds[i] ].renderer )
        {
          tcm.setDataCellRenderer(i, new qx.ui.table.cellrenderer[ columnLayout[ columnIds[i] ].renderer ]());
        }
        if ( columnLayout[ columnIds[i] ].editor )
        {
          tcm.setCellEditorFactory(i, new qx.ui.table.celleditor[ columnLayout[ columnIds[i] ].editor ]());
        }
      }
      
      /*
       * set selection mode
       */
      table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);

      /*
       * set width of columns
       */
      var behavior = table.getTableColumnModel().getBehavior();
      behavior.setInitializeWidthsOnEveryAppear(true);
      for( var i=0; i<columnIds.length; i++)
      {    
        behavior.setWidth(i, columnLayout[ columnIds[i] ].width );
      }
      
      table.setKeepFirstVisibleRowComplete(true);
      table.setShowCellFocusIndicator(false);
      table.setStatusBarVisible(false);

      return table;
    }
    
  }
});
