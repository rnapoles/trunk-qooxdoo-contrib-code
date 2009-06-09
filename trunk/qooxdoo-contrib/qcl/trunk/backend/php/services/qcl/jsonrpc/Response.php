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
  
  
  function setResult( $data )
  {
    $this->result = $data;
  }
  
  /**
   * Set a part or the full response
   * @param mixed $first Can be any of the following: 
   * 1) The key of a key-value pair. The value is the second argument. 
   * 2) A hash map of key-value pairs. No second argument.
   * 3) A string response that is the complete response value. No second argument.
   * 4) A property model. If a second array argument is given, the properties in the array will be copies.
   * Otherwise, all properties will be copied from the model
   * @param string[optional] $second
   * @param mixed $value
   */
  function set( $first, $second=QCL_ARGUMENT_NOT_SET )
  {
    if ( is_a( $first, "qcl_db_PropertyModel" ) )
    {
      if ( ! is_array($first->getRecord()) )
      {
        trigger_error("No record loaded in given model");
      }
      foreach ( $first->getRecord()  as $property => $value )
      {
        if ( $second == QCL_ARGUMENT_NOT_SET or ( is_array( $second ) and in_array( $property,$second ) ) )
        {
          $this->set( $property, $value );
        }
      }
    }
    elseif ( is_array( $first ) and $second === QCL_ARGUMENT_NOT_SET )
    {
      foreach( $first as $key => $value )
      {
        $this->set ( $key, $value );
      }
    }
    elseif ( is_string($first) and $second !== QCL_ARGUMENT_NOT_SET )
    {
      $this->result[$first] = $second;
    }
    elseif ( is_string($first) and $second === QCL_ARGUMENT_NOT_SET )
    { 
      $this->result = $first;
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