<?php

/*
 * dependencies
 */
require_once "qcl/session/controller.php";
require_once "qcl/datasource/manager.php";

/**
 * datasource controller class
 */
class qcl_datasource_controller extends qcl_session_controller
{  

  /**
   * cache for datasource model objects
   * @var array
   */ 
  var $datasourceModels = array();  
  
  /**
   * gets and initializes the datasource model object for a datasource with the given name
   * @param string $name
   * @return qcl_datasource_db_model
   */
  function &getDatasourceModel($name)
  {
     
    /*
     * use cached object if it has been created already 
     */
    if ( ! $this->datasourceModels[$name] )
    {
      /*
       * datasource manager class
       */
      $dsManager =& new qcl_datasource_manager;    
            
      /*
       * get datasource model specific to the datasource  
       */
      $dsModel =& $dsManager->getDatasourceModel($name);
      $dsModel->initializeModels();
      $this->datasourceModels[$name] =& $dsModel;
    }
    return $this->datasourceModels[$name];
  }
   
}

?>