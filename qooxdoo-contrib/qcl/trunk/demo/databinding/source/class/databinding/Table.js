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
     * Create a pane with a Table
     * @return {qx.ui.tabview.Page}
     */
    createPane : function()
    {

       /*
        * pane container
        */
       var container = new qx.ui.container.Composite(
           new qx.ui.layout.VBox()
       );

      /*
       * create the table
       */
      var table = this._mainTable = this.createTable();

      /*
       * the marshaler prepares requests in the store and transforms
       * the received data into a model 
       */
      var marshaler = new qcl.data.marshal.Table();

      /*
       * The setQueryParams method allows to pass additional information to 
       * the server. Here, we pass the column ids and an object that will be set
       * by the tree node selected, if the tree and table are bound. 
       */
      marshaler.setQueryParams( [ table.getTableModel().getColumnIds(), {} ] );        

      /*
       *  setup the store that retrieves the data from the backend
       */       
      var store = this._tableStore = new qcl.data.store.JsonRpc(
          null, // use main application's server url 
          /* service */ "databinding.TableData",
          marshaler 
      );      
       
      /*
       * the controller propagates data changes between table and store. note
       * that you don't have to setup the bindings manually
       */
      this.tableController = new qcl.data.controller.Table( table, store );

      /*
       * bind the server-supplied status text to the table's status bar.
       */
      store.bind( "model.statusText", table, "additionalStatusBarText", {
        converter : function( text ){
          return " | " + text;
        }
      } );   
      
      /*
       * use the tree store as an event proxy so that we don't have to
       * setup our own polling for the table
       */
      this.application.treeDemo.store.registerStore(store);
   
      /*
       * create controls that interact with the main table
       */
      var controls = this.createControls( table );
      
      /*
       * add to layout
       */
      container.add( controls );
      container.add( table, {flex: 1} );

      /*
       * load table
       */
      this.tableController.reload();
      
      return container;
      
    },
    
    /**
     * create a new table instance
     */
    createTable : function( tableModel )
    {
      
      /*
       * create data model of the table if not provided 
       */
      if ( ! tableModel )
      {

        tableModel = new qcl.data.model.Table();
        
        /*
         * set column labels and id
         */
        tableModel.setColumns(
            [ "ID", "Some text", " ", "A number", "A date" ],
            [ "id", "text", "boolean", "number", "date" ]
        );
        
        /*
         * set columns editable
         */
        tableModel.setColumnEditable(1, true);
        tableModel.setColumnEditable(2, true);
        tableModel.setColumnEditable(3, true);
        tableModel.setColumnEditable(4, true);
        
      }
      
      /*
       * create table
       */
      var table = new qx.ui.table.Table( tableModel );

      /*
       * Use special cell editors and cell renderers
       */
      var tcm = table.getTableColumnModel();
      tcm.setDataCellRenderer(2, new qx.ui.table.cellrenderer.Boolean());
      tcm.setCellEditorFactory(2, new qx.ui.table.celleditor.CheckBox());
      
      /*
       * set selection mode
       */
      table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
      
      /*
       * set width of columns
       */
      table.getTableColumnModel().setColumnWidth(0,50);
      table.getTableColumnModel().setColumnWidth(1,150);
      table.getTableColumnModel().setColumnWidth(2,30);
      table.getTableColumnModel().setColumnWidth(3,80);
      
      return table;
    },
    
    createControls : function( table )
    {
      var bar = new qx.ui.toolbar.ToolBar();
      var button, part, checkBox;

      part = new qx.ui.toolbar.Part();
      bar.add(part);      
      
      /**
       * Create button to add a new row
       */
      button = new qx.ui.toolbar.Button("Add row");
      button.addListener("execute", function(evt) {
        this._tableStore.load("addRow",[],function(){
          
          /*
           * the index of the new node
           */
          var newRowIndex = table.getTableModel().getRowCount();

          /*
           * reload the data
           */
          table.getTableModel().reloadRows(newRowIndex,newRowIndex);                     
          
          /*
           * scroll down the table
           */
          table.scrollCellVisible(0, newRowIndex );
                   
          /*
           * select the last row
           */
          table.getSelectionModel().setSelectionInterval(newRowIndex,newRowIndex);

        },this);

      }, this);
      part.add(button);

      /*
       * remove the currently selected row
       */
      button = new qx.ui.toolbar.Button("Remove rows");
      button.addListener("execute", function(evt) {
        table.getSelectionModel().iterateSelection( function( rowIndex ){
          table.getTableModel().removeRow( rowIndex );
        }, this );
      }, this);
      part.add(button);
      
      part = new qx.ui.toolbar.Part();
      bar.add(part);

      /*
       * create a window with a synchronized table
       */
      button = new qx.ui.toolbar.Button("Clone table");
      button.addListener("execute", function(evt) 
      {

        /*
         * create a new table that shares the table model with the 
         * main table
         */
        var table = this.createTable( this._mainTable.getTableModel() );        

        /*
         * create window
         */
        var win = new qx.ui.window.Window("Synchronized Table");
        win.setLayout( new qx.ui.layout.VBox() );
        win.moveTo( Math.floor(Math.random()*300), Math.floor( Math.random()*300) );        
        win.add( this.createControls( table ) );
        win.add( table );
        win.open();
        
        /*
         * bind the server-supplied status text to the window's caption.
         */
        this._tableStore.bind( "model.statusText", win, "caption");          

      }, this);
      
      part.add(button);
      

      
      return bar;
    }
  }
});