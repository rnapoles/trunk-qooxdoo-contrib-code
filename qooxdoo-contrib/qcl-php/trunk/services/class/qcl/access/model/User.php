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

qcl_import( "qcl_data_model_db_NamedActiveRecord" );
qcl_import( "qcl_data_datasource_DbModel" );

/**
 * class providing data on users
 * providing a backend to the qcl.auth client package
 *
 * Class cannot be used directly, you need to subclass it
 * in your application service class folder
 */
class qcl_access_model_User
  extends qcl_data_model_db_NamedActiveRecord
{
  /**
   * The table storing model data
   */
  protected $tableName = "data_User";

  /**
   * Properties
   */
  private $properties = array(
    'name'  => array(
      'check'     => "string",
      'sqltype'   => "varchar(100)"
    ),
    'password'  => array(
      'check'     => "string",
      'sqltype'   => "varchar(32)"
    ),
    'email'  => array(
      'check'     => "string",
      'sqltype'   => "varchar(255)"
    ),
    'anonymous'  => array(
      'check'     => "boolean",
      'sqltype'   => "int(1)",
      'nullable'  => false,
      'init'      => false
    ),
    'active'  => array(
      'check'     => "boolean",
      'sqltype'   => "int(1)",
      'nullable'  => false,
      'init'      => true
    ),
    'lastAction'  => array(
      'check'     => "qcl_data_db_Timestamp",
      'sqltype'   => "timestamp",
      'export'    => false
    )
  );

  /**
   * The foreign key of this model
   */
  protected $foreignKey = "UserId";

  /**
   * Relations
   */
  private $relations = array(
    'User_Role' => array(
      'type'        => QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY,
      'target'      => array( 'class' => "qcl_access_model_Role" )
    ),
    'User_UserConfig' => array(
      'type'        => QCL_RELATIONS_HAS_MANY,
      'target'      => array(
        'class'       => "qcl_config_UserConfigModel",
        'dependent'   => true
      )
    ),
    'User_Session'  => array(
      'type'    => QCL_RELATIONS_HAS_MANY,
      'target'  => array(
        'class'     => "qcl_access_model_Session",
        'dependent' => "true"
      )
    ),
    'Datasource_User' => array(
      'type'        => QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY,
      'target'      => array( 'class' => "qcl_data_datasource_DbModel" )
    )
  );

  /**
   * names that cannot be used as namedId
   */
  public $reservedNames = array("default","admin","global");

  /**
   * Constructor
   * @return unknown_type
   */
  function __construct()
  {
    parent::__construct();
    $this->addProperties( $this->properties );
    $this->addRelations( $this->relations, __CLASS__ );
  }

  /**
   * Returns singleton instance.
   * @return qcl_access_model_User
   */
  static public function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Getter for permission model instance
   * @return qcl_access_model_Permission
   */
  protected function getPermissionModel()
  {
    return $this->getRoleModel()->getRelationBehavior()->getTargetModel("Permission_Role");
  }

  /**
   * Getter for role model instance
   * @return qcl_access_model_Role
   */
  protected function getRoleModel()
  {
    return $this->getRelationBehavior()->getTargetModel("User_Role");
  }

  /**
   * Return the username (login name) of the current user.
   * Alias of getNamedId()
   * @return string
   * @todo rename to getUsername()
   */
  public function username()
  {
    return $this->namedId();
  }

  /**
   * Whether the given user name is the name of a guest (anonymous) user
   * @return bool True if user name is guest
   * @todo we need some more sophisticated stuff here
   */
  public function isAnonymous()
  {
    return (bool) $this->getAnonymous();
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
    $roleModel =$this->getRoleModel();
    try
    {
       $roleModel->load("anonymous");
    }
    catch( qcl_data_model_Exception $e)
    {
      $this->raiseError("No 'anonymous' role defined.");
    }

    $username = QCL_ACCESS_ANONYMOUS_USER_PREFIX . microtime_float()*100;
    $id = $this->create( $username, array(
      'anonymous' => true,
      'name'      => $this->tr("Anonymous User")
    ) );
    if ( ! $id )
    {
      $this->raiseError("Failed to create anonymous user");
    }
    /*
     * link to anonymous role
     */
    try
    {
      $this->linkModel( $roleModel );
    }
    catch( qcl_data_model_RecordExistsException $e)
    {
      $this->warn( $e->getMessage() );
    }
    return $id;
  }

  /**
   * Purge all anonymous guests that are inactive for more than
   * one hour.
   * @todo unhardcode timeout
   */
  public function purgeInactiveGuestUsers()
  {
    $queryBehavior = $this->getQueryBehavior();
    $lastActionCol = $queryBehavior->getAdapter()->formatColumnName( "lastAction");
    $modifiedCol   = $queryBehavior->getAdapter()->formatColumnName( "modified");
    $this->getQueryBehavior()->deleteWhere("
      `anonymous` = 1 AND
      ( TIME_TO_SEC( TIMEDIFF( NOW(), $lastActionCol ) ) > 3600
        OR TIME_TO_SEC( TIMEDIFF( NOW(), $modifiedCol ) ) > 3600 )
    ");
  }

  /**
   * Checks if the current user has the given permission
   * respects wildcards, i.e. myapp.permissions.* covers
   * myapp.permissions.canDoFoo
   * @param string $requestedPermission the permission to check
   */
  public function hasPermission( $requestedPermission )
  {

    /*
     * get all permissions of the user
     */
    $permissions = $this->permissions();

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
  function hasRole( $role )
  {
    return in_array( $role, $this->roles() );
  }

  /**
   * Returns list of role that belong to a user
   * @return array Array of values
   */
  function roles()
  {
    $roleModel = $this->getRoleModel();
    $roleModel->findLinkedModels( $this );
    $roles = array();
    while( $roleModel->loadNext() )
    {
      $roles[] = $roleModel->namedId();
    }
    return $roles;
  }

  /**
   * Returns list of the ids of the role that belong to a user
   * @return array Array of values
   */
  function roleIds()
  {
    $roleModel = $this->getRoleModel();
    return $roleModel->linkedModelIds( $this );
  }

  /**
   * Returns list of role that belong to a user
   * @param string $prop Property to retrieve, defaults to "id"
   * @return array Array of values
   */
  function permissions()
  {
    $roleModel = $this->getRoleModel();
    $roles = $this->roles();
    $permissions =  array();
    foreach( $roles as $roleName )
    {
      $roleModel->load( $roleName );
      $permissions = array_merge(
        $permissions,
        $roleModel->permissions()
      );
    }
    return $permissions;
  }

  /**
   * Resets the timestamp of the last action  for the current user
   * @return void
   */
  function resetLastAction()
  {
    $this->set( "lastAction", new qcl_data_db_Timestamp("now") );
    $this->save();
  }

  /**
   * Returns number of seconds since resetLastAction() has been called
   * for the current user
   * @return int seconds
   */
  function getSecondsSinceLastAction()
  {
    $now  = new qcl_data_db_Timestamp();
    $d = $now->diff( $this->get( "lastAction") );
    return (int) ( $d->s + 60 * $d->i + 3600 * $d->h + 3600*12 * $d->d );
  }

}
?>