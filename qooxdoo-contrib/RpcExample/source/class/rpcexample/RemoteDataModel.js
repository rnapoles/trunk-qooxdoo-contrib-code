/*
 *
 * Copyright:
 *   (c) 2008 by Derrell Lipman
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *   Derrell Lipman (derrell)
 *
 */

qx.Class.define("rpcexample.RemoteDataModel",
{
  extend : qx.ui.table.model.Remote,

  construct : function()
  {
    this.base(arguments);

    // Our data will be sent as an array of maps.  Each map (one row of data)
    // will have properties "year" and "leap".
    this.setColumnIds([ "year", "leap" ]);

    // Get an RPC object on which we'll do all of our communication
    var clazz = rpcexample.RemoteDataModel;
    this.rpc = new qx.io.remote.Rpc(clazz.URL, clazz.SERVICE);
    this.rpc.setTimeout(10000);
    this.rpc.setCrossDomain(false);
  },

  // Configure these as appropriate for your server and services
  statics :
  {
    // The URL for remote services.
    URL     : qx.core.Environment.get("rpcexample.URL"),

    // The service to use.  We expect this service to implement two methods:
    // getRowCount and getRowData.
    SERVICE : "qooxdoo.remoteTableTest"
  },

  members :
  {
    rpc : null,

    // overloaded
    _loadRowCount : function()
    {
      // Create the handler for our remote procedure call
      var _this = this;
      var handler = function(result, ex, id)
      {
        var mycall = null;
        if (ex !== null)
        {
          alert("Async(" + id + ") exception: " + ex +
                "<p>" +
                "Are you sure you configured rpcexample.RemoteDataModel.URL " +
                "and rpcexample.RemoteDataModel.SERVICE?");
        }
        else
        {
          // We got (presumably) valid data.  Apply it to the table
          _this._onRowCountLoaded(result);
        }
      };

      // Issue the call to get the row count
      var req = this.rpc.callAsync(handler, "getRowCount");
    },

    _loadRowData : function(firstRow, lastRow)
    {
      // Create the handler for our remote procedure call
      var _this = this;
      var handler = function(result, ex, id)
      {
        var mycall = null;
        if (ex !== null)
        {
          alert("Async(" + id + ") exception: " + ex +
                "<p>" +
                "Are you sure you configured rpcexample.RemoteDataModel.URL " +
                "and rpcexample.RemoteDataModel.SERVICE?");
        }
        else
        {
          // We got (presumably) valid data.  Apply it to the table
          _this._onRowDataLoaded(result);
        }
      };

      // Issue the call to get the row count
      var req =
        this.rpc.callAsync(handler, "getRowData", firstRow, lastRow);
    }
  }
});
