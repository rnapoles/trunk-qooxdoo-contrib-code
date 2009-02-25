<?php

/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2006-2009 Derrell Lipman, Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger) Error-Handling and OO-style rewrite
 */

/*
 * This is a simple JSON-RPC server.  We receive a service name in
 * dot-separated path format and expect to find the class containing the
 * service in a file of the service name (with dots converted to slashes and
 * ".php" appended).
 */


/*
 * Dependencies 
 */
require_once dirname(__FILE__) . "/JsonRpcServer.php";


/**
 * Example JSON RPC server for PHP4 with error handling
 * 
 * Usage: 
 * $server = new JsonRpcServerPhp4();
 * $server->start();
 * 
 */
class JsonRpcServerPhp4 extends JsonRpcServer
{

  
  /**
   * Overriding the start() method for PHP4 to do error handling
   * The main idea of this code is to keep PHP from messing up 
   * the JSONRPC response if a parsing or runtime error occurs, 
   * and to allow the client application to handle those errors nicely
   */
  function start()
  {
    /**
     * main error handling code
     */
    if (JsonRpcErrorHandling == "on")
    {
      /*
       * start buffering to catch errors with handler function
       */
      ob_start( array($this,"jsonrpc_catch_errors") );
    
      /*
       * This will not always work, so do some more hacking to 
       * comment out uncaught errors. You'll need to examine the
       * http response to see the uncaught errors!
       */
      ini_set('error_prepend_string', "/*");
      ini_set('error_append_string', "*/");
    
      /*
       * error handler function for php jsonrpc
       */
      set_error_handler( array($this,"jsonRpcErrorHandler") );
    }
    
    /*
     * call parent method
     */
    parent::start();
  }
  
  /**
   * error handling callback function
   * php4 cannot handle all errors, that's why we have to use a
   * workaround using output buffering (see post by
   * smp at ncoastsoft dot com at
   *   http://www.php.net/manual/en/function.set-error-handler.php
   */
  function jsonrpc_catch_errors($buffer)
  {
    if (ereg("(error</b>:)(.+)(<br)", $buffer, $regs) )
    {
      // parse error string from PHP error message
      $err = preg_replace("/<.*?>/","",$regs[2]);
  
      // return error formatted as a JSONRPC error response
      return
        '{' .
        '  error:' .
        '  {' .
        '    "origin":' . JsonRpcError_Origin_Server . ',' . 
        '    "code":' .  JsonRpcError_ScriptError . ',' .
        '    "message":"Fatal PHP Error: '. addslashes($err) .
        ' "}' .
        '}';
    }
    else
    {
      // Buffer does not contain a php error message, so return it
      // unmodified.
      return $buffer;
    }
  }
  
  
  /**
   * jsonrpc error handler to output json error response messages
   */
  function jsonRpcErrorHandler($errno, $errstr, $errfile, $errline)
  {
    // determine error type
    // todo: remove those which are not captured by set_error_handler()
    switch($errno){
      case E_ERROR:
        $errtype= "Error";
        break;
  
      case E_WARNING:
        $errtype= "Warning";
        break;
  
      case E_PARSE:
        $errtype= "Parse Error";
        break;
  
      case E_NOTICE:
        $errtype= "Notice";
        break;
  
      case E_CORE_ERROR:
        $errtype= "Core Error";
        break;
  
      case E_CORE_WARNING:
        $errtype= "Core Warning";
        break;
  
      case E_COMPILE_ERROR:
        $errtype= "Compile Error";
        break;
  
      case E_COMPILE_WARNING:
        $errtype= "Compile Warning";
        break;
  
      case E_USER_ERROR:
        $errtype= "User Error";
        break;
  
      case E_USER_WARNING:
        $errtype= "User Warning";
        break;
  
      case E_USER_NOTICE:
        $errtype= "User Notice";
        break;
  
      case E_STRICT:
        $errtype= "Strict Notice";
        break;
  
      case E_RECOVERABLE_ERROR:
        $errtype= "Recoverable Error";
        break;
  
      default:
        $errtype= "Unknown error ($errno)";
        break;
    }
  
    // respect error_reporting level
    $errno = $errno & error_reporting();
    if($errno == 0) return true;
  
    $errmsg =   "PHP $errtype in $errfile, line $errline: $errstr";
  
    switch($errno)
    {
      case E_WARNING:
      case E_NOTICE:
        $errmsg = str_replace( array("<br>","<br/>","<br />"),"\n", $errmsg ) ;
        $errmsg = strip_tags($errmsg) ."\n\n";
        
      default:
        $this->debug( $errmsg );
        /*
         * return jsonified error message
         */
        $error->SetError($errno, $errmsg);
        $error->SendAndExit();
    }
    // never gets here
  }
   
}
?>