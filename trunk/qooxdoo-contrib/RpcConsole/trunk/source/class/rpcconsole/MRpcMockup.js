/* ************************************************************************

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

#asset(mockup/*)
#require(openpgp.sha1)

************************************************************************ */

/**
 * A mixin for qx.io.remote.Rpc which allows to prepare code relying on a 
 * json-rpc backend to work with static mockup data independently of the 
 * server. This allows to develop client and server independently and to 
 * create static demos.
 * 
 * For the mixin to work, you need to patch qx.io.remote.Rpc like so: 
 * <pre>
 * qx.Class.patch( qx.io.remote.Rpc, rpcconsole.MRpcMockup );
 * </pre>
 * 
 * The mixin works in three modes, controlled by a new "mockupMode" 
 * property of a qx.io.remote.Rpc instance:
 * <ol>
 * <li>"off": no effect, qx.io.remote.Rpc works normally</li>
 * <li>"monitor": qx.io.remote.Rpc works normally, but for each request,
 *    the mixin opens a browser window with json data to store in a file.
 *    The window contains instructions where to save this file.
 * </li>    
 * <li>"on": instead of sending the request to the server, the mixin retrieves
 *    the content of the file that has been created with the information of
 *    the monitor mode (2).
 * </li>
 * </ol>
 * 
 * This mixin requires the use of the "Crypto" contribution, which you can 
 * include by adding 
 * <pre>
 * {
 *   "manifest" : "contrib://Crypto/trunk/Manifest.json"
 * }
 * </pre> 
 * to the "libraries" key in your config.json file.
 * 
 * The mixin works by overriding the _callInternal method of qx.io.remote.Rpc,
 * this is why it is neccessary to use qx.Class.patch() instead of qx.Class.include().
 * 
 */
qx.Mixin.define("rpcconsole.MRpcMockup",
{

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  properties :
  {
    /**
     * The mode of the mockup state. Can be "off" or "on", or "monitor" to 
     * generate the mockup data.
     */
    mockupMode :
    {
      check : ["monitor","on","off"],
      init : "off",
      event : "changeMockupMode"
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
     */
    _callInternal : function(args, callType, refreshSession)
    {
      var offset = (callType == 0 ? 0 : 1);
      var method = args[offset];
      var params = [];
      for (var i=offset+1; i<args.length; ++i)
      {
        params.push(args[i]);
      }    
      
      switch ( this.getMockupMode() )
      {
        
        /*
         * "on": we substitute the server request with 
         * the mockup
         */
        case "on":
        if ( callType != 1 )
        {
          this.error("Monitoring works only with callAsync");
        }
        var handler = args[0];
        var loader = new qx.io2.ScriptLoader();
        var fileId = this._getFileId( method, params );
        window.__jsonrpc_response = undefined;
        var path = "resource/mockup/"+fileId + "?" + ((new Date).getTime());
        loader.load( path, qx.lang.Function.bind( function( status ){
          var response = window.__jsonrpc_response;
          if ( status === "fail" )
          {
            this.warn( "Missing mockup json response 'resource/mockup/"+fileId+ "'."  );
          }
          else if ( ! qx.lang.Type.isObject( response ) 
            || response.result === undefined || response.id === undefined )
          {
            this.warn( "File 'resource/mockup/"+fileId+ "' is invalid."  );
          }
          else
          {
            handler( response.result, null, response.id );  
            return;
          }
          handler( null, null, null );  
        },this ));
        break;
        
        /*
         * "monitor": we do the request, but create a new window 
         * for each request with the mockup data
         */
        case "monitor":
        if ( callType != 1 )
        {
          this.error("Monitoring works only with callAsync");
        }
        var handler = args[0];
        args[0] = qx.lang.Function.bind( function(result, ex, id){
          if ( ! ex )
          {
            var fileId = this._getFileId( method, params );
            var response = qx.util.Json.stringify({
              'result' : result,
              'error' : ex,
              'id' : id
            });
            var win = window.open();
            var doc = win.document;
            doc.open();
            doc.write("<html><head><title>"+fileId+"</title></head><body><pre>");
            doc.writeln("/* This is the response of a RPC request");
            doc.writeln(" * =====================================");
            doc.writeln(" * Service/method '" + this.getServiceName() + "." + method +"'");
            doc.writeln(" * Parameters: " + qx.util.Json.stringify(params) + "'");
            doc.writeln(" * ");
            doc.writeln(" * Save this file as '" + fileId + "'");
            doc.writeln(" * as a text-only file in the resource/mockup folder of your application");
            doc.writeln(" */ ");
            doc.writeln("window.__jsonrpc_response = " + response + ";");
            doc.write("</pre></body></html>");
            doc.close();
            handler(result, ex, id);
          }
        },this);
        
        /*
         * "off": do nothing
         */
        case "off":
        default:
        return this.base(arguments, args, callType, refreshSession );
      }
    },
    
    /**
     * Create sha1-encoded file id from url, service, method and parameters
     * @param method {String}
     * @param params {Array}
     * @return {String}
     */
    _getFileId : function( method, params )
    {
      var fileId = this.getServiceName() + "." + method + "?" + qx.util.Json.stringify( params );
      return openpgp.sha1.hex_sha1( fileId ) + ".json";
    }

  }  
});
