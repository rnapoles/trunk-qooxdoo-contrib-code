<?php

require_once SERVICE_PATH . "qcl/jsonrpc/object.php"; 
 
/**
 * abstract class for rpc objects which do database queries
 * implemented by subclasses with specific database adapters
 */
class qcl_db extends qcl_jsonrpc_object 
{

	/**
	 * @var object $db database handler
	 */
	var $db;
	
	/**
	 * @var string $dsn database dsn, gets read from configuration file
	 */
	var $dsn;
	
	/**
	 * constructor, reads database configuration
	 */
	function __construct()
	{
		parent::__construct(); 
		$this->dsn 	= $this->ini['database']['dsn'];
		$this->db 	= $this->connect();
	}
		
	//-------------------------------------------------------------
	// static methods
	//-------------------------------------------------------------
	
	/**
	 * static method which returns a database object based on the configuration file
	 * @param array $ini initial configuration array
	 * @return always returns a PEAR object at the moment
	 */
	function &getSubclass($ini)
	{
		//$db = &$this->getSingleton("qcl_db_pear");
		//if ( ! $db )
		//{
			require_once SERVICE_PATH . "qcl/db/pear.php";
			$db = new qcl_db_pear();
			//$this->setSingleton(&$db);
		//}
		return $db;
	}		
	
	//-------------------------------------------------------------
	// abstract methods
	//-------------------------------------------------------------

	/**
	 * makes connection
	 */
	function &connect () {}
	
	/**
	 * queries database
	 */
	function &query ( $sql ) {}
	
	/**
	 * executes a query, alias of $this->query
	 */
	function &execute ( $sql ) {}

	/**
	 * get first row of result set
	 */
	function &getRow ( $sql ) {}

	/**
	 * gets the value of the first cell cell of the first row of the result set
	 * useful for example for "SELECT count(*) ... " queries
	 */
	function &getValue ( $sql ) {}
	
	/**
	 * gets whole result set mapped to array
	 */
	function &getAllRows ( $sql ) {}
	
	/**
	 * inserts a record into a table and returns last_insert_id()
	 * @param string $table table name
	 * @param array $data associative array with the column names as keys and the column data as values
	 */
	function insert ( $table, $data ) {}
	
	/**
	 * updates a record in a table identified by id
	 * @param string $table table name
	 * @param array $data associative array with the column names as keys and the column data as values
	 * @param string $idColumn name of column containing the record id 
	 */
	function update ( $table, $data, $idColumn ) {}

	/**
	 * deletes a record in a table identified by id
	 * @param string $table table name
	 * @param string $idColumn name of column containing the record id 
	 */
	function delete ( $table, $data, $idColumn ) {}
	
	/**
	 * escapes strings for use in sql queries
	 */
	function escape ( $string ) {}
	
	/**
	 * gets last inserted primary key
	 */
	function getLastInsertId() {}
	
	/**
	 * disconnects from database
	 */
	function disconnect() {}
	
	/**
	 * destructor, disconnects from database
	 */
	function __destruct()
	{
		$this->disconnect();
	}
}


?>