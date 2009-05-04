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
 * Example JSON RPC server for PHP5 with error catching
 * 
 * Usage: 
 * $server = new JsonRpcServerPhp5();
 * $server->start();
 * 
 */
class JsonRpcServerPhp5 extends JsonRpcServer
{

  /**
   * Return singleton instance of the server
   * return JsonRpcServerPhp5
   */
  function &getInstance()
  {
    if ( ! is_object( $GLOBALS['JsonRpcServerInstance'] ) )
    {
      $GLOBALS['JsonRpcServerInstance'] =& new JsonRpcServerPhp5;
    }
    return $GLOBALS['JsonRpcServerInstance'];
  }    
  
  /**
   * Overriding start() method to catch errors
   */
  function start()
  {
    try  
    {
      parent::start();
    }
    catch( Exception $e )
    {
      $this->setError( JsonRpcError_ScriptError, "***" . $e->getMessage() );
      $this->logError( (string) $e );
      $this->sendErrorAndExit();
    }
  }
}
?>