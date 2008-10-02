<?php

/*
 * dependencies
 */
require_once "qcl/session/controller.php";
require_once "qcl/datasource/db.model.php";
require_once "qcl/datasource/storage.php";

/**
 * Datasource controller class. Can also be used as a mixin for controllers
 * that are not bound to a database.
 * @todo Get rid of file-based storage and use persistend db object instead.
 */
class qcl_datasource_controller extends qcl_session_controller
{  

  /**
   * storage object
   * @var qcl_datasoure_storage
   */
  var $storage;
  
  /**
   * default datasource model class.
   * @var string
   */
  var $defaultModelClass = "qcl_datasource_db_model";  
  
  /**
   * cache for datasource model objects
   * @var array
   */ 
  var $datasourceModels = array();  
  
  /**
   * Gets and initializes the datasource model object for a 
   * datasource with the given name
   * @param string $name
   * @return qcl_datasource_db_model
   */
  function &getDatasourceModel($name)
  {
     
    /*
     * create model object if it hasn't been created already 
     */
    if ( ! $this->datasourceModels[$name] )
    {

      /*
       * get datasource model specific to the datasource  
       */
      $dsModel =& $this->getDatasourceModelByName($name);
      
      /*
       * initialize the models that belong to the name
       */
      $dsModel->initializeModels($name);
      
      /*
       * save reference to the object
       */
      $this->datasourceModels[$name] =& $dsModel;
    }
    
    /*
     * return cached model object
     */
    return $this->datasourceModels[$name];
  }

  /**
   * gets storage object
   * @return qcl_datasource_storage
   */
  function &getStorage()
  {
    if ( ! $this->storage )
    { 
      //$this->info("Getting persistent Instance...");
      $this->storage =& $this->getPersistentInstance("qcl_datasource_storage");
    }
    return $this->storage;
  }
  
  
  /**
   * register datasource
   * @param string $name Name of datasource schema
   * @param string $class Name of datasource model class
   */
  function registerDatasourceSchema( $schemaName, $class )
  {    
    $this->info("Registering class $class for schema $schemaName");
    $storage =& $this->getStorage();
    $storage->setClassFor($schemaName,$class);   
  }
  
  /**
   * return the class name for a datasource schema name
   */
  function getClassForSchema($schemaName)
  {
    if ( ! $schemaName )
    {
      $class = $this->defaultModelClass;
    }
    else
    {
      $storage =& $this->getStorage();
      $class = $storage->getClassFor($schemaName);
      if ( !$class )
      {
        $this->raiseError("Schema '$schemaName' has no corresponding class name.'");
      }
    }
    
    //$this->info("Getting class $class for schema $schemaName");

    if ( !$class )
    {
      $this->raiseError("No class defined for datasource schema $schemaName.");
    }
    return $class;
  }
  
  /**
   * returns the datasource model object for the given datasource schema name
   * @param string $dsSchemaName
   * @return qcl_datasource_db_model
   */
  function &getSchemaModel($dsSchemaName)
  {
    $class = $this->getClassForSchema($dsSchemaName);
    
    //$this->info("Datasource schema '$dsSchemaName' corresponds to class '$class.");
    return $this->getNew($class);
  }
  
  /**
   * gets the datasource model object used by a named datasource
   * @param string $name name of the datasource, must be in the datasources table
   * @return qcl_datasource_db_model
   */
  function &getDatasourceModelByName($name)
  {
    
    if ( empty($name) )
    {
      $this->raiseError("Missing dataource name.");
    }
    
    /*
     * get abstract datasource model to retrieve more specific one
     */
    $dsModel  =& new qcl_datasource_db_model( &$this );

    /*
     * retrieve record that matches the datasource name
     */    
    $data = $dsModel->findByNamedId( $name );

    /*
     * abort if not found
     */
    if ( $dsModel->foundNothing()  )
    {
      $this->raiseError("Datasource '$name' doesn't exist." );
    }
 
    /*
     * get schema name
     */
    $dsSchemaName = $dsModel->getSchema();
    //$this->info("Datasource '$name' has schema name '$dsSchemaName'");
    
    /*
     * get datasource schema model and copy over record data
     */
    $dsSchemaModel =& $this->getSchemaModel($dsSchemaName);
    $dsSchemaModel->currentRecord = $dsModel->currentRecord;
    
    /*
     * create connection to this datasource
     */
    //$dsSchemaModel->getDatasourceConnection();
    
    /*
     * store name of the datasource in the model
     */
    $dsSchemaModel->datasource = $name;
    
    return $dsSchemaModel;
  } 
}
?>