<?php

// dependencies
require_once ("qcl/jsonrpc/object.php");

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
	function __construct($controller=null)
  {
		parent::__construct();
    $this->setController(&$controller);	
	}   	

	//-------------------------------------------------------------
  // public methods 
	//-------------------------------------------------------------   

 	/**
 	 * sets controller of this model to be able to link to other models
 	 * connected to the controller
 	 * @param object $controller
 	 */
 	function setController ( $controller )
 	{
		if ( is_a( $controller,"qcl_jsonrpc_controller" ) )
		{
			$this->controller =& $controller;
		}
    else
    {
			$this->raiseError (
        "cql_jsonrpc_model : No controller object provided for " . get_class($this) . 
        ". Received a '" . get_class($controller) . "' object." 
      );
    }
 	}
 	
 	/**
 	 * gets controller (singleton) of this model 
 	 * @return object 
 	 */
 	function &getController()
 	{
 		$controllerSingleton =& $this->controller->getInstance();
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