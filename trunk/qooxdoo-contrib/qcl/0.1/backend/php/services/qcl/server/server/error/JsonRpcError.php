<?php
/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2006-2007 Derrell Lipman
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Derrell Lipman (derrell)
 *  * Christian Boulanger (cboulanger)
 */

/*
 * Base class
 */
require dirname(__FILE__) . "/AbstractErrorBehavior.php";


/*
 * class JsonRpcError
 *
 * This class allows service methods to easily provide error information for
 * return via JSON-RPC.
 */
class JsonRpcError extends AbstractErrorBehavior
{

  /**
   * The json wrapper object
   * @var JsonWrapper
   */
  var $json;

  /**
   * The id of the request
   * @var int
   */
  var $id;

  /**
   * The id of the request if script transport is used
   */
  var $scriptTransportId;


  /**
   * PHP4 constructor
   * @param JsonWrapper|JsonServer $first
   * @param int $origin
   * @param int $code
   * @param string $message
   * @param JsonServer[optional] $server
   * @return void
   */
  function JsonRpcError(
    $first,
    $origin = JsonRpcError_Origin_Server,
    $code = JsonRpcError_Unknown,
    $message = "Unknown error",
    $server=null )
  {
    $this->__construct( &$first, $origin, $code, &$server);
  }

  /**
   * PHP 5 constructor
   * @param JsonWrapper|JsonServer $first
   * @param int $origin
   * @param int $code
   * @param string $message
   * @param JsonServer[optional] $server
   * @return void
   */
  function __construct(
    $first,
    $origin = JsonRpcError_Origin_Server,
    $code = JsonRpcError_Unknown,
    $message = "Unknown error",
    $server=null )
  {

    /*
     * first argument can be json wrapper object or the server
     */
    if ( is_a( $first, "JsonWrapper" ) )
    {
      $this->json =& $first;
    }
    elseif ( is_a( $first, "JsonRpcServer" ) )
    {
      $server =& $first;
      $this->json =& $server->json;
    }


    /*
     * pass server object to parent constructor
     */
    if ( $server and ! is_a( $server, "JsonRpcServer") )
    {
      trigger_error( "JsonRpcError can only be used with a JsonRpcServer." );
    }

    /*
     * call parent constructor with error data
     */
    parent::__construct(&$server, $data);

    /*
     * Assume we're not using ScriptTransporrt
     */
    $this->scriptTransportId = ScriptTransport_NotInUse;
  }

  function SetScriptTransportId($id)
  {
    $this->scriptTransportId = $id;
  }

  /**
   * Returns the error jsonrpc data to the client
   * @param array $optional_data An optional array of key=>value pairs that should be included
   * in the array response. Must not contain the keys "error" and "id"
   */
  function SendAndExit( $optional_data=array() )
  {
    $ret = array_merge(
      array(
        "error" => $this->data,
         "id"   => $this->id
      ),
      $optional_data
    );
    $this->server->sendReply(
      $this->json->encode($ret),
      $this->scriptTransportId
    );
    exit;
  }
}


?>