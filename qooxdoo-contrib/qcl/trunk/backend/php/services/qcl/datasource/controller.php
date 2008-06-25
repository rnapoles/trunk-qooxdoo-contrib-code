<?php

/*
 * dependencies
 */
require_once "qcl/db/controller.php";
require_once "qcl/datasource/db.model.php";
require_once "qcl/datasource/storage.php";

/**
 * datasource controller class. Can be used as a mixin or as a standalone class.
 */
class qcl_datasource_controller extends qcl_db_controller
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
  function register( $schemaName, $class )
  {    
    $this->info("Registering class $class for schema $schemaName");
    $storage =& $this->getStorage();
    $storage->setClassFor($schemaName,$class);   
  }
  
  /**
   * return the class name for a datasource schema name
   */
  function getClass($schemaName)
  {
    if ( !$schemaName )
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
    $class = $this->getClass($dsSchemaName);
    //$this->info("Datasource schema '$dsSchemaName' corresponds to class '$class.");
    return $this->getNew($class);
  }
  
  /**
   * gets the datasource model object used by a named datasource
   * @param string $name name of the datasource, must be in the datasources table
   * @return qcl_datasource_db_model
   */
  function &getDatasourceModel($name)
  {
    
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
    if ( $dsModel->notFound()  )
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
    $dsSchemaModel->getDatasourceConnection();
    
    return $dsSchemaModel;
  }
}

?>