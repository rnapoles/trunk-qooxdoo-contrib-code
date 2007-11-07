<?php

// dependencies
require_once ("qcl/object.php");

/**
 * simple controller-model architecture for jsonrpc
 * common base class for models
 */

class qcl_jsonrpc_model extends qcl_object
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
	function __construct($controller=null)
   	{
		parent::__construct();
		if ( is_object($controller) )
		{
			$this->setController(&$controller);	
		}
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
 	
 	/**
 	 * gets controller (singleton) of this model 
 	 * @return object 
 	 */
 	function &getController()
 	{
 		$controllerSingleton = &$this->controller->getInstance();
 		if ( is_object($controllerSingleton) )
 		{
 			return $controllerSingleton;
 		}
 		else
 		{
 			return $this->controller;
 		}
 	}	
}	

?>