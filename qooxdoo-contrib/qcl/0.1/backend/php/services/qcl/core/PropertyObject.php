<?php
require_once "qcl/core/object.php";

/**
 * Class providing property management similar to qooxdoo objects
 *
 */
class qcl_core_PropertyObject extends qcl_core_object
{
  function setProperty( $property, $value )
  {
    $this->$property = $value;
  }
  
  function getProperty( $property )
  {
    return $this->$property;
  }
  
}
?>