<?php
require_once "qcl/registry/Session.php";

define("QCL_REGISTRY_PAGELOAD_KEY","qcl_registry_pageload_key" );

/**
 * Class which maintains a registry which is valid during one page load
 */
class qcl_registry_PageLoad
{
  /**
   * Returns a singleton instance of this class
   * @return qcl_registry_PageLoad
   */
  function &getInstance( )
  {
    if ( ! is_object( $GLOBALS[__CLASS__] ) )
    {
      $GLOBALS[__CLASS__] =& new qcl_registry_PageLoad;
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
    $_SESSION[QCL_REGISTRY_SESSION_KEY][QCL_REGISTRY_PAGELOAD_KEY] = array();
  }

  /**
   * Sets the registry value. Can be called statically
   *
   * @param string $key
   * @param mixed $value
   */
  function set( $key, $value )
  {
    $_SESSION[QCL_REGISTRY_SESSION_KEY][QCL_REGISTRY_PAGELOAD_KEY][$key] = $value;
  }

  /**
   * Gets the registry value. Can be called statically
   *
   * @param string $key
   * @return mixed
   */
  function get( $key )
  {
    return $_SESSION[QCL_REGISTRY_SESSION_KEY][QCL_REGISTRY_PAGELOAD_KEY][$key];
  }

  /**
   * Check if registry value is set. Can be called statically
   *
   * @param string $key
   * @return mixed
   */
  function has( $key )
  {
    return isset( $_SESSION[QCL_REGISTRY_SESSION_KEY][QCL_REGISTRY_PAGELOAD_KEY][$key] );
  }
}
?>