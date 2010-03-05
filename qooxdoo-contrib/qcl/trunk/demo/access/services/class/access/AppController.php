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

require_once "qcl/access/SessionController.php";

/**
 * Application methods
 */
class class_access_AppController
  extends qcl_access_SessionController
{

  /**
   * Returns the current application
   * @return access_Application
   */
  function getApplication()
  {
    require_once "access/Application.php";
    return access_Application::getInstance();
  }


  /**
   * @return void
   */
  public function method_testAccess()
  {
    return array(
      'viewRecord'  => $this->hasPermission("viewRecord"),
      'manageUsers' => $this->hasPermission("manageUsers")
    );
  }
}
?>