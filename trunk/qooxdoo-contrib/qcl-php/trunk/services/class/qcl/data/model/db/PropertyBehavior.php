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

qcl_import( "qcl_data_model_PropertyBehavior" );
qcl_import( "qcl_core_PersistentObject" );

/**
 * Cache for property setup
 */
class qcl_data_model_db_PropertyCache
  extends qcl_core_PersistentObject
{
  public $tables     = array();
  public $properties = array();
  public function reset()
  {
    $this->tables = array();
    $this->properties = array();
    $this->savePersistenceData();
  }
}


/**
 * Extending the property behavior of qcl_data_model_PropertyBehavior
 * with sql database support. This property behavior is to be used
 * by subclasses of qcl_data_model_AbstractActiveRecord, which already
 * defines the properties "id", "created", "modified".
 *
 * Since the properties will be persisted in the database, non-scalar
 * value types will be serialized to a string representation. (not
 * implemented yet).
 *
 * This behavior adds the following keys to the property definition:
 *
 * 'sqltype'    The full definition of a column in a database table
 *              as it would be used in a CREATE TABLE statement.
 *              Support for a more fine-grained type definition will
 *              be added later, which will make this feature more
 *              portable across database drivers.
 *
 * 'unique'     Easy way to add a unique index on the column
 *
 * 'serialize'  If <true>, non-scalar values will be serialized before
 *              stored in the database, and unserialized before when the
 *              record is loaded. Since serialized objects have a variable
 *              and potentially very large size, make sure to use
 *              data type (such as LONGTEXT or LONGBLOB) that will be able to
 *              store adequately long strings.
 *
 *
 * <pre>
 * private $properties = array(
 *   "foo" => array(
 *     "check"    => "string",
 *     "init"     => "foo",
 *     "nullable" => true,
 *     "sqltype"  => "varchar(50)"
 *    ),
 *    "bar"  => array(
 *      "check"     => "integer",
 *      "init"      => 1,
 *      "nullable"  => true,
 *      "sqltype"   => "int(11)"
 *    ),
 *    "baz"  => array(
 *      "check"     => "boolean",
 *      "init"      => true,
 *      "nullable"  => false,
 *      "sqltype"   => "int(1)"
 *    ),
 * );
 *
 * function __construct()
 * {
 *   $this->addProperties( $this->properties );
 *   parent::__construct();
 * }
 * </pre>
 *
 *
 * @see qcl_data_model_db_PropertyBehavior
 */
class qcl_data_model_db_PropertyBehavior
  extends qcl_data_model_PropertyBehavior
{
  /**
   * A persistent object which holds cached data on
   * table, property and column initialization
   * @var qcl_data_model_db_PropertyCache
   */
  private static $cache = null;

  /**
   * Getter for managed model
   * @return qcl_data_model_db_ActiveRecord
   */
  protected function getModel()
  {
    return parent::getObject();
  }

  /**
   * Constructor. Creates table if it doesn't already exist.
   * @param qcl_data_model_db_ActiveRecord $model
   * FIXME fix dependencies here!
   */
  function __construct( $model )
  {
//    if( ! $model instanceof qcl_data_model_db_IModel )
//    {
//      $model->raiseError("Invalid model passed to property behavior.");
//    }

    parent::__construct( $model );

    /*
     * check if table exists, otherwise create
     */
    $tableName = $model->tableName();
    $cache     = $this->cache();

    if ( ! $cache->tables[$tableName] )
    {
      $table = $model->getQueryBehavior()->getTable();
      if( ! $table->exists() )
      {
        $table->create();
      }
      $cache->tables[$tableName] = true;
    }
  }

  /**
   * Returns the static cache object
   * @return qcl_data_model_db_PropertyCache
   */
  protected function cache()
  {
    if ( ! self::$cache )
    {
      self::$cache = new qcl_data_model_db_PropertyCache();
    }
    return self::$cache;
  }

  /**
   * Adds a property definition. Sets up the corresponding
   * table column if it doesn't already exist.
   * @param array $properties
   * @return void
   */
  public function add( $properties )
  {
    parent::add( $properties );

    $model = $this->getModel();
    $behav = $model->getQueryBehavior();
    $adpt  = $behav->getAdapter();
    $table = $behav->getTable();
    $tableName = $model->tableName();
    $cache = $this->cache();

    if ( ! isset( $cache->properties[$tableName] ) )
    {
      $cache->properties[$tableName] = array();
    }
    $cachedProps = $cache->properties[$tableName];


    /*
     * setup table columns
     * @todo rework caching
     */
    foreach( $properties as $name => $prop )
    {
      $serializedProps = serialize( $prop );
      if ( isset( $cachedProps[$name] ) and $cachedProps[$name] == $serializedProps )
      {
        $model->log( "Property '$name' has not changed.", QCL_LOG_PROPERTIES );
        continue;
      }

      /*
       * skip "id" column since it is created by default
       */
      if ( $name == "id" ) continue;

      /*
       * determine sql type
       */
      if ( isset( $prop['sqltype'] ) )
      {
        $sqltype = $prop['sqltype'];
      }
      else
      {
        if ( isset( $prop['serialize'] ) and $prop['serialize'] == true )
        {
          // FIXME: this is MySQL-specific -> delegate to adapter!
          $sqltype = "blob";
        }
        elseif ( $this->isPrimitive( $prop['check'] ) )
        {
          //$sqltype = $adpt->getSqlDataType( $prop['check'] );
        }
      }

      /*
       * 'CURRENT_TIMESTAMP'
       */
      if( strtolower($sqltype) == "current_timestamp" )
      {
        $sqltype = $behav->getAdapter()->currentTimestampSql();
      }

      /*
       * add "NULL" to sql type if not specified (default)
       */
      if ( ! strstr( $sqltype, "NULL") and ! strstr( $sqltype, "null") )
      {
        $sqltype .= " NULL";
      }

      /*
       * check type
       */
      if ( ! isset( $prop['sqltype'] ) )
      {
        throw new qcl_data_model_Exception(
          sprintf( "Property '%s.%s' does not have a 'sqltype' definition.", get_class( $this->model), $name )
        );
      }

      /*
       * if column does not exist, create it
       */
      if ( ! $table->columnExists( $name ) )
      {
        $model->log( "Adding column '$name' with definition '$sqltype'", QCL_LOG_TABLES);
        $table->addColumn( $name, $sqltype );

        /*
         * unique index on column?
         */
        if ( isset( $prop['unique'] ) and $prop['unique'] === true )
        {
          $model->log( "Adding unique index for property '$name'", QCL_LOG_TABLES);
          $table->addIndex("unique","unique_{$name}",$name);
        }
      }

      /*
       * if not, check if it has changed
       */
      else
      {
        $curr_sqltype = $table->getColumnDefinition( $name );
        if (strtolower($curr_sqltype)  != strtolower($sqltype) )
        {
          $model->log( "Column '$name' has changed from '$curr_sqltype' to '$sqltype'", QCL_LOG_TABLES);
        }
        else
        {
          $model->log( "Column '$name' has not changed.", QCL_LOG_TABLES);
        }
      }

      /*
       * save in cache
       */
      $cache->properties[$tableName][$name] = $serializedProps;
    }
  }

  /**
   * Resets the property behavior and the internal cache
   * @return void
   */
  public function reset()
  {
    $this->cache()->reset();
  }
}
?>