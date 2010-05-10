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

//qcl_import( "qcl_data_model_IQueryBehavior" );
qcl_import( "qcl_data_db_Table" );


/**
 * Query behavior for (PDO) database driver.
 * FIXME ORDER BY clause must be sanitized, remains unchecked!
 */
class qcl_data_model_db_QueryBehavior
//implements qcl_data_model_IQueryBehavior
{

  //-------------------------------------------------------------
  // Class properties
  //-------------------------------------------------------------

  /**
   * The model affected by this behavior
   * @var qcl_data_model_db_ActiveRecord
   */
  protected $model;

  /**
   * The database driver adapter. Acces with getAdapter()
   */
  private $adapter;

  /**
   * The table object used for manipulating the database tables.
   * Access with getTable()
   * @var unknown_type
   */
  private $table;

  /**
   * The name of the table used for storing the data of the managed
   * object.
   * @var string
   */
  private $tableName;

  /**
   * A static persistent cache object to avoid repetetive introspection
   * queries
   * @var qcl_data_model_db_QueryCache
   */
  static private $cache;


  /**
   * The indexes of the model table
   * @var array
   */
  private $indexes = array();


  /**
   * Whether the object is initialized
   * @var unknown_type
   */
  private $isInitialized = false;

  //-------------------------------------------------------------
  // Constructor
  //-------------------------------------------------------------

  /**
   * Constructor
   * @param qcl_data_model_ActiveRecord $model Model affected by this behavior
   */
  function __construct( $model )
  {
    /*
     * the model affected by this behavior
     */
    $this->model = $model;
  }

  /**
   * Initialization
   * @return bool true if initialization is necessary, false if already initialized
   */
  function init()
  {
    if ( ! $this->isInitialized )
    {
      $this->setupIndexes();
      $this->isInitialized  = true;
      return true;
    }
    return false;
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
   * Retrieves the datasource object
   * @return qcl_data_datasource_DbModel
   */
  public function getDatasourceModel()
  {
    return $this->getModel()->datasourceModel();
  }

  /**
   * Stores the name or object reference of the datasource that
   * provides information on access to the data
   * @param mixed $datasource Either the name of the datasource or an
   * object reference to the datasource object
   * return void
   */
  protected function setDatasourceModel( qcl_data_datasource_DbModel $datasourceModel )
  {
    $this->datasourceModel = $datasourceModel;
  }

  /**
   * Getter for table name. If the table name has not been set
   * by the model, use "data_" plus class name of the model
   * @return string
   */
  public function getTableName()
  {
    if ( ! $this->tableName )
    {
      $this->tableName = $this->getModel()->tableName();
      if ( ! $this->tableName )
      {
        $this->tableName = "data_" . $this->getModel()->className();
      }
    }
    return $this->getTablePrefix() . $this->tableName;
  }

  /**
   * Getter for persistent cache object
   * @return qcl_data_model_db_QueryCache
   */
  public function cache()
  {
    if ( ! self::$cache )
    {
      qcl_import( "qcl_data_model_db_QueryCache" );
      self::$cache = new qcl_data_model_db_QueryCache();
    }
    return self::$cache;
  }


  //-------------------------------------------------------------
  // Database management
  //-------------------------------------------------------------

  /**
   * Getter for database manager singleton object
   * @return qcl_data_db_Manager
   */
  public function getManager()
  {
    qcl_import( "qcl_data_db_Manager" );
    return qcl_data_db_Manager::getInstance();
  }

  /**
   * Returns the database connection adapter for this model, which is
   * taken from the datasource object or from the framework.
   * @return qcl_data_db_adapter_PdoMysql
   */
  public function getAdapter()
  {
    if ( $this->adapter === null )
    {
      /*
       * try to get db handler from datasource object
       */
      $dsModel = $this->getDatasourceModel();
      if ( $dsModel )
      {
        $this->adapter = $dsModel->createAdapter();
      }

      /*
       * otherwise, get database object from framework
       */
      else
      {
        $this->adapter = $this->getManager()->createAdapter();
      }

      /*
       * if no database object at this point, fatal error.
       */
      if ( ! $this->adapter )
      {
        $this->raiseError("No database adapter available.");
      }
    }
    return $this->adapter;
  }

  /**
   * Returns application instance
   * @return qcl_application_Application
   */
  protected function getApplication()
  {
    return qcl_server_Server::getInstance()->getServerInstance()->getApplication();
  }

  //-------------------------------------------------------------
  // Table management
  //-------------------------------------------------------------

  /**
   * Returns the prefix for tables used by this
   * model. defaults to the datasource name plus underscore
   * or an empty string if there is no datasource
   * @return string
   */
  public function getTablePrefix()
  {
    $dsModel = $this->getDatasourceModel();
    if ( $dsModel )
    {
      $prefix = $dsModel->getTablePrefix();
    }
    else
    {
      $prefix = $this->getApplication()->getIniValue("database.tableprefix");
    }
    return $prefix;
  }

  /**
   * Returns the table object used by this behavior
   * @return qcl_data_db_Table
   */
  public function getTable()
  {
    if ( $this->table === null)
    {
      $tableName   = $this->getTableName();
      $adapter     = $this->getAdapter();
      $this->table = new qcl_data_db_Table( $tableName, $adapter );
    }
    return $this->table;
  }

  /**
   * Returns the name of the column that holds the unique (numeric) id of the table.
   * @return string
   */
  public function getIdColumn()
  {
    return "id";
  }

  /**
   * Returns the column name from a property name set by the property
   * behavior.
   *
   * @param string $property Property name
   * @return string
   */
  public function getColumnName( $property )
  {
    return $this->getModel()->getPropertyBehavior()->getColumnName( $property );
  }

  /**
   * Add an index to the model table. This will also update
   * existing indexes.
   * @param array $indexes Map of index data. The keys are the
   *  name of the index, the value is an associative array with
   *  the following keys:
   *  "type"       => a string value, any of (unique|fulltext),
   *  "properties" => an array of property names
   * @return void
   */
  public function addIndexes( $indexes )
  {
    foreach( $indexes as $name => $index)
    {
      $this->indexes[$name] = $index;
    }
  }

  /**
   * Sets up the indexes. This must be called from the init()
   * method, after the properties have been set up
   *
   * @return void.
   */
  public function setupIndexes()
  {
    $indexes   = $this->indexes;
    $model     = $this->getModel();
    $tableName = $this->getTableName();
    $table     = $this->getTable();
    $cache     = $this->cache();

    foreach( $indexes as $name => $index )
    {

      /*
       * check structure
       */
      try
      {
         qcl_array_assert_keys( $index, array( "type", "properties" ) );
      }
      catch ( InvalidArgumentException $e )
      {
        throw new InvalidJsonRpcArgumentException("Invalid index '$name': " . $e->getMessage() );
      }

      /*
       * initialize cache for this table
       */
      if ( ! isset( $cache->indexes[$tableName] ) )
      {
        $cache->indexes[$tableName] = array();
      }

      /*
       * continue if the cache has the same value
       */
      if ( isset( $cache->indexes[$tableName][$name] ) )
      {
        if ( $cache->indexes[$tableName][$name] == array(
            "type"       => $index['type'],
            "properties" => $index['properties']
        )  )
        {
          $model->log("Index hasn't changed according to cached data.",QCL_LOG_TABLES);
          $cache->indexes[$tableName][$name] = $index;
          continue;
        }
      }

      /*
       * determine columns
       */
      $columns = array();
      if( ! is_array( $index['properties'] ) )
      {
        throw new InvalidJsonRpcArgumentException("Invalid index '$name': properties must be an array." );
      }

      foreach( $index['properties'] as $property )
      {
        $columns[] = $this->getColumnName( $property );
      }

      /*
       * if index doesn't exist, create it and continue
       */
      if ( ! $table->indexExists( $name ) )
      {
        $table->addIndex( $index['type'], $name, $columns );
        $cache->indexes[$tableName][$name] = $index;
        continue;
      }

      /*
       * check if the index has changed in the database
       */
      if ( $table->getIndexColumns( $name ) == $columns )
      {
        $model->log("Index hasn't changed according to the database.",QCL_LOG_TABLES);
        $cache->indexes[$tableName][$name] = $index;
        continue;
      }

      /*
       * Yes, it has changed, drop it and recreate it
       */
      $model->log("Index has changed, dropping and recreating it.",QCL_LOG_TABLES);
      $table->dropIndex( $name );
      $table->addIndex( $index['type'], $name, $columns );
      $cache->indexes[$tableName][$name] = $index;
    }
  }


  /**
   * Resets  the internal cache
   * @return void
   */
  public function reset()
  {
    $this->cache()->reset();
  }

  //-------------------------------------------------------------
  // Record search and retrieval methods (select/fetch methods)
  //-------------------------------------------------------------

  /**
   * Converts a qcl_data_db_Query object to an sql statement. If necessary,
   * the 'parameter' and 'parameter_types' members of the qcl_data_db_Query
   * object will be modified.
   *
   * @param qcl_data_db_Query $query
   * @return string sql statement
   * @todo rewrite
   */
  public function queryToSql( qcl_data_db_Query $query)
  {
    $adpt    = $this->getAdapter();
    $propArg = $query->getProperties();

    /*
     * check for relations
     */
    $link    = $query->getLink();
    if ( $link and isset( $link['relation'] ) )
    {
      $relBeh = $this->getModel()->getRelationBehavior();
      $relation = $link['relation'];
      $relBeh->checkRelation( $relation );
      $targetModel = $relBeh->getTargetModel( $relation );
    }
    else
    {
      $targetModel = null;
    }

    /*
     * determine the column to select and the names under
     * which the columns should be returned ('properties')
     * properties is an array, one element for each model
     * involved, of arrays of property names.
     */
    $columns    = array();
    $properties = array();


    /*
     * if string, split at the pipe and comma characters
     */
    if ( is_string( $propArg ) )
    {
      $parts = explode("|", $propArg );

      /*
       * if we have "p1,p2,p3|p4,p5,p6"
       */
      if ( count( $parts ) > 1 )
      {
        for ( $i=0; $i<count( $parts ); $i++  )
        {
          $properties[$i] = explode(",",$parts[$i] );
        }
      }

      /*
       * no only "p1,p2,p3"
       */
      else
      {
        $properties[0] = explode(",",$parts[0]);
      }
    }

    /*
     * We have an array.
     * If first element is a string, only the properties
     * of the current model are requested. Convert
     * the properties array accordingly
     */
    elseif ( is_array( $propArg ) )
    {
      if ( is_array( $propArg[0] ) )
      {
        $properties = $propArg;
      }
      elseif ( is_string( $propArg[0] ) )
      {
        $properties = array( $propArg );
      }
      else
      {
        throw new InvalidArgumentException("Invalid property argument");
      }
    }

    /*
     * if null, all the properties of the current model
     */
    elseif ( is_null( $propArg ) )
    {
      $properties = array( "*" );
    }

    /*
     * invalid property arguments
     */
    else
    {
      throw new InvalidArgumentException("Invalid 'properties'.");
    }

    /*
     * query involves linked tables
     */
    if ( $targetModel )
    {
      for ( $i=0; $i<2; $i++ )
      {

        /*
         * break if no more properties
         */
        if ( ! isset( $properties[$i] ) ) break;

        /*
         * get model
         */
        switch( $i )
        {
          case 0:
            $alias="t1";
            $model = $this->getModel();
            break;
          case 1:
            $alias="t2";
            $model = $targetModel;
            break;
        }

        /*
         * replace "*" with all properties
         */
        if ( $properties[$i]== "*" )
        {
          $properties[$i] = $model->properties();
        }

        /*
         * convert single properties to array
         */
        if ( is_string( $properties[$i] ) )
        {
           $properties[$i] = array( $properties[$i] );
        }

        /*
         * otherwise abort
         */
        elseif ( ! is_array( $properties[$i] ) )
        {
          throw new InvalidArgumentException("Invalid property argument" );
        }

        /*
         * construct column query
         */
        foreach ( $properties[$i] as $property )
        {
          /*
           * skip empty parameters
           */
          if ( ! $property ) continue;

          /*
           * get column name of given property
           */
          $column = $this->getColumnName( $property );
          $col = $adpt->formatColumnName( $column );
          //$this->info( $model->className() . ": $property -> $col");

          /*
           * alias
           */
          if( isset( $query->as[$property] ) )
          {
            $as = $query->as[$property];
            if ( preg_match('/[^0-9A-Za-z_]/',$as) )
            {
              throw new InvalidArgumentException("Invalid alias '$as'");
            }
          }
          else
          {
            $as = null;
          }

          /*
           * table and column alias
           */
          $str = "$alias.$col";
          if ( $col != $property or $i > 0 )
          {
            if ( $i > 0 )
            {
              $str .= " AS '$relation.$property'";
            }
            elseif ( $as )
            {
              $str .= " AS '$as'";
            }
            elseif( $property != $column )
            {
              $str .= " AS '$property'";
            }
          }
          $columns[] = $str;
        }
      }
    }

    /*
     * query involves only one unlinked table
     */
    else
    {

      /*
       * replace "*" with all properties
       */
      if ( $properties[0] == "*" )
      {
        $properties = $this->getModel()->properties();
      }
      else
      {
        $properties = $properties[0];
      }


      /*
       * columns, use alias if needed
       */
      $needAlias = false;
      foreach ( $properties as $property )
      {
        if ( ! $property or ! is_string( $property ) )
        {
          throw new InvalidArgumentException("Invalid property argument!");
        }

        $column = $this->getColumnName( $property );

        /*
         * alias
         */
        if( isset( $query->as[$property] ) )
        {
          $as = $query->as[$property];
          if ( preg_match('/[^0-9A-Za-z_]/',$as) )
          {
            throw new InvalidArgumentException("Invalid alias '$as'");
          }
        }
        else
        {
          $as = null;
        }

        $str = "\n     " . $adpt->formatColumnName( $column );
        if ( $column != $property )
        {
          $str .= " AS '$property'";
          $needAlias = true;
        }
        elseif ( $as )
        {
          $str .= " AS '$as'";
        }
        $columns[] = $str;
      }
    }


    /*
     * select
     */
    $sql = "\n   SELECT ";

    /*
     * distinct values?
     */
    if ( $query->distinct )
    {
      $sql .= "DISTINCT ";
    }

    /*
     * columns
     */
    if ( $needAlias
    or count( $properties) != count( $this->getModel()->properties() ) )
    {
      $sql .= implode(",",  $columns );
    }
    else
    {
      $sql .= " * ";
    }

    /*
     * from
     */
    $thisTable = $adpt->formatTableName( $this->getTableName() );
    $sql .= "\n     FROM $thisTable AS t1 ";

    /*
     * join linked records. The "link" property mus be an array
     * of the following structure:
     *
     * array(
     *  'relation' => "name-of-relation"
     * )
     *
     */
    if ( $targetModel )
    {
      $foreignKey   = $adpt->formatColumnName( $this->getModel()->foreignKey() );
      $targetTable  = $adpt->formatTableName( $targetModel->getQueryBehavior()->getTableName() );
      $targetFKey   = $adpt->formatColumnName( $targetModel->foreignKey() );

      // for now, we do only foreign id
      $foreignId = $link['foreignId'];
      if( ! $foreignId )
      {
        throw new InvalidArgumentException("For now, only foreign id links are allowed.");
      }
      // check foreign id!
      if( ! is_numeric( $foreignId )  )
      {
        throw new InvalidArgumentException("Invalid foreign id '$foreignId'");
      }

      $relType = $relBeh->getRelationType( $relation );

      switch( $relType )
      {
        case QCL_RELATIONS_HAS_ONE:
          $sql .= "\n     JOIN $targetTable AS t2 ON ( t1.id = t2.$foreignKey AND t2.id = $foreignId ) ";
          break;

        case QCL_RELATIONS_HAS_MANY:
          //$sql .= "\n     JOIN $targetTable AS t2 ON ( t1.$targetFKey = t2.id ) ";
          throw new InvalidArgumentException("1:n relations make no sense with foreign id.'");
          break;

        case QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY:

          $joinTable = $adpt->formatColumnName( $relBeh->getJoinTableName( $relation ) );
          $sql .= "\n     JOIN ( $joinTable AS l,$targetTable AS t2) ";
          $sql .= "\n       ON ( t1.id = l.$foreignKey AND l.$targetFKey = t2.id AND t2.id = $foreignId ) ";
          break;

        default:
          // should never get here
          throw new LogicException("Invalid relation type");
      }
    }

    /*
     * construct 'where' statement from the 'where' and
     * 'match' properties of the query object
     */
    if ( $query->where or  $query->match )
    {
      $where = $this->createWhereStatement( $query );
      $sql .= "\n    WHERE $where ";
    }

    /*
     * ORDER BY
     */
    if ( $query->orderBy )
    {
      if ( is_string( $query->orderBy ) )
      {
        $orderBy = explode(",", $query->orderBy );
      }
      else if ( ! is_array( $orderBy ) )
      {
        throw new InvalidArgumentException("Invalid 'orderBy' data.");
      }

      /*
       * order columns
       */
      $column = array();
      foreach ( $orderBy as $property )
      {
        if ( substr( $property, -4 ) == "DESC" )
        {
          $column[] =
            $adpt->formatColumnName(
              $this->getColumnName( substr( $property, 0 -5 ) ) ) . " DESC";
        }
        else
        {
          $column[] = $adpt->formatColumnName( $this->getColumnName( $property ) );
        }
      }
      $orderBy = implode(",", (array) $column );
      $sql .= "\n    ORDER BY $orderBy $direction";

    }

    /*
     * Retrieve only subset of all rows
     */
    if ( ! is_null( $query->firstRow ) or ! is_null( $query->lastRow ) )
    {
      $sql .=   "\n    " .
      $this->getAdapter()->createLimitStatement(  $query->firstRow,  $query->lastRow );
    }

    return $sql;
  }

  /**
   * Converts data to the 'where' part of a sql statement. If necessary,
   * this will add to the parameter and parameter_types members of the query
   * object.
   *
   * @param qcl_data_db_Query $query
   * @return string|null Returns a string if there are conditions that can
   * be expressed in the 'where' query and NULL if not.
   *
   * @todo rewrite using classes similar to cql!
   * @todo make protected
   */
  public function createWhereStatement( qcl_data_db_Query $query )
  {
    $adpt   = $this->getAdapter();
    $where  = object2array( $query->getWhere() );
    $match  = object2array( $query->getMatch() );

    /*
     * if we have a string type where statement, return it. Use this with
     * caution, since the string is not sanitized
     * FIXME: Remove this?
     */
    if ( is_string( $where ) )
    {
      return $where;
    }
    elseif ( ! is_array( $where ) and ! is_array( $match ) )
    {
      throw new InvalidArgumentException("Cannot create where query. Invalid query data.");
    }

    /*
     * otherwise create sql from it
     */
    $sql = array();

    /*
     * first use 'where' info
     */
    if( $where)
    {
      foreach( $where as $property => $value )
      {
        /*
         * this is useful but against the design: the query behavior
         * should work independently of the property behavior!
         */
        $type = $this->getModel()->getPropertyBehavior()->type( $property );

        $column = $adpt->formatColumnName( $this->getColumnName( $property ) );

        $param  = ":$property";

        /*
         * null value
         */
        if ( is_null($value) )
        {
          $operator = "IS";
        }

        /*
         * if the value is scalar, use "="
         */
        elseif ( is_scalar($value) )
        {
          $operator = "=";
        }

        /*
         * if an array has been passed, the first element is the
         * operator, the second the value
         */
        elseif ( is_array( $value ) )
        {
          $operator = $value[0];
          $this->checkOperator( $operator );
          $value    = $value[1];
        }
        else
        {
          $this->getModel()->raiseError("Property '$property': Invalid value of type " . typeof($value,true) );
        }

        $query->parameters[$param] = $value;
        $sql[]  = "$column $operator $param" ;
      }
    }

    /*
     * now analyse "match" data
     */
    if( $match )
    {
      foreach( $match as $index => $expr )
      {
        // @todo check if index exists, but only from cached data
        //$sql[]  = "MATCH($index) AGAINST '$expr' IN BOOLEAN MODE";
        $sql[]  = $adpt->fullTextSql( $this->getTableName(), $index, $expr );
      }
    }

    /*
     * return the result
     */
    if ( count ( $sql ) )
    {
      return implode("\n           AND ", $sql );
    }
    else
    {
      return null;
    }

  }

  /**
   * Checks if the operator used in the where query is valid and throws
   * an InvalidArgumentException if not.
   * @param string $operator
   * @return void
   * @throws InvalidArgumentException
   */
  protected function checkOperator( $operator )
  {
    if ( in_array( strtolower( $operator ), $this->getModel()->operators() ) )
    {
      return true;
    }
    throw new InvalidArgumentException("Operator '$operator' is invalid.");
  }

  /**
   * Runs a query on the table managed by this behavior. Stores a
   * reference to the result PDO statement in the query, so that
   * it can be used by the fetch() command.
   *
   * @param qcl_data_db_Query $query
   * @return int number of rows selected
   */
  public function select( qcl_data_db_Query $query)
  {
    $sql = $this->queryToSql( $query );
    $query->pdoStatement = $this->getAdapter()->query(
    $sql, $query->getParameters(), $query->getParameterTypes()
    );
    $query->rowCount = $this->getAdapter()->rowCount();
    return $this->rowCount();
  }

  /**
   * Selects all database records or those that match a where condition.
   * Takes an array as argument, from which new qcl_data_db_Query object
   * is created and returned.
   *
   * @param array $where
   * @param string $oderBy Optional order by clause
   * @return qcl_data_db_Query
   */
  public function selectWhere( $where, $orderBy=null )
  {
    if( ! is_array( $where ) )
    {
      $this->getModel()->raiseError("Invalid query data. Must be array.");
    }

    /*
     * Create query object
     */
    $query = new qcl_data_db_Query( array(
      'where'   => $where,
      'orderBy' => $orderBy
    ) );

    /*
     * Do query and return object
     */
    $this->select( $query );
    return $query;
  }

  /**
   * Select an array of ids for fetching
   * @param array $ids
   * @return qcl_data_db_Query
   */
  public function selectIds( $ids )
  {
    if ( ! is_array( $ids) )
    {
      $this->getModel()->raiseError("Invalid argument");
    }

    /*
     * sanity-check the ids
     */
    foreach( $ids as $id )
    {
      if( ! is_numeric($id) )
      {
        $this->getModel()->raiseError("Invalid id '$id'");
      }
    }
    /*
     * select
     */
    $query = new qcl_data_db_Query( array(
      "select" => "*",
      "where" => "id IN (" . implode(",", $ids ) .")"
      ) );
      $this->select( $query );
      return $query;
  }

  /**
   * Returns a records by property value
   * @param string $propName Name of property
   * @param string|array $values Value or array of values to find. If an array, retrieve all records
   * that match any of the values.
   * @param qcl_data_db_Query|null $query
   * @return qcl_data_db_Query
   */
  public function selectBy( $propName, $values, $query=null )
  {
    if( $query === null )
    {
      $query = new qcl_data_db_Query();
    }
    elseif ( ! $query instanceof qcl_data_db_Query )
    {
      $this->raiseError("Invalid query data.");
    }

    $column     = $this->getColumnName( $propName );
    $colStr     = $this->getAdapter()->formatColumnName( $column );
    $names      = array();
    $parameters = array();

    foreach ( (array) $values as $i => $value )
    {
      $name    = ":value{$i}";
      $names[] = $name;
      $parameters[$name] = $value;
    }

    $query->where      = "$col IN (" . implode(",", $names ) . ")";
    $query->parameters = $parameters;

    $this->select( $query );
    return $query;
  }

  /**
   * If no argument, return the first or next row of the result of the previous
   * query. If a query object is passed, return the first or next row of the
   * result of this query.
   * The returned value is converted into the correct type
   * according to the property definition and the property behavior.
   * @see qcl_data_model_db_PropertyBehavior::typecast()
   * @param qcl_data_db_Query|null $query
   * @return array
   */
  public function fetch( $query = null )
  {
    /*
     * use passed PDOStatement or simply the last one created
     */
    if ( $query instanceof qcl_data_db_Query
    and $query->getPdoStatement() instanceof PDOStatement )
    {
      $result = $query->getPdoStatement()->fetch();
    }
    elseif( $query === null )
    {
      $result = $this->getAdapter()->fetch();
    }
    else
    {
      $this->getModel()->raiseError("Invalid argument");
    }

    /*
     * set the result
     */
    if ( ! is_array( $result ) )
    {
      return null;
    }
    else
    {
      if ( isset( $result["id"]) ) settype( $result["id"] , "integer" ); //FIXME
      return $result;
    }
  }


  /**
   * If no argument, return all rows of the result of the previous
   * query. If a query object is used as argument, run this query beforehand and
   * return the result. Don't use this for large amounts of data.
   * @param qcl_data_db_Query $query
   * @return array
   */
  public function fetchAll( $query = null )
  {
    if ( $query )
    {
      $this->select( $query );
    }
    $result = array();
    while ( $row = $this->fetch() )
    {
      $result[] = $row;
    }
    return $result;
  }


  /**
   * Returns all values of a model property that match a query
   * @param string $property Name of property
   * @param qcl_data_db_Query|array|null $query "Where" query information
   * as string or qcl_data_db_Query object. If null, select all property values
   * in the model data
   * @param bool $distinct If true, return only distinct values. Defaults to true
   * @return array Array of values
   */
  public function fetchValues( $property, $query=null, $distinct=true )
  {

    /*
     * create query object from arguments
     */
    if ( is_array ( $query ) or is_null ( $query ) )
    {
      $query = new qcl_data_db_Query( array(
        'properties' => $property,
        'where'      => $query,
        'distinct'   => $distinct,
        'orderBy'    => $property
      ) );
    }

    /*
     * if query argument is a query object, set its 'properties'
     * value unless it is already set
     */
    elseif ( $query instanceof qcl_data_db_Query  )
    {
      if ( ! $query->getProperties() )
      {
        $query->setProperties( (array) $property );
      }
      elseif ( $property === null )
      {
        $property = $query->properties[0];
      }
      else
      {
        throw new InvalidArgumentException("Invalid query data.");
      }
      if ( ! isset( $query->distinct ) )
      {
        $query->distinct = $distinct;
      }
      if ( ! isset( $query->orderBy ) )
      {
        $query->orderBy = $property;
      }
    }

    /*
     * invalid argument
     */
    else
    {
      throw new InvalidArgumentException("Invalid query data.");
    }

    /*
     * select and fetch data
     */
    $this->select( $query );
    $result = array();
    while( $row = $this->fetch() )
    {
      $result[] = $row[$property];
    }
    return $result;
  }

  /**
   * Returns the number of records found in the last query.
   * @return int
   */
  public function rowCount()
  {
    return $this->getAdapter()->rowCount();
  }

  /**
   * Counts records in a table matching a query
   * @param qcl_data_db_Query|array  $query Query or where condition
   * @return int
   */
  public function countWhere( $query )
  {
    if ( is_array( $query ) )
    {
      $query = new qcl_data_db_Query( array( 'where' => $query ) );
    }
    elseif ( ! $query instanceof qcl_data_db_Query )
    {
      throw new InvalidArgumentException("Argument must be an array or a qcl_data_db_Query object");
    }
    return $this->select( $query );
  }

  /**
   * Returns the number of records in the table
   * @return int
   */
  public function countRecords()
  {
    return $this->getTable()->length();
  }

  //-------------------------------------------------------------
  // Data creation and manipulation
  //-------------------------------------------------------------

  /**
   * Prepares the data for insertion and update
   * @param array $data
   * @return array
   */
  protected function prepareData( $data )
  {
    $preparedData = array();
    $propBeh = $this->getModel()->getPropertyBehavior();
    foreach( $data as $property => $value )
    {
      $column = $this->getColumnName( $property );
      $preparedData[ $column ] = $propBeh->scalarize( $property, $value );
    }

    return $preparedData;
  }

  /**
   * Inserts a data record.
   * @param array $data
   * @return int The id of the created row.
   */
  public function insertRow( $data )
  {
    return $this->getTable()->insertRow( $this->prepareData( $data) );
  }

  /**
   * Updates a record in a table identified by id
   * @param array $data associative array with the column names as keys and
   *  the column data as values.
   * @param int|string  $id  if the id key is not provided in the $data
   *  paramenter, provide it here (optional)
   * @param bool $keepTimestamp If true, do not overwrite the 'modified'
   *  timestamp
   * @return boolean success
   */
  public function update( $data, $id=null, $keepTimestamp= false )
  {

    /*
     * determine id
     */
    if ( $id === null and $data['id'] )
    {
      $id = $data['id'];
      unset( $data['id'] );
    }

    if ( ! $id  )
    {
      $this->getModel()->raiseError("Missing id.");
    }

    /*
     * set modified timestamp to null to set it to the current database update
     * time unless requested not to (i.e. in sync operations)
     */
    if ( ! $keepTimestamp and $this->getModel()->hasProperty("modified") )
    {
      $data['modified'] = null;
    }

    /*
     * do the update
     */
    $query = new qcl_data_db_Query( array(
      'where' => array ( 'id' => $id ) )
    );
    return $this->getTable()->updateWhere(
    $this->prepareData( $data ),
    $this->createWhereStatement( $query ),
    $query->getParameters(),
    $query->getParameterTypes()
    );
  }

  /**
   * Update the records matching the where condition with the key-value pairs
   * @param array $data
   * @param string|array $where
   * @return int Number of affected rows
   */
  public function updateWhere( $data, $where )
  {
    $query = new qcl_data_db_Query( array( 'where' => $where) );
    return $this->getTable()->updateWhere(
    $this->prepareData( $data ),
    $this->createWhereStatement( $query ),
    $query->getParameters(),
    $query->getParameterTypes()
    );
  }

  /**
   * Deletes one or more records in a table identified by id. This
   * does not delete dependencies!
   *
   * @param array|int $ids (array of) record id(s)
   * @return bool Success
   */
  public function deleteRow ( $ids )
  {
    return $this->getTable()->deleteRow( $ids );
  }

  /**
   * Deletes one or more records in the data table matching a where condition.
   * This does not delete dependencies!
   *
   * @param array|string $where where condition
   * @return int Number of affected rows
   */
  public function deleteWhere ( $where )
  {
    $query = new qcl_data_db_Query( array( 'where' => $where ) );
    $sql   = $this->createWhereStatement( $query );
    return $this->getTable()->deleteWhere(
    $sql,$query->getParameters(), $query->getParameterTypes()
    );
  }

  /**
   * Deletes all records from the database.
   * @return int number of affected rows
   */
  public function deleteAll()
  {
    return $this->getTable()->truncate();
  }

  /**
   * Destroys all data connected to the behavior: Deletes the table
   * that holds the model records.
   */
  public function destroy()
  {
    if( $this->getTable()->exists() )
    {
      $this->getTable()->delete();
    }
  }

  //-------------------------------------------------------------
  // convenience methods
  //-------------------------------------------------------------

  /**
   * Forwards log method request to model
   * @param $msg
   * @param $filters
   * @return void
   */
  protected function log( $msg, $filters )
  {
    $this->getModel()->log( $msg, $filters );
  }
}
?>