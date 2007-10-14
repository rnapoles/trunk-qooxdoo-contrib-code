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
    
	var $db; 				// the database object 
    var $currentRecord;		// the current record
         	
	//-------------------------------------------------------------
    // internal methods
    //-------------------------------------------------------------

   /**
    * constructor 
    * @param object reference $controller
    */
	function __construct($controller)
   	{
		parent::__construct(&$controller);
		$this->db = qcl_db::getSubclass(&$controller); // pass the controller to the object instance
	}   	

	//-------------------------------------------------------------
   	// public non-rpc methods 
	//-------------------------------------------------------------   

 	/**
 	 * sets data source for class
 	 * @param string $name
 	 * @todo un-hardcode table name conventions
 	 */
 	function setDatasource ( $name )
 	{
 		$this->raiseError("qcl_db_model::setDatasource not implemented!");
 	}

 	/**
 	 * sets controller of this model and passes it to linked database object
 	 * @param object $controller
 	 */
 	function setController ( $controller )
 	{
 		$this->controller = &$controller; 
 		$this->db->setController(&$controller);
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
    * @return Array Db record set
    */
   	function getById( $id = null )
   	{
		if ( $id !== null )
		{
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
				$this->raiseError("folder::getById : no id given, but no record cached!");
			}
		}
        return $this->currentRecord;
   }

	/**
	 * translates field names to column names and returns value of field in current record
	 */
	function getField ( $field )
	{
		$varName 	= "key_$field";
		$columnName	= $this->$varName;
		return $this->currentRecord[$columnName];
	}

	/**
	 * translates field names to column names and sets value of field in current record
	 * @param string	$field			field name to translate
	 * @param mixed		$value	
	 * @param boolean	$forceUpdate	whether to update the database immediately (default:false)
	 * @return void
	 */
	function setField ( $field, $value, $forceUpdate=false )
	{
		$varName 	= "key_$field";
		$columnName	= $this->$varName;
		
		if ( ! $columnName )
		{
			$this->raiseError ( "qcl_db_model::setField : Invalid field '$field'");
		}
		
		$this->currentRecord[$columnName]=$value;
		
		if ( $forceUpdate )
		{
			$data = array();
			$data[$columnName] = $value;
			$data[$this->key_id] = $this->currentRecord[$this->key_id];
			$this->update($data);
		}
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
		if ($data == null)
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
	 * @todo : check for linked entries, either delete them or refuse to delete
	 * @param mixed $ids (array of) record id(s)
	 */
	function delete ( $ids )
	{
		$this->db->delete ( $this->table, $ids, $this->key_id );
	} 
	
}	

?>