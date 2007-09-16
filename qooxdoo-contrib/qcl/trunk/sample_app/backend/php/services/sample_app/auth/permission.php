<?php

require_once  SERVICE_PATH . "sample_app/auth/__init__.php";

/**
 * Service class providing data on roles
 * this simply extends the corresponding qcl.auth class
 */
class class_permission extends qcl_auth_permission
{    

   //-------------------------------------------------------------
   // class variables, overriding parent classses
   //-------------------------------------------------------------
   
	var $nodeType			= "sample_app.types.Permission";
	
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
    * constructor
    */
   function __construct($role=null)
   {
		parent::__construct();
		$this->setSingleton(&$this);
		$this->role = &$this->getSingleton("class_role");
		$this->user = &$this->getSingleton("class_user");
   }   
   
   //-------------------------------------------------------------
   // public rpc methods 
   //-------------------------------------------------------------   
   

}



?>
