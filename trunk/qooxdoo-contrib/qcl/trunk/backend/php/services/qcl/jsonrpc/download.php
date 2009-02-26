<?php
/**********************************************************************
 *
 * qooxdoo component library
 * (c) 2004-2008 Christian Boulanger
 * Distributed under the GPL v.3
 *
 * script to download attachments
 *
 **********************************************************************/

/*
 * dependencies
 */
require_once "global_settings.php";
require_once "bibliograph/security.php"; // @todo

/*
 * parameters
 */
$path  = "../../var/upload/" . $_GET['datasource'] . "/" . $_GET['file'];

/*
 * "simulate" jsonrpc request
 */
$serviceComponents = array("bibliograph","security");

/*
 * check if user is logged in
 */
$server =& $this->server();
$userController =& new class_bibliograph_security(&$server);
if ( ! $userController->method_authenticate() )
{
  /*
   * if not, check http basic authentication
   */
  if ( ! isset($_SERVER['PHP_AUTH_USER'] ) )
  {
    header('WWW-Authenticate: Basic realm="Upload Area"');
    header('HTTP/1.0 401 Unauthorized');
    die ('Access denied') ;
  }
  else
  {
    $username = $_SERVER['PHP_AUTH_USER'];
    $password = $_SERVER['PHP_AUTH_PW'];
    if ( $userController->method_authenticate(array($username,$password) ) )
    {
      die( "Wrong username or password!");
    }
  }
}

/*
 * start or join session
 */
session_start();

/*
 * output headers
 */
if ( $_GET['download'] )
{
  header('Content-disposition: attachment; filename="' . $_GET['file'] . '"');
}

readfile($path);

exit;
?>