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
 *
 * Usage:
 *
 * require "/path/to/RpcPhp/services/server/JsonRpcServer.php";
 * $server = new JsonRpcServer;
 * $server->start();
 *
 * Or, with a singleton pattern:
 * require "/path/to/RpcPhp/services/server/JsonRpcServer.php";
 * JsonRpcServer::run();
 *
 */

require_once dirname(__FILE__) . "/AbstractServer.php";
if ( phpversion() >= 5 )
{
  require_once dirname(__FILE__) . "/ServiceIntrospection.php";
}

/*
 * include JsonRpcError class. If you want to use your own class, include a
 * custom implementation beforehand or use AbstractServer::setErrorBehavior()
 */
if ( ! class_exists("JsonRpcError") )
{
  require_once dirname(__FILE__) . "/error/JsonRpcError.php";
}

/**
 * Constant to indicate whether script transport is used.
 * @var unknown_type
 */
define("ScriptTransport_NotInUse", -1);

/**
 * Switches error handling on or off. Override in global_settings.php
 * default: on
 *
 */
if (! defined("JsonRpcErrorHandling"))
{
  define("JsonRpcErrorHandling", "on");
}

/*
 * Whether to encode and decode Date objects the "qooxdoo way"
 *
 * JSON does not handle dates in any standard way.  For qooxdoo, we have
 * defined a format for encoding and decoding Date objects such that they can
 * be passed reliably from the client to the server and back again,
 * unaltered.  Doing this necessitates custom changes to the encoder and
 * decoder functions, which means that the standard (as of PHP 5.2.2)
 * json_encode() and json_decode() functions can not be used.  Instead we just
 * use the encoder and decoder written in PHP which is, of course, much
 * slower.
 *
 * We here provide the option for an application to specify whether Dates
 * should be handled in the qooxdoo way.  If not, and the functions
 * json_encode() and json_decode() are available, we will use them.  Otherwise
 * we'll use the traditional, PHP, slower but complete for qooxdoo
 * implementation.
 *
 * (This is really broken.  It's not possible to determine, on a system-wide
 * basis, whether Dates will be used.  This should be settable as a pragma on
 * the request so we know whether we can use the built-in decoder, and we
 * provide some way to should keep track of whether any Dates are included in
 * the response, so we can decide whether to use the built-in encoder.)
 */
if ( ! defined("handleQooxdooDates") )
{
  define( "handleQooxdooDates", true );
}


/**
 * JSON RPC server
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
   * Return singleton instance of the server
   * return JsonRpcServer
   */
  function &getInstance()
  {
    if ( ! is_object( $GLOBALS['JsonRpcServerInstance'] ) )
    {
      $GLOBALS['JsonRpcServerInstance'] =& new JsonRpcServer;
    }
    return $GLOBALS['JsonRpcServerInstance'];
  }


  /**
   * Starts a singleton instance of the server. Must be called statically.
   */
  function run()
  {
    $_this =& JsonRpcServer::getInstance();
    $_this->start();
  }

  /**
   * Starts the server, setting up error handling.
   */
  function start()
  {
    /*
     * Setup php4-style error handling. The main idea is to keep PHP from
     * messing up the JSONRPC response if a parsing or runtime error occurs,
     * and to allow the client application to handle those errors nicely
     */
    if ( JsonRpcErrorHandling == "on")
    {
      $this->setupErrorHandling();
    }
    parent::start();
  }

  /**
   * Initialize the server.
   * @return void
   */
  function initializeServer()
  {

    /*
     * Create a new instance of the json and error object
     */
    $this->json  =& new JsonWrapper();

    /*
     * set error behavior
     */
    $errorBehavior =& new JsonRpcError;
    $this->setErrorBehavior( &$errorBehavior );

    /*
     * Assume (default) we're not using ScriptTransport
     */
    $this->setScriptTransportId( ScriptTransport_NotInUse );

    /*
     * set method accessibility behavior if not already set
     *
     */
    if ( ! $this->getAccessibilityBehavior() )
    {
      $accessibilityBehavior =& new AccessibilityBehavior( &$this );
      $this->setAccessibilityBehavior( &$accessibilityBehavior );
    }
    $this->debug("Server initialized.");
  }


  /**
   * Setup a PHP4-style error handling
   * see http://forums.knownhost.com/showthread.php?p=5290
   */
  function setupErrorHandling()
  {

    //This may seem counterintuitive since our goal is to
    //hide errors from users, but our output buffer callback will
    //need to see everything in order to catch the bad stuff.
    ini_set('display_errors', 'On');

    /*
     * start buffering to catch errors with handler function
     */
    ob_start( array($this,"jsonrpc_catch_errors") );

    /*
     * This will not always work, so do some more hacking to
     * comment out uncaught errors. You'll need to examine the
     * http response to see the uncaught errors!
     */
    ini_set('error_prepend_string', '<phpfatalerror>');
    ini_set('error_append_string', '</phpfatalerror>');

    /*
     * error handler function for php jsonrpc
     */
    set_error_handler( array($this,"jsonRpcErrorHandler") );
  }



  /**
   * Returns server data component of request
   * @return mixed
   */
  function getServerData( $key= null)
  {
    if ( is_null( $key ) )
    {
      return $this->input->server_data;
    }
    elseif ( is_string( $key ) )
    {
      return $this->input->server_data->$key;
    }
    else
    {
      trigger_error("Invalid parameter");
    }
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
          /*
           * We found literal POSTed json-rpc data (we hope)
           */
          $input = file_get_contents('php://input');

          /*
           * if we have "new Date" in the input, use the PHP-only
           * json encoder/decoder. This is a bit of a hack since
           * we cannot distinguish between a real json-Date and the
           * occurrence of the string "new Date(" in arbitrary string
           * data.
           */
          if ( strstr($input, "new Date(") )
          {
            $this->json->useJsonClass();
          }

          /*
           * decode json data
           */
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
      $this->setScriptTransportId($_GET["_ScriptTransport_id"]);
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

  /**
   * error handling callback function
   * php4 cannot handle all errors, that's why we have to use a
   * workaround using output buffering (see post by
   * smp at ncoastsoft dot com at
   *   http://www.php.net/manual/en/function.set-error-handler.php
   * and http://forums.knownhost.com/showthread.php?p=5290
   */
  function jsonrpc_catch_errors( $buffer )
  {
    if (preg_match("|(<phpfatalerror>)(.+)(</phpfatalerror>)|", $buffer, $regs) )
    {
      /*
       * parse error string from PHP error message
       */
      $err = html_entity_decode(preg_replace("/<.*?>/","",$regs[2]));

      /*
       * log error message
       */
      JsonRpcServer::logError("*** Error: $err");

      /*
       * return error formatted as a JSONRPC error response
       */
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
      /*
       * Buffer does not contain a php error message, so return
       * it unmodified.
       */
      return $buffer;
    }
  }


  /**
   * jsonrpc error handler to output json error response messages
   */
  function jsonRpcErrorHandler($errno, $errstr, $errfile, $errline)
  {
    /*
     * Determine error type
     * @todo: remove those which are not captured by set_error_handler()
     */
    switch($errno)
    {
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

    /*
     * Error message
     */
    $errmsg = "$errtype: $errstr in $errfile, line $errline ";

    /*
     * log error message
     */
    JsonRpcServer::logError( $errmsg );

    /*
     * respect error_reporting level
     */
    $errno = $errno & error_reporting();
    if ($errno == 0) return true;

    /*
     * return jsonified error message
     */
    $this->setError($errno, $errmsg);
    $this->sendErrorAndExit();

    // never gets here
  }

  /**
   * Hook for subclasses to locally log the error message
   * @param $msg
   * @return unknown_type
   */
  function logError( $msg )
  {
    @error_log( $msg . "\n", 3, JsonRpcDebugFile );
  }

}
?>