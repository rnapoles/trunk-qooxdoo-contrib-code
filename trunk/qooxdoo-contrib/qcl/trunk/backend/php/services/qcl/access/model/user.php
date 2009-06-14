<?php

/*
 * Dependencies
 */
require_once "qcl/access/model/Common.php";

/**
 * class providing data on users
 * providing a backend to the qcl.auth client package
 *
 * Class cannot be used directly, you need to subclass it
 * in your application service class folder
 * @todo separate user model class and active user class
 */
class qcl_access_model_User extends qcl_access_model_Common
{

   var $schemaXmlPath  = "qcl/access/model/user.model.xml";
   var $importDataPath = "qcl/access/model/user.data.xml";

  /**
   * names that cannot be used as namedIS
   */
  var $reservedNames = array("default","admin","global");

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
    $roleModel  =& qcl_access_model_Role::getInstance();
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
   * one hour. Can be called statically
   * @todo unhardcode timeout
   */
  function purgeInactiveGuestUsers()
  {
    $u = QCL_ANONYMOUS_USER_PREFIX;
    $l = strlen($u);
    $_this = qcl_access_model_User::getInstance();
    $_this->findWhere("
      SUBSTR(`username`,1,$l) = '$u' AND
      ( TIME_TO_SEC( TIMEDIFF( NOW(), `lastAction` ) ) > 3600
        OR `lastAction` IS NULL )
    ",null,"id");
    $ids = $_this->values();

    if ( count( $ids ) )
    {
      $_this->delete( $ids );
    }
  }

  /**
   * Deletes the active user, also purging linked data. Can be called statically
   * if an argument is provided
   * @param array[optional] $ids If not given, delete active record, otherwise delete given ids.
   *
   * @return void
   */
  function delete( $ids=null )
  {
    /*
     * if argument is array, delete list of ids
     */
    if ( is_array( $ids) )
    {
      $_this = qcl_access_model_User::getInstance();
      foreach($ids as $id )
      {
        $_this->load($id);
        $_this->delete();
      }
      return;
    }

    /*
     * delete config data
     */
    $configModel =& qcl_application_Application::getConfigModel();
    $configModel->deleteByUserId( $this->getId() );

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
    $permModel =& qcl_access_model_Permission::getInstance();

    /*
     * get all permissions of the user
     */
    $permissions = $this->getPermissions();

    /*
     * check if permission is granted
     */
    foreach( $permissions as $permission )
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
   * Returns a preconfigured role model, holding only the records
   * that are linked to the current user
   * @param string|array $properties
   * @return qcl_access_model_Role
   */
  function &linkedRoleModel($properties="*")
  {
    $roleModel  =& qcl_access_model_Role::getInstance();
    $roleModel->findByLinkedModel( $this, null, $properties );
    return $roleModel;
  }

  /**
   * Returns list of role that belong to a user
   * @param string $prop Property to retrieve, defaults to "namedId"
   * @return array Array of values
   */
  function getRoles( $prop="namedId" )
  {
    $roleModel  =& $this->linkedRoleModel($prop);
    return $roleModel->values();
  }

  function getRoleIds()
  {
    return $this->getRoles("id");
  }

  /**
   * Returns list of role that belong to a user
   * @param string $prop Property to retrieve, defaults to "id"
   * @return array Array of values
   */
  function getPermissions( $prop="namedId" )
  {
    $permissions =  array();
    $roleModel =& $this->linkedRoleModel();
    if ( $roleModel->foundSomething() )
    {
      do
      {
        $permissions = array_unique( array_merge(
          $permissions, $roleModel->getPermissions( $prop )
        ) );
      }
      while( $roleModel->nextRecord() );
    }
    return $permissions;
  }

  function getPermissionIds()
  {
    return $this->getPermissions("id");
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
   * @todo unhardcode sql
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