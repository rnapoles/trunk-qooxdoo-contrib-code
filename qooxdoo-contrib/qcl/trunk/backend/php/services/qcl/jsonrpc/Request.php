<?php

/*
 * dependencies
 */
require_once "qcl/core/object.php";

class qcl_jsonrpc_Request extends  qcl_core_object 
{
  /**
   * The raw json input object
   * @var JsonInput
   */
  var $jsonInput;
  
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
  
  function __construct()
  {
    global $jsonInput;
    $this->jsonInput  = $jsonInput;
    $this->service    = $jsonInput->service;
    $this->method     = $jsonInput->method;
    $this->params     = $jsonInput->params;
    $this->serverData = $jsonInput->server_data;
    
    $this->ip = $_SERVER['REMOTE_ADDR'];
  }
  
  /**
   * Returns the raw json input object
   * @var JsonInput
   */
  function &getJsonInput()
  {
    return $this->jsonInput;
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
  
  
  
}


?>