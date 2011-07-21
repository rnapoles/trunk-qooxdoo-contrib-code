<?php
/**
 * Global settings for the JSON-RPC server
 */

/*
 *  accessibility needed for test.php - change to "domain" before production use
 */
define( "defaultAccessibility", "public" );

/*
 * whether the server should log the request
 * You need this only for debugging
 */
define("JsonRpcDebug", false );

/*
 * which file the server should log to
 */
define( "JsonRpcDebugFile", "log/server.log" );

?>