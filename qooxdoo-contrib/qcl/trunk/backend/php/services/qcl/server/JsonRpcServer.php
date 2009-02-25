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
 *  * Derrell Lipman (derrell)
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
require_once dirname(__FILE__) . "/AbstractServer.php";
require_once dirname(__FILE__) . "/JsonRpcError.php";

/**
 * Constant to indicate whether script transport is used.
 * @var unknown_type
 */
define("ScriptTransport_NotInUse", -1);

/**
 * switches error handling on or off. Override in global_settings.php
 * default: on
 *
 */
if (! defined("JsonRpcErrorHandling"))
{
  define("JsonRpcErrorHandling",             "on");
}

/**
 * JSON RPC server
 * @author Christian Boulanger
 */
class JsonRpcServer extends AbstractServer
{
  
  /**
   * The id of the request if using script transport
   */
  var $scriptTransportId;  
  
  /**
   * The json wrapper object
   * @var JsonWrapper
   */
  var $json;
  
  /**
   * Initialize the server.
   * @return void
   */
  function initializeServer()
  {
    
    /*
     * Start or join an existing session
     */
    session_start();
    
    /*
     * Create a new instance of the json and error object
     */
    $this->json  =& new JsonWrapper();
    
    /*
     * set error behavior
     */
    $errorBehavior =& new JsonRpcError( &$this );
    $this->setErrorBehavior( &$errorBehavior );
    
    /* 
     * Assume (default) we're not using ScriptTransport
     */
    $this->setScriptTransportId( ScriptTransport_NotInUse );   
    
    /*
     * method accessibility behavior
     */
    $accessibilityBehavior =& new AccessibilityBehavior( &$this );
    $this->setAccessibilityBehavior( &$accessibilityBehavior );
    
    $this->debug("Server initialized.");
  }  

  function getServerData()
  {
    return $this->input->server_data;
  }
  
  /**
   * Setter for script transport id. Sets the id of the
   * error behavior object, too.
   * @param int $id
   * @return void
   */
  function setScriptTransportId ( $id)
  {
    $this->scriptTransportId = $_GET["_ScriptTransport_id"];
    $errorBehavior =& $this->getErrorBehavior();
    $errorBehavior->SetScriptTransportId( $id );
  }
  
  /**
   * Getter for script transport id
   * @return int 
   */
  function getScriptTransportId()
  {
    return $this->scriptTransportId;
  }
  

  /**
   * Return the input as a php object if a valid
   * request is found, otherwise return false
   * @return StdClass|false
   */
  function getInput()
  {
    if ( $_SERVER["REQUEST_METHOD"] == "POST" )
    {
      /*
       * For POST data, the only acceptable content type is application/json.
       */
      switch(substr( $_SERVER["CONTENT_TYPE"],
      0,
      strcspn( $_SERVER["CONTENT_TYPE"], ";" ) ) )
      {
        case "application/json":
          /* We found literal POSTed json-rpc data (we hope) */
          $input = file_get_contents('php://input');
          $input = $this->json->decode($input);
          break;

        default:
          /*
           * This request was not issued with JSON-RPC so echo the error rather
           * than issuing a JsonRpcError response.
           */
          $this->setError(
          null,
                "JSON-RPC request expected; " .
                "unexpected data received"
                );
      }
    }
    else if (
      $_SERVER["REQUEST_METHOD"] == "GET" &&
      isset( $_GET["_ScriptTransport_id"]) &&
      $_GET["_ScriptTransport_id"] != ScriptTransport_NotInUse &&
      isset( $_GET["_ScriptTransport_data"] ) )
    {
      /*
       * We have what looks like a valid ScriptTransport request
       */
      $this->setScriptTransportId($scriptTransportId);
      $input = $_GET["_ScriptTransport_data"];
      $input = $this->json->decode(get_magic_quotes_gpc()
      ? stripslashes($input)
      : $input);
    }
    else
    {
      /*
       * This request was not issued with JSON-RPC so echo the error rather than
       * issuing a JsonRpcError response.
       */
      $this->setError( JsonRpcError_Unknown, "Services require JSON-RPC<br>" );
      return false;
    }

    /*
     * Ensure that this was a JSON-RPC service request
     */
    if (! isset($input) ||
    ! isset($input->service) ||
    ! isset($input->method) ||
    ! isset($input->params))
    {
      /*
       * This request was not issued with JSON-RPC so echo the error rather than
       * issuing a JsonRpcError response.
       */
      $this->setError(
      JsonRpcError_Unknown,
          "JSON-RPC request expected; service, method or params missing<br>"
          );
          return false;
    }
    return $input;
  }  
  
  /**
   * Format the response string, given the service method output.
   * By default, wrap it in a result map and encode it in json.
   * @param mixded $output
   * @return string
   */
  function formatOutput( $output )
  {
    $ret = array(
      "result"  => $output,
       "id"     => $this->getId()
    );

    return $this->json->encode($ret);
  }  
}
?>