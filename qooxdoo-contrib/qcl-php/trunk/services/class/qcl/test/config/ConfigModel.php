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
qcl_import( "qcl_data_model_import_Xml" );
qcl_import( "qcl_io_filesystem_local_File" );

/**
 * Class to model the configuration data.
 * @see User
 */
class Config extends qcl_config_ConfigModel
{
  protected $tableName = "test_data_Config2";
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
  protected $tableName = "test_data_UserConfig2";
  /**
   * @return UserConfig
   */
  public static function getInstance() {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Class to model the user data
 * @see qcl_test_access_Models
 */
class User extends qcl_access_model_User2
{
  protected $tableName = "test_data_User2";
  function __construct()
  {
    $this->resetBehaviors();
    parent::__construct();
    $this->getRelationBehavior()->setJoinTableName( "User_Role", "test_join_User_Role2" );
  }
  /**
   * @return User
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Class to model the role data
 * @see User
 */
class Role extends qcl_access_model_Role2
{
  protected $tableName = "test_data_Role2";
  function __construct() {
    parent::__construct();
    $this->getRelationBehavior()->setJoinTableName( "User_Role", "test_join_User_Role2" );
    $this->getRelationBehavior()->setJoinTableName( "Permission_Role", "test_join_Permission_Role2" );
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
  protected $tableName = "test_data_Permission2";
  function __construct() {
    parent::__construct();
    $this->getRelationBehavior()->setJoinTableName( "Permission_Role", "test_join_Permission_Role2" );
  }
  /**
   * @return Permission
   */
  public static function getInstance() {
    return qcl_getInstance( __CLASS__ );
  }
}



/**
 * Service class containing test methods for access package
 */
class class_qcl_test_config_ConfigModel
  extends qcl_test_AbstractTestController
{

  /**
   * Tests the a global value
   * @return string
   * @rpctest {
   *   "requestData" : {
   *     "method" : "testModel",
   *     "timeout" : 30
   *   },
   *   "checkResult" : "OK"
   * }
   */
  public function method_testModel()
  {
    /*
     * create model instances
     */
    $user = User::getInstance();
    $role = Role::getInstance();
    $permission = Permission::getInstance();
    $config = Config::getInstance();

    /*
     * import data
     */
    $user->deleteAll();
    $user->import(
      new qcl_data_model_import_Xml(
        new qcl_io_filesystem_local_File( "file://qcl/test/config/User.xml") ) );

    $role->deleteAll();
    $role->import(
      new qcl_data_model_import_Xml(
        new qcl_io_filesystem_local_File( "file://qcl/test/config/Role.xml") ) );

    $permission->deleteAll();
    $permission->import(
      new qcl_data_model_import_Xml(
        new qcl_io_filesystem_local_File( "file://qcl/test/config/Permission.xml") ) );

    /*
     * tests
     */
    $config->createKey( "global", "string", false, "global" );
    $config->createKey( "custom", "string", true, "custom" );
    $config->createKey( "number", "integer", true, 1 );
    $config->createKey( "list", "list", true, array() );

    $user->createAnonymous();
    $anonymous = $user->cloneObject();
    $user->load("user1");

    $config->setKey( "custom", "anonymous!", $anonymous );
    $config->setKey( "custom", "user1", $user );

    /*
     * cleanup
     */
//    User::getInstance()->destroy();
//    Role::getInstance()->destroy();
//    Permission::getInstance()->destroy();
//    Config::getInstance()->destroy();
//    UserConfig::getInstance()->destroy();

    return "OK";
  }



 /**
   * Tests the a global value
   * @return string
   * @rpctest {
   *   "requestData" : {
   *     "method" : "testConfigDbGlobal"
   *   },
   *   "checkResult" : "test"
   * }
   */
  function method_testConfigDbGlobal()
  {
    $configModel = $this->getApplication()->getConfigModel();
    $configModel->createKeyIfNotExists("qcl.test.global","string");
    $configModel->setKey("qcl.test.global","test");
    return $configModel->getKey("qcl.test.global");
  }

  /**
   * Tests the a default value
   * @return string
   * @rpctest {
   *   "requestData" : {
   *     "method" : "testConfigDbDefault"
   *   },
   *   "checkResult" : ["default","uservalue"]
   * }
   */
  function method_testConfigDbDefault()
  {
    $userId = $this->anonymousAccess();

    $configModel = $this->getApplication()->getConfigModel();
    $configModel->createKeyIfNotExists("qcl.test.default","string",null,/* allow user variants= */true);
    $configModel->setDefault("qcl.test.default","default");
    $configModel->setKey("qcl.test.default","uservalue");

    return array(
      $configModel->getKey("qcl.test.default",0),
      $configModel->getKey("qcl.test.default")
    );
  }

  function method_testAccessibleKeys( $params )
  {
    $mask = either( $params[0], null );
    $configModel = qcl_config_DbModel::getInstance();
    $this->set( array(
      "config" =>  $configModel->getAccessibleKeys( $mask )
    ) );
    return $this->result();
  }

  protected function testImportExport()
  {
    /*
     * export to xml
     */
    qcl_import( "qcl_data_model_export_Xml" );
    $exporter =  new qcl_data_model_export_Xml();
    $userXml = User::getInstance()->export( $exporter );
    $roleXml = Role::getInstance()->export( $exporter );
    $permissionXml = Permission::getInstance()->export( $exporter );

//    $this->info( $userXml );
//    $this->info( $roleXml );
//    $this->info( $permissionXml );

    /*
     * delete all records
     */
    User::getInstance()->deleteAll();
    Role::getInstance()->deleteAll();
    Permission::getInstance()->deleteAll();

    /*
     * re-import
     */
    qcl_import( "qcl_data_model_import_Xml" );
    User::getInstance()->import( new qcl_data_model_import_Xml( $userXml ) );
    Role::getInstance()->import( new qcl_data_model_import_Xml( $roleXml ) );
    Permission::getInstance()->import( new qcl_data_model_import_Xml( $permissionXml ) );
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