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

/*
 * bootstrap the library
 */
require_once dirname( dirname(__FILE__) ) . "/bootstrap.php";

/*
 * import all dependencies
 */
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
   * @param array $additionalServicePaths An array of paths to the services used
   * by the server in addition to the qcl and application classes
   * @param string|null $testData If provided, use the string data as the input
   *  request for test purposes
   * @return void
   */
  public function start( $additionalServicePaths = null, $testData = null )
  {
    if( is_array($additionalServicePaths) and count( $additionalServicePaths ) )
    {
      $servicePaths = array_merge(
        array( QCL_CLASS_PATH, APPLICATION_CLASS_PATH ), $additionalServicePaths
      );
    }
    
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
     * if GET request, use post request server extension
     */
    elseif ( isset( $_REQUEST['service'] )  )
    {
      qcl_import( "qcl_server_JsonRpcRestServer" );
      $serverObj = new qcl_server_JsonRpcRestServer();
    }

    /*
     * if test data is provided, use the test server
     */
    elseif ( $testData !== null )
    {
      qcl_import( "qcl_server_JsonRpcTestServer" );
      $serverObj = new qcl_server_JsonRpcTestServer( $testData );
    }

    /*
     * in all other cases, use qcl jsonrpc server extension
     */
    else
    {
      qcl_import( "qcl_server_JsonRpcServer" );
      $serverObj = new qcl_server_JsonRpcServer();
    }

    /*
     * save and start server
     */
    $serverObj->setServicePaths( $servicePaths );
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