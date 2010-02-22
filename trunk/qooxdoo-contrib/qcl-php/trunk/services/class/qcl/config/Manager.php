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

/**
 * Config manager singleton, providing global access to a database object
 * with a unified API
 */
class qcl_config_Manager extends qcl_core_Object
{

  var $configModel = null;

  /**
   * Returns singleton instance of the class. Must be called
   * statically
   * @return qcl_config_Manager
   */
  function getInstance()
  {
    return qcl_getInstance( __CLASS__  );
  }

  /**
   * Setter for the config model
   * @param qcl_config_IConfig $configModel
   * @return void
   */
  function setModel($configModel)
  {
    $_this = qcl_config_Manager::getInstance();
    $_this->configModel = $configModel;
  }

  /**
   * Getter for the config model
   * @return qcl_config_IConfig
   */
  function getModel()
  {
    $_this = qcl_config_Manager::getInstance();
    return $_this->configModel;
  }
}
?>