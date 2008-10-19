<?php  

/*
 * dependencies
 */
require_once "qcl/core/PropertyModel.php";

/**
 * Model base class for models based on a (mysql) database
 * @todo: make this dbms-independent
 * @todo: rename methods "getX()" into "x()" if they refer to 
 * the whole model or all records. "getFoo" should only be used for
 * model data.
 */
class qcl_db_model extends qcl_core_PropertyModel
{

  /**
   * the datasource object instance
   * @var qcl_db_mysql 
   */
  var $db;
  
  /**
   * the name of the table in the database that holds the
   * data of this model
   * @var string
   */
  var $table;

  /**
   * shortcuts to schema xml nodes with information on table links
   * @var array
   */
  var $linkNodes = null;
  
  /**
   * the local key of this table, usually the id property. acces with ::getLocalKey()
   * @var string
   * @access private
   */
  var $localKey;
  
  /**
   * The foreign key of this table in other tables that link to this model.
   * This MUST always be the same key, one model cannot have different foreign key names.
   * Access with ::getForeignKey()
   * 
   * @access private
   * @var string 
   */
  var $foreignKey;

  /**
   * initializes the model
   * @param mixed $datasource Object reference to
   * the datasource object, or null if model is independent of a datasource
   * @return void
   */
  function initialize( $datasource=null )
  {
  
    /*
     * call parent method
     */
    parent::initialize( &$datasource );
    
    /*
     * connect to datasource, if any
     */
    $this->connect( &$datasource );     
    
    /*
     * setup schema. if necessary, create or update tables and import intial data. 
     */
    $this->setupSchema();
    
    /*
     * setup table links
     */
    $this->setupTableLinks();
    

  } 	
	
  /**
   * Connects to database. if this model is connected to 
   * a datasource model, reuse the datasource's database
   * handler
   * @param string|array|null $dsn
   */
  function connect( $dsn=null )
  {
    /*
     * disconnect if connection exists
     */
    if ( is_object($this->db ) )
    {
     $this->db->disconnect();
     unset($this->db); 
    }
    
    /*
     * try to get db handler from datasource object
     */
    $dsModel =& $this->getDatasourceModel();
    if ( is_object($dsModel) and $dsModel->instanceOf( "qcl_datasource_db_model" ) )
    {
      //$this->info( get_class($this) . ": Getting db handler from datasource object...");
      $db =& $dsModel->getDatasourceConnection();
    }
    
    /*
     * otherwise, get a dsn and create new database connection handler
     */
    else
    {
      if ( ! $dsn )
      {
        /*
         * try to connect to connection supplied by controller
         */
        //$this->info( get_class($this) . ": getting connection object from Controller...");
        $controller =& $this->getController();
        $db         =& $controller->getConnection();
      }
      else
      {
        /*
         * connecting to custom dsn by creating new database connection object
         */
        $this->log("Connecting to custom dsn ...");
        
        require_once("qcl/db/mysql.php"); 
        
        $this->log("Connecting to ");
        $this->log($dsn);
        
        /*
         * connect to new database 
         */
        $db =& new qcl_db_mysql($dsn, &$this);
        
        if ( $db->error )
        {
          $this->raiseError( $db->error );
        }
      }
    }
    
    /*
     * store new connection
     */
    $this->db =& $db;  
  }
  
  /**
   * Returns the column name from a property name. 
   * Alias for qcl_db_model::getPropertySchemaName
   * @return string
   * @param string $property Property name
   */
  function getColumnName ( $name )
  {
    return $this->getPropertySchemaName( $name );
  }
   
  /**
   * gets the record id from a reference which can be the id itself or an 
   * identifiying (dot-separated) name
   * @param mixed $ref numeric id or string name
   * @return integer id
   */
  function getIdFromRef($ref)
  {     
    if ( $ref === null or is_numeric ($ref) ) 
    {
      return $ref;
    }
    
    if ( ! is_string ( $ref ) ) 
    {
      $this->raiseError("qcl_db_model::getIdFromRef : integer or string expected, got '$ref'"); 
    }
    
    $row = $this->db->getRow("
      SELECT `{$this->col_id}` 
      FROM `{$this->table}` 
      WHERE `{$this->col_namedId}` = '$ref'  
    ");
    $result=$row[$this->col_id];
    return $result;
   }
   
  //-------------------------------------------------------------
  // Record Retrieval (find... methods)
  //-------------------------------------------------------------   
 
  /**
   * Returns a records by property value
   * @param string $propName Name of property
   * @param string $value Value to find
   * @param string|null[optional] $orderBy  Field to order by
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * properties are to be retrieved
   * @return array recordset
   */
  function findBy( $propName, $value, $orderBy=null, $properties=null )
  {
    $colName = $this->getColumnName( $propName );
    $value   = $this->db->escape($value);
    return $this->findWhere("`$colName`='$value'");
  }

  /**
   * Returns a records that compare to a property value. This is like findBy, but using
   * the "LIKE" operator. Works only with string values
   * @param string $propName Name of property
   * @param string $value Value to find
   * @param string|null[optional] $orderBy  Field to order by
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * properties are to be retrieved
   * @return array recordset
   */
  function findLike( $propName, $value, $orderBy=null, $properties=null )
  {
    $colName = $this->getColumnName( $propName );
    $value   = $this->db->escape($value);
    return $this->findWhere("`$colName` LIKE '$value'");
  }  
  
  
  /**
   * Finds all database records or those that match a where condition. 
   * in the "where" expression the table name is available as the alias "t1", the joined tables as "t2".
   * 
   * @param string|array|null  $where   where condition to match, if null, get all, if array, match properties
   * @param string|array|null[optional] $orderBy Order by property/properties. If an array is given, the last
   * element of the array will be searched for "ASC" or "DESC" and used as sort direction
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all. When using
   * joined tables, the parameter must be an array containing two arrays, the first with the properties of the model table, 
   * and the second with the properties of the joined table.
   * @param string[optional] $link Name of the link in the schema xml. If provided, this will  
   * automatically generate the necessary join query.
   * @return Array Array of db record sets. The array keys are already converted to the property names,
   * so you do not have to deal with column names at all.
   */
  function findWhere( $where=null, $orderBy=null, $properties=null, $link=null )
  {
    /*
     * columns to retrieve
     */
    $columns = "";
    if ( ! $properties )
    {
      $properties = array_keys($this->properties);  
    }
    
    $cols = array();
    
    /*
     * query involves linked tables
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
            $model = $this->getJoinedModelInstance($link); 
            break;
        }
      
        /*
         * replace "*" with all properties
         */
        if ( $properties[$i]== "*" )
        {
          $properties[$i] = $model->getProperties();
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
          * get column name 
          */
         $col = $model->getColumnName($property);
         
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
     * query involves only local table
     */
    else
    {
       /*
       * replace "*" with all properties
       */
      if ( $properties == "*" )
      {
        $properties = $this->getProperties();
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
    $sql = "\n   SELECT $columns \n";
    
    
    /*
     * from
     */
    $sql .= "     FROM `$thisTable` AS t1 \n";
    
    /*
     * join
     */
    if ( $link )
    {
      /*
       * link table
       */
      $linkTable   = $this->getLinkTable($link);
      $localKey    = $this->getLocalKey();
      $foreignKey  = $this->getForeignKey(); 
      
      /*
       * joined model
       */
      $joinedTable =  $this->getJoinedTable($link);
      $joinedModel =& $this->getJoinedModelInstance($link);
      $joinedLKey  =  $joinedModel->getLocalKey();
      $joinedFKey  =  $joinedModel->getForeignKey();
      
      
      if ( $linkTable != $joinedTable )
      {
        /*
         * @todo: this might not be compatible with other than mysql
         */
        $sql .= "     JOIN (`$linkTable` AS l,`$joinedTable` AS t2) \n";
        $sql .= "       ON ( t1.`$localKey` = l.`$foreignKey` AND l.`$joinedFKey` = t2.`$joinedLKey` ) \n";
      }
      else
      {
        $sql .= "     JOIN `$joinedTable` AS t2 ON ( t1.`$localKey` = t2.`$foreignKey` ) \n";
      }
    }
    
    /*
     * where  
     */
    if ( $where )
    {
      $where = $this->toSql($where);
      $sql .= "    WHERE $where \n";
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
      $sql .= "ORDER BY `$orderBy` $direction";
       
    }
    
    /*
     * execute query
     */
    //$this->info($sql);
    $result = $this->db->getAllRecords($sql);
    
    /*
     * store and return result
     */
    $this->currentRecord = count($result) ? $result[0] : null;
    $this->_lastResult   = $result;    
    return $result;
  }

  /**
   * Returns all values of a model property that match a where condition
   * @param string $property Name of property 
   * @param string|null[optional] $where Where condition to match, if null, get all
   * @param string|null[optional] $orderBy Property to order by 
   * @param bool[optional, default false] If true, get only distinct values
   * @return array Array of values
   */
  function findValues( $property, $where=null, $orderBy=null, $distinct=false )
  { 
    $column = $this->getColumnName($property);
    $sql = "SELECT DISTINCT `$column` FROM {$this->table} \n";
    
    if ($where)
    {
      $sql .= "WHERE $where ";
    }
    if ( $orderBy )
    {
      if ( is_string($orderBy) )
      {
        $orderBy = $this->getColumnName($orderBy);
        $sql .= "ORDER BY `$orderBy`";
      }
      else
      {
        $this->raiseError("OrderBy argument must be a string.");    
      }
    }
    return $this->db->getValues($sql);    
  }  

  /**
   * Returns all distinct values of a model property that match a where condition
   * @param string $property Name of property 
   * @param string|null[optional] $where Where condition to match, if null, get all
   * @param string|null[optional] $orderBy Property to order by 
   * @param bool[optional, default false] If true, get only distinct values
   * @return array Array of values
   */
  function findDistinctValues( $property, $where=null, $orderBy=null )
  { 
    return $this->findValues( $property, $where, $orderBy, true );
  }

  
 	/**
   * Find database records by their primary key
   * @param array|int	$ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return Array Array of db record sets
   */
 	function findById( $ids, $orderBy=null, $properties=null )
 	{
 	  if ( ! is_numeric($ids) and !is_array($ids) )
 	  {
 	    $this->raiseError("Invalid parameter id: '$ids'");
 	  }
 	  $rowIds = implode(",", (array) $ids );
 	  if ( ! empty($rowIds) )
 	  {
 	    $result = $this->findWhere(
 	      array('id' => " IN ($rowIds)"), 
 	      $orderBy, $properties 
 	    );
 	    return $result;
 	  }  
 	  $this->raiseError("No id(s) provided.");
 	}

  /**
   * find database records by their named id
   * @param array|string $ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return Array Array of db record sets
   */
  function findByNamedId( $ids, $orderBy=null, $properties=null )
  {
    if ( ! count( (array) $ids ) )
    {
      $this->raiseError("Invalid parameter.");
    }
    
    /*
     * assemble values for IN operator
     */
    $inValues = array();
    foreach ( (array) $ids as $id )
    {
       $inValues[] = "'" . $this->db->escape($id) . "'";
    }
    $inValues = implode(",", $inValues ) ;
    
    /*
     * run query and return result
     */
    $result = $this->findWhere( 
      array( 'namedId' => " IN ($inValues)"), 
      $orderBy, $properties 
    );
    
    return $result;
  } 	
 	
  /**
   * Returns the record in this table that is referred to by 
   * the record from a different table (argument) 
   * @return array
   * @param Array   $record  record from a different table that contains a key corresponding to the foreign id of this table
   * @param Boolean $idOnly if true, return only the value of the foreign key column
   * @todo: one should be able to pass a model object as argument
   */
  function findByForeignKey( $record, $idOnly = false )
  {
    $id = $record[ $this->getForeignKeyColumn() ];
    if ( $idOnly )
    {
      return $id;
    }
    else
    {
      return $this->findById( $id );
    }
  }
  //-------------------------------------------------------------
  // Data creation and manipulation
  //-------------------------------------------------------------   	
  
  /**
   * Converts array data to a 'where' compliant sql string
   * @param string|array $where
   */
  function toSql( $where )
  {
    if ( is_array($where) )
    {
      $sql = "";
      foreach ( $where as $property => $expr )
      {
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
	 * @param string	$namedId
	 * @param int		  $foreignId 
	 * @return int the id of the inserted or existing row 
	 */
	function createIfNotExists( $namedId, $foreignId=null )
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
  function insert( $data )
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
     * @todo: is this compatible with all dbms?
     */
    if ( $this->hasProperty("created")
          and ( $col_created = $this->getPropertyName("created") )
          and ! isset ( $data[$col_created] ) )
    {
      $data[$col_created] = null;
    }
    
    /*
     * insert into database
     */
    $id = $this->db->insert( $this->table, $data );
    
    //$this->info("Created new record #$id in {$this->table} with data: " . var_dump($data,true) );
     
    /*
     * retrive record data (which might contain additional values inserted by the database)
     * if the model has an id column and a new id was returned
     */
    if ( $id ) 
    {
      $this->findById($id);
    }
    
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
  function update ( $data=null, $id=null, $keepTimestamp= false )    
  {    
    /*
     * use cached record data?
     */
    if ($data === null)
    { 
      $data = $this->currentRecord;
    }
    elseif ( $id !== null )
    {
      $data['id'] = $id;
    }
    
    /*
     * convert property names to local aliases
     */
    $data = $this->unschematize($data);
    
    /*
     * set modified timestamp to null to set it to the current database update time
     * unless requested (i.e. in syn operations)
     */
    if ( $this->col_modified && !$keepTimestamp)
    {
      $data[$this->col_modified] = null;
    }    
    
    //$this->info($data);
    
    return $this->db->update( $this->table, $data, $this->col_id );
  }     
  
  
  /**
   * deletes one or more records in a table identified by id
   * @param mixed $ids (array of) record id(s)
   */
  function delete ( $ids )
  {
    $this->db->delete ( $this->table, $ids, $this->col_id );
  } 
  
  /**
   * deletes one or more records in a table matching a where condition
   * @param string  $where where condition
   */
  function deleteWhere ( $where )
  {
    $this->db->deleteWhere ( $this->table, $this->toSql($where) );
  }  	
  
  //-----------------------------------------------------------------------
  // Information on records
  //-----------------------------------------------------------------------
 
  /**
   * Returns number of records in the database
   * @return int
   */
  function countRecords()
  {
    return $this->db->getValue("SELECT COUNT(*)"); 
  }

  /**
   * Returns the lowest id number 
   * @return int
   */
  function minId()
  {
    $idCol = $this->getColumnName('id');
    return $this->db->getValue("SELECT MIN(`$idCol`)"); 
  }
  
  /**
   * Returns the highest id number 
   * @return int
   */
  function maxId()
  {
    $idCol = $this->getColumnName('id');
    return $this->db->getValue("SELECT MAX(`$idCol`)"); 
  }  
  
  
  //-----------------------------------------------------------------------
  // Deprecated methods, will be slowly replaced by new findBy... methods
  //-----------------------------------------------------------------------
  
  /**
   * gets the name of the column that holds the unique (numeric) id of this table
   * @deprecated
   * @return string
   */
  function getIdColumn()
  {
    return $this->getPropertySchemaName("id");
  }

  /**
   * gets all database records optionally sorted by field
   * @param string|null     $orderBy  (optional) order by field
   * @return Array Array of db record sets
   * @deprecated use new findX.. methods 
   */
  function getAllRecords($orderBy=null)
  {  
    return $this->getRecordsWhere(null,$orderBy);
  }  
  
  /**
   * gets the name of the column in other tables that contains a reference to a record in this table (foreign key)
   * @deprecated
   * return string
   */
  function getForeignKeyColumn()
  {
    return $this->getColumnName($this->getForeignKey());
  }

  /**
   * gets all database records or those that match a where condition. 
   * the table name is available as the alias "r" (for records)
   * @param string   $where    where condition to match, if null, get all
   * @param string|array|null[optional]  $orderBy  (optional) order by field. if an array is provided,
   * the last element is can contain the sort direction ("ASC"/"DESC")
   * @param array|null[optional] $fields  Array of fields to retrieve 
   * @return Array Array of db record sets
   * @deprecated use new findX.. methods 
   */
  function getRecordsWhere( $where=null, $orderBy=null, $fields=null)
  {
    
    /*
     * fields to retrieve
     */
    if ( $fields )
    {
      $fields = "`" . implode("`,`", (array) $fields ) . "`";
    }
    else
    {
      $fields = "*"; 
    }
    
    /*
     * select
     */
    $sql = "SELECT $fields FROM {$this->table} AS r \n";
    
    /*
     * where
     */
    if ($where)
    {
      $sql .= "WHERE $where ";
    }
    
    /*
     * order by 
     */
    if ( $orderBy )
    {
      $orderBy  = (array) $orderBy;
      $lastElem = $orderBy[count($orderBy)-1];
      
      $direction = in_array( strtolower($lastElem), array("asc","desc") ) ? 
          array_pop($orderBy) : "";
      
      $orderBy = implode("`,`", $orderBy );
      $sql .= "ORDER BY `$orderBy` $direction"; 
    }
    
    //$this->info($sql);
    
    /*
     * return db records
     */
    return $this->db->getAllRecords($sql);    
  }

  /**
   * gets database records by their primary key
   * @param array|int     $ids    
   * @param string|null   $orderBy  (optional) order by field
   * @param array|null    $fields   (optional) Array of fields to retrieve 
   * @return Array Array of db record sets
   * @deprecated use new findX.. methods 
   */
  function getRowsById( $ids, $orderBy=null, $fields=null )
  {
    if ( ! is_numeric($ids) and !is_array($ids) )
    {
      $this->raiseError("qcl_db_model::getRowsById() : invalid parameter id: '$ids'");
    }
    $rowIds = implode(",", (array) $ids );
    if ( ! empty($rowIds) )
    {
      return $this->getRecordsWhere( "`{$this->col_id}` IN ($rowIds)", $orderBy, $fields );
    }  
  }

  /**
   * gets values of database columns that match a where condition
   * @param string|array    $column   name of column(s) 
   * @param string          $where    where condition to match, if null, get all
   * @param string|null     $orderBy  (optional) order by field
   * @return array Array of values
   * @deprecated use new findX.. methods 
   */
  function getColumnValues($column,$where=null,$orderBy=null)
  { 
    if ( is_array( $column ) )
    {
      $column = implode("`,`",$column);
    }
    
    $sql = "SELECT `$column` FROM {$this->table} \n";
    
    if ($where)
    {
      $sql .= "WHERE $where ";
    }
    if ($orderBy)
    {
      $orderBy = implode("`,`", (array) $orderBy );
      $sql .= "ORDER BY `$orderBy`"; 
    }
    return $this->db->getValues($sql);    
  }

  /**
   * gets all distinct values of database columns that match a where condition
   * @param string|array    $column   name of column(s) 
   * @param string          $where    where condition to match, if null, get all
   * @param string|null     $orderBy  (optional) order by field
   * @return array Array of values
   * @deprecated use new findX.. methods 
   */
  function getDistinctValues($column,$where=null,$orderBy=null)
  { 
    if ( is_array( $column ) )
    {
      $column = implode("`,`",$column);
    }

    $sql = "SELECT DISTINCT `$column` FROM {$this->table} \n";
    
    if ($where)
    {
      $sql .= "WHERE $where ";
    }
    if ($orderBy)
    {
      $orderBy = implode("`,`", (array) $orderBy );
      $sql .= "ORDER BY `$orderBy`"; 
    }
    return $this->db->getValues($sql);    
  }
  
 /**
   * get and cache record by id 
   * @param mixed $id
   * @return Array Db record set
   * @deprecated use new findX.. methods 
   */
  function getById( $id = null )
  {
    if ( $id !== null )
    {
      if ( ! is_numeric($id) )
      {
        $id = "'$id'";
      }
      $this->currentRecord = $this->db->getRow("
        SELECT * 
        FROM `{$this->table}` 
        WHERE `{$this->col_id}` = $id;
      ");           
    }
    else
    {
      if ( ! is_array( $this->currentRecord ) )
      {
        $this->raiseError("No id given, but no record cached!");
      }
    }
    return $this->currentRecord;
  }
  /**
   * get record by its unique string id
   * @deprecated use new findX.. methods
   * @return Array Db record set
   */
  function getByName($name)
  {
    return $this->getByNamedId($name);
  }
   /**
    * get record by its unique string id
    * @deprecated use new findX.. methods t
    * @return Array Db record set
    */
  function getByNamedId($namedId)
  {
    if ( $this->col_namedId )
    {
      $row = $this->db->getRow("
        SELECT * 
        FROM `{$this->table}` 
        WHERE `{$this->col_namedId}` = '$namedId'
      ");
      $this->currentRecord = $row;
      return $row;
    }
    else
    {
      $this->raiseError("qcl_db_model::getByNamedId : model does not have a named id property");  
    }
  }
  /**
   * get record by reference (string id or numeric id)
   * @param mixed $ref numeric id or string name
   * @deprecated use new findX.. methods 
   */
  function getByRef($ref)
  {
    if ( is_numeric ($ref) )
    {
      return $this->getById($ref); 
    }
    elseif ( is_string ($ref) )
    {
      return $this->getByName($ref);
    }
    else
    {
      $this->raiseError("qcl_db_model::getByRef : integer or string expected, got '$ref'");
    }
  }

  /**
   * gets the record in this table that is referred to by the record from a different table (argument) 
   * @return array
   * @param Array   $record  record from a different table that contains a key corresponding to the foreign id of this table
   * @param Boolean $idOnly if true, return only the value of the foreign key column
   * @deprecated use new findX.. methods 
   */
  function getByForeignKey( $record, $idOnly = false )
  {
    $id = $record[ $this->getForeignKeyColumn() ];
    if ( $idOnly )
    {
      return $id;
    }
    else
    {
      return $this->findById( $id );
    }
  }     

  /**
   * gets the value of a column in a record
   * @param string       $column  
   * @param int|string|null[optional] $id Numeric or named id. If omitted, use current record
   * @deprecated use new findX.. methods 
   */
  function getColumnValue( $column, $id = null)
  {
    if ( is_numeric( $id ) )
    {
      // id is numeric
      $row = $this->findById( $id );
    } 
    elseif ( is_string($id) )
    {
      // id is string => namedId
      $row = $this->findByNamedId( $id );
    }
    elseif ( $id === null )
    {
      // operate on current record
      $row = $this->currentRecord;  
    }
    
    /*
     * return value
     */ 
    if ( count ( $row ) )
    {
      return $row[$column];
    }
    else
    {
      if ( $id )
      {
        $this->raiseError("Row '$id' does not exist");  
      }
      elseif ( $id == 0 )
      {
        $this->raiseError("Invalid id (0).");  
      }      
      else
      {
        $this->raiseError("No current record.");  
      }
    }
  }

  /**
   * sets the value of a column in a record 
   * @param string      $column
   * @param mixed       $value
   * @param int|string|null[optional] $id Numeric or named id. If omitted, use current record
   * @deprecated use new setter methods 
   */
  function setColumnValue( $column, $value, $id=null )
  {
    if( $id )
    {
      if ( ! is_numeric( $id ) )
      {
        $namedId = $id;
        $id = $this->getIdByNamedId ( $namedId );
        if ( ! $id )
        {
          $this->raiseError("Invalid named id '$namedId'.");
        }
      }
      // set data
      $data = array();
      $data[$this->col_id] = $id;
      $data[$column] = $value;
      $this->update($data);
    }
    else
    {
      $this->currentRecord[$column]=$value;   
    }
  }
 
  /**
   * gets the value of the property of the current record or a record specified by the id
   * @param string $propName Property name
   * @param int|string $id    if omitted, modify current record cache without updating the database 
   * @deprecated use new findX.. methods 
   */
  function getPropertyValue ( $propName, $id=null )
  {
    /*
     * get from database if id is given
     */
    if ( ! is_null($id) )
    {
      $this->findById($id);
    }
    
    /*
     * return value
     */
    return $this->getProperty( $propName ); 
  }

  /**
   * sets the value of the property of the current record or a record specified by the id
   * @param string $propName Property name
   * @param mixed      $value 
   * @param int|string $id    if omitted, modify current record cache without updating the database 
   * @return void
   * @deprecated use new setter methods 
   */
  function setPropertyValue ( $propName, $value, $id=null )
  {
    /*
     * get from database if id is given
     */
    if ( ! is_null($id) )
    {
      $this->findById($id);
    }
    
    /*
     * set property
     */
    $this->setProperty($propName,$value);
    
    /*
     * save to database if id is given
     */
    if ( ! is_null($id) )
    {
      $this->update();
    }
  }


  /**
   * translates column to property names in the array keys
   * @param array $row
   * @return array
   * @deprecated use new findX.. methods 
   */
  function columnsToProperties ( $row )
  {
    return $this->_columnsToProperties ( $row );
  }
  
  /**
   * translates column to property names in the array keys (implementation)
   * @param array $row
   * @return array
   * @deprecated use new findX.. methods 
   */
  function _columnsToProperties ( $row )
  {
    if ( ! $row )
    {
      $row = $this->currentRecord;
    }
    $translatedRow  = array();
    foreach ( $row as $column => $value )
    {
      $field = $this->getPropertyName($column);
      if ( $field and $value )
      {
        $translatedRow[$field]=$value;  
      }
    }
    return $translatedRow;
  }

  /**
   * translates property to column names
   * @param array $row
   * @return array
   * @deprecated use new findX.. methods 
   */
  function propertiesToColumns ( $row=null )
  {
    return $this->_propertiesToColumns ( $row );
  }
  
  /**
   * translates prperty to column names (implementation)
   * @param array $row
   * @return array
   * @deprecated use new findX.. methods 
   */
  function _propertiesToColumns ( $row=null )
  {
    $translatedRow = array();
    foreach ( $row as $propName => $value )
    {
      $column = $this->getColumnName($propName);
      if ( $column and $value )
      {
        $translatedRow[$column]=$value; 
      }
    }
    return $translatedRow;
  }  
  
  //-------------------------------------------------------------
  // Timestamp management
  //-------------------------------------------------------------  
  
  /**
   * updates the modification date without changing the data
   * @param int|array $ids One or more record ids
   * @return void
   */
  function updateTimestamp( $ids )
  {
    if (! is_numeric($ids) and ! is_array($ids)  )
    {
      $this->raiseError("qcl_db_model::updateTimestamp : invalid id '$ids'");
    }
    
    $ids = implode(",", (array) $ids);
    $this->db->execute(" 
      UPDATE `{$this->table}` 
      SET `{$this->col_modified}` = NOW()
      WHERE `{$this->col_id}` IN ($ids)
    ");
  }
  
  /**
   * gets the current timestamp from the database
   * @return string
   */
  function getTimestamp()
  {
    return $this->db->getValue("SELECT NOW()");
  }
  
  
  /**
   * Calculates the number of seconds passed between the
   * timestamp value parameter. The difference is calculated
   * by the db engine, not by php.
   * @todo Implement in db-class, not here
   * @param string $timestamp Timestamp value
   * @return float 
   */
  function getSecondsSince($timestamp)
  {
    return $this->db->getValue("
      SELECT TIME_TO_SEC(TIMEDIFF(NOW(),'$timestamp'));
    ");  
  }
  
  /**
   * Returns a hash map of ids the modification timestamp
   * @return array
   */
  function getModificationList()
  {
    if ( ! $this->col_modified )
    {
      $this->raiseError("Table {$this->table} has no timestamp column");
    }
    
    $rows = $this->db->getAllRecords("
      SELECT 
        {$this->col_id}       AS id,
        {$this->col_modified} AS timestamp
      FROM {$this->table}
    ") ;  
    $map = array();
    foreach ($rows as $row)
    {
      $map[$row['id']] = $row['timestamp'];
    }
    return $map;
  }  
  
	//-------------------------------------------------------------
  // options: one column which contains a serialized assoc. array
  // containing additional dynamic fields that need not have their
  // own database columns
  //-------------------------------------------------------------

  /**
   * get unserialized options from record
   * @return array
   * @param $id int[optional]
   */
  function getOptions( $id = null )
  {
    return (array) unserialize( $this->getProperty( "options", $id ) );
  }

  /**
   * serializes option array and saves it to record
   * @return 
   * @param $options array
   * @param $id int[optional]
   */
  function setOptions( $options, $id = null )
  {
    if ( ! is_array( $options) or ! count ( $options ) )
    {
      $this->raiseError("Invalid Options.");
    }
    $this->setProperty("options", serialize($options), $id );
  }
  
  /**
   * gets a single option value
   * @return 
   * @param $name string
   * @param $id int/string[optional]
   */
  function getOption($name, $id=null)
  {
    $options = $this->getOptions( $id );
    return $options[$name];
  }

  /**
   * sets a single option value
   * @return 
   * @param $name string
   * @param $value mixed
   * @param $id int/string[optional]
   */
  function setOption($name, $value, $id=null)
  {
    $options = $this->getOptions( $id );
    $options[$name] = $value;
    $this->setOptions( $options, $id );
  }
  
  /**
   * Gets the name of the main data table
   * @return string
   */
  function getTableName()
  {
    return $this->table;
  }
  
  /**
   * returns the prefix for tables used by this 
   * model. defaults to the datasource name plus underscore
   * or an empty string if there is no datasource
   * @return string
   */
  function getTablePrefix()
  {
    $prefix = "";
    $dsModel =& $this->getDatasourceModel();
    if ( $dsModel )
    {
      $prefix = $dsModel->getTablePrefix();
    }
    //$this->info("Prefix for {$this->name} is '$prefix'.");
    return $prefix; 
  }
  
  /**
   * Parse xml schema file and, if it has changed, create or update
   * all needed tables and columns. schema document will be available
   * as $this->schemaXml afterwards
   * @param string $path path of schema xml file or null if default file is used
   * @return void
   */
  function setupSchema($sqltype="mysql")
  {
    $modelXml =& $this->getSchemaXml();
    $doc      =& $modelXml->getDocument();
    
    //$this->info($doc->asXml());

    /*
     * model-level attributes
     */
    $modelAttrs  = $doc->model->attributes();
    
    /*
     * name, should be a dot-separated, java-like class name
     */
    $this->name  = $modelAttrs['name'];
    
    /*
     * class can be specified separately, defaults
     * to name and converted into PHP-style class name
     * foo.bar.Baz => foo_bar_baz
     */
    $this->class = strtolower(str_replace(".","_", either( $modelAttrs['class'], $modelAttrs['name'] ) ) ); 
    
    /*
     * the type can be provided if class is the implementation
     * of a more generic data type
     */
    $this->type  = $modelAttrs['type'];

    /*
     * whether the setup process should upgrade the schema or just use existing tables in
     * whatever schema they are in
     */
    if ( $modelAttrs['upgradeSchema'] == "no" )
    {
      $this->log("Schema document for model name '{$this->name}' is not to be upgraded.");
      return;
    }    

    /*
     * This model doesn't have a table backend
     */
    if ( $modelAttrs['table']  == "no" )
    {
      $this->log("Model name '{$this->name}' has no table backend.");
      return;  
    }
    
    /*
     * The table name is provided as the 'table' property
     * of the class, usually prefixed by the datasource name, 
     * if applicable to the model 
     */
    if ( ! $modelAttrs['table'] )
    {
      $this->raiseError("Model '{$this->name}': No table name!"); 
    }
    $prefix = $this->getTablePrefix();
    $this->table = $prefix . $modelAttrs['table'];
    
    /*
     * Return if table exists and schema hasn't changed
     */
    if ( $this->db->tableExists($this->table) and !$modelXml->hasChanged() ) 
    {
      //$this->info("Schema document for model name '{$this->name}', type '{$this->type}', class '{$this->class}' hasn't changed.");
      return;
    }  
    
    /*
     * update schema
     */
    $this->info("Creating or updating tables for model name '{$this->name}', type '{$this->type}', class '{$this->class}' ...");
    
    /*
     * create main data table if necessary
     */
    $table = $this->table;
    if ( !$this->db->tableExists($table) )
    {
      $this->db->createTable($table);
      $this->schemaXml->hasChanged = true;
    }
   
    /*
     * create alias table
     */
    $aliases  = $doc->model->definition->aliases;
    if ($aliases)
    {
      $aliasMap = array();
      foreach($aliases->children() as $alias)
      {
        $a = $alias->attributes();
        $aliasMap[$a['for']] = $modelXml->getData($alias);
      }
    }
    //$this->info("Aliases:");
    //$this->info($aliasMap);

    /*
     * drop indexes this speeds up things immensely. they will be recreated
     * further dow.
     */
    $indexes =& $doc->model->definition->indexes;
    if ( $indexes )
    {
      foreach ( $indexes->children() as $index )
      {
        $attrs   = $index->attributes();
        $name    = $attrs['name'];
        $this->db->dropIndex($table,$name);
      }
    }
            
    /*
     * properties as columns
     */
    $properties = $doc->model->definition->properties->children(); 
    foreach($properties as $property)
    {
      $attr      = $property->attributes();
      $propName  = $attr['name'];
      $colName   = either($aliasMap[$propName],$propName);
      
      /*
       * save property/alias
       */
      $this->properties[$propName] = $colName;
      
      /*
       * skip if no column definition available
       */
      if ( count($property->children()) == 0)
      {
        continue;
      }
      
      /*
       * @todo: check for <sql type="$sqltype">
       */
      if ( ! is_object($property->sql) )
      {
        $this->warn("Model Property '$propName' has no definition matching the sql type.");
        continue;
      }
      
      $newDef    = $modelXml->getData($property->sql);
      $oldDef    = $this->db->getColumnDefinition($table,$colName);
      
      //$this->info("Property '$propName', Column '$colName':" );
      //$this->info("Old def: '$oldDef', new def:'$newDef'");

      /*
       * skip column if old and new column definition are identical
       * @todo check for position and auto-increment
       */
      if ( strtolower($newDef) == strtolower($oldDef) ) 
      {
        // nothing to do
        continue;
      }
      
      /*
       * position
       */
      $position  = $attr['position'];
      if ( $position )
      {
        $newDef .= " " . $position;
      }      
      
      if ( ! $oldDef )
      {
        // column does not exist, add
        $this->db->addColumn( $table, $colName, $newDef );
      }
      else
      {
        // exists but is different: modifiy
        $this->info( "{$table}.{$colName}: " . $oldDef);
        $this->db->modifyColumn($table,$colName,$newDef);
      }

      /* 
       * unique column
       */
      if ( $attr['unique'] == "yes" )
      {
        $indexName = $colName . "_unique";
        if ( ! count( $this->db->getIndexColumns($table,$indexName) ) ) 
        {
          $this->db->addIndex("unique", $table, $indexName, $colName ); 
        }
      }

      /*
       * index 
       */
      if ( $attr['index'] == "yes" )
      {
        $indexName = $colName;
        $this->info("Creating index for $colName"); 
        if ( ! count( $this->db->getIndexColumns($table,$indexName) ) ) 
        {
          $this->db->addIndex("index", $table, $indexName, $colName ); 
        }
      }       
      
    }
    
    /*
     * contraints 
     */
    $constraints =& $this->schemaXml->getNode("/model/definition/constraints"); 
    if ( $constraints )
    {
      $this->info("Checking constraints...");
      foreach ( $constraints->children() as $constraint )
      {
        $attrs = $constraint->attributes();

        switch ($attrs['type'])
        {
          /*
           * primary key(s)
           */
          case "primary":
            $primaryKeys = array();
            foreach($constraint->children() as $property)
            {
              $a = $property->attributes();
              $propName = $a['name'];
              $primaryKeys[] =  either($aliasMap[$propName],$propName);
            }            
            
            // analyze existing primary key
            $oldPrimaryKeys = $this->db->getPrimaryKey($table);
            
            $this->info("Old primary key: " . implode(",",$oldPrimaryKeys) );
            $this->info("New primary key: " . implode(",",$primaryKeys) );

            if ( $oldPrimaryKeys != $primaryKeys )
            {
              /*
               * drop old if different from model
               */
              if ( $oldPrimaryKeys)
              {
                $this->db->dropPrimaryKey($table);
              }
              
              /*
               * add new primary key
               */
              $this->db->addPrimaryKey($table,$primaryKeys);
            }
            break;
        }
      }
    }
      
    /*
     * indexes
     */
    $indexes =& $doc->model->definition->indexes;
    if ( $indexes )
    {
      foreach ( $indexes->children() as $index )
      {
        $attrs        = $index->attributes();
        $indexType    = strtoupper($attrs['type']);
        switch ($indexType)
        {
          /*
           * fulltext and unique index
           */
          case "FULLTEXT":
          case "UNIQUE":
            
            $indexProperties = array();
            foreach($index->children() as $property)
            {
              $a        = $property->attributes();
              $propName = $a['name'];
              $indexProperties[] = either($aliasMap[$propName],$propName) ;
            }
            
            // analyze existing index
            $indexName    = either($attrs['name'],$indexProperties[0]);
            $this->db->addIndex($indexType,$table,$indexName,$indexProperties);
                      
            break;
        } 
      }
    } 
    
    /*
     * creating link tables
     */
    $links = $doc->model->links;
    if ( is_object($links) and count($links->children() ) )
    {
      $this->info("Creating or updating linked tables...");
      
      $a = $links->attributes();
      
      /*
       * get local key column
       */
      if ( $a['localkey'] )
      {
        $localKey          = either($a['localkey'],$a['localKey']); 
        $localKeyColName   = either($aliasMap[$localKey],$localKey);
      }
      else
      {
        $this->raiseError("The <links> node must have a 'localKey' attribute.");
      }

      /*
       * get foreign key column
       */
      if ( $a['foreignkey'])
      {
        $foreignKey        = either($a['foreignkey'],$a['foreignKey']);
        $foreignKeyColName = either($aliasMap[$foreignKey],$foreignKey);
      }
      else
      {
        $this->raiseError("The <links> node must have a 'foreignKey' attribute.");
      }
      
      /*
       * setup each link 
       */
      foreach ($links->children() as $link)
      {
        $a = $link->attributes();
        
        /*
         * link table internal name
         */
        $name = $a['name'];

        /*
         * create table
         */
        if ( $a['table'])
        {
          $link_table = $this->getTablePrefix() . $a['table'];
        }
        else
        {
          $this->raiseError("A table link must have a 'table' attribute.");
        }
        if ( ! $this->db->tableExists($link_table) )
        {
          $this->db->createTable($link_table);
        }

        /*
         * copy over the column definition from the main table
         */
        $localKeyDef       = $this->db->getColumnDefinition($table,$localKeyColName);
        $foreignKeyDef     = $this->db->getColumnDefinition($link_table,$foreignKeyColName);
        
        //$this->info("Local Key Definition: $localKeyDef");
        //$this->info("Foreign Key Definition: $foreignKeyDef");
        
        /*
         * filter unwanted definition parts 
         */
        $localKeyDef = preg_replace("/auto_increment/i","",$localKeyDef);
        
        /*
         * add or modify column if necessary
         */
        if ($localKeyDef == $foreignKeyDef ) 
        {
          // nothing to do
          continue;
        }
        
        if ( ! $foreignKeyDef )
        {
          // column does not exist, add
          $this->db->addColumn($link_table,$foreignKeyColName,$localKeyDef);
        }
        else
        {
          // exists but is different: modifiy
          $this->db->modifyColumn($link_table,$foreignKeyColName,$localKeyDef);
        }
        
        /*
         * add to unique index in link table, this works only if the table is
         * empty
         */
        if ( $this->db->getValue("SELECT COUNT(*) FROM $link_table") == 0 )
        { 
          $uniqueIndexCols =  $this->db->getIndexColumns($link_table,"link");
          if ( ! in_array($foreignKeyColName,$uniqueIndexCols) )
          {
            /*
             * create new unique index including column
             */
            $uniqueIndexCols[] = $foreignKeyColName;
            $this->db->addIndex("unique",$link_table,"link",$uniqueIndexCols);
          }
        }
        else
        {
          $this->warn("Cannot create unique constraint in $link_table for " . implode(",",$uniqueIndexCols) . ": Table is not empty.");
        }
        
      }
    }
    
    /*
     * import initial data if necessary
     */
    $path = $this->getDataPath();
    if ( file_exists($path) and ( $this->schemaXml->hasChanged() or $this->fileChanged($path) ) )
    {
      $this->info("FIXME: Skipping import ");
      //$this->import($path);
    }
    else
    {
      $this->info("No data to import.");
    }  
    
    /*
     * model- dependent post-setup actions
     * 
     */
    $this->postSetupSchema();
  }

  /**
   * model-dependent post-setup stuff. empty stub to be overridden by subclasses if necessary
   */
  function postSetupSchema() {} 
  //-------------------------------------------------------------
  // Linked tables
  //-------------------------------------------------------------    

  /**
   * Sets up the links to external models
   * @return void
   */
  function setupTableLinks()
  {
    $schemaXml =& $this->getSchemaXml(); 
    $links     =& $schemaXml->getNode("/schema/model/links");
    
    if ( is_object($links) )
    {
      $attrs = $links->attributes();
      $this->localKey   = either($attrs['localKey'],$attrs['localkey']);
      $this->foreignKey = either($attrs['foreignKey'],$attrs['foreignkey']);
      
      $this->linkNodes = array();
      foreach ($links->children() as $linkNode)
      {
        $attrs = $linkNode->attributes();
        /*
         * link table internal name
         */
        $name = $attrs['name'];
        $this->linkNodes[$name] = $linkNode; // don't use copy by reference in PHP4 here, won't work, but $linkNode is a copy anyways because of foreach
      }
    }    
  }  

  
  /**
   * Return the schema xml node containing information on the given link name
   * @param string $name
   * @return SimpleXmlElement 
   */
  function &getLinkNode ( $name )
  {
    if ( ! is_array( $this->linkNodes ) )
    {
      $this->setupTableLinks();
    }
    
    $linkNode = $this->linkNodes[$name];
    
    if ( ! is_object($linkNode) )
    {
      $this->raiseError("No <link> node available for '$name'.");
    }
    return $linkNode;    
  }

  /**
   * Gets the name of the table that joins this model to the
   * joined model for the specific link name
   *
   * @param string $name Name of the link
   * @return string Name of the link table
   */
  function getLinkTable( $name )
  {
    $linkNode =& $this->getLinkNode( $name );
    $attrs= $linkNode->attributes();
    return $attrs['table'];
  }

  /**
   * Gets the class of the model that is joined to this model for the specific link name
   *
   * @param string $Name of the link
   * @return string Name of the joined model
   */
  function getJoinedModelClass( $name )
  {
    $linkNode =& $this->getLinkNode( $name );
    $attrs= $linkNode->attributes();
    return $attrs['model'];
  }   
  
  /**
   * Gets an instance of the model that is joined to this model for the specific link name
   *
   * @param string $Name of the link
   * @return qcl_db_model 
   */
  function &getJoinedModelInstance( $name )
  {
    $modelClass =  $this->getJoinedModelClass( $name );
    $controller =& $this->getController();
    $modelObj   =& $controller->getNew( $modelClass );
    return $modelObj;
  } 
  
  /**
   * Gets the name of the table that is joined to this table for the specific link name
   *
   * @param string $Name of the link
   * @return string Name of the joined table
   */
  function getJoinedTable( $name )
  {
    $joinedModel =& $this->getJoinedModelInstance( $name );
    return $joinedModel->getTableName();
  }  
  
  /**
   * Gets the name of the local key joining the table
   *
   * @return string Name of the local key
   */
  function getLocalKey ()
  {
    return $this->localKey;
  }    

  /**
   * Gets the name of the local key joining the table 
   *
   * @return string Name of the local key
   */
  function getForeignKey ()
  {
    return $this->foreignKey;
  }

  /**
   * Gets the name of the link in the schema xml, given a model instance.
   * Throws an error if the model is not linked.
   *
   * @param qcl_db_model $model
   * @return string
   */
  function getLinkByModel( $model )
  {
    if ( ! is_a($model,"qcl_db_model" ) )
    {
      $this->raiseError("Argument needs to be a qcl_db_model or subclass.");
    }
    
    foreach ( $this->linkNodes as $linkName => $linkNode )
    {
      $attrs = $linkNode->attributes();
      $class = strtolower( str_replace(".","_", $attrs['model'] ) ); 
      if ( is_a($model,$class) )
      {
        return $linkName;
      }
    }
    $this->raiseError("The model '" . get_class($this) . "' is not linked to model '" . get_class($model) . "'.");
  }
  
  
  /**
   * Create a link between this model and a different model identified in a schema xml link
   *
   * @param string|object $first Either the object to link to or the name of the link in the schema xml
   * @param int $linkedId Id of the recordset in the remote model
   * @param int|null $localId[optional, default null] The id of the local dataset. If not given as an argument, 
   * the id of the currently loaded record is used.
   */
  function createLink($first,$linkedId=null,$localId=null)
  {
    /*
     * context data
     */
    $link         =  is_object($first) ? $this->getLinkByModel( $first ) : $first;
    $linkedId     =  is_object($first) ? $first->getId() : $linkedId;
    $localId      =  either($localId, $this->getId() );
    $linkTable    =  $this->getLinkTable($link);
    $foreignkey   =  $this->getForeignKey();
    $joinedModel  =& $this->getJoinedModelInstance($link);
    $jmForeignKey =  $joinedModel->getForeignKey();
    

    if ( ! $localId or ! is_numeric($localId) )
    {
      $this->raiseError("Invalid local id '$localId");
    }    
    
    if ( ! $linkedId or ! is_numeric($linkedId) )
    {
      $this->raiseError("Invalid linked id '$linkedId");
    }
    
    /*
     * link data
     */
    $data = array();
    $data[$foreignkey]   = $localId;
    $data[$jmForeignKey] = $linkedId;
    
    /*
     * insert into table
     */
    $this->db->insert($linkTable, $data);
  }
  
  /**
   * removes a link between this model and a different model identified in a schema xml link
   *
   * @param string $link Name of the link
   * @param int $linkedId Id of the recordset in the remote model
   * @param int|null $localId[optional, default null] The id of the local dataset. If not given as an argument, 
   * the id of the currently loaded record is used.
   */
  function removeLink($link,$linkedId,$localId=null)
  {
    /*
     * context data
     */
    $localId      =  either($localId, $this->getId() );
    $linkTable    =  $this->getLinkTable($link);
    $foreignkey   =  $this->getForeignKey();
    $joinedModel  =& $this->getJoinedModelInstance($link);
    $jmForeignKey =  $joinedModel->getForeignKey();
    
    /*
     * remove from table
     */
    $this->db->deleteWhere($linkTable, "`$foreignkey`=$localId AND `$jmForeignKey`=$linkedId" );
  }  

}	
?>