<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
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

  /**
   * The path to the schema file
   * @var string
   */
   public $schemaXmlPath  = "qcl/access/model/User.model.xml";

  /**
   * names that cannot be used as namedId
   */
  public $reservedNames = array("default","admin","global");

  /**
   * Returns singleton instance.
   * @static
   * @return qcl_access_model_User
   */
  static function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Getter for permission model instance
   * @return qcl_access_model_Permission
   */
  public function getPermissionModel()
  {
    return qcl_access_model_Permission::getInstance();
  }

  /**
   * Getter for role model instance
   * @return qcl_access_model_Role
   */
  public function getRoleModel()
  {
    return qcl_access_model_Role::getInstance();
  }

  /**
   * Return the username (login name) of the current user.
   * Alias of getNamedId()
   * @return string
   * @todo rename to getUsername()
   */
  public function username()
  {
    return $this->getNamedId();
  }

  /**
   * Whether the given user name is the name of a guest (anonymous) user
   * @return bool True if user name is guest
   * @todo we need some more sophisticated stuff here
   */
  public function isAnonymous()
  {
    return $this->get("anonymous")==true;
  }

  public function isAdmin()
  {
    return ( $this->hasRole("qcl.roles.Administrator") );
  }

  /**
   * Creates a new anonymous guest user
   * @return int user id of the new user record
   */
  public function createAnonymous()
  {
    /*
     * purge inactive guests
     */
    $this->purgeInactiveGuestUsers();

    /*
     * role model
     */
    $roleModel = qcl_access_model_Role::getInstance();
    $roleModel->load(1); // the anonymous role is ALWAYS the first role defined
    if ( $roleModel->foundNothing() )
    {
      $this->raiseError("You need to have at least one role, the first one being the anonymous role.");
    }

    $username = QCL_ACCESS_ANONYMOUS_USER_PREFIX . microtime_float()*100;
    $id = $this->create($username);

    if ( ! $id )
    {
      $this->raiseError("Failed to create anonmous user");
    }

    $this->linkWith($roleModel);
    $this->set("anonymous",true);
    $this->set("name",$this->tr("Anonymous User"));
    $this->save();

    return $id;
  }

  /**
   * Purge all anonymous guests that are inactive for more than
   * one hour.
   * @todo unhardcode timeout
   */
  public function purgeInactiveGuestUsers()
  {
    $u = QCL_ANONYMOUS_USER_PREFIX;
    $l = strlen($u);
    $this->findWhere("
      SUBSTR(`namedId`,1,$l) = '$u' AND
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
    if ( is_array( $ids ) )
    {
      foreach($ids as $id )
      {
        $this->load($id);
        $this->delete();
      }
      return;
    }

    /*
     * delete config data
     * @todo -> this should be automatically linked in the model schema
     */
    $configModel = $this->getApplication()->getConfigModel();
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
  public function hasPermission( $requestedPermission )
  {
    if ( ! $this->foundSomething() )
    {
      $this->raiseError("You can check permissions only on a initialized user. In most cases, this is the active user.");
    }

    /*
     * models
     */
    $permModel = $this->getPermissionModel();

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
     $roleModel = $this->linkedRoleModel();
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
  function linkedRoleModel($properties="*")
  {
    $roleModel  = $this->getRoleModel();
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
    $roleModel  = $this->linkedRoleModel($prop);
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
    $roleModel = $this->linkedRoleModel();
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
    $table = $this->table();
    $lastActionCol = $this->getColumnName("lastAction");
    $seconds = $this->db->getValue("
      SELECT TIME_TO_SEC( TIMEDIFF( NOW(), `$lastActionCol` ) )
        FROM `$table`
       WHERE `id` = $userId;
    ");
    return (int) $seconds;
  }

}
?>