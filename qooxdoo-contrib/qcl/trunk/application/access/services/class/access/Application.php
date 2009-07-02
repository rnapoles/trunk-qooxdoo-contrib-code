<?php
/*
 * dependencies
 */
require_once "qcl/application/Application.php";
require_once "qcl/util/registry/Persist.php";
require_once "qcl/access/model/User.php";
require_once "qcl/access/model/Role.php";
require_once "qcl/access/model/Permission.php";


/**
 * Main application class
 *
 */
class access_Application
  extends qcl_application_Application
{
  /**
   * Return singleton instance of the application
   * return access_Application
   */
  function &getInstance()
  {
    return parent::getInstance(__CLASS__);
  }

  /**
   * Starts the application and initializes some singleton
   * objects
   */
  function start()
  {
    /*
     * create the application instance
     */
    access_Application::getInstance();

    /*
     * call parent method
     */
    parent::start();

    /*
     * Load initial data into models.
     */
    if ( ! qcl_util_registry_Persist::has("dataImported") )
    {
      qcl_application_Application::info("*** Importing initial data...");

      /*
       * load config data, this has to be done first
       */
      $configModel =& qcl_config_Db::getInstance();
      $configModel->import( "access/data/Config.data.xml" );

      /*
       * load permission data
       */
      $permissionModel =& qcl_access_model_Permission::getInstance();
      $permissionModel->import( "access/data/Permission.data.xml" );

      /*
       * load user data
       */
      $userModel =& qcl_access_model_User::getInstance();
      $userModel->import( "access/data/User.data.xml");

      /*
       * load role data and link it to permissions and users
       */
      $roleModel =& qcl_access_model_Role::getInstance();
      $roleModel->import( "access/data/Role.data.xml");
      $roleModel->importLinkData( "access/data/link_roles_permissions.data.xml" );
      $roleModel->importLinkData( "access/data/link_roles_users.data.xml" );


      /*
       * set flag that data has been imported
       */
      qcl_util_registry_Persist::set("dataImported",true);
    }
  }
}
?>