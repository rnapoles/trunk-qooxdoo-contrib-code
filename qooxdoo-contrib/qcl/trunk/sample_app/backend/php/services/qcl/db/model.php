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
    
	var $db; 				         // the database object
	var $currentRecord;		   // the current record
	var $file;               // the file holding table structure information
         	
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
	 * @param string 			$dsn
	 */
	function init($dsn=null)
	{
    $this->db = &qcl_db::getSubclass(&$this->controller,$dsn);
    $this->db->model = &$this;
    
    // check structure update once per call
    if ( ! $this->_update )
    {
      $this->updateTableStructure();
      $this->_update = true;
    }
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
   * gets the structure of the database table which holds the model data
   * @return array
   */
  function getTableStructure()
  {
    return $this->db->getColumnMetaData($this->table);
  }
	
  /**
   * gets table structure as sql create statement
   * @todo: this must use the db object for cross-DBMS!
   * @return 
   */
  function getTableCreateSql()
  {
    $row = $this->db->getRow("SHOW CREATE TABLE {$this->table}");
    return $row['Create Table'];
  }
  
  /**
   * dumps table structures into a special folder where it can be manipulated
   */
  function dumpTableStructure($file)
  {
    $content = "<?php return " . var_export ( $this->getTableStructure(), true ) . "; ?>";
    file_put_contents($file, $content );
  }

  /**
   * dumps table structures into a special folder where it can be manipulated
   */
  function dumpTableStructureSql($file)
  {
    $sql = $this->getTableCreateSql($file);
    file_put_contents($file, $sql );
  }
  
  /**
   * loads table structure from file
   */
  function loadTableStructure($file)
  {
    $structure = include ($file);
    return $structure;
  }
  
  /**
   * updates or creates table in database if it doesn't exist yet
   * @return 
   */
  function updateTableStructure()
  {
     if ( $this->table )
     {
       $file = SERVICE_PATH . "bibliograph/sql/" . $this->table . ".sql";
       if ( ! file_exists ( $file ) and is_writeable ( dirname ( $file ) ) )
       {
         $this->dumpTableStructureSql($file);
       }       
     }
  }
  
  

}	
?>