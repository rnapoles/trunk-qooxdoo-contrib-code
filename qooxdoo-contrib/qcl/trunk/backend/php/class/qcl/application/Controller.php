<?php

require_once "qcl/data/datasource/Controller.php";
require_once "qcl/application/Client.php";

/**
 * QCL Application Controller
 * provides methods that are typically required in an application controller.
 * The main class of your application should extend this. For the moment,
 * this just wraps qcl_data_datasource_Controller.
 *
 */
class qcl_application_Controller extends qcl_data_datasource_Controller
{
  
  //-------------------------------------------------------------
  // remote communication
  //-------------------------------------------------------------  
    
  /**
   * @see qcl_application_Client::alert
   */ 
  function alert($message)
  {
    $this->info($message);
    $client = new qcl_application_Client(&$this);
    return $client->alert ( $message );
  }
  
  /**
   * @see qcl_application_Client::confirm
   */
  function confirmRemote ( $message )
  {
    $client = new qcl_application_Client(&$this);
    return $client->confirm ( $message );
  }
  
  /**
   * Returns the parameter in the request that indicates if the user
   * has confirmed a message.
   * @param bool[optional,default true] $boolVal Boolean value to compare the value with
   * @return bool
   */
  function isConfirmed( $boolVal=true )
  {
    $params  = $this->getParams();
    $confirm = end($params);
    if ( is_bool( $confirm ) )
    {
      return $confirm === $boolVal;
    }
    else
    {
      return false;
    }
  }
  
  /**
   * Returns a html snippet that displays a progress bar
   * with the given progress (in percent)
   * @param int $percent
   * @param int $height Optional height, defaults to a slim 8 pixel bar including the 
   * border
   */
  function getProgressBarHtml($percent,$height=8)
  {
    $html =  "<div style='width:100%;height:{$height}px;border:1px solid grey;padding:1px;'><div style='width:$percent%;height:100%;background-color:blue;'></div></div>";
    return $html;
  }
  
  /**
   * Overrridden method to allow debugging of response data
   * @override
   * @return array
   * @todo json debug 
   */
  function &response()
  {
    if ( $this->getActiveUser() ) 
    {
      //$configModel =& $this->getConfigModel();

      /*
       * doesn't work!
       */
      //if ( $configModel->get("qcl.components.jsonrpc.MonitorWindow.enabled") )
      //{
        //$this->debugJsonRpcRequestAsHtml();  
      //}
     
    }
    return parent::response(); 
  }  
    
}

?>