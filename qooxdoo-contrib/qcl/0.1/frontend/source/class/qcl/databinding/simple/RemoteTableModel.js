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
     * it is up to the server method to interpret this data to construct the query.
     */
    queryData :
    {
      check : "Object",
      nullable : true,
      init : {}
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
    }, 
    
   /** 
    * function that gets called before a row data request is launched.
    * if the function returns an object, it is sent instead of the 
    * value of the queryData property
    */
    callBeforeLoadRowData :
    {
      check : "Function",
      nullable : true,
      init : null
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
     * Returns number of rows that the query will produce. 
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
      
      // console.log("Row count request..."); 
      /*
       * do not sen query if the rpc backend is not known
       */
      if (  ! this.getServiceName() )
      {
        return;
      }
      
      /*
       * send query
       */
      this._updateClient( 
        this.getServiceName() + "." + this.getServiceMethodGetRowCount(),
        this.getQueryData()  
      );
      
      /*
       * mark that query is in progress
       */
      this._rowCount = 0; 
    },

    /**
     * receives the row count value returned by the server and passes it on
     * to the _onRowCountLoaded function as required by qx.ui.table.model.Remote
     */
    setRowCount : function (rowCountInfo)
    {
      /*
       * has server set a request id?
       */
      if ( rowCountInfo && typeof rowCountInfo == "object" )
      {
        var rowCount = rowCountInfo.rowCount;
        var queryData = this.getQueryData(); 
        queryData.requestId = rowCountInfo.requestId;
      }
      else
      {
        var rowCount = rowCountInfo;  
      }
      
      /*
       * call parent method
       */
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
     *   Object   queryData data from which to construct the query, this 
     *            object is taken from the queryData property
     *   Integer  firstRow 
     *   Integer  lastRow
     * The server jsonrpc response must look like so:
     * { result : {  rowData : [ 
     *   { 'rowId1' : 'foo1',  'rowId2' : 'bar1', ... },
     *   { 'rowId1' : 'foo2',  'rowId2' : 'bar2', ... },
     *   ...
     * ] }, ... }
     * 
     * If you define the callBeforeLoadRowData property with a function, this 
     * function will be called with the method arguments before the query is 
     * started. If the function returns an object, it is sent as the queryData 
     * parameter.
     * @type member
     * @abstract
     * @param firstRow {Integer} The index of the first row to load.
     * @param lastRow {Integer} The index of the last row to load.
     * @return {void}
     */
    _loadRowData : function(firstRow, lastRow) 
    {
       //console.log("Requesting rows " + firstRow + " - " + lastRow );
       
      /*
       * do not do any updates until service name is known
       */
      if ( ! this.getServiceName() ) return []; 
      
      /*
       * query data
       */
      var qd = this.getQueryData();

      /*
       * call hook callback function
       */
      if ( this.getCallBeforeLoadRowData()  )
      {
        var result = this.getCallBeforeLoadRowData()(firstRow, lastRow);
        if  ( typeof result == "object" )
        {
          qd = result;
        } 
      } 
      
      /*
       * send request
       */
      this._updateClient( 
        this.getServiceName() + "." + this.getServiceMethodGetRowData(),
        qd, firstRow, lastRow  
      );
      
    },

    /** 
     * Receives the row data returned by the server and passes it on
     * to the _onRowDataLoaded function as required by qx.ui.table.model.Remote
     */
    setRowData : function (rowDataArr)
    {
      /*
       * call parent method
       */
      this._onRowDataLoaded(rowDataArr);
    }

  }
});
