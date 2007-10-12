<?php

// dependencies
require_once  SERVICE_PATH . "qcl/jsonrpc/object.php";

/**
 * simple controller-model architecture for jsonrpc
 * common base class for models
 */

class qcl_jsonrpc_model extends qcl_jsonrpc_object
{
	//-------------------------------------------------------------
    // instance variables
    //-------------------------------------------------------------
    
	var $controller; // the controller object 
	
	//-------------------------------------------------------------
    // internal methods
    //-------------------------------------------------------------

   /**
    * constructor 
    */
	function __construct()
   	{
		parent::__construct();
	}   	

	//-------------------------------------------------------------
   	// public non-rpc methods 
	//-------------------------------------------------------------   

 	/**
 	 * sets controller of this model to be able to link to other models
 	 * connected to the controller
 	 * @param object $controller
 	 */
 	function setController ( $controller )
 	{
 		$this->controller = &$controller; 
 	}
 	
	
}	

?>