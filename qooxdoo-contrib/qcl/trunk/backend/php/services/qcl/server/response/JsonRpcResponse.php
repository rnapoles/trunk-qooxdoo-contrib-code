<?php

// not functional and not integrated yet
// this will integrate behavior that is now in the server class

require_once dirname(__FILE__) . "/AbstractResponse.php";

define ( "ARGUMENT_NOT_SET", "ARGUMENT_NOT_SET" );

class JsonRpcResponse extends AbstractResponse
{
  
  
  /**
   * Set a part or the full response
   * @param mixed $first Can be any of the following: 
   * 1) The key of a key-value pair. The value is the second argument. 
   * 2) A hash map of key-value pairs. No second argument.
   * 3) A string response that is the complete response value. No second argument.
   * Otherwise, all properties will be copied from the model
   * @param string[optional] $second
   * @param mixed $value
   */
  function set( $first, $second=ARGUMENT_NOT_SET )
  {
    if ( is_array( $first ) and $second === ARGUMENT_NOT_SET )
    {
      foreach( $first as $key => $value )
      {
        $this->set ( $key, $value );
      }
    }
    elseif ( is_string($first) and $second !== ARGUMENT_NOT_SET )
    {
      $this->data[$first] = $second;
    }
    elseif ( is_string($first) and $second === ARGUMENT_NOT_SET )
    { 
      $this->data = $first;
    }
    else
    {
      trigger_error("Invalid parameters");
    }
  }
  
  /**
   * Returns the value of a property of the response data 
   *
   * @param string $property
   */
  function get( $property )
  {
    if ( ! $property )
    {
      trigger_error("Invalid parameters");
    }
    if ( ! is_array( $this->data ) )
    {
      trigger_error("Response data is not an array.");
    }
    return $this->data[$property];
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