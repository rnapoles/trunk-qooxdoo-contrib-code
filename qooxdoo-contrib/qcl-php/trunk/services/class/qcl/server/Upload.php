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

qcl_import("qcl_application_Application");

/**
 * Upload server. Expects an uploaded file and the request parameter
 * 'sessionId' and 'application', the latter being the application id.
 * An additional parameter 'replace', if set to true, will cause the
 * upload server to overwrite existing files.
 */
class qcl_server_Upload
  extends qcl_core_Object
{


  /**
   * Uploads a single file to the temporary folder.
   * Authentication an be done in two different ways:
   * 1) The calling client provides a valid session id in the URL ("?sessionId=a8dab9das...")
   * 2) If this is not provided, the server responds by presenting a http authentication request
   */
  public function start()
  {
    $this->log("Starting upload ...",QCL_LOG_REQUEST);

    /*
     * check if upload directory is writeable
     */
    if ( ! is_writable( QCL_UPLOAD_PATH ) )
    {
      $this->warn( sprintf(
        "Upload path '%s' is not writeable."
      ) );
      $this->abort("Error on Server.");
    }

    /*
     * authentication
     */
    if ( ! isset( $_REQUEST['sessionId'] ) )
    {
      $this->abort("Missing paramenter 'sessionId'");
    }
    $application = $this->getApplication();
    $accessController = $application->getAccessController();
    $sessionId = $_REQUEST['sessionId'];

    try
    {
      $userId = $accessController->getUserIdFromSession( $sessionId );
    }
    catch( qcl_access_InvalidSessionException $e )
    {
      /*
       * check http basic authentication
       */
      $username = $_SERVER['PHP_AUTH_USER'];
      $password = $_SERVER['PHP_AUTH_PW'];
      if ( ! $username or
           ! $accessController->authenticate( $username, $password ) )
      {
        header('WWW-Authenticate: Basic realm="Upload Area"');
        header('HTTP/1.0 401 Unauthorized');
        exit;
      }
    }

    /*
     * Check active user
     */
    $userModel = $accessController->getUserModel();
    $userModel->load( $userId );
    if ( $userModel->isAnonymous() )
    {
      $this->abort( "Anonymous uploads are not permitted.");
    }

    $this->log(
      "Upload authorized for " . $userModel->username() .
      "(Session #" . $sessionId . ").", QCL_LOG_REQUEST
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
        if ( isset( $_REQUEST['replace'] ) and $_REQUEST['replace'] )
        {
          $this->log( "Replacing existing file '$tgt_path'.",QCL_LOG_REQUEST );
          unlink ( $tgt_path );
        }
        else
        {
          $this->log( "File '$tgt_path' exists. Not uploading",QCL_LOG_REQUEST );
          $this->abort( "File '$file_name' exists." );
        }
      }

      /*
       * move temporary file to target location and check for errors
       */
      if ( ! move_uploaded_file( $tmp_name, $tgt_path ) or
           ! file_exists( $tgt_path ) )
      {
        $this->log( "Problem saving the file to '$tgt_path'.", QCL_LOG_REQUEST );
        $this->echoWarning( "Problem saving file '$file_name'." );
      }

      /*
       * report upload succes
       */
      else
      {
        $this->echoReply( "<span qcl_file='$tgt_path'>Upload of '$file_name' successful.</span>" );
        $this->log("Uploaded file to '$tgt_path'", QCL_LOG_REQUEST);
      }
    }

    /*
     * end of script
     */
    exit;
  }

 /**
   * Returns the current application or false if no application exists.
   * @return qcl_application_Application|false
   */
  public function getApplication()
  {
    if ( ! isset( $_REQUEST['application'] ) )
    {
      $this->abort("Missing paramenter 'application'");
    }

    $service = new String( $_REQUEST['application'] );
    $appClass = (string) $service
      ->replace("/\./","_")
      ->concat( "_Application" );

    try
    {
      /*
       * import class file
       */
      qcl_import( $appClass );

      /*
       * instantiate new application object
       */
      $app = new $appClass;
      if ( ! $app instanceof qcl_application_Application )
      {
        throw new qcl_InvalidClassException(
          "Application class '$appClass' must be a subclass of 'qcl_application_Application'"
        );
      }
    }
    catch( qcl_FileNotFoundException $e )
    {
      $this->abort("No valid application.");
    }

    qcl_application_Application::setInstance( $app );

    return $app;
  }

  /**
   * Echo a HTML reply
   * @param $msg
   * @return void
   */
  public function echoReply ( $msg )
  {
    echo $msg;
  }

  /**
   * Echo a HTML warning
   * @param $msg
   * @return unknown_type
   */
  public function echoWarning ( $msg )
  {
   echo "<span qcl_error='true'>$msg</span>";
  }

  /**
   * Echo a HTML warning and exit
   * @param $msg
   * @return unknown_type
   */
  public function abort ( $msg )
  {
    $this->echoWarning( $msg );
    $this->warn( $msg );
    exit;
  }

}
?>