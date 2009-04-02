<?php

/**
 * global settings 
 */
 
/*
 * set error level
 */
error_reporting( E_ALL ^ E_NOTICE /* ^ E_WARNING */ );

/*
 * default accessibility mode for the services
 */
define( "defaultAccessibility", "public" );

/* 
 * if the service classes are not in the impl/ folder,
 * customize the service path prefix here (trailing slash required)
 */
//define( "servicePathPrefix", "/your/custom/location/" );

/*
 * turn debugging on
 */
define( "JsonRpcDebug", true );
define( "JsonRpcDebugFile", "/tmp/jsonrpc.log");

?>
