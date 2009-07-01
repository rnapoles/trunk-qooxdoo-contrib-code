<?php
require_once "qcl/event/type/Event.php";

class qcl_event_type_DataEvent
  extends qcl_event_type_Event
{

  /**
   * Constructor
   * @param string $type
   * @return void
   */
  function __construct( $type, $data )
  {
    $this->type = $type;
    $this->data = $data;
  }

  /**
   * Event Data
   * @var string
   */
  var $data;

}
?>