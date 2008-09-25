<?php

/*
 * dependencies
 */
require_once "qcl/http/request.php";

/**
 * Class to launch a jsonrpc request from php
 */
class qcl_http_JsonRpcRequest extends qcl_http_Request
{

  /**
   * Request content type
   */
  var $contentType ="application/json";
  
  /**
   * Constructor. Automatically sets URL
   * @param qcl_jsonrpc_controller $controlller 
   */
  function __construct($controller)
  {
    parent::__construct(&$controller);
    $this->setUrl($controller->getDispatcherUrl());
  }
  
  /**
   * sets the data in json format for jsonrpc request
   * @var mixed $data
   */
  function setJsonData($data)
  {
    $this->data = json_encode($data);  
  }  
  
  /**
   * Call JSONRPC service
   * @param string $service
   * @param string $method
   * @param array  $params
   * return string Response content without header data
   */
  function callService($service,$method,$params)
  {
    $this->info("Calling $service.$method with " .  count($params) . " parameter(s).");
    
    $this->setJsonData(array(
      'service'    => $service,
      'method'     => $method,
      'params'     => $params,
      'id'         => ((float) microtime() )*10
    )); 
    
    $this->send();
    
    return $this->getResponseContent();
  }
  
  /**
   * Shorthand method to call JSONRPC service. The difference to 
   * @see qcl_http_JsonRpcRequest::callService is that the first 
   * parameter is the full service path including the method name,
   * that the method can take a variable number of parameters
   * and that the result json string is parsed into a PHP array.
   * 
   * @param string $path The service including the method name
   * @param  mixed $param1
   * @param  mixed $param2
   * @param  mixed $param3 etc
   * return array
   */
  function call($path)
  {
    /*
     * service and method
     */
    $p = new String($path);
    $service = $p->substring(0,$p->lastIndexOf("."));
    $method  = $p->substr($p->lastIndexOf(".")+1);

    /*
     * parameters
     */
    $params = func_get_args();
    array_shift($params);
    
    /*
     * call service
     */
    $result = $this->callService($service,$method,$params);
    
    /*
     * return decoded result
     */
    return json_decode($result);
  }
}

?>