<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */
require_once "qcl/data/persistence/db/Object.php";

/*
 * Persistent object that registers information on the state
 * of the database tables.
 */
class qcl_data_model_xmlSchema_DbRegistry
  extends qcl_data_persistence_db_Object
{
  /*
   * data
   * @var array
   */
  var $data;

  /**
   * Returns singleton instance of this class
   * @return qcl_data_model_xmlSchema_DbRegistry
   * @see class/qcl/core/qcl_core_Object#getInstance($class)
   */
  static function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Constructor. Reconstructs object properties
   */
  function __construct( )
  {
    /*
     * call parent contructor
     */
    parent::__construct( __CLASS__ );
  }

  /**
   * Register initialization timestamp for table and datasource.
   *
   * @param qcl_data_datasource_type_db_Model $datasourceModel Datasource model object or null if not connected
   * @param string $table
   * @param string $class
   * @param int $timestamp
   * @return void
   */
  public function registerInitialized( $datasourceModel, $table, $class, $timestamp )
  {
    $datasource = $this->_getDatasourceName( $datasourceModel );
    $this->data[$datasource][$table][$class] = $timestamp;
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
   * Checks if initialization of table and datasource. Can be called statically.
   *
   * @param qcl_data_datasource_type_db_Model $datasourceModel Datasource model object or null if not connected
   * @param string $table
   * @param string $class
   * @param string $timestamp Optional timpstamp value to check
   * @return bool
   */
  public function isInitialized( $datasourceModel, $table, $class=null, $timestamp=null )
  {
    $datasource = $this->_getDatasourceName( $datasourceModel );
    return ( $timestamp and $class ) ?
      ( $this->data[$datasource][$table][$class] == $timestamp) :
      isset( $this->data[$datasource][$table] );
  }

  /**
   * Returns the string name of the datasource model object.
   * @param qcl_data_datasource_type_db_Model $datasourceModel Datasource model object or null if not connected
   * @return string
   */
  private function _getDatasourceName( $datasourceModel )
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