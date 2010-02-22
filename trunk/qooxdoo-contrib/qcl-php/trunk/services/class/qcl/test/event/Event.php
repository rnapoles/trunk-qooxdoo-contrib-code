<?php
require_once "qcl/data/controller/Controller.php";

class class_qcl_test_event_Event
  extends qcl_data_controller_Controller
{
  var $skipAuthentication = true;

  function method_testEvents()
  {
    $this->info("Testing server-side event system");
    $this->info("My id: #" . $this->objectId() );

    $object1 = new qcl_core_Object;
    $this->info("object1 -> #" . $object1->objectId() );
    $object1->addListener("fooEvent", $this, "handleFooEvent");

    $object2 = new qcl_core_Object;
    $this->info("object2 -> #" . $object2->objectId() );
    $object2->addListener("barEvent", $this, "handleBarEvent");

    $object1->fireDataEvent("fooEvent", "Foo!");
    $object1->fireDataEvent("barEvent", "Bar!");

    $object2->fireDataEvent("fooEvent", "Foo!");
    $object2->fireDataEvent("barEvent", "Bar!");

    return true;
  }

  function handleFooEvent( $event )
  {
    $myId = $this->objectId();
    $targetId = $event->getTargetId();
    $data = $event->getData();
    $this->info("#$myId:  'handleFooEvent' called from #$targetId with '$data' ");
  }

  function handleBarEvent( $event )
  {
    $myId = $this->objectId();
    $targetId = $event->getTargetId();
    $data = $event->getData();
    $this->info("#$myId: 'handleBarEvent' called from #$targetId with '$data' ");
  }

  function method_testMessages()
  {
    $this->info("Testing server-side message system");
    $this->info("My id: #" . $this->objectId() );

    $object1 = new qcl_core_Object;
    $this->info("object1 -> #" . $object1->objectId() );

    $object2 = new qcl_core_Object;
    $this->info("object2 -> #" . $object2->objectId() );

    $this->addSubscriber("barMessage", "handleBarMessage");
    $this->addSubscriber("fooMessage", "handleFooMessage");

    $object1->dispatchMessage("fooMessage", "Foo!");
    $object2->dispatchMessage("barMessage", "Bar!");
  }

  function handleFooMessage( $message )
  {
    $myId = $this->objectId();
    $senderId = $message->getSenderId();
    $data = $message->getData();
    $this->info("#$myId:  'handleFooMessage' called by #$senderId with '$data'.");
  }

  function handleBarMessage( $message )
  {
    $myId = $this->objectId();
    $senderId = $message->getSenderId();
    $data = $message->getData();
    $this->info("#$myId: 'handleBarMessage' called from #$senderId with '$data'.");
  }
}
?>