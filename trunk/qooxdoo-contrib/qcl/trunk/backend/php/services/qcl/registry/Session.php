<?php
/**
 * Dependencies
 */
require_once "qcl/jsonrpc/object.php";

/**
 * Class which maintains a registry which is valid during one 
 * PHP session
 */
class qcl_registry_Session extends qcl_jsonrpc_object
{

  /**
   * key of variable container in $_SESSION
   */
  var $_session_key = "qcl_session_registry";
 

  /**
   * Returns class singleton instance
   * @access static
   * @return qcl_registry_PageLoad singleton instance
   */
  function &getInstance( $class=__CLASS__ )
  {
    return parent::getInstance( $class );
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