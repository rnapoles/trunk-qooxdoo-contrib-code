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

qcl_import( "qcl_data_model_Model" );

/**
 * Abstract class for all classes that implement a data model based on
 * the "Active Record" pattern. The object holds data for one record at
 * the time, but provides ways of cycling through a record set if more
 * than one record is retrieved by a query to the data container. The
 * implementing class must implement the getQueryBehaviorMethod() returning
 * an instance of the behavior class that implements qcl_model_IQueryBehavior.
 */

class qcl_data_model_AbstractActiveRecord
  extends qcl_data_model_Model
{

  /**
   * The object instance of the datasource that this model belongs to.
   * The datasource provides shared resources for models.
   * @var qcl_data_datasource_type_db_Model
   */
  protected $datasourceModel = null;


  //-------------------------------------------------------------
  // Model properties
  //-------------------------------------------------------------

  /**
   * @see qcl_data_model_PropertyBehavior
   * @var array
   */
  private $properties = array(
    "id" => array(
      "check"    => "integer",
      "nullable" => false,
    ),
    "created" => array(
      "check"    => "qcl_data_db_Timestamp",
      "nullable" => true
    ),
    "modified" => array(
      "check"    => "qcl_data_db_Timestamp",
      "nullable" => true
    )
  );

  //-------------------------------------------------------------
  // Initialization
  //-------------------------------------------------------------

  /**
   * Constructor
   * @param qcl_data_model_Model|null $datasourceModel Optional datasource
   *  model which provides shared resources for several models that belong
   *  to it.
   */
  function __construct( $datasourceModel=null )
  {
    if ( get_class( $this ) == __CLASS__ )
    {
      $this->raiseError("Class is abstract and must be extended.");
    }

    /*
     * set datasource model
     */
    $this->setDatasourceModel( $datasourceModel );

    /*
     * call parent constructor, this adds the properties
     */
    parent::__construct();
  }


  //-------------------------------------------------------------
  // Getters & setters
  //-------------------------------------------------------------

  /**
   * Getter for modification date
   * @return qcl_data_db_Timestamp
   */
  public function getModified()
  {
    return $this->get("modified");
  }

  /**
   * Getter for creation date
   * @return qcl_data_db_Timestamp
   */
  public function getCreated()
  {
    return $this->get("created");
  }

  /**
   * Getter for datasource model
   * @return qcl_data_datasource_type_db_Model
   */
  public function datasourceModel()
  {
    return $this->datasourceModel;
  }

  /**
   * Setter for datasource model
   * @param qcl_data_datasource_type_db_Model $datasourceModel
   */
  protected function setDatasourceModel( $datasourceModel )
  {
    $this->datasourceModel = $datasourceModel;
  }

  /**
   * Gets the data of the currently loaded record as a stdClass object
   * so you can use $record->foo instead of $record['foo']
   * @return stdClass
   */
  public function dataObject()
  {
    return (object) $this->data();
  }

  //-------------------------------------------------------------
  // Numeric and Named Id
  //-------------------------------------------------------------

  /**
   * Gets the id of the current record. Raises error if no record
   * is loaded.
   * @return int
   */
  public function getId()
  {
    $id = $this->get("id");
    if ( ! $id )
    {
      $this->raiseError("No record loaded in model " . $this->className() );
    }
    return $id;
  }

  /**
   * Alias of getId()
   * return int
   */
  public function id()
  {
    return $this->getId();
  }



  //-------------------------------------------------------------
  // Record Retrieval (load methods)
  //-------------------------------------------------------------

  /**
   * Returns the query behavior. Must be implemented by the subclass.
   * @return qcl_data_model_db_QueryBehavior
   */
  public function getQueryBehavior()
  {
    $this->notImplemented(__CLASS__,__METHOD__);
  }

  /**
   * Loads a model record identified by id. Does not return anything.
   * Throws an exception if no model data could be found.
   * @param int $id
   * @return void
   */
  public function load( $id )
  {
    $result = $this->getQueryBehavior()->fetchWhere( array( "id" => $id ) );
    $this->set( $result );
  }

  /**
   * If query is successful, load the first row of the result set into the
   * model.
   * @param qcl_data_db_Query|array $query
   * @return int Number of rows retrieved
   */
  public function loadWhere( $query )
  {
    $rowCount = $this->getQueryBehavior()->selectWhere( $query );
    if ( $rowCount )
    {
      $this->set( $this->getQueryBehavior()->fetch() );
    }
    return $rowCount;
  }

  /**
   * If the last query has found more then one record, get the text one.
   * If the end of the records has been reached, return null.
   * @return array|null
   */
  public function nextRecord()
  {
    $record = $this->getQueryBehavior()->fetch();
    if( $record )
    {
      $this->set( $record );
    }
    return $record;
  }

  //-------------------------------------------------------------
  // Data creation and manipulation
  //-------------------------------------------------------------

  /**
   * Creates a new model record.
   * @return int Id of the record
   */
  public function create()
  {
    $this->init();
    $this->set("created", new qcl_data_db_Timestamp("now") );
    $data = $this->data();
    $id   = $this->getQueryBehavior()->getTable()->insertRow( $data );
    $this->load( $id );
    return $id;
  }

  /**
   * Save the model properties to the database
   * @return boolean
   */
  public function save()
  {
    return $this->getQueryBehavior()->update( $this->data() );
  }

  /**
   * Deletes the record from the database. Does not delete the
   * active record object.
   * @return boolean
   */
  public function delete()
  {
    return $this->getQueryBehavior()->deleteRow( $this->getId() );
  }

  /**
   * Deletes the model records that match the 'where' data..
   * @param array $where
   * @return int number of affected rows
   */
  public function deleteWhere( $where )
  {
    return $this->getQueryBehavior()->deleteWhere( $where );
  }

  /**
   * Deletes all records from the database.
   * @return number of affected rows
   */
  public function deleteAll()
  {
    return $this->getQueryBehavior()->getTable()->truncate();
  }

  /**
   * Updates the given properties with new values of those model records
   * that match the 'where' data.
   * @param array $data Map of key - value pairs of the properties to be updated.
   * @param array $where
   * @return int number of affected rows
   */
  public function updateWhere( $data, $where )
  {
    return $this->getQueryBehavior()->updateWhere( $data, $where );
  }

  //-----------------------------------------------------------------------
  // Information on records/queries
  //-----------------------------------------------------------------------

  /**
   * Number of rows affected/selected by the last statement
   * @return int
   */
  public function rowCount()
  {
    return $this->getQueryBehavior()->rowCount();
  }

  /**
   * Returns true if the last query didn't find any records
   * @return boolean
   */
  public function foundNothing()
  {
    $this->rowCount() == 0;
  }

  /**
   * Whether the last query was successful
   * @return boolean
   */
  public function foundSomething()
  {
    $this->rowCount() > 0;
  }

  /**
   * Returns number of records in the database
   * @return int
   */
  public function countRecords()
  {
    return $this->getQueryBehavior()->countRecords();
  }

  /**
   * Returns the number of records matching the where
   * @param array $where Data for where statement, see qcl_data_model_IQueryBehavior::create
   * @return int
   */
  public function countWhere( $where )
  {
    return $this->getQueryBehavior()->countWhere( $where );
  }
}
?>