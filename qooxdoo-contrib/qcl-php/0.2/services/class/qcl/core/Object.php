<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

/*
 * Error reporting level. Global var $error_reporting needs to be
 * defined in global_settings.php or config.php
 */
error_reporting( $error_reporting );

/*
 * For constant definition for which a simple integer is sufficient,
 * use global variable $constId like so:
 * define("MY_CONSTANT", $constId++);
 */
$constId = 0;

/*
 * dependencies
 */
require_once "qcl/core/functions.php";      // global functions
require_once "qcl/log/Logger.php";
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
if ( ! defined( "QCL_LOG_PATH") )
{
  define( "QCL_LOG_PATH" ,  sys_get_temp_dir() );
}

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
 * @todo deprecated, use qcl_util_registry_Request instead
 * @var array
 */
$qcl_registry = array();

/**
 * Base class of all qcl classes.
 *
 */
class qcl_core_Object extends qcl_core_BaseClass
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
     * setup logger object
     */
    $this->setupLogger();
  }

  /**
   * Object oriented way of checking whether the class
   * implements an interface.
   *
   * @param string $interface
   * @param string $className If omitted (default), the given
   * object's class is checked.
   * @return unknown_type
   */
  function implementsInterface( $interface, $className = null )
  {
    if ( phpversion() >= 5 )
    {
      if ( $className )
      {
        return in_array( $interface, class_implements( $className ) );
      }
      else
      {
        return in_array( $interface, class_implements( $this ) );
      }
    }
    else
    {
      trigger_error("implementsInterface not yet implemented for PHP4.");
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
   * @return qcl_core_Object
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
   * make a copy of this object
   */
  function cloneObject()
  {
    return clone($this);
  }

  /**
   * Return include path for a class name
   * @return string
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
     * create array of parts
     */
    $patharray = explode("_", $pathname ) ;

    /*
     * return path name
     */
     return real_file_path( implode( "/", $patharray ) . ".php");
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
      return dirname( qcl_core_Object::getClassPath( $classname ) );
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
    $path = qcl_core_Object::getClassPath( $classname );

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
   * The currently executed function.
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
   *
   * The reason is that PHP cannot access the class name in static classes (which hasn't been resolved in PHP5!).
   * You can also pass up to 3 arguments after the class name which will be passed
   * to the constructor function
   *
   * @param string[optional, defaults to __CLASS__] $class Class name. Does not need to be provided in object instances.
   * @param mixed[optional] $arg1
   * @param mixed[optional] $arg2
   * @param mixed[optional] $arg3
   * @return object singleton  instance of class
   */
  function &getInstance( $class = __CLASS__, $arg1=null, $arg2=null, $arg3=null )
  {
    if ( ! $GLOBALS[$class] )
     {
       if ( phpversion() < 5 )
       {
         /*
          * PHP5.3 will not respect error_reporting level here
          * when parsing the code
          * FIXME remove this, security hazard
          */
         eval('
          $GLOBALS[$class] =& new $class( &$arg1, &$arg2, &$arg3 );
         ');
       }
       else
       {
         $GLOBALS[$class] = new $class( $arg1, $arg2, $arg3 );
       }
     }
     return $GLOBALS[$class];
  }


  /**
   * Returns new instance of classname. If the calling object is a subclass
   * of qx_jsonrpc_controller, pass the object as constructor to the model class,
   * otherwise pass optional parameter
   * @param string $classname PHP class name or dot-separated class name
   * @param qcl_data_controller_Controller[optional] $controller (optional) controller object
   * to be passed to the singleton constructor
   * @return qcl_core_Object
   * @deprecated Use native php code to instantiate classes, this will
   * be removed.
   */
  function &getNew( $classname )
  {
    /*
     * convert dot-separated class names into php-style
     */
    if ( strstr( $classname, "." ) )
    {
      $classname = str_replace( ".", "_", $classname );
    }

    /*
     * check for class existence
     */
    if ( ! class_exists ( $classname ) )
    {
      $path = qcl_core_Object::includeClassFile( $classname );

      /*
       * Check class
       */
      if ( ! class_exists ( $classname ) )
      {
        qcl_core_Object::raiseError ( get_class($this) . "::getNew : Cannot instantiate class '$classname': file '" . addslashes($path) .  "' does not contain class definition." );
      }
    }

    /*
     * PHP 5.3 doesn't respect error_reporting here when
     * parsing the code
     * FIXME remove this, security hazard
     */
    if ( phpversion() < 5 )
    {
      eval('
        $instance =& new $classname;
      ');
    }
    else
    {
      $instance = new $classname;
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
    $this->_logger =& qcl_log_Logger::getInstance();
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
    $this->_logger->log( $msg, $filters );
  }

  /**
   * Log a debug message. This method should be used only for
   * temporary debugging. Such method calls should be able to
   * be expunged completely by a global search/replace.
   * @return void
   * @param mixed $msg
   * @param string $class Optional class name
   * @param int $line Optional line number
   */
  function debug($msg,$class=null,$line=null)
  {
    if ( ! is_scalar($msg) ) $msg = print_r($msg,true);
    $m = ">>> DEBUG <<< ";
    if ($class and $line) $m .= "$class:$line: ";
    $m .= $msg;
    $this->info ( $m, "info" );
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
    $path = realpath( QCL_SERVICE_PATH ) . "/" ;

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
   * @return string list
   */
  function backtrace()
  {
    $backtrace =  debug_get_backtrace(3);
    return $backtrace;
  }


  //-------------------------------------------------------------
  // Error
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
   * Clears error message
   */
   function clearError()
   {
     $this->error = null;
   }

  /**
   * Hook to return optional error response data. By default, return an
   * empty array. Override this method if you want to provide
   * addition data to be passed with the error response.
   * @return array
   */
  function optionalErrorResponseData()
  {
    return array();
  }

  /**
   * Raises an error about a missing method implementation
   * @param string class name
   * @todo get class and method name from backtrace.
   */
  function notImplemented( $class = __CLASS__ )
  {
    $this->raiseError( "Method (see backtrace) not implemented for class $class. You may have to subclass this class in order to use it." );
  }


  /**
   * Raises a server error and exits
   * @param string $message
   * @param int    $number
   * @param string $file
   * @param int    $line
   * return void
   * FIXME
   */
  function raiseError( $message, $number=null, $file=null, $line=null )
  {

    if ( $file and $line )
    {
      $message .= " in $file, line $line.";
    }
    $logger =& qcl_log_Logger::getInstance();
    $msg = "\n\n### Error in " . get_class($this) . " ###\n" .
      $message . "\n" .
      "Backtrace:\n" .
      $this->backtrace() .
      "\n";

    $logger->writeLog( $msg );
    $this->userNotice( $message, $number );
  }

  /**
   * Exits the current service with a user notice. This
   * is an error, without the backtrace
   * @param string $message
   * @return void
   */
  function userNotice ( $message, $number=null )
  {
    /*
     * if this is a jsonrpc request, we have an $error object
     * that the error can be passed to.
     */
    $server =& qcl_server_Server::getServerObject();
    if ( $server )
    {
      $error  =& $server->getErrorBehavior();
      $error->setError( $number, htmlentities( stripslashes( $message ) ) );
    }
    else
    {
      require RPCPHP_SERVER_PATH . "services/server/error/JsonRpcError.php";
      require RPCPHP_SERVER_PATH . "services/server/lib/JsonWrapper.php";
      $error = new JsonRpcError( $number, $message );
    }

    if ( is_a( $error, "JsonRpcError" ) )
    {
      $error->SendAndExit( $this->optionalErrorResponseData() );
      // never gets here
      exit;
    }

    /*
     * otherwise trigger error
     */
    trigger_error($message);
  }

  //-------------------------------------------------------------
  // Timeer
  //-------------------------------------------------------------

  /**
   * Records a timestamp for this object
   * @return unknown_type
   */
  function startTimer()
  {
    $this->_timestamp = microtime_float();
  }

  /**
   * Returns the time since startTimer() was called in seconds
   * @param $debugmsg
   * @return unknown_type
   */
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

  //-------------------------------------------------------------
  // Messages and events
  //-------------------------------------------------------------

  /**
   * Adds a message subscriber. This works only for objects which have been
   * initialized during runtime. Filtering not yet supported, i.e. message name must
   * match the one that has been used when subscribing the message, i.e. no wildcards!
   * @todo move to external class
   * @param string $filter
   * @param string $method Callback method of the current object
   */
  function addSubscriber( $filter, $method )
  {
    require_once "qcl/event/message/Bus.php";
    qcl_event_message_Bus::addSubscriber( $filter, &$this, $method );
  }

  /**
   * Dispatches a message.
   * @param string $name Message name
   * @param mixed $data Data dispatched with message
   */
  function dispatchMessage ( $name, $data )
  {
    require_once "qcl/event/message/Bus.php";
    qcl_event_message_Bus::dispatchMessage( &$this, $name, $data );
  }

  /**
   * Dispatches a server message.
   * @param string $name Message name
   * @param mixed $data Data dispatched with message
   */
  function dispatchServerMessage ( $name, $data )
  {
    require_once "qcl/event/message/Bus.php";
    qcl_event_message_Bus::dispatchServerMessage( &$this, $name, $data );
  }

  /**
   * Broadcasts a message to all connected clients
   * @param string $name Message name
   * @param mixed $data Data dispatched with message
   */
  function broadcastServerMessage ( $name, $data  )
  {
    require_once "qcl/event/message/Bus.php";
    qcl_event_message_Bus::broadcastServerMessage( &$this, $name, $data );
  }

  /**
   * Adds an event listener. Works only during runtime, i.e. event bindings are not
   * persisted.
   * @todo rewrite using event objects and support persisted event bindings
   * @param string $type The name of the event
   * @param string|qcl_core_Object $object The object or the object id retrieved by '$this->objectId()'
   * @param string $method callback method of the object
   */
  function addListener( $type, $object, $method )
  {
    require_once "qcl/event/Dispatcher.php";
    qcl_event_Dispatcher::addListener( &$this, $type, &$object, $method );
  }

  /**
   * Dispatches a server event. Can be called statically.
   * @param qcl_core_Object $target
   * @param qcl_event_type_Event $event
   * @return bool Whether the event was dispatched or not.
   */
  function dispatchEvent ( $event )
  {
    require_once "qcl/event/Dispatcher.php";
    qcl_event_Dispatcher::dispatchEvent( &$this, &$event );
  }

  /**
   * Fires an event
   * @param string $type Message Event type
   */
  function fireEvent ( $type )
  {
    require_once "qcl/event/Dispatcher.php";
    qcl_event_Dispatcher::fireDataEvent( &$this, $type, $data );
  }

  /**
   * Fires a data event
   * @param mixed $event Message Event type
   * @param mixed $data Data dispatched with event
   */
  function fireDataEvent ( $type, $data )
  {
    require_once "qcl/event/Dispatcher.php";
    qcl_event_Dispatcher::fireDataEvent( &$this, $type, $data );
  }

  //-------------------------------------------------------------
  // Translation
  //-------------------------------------------------------------

  /**
   * translates a message
   * @return  String
   * @param   String  $msgId    Message id of the string to be translated
   * @param   Mixed   $varargs  (optional) Variable number of arguments for the sprintf formatting either as an array
   * or as parameters
   */
  function tr( $msgId, $varargs=null )
  {
    return qcl_application_Application::tr( $msgId, $varargs );
  }

  /**
   * Translate a plural message.Depending on the third argument the plursl or the singular form is chosen.
   *
   * @param string   $singularMessageId Message id of the singular form (may contain format strings)
   * @param string   $pluralMessageId   Message id of the plural form (may contain format strings)
   * @param int      $count             If greater than 1 the plural form otherwhise the singular form is returned.
   * @param Array    $varargs           (optional) Variable number of arguments for the sprintf formatting
   * @return string
   */
  function trn ( $singularMessageId, $pluralMessageId, $count, $varargs=array() )
  {
    return qcl_application_Application::trn ( $singularMessageId, $pluralMessageId, $count, $varargs=array() );
  }

  //-------------------------------------------------------------
  // Serialization
  //-------------------------------------------------------------


  /**
   * Returns a string representation of the object that has purely informational
   * value
   * @return string
   */
  function toString()
  {
    return "[" . $this->className() . " instance #" . $this->objectId() . "]";
  }

  /**
   * Serializes the object to a string that can be deserialized
   * @return string
   */
  function serialize()
  {
    return serialize( $this );
  }

  /**
   * Dumps a variable to a string representation
   */
  function dump()
  {
    return var_export( $this, true );
  }

  //-------------------------------------------------------------
  // Type checkign @todo move into qcl_util_Type class
  //-------------------------------------------------------------

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
}

/*
 * init script has to be called *after* this class was defined.
 */
require_once "qcl/core/__init__.php";
?>