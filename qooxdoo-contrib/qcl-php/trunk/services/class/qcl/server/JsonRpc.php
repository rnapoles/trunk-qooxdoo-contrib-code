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
require_once "services/server/JsonRpcServer.php";
require_once "qcl/event/Dispatcher.php";
require_once "qcl/event/message/Bus.php";
require_once "qcl/server/Response.php";

/**
 * Upload path constant
 */
if ( ! defined("QCL_UPLOAD_PATH") )
{
  define("QCL_UPLOAD_PATH", "../../var/tmp" );
}

/**
 * Maximal file size constant (in kilobytes)
 */
if ( ! defined("QCL_UPLOAD_MAXFILESIZE") )
{
  define("QCL_UPLOAD_MAXFILESIZE", 30000 );
}

/**
 * QCL Server Class, extends the JsonRpcServer with the following
 * features:
 * - A debug console
 * - File uploads and downloads
 * @author Christian Boulanger (cboulanger)
 */
class qcl_server_JsonRpc extends JsonRpcServer
{

  /**
   * The called controller object
   * @var qcl_data_controller_Controller
   */
  private $_controller;


  /**
   * Constructor
   */
  function __construct()
  {

    /*
     * Initialize the server, including error
     * catching etc.
     */
    $this->initializeServer();

  }

  /**
   * Starts a singleton instance of the server. Must be called statically.
   */
  public static function run()
  {
    $_this = self::getInstance();
    $_this->start();
  }

  /**
   * Return singleton instance of the server
   * return JsonRpcServer
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }

  /**
   * Returns the current controller instance, if any.
   * @return qcl_data_controller_Controller
   */
  public function getController()
  {
    return $this->_controller;
  }

  /**
   * Getter for the access manager
   * @return qcl_access_Behavior
   */
  public function getAccessBehavior()
  {
    static $accessBehavior = null;
    if ( is_null($accessBehavior) )
    {
      require_once "qcl/access/Behavior.php";
      $accessBehavior = new qcl_access_Behavior();
    }
    return $accessBehavior;
  }

  /**
   * Getter for response object
   * @return qcl_server_Response
   */
  public function getResponseObject()
  {
    return qcl_server_Response::getInstance();
  }

  /**
   * Getter for application singleton instance.
   * Returns null if no application exists.
   * @return qcl_application_Application
   */
  public function getApplication()
  {
    if ( class_exists("qcl_application_Application") )
    {
      return qcl_application_Application::getInstance();
    }
    return null;
  }

  /**
   * Getter for event dispatcher
   * @return qcl_event_Dispatcher
   */
  public function getEventDispatcher()
  {
    return qcl_event_Dispatcher::getInstance();
  }

  /**
   * Getter for message bus object
   * @return qcl_event_message_Bus
   */
  public function getMessageBus()
  {
    return qcl_event_message_Bus::getInstance();
  }

  /**
   * Override start method.
   * @see JsonRpcServer::start()
   */
  public function start()
  {
    /*
     * if this is a file upload, call upload method and exit
     */
    if ( count( $_FILES ) )
    {
      $this->uploadFile();
      exit;
    }

    /*
     * if it is a download request, call download method and exit
     */
    if ( $_REQUEST['download'] )
    {
      $this->downloadFile();
      exit;
    }

    /*
     * Otherwise, start jsonrpc server
     */
    parent::start();
  }


  /**
   * @override
   * @see JsonRpcServer::getServiceObject()
   */
  public function getServiceObject( $className )
  {
    /*
     * get service object from parent method
     */
    $serviceObject = parent::getServiceObject( $className );

    /*
     * store service object
     */
    $this->_controller = $serviceObject;

    return $serviceObject;
  }

  /**
   * This will not only check if the method exists, but also
   * check
   */
  public function checkServiceMethod( $serviceObject, $method )
  {
    if ( method_exists( $serviceObject, "hasMixinMethod" )
      and $serviceObject->hasMixinMethod( $method ) )
    {
      return true;
    }
    return parent::checkServiceMethod( $serviceObject, $method );
  }

  /**
   * Check the accessibility of service object and service
   * method. Aborts request when access is denied.
   * @return void
   */
  public function checkAccessibility( $serviceObject, $method )
  {
    $this->getAccessBehavior()->controlAccess( $serviceObject, $method );
  }

  /**
   * Format the response string, given the service method output.
   * By default, wrap it in a result map and encode it in json.
   * @param mixded $output
   * @return string
   */
  public function formatOutput( $data )
  {
    /*
     * response object
     */
    $response = $this->getResponseObject();

    /*
     * request id
     */
    $requestId = $this->getId();
    $response->setId( $requestId );

    /*
     * events and messages
     */
    $app = $this->getApplication();
    if ( $app and $app->getIniValue("service.event_transport") == "on" )
    {
      $events    = $this->getEventDispatcher()->getServerEvents();
      $response->setEvents( $events );
      $sessionId = $this->getAccessBehavior()->getSessionId();
      $messages  = $this->getMessageBus()->getServerMessages( $sessionId );
      $response->setMessages( $messages );
    }

    if( is_a( $data, "qcl_data_Result" ) )
    {
      $data = $data->toArray();
    }
    $response->setData( $data );
    return $this->json->encode( $response->toArray() );
  }

  /**
   * Uploads a single file to the temporary folder.
   * Authentication an be done in two different ways:
   * 1) The calling client provides a valid session id in the URL ("?sessionId=a8dab9das...")
   * 2) If this is not provided, the server responds by presenting a http authentication request
   */
  public function uploadFile()
  {
    $this->info("Starting upload ...");

    /*
     * check if upload directory is writeable
     */
    if ( ! is_writable( QCL_UPLOAD_PATH ) )
    {
      $this->info("### Error: Upload path is not writeable.");
      $this->abort("Error on Server.");
    }

    /*
     * authentication
     */
    $sessionId = $_REQUEST['sessionId'];
    $userController = $this->getAccessBehavior()->getAccessController();
    if ( ! $sessionId or
         ! $userController->isValidUserSession( $sessionId ) )
    {
      /*
       * check http basic authentication
       */
      $username = $_SERVER['PHP_AUTH_USER'];
      $password = $_SERVER['PHP_AUTH_PW'];
      if ( ! $username or
           ! $userController->authenticate( $username, $password ) )
      {
        header('WWW-Authenticate: Basic realm="Upload Area"');
        header('HTTP/1.0 401 Unauthorized');
        exit;
      }
    }

    /*
     * Check active user
     * @todo add config key to allow anonymous uploads
     */
    $activeUser  = $userController->getActiveUser();
    //$configModel = $userController->getConfigModel();
    if ( $activeUser->isAnonymous() )
    {
      $this->abort( "Anonymous uploads are not permitted.");
    }

    $this->info(
      "Upload authorized for " . $activeUser->username() .
      "(Session #" . $userController->getSessionId() . ")."
    );

    /*
     * handle all received files
     */
    foreach ( $_FILES as $fieldName => $file )
    {
      /*
       * check file size
       */
      if ( $file['size'] > QCL_UPLOAD_MAXFILESIZE * 1024)
      {
         $this->abort( "File '$fieldName' exceeds maximum filesize: " . QCL_UPLOAD_MAXFILESIZE . " kByte.");
      }

      /*
       * get file info
       */
      $tmp_name  = $file['tmp_name'];
      $file_name = $file['name'];

      /*
       * check file name for validity
       */
      if ( strstr($file_name, ".." ) )
      {
        $this->abort( "Illegal filename." );
      }

      /*
       * target path
       */
      $tgt_path  = QCL_UPLOAD_PATH . "/{$sessionId}_{$file_name}";
      //$this->debug( "Moving uploaded file to $tgt_path ..." );

      /*
       * check if file exists
       */
      if ( file_exists ( $tgt_path) )
      {
        $this->info( "File '$tgt_path' exists. Not uploading" );
        $this->abort( "File '$file_name' exists." );
      }

      /*
       * move temporary file to target location and check for errors
       */
      if ( ! move_uploaded_file( $tmp_name, $tgt_path ) or
           ! file_exists( $tgt_path ) )
      {
        $this->info( "Problem saving the file to '$tgt_path'." );
        $this->echoWarning( "Problem saving file '$file_name'." );
      }

      /*
       * report upload succes
       */
      else
      {
        $this->echoReply( "Upload of '$file_name' successful." );
        $this->info("Uploaded file to '$tgt_path'");
      }
    }

    /*
     * end of script
     */
    exit;
  }

  /**
   * Download a file, given its datasource
   * @return unknown_type
   */
  public function downloadFile()
  {

    //$this->debug("Starting download ...");

    $filename   = $_REQUEST['download'];
    $datasource = $_REQUEST['datasource'];
    $sessionId  = $_REQUEST['sessionId'];

    if ( ! $filename or ! $datasource or ! $sessionId )
    {
      echo "Invalid parameters.";
      exit;
    }

    /*
     * authentication
     */
    $userController = $this->getUserController();
    if ( ! $sessionId or
         ! $userController->isValidUserSession( $sessionId ) )
    {
      /*
       * check http basic authentication
       */
      $username = $_SERVER['PHP_AUTH_USER'];
      $password = $_SERVER['PHP_AUTH_PW'];
      if ( ! $username or
           ! $userController->authenticate( $username, $password ) )
      {
        header('WWW-Authenticate: Basic realm="Download Area"');
        header('HTTP/1.0 401 Unauthorized');
        exit;
      }
    }

    /*
     * Check active user
     * @todo add config key to allow anonymous downloads
     */
    $activeUser  = $userController->getActiveUser();
    //$configModel = $userController->getConfigModel();
    if ( $activeUser->isAnonymous() )
    {
      $this->abort( "Anonymous downloads are not permitted.");
    }

    $this->info(
      "Downlaod of '$filename' from '$datasource' authorized for " .
       $activeUser->username() .
      " (Session #" . $userController->getSessionId() . ")."
    );

    /*
     * get datasource model
     */
    require_once "qcl/data/datasource/Manager.php";
    $dsController = new qcl_data_datasource_Manager( $this );
    $dsModel      = $dsController->getDatasourceModel( $datasource );
    if ( ! $dsModel->isFileStorage() )
    {
      $this->abort( "'$datasource' is not a file storage!");
    }

    /*
     * check access
     */
    if ( ! $dsModel->isActive() or
         ( $dsModel->isHidden() and $dsModel->getOwner() != $activeUser->username() )
    )
    {
      $this->abort( "Access to '$datasource' forbidden." );
    }

    /*
     * get file
     */
    $folder = $dsModel->getFolderObject();
    if ( ! $folder->has( $filename ) )
    {
      $this->abort( "File '$filename' does not exist in storage '$datasource'" );
    }
    $file = $folder->get( $filename );

    /*
     * send headers
     */
    header("Content-Type: application/octet-stream");
    header("Content-Disposition: attachment; filename=\"$filename\"");

    /*
     * stream file content to client
     */
    $file->open("r");
    while ( $data = $file->read(8*1024) )
    {
      echo $data;
    }
    $file->close();
    exit;
  }

  /**
   * Echo a HTML reply
   * @param $msg
   * @return void
   */
  public function echoReply ( $msg )
  {
    echo "<FONT COLOR=GREEN>$msg</FONT>";
  }

  /**
   * Echo a HTML warning
   * @param $msg
   * @return unknown_type
   */
  public function echoWarning ( $msg )
  {
   echo "<FONT COLOR=RED>$msg</FONT>";
  }

  /**
   * Echo a HTML warning and exit
   * @param $msg
   * @return unknown_type
   */
  public function abort ( $msg )
  {
    $this->warn( $msg );
    exit;
  }

  /**
   * Logs to log file or system log
   * @param $str
   * @return void
   */
  private function _log ( $str )
  {
    if ( is_writable( QCL_LOG_FILE) )
    {
      error_log( $str, 3, QCL_LOG_FILE );
    }
    else
    {
      error_log( $str );
    }
  }

  /**
   * Logs an informational message
   */
  public function info( $str )
  {
    $this->_log( "\qcl_server_JsonRpc: ".  $str . "\n");
  }

  /**
   * Logs an informational message
   */
  public function warn( $str )
  {
    $this->_log( "\nqcl_server_JsonRpc: *** WARN: ".  $str . "\n" );
  }

  /**
   * Hook for subclasses to locally log the error message
   * @param string $msg Error Message
   * @param bool $includeBacktrace Whether a backtrace should be printed as well
   * @return void
   */
  public function logError( $msg, $includeBacktrace = false )
  {
    $msg = "\nqcl_server_JsonRpc: *** ERROR: ". $msg;
    if ( true ) //$includeBacktrace )
    {
      $msg .= "\n" . debug_get_backtrace();
    }
    $this->_log( $msg );
  }
}
?>