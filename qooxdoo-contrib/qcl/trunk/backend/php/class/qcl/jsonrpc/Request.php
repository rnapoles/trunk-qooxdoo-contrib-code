<?php

/*
 * dependencies
 */
require_once "qcl/core/Object.php";

/**
 * @todo rewrite
 * @author bibliograph
 *
 */
class qcl_jsonrpc_Request extends  qcl_core_Object
{
  /**
   * The raw json input object
   * @var JsonInput
   */
  var $jsonInput;

  /**
   * The server to which this object is attached
   * @var AbstractServer
   */
  var $server;

  /**
   * The service name
   * @var string
   */
  var $service;

  /**
   * The method name
   * @var string
   */
  var $method;

  /**
   * The parameters of the request
   */
  var $params;

  /**
   * Optional request id set by the application
   * (not by the jsonrpc transport)
   *
   * @var unknown_type
   */
  var $requestId;

  /**
   * The IP of the client requesting the service
   * @var array
   */
  var $ip;

  /**
   * Returns a singleton instance of this class
   * @return qcl_jsonrpc_Request
   */
  function &getInstance( )
  {
    if ( ! is_object( $GLOBALS[__CLASS__] ) )
    {
      $GLOBALS[__CLASS__] =& new qcl_jsonrpc_Request;
    }
    return $GLOBALS[__CLASS__];
  }

  /**
   * Sets the server that has received the request
   * @param JsonRpcServer $server
   * @return unknown_type
   */
  function setServer( $server )
  {
    /*
     * server object
     */
    if ( ! is_a( $server,"AbstractServer" ) )
    {
      trigger_error("No valid server method.");
    }
    $this->server =& $server;

    /*
     * request properties
     */
    $this->service    = $server->getService();
    $this->method     = $server->getMethod();
    $this->params     = $server->getParams();
    $this->serverData = $server->getServerData();

    $this->ip = $_SERVER['REMOTE_ADDR'];
  }


  /**
   * Returns the unique id of the current request set by the application, if any
   * @return string
   */
  function getRequestId()
  {
    return $this->requestId;
  }

  /**
   * sets the unique id of the current request
   * @return
   * @param $requestId Object
   */
  function setRequestId( $requestId )
  {
    $this->requestId = $requestId;
  }

  function getService()
  {
    return $this->service;
  }

  function getMethod()
  {
    return $this->method;
  }

  function getParams()
  {
    return $this->params;
  }

  function getServerData()
  {
    return $this->serverData;
  }

  function getIp()
  {
    return $this->ip;
  }

  /**
   * Returns the full path of the current service
   * @todo get this from server
   * @return string
   */
  function getServicePath()
  {
    return $this->getService() . "." . $this->getMethod();
  }

}


?>