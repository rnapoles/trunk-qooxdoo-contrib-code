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
     * Til Schneider (til132)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * An implementation of the abstract class qx.ui.table.model.Remote that uses
 * qcl.data package. Requests to load data are delegated to
 * the data store through the controller.
 */
qx.Class.define("qcl.data.model.Table",
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
      check : "qcl.data.controller.Table",
      nullable : true
    }
  },
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */  
  events :
  {
    /**
     * The change event which will be fired if there is a change in the array.
     * The data contains a map with three key value pairs:
     * <li>start: The start index of the change.</li>
     * <li>end: The end index of the change.</li>
     * <li>type: The type of the change as a String. This can be 'add',  
     * 'remove' or 'order'</li>
     * <li>items: The items which has been changed (as a JavaScript array).</li>
     */
    "change" : "qx.event.type.Data",
    
    /**
     * Event signaling that the model data has changed
     */
    "changeBubble" : "qx.event.type.Data"
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
       ADDED METHODS
    ---------------------------------------------------------------------------
    */         
    
    /**
     * gets the column names as an array
     * @return {Array}
     */
    getColumnIds : function ()
    {
      return this.__columnIdArr;
    },
    
    /** 
     * Reloads a section of the data only
     * @author Most of the code by Til Schneider 
     * @param firstRowIndex
     * @param lastRowIndex
     * @param dontFireEvent {Boolean|undefined} If true, do not fire a 'change' event     
     */
    reloadRows : function(firstRowIndex, lastRowIndex, dontFireEvent )
    {
      // this.debug("Reloading wanted: " + firstRowIndex + ".." + lastRowIndex);
      if (this.__firstLoadingBlock == -1)
      {
        var blockSize = this.getBlockSize();
        var totalBlockCount = Math.ceil(this.__rowCount / blockSize);

        // There is currently no request running -> Start a new one
        // NOTE: We load one more block above and below to have a smooth
        //       scrolling into the next block without blank cells
        var firstBlock = parseInt(firstRowIndex / blockSize) - 1;

        if (firstBlock < 0) {
          firstBlock = 0;
        }

        var lastBlock = parseInt(lastRowIndex / blockSize) + 1;

        if (lastBlock >= totalBlockCount) {
          lastBlock = totalBlockCount - 1;
        }

        // Check which blocks we have to load
        var firstBlockToLoad = -1;
        var lastBlockToLoad = -1;

        for (var block=firstBlock; block<=lastBlock; block++)
        {
          // We don't have this block
          if (firstBlockToLoad == -1) {
            firstBlockToLoad = block;
          }

          lastBlockToLoad = block;
        }

        // Load the blocks
        if (firstBlockToLoad != -1)
        {
          this.__firstRowToLoad = -1;
          this.__lastRowToLoad = -1;

          this.__firstLoadingBlock = firstBlockToLoad;

          // this.debug("Starting server request. rows: " + firstRowIndex + ".." + lastRowIndex + ", blocks: " + firstBlockToLoad + ".." + lastBlockToLoad);
          this._loadRowData(firstBlockToLoad * blockSize, (lastBlockToLoad + 1) * blockSize - 1);
        }
      }
      else
      {
        // There is already a request running -> Remember this request
        // so it can be executed after the current one is finished.
        this.__firstRowToLoad = firstRowIndex;
        this.__lastRowToLoad = lastRowIndex;
      }
      
      /*
       * this will force a redraw
       */
      this._loadRowCount();
      
      /*
       * fire events if this hasn't been caused by an event
       */
      if ( ! dontFireEvent )
      {
        this.fireDataEvent("change",{
          start : firstRowIndex,
          end : lastRowIndex,
          type : "relaod"
        });
      }
    },
    
    /*
    ---------------------------------------------------------------------------
       OVERRIDDEN METHODS
    ---------------------------------------------------------------------------
    */      
   
    /**
     * Removes a row.
     * @param rowIndex {Integer} The index of the row to remove
     * @param dontFireEvent {Boolean|undefined} If true, do not fire a 'change' event
     */
    removeRow : function( rowIndex, dontFireEvent )
    {
      if ( ! dontFireEvent )
      {
        this.fireDataEvent("change",{
          start : rowIndex,
          end : rowIndex,
          type : "remove"
        });
      }
      this.base(arguments, rowIndex);
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
    
    // @todo _cancelRequest
    
  }
});
