<?php

require_once ("qcl/jsonrpc/object.php"); 
 
/**
 * abstract class for objects which do database queries
 * implemented by subclasses with specific database adapters
 */
class qcl_db_abstract extends qcl_jsonrpc_object
{

	/**
	 * @var object database handler
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
	 * The database host
	 * @var string
	 */
  var $host;
  
  /**
   * The port on which the database daemon listens
   */
  var $port;
  
  /**
   * The password needed to access the server
   */
  var $password;
  
  /**
   * contains a reference to a model if called from a model
   * @access private
   * @var qcl_db_model
   */
  var $model = null;
  
  /**
   * contains a reference to the controller if called from a model
   * or controller
   * @access private
   * @var qcl_jsonrpc_controller
   */
  var $_controller = null;  
  
	/**
	 * constructor
	 * 
	 */
	function __construct( $dsn=null, $master=null )
	{
		/*
		 * initialize parent class
		 */
	  parent::__construct();
	  
	  /*
	   * store master objects if given
	   */
    if ( is_a($master,"qcl_jsonrpc_model") )
    {
      $this->model  =& $master;
      $controller   =& $master->getController();
      $this->setController( $controller ); 
    }
	  elseif ( is_a($master,"qcl_jsonrpc_controller") )
    {
      $this->setController( &$master );
    }
	  elseif ( ! is_null( $master ) )
	  {
	    $this->raiseError("Invalid master object: " .  get_class($master) );
	  }
	  
		/*
		 * initialize the connection with the dsn provided
		 */
		$this->init( $dsn );	
	}
  
  /**
   * getter for model
   * @return qcl_jsonrpc_model
   */
  function &getModel()
  {
    return $this->model;
  }

  /**
   * getter for controller
   * @return qcl_jsonrpc_controller
   */
  function &getController()
  {
    return $this->_controller;
  }  

  /**
   * setter for controller
   * @param  qcl_jsonrpc_controller $controller
   */
  function &setController( $controller )
  {
    $this->_controller = &$controller;
  }    
  
  
	/**
	 * initializes the object
	 * @param string	$dsn 	optional dsn string overriding the dsn provided by the controller
	 */
	function init( $dsn = null )
	{
	  /*
	   * we have a valid dsn
	   */
	  if ( is_string($dsn) or is_array($dsn) )
		{
			$this->setDsn($dsn);
 			$this->db = $this->connect();	
		}
		
		/*
		 * if not, throw error
		 */
    else
    {
      $this->raiseError ("Cannot initialize database object " . 
        get_class($this) . ". No DSN available.");  
    }
	}

	//-------------------------------------------------------------
	// accessors
	//-------------------------------------------------------------

	/**
	 * getter for DSN 
	 * return mixed array or string, according to how it was initialized
	 */
	function getDsn()
	{
		return $this->dsn;		
	}
	
	/**
	 * return dsn information as a PEAR::DB compatible dsn string
	 * @return string
	 */
	function getDsnAsString()
	{
	  if ( is_array($this->dsn) )
	  {
  	  return (
  	   $this->type . "://" .
  	   ( $this->userModel ?       $this->userModel : "" ) .
  	   ( $this->password  ? ":" . $this->password  : "" ) .
  	   ( $this->userModel ? "@"                    : "" ) .
  	   $this->host . "/" .
  	   ( $this->port      ? ":" . $this->port      : "" ) .
  	   "/" . $this->database
  	  );
	  }
	  else
	  {
	    return $this->getDsn();
	  }
	}
  
  /**
   * sets and analyzes the dsn for this database
   * @param  string dsn
   * @return 
   */
  function setDsn($dsn)
  {
    $this->dsn = $dsn; 
    if ( is_string ($dsn ) )
    {
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
    elseif ( is_array( $dsn ) )
    {
      foreach ( $dsn as $key => $value )
      {
        $this->$key = $value;
      }
    }
    else
    {
      $this->raiseError("qcl_db::setDsn : Invalid DSN '$dsn'" );
    }
  }
  
  
	/**
	 * Returns database type, such as "mysql"
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
	function connect () {}
	
	/**
	 * queries database
	 */
	function query ( $sql ) {}
	
	/**
	 * executes a query, alias of $this->query
	 */
	function execute ( $sql ) {}

	/**
	 * get first row of result set
	 */
	function getRow ( $sql ) {}

	/**
	 * gets the value of the first cell cell of the first row of the result set
	 * useful for example for "SELECT count(*) ... " queries
	 */
	function getValue ( $sql ) {}
	
	/**
	 * gets whole result set mapped to array
	 */
	function getAllRecords( $sql ) {}
	
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