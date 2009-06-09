<?php

require "qcl/core/object.php";

class qcl_core_StaticClass extends qcl_core_object
{
    
  /**
   * If the static class is used as a singleton,
   * it needs to implement its own getInstance()
   * method or call getInstance(__CLASS__)
   */
  function &getInstance($class=null)
  {
    if ( is_null($class) )
    {
      qcl_core_object::raiseError("Static classes must implement their own getInstance() method or call 'getInstance(__CLASS__)'.");
    }
    return parent::getInstance($class);
  }
  
}
?>