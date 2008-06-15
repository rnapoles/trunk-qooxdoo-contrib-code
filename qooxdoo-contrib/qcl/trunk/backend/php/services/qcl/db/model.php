<?php  

// dependencies
require_once ("qcl/jsonrpc/model.php");
require_once ("qcl/db/db.php");

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
  
  var $key_id                 = "id";    // column with unique numeric id 
  var $key_namedId            = null;    // unique string id, optional  
  var $key_modified;                     // the model SHOULD have a "modified" column with a timestamp
  var $key_created;                      // the model CAN have "created" column with a timestamp
  
  //-------------------------------------------------------------
  // instance variables
  //-------------------------------------------------------------
  
  /**
   * the datasource object instance
   * @var qcl_db_pear 
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
	var $currentRecord;
	
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
	
  //-------------------------------------------------------------
  // deprecated properties
  //-------------------------------------------------------------
	
	/**
	 * an map containing the names of the properties
	 * as keys and of the columns as values. do not use this,
   * as it will be removed.
   * @deprecated
	 * @var array
	 */
	var $metaColumns = array();

	/**
	 * a map containing the names of the columns as keys
	 * and properties as values. do not use this,
   * as it will be removed.
   * @deprecated
   * @var array
	 */
  var $metaFields  = array();
  
	//-------------------------------------------------------------
  // internal methods
  //-------------------------------------------------------------

  /**
   * constructor 
   * @param object reference 	$controller
   */
	function __construct( $controller, $dsn=null )
  {
    parent::__construct(&$controller);
		
    // initialize the database handler
    $this->init($dsn);

    // generate list of metadata columns ($key_ ...)
    $this->_initMetaColumns(); 
	}
     	
	//-------------------------------------------------------------
  // initialization
	//-------------------------------------------------------------   

  /**
   * read class vars starting with "key_" into an array object property
   * @return void
   */
  function _initMetaColumns()
  {
    $classVars = get_class_vars(get_class($this));
    foreach ( $classVars as $key => $value )
    {
      if ( substr( $key,0,4) == "key_" )
      {
        $key = substr($key,4);
        $this->metaColumns[$key] = $value;
      }
    }
    $this->metaFields = array_flip( $this->metaColumns );
  }

	/**
	 * public API function to initialize the internal database handler
	 * when object is created. Override if you want to initialize
	 * at a later point and then call the private _init function. 
	 * @param string 	$dsn 
	 */
	function init($dsn=null)
	{
    $this->_init($dsn);
	}

	/**
	 * initializes the internal database handler 
	 * @param string 	$dsn 
	 */
	function _init($dsn=null)
	{
    require_once("qcl/db/pear.php"); 
	  $db =& new qcl_db_pear(&$this->controller,$dsn);
    if ( $db->error )
    {
      $this->raiseError($db->error);
    }
    $this->db =& $db;
    $this->db->model =& $this;  
	}

  //-------------------------------------------------------------
  // controller
  //-------------------------------------------------------------   
	
	
 	/**
 	 * sets controller of this model and passes it to linked database object
 	 * overrrides qcl_jsonrpc_model method
 	 * @override
 	 * @param object $controller
 	 */
 	function setController ( $controller )
 	{
 		parent::setController(&$controller);
 		if ( $this->db )
 		{
 			$this->db->setController(&$controller);	
 		} 
 	}

  //-------------------------------------------------------------
  // Data Model Introspection
  //-------------------------------------------------------------   
 	
 	
  /**
   * checks if model has a corresponding column in the table (normatively,
   * doesn't check whether the column really exists)
   * @return boolean
   * @param string $name 
   */
  function hasColumn($name)
  {
    $key_name = "key_{$name}";
    return ( isset( $this->$key_name ) and $this->$key_name !== null ) ; 
  }
  
  /**
   * @todo: implement
   */
  function columnExists()
  {
    $this->raiseError("Not implemented");
  }
  
  /**
   * gets the name of the column that holds the unique (numeric) id of this table
   * @return string
   */
  function getIdKey()
  {
    return $this->key_id;
  }
  
  /**
   * gets the name of the column in other tables that contains a reference to a record in this table (foreign key)
   * return string
   */
  function getForeignKey()
  {
    return $this->foreignKey;
  }
  
 /**
   * gets the column name from a normalized field name
   * @return string
   * @param string $fieldName
   */
  function getColumnName ( $fieldName )
  {
    return $this->metaColumns[$fieldName];
  }

  /**
   * gets the (normalized) field name from a column name
   * @return string Field Name
   * @param string $columnName
   */
  function getFieldName ( $columnName )
  {
    return $this->metaFields[$columnName];
  }  

  //-------------------------------------------------------------
  // Generic Data Model API
  //-------------------------------------------------------------   

  /**
   * Get a property. By default, properties are "fields". This can be overridden as necessary
   * @param string       $name Property name
   * @param int|string   $id Optional - set property for id, otherwise operate on cached record
   * @return mixed value of property
   */
  function getProperty( $name, $id = null )
  {
    return $this->getFieldValue( $name, $id );
  }

  /**
   * Set a property. By default, properties are "fields". This can be overridden as necessary
   * @return void 
   * @param string     $name
   * @param mixed      $value 
   * @param int|string $id Optional - set property for id, otherwise operate on cached record
   */
  function setProperty( $name, $value, $id = null )
  {
    $this->setFieldValue( $name, $value, $id);
  }  
    
  /**
   * gets all database records optionally sorted by field
   * @param string|null 		$orderBy 	(optional) order by field
   * @return Array Array of db record sets
   */
 	function getAllRecords($orderBy=null)
  {  
    return $this->getRecordsWhere(null,$orderBy);
  }  
  
 	/**
   * gets all database records or those that match a where condition. 
   * the table name is available as the alias "r" (for records)
   * @param string 			  $where   	where condition to match, if null, get all
   * @param string|null 	$orderBy 	(optional) order by field
   * @param array|null		$fields		(optional) Array of fields to retrieve 
   * @return Array Array of db record sets
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
   * @param array|int		  $ids   	
   * @param string|null 	$orderBy 	(optional) order by field
   * @param array|null		$fields		(optional) Array of fields to retrieve 
   * @return Array Array of db record sets
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
 	    return $this->getRecordsWhere( "`{$this->key_id}` IN ($rowIds)", $orderBy, $fields );
 	  }  
 	}
 	
 	/**
   * gets values of database columns that match a where condition
   * @param string|array	 	$column		name of column(s) 
   * @param string 			    $where   	where condition to match, if null, get all
   * @param string|null 		$orderBy 	(optional) order by field
   * @return array Array of values
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
   * @param string|array	  $column		name of column(s) 
   * @param string 			    $where   	where condition to match, if null, get all
   * @param string|null 		$orderBy 	(optional) order by field
   * @return array Array of values
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
				WHERE `{$this->key_id}` = $id;
	    ");   				
		}
		else
		{
			if ( ! is_array( $this->currentRecord ) )
			{
				$this->raiseError("qcl_db_model::getById : no id given, but no record cached!");
			}
		}
    return $this->currentRecord;
  }

  /**
   * get record by its unique string id
   * @deprecated 12.10.2007  
   * @return Array Db record set
   */
	function getByName($name)
	{
		return $this->getByNamedId($name);
	}

   /**
    * get record by its unique string id
    * @return Array Db record set
    */
	function getByNamedId($namedId)
	{
		if ( $this->key_namedId )
    {
      $row = $this->db->getRow("
        SELECT * 
    		FROM `{$this->table}` 
    		WHERE `{$this->key_namedId}` = '$namedId'
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
			SELECT `{$this->key_id}` 
			FROM `{$this->table}` 
			WHERE `{$this->key_namedId}` = '$ref'  
		");
		$result=$row[$this->key_id];
		return $result;
   }
   
 	/**
   * get record by reference (string id or numeric id)
   * @param mixed $ref numeric id or string name
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
	 * gets numeric id by string id
	 * @param string	$namedId
	 * @param int id or null if record does not exist
	 */
	function getIdByNamedId( $namedId )
	{
		$row 		= $this->getByNamedId($namedId);
		return count($row) ? $row[$this->key_id] : null;
	}

	/**
	 * gets string id by numeric id
	 * @param int	$id
	 * @param string id or null if record does not exist
	 */
	function getNamedIdById( $id )
	{
		$row 		= $this->getById($id);
		return count($row) ? $row[$this->key_namedId] : null;
	}

	/**
	 * checks if record with $namedId exists
	 * @param string	$namedId
	 * @param int id of existing record of false
	 */
	function namedIdExists( $namedId )
	{
		$row = $this->getByNamedId ( $namedId );
		return count($row) ? $row[$this->key_id] : false;
	}
  
  /**
   * gets the record in this table that is referred to by the record from a different table (argument) 
   * @return array
   * @param Array   $record  record from a different table that contains a key corresponding to the foreign id of this table
   * @param Boolean $idOnly if true, return only the value of the foreign key column
   */
  function getByForeignKey( $record, $idOnly = false )
  {
    $id = $record[ $this->getForeignKey() ];
    if ( $idOnly )
    {
      return $id;
    }
    else
    {
      return $this->getById( $id );
    }
  }

	/**
	 * creates a new record and 
	 * optionally links it to a role
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
    $data[$this->key_id]=null; // so at least one field is set
    $id = $this->insert( $data );
    
    $this->currentRecord = $this->getById($id);
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
    // use cached record data
    if ($data === null)
    {
      $data = $this->currentRecord;
    }
    else
    {
      if ( $id !== null )
      {
        $data[$this->key_id] = $id;
      }
    }
    
    // set modified timestamp if the timestamp is not part of the data
    if ( $this->key_modified && empty( $data[$this->key_modified] ) )
    {
      $data[$this->key_modified] = strftime("%Y-%m-%d %T");
    }    
    
    return $this->db->update( $this->table, $data, $this->key_id );
  }     
  
  /**
   * deletes one or more records in a table identified by id
   * @param mixed $ids (array of) record id(s)
   */
  function delete ( $ids )
  {
    $this->db->delete ( $this->table, $ids, $this->key_id );
  } 
  
  /**
   * deletes one or more records in a table matching a where condition
   * @param string  $where where condition
   */
  function deleteWhere ( $where )
  {
    $this->db->deleteWhere ( $this->table, $where );
  }  	
 	
  //-------------------------------------------------------------
  // SQL-Database specific methods
  //-------------------------------------------------------------   
 	
	/**
	 * gets the value of a column in a record without field->column translation 
	 * @param string	     $column 	
	 * @param int|string   $id	if omitted, use current record
	 */
	function getColumnValue( $column, $id = null)
	{
    if ( is_numeric( $id ) )
    {
      // id is numeric
      $row = $this->getById( $id );
    } 
    elseif ( is_string($id) )
    {
      // id is string => namedId
      $row = $this->getByNamedId( $id );
    }
    elseif ( $id === null )
    {
      // operate on current record
      $row = $this->currentRecord;  
    }
    
    // return value
    if ( count ( $row ) )
    {
      return $row[$column];
    }
    else
    {
      if ( $id )
      {
        $this->raiseError("qcl_db_model::getColumnValue : Row '$id' does not exist");  
      }
      elseif ( $id == 0 )
      {
        $this->raiseError("qcl_db_model::getColumnValue : ID is 0.");  
      }      
      else
      {
        $this->raiseError("qcl_db_model::getColumnValue : No current record");  
      }
    }
	}

	/**
	 * sets the value of a column in a record without field->column translation 
	 * @param string	    $column
	 * @param mixed		    $value
	 * @param int|string  $id 	if omitted, modify current record cache without updating the database 
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
			$data[$this->key_id] = $id;
			$data[$column] = $value;
			$this->update($data);
		}
		else
		{
			$this->currentRecord[$column]=$value;		
		}
	}
 
	/**
	 * translates field names to column names and returns value of field in current record
	 * @param string 	   $field 		field name	
	 * @param int|string $id 	if omitted, use current record 
	 */
	function getFieldValue ( $field, $id=null )
	{
		$columnName	= $this->getColumnName( $field );
		
		if ( ! $columnName )
		{
			$this->raiseError ( "qcl_db_model::getFieldValue : Invalid field '$field'");
		}		
		
		return $this->getColumnValue($columnName,$id);
	}


  
	/**
	 * translates field names to column names and sets value of field in current record
	 * @param string	   $field			field name to translate
	 * @param mixed		   $value	
	 * @param int|string $id 		if omitted, modify current record cache without updating the database 
	 * @return void
	 */
	function setFieldValue ( $field, $value, $id=null )
	{
		$columnName	= $this->getColumnName($field);
		
		if ( ! $columnName )
		{
			$this->raiseError ( "qcl_db_model::setFieldValue : Invalid field '$field'");
		}
		$this->setColumnValue( $columnName, $value, $id );
	}


	/**
	 * translates column to field names
	 * @param array $row
	 * @todo: use "normalize" / "unnormalize"?? concept
	 * @return array
	 */
	function columnsToFields ( $row )
	{
    return $this->_columnsToFields ( $row );
  }
  
	/**
	 * translates column to field names
	 * @param array $row
	 * @todo: use "normalize" / "unnormalize"?? concept
	 * @return array
	 */
	function _columnsToFields ( $row )
	{
		if ( ! $row )
    {
      $row = $this->currentRecord;
    }
		$translatedRow 	= array();
		foreach ( $row as $column => $value )
		{
			$field = $this->getFieldName($column);
			if ( $field and $value )
			{
  			$translatedRow[$field]=$value;	
			}
		}
		return $translatedRow;
	}

	/**
	 * translates field to column names
	 * @todo: use "normalize" / "unnormalize"?? concept
	 * @param array $row
	 * @return array
	 */
	function fieldsToColumns ( $row=null )
	{
    return $this->_fieldsToColumns ( $row );
  }
  
	/**
	 * translates field to column names
	 * @todo: use "normalize" / "unnormalize"?? concept
	 * @param array $row
	 * @return array
	 */
	function _fieldsToColumns ( $row=null )
	{
    $translatedRow = array();
		foreach ( $row as $field => $value )
		{
			$column = $this->getColumnName($field);
			if ( $column and $value )
			{
		  	$translatedRow[$column]=$value;	
			}
		}
		return $translatedRow;
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
   * Returns a hash map of ids the modification timestamp
   * @return array
   */
  function getModificationList()
  {
    if ( ! $this->key_modified )
    {
      $this->raiseError("Table {$this->table} has no timestamp column");
    }
    
    $rows = $this->db->getAllRecords("
      SELECT 
        {$this->key_id}       AS id,
        {$this->key_modified} AS timestamp
      FROM {$this->table}
    ") ;  
    $map = array();
    foreach ($rows as $row)
    {
      $map[$row['id']] = $row['timestamp'];
    }
    return $map;
  }
  
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
      SET `{$this->key_modified}` = NOW()
      WHERE `{$this->key_id}` IN ($ids)
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
    
  
	//-------------------------------------------------------------
  // SQL Table Maintenance AP
  //-------------------------------------------------------------



  /**
   * checks whether model table(s) have been initialized
   * @return Boolean
   * @param $table string[optional] defaults to model able
   */
  function isInitialized ( $table=null )
  {
    //$this->createXml($table);
    $flags = $this->_getInitFlags();
    $table = either ( $table, $this->table );
    return ( $flags[$table] == true );
  }  

  
  /**
   * sets the initialized state of model table(s) 
   * @return 
   * @param $table String[optional] defaults to model table
   * @param $value Bool[optional] defaults to true
   */
  function setInitialized ($table=null, $value=true)
  {
    $flags = $this->_getInitFlags();
    $table = either ( $table, $this->table );
    $flags[$table] = $value;
    $this->_setInitFlags($flags);    
  }  
  
  function _setInitFlags ($flags)
  {
    $init_flags   = "bibliograph_table_init";
    $this->_initFlags = $flags;
    $this->store($init_flags,$flags);
  }  
  
  function _getInitFlags ()
  {
    $init_flags   = "bibliograph_table_init";
    if ( ! $this->_initFlags  )
    {
      $this->_initFlags = (array) $this->retrieve($init_flags);
    }
    return $this->_initFlags;
  }

  /**
   * initializes tables, i.e. either creates them if they do not exist or
   * update them if their definition has changed. this should only be done
   * once per session
   * @return void
   * @param mixed $tables (array of) table name(s)
   */
  function initializeTables($tables)
  {   
    $tables       = (array) $tables;
    
    foreach ( $tables as $table )
    {    
      // ensure each table is only checked once
      if ( $this->isInitialized( $table) )
      {
        continue;
      }
     
      // do checks and updates
      $this->info("*** Initializing table '$table' ***");
      if ( $this->checkCreateTable($table) or 
           $this->updateTableStructure($table) )
      {
        // success
        $this->setInitialized($table,true);
      }
    }
  }
  
  /**
   * check table and create it if necessary
   * @return boolean true if table was created, false if it already exists
   */
  function checkCreateTable($table)
  {
     if ( $this->db->tableExists( $table ) )
     {
       $this->info("Checking if table '$table' exists ... Yes");
       return false;
     }
     else
     {
       $this->info("Checking if table '$table' exists ... No, creating it.");
       $this->createTable($table);       
       return true;
     }
  }
  
  /**
   * create a table. override if necessary
   * @deprecated
   */
  function createTable($table)
  {
    $createSql = $this->loadSql($table);
    if ( ! $createSql )
    {
      $file = $this->getSqlFileName($table);
      $this->raiseError ("Cannot create table $table - sql file '$file' does not exist.");
    }
    $this->db->execute($createSql);
    $this->createTriggers($table);
    $this->createFunctions($table);
    $this->addInitialValues($table);
  }
  
  /**
   * adds initial values, using an sql file. To be overridden by table-specific methods
   * @todo: intial values from xml and not from sql
   */
  function addInitialValues($table)
  {  
    $sql = $this->loadSql( $table . ".values" );
    if ( $sql )
    {
      $this->info("Adding initial values ...");
      foreach ( explode(";", $sql ) as $part )
      {
        if ( $part = trim($part) )
        {
          $this->db->execute( $part );
        }
      }
    }      
  }

  /**
   * adds table-related triggers.
   * db user needs "SUPER" (mysql < 5.1) or "TRIGGER" (mysql >= 5.1) privileges
   */
  function createTriggers($table)
  {
    $file = $this->getSqlFileName($table . ".triggers" );
    if ( file_exists ( $file ) )
    {
      $this->info("Creating triggers...");
      $database  = $this->db->getDatabase();
      $sql       = str_replace('$table', $table, 
                    str_replace('$database',$database, file_get_contents ( $file ) ) ) ;
      foreach ( explode(";",$sql) as $part )
      {
        if ( $part = trim($part) )
        {
          $this->db->execute( $part );
        }
      }
    }
  } 

  /**
   * adds table-related functions.
   */
  function createFunctions($table)
  {
    $file = $this->getSqlFileName($table . ".functions" );
    if ( file_exists ( $file ) )
    {
      $this->info("Creating functions...");
      $database  = $this->db->getDatabase();
      $content   = file_get_contents ( $file );
      eval('$sql = "' . str_replace('"',"'",$content) . '";'); 
      foreach ( explode("###",$sql) as $part )
      {
        if ( $part = trim($part) )
        {
          $this->db->execute( $part );
        }
      }
    }
  }

  /**
   * gets table structure as sql create statement from database
   * @return string
   */
  function getCreateTableSql($table)
  {
    return $this->db->getCreateTableSql($table);
  }
  
  /**
   * gets name of file where table create sql is stored for a table
   * @return string
   * @param $table string
   */
  function getSqlFileName($table)
  {
    $application = substr(get_class($this),0,strpos(get_class($this),"_"));
    $type = $this->db->getType();
    return SERVICE_PATH . "{$application}/sql/{$table}.$type.sql";
  }

  /**
   * returns sql statement to create a table loaded from the filesystem
   * @return string
   * @param $name string name
   */
  function loadSql($name)
  {
    $file = $this->getSqlFileName($name);
    if ( file_exists ($file) )
    {
      $this->log("Checking for file '$file' ... Exists.");
      return  file_get_contents($file);
    }
    else
    {
      $this->log("Checking for file '$file' ... Does not exist.");
      return null;
    }
  }

  /**
   * saves the sql commands necessary to create the table into a file. 
   * This will not overwrite an existing file. If you want to update
   * the sql stored in the file system from the structure existing in the 
   * database, remove the file and $this->setInitialized($table,false).
   * @return boolen success
   * @deprecated
   * 
   */
  function saveTableStructureSql($table)
  {
      $file = $this->getSqlFileName($table);
      if ( ! file_exists( $file ) and is_writeable ( dirname ( $file ) ) )
      {
        $sql = $this->getCreateTableSql($table);
        file_put_contents($file, $sql );        
        $this->info("Stored sql for {$table}");
        return true;
      }
      else
      {
        $this->warn ( dirname ( $file ) . " exists or is not writable. Updated sql is not stored.");
        return false;
      }
  }


  /**
   * updates or creates table in database if it doesn't exist yet
   * @param string $table 
   * @deprecated
   * @return 
   */
  function updateTableStructure($table)
  {
    $this->info ( "Checking for an update for table '$table'...");
   
    if ( ! file_exists ( $this->getSqlFileName($table) ) )
    {
      // store sql to create this table
      // this is only for the developer who wants to synchronize a 
      // changed table structure in the database with the sql in 
      // the file system.
      return $this->saveTableStructureSql($table);
    }
    
    // compare table structure with structure and update table if there is a change
    $currentSql   = $this->getCreateTableSql($table); // from database
    $normativeSql = $this->loadSql($table); // from file
    if ( $currentSql != $normativeSql )
    {
      $this->db->updateTableStructure( $table, $normativeSql );
      $this->saveTableStructureSql($table);
      $this->info ("Updated table '$table'.");
    }
    else
    {
      $this->info ( "Table '$table' is up to date.");
    }
    return true;
  }
  
  /**
   * sets datasource information
   * @param mixed $datasource Either the name of the datasource or an object reference to t
   * @return void
   */
  function setDatasource($datasource)
  {
    if ( is_string($datasource) and trim($datasource))
    {
      $this->datasource = $datasource;
    }
    else
    {
      $this->raiseError("Invalid datasource '$datasource");
    }
  }
  
  /**
   * returns datasource information
   * the datasource object
   * return string
   */
  function getDatasource()
  {
    if ( is_string($this->datasource) ) return $this->datasource;
    if ( is_object ($this->datasourceModel) )
    {
      return $this->datasourceModel->getName();
    }
    $this->raiseError("Neither datasource name or model available");
  }

  /**
   * stores the name or object reference of the datasource
   * @param mixed $datasource Either the name of the datasource or an object reference to t
   * the datasource object
   * return void
   */
  function setDatasourceModel($datasource)
  {
    if ( is_object ($datasource) and is_a($datasource,"qcl_datasource_model") )
    {
      $this->datasourceModel =& $datasource;
    }
    else
    {
      $this->raiseError("Argument must be a qcl_datasource_model object");
    }
  }  
  
  /**
   * retrieves the datasource object or name
   * @return qcl_datasource_model or string 
   */
  function &getDatasourceModel()
  {
    return $this->datasourceModel;
  }

  /**
   * initializes the model
   * @param mixed $datasource Either the name of the datasource or an object reference to t
   * the datasource object, or null if model is independend of a datasource
   * @return void
   */
  function initialize($datasource=null)
  {
    /*
     * set datasource
     */
    if ( is_string($datasource) )
    {
      //@todo: $this->setDatasource($datasource);
      $this->datasource = $datasource;
    }
    elseif ( is_object($datasource) )
    {
      $this->setDatasourceModel($datasource);
    }
    
    /*
     * setup schema and create or update tables if necessary
     */
    $this->setupSchema();
    
    /*
     * setup properties 
     */
    $this->setupProperties();
    
    /*
     * import initial data if necessary
     */
    $path = $this->getDataPath();
    if ( file_exists($path) and ( $this->schemaXml->hasChanged() or $this->fileChanged($path) ) )
    {
      $this->import($path);
    }
    else
    {
      $this->info("No data to import.");
    }
  }
  
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
    $definition =& $this->schemaXml->getNode("/model/definition");
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
    $datasourceName = $this->datasource;
    return $datasourceName ? 
      ( $datasourceName . "_" ) : "";
  }
  
  /**
   * returns the absolute path of the xml file that
   * is connected by default to this model. It is located
   * in the same directory as the class file 
   * path/to/class/classname.schema.xml
   * return string
   */
  function getXmlSchmemaPath()
  {
    $class = get_class($this);
    return str_replace("_","/",$class) . ".model.xml";
  }
  
  /**
   * parse xml schema file and, if it has changed, create or update
   * all needed tables and columns. schema document will be available
   * as $this->schemaXml afterwards
   * @param string $path path of schema xml file or null if default file is used
   * @return void
   */
  function setupSchema($path=null,$sqltype="mysql")
  {
    
    /*
     * parse schema file
     */
    $path = either($path, $this->getXmlSchmemaPath());
    if ( !is_valid_file($path) )
    {
      $this->raiseError("qcl_db_model::updateTablesFromXmlSchema: No valid file path: '$path'");
    }
    
    /*
     * get schema document 
     */
    $this->schemaXml =& $this->parseXmlSchemaFile($path); 
    $modelXml =& $this->schemaXml;    
    $doc =& $modelXml->getDocument();
    
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
     * the table name is either provided as the 'table' property
     * of the class, usually prefixed by the datasource name, if applicable to the model 
     */
    $this->table = either( $this->getTablePrefix() . $modelAttrs['table'] );
        
    /*
     * return if table exists and schema hasn't changed
     */
    if ( $this->db->tableExists($this->table) and !$modelXml->hasChanged() ) 
    {
      $this->info("Schema document for model name '{$this->name}', type '{$this->type}', class '{$this->class}' hasn't changed.");
      return;
    }  
    
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
      
      //@todo: accept either <$sqltype> or <sql type="$sqltype">
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
  }
    
  /**
   * parses an xml schema file, processing includes
   * @param string $file
   * @return qcl_xml_simpleXML
   */
  function &parseXmlSchemaFile($file)
  {
    require_once ("qcl/xml/simpleXML.php");
    
    /*
     * load model schema xml file
     */
    $this->info("Loading model schema file '$file'...");
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
      $this->info("Including '$includeFile' into '$file'...");
      $parentXml   =& $this->parseXmlSchemaFile($includeFile);
      $modelXml->extend($parentXml);
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
    $records = $this->getAllRecords();
    
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
   * checks if a property has a local alias 
   *
   * @param string $propName property name
   */
  function hasAlias($propName)
  {
    return ( isset( $this->aliasMap[$propName] ) );
  }
  
  /**
   * get the local alias of a property name, or
   * return the name if no alias exists
   * @param string $propName property name
   * @return string alias or property name
   */
  function getAlias($propName)
  {
    return either ( $this->aliasMap[$propName], $propName );
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