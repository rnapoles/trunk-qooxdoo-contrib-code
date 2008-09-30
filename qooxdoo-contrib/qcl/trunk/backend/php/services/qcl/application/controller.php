<?php

require_once "qcl/datasource/controller.php";

/**
 * QCL Application Controller
 * provides methods that are typically required in an application controller.
 * The main class of your application should extend this. For the moment,
 * this just wraps qcl_datasource_controller.
 *
 */
class qcl_application_controller extends qcl_datasource_controller
{
  
  //-------------------------------------------------------------
  // remote communication
  //-------------------------------------------------------------  
    
  /**
   * Remotely alerts on the client. You need to call this
   * in the method like so: 
   * return $this->alert("foo!");
   * 
   * @override
   * @param string response data
   */ 
  function alert($message)
  {
    $this->info($message);
    $this->dispatchMessage("qcl.commands.alert", $message);
    return $this->getResponseData();  
  }
  
  /**
   * Dispatches a message to the frontend, which will display a confirmation
   * message and return the result to the rpc method. the signature of the method
   * and the parameters transferred are the same plus an  boolean "true" as 
   * additional last parameter. You need to call this method like so:
   * return $this->confirmRemote("What do you want to do?", "service.name", $params);
   * 
   * @param string $display Message to be displayed
   * @param string $service Full dot-separated service name including service method
   * @param array  $params Array of mixed type parameters.
   */
  function confirmRemote ( $display, $service=null, $params=null )
  {
    if ( is_null($service) )
    {
      $service = $this->getServicePath();
    }
    
    if ( is_null($params) )
    {
      $service = $this->getParams();
    }
    
    array_shift($params); // remove first parameter (form data)
    $this->dispatchMessage("qcl.commands.confirmRemote",array( 
      'display'  => $display,
      'service'  => $service,
      'params'   => $params
    ) );
   return $this->getResponseData();  
  }
    
}

?>