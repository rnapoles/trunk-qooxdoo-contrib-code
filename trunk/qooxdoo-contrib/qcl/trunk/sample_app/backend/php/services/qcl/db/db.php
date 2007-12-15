<?php

require_once ("qcl/jsonrpc/model.php"); 
 
/**
 * abstract class for objects which do database queries
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
	 * @var string $type type of database system (mysql, postgres, ...) read from dsn
	 */
	var $type;

	/**
	 * @var string $database name of database, read from dsn
	 */
	var $database;
	
	/**
	 * @var controller object
	 */
	var $controller = null;
	
  var $host;
  var $port;
  var $password;
  
  /**
   * contains a reference to a model if called from a model
   * @var model   
   */
  var $model = null;
  
	/**
	 * constructor
	 * @param object 	$controller 	(optional) A controller object, if called from a model
	 * @param string	$dsn			    (optional) dsn parameter. If omitted, the default database is used
	 */
	function __construct($controller=null,$dsn=null)
	{
		parent::__construct();
		if ( is_a( $controller, "qcl_jsonrpc_controller" ) )
		{
			$this->controller =& $controller;
		}
		$this->init($dsn);	
	}
		
	//-------------------------------------------------------------
	// static methods
	//-------------------------------------------------------------
	
	/**
	 * static method which returns a database object based on the configuration file
	 * @param object 	$controller 	The controller object
	 * @param string	$dsn			    (optional) dsn parameter. If omitted, the default database is used
	 * @return always returns a PEAR object at the moment
	 */
	function &getSubclass($controller=null,$dsn=null)
	{
		if ( ! is_a($controller,"qcl_jsonrpc_controller" ) )
		{
			$this->raiseError ("cql_db : Cannot instantiate " . get_class($this) . " object: No controller object provided. Received a " . get_class($controller) . " object.");
		}

		require_once ("qcl/db/pear.php");
		$db =& new qcl_db_pear(&$controller,$dsn);

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
    if ( $dsn )
		{
			$this->setDsn($dsn);
		}
		elseif ( is_a($this->controller,"qcl_jsonrpc_controller" ) )
		{
			$this->setDsn($this->controller->getConfigValue("database.dsn"));	
		}
    else
    {
  		$this->raiseError ("cql_db : Cannot initialize database object " . 
        get_class($this) . ". No controller found.");    
    }
    
    // if we have a valid dsn, initialize the database
		if ( $this->getDsn() )
		{
 			$this->db = $this->connect();	
		}
    
    // todo: we cannot throw an error here because sometime the database gets
    // initialized later. but this leads to errors which are difficult to trace
    // if we are supposed to initialize here, but the dsn is missing.
	}

	//-------------------------------------------------------------
	// accessors
	//-------------------------------------------------------------

	/**
	 * getter for DSN 
	 * return string
	 */
	function getDsn()
	{
		return $this->dsn;		
	}
  
  /**
   * sets and analyzes the dsn for this database
   * @param  string dsn
   * @return 
   */
  function setDsn($dsn)
  {
    $this->dsn = $dsn; 
    $matches = array();
    preg_match(
      "/([^:]+):\/\/([^:]*):?([^@]+)@([^\/:]+):?([^\/]*)\/(.+)/",
      $dsn, $matches
    );
    $this->type     = $matches[1];
    $this->user     = $matches[2];
    $this->password = $matches[3];
    $this->host     = $matches[4];
    $this->port     = $matches[5];
    $this->database = $matches[6];
  }
  
  
	/**
	 * getter for database type
	 * return string
	 */
	function getType()
	{
		return $this->type;		
	}

	/**
	 * getter for database user
	 * return string
	 */
	function getUser()
	{
		return $this->user;		
	}

	/**
	 * getter for database user
	 * return string
	 */
	function getPassword()
	{
		return $this->password;		
	}

	/**
	 * getter for database host
	 * return string
	 */
	function getHost()
	{
		return $this->host;		
	}

	/**
	 * getter for database port
	 * return string
	 */
	function getPort()
	{
		return $this->port;		
	}

  /**
   * getter for database name
   * @return string
   */
  function getDatabase()
  {
    return $this->database;
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
	 * deletes one or more records in a table matching a where condition
	 * @param string 	$where where condition
	 */
	function deleteWhere ( $where ){} 
	
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
	
}


?>