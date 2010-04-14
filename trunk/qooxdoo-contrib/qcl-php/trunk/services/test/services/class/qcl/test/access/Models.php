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
qcl_import( "qcl_access_model_User" );


/**
 * Class to model the user data. As the other model classes defined
 * in this test, we subclass the available access model types and
 * selectively change some aspects, such as the names of tables and
 * columns. This is done to demonstrate these features but also in order
 * not to interfere with the real access model data.
 */
class access_User extends qcl_access_model_User
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
   * @return access_User
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Class to model the role data
 * @see access_User
 */
class access_Role extends qcl_access_model_Role
{
  protected $tableName = "test_data_Role";
  protected $foreignKey = "test_RoleId";

  function __construct() {
    parent::__construct();
    $this->getRelationBehavior()->setJoinTableName( "User_Role", "test_join_User_Role" );
    $this->getRelationBehavior()->setJoinTableName( "Permission_Role", "test_join_Permission_Role" );
  }
  /**
   * @return access_Role
   */
  public static function getInstance() {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Class to model the permission data.
 * @see access_User
 */
class access_Permission extends qcl_access_model_Permission
{
  protected $tableName = "test_data_Permission";
  protected $foreignKey = "test_PermissionId";
  function __construct() {
    parent::__construct();
    $this->getRelationBehavior()->setJoinTableName( "Permission_Role", "test_join_Permission_Role" );
  }
  /**
   * @return access_Permission
   */
  public static function getInstance() {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Class to model the configuration data.
 * @see access_User
 */
class access_Config extends qcl_config_ConfigModel
{
  protected $tableName = "test_data_Config";
  protected $foreignKey = "test_ConfigId";
  /**
   * @return access_Config
   */
  public static function getInstance() {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Class to model the custom user configuration data.
 * @see access_User
 */
class access_UserConfig extends qcl_config_UserConfigModel
{
  protected $tableName = "test_data_UserConfig";
  /**
   * @return access_UserConfig
   */
  public static function getInstance() {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Class to model the custom user configuration data.
 * @see access_User
 */
class access_Session extends qcl_access_model_Session
{
  protected $tableName = "test_data_Session";
  /**
   * @return access_Session
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


  /**
   * @rpctest {
   *   "requestData" : {
   *     "service" : "qcl.test.access.Models",
   *     "method"  : "testModel",
   *     "timeout" : 30
   *   },
   *   "checkResult" : "OK"
   * }
   */
  public function method_testModel()
  {
    try
    {
  //$this->startLogging();
    /*
     * create model instances
     */
    $user = access_User::getInstance();
    $role = access_Role::getInstance();
    $permission = access_Permission::getInstance();
    $session = access_Session::getInstance();

    /*
     * Even though the models are not needed, we need to instantiate them, otherwise
     * the relations are not correctly set up-
     */
    access_Config::getInstance();
    access_UserConfig::getInstance();

    /*
     * users
     */
    $user->deleteAll();
    $user->create("user1",array( 'name' => "access_User 1", 'password' => "user1" ) );
    $user->create("user2",array( 'name' => "access_User 2", 'password' => "user2" ) );
    $user->create("user3",array( 'name' => "access_User 3", 'password' => "user3" ) );
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
      'user'      => array( "user1", "user2", "user3", "admin" ),
      'manager'   => array( "user3", "admin" ),
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
    $this->testImportExport();
    $this->testUser();
    $this->testSession();

    /*
     * cleanup
     */
    $user->destroy();
    $role->destroy();
    $permission->destroy();
    $session->destroy();
    access_Config::getInstance()->destroy();
    access_UserConfig::getInstance()->destroy();

    return "OK";

    }
    catch ( Exception $e )
    {
      $this->warn( $e );
      throw $e;
    }
  }

  protected function testAnonymous()
  {
    $user = access_User::getInstance();
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
    $user = access_User::getInstance();
    $user->load("user1");
    $this->assertEquals( false, $user->isAnonymous() );
    $this->assertEquals( "user", implode( ",", $user->roles() ), null, __CLASS__, __LINE__ );
    $this->assertEquals( "viewRecord,createRecord", implode( ",", $user->permissions() ), null, __CLASS__, __LINE__ );
    $this->assertEquals( true, $user->hasPermission("createRecord" ), null, __CLASS__, __LINE__ );
    $this->assertEquals( false, $user->hasPermission("manageUsers" ), null, __CLASS__, __LINE__ );

    $user->load("admin");
    $this->assertEquals( "user,manager,admin", implode( ",", $user->roles() ), null, __CLASS__, __LINE__ );
    $this->assertEquals( "viewRecord,createRecord,deleteRecord,manageUsers", implode( ",", $user->permissions() ), null, __CLASS__, __LINE__ );

    $user->resetLastAction();
    sleep(1);
    $this->assertEquals( 1, $user->getSecondsSinceLastAction(), null, __CLASS__, __LINE__ );
  }

  protected function testImportExport()
  {
    /*
     * export to xml
     */
    qcl_import( "qcl_data_model_export_Xml" );
    $exporter =  new qcl_data_model_export_Xml();
    $userXml = access_User::getInstance()->export( $exporter );
    $roleXml = access_Role::getInstance()->export( $exporter );
    $permissionXml = access_Permission::getInstance()->export( $exporter );

//    $this->info( $userXml );
//    $this->info( $roleXml );
//    $this->info( $permissionXml );

    /*
     * delete all records
     */
    access_User::getInstance()->deleteAll();
    access_Role::getInstance()->deleteAll();
    access_Permission::getInstance()->deleteAll();

    /*
     * re-import
     */
    qcl_import( "qcl_data_model_import_Xml" );
    access_User::getInstance()->import( new qcl_data_model_import_Xml( $userXml ) );
    access_Role::getInstance()->import( new qcl_data_model_import_Xml( $roleXml ) );
    access_Permission::getInstance()->import( new qcl_data_model_import_Xml( $permissionXml ) );
  }

  protected function testSession()
  {
    $user = access_User::getInstance();
    $session = access_Session::getInstance();
    $session->deleteAll();
    $user->load("user1");
    $this->startLogging();
    $session->registerSession( $this->getSessionId() , $user, qcl_server_Request::getInstance()->getIp() );
  }

  protected function startLogging()
  {
    //$this->getLogger()->setFilterEnabled( QCL_LOG_ACCESS, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_TABLES, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_PROPERTIES, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL_RELATIONS, true );
    //$this->getLogger()->setFilterEnabled( QCL_LOG_DB, true );

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