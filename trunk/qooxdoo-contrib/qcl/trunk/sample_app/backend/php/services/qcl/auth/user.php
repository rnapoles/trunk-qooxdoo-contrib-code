<?php

require_once ("qcl/auth/__init__.php");

/**
 * class providing data on users
 * providing a backend to the qcl.auth client package
 * 
 * Class cannot be used directly, you need to subclass it 
 * in your application service class folder
 */

class qcl_auth_user extends qcl_auth_common
{    

   //-------------------------------------------------------------
   // class variables, override if necessary
   //-------------------------------------------------------------

	var $table			= "users";
	var $key_namedId	= "username";
	var $key_username 	= "username"; 
	var $key_password 	= "password";
	var $icon 			= "icon/16/apps/system-users.png";
	var $nodeType		= "qcl.auth.types.User";
	var $shortName		= "user";
	var $foreignKey		= "userId";
	
	
   //-------------------------------------------------------------
   // internal methods 
   //-------------------------------------------------------------
   
   /**
    * constructor 
    * @param object reference $controller
    */
	function __construct()
   	{
		parent::__construct();
	}   
 
   //-------------------------------------------------------------
   // non-rpc public methods 
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
			$this->raiseError("qx::security::user::getRoles : invalid user reference '$userRef'.");
		}

		if ($getNamedIds === null)
		{
			return $this->db->getAllRows("
				SELECT 
					r.*
				FROM 
					`{$this->role->table}` as r,
					`{$this->table_link_user_roles}` as l
				WHERE
					r.`{$this->role->key_id}` = l.`{$this->role->foreignKey}`
					AND l.`{$this->foreignKey}` = $userId
			"); 

		}
		
		$rows = $this->db->getAllRows("
			SELECT
				r.`{$this->role->key_id}` as id,
				r.`{$this->role->key_namedId}` as nameId
			FROM 
				`{$this->role->table}` as r,
				`{$this->table_link_user_roles}` as l
			WHERE
				r.`{$this->role->key_id}` = l.`{$this->role->foreignKey}`
				AND l.`{$this->foreignKey}` = $userId
		");
			
		$result = array();
		foreach ( $rows as $row )
		{
			$result[] = $getNamedIds ? $row['nameId'] : (int) $row['id'];
		}
		return $result;
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
		$userId = $this->getIdFromRef($userRef);
		if ( ! $userId )
		{
			$this->raiseError("qx::security::user::getPermissions : invalid user reference '$userRef'.");
		}
		
		$myRoles = $this->getRoles($userRef,$getNamedIds);
		
		$result = array();
		foreach ( $myRoles as $roleRef )
		{
			$result = array_unique(array_merge(
				$result,
				$this->role->getPermissions( $roleRef, $getNamedIds )
			));
		}
		return $result;
   }
   
   /**
    * authenticate a user with a password
    * @param string $username
    * @param string $password (MD5-encoded) password
    */
   function authenticate ( $username=null, $password=null )
   {
   		$row = $this->getByName ( $username );
   		
   		if ( ! is_array($row) )
   		{
   			$this->error = "Unknown user name";
   			$this->setActiveUser(null);
   			return false;
   		}
   		
   		$savedPw = $row[$this->key_password]; 
   		
   		if ( ! $savedPw or 
   			  $password === $savedPw or   
   			  md5( $password ) === $savedPw or
   			  $password === md5 ( $savedPw ) ) 
   		{
   			$this->setActiveUser($row);
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
   		return $_SESSION['qcl_auth_user_activeUser']; 
   }
   
   /**
    * sets active user information
    * @param array map with user data 
    */
   function setActiveUser($data)
   {
   		$_SESSION['qcl_auth_user_activeUser'] = $data;
   }

   /**
    * gets active user record id
    * @return int
    */
   function getActiveUserId()
   {
   		return $_SESSION['qcl_auth_user_activeUser'][$this->key_id]; 
   }

   /**
    * gets active user name
    * @return int
    */
   function getActiveUserName()
   {
   		return $_SESSION['qcl_auth_user_activeUser'][$this->key_namedId]; 
   }
  
   /**
    * checks if active user has the given permission
    * respects wildcards, i.e. myapp.permissions.* covers
    * myapp.permissions.canDoFoo
    * @param string $requestedPermission the permission to check
    * @param string $user (optional) if given, check this user's permissions. Otherwise 
    *        check the active user's permissions
    */
   function hasPermission($requestedPermission, $user=null)
   {
   		$user 			= $user ? $this->getByName($user) : $this->getActiveUser();
   		$username 		= $user[$this->key_namedId];
   		$permissions 	= $this->getPermissions($username);
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
  		// permission was not found
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
   			$this->raiseError("Permission denied");
   		}
   }
   
   /**
    * gets userdata and security policies 
    * @param string username
    * @return array security policy and user data
    */
    function getSecurity($username)
    {
		// userdata
		$userdata = $this->getByName($username);
		unset($userdata[$this->key_password]);
		$roleNamedIds = $this->getRoles($username);

		// roles and permissions
		$roles = array();
		$roleDescriptiveNames = array();
		foreach ( $roleNamedIds as $roleNamedId )
		{
			
			$roleDescriptiveNames[]	= $this->role->getDescriptiveName($roleNamedId);
			$roles[$roleNamedId] 	= $this->role->getPermissions($roleNamedId);
		}
		
		// security policy data for client
		$userdata['roles'] = implode(", ",$roleDescriptiveNames);
		$userdata['icon']  = $this->icon;
		$security = array(
			'userdata'	=> $userdata,
			'roles'		=> $roles
		);
		return $security;
    }

   /**
    * add user(s) to role(s) 
    * @param mixed $userRefs (array or number) user ref(s) (id or namedId)
    * @param mixed $roleRefs (array or number) role refs (id or namedId)
    */
    function addToRole( $userRefs, $roleRefs )
    {
    	$userRefs	= (array) $userRefs;
    	$roleRefs	= (array) $roleRefs;
    	
    	foreach ( $userRefs as $userRef )
    	{
	    	$userId = $this->getIdFromRef($userRef);
	    	if ( ! $userId )
	    	{
	    		$this->raiseError("qcl_auth_user::addToRole : Invalid user reference: $userRef");
	    	}
	    	foreach ( $roleRefs as $roleRef )
	    	{
	    		$roleId = $this->role->getIdFromRef($roleRef);
		    	if ( ! $roleId )
		    	{
		    		$this->raiseError("qcl_auth_user::addToRole : Invalid role reference: $roleRef");
		    	}
	    		$row = array();
	    		$row[$this->role->foreignKey] = $roleId;
	    		$row[$this->foreignKey] = $userId; 
	    		$this->db->insert($this->table_link_user_roles,$row);
	    	}
    	}	
    	return true;
    }

   /**
    * removes user(s) from  role(s) 
    * @param mixed $userRefs (array or number) user ref(s) (id or namedId)
    * @param mixed $roleRefs (array or number) role refs (id or namedId)   
    */
    function removeFromRole( $userRefs, $roleRefs  )
    {
    	$userRefs	= (array) $userRefs;
    	$roleRefs	= (array) $roleRefs;
    	
    	foreach( $userRefs as $userRef )
    	{
	    	$userId = $this->getIdFromRef($userRef);
	    	if ( ! $userId )
	    	{
	    		$this->raiseError("qcl_auth_user::removeFromRole : Invalid user reference: $userRef");
	    	}
	    	
	    	foreach ( $roleRefs as $roleRef )
	    	{
	    		$roleId = $this->role->getIdFromRef($roleRef);
		    	if ( ! $roleId )
		    	{
		    		$this->raiseError("qcl_auth_user::removeFromRole : Invalid role reference: $roleRef");
		    	}
				$this->db->execute("
					DELETE FROM `{$this->table_link_user_roles}`
					WHERE 	`{$this->foreignKey}` = $userId
					AND 	`{$this->role->foreignKey}` = $roleId
				");
	    	}
    	}
    	return true;
    }
   
   //-------------------------------------------------------------
   // public rpc methods 
   //-------------------------------------------------------------
   
   /**
    * default update client method: authenticate user
    */
   function method_updateClient($params)
   {
		return $this->method_authenticate($params);
   }   
   
   /**
    * default update client method: authenticate user
    * @param string $param[0] username
    * @param string $param[1] (MD5-encoded) password
    */
   function method_authenticate($params)
   {
		$username 	= utf8_decode($params[0]);
		$password 	= utf8_decode($params[1]);
		$activeUser = $this->getActiveUser();
		
		// authenticate user if password matches
		if ( $username and $this->authenticate ( $username, $password ) )
		{
			$security = $this->getSecurity($username);
			$this->setActiveUser($security['userdata']);
			$this->addMessage("qcl.auth.messages.loginSuccess");						
		}
		elseif ( ! $username and $activeUser )
		{
			$security = $this->getSecurity($activeUser[$this->key_username]);
			$this->addMessage("qcl.auth.messages.loginSuccess");
		}
		else
		{
			$security = null;
			$this->setActiveUser(null);
			$this->addMessage( "qcl.auth.messages.loginFailed", $this->error );
		}
		
		$this->set("security", $security );
		
		return $this->getResult();
   }   
   
   /**
    * logout current user
    */
   function method_logout()
   {
		$this->setActiveUser(null);
		$this->addMessage("qcl.auth.messages.user.loggedOut");
		return $this->getResult();
   }   

   /**
    * add user(s) to role(s)
    * @param null  $param[0] not used
    * @param mixed $param[1] (array or number) user refs (id or namedId)
    * @param mixed $param[2] (array or number) role refs (id or namedId)
    */
    function method_addToRole($params)
    {
    	$this->requirePermission("qcl.auth.permissions.manage");
    	
    	$userRefs 	= $params[1];
    	$roleRefs 	= $params[2];
    	
    	$this->addToRole($userRefs,$roleRefs); 
    	$this->addMessage("qcl.auth.messages.user.roleAdded",$userRefs);
    	return $this->getResult();
    }
   
   /**
    * removes user(s) from role(s)
    * @param null  $param[0] not used
    * @param mixed $param[1] (array or number) user refs (id or namedId)
    * @param mixed $param[2] (array or number) role refs (id or namedId)
    */
    function method_removeFromRole($params)
    {
    	$this->requirePermission("qcl.auth.permissions.manage");
    	
    	$userRefs 	= $params[1];
    	$roleRefs 	= $params[2];

    	$this->removeFromRole($userRefs,$roleRefs);

    	$this->addMessage("qcl.auth.messages.user.roleRemoved",$userRefs); 
    	return $this->getResult();
    }



}
?>