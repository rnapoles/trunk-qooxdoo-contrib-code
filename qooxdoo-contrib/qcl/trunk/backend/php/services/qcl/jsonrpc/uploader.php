<?php
/**********************************************************************
 *
 * qooxdoo component library
 * (c) 2004-2008 Christian Boulanger
 * Distributed under the GPL v.3
 *
 * PHP backend for Drag & Drop Upload Java Applet, using the qcl
 * library for authentication
 *
 **********************************************************************/


/*
 * dependencies
 */
require_once "global_settings.php";
require_once "qcl/session/controller.php";
require_once "qcl/registry/session.php";

/*
 * upload path
 */
if ( ! defined("QCL_UPLOAD_PATH") )
{
  define("QCL_UPLOAD_PATH", "../../var/upload" );
}

/*
 * maximal file size in kilobytes
 */
if ( ! defined("QCL_UPLOAD_MAXFILESIZE") )
{
  define("QCL_UPLOAD_MAXFILESIZE", 30000 );
}

/*
 * start session
 */
if ( ! session_id() )
{
  session_start();
}

/*
 * authentication
 */
$userController =& new qcl_session_controller();
$qcl =& $userController;
 
if ( $_REQUEST['sessionId'] )
{
  $userController->setSessionId( $_REQUEST['sessionId'] );
}

if ( ! $userController->authenticate() )
{
  /*
   * check http basic authentication
   */
  $username = $_SERVER['PHP_AUTH_USER'];
  $password = $_SERVER['PHP_AUTH_PW'];
  if ( ! $username or ! $userController->authenticate( $username, $password ) )
  {
    header('WWW-Authenticate: Basic realm="Upload Area"');
    header('HTTP/1.0 401 Unauthorized');
    exit;
  }
}

/*
 * check if upload directory is writeable
 */
if ( ! is_writable( QCL_UPLOAD_PATH) )
{
  abort ("Upload path is not writeable.");
}

/*
 * check if something has been uploaded
 */
if ( ! isset($_FILES) or ! count ($_FILES) ) 
{
   abort ("No file data received (File might be to large).");
   /*echo '           
    <form enctype="multipart/form-data" method="post">
      <input name="uploadfile" type="file" size="25"> <input type="submit" value="send">
    </form>';*/  
}

foreach ( $_FILES as $fieldName => $file )
{
  /*
   * check file size
   */
  if ( $file['size'] > QCL_UPLOAD_MAXFILESIZE * 1024)
  {
     abort ("File '$fieldName' exceeds maximum filesize: " . QCL_UPLOAD_MAXFILESIZE . " kByte.");
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
    abort ("Illegal filename.");
  }

  /*
   * target path
   */  
  $prefix = getSessionId();
  $tgt_path  = QCL_UPLOAD_PATH . "/{$prefix}_{$file_name}";
  
  /*
   * check if file exists
   */
  if ( file_exists ( $tgt_path) )
  {
    $qcl->info("File '$tgt_path' exists. Not uploading");
    abort ("File '$file_name' exists.");
  }
  
  /*
   * move temporary file to target location and check for errors
   */
  if ( ! move_uploaded_file( $tmp_name, $tgt_path ) or ! file_exists( $tgt_path ) )
  {
    $qcl->warn("Problem saving the file to '$tgt_path'.");
    abort ("Problem saving file '$file_name'.");
  }
  
  /*
   * report upload succes
   */
  reply ("Upload of '$file_name' successful." );
  $qcl->info("Uploaded file to '$tgt_path'");

}
  
/*
 * echo the required scripts that trigger client-side action if we are not
 * uploading via the java applet: notify the qx.embed.Iframe object in the 
 * parent frame and then redirect to form
 */
if ( $_POST['isFormUpload'] )
{
  echo "
  <script>
    top.uploadIframe.createDispatchDataEvent( 'startUpload',1 );
    top.uploadIframe.createDispatchDataEvent( 'currentUpload', '$file_name' );
    top.uploadIframe.createDispatchDataEvent( 'endUpload' );
    window.setTimeout(function(){
          window.location.href='../../../frontend/plugins/uploadApplet/iframeContent.html'
    },4000);
  </script>
  ";
}

/*
 * end of script
 */
exit;

/*
 * functions
 */

function getSessionId()
{
  return either( $_REQUEST['sessionId'], $GLOBALS[QCL_SESSION_ID_VAR], session_id());
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
  warn ( $msg );
  
  if ( $_POST['isFormUpload'] )
  {
  echo "
    <script>
      top.uploadIframe.createDispatchDataEvent( 'endUpload' );
      window.setTimeout(function(){
            window.location.href='../../../frontend/plugins/uploadApplet/iframeContent.html'
      },4000);
    </script>
    ";
  }
  exit;
}

?>