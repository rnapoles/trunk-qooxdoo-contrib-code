<?php
/**
 * Class which maintains a registry which is valid during one request
 */
class qcl_registry_Request
{
  /**
   * key of variable container in $_SESSION
   */
  var $_global_key = "qcl_request_registry";

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
   * resets the page load registry. this needs to be
   * called, for example, when a user logs out
   */
  function reset()
  {
    $GLOBALS[ $this->_global_key ] = array();
  }

  /**
   * Sets the registry value
   *
   * @param string $key
   * @param mixed $value
   */
  function set( $key, $value )
  {
    $GLOBALS[ $this->_global_key ][$key] = $value;
  }

  /**
   * Gets the registry value
   *
   * @param string $key
   * @return mixed
   */
  function get( $key )
  {
    return $GLOBALS[ $this->_global_key ][$key];
  }


  /**
   * Check if registry value is set
   *
   * @param string $key
   * @return mixed
   */
  function has( $key )
  {
    return isset( $GLOBALS[ $this->_global_key ][$key] );
  }

}



?>