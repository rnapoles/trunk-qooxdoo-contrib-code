<?php

/*
 * Dependencies
 */
require_once "qcl/access/common.php";

/*
 * Constants
 */
define('QCL_ACTIVE_USER_SESSION_VARNAME', "qcl_access_user_activeUser");

/**
 * class providing data on users
 * providing a backend to the qcl.auth client package
 * 
 * Class cannot be used directly, you need to subclass it 
 * in your application service class folder
 * @todo Refactor!
 */

class qcl_access_user extends qcl_access_common
{    

  //-------------------------------------------------------------
  // class variables, override if necessary
  //-------------------------------------------------------------

	var $icon 			            = "icon/16/apps/system-users.png";
	var $nodeType		            = "qcl.auth.types.User";
	var $shortName		          = "user";
  var $reservedNames          = array("default","admin","global");
	
  //-------------------------------------------------------------
  // public methods 
  //-------------------------------------------------------------
   
  /**
   * get list of roles (ids) that belong to a user
   * @param mixed $userRef user name or id
   * @param boolean $getNamedIds 
   * 	If true (default), get the names of the roles, 
   * 	If false, get ids
   * 	If null, get whole records 
   * @return array Array of string names or numeric ids 
   */
  function getRoles($userRef,$getNamedIds=true)
  { 
		$userId = $this->getIdFromRef($userRef);
		if ( ! $userId )
		{
		  $this->raiseError("Invalid user '$userRef'.");
		}
    if ( $getNamedIds===true)
    {
      $this->findWhere("t1.{$this->col_id}=$userId",null,array("","namedId"),"role");
    }
    elseif ( $getNamedIds === false )
    {
      $this->findWhere("t1.{$this->col_id}=$userId",null,array("","id"),"role");
    }
    elseif ( is_null($getNamedIds) )
    {
      return $this->findWhere("t1.{$this->col_id}=$userId",null,array("","*"),"role");
    }
		return $this->getValues();
   }
   
  /**
   * get ids of user roles
   */
 	function getRoleIds($userRef)
 	{
 		return $this->getRoles($userRef,false);	
 	}

	/**
   * get named ids of user roles
   */
	function getRoleNamedIds($userRef)
	{
		return $this->getRoles($userRef,true);	
	}

	/**
   * get full records of user roles
   */
 	function getRoleRecords($userRef)
 	{
 		return $this->getRoles($userRef,null);	
 	}
   
  /**
   * get list of permission (ids) that belong to a user
   * @param mixed $userRef user name or id
   * @param boolean $getNamedIds 
   * 	If true (default), get the names of the roles, 
   * 	if null, get the whole records, otherwise just ids
   * @return array Array of string names or numeric ids 
   */
  function getPermissions($userRef,$getNamedIds=true)
  {
		/*
		 * arguments
		 */
    $userId     = $this->getIdFromRef($userRef);
    if ( ! $userId )
    {
      $this->raiseError("qx::security::user::getPermissions : invalid user reference '$userRef'.");
    }
    
    /*
     * models
     */
    $controller =& $this->getController();
    $roleModel  =& $controller->getRoleModel();
		
		/*
		 * get all permissions
		 */
		$myRoles = $this->getRoles($userRef,$getNamedIds);
		$result = array();
		foreach ( $myRoles as $roleRef )
		{
			$result = array_unique(array_merge(
				$result,
				$roleModel->getPermissions( $roleRef, $getNamedIds )
			));
		}
		
		/*
		 * return permissions as array
		 */
		return $result;
  }
   
  /**
   * authenticate a user with a password. if no username is given, check if a user has already been logged in,
   * so you can use this method in your service class without parameters to make sure a login has taken place.
   * @param string $username or null
   * @param string $password (MD5-encoded) password or null
   * @return boolean success
   */
  function authenticate ( $username=null, $password=null )
  {

    if ( ! $username ) 
    {
      if ( is_array( $this->getActiveUser() ) )
      {
      /*
       * user is already authenticated
       */
        return true;
      }
      else
      {
        return false; 
      }
    }
    
    /*
     * try to authenticate
     */
    $row = $this->getByName ( $username );
 		
 		if ( ! is_array($row) )
 		{
 			$this->error = "Unknown user name";
 			$this->setActiveUser(null);
 			return false;
 		}
 		
 		/*
 		 * compare provided password with stored password
 		 */
 		$savedPw = $row[$this->col_password]; 
 		
 		if ( ! $savedPw or 
 			  $password === $savedPw or   
 			  md5( $password ) === $savedPw or
 			  $password === md5 ( $savedPw ) ) 
 		{
 			$this->setActiveUser($row);
 			$this->resetLastAction();
      return true;
 		}
 		else
 		{
 			$this->error = "Wrong Password";
 			$this->setActiveUser(null);
 			return false;
 		}
  }
   
  /**
   * gets active user information which is persisted during a session
   * @return array
   */
  function getActiveUser()
  {
    return $_SESSION[QCL_ACTIVE_USER_SESSION_VARNAME]; 
  }
   
   /**
    * sets active user information
    * @param array map with user data 
    */
   function setActiveUser($data)
   {
   		$_SESSION[QCL_ACTIVE_USER_SESSION_VARNAME] = $data;
   }

   /**
    * gets active user record id
    * @return int
    */
   function getActiveUserId()
   {
   		return $_SESSION[QCL_ACTIVE_USER_SESSION_VARNAME][$this->col_id]; 
   }

   /**
    * Returns user name of active user. Alias of ::getActiveUserNamedId()
    * @return string
    */
   function getActiveUserName()
   {
   		return $this->getActiveUserNamedId();
   }

   /**
    * Returns user (login) name of active user.
    * @return string
    */
   function getActiveUserNamedId()
   {
   		return $_SESSION[QCL_ACTIVE_USER_SESSION_VARNAME][$this->col_namedId]; 
   }
  
   /**
    * Returns full name of active user 
    * @return string
    */
   function getActiveUserFullName()
   {
   		return $_SESSION[QCL_ACTIVE_USER_SESSION_VARNAME][$this->col_name]; 
   }  
  
   /**
    * Checks if active user has the given permission
    * respects wildcards, i.e. myapp.permissions.* covers
    * myapp.permissions.canDoFoo
    * @param string $requestedPermission the permission to check
    * @param string $user (optional) if given, check this user's permissions. Otherwise 
    *        check the active user's permissions
    */
   function hasPermission($requestedPermission, $user=null)
   {
   		/*
   		 * arguments
   		 */
      $user 			  = $user ? $this->getByName($user) : $this->getActiveUser();
   		$username 		= $user[$this->col_namedId];

   		/*
   		 * models
   		 */
      $controller  =& $this->getController();
      $permModel   =& $controller->getPermissionModel();
   		
   		/*
   		 * get all permissions of the user
   		 */
   		$permissions 	= $this->getPermissions($username);
  		
   		/*
   		 * check if permission is granted
   		 */
   		foreach($permissions as $permission)
  		{
  			if ( $permission == $requestedPermission )
  			{
  				return true;
  			}
  			elseif ( strstr($permission,"*") )
  			{
  				$pos = strpos($permission,"*");
  				if ( substr($permission,0,$pos) == substr($requestedPermission,0,$pos) )
  				{
  					return true;
  				}
  			}
  		}
  		
  		/*
  		 * Permission was not found
  		 */
      if ( ! count( $permModel->getByNamedId($requestedPermission) ) )
      {
        /*
         * permission does not exist, create it
         */
        $permModel->create($requestedPermission);
        $this->info("Permission '$requestedPermission' created.");
      }
  		return false;
   }
   
   /**
    * requires a specific permission 
    * if active user does not have the permission, abort
    * with an error
    */
   function requirePermission($permission)
   {
   		if ( $this->hasPermission($permission) )
   		{
   			return true;
   		}
   		else
   		{
        $controller =& $this->getController();
        $userModel  =& $controller->getUserModel();
        $userName   =  $userModel->getActiveUserNamedId();
        $this->info("User '$userName' does not have required permission '$permission'. Access denied.");
        $this->raiseError("Permission denied.");
   		}
   }
   
 /**
  * gets userdata and security policies 
  * @param string username
  * @return array security policy and user data
  */
  function getSecurity( $username )
  {
		/*
		 * models
		 */
    $controller =& $this->getController();
    $roleModel  =& $controller->getRoleModel();
    
    /*
		 * userdata
		 */ 
		$userdata = $this->getByName($username);
		unset($userdata[$this->col_password]);

		/*
		 * get all roles and permissions
		 */
		$roles = array();
		$roleDescriptiveNames = array();
		
    $roleNamedIds = $this->getRoles($username);
		foreach ( $roleNamedIds as $roleNamedId )
		{
			$roleDescriptiveNames[]	= $roleModel->getDescriptiveName($roleNamedId);
			$roles[$roleNamedId] 	  = $roleModel->getPermissions($roleNamedId);
		}
		
		/*
		 * return client data
		 */
		$userdata['roles'] = implode(", ",$roleDescriptiveNames);
		$userdata['icon']  = $this->icon;
		$security = array(
			'userdata'	=> $userdata,
			'roles'		=> $roles
		);
		
		/*
		 * return security data
		 */
		return $security;
  }

 /**
  * add user(s) to role(s) 
  * @param mixed $userRefs (array or number) user ref(s) (id or namedId)
  * @param mixed $roleRefs (array or number) role refs (id or namedId)
  */
  function addToRole( $userRefs, $roleRefs )
  {
  	$userRefs	  = (array) $userRefs;
  	$roleRefs	  = (array) $roleRefs;
    $controller =& $this->getController();
    $roleModel  =& $controller->getRoleModel();
    	
  	foreach ( $userRefs as $userRef )
  	{
    	$userId = $this->getIdFromRef($userRef);
    	if ( ! $userId )
    	{
    		$this->raiseError("qcl_access_user::addToRole : Invalid user reference: $userRef");
    	}
    	foreach ( $roleRefs as $roleRef )
    	{
    		$roleId = $roleModel->getIdFromRef($roleRef);
	    	if ( ! $roleId )
	    	{
	    		$this->raiseError("qcl_access_user::addToRole : Invalid role reference: $roleRef");
	    	}
    		$row = array();
    		$row[$roleModel->foreignKey] = $roleId;
    		$row[$this->foreignKey] = $userId; 
    		$this->db->insert($this->table_link_user_roles,$row);
    	}
  	}	
  	return true;
  }

 /**
  * removes user(s) from  role(s) 
  * @param mixed $userRefs (array or number) user ref(s) (id or namedId)
  * @param mixed $roleRefs (array or number) role refs (id or namedId)  or "*" to remove from all roles 
  */
  function removeFromRole( $userRefs, $roleRefs  )
  {
  	$userRefs	  =  (array) $userRefs;
  	$roleRefs	  =  (array) $roleRefs;
    $controller =& $this->getController();
    $roleModel  =& $controller->getRoleModel();
  	
  	foreach( $userRefs as $userRef )
  	{
    	$userId = $this->getIdFromRef($userRef);
    	if ( ! $userId )
    	{
    		$this->raiseError("qcl_access_user::removeFromRole : Invalid user reference: $userRef");
    	}
    	
    	foreach ( $roleRefs as $roleRef )
    	{
    		$roleId = $roleModel->getIdFromRef($roleRef);
        if ( $roleRef == "*" )
        {         
  				$this->db->execute("
  					DELETE FROM `{$this->table_link_user_roles}`
  					WHERE 	`{$this->foreignKey}` = $userId
  				");
        }
        elseif ( $roleId )
        {
  				$this->db->execute("
  					DELETE FROM `{$this->table_link_user_roles}`
  					WHERE 	`{$this->foreignKey}` = $userId
  					AND 	`{$roleModel->foreignKey}` = $roleId
  				");            
        }
        else 
	    	{
	    		$this->raiseError("qcl_access_user::removeFromRole : Invalid role reference: '$roleRef'");
	    	}
    	}
  	}
  	return true;
  }
  
  
  /**
   * resets the timestamp of the last action  for the currently active user or a specified user ID 
   * @return void
   * @param mixed $userRef int user id or not given if for currently active user
   */
  function resetLastAction( $userRef=null )
  {
    
    $userId = $this->getIdFromRef( $userRef);
    
    if ( ! $this->col_lastAction )
    {
      $this->raiseError("User model does not have a lastAction column.");
    }
    
    if ( ! $userId )
    {
      $userId = $this->getActiveUserId();  
    }
    
    // reset timestamp
    $this->db->execute("
      UPDATE `{$this->table}`
         SET `{$this->col_lastAction}` = NOW()
       WHERE `{$this->col_id}` = $userId;
    ");
  }
  
  /**
   * get number of seconds since resetLastAction() has been called
   * for the current user or the specified user
   * @return int seconds
   * @param mixed $userRef int user id or not given if for currently active user
   */
  function getSecondsSinceLastAction ( $userRef = null )
  {
    
    $userId = $this->getIdFromRef( $userRef);
    
    if ( ! $this->col_lastAction )
    {
      $this->raiseError("User model does not have a lastAction column.");
    }
    
    if ( ! $userId )
    {
      $userId = $this->getActiveUserId();  
    }
    
    // get seconds since last action
    $seconds = $this->db->getValue("
      SELECT TIME_TO_SEC( TIMEDIFF( NOW(), {$this->col_lastAction} ) )
        FROM `{$this->table}`
       WHERE `{$this->col_id}` = $userId;
    ");
    
    return $seconds;
  }
}
?>