/* ************************************************************************


    Widget class 'qcl.components.popup.indicator.request.Simple'.
    This file is auto-generated. Do not edit, manual changes will be overwritten.


    qooxdoo v.0.7 code generated by QxTransformer v.

************************************************************************ */


/* ************************************************************************
#embed(qx.icontheme/16/actions/ajax-loader.gif)


************************************************************************ */

/**
 * @todo: add documentation here auto-generated from qxml file
 */
qx.Class.define("qcl.components.popup.indicator.request.Simple",
{
  extend : qx.ui.popup.Popup,

  include : [ qcl.components.popup.indicator.request.MSimple ],

    
  /**
   * widget property, is deprecated and will be removed
   * @deprecated
   */
  properties : {
        widget : { check : "Object" }
  },
    
  /**
   * Constructor
   */
  construct : function()
  {
    // call parent class
    this.base(arguments);

    //call paint method to draw widget
    this.paint();
  },


  members :
  {

    /**
     * Draw widget
     */
    paint: function ()
    {

      // parent object to which child objects will be added: this object or dummy stub, depends on setToClientDocument property
      var qx_id96075= this;

/** begin auto-generated gui code **/

var qx_id99716 = new qx.ui.basic.Atom("Loading, please wait...","icon/16/actions/ajax-loader.gif");
qx_id99716.setBorder("outset-thin");
qx_id99716.setPadding(10);
qx_id99716.setBackgroundColor("white");
qx_id96075.add(qx_id99716);

qx.event.message.Bus.subscribe("qcl.databinding.messages.rpc.*",function(message){this.handleRpcMessage(message,qx_id99716);},this);

qx_id99716.addEventListener("click", function(event){this.handleClick(event,qx_id99716);},this);

/** end auto-generated gui code **/

      // set widget object, deprecated, will be removed
      this.setWidget(this);
    }

  }

});


