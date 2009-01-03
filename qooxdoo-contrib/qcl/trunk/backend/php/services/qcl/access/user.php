<?php

/*
 * Dependencies
 */
require_once "qcl/access/common.php";

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
   * Whether the given user name is the name of a guest (anonymous) user
   * @return bool True if user name is guest
   * @todo we need some more sophisticated stuff here
   */
  function isAnonymous()
  {
    return ( substr( $this->getNamedId(), 0, strlen(QCL_ANONYMOUS_USER_PREFIX) ) == QCL_ANONYMOUS_USER_PREFIX );
  }  
  
  function isAdmin()
  {
    return ( $this->hasRole("qcl.roles.Administrator") );
  }
  
  /**
   * Creates a new anonymous guest user
   * @return void
   */
  function createGuestUser()
  {
    /*
     * purge inactive guests
     */
    $this->purgeInactiveGuestUsers();
    
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
    
    $username = QCL_ANONYMOUS_USER_PREFIX . microtime_float()*100;
    $this->create($username);
    $this->linkWith(&$roleModel);      
  }
  
  /**
   * Purge all anonymous guests that are inactive for more than
   * one hour
   * @todo unhardcode timeout
   */
  function purgeInactiveGuestUsers()
  {
    $u = QCL_ANONYMOUS_USER_PREFIX;
    $l = strlen($u);
    $this->findWhere("
      SUBSTR(`username`,1,$l) = '$u' AND
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
   * Deletes the active user, also purging linked data
   * @param array[optional] $ids If null (default), delete active record, otherwise delete given ids.
   * @return void
   */
  function delete( $ids=null )
  {
    /*
     * if argument is array, delete list of ids
     */
    if ( is_array( $ids) )
    {
      foreach($ids as $id )
      {
        $this->load($id);
        $this->delete();
      }
      return;
    }
    
    /*
     * otherwise, delete active record
     */    
    $controller =& $this->getController();
   
    /*
     * delete config data for real users
     */
    if ( ! $this->isAnonymous() )
    {
      $configModel =& $controller->getConfigModel();
      $configModel->deleteByUser( $this->getId() );
    }
    
    /*
     * call parent method to delete data
     */
    parent::delete();
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
   * Whether the user has the given role
   * @param string $role
   * @return bool
   * @todo this can be optimized
   */
   function hasRole($role)
   {
     $roleModel =& $this->linkedRoleModel();
     do
     {
       if ( $roleModel->getNamedId() == $role ) return true;
     }
     while( $roleModel->nextRecord() );
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