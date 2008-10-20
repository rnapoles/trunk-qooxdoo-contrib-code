<?php

/**
 * Dependencies
 */ 
require_once "qcl/object.php";

/**
 * Base class of all json rpc service classes
 */

class qcl_jsonrpc_object extends qcl_object 
{

  //-------------------------------------------------------------
  // instance variables
  //-------------------------------------------------------------
  
  /**
   * the path to the directory containing binary executables, relative to the SERVICE_PATH
   */
  var $bin_path    = "../../bin/";    
  
  /**
   * database for event listeners registered on this object
   * @var array
   */
  var $__event_db = array();
  
  
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
   * Run once for the given class during one session
   * Implementing method must call parent method before executing action like so:
   * if ( ! parent::runOncePerClassAndSession() ) return;
   */
  function runOncePerClassAndSession()
  {
    $flag = get_class($this) . ".runOnceInSession";
    if ( $this->getSessionVar($flag) ) return false;
    $this->setSessionVar($flag,true);
    return true;
  }  
  
  //-------------------------------------------------------------
  // public methods
  //-------------------------------------------------------------
  
  /**
   * gets file path to binary executables depending on operating system
   * @return 
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

  //-------------------------------------------------------------
  // error and debug handling
  //-------------------------------------------------------------

  /**
   * raises a server error and exits
   * @param string $message
   * @param int    $number
   * @param string $file
   * @param int    $line
   * @return void
   */
  function raiseError( $message, $number=null, $file=null, $line=null )
  {
    /*
     * if error file and line have been specified
     */
    if ( $file and $line )
    {
      $message .= " in $file, line $line.";
    }
    
    /*
     * write to server log
     */
    $this->log( 
      "### Error in " . get_class($this) . " ###\n" . 
      $message . "\n" . 
      "Backtrace:\n" . 
      $this->getBacktrace(), 
      QCL_LOG_ERROR
    );
    
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
   */
  function debugVarHtml($var)
  {
      echo "<pre>" . htmlentities(var_export( $var, true )) . "</pre>"; 
      exit;
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
   * @todo: rewrite
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
   * @todo: rewrite 
   */
  function dispatchMessage ( $message, $data=true )
  {
    $this->log("Message $message"); 
    
    /*
     * search message database 
     */
    global $message_db;
    $index = array_search ( $message, $message_db['filters'] );
    
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
   * Adds an event listener. Works only during runtime
   * @todo: rewrite
   * @param string $type The name of the event
   * @param string $objectId Usually '$this->objectId()'
   * @param string $method callback method of the object indicated by the objectId
   * @todo rewrite
   */
  function addEventListener( $type, $objectId, $method )
  {
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
   * dispatches a server event
   * @param mixed $event Message Event type
   * @param mixed $data Data dispatched with event
   */
  function dispatchEvent ( $event, $data=true )
  {
    $this->log("Event $event");
    
    /*
     * search message database 
     */
    $event_db =& $this->__event_db;
    $index = array_search ( $event, $event_db['types'] );
    
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
 		require_once "qcl/registry/Session.php";
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


  //-------------------------------------------------------------
  // variable persistence
  //-------------------------------------------------------------    	
 	
	/**
 	 * save a persistent variable
 	 * @param string	$name	name of the variable
 	 * @param mixed		$data	data to be saved
 	 * @deprecated
 	 */
 	function setPersistentVar ( $name, $data )
 	{
 		$this->getLock($name);
    $this->store("qcl_persistent_var_$name",$data);
    $this->removeLock($name);
 	}
 	
 	/**
 	 * get a variable from the session 
 	 * the variables are available on a class basis, the namespace of the 
 	 * variables is the class name.
 	 * @param string	$name	name of the variable
 	 * @return reference a  reference to the session variable
 	 * @deprecated
 	 */
 	function &getPersistentVar ( $name )
 	{
 		$this->getLock($name);
 	  $data = $this->retrieve("qcl_persistent_var_$name");
 	  $this->removeLock($name);
    return $data;
 	}

  //-------------------------------------------------------------
  // locking of common resources
  //-------------------------------------------------------------
  
  /**
   * tries to get the given lock for 5 seconds, if not successful, abort.
   * Problem: how to avoid a race condition?
   * @param string $lockId
   * @todo: remove this, use a persistent object instead
   * @deprecated
   */
  function getLock( $lockId )
  {
    if ( ! $lockId )
    {
      $this->raiseError("No lock id provided.");
    }    
    
    $hasLock = false;
    $time    = floor(microtime_float());
    
    // create md5 hash to get around all character problems etc.
    $lockId = md5($lockId) . ".lock";
    
    while ( microtime_float() - $time < 5 )
    {
      $lock = $this->retrieve($lockId);
      /*
       * we'll get this lock if 
       * - there is no lock (return value is false)
       * - the lock contains our session id (it is our own lock)
       * - the lock is older than 600 seconds (no process is supposed to be longer than 10 minutes)
       */
      if ( ! $lock or ( 
        is_array($lock) and ( 
          $lock['session_id'] == session_id() or ( $time - $lock['timestamp'] > 600 ) 
        ) ) )
      {      
        $hasLock = true;
        /*
         * create new lock with session id and timestamp
         */
        $lock = array(
          'session_id' => session_id(),
          'timestamp'  => $time
        );
        $this->store($lockId, $lock );
        break;
      }
      /*
       * sleep for 100 ms to give the cpu a break
       */
      usleep(100);
    }
    if ( ! $hasLock )
    {
      $this->raiseError( get_class($this) . ": cannot get lock for '$lockId' since 5 seconds . Aborting.");
    }
    return;
  }
  
  /**
   * removes a lock
   * @param $lockId
   * @todo: remove this, use a persistent object instead
   * @deprecated
   */
  function removeLock ( $lockId )
  {
    if ( ! $lockId )
    {
      $this->raiseError("No lock id provided.");
    }
    
    /*
     *  create md5 hash to get around all character problems etc.
     */
    $lockId = md5($lockId) . ".lock";    
    $this->remove($lockId);
  }

  /**
   * tests if file has changed since last check
   * returns true on first check and throws an error
   * if file does not exist
   * @param string $path File path
   * @return boolean
   */
  function fileChanged($path)
  {
    if ( !is_valid_file($path) )
    {
      $this->raiseError("qcl_jsonrpc_object::fileChanged: '$path'  is not a valid file." );
    }
    
    /*
     * get stored file modification time
     */
    $filectime  = filectime($path);
    $sessionVar = "filectime_" . md5($path);
    $storedTime = $this->getSessionVar($sessionVar);
    
    if ( $filectime != $storedTime )
    {
      $this->setSessionVar( $sessionVar, $filectime );
      return true;
    }
    return false;
  }
  

  
}

