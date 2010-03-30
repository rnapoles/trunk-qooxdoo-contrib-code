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

class User extends qcl_access_model_User2
{
  protected $tableName = "test_data_User";
  protected $foreignKey = "test_UserId";

  public function replaceClassMap() {
    return Replace::$map;
  }

  function __construct()
  {
    $this->resetBehaviors(); // needed for testing
    parent::__construct();
  }
}

class Role extends qcl_access_model_Role2
{
  protected $tableName = "test_data_Role";
  protected $foreignKey = "test_RoleId";

  public function replaceClassMap() {
    return Replace::$map;
  }
}

class Permission extends qcl_access_model_Permission2
{
  protected $tableName = "test_data_Permission";
  protected $foreignKey = "test_PermissionId";

  public function replaceClassMap() {
    return Replace::$map;
  }
}

class Config extends qcl_config_ConfigModel
{
  protected $tableName = "test_data_Config";
  protected $foreignKey = "test_ConfigId";

  public function replaceClassMap() {
    return Replace::$map;
  }
}

class UserConfig extends qcl_config_UserConfigModel
{
  protected $tableName = "test_data_UserConfig";
  public function replaceClassMap() {
    return Replace::$map;
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
    $user = new User();
    $role = new Role();
    $permission = new Permission();

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

    return "OK";
  }
}
?>