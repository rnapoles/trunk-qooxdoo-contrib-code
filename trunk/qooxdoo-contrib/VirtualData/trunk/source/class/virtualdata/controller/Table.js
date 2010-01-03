/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/

   Copyright:
     2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger) using code from qx.data.controller.Tree
     * Martin Wittemann (martinwittemann) 

************************************************************************ */

/**
 * Controller for Table widget
 */
qx.Class.define("virtualdata.controller.Table", 
{
  extend : qx.core.Object,
  include: qx.data.controller.MSelection,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
   
   /**
    * @param target { qx.ui.table.Table } The target table.
    * @param store { Object?null } The store that retrieves the data
    */
   construct : function( target, store )  
   {
     this.base(arguments);
     
     if( target != undefined ) 
     {
       this.setTarget( target );
     }
     
     if( store != undefined ) 
     {
       this.setStore( store );
     }     
     
     this.__currentRequestIds = [];
   },

   /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */  
   
   properties : 
   {
     /** The data supplied by the store */
     model : 
     {
       check: "qx.core.Object",
       apply: "_applyModel",
       event: "changeModel",
       nullable: true
     },
     
     /** The tree to bind the data to. */
     target : 
     {
       check: "qx.ui.table.Table",
       event: "changeTarget",
       apply: "_applyTarget",
       init: null
     },
     
     /** The store to get the data from */
     store : 
     {
       event: "changeStore",
       apply: "_applyStore",
       init: null
     },
     
     /**
      * Delegation object, which can have one ore more function defined by the
      * {@link #IControllerDelegate} Interface.  
      */
     delegate : 
     {
       apply: "_applyDelegate",
       init: null,
       nullable: true
     }
   },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  
  members :
  {
     /*
     ---------------------------------------------------------------------------
        PRIVATE MEMBERS
     ---------------------------------------------------------------------------
     */          
     __rowCountRequest : false,
     __currentRequestIds : null,

     /*
     ---------------------------------------------------------------------------
        APPLY METHODS
     ---------------------------------------------------------------------------
     */   
     
     /**
      * If a new delegate is set, it applies the stored configuration for the
      * tree folder to the already created folders once.
      * 
      * @param value {qx.core.Object|null} The new delegate.
      * @param old {qx.core.Object|null} The old delegate.
      */
     _applyDelegate: function(value, old) {
       //
     },
     
     /**
      * Set a new Table as target
      */
     _applyTarget : function( target, old )
     {
       if ( old )
       {
         // @todo remove listeners
       }
       
       if ( target )
       {
         /*
          * catch the dataEdited event which is fired when the
          * user has made a manual change to the data
          */
         target.addListener("dataEdited", this._targetOnDataEdited, this );
         
         /*
          * catch events like add, remove, etc. 
          */
         target.getTableModel().addListener("change", this._targetOnChange, this );
         
         /*
          * store a reference to controller in the model. This can be
          * problematic if several Tables share a datasource.
          */
         target.getTableModel().setController(this);
       }
       
     },
     
     
     /**
      * Set a new store and adds event listeners
      */
     _applyStore : function ( store, old )
     {
       if ( old )
       {
         // @todo remove event listeners and bindings
       }       
       
       if ( store )
       {
         store.bind( "model", this, "model" );
         store.addListener( "change", this._storeOnChange, this );
         store.addListener( "changeBubble", this._storeOnChangeBubble, this );
       }
     },
     
     /**  
      * Apply-method which will be called after the model had been 
      * changed. This forwards the data sent by the server to the
      * controlled widget's data model.
      * 
      * @param value {qx.core.Object|null} The model contaning the new nodes.
      * @param old {qx.core.Object|null} The old model, if any.
      */    
     _applyModel: function( model, old ) 
     {
       var targetModel  = this.getTarget().getTableModel();
        
       /*
        * clear the table if the model is set to null
        */
       if ( model === null )
       {
         targetModel.clearCache();
         this.__rowCountRequest = false;
         this.__currentRequestIds = [];
         return;
       }
       
       var requestId = model.getRequestId();
       
       /*
        * was this a row count request?
        */
       if ( model.getRowCount() !== null && this.__rowCountRequest )
       {
         targetModel._onRowCountLoaded( model.getRowCount() );
         this.__rowCountRequest = false;
       }
       
       /*
        * was this a row data request? if yes, does the requestId fit?
        */
       else if ( model.getRowData() !== null 
           && qx.lang.Array.contains( this.__currentRequestIds, requestId ) )
       {
         targetModel._onRowDataLoaded( model.getRowData() );
         qx.lang.Array.remove( this.__currentRequestIds, requestId );
       }
     },
     
     /*
     ---------------------------------------------------------------------------
        API METHODS
     ---------------------------------------------------------------------------
     */       
     
     /**
      * Reloads the data of the target model
      * @return {Void}
      */
     reload : function()
     {
       if( this.getTarget() && this.getStore() )
       {
         var table = this.getTarget();
         table.resetSelection();
         table.scrollCellVisible(0,0);
         var model = this.getTarget().getTableModel();
         model.clearCache();
         model.reloadRows(0,100);
       }
     },
     
     
     /*
     ---------------------------------------------------------------------------
        METHODS CALLED BY THE CONTROLLED TABLE'S DATA MODEL
     ---------------------------------------------------------------------------
     */        
     
     /**
      * Triggers the request for  the number of rows through the store. 
      * The value will be in the rowCount property of the model that 
      * is provided by the store.
      * @return {void}
      */
     _loadRowCount : function()
     {
       if ( this.__rowCountRequest ) return;
       var store = this.getStore();
       var marshaler = store.getMarshaler();
       var params = marshaler.getQueryParams();
       this.__rowCountRequest = true;
       store.load( marshaler.getMethodGetRowCount(), params );
     },
     
     
    /**
     * Triggers the request for row data through the store. 
     * The data will be in the rowData property of the model that 
     * is provided by the store.
     * @return {void}
     */
     _loadRowData : function( firstRow, lastRow ) 
     {
       //if ( this.__rowDataRequest ) return;
       //this.info( "Requesting " + firstRow + " - " + lastRow );
       
       var store = this.getStore();
       var marshaler = store.getMarshaler();

       
       /*
        * store request id so that we can differentiate different
        * tables connected to the same store
        */
       var requestId = store.getNextRequestId(); 
       this.__currentRequestIds.push( requestId );
       
       /*
        * add firstRow, lastRow, requestId at the beginning of the 
        * parameters
        */
       var params = [firstRow, lastRow, requestId].concat( marshaler.getQueryParams() );
         
       /*
        * load data
        */
       store.load( marshaler.getMethodGetRowData(), params );
     },
     
     /*
     ---------------------------------------------------------------------------
        EVENT LISTENERS
     ---------------------------------------------------------------------------
     */
    
    /**
     * Called when the editor in the table flushes. Creates a 
     * "changeBubble" event and propagates it to the connected
     * datastore 
     */
    _targetOnDataEdited : function( event )
    {
      if ( ! this.getStore() ) return;
      var data = event.getData();
      var event = new qx.event.type.Data;
      event.init({
        value : data.value,
        old : data.oldValue,
        row : data.row,
        col : data.col
      });
      event.setType("changeBubble");
      
      /*
       * store hash code of event target
       */
      event.getData().hashCode = this.getTarget().toHashCode();       
      
      this.getStore().addToEventQueue( event );
    },
    
    /**
     * Called when the target has dispatched a "change" event.
     * Propagates it to the store.
     * @param event {qx.event.type.Data}
     * @return
     */
    _targetOnChange : function( event )
    {
       if ( ! this.getStore() ) return;
       
       /*
        * store hash code of event target
        */
       event.getData().hashCode = this.getTarget().toHashCode(); 
       
       this.getStore().addToEventQueue( event );
    },
    
    /**
     * Called when the store dispatches a 'change' event
     * @param event {qx.event.type.Data?null}
     * @return {void}
     */
    _storeOnChange : function( event )
    {
       /*
        * no action if no target or the event source is the the target tree
        */
       if ( ! this.getTarget()  
           || event.getData().hashCode == this.getTarget().toHashCode() ) return;
   
       var data = event.getData();
       var target = this.getTarget();
       var targetModel = target.getTableModel();
       
       switch ( data.type )
       {
         /*
          * remove row 
          */
         case "remove":
           targetModel.removeRow( data.start, true );
           break;
           
         /*
          * reload some rows 
          */  
         case "relaod":
           targetModel.reloadRows( data.start, data.end, true );
            
       }
    },
    
    /**
     * Called when the store dispatches a 'changeBubble' event
     * @param event {qx.event.type.Data?null}
     * @return {void}
     */
    _storeOnChangeBubble : function( event )
    {
       try{
       /*
        * no action if no target or the event source is the the target tree
        */
       if ( ! this.getTarget()  
           || event.getData().hashCode == this.getTarget().toHashCode() ) 
       {
         return;
       }
      var data = event.getData();
      var tableModel = this.getTarget().getTableModel();
      
      /*
       * if there is a record id 
       */
      if ( data.id )     
      {
        var rowIndex = tableModel.getRowById(data.id);
        var colIndex = tableModel.getColumnIndexById(data.name);
        if ( rowIndex != undefined && colIndex != undefined )
        {
          tableModel.setValue( colIndex, rowIndex,  data.value);
        }
      }
   
      /*
       * set the value in the target data model by column and value
       */
      else if ( data.col && data.row )
      {
        tableModel.setValue( data.col, data.row, data.value ); 
      }
       }catch(e){console.warn(e)}
    }    
  }
});