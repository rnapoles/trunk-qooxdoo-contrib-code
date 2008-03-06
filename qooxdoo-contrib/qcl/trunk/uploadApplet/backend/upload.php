<?php
/**********************************************************************
 * 
 * PHP backend for Drag & Drop Upload Java Applet
 * This is Public Domain, you can use, modify or distribute it in any
 * way you wish, but please report improvements to 
 * 
 * info@bibliograph.org
 * 
 **********************************************************************/

/*
 * constants
 */
$uploadPath = "./uploads";

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
   die ("<FONT COLOR=RED>No file data received (File might be to large).</FONT>");
}
  
/*
 * check file size
 */
$maxfilesize = 30000; //kByte  
if ($_FILES['uploadfile']['size'] > $maxfilesize*1024)
{
   die ("<FONT COLOR=RED>File exceeds maximum filesize: $maxfilesize kByte.</FONT>");
}

/*
 * check if upload directory is writeable
 */
if ( ! is_writable( $uploadPath) )
{
  die ("<FONT COLOR=RED>Upload path is not writeable.</FONT>");
}

/*
 * get file info
 */
$tmp_name  = $_FILES['uploadfile']['tmp_name'];
$file_name = $_FILES['uploadfile']['name'];

/*
 * check file name for validity 
 */

if ( strstr($file_name, ".." ) )
{
  die ("<FONT COLOR=RED>Illegal filename.</FONT>");
}

/*
 * do we have to create a subdirectory?
 */
if ( strstr($file_name, "/") )
{
  $basedir = dirname($file_name);
  if ( ! mkdir ( $basedir ) )
  {
    die ("<FONT COLOR=RED>Could not create '$basedir'.</FONT>");
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
  die ("<FONT COLOR=RED>File exists - not uploaded.</FONT>");
}

/*
 * move temporary file to target location and check for errors
 */
if ( ! move_uploaded_file( $tmp_name, $tgt_path ) )
{
  die ("<FONT COLOR=RED>Problem during upload.</FONT>");
}

/*
 * report upload succes
 */
echo "<FONT COLOR=GREEN>Upload successful, metadata is '" . $_POST['metadata']. "'.</FONT>";

?>