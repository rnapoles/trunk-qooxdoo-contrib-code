<?php
require_once "qcl/core/Object.php";

class qcl_event_type_Event
  extends qcl_core_Object
{

  /**
   * Type (name) of event
   * @var string
   */
  var $type;

  /**
   * Id of event target. Only available when the event has
   * been dispached
   * @var qcl_core_Object
   */
  var $targetId;


  /**
   * Constructor
   * @param string $type
   * @return void
   */
  function __construct( $type )
  {
    $this->type = $type;
  }

  /**
   * Sets the event target by saving its object id.
   * @param $target
   * @return unknown_type
   */
  function setTarget( $target )
  {
    if ( ! is_a( $target, "qcl_core_Object" ) )
    {
      $this->raiseError("Invalid target object.");
    }
    $this->setTargetId( $target->objectId() );
  }

  /**
   * Returns target object, if exists.
   * @return qcl_core_Object
   */
  function &getTarget()
  {
    if ( $this->targetId )
    {
      return $this->getObjectById( $this->getTargetId() );
    }
    return null;
  }

  function setTargetId( $targetId )
  {
    $this->targetId = $targetId;
  }

  function getTargetId()
  {
    return $this->targetId;
  }

}
?>