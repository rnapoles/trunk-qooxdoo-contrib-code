<?php

require_once  SERVICE_PATH . "sample_app/auth/__init__.php";

/**
 * Service class providing data on roles
 * this simply extends the corresponding qcl.auth class
 */
class class_role extends qcl_auth_role
{    

   //-------------------------------------------------------------
   // class variables, overriding parent classses
   //-------------------------------------------------------------
  
   var $nodeType			= "sample_app.types.Role";
   
	/* metadata on fields */
	var $meta = array(
   		'namedId'		=> array( 'required' => true ),
		'name'			=> array( 'required' => true ),
   		'note'			=> array( )
	);
   //-------------------------------------------------------------
   // internal methods 
   //-------------------------------------------------------------
   
   /**
    * constructor, overriding user and permission objects with jsonrpc service classes
    */
   function __construct()
   {
		parent::__construct();
		$this->setSingleton(&$this);
		$this->user 		= &$this->getSingleton("class_user");
		$this->permission 	= &$this->getSingleton("class_permission");
		
   }   
   
   //-------------------------------------------------------------
   // public rpc methods 
   //-------------------------------------------------------------   
   
   	function method_getPermissions($params)
	{
		$roleName = $params[0];
		$getNamedIds = $params[1];
		return $this->getPermissions($roleName,$getNamedIds);
	}
}

?>
