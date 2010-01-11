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

require_once "qcl/data/controller/Controller.php";

/**
 * Application methods
 */
class class_access_ApplicationController
  extends qcl_data_controller_Controller
{
  function method_testAccess()
  {
    return array(
      'viewRecord'  => $this->hasPermission("viewRecord"),
      'manageUsers' => $this->hasPermission("manageUsers")

    );
  }
}
?>