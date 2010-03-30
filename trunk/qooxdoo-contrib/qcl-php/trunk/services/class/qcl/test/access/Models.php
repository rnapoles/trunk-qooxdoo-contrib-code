<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2010 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

qcl_import( "qcl_test_AbstractTestController");
qcl_import( "qcl_access_model_User2" );

class Replace
{
    static public $map = array(
    'qcl_access_model_User2'       => "User",
    'qcl_access_model_Role2'       => "Role",
    'qcl_access_model_Permission2' => "Permission",
    'qcl_config_ConfigModel'       => "Config",
    'qcl_config_UserConfigModel'   => "UserConfig"
  );
}

/**
 * Class to model the user data. As the other model classes defined
 * in this test, we subclass the available access model types and
 * selectively change some aspects, such as the names of tables and
 * columns. This is done to demonstrate these features but also in order
 * not to interfere with the real access model data.
 */
class User extends qcl_access_model_User2
{
  /*
   * set a custom table name for this derived model
   */
  protected $tableName = "test_data_User";

  /*
   * set a custom foreign key for the model
   */
  protected $foreignKey = "test_UserId";

  /*
   * Constructor. Applies some necessary modifications that are
   * needed in a derived model to work like the parent class.
   */
  function __construct()
  {
    /*
     * reset behavior caches. This is only needed during development,
     * when model property definitions are being changed.
     */
    $this->resetBehaviors();

    /*
     * define properties / relations in the parent class
     */
    parent::__construct();

    /*
     * selectively alter the name of the join table without redefining the
     * relations in this class. This is needed so that the join tables of
     * the "original" access models are not overwritten by this test.
     */
    $this->getRelationBehavior()->setJoinTableName( "User_Role", "test_join_User_Role" );
  }

  /**
   * Returns singleton instance of this class. Needed in each derived class that
   * has singleton behavior.
   * @return User
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }

  /**
   * Returns the replacement map for class names
   */
  public function replaceClassMap()
  {
    return Replace::$map;
  }
}

/**
 * Class to model the role data
 * @see User
 */
class Role extends qcl_access_model_Role2
{
  protected $tableName = "test_data_Role";
  protected $foreignKey = "test_RoleId";
  public function replaceClassMap() {
    return Replace::$map;
  }
  function __construct() {
    parent::__construct();
    $this->getRelationBehavior()->setJoinTableName( "User_Role", "test_join_User_Role" );
    $this->getRelationBehavior()->setJoinTableName( "Permission_Role", "test_join_Permission_Role" );
  }
  /**
   * @return Role
   */
  public static function getInstance() {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Class to model the permission data.
 * @see User
 */
class Permission extends qcl_access_model_Permission2
{
  protected $tableName = "test_data_Permission";
  protected $foreignKey = "test_PermissionId";
  public function replaceClassMap() {
    return Replace::$map;
  }
  function __construct() {
    parent::__construct();
    $this->getRelationBehavior()->setJoinTableName( "Permission_Role", "test_join_Permission_Role" );
  }
  /**
   * @return Permission
   */
  public static function getInstance() {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Class to model the configuration data.
 * @see User
 */
class Config extends qcl_config_ConfigModel
{
  protected $tableName = "test_data_Config";
  protected $foreignKey = "test_ConfigId";
  public function replaceClassMap() {
    return Replace::$map;
  }
  /**
   * @return Config
   */
  public static function getInstance() {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Class to model the custom user configuration data.
 * @see User
 */
class UserConfig extends qcl_config_UserConfigModel
{
  protected $tableName = "test_data_UserConfig";
  public function replaceClassMap() {
    return Replace::$map;
  }
  /**
   * @return UserConfig
   */
  public static function getInstance() {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Service class containing test methods for access package
 */
class class_qcl_test_access_Models
  extends qcl_test_AbstractTestController
{

  public function method_testModel()
  {
    /*
     * create model instances
     */
    $user = User::getInstance();
    $role = Role::getInstance();
    $permission = Permission::getInstance();

    /*
     * users
     */
    $user->deleteAll();
    $user->create("user1",array( 'name' => "User 1", 'password' => "user1" ) );
    $user->create("user2",array( 'name' => "User 2", 'password' => "user2" ) );
    $user->create("user3",array( 'name' => "User 3", 'password' => "user3" ) );
    $user->create("admin",array( 'name' => "Administrator", 'password' => "admin" ) );

    /*
     * roles
     */
    $role->deleteAll();
    $role->create("anonymous", array( 'name' => "Anonymous user" ) );
    $role->create("user", array( 'name' => "Normal user" ) );
    $role->create("manager", array( 'name' => "Manager role" ) );
    $role->create("admin", array( 'name' => "Administrator role" ) );

    /*
     * permissions
     */
    $permission->deleteAll();
    $permission->create("viewRecord");
    $permission->create("createRecord");
    $permission->create("deleteRecord");
    $permission->create("manageUsers");
    $permission->create("manageConfig");

    /*
     * link records
     */
    $Role_User = array(
      'user'      => array( "user1", "user2", "user3" ),
      'manager'   => array( "user3" ),
      'admin'     => array( "admin" )
    );
    foreach( $Role_User as $roleName => $users )
    {
      $role->load( $roleName );
      foreach( $users as $userName )
      {
        $role->linkModel( $user->load( $userName ) );
      }
    }

    $Role_Permission = array(
      'admin'     => array( "manageUsers" ),
      'manager'   => array( "deleteRecord" ),
      'user'      => array( "createRecord", "viewRecord" ),
      'anonymous' => array( "viewRecord" )
    );
    foreach( $Role_Permission as $roleName => $permissions )
    {
      $role->load( $roleName );
      foreach( $permissions as $permissionName )
      {
        $role->linkModel( $permission->load( $permissionName ) );
      }
    }

    /*
     * tests
     */
    $this->testAnonymous();
    $this->testUser();


    return "OK";
  }

  protected function testAnonymous()
  {
    $user = User::getInstance();
    $user->createAnonymous();
//    $this->info( sprintf(
//      "Created anonmyous user '%s', id #%s, with roles '%s' and permissions '%s'.",
//      $user->namedId(), $user->id(),
//      implode( ",", $user->roles() ),
//      implode( ",", $user->permissions() )
//    ) );
//    // Result: anonmyous user 'anonymous_126996533165', id #5, with roles 'anonymous' and permissions 'viewRecord'.

    $this->assertEquals( true, $user->isAnonymous() );
    $this->assertEquals( 5, $user->id() );
    $this->assertEquals( "anonymous", implode( ",", $user->roles() ), null, __CLASS__, __LINE__ );
    $this->assertEquals( "viewRecord", implode( ",", $user->permissions() ), null, __CLASS__, __LINE__ );
  }

  protected function testUser()
  {
    $user = User::getInstance();
    $user->load("user1");
    $this->assertEquals( false, $user->isAnonymous() );
    $this->assertEquals( "user", implode( ",", $user->roles() ), null, __CLASS__, __LINE__ );
    $this->assertEquals( "viewRecord,createRecord", implode( ",", $user->permissions() ), null, __CLASS__, __LINE__ );
    $this->assertEquals( true, $user->hasPermission("createRecord" ), null, __CLASS__, __LINE__ );
    $this->assertEquals( false, $user->hasPermission("manageUsers" ), null, __CLASS__, __LINE__ );

    $user->resetLastAction();
    sleep(1);
    $this->assertEquals( 1, $user->getSecondsSinceLastAction(), null, __CLASS__, __LINE__ );
  }

  protected function startLogging()
  {
    //$this->getLogger()->setFilterEnabled( QCL_LOG_DB, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_TABLES, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_PROPERTIES, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL_RELATIONS, true );
  }

  protected function endLogging()
  {
    $this->getLogger()->setFilterEnabled( QCL_LOG_DB, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_TABLES, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_PROPERTIES, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL_RELATIONS, false );
  }
}
?>