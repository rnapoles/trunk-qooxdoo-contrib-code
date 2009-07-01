<?php
require_once "qcl/data/controller/Controller.php";

class class_qcl_test_event_Transport
  extends qcl_data_controller_Controller
{
  function method_testServerEvents()
  {
    $this->info("Testing event transport");
    $this->fireServerDataEvent("fooEvent", "Foo!");
    $this->fireServerEvent("barEvent" );
    return true;
  }

  function method_testServerMessages()
  {
    $this->info("Checking message transport");
    $this->dispatchServerMessage("fooMessage", "Foo!");
    $this->broadcastServerMessage("barMessage", "Bar!");
    return true;
  }
}
?>