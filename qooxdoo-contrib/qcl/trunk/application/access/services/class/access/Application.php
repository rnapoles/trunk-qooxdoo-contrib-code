<?php
/*
 * dependencies
 */
require_once "qcl/application/Application.php";
require_once "qcl/registry/Persist.php";
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
     * Load custom data into models. The rest of the data is
     * automatically
     */
    if ( ! qcl_registry_Persist::has("dataImported") )
    {
      qcl_log_Logger::info("*** Importing custom data...");

      $permissionModel =& qcl_access_model_Permission::getInstance();
      $permissionModel->import( "access/PermissionModel.data.xml" );
      $roleModel =& qcl_access_model_Role::getInstance();
      $roleModel->importLinkData( "access/link_roles_permissions.data.xml" );
      $roleModel->importLinkData( "access/link_roles_users.data.xml" );
      qcl_registry_Persist::set("dataImported",true);
    }
  }
}
?>