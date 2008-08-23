<?php

require_once ("qcl/db/model.php");

/**
 * configuration management class, using a database backend
 * 
 * Class cannot be used directly, you need to subclass it in 
 * your application service class folder
 * @todo: use qcl_model records instead of custom sql
 */

class qcl_config_db extends qcl_db_model
{    
	
  /**
   * types that config values may have
   * @var array
   */
  var $types = array("string","number","boolean");
		
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
    $userModel   =& $controller->getUserModel();
    $userModel->requirePermission("qcl.config.permissions.manage");
		
		// todo: check if key already exists, if yes, abort
		
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
			WHERE  `{$this->col_namedId}` = '$name'
		");			
		
		// create new entry
		$user = $allowUserVariants ? "default" : "global";
		
		$this->db->execute("
			INSERT INTO `{$this->table}` 
				(`{$this->col_namedId}`,`{$this->col_type}`,
				`{$this->col_permissionRead}`,`{$this->col_permissionWrite}`,
				`{$this->col_user}`) 
			VALUES 
				('$name','$type',$permissionRead,$permissionWrite,'$user')
		");					

		return $this->db->getLastInsertId();
	} 

	/**
	 * checks if config property exists
	 * @param string $key
	 * @return boolean
	 */
	function exists($key) 
	{
		$value = $this->get( $key );
		return ! empty( $value );
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
    $userModel  =& $controller->getUserModel();
		$userModel->requirePermission("qcl.config.permissions.manage");
		
		if ( is_numeric( $ref ) )
		{
			$this->db->execute("
				DELETE FROM `{$this->table}` 
				 WHERE `{$this->col_id}` = $ref
			");			
		}
		else
		{
			$this->db->execute("
				DELETE FROM `{$this->table}` 
				 WHERE `{$this->col_namedId}` = '$ref'
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
		$row     = $this->getRow($name);
    return $this->getValue($row);
	} 
  
  /**
   * gets the value in the correct type
   * @return mixed $value
   * @param array|null[optional,default null] $row If null, use current record
   */
  function getValue ( $row=null )
  {
    $row    = either($row,$this->currentRecord);
    $value  = $row[$this->col_value];
    $type   = $row[$this->col_type];	
    
    /*
     * return value as correct type
     */
    switch ( $type )
    {
      case "number": return floatval($value);
      case "boolean" : return (bool) $value;
      default: return strval($value);
    }
  }
  
	/**
	 * checks if the config entry exists (optional: for a specific user)
	 * @param string $name
	 * @param mixed $userRef
	 */
	function has($name,$user=null)  
  {
    return ( count( $this->getRow($name,$user) ) > 0 );
  }
  
	/**
	 * gets config data by id
	 * @param string $id The row id of the key 
	 * @return array row data
	 */
	function getRowById( $id )
	{
		$controller  =& $this->getController();
    $userModel   =& $controller->getUserModel();
    if ( is_numeric( $id ) )
		{
			$row = $this->db->getRow("
				SELECT *
				  FROM `{$this->table}` 
				 WHERE `{$this->col_id}` = $id
			");
			
      // if a read permission is set, require permission
			if ( $row[$this->col_permissionRead] )
			{
				$userModel->requirePermission($row[$this->col_permissionRead]);
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
	function getRow($name,$user=null)
	{			
		$controller  =& $this->getController();
    $userModel   =& $controller->getUserModel();
    
    if ( $user !== null )
		{
			/*
			 * user reference given, this is usually only the
       * case if a manager edits the configuration
			 */
			$row = $this->db->getRow("
				SELECT * 
				  FROM {$this->table}
				 WHERE {$this->col_namedId} = '$name'
				   AND {$this->col_user} = '$user'
			");
			
			/*
			 *  check user status
			 */
			if ( $user == "default" and $userModel->hasPermission ("qcl.config.permissions.manage") )
			{
				/*
				 *  admins can read default value
				 */
        return $row;
			}
			elseif ( $row[$this->col_user] == $user )
			{
				/*
				 * active user is allowed to acces their own data
				 */
        return $row;
			}
			
      /*
       * if the value is protected by a read permission,
       * check permission and abort if not granted
       */
      $permissionRead = $row[$this->col_permissionRead];
			if( $permissionRead )
			{
				$userModel->requirePermisson($permissionRead);
			}
		}
		else
		{
      /*
       *  no user reference given, assume active user
       */
			$activeUser 	    = $userModel->getActiveUser(); 
      $activeUserNameId = $userModel->getActiveUserNamedId();
	
			/*
			 * get row containing key name
			 */
			$row = $this->db->getRow("
				SELECT * 
				  FROM `{$this->table}`
				 WHERE `{$this->col_namedId}` = '$name'
					 AND `{$this->col_user}` = '$activeUserNameId'
			");
			
			if ( ! count($row) ) 
			{
  			/*
  			 * if nothing was found, get all row containing default or global value
  			 */
  			$row = $this->db->getRow("
  				SELECT * 
  				  FROM  `{$this->table}`
  				 WHERE  `{$this->col_namedId}` = '$name'
  					 AND  ( `{$this->col_user}` = 'default' OR `{$this->col_user}` = 'global' )
  			");
			}    

			if ( ! count($row) ) 
			{
			  $row = null;
			}
		}
    
    /*
     * return result
     */
    $this->currentRecord = $row;
    return $row;
	}
	
 
	/**
	 * gets all config property value that are readable by the active user
	 * @param string $mask return only a subset of entries that start with $mask
	 * @return array Array
	 */
	function getAll( $mask=null )
	{
		$controller    =& $this->getController();
    $userModel     =& $controller->getUserModel();
    $activeUserId  =  $userModel->getActiveUserId();
		
		if ( $mask )
		{
			// get all rows containing mask
			$rows = $this->db->getAllRecords("
				SELECT * 
				FROM `{$this->table}`
				WHERE `{$this->col_namedId}` LIKE '$mask%'
				ORDER BY `{$this->col_namedId}`			
			");			
		}
		else
		{
			// get all rows 
			$rows = $this->db->getAllRecords("
				SELECT * 
				FROM `{$this->table}`
				ORDER BY `{$this->col_namedId}`			
			");			
		}
		
    $isConfigManager = $userModel->hasPermission("bibliograph.config.permissions.manage");
		$result = array();
		foreach ( $rows as $row )
		{
      // admin read do everything
      if ( $isConfigManager )
      {
        $result[] = $row;
        continue;
      }
      
      // global, default or user value
      $userId = $row[$this->col_user]; 
      
      if ( $userId )
      {
        // get key if owned by active user or if global
        if ( $userId != $activeUserId and $userId != "global" )
        {
          // if default value look for a config entry for the user. if exists, do not return default value
          if ( $userId == "default" )
          {
            $found = false;
            foreach ( $rows as $r )
            {
              if ( $r[$this->col_namedId] == $row[$this->col_namedId] and $r[$this->col_user] == $activeUserId ) 
              {
                $found = true; break;  
              }
            }
            if ( $found ) 
            {
               continue; 
            }
          }
          else
          {
            continue; 
          }
        }
      }
      
      // read permission ?
      $permissionRead = $row[$this->col_permissionRead];
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
    $userModel     =& $controller->getUserModel();
    $activeUser    =  $userModel->getActiveUserNamedId(); 
    
		if ( $defaultValue )
		{
			// if we set the default, we need to retrieve the row containing the default value
      $row = $this->getRow($name,"default");	
		}
		else
		{
			// otherwise, retrieve the user value or the global value
      $row = $this->getRow($name);
		}
		
		// create if key doesn't exist - todo: this is a security problem!
		if ( ! count($row) )
		{
      /*
       * type
       */
      
      if ( is_bool ( $value) ) 
      {
        $type = "boolean";
      }
      elseif ( is_numeric( $value ) ) 
      {
        $type = "number";
      }
      else 
      {
        $type = "string";
      }
      
      $this->info("qcl_config::set : creating non-existing key '$name', type '$type'.");
      
      $this->create($name, $type, null, null, true );
      return $this->set ( $name, $value );
		}
    
		$id				       = $row[$this->col_id];
		$type			       = $row[$this->col_type];
		$permissionWrite = $row[$this->col_permissionWrite];
		$owner		       = $row[$this->col_user];	

		// type checking
		$type_error = false;
		switch ( $row[$this->col_type] )
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
		if ( $owner != $activeUser )
		{
			// but others need to check permission
			if ( $permissionWrite )
      {
        $userModel->requirePermission( $permissionWrite );
      }
			
			if ( $owner == "default" )
      {
  			if ( $defaultValue )
  			{
  				// change default value only if user has permission to do so
          $userModel->requirePermission("qcl.config.permissions.manage");
  			}
  			else
  			{
          // create user variant 
          unset($row[$this->col_id]);
  				$row[$this->col_user] = $activeUser;
  				$id = $this->insert($row);
  				$row[$this->col_id] = $id;  				
  			}
      }
		}		
				
		/*
		 *  all checks have been passed, set value
		 */
    $data = array();
    $data['id']    = $row[$this->col_id];
    $data['value'] = $value;
    
		$this->update($data);
    
		$this->log("'$name' set to '$value' for user '$owner'."); 
    
		return true;
	}

	/**
	 * updates a config record
	 * @return void
	 * @param $id int
	 * @param $key string
	 * @param $value string
	 */
	function updateById($id,$key,$value)
	{
		$row = $this->getById($id);
		$controller    =& $this->getController();
    $userModel     =& $controller->getUserModel();
    $userModel->requirePermission("qcl.config.permissions.manage");
    $row[$key]= $value;
    $this->update($row);
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
	 * @deprecated
	 */
	function getPermissionRead($name)
	{
		$row = $this->getRow($name);
		return $row[$this->col_permissionRead];
	}
	
	/**
	 * gets required permission name for write access to config property
	 * @param string $name name of configuration key
	 * @deprecated
	 */
	function getPermissionWrite($name)
	{
		$row = $this->getRow($name);
		return $row[$this->col_permissionWrite];
	}

	/**
	 * checks if current user has the right to access the configuration 
	 * property with read priviledges
	 * @param string $name name of configuration key 
	 */
	function hasReadAccess($name)
	{
		$controller  =& $this->getController();
    $userModel   =& $controller->getUserModel();
    $permission  =  $this->getPermissionRead($name);
    
    return $userModel->hasPermission($permission);
	}
	
  /**
   * checks if current user has the right to access the configuration 
   * property with write priviledges
   * @param string $name name of configuration key 
   */
  function hasWriteAccess($name)
  {
  	$controller  =& $this->getController();
    $userModel   =& $controller->getUserModel();
    $permission  =  $this->getPermissionWrite($name);
    
    return $userModel->hasPermission($permission);
	}
}

