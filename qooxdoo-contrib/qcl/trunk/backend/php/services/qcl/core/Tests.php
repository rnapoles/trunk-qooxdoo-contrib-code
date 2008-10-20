<?php
require_once "qcl/jsonrpc/controller.php";

/**
 * Service class containing test methods
 */
class class_qcl_core_Tests extends qcl_jsonrpc_controller
{
  
  function method_test()
  {
    $this->Info("Test!");
    $this->set("foo","bar");
    return $this->getResponseData();
  }
  

  
}

?>