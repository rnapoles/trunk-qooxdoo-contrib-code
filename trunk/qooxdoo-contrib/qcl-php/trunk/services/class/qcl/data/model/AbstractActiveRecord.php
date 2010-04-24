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
   * The name of the property that is used to reference the
   * model record in a different model
   * @var string
   */
  protected $foreignKey;

  /**
   * The object instance of the datasource that this model belongs to.
   * The datasource provides shared resources for models.
   * @var qcl_data_datasource_DbModel
   */
  private $datasourceModel;


  /**
   * The last query executed
   * @var qcl_data_db_Query
   */
  private $lastQuery;


  /**
   * Valid operators for where queries. Override for
   * non-SQL-type models
   */
  public $operators= array(
    "like","is","is not","=",">","<","!="
  );

  protected $_loaded = false;

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
   * @param qcl_data_datasource_DbModel|null $datasourceModel Optional datasource
   *  model which provides shared resources for several models that belong
   *  to it.
   */
  function __construct( $datasourceModel=null )
  {

    if ( get_class( $this ) == __CLASS__ )
    {
      $this->raiseError("Class is abstract and must be extended.");
    }

    parent::__construct();

    /*
     * set datasource model
     */
    $this->setDatasourceModel( $datasourceModel );
  }

  /**
   * Initializes the model and the behaviors.
   * @return boolean True if initialization has to be done in the subclass,
   * false if object was already initialized earlier.
   */
  public function init()
  {
    if ( parent::init() )
    {
      $this->getQueryBehavior()->init();
      $this->getRelationBehavior()->init();
      return true;
    }
    return false;
  }

  //-------------------------------------------------------------
  // Getters & setters
  //-------------------------------------------------------------

  /**
   * Generic setter for model properties.
   * @see qcl_core_Object#set()
   * @return qcl_data_model_db_ActiveRecord
   */
  public function set( $first, $second= null, $checkLoaded=true )
  {
    if( $checkLoaded) $this->checkLoaded();
    parent::set( $first, $second );
    return $this;
  }

  /**
   * Getter for modification date
   * @return qcl_data_db_Timestamp
   */
  public function getModified()
  {
    $this->checkLoaded();
    return $this->get("modified");
  }

  /**
   * Getter for creation date
   * @return qcl_data_db_Timestamp
   */
  public function getCreated()
  {
    $this->checkLoaded();
    return $this->get("created");
  }

  /**
   * Getter for datasource model
   * @return qcl_data_datasource_DbModel
   */
  public function datasourceModel()
  {
    return $this->datasourceModel;
  }

  /**
   * Setter for datasource model
   * @param qcl_data_datasource_DbModel $datasourceModel
   * FIXME use interface!
   */
  protected function setDatasourceModel( $datasourceModel )
  {
    if ( is_null( $datasourceModel ) )
    {
      $this->datasourceModel = $datasourceModel;
    }
    elseif ( $datasourceModel instanceof qcl_data_datasource_DbModel )
    {
      $datasourceModel->id(); // makes sure active record is loaded
      $this->datasourceModel = $datasourceModel;
    }
    else
    {
      throw new InvalidArgumentException("Datasource model must be null or instance of qcl_data_datasource_DbModel");
    }
  }

  /**
   * Overridden to check if record has been loaded
   * @return array
   */
  public function data()
  {
    $this->checkLoaded();
    return parent::data();
  }

  /**
   * Gets the data of the currently loaded record as a stdClass object
   * so you can use $record->foo instead of $record['foo']
   * @return stdClass
   */
  public function dataObject()
  {
    $this->checkLoaded();
    return (object) $this->data();
  }

  /**
   * Returns the legal operators for "where" queries
   * @return array
   */
  public function operators()
  {
    return $this->operators;
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
    $this->checkLoaded();
    $id = (int) $this->get("id");
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
  // Query behavior
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
   * Add indexes to the backend database.
   * @see qcl_data_model_IQueryBehavior::addIndexes()
   * @param array $indexes
   * @return unknown_type
   */
  public function addIndexes( $indexes )
  {
    return $this->getQueryBehavior()->addIndexes( $indexes );
  }

  //-------------------------------------------------------------
  // Record Retrieval (load methods)
  //-------------------------------------------------------------

  /**
   * Loads a model record identified by id. Does not return anything.
   * Throws an exception if no model data could be found. Returns
   * itself in order to allow changed method calling ($model->load(1)->delete();
   *
   * @param int $id
   * @return qcl_data_model_db_ActiveRecord
   * @throws qcl_data_model_RecordNotFoundException
   */
  public function load( $id )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * select and fetch row with corresponding id
     */
    $this->getQueryBehavior()->select( new qcl_data_db_Query( array(
      'select' => $this->properties(),
      'where'  => array( "id" => $id )
    ) ) );
    $result = $this->getQueryBehavior()->fetch();

    /*
     * typecast and set result
     */
    if ( $result )
    {

      $propBehavior = $this->getPropertyBehavior();
      foreach( $result as $property => $value )
      {
        $this->set( $property, $propBehavior->typecast( $property, $value ), false );
      }

      /*
       * Mark that we're loaded
       */
      $this->_loaded = true;

      /*
       * return myself
       */
      return $this;
    }
    throw new qcl_data_model_RecordNotFoundException( sprintf(
      "Model record [%s #%s] does not exist",
      $this->className(), $id
    ) );
  }

  /**
   * Return true if record has been loaded, false if not.
   * @return bool
   */
  public function isLoaded()
  {
    return $this->_loaded;
  }


  /**
   * Checks if active record is loaded and throws a qcl_data_model_NoRecordLoadedException if not.
   * @return void
   * @throws qcl_data_model_NoRecordLoadedException
   */
  protected function checkLoaded()
  {
    if ( ! $this->_loaded )
    {
      //throw new qcl_data_model_NoRecordLoadedException("Model is not loaded yet.");
      $this->raiseError("Model is not loaded yet.");
    }
  }

  /**
   * If query is successful, load the first row of the result set into the
   * model. If not, throw an exception. Returns
   * itself in order to allow changed method calling, such as:
   * $model->loadWhere( array( 'foo' => "bar" )
   *  ->set( array( 'foo' => "baz" )
   *  ->save();
   *
   * @throws qcl_data_model_RecordNotFoundException
   * @param qcl_data_db_Query|array $query
   * @return qcl_data_model_db_ActiveRecord
   */
  public function loadWhere( $query )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * select and fetch first row that matches the query
     */
    $query = $this->getQueryBehavior()->selectWhere( $query );

    if ( $query->getRowCount() > 0 )
    {
      $result = $this->getQueryBehavior()->fetch();
      $propBehavior = $this->getPropertyBehavior();

      /*
       * Set all the properties
       */
      foreach( $result as $property => $value )
      {
        $this->set( $property, $propBehavior->typecast( $property, $value ), false );
      }

      /*
       * mark that a record is loaded
       */
      $this->_loaded = true;

      /*
       * return the number of rows found
       */
      return $query->getRowCount();
    }
    else
    {
      throw new qcl_data_model_RecordNotFoundException( sprintf(
        "No model instance [%s] could be found for the given query",
        $this->className()
      ) );
    }
  }

  //-----------------------------------------------------------------------
  // Select model records for iteration
  //-----------------------------------------------------------------------

  /**
   * find model records that match the given query object
   * for iteration
   * @param qcl_data_db_Query $query
   * @return int Number of found records
   */
  public function find( qcl_data_db_Query $query )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * execute query
     */
    return $this->getQueryBehavior()->select( $query );
  }

  /**
   * find model records that match the given where array data
   * for iteration
   * @param array $where
   * @return qcl_data_db_Query Result query object
   */
  public function findWhere( $query )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * execute query
     */
    $this->lastQuery =  $this->getQueryBehavior()->selectWhere( $query );
    return $this->lastQuery;
  }

  /**
   * Find all model records for iteration
   * @return qcl_data_db_Query The query object to use for iteration
   */
  public function findAll()
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * run query
     */
    $this->lastQuery = new qcl_data_db_Query( array(
      "select" => "*"
    ) );
    $this->getQueryBehavior()->select( $this->lastQuery );
    return $this->lastQuery;
  }

  /**
   * Find the models instances that are linked with the target model
   * for iteration.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return qcl_data_db_Query
   */
  public function findLinked( $targetModel )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * find linked ids
     */
    $ids = $this->getRelationBehavior()->linkedModelIds( $targetModel );
    if ( count( $ids ) )
    {
      $this->lastQuery = $this->getQueryBehavior()->selectIds( $ids );
      return $this->lastQuery;
    }
    else
    {
      throw new qcl_data_model_RecordNotFoundException( sprintf(
        "No record of [%s] is linked to %s",
        $this->className(), $targetModel
      ) );
    }
  }

  /**
   * If the last query has found more then one record, get the first or next one.
   * If not, or the end of the found records has been reached, return null.
   * @param qcl_data_db_Query|null $query If given, fetch the records
   *   that have been selected using the given query. Otherwise retrieve
   *   the result of the last query.
   * @return array|null The raw data from the record model. To get typecasted
   *  data with translated key names, use ::data()
   */
  public function loadNext( $query= null )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * check argument
     */
    if ( $query === null )
    {
      $query = $this->lastQuery;
    }
    else if ( ! $query instanceof qcl_data_db_Query )
    {
      $this->raiseError("Argument must be an instance of qcl_data_db_Query");
    }

    /*
     * fetch the next record, set the corrensponding properties if successful
     * and return the result
     */
    $result = $this->getQueryBehavior()->fetch( $query );
    if( $result )
    {
      $propBehavior = $this->getPropertyBehavior();
      foreach( $result as $property => $value )
      {
        $this->set( $property, $propBehavior->typecast( $property, $value ), false );
      }
    }

    /*
     * mark that a record is loaded
     */
    $this->_loaded = true;

    /*
     * return the record
     */
    return $result;
  }

  /**
   * Returns the result of the last query without modifying the
   * active record.
   * @return array Array of arrays
   */
  public function fetchAll()
  {
    try
    {
      $id = $this->id();
    }
    catch ( qcl_data_model_NoRecordLoadedException $e )
    {
      // ignore error, this should also work without a loaded record
      $id = null;
    }

    $result = array();

    /*
     * fetch the complete data
     */
    while( $this->loadNext() )
    {
      $result[] = $this->data();
    }

    /*
     * reload model
     */
    if ( $id )
    {
      $this->load( $id );
    }

    return $result;
  }


  //-------------------------------------------------------------
  // Data creation and manipulation
  //-------------------------------------------------------------

  /**
   * Creates a new model record, optionally, with preconfigured data.
   * @param array|null Optional map of properties to set
   * @return int Id of the record
   */
  public function create( $data=null )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * mark that record is loaded
     */
    $this->_loaded = true;

    /*
     * setting initial values
     */
    $this->getPropertyBehavior()->initPropertyValues();
    $this->set("created", new qcl_data_db_Timestamp("now") );
    if( is_array( $data ) )
    {
      $this->set( $data );
    }

    /*
     * inserting values
     */
    $id = $this->getQueryBehavior()->insertRow( $this->data() );

    /*
     * reload values, in case the database has changed something
     */
    $this->load( $id );

    /*
     * log message
     */
    $this->log( sprintf( "Created new model record '%s'.", $this ), QCL_LOG_MODEL );

    /*
     * increment transaciton id since data has changed
     */
    $this->incrementTransactionId();

    /*
     * return the id
     */
    return $id;
  }

  /**
   * Save the model properties to the database.
   * @return boolean
   */
  public function save()
  {
    $this->checkLoaded();

    $success = $this->getQueryBehavior()->update( $this->data() );

    /*
     * increment transaciton id since data has changed
     */
    $this->incrementTransactionId();

    return $success;
  }

  /**
   * Deletes the model instance data from the database. Does not delete the
   * active record object. Also deletes references to this model that exist
   * through the previous linking of models.
   *
   * @return boolean
   */
  public function delete()
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * check if we have a loaded record
     */
    $id = $this->getId();
    if ( ! $id )
    {
      $this->raiseError("Cannot delete: no model record loaded.");
    }

    $this->log( sprintf(
      "Unlinking all linked records for [%s #%s] ...",
      $this->className(), $id
    ), QCL_LOG_MODEL );

    /*
     * unlink all model records and delete dependend ones
     */
    $relationBehavior = $this->getRelationBehavior();
    foreach( $relationBehavior->relations() as $relation )
    {
      $targetModel = $relationBehavior->getTargetModel( $relation );
      $isDependent = $relationBehavior->isDependentModel( $targetModel );

      $this->log( sprintf(
        "    ... for relation '%s':%s target model '%s'",
        $relation,
        $isDependent ? " dependent":"",
        $targetModel->className()
      ), QCL_LOG_MODEL );

      $relationBehavior->unlinkAll( $targetModel, false, $isDependent );
    }

    /*
     * delete the model data
     */
    $this->log( sprintf( "Deleting record data for %s ...", $this ), QCL_LOG_MODEL );
    $succes = $this->getQueryBehavior()->deleteRow( $id );

    /*
     * increment transaciton id since data has changed
     */
    $this->incrementTransactionId();

    return $succes;
  }

  /**
   * Deletes the model records that match the 'where' data. This does not
   * delete linked model data. Load() each record to be deleted and then
   * execute delete() in order to delete relational dat.
   *
   * @param array $where
   * @return int number of affected rows
   */
  public function deleteWhere( $where )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * execute query
     */
    $rowCount =  $this->getQueryBehavior()->deleteWhere( $where );

    /*
     * increment transaciton id since data has changed
     */
    $this->incrementTransactionId();

    return $rowCount;
  }

  /**
   * Deletes all records from the database. Also deletes references
   * to other model instances.
   *
   * @return number of affected rows
   */
  public function deleteAll()
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    $this->log( "Unlinking all records for model $this", QCL_LOG_MODEL );

    /*
     * initialize all dependent models so that he dependencies are set up
     * before deleting them
     */
    $relationBehavior = $this->getRelationBehavior();
    foreach ( $relationBehavior->relations() as $relation )
    {
      $relationBehavior->getTargetModel( $relation )->init();
    }

    /*
     * now unlink them
     */
    foreach ( $relationBehavior->relations() as $relation )
    {
      $targetModel = $relationBehavior->getTargetModel( $relation );
      $isDependent = $relationBehavior->isDependentModel( $targetModel );

      /*
       * unlink all model records and delete dependend ones
       */
      $this->log( sprintf(
        "    ... for relation '%s':%s target model %s",
        $relation,
        $isDependent ? " dependent":"",
        $targetModel
      ), QCL_LOG_MODEL );
      $relationBehavior->unlinkAll( $targetModel, true,  $isDependent );
    }

    /*
     * delete model data
     */
    $this->log( sprintf(
      "Deleting all records for model %s", $this
    ), QCL_LOG_MODEL );

    $this->getQueryBehavior()->deleteAll();
    qcl_data_model_db_ActiveRecord::resetBehaviors();

    /*
     * increment transaciton id since data has changed
     */
    $this->incrementTransactionId();
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
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * execute query
     */
    $rowCount =  $this->getQueryBehavior()->updateWhere( $data, $where );

    /*
     * increment transaciton id since data has changed
     */
    $this->incrementTransactionId();

    return $rowCount;
  }

  //-----------------------------------------------------------------------
  // Transaction id
  //-----------------------------------------------------------------------

  /**
   * Returns the model that keeps transactions ids for other models
   * @return qcl_data_model_db_TransactionModel
   * FIXME: Create interface, move into db_models, don't implement here
   */
  protected function getTransactionModel()
  {
    qcl_import("qcl_data_model_db_TransactionModel");
    return qcl_data_model_db_TransactionModel::getInstance();
  }

  /**
   * Use transaction model to get transaction id of this model
   * @return int The current transaction id
   */
  protected function getTransactionId()
  {
    return $this->getTransactionModel()->getTransactionIdFor( $this );
  }

  /**
   * Use transaction model to increment transaction id of this model
   * @return int The current transaction id
   */
  protected function incrementTransactionId()
  {
    return $this->getTransactionModel()->incrementTransactionIdFor( $this );
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
    if ( $this->lastQuery )
    {
      return $this->lastQuery->getRowCount();
    }
    return $this->getQueryBehavior()->rowCount();
  }

  /**
   * Returns true if the last query didn't find any records
   * @return boolean
   */
  public function foundNothing()
  {
    return $this->rowCount() == 0;
  }

  /**
   * Whether the last query was successful
   * @return boolean
   */
  public function foundSomething()
  {
    return $this->rowCount() > 0;
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
   * @param array|qcl_data_db_Query $query Query or where condition
   * @return int
   */
  public function countWhere( $query )
  {
    $this->init();
    return $this->getQueryBehavior()->countWhere( $query );
  }

  //-----------------------------------------------------------------------
  // Model relations (associations )
  //-----------------------------------------------------------------------

  /**
   * Returns the key with which the ids of the model data is
   * referenced in other (foreign) relational tables
   *
   * @return string
   */
  public function foreignKey()
  {
    return $this->foreignKey;
  }

  /**
   * Returns the relation behavior
   * @return qcl_data_model_db_RelationBehavior
   */
  function getRelationBehavior()
  {
    $this->notImplemented(__CLASS__,__METHOD__);
  }

  /**
   * Add the definition of relations of this model for use in
   * queries.
   *
   * @param array  $relations
   * @param string $definingClass The class that defines the
   *   relations. Usually, the caller passes the __CLASS__ constant.
   *   This is needed to correctly determine the model class names when
   *   child classes are involved.
   * @return void
   */
  public function addRelations( $relations, $definingClass )
  {
    return $this->getRelationBehavior()->addRelations( $relations, $definingClass );
  }

  /**
   * Returns true if the managed model has a relation with the given
   * model.
   *
   * @param qcl_data_model_db_ActiveRecord $model
   * @return bool
   */
  public function hasRelationWithModel( $model )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * call behavior method do do the actual work
     */
    try
    {
      return $this->getRelationBehavior()->hasRelationWithModel( $model );
    }
    catch( qcl_data_model_Exception $e )
    {
      return false;
    }
  }

  /**
   * Creates a link between two associated models.
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return bool True if new link was created, false if link
   *   already existed.
   */
  public function linkModel( $targetModel )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * call behavior method do do the actual work
     */
    return $this->getRelationBehavior()->linkModel( $targetModel );
  }

  /**
   * Checks if this model and the given target model are linked.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool
   */
  public function islinkedModel( $targetModel )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * call behavior method do do the actual work
     */
    return $this->getRelationBehavior()->isLinkedModel( $targetModel );
  }

  /**
   * Returns the ids of all model records linked to the target model.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return array
   */
  public function linkedModelIds( $targetModel )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * call behavior method do do the actual work
     */
    return $this->getRelationBehavior()->linkedModelIds( $targetModel );
  }

  /**
   * Unlinks the given target model from this model.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool
   */
  public function unlinkModel( $targetModel )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * call behavior method do do the actual work
     */
    return $this->getRelationBehavior()->unlinkModel( $targetModel );
  }

  //-----------------------------------------------------------------------
  // Import / export
  //-----------------------------------------------------------------------

  /**
   * Imports data, using an importer class that needs to subclass
   * qcl_data_model_AbstractImporter
   *
   * @param qcl_data_model_AbstractImporter $importer
   * @return void
   */
  public function import( qcl_data_model_AbstractImporter $importer )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * call importer method do do the actual work
     */
    $importer->import( $this );
  }

  /**
   * Exports data, using an exporter class that needs to subclass
   * qcl_data_model_AbstractExporter. Returns data in the format
   * that the exporter provides
   *
   * @param qcl_data_model_AbstractExporter $exporter
   * @return mixed The exported data
   */
  public function export( qcl_data_model_AbstractExporter $exporter )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * call importer method do do the actual work
     */
    return $exporter->export( $this );
  }

  //-------------------------------------------------------------
  // Cleanup
  //-------------------------------------------------------------

  /**
   * Resets the internal cache used by the behaviors to avoid unneccessary
   * database lookups. Call this method statically at the beginning of your
   * code as long as your model delfinitions change.
   *
   * @return void
   */
  public static function resetBehaviors()
  {
    $class = get_called_class();
    $_this = new $class;
    $_this->getPropertyBehavior()->reset();
    $_this->getQueryBehavior()->reset();
    $_this->getRelationBehavior()->reset();
  }

  /**
   * Destroys all data connected to the model, such as tables etc.
   */
  public function destroy()
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * destroy all jointables models, too. This can leave the database in a
     * broken state, make sure to destroy the model joined by the join table,
     * too.
     */
    $relationBehavior = $this->getRelationBehavior();
    foreach( $relationBehavior->relations() as $relation )
    {
      if ( $relationBehavior->getRelationType( $relation ) == QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY )
      {
        $joinTableName = $relationBehavior->getJoinTableName( $relation );
        $joinTable = new qcl_data_db_Table( $joinTableName, $this->getQueryBehavior()->getAdapter() );
        if ( $joinTable->exists() )
        {
          $joinModel = $relationBehavior->getJoinModel( $relation );
          $joinModel->destroy();
        }
      }
    }
    $this->getQueryBehavior()->destroy();
    qcl_data_model_db_ActiveRecord::resetBehaviors();
  }

  //-------------------------------------------------------------
  // Conversions
  //-------------------------------------------------------------

  /**
   * Return a string representation of the model
   */
  public function __toString()
  {
    $id = $this->getPropertyBehavior()->get("id");
    $ds = $this->datasourceModel();
    return sprintf( "[%s%s/%s]", ( $ds ? $ds->namedId() . "/" : "" ) , $this->className(),  ( $id ? $id : "--" ) );
  }
}
?>