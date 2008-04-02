<?php

/**
 * global settings 
 */
 
// set error level
error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);

// accessibility needed for test.php - change to "domain" before production use
define("defaultAccessibility", "public");

// directory containing the service classes with trailing slash
define ( "SERVICE_PATH", str_replace("\\","/", dirname(__FILE__) . "/" ) ); 

// a writable directory for temporary files
define ( "QCL_TMP_PATH", SERVICE_PATH  . "../var/tmp/" );

// a writable directory for log files
define ( "QCL_LOG_PATH", SERVICE_PATH  . "../var/log/" );

// log level: 0: off, 1: (very verbose) debug, 2: info, 3: warn, 4: error
define ("QCL_LOG_LEVEL",2); 

// show class name in log message
define ("QCL_LOG_SHOW_CLASS_NAME",false); 
 

// get a normalized name for the operating system
// @todo: 
switch($_ENV["OS"])
{
	case "Windows_NT":
	 	define ("OS", "win32");
	 	break;
	default:
		define ("OS", "i386linux");
		break;
}

// where the executables are stored
define ( "BIN_PATH", SERVICE_PATH . "../../bin/" . OS . "/" );

?>
