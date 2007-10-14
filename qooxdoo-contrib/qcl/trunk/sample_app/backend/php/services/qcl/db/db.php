<?php

require_once ("qcl/jsonrpc/model.php"); 
 
/**
 * abstract class for rpc objects which do database queries
 * implemented by subclasses with specific database adapters
 */
class qcl_db extends qcl_object
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
	 * @var controller object
	 */
	var $controller;
	
	/**
	 * constructor, reads database configuration
	 * @param object reference $controller	
	 */
	function __construct($controller)
	{
		parent::__construct();
		if ( ! is_a( $controller, "qcl_jsonrpc_controller" ) )
		{
			$this->raiseError ("qcl_db : Cannot instantiate " . get_class($this) . " object: No controller object provided.");
		}
		$this->controller = &$controller;
		$this->init();	
	}
		
	//-------------------------------------------------------------
	// static methods
	//-------------------------------------------------------------
	
	/**
	 * static method which returns a database object based on the configuration file
	 * @param object reference $controller	
	 * @return always returns a PEAR object at the moment
	 */
	function &getSubclass($controller)
	{
		if ( ! is_a($controller,"qcl_jsonrpc_controller" ) )
		{
			$this->raiseError ("qcl_db : Cannot instantiate " . get_class($this) . " object: No controller object provided.");
		}
		//$db = &$this->getSingleton("qcl_db_pear");
		//if ( ! $db )
		//{
			require_once ("qcl/db/pear.php");
			$db = &new qcl_db_pear(&$controller);
			//$this->setSingleton(&$db);
		//}
		return $db;
	}		

	//-------------------------------------------------------------
	// instance methods 
	//-------------------------------------------------------------

	/**
	 * initializes the object
	 * @param string	$dsn 	optional dsn string overriding the dsn provided by the controller
	 */
	function init( $dsn = null )
	{
		$this->dsn 	= $dsn ? $dsn : $this->controller->getConfigValue("database.dsn");
		$this->db 	= $this->connect();		
	}

	/**
	 * getter for DSN 
	 * return string
	 */
	function getDsn()
	{
		return $this->dsn;		
	}

	//-------------------------------------------------------------
	// abstract methods to be implemented
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