<?php

/**
 * Class which maintains a registry which is valid during one request
 */
class qcl_registry_Request
{

  var $registry = array();

  /**
   * Returns a singleton instance of this class
   * @return qcl_registry_Request
   */
  function &getInstance( )
  {
    if ( ! is_object( $GLOBALS[__CLASS__] ) )
    {
      $GLOBALS[__CLASS__] =& new qcl_registry_Request;
    }
    return $GLOBALS[__CLASS__];
  }

  /**
   * Resets the page load registry. this needs to be
   * called, for example, when a user logs out, Can
   * be called statically
   */
  function reset()
  {
    $_this =& qcl_registry_Request::getInstance();
    $_this->registry = array();
  }

  /**
   * Sets the registry value. Can be called statically
   *
   * @param string $key
   * @param mixed $value
   */
  function set( $key, $value )
  {
    $_this =& qcl_registry_Request::getInstance();
    $_this->registry[$key] = $value;
  }

  /**
   * Gets the registry value. Can be called statically
   *
   * @param string $key
   * @return mixed
   */
  function get( $key )
  {
    $_this =& qcl_registry_Request::getInstance();
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
    $_this =& qcl_registry_Request::getInstance();
    return isset( $_this->registry[$key] );
  }
}
?>