<?php
require_once "qcl/core/Object.php";

define("QCL_LOG_TYPE_EVENT", "QCL_LOG_TYPE_EVENT" );

/**
 * Event Dispatcher Singleton
 */
class qcl_event_Dispatcher
  extends qcl_core_Object
{

  /**
   * database for event listeners registered on this object
   * @todo mover everything related to events and messages to event package
   * @var array
   */
  var $__event_db = array();

  /**
   * Events that are forwarded to the client at the end of the request
   * @var array
   */
  var $__serverEvents = array();

  /**
   * Returns a singleton instance of this class
   * @return qcl_event_Dispatcher
   */
  function &getInstance( )
  {
    $clazz = __CLASS__;
    if ( ! is_object( $GLOBALS[$clazz] ) ) $GLOBALS[$clazz] =& new $clazz;
    return $GLOBALS[$clazz];
  }

 /**
   * Adds an event listener. Works only during runtime, i.e. event bindings are not
   * persisted. Can be called statically.
   *
   * @param qcl_core_Object $target The object that the Listener is added to
   * @param string $type The name of the event
   * @param string|qcl_core_Object $listener The object or the object id retrieved by '$this->objectId()'
   * @param string $method callback method of the object
   * @todo move to external class
   */
  function addListener( $target, $type, $listener, $method )
  {

    $_this =& qcl_event_Dispatcher::getInstance();

    /*
     * target object id
     */
    if ( ! is_a( $target, "qcl_core_Object" ) )
    {
      $this->raiseError("Invalid target object");
    }
    $targetObjectId = $target->objectId();

    /*
     * listener object id
     */
    if ( is_a( $listener,"qcl_core_Object" ) )
    {
      $listenerObjectId = $listener->objectId();
    }
    elseif ( is_string( $listener) and ! empty( $listener ) )
    {
      $listenerObjectId = $listener;
    }
    else
    {
      $this->raiseError("Invalid listener object or object id");
    }

    /*
     * event database
     */
    $event_db =& $_this->__event_db[$targetObjectId];
    if ( ! $event_db )
    {
      $event_db = array(
        'types' => array(),
        'data' => array()
      );
    }

    /*
     * search if we already have an entry for the event type
     */
    $index = array_search( $type, $event_db['types'] );
    if ( $index === false )
    {
      /*
       * filter not found, create new filter and data
       */
      $event_db['types'][] = $type;
      $index = count($event_db['types']) -1;
      $event_db['data'][$index] = array(
        array( $listenerObjectId, $method )
      );
    }
    else
    {
      /*
       * filter found, add data
       */
      $event_db['data'][$index][] = array( $listenerObjectId, $method );
    }
  }

  /**
   * Dispatches a server event. Can be called statically.
   * @param qcl_core_Object $target
   * @param qcl_event_type_Event $event
   * @return bool Whether the event was dispatched or not.
   */
  function dispatch ( $target, $event )
  {
    $_this =& qcl_event_Dispatcher::getInstance();

    /*
     * event
     */
    if ( ! is_a( $event,"qcl_event_type_Event" ) )
    {
      $_this->raiseError("Invalid argument, must be a qcl_event_type_Event or subclass.");
    }
    $event->setTarget(&$target);

    /*
     * target object id
     */
    if ( ! is_a( $target, "qcl_core_Object" ) )
    {
      $_this->raiseError("Invalid target object");
    }
    $targetObjectId = $target->objectId();

    /*
     * search message database
     */
    $type = $event->getType();
    $event_db =& $_this->__event_db[$targetObjectId];

    if ( ! is_array( $event_db ) )
    {
      $_this->setError("Object #$targetObjectId has no listeners.");
      return false;
    }

    $index = array_search ( $type, (array) $event_db['types'] );

    /*
     * abort if no event listener for this message has been registered
     */
    if ( $index === false )
    {
      $_this->setError("Object #$targetObjectId has no listeners for event '$type'");
      return false;
    }

    /*
     * call object methods
     */
    foreach ( $event_db['data'][$index] as $listenerData )
    {
      list( $listenerObjectId, $method ) = $listenerData;
      $listenerObject =& $_this->getObjectById( $listenerObjectId );
      $listenerObject->$method($event);
    }
  }

  /**
   * Fires an event. Can be called statically
   * @param qcl_core_Object $target
   * @param string $name
   * @return unknown_type
   */
  function fireEvent( $target, $type )
  {
    $_this =& qcl_event_Dispatcher::getInstance();
    require_once "qcl/event/type/Event.php";
    $event =& new qcl_event_type_Event( $type );
    $_this->dispatch( &$target, &$event );
  }

  /**
   * Fires a data event.Can be called statically
   * @param qcl_core_Object $target
   * @param string $name
   * @param mixed $data
   * @return void
   */
  function fireDataEvent( $target, $type, $data )
  {
    $_this =& qcl_event_Dispatcher::getInstance();
    require_once "qcl/event/type/DataEvent.php";
    $event =& new qcl_event_type_DataEvent( $type, $data );
    $_this->dispatch( &$target, &$event );
  }

  /**
   * Fires a server event which will be forwarded to the client and
   * dispatched o the jsonrpc data store that has initiated the request.
   * Can be called statically.
   * @param qcl_core_Object $target
   * @param string $name
   * @return unknown_type
   */
  function fireServerEvent( $target, $type )
  {
    $_this =& qcl_event_Dispatcher::getInstance();
    require_once "qcl/event/type/ServerEvent.php";
    $event =& new qcl_event_type_ServerEvent( $type );
    $_this->dispatch( &$target, &$event );
    $_this->__serverEvents[] = array(
      'type' => $event->getType(),
      'class' => "qx.event.data.Event"
    );
  }

  /**
   * Fires a server data event which will be forwarded to the client and
   * dispatched o the jsonrpc data store that has initiated the request.
   * Can be called statically
   * @param qcl_core_Object $target
   * @param string $name
   * @param mixed $data
   * @return void
   */
  function fireServerDataEvent( $target, $type, $data )
  {
    $_this =& qcl_event_Dispatcher::getInstance();
    require_once "qcl/event/type/ServerDataEvent.php";
    $event =& new qcl_event_type_ServerDataEvent( $type, $data );
    $_this->dispatch( &$target, &$event );
    $_this->__serverEvents[] = array(
      'type'  => $event->getType(),
      'class' => "qx.event.data.DataEvent",
      'data'  => $event->getData()
    );
  }

  /**
   * Returns all server events
   * @return array
   */
  function getServerEvents()
  {
    $_this =& qcl_event_Dispatcher::getInstance();
    return $_this->__serverEvents;
  }
}
?>