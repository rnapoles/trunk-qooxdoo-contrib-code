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
 *
 */

/**
 * Persistent cache object
 */
class qcl_data_model_db_RelationsCache
  extends qcl_core_PersistentObject
{

  public $relations = array();
  public function reset()
  {
    $this->relations = array();
  }
}

/**
 * Class responsible for managing relationships between models
 *
 */
class qcl_data_model_db_RelationBehavior
{

  /**
   * The model affected by this behavior
   * @var qcl_data_model_db_ActiveRecord
   */
  protected $model;

  /**
   * The relations (associations) with other objects
   * @var array
   */
  private $relations = array();

  /**
   * A lookup index to quickly find the relation name for a
   * given model class
   * @var array
   */
  private $relationModels = array();

  /**
   * The types of relationships that are supported between models/tables
   * @var array
   */
  static protected $relation_types = array( "1:n","n:1","n:n" );

  /**
   * A static persistent cache object to avoid repetitive introspection
   * queries
   * @var qcl_data_model_db_RelationsCache
   */
  static private $cache;

  //-------------------------------------------------------------
  // Constructors
  //-------------------------------------------------------------

  /**
   * Constructor
   * @param qcl_data_model_db_ActiveRecord $model
   */
  function __construct( $model )
  {
    $this->model = $model;
  }

  //-------------------------------------------------------------
  // Getters and setters
  //-------------------------------------------------------------

  /**
   * Getter for model affected by this behavior
   * @return qcl_data_model_db_ActiveRecord
   */
  public function getModel()
  {
    return $this->model;
  }

  /**
   * Getter for persistent cache object
   * @return qcl_data_model_db_RelationsCache
   */
  public function cache()
  {
    if ( ! self::$cache )
    {
      self::$cache = new qcl_data_model_db_RelationsCache();
    }
    return self::$cache;
  }


  //-------------------------------------------------------------
  // API
  //-------------------------------------------------------------

  /**
   * Add the definition of relations of this model for use in
   * queries.
   * @see qcl_data_model_IQueryBehavior::addRelations()
   * @param array $relations
   * @return unknown_type
   */
  public function addRelations( $relations )
  {
    foreach( $relations as $name => $rel )
    {
      /*
       * add to relations map
       */
      $this->relations[$name] = array(
        'type'    => $this->checkRelationType( $rel['type'], $name ),
        'target'  => $this->checkRelationTarget( $rel['target'], $name )
      );

      /*
       * add a lookup index for class names
       */
      $class = $this->getTargetModelClass( $name );
      $this->relationModels[ $class ] = $name;

    }
  }

  /**
   * Returns the names of all registered relations
   * @return array
   */
  public function relations()
  {
    return array_keys( $this->relations );
  }

  /**
   * Checks if relation of that name exists
   * @param string $relation
   * @return bool
   */
  public function relationExists( $relation )
  {
    if ( ! is_string( $relation ) or ! trim( $relation ) )
    {
      $this->getModel()->raiseError("Invalid relation name");
    }
    return isset( $this->relations[ $relation ] );
  }

  /**
   * Checks if relation exists and throws error if not.
   * @param $relation
   * @return unknown_type
   */
  public function checkRelation( $relation )
  {
    if ( ! $this->relationExists(  $relation ) )
    {
      $this->getModel()->raiseError( "Relation '$relation' does not exist." );
    }
  }

  /**
   * Returns the typ of the relation
   * @param string $relation
   * @return string
   */
  public function getRelationType( $relation )
  {
    $this->checkRelation( $relation );
    return $this->relations[$relation]['type'];
  }

  /**
   * Setup the relation, creating relational join tables if needed.
   * @return bool True if relations had to be set up, false if they
   * were already set up.
   */
  public function setupRelation( $relation )
  {
    $this->checkRelation( $relation );

    /*
     * setup if that hasn't happened yet
     */
    $model = $this->getModel();
    $class = $model->className();
    $cache = $this->cache();
    if ( ! isset( $cache->relations[ $relation ] ) )
    {
      $cache->relations[ $relation ] = array();
    }

    if( ! isset( $cache->relations[ $relation ][ $class ] ) )
    {
      /*
       * call setup method
       */
      $method = "setupRelation" . $this->convertLinkType( $this->getRelationType( $relation ) );

      $model->log( sprintf(
        "Setting up relation '%s' for class '%s' using '%s'...",
        $relation, $class, $method
      ), QCL_LOG_MODEL_RELATIONS );

      $this->$method( $relation );

      /*
       * set flag
       */
      $cache->relations[ $relation ][ $class ] = true;
      return true;
    }
    $this->getModel()->log( sprintf(
      "Relation '%s' is already set up for class '%s'.",
      $relation, $class
    ), QCL_LOG_MODEL_RELATIONS );
    return false;
  }

  /**
   * Check the relation type. Throws an error if incorrect type is passed.
   * @param string $type The relation type
   * @param string $name The name of the relation (needed for error message)
   * @return string The type
   */
  protected function checkRelationType( $type, $name )
  {
    if ( ! in_array( $type, self::$relation_types ) )
    {
      throw new qcl_data_model_Exception("Unknown type '$type' in relation '$name'.");
    }
    return $type;
  }

  /**
   * Check the relation target. Throws an error if incorrect target is passed.
   * @param array $target The relation target definition
   * @param string $name The name of the relation (needed for error message)
   * @return array The target definition
   */
  protected function checkRelationTarget( $target, $name )
  {
    if ( ! isset( $target['class'] ) or ! $target['class'] )
    {
      throw new qcl_data_model_Exception("Invalid target definition in relation '$name'.");
    }

    $target = array(
      'class'       => $this->checkRelationTargetModelClass( $target['class'], $name ),
      'foreignKey'  => $target['foreignKey']
    );

    return $target;
  }

  /**
   * Checks that the class of the target model exists.
   * @param $model
   * @param $name
   * @return unknown_type
   */
  protected function checkRelationTargetModelClass( $class, $name )
  {
    if ( ! class_exists( $class ) )
    {
      throw new qcl_data_model_Exception( sprintf(
        "Invalid target model class '%s' in relation '%s'.",
        $class, $name
      ) );
    }
    return $class;
  }

  /**
   * Adds the foreign key as a property of this model
   *
   * @param string $key
   * @return string key
   */
  public function setupForeignKey( $key, $relation )
  {
    $model   = $this->getModel();
    $propBeh = $model->getPropertyBehavior();
    if ( $propBeh->has( $key ) )
    {
      if (  $propBeh->type( $key ) != "integer" )
      {
        throw new qcl_data_model_Exception(sprintf(
          "Model '%s' has no valid integer property '%s' needed as key for relation '%s'.",
          get_class($model), $key, $relation
        ) );
      }
    }
    else
    {
      qcl_log_Logger::getInstance()->log( sprintf(
        "Adding foreign key property '%s' to model '%s' for relation '%s",
        $key, $this->getModel()->className(), $relation
      ), QCL_LOG_MODEL_RELATIONS );

      $propBeh->add( array(
        $key => array(
          "check"   => "integer",
          "sqltype" => "int(11)" // FIXME
        )
      ) );
    }
    return $key;
  }

  /**
   * Retrieves the foreign key name from the model. If the model
   * does not specify the foreign id, create it from the class
   * name plus "Id".
   * @return string
   */
  public function getForeignKeyFromModel()
  {
    $foreignKey = $this->getModel()->foreignKey();
    if ( ! $foreignKey )
    {
      $foreignKey = $this->getModel()->className() . "Id";
    }
    return $foreignKey;
  }

  /**
   * Returns the model's foreign key as used in a relationship
   * @param $relation
   * @return unknown_type
   */
  public function getForeignKey( $relation )
  {
    $this->checkRelation( $relation );

    $foreignKey = null;

    /*
     * first, check relation data
     */
    if ( isset( $this->relations[$relation]['target']['foreignKey'] ) )
    {
      $foreignKey = $this->relations[$relation]['target']['foreignKey'];
    }

    /*
     * otherwise, get it from model
     */
    if( ! $foreignKey )
    {
      $foreignKey = $this->getForeignKeyFromModel();
      $this->relations[$relation]['target']['foreignKey'] = $foreignKey;
    }
    return $foreignKey;
  }

  /**
   * Returns the name of the class that is bound by the relation.
   * @param string $relation
   * @return string name of class
   */
  protected function getTargetModelClass( $relation )
  {
    $this->checkRelation( $relation );
    $class = $this->relations[$relation]['target']['class'];
    if ( ! $class )
    {
      throw new qcl_data_model_Exception( sprintf(
        "Cannot determine class name for target model in relation '%s'.",
        $relation
      ) );
    }
    return $class;
  }

  /**
   * Returns an instance of the target model class
   * @param string $relation Relation name
   * @return qcl_data_model_db_ActiveRecord
   */
  public function getTargetModel( $relation )
  {
    $this->checkRelation( $relation );

    /*
     * keep static cache of class instances, otherwise this
     * will cause an inifinite recursion, since associated
     * models instantiate each other.
     */
    static $instances = array();
    $class = $this->getTargetModelClass( $relation );
    if ( ! $instances[$class] )
    {
      $model = new $class();
      $instances[$class] = $model;
    }
    return $instances[$class];
  }

  /**
   * Returns the target model's foreign key for the
   * given relation name.
   * @param $relation Relation name
   * @return string
   */
  protected function getTargetForeignKey( $relation )
  {
    $targetModel = $this->getTargetModel( $relation );
    $foreignKey  = $targetModel->getRelationBehavior()->getForeignKey( $relation );
    if ( ! $foreignKey )
    {
      throw new qcl_data_model_Exception( sprintf(
        "Cannot determine foreign key for target model '%s' and relation '%s'.",
        get_class($targetModel), $relation
      ) );
    }
    return $foreignKey;
  }


  /**
   * Implementation for setting up a one-to-many relationship.
   * One-to-many (1:n) means that the target model's data record
   * contains a column with this model's foreign id, i.e., an infinite
   * number of target models are associated with this model. On the
   * other hand, each record of this model has exactly one association
   * to a target model record.
   *
   * @param array $relation Name of the relation
   * @return void
   */
  protected function setupRelationOneToMany( $relation )
  {
    $foreignKey  = $this->getForeignKey( $relation );
    $targetModel = $this->getTargetModel( $relation );
    $targetModel->getRelationBehavior()->setupForeignKey( $foreignKey, $relation );
  }

  /**
   * Implementation for setting up a many-to-one relationship.
   * Many-to-one (n:1) means that the models's data record contains a
   * column with the target model's foreign id, i.e., an infinite
   * number of this model's data records are associated with one target
   * model record. In reverse, each target model record has exactly one
   * association to one record of this model.
   *
   * @param array $relation Name of the relation
   * @return void
   */
  protected function setupRelationManyToOne( $relation )
  {
    $targetForeignKey = $this->getTargetForeignKey( $relation );
    $this->setupForeignKey( $targetForeignKey, $relation );
  }

  /**
   * Implementation for setting up a many-to-many relationship
   * @param array $relation Name of the relation
   * @return void
   */
  protected function setupRelationManyToMany( $relation )
  {
    //$cache = $this->cache();

    $model            = $this->getModel();
    $foreignKey       = $this->getForeignKey( $relation );
    $targetForeignKey = $this->getTargetForeignKey( $relation );
    $jointable        = $this->getJointable( $relation );

    if ( ! $jointable->exists() )
    {
      $model->log( sprintf(
        "Creating jointable '%s' ...", $jointable->getName()
      ), QCL_LOG_MODEL_RELATIONS );

      $jointable->create();
    }

    /*
     * drop the index if it exists
     */
    $indexName = "unique_" . $foreignKey . "_" . $targetForeignKey;
    if ( $jointable->indexExists( $indexName ) )
    {
      $jointable->dropIndex( $indexName );
    }

    /*
     * create a column with the foreign id of this model
     */
    if ( ! $jointable->columnExists( $foreignKey ) )
    {
      $definition = "INT(11) NOT NULL"; //FIXME
      $model->log( sprintf(
        "Creating local foreign key column '%s' ...", $foreignKey
      ), QCL_LOG_MODEL_RELATIONS );

      $jointable->addColumn( $foreignKey, $definition );
    }

    /*
     * create a column with the foreign id of the target model
     */
    if ( ! $jointable->columnExists( $targetForeignKey ) )
    {
      $definition = "INT(11) NOT NULL"; //FIXME

      $model->log( sprintf(
        "Creating target foreign key column '%s' ...", $targetForeignKey
      ), QCL_LOG_MODEL_RELATIONS );

     $jointable->addColumn( $targetForeignKey, $definition );
    }

    /*
     * recreate index
     */
    $jointable->addIndex( "unique", $indexName, array( $foreignKey, $targetForeignKey ) );

  }

  /**
   * Returns the name of the table needed to join the tables
   * in the relation. You can specify the name of the jointable
   * in the $relations[$relationname]['jointable'] element, otherwise
   * it defaults to "join_" plus the relation name.
   *
   * @param string $relation Relation name
   * @return string
   */
  protected function getJoinTableName( $relation )
  {
    /*
     * get name of join table
     */
    if ( ! isset( $this->relations[$relation]['jointable'] )
         or ! $this->relations[$relation]['jointable']  )
    {
      $this->relations[$relation]['jointable'] = "join_" .$relation;
    }
    $tablePrefix = $this->getModel()->getQueryBehavior()->getTablePrefix();
    return $tablePrefix . $this->relations[$relation]['jointable'];
  }

  /**
   * Returns the table object that is used to join two other
   * tables in a many-to-many relationship.
   * @param string $relation Relation name
   * @return qcl_data_db_Table
   */
  protected function getJointable( $relation )
  {
    $joinTableName = $this->getJoinTableName( $relation );
    $adapter       = $this->getModel()->getQueryBehavior()->getAdapter();

    /*
     * use cached table object or create new one
     */
    static $tables = array();

    if ( ! isset( $tables[$joinTableName] ) )
    {
      $tables[$joinTableName] = new qcl_data_db_Table( $joinTableName, $adapter );
    }
    return $tables[$joinTableName];
  }

  /**
   * Returns the name of the relation with which the given model is
   * linked or null if no such link exists.
   *
   * @param qcl_data_model_db_ActiveRecord $model
   * @return string|null
   */
  public function getRelationNameForModel( $model )
  {
    if ( isset( $this->relationModels[ $model->className() ] ) )
    {
      return $this->relationModels[ $model->className() ];
    }
    return null;
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
    return ! is_null( $this->getRelationNameForModel( $model ) );
  }

  /**
   * Checks if a relation exists between the given model and the
   * managed model. Returns the name of the first relation that
   * links both models.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return string name of relation
   */
  public function checkModelRelation( $targetModel )
  {
    $model       = $this->getModel();
    $relation    = $this->getRelationNameForModel( $targetModel );
    $tgtRelation = $targetModel
      ->getRelationBehavior()
      ->getRelationNameForModel( $model );

    if ( $relation === null or $tgtRelation === null )
    {
      throw new qcl_data_model_Exception( sprintf(
        "Models '%s' and '%s' are not (properly) linked.", $model->className(), $targetModel->className()
      ) );
    }
    elseif ( $relation != $tgtRelation )
    {
      throw new qcl_data_model_Exception( sprintf(
        "Link names for models '%s' (%s) and '%s' (%s) do not match.",
        $model->className(), $relation,
        $targetModel->className(), $tgtRelation
      ) );
    }

    return $relation;
  }

  /**
   * Converts the link type ("x:x") into a string that can be
   * made part of a method name
   * @param $type
   * @return unknown_type
   */
  protected function convertLinkType( $type )
  {
    return str_replace( ":","To",
        str_replace( "1","One",
          str_replace( "n","Many", $type )
        )
      );
  }

  /**
   * Creates a link between two associated model instances. Throws an exception
   * if models are already linked.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return void
   */
  public function linkModel( $targetModel )
  {
    $relation = $this->checkModelRelation( $targetModel );
    $this->setupRelation( $relation );
    $method = "linkModel" . $this->convertLinkType( $this->getRelationType( $relation ) );

    $this->getModel()->log( sprintf(
      "Linking model instances [%s#%s] and [%s#%s], using '%s'.",
       $this->getModel()->className(), (string) $this->getModel()->id(),
       $targetModel->className(), (string) $targetModel->id(), $method
    ), QCL_LOG_MODEL_RELATIONS );


    if ( $this->$method( $relation, $targetModel ) )
    {
      return;
    }
    else
    {
      throw new qcl_data_model_Exception( sprintf(
        "The model instances [%s#%s] and [%s#%s]  are already linked.",
         $this->getModel()->className(), (string) $this->getModel()->id(),
         $targetModel->className(), (string) $targetModel->id()
      ) );
    }
  }

  /**
   * Creates a one-two-many relation between the managed model
   * and the given target model by setting the property of the
   * target model that corresponds to the managed model's foreign
   * key to the id of the managed model.
   *
   * @param string $relation Name of the relation
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool True if new link was created, false if link
   *   already existed.
   */
  protected function linkModelOneToMany( $relation, $targetModel )
  {
    $foreignKey = $this->getForeignKey( $relation );
    $id = $this->getModel()->id();
    if ( $targetModel->get( $foreignKey ) != $id )
    {
      $targetModel->set( $foreignKey, $id );
      $targetModel->save();
      return true;
    }
    return false;
  }

  /**
   * Creates a many-to-one relation between the managed model
   * and the given target model by setting the property of the
   * managed model that corresponds to the target model's foreign
   * key to the id of the target model.
   *
   * @param string $relation Name of the relation
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool True if new link was created, false if link
   *   already existed.
   */
  protected function linkModelManyToOne( $relation, $targetModel )
  {
    $targetForeignKey = $targetModel->getRelationBehavior()->getForeignKey( $relation );
    $id = $targetModel->id();
    if ( $this->getModel()->get( $targetForeignKey ) != $id )
    {
      $this->getModel()->set( $targetForeignKey, $id );
      $this->getModel()->save();
      return true;
    }
  }

  /**
   * Creates a many-to-many relation between the managed model
   * and the given target model by adding an entry in the join
   * table.
   *
   * @param string $relation Name of the relation
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool True if new link was created, false if link
   *   already existed.
   */
  protected function linkModelManyToMany( $relation, $targetModel )
  {
    $foreignKey       = $this->getForeignKey( $relation );
    $targetForeignKey = $targetModel->getRelationBehavior()->getForeignKey( $relation );
    $jointable        = $this->getJointable( $relation );

    if ( ! $this->isLinkedModelManyToMany( $relation, $targetModel ) )
    {
      $jointable->insertRow( array(
        $foreignKey        => $this->getModel()->id(),
        $targetForeignKey  => $targetModel->id()
      ) );
      return true;
    }
    return false;
  }

  /**
   * Checks if the managed modeland the given target model are linked.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool
   */
  public function islinkedModel( $targetModel )
  {
    $relation = $this->checkModelRelation( $targetModel );
    $this->setupRelation( $relation );
    $method = "isLinkedModel" .
      $this->convertLinkType( $this->getRelationType( $relation ) );
    return $this->$method( $relation, $targetModel );

  }

  /**
   * Checks if a one-to-many relation between the managed model
   * and the given target model exists.
   *
   * @param string $relation Name of the relation
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool
   */
  protected function islinkedModelOneToMany( $relation, $targetModel )
  {
    $foreignKey = $this->getForeignKey( $relation );
    $id = $this->getModel()->id();
    return $targetModel->get( $foreignKey ) == $id;
  }

  /**
   * Checks if a many-to-one relation between the managed model
   * and the given target model exists.
   *
   * @param string $relation Name of the relation
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool
   */
  protected function islinkedModelManyToOne( $relation, $targetModel )
  {
    $targetForeignKey = $targetModel->getRelationBehavior()->getForeignKey( $relation );
    $id = $targetModel->id();
    return $this->getModel()->get( $targetForeignKey ) == $id;
  }

  /**
   * Checks if a many-to-many relation between the managed model
   * and the given target model exists.
   *
   * @param string $relation Name of the relation
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool
   */
  protected function islinkedModelManyToMany( $relation, $targetModel )
  {
    $foreignKey       = $this->getForeignKey( $relation );
    $targetForeignKey = $targetModel->getRelationBehavior()->getForeignKey( $relation );
    $jointable        = $this->getJointable( $relation );
    $queryBehavior    = $this->getModel()->getQueryBehavior();

    return (bool) $jointable->countWhere(
      sprintf(
        "%s = :sourceId AND %s = :targetId",
        $queryBehavior->getAdapter()->formatColumnName( $foreignKey ),
        $queryBehavior->getAdapter()->formatColumnName( $targetForeignKey )
      ),
      array(
        ":sourceId" => $this->getModel()->id(),
        ":targetId" => $targetModel->id()
      )
    );
  }


  /**
   * Unlinks the given target model from the managed model. Throws an error
   * if models were not linked.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return void
   */
  public function unlinkModel( $targetModel )
  {
    $relation = $this->checkModelRelation( $targetModel );
    $this->setupRelation( $relation );
    $method = "unlinkModel" .
      $this->convertLinkType( $this->getRelationType( $relation ) );
    if ( $this->$method( $relation, $targetModel ) )
    {
      $this->getModel()->log( sprintf(
        "Unlinked model instances [%s#%s] and [%s#%s].",
         $this->getModel()->className(), (string) $this->getModel()->id(),
         $targetModel->className(), (string) $targetModel->id()
      ), QCL_LOG_MODEL_RELATIONS );
      return true;
    }
    else
    {
      throw new qcl_data_model_Exception( sprintf(
        "Cannot unlink: The model instances [%s#%s] and [%s#%s]  are not linked.",
         $this->getModel()->className(), (string) $this->getModel()->id(),
         $targetModel->className(), (string) $targetModel->id()
      ) );
    }
  }

  /**
   * Unlink a one-to-many relation between the managed model
   * and the given target model.
   *
   * @param string $relation Name of the relation
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool
   */
  protected function unlinkModelOneToMany( $relation, $targetModel )
  {
    $foreignKey = $this->getForeignKey( $relation );
    $id = $this->getModel()->id();
    if ( $targetModel->get( $foreignKey ) == $id )
    {
      $targetModel->set( $foreignKey, null );
      $targetModel->save();
      return true;
    }
    return false;
  }

  /**
   * Unlink a many-to-one relation between the managed model
   * and the given target model.
   *
   * @param string $relation Name of the relation
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool
   */
  protected function unlinkModelManyToOne( $relation, $targetModel )
  {
    $targetForeignKey = $targetModel->getRelationBehavior()->getForeignKey( $relation );
    $id = $targetModel->id();
    if ( $this->getModel()->get( $targetForeignKey ) == $id )
    {
      $this->getModel()->set( $targetForeignKey, null );
      return true;
    }
    return false;
  }

  /**
   * Unlink a many-to-many relation between the managed model
   * and the given target model.
   *
   * @param string $relation Name of the relation
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool
   */
  protected function unlinkModelManyToMany( $relation, $targetModel )
  {
    $foreignKey       = $this->getForeignKey( $relation );
    $targetForeignKey = $targetModel->getRelationBehavior()->getForeignKey( $relation );
    $jointable        = $this->getJointable( $relation );
    $queryBehavior    = $this->getModel()->getQueryBehavior();

    return (bool) $jointable->deleteWhere(
      sprintf(
        "%s = :sourceId AND %s = :targetId",
        $queryBehavior->getAdapter()->formatColumnName( $foreignKey ),
        $queryBehavior->getAdapter()->formatColumnName( $targetForeignKey )
      ),
      array(
        ":sourceId" => $this->getModel()->id(),
        ":targetId" => $targetModel->id()
      )
    );
  }


  /**
   * Unlinks all instances of the target model from the managed model.
   * If
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @param bool $allLinks If true, remove all links, i.e. not only
   *   of the model instance (with the present id), but all other
   *   instances as well.
   * @return int number of links removed
   */
  public function unlinkAll( $targetModel, $allLinks = false )
  {
    $relation = $this->checkModelRelation( $targetModel );
    $this->setupRelation( $relation );

    $method = "unlinkAll" . $this->convertLinkType( $this->getRelationType( $relation ) );

    qcl_log_Logger::getInstance()->log( sprintf(
      "Unlinking %s model instances [%s] and [%s] using '%s'.",
       $allLinks ? "all" : "selected",
       $this->getModel()->className(), $targetModel->className(), $method
    ), QCL_LOG_MODEL_RELATIONS );

    return $this->$method( $relation, $targetModel, $allLinks );
  }

  /**
   * Unlink all one-to-many relations between the managed model
   * and the given target model.
   *
   * @param string $relation Name of the relation
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @param bool $allLinks If true, remove all links, i.e. not only
   *   of the model instance (with the present id), but all other
   *   instances as well.
   * @return int number of links removed
   */
  protected function unlinkAllOneToMany( $relation, $targetModel, $allLinks  )
  {
    $foreignKey = $this->getForeignKey( $relation );
    if ( $allLinks )
    {
      return $targetModel->getQueryBehavior()->updateWhere(
        array( $foreignKey => null ),
        array( $foreignKey => array( "IS NOT" , null ) )
      );
    }
    else
    {
      return $targetModel->getQueryBehavior()->updateWhere(
        array( $foreignKey => null ),
        array( $foreignKey => $this->getModel()->getId() )
      );
    }
  }

  /**
   * Unlink all many-to-one relations between the managed model
   * and the given target model.
   *
   * @param string $relation Name of the relation
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @param bool $allLinks If true, remove all links, i.e. not only
   *   of the model instance (with the present id), but all other
   *   instances as well.
   * @return int number of links removed
   */
  protected function unlinkAllManyToOne( $relation, $targetModel, $allLinks )
  {
    $targetForeignKey = $targetModel->getRelationBehavior()->getForeignKey( $relation );
    $queryBehavior    = $this->getModel()->getQueryBehavior();

    if ( $allLinks )
    {
      return $queryBehavior->updateWhere(
        array( $targetForeignKey => null ),
        array( $targetForeignKey => array( "IS NOT", null ) )
      );
    }
    else
    {
      return $queryBehavior->updateWhere(
        array( $targetForeignKey => null ),
        array( $targetForeignKey => $targetModel->getId() )
      );
    }
  }

  /**
   * Unlink all many-to-many relations between the managed model
   * and the given target model.
   *
   * @param string $relation Name of the relation
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @param bool $allLinks If true, remove all links, i.e. not only
   *   of the model instance (with the present id), but all other
   *   instances as well.
   * @return int number of links removed
   */
  protected function unlinkAllManyToMany( $relation, $targetModel, $allLinks )
  {
    $foreignKey       = $this->getForeignKey( $relation );
    $targetForeignKey = $targetModel->getRelationBehavior()->getForeignKey( $relation );
    $jointable        = $this->getJointable( $relation );
    $queryBehavior    = $this->getModel()->getQueryBehavior();

    if ( $allLinks )
    {
      return $jointable->truncate();
    }
    else
    {
      return $jointable->deleteWhere(
        sprintf(
          "%s = :sourceId",
          $queryBehavior->getAdapter()->formatColumnName( $foreignKey )
        ),
        array(
          ":sourceId" => $this->getModel()->id()
        )
      );
    }
  }

  /**
   * Return the ids of the model that are linked to the target model,
   * depending on the relation type many-to-one and many-to-many relations
   * return the ids that are linked to the target model record.
   * one-to-many relations make no sense in this context.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return array
   */
  public function linkedModelIds( $targetModel )
  {
    $relation = $this->checkModelRelation( $targetModel );
    $this->setupRelation( $relation );
    $method = "linkedModelIds" . $this->convertLinkType( $this->getRelationType( $relation ) );
    return $this->$method( $relation, $targetModel );
  }

  /**
   * No implementation for linkedModelIds() for 1:n relations, simply
   * raises an error
   * @return void
   */
  protected function linkedModelIdsOneToMany()
  {
    $this->getModel()->raiseError("No linked ids can be meaningfully determined in a one-to-many relationship.");
  }

  /**
   * Implementation for linkedModelIds() for n:1 relations
   * @param string $relation
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return array
   */
  protected function linkedModelIdsManyToOne( $relation, $targetModel )
  {
    $targetForeignKey = $targetModel
      ->getRelationBehavior()
      ->getForeignKey( $relation );
    $targetId = $targetModel->id();
    $ids = $this->getModel()->getQueryBehavior()->fetchValues( "id", array(
      $targetForeignKey => $targetId
    ));
    return $ids;
  }

  /**
   * Implementation for linkedModelIds() for n:n relations
   * @param string $relation
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return array
   */
  protected function linkedModelIdsManyToMany( $relation, $targetModel )
  {
    $jointable  = $this->getJointable( $relation );
    $adapter    = $jointable->getAdapter();
    $foreignKey = $adapter->formatColumnName( $this->getForeignKey( $relation ) );

    return $adapter->getReturnValues(
      "SELECT id WHERE $foreignKey = :id ",
      array(
        ":id" => $this->getModel()->id()
      )
    );
  }

  /**
   * Resets  the internal cache
   * @return void
   */
  public function reset()
  {
    $this->cache()->reset();
  }
}
?>