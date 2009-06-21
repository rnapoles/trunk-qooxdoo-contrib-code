<?php
/**
 * Global settings for the JSON-RPC server
 */

/*
 * set error level
 */
error_reporting(E_ALL ^ E_NOTICE /* ^ E_WARNING */);


/*
 *  accessibility needed for test.php - change to "domain" before production use
 */
define( "defaultAccessibility", "public" );


/*
 * whether the server should log the request
 */
define("JsonRpcDebug", false );

/*
 * which file the server should log to
 */
define( "JsonRpcDebugFile", "log/server.log" );

/*
 * Service path prefix (RpcPhp 1.0)
 */
define("servicePathPrefix", "class/");
?>