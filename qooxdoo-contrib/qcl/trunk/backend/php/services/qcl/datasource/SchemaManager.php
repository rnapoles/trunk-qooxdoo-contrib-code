<?php

require_once "qcl/db/PersistentObject.php";

/**
 * Persistent object storing and managing datasource information 
 */
class qcl_datasource_SchemaManager extends qcl_db_PersistentObject
{
  /**
   * Maps datasource schema names to datasource information
   *
   * @var array
   */
  var $data = array();
  
  /**
   * Constructor. Makes sure only one instance of this class is initialized.
   * @param qcl_jsonrpc_controller $controller
   */
  function __construct( $controller )
  {
    parent::__construct( &$controller, __CLASS__ );    
  }
  
  /**
   * Register datasource
   * @param string $name Name of datasource schema
   * @param string $class Name of datasource model class
   * @param string $title Descriptive title of the datasource
   * @param string $description Long description
   * return void
   */
  function register( $name, $class, $title, $description=null )
  {    
    $this->data[$name] = array(
      'class'       => $class,
      'title'       => $title,
      'description' => $description
    );
    $this->save();
  }
  
  /**
   * Returns the schema data. If an
   * string argument is provided, return only information
   * on the specific schema
   *
   * @param string[optional] $name
   * @return array
   */
  function getData( $name=null )
  {
    if ( $name )
    {
      return $this->data[$name];  
    }
    else
    {
      return $this->data;
    }
  }
  
  /**
   * Returns class modelling the datasource
   * @param string $name Name of datasource schema
   */
  function getClassFor( $name )
  {    
    if ( ! $name )
    {
      $this->raiseError("No schema name provided.");
    }
    $data = $this->getData( $name );
    return $data['class'];
  }
  
  /**
   * Returns a list of registered schema names
   *
   * @return array
   */
  function schemaList()
  {
    return array_keys($this->getData());
  }
    
}
?>