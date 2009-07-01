<?php
require_once "qcl/data/controller/Controller.php";

class class_qcl_test_event_Event
  extends qcl_data_controller_Controller
{
  var $skipAuthentication = true;

  function method_testObjectId()
  {
    $this->info("Testing object id creation.");
    $time_start =  microtime_float();
    $obj = new qcl_core_Object;
    $id = $obj->objectId();
    $time_end = microtime_float();
    $time = $time_end - $time_start;
    $this->info( "It took $time seconds to generate object id $id" );
  }
}
?>