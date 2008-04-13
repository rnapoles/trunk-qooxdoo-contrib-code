<?php

// dependencies
require_once ("qcl/object.php");

/**
 * base class of all json rpc service classes
 */

class qcl_jsonrpc_object extends qcl_object {

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
  // internal methods
  //-------------------------------------------------------------
	
	/**
	 * Class constructor
	 */
	function __construct() 
	{
		parent::__construct();
	}

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

	/**
	 * stores the object or arbitrary data in the filesystem.
	 * @param mixed 	$id			Id under which to store the data. If no Id is given, use the class name
	 * 								This allows to create persistent singletons.
	 * @param mixed 	$data 		Data to store. If no data is provided, the object serializes itself
	 * return string Path to file with stored data.
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
 	 * @param string 	$id		Id of data to be retrieved from filesystem
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

	/**
 	 * save a persistent variable; todo: make this thread-safe!
 	 * @param string	$name	name of the variable
 	 * @param mixed		$data	data to be saved
 	 */
 	function setPersistentVar ( $name, $data )
 	{
 		$persistentVars = (array) $this->retrieve("qcl_persistent_vars");
    $persistentVars[$name] = $data;
    $this->store("qcl_persistent_vars",$persistentVars);
 	}
 	
 	/**
 	 * get a variable from the session 
 	 * the variables are available on a class basis, the namespace of the 
 	 * variables is the class name.
 	 * @param string	$name	name of the variable
 	 * @return reference a  reference to the session variable
 	 */
 	function getPersistentVar ( $name )
 	{
 		$persistentVars = (array) $this->retrieve("qcl_persistent_vars");
    return $persistentVars[$name];
 	}

 	/**
 	 * checks if persistent variable exists
 	 * @param string	$name	name of the variable
 	 * @return Boolean
 	 */
 	function hasPersistentVar ( $name )
 	{
 		$persistentVars = (array) $this->retrieve("qcl_persistent_vars");
    return isset( $persistentVars[$name] );
 	}

  /*
   * jsonrpc error and message handling 
   * 
   */

	/**
	 * raises a server error and exits
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
      "Stack Trace:\n" . 
      $this->getStackTrace(), 
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

}

