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
require_once "qcl/data/persistence/db/Object.php";

/**
 * Class which maintains a registry which is
 * persiste in the database.
 */
class qcl_util_registry_Persist
  extends qcl_data_persistence_db_Object
{

  var $registry = array();

  /**
   * Returns a singleton instance of this class
   * @return qcl_util_registry_Request
   */
  function &getInstance()
  {
    return parent::getInstance(__CLASS__);
  }

  /**
   * Constructor. Creates the persistent object
   */
  function __construct()
  {
    parent::__construct( __CLASS__ );
  }

  /**
   * Resets the page load registry. this needs to be
   * called, for example, when a user logs out, Can
   * be called statically
   */
  function reset()
  {
    $_this =& qcl_util_registry_Persist::getInstance();
    $_this->registry = array();
    $_this->save();
  }

  /**
   * Sets the registry value. Can be called statically
   *
   * @param string $key
   * @param mixed $value
   */
  function set( $key, $value )
  {
    $_this =& qcl_util_registry_Persist::getInstance();
    $_this->registry[$key] = $value;
    $_this->save();
  }

  /**
   * Gets the registry value. Can be called statically
   *
   * @param string $key
   * @return mixed
   */
  function get( $key )
  {
    $_this =& qcl_util_registry_Persist::getInstance();
    return $_this->registry[$key];
  }


  /**
   * Check if registry value is set. Can be called statically
   *
   * @param string $key
   * @return mixed
   */
  function has( $key )
  {
    $_this =& qcl_util_registry_Persist::getInstance();
    return isset( $_this->registry[$key] );
  }
}
?>