<?php

require_once "qcl/jsonrpc/object.php";

/**
 * persistent storage class to save datasource information
 */

class qcl_datasource_storage extends qcl_jsonrpc_object
{
  /**
   * maps datasource schema names to datasource model class names
   *
   * @var array
   */
  var $map = array();
  
  /**
   * register datasource
   * @param string $name Name of datasource schema
   * @param string $class Name of datasource model class
   */
  function setClassFor( $name, $class )
  {    
    $this->map[$name] = $class;
  }
  
  /**
   * get datasource
   * @param string $name Name of datasource schema
   */
  function getClassFor( $name )
  {    
    return $this->map[$name] ;
  }
    
}
?>