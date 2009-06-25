<?php
require_once "qcl/config/Db.php";

/*
 * This class is used only to load the application-specific
 * data into the config model. For all other uses, the parent
 * class instance is used.
 */
class access_ConfigModel
  extends qcl_config_Db
{

  /**
   * Returns singleton instance. Needed.
   * @return access_ConfigModel
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
    $_this = access_ConfigModel::getInstance();
    $_this->import("access/ConfigModel.data.xml");
  }
}
?>