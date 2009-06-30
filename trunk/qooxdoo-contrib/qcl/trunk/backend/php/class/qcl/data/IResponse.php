<?php

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
 *     data : { (... result data ...) },
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
 */
interface qcl_data_IResponse
{

  /**
   * The result data returned by the service method
   * @var mixed
   */
  public $data;

  /**
   * An array of events dispatched on the server
   *
   * @var array
   */
  public $events;


  /**
   * An array of events dispatched on the server
   *
   * @var array
   */
  public $messages;

  /**
   * Returns a singleton instance of this class
   * @return qcl_data_IResponse
   */
  function &getInstance();

  /**
   * Returns the result data.
   * @return mixed
   */
  function &getData();

  /**
   * Sets the response data
   * @param $data
   * @return void
   */
  function setData( $data );

  /**
   * Sets the response data object.
   * @param qcl_data_ResponseDataObject $dataObject
   * @return void
   */
  function setDataObject( $dataObject );

  /**
   * Returns the response data object.
   * @return qcl_data_ResponseDataObject
   */
  function &getDataObject();

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
  function set( $first, $second=QCL_ARGUMENT_NOT_SET );

  /**
   * Returns the value of a property of the response data
   *
   * @param string $property
   */
  function get( $property, $value );

  /**
   * Returns the result data
   *
   * @return unknown
   */
  function &getData();

  /**
   * adds a message to the message stack
   * @param string $message Message name
   * @param mixed[optional] $data Message Data
   * @return void
   */
  function addMessage( $message, $data );

  /**
   * Returns the messages on the message stack
   * @return array
   */
  function &getMessages();

  /**
   * Adds an event to the event stack
   * @param mixed $event Message Event type
   * @param mixed[optional] $data Data dispatched with event
   */
  function addEvent ( $event, $data=null );

  /**
   * Returns the events on the event stack
   * @return array
   */
  function &getEvents();
}
?>