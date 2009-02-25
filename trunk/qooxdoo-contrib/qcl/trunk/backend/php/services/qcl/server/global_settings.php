<?php

/**
 * global settings 
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
 * turn debugging on
 */
define("JsonRpcDebug", true );
define("JsonRpcDebugFile", "/Users/bibliograph/Documents/Workspaces/Bibliograph/bibliograph-dev/bibliograph/trunk/backend/php/var/log/bibliograph.log");

?>
