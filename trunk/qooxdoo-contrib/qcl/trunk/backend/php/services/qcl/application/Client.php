<?php

require_once "qcl/jsonrpc/model.php";

/**
 * Model class representing
 * client. 
 */
class qcl_application_Client extends qcl_jsonrpc_model
{
  
  //-------------------------------------------------------------
  // remote communication
  //-------------------------------------------------------------  
    
  /**
   * Remotely alerts on the client. You need to call this
   * in the method like so: 
   * return $client->alert("foo!");
   * 
   * @override
   * @param string response data
   */ 
  function alert($message)
  {
    $this->info($message);
    $controller =& $this->getController();
    $controller->dispatchMessage("qcl.commands.remote.alert", $message);
    return $controller->getResponseData();  
  }
  
  /**
   * Remotely prompts the user to confirm and calls this method again. The signature of the method
   * and the parameters transferred are the same plus an  boolean "true" as 
   * additional last parameter. You need to call this method like so:
   * return $client->confirm("Do you really want to do this?");
   * 
   * @param string $display Message to be displayed
   */
  function confirm ( $display )
  {
    
    $controller =& $this->getController();
    $service    = $controller->getServicePath();
    $params     = (array) $controller->getParams();
    
    /*
     * remove first parameter (form data)
     */
    array_shift($params); 
    
    /*
     * dispatch messages
     */
    $controller->dispatchMessage("qcl.commands.remote.confirm",array( 
      'display'  => $display,
      'service'  => $service,
      'params'   => $params
    ) );
   return $controller->getResponseData();  
  }
  
  /**
   * Remotely prompts the user to enter a text and calls this method again. The signature
   * and the parameters transferred are the same plus the entered text as 
   * additional last parameter. You need to call this method like so:
   * return $client->prompt("Please enter a username", "Default text" );
   * 
   * @param string $display Message to be displayed

   */
  function prompt ( $display, $default )
  {
    
    $controller =& $this->getController();
    $service    = $controller->getServicePath();
    $params     = (array) $controller->getParams();
    
    /*
     * remove first parameter (form data)
     */
    array_shift($params); 
    
    /*
     * dispatch messages
     */
    $controller->dispatchMessage("qcl.commands.remote.prompt",array( 
      'display'       => $display,
      'defaultAnswer' => $default,
      'service'       => $service,
      'params'        => $params
    ) );
   return $controller->getResponseData();  
  }

  /**
   * Remotely presents a form to the user to enter and calls this method again
   * when the user clicks on the "Send" button. The signature
   * and the parameters transferred are the same plus the entered text as 
   * additional last parameter. You need to call this method like so:
   * return $client->presentForm("Please enter the following information", $formData );
   * The form data must be of the following format (using json format here)
   * <pre>
   * { 
   *  'username' : 
   *  {
   *    'label' : "User Name", 
   *    'value' : "", 
   *    'lines' : 1 
   *  }, 
   *  'domain'   : 
   *  {
   *    'label' : "Domain",
   *    'value' : 0,
   *    // options will generate a combobox, with 'value' preselected 
   *    'options' : [
   *      { 'label' : "Company", 'value' : 0, 'icon' : null }, 
   *      { 'label' : "Home", 'value' : 1, 'icon' : null },
   *    ]
   *   }
   * }
   * </pre>
   * 
   * 
   * @param string $display Message to be displayed
   * @param array  $formData Form Data
   */
  function presentForm ( $display, $formData )
  {
    
    $controller =& $this->getController();
    $service    = $controller->getServicePath();
    $params     = (array) $controller->getParams();
    
    /*
     * remove first parameter (form data)
     */
    array_shift($params); 
    
    /*
     * dispatch messages
     */
    $controller->dispatchMessage("qcl.commands.remote.presentForm",array( 
      'display'       => $display,
      'formData'      => $formData,
      'service'       => $service,
      'params'        => $params
    ) );
   return $controller->getResponseData();  
  }  
  
}

?>