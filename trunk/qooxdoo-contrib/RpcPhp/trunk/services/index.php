<?php

/*
 * set error level.
 */
$error_reporting = defined( "E_DEPRECATED" ) ?
  /*
   * > PHP 5.3
   */
  E_ALL
  ^ E_NOTICE
  // ^ E_WARNING
  ^ E_DEPRECATED :
  /*
   * < PHP 5.3
   */
  E_ALL
  ^ E_NOTICE
  // ^ E_WARNING
  ;

error_reporting($error_reporting);

/*
 * if no jsonrpc request, load post server script
 */
if ( $_SERVER["REQUEST_METHOD"] != "POST" or isset($_REQUEST['service'])  )
{
  require dirname(__FILE__) . "/test_post_server.php";
  exit;
}


/*
 * start jsonrpc server
 */
require dirname(__FILE__) . "/server/JsonRpcServer.php";
JsonRpcServer::run();


?>