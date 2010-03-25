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

qcl_import( "qcl_data_model_IQueryBehavior" );
qcl_import( "qcl_data_db_Table" );
qcl_import( "qcl_core_PersistentObject" );

/**
 * Cache for property setup
 */
class qcl_data_model_db_QueryCache
  extends qcl_core_PersistentObject
{
  public $indexes = array();

  public function reset()
  {
    $this->indexes = array();
    $this->savePersistenceData();
  }
}

/**
 * Query behavior for (PDO) database driver.
 * @todo Outsource relations management into a separate RelationsBehavior
 */
class qcl_data_model_db_QueryBehavior
  implements qcl_data_model_IQueryBehavior
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
   * A static persistent cache object to avoid repetetive introspection
   * queries
   * @var qcl_data_model_db_QueryCache
   */
  static private $cache;

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
   * @return qcl_data_datasource_type_db_Model
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
  protected function setDatasourceModel( qcl_data_datasource_type_db_Model $datasourceModel )
  {
    $this->datasourceModel = $datasourceModel;
  }

  /**
   * Getter for table name
   * @return string
   */
  public function getTableName()
  {
    return $this->getTablePrefix() . $this->getModel()->tableName();
  }

  /**
   * Getter for persistent cache object
   * @return qcl_data_model_db_QueryCache
   */
  public function cache()
  {
    if ( ! self::$cache )
    {
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
    require_once "qcl/data/db/Manager2.php";
    return qcl_data_db_Manager2::getInstance();
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
        $this->adapter = $dsModel->getAdapter();
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
      $prefix = qcl_application_Application::getInstance()->getIniValue("database.tableprefix");
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
   * Returns the column name from a property name. By default, return the
   * property name. Override for different behavior.
   * @return string
   * @param string $property Property name
   */
  public function getColumnName( $name )
  {
    $this->getModel()->getPropertyBehavior()->check( $name );
    return $name;
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
    $model = $this->getModel();
    $tableName = $this->getTableName();
    $table = $this->getTable();
    $cache = $this->cache();

    foreach( $indexes as $name => $index )
    {

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
      if ( isset( $cache->indexes[$tableName][$name] )
        and $cache->indexes[$tableName][$name] == array(
          "type"       => $index['type'],
          "properties" => $index['properties']
        )  )
      {
        $model->log("Index hasn't changed according to cached data.",QCL_LOG_TABLES);
        $cache->indexes[$tableName][$name] = $index;
        continue;
      }

      /*
       * determine columns
       */
      $columns = array();
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
   */
  public function queryToSql( qcl_data_db_Query $query)
  {
    $adpt    = $this->getAdapter();
    $propArg = $query->getProperties();

    /*
     * determine the column to select and the names under
     * which the columns should be returned ('properties')
     */
    $columns    = array();
    $properties = array();

    /*
     * if string, split at the pipe and comma characters
     */
    if ( is_string( $propArg ) )
    {
      $properties = explode("|", $propArg );
      if ( count( $properties ) > 1 )
      for ( $i=0; $i<count( $properties ); $i++  )
      {
        $properties[$i] = explode(",",$properties[$i] );
      }
      else
      {
        $properties = explode(",",$properties[0]);
      }
    }
    elseif ( ! is_array( $propArg )
            and ! is_null( $propArg ) )
    {
      $this->raiseError("Invalid 'properties'.");
    }

    $cols = array();

    /*
     * query involves linked tables
     */
    if ( $query->getLink() )
    {
      for ( $i=0; $i<2; $i++ )
      {
        switch( $i )
        {
          case 0:
            $alias="t1";
            $model = $this->getModel();
            break;
          case 1:
            $alias="t2";
            $model = $this->getModel()->getLinkedModelInstance( $query->getLink() );
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
         * construct column query
         */
        foreach ( (array) $properties[$i] as $property )
        {
         /*
          * skip empty parameters
          */
         if ( ! $property ) continue;

         /*
          * get column name of given property
          */
         $col = $adpt->formatColumnName( $this->getColumnName( $property ) );
         //$this->info( $model->className() . ": $property -> $col");

         /*
          * table and column alias
          */
         $str = "$alias.$col";
         if ( $col != $property or $i>0 )
         {
           if ( $i>0 )
           {
             $str .= " AS '$link.$property'";
           }
           else
           {
            $str .= " AS '$property'";
           }
         }
         $cols[] = $str;
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
      if ( $propArg == "*" or $propArg === null )
      {
        $properties = $this->getModel()->properties();
      }
      elseif ( ! is_array( $properties ) )
      {
        $this->raiseError("Invalid properties");
      }

      /*
       * columns, use alias if needed
       */
      $needAlias = false;
      foreach ( $properties as $property )
      {
        $column = $this->getColumnName( $property );
        $columns[] = $column;

        $str = "\n     " . $adpt->formatColumnName( $column );
        if ( $column != $property )
        {
          $str .= " AS '$property'";
          $needAlias = true;
        }
        $cols[] = $str;
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
      $sql .= implode(",",  $cols );
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
     * join
     */
    if ( $query->link )
    {
      /*
       * link table
       */
      $linkTable   = $adpt->formatColumnName( $this->getLinkTable( $query->link ));
      $localKey    = $adpt->formatColumnName( $this->getLocalKey() );
      $foreignKey  = $adpt->formatColumnName( $this->getForeignKey() );

      /*
       * joined model
       */
      $joinedTable = $adpt->formatTableName( $this->getJoinedTable( $query->link ) );
      $joinedModel = $this->getLinkedModelInstance( $query->link );
      $joinedLKey  = $adpt->formatColumnName( $joinedModel->getLocalKey() );
      $joinedFKey  = $adpt->formatColumnName( $joinedModel->getForeignKey() );

      if ( $linkTable != $joinedTable )
      {
        $sql .= "\n     JOIN ($linkTable AS l,$joinedTable AS t2) ";
        $sql .= "\n       ON ( t1.$localKey = l.$foreignKey AND l.$joinedFKey = t2.$joinedLKey ) ";
      }
      else
      {
        $sql .= "\n     JOIN $joinedTable AS t2 ON ( t1.$localKey = t2.$foreignKey ) ";
      }
    }

    /*
     * where
     */
    if ( $query->where )
    {
      $where = $this->createWhereStatement( $query );
      $sql .= "\n    WHERE $where ";
    }

    /*
     * order by
     * FIXME direction handling might be wrong
     */
    if ( $query->orderBy )
    {
      $orderBy  = (array) $query->orderBy;

      /*
       * order direction
       */
      $lastElem = $orderBy[count($orderBy)-1];
      $direction = in_array( strtolower($lastElem), array("asc","desc") ) ?
          array_pop($orderBy) : "";

      /*
       * order columns
       */
      $column = array();
      foreach ( $orderBy as $property )
      {
        $column[] = $adpt->formatColumnName( $this->getColumnName( $property ) );
      }
      $orderBy = implode(",", (array) $column );
      $sql .= "\n    ORDER BY $orderBy $direction";

    }

    /*
     * LIMIT
     */
    if ( $query->limit )
    {
      $sql .=   "\n    LIMIT {$query->limit}";
    }

    return $sql;
  }

  /**
   * Converts data to the 'where' part of a sql statement. If necessary,
   * this will add to the parameter and parameter_types members of the query
   * object.
   *
   * @param qcl_data_db_Query $query
   * @return string
   */
  public function createWhereStatement( qcl_data_db_Query $query )
  {
    $adpt   = $this->getAdapter();
    $where  = $query->getWhere();

    /*
     * if we have a string type where statement, return it.
     */
    if ( is_string( $where ) )
    {
      return $where;
    }
    elseif ( ! is_array( $where ) )
    {
      $this->raiseError("Invalid 'where' data.");
    }

    /*
     * otherwise create sql from it
     */
    $sql    = array();
    foreach( $where as $property => $value )
    {
      $type   = $this->getModel()->getPropertyBehavior()->type( $property );
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
        $value    = $value[1];
      }
      else
      {
        $this->getModel()->raiseError("Property '$property': Invalid value of type " . typeof($value,true) );
      }

      $query->parameters[$param] = $value;
      $sql[]  = "$column $operator $param" ;
    }
    return implode(" AND ", $sql );
  }

  /**
   * Runs a query on the table managed by this behavior.
   * @param qcl_data_db_Query $query
   * @return int number of rows selected
   */
  public function select( qcl_data_db_Query $query)
  {
    $sql = $this->queryToSql( $query );
    $this->getAdapter()->query( $sql, $query->parameters, $query->parameter_types );
    return $this->rowCount();
  }

  /**
   * Selects all database records or those that match a where condition.
   * Takes a qcl_data_db_Query object or an array as argument. If an array
   * is passed, a new qcl_data_db_Query object is created and its 'where'
   * property populated with the array.
   * @param qcl_data_db_Query|array $query
   * @see qcl_data_db_Query
   * @return int number of rows selected
   */
  public function selectWhere( $query )
  {
    if( is_array( $query ) )
    {
      $query = new qcl_data_db_Query( array(
        'where' => $query
      ) );
    }
    elseif ( ! $query instanceof qcl_data_db_Query )
    {
      $this->raiseError("Invalid query data.");
    }
    return $this->select( $query );
  }

  /**
   * If no argument, return the first or next row of the result of the previous
   * query. If a query object is used as argument, run this query beforehand and
   * return the first row. The returned value is converted into the correct type
   * according to the property definition and the property behavior.
   * @see qcl_data_model_db_PropertyBehavior::typecast()
   * @param qcl_data_db_Query $query
   * @return array
   */
  public function fetch( $query = null )
  {
    if ( $query )
    {
      $this->select( $query );
    }
    $result = $this->getAdapter()->fetch();
    if ( ! is_array( $result ) )
    {
      return null;
    }
    else
    {
      $propBehavior = $this->getModel()->getPropertyBehavior();
      foreach( $result as $property => $value )
      {
        $result[$property] = $propBehavior->typecast( $property, $value );
      }
      return $result;
    }
  }

  /**
   * Like fetch(), but allow to pass 'where' data by array.
   * @param qcl_data_db_Query|array $query
   * @return array
   */
  public function fetchWhere( $query )
  {
    $this->selectWhere( $query );
    return $this->fetch();
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
   * Like fetchAll(), but allow to pass 'where' data by array.
   * @param qcl_data_db_Query|array $query
   * @return array
   */
  public function fetchAllWhere( $query )
  {
    $this->selectWhere( $query );
    return $this->getAdapter()->fetchAll();
  }

  /**
   * Returns all values of a model property that match a query
   * @param string $property Name of property
   * @param qcl_data_db_Query|array $query
   * @return array Array of values
   */
  public function fetchValues( $property, $query )
  {
    if( is_array( $query ) )
    {
      $query = new qcl_data_db_Query( array(
        'properties' => $property,
        'where'      => $query
      ) );
    }
    elseif ( $query instanceof qcl_data_db_Query )
    {
      $query->properties = $property;
    }
    else
    {
      $this->raiseError("Invalid query data.");
    }
    $this->select( $query );
    while( $row = $this->fetch() )
    {
      $result[] = $row[$property];
    }
    return $result;
  }

  /**
   * Select an array of ids for fetching
   * @param array $ids
   * @return void
   */
  public function selectIds( $ids )
  {
    if ( ! is_array( $ids) )
    {
      $this->getModel()->raiseError("Invalid argument");
    }
    foreach( $ids as $id )
    {
      if( ! is_numeric($id) )
      {
        $this->getModel()->raiseError("Invalid id '$id'");
      }
    }
    $this->selectWhere( array(
      "id" => array( "IN", "(" . implode(",", $ids ) .")" )
    ) );
  }

  /**
   * Returns a records by property value
   * @param string $propName Name of property
   * @param string|array $values Value or array of values to find. If an array, retrieve all records
   * that match any of the values.
   * @param qcl_data_db_Query|null $query
   * @return array recordset
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

    return $this->selectWhere( $query );
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
   * Counts records in a table matching a where condition.
   * @param string|array  $where where condition
   * @return int
   */
  public function countWhere( $where )
  {
    $query = new qcl_data_db_Query( array( 'where' => $where) );
    $sql   = $this->createWhereStatement( $query );
    return $this->getTable()->countWhere( $sql, $query->parameters, $query->parameter_types );
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
   * Stringifies data using the property behavior
   * @param array $data
   * @return array
   */
  protected function scalarizeData( $data )
  {
    $propBeh = $this->getModel()->getPropertyBehavior();
    foreach( $data as $key => $value )
    {
      $data[$key] = $propBeh->scalarize( $key, $value );
    }
    return $data;
  }

  /**
   * Inserts a data record.
   * @param array $data
   * @return int The id of the created row.
   */
  public function insertRow( $data )
  {
    return $this->getTable()->insertRow( $this->scalarizeData( $data) );
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
      $this->scalarizeData( $data ),
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
      $this->scalarizeData( $data ),
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
   * @param string  $where where condition
   * @return int Number of affected rows
   */
  public function deleteWhere ( $where )
  {
    $query = new qcl_data_db_Query( array( 'where' => $where) );
    $sql   = $this->createWhereStatement( $query );
    return $this->getTable()->deleteWhere(
      $sql,$query->getParameters(), $query->getParameterTypes()
    );
  }

  /**
   * Deletes all records from the database.
   * @return number of affected rows
   */
  public function deleteAll()
  {
    /*
     * delete model data
     */
    return $this->getTable()->truncate();
  }
}
?>