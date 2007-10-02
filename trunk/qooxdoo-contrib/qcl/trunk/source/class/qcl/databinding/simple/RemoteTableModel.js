/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 Christian Boulanger

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
 * qcl.databinding.simple package
 */
qx.Class.define("qcl.databinding.simple.RemoteTableModel",
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
    this.setServiceName(serviceName||"");
    this.setDataBinding(true);
    
    // setup event listener for handling data received by MDataManager mixin
    this.addEventListener("dataReceived",function(e){
      result = e.getData();
      if ( result== null )
      {
        this.setRowCount(null);
        this.setRowData([]);
      }
      else if ( "rowCount" in result ) 
      {
        this.setRowCount(result.rowCount);
      }
      else if ( "rowData" in result )
      {
        this.setRowData(result.rowData);
      }
    });
  },
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {

    /** 
     * the data passed to the server methods which determine row count and row data
     * it is up to the server method to interpret this data - it can be a full sql
     * query string (not recommended) or just bits of data (in an array or object)
     * to construct the query.
     */
    queryData :
    {
      nullable : true,
      init : null
    },
    
    /** 
     * name of the jsonrpc service method that determines row count
     * defaults to "getRowCount"
     */
    serviceMethodGetRowCount :
    {
      check : "String",
      nullable : false,
      init : "getRowCount"
    },
    
   /** 
    * name of the jsonrpc service method that retrieves the row data
    * defaults to "getRowData"
    */
    serviceMethodGetRowData :
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

    /**
     * overridden
     * in this version of a remote table model, simply an alias for this.reloadData() 
     */
    updateClient : function()
    {
      this.reloadData();
    },
    
    /**
     * gets number of rows that the query will produce. 
     * The value of the queryData property is passed to the 
     * service class on the server which needs to return the following 
     * response: { result : { rowCount : 1234 }, ... }
     *
     * @type member
     * @abstract
     * @return {void}
     */
    _loadRowCount : function() 
    {
      if ( ! this.getServiceName() ) return 0; // do not do any updates until service name is known
      this._updateClient( 
        this.getServiceName() + "." + this.getServiceMethodGetRowCount(),
        this.getQueryData()  
      );
      this._rowCount = 0; // update is in progress
    },

    /**
     * receives the row count value returned by the server and passes it on
     * to the _onRowCountLoaded function as required by qx.ui.table.model.Remote
     */
    setRowCount : function (rowCount)
    {
      this._onRowCountLoaded(rowCount);
    },

    /**
     * gets the column names as an array
     * @return {Array}
     */
    getColumnIds : function ()
    {
      return this._columnIdArr;
    },
    
    /**
     * Loads row data from the server. The service class on the server
     * must have the following signature: 
     *   Mixed    queryData data from which to construct the query
     *   Integer  firstRow 
     *   Integer  lastRow
     * The server jsonrpc response must look like so:
     * { result : {  rowData : [ [ ... ],[...],...] }, ..}
     *
     * @type member
     * @abstract
     * @param firstRow {Integer} The index of the first row to load.
     * @param lastRow {Integer} The index of the last row to load.
     * @return {void}
     */
    _loadRowData : function(firstRow, lastRow) 
    {
      if ( ! this.getServiceName() ) return []; // do not do any updates until service name is known
      this._updateClient( 
        this.getServiceName() + "." + this.getServiceMethodGetRowData(),
        this.getQueryData(),firstRow,lastRow  
      );
    },

    /**
     * receives the row data returned by the server and passes it on
     * to the _onRowDataLoaded function as required by qx.ui.table.model.Remote
     */
    setRowData : function (rowDataArr)
    {
      this._onRowDataLoaded(rowDataArr);
    }

  }
});
