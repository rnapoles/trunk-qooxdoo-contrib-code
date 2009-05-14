/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/**
 * Marshaller for data for qx.ui.treevirtual.TreeVirtual
 */
qx.Class.define("qcl.databinding.event.marshal.TreeVirtual", 
{
  extend : qx.core.Object,

  /**
   * @param delegate {Object} An object containing one of the mehtods described 
   *   in {@link qx.data.store.IStoreDelegate}.
   */
  construct : function(delegate)
  {
    this.base(arguments);
    
    this.__delegate = delegate;
  },


  members :
  {
    __delegate : null,
    
    
    /**
     * Creates for the given data the needed classes. 
     * 
     * @see qx.data.store.IStoreDelegate
     * 
     * @param data {Object} The object for which classes should be created.
     * @param includeBubbleEvents {Boolean} Whether the model should support
     *   the bubbling of change events or not.
     */
    jsonToClass: function(data) {
      
      // class already exists
      if (qx.Class.isDefined("qx.data.model.TreeVirtual" )) {
        return;
      }
      
      // define class
      qx.Class.define("qx.data.model.TreeVirtual", {
        extend: qx.core.Object,
        properties : {
          nodeCount : { check: "Integer", init : null, event : "changeNodeCount" },
          childCount : { check: "Integer", init : null, event : "changeChildCount" },
          nodes : { check : "Array", init : [], event : "changeNodes" },
          queue : { check : "Array", init : [], event : "changeQueue" },
          statusText : { check: "String", init : "", event : "changeStatusText" }
        }
      });
    },


    /** 
     * Creates for the given data the needed models. Be sure to have the classes
     * created with {@link #jsonToClass} before calling this method. The creation 
     * of the class itself is delegated to the {@link #__createInstance} method,
     * which could use the {@link qx.data.store.IStoreDelegate} methods, if 
     * given.
     * 
     * @param data {Object} The object for which models should be created.
     * @return {qx.data.model.TreeVirtual}
     */
    jsonToModel: function(data) 
    {   
       var model = new qx.data.model.TreeVirtual;
       model.set(data);
       return model;
    }    
  }
});
