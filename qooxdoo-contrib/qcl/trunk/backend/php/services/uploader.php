<?php
/**********************************************************************
 *
 * Bibliograph Online Reference Management
 * (c) 2004-2008 Christian Boulanger
 * Distributed under the GPL v.3
 *
 * PHP backend for Drag & Drop Upload Java Applet
 *
 **********************************************************************/

/*
 * dependencies
 */
require_once "global_settings.php";

/*
 * constants
 */
$uploadPath  = "../../var/upload";
$maxfilesize = 30000; //kByte

/*
 * check http basic authentication
 */ 
if ( ! isset($_SERVER['PHP_AUTH_USER'])) 
{
    header('WWW-Authenticate: Basic realm="Upload Area"');
    header('HTTP/1.0 401 Unauthorized');
    echo '<font color=red>Access denied</font>';
    exit;
} 
else 
{
    $username = $_SERVER['PHP_AUTH_USER'];
    $password = $_SERVER['PHP_AUTH_PW'];
    if ( $username != "username" or $password != "password" )
    {
      die ("<font color=red>Wrong username $username or password $password!</font>");
    }
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

if ($_FILES['uploadfile']['size'] > $maxfilesize*1024)
{
   abort ("File exceeds maximum filesize: $maxfilesize kByte.");
}

/*
 * check if upload directory is writeable
 */
if ( ! is_writable( $uploadPath) )
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
 * do we have to create a subdirectory?
 */
if ( $_POST['metadata'] )
{
  $datasource = $_POST['metadata'];
  $file_name = "$datasource/$file_name";
  $basedir = dirname("$uploadPath/$file_name");
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

/*
 * target path
 */

$tgt_path  = "$uploadPath/$file_name";

/*
 * check if file exists
 */
if ( file_exists ( $tgt_path) )
{
  abort ("File exists.");
}

/*
 * move temporary file to target location and check for errors
 */
if ( ! move_uploaded_file( $tmp_name, $tgt_path ) )
{
  abort ("Problem saving the file to '$tgt_path'.");
}

/*
 * report upload succes
 */
reply ("Upload successful." );

/*
 * echo the required scripts that trigger client-side action if we are not
 * uploading via the java applet: notify the qx.embed.Iframe object in the 
 * parent frame and then rediret to form
 */
if ( $_POST['isFormUpload'] )
{
  echo "<script>" .
      "top.uploadIframe.createDispatchDataEvent( 'startUpload',1 );" .
  		"top.uploadIframe.createDispatchDataEvent( 'currentUpload', '$file_name' );" .
      "top.uploadIframe.createDispatchDataEvent( 'endUpload' );" .
      "window.setTimeout(function(){window.location.href='../../../frontend/plugins/uploadApplet/iframeContent.html'},4000);".
      "</script>";
}

/*
 * end of script
 */
exit;

/*
 * functions
 */

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
    echo "<script>" .
        "top.uploadIframe.createDispatchDataEvent( 'endUpload' );" .
        "window.setTimeout(function(){window.location.href='../../../frontend/plugins/uploadApplet/iframeContent.html'},4000);".
        "</script>";
  }
  exit;
}

?>