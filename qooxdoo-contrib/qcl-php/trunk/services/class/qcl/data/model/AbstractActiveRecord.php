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
require_once "qcl/data/model/Model.php";

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
	 * The default record data that will be used when creating a new
	 * model record. You can preset static data here.
	 */
  protected $emptyRecord = array();

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
      "check"    => "DateTime",
      "nullable" => true
    ),
    "modified" => array(
      "check"    => "DateTime",
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
     * call parent constructor, this adds the properties
     */
    parent::__construct();

    /*
     * set datasource model
     */
    $this->setDatasourceModel( $datasourceModel );

    /*
     * initialize the model
     */
    $this->init();
  }

  /**
   * Model initialization. Sets the creation date to the current time.
   * Override this method for a different behavior, or call it from the
   * overriding method to keep it.
   */
  protected function init()
  {
    $this->set("created", new DateTime("now") );
  }

  //-------------------------------------------------------------
  // Getters & setters
  //-------------------------------------------------------------

  public function getModified()
  {
    return $this->get("modified");
  }

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



  //-------------------------------------------------------------
  // Record data, Properties and Columns
  //-------------------------------------------------------------

  /**
   * Returns the default data for a new empty record. Override
   * to configure this data
   * @return unknown_type
   */
  public function emptyRecord()
  {
    return $this->emptyRecord;
  }

  /**
   * Gets the data of the currently loaded record as a stdClass object
   * so you can use $record->foo instead of $record['foo']
   * @return stdClass
   */
  public function getRecordObject()
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

  /**
   * Returns the named id if it exists as property
   * @return string
   */
  public function getNamedId()
  {
    return $this->get("namedId");
  }

  /**
   * Sets the named id if it exists as property
   * @return string
   */
  public function setNamedId( $namedId )
  {
    return $this->set("namedId",$namedId);
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
   * If the last query has found more then one record, get the text one
   * @return array
   */
  public function nextRecord()
  {
    $record = $this->getQueryBehavior()->fetch();
    $this->set( $record );
    return $record;
  }

  //-------------------------------------------------------------
  // Data creation and manipulation
  //-------------------------------------------------------------

  /**
   * Creates a new model record.
   * @param $namedId
   * @return int Id of the record
   */
  public function create( $namedId = null )
  {
    $data = $this->emptyRecord();
    if ( $namedId and $this->checkProperty( $namedId ) )
    {
      $data['namedId'] = $namedId;
    }
    $id = $this->getQueryBehavior()->getTable()->insertRow( $data );
    $this->load( $id );
    return $id;
  }

  /**
   * Creates a new model record if one with the given named id does
   * not already exist.
   * @param string  $namedId
   * @return int the id of the inserted or existing record
   */
  public function createIfNotExists( $namedId  )
  {
    $id = $this->namedIdExists( $namedId );
    if ( $id === false )
    {
     $id = $this->create( $namedId );
    }
    else
    {
      $this->load( $id );
    }
    return $id;
  }

  /**
   * Checks if a model with the given named id exists.
   * @param $namedId
   * @return int id of record or false if does not exist
   */
  public function namedIdExists( $namedId )
  {
    $bhv = $this->getQueryBehavior();
    $rowCount = $bhv->select( new qcl_data_db_Query( array(
      'select' => "id",
      'where'  => array(
        'namedId' => $namedId
      )
    ) ) );
    if ( $rowCount )
    {
      $result = $bhv->fetch();
      return $result['id'];
    }
    else
    {
      return false;
    }
  }

  /**
   * Save the model properties to the database
   */
  public function save()
  {
    return $this->getQueryBehavior()->update( $this->data() );
  }

  /**
   * deletes one or more records in a table identified by id
   * @param mixed $ids (array of) record id(s)
   */
  public function delete()
  {
    $this->getQueryBehavior()->deleteRow( $this->getId() );
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
   * @return unknown_type
   */
  public function countWhere( $where )
  {
    return $this->getQueryBehavior()->countWhere( $where );
  }
}
?>