<?php
/**
 * qcl: qooxdoo component library
 * 
 */

// helper functions
require_once("qcl/functions.php");

// php4 object compatibility patch
require_once("qcl/patched_object.php");

// log constants
define( "QCL_LOG_FILE" ,	QCL_LOG_PATH . "bibliograph.log" ); // todo: make application-specific!
define( "QCL_LOG_OFF", 		0 );
define( "QCL_LOG_DEBUG", 	1 );
define( "QCL_LOG_INFO", 	2 );
define( "QCL_LOG_WARN", 	3 );
define( "QCL_LOG_ERROR", 	4 );

if ( ! defined("QCL_LOG_LEVEL") )
{
	 define("QCL_LOG_LEVEL",QCL_LOG_ERROR);
}

// Stack Trace
$GLOBALS['_stackTrace'] = array();

/**
 * base class of all qcl classes.
 * provides cross-version (PHP4/PHP5) mixins and interfaces
 * mixin code is adapted from Ivo Jansch's blog at 
 * http://www.jansch.nl/2006/08/23/mixins-in-php/
 * 
 */
class qcl_object extends patched_object 
{

   //-------------------------------------------------------------
   // instance variables
   //-------------------------------------------------------------

	/**
	 * @var string
	 */
	var $error;
	
	/**
	 * array of class names that will be loaded as mixins. 
	 * @var array 
	 */
  var $mixins = array();

  /**
   * internal cache for classes that have been mixed in
   */
  var $_mixinlookup = array();
  
	/**
	 * Class constructor
	 */
	function __construct() 
	{
		parent::__construct();
		
		/*
		 * apply mixins
		 */
    if (is_array($this->mixins))
    {
      foreach($this->mixins as $mixin)
      {
        $this->mixin( $mixin );
      }
    }
	}

  //-------------------------------------------------------------
  // public methods
  //-------------------------------------------------------------

  /**
   * getter for error message
   * @return string
   */
  function getError()
  {
    return $this->error;
  }

  /**
   * setter for error message
   * @return string
   */
  function setError( $error )
  {
    $this->error = $error;
  }
   
  /**
   * get include path for a class name
   * @return 
   * @param $classname
   */
  function getClassPath($classname)
  {
    // delete JsonRpcClassPrefix
    if ( substr($classname,0,strlen(JsonRpcClassPrefix)) == JsonRpcClassPrefix )
    {
	    $pathname = substr($classname,strlen(JsonRpcClassPrefix));        	
    }
    else
    {
    	$pathname = $classname;
    }
        
    // determine path name
    return SERVICE_PATH . implode( "/", explode("_",$pathname ) ) . ".php";
  }
  
  /**
   * load file for class
   * @return string file path
   * @param $classname Object
   */
  function includeClassfile ( $classname )
  {
    $path = $this->getClassPath($classname);
    if ( ! file_exists ( $path ) )
    {
  		$this->raiseError ( "Class '$classname' cannot be loaded: file '" . addslashes($path) .  "' does not exist." );    	
    }
      
    // load class file
    require_once ( $path ); 
    
    return $path;
   
  }
  
  /**
   * cross-version method to mixin methods from other classes.
   * @return void
   * @param $classname class name
   */
  function mixin ($classname)
  {
    if ( phpversion() < 5 )
    {
      $this->includeClassfile($classname);
      aggregate( $this, $classname);
    }
    else
    {
      $methods = get_class_methods($mixin);
      if ( is_array($methods) )
      {
        foreach($methods as $method) $this->_mixinlookup[$method] = $mixin;
      }
    }
  }
  
  /**
   * The __call magic method intercepts any method that does not exist
   * and falls back to one of the mixins if they define the method that is
   * being called.
   * @author Ivo Jansch (see http://www.jansch.nl/2006/08/23/mixins-in-php/)
   */
  function __call($method, $args, &$return )
  {
    if ( phpversion() > 5 )
    {
      if ( isset($this->_mixinlookup[$method] ) )
      {
        $elems = array();
        for ($i=0, $_i=count($args); $i<$_i; $i++) $elems[] = "\$args[$i]";
        eval("\$result = ".$this->_mixinlookup[$method]."::"
            .$method."(".implode(',',$elems).");");
        return $result;
      }
    }
    trigger_error('Call to undefined function ' . $method );
  }
  
	/**
	 * set (non-persistent) singleton instance of a class
	 * @param object $instance reference to be set as singleton
	 */
	function &setSingleton( $instance ) 
	{
    $classname = get_class ( $instance );
    $GLOBALS['qcl_jsonrpc_singletons'][$classname] =& $instance;
    return $instance;
  }
	
	/**
	 * gets singleton instance when dealing with object copy
	 */
	function &getInstance()
	{
    return $this->getSingleton(get_class(&$this));
	}
	
	/**
	 * get (non-persistent) singleton instance of class.
	 * if singleton already exists, return instance, otherwise
	 * automatically load class file, create new instance and, if object is a controller, 
	 * pass a reference to the instantiating object or, in other cases, an optional 
	 * parameter to the constructor.
	 * 
	 * @param string 			$classname
	 * @param object reference 	$controller		(optional) controller object to be passed
	 * 											to the singleton constructor  
	 * @return object reference to singleton instance
	 */
	function &getSingleton( $classname, $controller = null ) 
	{
    $instance =& $GLOBALS['qcl_jsonrpc_singletons'][$classname];
    if ( ! $instance )  
    {
      $instance = $this->getNew( $classname, &$controller );
    }
    return $instance;
  }
	
	/**
	 * gets new instance of classname
	 * if object is a subclass of qx_jsonrpc_controller, pass the object as constructor 
	 * to the model class, otherwise pass optional parameter
	 * @param string 			$classname
	 * @param mixed reference 	$controller		(optional) controller object to be passed
	 * 											to the singleton constructor  
	 * @return object reference to singleton instance
	 */
	function &getNew( $classname, $controller = null ) 
	{       
    /*
     * convert dot-separated class names
     */
	  if (strstr($classname,"."))
	  {
	    $classname = strtolower(str_replace(".","_",$classname));
	  }
	  
	  /*
	   * check for class existence
	   */ 
    if ( ! class_exists ( $classname ) ) 
    {
      $path = $this->includeClassFile($classname);
      
      // check class
      if ( ! class_exists ( $classname) )
      {
    		$this->raiseError ( get_class($this) . "::getNew : Cannot instantiate class '$classname': file '" . addslashes($path) .  "' does not contain class definition." );    	
      }
    }
    
    /*
     * instantiate object
     */
    if ( ! $controller and is_a ( $this, "qcl_jsonrpc_controller" ) )
    {
    	$controller =& $this;
    }
    $instance =& new $classname(&$controller);
    return $instance;
  }
 
	/**
	 * log to file on server
	 * @param string $message
	 * @param int $logLevel  
	 * @return message written to file
	 */
	function log( $msg, $logLevel=QCL_LOG_DEBUG )
	{
		if ( is_array($msg) or is_object($msg) )
    {
      $msg = var_export ( $msg, true );
    }
    
    $message = date("y-m-j H:i:s");
		if ( QCL_LOG_SHOW_CLASS_NAME )
		{
			$message .= " [" . get_class($this) ."]";
		}
		$message .= ": " . $msg . "\n";
		$this->writeLog($message,$logLevel);	
		return $message;		
	}

	/**
	 * write to log file
	 * @param string $message
	 * @param int $logLevel 
	 */
	function writeLog( $message, $logLevel=QCL_LOG_DEBUG )
	{
		if ( QCL_LOG_LEVEL and QCL_LOG_LEVEL <= $logLevel)
		{
			@error_log($message,3,QCL_LOG_FILE);			
		}			
	}

	/**
	 * log a debug message 
   * @return void
   * @param mixed $msg 	
   */
	function debug($msg,$html=false)
	{
    $this->log ( $msg, QCL_LOG_DEBUG );
  }	
	
  /**
   * logs a message with of level "info"
   * @return void
   * @param mixed $msg 
   */
  function info ( $msg )	
  {
    $this->log ( $msg, QCL_LOG_INFO );
  }

  /**
   * logs a message with of level "warn"
   * @return void
   * @param $msg string
   */
  function warn ( $msg )	
  {
    $this->log ( $msg, QCL_LOG_WARN );
  }  
  
  /**
   * gets the backtrace of invoked function calls
   * @return string list
   */
  function getBacktrace()
  {
    return debug_get_backtrace(3);
  }
  
  /**
   * raises a server error and exits
   * @param string $message
   * @param int    $number
   * @param string $file
   * @param int    $line
   * return void
   */
  function raiseError( $message, $number=null, $file=null, $line=null )
  {
    if ( $file and $line )
    {
      $message .= " in $file, line $line.";
    }
    $this->log( 
      "### Error in " . get_class($this) . " ###\n" . 
      $message . "\n" . 
      "Backtrace:\n" . 
      $this->getBacktrace(), 
      QCL_LOG_ERROR
    );
    echo $message;
    exit;
  }  
	  
}
