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
   * The default prefix used for the join table
   * @var string
   */
  protected $defaultJoinTablePrefix = "join_";

  /**
   * Whether the relations have been initialized
   * @var bool
   */
  private $isInitialized = false;

  /**
   * The types of relationships that are supported between models/tables
   * @var array
   */
  static protected $relation_types = array( "1:n","n:1","n:n" );

  /**
   * A static persistent cache object to avoid repetitive introspection
   * queries
   * @var qcl_data_model_db_RelationCache
   */
  static private $cache;


  /**
   * A map of key value pairs that is looked up each time a class name
   * is used during the setup of the model. This allows child classes to
   * use the relations defined in parent classes without having to redefine
   * the relations.
   *
   * @var array
   */
  static private $replace_class = array();


  //-------------------------------------------------------------
  // Initialization
  //-------------------------------------------------------------

  /**
   * Constructor
   * @param qcl_data_model_db_ActiveRecord $model
   */
  function __construct( $model )
  {
    $this->model = $model;
  }


  /**
   * Initialization. Sets up relations.
   * @return void
   */
  public function init()
  {
    if ( ! $this->isInitialized )
    {
      $this->getModel()->log( sprintf(
        "* Initializing relations for '%s' using '%s'",
        $this->getModel()->className(), get_class( $this )
      ), QCL_LOG_MODEL_RELATIONS );
      foreach( $this->relations() as $relation )
      {
        $this->setupRelation( $relation );
      }
      $this->isInitialized = true;
    }
//    else
//    {
//      $this->getModel()->log( sprintf(
//        "- Relations for '%s' are already initialized", $this->getModel()->className()
//      ), QCL_LOG_MODEL_RELATIONS );
//    }
  }

  //-------------------------------------------------------------
  // Logging
  //-------------------------------------------------------------

  /**
   * Checks if the log filter for this model is enabled
   * @return unknown_type
   */
  protected function hasLog()
  {
    return qcl_log_Logger::getInstance()->isFilterEnabled( QCL_LOG_MODEL_RELATIONS );
  }

  /**
   * Logs relation-specific messages
   * @param $msg
   * @return void
   */
  protected function log( $msg )
  {
    qcl_log_Logger::getInstance()->log( $msg, QCL_LOG_MODEL_RELATIONS );
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
   * @return qcl_data_model_db_RelationCache
   */
  public function cache()
  {
    if ( ! self::$cache )
    {
      qcl_import( "qcl_data_model_db_RelationCache" );
      self::$cache = new qcl_data_model_db_RelationCache();
    }
    return self::$cache;
  }

  /**
   * Return the raw relations definition array. Using this map is unsupported, since
   * its structure might change any time. Use it only for debugging and otherwise use
   * the API methods to manipulate relations.
   * @return array
   */
  public function _relationsMap()
  {
    $this->getModel()->warn(sprintf("Use %s() only for debugging", __METHOD__ ) );
    return $this->relations;
  }

  /**
   * Return the map that determines class name substitution.
   * Use it only for debugging.
   * @return array
   */
  public function _replaceMap()
  {
    $this->getModel()->warn(sprintf("Use %s() only for debugging", __METHOD__ ) );
    return self::$replace_class;
  }

  //-------------------------------------------------------------
  // Add relation data
  //-------------------------------------------------------------

  /**
   * Add the definition of relations of this model for use in
   * queries.
   *
   * @see qcl_data_model_IQueryBehavior::addRelations()
   * @param array $relations
   * @param string $definingClass The class that defines the relations.
   * @return void
   */
  public function addRelations( $relations, $definingClass )
  {
    /*
     * replace parent class name with child class
     */
    $modelClass = $this->getModel()->className();
    if ( $definingClass != $modelClass )
    {
      self::$replace_class[$definingClass] = $modelClass;
    }

    foreach( $relations as $relation => $relData )
    {

      $this->getModel()->log( sprintf(
        "Adding relation '%s' for model %s.", $relation,
        $definingClass == $modelClass ?
          "'$modelClass'" :  "'$modelClass' (defined in '$definingClass')"
      ), QCL_LOG_MODEL_RELATIONS );

      /*
       * add to relations map
       */
      $this->relations[ $relation ] = array(
        'type'        => $this->checkRelationType(   $relData, $relation ),
        'target'      => $this->checkRelationTarget( $relData, $relation ),
        'foreignKey'  => $this->checkRelationForeignKey( $relData, $relation )
      );

      /*
       * join table
       */
      if( $relData['jointable'] )
      {
        $this->checkJoinTableName( $relData['jointable'], $relation );
        $this->relations[$relation]['jointable'] = $relData['jointable'];
      }
      /*
       * add a lookup index for class names
       */
      $class = $this->getTargetModelClass( $relation );
      $this->relationModels[ $class ] = $relation;
    }
  }

  /**
   * Check the relation type. Throws an error if incorrect type is detected.
   *
   * @param array $relData The relation data
   * @param string $relation The name of the relation (needed for error message)
   * @return string The type
   */
  protected function checkRelationType( $relData, $relation )
  {
    if ( ! in_array( $relData['type'], self::$relation_types ) )
    {
      throw new qcl_data_model_Exception( sprintf(
        "Unknown type '%s' in relation '%s'.",
        $relData['type'], $relation
      ) );
    }
    return $relData['type'];
  }

  /**
   * Checks and returns the foreign key as used in the relation
   * data-
   *
   * @param array $relData The relation data
   * @param string $relation
   * @return string
   * @throws qcl_data_model_Exception
   */
  protected function checkRelationForeignKey( $relData, $relation )
  {
    $foreignKey = null;

    /*
     * first, check relation data
     */
    if ( isset( $relData['foreignKey'] ) )
    {
      $foreignKey = $relData['foreignKey'];
    }

    /*
     * otherwise, get it from model
     */
    if( ! $foreignKey )
    {
      $foreignKey = $this->getForeignKeyFromModel();
    }

    /*
     * if still no foreign key, throw exception
     */
    if ( ! $foreignKey  )
    {
      throw new qcl_data_model_Exception( sprintf(
        "Missing foreign key in in relation '%s'",$relation
      ) );
    }

    return $foreignKey;
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
   * Check the relation target. Throws an error if incorrect target is passed.
   * @param array $relData The relation data
   * @param string $relation The name of the relation (needed for error message)
   * @return array The target definition
   */
  protected function checkRelationTarget( $relData, $relation )
  {
    if ( ! isset( $relData['target'] ) or ! is_array( $relData['target'] ) )
    {
      throw new qcl_data_model_Exception( sprintf(
        "Missing or invalid target definition in class '%s', relation '%s'.",
        $this->getModel()->className(), $relation
      ) );
    }

    $target = array(
      'class'       => $this->checkRelationTargetClass( $relData, $relation ),
      'dependent'   => $this->checkRelationTargetDependency( $relData, $relation )
    );

    return $target;
  }

  /**
   * Checks that the class of the target model exists and throws an
   * exception if not.
   *
   * @param array $relData The relation data
   * @param string $relation
   * @return string
   * @throws qcl_data_model_Exception
   */
  protected function checkRelationTargetClass( $relData, $relation )
  {
    if ( ! isset( $relData['target']['class'] ) )
    {
      if ( isset( $relData['target']['modelType'] ) )
      {
        $modelType = $relData['target']['modelType'];
        $dsModel = $this->getModel()->datasourceModel();
        $class = $dsModel->getModelClassByType( $modelType );
      }
      else
      {
        throw new qcl_data_model_Exception( sprintf(
          "Missing target model class or type in class '%s', relation '%s'.",
           $this->getModel()->className(), $relation
        ) );
      }
    }
    else
    {
      $class = $relData['target']['class'];
    }

    /*
     * replace the class name by a name provided by subclasses?
     */
    if ( isset( self::$replace_class[$class] ) )
    {
      $class2 = self::$replace_class[$class];
      if ( ! class_exists( $class2 ) )
      {
        throw new qcl_data_model_Exception( sprintf(
          "Invalid target model class in class '%s', relation '%s': class '%s' (replacing '%s') does not exist.",
           $this->getModel()->className(), $relation, $class2, $class
        ) );
      }
      else
      {
        $class = $class2;
      }
    }
    else
    {
      if ( ! class_exists( $class ) )
      {
        throw new qcl_data_model_Exception( sprintf(
          "Invalid target model class in class '%s', relation '%s': class '%s' does not exist.",
           $this->getModel()->className(), $relation, $class
        ) );
      }
    }
    return $class;
  }

  /**
   * Checks that the target model object is valid
   * @param qcl_data_model_AbstractActiveRecord $targetModel
   * @return void
   */
  protected function checkTargetModel( $targetModel )
  {
    if ( ! $targetModel instanceof qcl_data_model_AbstractActiveRecord )
    {
      $this->getModel()->raiseError( sprintf(
        "Invalid target model: Expected instance of '%s', got '%s'.",
        "qcl_data_model_AbstractActiveRecord", typeof( $targetModel, true)
      ) );
    }
  }

  /**
   * Checks that the dependency of the target model is valid and throws
   * an exception if not.
   *
   * @param array $relData The relation data
   * @param string $relation
   * @return bool True
   * @throws qcl_data_model_Exception
   */
  protected function checkRelationTargetDependency( $relData, $relation )
  {
    if ( isset( $relData['target']['dependent'] )
          and $relData['target']['dependent'] === true )
    {
      if ( $relData['type'] !== QCL_RELATIONS_HAS_MANY )
      {
        throw new qcl_data_model_Exception( sprintf(
          "Target model can only be dependent for 1:n relationships. Invalid relation type '%' or dependency in relation '%s'",
          $relData['type'], $relation
        ) );
      }
      return true;
    }
    else
    {
      return false;
    }
  }

  //-------------------------------------------------------------
  // Information on relation data
  //-------------------------------------------------------------

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
    if ( ! is_string( $relation ) or ! $relation )
    {
      throw new InvalidArgumentException( sprintf(
        "Invalid relation type %s for model class '%s'",
        gettype($relation), $this->getModel()->className()
      ) );
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
    if ( ! $this->relationExists( $relation ) )
    {
      throw new LogicException( "Relation '$relation' does not exist in Model " . $this->getModel() );
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
    if ( ! isset(  $this->relations[$relation]['type'] )
          or  ! $this->relations[$relation]['type'] )
    {
      $this->getModel()->raiseError("Cannot determine relation type for relation '$relation'.");
    }
    return $this->relations[$relation]['type'];
  }

  /**
   * Returns the model's foreign key as used in a relationship
   * @param $relation
   * @return string
   */
  public function getForeignKey( $relation )
  {
    $this->checkRelation( $relation );
    return $this->relations[$relation]['foreignKey'];
  }

  /**
   * Returns the name of the class that is bound by the relation.
   * @param string $relation
   * @return string name of class
   */
  protected function getTargetModelClass( $relation )
  {
    $this->checkRelation( $relation );

    if ( isset( $this->relations[$relation]['target']['class'] ) )
    {
      $class = $this->relations[$relation]['target']['class'];
    }
    elseif ( isset( $this->relations[$relation]['target']['modelType'] ) )
    {
      $type = $this->relations[$relation]['target']['modelType'];
      $dsModel = $this->getModel()->datasourceModel();
      if ( ! $dsModel )
      {
        throw new qcl_data_model_Exception( sprintf(
          "Cannot determine class name for target model of type %s in relation '%s': no datasource model.",
          $type, $relation
        ) );
      }

      $class = $dsModel->getModelClassByType( $type );
    }
    else
    {
      throw new qcl_data_model_Exception( sprintf(
        "Cannot determine class name for target model in relation '%s'.",
        $relation
      ) );
    }

    /*
     * return the name of the child class instead of the
     * defining class
     */
    if ( isset( self::$replace_class[$class] ) )
    {
      return self::$replace_class[$class];
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

    /*
     * get the object singleton
     */
    if ( ! $instances[$class] )
    {
      $datasourceModel = $this->getModel()->datasourceModel();

      /*
       * use getInstance() method if no datasource
       */
      if ( is_object( $datasourceModel )  )
      {
        /*
         * if no getInstance() method exists, create a new object
         */
        $this->getModel()->log( "Creating new instance with  datasource '$datasourceModel'.", QCL_LOG_MODEL_RELATIONS );
        $model = $datasourceModel->getModelByClass( $class );
      }

      /*
       * else use the static getInstance() method
       */
      else
      {
        $this->getModel()->log( "Using singleton instance '$class'.", QCL_LOG_MODEL_RELATIONS );

        if ( version_compare ( PHP_VERSION, '5.3', '<') )
        {
          $model = call_user_func_array( array( $class, "getInstance" ), array() );
        }
        else
        {
          $model = call_user_func_array( "$class::getInstance", array() );
        }
      }

      /*
       * store the object
       */
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
   * Returns true if given model depends on the the managed model.
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return bool
   */
  public function isDependentModel( $targetModel )
  {
    $relation    = $this->getRelationNameForModel( $targetModel );
    $isDependent =
      ( isset( $this->relations[$relation]['target']['dependent'] )
      and ( $this->relations[$relation]['target']['dependent'] == true ) );
    return $isDependent;
  }

  //-------------------------------------------------------------
  // Setup the realtions from the data
  //-------------------------------------------------------------

  /**
   * Adds the foreign key as a property of this model
   *
   * @param string $key
   * @return string key
   */
  public function setupForeignKey( $key, $relation )
  {
    $model   = $this->getModel();
    $model->init();

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
      else
      {
        // do nothing, key is already set up
      }
    }
    else
    {
      $this->getModel()->log( sprintf(
        "Relation '%s': Adding foreign key property '%s' to model '%s'.",
        $relation, $key, $model->className()
      ), QCL_LOG_MODEL_RELATIONS  );

      /*
       * add the property definition
       */
      $propBeh->add( array(
        $key => array(
          "check"    => "integer",
          "sqltype"  => "int(11)", // FIXME Is this portable?
          "export"   => false,
          "nullable" => true,
          "column"   => $key // FIXME make this configurable
        )
      ) );

      /*
       * setup the property
       */
      $propBeh->setupProperties( array( $key ) );
    }
    return $key;
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
    $objectId = $model->objectId();
    $class = $model->className();
    $cache = $this->cache();
    if ( ! isset( $cache->relations[ $relation ] ) )
    {
      $cache->relations[ $relation ] = array();
    }

    /*
     * check if that particular object has already been setup
     */
    if( ! isset( $cache->relations[ $relation ][ $objectId ] ) )
    {
      /*
       * call setup method
       */
      $relationType =  $this->getRelationType( $relation );
      $method = "setupRelation" . $this->convertLinkType( $relationType );

      if( $this->hasLog() ) $this->log( sprintf(
        "Setting up relation '%s' for %s using '%s'...",
        $relation, $model, $method
      ));

      $this->$method( $relation );

      /*
       * set flag
       */
      $cache->relations[ $relation ][ $objectId ] = true;
      return true;
    }
    if( $this->hasLog() ) $this->log( sprintf(
      "Relation '%s' is already set up for %s.",
      $relation, $model
    ));
    return false;
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
    $model            = $this->getModel();
    $foreignKey       = $this->getForeignKey( $relation );
    $targetForeignKey = $this->getTargetForeignKey( $relation );

    $joinModel = $this->getJoinModel( $relation );

    if( $this->hasLog() ) $this->log( sprintf(
      "Creating join model, using table '%s' with properties '%s' and '%s' ...",
      $joinModel->tableName(), $foreignKey, $targetForeignKey
    ) );

    $joinModel->addProperties( array(
      $foreignKey => array(
        'check'     => "integer",
        'sqltype'   => "INT(11)",
        'export'    => true,
        'column'    => $foreignKey //FIXME
      ),
      $targetForeignKey => array(
        'check'     => "integer",
        'sqltype'   => "INT(11)",
        'export'    => true,
        'column'    => $targetForeignKey //FIXME
      )
    ));

    /*
     * initialize join model
     */
    $joinModel->init();

    /*
     * add additional indexes
     */
    $jointable =  $joinModel->getQueryBehavior() ->getTable();
    $indexName = "unique_" . $foreignKey . "_" . $targetForeignKey;
    if ( ! $jointable->indexExists( $indexName ) )
    {
      $jointable->addIndex(
        "unique", $indexName, array( $foreignKey, $targetForeignKey )
      );
    }
  }

  /**
   * Getter for the prefix used for the join table
   * @return string
   */
  public function getDefaultJoinTablePrefix()
  {
    return $this->defaultJoinTablePrefix;
  }

  /**
   * Setter for the prefix used for the join table
   * @return string
   */
  public function setDefaultJoinTablePrefix( $prefix )
  {
    qcl_assert_valid_string( $prefix );
    $this->defaultJoinTablePrefix = $prefix;
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
  public function getJoinTableName( $relation, $withPrefix=true  )
  {
    /*
     * get name of join table
     */
    if ( ! isset( $this->relations[$relation]['jointable'] )
         or ! $this->relations[$relation]['jointable']  )
    {
      $this->relations[$relation]['jointable'] =
        $this->getDefaultJoinTablePrefix() . $relation;
    }
    $joinTableName = $this->relations[$relation]['jointable'];
    $this->checkJoinTableName( $joinTableName, $relation );

    if( $withPrefix )
    {
      $prefix = $this->getModel()->getQueryBehavior()->getTablePrefix();
      return $prefix . $joinTableName;
    }
    else
    {
      return $joinTableName;
    }
  }

  /**
   * Checks the name of the join table for the current relation
   * @param string $tableName
   * @param string $relation Relation name
   * @return void
   */
  protected function checkJoinTableName( $joinTableName, $relation )
  {
    if ( ! is_string( $joinTableName ) or empty( $joinTableName ) )
    {
      throw new qcl_data_model_Exception( sprintf(
        "Invalid join table name '%s' in class '%s', relation '%s'",
        $joinTableName, $this->getModel()->className(), $relation
      ) );
    }
  }

  /**
   * Sets the name of the table that joins two models
   * @param $relation
   * @param $tableName
   * @return unknown_type
   */
  public function setJoinTableName( $relation, $joinTableName )
  {
    $this->checkJoinTableName( $relation, $joinTableName );
    $this->relations[$relation]['jointable'] = $joinTableName;
  }

  /**
   * Returns the active record model that is used to join two other
   * tables in a many-to-many relationship.
   * @param string $relation Relation name
   * @return qcl_data_model_db_ActiveRecord
   */
  public function getJoinModel( $relation )
  {
    $joinTableName = $this->getJoinTableName( $relation, false );

    /*
     * use cached  object or create new one
     */
    static $joinModels = array();
    if ( ! isset( $joinModels[$joinTableName] ) )
    {
      if ( $this->hasLog() ) $this->log( sprintf(
        "Creating new join model with table name '%s' ...", $joinTableName
      ));

      qcl_import( "qcl_data_model_db_JoinModel" );
      $datasourceModel = $this->getModel()->datasourceModel();
      $joinModel = new qcl_data_model_db_JoinModel( $datasourceModel, $joinTableName );
      $joinModels[$joinTableName] = $joinModel;
    }
    else
    {
      if ( $this->hasLog() ) $this->log( sprintf(
        "Using cached join model with table name '%s' ...", $joinTableName
      ));
    }
    return $joinModels[$joinTableName];
  }

  /**
   * Returns the name of the relation with which the given model is
   * linked or null if no such link exists. Throws an exception
   * if there is no such link. Since relation definitions can be
   * inherited by subclasses, the method checks relations to parent
   * classes if no direct relation to the given class can be
   * established.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return string
   * @throws qcl_data_model_Exception
   */
  public function getRelationNameForModel( $targetModel )
  {
    $this->checkTargetModel( $targetModel );
    $class = $targetModel->className();

    /*
     * try class name
     */
    if ( isset( $this->relationModels[ $class ] ) )
    {
      return $this->relationModels[ $class ];
    }

    /*
     * try class parents
     */
    $parent_class = get_parent_class( $targetModel );
    do
    {
      if ( isset( $this->relationModels[ $parent_class ] ) )
      {
        return $this->relationModels[ $parent_class ];
      }
      $parent_class = get_parent_class( $parent_class );
    }
    while ( $parent_class );

    /*
     * throw exception
     */
    throw new qcl_data_model_Exception( sprintf(
      "Model '%s' is not associated to model '%s'.",
      $this->getModel()->className(), $class
    ) );
  }

  /**
   * Returns true if the managed model has a relation with the given
   * model.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return bool
   */
  public function hasRelationWithModel( $targetModel )
  {
    return ! is_null( $this->getRelationNameForModel( $targetModel ) );
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

  //-------------------------------------------------------------
  // Link two model records
  //-------------------------------------------------------------

  /**
   * Creates a link between two associated model instances. Throws an exception
   * if models are already linked.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return void
   * @throws qcl_data_model_RecordExistsException If link already exists
   */
  public function linkModel( $targetModel )
  {
    /*
     * call  method depending on relation type
     */
    $relation = $this->checkModelRelation( $targetModel );
    $method = "linkModel" . $this->convertLinkType( $this->getRelationType( $relation ) );

    if ( $this->hasLog() ) $this->log( sprintf(
      "Linking model instances %s and %s, using '%s'.",
       $this->getModel(), $targetModel, $method
    ) );


    if ( $this->$method( $relation, $targetModel ) )
    {
      return;
    }
    else
    {
      throw new qcl_data_model_RecordExistsException( sprintf(
        "The model instances %s and %s are already linked.",
         $this->getModel(), $targetModel
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
    $joinModel = $this->getJoinModel( $relation );

    if ( ! $this->isLinkedModelManyToMany( $relation, $targetModel ) )
    {
      $joinModel->create( array(
        $foreignKey        => $this->getModel()->id(),
        $targetForeignKey  => $targetModel->id()
      ) );
      return true;
    }
    return false;
  }


  //-------------------------------------------------------------
  // Unlink two model records
  //-------------------------------------------------------------

  /**
   * Unlinks the given target model from the managed model. Throws an error
   * if models were not linked.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return void
   */
  public function unlinkModel( $targetModel )
  {
    /*
     * call method depending on relation type
     */
    $relation = $this->checkModelRelation( $targetModel );
    $method = "unlinkModel" .
      $this->convertLinkType( $this->getRelationType( $relation ) );
    if ( $this->$method( $relation, $targetModel ) )
    {
      if( $this->hasLog() ) $this->log( sprintf(
        "Unlinked model instances %s and %s.",
         $this->getModel(), $targetModel
      ) );
      return true;
    }
    else
    {
      throw new qcl_data_model_Exception( sprintf(
        "Cannot unlink: The model instances %s and %s are not linked.",
         $this->getModel(), $targetModel
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

    $joinModel     = $this->getJoinModel( $relation );
    $queryBehavior = $joinModel->getQueryBehavior();

    return $queryBehavior->deleteWhere( array(
        $foreignKey       => $this->getModel()->id(),
        $targetForeignKey => $targetModel->id()
    ) );
  }

  //-------------------------------------------------------------
  // Remove all links between two models
  //-------------------------------------------------------------

  /**
   * Unlinks all instances of the target model from the managed model,
   * optionally deleting the linked records ($delete = true). You can
   * either unlink only the links between the currently loaded record
   * ($allLinks = false) or remove all links ($allLinks= true).
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @param bool $allLinks If true, remove all links, i.e. not only
   *   of the model instance (with the present id), but all other
   *   instances as well.
   * @param bool $delete If true, delete all linked records in addition
   *   to unlinking them. This is needed for dependend models.
   * @return int number of links removed
   */
  public function unlinkAll( $targetModel, $allLinks = false, $delete = false )
  {
    /*
     * call method depending on relation type
     */
    $relation = $this->checkModelRelation( $targetModel );
    $relationType = $this->getRelationType( $relation );
    $method = "unlinkAll" . $this->convertLinkType( $relationType );

    if( $this->hasLog() ) $this->log( sprintf(
      "Unlinking %s model instances [%s] and [%s] using '%s'%s.",
       $allLinks ? "all" : "selected",
       $this->getModel()->className(),
       $targetModel->className(),
       $method,
       $delete ? " and deleting the linked records" : ""
    ) );

    return $this->$method( $relation, $targetModel, $allLinks, $delete );
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
   * @param bool $delete If true, delete all linked records in addition
   *   to unlinking them. This is needed for dependend models.
   * @return int number of links removed
   */
  protected function unlinkAllOneToMany( $relation, $targetModel, $allLinks, $delete  )
  {
    $foreignKey  = $this->getForeignKey( $relation );
    $tgtQueryBeh = $targetModel->getQueryBehavior();

    /*
     * if all ties are to be broken, set all values in the
     * foreign key column in the target model to null or
     * delete them if requested
     */
    if ( $allLinks )
    {
      if ( $delete )
      {
        return $targetModel->deleteAll();
      }
      else
      {
        return $tgtQueryBeh->updateWhere(
          array( $foreignKey => null ),
          array( $foreignKey => array( "IS NOT" , null ) )
        );
      }
    }

    /*
     * otherwise, set the foreign key columns in the target
     * model that contain the id of the current model to null
     * record or delete those rows if requested
     */
    else
    {
      if ( $delete )
      {
        $targetModel->findWhere(
          array( $foreignKey => $this->getModel()->getId() )
        );
        while ( $targetModel->loadNext() )
        {
          $targetModel->delete();
        }
      }
      else
      {
        return $tgtQueryBeh->updateWhere(
          array( $foreignKey => null ),
          array( $foreignKey => $this->getModel()->getId() )
        );
      }
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
   * @param bool $delete Must be false in a many-to-one relationship,
   *   raises an error if true.
   * @return int number of links removed
   */
  protected function unlinkAllManyToOne( $relation, $targetModel, $allLinks, $delete )
  {
    $targetForeignKey = $targetModel->getRelationBehavior()->getForeignKey( $relation );
    $queryBehavior    = $this->getModel()->getQueryBehavior();

    /*
     * we cannot delete target model records in a many-to-one relationship,
     * this would break data integrity
     */
    if ( $delete )
    {
      throw new qcl_data_model_Exception(
        "Cannot delete target model in a many-to-one relationship!"
      );
    }

    /**
     * if all links between the models are to be severed,
     * set all foreign key columns in the model data to null
     */
    if ( $allLinks )
    {
      if ( $this->hasLog() ) $this->log( sprintf(
        "Relation '%s', source '%s', target '%s': Setting property '%s' to null in '%s'",
        $relation, $this->getModel()->className(), $targetModel->className(),
        $targetForeignKey, $this->getModel()->className()
      ) );

      return $queryBehavior->updateWhere(
        array( $targetForeignKey => null ),
        array( $targetForeignKey => array( "IS NOT", null ) )
      );
    }

    /*
     * otherwise, no action
     */
    else
    {
      if ( $this->hasLog() ) $this->log( sprintf(
        "Relation '%s', source '%s', target '%s': Ignoring unlinkAllManyToOne method request.",
        $relation, $this->getModel()->className(), $targetModel->className()
      ) );
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
   * @param bool $delete Must be false in a many-to-many relationship,
   *   raises an error if true.
   * @return int number of links removed
   */
  protected function unlinkAllManyToMany( $relation, $targetModel, $allLinks, $delete )
  {
    $foreignKey = $this->getForeignKey( $relation );
    $joinModel  = $this->getJoinModel( $relation );

    /*
     * we cannot delete target model records in a many-to-one relationship,
     * this would break data integrity
     */
    if ( $delete )
    {
      $this->getModel()->raiseError("Cannot delete target model in a many-to-one relationship!");
    }

    /*
     * if all links are to be deleted, truncate the join table
     */
    if ( $allLinks )
    {
      if ( $this->hasLog() ) $this->log( sprintf(
        "Relation '%s', source '%s', target '%s': Truncating join table '%s'",
        $relation, $this->getModel()->className(), $targetModel->className(),
        $joinModel->tableName()
      ) );
      return $joinModel->getQueryBehavior()->getTable()->truncate();
    }

    /*
     * otherwise, remove those records that contain this model's
     * id in the foreign key column
     */
    else
    {
      if ( $this->hasLog() ) $this->log( sprintf(
        "Relation '%s', source '%s', target '%s': Removing joined records in table '%s'",
        $relation, $this->getModel()->className(), $targetModel->className(),
        $joinModel->tableName()
      )  );

      return $joinModel->getQueryBehavior()->deleteWhere( array(
        $foreignKey => $this->getModel()->id()
      ) );
    }
  }

  //-------------------------------------------------------------
  // Information on links between model records
  //-------------------------------------------------------------

  /**
   * Checks if the managed modeland the given target model are linked.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel Target model
   * @return bool
   */
  public function islinkedModel( $targetModel )
  {
    /*
     * call method depending on relation type
     */
    $relation = $this->checkModelRelation( $targetModel );
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
    $joinModel        = $this->getJoinModel( $relation );

    return (bool) $joinModel->getQueryBehavior()->countWhere( array(
      $foreignKey       => $this->getModel()->id(),
      $targetForeignKey => $targetModel->id()
    ) );
  }

  /**
   * Return the ids of the model records that are linked to the target model,
   * depending on the relation type many-to-one and many-to-many relations
   * return the ids that are linked to the target model record.
   * one-to-many relations make no sense in this context.
   *
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return array
   */
  public function linkedModelIds( $targetModel )
  {
    /*
     * call method depending on relation type
     */
    $relation = $this->checkModelRelation( $targetModel );
    $method = "linkedModelIds" . $this->convertLinkType( $this->getRelationType( $relation ) );
    return $this->$method( $relation, $targetModel );
  }

  /**
   * Implementation for linkedModelIds() for 1:n relations.
   * Returns an empty.
   * @param string $relation
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return array An empty array
   */
  protected function linkedModelIdsOneToMany ( $relation, $targetModel )
  {
    return array();
    //$targetForeignKey = $targetModel->getRelationBehavior()->getForeignKey( $relation );
    //return array( $this->getModel()->get( $targetForeignKey ) );
  }

  /**
   * Implementation for linkedModelIds() for n:1 relations.
   *
   * @param string $relation
   * @param qcl_data_model_db_ActiveRecord $targetModel
   * @return array Returns an empty array
   */
  protected function linkedModelIdsManyToOne( $relation, $targetModel )
  {
    $targetForeignKey = $targetModel->getRelationBehavior()->getForeignKey( $relation );
    $ids = $this->getModel()->getQueryBehavior()->fetchValues( "id", array(
      $targetForeignKey => $targetModel->id()
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
    $foreignKey        = $this->getForeignKey( $relation );
    $targetForeignKey  = $targetModel->getRelationBehavior()->getForeignKey( $relation );
    $joinQueryBehavior = $this->getJoinModel( $relation )->getQueryBehavior();

    return  $joinQueryBehavior->fetchValues($foreignKey,
      array(
        $targetForeignKey => $targetModel->id()
      )
    );
  }

  //-------------------------------------------------------------
  // Reset the internal cache
  //-------------------------------------------------------------


  /**
   * Resets  the internal caches
   * @return void
   */
  public function reset()
  {
    if ( $this->hasLog() ) $this->log( "Resetting cache.");
    $this->cache()->reset();
    $this->isInitialized = false;
  }

}
?>