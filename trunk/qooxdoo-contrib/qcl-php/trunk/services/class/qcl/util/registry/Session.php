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

define("QCL_UTIL_REGISTRY_SESSION_KEY","QCL_UTIL_REGISTRY_SESSION_KEY" );

/**
 * Class which maintains a registry which is valid during one
 * PHP session
 */
class qcl_util_registry_Session
{


  /**
   * Returns a singleton instance of this class
   * @return qcl_util_registry_Session
   */
  function getInstance( )
  {
    return qcl_getInstance( __CLASS__ );
  }

  /**
   * resets the page load registry. this needs to be
   * called, for example, when a user logs out. Can
   * be called statically.
   */
  function reset()
  {
    $_SESSION[ QCL_UTIL_REGISTRY_SESSION_KEY ] = array();
  }

  /**
   * Sets the registry value. Can be called statically
   *
   * @param string $key
   * @param mixed $value
   */
  function set( $key, $value )
  {
    $_SESSION[ QCL_UTIL_REGISTRY_SESSION_KEY ][$key] = $value;
  }

  /**
   * Gets the registry value. Can be called statically
   *
   * @param string $key
   * @return mixed
   */
  function get( $key )
  {
    return $_SESSION[ QCL_UTIL_REGISTRY_SESSION_KEY ][$key];
  }


  /**
   * Check if registry value is set. Can be called statically
   *
   * @param string $key
   * @return mixed
   */
  function has( $key )
  {
    return isset( $_SESSION[ QCL_UTIL_REGISTRY_SESSION_KEY ][$key] );
  }


}

?>