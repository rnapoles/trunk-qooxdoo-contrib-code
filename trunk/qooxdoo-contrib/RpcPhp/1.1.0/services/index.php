<?php

/*
 * set error level.
 */
$error_reporting = defined( "E_DEPRECATED" ) ?
  /*
   * >= PHP 5.3
   */
  E_ALL
  ^ E_NOTICE
  // ^ E_WARNING
  ^ E_DEPRECATED

  :

  /*
   * < PHP 5.3
   */
  E_ALL
  ^ E_NOTICE
  // ^ E_WARNING
  ;

error_reporting($error_reporting);

/*
 * start jsonrpc server
 */
require dirname(__FILE__) . "/server/JsonRpcServer.php";
JsonRpcServer::run();


?>