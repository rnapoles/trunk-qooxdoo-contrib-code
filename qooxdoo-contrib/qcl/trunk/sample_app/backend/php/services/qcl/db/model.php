<?php

// dependencies
require_once  SERVICE_PATH . "qcl/jsonrpc/model.php";
require_once  SERVICE_PATH . "qcl/db/db.php";

/**
 * simple controller-model architecture for jsonrpc
 * common base class for models
 */

class qcl_db_model extends qcl_jsonrpc_model
{
	//-------------------------------------------------------------
    // instance variables
    //-------------------------------------------------------------
    
	var $db; // the database object 
	
	//-------------------------------------------------------------
    // internal methods
    //-------------------------------------------------------------

   /**
    * constructor 
    */
	function __construct()
   	{
		parent::__construct();
		$this->db = qcl_db::getSubclass($this->ini);
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
	 */
	function setField ( $field, $value )
	{
		$varName 	= "key_$field";
		$columnName	= $this->$varName;
		
		$data = array();
		$this->currentRecord[$columnName]=$value;
		$data[$this->key_id];
		$data[$columnName] = $value;
		$this->db->update($data);
	}
	
}	

?>