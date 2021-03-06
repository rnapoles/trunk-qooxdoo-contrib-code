<?php

/*
 * dependencies
 */
require_once "qcl/server/server/JsonRpcServer.php";


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
 *
 */
class qcl_jsonrpc_Server extends JsonRpcServer
{
  
  /**
   * Constructor
   */
  function __construct()
  {

    /*
     * call backend debug console
     * @todo secure this
     */
    if ( isset( $_GET['test'] ) )
    {
      require "qcl/jsonrpc/debug_console.php";
      exit;
    }
    
    /*
     * output phpinfo
     * @todo allow this only from localhost!
     */
    if ( isset( $_GET['phpinfo'] ) )
    {
      phpinfo();
      exit;
    }
    
    /*
     * Initialize the server, including error
     * catching etc.
     */
    $this->initializeServer();
  
  }
  
  /**
   * (non-PHPdoc)
   * @see JsonRpcServer::start()
   */
  function start()
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
  function &getServiceObject( $className )
  {
    /*
     * get service object from parent method
     */
    $serviceObject =& parent::getServiceObject( $className );
    
    /*
     * Check if service has been aborted in the constructor. This allows
     * more fine-grained access control by the service object itself.
     * @todo This is currently used for authentication - need to do
     * authentication through AccessibilityBehavior!
     */
    if ( method_exists( $serviceObject, "isAborted") 
        && $serviceObject->isAborted() )
    {
      /*
       * do not execute any method but skip to response
       * immediately
       */
      //$this->debug("Aborted...");
      $this->sendReply(
        $this->formatOutput( $serviceObject->response() ), 
        $this->scriptTransportId
      );
      exit;
    }
    
    return $serviceObject;
  }
  
  /**
   * @override
   * @see bibliograph/trunk/backend/php/services/qcl/jsonrpc/server/JsonRpcServer#checkServiceMethod($serviceObject, $method)
   */
  function checkServiceMethod( $serviceObject, $method )
  {
    if ( phpversion() > 5 and $serviceObject->hasMixinMethod( $method ) )
    {
      return true;
    }  
    return parent::checkServiceMethod( &$serviceObject, $method );
  }  
  
  /**
   * Returns the user controller for authentication
   * @return qcl_session_controller
   */
  function &getUserController()
  {
    require_once "qcl/session/controller.php";
    require_once "qcl/persistence/db/Object.php"; // @todo fix this dependency
    $userController = new qcl_session_controller( $this );
    return $userController;
  }
  
  
  /**
   * Uploads a single file to the temporary folder.
   * Authentication an be done in two different ways:
   * 1) The calling client provides a valid session id in the URL ("?sessionId=a8dab9das...")
   * 2) If this is not provided, the server responds by presenting a http authentication request
   */
  function uploadFile()
  {
    $this->debug("Starting upload ...");    
    
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
    $userController =& $this->getUserController(); 
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
    $activeUser  =& $userController->getActiveUser();
    //$configModel =& $userController->getConfigModel();
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
      $this->debug( "Moving uploaded file to $tgt_path ..." );
      
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
        $this->warn( "Problem saving file '$file_name'." );
      }
      
      /*
       * report upload succes
       */
      else
      {
        $this->reply( "Upload of '$file_name' successful." );
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
  function downloadFile()
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
    $userController =& $this->getUserController(); 
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
    $activeUser  =& $userController->getActiveUser();
    //$configModel =& $userController->getConfigModel();
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
    require_once "qcl/datasource/controller.php";
    $dsController =& new qcl_datasource_controller( &$this );
    $dsModel      =& $dsController->getDatasourceModel( $datasource );
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
    $folder =& $dsModel->getFolderObject();
    if ( ! $folder->has( $filename ) )
    {
      $this->abort( "File '$filename' does not exist in storage '$datasource'" );
    }
    $file =& $folder->get( $filename );
    
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
   * (non-PHPdoc)
   * @see bibliograph/trunk/backend/php/services/qcl/jsonrpc/server/JsonRpcServer#debug($str)
   */
  function debug($str)
  {
    if ( $this->debug )
    {
      @error_log( "qcl_jsonrpc_Server: ".  $str . "\n",3,QCL_LOG_FILE);
    }
  }
  
  /**
   * Hook for subclasses to locally log the error message
   * @param $msg
   * @return unknown_type
   */
  function logError( $msg )
  {
    @error_log( $msg . "\n" . debug_get_backtrace(3) . "\n",3,QCL_LOG_FILE);
  }  

  /**
   * Logs an informational message
   */
  function info($str)
  {
    @error_log( "qcl_jsonrpc_Server: ".  $str . "\n",3,QCL_LOG_FILE);
  }  

  function reply ( $msg )
  {
    echo "<FONT COLOR=GREEN>$msg</FONT>";
  }
  
  function warn ( $msg )
  {
    echo "<FONT COLOR=RED>$msg</FONT>";
  }
  
  function abort ( $msg )
  {
    $this->warn( $msg );
    exit;
  }  
  
}

?>
