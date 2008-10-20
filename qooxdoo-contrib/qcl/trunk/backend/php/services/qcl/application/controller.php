<?php

require_once "qcl/datasource/controller.php";
require_once "qcl/application/Client.php";

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
    
}

?>