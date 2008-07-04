<?php
/*
 * dependencies
 */
require_once("qcl/functions.php");      // global function
require_once("qcl/patched_object.php"); // php4 object compatibility patch

/*
 * constants
 */
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

/**
 * base class of all qcl classes.
 * provides cross-version (PHP4/PHP5) mixins and interfaces
 * mixin code is adapted from Ivo Jansch's blog at 
 * http://www.jansch.nl/2006/08/23/mixins-in-php/
 * 
 */
class qcl_object extends patched_object 
{

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
   * wether this class is persistent. If true, it will be serialized at the
   * end of the request and can be unserialized with class_name::unserialize()
   */
  var $isPersistent = false;
  
  /**
   * whether this is a newly instantiated object. Will be turned to false
   * when retrieved from cache
   */
  var $isNew = true;
  
	/**
	 * Class constructor. If the mixin class property contains 
	 * array entries, these classes will be mixed in.
	 */
	function __construct() 
	{
		/*
		 * initialize parent class
		 */
	  parent::__construct();
		
		/*
		 * apply mixins
		 */
    if ( is_array( $this->mixins ) )
    {
      foreach($this->mixins as $mixin)
      {
        $this->mixin( $mixin );
      }
    }
	}
	
	/**
	 * class destructor.  This is the top-most __destruct method, currently
	 * just an empty stub
	 */
  function __destruct() {}
  
  //-------------------------------------------------------------
  // persistence
  //-------------------------------------------------------------	

  /**
   * get persistent object instance of this class. this will serialize
   * itself automatically at the end of the request. 
   * Can take up to five arguments that will be passed to the class constructor
   * @param string $class Class name
   * @param mixed[optional] $arg1
   * @param mixed[optional] $arg2
   * @param mixed[optional] $arg3
   * @param mixed[optional] $arg4
   * @param mixed[optional] $arg5
   * @return qcl_object Instance of class
   */
  function &getPersistentInstance( $class, $arg1=null, $arg2=null, $arg3=null, $arg4=null, $arg5=null)
  {
    qcl_object::includeClassfile($class);
    
    /*
     * retrieve instance
     */
    $obj =& qcl_object::retrieve($class);
    
    /*
     * create new instance if no cached copy is available
     */
    if ( ! is_object ($obj) )
    {
      $obj =& new $class( &$arg1, &$arg2, &$arg3, &$arg4, &$arg5);
      //$this->info("Created new $class");
    }
    else
    {
      //$this->info("Retrieved $class from cache...");
      $obj->isNew = false;
    }
    
    /*
     * set persistent flag so that method will be serialized on shutdown
     */
    $obj->isPersistent = true;
    
    /*
     * registering shutdown function since constructor is not called
     */
    //$this->info("Registering  function 'save' for " . get_class($obj));
    register_shutdown_function (array(&$obj, 'save') );        
    
    return $obj;
  }
  
  
  /**
   * saves the object to a storage
   */
  function save()
  {
    if ( is_object( $this) and is_a($this,__CLASS__) )
    {
      $class = get_class($this);
      //$this->info("Saving serialized object of class $class.");
      qcl_object::store($class,&$this);
    }
    else
    {
      $this->raiseError("Cannot save object.");
    }
  }
  
  //-------------------------------------------------------------
  // object methods
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

  //-------------------------------------------------------------
  // mixin and overloading
  //------------------------------------------------------------- 
  
  /**
   * cross-version method to mixin methods from other classes.
   * @return void
   * @param $classname class name
   */
  function mixin ($classname)
  {
    //$this->info("Mixin $classname applied to " . get_class($this) );
    if ( phpversion() < 5 )
    {
      $this->includeClassfile($classname);
      aggregate( $this, $classname);
    }
    else
    {
      $methods = get_class_methods($classname);
      if ( is_array($methods) )
      {
        foreach($methods as $method) 
        {
          $this->_mixinlookup[$method] = $classname;
        }
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
    if ( phpversion() >= 5 )
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
 
  
  //-------------------------------------------------------------
  // class introspection 
  //-------------------------------------------------------------
  
  /**
   * similar to instanceOf javascript function. checks if object is an instance of the
   * class or of a subclass of this class. Use this for cross-version compatibility
   * @param string $class
   * @return boolean 
   */
  function instanceOf( $class )
  {
      return is_a($this,$class);    
  }
  
  //-------------------------------------------------------------
  // instance and singleton management
  //-------------------------------------------------------------  
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
      $instance =& $this->getNew( $classname, &$controller );
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
 
  //-------------------------------------------------------------
  // logging
  //-------------------------------------------------------------
  
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
    $this->log ( "*** WARNING *** " . $msg, QCL_LOG_WARN );
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
  
  function dumpObject($object)
  {
    $dump = array();
    foreach ( get_object_vars($object) as $key => $value )
    {
      $type   = gettype($value);
      $class  = is_object($value) ? "(" . get_class($value) . ")" : "";
      $dump[] = " $key => $type $class";
      
    }
    $this->info("\n" . implode("\n",$dump) );
  }

  //-------------------------------------------------------------
  // data storage in the filesystem
  //-------------------------------------------------------------   
  
  /**
   * stores the object or arbitrary data in the filesystem.
   * @param mixed   $id     Id under which to store the data. If no Id is given, use the class name
   *                This allows to create persistent singletons.
   * @param mixed   $data     Data to store. If no data is provided, the object serializes itself
   * return string Path to file with stored data.
   * @return string path to file
   * @todo reimplement using a storage class which can be file-based, db-based, etc. 
   */
  function store($id=null, $data="")
  {
    if ( ! $id )
    {
      // use class name as id
      $id = get_class($this) . ".tmp";
    }
    elseif ( substr($id,0,1) == "." )
    {
      // just the extension passed, create random unique id
      $id = md5(microtime()) . $id;
    }
    $path = QCL_TMP_PATH . $id;
    if ( is_object($data) or is_array($data) )
    {
      $data = serialize($data); 
    }
    file_put_contents($path,$data);
    return $path;
  }
  
  /**
   * retrieve stored object
   * @param string  $id   Id of data to be retrieved from filesystem
   */
  function &retrieve ( $id=null )
  {
    if ( ! $id )
    {
      $id = get_class($this) . ".tmp";
    }
    $path = QCL_TMP_PATH . $id;
    $data = file_get_contents($path);
    $obj = @unserialize($data);
    if ( is_object( $obj ) or is_array( $obj ) )
    {
      return $obj;
    }
    return $data;
  }
  
  /**
   * remove stored object
   */
  function remove ( $id, $prependPath = true )
  {
    if ( ! $id )
    {
      $id = get_class($this);
    }
    if ( $prependPath) $path = QCL_TMP_PATH . $id;
    else $path = $id;
    return unlink ($path);    
  }
}
?>