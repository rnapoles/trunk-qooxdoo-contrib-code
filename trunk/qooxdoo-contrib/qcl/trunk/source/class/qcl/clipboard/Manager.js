/* ************************************************************************

   qooxdoo component library 

   http://qooxdoo.org

   Copyright:
     2007 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger, using the code from qx.event.handler.DragAndDropHandler

************************************************************************ */

/* ************************************************************************


************************************************************************ */

/**
 * This clipboard manager (singleton) manages all clipboard operations of the application
 */
qx.Class.define("qcl.clipboard.Manager",
{
  type : "singleton",
  extend : qx.core.Target,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);
    this.__data = {};
    this.__actions = {};
    var vActions = [ "move", "copy", "alias", "nodrop" ];
  },

  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */  
  events :
  {
    "changeData" : "qx.event.type.Event"
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    sourceWidget :
    {
      check : "qx.ui.core.Widget",
      nullable : true
    },

    currentAction :
    {
      check : "String",
      nullable : true,
      event : "changeCurrentAction"
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
      DATA HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Add data of mimetype.
     *
     * #param vMimeType[String]: A valid mimetype
     * #param vData[Any]: Any value for the mimetype
     *
     * @type member
     * @param vMimeType {var} TODOC
     * @param vData {var} TODOC
     * @return {void}
     */
    addData : function(vMimeType, vData) {
      this.__data[vMimeType] = vData;
      
      // inform the event listeners
      if (this.hasEventListeners("changeData"))
      {
         this.createDispatchEvent("changeData");
      }
      // and dispatch a message
      qx.event.message.Bus.dispatch("qcl.clipboard.messages.data.changed");
    },

    /**
     * TODOC
     *
     * @type member
     * @param vMimeType {var} TODOC
     * @return {var} TODOC
     */
    getData : function(vMimeType) {
      return this.__data[vMimeType];
    },


    /**
     * TODOC
     *
     * @type member
     * @return {void}
     */
    clearData : function() {
      this.__data = {};
      // inform the event listeners
      if (this.hasEventListeners("changeData"))
      {
         this.createDispatchEvent("changeData");
      }
      // and dispatch a message
      qx.event.message.Bus.dispatch("qcl.clipboard.messages.data.changed");
    },


    /*
    ---------------------------------------------------------------------------
      ACTION HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @param vAction {var} TODOC
     * @param vForce {var} TODOC
     * @return {void}
     */
    addAction : function(vAction, vForce)
    {
      this.__actions[vAction] = true;

      // Defaults to first added action
      if (vForce || this.getCurrentAction() == null) {
        this.setCurrentAction(vAction);
      }
    },


    /**
     * TODOC
     *
     * @type member
     * @return {void}
     */
    clearActions : function()
    {
      this.__actions = {};
      this.setCurrentAction(null);
    },


    /**
     * TODOC
     *
     * @type member
     * @param vAction {var} TODOC
     * @return {void}
     */
    setAction : function(vAction)
    {
      if (vAction != null && !(vAction in this.__actions)) {
        this.addAction(vAction, true);
      } else {
        this.setCurrentAction(vAction);
      }
    }

  },

  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeObjectDeep("__cursors", 1);
    this._disposeObjects("__feedbackWidget");
    this._disposeFields("__dragCache", "__data", "__actions", "__lastDestinationEvent");
  }
});
