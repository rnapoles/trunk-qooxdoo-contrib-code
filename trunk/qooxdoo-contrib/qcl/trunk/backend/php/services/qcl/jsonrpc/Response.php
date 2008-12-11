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
   * Set a part or the full response
   * @param mixed $first Can be any of the following: 
   * 1) The key of a key-value pair. The value is the second argument. 
   * 2) A hash map of key-value pairs. No second argument.
   * 3) A string response that is the complete response value. No second argument.
   * @param string[optional] $second
   * @param mixed $value
   */
  function set( $first, $second=null )
  {
    if ( is_array( $first ) and is_null( $second ) )
    {
      foreach( $first as $key => $value )
      {
        $this->set ( $key, $value );
      }
    }
    elseif ( is_string($first) and ! is_null( $second ) )
    {
      $this->result[$first] = $second;
    }
    elseif ( is_null ($second) )
    {    
      $this->result = $first;
    }
    else
    {
      $this->raiseError("Invalid parameters");
    }
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