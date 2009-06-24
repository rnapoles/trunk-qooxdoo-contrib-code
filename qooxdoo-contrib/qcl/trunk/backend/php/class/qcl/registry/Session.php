<?php


define("QCL_REGISTRY_SESSION_KEY","qcl_registry_session_key" );

/**
 * Class which maintains a registry which is valid during one
 * PHP session
 */
class qcl_registry_Session
{


  /**
   * Returns a singleton instance of this class
   * @return qcl_registry_Session
   */
  function &getInstance( )
  {
    if ( ! is_object( $GLOBALS[__CLASS__] ) )
    {
      $GLOBALS[__CLASS__] =& new qcl_registry_Session;
    }
    return $GLOBALS[__CLASS__];
  }

  /**
   * resets the page load registry. this needs to be
   * called, for example, when a user logs out. Can
   * be called statically.
   */
  function reset()
  {
    $_SESSION[ QCL_REGISTRY_SESSION_KEY ] = array();
  }

  /**
   * Sets the registry value. Can be called statically
   *
   * @param string $key
   * @param mixed $value
   */
  function set( $key, $value )
  {
    $_SESSION[ QCL_REGISTRY_SESSION_KEY ][$key] = $value;
  }

  /**
   * Gets the registry value. Can be called statically
   *
   * @param string $key
   * @return mixed
   */
  function get( $key )
  {
    return $_SESSION[ QCL_REGISTRY_SESSION_KEY ][$key];
  }


  /**
   * Check if registry value is set. Can be called statically
   *
   * @param string $key
   * @return mixed
   */
  function has( $key )
  {
    return isset( $_SESSION[ QCL_REGISTRY_SESSION_KEY ][$key] );
  }


}

?>