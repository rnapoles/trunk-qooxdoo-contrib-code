<?php
require_once "qcl/datasource/controller.php";


/**
 * Service class containing test methods
 */
class class_qcl_db_Tests extends qcl_datasource_controller
{
  
  
  function method_testExport($params)
  {
    list($modelName) = $params;
    $model =& $this->getNew($modelName);
    $model->export();
  }
  
  function method_testExportLinkData($params)
  {
    list($modelName) = $params;
    $model =& $this->getNew($modelName);
    $model->exportLinkData();
  }  

  function method_testImportLinkData($params)
  {
    list($modelName) = $params;
    $model =& $this->getNew($modelName);
    $model->importLinkData();
  }    
  
  
}

?>