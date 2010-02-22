<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */
require_once "qcl/core/Object.php";

class qcl_core_StaticClass extends qcl_core_Object
{

  /**
   * Prohibit instantiation
   */
  function __construct()
  {
    qcl_application_Application::getInstance()->raiseError("A static class cannot be instantiated!");
  }

  /**
   * Prohibit singleton use
   */
  function getInstance($class=null)
  {
    qcl_application_Application::getInstance()->raiseError("A static class cannot be used as a singleton!");
  }
}
?>