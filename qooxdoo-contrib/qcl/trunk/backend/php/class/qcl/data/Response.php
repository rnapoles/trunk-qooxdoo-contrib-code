<?php
//require_once "qcl/data/IResponse.php";

/**
 * The response is the "view" part of the mvc Architecture in qcl.
 * It models the jsonrpc response. It differs from the "normal" jsonrpc
 * response on which the different jsonrpc backends and the databinding
 * feature of qooxdoo in that an additional data layer is added, which
 * transports events and messages between server and client.
 *
 * {
 *   // result property should always be provided in order to allow events and
 *   // messages to be transported
 *   result :
 *   {
 *     data       :  (... result data ...) ,
 *     events : [ { type : "fooEvent", data : ... },
 *                { type : "barEvent", data: ... }, ... ],
 *     messages : [ { name : "appname.messages.foo", data : ... },
 *                  { name : "appname.messages.bar", data: ... }, ... ]
 *   }
 *   // error property only exists if an error occurred
 *   error :
 *   {
 *     (... error data ...)
 *   }
 *   id : (int id of rpc request)
 * }
 *
 * The result.result element can be of any type, however, usually
 * it is an object, which allows to enforce a specific interface and,
 * thus, to enforce a signature for response data. You can use the co
 *
 */
class qcl_data_Response
//  implements qcl_data_IResponse
{

  /**
   * The result data returned by the service method
   * @var mixed
   */
  var $data = null;

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
   * Returns a singleton instance of this class
   * @return qcl_data_Response
   */
  function &getInstance( )
  {
    $clazz = __CLASS__;
    if ( ! is_object( $GLOBALS[ $clazz ] ) )
    {
      $GLOBALS[ $clazz ] =& new $clazz ;
    }
    return $GLOBALS[ $clazz ];
  }

  /**
   * Returns the result data.
   * @return mixed
   */
  function &getData()
  {
    return $this->data;
  }

  /**
   * Sets the response data
   * @param $data
   * @return void
   */
  function setData( $data )
  {
    if ( is_object( $data ) )
    {
      qcl_application_Application::raiseError("Invalid data. Must be a scalar value or an array. Use setDataObject() for objects.");
    }
    $this->data = $data;
  }

  /**
   * Sets the response data object.
   * @param qcl_data_ResponseDataObject $dataObject
   * @return void
   */
  function setDataObject( $dataObject )
  {
    if ( ! is_a( $dataObject, "qcl_data_ResponseDataObject") )
    {
      qcl_application_Application::raiseError("Invalid response data object. Must be a qcl_data_ResponseDataObject or a subclass of it.");
    }
    $this->data =& $dataObject;
  }

  /**
   * Returns the response data object.
   * @return qcl_data_ResponseDataObject
   */
  function &getDataObject()
  {
    return $this->data;
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

    if ( is_a( $first, "qcl_db_model_AbstractModel" ) )
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
      if ( ! is_a( $this->data, "qcl_data_responseDataObject" ) )
      {
        qcl_application_Application::raiseError("No valid response data object, must be a qcl_data_responseDataObject or subclass.");
      }
      $this->data->set( $first, $second );
    }
    elseif ( is_string($first) and $second === QCL_ARGUMENT_NOT_SET )
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
  function get( $property, $value )
  {
    if ( ! $property )
    {
      $this->raiseError("Invalid parameters");
    }
    return $this->result[$property];
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