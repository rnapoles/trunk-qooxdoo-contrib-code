<?php
/*
 * dependencies
 */
require_once "qcl/core/Object.php";

/*
 * constants
 */
define("QCL_LOG_DB","db");
define("QCL_LOG_TABLE_MAINTENANCE","tableMaintenance");

/**
 * abstract class for objects which do database queries
 * implemented by subclasses with specific database adapters
 */
class qcl_db_adapter_Abstract
  extends qcl_core_Object
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
   * Contains a reference to a model if called from a model
   * @access private
   * @var qcl_db_IModel
   */
  var $_model = null;

  /**
   * contains a reference to the controller if called from a model
   * or controller
   * @access private
   * @var qcl_mvc_Controller
   */
  var $_controller = null;

	/**
	 * Constructor
	 * @todo remove dependency on master
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
    if ( is_a( $master,"qcl_mvc_AbstractModel" ) )
    {
      $this->_model  =& $master;
      $this->_controller =& $master->getController();
    }
	  elseif ( is_a( $master,"qcl_mvc_Controller" ) )
    {
      $this->_controller =& $master;
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
   * Getter for model
   * @return qcl_db_IModel
   */
  function &getModel()
  {
    return $this->_model;
  }

  /**
   * Getter for controller
   * @return qcl_mvc_Controller
   */
  function &getController()
  {
    return $this->_controller;
  }


	/**
	 * Initializes and connects the adapter object. Will raise an error if
	 * connection fails.
	 *
	 * @param string $dsn optional dsn string overriding the dsn provided by the controller
	 */
	function init( $dsn = null )
	{
	  /*
	   * we have a valid dsn
	   */
	  if ( is_string($dsn) or is_array($dsn) )
		{
			$this->setDsn($dsn);
 			$this->db =& $this->connect();
 			if ( ! $this->db )
 			{
 			  $this->raiseError($this->getError());
 			}
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
   * Return dsn information as an array of connectin info.
   * @return array
   */
  function getDsnAsArray()
  {
    trigger_error("Not implemented");
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


	/**
	 * Setup the logger object
	 */
  function setupLogger()
  {
    parent::setupLogger();
    qcl_log_Logger::registerFilter( QCL_LOG_DB, "Detailed log messages on database connection and queries",false);
    qcl_log_Logger::registerFilter( QCL_LOG_TABLE_MAINTENANCE, "Modification of table schemas in an sql database",false);

  }
}
?>