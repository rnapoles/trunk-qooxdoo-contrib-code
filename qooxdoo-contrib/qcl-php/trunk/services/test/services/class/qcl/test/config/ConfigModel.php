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
qcl_import( "qcl_data_model_import_Xml" );
qcl_import( "qcl_io_filesystem_local_File" );

/**
 * Class to model the configuration data.
 * @see User
 */
class config_Config extends qcl_config_ConfigModel
{
  protected $tableName = "test_data_Config2";
  /**
   * @return config_Config
   */
  public static function getInstance() {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Class to model the custom user configuration data.
 * @see User
 */
class config_UserConfig extends qcl_config_UserConfigModel
{
  protected $tableName = "test_data_UserConfig2";
  /**
   * @return config_UserConfig
   */
  public static function getInstance() {
    return qcl_getInstance( __CLASS__ );
  }
}


/**
 * Class to model the user data
 * @see qcl_test_access_Models
 */
class config_User extends qcl_access_model_User
{
  protected $tableName = "test_data_User2";
  function __construct()
  {
    parent::__construct();
    $this->getRelationBehavior()->setJoinTableName( "User_Role", "test_join_User_Role2" );
  }
  /**
   * @return config_User
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Class to model the role data
 * @see config_User
 */
class config_Role extends qcl_access_model_Role
{
  protected $tableName = "test_data_Role2";
  function __construct() {
    parent::__construct();
    $this->getRelationBehavior()->setJoinTableName( "User_Role", "test_join_User_Role2" );
    $this->getRelationBehavior()->setJoinTableName( "Permission_Role", "test_join_Permission_Role2" );
  }
  /**
   * @return config_Role
   */
  public static function getInstance() {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Class to model the permission data.
 * @see config_User
 */
class config_Permission extends qcl_access_model_Permission
{
  protected $tableName = "test_data_Permission2";
  function __construct() {
    parent::__construct();
    $this->getRelationBehavior()->setJoinTableName( "Permission_Role", "test_join_Permission_Role2" );
  }
  /**
   * @return config_Permission
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
   *     "service" : "qcl.test.config.ConfigModel",
   *     "method" : "testModel",
   *     "timeout" : 30
   *   },
   *   "checkResult" : "OK"
   * }
   */
  public function method_testModel()
  {
    /*
     * reset internal caches
     */
    qcl_data_model_db_ActiveRecord::resetBehaviors();

    /*
     * create model instances. We need to instantiate even
     * the ones we don't need (i.e config_Permission) or which are only implicitly
     * used (such as config_UserConfig), otherwise the relations are not
     * correctly initialized.
     */
    $user       = config_User::getInstance();
    $role       = config_Role::getInstance();
    $permission = config_Permission::getInstance();
    $config     = config_Config::getInstance();
    $userConfig = config_UserConfig::getInstance();

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
    $config->deleteAll();
    $userConfig->deleteAll();

    $config->createKey( "global", "string", false, "global" );
    $config->createKey( "custom", "string", true, "custom" );
    $config->createKey( "number", "number", true, 1 );
    $config->createKey( "list", "list", true, array("foo","bar","baz") );

    $user->createAnonymous();

    $this->assertEquals( 1, $config->getKey( "number", $user ), null, __CLASS__, __LINE__ );

    $this->assertEquals( array("foo","bar","baz"), $config->getKey( "list", $user ), null, __CLASS__, __LINE__ );

    $this->assertEquals("custom", $config->getKeyDefault( "custom" ), null, __CLASS__, __LINE__ );

    $config->setKey( "custom", "anonymous!", $user );
    $this->assertEquals("anonymous!", $config->getKey( "custom", $user ), null, __CLASS__, __LINE__ );

    $user->load("user1");
    $config->setKey( "custom", "user1", $user );
    $this->assertEquals("user1", $config->getKey( "custom", $user ), null, __CLASS__, __LINE__ );

    $user->load("user2");
    $config->setKey( "custom", "user2", $user );
    $this->assertEquals("user2", $config->getKey( "custom", $user ), null, __CLASS__, __LINE__ );

    $user->load("user3");
    $config->setKey( "custom", "user3", $user );
    $this->assertEquals("user3", $config->getKey( "custom", $user ), null, __CLASS__, __LINE__ );

    $user->load("user1");
    $this->assertEquals("user1", $config->getKey( "custom", $user ), null, __CLASS__, __LINE__ );

    /*
     * export to xml
     */
    qcl_import( "qcl_data_model_export_Xml" );
    $exporter =  new qcl_data_model_export_Xml();

    $configXml = trim( $config->export( $exporter ) );
    // $this->info( $configXml );
    $configXmlFile = new qcl_io_filesystem_local_File( "file://qcl/test/config/Config.xml");
    $this->assertEquals( $configXml, trim($configXmlFile->load()), null, __CLASS__, __LINE__ );

    $userConfigXmlFile = new qcl_io_filesystem_local_File( "file://qcl/test/config/UserConfig.xml");
    $userConfigXml = trim( $userConfig->export( $exporter ) );
    //$this->info( $userConfigXml );
    $this->assertEquals( $userConfigXml, trim( $userConfigXmlFile->load() ), null, __CLASS__, __LINE__ );

    /*
     * cleanup
     */
    config_User::getInstance()->destroy();
    config_Role::getInstance()->destroy();
    config_Permission::getInstance()->destroy();
    config_Config::getInstance()->destroy();
    config_UserConfig::getInstance()->destroy();

    return "OK";
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