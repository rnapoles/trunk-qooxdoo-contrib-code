<?php
/* ************************************************************************

   qcl - the qooxdoo component library

   http://qooxdoo.org/contrib/project/qcl/

   Copyright:
     2007-2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */

require_once "qcl/application/Application.php";
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
   * Return the application singleton instance. Actually returns
   * the parents class's singleton instance (qcl_application_Application),
   * so that any method can access the current application instance
   * without knowing its class name by using
   * qcl_application_Application::getInstance().
   *
   * @return access_Application
   */
  static function getInstance()
  {
    return parent::getInstance();
  }

  /**
   * Starts the application and initializes some singleton
   * objects
   */
  public function start()
  {
    /*
     * call parent method
     */
    parent::start();

    /*
     * logging level
     */
    $this->getLogger()->setFilterEnabled(array("propertyModel","xml"),true);


    /*
     * Load initial data into models.
     */
    $configModel = $this->getConfigModel();
    if (  ! $configModel->hasKey("initialized") )
    {

      /*
       * load config data, this has to be done first
       */
      $this->info("*** Importing config data...");
      $configModel->import( "access/data/Config.data.xml" );

      /*
       * load permission data
       */
      $this->info("*** Importing permission data...");
      $permissionModel = $this->getAccessManager()->getPermissionModel();
      $permissionModel->import( "access/data/Permission.data.xml" );

      /*
       * load user data
       */
      $this->info("*** Importing user data...");
      $userModel = $this->getAccessManager()->getUserModel();
      $userModel->import( "access/data/User.data.xml");

      /*
       * load role data and link it to permissions and users
       */
      $this->info("*** Importing role data...");
      $roleModel = $this->getAccessManager()->getRoleModel();
      $roleModel->import( "access/data/Role.data.xml");
      $roleModel->importLinkData( "access/data/link_roles_permissions.data.xml" );
      $roleModel->importLinkData( "access/data/link_roles_users.data.xml" );

      /*
       * set flag that data has been imported
       */
       $configModel->createKey("initialized","boolean");
       $configModel->setKey("initialized",true);
    }
  }
}
?>