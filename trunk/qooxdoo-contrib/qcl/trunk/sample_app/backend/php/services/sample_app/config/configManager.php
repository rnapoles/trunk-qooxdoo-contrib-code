<?php

// dependencies
require_once SERVICE_PATH . "qcl/config/manager.php";
require_once SERVICE_PATH . "sample_app/auth/__init__.php";

/**
 * Service class providing data to the config manager on the client
 */

class class_configManager extends qcl_config_manager
{

	//-------------------------------------------------------------
   	// internal methods
	//------------------------------------------------------------- 
   
   	/**
   	 * constructor 
     */
   	function __construct()
   	{
		parent::__construct();
		$this->user = $this->getSingleton("class_user"); 
	}
	
	//-------------------------------------------------------------
   	// public rpc methods inherited from qcl_config_manager
   	//-------------------------------------------------------------   
   
}

?>