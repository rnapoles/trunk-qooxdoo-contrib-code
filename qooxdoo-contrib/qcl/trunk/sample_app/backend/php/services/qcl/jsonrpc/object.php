<?php

// dependencies
require_once ("qcl/object.php");

/**
 * base class of all json rpc service classes
 */

class qcl_jsonrpc_object extends qcl_object {

  //-------------------------------------------------------------
  // instance variables
  //-------------------------------------------------------------

	/**
	 * @var JsonRpcError $error
	 */
	var $error;
  
  /**
   * @ the path to the directory containing binary executables, relative to the SERVICE_PATH
   */
  var $bin_path    = "../../bin/";  
  
  //-------------------------------------------------------------
  // internal methods
  //-------------------------------------------------------------
	
	/**
	 * Class constructor
	 */
	function __construct() 
	{
		parent::__construct();
	}

  //-------------------------------------------------------------
  // public methods
  //-------------------------------------------------------------
  /**
   * get include path for a class name
   * @return 
   * @param $classname
   */
  function getClassPath($classname)
  {
    // delete JsonRpcClassPrefix
    if ( substr($classname,0,strlen(JsonRpcClassPrefix)) == JsonRpcClassPrefix )
    {
	    $pathname = substr($classname,strlen(JsonRpcClassPrefix));        	
    }
    else
    {
    	$pathname = $classname;
    }
        
    // determine path name
    return SERVICE_PATH . implode( "/", explode("_",$pathname ) ) . ".php";
  }
  
  /**
   * gets file path to binary executables depending on operating system
   * @return 
   */
  function getOsBinDir()
  {
    $path = SERVICE_PATH . $this->bin_path;
    switch ( strtolower ( PHP_OS ) )
    {
      case "darwin":  $path .= "Darwin/"; break;
      case "WINNT":   $path .= "win32/";   break;
      default:        $path .= "i386linux/"; 
    }
    return $path;
  }
}

