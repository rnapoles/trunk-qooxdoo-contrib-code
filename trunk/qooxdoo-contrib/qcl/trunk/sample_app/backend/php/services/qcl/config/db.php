<?php

require_once ("qcl/db/model.php");

/**
 * configuration management class, using a database backend
 * 
 * Class cannot be used directly, you need to subclass it in 
 * your application service class folder
 */

class qcl_config_db extends qcl_db_model
{    

	//-------------------------------------------------------------
  // class variables
	//------------------------------------------------------------- 
	
	var $table 					      = "config";
	var $key_id 				      = "id";
	var $key_name 				    = "namedId";
	var $key_type 				    = "type";
	var $key_value 				    = "value";
	var $key_permissionRead 	= "permissionRead";
	var $key_permissionWrite 	= "permissionWrite";
	var $key_user 			      = "user";
	var $types                = array("string","number","boolean");

	//-------------------------------------------------------------
  // internal methods
	//------------------------------------------------------------- 
   
 	/**
 	 * constructor
 	 * @param object reference $controller
   */
 	function __construct($controller)
 	{
    parent::__construct(&$controller);
	}
	
	//-------------------------------------------------------------
  // public methods 
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
    $controller  =& $this->getController();
    $userModel   =& $controller->getModel("user");
		$userModel->requirePermission("qcl.config.permissions.manage");
		
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
		$user = $allowUserVariants ? "default" : "null";
		
		$this->db->execute("
			INSERT INTO `{$this->table}` 
				(`{$this->key_name}`,`{$this->key_type}`,
				`{$this->key_permissionRead}`,`{$this->key_permissionWrite}`,
				`{$this->key_user}`) 
			VALUES 
				('$name','$type',$permissionRead,$permissionWrite,$user)
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
    $controller  =& $this->getController();
    $userModel   =& $controller->getModel("user");
		$userModel->requirePermission("qcl.config.permissions.manage");

		$row = array();
		$row[$key] = $value;
		$this->update($row,$id);
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
		$controller =& $this->getController();
    $userModel  =& $controller->getModel("user");
		$userModel->requirePermission("qcl.config.permissions.manage");
		
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
		$row = $this->getRow($name);
		return $row[$this->key_value];	
	} 
	
	/**
	 * gets config data by id
	 * @param string $id The row id of the key 
	 * @return array row data
	 */
	function getRowById( $id )
	{
		$controller  =& $this->getController();
    $userModel   =& $controller->getModel("user");
    if ( is_numeric( $id ) )
		{
			$row = $this->db->getRow("
				SELECT *
				FROM `{$this->table}` 
				WHERE `{$this->key_id}` = $id
			");
			
      // if a read permission is set, require permission
			if ( $row[$this->key_permissionRead] )
			{
				$userModel->requirePermission($row[$this->key_permissionRead]);
			}
		}
		else
		{
			$this->raiseError("Expected numeric value, got '$id'.");
		}		 
    // requesting user has access to config key
		return $row;	
	} 	 	

	/**
	 * gets the database record for the config entry and for the specific user
	 * @param string $name
	 * @param mixed $userRef
	 */
	function getRow($name,$userRef=null)
	{			
		$controller  =& $this->getController();
    $userModel   =& $controller->getModel("user");
    
    if ( $userRef !== null )
		{
			// user reference given, this is usually only the
			// case if a manager edits the configuration
			$user = $userModel->getNamedIdFromRef($userRef);
			
			$row = $this->db->getRow("
				SELECT * 
				FROM {$this->table}
				WHERE {$this->key_name} = '$name'
				AND {$this->key_user} = '$user'
			");
			
			// admins can read default value
			if ( $userRef == "default" and $userModel->hasPermission ("qcl.config.permissions.manage") )
			{
				return $row;
			}
			
			// active user is allowed to acces their own data
			if ( $row[$this->key_user] == $user )
			{
				return $row;
			}
			
			if( $permissionRead = $row[$this->key_permissionRead] )
			{
				$userModel->requirePermisson($permissionRead);
			}
			return $row;
		}
		else
		{
			// no user reference given, assume active user
			$activeUser 	    = $userModel->getActiveUser(); 
			$activeUserNameId = $userModel->getActiveUserNamedId();
	
			// get all rows containing key name
			$rows = $this->db->getAllRows("
				SELECT * 
				FROM `{$this->table}`
				WHERE `{$this->key_name}` = '$name'
					AND 
					(
						`{$this->key_user}` = $activeUserNameId
						OR `{$this->key_user}` = 'default'
						OR `{$this->key_user}` IS NULL
					)
				ORDER BY `{$this->key_user}`
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
					$userModel->requirePermission($permissionRead);
				}
				return $rows[0];				
			}
			return null;
		}
	}
	
 
	/**
	 * gets all config property value that are readable by the active user
	 * @param string $mask return only a subset of entries that start with $mask
	 * @return array Array
	 */
	function getAll( $mask=null )
	{
		$controller    =& $this->getController();
    $userModel     =& $controller->getModel("user");
    $activeUserId  =  $userModel->getActiveUserId();
		
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
			if ( ! $permissionRead or $userModel->hasPermission($permissionRead) )
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
		$controller    =& $this->getController();
    $userModel     =& $controller->getModel("user");
    $activeUserId  =  $userModel->getActiveUserId(); 
    
    // if we set the default value, we need to retrieve 
		if ( $defaultValue )
		{
			$row = $this->getRow($name,"default");	
		}
		else
		{
			$row = $this->getRow($name);
		}
		
    
		// does the key exist?
		if ( ! count($row) )
		{
			$this->raiseError("qcl_config::set : no config key '$name' ");
		}
    
		$id				       = $row[$this->key_id];
		$type			       = $row[$this->key_type];
		$permissionWrite = $row[$this->key_permissionWrite];
		$user			     = $row[$this->key_user];	

		// type checking
		$type_error = false;
		switch ( $row[$this->key_type] )
		{
			case "string" 	: if ( ! is_string($value) ) 	$type_error = true; break;
			case "number" 	: if ( ! is_numeric($value) ) $type_error = true; break;
			case "boolean" 	: if ( ! is_bool($value) ) 		$type_error = true; break;
		}
		if ( $type_error )
		{
			$this->raiseError("cql_config::set : Invalid type for '$name' (type '$type').");
		}
		
		// users can set their own entry variant with no further checking
		if ( $user != $activeUserId )
		{
			// but others need to check permission
			if ( $permissionWrite )
      {
        $userModel->requirePermission( $permissionWrite );
      }
			
			// create variant if necessary
			if ( $user === 0 and ! $defaultValue )
			{
				unset($row[$this->key_id]);
				$row[$this->key_user] = $activeUserId;
				$id = $this->db->insert($this->table,$row);
				$row[$this->key_id] = $id;
			}
			
			// set default value
			if ( $user === 0 and $defaultValue )
			{
				$userModel->requirePermission("qcl.config.permissions.manage");
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
		$row = $this->getRow($name);
		return $row[$this->key_permissionRead];
	}
	
	/**
	 * gets required permission name for write access to config property
	 * @param string $name name of configuration key
	 */
	function getPermissionWrite($name)
	{
		$row = $this->getRow($name);
		return $row[$this->key_permissionWrite];
	}

	/**
	 * checks if current user has the right to access the configuration 
	 * property with read priviledges
	 * @param string $name name of configuration key 
	 */
	function hasReadAccess($name)
	{
		$controller  =& $this->getController();
    $userModel   =  $controller->getModel("user");
    return $userModel->hasPermission($this->getPermissionRead($name));
	}
	
  /**
   * checks if current user has the right to access the configuration 
   * property with write priviledges
   * @param string $name name of configuration key 
   */
  function hasWriteAccess($name)
  {
  	$controller  =& $this->getController();
    $userModel   =  $controller->controller->getModel("user");
    return $userModel->hasPermission($this->getPermissionWrite($name));
	}
}

