<?php
/*
 * dependencies
 */
require_once "qcl/db/PersistentObject.php";

class qcl_db_ModelTableInfo extends qcl_db_PersistentObject 
{
  /*
   * data
   * @var array
   */
  var $data;
  
  /**
   * Constructor. Reconstructs object properties
   * @param qcl_jsonrpc_controller $controller
   */  
  function __construct( $controller )
  {
    /*
     * call parent contructor
     */
    parent::__construct( &$controller, __CLASS__ );
  }  
  
  /**
   * Register initialization timestamp for table and datasource
   *
   * @param qcl_datasource_db_model $datasourceModel Datasource model object or null if not connected
   * @param string $table
   * @param string $class
   * @param int $timestamp
   * @return void
   */
  function registerInitialized( $datasourceModel, $table, $class, $timestamp )
  {
    $datasource = $this->_getDatasourceName( $datasourceModel );
    $this->data[$datasource][$class][$table] = $timestamp;
    $this->save();
    if ( $datasourceModel )
    {
      $this->info("Registered table '$table' for class '$class' and datasource '$datasource' as initialized (timestamp $timestamp).");  
    }
    else
    {
       $this->info("Registered table '$table' class '$class' as initialized (timestamp $timestamp).");
    }
  }
  
  /**
   * Checks if initialization of table and datasource
   *
   * @param qcl_datasource_db_model $datasourceModel Datasource model object or null if not connected
   * @param string $table
   * @param string $class
   * @param string $timestamp
   * @return bool
   */
  function isInitialized( $datasourceModel, $table, $class, $timestamp )
  {
   
    $datasource = $this->_getDatasourceName( $datasourceModel );
    return $this->data[$datasource][$class][$table] == $timestamp;
  }
  
  /**
   * Returns the string name of the datasource model object
   * @param qcl_datasource_db_model $datasourceModel Datasource model object or null if not connected
   * @return string
   */
  function _getDatasourceName( $datasourceModel )
  {
    if ( is_null( $datasourceModel )  ) 
    {
      return "__NO_DATASOURCE";
    }
    elseif ( is_a( $datasourceModel, "qcl_datasource_db_model" ) )
    {
      return $datasourceModel->getDatasourceName();
    }
    else
    {
      $this->raiseError("Invalid parameter: $datasourceModel");
    }
  }
  
}