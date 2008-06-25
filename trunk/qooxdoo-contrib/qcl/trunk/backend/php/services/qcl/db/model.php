<?php  

// dependencies
require_once "qcl/jsonrpc/model.php";
require_once "qcl/db/db.php";    
require_once "qcl/xml/simpleXML.php";

/**
 * simple controller-model architecture for jsonrpc
 * common base class for models based on a (mysql) database
 * @todo: make this dbms-independent
 */

class qcl_db_model extends qcl_jsonrpc_model
{
	//-------------------------------------------------------------
  // class variables
  //-------------------------------------------------------------
  
  
  //-------------------------------------------------------------
  // instance variables
  //-------------------------------------------------------------
  
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
   * the current record cached 
   * @var array
   */
	var $currentRecord = null;
	
	/**
	 * the result of the last query
	 * @access private
	 * @var array
	 */
	var $_lastResult = null;
	
	/**
	 * a blueprint of an newly initialized record. 
	 * you can pre-insert static values here
	 * @var array
	 */
	var $emptyRecord = array();           
	
	/**
	 * a map containing the aliases for property names in 
	 * table columns used by the model. The aliases apply to
	 * all tables.
	 * @var array
	 */
	var $aliasMap = array();
	
	/**
	 * the datasource model object, if any
	 * @var qcl_datasource_model
	 */
	var $datasourceModel = null;

	/**
	 * the datasource name or other information identifying the datasource
	 * @var string
	 */
	var $datasource;
	
	/**
	 * the name of the model. Should be a java-like class name such as "namespace.package.ClassName"
	 * @var string
	 */
	var $name;
	
	/**
	 * the type of the model, if the model implements a generic 
	 * type in a specific way
	 *
	 * @var string
	 */
	var $type;
	
	/**
	 * the class name of the model. 
	 *
	 * @var string
	 */
	var $class;
	
	/**
	 * the schema as an simpleXml object, containing all
	 * included xml files
	 * @var qcl_xml_simpleXML
	 */
	var $schemaXml;
	
	/**
	 * shortcuts to property nodes in schema xml
	 * @array array of object references
	 */
	var $properties;

  /**
   * shortcuts to property nodes which belong to metadata
   * @array array of object references
   */
  var $metaDataProperties;	
	
  /**
   * the path to the model schema xml file. ususally automatically resolved.
   * @see qcl_db_model::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = null;  
  
  
	//-------------------------------------------------------------
  // internal methods
  //-------------------------------------------------------------

  /**
   * constructor 
   * @param qcl_jsonrpc_controller	$controller
   * @param mixed $datasource Datasource model object or null if no datasource 
   */
	function __construct( $controller, $datasourceModel=null )
  {
  
    parent::__construct(&$controller);
	
    $this->log("Constructing '" . get_class($this) . "' with controller and '" . get_class($datasourceModel) . "'.");
  
    /*
     * overload the outmost class. only needed in PHP 4.
     */
    if ( phpversion() < 5)
    {
      overload( get_class($this) );
    }
    
    /*
     *  initialize the model
     */
    $this->initialize( &$datasourceModel );
       
	}
  
	//-------------------------------------------------------------
  // overloading
  //-------------------------------------------------------------   

  /**
   * method called when called method does not exist. This will check whether 
   * method name is 
   * 
   * - getXxx or setXxx and then call getProperty("xxx") 
   *    or setProperty("xxx", $arguments[0]). 
   * - findByXxx to call findBy("xxx",...)
   * 
   * Otherwise, raise an error.
   * @param string $function  Method name
   * @param array  $arguments Array or parameters passed to the method
   * @param mixed  $return    call-time reference to return value (PHP4-only)
   * @return mixed return value (PHP5 only) 
   */
  function __call( $function, $arguments, &$return) 
  {
    /*
     * we need to reimplement the mixin behavior from 
     * qcl_object because we cannot call the parent 
     * class method
     * @see qcl_object::__call()
     */
    if ( phpversion() >= 5 and isset($this->_mixinlookup[$method] ) )
    {
      $elems = array();
      for ($i=0, $_i=count($args); $i<$_i; $i++) $elems[] = "\$args[$i]";
      eval("\$result = ".$this->_mixinlookup[$method]."::"
          .$method."(".implode(',',$elems).");");
      return $result;
    }
    
    /*
     * php4 or no matching mixin methods found.
     * Now we intercept method calls
     */
    $startsWith = strtolower( substr( $function, 0, 3 ) );
    $endsWith   = strtolower( substr( $function, 3 ) );
    
    /*
     * get.. and set... for property access
     * @todo: correct calling of method with variable arguments
     */
    if ( $startsWith == "set" )
    {
      //$this->info("setting $endsWith = " . $arguments[0] );
      $this->setProperty( $endsWith, $arguments[0], $arguments[1], $arguments[2] );
    }
    elseif ( $startsWith == "get" )
    { 
      $return = $this->getProperty( $endsWith, $arguments[0], $arguments[1], $arguments[2] );
      //$this->info("getting $endsWith = $return");
    }
    
    /*
     * findBy...
     */
    elseif ( strtolower( substr( $function, 0, 6 ) ) == "findby" )
    {
      $propName = strtolower( substr( $function, 6 ) );
      $return = $this->findBy($propName,$arguments[0],$arguments[1],$arguments[2]);
    }
    
    /*
     * method not known, raise error
     */
    else
    {
      $this->raiseError("Unknown method " . get_class($this) . "::$function().");
    }
    
    /*
     * return result
     */
    if ( phpversion() < 5) 
    {
      return true; // PHP 4: return value is in &$return
    }
    else
    {
      return $return; // PHP 5  
    }
  }	
     	
	//-------------------------------------------------------------
  // Initialization
	//-------------------------------------------------------------   

  /**
   * initializes the model
   * @param mixed $datasource Object reference to
   * the datasource object, or null if model is independent of a datasource
   * @return void
   */
  function initialize($datasource=null)
  {
  
    $this->log("Initializing '" . get_class($this) . "' with '" . get_class($datasource) . "'." );
  
    /*
     * datasource model
     */
    if ( is_object($datasource) )
    {
      $this->setDatasourceModel(&$datasource);
    }
    
    /*
     * invalid datasource
     */
    elseif ( !is_null($datasource) )
    {
      $this->raiseError("Parameter must be null or qcl_datasource_db_model object, is " . gettype($datasource) );
    }
    
    /*
     * connect to database
     */
    $this->connect();
        
    /*
     * parse schema document into $this->schemaXml
     */
    $this->getSchemaXml();
    
    /*
     * setup schema. if necessary, create or update tables and import intial data. 
     */
    $this->setupSchema();
    
    /*
     * setup properties 
     */
    $this->setupProperties();

  } 	
	
  /**
   * connects to database. if this model is connected to 
   * a datasource model, reuse the datasource's database
   * handler
   *
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
    if ( $dsModel )
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
        $db =& $controller->getConnection();
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
        $db =& new qcl_db_mysql(&$this->controller,$dsn);
        
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
    $this->db->model =& $this;     
  }

  //-------------------------------------------------------------
  // Datasource
  //-------------------------------------------------------------   	

  /**
   * stores the name or object reference of the datasource
   * @param mixed $datasource Either the name of the datasource or an object reference to t
   * the datasource object
   * return void
   */
  function setDatasourceModel($datasource)
  {
    if ( is_object ($datasource) and is_a($datasource,"qcl_datasource_db_model") )
    {
      $this->datasourceModel =& $datasource;
    }
    else
    {
      $this->raiseError("Argument must be a qcl_datasource_db_model object");
    }
  }  
  
  /**
   * retrieves the datasource object or name
   * @return qcl_datasource_db_model
   */
  function &getDatasourceModel()
  {
    return $this->datasourceModel;
  }
 	
  //-------------------------------------------------------------
  // Properties and Columns
  //-------------------------------------------------------------   

  /**
   * get all properties of this model
   * @return array
   */
  function getProperties()
  {
    return array_keys($this->properties);
  }
  
  /**
   * checks if a property has a local alias 
   *
   * @param string $propName property name
   */
  function hasAlias($propName)
  {
    if ( ! is_object ( $this->schemaXml) )
    {
      $this->raiseError("Model schema is not initialized.");
    }      
    return ( isset( $this->aliasMap[$propName] ) );
  }
  
  /**
   * get the local alias of a property name
   * @param string $propName property name
   * @return string alias or property name
   */
  function getAlias($propName)
  {
    if ( ! is_object ( $this->schemaXml) )
    {
      $this->raiseError("Model schema is not initialized.");
    }  
    return $this->aliasMap[$propName];
  }  
  
 /**
   * gets the column name from a property name
   * @return string
   * @param string $property Property name
   */
  function getColumnName ( $property )
  {
    if ( ! is_object ( $this->schemaXml) )
    {
      $this->raiseError("Model schema is not initialized.");
    }    
    return either( $this->getAlias($property), $property );
  }

    
  /**
   * gets the property name of a column name
   * @return string Field Name
   * @param string $columnName
   */
  function getPropertyName ( $columnName )
  {
    if ( ! is_object ( $this->schemaXml) )
    {
      $this->raiseError("Model schema is not initialized.");
    }     
    static $reverseAliasMap = null;
    if ( !$reverseAliasMap )
    {
      $reverseAliasMap = array_flip($this->aliasMap);
    }
    return $reverseAliasMap[$columnName];
  }  

  //-------------------------------------------------------------
  // Numeric and Named Id 
  //-------------------------------------------------------------      

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
   
  /**
   * gets numeric id by string id
   * @param string  $namedId
   * @param int id or null if record does not exist
   */
  function getIdByNamedId( $namedId )
  {
    $row  = $this->findByNamedId($namedId);
    return count($row) ? $row[$this->col_id] : null;
  }

  /**
   * gets string id by numeric id
   * @param int $id
   * @param string id or null if record does not exist
   */
  function getNamedIdById( $id )
  {
    $row    = $this->findById($id);
    return count($row) ? $row[$this->col_namedId] : null;
  }

  /**
   * checks if record with $namedId exists
   * @param string  $namedId
   * @param int id of existing record of false
   */
  function namedIdExists( $namedId )
  {
    $row = $this->findByNamedId ( $namedId );
    return count($row) ? $row[$this->col_id] : false;
  } 
  
  //-------------------------------------------------------------
  // Record Retrieval (find... methods)
  //-------------------------------------------------------------   
 
  /**
   * finds a records by property value
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
   * finds a records that compare to a property value. This is like findBy, but using
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
   * gets all database records optionally sorted by property
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return Array Array of db record sets
   */
  function findAll( $orderBy=null, $properties=null )
  {
    return $this->findWhere( null, $orderBy, $properties );
  }  
  
  /**
   * gets all database records or those that match a where condition. 
   * the table name is available as the alias "r" (for records)
   * @param string|null  $where   where condition to match, if null, get all
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return Array Array of db record sets. The array keys are already converted to the property names,
   * so you do not have to deal with column names at all.
   */
  function findWhere( $where=null, $orderBy=null, $properties=null )
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
    $columns = implode(",",  $cols );
      
    /*
     * select 
     */
    $sql = "SELECT $columns FROM {$this->table} AS r \n";
    
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
    if ($orderBy)
    {
      $column = array();
      foreach ( (array) $orderBy as $property )
      {
        $column[] = $this->getColumnName($property);
      }
      $orderBy = implode("`,`", (array) $column );
      $sql .= "ORDER BY `$orderBy`"; 
    }
    
    /*
     * store and return result
     */
    $result = $this->db->getAllRecords($sql);
    $this->currentRecord = count($result) ? $result[0] : null;
    $this->_lastResult   = $result;    
    return $result;
  }

  /**
   * gets all values of a model property that match a where condition
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
    if ($orderBy)
    {
      $orderBy = $this->getColumnName($orderBy);
      $sql .= "ORDER BY `$orderBy`"; 
    }
    return $this->db->getValues($sql);    
  }  

  /**
   * gets all distinct values of a model property that match a where condition
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
   * Whether the last query didn't find any records
   * @return boolean
   */
  function notFound()
  {
    return is_null( $this->currentRecord );
  }  
 	
 	/**
   * find database records by their primary key
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
 	    $result = $this->findWhere( "`{$this->col_id}` IN ($rowIds)", $orderBy, $properties );
 	    return $result;
 	  }  
 	  $this->raiseError("No id(s) provided.");
 	}

  /**
   * gets the record in this table that is referred to by the record from a different table (argument) 
   * @return array
   * @param Array   $record  record from a different table that contains a key corresponding to the foreign id of this table
   * @param Boolean $idOnly if true, return only the value of the foreign key column
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
  // Get property and column values & convert between properties 
  // and column data
  //-------------------------------------------------------------      

  /**
   * Gets a property from the current model recordset
   * @param string   $name Property name
   * @return mixed value of property
   */
  function getProperty( $name )
  {
    if ( isset( $this->currentRecord[$name] ) )
    {
      /*
       * property exists, return straight
       */
      return $this->currentRecord[$name];
    }
    else
    {
      /*
       * property doesn't exist, either the current record is in a unconverted
       * (column) format or there is a letter case problem
       */
      foreach ( $this->currentRecord as $key => $value )
      {
        if ( strtolower($key) == strtolower($name) )
        {
          return $value;
        }
        elseif ( strtolower($this->getPropertyName($key)) == strtolower($name) )
        {
          return $value;
        }
      }
    }
    $this->raiseError("Property '$name' does not exist.'");
  }

  /**
   * Sets a property in the current model recordset. You need to call the update() method to commit 
   * the property change to the database.
   * @return void 
   * @param string     $name
   * @param mixed      $value 
   */
  function setProperty( $name, $value )
  { 
    if ( isset(  $this->currentRecord[$name] ) )
    {
      /*
       * property exists, set it
       */
      $this->currentRecord[$name] = $value;
      return;
    }
    else
    {
      /*
       * property doesn't exist, either the current record is in a unconverted
       * (column) format or there is a letter case problem
       */
      foreach ( $this->currentRecord as $key => $value )
      {
        if ( strtolower($key) == strtolower($name) )
        {
          $this->currentRecord[$key] = $value;
          return;
        }
        elseif ( strtolower($this->getPropertyName($key)) == strtolower($name) )
        {
          $this->currentRecord[$key] = $value;
          return;
        }
      }
    }
    $this->raiseError("Property '$name' does not exist.'");
  }  

  //-------------------------------------------------------------
  // Data creation and manipulation
  //-------------------------------------------------------------   	

	/**
	 * creates a new record and optionally links it to a foreign table (must be implemented in ::create() )
	 * @param string	$namedId
	 * @param int		$parentId 	id of role (unused if class is qcl_access_role)
	 * @return int the id of the inserted or existing row 
	 */
	function createIfNotExists( $namedId, $parentId=null )
 	{
 		if ( $this->namedIdExists( $namedId ) )
 		{
 			return $this->getIdByNamedId( $namedId );
 		}	
	  return $this->create( $namedId, $parentId );
 	}   

  /**
   * inserts a record into a table and returns last_insert_id()
   * @return int the id of the inserted row 
   */
  function create()
  {
    $data = $this->emptyRecord;
    $data[$this->col_id]=null; // so at least one field is set
    $id = $this->insert( $data );
    $this->findById($id);
    return $id;
  }

  /**
   * inserts a record into a table and returns last_insert_id()
   * @param array $data associative array with the column names as keys and the column data as values
   * @return int the id of the inserted row 
   */
  function insert( $data )
  {
    // created timestamp
    if ( $this->col_created and ! isset ( $data[$this->col_created] ) )
    {
      $data[$this->col_created] = null;
    }
    
    return $this->db->insert( $this->table,$data );
  }

  /**
   * updates a record in a table identified by id
   * @param array       $data   associative array with the column names as keys and the column data as values
   * @param int|string  $id   if the id key is not provided in the $data paramenter, provide it here (optional)
   * @return boolean success 
   */
  function update ( $data=null, $id=null )    
  {
    /*
     *  use cached record data?
     */
    if ($data === null)
    { 
      $data = $this->currentRecord;
    }
    else
    {
      if ( $id !== null )
      {
        $data[$this->col_id] = $id;
      }
    }
    
    /*
     * convert property names to column names if necessary
     */
    foreach ($data as $key => $value)
    {
      if ( $alias = $this->getAlias($key) )
      {
        /*
         * @todo: what if alias exists as property name?
         */
        $data[ $alias ] = $value;
        unset( $data[ $key] );
      }
    }
    
    /*
     * set modified timestamp if the timestamp is not part of the data
     */
    if ( $this->col_modified && empty( $data[$this->col_modified] ) )
    {
      $data[$this->col_modified] = null;
    }    
    
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
    $this->db->deleteWhere ( $this->table, $where );
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
    return $this->col_id;
  }
  
  /**
   * gets the name of the column in other tables that contains a reference to a record in this table (foreign key)
   * @deprecated
   * return string
   */
  function getForeignKeyColumn()
  {
    return $this->foreignKey;
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
   * gets all database records or those that match a where condition. 
   * the table name is available as the alias "r" (for records)
   * @param string        $where    where condition to match, if null, get all
   * @param string|null   $orderBy  (optional) order by field
   * @param array|null    $fields   (optional) Array of fields to retrieve 
   * @return Array Array of db record sets
   * @deprecated use new findX.. methods 
   */
  function getRecordsWhere($where=null,$orderBy=null,$fields=null)
  {
    if ( $fields )
    {
      $fields = "`" . implode("`,`", (array) $fields ) . "`";
    }
    else
    {
      $fields = "*"; 
    }
    
    $sql = "SELECT $fields FROM {$this->table} AS r \n";
    
    if ($where)
    {
      $sql .= "WHERE $where ";
    }
    if ($orderBy)
    {
      $orderBy = implode("`,`", (array) $orderBy );
      $sql .= "ORDER BY `$orderBy`"; 
    }
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
  function getValues($column,$where=null,$orderBy=null)
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
   * @deprecated use new findX.. methods 
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
    $columnName = $this->getColumnName( $propName );
    return $this->getColumnValue($columnName,$id);
  }

  /**
   * sets the value of the property of the current record or a record specified by the id
   * @param string $propName Property name
   * @param mixed      $value 
   * @param int|string $id    if omitted, modify current record cache without updating the database 
   * @return void
   * @deprecated use new findX.. methods 
   */
  function setPropertyValue ( $propName, $value, $id=null )
  {
    $columnName = $this->getColumnName($propName);
    $this->setColumnValue( $columnName, $value, $id );
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

  
  //-------------------------------------------------------------
  // Model Setup methods
  //-------------------------------------------------------------
  
  /**
   * gets the path of the file that contains the initial
   * data for the model
   */
  function getDataPath()
  {
    $class = get_class($this);
    $path  = str_replace("_","/",$class) . ".data.xml";    
    return $path;
  }
  
  /**
   * setup model properties
   */
  function setupProperties()
  {
    /*
     * check prerequisites
     */
    if ( ! is_object($this->schemaXml ) )
    {
      $this->raiseError("Model Schema hasn't been initialized.");
    }
    
    //$this->info($this->schemaXml->asXML());
    
    /*
     * defintion node
     */
    $schemaXml  =& $this->getSchemaXml(); 
    $definition =& $schemaXml->getNode("/model/definition");
    if ( ! $definition )
    {
      $this->raiseError("Model schema xml does not have a 'definition' node.");
    }
    
    /*
     * properties
     */
    $properties =& $definition->properties;
    $children   =& $properties->children();

    if ( ! is_object($properties) )
    {
      $this->raiseError("Model has no properties.");
    }
    
    foreach ( $children as $propNode)
    {
      $attrs     = $propNode->attributes(); 
      $propName  = $attrs['name'];
      $columnVar = "col_$propName";
      $this->$columnVar = $propName;
      $this->properties[$propName] = $propNode;
      //$this->info(gettype($propNode)); 
    } 
    
//    $this->info("Properties:");
//    $this->info(array_keys($this->properties));
//    $this->info(array_keys(get_object_vars($this)));
    
    /*
     * aliases
     */
    $aliases =& $definition->aliases;
    if ( $aliases )
    {
      $aliasMap = array();
      foreach($aliases->children() as $alias)
      {
        $attrs    = $alias->attributes();
        $propName = $attrs['for'];
        $column   = qcl_xml_simpleXML::getData(&$alias);
        $aliasMap[$propName] = $column; 
        $columnVar = "col_$propName"; 
        $this->$columnVar = $column;
      }
      $this->aliasMap = $aliasMap; 
    }    
    //$this->info("Alias Map:");
    //$this->info($aliasMap);
    
    /*
     * setup metadata array with shortcuts to property nodes
     */
    $propGroups =& $definition->propertyGroups;
    if ( $propGroups )
    {
      $metaDataNode =& qcl_xml_simpleXML::getChildNodeByAttribute($propGroups,"name","metaData"); 
      if ( $metaDataNode )
      {
        foreach ( $metaDataNode->children() as $metaDataPropNode )
        {
          $attrs = $metaDataPropNode->attributes();
          $name  = $attrs['name'];
          //$this->info("$name => " . gettype($this->properties[$name]) );
          if ( isset($this->properties[$name]) )
          {
            $this->metaDataProperties[$name] =& $this->properties[$name];  
          }
        }
      }
      //$this->info("Metadata properties:"); 
      //$this->info( array_keys($this->metaDataProperties));      
    }
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
   * returns the absolute path of the xml file that
   * is connected by default to this model. It is located
   * in the same directory as the class file 
   * path/to/class/classname.schema.xml
   * return string
   */
  function getSchmemaXmlPath()
  {
    if ( $this->schemaXmlPath )
    {
      return $this->schemaXmlPath;
    }
    $class = get_class($this);
    return str_replace("_","/",$class) . ".model.xml";
  }
  
  /**
   * get the model schema as an simpleXml object
   * @param string $path path of schema xml file or null if default file is used
   * @return qcl_xml_simpleXML
   */  
  function &getSchemaXml($path=null)
  {
    
    /*
     * if schema file has already been parsed, return it
     */
    if ( is_object( $this->schemaXml ) )
    {
      return $this->schemaXml;
    }

    /*
     * parse schema file
     */
    $path = either( $path, $this->getSchmemaXmlPath() );

    if ( !is_valid_file($path) )
    {
      $this->raiseError("No valid file path: '$path'");
    }
    
    /*
     * get and return schema document 
     */
    $this->schemaXml =& $this->parseXmlSchemaFile($path);
    return $this->schemaXml;     
  }
  
  /**
   * parse xml schema file and, if it has changed, create or update
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
     * the table name is provided as the 'table' property
     * of the class, usually prefixed by the datasource name, if applicable to the model 
     */
    if ( ! $modelAttrs['table'] )
    {
      $this->raiseError("Model '{$this->name}': No table name!"); 
    }
    $prefix = $this->getTablePrefix();
    $this->table = $prefix . $modelAttrs['table'];
    
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
     * return if table exists and schema hasn't changed
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
     * properties as columns
     */
    $properties = $doc->model->definition->properties->children(); 
    foreach($properties as $property)
    {
      $attr      = $property->attributes();
      $propName  = $attr['name'];
      $colName   = either($aliasMap[$propName],$propName);
      
      if ( count($property->children()) == 0)
      {
        // no column definitions, continue
        continue;
      }
      
      //@todo:  accept either <$sqltype> or <sql type="$sqltype">
      if ( ! is_object($property->$sqltype) )
      {
        $this->warn("Model Property '$propName'  has no definition matching the sql type.");
        continue;
      }
      
      $newDef    = $modelXml->getData($property->$sqltype);
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
        $this->info( "Old definition:" . $oldDef);
        $this->db->modifyColumn($table,$colName,$newDef);
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
            $indexColumns = $this->db->getIndexColumns($table,$indexName); 
                
            //$this->info("$indexType index $indexName, existing index:"); 
            //$this->info($indexColumns);
            
            //$this->info("New index:");
            //$this->info($indexProperties);
          
            // if different from model, drop it first
            if ( count($indexColumns) )
            {
              if ( $indexColumns != $indexProperties )
              {
                // index exists but is different 
                $this->db->dropIndex($table,$indexName);
                $this->db->addIndex($indexType,$table,$indexName,$indexProperties);
              }
            }
            else
            {
              // index doesn't exist, create
              $this->db->addIndex($indexType,$table,$indexName,$indexProperties);
            }
                      
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
      foreach ($links->children() as $link)
      {
        $a = $link->attributes();
        
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
         * get local key column
         */
        if ( $a['localkey'] )
        {
          $localKey          = either($a['localkey'],$a['localKey']); 
          $localKeyColName   = either($aliasMap[$localKey],$localKey);
        
        }
        else
        {
          $this->raiseError("A table link must have a 'localKey' attribute.");
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
          $this->raiseError("A table link must have a 'foreignKey' attribute.");
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
         * add to unique index in link table
         */
        $uniqueIndexCols =  $this->db->getIndexColumns($link_table,"link");
        if ( ! in_array($foreignKeyColName,$uniqueIndexCols) )
        {
          /*
           * drop existing index
           */
          if ( count($uniqueIndexCols) )
          {
            $this->db->dropIndex($link_table,"link");
          }
          
          /*
           * create new unique index including column
           */
          $uniqueIndexCols[] = $foreignKeyColName;
          $this->db->addIndex("unique",$link_table,"link",$uniqueIndexCols);
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
  }
    
  /**
   * parses an xml schema file, processing includes
   * @param string $file
   * @return qcl_xml_simpleXML
   */
  function &parseXmlSchemaFile($file)
  {

    /*
     * load model schema xml file
     */
    //$this->info("Loading model schema file '$file'...");
    $modelXml =& new qcl_xml_simpleXML($file);
    $modelXml->removeLock(); // we don't need a lock, since this is read-only
    $doc =& $modelXml->getDocument();
    
    /*
     * does the model schema inherit from another schema?
     */
    $rootAttrs   = $doc->attributes();
    $includeFile = $rootAttrs['include'];
    
    if ( $includeFile  )
    {
      //$this->info("Including '$includeFile' into '$file'...");
      $parentXml   =& $this->parseXmlSchemaFile($includeFile);
      $modelXml->extend($parentXml);
      //$this->info($modelXml->asXml());
    }
    
    /*
     * return the aggregated schema object
     */
    return $modelXml;
  }

  /**
   * exports model data to an xml file
   *
   * @param string $path file path, defaults to the location of the inital data file
   */
  function export($path=null)
  {
    /*
     * schema document
     */
    if ( ! is_object ( $this->schemaXml ) )
    {
      $this->raiseError("Model must be initialized before exporting data.");
    }
    $schemaXmlDoc =& $this->schemaXml->getDocument();
    
    
    /*
     * path of exported file
     */
    $path    = either($path,$this->getDataPath());
    $this->info("Exporting {$this->name} data to $path");
    
    /*
     * remove old file
     */
    @unlink($path);
    
    /*
     * create new xml file
     */
    $dataXml =& new qcl_xml_simpleXML();
    $dataXml->createIfNotExists($path);
    $dataXml->load($path); 
    
    /*
     * create the main nodes
     */
    $doc         =& $dataXml->getDocument();
    $dataNode    =& $doc->addChild("data");
    $recordsNode =& $dataNode->addChild("records");

    /*
     * property groups in model schema
     */
    $propGrpsNode =& $this->schemaXml->getNode("/model/definition/propertyGroups");
    //$this->info($propGrpsNode->asXml());
    
    /*
     * metatdata property names
     */
    $metaDataProperties = array_keys($this->metaDataProperties);
    
    /*
     * list of properties minus those which should be
     * skipped
     */
    $propList     =  array_keys($this->properties); 
    $skipExpNode  =& $this->schemaXml->getChildNodeByAttribute(&$propGrpsNode,"name","skipExport");
    if ( $skipExpNode )
    {
      foreach($skipExpNode->children() as $skipPropNode )
      {
        $skipPropAttr = $skipPropNode->attributes();
        $skipPropList[] = $skipPropAttr['name'];
      }
    }
    $propList = array_diff($propList,$skipPropList);
    $this->info("Exporting properties " . implode(",",$propList) . ", skipping properties " . implode(",",$skipPropList) . ".");
    
    /*
     * export all records
     */ 
    $records = $this->findAll();
    
    foreach($records as $record)
    {
      $recordNode =& $recordsNode->addChild("record");
      
      /*
       * dump each column value 
       */
      foreach ($propList as $propName )
      {
        /*
         * property node
         */
        $propNode =& $this->properties[$propName];
        
        /*
         * column name is either alias or property name
         */
        $column = $this->getAlias($propName);
    
        /*
         * column data; skip empty columns
         */
        $columnData = $record[$column];
        if ( empty($columnData) )
        {
          continue;  
        }
        
        $data = xml_entity_encode($columnData);
         
        if ( in_array($propName,$metaDataProperties) )
        {
          /*
           * if property is part of metadata, use attribute
           */          
          $recordNode->addAttribute($propName,$data); 
        }
        else
        { 
          /*
           * otherwise, create property data node 
           */
          $propDataNode =& $recordNode->addChild("property");
          $propDataNode->addAttribute("name",$propName);
          $dataXml->setData(&$propDataNode,$data);
        }
      }
    }
    
    /*
     * save xml
     */
    $dataXml->save();
  }
  

  
  /**
   * imports initial data for the model from an xml 
   * document into the database. The schema of the xml file is the following:
   * <pre>
   * <?xml version="1.0" encoding="utf-8"?>
   * <root>
   *  <data>
   *    <records>
   *      <record col1="a" col2="b">
   *        <property name="col3">c</property>
   *        <property name="col4">d</property>
   *        ...
   *      </record>
   *      <record col1="x" col2="y">
   *        property name="col3">z</property>
   *        ...
   *      </record>
   *      ...
   *    </records>
   *  <data>
   * </root>
   * </pre>
   * In this example, col1 and col2 are metadata columns/properties which allow
   * searching the xml document easily via xpath. both attributes and child nodes of
   * a <record> node will be imported into the database
   */
  function import($path)
  {
    /*
     * check file
     */
    if ( !is_valid_file($path) )
    {
      $this->raiseError("qcl_db_model::import: '$path' is not a valid file.");
    }

    /*
     * schema document
     */
    if ( ! is_object ( $this->schemaXml ) )
    {
      $this->raiseError("Model must be initialized before exporting data.");
    }
    $schemaXmlDoc =& $this->schemaXml->getDocument();
    
    $this->info("Importing data from '$path' into {$this->name}..." );
    
    /*
     * open xml data file and get record node
     */
    $dataXml     =& new qcl_xml_simpleXML($path);
    $dataDoc     = $dataXml->getDocument();
    $recordsNode = $dataXml->getNode("/data/records");
    
    if ( ! is_object($recordsNode) )
    {
      $this->raiseError("Data document has no records node!");
    }
    
    /*
     * iterate through all records and import them
     */
    $count = 0;
    foreach ( $recordsNode->children() as $record)
    {
      /*
       * populate properties with attributes
       */
      $properties = $record->attributes();
      
      /*
       * add child node data to properties
       */
      foreach ( $record->children() as $propNode )
      {
        $propAttrs = $propNode->attributes();
        $propName  = $propAttrs['name'];
        $propData  = $this->schemaXml->getData(&$propNode);
        $properties[$propName] =$propData;
      }
      
      /*
       * populate columns with de-xml-ized property data, using aliases for property
       * names for column names
       */
      $data = array();
      foreach( $properties as $propName => $propData )
      {
        $colName = $this->getAlias($propName);
        $data[$colName] =  xml_entity_decode($propData);
      }
      
      /*
       * insert data into database
       * this will not overwrite existing entries which are primary keys or are part
       * of a "unique" index. 
       */
      $id = $this->insert($data);
      if ($id) $count++;
    }
    $this->info("$count records imported.");
  }
}	
?>