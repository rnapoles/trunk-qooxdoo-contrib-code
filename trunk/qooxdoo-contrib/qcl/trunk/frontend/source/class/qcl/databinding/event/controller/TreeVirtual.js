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
    * @param childPath {String?null} The name of the property in the model, which 
    *   holds the data array containing the children.
    * 
    * @param labelPath {String?null} The name of the property in the model, 
    *   which holds the value to be displayed as the label of the tree items.
    */
   construct : function(model, target, childPath, labelPath)  {
     this.base(arguments);
     
     // internal bindings reference
     this.__bindings = {};
     this.__boundProperties = [];

     if (model != null) {
       this.setModel(model);      
     }
     if (target != null) {
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

     },
     
     /**
      * Apply-method which will be called after the model had been 
      * changed. This method invoke a new building of the tree.
      * 
      * @param value {qx.core.Object|null} The new tree.
      * @param old {qx.core.Object|null} The old tree.
      */    
     _applyModel: function( model, old ) 
     {
       var nodes = model.getNodes();       
       if ( ! nodes.length ) return;
       
       /*
        * add tree data to the model
        */
       var targetModel  = this.getTarget().getDataModel();
       targetModel.addTreeData( null, nodes );   
       targetModel.setData();         

     }     

  }
});