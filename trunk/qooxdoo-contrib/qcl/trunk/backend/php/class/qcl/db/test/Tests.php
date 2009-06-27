<?php
require_once "qcl/data/datasource/Controller.php";


/**
 * Service class containing test methods
 */
class class_qcl_db_test_Tests extends qcl_data_datasource_Controller
{
  
  function method_runTests()
  {
    require_once "qcl/db/test/TestModel1.php";
    require_once "qcl/db/test/TestModel2.php";
    
    $logger =& $this->getLogger();
    $logger->setFilterEnabled("propertyModel",true);
    
    $model1 =& new TestModel1(&$this);
    $model1->create("foo");
    
    $model2 =& new TestModel2(&$this);
    $model2->create("bar");
    
    $this->debug($model->linkNodes);
    
    $model1->linkWith(&$model2);
    
    
    $this->debug($model2->schemaXml->asXml() );
    
    $this->debug("Model2 is linked with Model1: " . boolToStr( $model2->isLinkedWith($model1)) );
    
    
    $logger->setFilterEnabled("propertyModel",false);
    
    $this->dispatchMessage("infoMessage","See log file for results.");
    return $this->response();
  }
  
  
  
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