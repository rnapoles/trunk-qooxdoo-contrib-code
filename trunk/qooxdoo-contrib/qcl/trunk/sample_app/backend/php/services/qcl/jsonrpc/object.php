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

}

