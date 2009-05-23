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
 * Marshaler for data for qx.ui.treevirtual.Table
 */
qx.Class.define("qcl.databinding.event.marshal.Table", 
{
  extend : qx.core.Object,

  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  
  /**
   * @param delegate {Object} An object containing one of the methods described 
   *   in {@link qx.data.store.IStoreDelegate}.
   */
  construct : function(delegate)
  {
    this.base(arguments);
    this.__delegate = delegate;
  },
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  
  properties :
  {
    /**  
    * Additional parameters passed to both "getRowCount" and "getRowData"
    * methods.
    */
   queryParams :
   {
     check : "Array",
     nullable : true,
     init : []
   },    

   /** 
    * name of the jsonrpc service method that determines row count
    * defaults to "getRowCount"
    */
   methodGetRowCount :
   {
     check : "String",
     nullable : false,
     init : "getRowCount"
   },

   /** 
    * Name of the jsonrpc service method that retrieves the row data
    * defaults to "getRowData"
    */
   methodGetRowData :
   {
     check : "String",
     nullable : false,
     init : "getRowData"
   }   
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  
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
      if (qx.Class.isDefined("qx.data.model.Table" )) {
        return;
      }

      // define class
      qx.Class.define("qx.data.model.Table", {
        extend: qx.core.Object,
        properties : {
        rowCount : { check: "Integer", init : null },
        rowData  : { check : "Array", init : null  },
        events : { check : "Map", init : [] },
        requestId : { check: "Integer", init : null },
        statusText : { check: "String", init : "", event: "changeStatusText"  }
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
    * @return {qx.data.model.Table}
    */
    jsonToModel: function(data) 
    {   
      var model = new qx.data.model.Table;
      model.set(data);
      return model;
    }    
  }
});
