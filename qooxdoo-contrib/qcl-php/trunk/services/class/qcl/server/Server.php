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
  private $serverObject;

  /**
   * Returns the singleton instance of this class
   * @return qcl_server_Server
   */
  static function getInstance( )
  {
    return qcl_getInstance( __CLASS__ );
  }

  /**
   * Static method to start the application
   * @return void
   */
  public static function run( $servicePaths )
  {
    $_this = self::getInstance();
    $_this->start( $servicePaths );
  }

  /**
   * Start a server that handles the request type (JSONRPC, POST, ...).
   * @param array $servicePaths An array of paths to the services used
   * by the server
   * @return void
   */
  public function start( $servicePaths )
  {

    /**
     * Check service classes
     */
    if ( ! is_array( $servicePaths) )
    {
      $this->raiseError("You must supply an array of paths to the service classes.");
    }

    /*
     * if POST request, use post request server extension
     */
    if ( isset( $_REQUEST['service'] )  )
    {
      require_once "services/server/PostRpcServer.php";
      $serverObj = PostRpcServer::getInstance();
    }

    /*
     * use qcl jsonrpc server extension
     */
    else
    {
      require "qcl/server/JsonRpc.php";
      $serverObj = qcl_server_JsonRpc::getInstance();
    }

    /*
     * configure service paths
     */
    $serverObj->setServicePaths( $servicePaths );

    /*
     * save and start server
     */
    $this->serverObject = $serverObj;
    $serverObj->start();
  }


  /**
   * Returns the current server object
   * @return qcl_server_JsonRpc
   */
  public function getServerObject()
  {
    return $this->serverObject;
  }

  /**
   * Returns the current controller object
   * @return qcl_data_controller_Controller
   */
  public function getController()
  {
    return $this->getServerObject()->getController();
  }

  /**
   * Returns the current server data sent by the client
   * @param string $key If given, return only the value of the given key
   * @return string|array
   */
  public function getServerData( $key=null )
  {
    return $this->getServerObject()->getServerData( $key );
  }

  /**
   * Return the url of the server, which is the URL of the
   * top including script.
   * @return string
   */
  public function getUrl()
  {
    return "http://" . $_SERVER["HTTP_HOST"] . $_SERVER["SCRIPT_NAME"];
  }

  /**
   * Aborts the request with an error message
   * @param $message
   * @return void
   */
  public function abort( $message )
  {
    $serverObj = $this->getServerObject();
    $serverObj->getErrorBehavior()->setError( null, $message );
    $serverObj->getErrorBehavior()->sendAndExit();
    exit;
  }

  /**
   * Aborts the request and forces a data response
   * @param $data
   * @return void
   */
  public function forceResponse( $data )
  {
    $json = new JsonWrapper();
    echo $json->encode( $data );
    exit;
  }

  /**
   * Returns the ip of the requesting client. Can be called
   * statically.
   * @return string
   */
  public function getRemoteIp()
  {
    return $_SERVER['REMOTE_ADDR'];
  }

}
?>