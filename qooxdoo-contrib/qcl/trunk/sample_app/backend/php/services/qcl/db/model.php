<?php

// dependencies
require_once ("qcl/jsonrpc/model.php");
require_once ("qcl/db/db.php");

/**
 * simple controller-model architecture for jsonrpc
 * common base class for models based on a sql database
 */

class qcl_db_model extends qcl_jsonrpc_model
{
	//-------------------------------------------------------------
  // instance variables
  //-------------------------------------------------------------
    
	var $db; 				                // the database object
	var $currentRecord;		          // the current record

  /**
   * set this to an array of table names which are going to be updated from
   * 
   * @var
   */
	var $updateTables = null;       
         	
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
    $this->db = &qcl_db::getSubclass(&$this->controller,$dsn);
    $this->db->model = &$this;
	}
	
 	/**
 	 * sets controller of this model and passes it to linked database object
 	 * @param object $controller
 	 */
 	function setController ( $controller )
 	{
 		$this->controller = &$controller;
 		if ( $this->db )
 		{
 			$this->db->setController(&$controller);	
 		} 
 	}
 	
   	/**
     * gets all database records or those that match a where condition
     * @param string 			$where   	where condition to match, if null, get all
     * @param string|null 		$orderBy 	(optional) order by field
     * @param array|null		$fields		(optional) Array of fields to retrieve 
     * @return Array Array of db record sets
     */
   	function getAll($where=null,$orderBy=null,$fields=null)
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
   	function getValues($column,$where,$orderBy=null)
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
	 * gets the value of a column in a record without field->column translation 
	 * @param string	$column 	
	 * @param int		$recordId	if omitted, use current record
	 * @todo: synchronize field/column getters and setters
	 */
	function getColumnValue($column,$recordId= null)
	{
		$row = $recordId ? $this->getById($recordId) : $this->currentRecord;
		return $row[$column];
	}

	/**
	 * sets the value of a column in a record without field->column translation 
	 * @param string	$column
	 * @param mixed		$value
	 * @param int		$recordId 	if omitted, modify current record cache without updating the database 
	 */
	function setColumnValue($column,$value,$recordId=null)
	{
		if( $recordId )
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
	function insert( $row )
   	{
   		return $this->db->insert($this->table,$row);
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
   * gets table structure as sql create statement
   * @return 
   */
  function getTableCreateSql($table)
  {
    return $this->db->getTableCreateSql($table);
  }
  
  /**
   * saves the sql commands necessary to create the table into a file and returns it
   * @return boolen success
   */
  function saveTableCreateSql($table,$file)
  {
      if ( is_writeable ( dirname ( $file ) ) )
      {
        if ( ! file_exists( $file ) or is_writeable ( $file ) )
        {
          $sql = $this->getTableCreateSql($table);
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
   * @param mixed $table can be array
   * @return 
   */
  function updateTableStructure($table)
  {
    if ( is_array($table) )
    {
      foreach ( $table as $t )
      {    
        $this->updateTableStructure($t);
      }
      return;
    }
    
    $this->info ( "Checking for an update for table $table...");
    
    $application = substr(get_class($this),0,strpos(get_class($this),"_"));
    $file = SERVICE_PATH . "{$application}/sql/{$table}.sql";
    
    // store sql to create this table
    if ( ! file_exists ( $file ) )
    {
      return $this->saveTableCreateSql($table,$file);
    }
    
    // compare table structure with structure and update table if there is a change
    $currentSql   = $this->getTableCreateSql($table);
    $normativeSql = file_get_contents($file); // strip comments
    if ( $currentSql != $normativeSql )
    {
      $this->db->updateTableStructure( $table, $normativeSql );
      $this->saveTableCreateSql($file);
      $this->info ("Updated table {$table}.");
    }
    else
    {
      $this->info ( "$table is up to date.");
    }
  }
  
}	
?>