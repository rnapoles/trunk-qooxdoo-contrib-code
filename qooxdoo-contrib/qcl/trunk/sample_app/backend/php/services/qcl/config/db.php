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
	var $key_id 				= "id";
	var $key_name 				= "name";
	var $key_type 				= "type";
	var $key_value 				= "value";
	var $key_permissionRead 	= "permissionRead";
	var $key_permissionWrite 	= "permissionWrite";
	var $key_userId 			= "userId";

	//-------------------------------------------------------------
   	// internal methods
	//------------------------------------------------------------- 
   
   	/**
   	 * constructor calls parent constructor
   	 * @param array $ini initial configuration
     */
   	function __construct()
   	{
		parent::__construct();
		$this->db 	= qcl_db::getSubclass($this->ini);
		$this->user = $this->getSingleton("class_user");
	}
	
	/**
	 * gets the database record for the config entry and for the specific user
	 * @param string $name
	 * @param mixed $userRef
	 */
	function _getRow($name,$userRef=null)
	{			
		if ( $userRef !== null )
		{
			// user reference given, this is usually only the
			// case if a manager edits the configuration
			$userId = $this->user->getIdFromRef($userRef);
			$row = $this->db->getRow("
				SELECT * 
				FROM {$this->table}
				WHERE {$this->key_name} = '$name'
				AND {$this->key_userId} = $userId
			");
			
			// admins can read default value
			if ( $userId == 0 and $this->user->hasPermission ("qcl.config.permissions.manage") )
			{
				return $row;
			}
			
			// active user is allowed to acces their own data
			if ( $row['id'] == $userId )
			{
				return $row;
			}
			
			if( $permissionRead = $row[$this->key_permissionRead] )
			{
				$this->user->requirePermisson($permissionRead);
			}
			return $row;
		}
		else
		{
			// no user reference given, assume active user
			$activeUser 	= $this->user->getActiveUser(); 
			$activeUserId 	= $activeUser[$this->user->key_id];
	
			// get all rows containing key name
			$rows = $this->db->getAllRows("
				SELECT * 
				FROM {$this->table}
				WHERE {$this->key_name} = '$name'
					AND 
					(
						`{$this->key_userId}` = $activeUserId
						OR `{$this->key_userId}` = 0
						OR `{$this->key_userId}` = null
					)
				ORDER BY `{$this->key_userId}`
			");
			
			if ( count($rows) == 2 )
			{
				// config entry has variants, return user variant
				// since user can access own data
				return $rows[1];
			}
			elseif ( count($rows) == 1 )
			{
				// only a non-variant or default entry available, check permission
				if( $permissionRead = $rows[0][$this->key_permissionRead] )
				{
					$this->user->requirePermission($permissionRead);
				}
				return $rows[0];				
			}
			return null;
		}
	}
	
	
	//-------------------------------------------------------------
   	// public non-rpc methods 
	//-------------------------------------------------------------    
 
	/**
	 * creates a config property, overwriting any previous entry
	 * requires permission "qcl.config.permissions.manage"
	 * 
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @param string $type The type of the property (string|number|object|boolean)
	 * @param string $permissionRead The permission name that is needed to access 
	 * 		  and read this property (optional)
	 * @param string $permissionWrite The permission name that is needed to access 
	 * 		  and read this property (optional)
	 * @param boolean $allowUserVariants If true, allow users to create their 
	 * 		  own variant of the configuration setting 
	 * @return id of created config entry
	 */
	function create($name, $type, $permissionRead=null, $permissionWrite=null, $allowUserVariants=false )
	{
		// check permission
		$this->user->requirePermission("qcl.config.permissions.manage");
		
		// check type
		if ( ! in_array( $type, $this->types ) )
		{
			$this->raiseError("cql_config_db::create : invalid type '$type'");
		}
		
		$permissionRead  = $permissionRead ? "'$permissionRead'" : "null";
		$permissionWrite = $permissionWrite ? "'$permissionWrite'" : "null";

		// delete all previous entries
		$this->db->execute("
			DELETE FROM `{$this->table}`
			WHERE  `{$this->key_name}` = '$name'
		");			
		
		// create new entry
		$userId = $allowUserVariants ? 0 : "null";
		
		$this->db->execute("
			INSERT INTO `{$this->table}` 
				(`{$this->key_name}`,`{$this->key_type}`,
				`{$this->key_permissionRead}`,`{$this->key_permissionWrite}`,
				`{$this->key_userId}`) 
			VALUES 
				('$name','$type',$permissionRead,$permissionWrite,$userId)
		");					

		return $this->db->getLastInsertId();
	} 
	
	/**
	 * updates a config property
	 * requires permission "qcl.config.permissions.manage"
	 * 
	 * @param mixed $id ID of property
	 * @param string $key Key to update
	 * @param mixed $value Value
	 * @return true if success 
	 */
	function update( $id, $key, $value )
	{
		$this->user->requirePermission("qcl.config.permissions.manage");
		$row = array();
		$row[$this->key_id] = $id;
		$row[$key] = $value;
		$this->db->update($this->table,$row);
		return true;
	} 
	/**
	 * deletes a config property completely or only its user variant 
	 * requires permission qcl.config.permissions.manage
	 * 
	 * @param mixed $ref Id or name of the property (i.e., myapplication.config.locale)
	 * @return true if success 
	 */
	function delete( $ref )
	{
		$this->user->requirePermission("qcl.config.permissions.manage");
		
		if ( is_numeric( $ref ) )
		{
			$this->db->execute("
				DELETE FROM `{$this->table}` 
				WHERE `{$this->key_id}` = $ref
			");			
		}
		else
		{
			$this->db->execute("
				DELETE FROM `{$this->table}` 
				WHERE `{$this->key_name}` = '$ref'
			");			
		}		 
		return true;
	} 
	 
	/**
	 * gets config property value
	 * @param string $name The name of the property (i.e., myapplication.config.locale) 
	 * @return value of property or null if value does not exist.
	 */
	function get($name)
	{
		$row = $this->_getRow($name);
		return $row[$this->key_value];	
	} 	  
 
	/**
	 * gets all config property value that are readable by the active user
	 * @param string $mask return only a subset of entries that start with $mask
	 * @return array Array
	 */
	function getAll( $mask=null )
	{
		$activeUserId = $this->user->getActiveUserId();
		
		if ( $mask )
		{
			// get all rows containing mask
			$rows = $this->db->getAllRows("
				SELECT * 
				FROM `{$this->table}`
				WHERE `{$this->key_name}` LIKE '$mask%'
				ORDER BY `{$this->key_name}`			
			");			
		}
		else
		{
			// get all rows 
			$rows = $this->db->getAllRows("
				SELECT * 
				FROM `{$this->table}`
				ORDER BY `{$this->key_name}`			
			");			
		}
		
		$result = array();
		foreach ( $rows as $row )
		{
			$permissionRead = $row[$this->key_permissionRead];
			if ( ! $permissionRead or $this->user->hasPermission($permissionRead) )
			{
				$result[] = $row;
			}
		}
		return $result;
	}	 
 
	/**
	 * sets config property
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @param string $value The value of the property. 
	 * @param boolean $defaultValue If true, set the key's default value for keys that allow
	 *  	user variants. This is necessary so that the admin can change the defaults instead
	 * 		of editing her/his own variant.
	 * @return true if success or false if there was an error
	 */
	function set( $name, $value, $defaultValue=false)
	{
		// if we set the default value, we need to retrieve 
		if ( $defaultValue )
		{
			$row = $this->_getRow($name,0);	
		}
		else
		{
			$row = $this->_getRow($name);
		}
		
		// does the key exist?
		if ( ! count($row) )
		{
			$this->triggerError("qcl_config::set : no config key '$name' ");
		}
		
		$id				 = $row[$this->key_id];
		$type			 = $row[$this->key_type];
		$permissionWrite = $row[$this->key_permissionWrite];
		$userId			 = $row[$this->key_userId];
		$activeUserId 	 = $this->user->getActiveUserId(); 

		// type checking
		$type_error = false;
		switch ( $row[$this->key_type] )
		{
			case "string" 	: if ( ! is_string($value) ) 	$type_error = true; break;
			case "number" 	: if ( ! is_numeric($value) ) 	$type_error = true; break;
			case "boolean" 	: if ( ! is_bool($value) ) 		$type_error = true; break;
		}
		if ( $type_error )
		{
			$this->raiseError("cql_config::set : Invalid type for '$name' (type '$type').");
		}
		
		// users can set their own entry variant with no further checking
		if ( $userId != $activeUserId )
		{
			// but others need to check permission
			$this->user->requirePermission( $permissionWrite );
			
			// create variant if necessary
			if ( $userId == 0 and ! $defaultValue )
			{
				unset($row[$this->key_id]);
				$row[$this->key_userId] = $activeUserId;
				$id = $this->db->insert($this->table,$row);
				$row[$this->key_id] = $id;
			}
			
			// set default value
			if ( $userId == 0 and $defaultValue )
			{
				$this->user->requirePermission("qcl.config.permissions.manage");
			}				
		}		
				
		
		// all checks have been passed, set value
		$this->db->execute("
			UPDATE `{$this->table}` 
			SET `{$this->key_value}` = '$value' 
			WHERE `{$this->key_id}` = $id
		");
		return true;
	}

	/**
	 * resets a property user variant to its original value
	 * raise an error if the active user does not have write permission for this property  
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @return true if success or false if there was an error
	 */
	function reset($name)
	{
		$this->raiseError("qcl_config_db::reset : not implemented!");
	}

	/**
	 * gets required permission name for read access to config property
	 * @param string $name name of configuration key
	 */
	function getPermissionRead($name)
	{
		$row = $this->_getRow($name);
		return $row[$this->key_permissionRead];
	}
	
	/**
	 * gets required permission name for write access to config property
	 * @param string $name name of configuration key
	 */
	function getPermissionWrite($name)
	{
		$row = $this->_getRow($name);
		return $row[$this->key_permissionWrite];
	}

	/**
	 * checks if current user has the right to access the configuration 
	 * property with read priviledges
	 * @param string $name name of configuration key 
	 */
	 function hasReadAccess($name)
	 {
		return $this->user->hasPermission($this->getPermissionRead($name));
	 }
	
	/**
	 * checks if current user has the right to access the configuration 
	 * property with write priviledges
	 * @param string $name name of configuration key 
	 */
	 function hasWriteAccess($name)
	 {
		return $this->user->hasPermission($this->getPermissionWrite($name));
	 }
}

