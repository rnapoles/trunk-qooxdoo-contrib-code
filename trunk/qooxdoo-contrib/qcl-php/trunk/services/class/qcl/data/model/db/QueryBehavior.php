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
require_once "qcl/data/db/Table.php";

/**
 * Query behavior for (PDO) database driver
 */
class qcl_data_model_db_QueryBehavior
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
   * the local key of the table, usually the id property. acces with ::getLocalKey()
   * @var string
   * @todo make this private
   */
  protected $localKey;

  /**
   * The foreign key of the table in other tables that link to this model.
   * This MUST always be the same key, one model cannot have different foreign key names.
   * Access with ::getForeignKey()
   *
   * @todo make this private
   * @var string
   */
  protected $foreignKey;

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

  //-------------------------------------------------------------
  // Constructor
  //-------------------------------------------------------------

  /**
   * Constructor
   * @param qcl_data_model_ActiveRecord $model Model affected by this behavior
   * @param string $tableName The name of the talble that this behavi
   * @param qcl_data_datasource_type_db_Model|null Optional $datasource Datasource model
   */
  function __construct( $model )
  {
    /*
     * the model affected by this behavior
     */
    $this->setModel( $model );
  }

  //-------------------------------------------------------------
  // Getters and setters for properties
  //-------------------------------------------------------------

  /**
   * Getter for model affected by this behavior
   * @return qcl_data_model_db_ActiveRecord
   */
  protected function getModel()
  {
    return $this->model;
  }

  /**
   * Setter for model
   * @param qcl_data_model_db_ActiveRecord
   */
  protected function setModel( qcl_data_model_db_ActiveRecord $model )
  {
    $this->model = $model;
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
  protected function setDatasourceModel( $datasourceModel )
  {
    // @todo use interface
    if (  $datasourceModel instanceof qcl_data_datasource_type_db_Model )
    {
      $this->datasourceModel = $datasourceModel;
    }
    else
    {
      $this->raiseError("Invalid datasource model. Must be instance of qcl_data_datasource_type_db_Model object:" . get_class( $datasourceModel ) );
    }
  }

  /**
   * Getter for table name
   * @return string
   */
  protected function getTableName()
  {
    return $this->getModel()->tableName();
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
      $tableName   = $this->getTablePrefix() . $this->getTableName();
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
  public function getColumnName ( $name )
  {
    return $name;
  }

  //-------------------------------------------------------------
  // Record search and retrieval methods (select/fetch methods)
  //-------------------------------------------------------------

  /**
   * Converts a qcl_data_db_Query object to an sql statement
   * @param qcl_data_db_Query $query
   * @return string sql statement
   */
  public function queryToSql( qcl_data_db_Query $query)
  {
    $adpt = $this->getAdapter();

    /*
     * determine the column to select and the names under
     * which the columns should be returned ('properties')
     */
    $columns    = array();
    $properties = array();

    /*
     * if string, split at the pipe and comma characters
     */
    if ( is_string( $query->properties ) )
    {
      $properties = explode("|",$query->properties);
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
    elseif ( ! is_array( $query->properties )
            and ! is_null( $query->properties ) )
    {
      $this->raiseError("Invalid 'properties'.");
    }

    $cols = array();

    /*
     * query involves linked tables
     */
    if ( $query->link )
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
            $model = $this->getModel()->getLinkedModelInstance( $link );
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
         $col = $this->getColumnName( $property );
         //$this->info( $model->className() . ": $property -> $col");

         /*
          * table and column alias
          */
         $str = "$alias.`$col`";
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
      if ( $properties == "*" or $properties === null)
      {
        $properties = $model->properties();
      }

      /*
       * columns, use alias if needed
       */
      foreach ( $properties as $property )
      {
        $column = $this->getColumnName( $property );
        $str .= "\n     " . $adpt->formatColumnName( $col );
        if ( $column != $property )
        {
          $str .= " AS '$property'";
        }
        $columns[] = $column;
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
    $sql .= implode(",",  $cols );

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
      $where = $this->whereDataToSql($query->where);
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

    /*
     * FIXME start with record ...
     */

    return $sql;
  }

  /**
   * Converts array data to a 'where' compliant sql string
   * @param string|array $where
   * @todo rewrite this hacky stuff
   */
  public function createWhereStatement( $where )
  {
    if ( is_array($where) )
    {
      $sql = "";
      $i=0;
      foreach ( $where as $property => $expr )
      {
        $i++;

        /*
         * check if expression has an operator. if not,
         * use "="
         * FIXME this is a hack. rewrite this!!
         */

        if ( is_null($expr) or (
            ! in_array( substr( trim($expr),0,1 ), array( "=","!" ) )
             AND substr( trim($expr),0, 2 ) != "IN"
             AND substr( trim($expr),0, 4 ) != "LIKE" )
        ) {
          /*
           * expression is null
           */
          if ( is_null($expr) )
          {
            $expr = "IS NULL";
          }

          /*
           * else, sql depends on property type
           */
          else
          {
            switch( $this->getPropertyType( $property ) )
            {
              case "int":
                $expr = " = $expr";
                break;

              case "string":
              default:
                $expr = " = '" . addslashes($expr) . "'";
                break;
            }
          }


          /*
           * add boolean operator
           */
          if ( $i < count($where) )
          {
            $expr .= " AND ";
          }
        }

        /*
         * add to sql
         */
        $sql .= "`" . $this->getColumnName($property) . "` " . $expr. " ";
      }
      return $sql;
    }
    else
    {
      return $where;
    }
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
   * return the first row.
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
    return $result;
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
    return $this->getAdapter()->fetchAll();
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
    return $this->getTable()->countWhere(
      $this->createWhereStatement( $where )
    );
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
   * Updates a record in a table identified by id
   * @param array $data associative array with the column names as keys and
   *  the column data as values.
   * @param int|string  $id  if the id key is not provided in the $data
   *  paramenter, provide it here (optional)
   * @param bool $keepTimestamp If true, do not overwrite the 'modified'
   *  timestamp
   * @return boolean success
   */
  public function update ( $data, $id=null, $keepTimestamp= false )
  {
    /*
     * determine id
     */
    if ( $id === null and $data['id'] )
    {
      $id = $data['id'];
      unset( $data['id'] );
    }
    elseif ( ! $id  )
    {
      $this->raiseError("No id given.");
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
    return $this->getTable()->updateWhere(
      $data,
      array ( $this->getIdColumn() => $id )
    );
  }

  /**
   * Update the records matching the where condition with the key-value pairs
   * @param array $data
   * @param string|array $where
   * @return result
   */
  public function updateWhere( $data, $where )
  {
    /*
     * increment transaction id for this model
     */
    $this->incrementTransactionId();

    /*
     * do the update
     */
    return $this->getTable()->updateWhere(
      $data,
      $this->createWhereStatement($where)
    );
  }

  /**
   * Deletes one or more records in a table identified by id
   * @param array|int $ids (array of) record id(s)
   */
  public function deleteRow ( $ids )
  {
    return $this->getTable()->deleteRow( $ids );
  }

  /**
   * Deletes one or more records in a table matching a where condition.
   * This does not delete dependencies!
   * @param string  $where where condition
   * @return void
   */
  public function deleteWhere ( $where )
  {
    return $this->getTable()->deleteWhere (
      $this->createWhereStatement( $where )
    );
  }

}
?>