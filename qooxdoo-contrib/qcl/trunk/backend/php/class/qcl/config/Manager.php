<?php

require_once "qcl/core/StaticClass.php";


/**
 * Config manager singleton, providing global access to a database object
 * with a unified API
 */
class qcl_config_Manager extends qcl_core_StaticClass
{

  var $configModel = null;

  /**
   * Returns singleton instance of the class. Must be called
   * statically
   * @return qcl_config_Manager
   */
  function &getInstance()
  {
    return parent::getInstance(__CLASS__);
  }

  /**
   * Setter for the config model
   * @param qcl_config_IConfig $configModel
   * @return void
   */
  function setModel($configModel)
  {
    $_this =& qcl_config_Manager::getInstance();
    $_this->configModel =& $configModel;
  }

  /**
   * Getter for the config model
   * @return qcl_config_IConfig
   */
  function &getModel()
  {
    $_this =& qcl_config_Manager::getInstance();
    return $_this->configModel;
  }
}
?>