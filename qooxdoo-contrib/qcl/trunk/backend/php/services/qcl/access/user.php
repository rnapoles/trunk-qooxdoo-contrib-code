<?php

/*
 * Dependencies
 */
require_once "qcl/access/common.php";

/*
 * Constants
 */
define('QCL_ACTIVE_USER_ID_VAR', "qcl_access_user_activeUserId");
define('QCL_ANONYMOUS_USER_PREFIX', "anonymous_");

/**
 * class providing data on users
 * providing a backend to the qcl.auth client package
 *
 * Class cannot be used directly, you need to subclass it
 * in your application service class folder
 * @todo separate user model class and active user class
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
   * The active user object
   * Access with getActiveUser()/setActiveUser() only
   * @access private
   * @var qcl_access_user
   */
  var $_activeUser;
  
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
   * Return the username (login name) of the current user.
   * Alias of getNamedId()
   * @return string
   */
  function username()
  {
    return $this->getNamedId();   
  }  
  
  /**
   * Returns the active object saved in the session
   * @return qcl_access_user
   */
  function &getActiveUser()
  {

    /*
     * no active user
     */
    if ( ! $_SESSION[QCL_ACTIVE_USER_ID_VAR] )
    {
      return null;
    }
        
    /*
     * Create a user model instance
     */
    if ( ! $this->_activeUser )
    {
      $className  =  $this->className();
      $controller =& $this->getController(); 
      $this->_activeUser =& new $className(&$controller);
      $this->_activeUser->load( $_SESSION[QCL_ACTIVE_USER_ID_VAR] );
    }
    
    /*
     * return the existing or created instance
     */
    return $this->_activeUser;
  }
   
  /**
   * Sets the active user. This will copy the user id into the 
   * session variable, in case the client doesn't provide a session id.
   * @param qcl_access_user $userObject A user object or null to logout.
   */
  function setActiveUser( $userObject )
  {
    /*
     * logout previous user if any
     */
    $this->logout();
    
    /*
     * set new active user
     */
    if ( is_null( $userObject ) or is_a( $userObject, $this->className() ) )
    {
      if ( $userObject )
      {
        $_SESSION[QCL_ACTIVE_USER_ID_VAR] = $userObject->getId();
        $this->_activeUser =& $userObject;
      }
      else
      {
        $_SESSION[QCL_ACTIVE_USER_ID_VAR] = null;
        $this->_activeUser = null;
      }
    }
    else
    {
      $this->raiseError("Active user object must be NULL or of class '". $this->className() . "', but is '" .
       ( is_object($userObject) ? get_class($userObject) : gettype( $userObject) ) . "'.");
    }
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
;
    /*
     * try to authenticate
     */
    $this->findByNamedId( $username );
    if ( $this->foundNothing() )
    {
      $this->setError( $this->tr("Unknown user name.") );
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
      $activeUser = $this->cloneObject();
      $activeUser->resetLastAction();
      $this->setActiveUser( $activeUser );
      return true;
    }
    else
    {
      $this->setError($this->tr( "Wrong Password" ) );
      return false;
    }
  }
  
  /**
   * Grant guest access
   * @return void
   */
  function guestAccess()
  {
    /*
     * purge all anonymous users that haven't been active for more than one hour
     */    
    $this->purgeAnonymous();
    
    /*
     * role model
     */
    $controller =& $this->getController();
    $roleModel  =& $controller->getRoleModel();
    $roleModel->findByNamedId("qcl.roles.Guest");
    if ( $roleModel->foundNothing() )
    {
      $this->raiseError("No guest role available.");
    }
    
    /*
     * create a new guest user and link it to the guest role
     */
    $username = QCL_ANONYMOUS_USER_PREFIX . microtime_float();
    $this->create($username);
    $this->linkWith(&$roleModel);
    $this->setActiveUser( &$this );
  }
  
  /**
   * Whether the given user name is the name of a guest (anonymous) user
   * @return bool True if user name is guest
   * @todo: we need some more sophisticated stuff here
   */
  function isAnonymous()
  {
    return ( substr( $this->getNamedId(), 0, strlen(QCL_ANONYMOUS_USER_PREFIX) ) == QCL_ANONYMOUS_USER_PREFIX );
  }  
  
  /**
   * Purge all anonymous guests that are inactive for more than
   * one hour
   */
  function purgeAnonymous()
  {
    $this->findWhere("
      SUBSTR(`username`,1,6) = '" . QCL_ANONYMOUS_USER_PREFIX . "'AND
      ( TIME_TO_SEC( TIMEDIFF( NOW(), `lastAction` ) ) > 3600
        OR `lastAction` IS NULL ) 
    ",null,"id");
    $ids = $this->values();
    if ( count( $ids ) )
    {
      $this->delete( $ids );  
    }
    
  }
  
  /**
   * Logs out the the active user 
   * @return void
   */
  function logout()
  {
    if (  $this->_activeUser and $this->_activeUser->isAnonymous() )
    {
      $this->_activeUser->delete();
    }
    $this->_activeUser = null;
  }

  /**
   * Checks if the current user has the given permission
   * respects wildcards, i.e. myapp.permissions.* covers
   * myapp.permissions.canDoFoo
   * @param string $requestedPermission the permission to check
   */
  function hasPermission( $requestedPermission )
  {
    if ( ! $this->foundSomething() )
    {
      $this->raiseError("You can check permissions only on a initialized user. In most cases, this is the active user.");
    }    
    
    /*
     * models
     */
    $controller  =& $this->getController();
    $permModel   =& $controller->getPermissionModel();
     
    /*
     * get all permissions of the user
     */
    $permissions = $this->permissions('namedId');

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
    $permModel->getByNamedId( $requestedPermission );
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
    if ( $this->hasPermission( $permission ) )
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
   * @param string|array $properties
   * @return qcl_access_role
   */
  function &linkedRoleModel($properties="*")
  {
    $controller =& $this->getController();
    $roleModel  =& $controller->getRoleModel();
    $roleModel->findByLinkedId( $this->getId(), "user", null, $properties );
    return $roleModel;
  } 
  
  /**
   * Returns list of role that belong to a user
   * @param string $prop Property to retrieve, defaults to "id"
   * @return array Array of values
   */
  function roles( $prop="id" )
  {
    $roleModel  =& $this->linkedRoleModel($prop);
    return $roleModel->values();
  }   
  
  /**
   * Returns list of role that belong to a user
   * @param string $prop Property to retrieve, defaults to "id"
   * @return array Array of values
   */
  function permissions( $prop="id" )
  {
    $permissions =  array();
    $roleModel =& $this->linkedRoleModel();
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
        $roles[$roleNamedId]  = $roleModel->permissions('namedId');
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
   * Resets the timestamp of the last action  for the current user
   * @return void
   */
  function resetLastAction()
  {
    $this->setProperty( "lastAction", $this->getTimestamp() );
    $this->save();
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