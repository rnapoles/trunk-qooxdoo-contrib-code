<?php
/*
 * dependencies
 */
require_once "qcl/data/persistence/db/Object.php";

/*
 * Persistent object that registers information on the state
 * of the database tables.
 */
class qcl_db_model_xmlSchema_Registry
  extends qcl_data_persistence_db_Object
{
  /*
   * data
   * @var array
   */
  var $data;

  /**
   * Returns singleton instance of this class
   * @return qcl_db_model_xmlSchema_Registry
   * @see class/qcl/core/qcl_core_Object#getInstance($class)
   */
  function &getInstance()
  {
    return parent::getInstance(__CLASS__);
  }

  /**
   * Constructor. Reconstructs object properties
   * @param qcl_data_Controller $controller
   */
  function __construct( $controller=null )
  {
    /*
     * call parent contructor
     */
    parent::__construct( &$controller, __CLASS__ );
  }

  /**
   * Register initialization timestamp for table and datasource.
   * Can be called statically.
   *
   * @param qcl_data_datasource_type_db_Model $datasourceModel Datasource model object or null if not connected
   * @param string $table
   * @param string $class
   * @param int $timestamp
   * @return void
   */
  function registerInitialized( $datasourceModel, $table, $class, $timestamp )
  {
    $_this =& qcl_db_model_xmlSchema_Registry::getInstance();
    $datasource = $_this->_getDatasourceName( $datasourceModel );
    $_this->data[$datasource][$table][$class] = $timestamp;
    $_this->save();
    if ( $datasourceModel )
    {
      $_this->info("Registered table '$table' for class '$class' and datasource '$datasource' as initialized (timestamp $timestamp).");
    }
    else
    {
       $_this->info("Registered table '$table' class '$class' as initialized (timestamp $timestamp).");
    }
  }

  /**
   * Checks if initialization of table and datasource. Can be called statically.
   *
   * @param qcl_data_datasource_type_db_Model $datasourceModel Datasource model object or null if not connected
   * @param string $table
   * @param string $class
   * @param string $timestamp Optional timpstamp value to check
   * @return bool
   */
  function isInitialized( $datasourceModel, $table, $class=null, $timestamp=null )
  {
    $_this =& qcl_db_model_xmlSchema_Registry::getInstance();
    $datasource = $_this->_getDatasourceName( $datasourceModel );
    return ( $timestamp and $class ) ?
      ( $_this->data[$datasource][$table][$class] == $timestamp) :
      isset( $_this->data[$datasource][$table] );
  }

  /**
   * Returns the string name of the datasource model object.
   * @param qcl_data_datasource_type_db_Model $datasourceModel Datasource model object or null if not connected
   * @return string
   */
  function _getDatasourceName( $datasourceModel )
  {
    if ( is_null( $datasourceModel )  )
    {
      return "__NO_DATASOURCE";
    }
    elseif ( is_a( $datasourceModel, "qcl_data_datasource_type_db_Model" ) )
    {
      return $datasourceModel->getDatasourceName();
    }
    else
    {
      $this->raiseError("Invalid parameter: $datasourceModel");
    }
  }

}