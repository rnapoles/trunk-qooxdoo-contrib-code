<?php
/*
 * for constant definition, use global variable $constId
 * define("MY_CONSTANT", $constId++);
 */
$constId = 0;

/*
 * dependencies
 */
require_once "qcl/core/functions.php";      // global functions
require_once "qcl/lang/String.php";         // String object similar to java
require_once "qcl/lang/Utf8String.php";     // Class with methods to deal with Utf8 Strings
require_once "qcl/lang/ArrayList.php";      // ArrayList object similar to java

/*
 * Version-dependent base class
 */
if ( phpversion() < 5 ) 
  require_once "qcl/core/BaseClassPHP4.php";
else 
  require_once "qcl/core/BaseClassPHP5.php";
  
/**
 * path to log file
 */
if ( ! defined( "QCL_LOG_FILE") )
{
  define( "QCL_LOG_FILE" ,  QCL_LOG_PATH . "qcl.log" );  
}

/**
 * JsonRpcClassPrefix from dispatcher script
 * @todo move elsewhere
 */
if ( ! defined( "JsonRpcClassPrefix" ) )
{
  define( "JsonRpcClassPrefix" , "class_");
}

/**
 * Use as a a default argument to indicate that argument hasn't been supplied 
 */
define("QCL_ARGUMENT_NOT_SET", "QCL_ARGUMENT_NOT_SET");

/**
 * global reqistry that is maintained during one request
 * @todo deprecated, use qcl_registry_Request instead
 * @var array
 */
$qcl_registry = array();

/**
 * Base class of all qcl classes.
 * 
 */
class qcl_core_object extends qcl_core_BaseClass
{
  /**
   * The class name of this object
   * @var string
   */
  var $_class;
 
  /**
   * Array of class names that will be included as mixins. 
   * Note that the last defined property will be used, which
   * overwrites any include values in parent-classes.
   * @var array 
   */
  var $include = array();

  /**
   * PHP4/PHP5 interface implementation.
   * @var array
   */
  var $implements = array();

  /**
   * If this object produces a recoverable error, the error message will be stored here
   * for convenience
   * @var string
   */
  var $error;
    
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
   * The (hopefully) globally unique id of this object.
   * Do not use this property directly, use ::objectId() 
   * to access it.
   * @var string
   * @access private
   */
  var $_objectId = null;
  
  /**
   * The logger object
   * @var qcl_log_Logger
   */
  var $_logger;
  
  /**
   * Timestamp for script execution time measurement
   * @var float
   */
  var $_timestamp;
  
  /**
   * Class constructor. If the mixin class property contains 
   * array entries, these classes will be mixed in.
   */
  function __construct() 
  {
    
    /*
     * start internal timer
     */
    $this->startTimer();
    
    /*
     * initialize object id
     */
    $this->objectId();
    
    /*
     * class name
     */
    $this->_class = get_class($this);
    
    /*
     * apply mixins
     */
    if ( is_array( $this->include ) )
    {
      foreach( $this->include as $mixin )
      {
        $this->mixin( $mixin );
      }
    }
    
    /*
     * PHP4/PHP5: check if interfaces are implemented. This
     * will be removed and real interfaces be used when qcl moves
     * to PHP5-only
     */
    foreach ( $this->implements as $interface )
    {
      /*
       * do not check again
       */
      if ( $this->getRegistryVar( "qcl.interfaces.checked.{$this->_class}.$interface" ) )
      {
        continue;
      }
      
      //$this->info("Checking interface implementation for '$interface'");
      
      /*
       * check interface methods
       */
      $methods = (array) get_class_methods( $interface ) ;
      foreach( $methods as $method )
      {
        if ( ! method_exists( $this, $method ) )
        {
          $this->raiseError("Class {$this->_class} has no implementation of method '$method' as required by interface '$interface'");
        }
      }
      /*
       * check interface properties
       */
      foreach( (array)  get_class_vars( $interface ) as $var )
      {
        if ( !  isset( $this, $var ) )
        {
          $this->raiseError("Class {$this->_class} has no property '$var' as required by interface '$interface'");
        }
      }

      /*
       * set flag that this was checked
       */
      $this->setRegistryVar( "qcl.interfaces.checked.{$this->_class}.$interface", true );
    }
    
    /*
     * setup the logger for this object, except for a 
     * logger object itself
     */
    if ( ! is_a($this, "qcl_log_Logger" ) )
    {
      $this->setUpLogger();  
    }
  }
  
  
  //-------------------------------------------------------------
  // Object id and class management
  //-------------------------------------------------------------    
  
  /**
   * Returns the (hopefully) globally unique object id and generates
   * it if necessary. Registers object id in a global database.
   * This only works during one request, i.e. at runtime. 
   * @return string
   */
  function objectId()
  {
    if ( ! $this->_objectId )
    {
      /*
       * generate object id
       */
      $this->_objectId = uuid();
      
      /*
       * register it in global database
       */
      global $object_db;
      if ( ! $object_db )
      {
        $object_db = array();
      }
      $object_db[$this->_objectId] =& $this;
      
    }
    return $this->_objectId;
  }

  /**
   * Returns an object identified by its id.
   * return object
   */
  function &getObjectById($objectId)
  {
    global $object_db;
    return $object_db[$objectId];
  }

  //-------------------------------------------------------------
  // Object initialization 
  //-------------------------------------------------------------    
  
  /**
   * Run once for the given class per application installation
   * This can be reset by clearing the php/var/tmp folder. Implementing method
   * must call parent method before executing action like so:
   * if ( parent::runOnce() ) { execute run-once action  }
   */
  function runOnce()
  {
    $path = QCL_TMP_PATH . get_class($this) . ".runonce";
    if ( file_exists( $path) ) return false;
    touch($path);
    return true;
  }

  //-------------------------------------------------------------
  // Registry during request. This is deprecated, use 
  // qcl_registry_Session instead
  //------------------------------------------------------------- 

  /**
   * Gets a registry value
   * @param string $name
   * @deprecated, use qcl_registry_Session
   * @return mixed
   */
  function &getRegistryVar( $name )
  {
    return $GLOBALS['qcl_registry'][$name];    
  }

  /**
   * Sets a registry value
   * @param string $name
   * @param string $value
   * @deprecated, use qcl_registry_Session
   * @return void
   */
  function setRegistryVar( $name, $value )
  {
    $GLOBALS['qcl_registry'][$name] =& $value;    
  }

  /**
   * make a copy of this object
   */
  function cloneObject()
  {
    return clone($this);
  }
  
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
   * Clears error message
   */
   function clearError()
   {
     $this->error = null;
   }

  /**
   * get include path for a class name
   * @return 
   * FIXME PHP5 is case-sensitive!
   * @param string[optional] $classname Class name, defaults to the clas name of the instance
   * @return string
   */
  function getClassPath( $classname = null)
  {
    /*
     * get my own classpath?
     */
    if ( is_null($classname) )
    {
      if ( isset($this) and is_object($this) )
      {
        $classname = get_class($this);  
      }
      else
      {
        $this->raiseError("No classname given.");
      }
    }
    
    /*
     * delete JsonRpcClassPrefix
     */
    if ( substr($classname,0,strlen(JsonRpcClassPrefix)) == JsonRpcClassPrefix )
    {
      $pathname = substr($classname,strlen(JsonRpcClassPrefix));          
    }
    else
    {
      $pathname = $classname;
    }
    
    /*
     * normalize syntax
     */
    $pathname = str_replace(".","_",$pathname);    
    
    /*
     * return path name
     */
    return SERVICE_PATH . implode( "/", explode("_", $pathname ) ) . ".php";
  }
  
  /**
   * returns the path to the directory containing the class
   * @param string[optional] $classname Class name, defaults to the clas name of the instance
   * @return string
   */
  function getClassDir($classname=null)
  {
    if ( $classname )
    {
      return dirname( qcl_core_object::getClassPath( $classname ) );
    }
    elseif ( isset( $this ) and is_object($this ) )
    {
      return dirname( $this->getClassPath() );  
    }
    else
    {
      $this->raiseError("No classname given.");
    }
  }
  
  
  /**
   * load file for class
   * @return string file path
   * @param $classname Object
   */
  function includeClassfile ( $classname )
  {
    $path = qcl_core_object::getClassPath($classname);
    if ( ! file_exists ( $path ) )
    {
      $this->raiseError ( "Class '$classname' cannot be loaded: file '" . addslashes($path) .  "' does not exist." );     
    }
      
    // load class file
    require_once ( $path ); 
    
    return $path;
   
  }


  
  //-------------------------------------------------------------
  // Object and class introspection 
  //-------------------------------------------------------------
  
  /**
   * OO alias for get_class($this)
   * @return string
   */
  function className()
  {
    return get_class($this);
  } 
  
  /**
   * The currently executed function
   * @return string
   */
  function functionName() 
  {
    $backtrace = debug_backtrace();
    return $backtrace[1]['function'];
  }  
    
  /**
   * OO alias for method_exists($this)
   * @param string $method
   * return bool
   */
  function hasMethod( $method )
  {
    return method_exists($this,$method);
  }
  
  /**
   * OO alias for get_class_methods(get_class($this))
   * @return array
   */
  function methods()
  {
    return get_class_methods( $this->className() );
  } 
    
  /**
   * similar to instanceOf javascript function. checks if object is an instance of the
   * class or of a subclass of this class. Use this for cross-version compatibility.
   * 
   * @param string $class Class name. Can be java(script)-like separated by dots.
   * @return boolean 
   */
  function isInstanceOf( $class )
  {
    $class = str_replace(".","_",$class);
    return is_a( $this, $class );
  }
  
  
  //-------------------------------------------------------------
  // instance and singleton management
  //-------------------------------------------------------------  

  /**
   * Gets singleton instance. If you want to use this method on a static class that extends this class,
   * you need to override this method like so: <pre>
   * function &getInstance( $class=__CLASS__ )
   * {
   *   return parent::getInstance( $class );
   * }
   * </pre>
   * The reason is that PHP cannot access the class name in static classes (which hasn't been resolved in PHP5!).
   * @param string[optional, defaults to __CLASS__] $class Class name. Does not need to be provided in object instances.
   * @return object singleton  instance of class
   */
  function &getInstance( $class = __CLASS__ )
  {
     if ( ! $GLOBALS[$class] )
     {
       $GLOBALS[$class] =& new $class;
     }
     return $GLOBALS[$class]; 
  }

  /**
   * set (non-persistent) singleton instance of a class
   * @access private
   * @param object $instance reference to be set as singleton
   * @return void
   * @deprecated 
   */
  function &setSingleton( $instance ) 
  {
    $classname = get_class ( $instance );
    $GLOBALS[$classname] =& $instance;
    return $instance;
  }
  
  /**
   * get (non-persistent) singleton instance of class.
   * if singleton already exists, return instance, otherwise
   * automatically load class file, create new instance and, if object is a controller, 
   * pass a reference to the instantiating object or, in other cases, an optional 
   * parameter to the constructor.
   * 
   * @param string      $classname
   * @param object reference  $controller   (optional) controller object to be passed
   *                      to the singleton constructor  
   * @return object reference to singleton instance
   */
  function &getSingleton( $classname, $controller = null ) 
  {
    if ( ! $GLOBALS[$classname] )  
    {
      $GLOBALS[$classname] =& $this->getNew( $classname, &$controller );  
    }
    return $GLOBALS[$classname];
  }
  
  /**
   * Returns new instance of classname. If the calling object is a subclass 
   * of qx_jsonrpc_controller, pass the object as constructor to the model class, 
   * otherwise pass optional parameter
   * @param string $classname PHP class name or dot-separated class name
   * @param qcl_jsonrpc_controller[optional] $controller (optional) controller object 
   * to be passed to the singleton constructor  
   * @return qcl_core_object
   */
  function &getNew( $classname, $controller = null ) 
  {       
    /*
     * convert dot-separated class names
     * FIXME: PHP5 is case-sensitive
     */
    if ( strstr( $classname,".") )
    {
      $classname = str_replace(".","_",$classname);
    }
    
    /*
     * check for class existence
     */ 
    if ( ! class_exists ( $classname ) ) 
    {
      $path = $this->includeClassFile($classname);
      
      /*
       * Check class
       */
      if ( ! class_exists ( $classname) )
      {
        $this->raiseError ( get_class($this) . "::getNew : Cannot instantiate class '$classname': file '" . addslashes($path) .  "' does not contain class definition." );      
      }
    }
    
    /*
     * Provide the controller if given
     */
    if ( ! $controller and is_a ( $this, "qcl_jsonrpc_controller" ) )
    {
      $instance =& new $classname(&$this);
    }
    else
    {
      $instance =& new $classname(&$controller);
    }
    
    return $instance;
  }
 
  //-------------------------------------------------------------
  // logging
  //-------------------------------------------------------------

  /**
   * Setup logger object. This will get a reference to a global 
   * logger object singleton and attach it to the object.
   */
  function setupLogger()
  {
    require_once "qcl/log/Logger.php";
    $logger =& qcl_log_Logger::getInstance();
    $this->_logger =& $logger;
    
    if ( ! $logger->isRegistered("debug") )
    {
      $logger->registerFilter("debug",     "Verbose debugging");
      $logger->registerFilter("info",      "Important messages");
      $logger->registerFilter("warn",      "Warnings");
      $logger->registerFilter("error",     "Non-fatal errors");
      $logger->registerFilter("framework", "Framework-related debugging");
      
      $logger->setFilterEnabled("debug",false);
      $logger->setFilterEnabled("framework",false);
    }
  }
  
  /**
   * Get logger object
   * @return qcl_log_Logger
   */
  function &getLogger()
  {
    return $this->_logger;
  }
  
  /**
   * Logs a message if the filters are enabled
   * @return void
   * @param mixed $msg 
   * @param string|array $filters
   */
  function log ( $msg, $filters="debug" )
  {
    if ( ! $this->_logger )
    {
      $this->raiseError("No logger object exists.");
    }
    $this->_logger->log( $msg, $filters );
  } 
  
  /**
   * Log a debug message. This method should be used only for 
   * temporary debugging. Such method calls should be able to 
   * be expunged completely by a global search/replace.
   * @return void
   * @param mixed $msg  
   */
  function debug($msg)
  {
    if ( ! is_scalar($msg) ) $msg = print_r($msg,true);
    $msg = ">>> DEBUG <<< " . $msg;
    $this->log ( $msg, "info" );
  } 
  
  /**
   * Logs a message with of level "info"
   * @return void
   * @param mixed $msg 
   */
  function info ( $msg )  
  {
    $this->log ( $msg, "info" );
  }
  
  
  /**
   * Logs a message with of level "warn"
   * @return void
   * @param $msg string
   */
  function warn ( $msg )  
  {
    $this->log ( "*** WARNING *** " . $msg, "warn" );
  }  

  /**
   * Logs a message with of level "error"
   * @return void
   * @param $msg string
   */
  function error ( $msg )  
  {
    $this->log ( "### ERROR ### " . $msg, "error" );
  }    
  
  //-------------------------------------------------------------
  // debugging
  //-------------------------------------------------------------
  
  /**
   * Output the current filename and line number in order to be able to
   * trace program execution
   * @return void
   */
  function trace( $message )
  {
     
    /*
     * Get backtrace
     */
    $backtrace = debug_backtrace();
    
    /*
     * Remove first element (the call to trace())
     */
    $traceCall = array_shift($backtrace);

    /*
     * Location of document root in file system
     * (will be stripped in output)
     */
    $path = realpath( SERVICE_PATH ) . "/" ;    
    
    /*
     * Analyse previous call
     */
    $call = array_shift($backtrace);
    
    /*
     * location of trace call
     */
    $location = ( isset( $traceCall['file'] ) and isset($traceCall['line'] ) ) ?
        str_replace( $path, "", $traceCall['file'] ) . ':' . $traceCall['line'] : "(unknown)";

    /*
     * log and return location
     */    
    $output = "\n # TRACE # at $location" . ( $message ? ": $message" : "" );
    @error_log($output,3,QCL_LOG_FILE);
    return $location;
  }

  
  /**
   * Returns the backtrace of invoked function calls
   * @param bool $$silent If true, do not info backtrace to logfile.
   * @return string list
   */
  function backtrace( $silent=false )
  {
    $backtrace =  debug_get_backtrace(3);
    if ( ! $silent ) $this->info($backtrace);
    return $backtrace;
  }
  
  /**
   * Raises a server error and exits
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
    $logger =& qcl_log_Logger::getInstance();
    $logger->writeLog( 
      "### Error in " . get_class($this) . " ###\n" . 
      $message . "\n" . 
      "Backtrace:\n" . 
      $this->backtrace()
    );
    echo $message;
    exit;
  }  
  
  function dumpObject($object=null)
  {
    if ( is_null($object) )
    {
      $object =& $this;
    }
    $dump = array();
    foreach ( get_object_vars($object) as $key => $value )
    {
      $type   = gettype($value);
      $class  = is_object($value) ? "(" . get_class($value) . ")" : "";
      $dump[] = " $key => $type $class";
      
    }
    $this->info("\n" . implode("\n",$dump) );
  }


  /*
   * todo: the following methods really should be functions
   */
  function checkType( $type, $var )
  {
    $ntype = gettype($var);
    if ( $ntype != $type )
    {
      $this->raiseError("'$var' is of type '$ntype' and not of required type '$type'.");
    }
    else return $var;
  }
  
  function checkString( $var )
  {
    return $this->checkType("string",$var);
  }
  
  function checkBool( $var )
  {
    return $this->checkType("bool",$var);
  }
  
  function checkInt( $var )
  {
    if ( is_numeric($var) ) $var = (int) $var;
    return $this->checkType("integer",$var);
  }
  
  function checkArray( $var )
  {
    return $this->checkType("array",$var);
  }  
  
  
  function startTimer()
  {
    $this->_timestamp = microtime_float();
  }
  
  function timerAsSeconds($debugmsg=null)
  {
    $time_end = microtime_float();
    $seconds = round($time_end - $this->_timestamp,5);
    if ( $debugmsg )
    {
      //$this->debug( $debugmsg . ": $seconds seconds since timer started." );      
    }    
    return $seconds;
  }
}

/*
 * init script has to be called *after* this class was defined.
 */
require_once "qcl/core/__init__.php";
?>