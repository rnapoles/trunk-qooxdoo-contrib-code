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
 * Controller for TreeVirtual widget
 */
qx.Class.define("virtualdata.controller.TreeVirtual", 
{
  extend : qx.core.Object,
  include: qx.data.controller.MSelection,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
   
   /**
    * @param target {qx.ui.tree.Tree?null} The target widgets which should be a tree.
    * @param store { Object?null } The store that retrieves the data
    */
   construct : function( target, store )  
   {
     this.base(arguments);
    
     if( target != null ) 
     {
       this.setTarget( target );
     }
     
     if( store != null ) 
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
     /** The root element of the data. */
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
       check: "qx.ui.treevirtual.TreeVirtual",
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
     
     /*
      * Set a new TreeVirtual as target
      */
     _applyTarget : function( target, old )
     {
       if ( old )
       {
         // @todo remove listeners
       }
       
       if ( target )
       {
         var targetModel = target.getDataModel();
         
         /*
          * catch events like add, remove, etc. 
          */         
         targetModel.addListener("change", this._targetOnChange, this);
         /*
          * catch property changes in the nodes
          */         
         targetModel.addListener("changeBubble", this._targetOnChangeBubble, this);         
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
      * Apply-method which will be called after the model loaded
      * by the data store has been passed to this controller.
      * This adds the nodes contained in the model to the
      * tree data model of the target.
      * 
      * @param value {qx.core.Object|null} The model contaning the new nodes.
      * @param old {qx.core.Object|null} The old model, if any.
      */    
     _applyModel: function( model, old ) 
     {
       var targetModel  = this.getTarget().getDataModel();
        
       /*
        * clear the tree if the model is set to null
        */
       if ( model === null )
       {
         targetModel.clearData();
         return;
       }
       
       /*
        * check if there are any nodes to add
        */
       var nodeData = model.getNodeData();   
       if ( ! nodeData.length ) return;
       
       /*
        * add tree data to the model
        */
       targetModel.addData( null, nodeData );   
       targetModel.setData();         

     },

     
     /*
     ---------------------------------------------------------------------------
        EVENT LISTENERS
     ---------------------------------------------------------------------------
     */
     
     /**
      * Called when the target has dispatched a "change" event.
      * Propagates it to the store, adding data that is implicit
      * in the event.
      * @param event {qx.event.type.Data}
      * @return {Void}
      */
     _targetOnChange : function( event )
     {
       //this.info( "Received event '" + event.getType() + "' from " + event.getTarget() );
      
       /*
        * if no store, no propagation
        */ 
       if ( ! this.getStore() ) return;
        
       var target = this.getTarget();
       var targetModel = target.getDataModel();
       
       /*
        * event data
        */
       var data = event.getData();
       data.eventType = event.getType();
       data.items = [];
       
       /*
        * iterate through all elements that
        * are concerned
        */
        for ( var i=data.start; i<= data.end; i++)
        {
          switch ( data.type )
          {
            /* 
             * add a node
             */
            case "add":
              data.items.push( targetModel.getData()[i] );
              break;
              
           /*
            * move a node
            */
            case "move":
              this.error("Not implmemented");
          }
        }

        /*
         * store hash code of event target
         */
        event.getData().hashCode = this.getTarget().toHashCode(); 
        
        /*
         * put event in store queue
         */
        this.getStore().addToEventQueue( event );
     },

     /**
      * Called when the target has dispatched a "changeBubble" event.
      * Propagates it to the store.
      * @param event {qx.event.type.Data}
      * @return {Void}
      */     
     _targetOnChangeBubble : function( event )
     {
        //this.info( "Received event '" + event.getType() + "' from " + event.getTarget() );
        
        var targetModel = this.getTarget().getDataModel();
       
       /*
        * exchange client id with server id
        */
       event.getData().name   = event.getData().name.replace(/^data\[([0-9]+)\]/,function(m,sourceNodeId){
         var serverNodeId = targetModel.getServerNodeId( parseInt(sourceNodeId) ) ;
         return "getData()[" + serverNodeId + "]";
       });
       
       /*
        * store hash code of event target
        */
       event.getData().hashCode = this.getTarget().toHashCode();    
       
       /*
        * put event in store queue
        */
       this.getStore().addToEventQueue( event );
     },

     /**
      * Called when the store dispatches a 'change' event
      * @param event {qx.event.type.Data?null}
      * @return {void}
      */
      _storeOnChange : function( event )
      {
        
         //this.info( "Received event '" + event.getType() + "' from " + event.getTarget() );

         /*
          * no action if no target or the event source is the the target tree
          */
         if ( ! this.getTarget()  
             || event.getData().hashCode == this.getTarget().toHashCode() ) return;
                  
         var data = event.getData();
         var target = this.getTarget();
         var targetModel = target.getDataModel();
         
         /*
          * handle range of items 
          */
         for ( var i=data.start; i<= data.end; i++)
         {
           switch ( data.type )
           {
             /* 
              * Add a node. If the event comes from the server,
              * use the data from the items property. Otherwise,
              * use data from the event target.
              */
             case "add":
               var node = data.isServerEvent ? 
                   data.items[i-data.start] : event.getTarget().getData()[i];
               targetModel.addData( null, [node] );
               break;
             
             /*
              * Remove a node: if the event is not from the server,
              * get the server node id from the event target.
              */
             case "remove":
               var serverNodeId = data.isServerEvent ? 
                   i : event.getTarget().getServerNodeId(i);
               var nodeId = targetModel.getClientNodeId( serverNodeId );
               targetModel._removeNodeData( nodeId );
               break;
               
            /*
             * move a node
             */
             case "move":
               this.error("Not implmemented");
           }
         }  
         targetModel.setData();
      },
      
      /**
       * Called when the store dispatches a 'changeBubble' event
       * @param event {qx.event.type.Data?null}
       * @return {void}
       */
      _storeOnChangeBubble : function( event )
      {
        
         //this.info( "Received event '" + event.getType() + "' from " + event.getTarget() );
         
         /*
          * no action if no target or the event source is the the target tree
          */
         if ( ! this.getTarget()  
             || event.getData().hashCode == this.getTarget().toHashCode() ) return;
         
        /*
         * change data
         */
        var data = event.getData();
        var target = this.getTarget();
        var targetModel = target.getDataModel();
 
        var path   = data.name.replace(/^data\[([0-9]+)\]/,function(m,sourceNodeId)
        {
          var serverNodeId = data.isServerEvent ? 
              sourceNodeId : targetModel.getServerNodeId( parseInt(sourceNodeId) ) ;
          var targetNodeId = targetModel.getClientNodeId( serverNodeId ); 
          return "getData()[" + targetNodeId + "]";
        });
        
        // eval creates problem for build variable optimization
        eval( "this.getTarget().getDataModel()." + path + "= arguments[0].getData().value;" );
        
        targetModel.setData();
      }     
     
  }
});