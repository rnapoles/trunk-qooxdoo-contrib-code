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
   * @var qcl_data_datasource_type_db_Model
   */
  private $datasourceModel;


  /**
   * The last query executed
   * @var qcl_data_db_Query
   */
  private $lastQuery;

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
   * Generic setter for model properties.
   * @see qcl_core_Object#set()
   * @return qcl_data_model_db_ActiveRecord
   */
  public function set( $first, $second= null )
  {
    parent::set( $first, $second );
    return $this;
  }

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
    $this->getQueryBehavior()->selectWhere( array( "id" => $id ) );
    $result = $this->getQueryBehavior()->fetch();
    if ( $result )
    {
      $this->set( $result );
      return $this;
    }
    throw new qcl_data_model_RecordNotFoundException( sprintf(
      "Model record [%s #%s] does not exist",
      $this->className(), $id
    ) );
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
    $rowCount = $this->getQueryBehavior()->selectWhere( $query );
    if ( $rowCount )
    {
      $this->set( $this->getQueryBehavior()->fetch() );
      return $rowCount;
    }
    else
    {
      throw new qcl_data_model_RecordNotFoundException( sprintf(
        "No model instance [%s] could be found for the given query",
        $this->className()
      ) );
    }
    return $this;
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
    $this->lastQuery =  $this->getQueryBehavior()->selectWhere( $query );
    return $this->lastQuery;
  }

  /**
   * Find all model records for iteration
   * @return qcl_data_db_Query The query object to use for iteration
   */
  public function findAll()
  {
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
  public function findLinkedModels( $targetModel )
  {
    $ids = $this->getRelationBehavior()->linkedModelIds( $targetModel );
    $this->lastQuery = $this->getQueryBehavior()->selectIds( $ids );
    return $this->lastQuery;
  }

  /**
   * If the last query has found more then one record, get the text one.
   * If the end of the records has been reached, return null.
   * @param qcl_data_db_Query|null $query If given, fetch the records
   *   that have been selected using the given query. Otherwise retrieve
   *   the result of the last query.
   * @return array|null
   */
  public function nextRecord( $query= null )
  {
    if ( $query === null )
    {
      $query = $this->lastQuery;
    }
    $record = $this->getQueryBehavior()->fetch( $query );
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
   * Creates a new model record, optionally, with preconfigured data.
   * @param array|null Optional map of properties to set
   * @return int Id of the record
   */
  public function create( $data=null )
  {
    /*
     * setup relations if not already set up
     */
    $this->getRelationBehavior()->init();

    /*
     * setting initial values
     */
    $this->getPropertyBehavior()->init();
    $this->set("created", new qcl_data_db_Timestamp("now") );
    if( is_array( $data ) )
    {
      $this->set( $data );
    }

    /*
     * inserting values
     */
    $id   = $this->getQueryBehavior()->insertRow( $this->data() );

    /*
     * reload values, in case the database has changed something
     */
    $this->load( $id );

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
    if ( ! $this->id() )
    {
      $this->raiseError("Model does not have an id yet. Did you 'create()' it?");
    }
    return $this->getQueryBehavior()->update( $this->data() );
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
    $this->log( sprintf(
      "Deleting record data for [%s #%s] ...",
      $this->className(), $id
    ), QCL_LOG_MODEL );

    return $this->getQueryBehavior()->deleteRow( $id );
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
    return $this->getQueryBehavior()->deleteWhere( $where );
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
     * delete linked data
     */
    $this->log( sprintf(
      "Unlinking all linked records for model '%s' ...", $this->className()
    ), QCL_LOG_MODEL );

    $relationBehavior = $this->getRelationBehavior();

    foreach ( $relationBehavior->relations() as $relation )
    {
      $targetModel = $relationBehavior->getTargetModel( $relation );
      $isDependent = $relationBehavior->isDependentModel( $targetModel );

      /*
       * unlink all model records and delete dependend ones
       */
      $this->log( sprintf(
        "    ... for relation '%s':%s target model '%s'",
        $relation,
        $isDependent ? " dependent":"",
        $targetModel->className()
      ), QCL_LOG_MODEL );
      $relationBehavior->unlinkAll( $targetModel, true,  $isDependent );
    }

    /*
     * delete model data
     */
    $this->log( sprintf(
      "Deleting all records for class '%s'", $this->className()
    ), QCL_LOG_MODEL );

    return $this->getQueryBehavior()->deleteAll();
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
   * @param array $where Data for where statement,
   * @return int
   */
  public function countWhere( $where )
  {
    return $this->getQueryBehavior()->countWhere( $where );
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
   * @param string $parentClass The class that defines the
   *   relations. Usually, the caller passes the __CLASS__ constant.
   *   This is needed to correctly determine the model class names when
   *   child classes are involved.
   * @return void
   */
  public function addRelations( $relations, $parentClass )
  {
    return $this->getRelationBehavior()->addRelations( $relations, $parentClass, $this->className() );
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
    return $this->getRelationBehavior()->hasRelationWithModel( $model );
  }

  /**
   * Creates a link between two associated models.
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return bool True if new link was created, false if link
   *   already existed.
   */
  public function linkModel( $targetModel )
  {
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
    return $this->getRelationBehavior()->isLinkedModel( $targetModel );
  }

  /**
   * Unlinks the given target model from this model.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool
   */
  public function unlinkModel( $targetModel )
  {
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
    return $exporter->export( $this );
  }

  //-------------------------------------------------------------
  // Cleanup
  //-------------------------------------------------------------

  /**
   * Resets the internal cache used by the behaviors to avoid unneccessary
   * database lookups. Call this method from the constructor of your models
   * before adding properties and relations during your development but remove
   * the call when your properties and relations have stabilized, this will
   * speed up things considerably.
   *
   * @return void
   */
  public function resetBehaviors()
  {
    $this->getPropertyBehavior()->reset();
    $this->getQueryBehavior()->reset();
    $this->getRelationBehavior()->reset();
  }

  /**
   * Destroys all data connected to the model, such as tables etc.
   */
  public function destroy()
  {
    $relationBehavior = $this->getRelationBehavior();
    foreach( $relationBehavior->relations() as $relation )
    {
      if ( $relationBehavior->getRelationType( $relation ) == QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY )
      {
        $joinModel = $relationBehavior->getJoinModel( $relation );
        $joinModel->destroy();
      }
    }
    $this->getQueryBehavior()->destroy();
  }

  /**
   * Return a string representation of the model
   */
  public function __toString()
  {
    $id = $this->getPropertyBehavior()->get("id");
    return sprintf( "[%s #%s]", $this->className(), $id ? $id : "--" );
  }
}
?>