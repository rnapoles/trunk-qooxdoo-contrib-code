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
       * the controller propagates data changes between table and store. note
       * that you don't have to setup the bindings manually
       */
      var controller = new qcl.databinding.event.controller.Table( 
          this._mainTable, this._tableStore 
      );

      /*
       * bind the server-supplied status text to the table's status bar.
       */
      this._tableStore.bind( "model.statusText", this._mainTable, "additionalStatusBarText", {
        converter : function( text ){
          return " | " + text;
        }
      } );           
   
      
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
    createTable : function( tableModel )
    {
      
      /*
       * create data model of the table if not provided 
       */
      if ( ! tableModel )
      {

        tableModel = new qcl.databinding.event.model.Table();
        
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

      }
      
      /*
       * create table
       */
      var table = new qx.ui.table.Table( tableModel );

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
         * create a new table that shares the table model with the 
         * main table
         */
        var table = this.createTable( this._mainTable.getTableModel() );        

        /*
         * create window
         */
        var win = new qx.ui.window.Window("Synchronized Table");
        win.setLayout( new qx.ui.layout.Grow() );
        win.moveTo( Math.floor(Math.random()*300), Math.floor( Math.random()*300) );        
        win.add( table );
        win.open();
        
        /*
         * bind the server-supplied status text to the window's caption.
         */
        this._tableStore.bind( "model.statusText", win, "caption");          

      }, this);
      
      part.add(button);
      
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
          var newRowIndex = this._mainTable.getTableModel().getRowCount();

          /*
           * reload the data
           */
          this._mainTable.getTableModel().reloadRows(newRowIndex,newRowIndex);                     
          
          /*
           * scroll down the table
           */
          this._mainTable.scrollCellVisible(0, newRowIndex );
                   
          /*
           * select the last row
           */
          this._mainTable.getSelectionModel().setSelectionInterval(newRowIndex,newRowIndex);

        },this);

      }, this);
      part.add(button);

      /*
       * remove the currently selected row
       */
      button = new qx.ui.toolbar.Button("Remove rows");
      button.addListener("execute", function(evt) {
        this._mainTable.getSelectionModel().iterateSelection( function( rowIndex ){
          this._mainTable.getTableModel().removeRow( rowIndex );
        }, this );
      }, this);
      part.add(button);
      
      part = new qx.ui.toolbar.Part();
      bar.add(part);  
     
      /*
       * turn event transport on for table
       */
      button = new qx.ui.toolbar.CheckBox( "Event transport");
      button.setChecked(true);
      part.add( button );
      button.bind("checked",this._tableStore, "useEventTransport" );
      
      return bar;
    }
  }
});