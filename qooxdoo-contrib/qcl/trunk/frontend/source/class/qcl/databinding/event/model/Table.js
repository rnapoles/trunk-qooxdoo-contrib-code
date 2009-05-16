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
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * An implementation of the abstract class qx.ui.table.model.Remote that uses
 * qcl.databinding.event package. Requests to load data are delegated to
 * the data store through the controller.
 */
qx.Class.define("qcl.databinding.event.model.Table",
{
  extend : qx.ui.table.model.Remote,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(serviceName)
  {
    this.base(arguments);
    
  },
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {

    /**
     * The controller object of this model
     */
    controller :
    {
      check : "qcl.databinding.event.controller.Table",
      nullable : true
    }
  },
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */  


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    /**
     * gets the column names as an array
     * @return {Array}
     */
    getColumnIds : function ()
    {
      return this.__columnIdArr;
    },
   
    /*
    ---------------------------------------------------------------------------
       METHODS CALLED BY THE PARENT CLASSS 
    ---------------------------------------------------------------------------
    */   
    
    /** 
     * Initiates a data request, which is handled by
     * the controller and the connected data store. 
     * When the data arrives, the controller will call
     * this object's 
     */
    _loadRowCount : function() 
    {
      
      // console.log("Row count request..."); 
      /*
       * mark that query is in progress
       */
      this._rowCount = 0; 
      
      /*
       * call the controller's method which will then 
       * trigger a request by the store
       */
      if ( this.getController() )
      {
        this.getController()._loadRowCount();
      }
    },

    /** 
     * Loads row data from the data store. 
     */
    _loadRowData : function( firstRow, lastRow ) 
    {
      //console.log("Requesting rows " + firstRow + " - " + lastRow );
      if ( this.getController() )
      {
        /*
         * call the controller's method which will then 
         * trigger a request by the store
         */
        this.getController()._loadRowData( firstRow, lastRow );
      } 
    }
    /*
    ---------------------------------------------------------------------------
       EVENTS
    ---------------------------------------------------------------------------
    */   
    
  }
});
