<?php

// dependencies
require_once ("qcl/object.php");

/**
 * base class of all json rpc service classes
 */

class qcl_jsonrpc_object extends qcl_object 
{

  //-------------------------------------------------------------
  // instance variables
  //-------------------------------------------------------------

	/**
	 * @var JsonRpcError $error
	 */
	var $error;
  
  /**
   * @ the path to the directory containing binary executables, relative to the SERVICE_PATH
   */
  var $bin_path    = "../../bin/";  
  

  //-------------------------------------------------------------
  // public methods
  //-------------------------------------------------------------
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
    // pass error to jsonrpc error object ( or end gracefully)
    global $error;
    if ( is_object($error) )
    {
      $error->setError( $number, stripslashes( $message ) );
      $error->SendAndExit();
      // never gets here
      exit;
    }
    echo $message;
    exit;
  }

  /**
   * alerts a message on the client 
   */
  function alert( $message )
  {
    // pass message as error to jsonrpc error object ( or end gracefully)
    global $error;
    if ( is_object($error) )
    {
      $error->setError( $number, stripslashes( $message ) );
      $error->SendAndExit();
      // never gets here
      exit;
    }
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
  // session variables
  //-------------------------------------------------------------  
  
	/**
 	 * save a variable in the session 
 	 * @param string	$name	name of the variable
 	 * @param mixed		$data	data to be saved
 	 */
 	function setSessionVar ( $name, $data )
 	{
 		$_SESSION['QCL_SESSION_VARS'][$name] =& $data;
 	}
 	
 	/**
 	 * get a variable from the session 
 	 * @param string	$name	name of the variable
 	 * @return reference a  reference to the session variable
 	 */
 	function &getSessionVar ( $name )
 	{
 		return $_SESSION['QCL_SESSION_VARS'][$name];
 	}

 	/**
 	 * checks if sesion variable exists
 	 * @param string	$name	name of the variable
 	 * @return Boolean
 	 */
 	function hasSessionVar ( $name )
 	{
 		return isset( $_SESSION['QCL_SESSION_VARS'][$name] );
 	}


  //-------------------------------------------------------------
  // variable persistence
  //-------------------------------------------------------------    	
 	
	/**
 	 * save a persistent variable
 	 * @param string	$name	name of the variable
 	 * @param mixed		$data	data to be saved
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
   */
  function getLock( $lockId )
  {
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
   */
  function removeLock ( $lockId )
  {
    // create md5 hash to get around all character problems etc.
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

