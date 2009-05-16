/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(databinding/*)

************************************************************************ */

/**
 * 
 */
qx.Class.define("databinding.Table",
{

  extend : qx.core.Object,
  
 /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    
    /**
     * Create  page with databound table
     * @return {qx.ui.tabview.Page}
     */
    createPage : function()
    {

     /*
      * create a new page for the tabview
      */
      var page = new qx.ui.tabview.Page("Table");
      page.setLayout(new qx.ui.layout.VBox());

      /*
       * create the table
       */
      this._mainTable = this.createTable();

      /*
       * the marshaler prepares requests in the store and transforms
       * the received data into a model 
       */
      var marshaler = new qcl.databinding.event.marshal.Table();

      /*
       * The setQueryParams method allows to pass additional information to 
       * the server. Here, we pass the column ids.
       */
      marshaler.setQueryParams( [ this._mainTable.getTableModel().getColumnIds() ] );        

      /*
       *  setup the store that retrieves the data from the backend
       */       
      this._tableStore = new qcl.databinding.event.store.JsonRpc(
          /* url */ "../services/index.php",
          /* service */ "qcl.TableData",
          /* default method @todo remove this parameter */ null,
          marshaler 
      );      
      
      /*
       * creating the controller sets up databinding
       */
      this.createController( this._mainTable );
      
      /*
       * create controls that interact with the main table
       */
      var controls = this.createControls();
      
      /*
       * add to layout
       */
      page.add( controls, {flex: 1});
      page.add( this._mainTable, {flex: 1});

      return page;
      
    },
    
    /**
     * create a new table instance
     */
    createTable : function()
    {

      /*
       * create data model of the table 
       */
      var tableModel = new qcl.databinding.event.model.Table();
      
      /*
       * set column labels and id
       */
      tableModel.setColumns(
          [ "ID", "A number", "A date", "Boolean","Some text" ],
          [ "id", "number", "date", "boolean","text" ]
      );
      
      /*
       * set columns editable
       */
      tableModel.setColumnEditable(1, true);
      tableModel.setColumnEditable(2, true);
      tableModel.setColumnEditable(3, true);
      tableModel.setColumnEditable(4, true);
      
      /*
       * create table
       */
      var table = new qx.ui.table.Table(tableModel);

      /*
       * Use special cell editors and cell renderers
       */
      var tcm = table.getTableColumnModel();
      tcm.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());
      tcm.setCellEditorFactory(3, new qx.ui.table.celleditor.CheckBox());
      
      /*
       * set selection mode
       */
      table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
      
      return table;
    },
    

    /**
     * Create a new controller for a table
     */
    createController : function( table )
    {

      var store = this._tableStore;
      
      /*
       * the controller propagates data changes between table and store. note
       * that you don't have to setup the bindings manually
       */
      var controller = new qcl.databinding.event.controller.Table( table, store );

      /*
       * bind the server-supplied status text to the table's status bar.
       */
      store.bind("model.statusText", table, "additionalStatusBarText", {
        converter : function( text ){
          return " | " + text;
        }
      } );           
      
      return controller;
    },
    
    createControls : function( )
    {
      var bar = new qx.ui.toolbar.ToolBar();
      var button, part, checkBox;

      part = new qx.ui.toolbar.Part();
      bar.add(part);

      /*
       * create a window with a synchronized table
       */
      button = new qx.ui.toolbar.Button("Create synchronized table");
      button.addListener("execute", function(evt) 
      {
        
        /*
         * create new window
         */
        var win = new qx.ui.window.Window("Synchronized Table");
        win.setLayout( new qx.ui.layout.Grow() );
        win.moveTo( Math.floor(Math.random()*300), Math.floor( Math.random()*300) );
        
        /*
         * create a new table
         */
        var table = this.createTable();
        
        /*
         * copy over cache content from main table
         */
        table.getTableModel().restoreCacheContent(
            this._mainTable.getTableModel().getCacheContent()
         );
        
        /*
         * Create a new controller for this table
         */
        this.createController( table );
        
        win.add( table );
        win.open();
      }, this);
      part.add(button);
      
      
      part = new qx.ui.toolbar.Part();
      bar.add(part);      

      button = new qx.ui.toolbar.Button("Add 10 rows", "icon/22/actions/list-add.png");
      button.addListener("execute", function(evt) {
//        var rowData = this.createRandomRows(10);
//        this._tableModel.addRows(rowData);
        this.info("10 rows added");
      }, this);
      part.add(button);

      button = new qx.ui.toolbar.Button("Remove 5 rows", "icon/22/actions/list-remove.png");
      button.addListener("execute", function(evt) {
//        var rowCount = this._tableModel.getRowCount();
//        this._tableModel.removeRows(rowCount-5, 5);
        this.info("5 rows removed");
      }, this);
      part.add(button);

      return bar;
    }

    
  }
});