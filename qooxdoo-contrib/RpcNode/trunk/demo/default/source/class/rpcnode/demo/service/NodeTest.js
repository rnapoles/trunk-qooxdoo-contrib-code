/* ************************************************************************

   JSON-RPC 1.0 and 2.0 implementation running on node.js
   
   Copyright:
     2010 The autors
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (original implementation)
     * Christian Boulanger (port to qooxdoo-contrib & to qooxdoo-rpc )

************************************************************************ */

/* ************************************************************************
#ignore(nodejs.sys)
#ignore(nodejs.proc)
#ignore(rpcnode.InvalidParameterException)
************************************************************************ */

/**
 * RPC-Methods that test the integration with the node.js backend,
 * in particular asynchronous operations.
 */ 
qx.Class.define("rpcnode.demo.service.NodeTest",
{
  extend : qx.core.Object,
  implement : [ rpcnode.IService ],
  
  members:
  {
    
    /**
     * Adds two values
     * @param a {Integer}
     * @param b {Integer}
     * @return {Integer}
     */
    add : function(a, b) 
    {
      a = parseFloat( a );
      b = parseFloat( b );
      if ( isNaN( a ) || isNaN( b ) )
      {
        throw new rpcnode.InvalidParameterException("Arguments must be numeric")
      }
      return a + b;
    },
    
    /**
     * Logs a notification
     * @param a {String}
     * @param b {String}
     */
    note : function(a, b)
    {
      var msg = a + ":" + b
      nodejs.sys.debug( msg );
      return msg;
      
    },
    
 
    
    /**
     * Returns the output of the "ls" shell command asynchronously.
     * We have to wrap the used method because it's callback function
     * returns more than one value.
     * 
     * @return {Object} A promise object
     */
    ls : function() 
    {
      return nodejs.promise.execute( function( callback ){
        nodejs.proc.exec("ls", function (error, stdout, stderr) {
          callback( error, stdout );
        })
      });
    },    
    
    /**
     * Returns the current working directory, using a promise
     * object
     * @return {Object}
     */
    pwd : function() 
    {
      return nodejs.promise.execute( function( callback ){
        nodejs.proc.exec("pwd", function (error, stdout, stderr) {
          callback( error, stdout );
        })
      });
    },
    
    /**
     * Echos the given parameter on the shell, asychronously.
     * You can only use ANSI characters and space, for security.
     * @param msg {String} The message to echo
     * @return {Object}
     */
    shell_echo : function( msg ) 
    {
      if( typeof msg != "string" || msg.match(/[^a-zA-Z ]/))
      {
        throw new rpcnode.InvalidParameterException("Invalid string!");
      }
      return nodejs.promise.execute( function( msg, callback ){
        nodejs.proc.exec("echo \"" + msg + "\"", function (error, stdout, stderr) {
          callback( error, stdout );
        });
      }, msg );
    },
    
    /**
     * Generates an error by calling a non-existing command on the
     * shell
     * @return {void}
     */
    shell_error : function()
    {
      return nodejs.promise.execute( function( callback ){
        nodejs.proc.exec("thisdoesnotexist", function (error, stdout, stderr) {
          callback( error );
        })
      });      
    }
  }
});
