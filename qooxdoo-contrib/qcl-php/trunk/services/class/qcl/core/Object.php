<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2010 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */
require_once "qcl/core/__init__.php";
require_once "qcl/core/BaseClass.php";

/**
 * Base class of all qcl classes.
 * @todo merge with BaseClass
 */
class qcl_core_Object
  extends qcl_core_BaseClass
{

  /**
   * If this object produces a recoverable error, the error message will be stored here
   * for convenience
   * @deprecated will be removed and replaced by exceptions
   * @var string
   */
  protected $error;

  /**
   * Wether this class is persistent. If true, it will be serialized at the
   * end of the request and deserialized at the beginning. By default,
   * the object is saved into the PHP session.
   */
  protected $isPersistent = false;

  /**
   * Whether this is a newly instantiated object. Will be turned to false
   * when retrieved from cache
   */
  protected $isNew = true;

  /**
   * The class name of this object
   * @var string
   */
  private $_className;

  /**
   * The globally unique id of this object.
   * Accessed with ::objectId()
   * to access it.
   * @var string
   */
  private $_objectId = null;

  /**
   * Timestamp for script execution time measurement
   * @var float
   */
  private $_timestamp;

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
    $this->_className = get_class($this);

    /*
     * deserialize if this is a persistent object
     */
    if ( $this->isPersistent )
    {
      $this->getPersistenceBehavior()->restore( $this, $this->getPersistenceId() );
    }
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
    if ( $className )
    {
      return in_array( $interface, class_implements( $className ) );
    }
    else
    {
      return in_array( $interface, class_implements( $this ) );
    }
  }

  //-------------------------------------------------------------
  // Getters
  //-------------------------------------------------------------

  /**
   * Getter for application singleton instance.
   * Returns null if no application exists.
   * @return qcl_application_Application
   */
  public function getApplication()
  {
    static $application = null;

    if ( is_null( $application ) )
    {
      if ( defined("APPLICATION_NAME") )
      {
        require_once APPLICATION_NAME . "/Application.php";
        $appClass = APPLICATION_NAME . "_Application";
        $application = qcl_getInstance( $appClass );
      }
      elseif ( class_exists("qcl_application_Application") )
      {
        $application = qcl_application_Application::getInstance();
      }
    }
    return $application;
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
  public function objectId()
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
      $object_db[$this->_objectId] = $this;

    }
    return $this->_objectId;
  }

  /**
   * Returns an object identified by its id.
   * @return qcl_core_Object
   * @todo rewrite without using a global variable
   */
  public function getObjectById($objectId)
  {
    global $object_db;
    return $object_db[$objectId];
  }

  //-------------------------------------------------------------
  // Object initialization
  //-------------------------------------------------------------


  /**
   * Make a copy of this object
   */
  public function cloneObject()
  {
    return clone($this);
  }

  /**
   * Return include path for a class name
   * @return string
   * @param string[optional] $classname Class name, defaults to the clas name of the instance
   * @return string
   * @deprecated
   * @todo move to function or util class?
   */
  public function getClassPath( $classname = null)
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
   * @deprecated
   * @todo move to function or util class?
   */
  public function getClassDir($classname=null)
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
   * Load file for class. Must be called statically.
   * @return string file path
   * @param $classname Object
   * @deprecated
   * @todo move to function or util class
   */
  static function includeClassfile ( $classname )
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
  public function className()
  {
    return get_class($this);
  }

  /**
   * The currently executed function.
   * @deprecated, use __METHOD__ instead
   * @return string
   */
  public function functionName()
  {
    $backtrace = debug_backtrace();
    return $backtrace[1]['function'];
  }

  /**
   * OO alias for method_exists($this)
   * @param string $method
   * return bool
   */
  public function hasMethod( $method )
  {
    return method_exists($this,$method);
  }

  /**
   * OO alias for get_class_methods(get_class($this))
   * @return array
   */
  public function methods()
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
  public function isInstanceOf( $class )
  {
    $class = str_replace(".","_",$class);
    return is_a( $this, $class );
  }

  /**
   * Returns new instance of classname. If the calling object is a subclass
   * of qx_jsonrpc_controller, pass the object as constructor to the model class,
   * otherwise pass optional parameter. Must be called statically.
   *
   * @param string $classname PHP class name or dot-separated class name
   * @param qcl_data_controller_Controller[optional] $controller (optional) controller object
   * to be passed to the singleton constructor
   * @return qcl_core_Object
   * @deprecated Use native php code to instantiate classes, this will
   * be removed.
   */
  static function getNew( $classname )
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
     * create new instance and return it
     */
    $instance = new $classname;
    return $instance;
  }

  //-------------------------------------------------------------
  // logging & debugging
  //-------------------------------------------------------------

  /**
   * Get logger object
   * @return qcl_log_Logger
   */
  public function getLogger()
  {
    return qcl_log_Logger::getInstance();
  }

  /**
   * Logs a message if the filters are enabled
   * @return void
   * @param mixed $msg
   * @param string|array $filters
   */
  public function log ( $msg, $filters="debug" )
  {
    $this->getLogger()->log( $msg, $filters );
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
  public function debug($msg,$class=null,$line=null)
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
  public function info ( $msg )
  {
    $this->log ( $msg, "info" );
  }


  /**
   * Logs a message with of level "warn"
   * @return void
   * @param $msg string
   */
  public function warn ( $msg )
  {
    $this->log ( "*** WARNING *** " . $msg, "warn" );
  }

  /**
   * Output the current filename and line number in order to be able to
   * trace program execution
   * @return void
   */
  public function trace( $message )
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
  public function backtrace()
  {
    $backtrace =  debug_get_backtrace(3);
    return $backtrace;
  }


  //-------------------------------------------------------------
  // Error
  //-------------------------------------------------------------

  /**
   * Getter for error message
   * @deprecated
   * @return string
   */
  public function getError()
  {
    return $this->error;
  }

  /**
   * Setter for error message
   * @deprecated
   * @return string
   */
  public function setError( $error )
  {
    $this->error = $error;
  }

  /**
   * Clears error message
   * @deprecated
   */
   function clearError()
   {
     $this->error = null;
   }

  /**
   * Hook to return optional error response data. By default, return an
   * empty array. Override this method if you want to provide
   * addition data to be passed with the error response.
   * @deprecated
   * @return array
   */
  public function optionalErrorResponseData()
  {
    return array();
  }

  /**
   * Raises an error about a missing method implementation
   * @param string class name
   * @todo get class and method name from backtrace.
   */
  public function notImplemented( $class="see backtrace", $method="see backtrace" )
  {
    $this->raiseError( "Method '$method' not implemented for class '$class'. You may have to subclass this class in order to use it." );
  }


  /**
   * Raises a server error and exits
   * @param string $message
   * @param int    $number
   * @param string $file
   * @param int    $line
   * return void
   * FIXME make this consistent with qcl_log_Logger
   */
  public function raiseError( $message, $number=null, $file=null, $line=null )
  {
    if ( $file and $line )
    {
      $message .= " in $file, line $line.";
    }
    $logger = $this->getLogger();
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
  public function userNotice ( $message, $number=null )
  {
    $server = $this->getApplication()->getServer();
    if ( $server )
    {
      $error  = $server->getErrorBehavior();
      $error->setError( $number, htmlentities( stripslashes( $message ) ) );
      $error->sendAndExit( $this->optionalErrorResponseData() );
    }
    else
    {
      trigger_error($message);
    }
  }

  //-------------------------------------------------------------
  // Timeer
  //-------------------------------------------------------------

  /**
   * Records a timestamp for this object
   * @return unknown_type
   */
  public function startTimer()
  {
    $this->_timestamp = microtime_float();
  }

  /**
   * Returns the time since startTimer() was called in seconds
   * @param $debugmsg
   * @return unknown_type
   */
  public function timerAsSeconds($debugmsg=null)
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
   * Getter for message bus
   * @return qcl_event_message_Bus
   */
  public function getMessageBus()
  {
    return qcl_event_message_Bus::getInstance();
  }

  /**
   * Adds a message subscriber. This works only for objects which have been
   * initialized during runtime. Filtering not yet supported, i.e. message name must
   * match the one that has been used when subscribing the message, i.e. no wildcards!
   * @todo move to external class
   * @param string $filter
   * @param string $method Callback method of the current object
   */
  public function addSubscriber( $filter, $method )
  {
    require_once "qcl/event/message/Bus.php";
    $this->getMessageBus()->addSubscriber( $filter, $this, $method );
  }

  /**
   * Dispatches a message.
   * @param string $name Message name
   * @param mixed $data Data dispatched with message
   */
  public function dispatchMessage ( $name, $data )
  {
    require_once "qcl/event/message/Bus.php";
    $this->getMessageBus()->dispatchMessage( $this, $name, $data );
  }

  /**
   * Dispatches a server message.
   * @param string $name Message name
   * @param mixed $data Data dispatched with message
   */
  public function dispatchServerMessage ( $name, $data )
  {
    require_once "qcl/event/message/Bus.php";
    $this->getMessageBus()->dispatchServerMessage( $this, $name, $data );
  }

  /**
   * Broadcasts a message to all connected clients
   * @param string $name Message name
   * @param mixed $data Data dispatched with message
   */
  public function broadcastServerMessage ( $name, $data  )
  {
    require_once "qcl/event/message/Bus.php";
    $this->getMessageBus()->broadcastServerMessage( $this, $name, $data );
  }

  /**
   * Getter for event dispatcher
   * @return qcl_event_Dispatcher
   */
  public function getEventDispatcher()
  {
    return qcl_event_Dispatcher::getInstance();
  }

  /**
   * Adds an event listener. Works only during runtime, i.e. event bindings are not
   * persisted.
   * @todo rewrite using event objects and support persisted event bindings
   * @param string $type The name of the event
   * @param string|qcl_core_Object $object The object or the object id retrieved by '$this->objectId()'
   * @param string $method callback method of the object
   */
  public function addListener( $type, $object, $method )
  {
    require_once "qcl/event/Dispatcher.php";
    $this->getEventDispatcher()->addListener( $this, $type, $object, $method );
  }

  /**
   * Dispatches a server event.
   * @param qcl_core_Object $target
   * @param qcl_event_type_Event $event
   * @return bool Whether the event was dispatched or not.
   */
  public function dispatchEvent ( $event )
  {
    require_once "qcl/event/Dispatcher.php";
    $this->getEventDispatcher()->dispatchEvent( $this, $event );
  }

  /**
   * Fires an event
   * @param string $type Message Event type
   */
  public function fireEvent ( $type )
  {
    require_once "qcl/event/Dispatcher.php";
    $this->getEventDispatcher()->fireDataEvent( $this, $type, $data );
  }

  /**
   * Fires a data event
   * @param mixed $event Message Event type
   * @param mixed $data Data dispatched with event
   */
  public function fireDataEvent ( $type, $data )
  {
    require_once "qcl/event/Dispatcher.php";
    $this->getEventDispatcher()->fireDataEvent( $this, $type, $data );
  }

  //-------------------------------------------------------------
  // Translation
  //-------------------------------------------------------------

  /**
   * Translates a message.
   * @return  String
   * @param   String  $msgId    Message id of the string to be translated
   * @param   Mixed   $varargs  (optional) Variable number of arguments for the sprintf formatting either as an array
   * or as parameters
   */
  public function tr( $msgId, $varargs=null )
  {
    if ( ! is_array($varargs) )
    {
      $varargs = func_get_args();
      array_shift($varargs);
    }
    $manager = $this->getApplication()->getLocaleManager();
    return $manager->tr($msgId, $varargs);
  }

  /**
   * Translate a plural message.Depending on the third argument the plursl or the singular form is chosen.
   *
   *
   * @param string   $singularMessageId Message id of the singular form (may contain format strings)
   * @param string   $pluralMessageId   Message id of the plural form (may contain format strings)
   * @param int      $count             If greater than 1 the plural form otherwhise the singular form is returned.
   * @param Array    $varargs           (optional) Variable number of arguments for the sprintf formatting
   * @return string
   */
  public function trn ( $singularMessageId, $pluralMessageId, $count, $varargs=array() )
  {
    $manager = $this->getApplication()->getLocaleManager();
    return $manager->trn( $singularMessageId, $pluralMessageId, $count, $varargs );
  }

  //-------------------------------------------------------------
  // Converting object into other formats
  //-------------------------------------------------------------

  /**
   * Returns a string representation of the object that has purely informational
   * value
   * @return string
   */
  public function __toString()
  {
    return "[" . $this->className() . " instance #" . $this->objectId() . "]";
  }

  /**
   * Dumps a variable to a string representation
   * @return string
   */
  public function dump()
  {
    return var_export( $this, true );
  }


  //-------------------------------------------------------------
  // Persistence
  //-------------------------------------------------------------

  /**
   * Getter for persistence behavior. Defaults to persistence in
   * the session.
   * @return qcl_data_persistence_behavior_Session
   */
  function getPersistenceBehavior()
  {
    /*
     * includ class file only if class hasn't been loaded yet -
     * otherwise this will not work when called from the destructor
     */
    if ( ! class_exists("qcl_data_persistence_behavior_Session") )
    {
      require_once "qcl/data/persistence/behavior/Session.php";
    }
    return qcl_data_persistence_behavior_Session::getInstance();
  }

  /**
   * Returns the id that is used to persist the object between
   * requests. Defaults to the class name, so that each new
   * object gets the content of the last existing object of the
   * same class. Override for different behavior.
   * @return string
   */
  function getPersistenceId()
  {
    return $this->className();
  }

  /**
   * Persist the properties of the object so that they will be
   * restored upon next instantiation of the object.
   * @return void
   */
  public function persistProperties()
  {
    if ( $this->isPersistent )
    {
      $this->getPersistenceBehavior()->persist( $this, $this->getPersistenceId() );
    }
    else
    {
      $this->raiseError("Cannot save object - it is not persistent.");
    }
  }

  //-------------------------------------------------------------
  // Destructor
  //-------------------------------------------------------------

  /**
   * Destructor. Saves object if persistent.
   */
  function __destruct()
  {
    if ( $this->isPersistent )
    {
      $this->persistProperties();
    }
  }
}
?>