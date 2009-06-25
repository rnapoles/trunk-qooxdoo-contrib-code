<?php
require_once "qcl/access/model/Permission.php";

/*
 * This class is used only to load the application-specific
 * data into the config model. For all other uses, the parent
 * class instance is used.
 */
class access_PermissionModel
  extends qcl_access_model_Permission
{

  /**
   * Returns singleton instance. Needed.
   * @return access_PermissionModel
   */
  function &getInstance( $class=__CLASS__ )
  {
    return parent::getInstance( $class );
  }

  function setup()
  {
    /*
     * load config data
     */
    $_this = access_PermissionModel::getInstance();
    $_this->import( "access/PermissionModel.data.xml" );
    $_this->importLinkData( "access/link_roles_permissions.data.xml" );
  }
}
?>