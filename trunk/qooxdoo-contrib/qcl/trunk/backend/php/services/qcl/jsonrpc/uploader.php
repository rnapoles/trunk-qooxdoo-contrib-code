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
require_once "qcl/core/object.php";

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
 * controller class to use for access control
 */
if ( ! defined("QCL_ACCESS_CONTROLLER") )
{
  define("QCL_ACCESS_CONTROLLER", "qcl_access_controller" );
}

/*
 * check if user is logged in
 */
$qcl =& new qcl_core_object;
$userController =& $qcl->getNew( QCL_ACCESS_CONTROLLER );

$userController->info("uploading...");

if ( ! $userController->method_authenticate() )
{
  /*
   * check http basic authentication
   */
  if ( ! isset($_SERVER['PHP_AUTH_USER'] ) )
  {
    header('WWW-Authenticate: Basic realm="Upload Area"');
    header('HTTP/1.0 401 Unauthorized');
    abort ('Access denied') ;
  }
  else
  {
    $username = $_SERVER['PHP_AUTH_USER'];
    $password = $_SERVER['PHP_AUTH_PW'];
    if ( $userController->method_authenticate(array($username,$password) ) )
    {
      abort( "Wrong username or password!");
    }
  }
}

/*
 * start session
 */
if ( ! session_id() )
{
  session_start();
}

/*
 * check if something has been uploaded
 */
$field_name = 'uploadfile';
if ( ! isset($_FILES) or ! count ($_FILES) or ! isset ( $_FILES[$field_name] ) )
{
   abort ("No file data received (File might be to large).");
}

/*
 * check file size
 */
if ($_FILES['uploadfile']['size'] > QCL_UPLOAD_MAXFILESIZE * 1024)
{
   abort ("File exceeds maximum filesize: " . QCL_UPLOAD_MAXFILESIZE . " kByte.");
}

/*
 * check if upload directory is writeable
 */
if ( ! is_writable( QCL_UPLOAD_PATH) )
{
  abort ("Upload path is not writeable.");
}

/*
 * get file info
 */
$tmp_name  = $_FILES['uploadfile']['tmp_name'];
$file_name = preg_replace("/[\s]/","",$_FILES['uploadfile']['name']);

/*
 * check file name for validity
 */
if ( strstr($file_name, ".." ) )
{
  abort ("Illegal filename.");
}

/*
 * datasource in 'metadata'
 */
$datasource = $_POST['metadata'];

/*
 * FIXME: there is a bug preventing the metadata to be transferred in manual file uploads
 * 
 */
if ( ! $datasource )
{
  $qcl->warn("Did not receive metadata. using 'cboulanger'. FIX THIS!");
  $datasource = "cboulanger";
}


/*
 * do we have to create a subdirectory?
 */
if ( $datasource )
{
  $file_name = "$datasource/$file_name";
  $basedir = dirname( QCL_UPLOAD_PATH . "/$file_name");
  if ( ! file_exists( $basedir ) )
  {
    if ( ! mkdir ( $basedir ) )
    {
      abort ("Could not create '$basedir'.");
    }
    else
    {
    	reply( "Creating folder ...");
    }
  }
}
else
{
  /*
   * no metadata, put file in temporary folder prefixed with the session id
   */
  $qcl->info("No metadata. Assuming temporary file...");
  $prefix = getSessionId();
  $file_name = "tmp/{$prefix}_{$file_name}";

}

/*
 * target path
 */
$tgt_path  = QCL_UPLOAD_PATH . "/$file_name";

/*
 * check if file exists
 */
if ( file_exists ( $tgt_path) )
{
  $qcl->info("File '$tgt_path' exists. Not uploading");
  abort ("File exists.");
}

/*
 * move temporary file to target location and check for errors
 */
if ( ! move_uploaded_file( $tmp_name, $tgt_path ) or ! file_exists( $tgt_path ) )
{
  $qcl->warn("Problem saving the file to '$tgt_path'.");
  abort ("Problem saving the file to '$tgt_path'.");
}

/*
 * report upload succes
 */
reply ("Upload successful." );
$qcl->info("Uploaded file to '$tgt_path'");

/*
 * echo the required scripts that trigger client-side action if we are not
 * uploading via the java applet: notify the qx.embed.Iframe object in the 
 * parent frame and then rediret to form
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
  if ( isset( $GLOBALS[QCL_SESSION_ID_VAR] ) )
  {
    return $GLOBALS[QCL_SESSION_ID_VAR];
  }
  return session_id();
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