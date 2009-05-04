<?php

// not functional and not integrated yet
// this will integrate behavior that is now in the server class
// changes will not affect existing API or behavior
require_once dirname(__FILE__) . "/AbstractRequest.php";

class JsonrpcRequest 
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
   * Constructor
   * @param JsonRpcServer $server
   * @return unknown_type
   */
  function __construct( $server )
  {
    /*
     * server object
     */
    if ( ! is_a( $server,"JsonRpcServer" ) )
    {
      trigger_error("No valid server object.");
    }
    
    /*
     * request properties
     */
    $this->service    = $server->getService();
    $this->method     = $server->getMethod();
    $this->params     = $server->getParams();
    $this->serverData = $server->getServerData();
    
    /*
     * call parent constructor
     */
    parent::__construct( &$server );
  }
  
  /**
   * Returns the raw json input object
   * @var object
   */
  function getJsonInput()
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
  

}

?>