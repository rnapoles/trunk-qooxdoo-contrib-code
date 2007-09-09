<?php

/**
 * global settings 
 */
 
// set error level
error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);

// accessibility needed for test.php - change to "domain" before production use
define("defaultAccessibility", "public");

/*** do not change anything below this point ***/

// directory containing the service classes with trailing slash
define ( SERVICE_PATH, dirname(__FILE__) . "/" ); 

?>