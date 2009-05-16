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
 * Controller for TreeVirtual widget
 */
qx.Class.define("qcl.databinding.event.controller.TreeVirtual", 
{
  extend : qx.core.Object,
  include: qx.data.controller.MSelection,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
   
   /**
    * @param model {qx.core.Object?null} The root element of the model, which holds 
    *   the data.
    * 
    * @param target {qx.ui.tree.Tree?null} The target widgets which should be a tree.
    * 
    */
   construct : function(model, target )  
   {
     this.base(arguments);
    
     if (model != null) 
     {
       this.setModel(model);      
     }
     if (target != null) 
     {
       this.setTarget(target);
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
       event: "changeTarget",
       apply: "_applyTarget",
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
     
     _applyTarget : function( target, old )
     {
       if ( old )
       {
         // remove bindings
       }
       
       var targetModel = target.getDataModel();
       
       targetModel.addListener("change", this._onTargetModelEvent, this);
       targetModel.addListener("changeBubble", this._onTargetModelEvent, this);
     },
     
     /** 
      * Apply-method which will be called after the model had been 
      * changed. This adds the nodes contained in the model to the
      * tree data model of the target
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
     
     _onTargetModelEvent : function( event )
     {
       
       /*
        * don't do anything if the event is not from the target model
        * Otherwise this would cause an infinite loop
        */
       if ( event.getTarget() != this.getTarget().getDataModel() ) return;
       
       /*
        * propagate event
        */
       this.info( "Propagating target model event '" + event.getType() + "' from " + event.getTarget() + " to store." );
       this.setDataEvent(null);
       this.setDataEvent( event );
     },
     
     _applyDataEvent : function( event, old )
     {
       var targetModel  = this.getTarget().getDataModel();
       
       /*
        * dispatch a copy of the event if a target model exists and
        * the target model is not the source of the event
        */
       if ( event )
       {
         if ( targetModel && event.getTarget() != targetModel )
         {
           this.info( "Propagating synchronized event '" + event.getType() + "' from " + event.getTarget() + " to " + targetModel );
           targetModel.dispatchEvent( event.clone() );
         }
       } 
     }
  }
});