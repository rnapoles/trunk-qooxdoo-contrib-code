<?php
require_once SERVICE_PATH . "qcl/jsonrpc/object.php";

/**
 * abstract class for classes that implement configuration management
 */

class qcl_config extends qcl_jsonrpc_object
{    

	//-------------------------------------------------------------
   	// internal methods
	//------------------------------------------------------------- 
   
   	/**
   	 * constructor calls parent constructor
     */
   	function __construct()
   	{
		parent::__construct();
	}

	//-------------------------------------------------------------
   	// static methods 
	//-------------------------------------------------------------   

	/**
	 * get config object singleton based on initial configuration.
	 * at the moment, a qcl_config_db object is used by default.
	 */
	function &getConfigSingleton($ini)
	{
		$config = &$this->getSingleton("qcl_config_db");
		if ( ! $config )
		{
			require_once SERVICE_PATH . "qcl/config/db.php";
			$config = new qcl_config_db;
			$this->setSingleton(&$config);
		}
		return $config;
	}

	//-------------------------------------------------------------
   	// abstract public non-rpc methods 
	//-------------------------------------------------------------   

	/**
	 * creates a config property, overwriting any previous entry unless the 
	 * entry is a user variant of the base entry.
	 * 
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @param string $type The type of the property (string|number|object|boolean)
	 * @param string $permissionRead The permission name that is needed to access 
	 * 		  and read this property (optional)
	 * @param string $permissionWrite The permission name that is needed to access 
	 * 		  and read this property (optional)
	 * @param mixed $userRef if this property has a user-defined variant, 
	 * 		  it is stored as an additional entry with the user reference (usually user
	 * 		  id) (optional)
	 * @return true if success or false if there was an error
	 */
	function create($name, $type, $permissionRead=null, $permissionWrite=null, $userRef=null ){}

	/**
	 * gets config property value. 
	 * raise an error if the active user does not have write permission for this property.
	 * @param string $name The name of the property (i.e., myapplication.config.locale) 
	 * @return value of property or null if value does not exist.
	 */
	function delete($name, $userRef){} 	

	/**
	 * gets all config property value that are readable by the active user 
	 * @return array Array, with property names as key 
	 */
	function getAll(){} 	

	/**
	 * gets config property value. 
	 * raise an error if the active user does not have read permission for this property.
	 * @param string $name The name of the property (i.e., myapplication.config.locale) 
	 * @return mixed value of property or null if value does not exist.
	 */
	function get($name){} 	 
 
	/**
	 * sets config property values
	 * raise an error if the active user does not have write permission for this property
	 * or if the type of the value does not match the type of the property.  
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @param mixed $value The value of the property. 
	 * @return true if success or false if there was an error
	 */
	function set($name,$value){}

}

