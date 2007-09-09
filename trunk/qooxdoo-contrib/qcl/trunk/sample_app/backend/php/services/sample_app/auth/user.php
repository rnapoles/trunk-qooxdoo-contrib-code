<?php

require_once  SERVICE_PATH . "sample_app/auth/__init__.php";

/**
 * Service class for authentication and user management
 */

class class_user extends qcl_auth_user
{    
   
   //-------------------------------------------------------------
   // class variables, overriding parent classses
   //-------------------------------------------------------------
   
   var $key_namedId 		= "username";
   var $key_descriptiveName	= "name";
   var $nodeType			= "sample_app.types.User";
   
   	var $meta = array (
   		'name'			=> array( 'required' => true ),
		'username'		=> array( 'required' => true ),
   		'password'		=> array( 'required' => true, 'type' => "password" ),
   		'email'			=> array( 'type'	 => "email" )
   	);    

   	//-------------------------------------------------------------
   	// internal methods 
   	//-------------------------------------------------------------
   
   	/**
     * constructor, overriding permission and role objects with jsonrpc service classes
   	 */
   	function __construct()
	{
		parent::__construct();
		$this->setSingleton(&$this);
		$this->role 		= &$this->getSingleton("class_role");
		$this->permission 	= &$this->getSingleton("class_permission");
		
   	}   
 
   
   //-------------------------------------------------------------
   // public rpc methods 
   //-------------------------------------------------------------   
   
	/// only for testing, remove   
   	function method_getPermissions($params)
	{
		$userRef 	= $params[0];
		$getNamedIds 	= $params[1];
		return $this->getPermissions($userRef,$getNamedIds);
	}

	/// only for testing, remove	   
   	function method_getRoles($params)
	{
		$userRef 	= $params[0];
		$getNamedIds 	= $params[1];
		return $this->getRoles($userRef,$getNamedIds);
	}
	
	/// only for testing, remove	
	function method_hasPermission($params)
	{
		return $this->hasPermission($params[0],$params[1]);
	}

}


?>
