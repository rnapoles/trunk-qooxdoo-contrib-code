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
require_once "qcl/util/registry/Session.php";

define("qcl_util_registry_PAGELOAD_KEY","qcl_util_registry_pageload_key" );

/**
 * Class which maintains a registry which is valid during one page load
 */
class qcl_util_registry_PageLoad
{
  /**
   * Returns a singleton instance of this class
   * @return qcl_util_registry_PageLoad
   */
  function &getInstance( )
  {
    if ( ! is_object( $GLOBALS[__CLASS__] ) )
    {
      $GLOBALS[__CLASS__] =& new qcl_util_registry_PageLoad;
    }
    return $GLOBALS[__CLASS__];
  }

  /**
   * Resets the page load registry. this needs to be
   * called in a service that is executed once during
   * each page load.
   */
  function reset()
  {
    $_SESSION[qcl_util_registry_SESSION_KEY][qcl_util_registry_PAGELOAD_KEY] = array();
  }

  /**
   * Sets the registry value. Can be called statically
   *
   * @param string $key
   * @param mixed $value
   */
  function set( $key, $value )
  {
    $_SESSION[qcl_util_registry_SESSION_KEY][qcl_util_registry_PAGELOAD_KEY][$key] = $value;
  }

  /**
   * Gets the registry value. Can be called statically
   *
   * @param string $key
   * @return mixed
   */
  function get( $key )
  {
    return $_SESSION[qcl_util_registry_SESSION_KEY][qcl_util_registry_PAGELOAD_KEY][$key];
  }

  /**
   * Check if registry value is set. Can be called statically
   *
   * @param string $key
   * @return mixed
   */
  function has( $key )
  {
    return isset( $_SESSION[qcl_util_registry_SESSION_KEY][qcl_util_registry_PAGELOAD_KEY][$key] );
  }
}
?>