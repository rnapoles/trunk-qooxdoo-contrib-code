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
  
	var $currentRecord;                   // the current record
	var $emptyRecord = array();           // you can pre-insert static values here
	var $metaColumns = array();           // assoc. array containing the metadata fields  => columns
  var $metaFields  = array();           // assoc. array containing the metadata columns => fields
  
	//-------------------------------------------------------------
  // internal methods
  //-------------------------------------------------------------

  /**
   * constructor 
   * @param object reference 	$controller
   * @param boolean			$initialize 	if true(default), initialize attached database object
   */
	function __construct( $controller, $initialize=true )
  {
    parent::__construct(&$controller);
		
    if ( $initialize ) 
		{
      $this->init();
		}
    
    // generate list of metadata columns ($key_ ...)
    $this->_initMetaColumns(); 
	}
     	
	//-------------------------------------------------------------
  // public non-rpc methods 
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

	//-------------------------------------------------------------
 	// public non-rpc methods 
	//-------------------------------------------------------------   

	/**
	 * initializes the internal database handler 
	 * @param string 	$dsn 
	 */
	function init($dsn=null)
	{
    $this->db =& qcl_db::getSubclass(&$this->controller,$dsn);
    $this->db->model =& $this;
	}
	
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
  
  /**
   * checks if model has a property. in simple db models, properties are
   * equivalent to fields / columns, but more complicated modedls could
   * differentiate between metadata, normalized data fields, and column implementations 
   * @return boolean
   * @param string $name
   */
  function hasProperty($name)
  {
    return $this->hasColumn($name);
  }
  
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
   * gets all database records optionally sorted by field
   * @param string|null 		$orderBy 	(optional) order by field
   * @return Array Array of db record sets
   */
 	function getAllRows($orderBy=null)
  {  
    return $this->getRowsWhere(null,$orderBy);
  }  
  
 	/**
   * gets all database records or those that match a where condition
   * @param string 			  $where   	where condition to match, if null, get all
   * @param string|null 	$orderBy 	(optional) order by field
   * @param array|null		$fields		(optional) Array of fields to retrieve 
   * @return Array Array of db record sets
   */
 	function getRowsWhere($where=null,$orderBy=null,$fields=null)
 	{
		if ( $fields )
		{
			$fields = "`" . implode("`,`", (array) $fields ) . "`";
		}
		else
		{
			$fields = "*"; 
		}
		
		$sql = "SELECT $fields FROM {$this->table} \n";
		
		if ($where)
		{
			$sql .= "WHERE $where ";
		}
		if ($orderBy)
		{
			$orderBy = implode("`,`", (array) $orderBy );
      $sql .= "ORDER BY `$orderBy`"; 
		}
      return $this->db->getAllRows($sql);   	
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
	 * @param boolean result
	 */
	function namedIdExists( $namedId )
	{
		$row = $this->getByNamedId ( $namedId );
		return count($row) ? true : false;
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

	/**
	 * gets the value of a column in a record without field->column translation 
	 * @param string	$column 	
	 * @param int		  $id	if omitted, use current record
	 */
	function getColumnValue($column, $id = null)
	{
		$row = $id ? $this->getById($id) : $this->currentRecord;
		if ( count ( $row ) )
    {
      return $row[$column];
    }
    else
    {
      $this->raiseError("qcl_db_model::getColumnValue : row '$id' does not exist");  
    }
	}

	/**
	 * sets the value of a column in a record without field->column translation 
	 * @param string	$column
	 * @param mixed		$value
	 * @param int		  $id 	if omitted, modify current record cache without updating the database 
	 */
	function setColumnValue( $column, $value, $id=null )
	{
		if( $id )
		{
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
	 * @param string 	$field 		field name	
	 * @param int		$recordId 	if omitted, use current record 
	 */
	function getFieldValue ( $field, $recordId=null )
	{
		$columnName	= $this->getColumnName( $field );
		
		if ( ! $columnName )
		{
			$this->raiseError ( "qcl_db_model::getFieldValue : Invalid field '$field'");
		}		
		
		return $this->getColumnValue($columnName,$recordId);
	}

	/**
	 * translates field names to column names and sets value of field in current record
	 * @param string	$field			field name to translate
	 * @param mixed		$value	
	 * @param int		$recordId 		if omitted, modify current record cache without updating the database 
	 * @return void
	 */
	function setFieldValue ( $field, $value, $recordId=null )
	{
		$columnName	= $this->getColumnName($field);
		
		if ( ! $columnName )
		{
			$this->raiseError ( "qcl_db_model::setFieldValue : Invalid field '$field'");
		}
		
		$this->setColumnValue( $columnName, $value, $recordId );
	}

	/**
	 * translates column to field names
	 * @param array $row
	 * @todo: use "normalize" / "unnormalize"?? concept
	 * @return array
	 */
	function columnsToFields ( $row )
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
    if ( $this->key_created and ! isset ( $data[$this->key_created] ) )
    {
      $data[$this->key_created] = strftime("%Y-%m-%d %T");
    }
    
    // modified timestamp
    if ( $this->key_modified and ! isset ( $data[$this->key_created] )  )
    {
      $data[$this->key_modified] = strftime("%Y-%m-%d %T");
    } 
    
    return $this->db->insert( $this->table,$data );
 	}

	/**
	 * updates a record in a table identified by id
	 * @param array 	$data 	associative array with the column names as keys and the column data as values
	 * @param boolean	$id		if the id key is not provided in the $data paramenter, provide it here (optional)
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
    
    // modified timestamp
    if ( $this->key_modified )
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
	 * @param string 	$where where condition
	 */
	function deleteWhere ( $where )
	{
		$this->db->deleteWhere ( $this->table, $where );
	} 

  function _getInitFlags ()
  {
    $database     = $this->db->getDatabase();
    $init_flags   = "bibliograph_table_init_{$database}";
    if ( ! $this->_initFlags  )
    {
      $this->_initFlags = (array) $this->retrieve($init_flags);
    }
    return $this->_initFlags;
  }

  function _setInitFlags ($flags)
  {
    $database     = $this->db->getDatabase();
    $init_flags   = "bibliograph_table_init_{$database}";
    $this->_initFlags = $flags;
    $this->store($init_flags,$flags);
  }

  /**
   * checks whether model table(s) have been initialized
   * @return Boolean
   * @param $table string[optional] defaults to model able
   */
  function isInitialized ( $table=null )
  {
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
    $database     = $this->db->getDatabase();
    
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
   */
  function createTable($table)
  {
    $createSql  = $this->loadSql($table);
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
   * saves the sql commands necessary to create the table into a file 
   * @return boolen success
   */
  function saveTableStructureSql($table)
  {
      $file = $this->getSqlFileName($table);
      if ( is_writeable ( dirname ( $file ) ) )
      {
        if ( ! file_exists( $file ) or is_writeable ( $file ) )
        {
          $sql = $this->getCreateTableSql($table);
          file_put_contents($file, $sql );        
          $this->info("Stored sql for {$table}");
          return true;
        }
        else
        {
          $this->warn ( "Problem saving structure of $table in file $file.");
          return false;
        }
      }
      else
      {
        $this->warn ( dirname ( $file ) . " is not writable. Cannot store sql.");
        return false;
      }
  }


  /**
   * updates or creates table in database if it doesn't exist yet
   * @param string $table 
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
   * Returns a hash map of ids the modification timestamp
   * @return array
   */
  function getModificationList()
  {
    if ( ! $this->key_modified )
    {
      $this->raiseError("Table {$this->table} has no timestamp column");
    }
    
    $rows = $this->db->getAllRows("
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
  
}	
?>