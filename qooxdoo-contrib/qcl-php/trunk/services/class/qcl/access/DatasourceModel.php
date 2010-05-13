<?php
/* ************************************************************************

   Bibliograph: Collaborative Online Reference Management

   http://www.bibliograph.org

   Copyright:
     2004-2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
   *  Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_data_datasource_DbModel" );
qcl_import( "qcl_access_model_User" );
qcl_import( "qcl_config_ConfigModel" );

/**
 * model for bibliograph datasources based on an sql database
 */
class qcl_access_DatasourceModel
  extends qcl_data_datasource_DbModel
{

  /**
   * Returns singleton instance of this class.
   * @return qcl_access_DatasourceModel
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }

  /**
   * Overridden to suppress datasource prefix.
   * FIXME -> access models should use datasource
   */
  public function getTablePrefix()
  {
    return $this->getQueryBehavior()->getTablePrefix();
  }

  /**
   * Initialize the datasource, registers the models
   */
  public function init()
  {
    if ( parent::init() )
    {
      $this->registerModels( array(
        'user'        => array( 'class' => "qcl_access_model_User" ),
        'permission'  => array( 'class' => "qcl_access_model_Permission" ),
        'role'        => array( 'class' => "qcl_access_model_Role" ),
        'group'       => array( 'class' => "qcl_access_model_Group" ),
        'session'     => array( 'class' => "qcl_access_model_Session" ),
        'config'      => array( 'class' => "qcl_config_ConfigModel" ),
        'userConfig'  => array( 'class' => "qcl_config_UserConfigModel" )
      ) );
    }
  }

  /**
   * Returns the user model
   * @return qcl_access_model_User
   */
  public function getUserModel()
  {
    return $this->getModelOfType("user");
  }

  /**
   * Returns the permission model
   * @return qcl_access_model_Permission
   */
  public function getPermissionModel()
  {
    return $this->getModelOfType("permission");
  }

  /**
   * Returns the role model
   * @return qcl_access_model_Role
   */
  public function getRoleModel()
  {
    return $this->getModelOfType("role");
  }

  /**
   * Returns the config model
   * @return qcl_config_ConfigModel
   */
  public function getConfigModel()
  {
    return $this->getModelOfType("config");
  }

  /**
   * Returns the user config model
   * @return qcl_config_UserConfigModel
   */
  public function getUserConfigModel()
  {
    return $this->getModelOfType("userConfig");
  }
}
?>