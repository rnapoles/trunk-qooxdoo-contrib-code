<?php

/**
 * configuration management class, using a database backend
 * 
 * ### NOT YET FUNCTIONAL ###
 * 
 * Class cannot be used directly, you need to subclass it in 
 * your application service class folder
 */

class qcl_config_db extends qcl_config
{    

	//-------------------------------------------------------------
   	// class variables
	//------------------------------------------------------------- 
	
	var $table 					= "config";
	var $key_name 				= "name";
	var $key_type 				= "type";
	var $key_value 				= "value";
	var $key_permissionRead 	= "permissionRead";
	var $key_permissionWrite 	= "permissionRead";
	var $key_userId 			= "userId";

	//-------------------------------------------------------------
   	// internal methods
	//------------------------------------------------------------- 
   
   	/**
   	 * constructor calls parent constructor
     */
   	function __construct()
   	{
		parent::__construct();
		$this->db = qcl_db::getDbObject($this->ini);
	}

	//-------------------------------------------------------------
   	// public non-rpc methods 
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
	function create($name, $type, $permissionRead=null, $permissionWrite=null, $userRef=null )
	{
		
		// delete whole entry or user variant, also checks write access
		$this->delete($name,$userRef);
		
		// create new entry or user variant
		if ( $userRef === null)
		{
			$this->execute("
				INSERT INTO `{$this->table}` 
					(`{$this->key_name}`,`{$this->key_type}`,`{$this->key_permissionRead}`,`{$this->key_permissionWrite}`) 
				VALUES 
					('$name','$type'," . 
						( $permissionRead ? "'$permissionRead'," : "null," ) .
						( $permissionWrite ? "'$permissionWrite'" : "null)" ) 
			);
		}
		else
		{
			$userId = $this->user->getByRef($userRef);
			$this->execute("
				INSERT INTO `{$this->table}` 
					(`{$this->key_name}`,`{$this->key_type}`,`{$this->key_permissionRead}`,`{$this->key_permissionWrite}`) 
				VALUES 
					('$name','$type'," . 
						( $permissionRead ? "'$permissionRead'," : "null," ) .
						( $permissionWrite ? "'$permissionWrite'" : "null)" ) ."
				WHERE `{$this->key_userId}` = $userId
			");			
		}
		return true;
	} 

	/**
	 * deletes a config property completely or only its user variant 
	 * 
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @param mixed $userRef if the user-defined variant should be deleted (optional)
	 * @return true if success or false if there was an error
	 */
	function delete($name, $userRef=null )
	{
		$this->requireWriteAccess($name);
		
		if ( $userRef === null)
		{
			$this->execute("
				DELETE FROM `{$this->table}` 
				WHERE `{$this->key_name}` = $name 
			");	
		}
		else
		{
			$userId = $this->user->getByRef($userRef);
			$this->execute("
				DELETE FROM `{$this->table}` 
				WHERE `{$this->key_name}` = $name
				AND `{$this->key_userId}` = $userId 
			");	
		}
		return true;
	} 
 
	/**
	 * gets config property value
	 * @param string $name The name of the property (i.e., myapplication.config.locale) 
	 * @return value of property or null if value does not exist.
	 */
	function get($name,$value)
	{
		
	} 	  
 
	/**
	 * sets config property
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @param string $value The value of the property. 
	 * @return true if success or false if there was an error
	 */
	function set($name,$value)
	{
		$res = $this->db->getAllRows("SELECT id FROM config WHERE name = '$name'");
		$id  = $res[0]['id'];
		if ( $id )
		{
			$this->execute("UPDATE config SET value = '$value' WHERE id = $id ");
		}
		else
		{
			$this->execute("INSERT INTO config (name,value) VALUES ('$name','$value')");
			return $this->getLastInsertId();
		}
	}
	
	/**
	 * gets required permission name for read access to config property
	 * @param string $name
	 */
	function getPermissionRead($name)
	{
		$userId = 0;
		$this->getRow("
			SELECT * 
			FROM `{$this->table}` 
			WHERE `{$this->key_name}` = $name 
		");	
	}
	
	/**
	 * checks if current user has the right to access the configuration 
	 * property with read priviledges
	 */
	 function hasWriteAccess($name)
	 {
		//
	 }
}

