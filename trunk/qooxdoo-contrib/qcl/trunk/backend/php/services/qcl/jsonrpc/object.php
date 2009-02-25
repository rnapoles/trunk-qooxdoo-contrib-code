<?php

/**
 * Dependencies
 */ 
require_once "qcl/core/PropertyObject.php";

/**
 * Base class of all json rpc service classes
 */

class qcl_jsonrpc_object extends qcl_core_PropertyObject 
{


  /**
   * The controller object. Every model MUST have a controller object from
   * which it receives service and request information
   *
   * @var qcl_jsonrpc_controller or subclass
   */
  var $_controller = null;  
  
  /**
   * the path to the directory containing binary executables, relative to the SERVICE_PATH
   * @deprecated
   * @todo move everything related to execution of binaries to a separate class
   */
  var $bin_path    = "../../bin/";    
  
  /**
   * database for event listeners registered on this object
   * @todo mover everything related to events and messages to event package
   * @var array
   */
  var $__event_db = array();
  
 /**
  * constructor 
  * @param qcl_jsonrpc_controller $controller Controller object. You can 
  */
  function __construct( $controller=null )
  {
    /*
     * initialize parent class
     */
    parent::__construct();
    
    /*
     * set controller. This wil throw an error if no controller is available
     */
    $this->setController( &$controller ); 
  }  
  
  /**
   * sets controller of this model to be able to link to other models
   * connected to the controller
   * @param qcl_jsonrpc_controller $controller Controller object. You can 
   * also provide a qcl_jsonrpc_model object
   */
  function setController ( $controller )
  {
    $this->_controller =& $controller;
  }

  /**
   * Returns controller of this model 
   * @return qcl_jsonrpc_controller 
   */
  function &getController()
  {
    return $this->_controller;
  }   
  
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
  function &getInstance( $class=__CLASS__ )
  {
    return parent::getInstance( $class );
  }
  
  /**
   * Returns the server object of the controller
   */
  function &server()
  {
    $controller =& $this->getController();
    return $controller->server();
  }
  
  /**
   * Run once for the given class during one session
   * Implementing method must call parent method before executing action like so:
   * if ( ! parent::runOncePerClassAndSession() ) return;
   * @todo rewrite using external class
   * @return bool
   */
  function runOncePerClassAndSession()
  {
    $flag = get_class($this) . ".runOnceInSession";
    if ( $this->getSessionVar($flag) ) return false;
    $this->setSessionVar($flag,true);
    return true;
  }  

  /**
   * Returns file path to binary executables depending on operating system
   * @return string
   * @deprecated
   * @todo move to external class
   */
  function getOsBinDir()
  {
    $path = SERVICE_PATH . $this->bin_path;
    switch ( strtolower ( PHP_OS ) )
    {
      case "darwin":  $path .= "Darwin/"; break;
      case "WINNT":   $path .= "win32/";   break;
      default:        $path .= "i386linux/"; 
    }
    return $path;
  }
  
  /**
   * Returns the path to a directory where temporary data will be stored with
   * a trailing slash
   * @deprecated
   * @todo move to external system class
   */
  function tmpDir()
  {
    return realpath(QCL_TMP_PATH) . "/";
  }
  
  /**
   * Raises a server error and exits
   * @param string $message
   * @param int    $number
   * @param string $file
   * @param int    $line
   * @return void
   */
  function raiseError( $message, $number=null, $file=null, $line=null )
  {
    $controller =& $this->getController();
    $controller->raiseError( $message, $number, $file, $line );
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
   * Exits the current service with a user notice. This
   * is technically a jsonrpc error, but has no backtrace
   * @param string $message
   * @return void
   */
  function userNotice ( $message )
  {
    /*
     * write to logfile
     */
    $this->info("### User notice : $message");
    
    /*
     * if this is a jsonrpc request, we have a global $error object
     * that the error can be passed to.
     */
    global $error;
    if ( is_object($error) )
    {
      $error->setError( $number, htmlentities( stripslashes( $message ) ) );
      $error->SendAndExit();
      // never gets here
      exit;
    }
    
    /*
     * otherwise, it is an html request, print to output
     */
    echo $message;
    exit;
  }  

  /**
   * alerts a message on the client 
   */
  function alert( $message )
  {
    /*
     *  pass message as error to jsonrpc error object if present
     */
    global $error;
    
    if ( is_object($error) )
    {
      $error->setError( $number, stripslashes( $message ) );
      $error->SendAndExit();
      // never gets here
      exit;
    }
    
    /*
     * or simply output error message
     */
    echo $message;
    exit;
  }

  /**
   * debug a variable as html and exit 
   * @todo move to logger class
   */
  function debugVarHtml($var)
  {
      echo "<pre>" . htmlentities(var_export( $var, true )) . "</pre>"; 
      exit;
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
  
  //-------------------------------------------------------------
  // Simple programmatic message and event system 
  // This might later be rewritten more oo-style with event and 
  // message objects.
  //-------------------------------------------------------------
  
  /**
   * Adds a message subscriber. This works only for objects which have been
   * initialized during runtime. Filtering not yet supported, i.e. message name must
   * match the one that has been used when subscribing the message, i.e. no wildcards!
   * @todo move to external class
   * @param string $filter
   * @param string $method Callback method of the current object
   */
  function addMessageSubscriber( $filter, $method )
  {
    global $message_db;
    if ( ! $message_db )
    {
      $message_db = array(
        'filters'  => array(),
        'data'     => array()
      );
    }
    
    /*
     * object id
     */
    $objectId = $this->objectId();
    
    /*
     * search if we already have an entry for the filter
     */
    $index = array_search( $filter, $message_db['filters'] );
    if ( $index === false )
    {
      /*
       * filter not found, create new filter and data
       */
      $message_db['filters'][] = $filter;
      $index = count($message_db['filters']) -1;
      $message_db['data'][$index] = array( array( $objectId, $method ) ); 
    }
    else
    {
      /*
       * filter found, add data
       */
      $message_db['data'][$index][] = array( $objectId, $method ); 
    }
    
  }
  
  /**
   * Dispatches a message. Filtering not yet supported, i.e. message name must
   * match the one that has been used when subscribing the message, i.e. no wildcards!
   * @param string $message Message name 
   * @param mixed $data Data dispatched with message
   * @todo move to external class
   */
  function dispatchMessage ( $message, $data=true )
  {
    $this->log("Message $message"); 
    
    /*
     * search message database 
     */
    global $message_db;
    $index = array_search ( $message, (array) $message_db['filters'] );
    
    /*
     * abort if no subcriber for this message registered
     */
    if ( $index === false ) return;
    
    /*
     * call object methods
     */
    foreach ( $message_db['data'][$index] as $target )
    {
      list( $objectId, $method ) = $target;
      $object =& $this->getObjectById( $objectId );
      $object->$method($data);
    }
    
  }
  
  /**
   * Adds an event listener. Works only during runtime, i.e. event bindings are not 
   * persisted.
   * @todo rewrite using event objects and support persisted event bindings
   * @param string $type The name of the event
   * @param string|qcl_jsonrpc_object $object The object or the object id retrieved by '$this->objectId()'
   * @param string $method callback method of the object 
   * @todo move to external class
   */
  function addEventListener( $type, $object, $method )
  {
    /*
     * object id
     */
    if ( is_a( $object,"qcl_jsonrpc_object" ) )
    {
      $objectId = $object->objectId();
    }
    elseif ( is_string($object) and ! empty( $object ) )
    {
      $objectId = $object;
    }
    else    
    {
      $this->raiseError("Invalid object or object id");
    }
    
    /*
     * event database
     */
    $event_db =& $this->__event_db;
    if ( ! $event_db )
    {
      $event_db = array(
        'types'  => array(),
        'data'     => array()
      );
    }
    
    /*
     * search if we already have an entry for the event type
     */
    $index = array_search( $type, $event_db['types'] );
    if ( $index === false )
    {
      /*
       * filter not found, create new filter and data
       */
      $event_db['types'][] = $type;
      $index = count($event_db['types']) -1;
      $event_db['data'][$index] = array( array( $objectId, $method ) ); 
    }
    else
    {
      /*
       * filter found, add data
       */
      $event_db['data'][$index][] = array( $objectId, $method ); 
    }
    
  }  
  
  /**
   * Dispatches a server event
   * @param mixed $event Message Event type
   * @param mixed $data Data dispatched with event
   * @todo move to external class
   */
  function dispatchEvent ( $event, $data=true )
  {
    $this->log("Event $event","event");
    
    /*
     * search message database 
     */
    $event_db =& $this->__event_db;
    $index = array_search ( $event, (array) $event_db['types'] );
    
    /*
     * abort if no event listener for this message has been registered
     */
    if ( $index === false ) return;
    
    /*
     * call object methods
     */
    foreach ( $event_db['data'][$index] as $target )
    {
      list( $objectId, $method ) = $target;
      $object =& $this->getObjectById( $objectId );
      $object->$method($data);
    }
  }
  
  //-------------------------------------------------------------
  // session variables
  //-------------------------------------------------------------  
  
	/**
 	 * save a variable in the session 
 	 * @param string	$name	name of the variable
 	 * @param mixed		$data	data to be saved
 	 * @depreated Use qcl_registry_Session instead
 	 */
 	function setSessionVar ( $name, $data )
 	{
 	  $reg =& qcl_registry_Session::getInstance();
 		$reg->set($name,$data);
 	}
 	
 	/**
 	 * get a variable from the session 
 	 * @param string	$name	name of the variable
 	 * @return reference a  reference to the session variable
 	 * @depreated Use qcl_registry_Session instead
 	 */
 	function getSessionVar ( $name )
 	{
    require_once "qcl/registry/Session.php";
 	  $reg =& qcl_registry_Session::getInstance();
    return $reg->get($name);
 	}

 	/**
 	 * checks if sesion variable exists
 	 * @param string	$name	name of the variable
 	 * @return Boolean
 	 * @depreated Use qcl_registry_Session instead
 	 */
 	function hasSessionVar ( $name )
 	{
    require_once "qcl/registry/Session.php";
 	  $reg =& qcl_registry_Session::getInstance();
    return $reg->has($name);
 	}
  
}

