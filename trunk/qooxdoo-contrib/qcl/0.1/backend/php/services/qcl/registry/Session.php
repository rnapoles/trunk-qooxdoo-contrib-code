<?php
/**
 * Dependencies
 */

/**
 * Class which maintains a registry which is valid during one 
 * PHP session
 */
class qcl_registry_Session 
{

  /**
   * key of variable container in $_SESSION
   */
  var $_session_key = "qcl_session_registry";
 

  /**
   * Returns class singleton instance
   * @access static
   * @return qcl_registry_Session singleton instance
   */
  function &getInstance()
  {
    global $qcl_singletons;
    if ( ! $qcl_singletons['qcl_registry_Session']  )
    {
      $qcl_singletons['qcl_registry_Session'] = new qcl_registry_Session;
    }
    return $qcl_singletons['qcl_registry_Session'];
  }  
  
  /**
   * resets the page load registry. this needs to be
   * called, for example, when a user logs out
   */
  function reset()
  {
    $_SESSION[ $this->_session_key ] = array();
  }
  
  /**
   * Sets the registry value
   *
   * @param string $key
   * @param mixed $value
   */
  function set( $key, $value )
  {
    $_SESSION[ $this->_session_key ][$key] = $value;
  }

  /**
   * Gets the registry value
   *
   * @param string $key
   * @return mixed
   */
  function get( $key )
  {
    return $_SESSION[ $this->_session_key ][$key];
  }  
  
  
  /**
   * Check if registry value is set
   *
   * @param string $key
   * @return mixed
   */
  function has( $key )
  {
    return isset( $_SESSION[ $this->_session_key ][$key] );
  }

  
}

?>