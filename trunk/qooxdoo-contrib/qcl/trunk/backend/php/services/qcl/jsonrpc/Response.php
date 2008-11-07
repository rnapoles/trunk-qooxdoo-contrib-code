<?php

class qcl_jsonrpc_Response
{
  
  /**
   * The result data returned by the service method
   * @var mixed
   */
  var $result = array();
  
  /**
   * An array of events dispatched on the server
   *
   * @var array
   */
  var $events = array();
  
  
  /**
   * An array of events dispatched on the server
   *
   * @var array
   */  
  var $messages = array();
  
  /**
   * Sets a property of the response data 
   *
   * @param string $property
   * @param mixed $value
   */
  function set( $property, $value )
  {
    if ( ! $property )
    {
      $this->raiseError("Invalid parameters");
    }
    $this->result[$property] = $value;
  }
  
  /**
   * Returns the value of a property of the response data 
   *
   * @param string $property
   */
  function get( $property, $value )
  {
    if ( ! $property )
    {
      $this->raiseError("Invalid parameters");
    }
    return $this->result[$property];
  }
  
  /**
   * Returns the result data
   *
   * @return unknown
   */
  function &getData()
  {
    return $this->result;
  }

  /**
   * adds a message to the message stack
   * @param string $message Message name
   * @param mixed[optional] $data Message Data
   * @return void
   */  
  function addMessage( $message, $data )
  {
    if ( is_string ($message) )
    {
      $this->messages[] = array(
        'name' => $message, 
        'data' => $data
      );
    }
    else
    {
      trigger_error ("Invalid message parameter");
    }    
  }
  
  /**
   * Returns the messages on the message stack
   * @return array
   */
  function &getMessages()
  {
    return $this->messages;
  }
  
  /**
   * Adds an event to the event stack
   * @param mixed $event Message Event type
   * @param mixed[optional] $data Data dispatched with event
   */
  function addEvent ( $event, $data=null )
  {
    if ( is_string ($event) )
    {
      $this->events[] = array(
        'type' => $event, 
        'data' => $data
      );
    }
    else
    {
      trigger_error ("Invalid event parameter");
    }
  }
    
  /**
   * Returns the events on the event stack
   * @return array
   */
  function &getEvents()
  {
    return $this->events;
  } 
}


?>