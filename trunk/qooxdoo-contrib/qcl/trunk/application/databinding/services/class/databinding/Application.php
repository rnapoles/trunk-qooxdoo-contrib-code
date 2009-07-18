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


/**
 * Main application class
 *
 */
class databinding_Application
  extends qcl_application_Application
{
  /**
   * Return singleton instance of the application
   * return databinding_Application
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
    databinding_Application::getInstance();

    /*
     * call parent method
     */
    parent::start();


  }
}
?>