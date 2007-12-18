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
  
  var $key_id         = "id";   // column with unique numeric id 
  var $key_namedId    = null;   // unique string id, optional  
  
  //-------------------------------------------------------------
  // instance variables
  //-------------------------------------------------------------
  
	var $currentRecord; // the current record

	//-------------------------------------------------------------
  // internal methods
  //-------------------------------------------------------------

  /**
   * constructor 
   * @param object reference 	$controller
   * @param boolean			$initialize 	if true(default), initialize attached database object
   */
	function __construct($controller,$initialize=true)
  {
    parent::__construct(&$controller);
		if ( $initialize ) 
		{
      $this->init();
		}
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
   * @param string 			$where   	where condition to match, if null, get all
   * @param string|null 		$orderBy 	(optional) order by field
   * @param array|null		$fields		(optional) Array of fields to retrieve 
   * @return Array Array of db record sets
   */
 	function getRowsWhere($where=null,$orderBy=null,$fields=null)
 	{
		if ( $fields )
		{
			$fields = "`" . implode("`,`", $fields) . "`";
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
			$sql .= "ORDER BY `$orderBy`"; 
		}
      return $this->db->getAllRows($sql);   	
 	}

 	/**
   * gets values of database columns that match a where condition
   * @param string			$column		name of column 
   * @param string 			$where   	where condition to match, if null, get all
   * @param string|null 		$orderBy 	(optional) order by field
   * @return array Array of values
   */
 	function getValues($column,$where=null,$orderBy=null)
 	{	
		$sql = "SELECT `$column` FROM {$this->table} \n";
		
		if ($where)
		{
			$sql .= "WHERE $where ";
		}
		if ($orderBy)
		{
			$sql .= "ORDER BY `$orderBy`"; 
		}
    return $this->db->getValues($sql);   	
 	}

 	/**
   * gets all distinct values of database columns that match a where condition
   * @param string			$column		name of column 
   * @param string 			$where   	where condition to match, if null, get all
   * @param string|null 		$orderBy 	(optional) order by field
   * @return array Array of values
   */
 	function getDistinctValues($column,$where=null,$orderBy=null)
 	{	
		$sql = "SELECT DISTINCT `$column` FROM {$this->table} \n";
		
		if ($where)
		{
			$sql .= "WHERE $where ";
		}
		if ($orderBy)
		{
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
	 * creates a new record and 
	 * optionally links it to a role
	 * @param string	$namedId
	 * @param int		$parentId 	id of role (unused if class is qcl_auth_role)
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
	function setColumnValue($column,$value,$id=null)
	{
		if( $id )
		{
			$data = array();
			$data[$this->key_id] = $recordId;
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
		$varName 	= "key_$field";
		$columnName	= $this->$varName;
		
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
		$varName 	= "key_$field";
		$columnName	= $this->$varName;
		
		if ( ! $columnName )
		{
			$this->raiseError ( "qcl_db_model::setFieldValue : Invalid field '$field'");
		}
		
		$this->setColumnValue($columnName,$value,$recordId);
	}

	/**
	 * inserts a record into a table and returns last_insert_id()
	 * @return int the id of the inserted row 
	 */
	function create()
   	{
   		$row = array();
   		$row[$this->key_id]=null;
   		$id = $this->db->insert($this->table,$row);
   		$this->getById($id);
   		return $id;
   	}

	/**
	 * inserts a record into a table and returns last_insert_id()
	 * @param array $data associative array with the column names as keys and the column data as values
	 * @return int the id of the inserted row 
	 */
	function insert( $data )
 	{
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
	
  /**
   * initializes tables, i.e. either creates them if they do not exist or
   * update them if their definition has changed. this should only be done
   * once per session
   * @return void
   * @param mixed $tables (array of) table name(s)
   */
  function initializeTables($tables)
  {   
    $tables = (array) $tables;
    
    foreach ( $tables as $table )
    {    
      // $this->addFunctions($table);
      // ensure this is executed only once per session
      $sessionFlagName = "table_" . $table . "_initialized";
      if ( $this->getSessionVar( $sessionFlagName ) )
      {
        return;
      }
     
      // do checks and updates
      $this->info("*** Initializing table '$table' ***");
      $this->checkCreateTable($table);
      if ( $this->updateTableStructure($table) )
      {
        // success
        $this->setSessionVar($sessionFlagName,true);
      }
    }
  }
  
  /**
   * check table and create it if necessary
   */
  function checkCreateTable($table)
  {
     if ( $this->db->tableExists( $table ) )
     {
       $this->info("Checking if table $table exists ... Yes");
     }
     else
     {
       $this->info("Checking if table $table exists ... No, creating it.");
       $this->createTable($table);       
     }
  }
  
  /**
   * create a table. override if necessary
   */
  function createTable($table)
  {
    $createSql  = $this->loadTableCreateSql($table);
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
   * adds initial values. Empty stub to be overridden.
   */
  function addInitialValues()
  {
    // do nothing.
  }

  /**
   * adds table-related triggers.
   * db user needs "SUPER" (mysql < 5.1) or "TRIGGER" (mysql >= 5.1) priviledges
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
        if ( trim ( $part ) )
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
    $this->info("Creating functions...");
    $file = $this->getSqlFileName($table . ".functions" );
    if ( file_exists ( $file ) )
    {
      $database  = $this->db->getDatabase();
      $content   = file_get_contents ( $file );
      eval('$sql = "' . str_replace('"',"'",$content) . '";'); 
      foreach ( explode("###",$sql) as $part )
      {
        $this->db->execute( $part );
      }
    }
  }

  /**
   * gets table structure as sql create statement from database
   * @return string
   */
  function getTableCreateSql($table)
  {
    return $this->db->getTableCreateSql($table);
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
   * @param $table string Table
   */
  function loadTableCreateSql($table)
  {
    $file = $this->getSqlFileName($table);
    if ( file_exists ($file) )
    {
      //$this->info("Checking for file '$file' ... Exists.");
      return  file_get_contents($file);
    }
    else
    {
      $this->info("Checking for file '$file' ... Does not exist.");
      return null;
    }
  }

  /**
   * saves the sql commands necessary to create the table into a file and returns it
   * @return boolen success
   */
  function saveTableCreateSql($table)
  {
      $file = $this->getSqlFileName($table);
      if ( is_writeable ( dirname ( $file ) ) )
      {
        if ( ! file_exists( $file ) or is_writeable ( $file ) )
        {
          $sql = $this->getTableCreateSql($table);
          //$valuesSql = $this->dumpTableValues($table);
          file_put_contents($file, $sql );        
          $this->info("Stored sql for {$table}");
          return true;
        }
        else
        {
          $this->warn ( "Problem saving $table in file $file.");
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
   
    // store sql to create this table
    if ( ! file_exists ( $this->getSqlFileName($table) ) )
    {
      return $this->saveTableCreateSql($table);
    }
    
    // compare table structure with structure and update table if there is a change
    $currentSql   = $this->getTableCreateSql($table); // from database
    $normativeSql = $this->loadTableCreateSql($table); // from file
    if ( $currentSql != $normativeSql )
    {
      $this->db->updateTableStructure( $table, $normativeSql );
      $this->saveTableCreateSql($table);
      $this->info ("Updated table '$table'.");
    }
    else
    {
      $this->info ( "Table '$table' is up to date.");
    }
  }
  
}	
?>