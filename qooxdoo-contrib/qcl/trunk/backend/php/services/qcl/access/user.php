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
 */
class qcl_access_user extends qcl_access_common
{

  /**
   * Icon representing this object
   */
  var $icon = "icon/16/apps/system-users.png";

  /**
   * Node type for drag & drop support
   */
  var $nodeType = "qcl.auth.types.User";

  /**
   * Short name for type
   */
  var $shortName = "user";

  /**
   * names that cannot be used as namedIS
   */
  var $reservedNames = array("default","admin","global");

  /**
   * name of anonymous user
   */
  var $anonymous_name = "guest";
  
  /**
   * password of anonymous user
   */
  var $anonymous_password = "guest";  

  /**
   * Returns singleton instance.
   * @static
   * @return qcl_access_user
   */
  function &getInstance( $class=__CLASS__ )
  {
    return parent::getInstance( $class );
  }

  /**
   * Returns the active object saved in the session
   * @return qcl_access_user
   */
  function &getActiveUser()
  {
    $activeUser = &$_SESSION[QCL_ACTIVE_USER_SESSION_VARNAME];
    if ( ! is_a( $activeUser, $this->className() ) )
    {
      $activeUser = null;
    }
    return $activeUser;
  }
   
  /**
   * Copies the active user object into the session
   * @param qcl_access_user $userObject A user object or null to logout.
   */
  function setActiveUser($userObject)
  {
    if ( is_null( $userObject ) or is_a( $userObject, $this->className() ) )
    {
      $_SESSION[QCL_ACTIVE_USER_SESSION_VARNAME] = $userObject;
    }
    else
    {
      $this->raiseError("Active user object must be NULL or of class '". $this->className() . "', but is '" .
       ( is_object($userObject) ? get_class($userObject) : gettype( $userObject) ) . "'.");
    }
  }

  /**
   * Whether the given user name is the name of a guest (anonymous) user
   * @param string $userName 
   * @return bool True if user name is guest
   * @todo: we need some more sophisticated stuff here
   */
  function isGuest($userName)
  {
    return ( $this->getNamedId() == $this->anonymous_name ) ;
  }  
  
  /**
   * Authenticate a user with a password.
   * If no username is given, check if a user has already been logged in,
   * so you can use this method in your service class without parameters
   * to make sure a login has taken place.
   * @param string $username or null
   * @param string $password (MD5-encoded) password or null
   * @return boolean success
   */
  function authenticate ( $username=null, $password=null )
  {
    if ( ! $username )
    {
      if ( $this->getActiveUser() )
      {
        /*
         * user has already been authenticated
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
    $this->findByNamedId( $username );
    if ( $this->foundNothing() )
    {
      $this->setError($this->tr("Unknown user name."));
      $this->setActiveUser(null);
      return false;
    }
    	
    /*
     * compare provided password with stored password
     */
    $savedPw = $this->getPassword();
    	
    if ( ! $savedPw or
    $password === $savedPw or
    md5( $password ) === $savedPw or
    $password === md5 ( $savedPw ) )
    {
      $activeUser =& $this->cloneObject();
      $this->setActiveUser( &$activeUser );
      $activeUser->resetLastAction();
      return true;
    }
    else
    {
      $this->setError($this->tr( "Wrong Password" ) );
      $this->setActiveUser(null);
      return false;
    }
  }
  
  /**
   * Grant guest access
   * @return void
   */
  function guestAccess()
  {
    $this->findByNamedId($this->anonymous_name);
    if ( $this->foundNothing() )
    {
      $this->raiseError("Cannot grant guest acces because no user '{$this->anonymous_name}' exists.");
    }
    $activeUser =& $this->cloneObject();
    $this->setActiveUser( &$activeUser );
  }
  
  /**
   * Deletes the active user
   * @return void
   */
  function logout()
  {
    $this->setActiveUser(null);
  }

  /**
   * Checks if the current user has the given permission
   * respects wildcards, i.e. myapp.permissions.* covers
   * myapp.permissions.canDoFoo
   * @param string $requestedPermission the permission to check
   */
  function hasPermission($requestedPermission)
  {
    /*
     * models
     */
    $controller  =& $this->getController();
    $permModel   =& $controller->getPermissionModel();
     
    /*
     * get all permissions of the user
     */
    $permissions 	= $this->permissions('namedId');

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
    $permModel->getByNamedId($requestedPermission);
		if ( $permModel->foundNothing() )
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
   * Requires a specific permission. If current user does not have the permission,
   * throw an error
   */
  function requirePermission($permission)
  {
    if ( $this->hasPermission($permission) )
    {
      return true;
    }
    else
    {
      $userName = $this->getNamedId();
      $this->info("User '$userName' does not have required permission '$permission'. Access denied.");
      $this->raiseError("Permission denied.");
    }
  }
  
  /**
   * Returns a preconfigured role model, holding only the records
   * that are linked to the current user
   * @return qcl_access_role
   */
  function &getRoleModel()
  {
    $controller =& $this->getController();
    $roleModel  =& $controller->getRoleModel();
    $roleModel->findByLinkedId($this->getId(),"user",null,$prop);
    return $roleModel;
  } 
  
  /**
   * Returns list of role that belong to a user
   * @param string $prop Property to retrieve, defaults to "id"
   * @return array Array of values
   */
  function roles($prop="id")
  {
    $roleModel  =& $this->getRoleModel();
    return $roleModel->values();
  }   
  
  /**
   * Returns list of role that belong to a user
   * @param string $prop Property to retrieve, defaults to "id"
   * @return array Array of values
   */
  function permissions($prop="id")
  {
    $permissions =  array();
    $roleModel   =& $this->getRoleModel();
    if ( $roleModel->foundSomething() )
    {
      do
      {
        $permissions = array_unique(array_merge( $permissions, $roleModel->permissions($prop) ) );
      }
      while( $roleModel->nextRecord() );
    }
    return $permissions;
  }   
   
  /**
   * Returns userdata and security policies for the current user.
   * @param string username
   * @return array security policy and user data
   */
  function securityData()
  {
    /*
     * models
     */
    $controller =& $this->getController();
    $roleModel  =& $controller->getRoleModel();

    /*
     * get all roles and permissions
     */
    $roles = array();
    $roleModel->findByLinkedId( $this->getId(), "user");
    if ( $roleModel->foundSomething() )
    {
      do
      {
        $roleNamedId          = $roleModel->getNamedId();
        $roleNames[]          = $roleModel->getName();
        $roles[$roleNamedId]  = $roleModel->permissions();
      }
      while ( $roleModel->nextRecord() );   
    }
    
    /*
     * user data
     */
    $userdata = array(
      'namedId'  => $this->getNamedId(),
      'username' => $this->getNamedId(),
      'name'     => $this->getName(),
      'roles'    => implode(", ",$roleNames ),
      'icon'     => $this->icon
    );
    
    /*
     * return data
     */
    $securityData = array(
      'userdata'	=> $userdata,
      'roles'		  => $roles
    );
    return $securityData;
  }

  /**
   * add user(s) to role(s)
   * @param mixed $userRefs (array or number) user ref(s) (id or namedId)
   * @param mixed $roleRefs (array or number) role refs (id or namedId)
   */
  function addToRole( $userRefs, $roleRefs )
  {
    $this->raiseError("Not implemented");
    return true;
  }

  /**
   * removes user(s) from  role(s)
   * @param mixed $userRefs (array or number) user ref(s) (id or namedId)
   * @param mixed $roleRefs (array or number) role refs (id or namedId)  or "*" to remove from all roles
   */
  function removeFromRole( $userRefs, $roleRefs  )
  {
    $this->raiseError("Not implemented");
    return true;
  }


  /**
   * Resets the timestamp of the last action  for the current user
   * @return void
   */
  function resetLastAction()
  {
    $activeUser->setProperty("lastAction", $this->getTimestamp() );
    $activeUser->save();
  }

  /**
   * Returns number of seconds since resetLastAction() has been called 
   * for the current user
   * for the current user or the specified user
   * @return int seconds
   */
  function getSecondsSinceLastAction()
  {
    $userId = $this->getId();
    $lastActionCol = $this->getColumnName("lastAction");
    $seconds = $this->db->getValue("
      SELECT TIME_TO_SEC( TIMEDIFF( NOW(), `$lastActionCol` ) )
        FROM `{$this->table}`
       WHERE `id` = $userId;
    ");
    return $seconds;
  }
  
}
?>