<?php 

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
$server =& new JsonRpcServer;
$server->start();


?>