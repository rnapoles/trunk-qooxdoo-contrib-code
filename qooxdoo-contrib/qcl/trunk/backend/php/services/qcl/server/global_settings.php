<?php

/**
 * global settings 
 */
 
/*
 * set error level
 */
error_reporting( E_ALL ^ E_NOTICE /* ^ E_WARNING */ );

/*
 *  accessibility mode for Test.php 
 */
define( "defaultAccessibility", "public" );

/*
 * service path prefix
 */
define( "servicePathPrefix", "services" );

/*
 * turn debugging on
 */
define( "JsonRpcDebug", true );
define( "JsonRpcDebugFile", "/tmp/jsonrpc.log");

?>
