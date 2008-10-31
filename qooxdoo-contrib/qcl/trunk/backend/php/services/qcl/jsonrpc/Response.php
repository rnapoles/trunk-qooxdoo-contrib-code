<?php

class qcl_jsonrpc_Response
{
  
  /**
   * The result data returned by the service method
   * @var mixed
   */
  var $result = null;
  
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
  
  
}


?>