<?php
require_once ("qcl/jsonrpc/model.php");

/**
 * abstract class for classes that implement a plugin
 * 
 */

class qcl_plugin_abstract extends qcl_jsonrpc_model
{    
	//-------------------------------------------------------------
  // properties
	//------------------------------------------------------------- 
  
  var $name;
  var $description; 
  var $permission;
  var $author;

	//-------------------------------------------------------------
  // internal methods
	//------------------------------------------------------------- 
   
 	/**
 	 * constructor calls parent constructor
   */
 	function __construct($controller)
 	{
		parent::__construct(&$controller);
	}

	//-------------------------------------------------------------
  // accessors 
	//-------------------------------------------------------------  

	function getNamedId()
  {
    return $this->namedId;
  }	
	
	function getDescription()
  {
    return $this->description;
  }

	function getPermission()
  {
    return $this->permissionModel;
  }
  
  function getAuthor()
  {
    return $this->author;
  }
	
	//-------------------------------------------------------------
  // public (interface) methods 
	//-------------------------------------------------------------  
    
 	/**
	 * checks whether plugin works (i.e., if dependencies are met)
	 * if an error occurs, it can be retrieved with the getEror method.
	 * @return boolean if plugin was initialized without error
	 */
	function initialize() {}
  
  
	
}

