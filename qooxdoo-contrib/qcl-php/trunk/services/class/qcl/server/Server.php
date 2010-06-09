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

require_once "qcl/bootstrap.php";
qcl_import("qcl_core_Object");

/**
 * Static class for global access to actual server singleton object
 */
class qcl_server_Server
  extends qcl_core_Object
{

  /**
   * The actual server object
   * @var AbstractServer
   */
  private $serverInstance;

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
   * @param array $servicePaths
   * @param string|null $testData If provided, use the string data as the input
   *  request for test purposes
   * @return void
   */
  public static function run( $servicePaths, $testData=null )
  {
    $_this = self::getInstance();
    $_this->start( $servicePaths, $testData );
  }

  /**
   * Start a server that handles the request type (JSONRPC, POST, ...).
   * @param array $servicePaths An array of paths to the services used
   * by the server
   * @param string|null $testData If provided, use the string data as the input
   *  request for test purposes
   * @return void
   */
  public function start( $servicePaths=array(), $testData = null )
  {
    /*
     * if this is a file upload, call upload method and exit
     */
    if ( count( $_FILES ) )
    {
      qcl_import( "qcl_server_Upload" );
      $serverObj = new qcl_server_Upload();
    }

    /*
     * if it is a download request, call download method and exit
     */
    elseif ( $_REQUEST['download'] )
    {
      qcl_import( "qcl_server_Download" );
      $serverObj = new qcl_server_Download();
    }

    /*
     * if POST request, use post request server extension
     */
    elseif ( isset( $_REQUEST['service'] )  )
    {
      require_once "services/server/PostRpcServer.php";
      $serverObj = new PostRpcServer();
      $serverObj->setServicePaths( $servicePaths );
    }

    /*
     * if test data is provided, use the test server
     */
    elseif ( $testData !== null )
    {
      qcl_import( "qcl_server_JsonRpcTestServer" );
      $serverObj = new qcl_server_JsonRpcTestServer( $testData );
      $serverObj->setServicePaths( $servicePaths );
    }

    /*
     * in all cases, use qcl jsonrpc server extension
     */
    else
    {
      qcl_import( "qcl_server_JsonRpcServer" );
      $serverObj = new qcl_server_JsonRpcServer();
      $serverObj->setServicePaths( $servicePaths );
    }

    /*
     * save and start server
     */
    $this->serverInstance = $serverObj;
    $serverObj->start();
  }


  /**
   * Returns the current server object
   * @return qcl_server_JsonRpcServer
   */
  public function getServerInstance()
  {
    return $this->serverInstance;
  }

  /**
   * Return the url of the server, which is the URL of the
   * top including script.
   * @return string
   */
  static public function getUrl()
  {
    return "http://" . $_SERVER["HTTP_HOST"] . $_SERVER["SCRIPT_NAME"];
  }

}
?>