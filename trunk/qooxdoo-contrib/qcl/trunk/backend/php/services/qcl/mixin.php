<?php
require_once("qcl/object.php");
/**
 * Base class for mixins. Makes sure this is not used as a 
 * standard class.
 */
class qcl_mixin extends qcl_object
{
  
  /**
   * constructor. Serves only to throw an error if called, since
   * mixins should not have constructors. 
   */
  function __construct()
  {
    trigger_error(get_class($this) . " is a mixin and cannot be used as a standard class.");
  }
  
}

?>