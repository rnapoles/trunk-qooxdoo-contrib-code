<?php  
/*
 * dependencies
 */
require_once "qcl/db/AbstractModel.php";

/**
 * Model base class for models based on a (mysql) database
 * @todo make this dbms-independent
 * @todo rename methods "getX()" into "x()" if they refer to 
 * the whole model or all records. "getFoo" should only be used for
 * model data.
 */
class qcl_db_model extends qcl_db_AbstractModel
{

  /**
   * the datasource object instance
   * @var qcl_db_type_Mysql 
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
  var $linkNodes = array();
  
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
   * The persistent model table info object
   * @var qcl_db_ModelTableInfo
   */
  var $modelTableInfo = null; 

  /**
   * initializes the model
   * @param mixed $datasourceModel Object reference to the datasource object, 
   * or null if model is independent of a datasource
   * @return bool Success
   */
  function initialize( $datasourceModel=null )
  {
  
    /*
     * call parent method
     */
    parent::initialize( &$datasourceModel );
    
    /*
     * connect to datasource, if any
     */
    $this->connect( &$datasourceModel );     

    
    /*
     * skip schema setup if no schema xml path
     */
    if ( $this->getSchmemaXmlPath() )
    {
    
      /*
       * setup schema. if necessary, create or update tables and import intial data. 
       */
      $this->setupSchema();
  
      /*
       * setup table links
       */
      $this->setupTableLinks();
      
      /*
       * error?
       */
      if ( $this->getError() )
      {
        return false;
      }
    
    }
    
    return true;

  }
  
  /**
   * Returns the database connection object for this model
   * @return qcl_db_type_Abstract
   */
  function &db()
  {
    return $this->db;
  }
  
  /**
   * Returns the name of the table
   * @return string
   */
  function table()
  {
    return $this->table;
  }
	
  /**
   * Connects to database. if this model is connected to 
   * a datasource model, reuse the datasource's database
   * handler
   * @param string|array|null $dsn
   * @todo don't throw error on failure but let calling
   * function handle connection errors gracefully.
   * @return bool Success
   */
  function &connect( $dsn=null )
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
    if ( is_object($dsModel) and $dsModel->instanceOf( "qcl_datasource_type_db_Model" ) )
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
        $controller =& $this->getController();
        //$this->debug( get_class($this) . ": getting connection object from controller " . get_class($controller));
        $db =& $controller->getConnection(); 
      }
      else
      {
        /*
         * connecting to custom dsn by creating new database connection object
         */
        //$this->debug("Connecting to custom dsn ...");
        
        require_once "qcl/db/type/Mysql.php"; 
        
        //$this->debug("Connecting to ");
        //$this->debug($dsn);
        
        /*
         * connect to new database 
         */
        $db =& new qcl_db_type_Mysql($dsn, &$this);
        
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
    
    return true;
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
   * Returns the record id from a reference which can be the id itself or an 
   * identifiying (dot-separated) name
   * @param mixed $ref numeric id or string name
   * @deprecated
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
   * @param string|array $value Value or array of values to find. If an array, retrieve all records
   * that match any of the values.
   * @param string|null[optional] $orderBy  Field to order by
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * properties are to be retrieved
   * @param string[optional] $link Name of the link in the schema xml. If provided, this will  
   * automatically generate the necessary join query. 
   * @return array recordset
   */
  function findBy( $propName, $value, $orderBy=null, $properties=null, $link=null  )
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
  function findLike( $propName, $value, $orderBy=null, $properties=null, $link=null  )
  {
    $colName = $this->getColumnName( $propName );
    $value   = $this->db->escape($value);
    return $this->findWhere("`$colName` LIKE '$value'", $orderBy, $properties, $link );
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
   * @return Array Array of db record sets. The array keys are already converted to the property names,
   * so you do not have to deal with column names at all.
   */
  function findWhere( $where=null, $orderBy=null, $properties=null, $link=null, $conditions=null )
  {
    /*
     * columns to retrieve
     */
    $columns = "";
    if ( is_null( $properties ) )
    {
      $properties = array_keys($this->properties);  
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
            $model =& $this->getLinkedModelInstance( $link ); 
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
    $sql = "\n   SELECT $columns ";
    
    
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
      $joinedModel =& $this->getLinkedModelInstance( $link );
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
    $result = $this->db->getAllRecords($sql);
    
    /*
     * store and return result
     */
    $this->currentRecord = count($result) ? $result[0] : null;
    $this->_lastResult   = $result;    
    return $result;
  }

  
  
  
  /**
   * Finds all records that are linked to a record in the remote
   * model with the given id.
   *
   * @param int $id
   * @param string $link
   * @param string $orderBy
   * @param mixed $properties
   * @see qcl_db_model::findWhere()
   * 
   */
  function findByLinkedId( $id, $link, $orderBy=null, $properties="*" )
  {
    return $this->findWhere("t2.id=$id", $orderBy, $properties, $link ); 
  }

  /**
   * Finds all records that are linked to a record in the remote
   * model with the given namedId.
   *
   * @param string $namedId
   * @param string $link
   * @param string $orderBy
   * @param mixed $properties
   * @see qcl_db_model::findWhere()
   * 
   */
  function findByLinkedNamedId( $namedId, $link, $orderBy=null, $properties="*" )
  {
    $linkedModel =& $this->getLinkedModelInstance($link);
    $namedIdCol  =  $linkedModel->getColumnName("namedId");
    return $this->findWhere("t2.`$namedIdCol`='$namedId'", $orderBy, $properties, $link ); 
  }  
 
 /**
   * Finds all records that are linked to the given model in 
   * its current state.
   *
   * @param qcl_db_model $model
   * @param string $orderBy
   * @param mixed $properties
   */
  function findByLinkedModel( $model, $orderBy=null, $properties="*" )
  {
    $links = $this->getLinksByModel( &$model ); 
    $id    = $model->getId();
    return $this->findWhere("t2.id=$id", $orderBy, $properties, $links[0] ); 
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
    return $this->db->values($sql);    
  }  


  
 	/**
   * Find database records by their primary key
   * @param array|int	$ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @param string[optional] $link Name of the link in the schema xml. 
   * @see qcl_db_model::findeWhere() for details
   * @return Array Array of db record sets
   */
 	function findById( $ids, $orderBy=null, $properties=null, $link=null )
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
 	      $orderBy, $properties, $link 
 	    );
 	    return $result;
 	  }  
 	  $this->raiseError("No id(s) provided.");
 	}
 	
 	/**
 	 * Loads a model record identified by id.
 	 * Alias of qcl_db_model::findById().
 	 * 
 	 * @param int $id
 	 * @return arrray()
 	 */
 	function load($id)
 	{
    $this->checkInt($id);
 	  return $this->findById($id); 	    
 	}
 
  /**
   * find database records by their named id
   * @param array|string $ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @param string[optional] $link Name of the link in the schema xml.
   * @see qcl_db_model::findeWhere() for details
   * @return Array Array of db record sets
   */
  function findByNamedId( $ids, $orderBy=null, $properties=null, $link=null )
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
       $inValues[] = "'" . $this->db->escape($id) . "'";
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
 	
  /**
   * Returns the record in this table that is referred to by 
   * the record from a different table (argument) 
   * @return array
   * @param Array   $record  record from a different table that contains a key corresponding to the foreign id of this table
   * @param Boolean $idOnly if true, return only the value of the foreign key column
   * @todo one should be able to pass a model object as argument
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
  
  /**
   * Function that needs to be implemented by model if the
   * result set is to be retrieved record by record after
   * calling a search...() method.
   * @return array
   */
  function _nextRecord()
  {
    return $this->db->nextRecord();
  }

  
  //-------------------------------------------------------------
  // Data creation and manipulation
  //-------------------------------------------------------------   	
  
  /**
   * Converts array data to a 'where' compliant sql string
   * @param string|array $where
   * @todo rename method name and rewrite this
   */
  function toSql( $where )
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
   * Deletes the currently loaded record or one or more records in a table identified by id
   * @param mixed[optional] $ids (array of) record id(s)
   */
  function delete ( $ids=null )
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
     * unlink from other models
     */
    foreach( $this->links() as $link )
    {
      $table = $this->getLinkTable( $link );
      $this->db->delete ( $table, $ids, $this->getForeignKey() );
    }    
    
    /*
     * delete records
     */
    $this->db->delete ( $this->table, $ids );
  } 
  
  /**
   * Deletes one or more records in a table matching a where condition.
   * This does not delete dependencies!
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
  function findAll($orderBy=null)
  {  
    return $this->findWhere(null,$orderBy);
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
   * translates column to property names in the array keys
   * @param array $row
   * @return array
   * @deprecated use new findX.. methods 
   */
  function columnsToProperties( $row )
  {
    return $this->_columnsToProperties ( $row );
  }
  
  /**
   * translates column to property names in the array keys (implementation)
   * @param array $row
   * @return array
   * @deprecated use new findX.. methods 
   */
  function _columnsToProperties( $row )
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
  function propertiesToColumns( $row=null )
  {
    return $this->_propertiesToColumns ( $row );
  }
  
  /**
   * translates prperty to column names (implementation)
   * @param array $row
   * @return array
   * @deprecated use new findX.. methods 
   */
  function _propertiesToColumns( $row=null )
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
   * @todo rewrite without raw sql
   */
  function updateTimestamp( $ids=null )
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
    $this->db->execute(" 
      UPDATE `{$this->table}` 
      SET `$modifiedCol` = NOW()
      WHERE `$idCol` IN ($ids)
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
   * @todo rewrite withoug raw sql
   * @return array
   */
  function getModificationList()
  {
    if ( ! $this->hasProperty("modified") )
    {
      $this->raiseError("Table {$this->table} has no timestamp column");
    }
    $modifiedCol = $this->getColumnName("modified");
    $idCol = $this->getIdColumn();    
    
    $rows = $this->db->getAllRecords("
      SELECT 
        `$idCol` AS id,
        `$modifiedCol` AS timestamp
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
   * @param bool $forceUpgrade If true, upgrade schema even if schema xml file hasn't changed
   * @return bool True if tables have been upgraded, null if no upgrade has been attempted, false if there was an error
   */
  function setupSchema( $forceUpgrade=false )
  {

     $this->log("Setting up model schema for '" .$this->className() . "' ...", "propertyModel" );
    
    /*
     * return if no database connection is present
     */
    if ( ! $this->db )
    {
      $this->raiseError("Cannot setup schema - no database connection.");
    }
    
    /*
     * sql type
     */
    $sqltype    =  $this->db->getType();
    
    /*
     * the schema xml object and document
     */
    $modelXml   =& $this->getSchemaXml();
    $doc        =& $modelXml->getDocument();
    
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
    if ( $modelAttrs['upgradeSchema'] == "no" and ! $forceUpgrade )
    {
      $this->log("Schema document for model name '{$this->name}' is not to be upgraded.","propertyModel");
      return null;
    }    

    /*
     * This model doesn't have a table backend
     */
    if ( $modelAttrs['table']  == "no" )
    {
      $this->log("Model name '{$this->name}' has no table backend.","propertyModel");
      return null;  
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
     * Wheter the table for this model exists already
     */
    $tableExists  = $this->db->tableExists($this->table);
    
    /*
     * Get the modelTableInfo persistent object to look up if this
     * table has been initialized already. To avoid an indefinitive loop,
     * the qcl_persistence_db_Model used by qcl_db_ModelTableInfo must
     * be especially treated. You can upgrade its schema only be deleting
     * the table.
     */
    $modelTableInfo = null;
    if ( $this->instanceOf("qcl_persistence_db_Model") and $tableExists )
    {
      $isInitialized = true;
      $forceUpgrade  = false;
    }
    else
    {
      /*
       * cache object globally and in each object to avoid
       * multiple instantiation of the same object
       */
      if ( ! $this->modelTableInfo )
      {
        require_once "qcl/db/ModelTableInfo.php";
        global $qclDbModelTableInfo;
        if ( ! $qclDbModelTableInfo )
        {
          $qclDbModelTableInfo = new qcl_db_ModelTableInfo(&$this); // pass by reference doesn't work, so two objects will always exist 
        }
        $this->modelTableInfo =& $qclDbModelTableInfo; 
      }
      $datasourceModel =& $this->getDatasourceModel();
      $isInitialized   = $this->modelTableInfo->isInitialized( &$datasourceModel, $this->table, $this->class, $this->schemaTimestamp );
    }
       
    /*
     * Return if table exists and schema hasn't changed for the table
     */
    
    if ( $tableExists and $isInitialized and ! $forceUpgrade ) 
    {
      $this->log(
        "Schema document for model name '{$this->name}', ".
        "type '{$this->type}', class '{$this->class}' hasn't changed.",
        "propertyModel"
      );
      return null;
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
   
    $this->log("Creating aliases...","propertyModel");
    
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

    
    $this->log("Setting up table columns...","propertyModel");
    
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
       * @todo check for <sql type="$sqltype">
       */
      if ( ! is_object( $property->sql ) )
      {
        $this->warn("Model Property '$propName' has no definition matching the sql type.");
        continue;
      }

      /*
       * descriptive definition of the existing table schema,
       */
      $descriptiveDef = $this->db->getColumnDefinition($table,$colName);
      
      /*
       * normative definition of how the table schema should look like
       */
      $normativeDef = trim($modelXml->getData($property->sql)); 
      
      //$this->debug("Property '$propName', Column '$colName':");
      //$this->debug("Old def: '$descriptiveDef', new def:'$normativeDef'");

      /*
       * Skip column if descriptive and normative column definition are identical.
       * removing "on update" part since this won't be present in the 
       * descriptive definition and "default null" since this is the default anyways.
       * @todo check for position and auto-increment
       */
      $sql1 = trim(preg_replace("/on update .+$|default null/", "", strtolower( $normativeDef ) ) );
      $sql2 = trim(preg_replace("/default null/",               "", strtolower( $descriptiveDef ) ) ); 
      
      ////$this->debug("'$sql1' == '$sql2'? ");
      
      /*
       * continue with the next property if nothing has changed
       */
      if ( $sql1 == $sql2 ) continue; 
      
      /*
       * Dropping indexes before changing the schema speeds up things immensely. 
       * They will be recreated further dow. This must only be done at
       * the first change of schema and not at all if nothing changes.
       */
      if ( ! $indexes )
      {
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
      }      
      
      /*
       * position
       */
      $position  = $attr['position'];
      if ( $position )
      {
        $normativeDef .= " " . $position;
      }      
      
      /*
       * If column does not exist, add it
       */      
      if ( ! $descriptiveDef )
      {
        $this->db->addColumn( $table, $colName, $normativeDef );
      }
      
      /*
       * otherwise, if it exists but is different: modifiy it
       */      
      else
      {
        $this->db->modifyColumn($table,$colName,$normativeDef);
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
      
      $this->log("Checking constraints...","propertyModel");
      
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
            
            //$this->debug("Old primary key: " . implode(",",$oldPrimaryKeys) );
            //$this->debug("New primary key: " . implode(",",$primaryKeys) );

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
      $this->log("Creating indexes ...","propertyModel");
      
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
    
    $this->log( "Model has " . ( is_object($links) ? count($links->children() ) : "no" ) . " links.", "propertyModel" );    
    
    if ( is_object($links) and count($links->children() ) )
    {
      $this->log("Creating or updating linked tables...","propertyModel");
      
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
      foreach ( $links->children() as $link )
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
        $localKeyDef       = $this->db->getColumnDefinition( $table, $localKeyColName );
        $foreignKeyDef     = $this->db->getColumnDefinition( $link_table, $foreignKeyColName );
        
        //$this->debug("Local Key Definition: $localKeyDef");
        //$this->debug("Foreign Key Definition: $foreignKeyDef");
        
        /*
         * filter unwanted definition parts 
         */
        $localKeyDef = trim(preg_replace("/auto_increment/i","",$localKeyDef));
        
        /*
         * add or modify column if necessary
         */
        if ( ! $foreignKeyDef )
        {
          /*
           * column does not exist, add
           */
          $this->db->addColumn($link_table,$foreignKeyColName,$localKeyDef);
        }
        elseif ( strtolower($localKeyDef) != strtolower($foreignKeyDef) ) 
        {
          /*
           * exists but is different: modifiy
           */
          $this->db->modifyColumn($link_table,$foreignKeyColName,$localKeyDef);
        }
        
        /*
         * further linked models
         */
        if ( count($link->children()) )
        {
          foreach( $link->children() as $linkedModel )
          {
            $a = $linkedModel->attributes();
            
            /*
             * share datasource?
             */
            $shareDatasource = either($a['sharedatasource'],$a['shareDatasource']);
            
            /*
             * linked model
             */
            $modelName = str_replace(".","_",$a['name']);
            if ( ! $modelName )
            {
              $this->raiseError("linkedModel node has no 'name' attribute.");
            }
            
            $this->log("Linking $modelName ...","propertyModel");
            $this->includeClassfile($modelName);

            if ( $shareDatasource != "no" )
            {
              $model =& new $modelName( &$this, &$datasourceModel );  
            }
            else
            {
              $model =& new $modelName( &$this );
            }
            
            /*
             * get foreign key
             */
            $modelTable = $model->table;
            $fkCol      = $model->getForeignKey();
            $fkDef      = $model->db->getColumnDefinition( $modelTable, "id" );
            $fkDef      = trim( str_replace("auto_increment","",$fkDef));
            
            if ( ! $fkDef )
            {
              $this->raiseError("Cannot get definition for 'id' in table '$modelTable'.");
            } 
            
            /*
             * add or modify column
             */
            $existing = $this->db->getColumnDefinition($link_table,$fkCol);
            if ( ! $existing )
            {
              $this->db->addColumn( $link_table, $fkCol, $fkDef );
            }
            elseif ( strtolower($existing) != strtolower($fkDef) )
            {
              $this->db->modifyColumn( $link_table, $fkCol, $fkDef );
            }
          }
        }
        
        
        /*
         * add to unique index in link table, this works only if the table is
         * empty
         * 
         * disabled momentarily because it doesn't seem to work right
         *
        if ( $this->db->getValue("SELECT COUNT(*) FROM $link_table") == 0 )
        { 
          $uniqueIndexCols =  $this->db->getIndexColumns($link_table,"link");
          if ( ! in_array($foreignKeyColName,$uniqueIndexCols) )
          {
            /*
             * create new unique index including column
             *
            $uniqueIndexCols[] = $foreignKeyColName;
            $this->db->addIndex("unique",$link_table,"link",$uniqueIndexCols);
          }
        }
        else
        {
          $this->warn("Cannot create unique constraint in $link_table for " . implode(",",$uniqueIndexCols) . ": Table is not empty.");
        }*/
        
      }
    }
    
    /*
     * Import initial data if necessary
     */
    $path = $this->getDataPath();
    if ( ! $tableExists and file_exists($path) )
    {
      $this->log("Importing data ...","propertyModel");
      $this->import($path);
      
      $this->log("Importing link data ...","propertyModel");
      $this->importLinkData();
    }
    else
    {
      $this->log("No data to import.","propertyModel");
    }
    
    /*
     * register table initialized for the datasource
     */
    if ( $this->modelTableInfo )
    {
      $this->modelTableInfo->registerInitialized(&$datasourceModel, $this->table, $this->class, $this->schemaTimestamp);
    }
    
    /*
     * model- dependent post-setup actions 
     */
    return $this->postSetupSchema();
  }

  /**
   * Model-dependent post-setup stuff. empty stub to be overridden by subclasses if necessary
   * @return bool True if upgrade has been successful, false on error
   */
  function postSetupSchema() 
  {
    return true;
  } 
  
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
   * Returns an array of SimpleXmlElements that contain 
   * link information
   * @return array
   */
  function &getLinkNodes()
  {
    if ( ! $this->linkNodesn )
    {
      $this->setupTableLinks();
    }
    return $this->linkNodes;
  }
  
  /**
   * Return the schema xml node containing information on the given link name
   * @param string $name
   * @return SimpleXmlElement 
   */
  function &getLinkNode ( $name=null )
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
    return $this->getTablePrefix() . $attrs['table']; 
  }

  /**
   * Gets the class of the model that is joined to this model for the specific link name.
   *
   * @param string $Name of the link
   * @return string Name of the joined model or false if no such name could be found
   */
  function getLinkedModelClass( $name )
  {
    $linkNode =& $this->getLinkNode( $name );
    $attrs = $linkNode->attributes();
    $modelName = $attrs['model'];

    if ( ! $modelName and $linkNode->linkedModel )
    {
      $children  = $linkNode->children();
      $attrs     = $children[0]->attributes();
      $modelName = $attrs['name'];      
    }
    if ( $modelName )
    {
      return str_replace(".","_",$modelName);  
    }
    return false;
  }   
  
  /**
   * Gets an instance of the model that is joined to this model for the specific link name
   *
   * @param string $Name of the link
   * @return qcl_db_model Model instance or false if no model could be found.
   */
  function &getLinkedModelInstance( $name )
  {
    $modelClass =  $this->getLinkedModelClass( $name );
    if ( $modelClass )
    {
      $controller =& $this->getController();
      $dsModel    =& $this->getDatasourceModel();
      
      /*
       * load model code
       */
      $controller->includeClassfile( $modelClass );
      
      /*
       * create new model instance, passing controller and
       * datasource model to it
       */
      $modelObj =& new $modelClass(&$controller,&$dsModel);
      return $modelObj;
    }
    return false;
  } 
  
  /**
   * Gets the name of the table that is joined to this table for the specific link name
   *
   * @param string $Name of the link
   * @return string Name of the joined table
   */
  function getJoinedTable( $name )
  {
    $joinedModel =& $this->getLinkedModelInstance( $name );
    return $joinedModel->getTableName();
  }  
  
  /**
   * Gets the name of the local key joining the table
   *
   * @return string Name of the local key
   */
  function getLocalKey()
  {
    return $this->localKey;
  }    

  /**
   * Gets the name of the local key joining the table 
   *
   * @return string Name of the local key
   */
  function getForeignKey()
  {
    return $this->foreignKey;
  }

  /**
   * Returns the name of the link in the schema xml, given a model instance.
   * Throws an error if the model is not linked.
   *
   * @param qcl_db_model $model
   * @return mixed Array if link(s) ar found, false if not found
   */
  function getLinksByModel( $model )
  {
    $linkNodes = $this->getLinkNodes();
    
    if ( ! is_array( $linkNodes ) or ! count($linkNodes) )
    {
      $this->raiseError("Model has no links.");
    }
    
    if ( ! is_a($model,"qcl_db_model" ) )
    {
      $this->raiseError("Argument needs to be a qcl_db_model or subclass.");
    }
   
    $links = array();
    
    /*
     * is the other model the main link for this model?
     */
    foreach ( $linkNodes as $linkName => $linkNode )
    {
      
      $a = $linkNode->attributes(); 
      if ( $model->instanceOf( $a['model'] ) )
      {
        $links[] =  $linkName;
      }
      
      /*
       * or is it a model which is a secondary link ?
       */
      if ( count( $linkNode->children() ) )
      {
        foreach ( $linkNode->children() as $linkedModelNode )
        {
          $a = $linkedModelNode->attributes();
          if ( $model->instanceOf( $a['name'] ) )
          {
             $links[] = $linkName;
          }
        }
      }
    }
    return count( $links ) ? $links : false;
  }
  
  /**
   * Return the names of all the links of this model
   * @return array
   */
  function links()
  {
    return array_keys( $this->linkNodes ); 
  }
  
  /**
   * Create a link between this model and a different model.
   * This method is for links that connect two models only. For three or more models, use
   * @see qcl_db_model::unlinkFrom()
   *
   * @param string|object $first Either the object to link to or the name of the link in the schema xml
   * @param int[optional] $linkedId Id of the recordset in the remote model. if not given, the id
   * of the remote model passed as first argument is used.
   * @param int[optional] $localId The id of the local dataset. If not given as an argument, 
   * the id of the currently loaded record is used.
   */
  function createLink($first, $linkedId=null, $localId=null, $remove=false)
  {
    /*
     * context data
     */
    if ( is_a( $first,"qcl_db_model" ) )
    {
      $links = $this->getLinksByModel( &$first );
    }
    elseif ( ! $first or ! is_string( $first ) )    
    {
      $this->raiseError("Invalid first parameter.");
    }
    
    /*
     * linked id
     */
    if ( ! $linkedId )
    {
      if ( is_object( $first ) and $first->instanceOf("qcl_db_model") )
      {
        $linkedId = $first->getId();  
      }
      else
      {
        $this->raiseError("Invalid linked object or local id.");
      }
    }

    /*
     * local id
     */
    if ( ! $localId )
    {
      $this->info("Local id: '$localId''");
      $localId = $this->getId();
    } 
    if ( ! $localId or ! is_numeric($localId) )
    {
      $this->raiseError("Invalid local id '$localId");
    }
        
    /*
     * linked table
     */
    $linkTable =  $this->getLinkTable( $links[0] );
    
    /*
     * foreign key of this model
     */
    $foreignkey =  $this->getForeignKey();
    
    /*
     * the joined model
     */
    if ( is_object($first) )
    {
      $joinedModel =& $first;
    }
    else
    {
      $joinedModel =& $this->getLinkedModelInstance( $links[0] );
    }
    
    /*
     * the foreign key of the joined model
     */
    $jmForeignKey =  $joinedModel->getForeignKey();
    
    /*
     * link data
     */
    $data = array();
    $data[$foreignkey]   = $localId;
    $data[$jmForeignKey] = $linkedId;
    
    
    if ( $remove )
    {
      /*
       * remove from table
       */
      return $this->db->deleteWhere($linkTable, "`$foreignkey`=$localId AND `$jmForeignKey`=$linkedId" );      
    }
    else
    {
      /*
       * insert into table
       */
      return $this->db->insert($linkTable, $data);
    }
  }
  
  
  /**
   * Removes a link between this model and a different model.
   * This method is for links that connect two models only. For three or more models, use
   * @see qcl_db_model::unlinkFrom()
   *
   * @param string|object $first Either the object to unlink from or 
   * the name of the link in the schema xml.
   * @param int[optional] $linkedId Id of the recordset in the remote model. if not given, the id
   * of the remote model passed as first argument is used.
   * @param int[optional] $localId The id of the local dataset. If not given as an argument, 
   * the id of the currently loaded record is used.
   */
  function removeLink( $first, $linkedId, $localId=null )
  {
    return $this->createLink( &$first, $linkedId, $localId, true);
  }
  
  /**
   * Link a variable number of models
   * @param qcl_db_model $model2 Model
   */
  function linkWith()
  {
    $params =& func_get_args();
    array_unshift( $params, "link" );
    return call_user_func_array( array( &$this, "_modifyLink" ), $params);
  }

  /**
   * Unlink a variable number of models
   * @param qcl_db_model $model2 Model
   * @param bool
   */
  function unlinkFrom()
  {
    $params =& func_get_args();
    array_unshift( $params, "unlink" );
    return call_user_func_array( array( &$this, "_modifyLink" ), $params);
  }  
  
  /**
   * Remove all links from the current model instance ta variable number of models
   * @param qcl_db_model $model2 Model
   * @param bool
   */
  function unlinkFromAll()
  {
    $params =& func_get_args();
    array_unshift( $params, "unlinkFromAll" );
    return call_user_func_array( array( &$this, "_modifyLink" ), $params);
  }    
  
  /**
   * Checks whether models are linked
   * @param qcl_db_model $model2 Model
   * @param bool
   */
  function isLinkedWith()
  {
    $params =& func_get_args();
    array_unshift( $params, "data" );
    $data = call_user_func_array( array( &$this, "_modifyLink" ), $params);
    $linked = true;
    foreach( $data as $table => $row )
    {
      /*
       * where query
       */
      $where = array();
      foreach ( $row as $key => $value )
      {
        $where[] = "`$key`=$value";
      }
      $where = implode(" AND ", $where );
      
      /*
       * check if link exists
       */
      if ( ! $this->db->exists($table,$where) ) $linked = false;
    }
    return $linked;
  }    
  
  /**
   * Create or delete a link a variable number of models
   * @param qcl_db_model $model2 Model to link with
   * @param qcl_db_model $model3 Optional model to link with
   * @param qcl_db_model $model4 Optional model to link with
   */
  function _modifyLink()
  {    
    /*
     * action
     */
    $action = $that  =& func_get_arg(0);
    
    /* 
     * this model 
     */
    $thisId      =  $this->getId();
    $thisFKey    =  $this->getForeignKey() or $this->raiseError( $this->name(). " has no foreign key!" );;

    /*
     * data to insert into link model
     */    
    $data  = array();
    $links = null;
    
    for( $i=1; $i < func_num_args(); $i++ )
    {
      
      /*
       * remote model
       */
      $that  =& func_get_arg($i);
      if ( ! is_a( $that, __CLASS__ ) )
      {
        $this->raiseError("Invalid parameter $i. Must be a " . __CLASS__  . " but is a '" . typeof( $that, true ) . "'.'" ); 
      } 
      
      if( $action != "unlinkFromAll" )
      {
        $thatId   =  $that->getId();  
      }
      $thatFKey =  $that->getForeignKey() or $this->raiseError( $that->name(). " has no foreign key!" );
      
      /*
       * links to this model, defined by the first argument
       */
      if ( ! $links )
      {
        $l =  $this->getLinksByModel( &$that ); 
        if ( ! $l )
        {
          $this->raiseError("Model '" . $this->className() . "' is not linked to model '" . $that->className() . "'.");
        }
        $links = $l;
      }
      
      
      /*
       * create link entries
       */
      foreach ( $links as $link )
      {
        $linkTable   = $this->getLinkTable( $link );
        $data[$linkTable][$thisFKey] = $thisId;
        $data[$linkTable][$thatFKey] = $thatId;
      }
    }
    
    /*
     * return data only
     */
    if ( $action == "data" ) return $data;
    
    /*
     * Insert or delet data. 
     */
    foreach ( $data as $table => $row )
    {
      /*
       * where query
       */
      $where = array();
      foreach ( $row as $key => $value )
      {
        $where[] = "`$key`=$value";
      }
      $where = implode(" AND ", $where );
      
      switch ( $action )
      {
        /*
         * link the models
         */
        case "link":
          /* Since we cannot create unique
           * indexes dynamicall, we check first before
           * inserting
           */
          if ( $this->db->exists($table, $where) )
          {
            $this->warn("Table $table: $where already exists.");
          }
          else
          {
            $id = $this->db->insert( $table, $row );
          }
          break;
        
        /*
         * unlink the models
         */
        case "unlink":
          $this->db->deleteWhere( $table, $where );
          break;

        /*
         * unlink the models
         */
        case "unlinkFromAll":
          $this->db->deleteWhere( $table, "`$thisFKey`=$thisId" );
          break;          
          
        /*
         * unknown action 
         */
        default:
          $this->raiseError("Unknown link action '$action'");
      }
    }
    return true;
    
  }
  
  /**
   * Exports model data to an xml file, creating an extra file with link information
   * <links model="qcl.foo.Model">
   * <!-- links that connect to only one other model -->
   *  <link name="singlelink" model="qcl.bar.Model">
   *    <origin namedId="qcl.foo.Instance1">
   *      <target namedId="qcl.bar.Instance1" />
   *      <target namedId="qcl.bar.Instance2" />
   *    </origin> 
   *  </link>
   *  <!-- link that connects several models -->
   *  <link name="multilink">
   *    <origin namedId="qcl.foo.Instance1">
   *      <target>
   *        <model name="qcl.bar.Model" namedId="qcl.bar.Instance123" />
   *        <model name="qcl.boo.Model" namedId="qcl.boo.Instance123" />
   *      </target>
   *    </origin>
   *  </link>
   * </links>
   * @see qcl_db_PropertyModel
   * @param string $dir directory path where link data is to be put, defaults to the 
   * directory containing the inital data file
   * @param bool $isBackup if true, prepend "backup_" before the filename
   */
  function exportLinkData($dir=null, $isBackup=false)
  {    
    /*
     * check dir
     */
    if ( ! is_null($dir) and ! is_dir($dir) )
    {
      $this->raiseError("'$dir' is not a directory.");
    }
    
    /*
     * links in model schema
     */
    $linkNodes =& $this->getLinkNodes(); 
    if ( ! count($linkNodes) ) return;
    
    /*
     * links
     */
    $localKey   = $this->getLocalKey();
    $foreignKey = $this->getForeignKey();
    
    foreach( $linkNodes as $linkNode )
    {
      $attrs = $linkNode->attributes();
      $name  = $attrs['name'];
      $table = $attrs['table'];

      /*
       * get file path and delete file if it exists
       */
      $path = either( $dir, dirname($this->getDataPath() ) ) . "/" . ( $isBackup ? "backup_" : "") . "$table.data.xml";
      @unlink($path);
      $this->info("Exporting Link data '$name' of {$this->name} data to $path");
      
      /*
       * create new xml file
       */
      $controller =& $this->getController();
      $dataXml =& new qcl_xml_SimpleXmlStorage( &$controller );
      $dataXml->createIfNotExists($path);
      $dataXml->load($path);          

      /*
       * create the main nodes
       */
      $doc         =& $dataXml->getDocument();
      $linksNode   =& $doc->addChild("links"); 
      $linksNode->addAttribute("model", $this->name() );
      
      /*
       * model names
       */
      $model = $attrs['model'];
      if ( $model )
      {
        $models = array($model);
      }
      else
      {
        $models = array();
        foreach ( $linkNode->children() as $child )
        {
          $attrs = $child->attributes();
          $models[] = $attrs['name'];
        }
      }
      
      /*
       * instantiate linked models
       */
      $controller =& $this->getController();
      foreach( $models as $modelName )
      {
        $this->_models[$modelName] =& $controller->getNew( $modelName );
      }

      /*
       * link node
       */
      $linkNode =& $linksNode->addChild("link");
      $linkNode->setAttribute("name",$name);
      
      /*
       * save model name if it is a single link
       */
      if ( count($models) == 1 )
      {
        $linkNode->setAttribute("model",$models[0]);
      }
  
      /*
       * get all link data
       */
      $linkData = $this->db->getAllRecords("
        SELECT * FROM " . $this->getTablePrefix() . $table . "
        ORDER BY `$foreignKey`
      ");
      
      $id = null;
      
      foreach ( $linkData as $row )
      {
        /*
         * load model data
         */
        $_id = $row[$foreignKey];
        $this->load($_id);
        if ( $this->foundNothing() )
        {
          $this->warn("Invalid entry/entries in $table for $foreignKey = $_id. Deleting...");
          $this->db->deleteWhere($table,"$foreignKey=$_id");
          continue;
        }
        
        /*
         * create a link data node foreach data record
         * that has links
         */
        if ( $id != $_id )
        {
          $id = $_id;
          $originNode =& $linkNode->addChild("origin");    
          if ( $this->hasProperty("namedId") )
          {
            $originNode->addAttribute("namedId", $this->getNamedId() );
          }
          else
          {
            $originNode->addAttribute("id", $id );
          }          
        }
        
        /*
         * data node, eithe
         */
        $targetNode =& $originNode->addChild("target");
        
        
        /*
         * multilinks, syntax is
         * <target>
         *  <model name="model.name" namedId="named.id.of.record" />
         * </target>
         * 
         * or
         * <target>
         *  <model name="model.name" id="11" />
         * </target>
         * 
         */
        if ( count($models) > 1 )
        {
       
          /*
           * for each linked model, create taget node
           */
          foreach ( $models as $modelName )
          {  
            /*
             * link data
             * @todo share datasource, override getNew method
             */
            $model =& $this->_models[$modelName];
            $modelFk = $model->getForeignKey();
            $modelId = $row[ $modelFk ];
            $model->load( $modelId );
            if ( $model->foundSomething() )
            {
              $modelNode =& $targetNode->addChild("model");
              $modelNode->addAttribute("name", $modelName); 
              if ( $model->hasProperty("namedId") )
              {
                $modelNode->addAttribute("namedId", $model->getNamedId() );
              }
              else
              {
                $modelNode->addAttribute("id", $model->getId() );
              }
            }
            else
            {
              $this->warn("Invalid entry in $table for $foreignKey = $id and $modelFk = $modelId");
            }
          }
        }
        
        /*
         * single link, syntax
         * <target namedId="named.id.of.record"/>
         */
        else
        {
          $model =& $this->_models[ $models[0] ];
          $modelFk = $model->getForeignKey();
          $modelId = $row[ $modelFk ];
          $model->load( $modelId );
          if ( $model->foundSomething() )
          {
            if ( $model->hasProperty("namedId") )
            {
              $targetNode->addAttribute("namedId", $model->getNamedId() );
            }
            else
            {
              $targetNode->addAttribute("id", $model->getId() );
            }
          }
          else
          {
            $this->warn("Invalid entry in $table for $foreignKey = $id and $modelFk = $modelId");
          }
        }
      }
      
      /*
       * save xml
       */
      $dataXml->save();
    }
  }

  /**
   * Imports initial link data for the model from an xml 
   * for the structure, 
   * @see qcl_db_model::exportLinkData()
   * @param string $path
   */
  function importLinkData($path=null)
  {
    
    $controller =& $this->getController();
    
    /*
     * links in model schema
     */
    $this->setupTableLinks();
    $linkNodes = $this->getLinkNodes();
    
    if ( ! count( $linkNodes ) ) 
    {
      $this->log("Model does not have links. Cannot import link data.","propertyModel");
      return;
    }
    
    /*
     * links
     */
    $localKey   = $this->getLocalKey();
    $foreignKey = $this->getForeignKey();
    
    foreach( $linkNodes as $linkNode )
    {
      $attrs     = $linkNode->attributes();
      $linkName  = $attrs['name'];
      $table     = $attrs['table'];

      /*
       * get file path
       */
      $path = dirname(either($path,$this->getDataPath() ) ) . "/$table.data.xml";
      if ( ! file_exists($path) )
      {
        $this->log("No link data available for link '$linkName' of model '{$this->name}' ","propertyModel");
        continue;
      }
      
      $this->log("Importing link data for link '$linkName' of model '{$this->name}'...","propertyModel");
      
      /*
       * parse xml file
       */
      $dataXml =& $this->parseXmlDataFile($path); 
      $dataDoc =& $dataXml->getDocument();

      /*
       * main node
       */
      $linksNode =& $dataDoc->links or $this->raiseError("No links node available.");
      $attrs = $linksNode->attributes();
      if ( $attrs['model'] != $this->name() )
      {
        $this->log( "Origin model in xml ('" . $attrs['model'] . "'') does not fit this model ('" . $this->name() . "'). Skipping...", "propertyModel");
        return;
      }
      
      foreach ( $linksNode->children() as $linkNode )
      {
        
        /*
         * link node attributes
         */
        $attrs  = $linkNode->attributes();
        $tModel = $attrs['model'];
        $tName  = $attrs['name'];

        /*
         * if target link name is not the current link name, skip
         */
        if ( $tName != $linkName ) continue;
        
        /*
         * target model
         */
        if( $tModel )
        {
          /*
           * @todo check if model name fits with schema xml
           */
          $targetModel =& $controller->getNew( $tModel );
        }
        else
        {
          $this->raiseError("Importing multilinks not yet implemented.");        
        }
        
        /*
         * origin nodes
         */
        foreach ( $linkNode->children() as $originNode )
        {
          
          $attrs    = $originNode->attributes();
          $oNamedId = either($attrs['namedId'],$attrs['namedid']);
          $oId      = $attrs['id'];
          
          /*
           * load origin record
           */
          if ( $oId )
          {
            $this->load( $oId );
          }
          elseif ( $oNamedId )
          {
            $this->findByNamedId( $oNamedId );
          }
          else
          {
            $this->raiseError("No identifier for origin record.");
          }
          
          /*
           * does origin record exist?
           */
          if ( $this->foundNothing() )
          {
            $this->raiseError("Origin record '$oNamedId/$oId' does not exist for model '{$this->name}'");
          }
          
          foreach ( $originNode->children() as $targetNode )
          {
            $attrs    = $targetNode->attributes();
            $tNamedId = either($attrs['namedId'],$attrs['namedid']);
            $tId      = $attrs['id'];

            /*
             * single links
             */
            if( $tModel )
            {
              /*
               * load target record
               */
              if ( $tNamedId )
              {
                $targetModel->findByNamedId($tNamedId);
              }
              elseif ( $tId )
              {
                $targetModel->load( $tId );
              }
              else
              {
                $this->warn("Missing identifier for target node.");
                continue;
              }
              
              /*
               * link with target record
               */
              if ( $targetModel->foundSomething() )
              {
                //$this->info("Linking '{$this->name}' #$oNamedId/$oId' with '$tModel' #$tNamedId/$tId.");
                $this->linkWith(&$targetModel);  
              }
              else
              {
                $this->raiseError("Target record '$tNamedId/$tId' does not exist for model '$tModel'");
              }
            }
            
            /*
             * multilinks, not yet implemented
             */
            else
            {
              $this->raiseError("Importing multilinks not yet implemented.");
            }
          }
        }
      }          
    }
  }
}	
?>