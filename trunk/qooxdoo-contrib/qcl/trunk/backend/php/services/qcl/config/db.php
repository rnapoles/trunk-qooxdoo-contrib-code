<?php
/*
 * dependencies
 */
require_once "qcl/db/model.php";

/**
 * configuration management class, using a database backend
 * 
 * Class cannot be used directly, you need to subclass it in 
 * your application service class folder
 * @todo use qcl_model methods instead of custom sql
 * @todo use userId instead of username
 */

class qcl_config_db extends qcl_db_model
{    
	
  /**
   * types that config values may have
   * @var array
   */
  var $types = array("string","number","boolean","list");
		
  /**
   * Returns singleton instance.
   * @static 
   * @return qcl_config_db 
   */  
  function &getInstance( $class=__CLASS__ )
  {
    return parent::getInstance( $class );
  }
  
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
	function create(
	   $name, 
	   $type, 
	   $permissionRead=null, 
	   $permissionWrite=null, 
	   $allowUserVariants=false 
	) {
		// check permission
    $controller  =& $this->getController();
    $activeUser  =& $controller->getActiveUser();
    $activeUser->requirePermission("qcl.config.permissions.manage");
		
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
	 * Checks if config property exists
	 * @todo rename, conflicts with qcl_model::exists()
	 * @param string $key
	 * @return boolean
	 */
	function exists( $key ) 
	{
		$value = $this->get( $key );
		return ! empty( $value );
	}	
	
	/**
	 * Deletes a config key dependent on permissions
	 * 
	 * @return void
	 */
	function delete()
	{
		$controller =& $this->getController();
    $userModel  =& $controller->getUserModel();
    $activeUser =& $controller->getActiveUser();

    /*
     * get key name
     */
    $namedId = $this->getNamedId();
    
    /*
     * delete if permissions allow it
     */
    if ( $activeUser->hasPermission("qcl.config.permissions.manage") 
          or $this->getUser() == $activeUser->getNamedId() )
    {
      parent::delete();
      $this->log("Deleted config record '$namedId' (#$id)", "config" );
    }
    
    /*
     * or raise error
     */
		else
		{
		  $this->raiseError("Current user doesn't have permission to delete '$namedId'");
		}
	}
	
	/**
	 * Delete all records that belong to a user
	 * @param string $user
	 * @return void
	 */
	function deleteByUser( $user )
	{
	  $this->findByUser( $user );
	  if ( $this->foundSomething() )
	  {
	    do
      {
        $this->delete();
      }
      while( $this->nextRecord() );
	  }
	  else
	  {
	    $this->log("User $user does not have any config entries","config");
	  }
	  
	}
	
	/**
	 * Returns config property value
	 * @param string $name The name of the property (i.e., myapplication.config.locale) 
	 * @return value of property or null if value does not exist. 
	 */
	function get( $name )
	{
		$row = $this->findByNamedId($name);
    return $this->getValue($row);
	}  
	
	
  /**
   * Return config property type
   * @param string $name The name of the property (i.e., myapplication.config.locale) 
   * @return type of property or null if value does not exist.
   */
  function getType( $name )
  {
    $row  = $this->findByNamedId($name);
    return $row[$this->col_type];    
  }  	
	
  /**
   * gets the value in the correct type
   * @todo rewrite this
   * @return mixed $value
   * @param array|null[optional,default null] $row If null, use current record
   */
  function getValue ( $row=null )
  {
    $row    = either( $row, $this->currentRecord );
    $value  = $row['value'];
    $type   = $row['type'];	
    
    /*
     * return value as correct type
     */
    switch ( $type )
    {
      case "number"  : 
        return floatval($value);
      case "boolean" : 
        return (bool) $value;
      case "list" : 
        return explode(",", $value);        
      default:
        return strval($value);
    }
  }
  
	/**
	 * checks if the config entry exists (optional: for a specific user)
	 * @param string $name
	 * @param mixed $userRef
	 */
	function has( $name, $user=null )  
  {
    return ( count( $this->findByNamedId( $name, $user ) ) > 0 );
  }
  
	/**
	 * Returns config data by id
	 * @param string $id The row id of the key 
	 * @return array row data
	 * @override
	 */
	function findById( $id )
	{
		$controller  =& $this->getController();
    $userModel   =& $controller->getUserModel();

		/*
		 * find record
		 */
	  parent::findById( $id );
		
    /*
     * check for read permission
     */
		if ( $permission = $this->getProperty("permissionRead") )
		{
			$userModel->requirePermission($permission);
		}

    return $this->getRecord();
	} 	 	

	/**
	 * Returns the database record for the config entry and for the specific user
	 * @param string $name
	 * @param mixed $userRef
	 * @return array|null
	 */
	function findByNamedId( $name, $username=null )
	{			
		$controller =& $this->getController();
    $activeUser =& $controller->getActiveUser();
    
    /*
     * user reference given, this is usually only the
     * case if a manager edits the configuration
     */
    if ( $username !== null )
		{

			$this->findWhere( "namedId = '$name' AND user = '$username' "); 
			
			/*
			 * return null if no entry exists for the user
			 */
			if ( $this->foundNothing() )
			{
			  return null;
			}
			
			/*
			 *  check user status
			 */
			if ( $username == "default" and $activeUser->hasPermission ("qcl.config.permissions.manage") )
			{
				/*
				 *  admins can read default value
				 */
        return $this->getRecord();
			}
			
      /*
       * active user is allowed to acces their own data
       */			
			elseif ( $this->getUser() == $user )
			{
        return $this->getRecord();
			}
			
      /*
       * if the value is protected by a read permission,
       * check permission and abort if not granted
       */
      $permissionRead = $this->getProperty("permissionRead");
			if( $permissionRead )
			{
				$activeUser->requirePermisson($permissionRead);
			}
		}
		
		
    /*
     *  no user reference given, assume active user
     */		
		else
		{
			if ( $activeUser )
			{
			  $username =  $activeUser->username();  
        /*
         * get row containing key name
         */
        $this->findWhere( "namedId = '$name' AND user = '$username' "); 
			}
			else
			{
			  $this->setRecord(null);
			}

			/*
			 * if no record has been found for the active user
			 * or nobody is logged in, find default or global
			 * value
			 */
			if ( $this->foundNothing() ) 
			{
			  $this->findWhere("namedId = '$name' AND  ( `user` = 'default' OR `user` = 'global' )");
			}    
		}
    
    /*
     * return result
     */
    return $this->getRecord();
	}
	
 
	/**
	 * Returns all config property value that are readable by the active user
	 * @param string $mask return only a subset of entries that start with $mask
	 * @return array Array
	 */
	function accessibleKeys( $mask=null )
	{
		$controller     =& $this->getController();
    $activeUser     =& $controller->getActiveUser();
    
    /*
     * no accessible keys if no active user
     */
    if ( ! $activeUser ) return array();
    
    
    $username        = $activeUser->username();
		$isConfigManager = $activeUser->hasPermission("bibliograph.config.permissions.manage");
		
		/*
		 * find records
		 */
		if ( $mask )
		{
			/*
			 * get all rows containing mask
			 */
      $this->findWhere("namedId LIKE '$mask%'", "namedId");
			
		}
		else
		{
			/*
			 * get all rows
			 */ 
			$this->findAll(/* order by */"namedId");
		}
		
		do
		{
      /*
       * admin read do everything
       */
      if ( $isConfigManager )
      {
        $result[] = $this->getRecord();
        continue;
      }
      
      /*
       * global, default or user value
       */
      $user = $this->getUser(); 
      
      if ( $user )
      {
        /*
         * get key if owned by active user or if global
         */
        if ( $user != $username and $user != "global" )
        {
          /*
           * if default value look for a config entry for the user. if exists, 
           * do not return default value
           * @todo rewrite this more elegantly
           */
          if ( $user == "default" )
          {
            $found     = false;
            foreach ( $this->getResult() as $r )
            {
              if ( $r['namedId'] == $row['namedId'] and $r['user'] == $username ) 
              {
                $found = true; 
                break;  
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
      
      /*
       * read permission ?
       */
      $permissionRead = $this->getProperty('permissionRead');
			if ( ! $permissionRead or $activeUser->hasPermission($permissionRead) )
			{
				$result[] = $this->getRecord();
			}
			
		}
		while( $this->nextRecord() );
		
		return $result;
	}	 
 
	/**
	 * Sets config property
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @param string $value The value of the property. 
	 * @param boolean $defaultValue If true, set the key's default value for keys that allow
	 *  	user variants. This is necessary so that the admin can change the defaults instead
	 * 		of editing her/his own variant.
	 * @return true if success or false if there was an error
	 */
	function set( $name, $value, $defaultValue=false)
	{
		$controller =& $this->getController();
    $activeUser =& $controller->getActiveUser();
    $username   =  $activeUser->username();     
    
		if ( $defaultValue )
		{
			// if we set the default, we need to retrieve the row containing the default value
      $row = $this->findByNamedId($name,"default");	
		}
		else
		{
			// otherwise, retrieve the user value or the global value
      $row = $this->findByNamedId($name);
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
		  elseif ( is_array( $value ) ) 
      {
        $type = "list";
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
			case "string": 
			 if ( ! is_string($value) ) 
			 {
			   $type_error = true; 
			 }
			 break;
			 
			case "number": 
  			if ( ! is_numeric($value) ) 
  			{
  			   $type_error = true; 
  			}
  			break;
  			
			case "boolean": 
			 if ( ! is_bool($value) ) 
			 {
			   $type_error = true;
			 }
			 break;
			 
			case "list": 
			  if ( is_array( $value ) )   
			  {
			    $value = implode(",",$value);
			  }
			  break;
		}
		if ( $type_error )
		{
			$this->raiseError("cql_config::set : Invalid type for '$name' (type '$type').");
		}
		
		// users can set their own entry variant with no further checking
		if ( $owner != $username )
		{
			// but others need to check permission
			if ( $permissionWrite )
      {
        $activeUser->requirePermission( $permissionWrite );
      }
			
			if ( $owner == "default" )
      {
  			if ( $defaultValue )
  			{
  				// change default value only if user has permission to do so
          $activeUser->requirePermission("qcl.config.permissions.manage");
  			}
  			else
  			{
          // create user variant 
          unset($row[$this->col_id]);
  				$row[$this->col_user] = $username;
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
		$controller =& $this->getController();
    $activeUser =& $controller->getActiveUser();
    $activeUser->requirePermission("qcl.config.permissions.manage");
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
		$row = $this->findByNamedId($name);
		return $row[$this->col_permissionRead];
	}
	
	/**
	 * gets required permission name for write access to config property
	 * @param string $name name of configuration key
	 * @deprecated
	 */
	function getPermissionWrite($name)
	{
		$row = $this->findByNamedId($name);
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
    $activeUser  =& $controller->getActiveUser();
    $permission  =  $this->getPermissionRead($name);
    
    return $activeUser->hasPermission($permission);
	}
	
  /**
   * checks if current user has the right to access the configuration 
   * property with write priviledges
   * @param string $name name of configuration key 
   */
  function hasWriteAccess($name)
  {
  	$controller  =& $this->getController();
    $activeUser  =& $controller->getActiveUser();
    $permission  =  $this->getPermissionWrite($name);
    
    return $activeUser->hasPermission($permission);
	}
}

