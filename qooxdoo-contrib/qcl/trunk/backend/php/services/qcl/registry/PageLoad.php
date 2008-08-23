<?php
require_once "qcl/registry/Session.php";

/**
 * Class which maintains a registry which is valid during one page load
 */
class qcl_registry_PageLoad extends qcl_registry_Session
{
  /**
   * key of variable container in $_SESSION
   */
  var $_session_key = "qcl_page_load_registry";
  
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
   * called in a service that is executed once during
   * each page load. 
   */
  function reset()
  {
    parent::reset();
  }
      
}



?>