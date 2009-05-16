/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

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
qx.Class.define("qcl.databinding.event.controller.Table", 
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
     
     if (target != null) 
     {
       this.setTarget( target );
     }
     
     if (target != null) 
     {
       this.setStore( store );
     }     
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
      * Delegation object, which can have one ore more functionf defined by the
      * {@link #IControllerDelegate} Interface.  
      */
     delegate : 
     {
       apply: "_applyDelegate",
       init: null,
       nullable: true
     },
     
     /**
      * This property allows the synchronization of data through
      * events. It has to exist in the controller and the store and
      * be bound together
      */
     dataEvent : 
     {
       check : "qx.event.type.Data",
       nullable : true,
       event : "changeDataEvent",
       apply : "_applyDataEvent"
     }    
   },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  
  members :
  {
     __rowCountRequest : false,
     __rowDataRequest : false,

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
         old.getTableModel().setController(null);
         // @todo remove listener
       }
       if (target)
       {
         target.addListener("dataEdited", this._onDataEdited, this);
         target.getTableModel().setController(this);
       }
       
     },
     
     /**
      * Set a new store 
      */
     _applyStore : function ( store, old )
     {
       if ( old )
       {
         // @todo remove bindings
       }       
       
       if ( store )
       {
         store.bind( "model", this, "model" );
         store.bind( "dataEvent", this, "dataEvent" );
         this.bind( "dataEvent", store, "dataEvent" );
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
         this.__rowDataRequest = false;
         return;
       }
       
       /*
        * add received data to the target data model
        */
       if ( model.getRowCount() !== null && this.__rowCountRequest )
       {
         targetModel._onRowCountLoaded( model.getRowCount() );
         this.__rowCountRequest = false;
       }
       else if ( model.getRowData() !== null && this.__rowDataRequest  )
       {
         targetModel._onRowDataLoaded( model.getRowData() );
         this.__rowDataRequest = false;
       }

     },
     

     
     /**
      * Handles a change in a data event received from the store through
      * binding between the store's and the controller's dataEvent property
      * @param event {qx.event.type.Data?null}
      * @param old {qx.event.type.Data?null}
      * @return {void}
      */
     _applyDataEvent : function( event, old )
     {
       
       /*
        * Operate on the controlled widget according to the event
        * received
        */
       if ( event )
       {
         var targetModel  = this.getTarget().getTableModel();
         
         if ( targetModel && event.getTarget() != this )
         {
           this.info( "Received event '" + event.getType() + "' from " + event.getTarget() );
           var data = event.getData();
           
           switch ( event.getType() )
           {
             /*
              * value change in the table data
              */
             case "changeBubble":
               targetModel.setValue( data.col, data.row, data.value );
               break;
           }
         }
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
     * The ata will be in the rowData property of the model that 
     * is provided by the store.
     * @return {void}
     */
     _loadRowData : function( firstRow, lastRow ) 
     {
       if ( this.__rowDataRequest ) return;
       var store = this.getStore();
       var marshaler = store.getMarshaler();
       
       /*
        * add firstRow, lastRow at the beginning of the 
        * parameters
        */
       var params = [firstRow, lastRow].concat( marshaler.getQueryParams() );
       
       /*
        * load data
        */
       this.__rowDataRequest = true;
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
     * datastore through the bound "dataEvent" property
     */
    _onDataEdited : function( event )
    {
      var data = event.getData();
      var event = new qx.event.type.Data;
      event.init({
        value : data.value,
        old : data.oldValue,
        row : data.row,
        col : data.col
      });
      event.setType("changeBubble");
      event.setTarget(this);
      
      this.setDataEvent( null );
      this.setDataEvent( event );
    }
  }
});