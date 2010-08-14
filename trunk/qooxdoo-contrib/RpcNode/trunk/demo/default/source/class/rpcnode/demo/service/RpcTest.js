/* ************************************************************************

   JSON-RPC 1.0 and 2.0 implementation running on node.js
   
   Copyright:
     2010 The autors
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman
     * Christian Boulanger 

************************************************************************ */

/* ************************************************************************
#ignore(rpcnode.InvalidParameterException)
************************************************************************ */

/**
 * This is the standard qooxdoo test class.  There are tests for each of the
 * primitive types here, along with standard named tests "echo", "sink" and
 * "sleep".
 */
qx.Class.define("rpcnode.demo.service.RpcTest",
{
  extend : qx.core.Object,
  implement : [ rpcnode.IService ],
  
  members:
  {
    
    /**
     * Echo the (one and only) parameter.
     *
     * @param msg {String} The message to be echo'ed
     * @return {String}
     */
    echo : function( msg )
    {
      if ( arguments.length != 1 )
      {
        throw new rpcnode.InvalidParameterException();
      }
      return "Client said: [" + msg + "]";
    },
  
    /**
     * Sleep for the number of seconds specified by the parameter.
     * @param seconds {Integer}
     */
    sleep : function(seconds)
    {
      return nodejs.promise.when( nodejs.promise.delay(seconds*1000), function(){
        return "Waited " + seconds + " seconds!";
      });
    },

    /**
     * Returns an integer value.
     * @return {Number}
     */
    getInteger : function()
    {
      return 1;
    },
  
    /**
     * Returns a float value
     * @return {Number}
     */
    getFloat : function()
    {
      return 1/3;
    },
  
    /**
     * Returns a string value
     * @return {String}
     */
    getString : function()
    {
      return "Hello world";
    },
  
    /**
     * Returns a string that needs escaping
     * @return {String}
     */
    getBadString : function()
    {
      return "<!DOCTYPE HTML \"-//IETF//DTD HTML 2.0//EN\">";
    },
  
    /**
     * Returns an array of integers
     * @return {Array}
     */
    getArrayInteger : function()
    {
      return [1, 2, 3, 4];
    },
  
    /**
     * Returns an array of strings
     * @return {Array}
     */
    getArrayString : function()
    {
      return ["one", "two", "three", "four"];
    },
  
    /**
     * Returns a simple object
     * @return {Object}
     */
    getObject : function()
    {
      return { "foo" : "bar" }
    },
  
    /**
     * Returns boolean true
     * @return {Boolean}
     */
    getTrue : function()
    {
      return true;
    },
  
    /**
     * Returns boolean false
     * @return {Boolean}
     */
    getFalse : function()
    {
      return false;
    },
  
    /**
     * Returns null
     * @return {null}
     */
    getNull : function()
    {
      return null;
    },
  
    /**
     * Checks if the given argument is an integer
     * @param arg {Integer}
     * @return {Boolean}
     */
    isInteger : function( arg )
    {
      return qx.lang.Type.isNumber( arg );
    },
  
    /**
     * Checks if the given argument is a floating point number
     * @param arg {Integer} 
     * @return {Boolean}
     */    
    isFloat : function( arg )
    {
      return qx.lang.Type.isNumber( arg );
    },
  
    /**
     * Checks if argument is a string
     * @param  arg {String} 
     * @return {Boolean}
     */
    isString : function( arg )
    {
      return qx.lang.Type.isString( arg );
    },
  
    /**
     * Checks if argument is a boolean
     * @param arg {Boolean} 
     * @return {Boolean}
     */
    isBoolean : function( arg )
    {
      return qx.lang.Type.isBoolean( arg );
    },
  
    /**
     * Checks if argument is an array
     * @param arg {Array}
     * @return {Boolean}
     */
    isArray : function( arg )
    {
      return qx.lang.Type.isArray( arg );
    },
  
    /**
     * Checks if argument is an object
     * @param arg {Object}
     * @return {Boolean}
     */
    isObject : function( arg )
    {
      return qx.lang.Type.isObject( arg );
    },
  
    /**
     * Checks if argument is null
     * @param arg {null}
     * @return {Boolean}
     */
    isNull : function( arg )
    {
      return arg === null;
    },
  
    /**
     * Returns the arguments as an array. The test suite
     * sends six arguments. Since the number of arguments
     * is strictly enforced, we need to provide them all in
     * the signature.
     * 
     * @param a {}
     * @param b {}
     * @param c {}
     * @param d {}
     * @param e {}
     * @param f {}
     * @return {Array}
     */
    getParams : function(a,b,c,d,e,f)
    {
      return qx.lang.Array.fromArguments( arguments );
    },
  
    /**
     * Return the first parameter. The test suite
     * sends six arguments. Since the number of arguments
     * is strictly enforced, we need to provide them all in
     * the signature.
     * 
     * @param a {}
     * @param b {}
     * @param c {}
     * @param d {}
     * @param e {}
     * @param f {}
     * @return {}
     */
    getParam : function( a,b,c,d,e,f )
    {
      return arguments[0];
    },
  
    /**
     * Return the current timestamp
     * @return {String}
     */
    getCurrentTimestamp : function()
    {
      return (new Date()).toLocaleString();
    },
  
    /**
     * Raise an error
     */
    getError : function()
    {
       throw new rpcnode.RpcException("This is an application-provided error thrown on purpose.",1000);
    }
  }
});