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

/**
 * Upload server
 * -- not yet functional --
 *
 */
class qcl_server_Upload extends qcl_core_Object
{

  /**
   * Not used, only here for compatibility
   * @var array
   */
  public $servicePaths = array();

  /**
   * Uploads a single file to the temporary folder.
   * Authentication an be done in two different ways:
   * 1) The calling client provides a valid session id in the URL ("?sessionId=a8dab9das...")
   * 2) If this is not provided, the server responds by presenting a http authentication request
   */
  public function start()
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
    $accessController = $this->getAccessController();
    if ( ! $sessionId or
         ! $accessController->isValidUserSession( $sessionId ) )
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
     * @todo add config key to allow anonymous uploads
     */
    $activeUser  = $accessController->getActiveUser();
    //$configModel = $accessController->getConfigModel();
    if ( $activeUser->isAnonymous() )
    {
      $this->abort( "Anonymous uploads are not permitted.");
    }

    $this->info(
      "Upload authorized for " . $activeUser->username() .
      "(Session #" . $accessController->getSessionId() . ")."
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

}



 ?>
