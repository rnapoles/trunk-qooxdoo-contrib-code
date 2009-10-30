<?php

/**
 * global settings
 */

/*
 * set error level
 */
error_reporting( E_ALL ^ E_NOTICE /* ^ E_WARNING */ );

/*
 * default accessibility mode for the services, defaults to "domain"
 */
define( "defaultAccessibility", "public" );

/*
 * if the service classes are not in the class/ folder,
 * customize the service path prefix here (trailing slash required)
 */
//define( "servicePathPrefix", "/your/custom/location/" );

/*
 * the class name prefix for service classes, defaults to "class_"
 */
//define("JsonRpcClassPrefix",  "class_");

/*
 * the method name prefix for service methods, defaults to "method_"
 */
//define("JsonRpcMethodPrefix",  "method_");

/*
 * signature mode, defaults to "array" in PHP4 and "check" in PHP5
 */
//define( "RpcMethodSignatureMode", "check" );



/*
 * turn debugging on
 */
define( "JsonRpcDebug", false );

/*
 * log file
 */
define( "JsonRpcDebugFile", "/tmp/jsonrpc.log");

?>
