<?php
require_once "qcl/core/Object.php";

/**
 * Base class for mixins. Makes sure this is not used as a
 * standard class.
 */
class qcl_core_Mixin extends qcl_core_Object
{

  /**
   * constructor. Serves only to throw an error if called, since
   * mixins cannot not have constructors in php
   */
  function __construct()
  {
    trigger_error(get_class($this) . " is a mixin and cannot be used as a standard class.");
  }

}

?>