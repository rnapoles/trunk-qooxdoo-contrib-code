<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */
require_once "qcl/core/Object.php";

/**
 * Static class for convenient and global access to actual server singleton object
 */
class qcl_server_Server extends qcl_core_Object
{

  /**
   * The actual server object
   * @var AbstractServer
   */
  var $serverObject;

  /**
   * Returns the singleton instance of this class
   * @return qcl_server_Server
   */
  function &getInstance( )
  {
    if ( ! isset( $GLOBALS[__CLASS__] ) )
    {
      $GLOBALS[__CLASS__] =& new qcl_server_Server;
    }
    return $GLOBALS[__CLASS__];
  }

  /**
   * Start a server that handles the request type (JSONRPC, POST, ...).
   * Can be called statically.
   * @param array $servicePaths An array of paths to the services used
   * by the server
   * @return void
   */
  function start( $servicePaths )
  {

    /*
     * if POST request, use post request server extension
     */
    if ( isset( $_REQUEST['service'] )  )
    {
      require_once "services/server/PostRpcServer.php";
      $serverObj =& PostRpcServer::getInstance();
    }

    /*
     * use qcl jsonrpc server extension
     */
    else
    {
      require "qcl/server/JsonRpc.php";
      $serverObj =& qcl_server_JsonRpc::getInstance();
    }

    /*
     * configure service paths
     */
    $serverObj->setServicePaths( $servicePaths );

    /*
     * save and start server
     */
    $server =& qcl_server_Server::getInstance();
    $server->serverObject =& $serverObj;
    $serverObj->start();
  }


  /**
   * Returns the current server object
   * @return qcl_server_JsonRpc|null
   */
  function &getServerObject()
  {
    $_this =& qcl_server_Server::getInstance();
    return $_this->serverObject;
  }

  /**
   * Returns the current controller object
   * @return qcl_data_controller_Controller
   */
  function &getController()
  {
    $serverObj =& qcl_server_Server::getServerObject();
    return $serverObj->getController();
  }

  /**
   * Returns the current server data sent by the client
   * @param string $key If given, return only the value of the given key
   * @return string|array
   */
  function getServerData( $key=null )
  {
    $serverObj =& qcl_server_Server::getServerObject();
    return $serverObj->getServerData( $key );
  }

  /**
   * Return the url of the server, which is the URL of the
   * top including script.
   * @return string
   */
  function getUrl()
  {
    return "http://" . $_SERVER["HTTP_HOST"] . $_SERVER["SCRIPT_NAME"];
  }

  /**
   * Aborts the request with an error message
   * @param $message
   * @return void
   */
  function abort( $message )
  {
    $serverObj =& qcl_server_Server::getServerObject();
    $serverObj->setError( null, $message );
    $serverObj->sendErrorAndExit();
    exit;
  }

  /**
   * Aborts the request and forces a data response
   * @param $data
   * @return void
   */
  function forceResponse( $data )
  {
    $serverObj =& qcl_server_Server::getServerObject();
    echo $serverObj->json->encode( $data );
    exit;
  }

  /**
   * Returns the ip of the requesting client. Can be called
   * statically.
   * @return string
   */
  function getRemoteIp()
  {
    return $_SERVER['REMOTE_ADDR'];
  }

}
?>