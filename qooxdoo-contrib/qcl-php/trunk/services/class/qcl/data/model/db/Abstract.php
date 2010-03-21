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
require_once "qcl/data/model/ActiveRecord.php";
require_once "qcl/data/db/__init__.php";
require_once "qcl/util/registry/Persist.php";

/**
 * Abstrac class for models that are based on a relational
 * database.
 * @todo define interface
 */
class qcl_data_model_db_Abstract
  extends qcl_data_model_ActiveRecord
{

  /**
   * The datasource object instance
   * @var qcl_data_db_adapter_Mysql
   * @todo make this a private property
   */
  public $db;

  /**
   * the name of the table in the database that holds the
   * data of this model
   * @var string
   * @todo make this private
   */
  public $table;

  /**
   * the local key of this table, usually the id property. acces with ::getLocalKey()
   * @var string
   * @todo make this private
   */
  public $localKey;

  /**
   * The foreign key of this table in other tables that link to this model.
   * This MUST always be the same key, one model cannot have different foreign key names.
   * Access with ::getForeignKey()
   *
   * @todo make this private
   * @var string
   */
  public $foreignKey;


  protected $propertyMap = array();

  /**
   * Constructor
   * @param qcl_data_datasource_type_db_Model|null Optional $datasource Datasource model
   */
  function __construct( $datasourceModel=null )
  {
    /*
     * call parent constructor
     */
    parent::__construct();

    /*
     *  initialize the model
     */
    $this->init( $datasourceModel );
  }

  /**
   * Initializes the model. This is called from the constructor.
   * @param qcl_data_datasource_type_db_Model|null $datasourceModel Object reference to the datasource object,
   * or null if model is independent of a datasource
   * @return bool Success
   */
  public function init( $datasourceModel=null )
  {
    /*
     * datasource model
     */
    if ( $datasourceModel ) // todo check
    {
      $this->setDatasourceModel( $datasourceModel );
    }

    /*
     * connect to datasource, if any
     */
    $this->connect();

    return true;
  }

  /**
   * Returns the database connection object for this model
   * @return qcl_data_db_adapter_MySql
   */
  public function db()
  {
    if ( ! $this->db )
    {
      $this->raiseError("No database adapter!");
    }
    return $this->db;
  }

  /**
   * Returns the name of the table
   * @return string
   */
  public function table()
  {
    return $this->table;
  }

  /**
   * Getter for database manager singleton object
   * @return qcl_data_db_Manager
   */
  public function getManager()
  {
    return qcl_data_db_Manager::getInstance();
  }

  /**
   * Connects to database. if this model is connected to
   * a datasource model, reuse the datasource's database
   * handler. Otherwise, get connection data from framework
   * @return bool Success
   */
  public function connect()
  {

    /*
     * try to get db handler from datasource object
     */
    $dsModel = $this->getDatasourceModel();
    if ( $dsModel instanceof qcl_data_datasource_type_db_Model )
    {
      //$this->debug( get_class($this) . ": Getting db object from datasource object...");
      $db = $dsModel->getAdapter();
    }

    /*
     * otherwise, get database object from framework
     */
    else
    {
      $db = $this->getManager()->createAdapter();
    }

    /*
     * if no database object at this point, fatal error.
     */
    if (! $db )
    {
      $this->raiseError("No database object!");
    }

    /*
     * store new connection
     */
    $this->db = $db;

    return true;
  }

  /**
   * Returns the name of the column that holds the unique (numeric) id of this table.
   * @return string
   */
  public function getIdColumn()
  {
    return "id";
  }

  /**
   * Returns the column name from a property name.
   * @return string
   * @param string $property Property name
   */
  public function getColumnName ( $name )
  {
    $this->notImplemented(__CLASS__);
  }

 /**
   * Gets the name of the main data table
   * @return string
   */
  public function getTableName()
  {
    return $this->table;
  }

  /**
   * Sets the name of the main data table. This also initializes
   * a transaction id for this table.
   * @param $table Table name
   * @return void
   */
  public function setTableName( $table )
  {
    $this->table = $table;
    $this->initTransactionId();
  }

  /**
   * Set the transaction id for this table to 0 if it hasn't been
   * initialized yet
   * @return void
   */
  public function initTransactionId()
  {
    $this->notImplemented(__CLASS__);
  }

  /**
   * Return the transaction id for this modes
   * @return int
   */
  public function getTransactionId()
  {
    $this->notImplemented(__CLASS__);
  }

  /**
   * Increment the transaction id for this model.
   * @return void
   */
  public function incrementTransactionId()
  {
    $this->notImplemented(__CLASS__);
  }

  /**
   * returns the prefix for tables used by this
   * model. defaults to the datasource name plus underscore
   * or an empty string if there is no datasource
   * @return string
   */
  public function getTablePrefix()
  {
    $prefix = qcl_application_Application::getInstance()->getIniValue("database.tableprefix");
    $dsModel = $this->getDatasourceModel();
    if ( $dsModel )
    {
      $prefix = $dsModel->getTablePrefix();
    }
    //$this->info("Prefix for {$this->name} is '$prefix'.");
    return $prefix;
  }

  /**
   * Whether the model has the given index
   * @param $index
   * @return boolean
   */
  public function hasIndex( $index )
  {
    return in_array( $index, $this->indexes() );
  }

  /**
   * Returns a list of index names of the table
   * which holds the records of this model
   * @return array
   */
  public function indexes()
  {
    $db = $this->db();
    return $db->indexes( $this->table() );
  }

  //-------------------------------------------------------------
  // Record Retrieval (find... methods)
  //-------------------------------------------------------------

  /**
   * gets all database records optionally sorted by field
   * @param string|null     $orderBy  (optional) order by field
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return Array Array of db record sets
   */
  public function findAll($orderBy=null, $properties=null )
  {
    return $this->findWhere(null, $orderBy, $properties );
  }

  /**
   * Returns all values of a model property that match a where condition
   * @param string $property Name of property
   * @param string|null[optional] $where Where condition to match, if null, get all
   * @param string|null[optional] $orderBy Property to order by
   * @param bool[optional, default false] If true, get only distinct values
   * @return array Array of values
   */
  public function findValues( $property, $where=null, $orderBy=null, $distinct=false )
  {
    $column = $this->getColumnName($property);
    $table = $this->table();
    $sql = "SELECT DISTINCT `$column` FROM `{$table}` \n";

    if ( $where )
    {
      $sql .= "WHERE " . $this->toSql( $where );
    }
    if ( ! is_null( $orderBy ) )
    {
      if ( is_string($orderBy) )
      {
        $ob = $this->getColumnName($orderBy);
        if ( $ob )
        {
          $sql .= " ORDER BY `$ob`";
        }
        else
        {
          $this->raiseError("Invalid order by column '$orderBy'.");
        }
      }
      else
      {
        $this->raiseError("OrderBy argument must be a string.");
      }
    }
    return $this->db()->values($sql);
  }

  /**
   * Returns a records by property value
   * @param string $propName Name of property
   * @param string|array $value Value or array of values to find. If an array, retrieve all records
   * that match any of the values.
   * @param string|null[optional] $orderBy  Field to order by
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * properties are to be retrieved
   * @param string[optional] $link Name of the link in the schema xml. If provided, this will
   * automatically generate the necessary join query.
   * @return array recordset
   */
  public function findBy( $propName, $value, $orderBy=null, $properties=null, $link=null  )
  {
    $colName = $this->getColumnName( $propName );
    $values = (array) $value;
    $where = array();
    foreach ( $values as $value )
    {
      $where[]  = "`$colName` = '$value'";
    }
    $where = implode (" OR ", $where );
    return $this->findWhere( $where, $orderBy, $properties, $link );
  }

  /**
   * Returns a records that compare to a property value. This is like findBy, but using
   * the "LIKE" operator. Works only with string values
   * @param string $propName Name of property
   * @param string $value Value to find
   * @param string|null[optional] $orderBy  Field to order by
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * properties are to be retrieved
   * @param string[optional] $link Name of the link in the schema xml. If provided, this will
   * automatically generate the necessary join query.
   * @return array recordset
   * @todo this should be automatic by resolving the type from the schema xml
   */
  public function findLike( $propName, $value, $orderBy=null, $properties=null, $link=null  )
  {
    $colName = $this->getColumnName( $propName );
    $value   = $this->db()->escape($value);
    return $this->findWhere("`$colName` LIKE '$value'", $orderBy, $properties, $link );
  }

  function properties()
  {

    return array_keys( $this->propertyMap );
  }

  /**
   * Finds all database records or those that match a where condition.
   * in the "where" expression the table name is available as the alias "t1", the joined tables as "t2".
   *
   * @param string|array|null  $where 'Where' condition to match. If null, get all. if array,
   * match all key -> value combinations
   * @param string|array|null[optional] $orderBy Order by property/properties.
   * If an array is given, the last element of the array will be searched for "ASC" or "DESC" and
   * used as sort direction.
   * @param string|array|null[optional]  $properties  Array of properties to retrieve or null (default)
   * if all. When using joined tables, the parameter must be an array containing two arrays,
   * the first with the properties of the model table, and the second with the properties of the joined
   * table. Alternatively, you can use the syntax "prop1,prop2,prop3" for an unlinked, and
   * "prop1,prop2,prop3|prop1,prop2,prop3" for a linked model. It is also possible to use "*" or "*|*" to
   * get all properties from unlinked and linked models, respectively.
   * @param string[optional] $link Name of the link in the schema xml. If provided, this will
   * automatically generate the necessary join query.
   * @param bool $distinct Whether only distinct values should be returned
   * @return Array Array of db record sets. The array keys are already converted to the property names,
   * so you do not have to deal with column names at all.
   */
  public function findWhere( $where=null, $orderBy=null, $properties=null, $link=null, $distinct=false )
  {

    /*
     * columns to retrieve
     */
    $columns = "";
    if ( is_null( $properties ) )
    {
      $properties = $this->properties();
    }

    /*
     * split at the pipe and comma characters
     */
    elseif ( is_string($properties) )
    {
      $properties = explode("|",$properties);
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

    elseif ( ! is_array($properties) )
    {
      $this->raiseError("Invalid property parameter.");
    }

    $cols = array();

    /*
     * query involved linked tables
     */
    if ( $link )
    {
      for ( $i=0; $i<2; $i++ )
      {
        switch( $i )
        {
          case 0:
            $alias="t1";
            $model = $this;
            break;
          case 1:
            $alias="t2";
            $model = $this->getLinkedModelInstance( $link );
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
         $col = $model->getColumnName($property);
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
     * query involves only on unlinked table
     */
    else
    {
      /*
       * replace "*" with all properties
       */
      if ( $properties == "*" )
      {
        $properties = $this->properties();
      }

      foreach ( (array) $properties as $property )
      {
        $col = $this->getColumnName($property);
        $str = "`$col`";
        if ( $col != $property )
        {
          $str .= " AS '$property'";
        }
         $cols[] = $str;
      }
    }

    $columns   = implode(",",  $cols );
    $thisTable = $this->getTableName();

    /*
     * select
     */
    $sql = "\n   SELECT ";

    /*
     * distinct values?
     */
    if ( $distinct )
    {
      $sql .= "DISTINCT ";
    }

    /*
     * columns
     */
    $sql .= $columns;

    /*
     * from
     */
    $sql .= "\n     FROM `$thisTable` AS t1 ";

    /*
     * join
     */
    if ( $link )
    {
      /*
       * link table
       */
      $linkTable   = $this->getLinkTable( $link );
      $localKey    = $this->getLocalKey();
      $foreignKey  = $this->getForeignKey();

      /*
       * joined model
       */
      $joinedTable =  $this->getJoinedTable( $link );
      $joinedModel = $this->getLinkedModelInstance( $link );
      $joinedLKey  =  $joinedModel->getLocalKey();
      $joinedFKey  =  $joinedModel->getForeignKey();


      if ( $linkTable != $joinedTable )
      {
        /*
         * @todo this might not be compatible with other than mysql
         */
        $sql .= "\n     JOIN (`$linkTable` AS l,`$joinedTable` AS t2) ";
        $sql .= "\n       ON ( t1.`$localKey` = l.`$foreignKey` AND l.`$joinedFKey` = t2.`$joinedLKey` ) ";
      }
      else
      {
        $sql .= "\n     JOIN `$joinedTable` AS t2 ON ( t1.`$localKey` = t2.`$foreignKey` ) ";
      }
    }

    /*
     * where
     */
    if ( $where )
    {
      $where = $this->toSql($where);
      $sql .= "\n    WHERE $where ";
    }

    /*
     * order by
     */
    if ($orderBy)
    {

      $orderBy  = (array) $orderBy;

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
        $column[] = $this->getColumnName($property);
      }
      $orderBy = implode("`,`", (array) $column );
      $sql .= "\nORDER BY `$orderBy` $direction";

    }

    /*
     * execute query
     */
    //$this->debug($sql);
    $result = $this->db()->getAllRecords($sql);

    /*
     * store and return result
     */
    $this->currentRecord = count($result) ? $result[0] : null;
    $this->lastResult   = $result;
    return $result;
  }



  /**
   * Find database records by their primary key
   * @param array|int $ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @param string[optional] $link Name of the link in the schema xml.
   * @see qcl_data_model_xmlSchema_DbModel::findeWhere() for details
   * @return Array Array of db record sets
   */
  public function findById( $ids, $orderBy=null, $properties=null, $link=null )
  {
    if ( ! is_numeric($ids) and !is_array($ids) )
    {
      $this->raiseError("Invalid parameter id: '$ids'");
    }

    $rowIds = implode(",", (array) $ids );

    if ( ! empty( $rowIds ) )
    {
      $result = $this->findWhere(
        "`id` IN ($rowIds)",
        $orderBy, $properties, $link
      );
      return $result;
    }
    $this->raiseError("No id(s) provided.");
  }

  /**
   * Loads a model record identified by id.
   * Alias of qcl_data_model_xmlSchema_DbModel::findById().
   *
   * @param int $id
   * @return arrray()
   */
  public function load( $id, $requestId=null )
  {
    return $this->findById( (int) $id );
  }

  /**
   * find database records by their named id
   * @param array|string $ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @param string[optional] $link Name of the link in the schema xml.
   * @see qcl_data_model_xmlSchema_DbModel::findeWhere() for details
   * @return Array Array of db record sets
   */
  public function findByNamedId( $ids, $orderBy=null, $properties=null, $link=null )
  {
    if ( !  $ids  )
    {
      $this->raiseError("Invalid parameter.");
    }

    /*
     * assemble values for IN operator
     */
    $inValues = array();
    foreach ( (array) $ids as $id )
    {
       $inValues[] = "'" . $this->db()->escape($id) . "'";
    }
    $inValues = implode(",", $inValues ) ;

    /*
     * run query and return result
     */
    $result = $this->findWhere(
      array( 'namedId' => " IN ($inValues)"),
      $orderBy, $properties, $link
    );

    return $result;
  }


  //-------------------------------------------------------------
  // Data creation and manipulation
  //-------------------------------------------------------------

  /**
   * Converts array data to a 'where' compliant sql string
   * @param string|array $where
   * @todo rename method name and rewrite this
   */
  public function toSql( $where )
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
   * creates a new record and optionally links it to a foreign table (must be implemented in ::create() )
   * @param string  $namedId
   * @param int     $foreignId
   * @return int the id of the inserted or existing row
   */
  public function createIfNotExists( $namedId, $foreignId=null )
  {
    if ( $this->namedIdExists( $namedId ) )
    {
      return $this->getIdByNamedId( $namedId );
    }
    return $this->create( $namedId, $foreignId );
  }

/**
   * Inserts a record into a table and returns last_insert_id()
   * @param array|stdClass $data associative array with the column names as keys and the column data as values
   * @return int the id of the inserted row or 0 if the insert was not successful
   */
  public function insert( $data )
  {
    /*
     * check arguments
     */
    $data = $this->_getArrayData($data);

    /*
     * convert property names to local aliases
     */
    //$data = $this->unschematize($data);

    /*
     * created timestamp by setting it to null
     * @todo is this compatible with all dbms?
     */
    $col_created = $this->getColumnName("created");
    if ( $this->hasProperty("created") and ! isset ( $data[$col_created] ) )
    {
      $data[$col_created] = null;
    }

    /*
     * insert into database
     */
    //$this->debug($data,__CLASS__,__LINE__);
    $table = $this->table();
    $id = $this->db()->insert( $table, $data );

    //$this->debug("Created new record #$id in {$table} with data: " . print_r($data,true) );

    /*
     * retrive record data (which might contain additional values inserted by the database)
     * if the model has an id column and a new id was returned
     */
    if ( $id )
    {
      $this->findById($id);
    }

    /*
     * increment transaction id for this model
     */
    $this->incrementTransactionId();

    /*
     * return id or 0 if the insert was not successful
     */
    return $id;
  }

  /**
   * updates a record in a table identified by id
   * @param array       $data   associative array with the column names as keys and the column data as values
   * @param int|string  $id   if the id key is not provided in the $data paramenter, provide it here (optional)
   * @param bool        $keepTimestamp If true, do not overwrite the 'modified' timestamp
   * @return boolean success
   */
  public function update ( $data=null, $id=null, $keepTimestamp= false )
  {
    /*
     * use cached record data?
     */
    if ( $data === null )
    {
      $data = $this->currentRecord;
    }
    else
    {
      /*
       * insert id if given
       */
      if ( $id !== null )
      {
        $data['id'] = $id;
      }
    }

    /*
     * set modified timestamp to null to set it to the current database update time
     * unless requested (i.e. in sync operations)
     */
    if ( ! $keepTimestamp and $this->hasProperty("modified") )
    {
      $data['modified'] = null;
    }

    /*
     * convert property names to local aliases
     */
    $data = $this->unschematize($data);

    /*
     * increment transaction id for this model
     */
    $this->incrementTransactionId();

    //$this->debug($data);

    return $this->db()->update( $this->table(), $data, $this->getColumnName("id") );
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
    return $this->db()->updateWhere( $this->table(), $data, $this->toSql($where) );
  }

  /**
   * Checks whether a record exists that matches a query
   * @param array|string $where Where query
   */
  public function exists( $where )
  {
    return $this->db()->exists( $this->table(), $this->toSql( $where ) );
  }

  /**
   * If a row with a matching id/namedId exists, replace it. If not, insert data
   * @param array $data
   * @return int id of record
   */
  public function replace( $data )
  {
    /*
     * increment transaction id for this model
     */
    $this->incrementTransactionId();

    /*
     * if the data has an 'id' property, simply update the data. This requires
     * that such a row exists
     */
    if ( $data['id'] )
    {
      $this->load($id);
      if ( $this->foundSomething() )
      {
        $this->update($data);
        return $this->getId();
      }
      else
      {
        return $this->insert( $data );
      }
    }

    /*
     * if there is a 'named id' property, update or insert the row
     */
    elseif ( $data['namedId'] )
    {
      $this->findBy("namedId", $data['namedId'] );
      if ( $this->foundSomething() )
      {
        $this->set( $data );
        $this->save();
        return $this->getId();
      }
      else
      {
        return $this->insert( $data );
      }
    }

    /*
     * otherwise, a "replace" operation is not possible
     */
    else
    {
      $this->raiseError("Cannot replace a row without id or named id.");
    }

    return $this->getId();
  }

  /**
   * Inserts data or updates a record according to the following rules:
   * a) If id property is provided, look for the record with this primary key and
   * update all the other values. If the record does not exist, throw an error.
   * b) If no id is provided, check if a record matching the
   * given key-value pairs exist. If yes, update its 'modified' property. If not,
   * insert the data.
   * Before returning, the found or created record is loaded
   *
   * @param array $data
   * @return int The id of the existing or newly created record
   */
  public function insertOrUpdate( $data )
  {
    /*
     * search for record based on id or row data
     */
    if ( $data['id'] )
    {
      $id = $data['id'];
      $this->load( $id );
      if ( $this->foundNothing() )
      {
        $this->raiseError("Record #$id does not exist");
      }
      else
      {
        $this->update( $data );
      }
    }

    /*
     * if data does not contain an id,
     * look if a matching row exists
     */
    else
    {
      $this->findWhere( $data );

      /*
       * if nothing was found, insert data
       */
      if ( $this->foundNothing() )
      {
        $id = $this->insert( $data );
        if ( $id )
        {
          $this->load( $id );
        }
        else
        {
          $this->raiseError("Cannot insert data " . print_r($data,true) . "- might violate a table constraint.");
        }
      }

      /*
       * else, update timestamp
       */
      else
      {
        $this->updateTimestamp();
      }
    }

    /*
     * return record id
     */
    return $id;
  }

  /**
   * Deletes the currently loaded record or one or more records in a table identified by id
   * @param mixed[optional] $ids (array of) record id(s)
   */
  public function delete ( $ids=null )
  {
    if ( is_null ($ids) )
    {
      $ids = $this->getId();
      if ( ! $ids )
      {
        $this->raiseError("No record loaded that could be deleted!");
      }
    }

    /*
     * delete records
     */
    $this->db()->delete ( $this->table(), $ids );
  }

  /**
   * Deletes one or more records in a table matching a where condition.
   * This does not delete dependencies!
   * @param string  $where where condition
   * @return void
   */
  public function deleteWhere ( $where )
  {
    /*
     * increment transaction id for this model
     */
    $this->incrementTransactionId();

    /*
     * delete
     */
    $this->db()->deleteWhere ( $this->table(), $this->toSql($where) );
  }

  /**
   * Deletes records that match a given property value
   * @param string  $property
   * @param mixed $value
   * @return void
   */
  public function deleteBy ( $property, $value )
  {
    /*
     * increment transaction id for this model
     */
    $this->incrementTransactionId();

    /*
     * delete
     */
    $this->db()->deleteWhere ( $this->table(), $this->toSql( array(
      $property => $value
    ) ) );
  }

  /**
   * Deletes all rows of a table
   * @return void
   */
  public function truncate()
  {
    /*
     * increment transaction id for this model
     */
    $this->incrementTransactionId();

    /*
     * truncate
     */
    $table = $this->table();
    $this->db()->execute("TRUNCATE `{$table}`;");
  }


  /**
   * Counts records in a table matching a where condition.
   * @param string  $where where condition
   * @return int
   */
  public function countWhere ( $where )
  {
    return (int) $this->db()->countWhere ( $this->table(), $this->toSql($where) );
  }

  //-----------------------------------------------------------------------
  // Information on records
  //-----------------------------------------------------------------------

  /**
   * Returns number of records in the database
   * @return int
   */
  public function countRecords()
  {
    $table = $this->table();
    return (int) $this->db()->getValue("SELECT COUNT(*) FROM `$table`");
  }

  /**
   * Returns number of records in the last query resultset
   * @return int
   */
  public function countResult()
  {
    return count( $this->getResult() );
  }

  /**
   * Returns the lowest id number
   * @return int
   */
  public function minId()
  {
    $idCol = $this->getColumnName('id');
    $table = $this->table();
    return $this->db()->getValue("SELECT MIN(`$idCol`) FROM `$this->table`");
  }

  /**
   * Returns the highest id number
   * @return int
   */
  public function maxId()
  {
    $idCol = $this->getColumnName('id');
    $table = $this->table();
    return $this->db()->getValue("SELECT MAX(`$idCol`) FROM `$this->table`");
  }

  //-------------------------------------------------------------
  // Timestamp management
  //-------------------------------------------------------------

  /**
   * updates the modification date without changing the data
   * @param int|array $ids One or more record ids
   * @return void
   * @todo rewrite without raw sql
   */
  public function updateTimestamp( $ids=null )
  {
    if ( is_null($ids) )
    {
      $ids = $this->getId();
    }

    if (! is_numeric($ids) and ! is_array($ids)  )
    {
      $this->raiseError("Invalid argument");
    }

    $ids = implode(",", (array) $ids);
    $modifiedCol = $this->getColumnName("modified");
    $idCol = $this->getIdColumn();
    $table = $this->table();
    $this->db()->execute("
      UPDATE `$table`
      SET `$modifiedCol` = NOW()
      WHERE `$idCol` IN ($ids)
    ");
  }

  /**
   * gets the current timestamp from the database
   * @return string
   */
  public function getTimestamp()
  {
    return $this->db()->getValue("SELECT NOW()");
  }


  /**
   * Calculates the number of seconds passed between the
   * timestamp value parameter. The difference is calculated
   * by the db engine, not by php.
   * @todo Implement in db-class, not here
   * @param string $timestamp Timestamp value
   * @return float
   */
  public function getSecondsSince($timestamp)
  {
    return $this->db()->getValue("
      SELECT TIME_TO_SEC(TIMEDIFF(NOW(),'$timestamp'));
    ");
  }

  /**
   * Returns a hash map of ids the modification timestamp
   * @todo rewrite withoug raw sql
   * @return array
   */
  public function getModificationList()
  {
    $table = $this->table();
    if ( ! $this->hasProperty("modified") )
    {
      $this->raiseError("Table `$table` has no timestamp column");
    }
    $modifiedCol = $this->getColumnName("modified");
    $idCol = $this->getIdColumn();

    $rows = $this->db()->getAllRecords("
      SELECT
        `$idCol` AS id,
        `$modifiedCol` AS timestamp
      FROM `$table`
    ") ;
    $map = array();
    foreach ($rows as $row)
    {
      $map[$row['id']] = $row['timestamp'];
    }
    return $map;
  }
}
?>