<?php

/**
 * base class providing __construct and & __destruct compatibility to php4 objects
 */
class patched_object {
	
	/**
	 * PHP4 __construct() hack taken from cakephp
	 * taken from https://trac.cakephp.org/browser/trunk/cake/1.2.x.x/cake/libs/object.php
	 *
	 * CakePHP(tm) :  Rapid Development Framework <http://www.cakephp.org/>
	 * Copyright 2005-2007, Cake Software Foundation, Inc.
	 *								1785 E. Sahara Avenue, Suite 490-204
	 *								Las Vegas, Nevada 89104
	 *
	 * Licensed under The MIT License
	 * Redistributions of files must retain the above copyright notice.
	 *
	 * A hack to support __construct() on PHP 4
	 * Hint: descendant classes have no PHP4 class_name() constructors,
	 * so this constructor gets called first and calls the top-layer __construct()
	 * which (if present) should call parent::__construct()
	 *
	 * @return Object
	 */
	function patched_object() 
	{
		//trigger_error("qcl_object constructor called");
		$args = func_get_args();
		if (method_exists($this, '__destruct')) 
		{
			register_shutdown_function (array(&$this, '__destruct'));
		}
		if (method_exists($this, '__construct')) 
		{
			call_user_func_array(array(&$this, '__construct'), $args);
		}
	}

    function __construct() {}

}

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
 * base class of all json rpc service classes
 */

class qcl_object extends patched_object {

   //-------------------------------------------------------------
   // instance variables
   //-------------------------------------------------------------

	/**
	 * @var JsonRpcError $error
	 */
	var $error;
   
  //-------------------------------------------------------------
  // internal methods
  //-------------------------------------------------------------
	
	/**
	 * Class constructor
	 */
	function __construct() 
	{
		parent::__construct();
    $GLOBALS['_stackTrace'][] = get_class($this); // save class method for stack trace
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
   * mixing in methods of another class
   * @todo: adapt for PHP5
   * @return void
   * @param $classname class name
   */
  function mixin ($classname)
  {
    $this->includeClassfile($classname);
    aggregate( $this, $classname);
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
      $instance = $this->getNewInstance( $classname, &$controller );
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
	function &getNewInstance( $classname, $controller = null ) 
	{       
    // check for class existence
    if ( ! class_exists ( $classname ) ) 
    {
      $path = $this->includeClassFile($classname);
      
      // check class
      if ( ! class_exists ( $classname) )
      {
    		$this->raiseError ( get_class($this) . "::getNewInstance : Cannot instantiate class '$classname': file '" . addslashes($path) .  "' does not contain class definition." );    	
      }
    }
    
    // instantiate object
    if ( ! $controller and is_a ( $this, "qcl_jsonrpc_controller" ) )
    {
    	$controller =& $this;
    }
    $instance =& new $classname(&$controller);
    return $instance;
  }
    
    
 
	/**
	 * log to file on server
	 */
	function log( $msg, $logLevel=QCL_LOG_DEBUG )
	{
		if ( QCL_LOG_LEVEL and QCL_LOG_LEVEL <= $logLevel)
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
			@error_log($message,3,QCL_LOG_FILE);			
		}			
	}
	
  /**
   * logs a message with of level "info"
   * @return void
   * @param $msg string
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
	 * raises a server error and exits
	 */
	function raiseError( $message, $number=null, $file=null, $line=null )
	{
		global $error;
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
		$error->setError( $number, stripslashes( $message ) );
 		$error->SendAndExit();
	}

  /**
   * gets the stack trace of invoked objects
   * @return string list
   */
  function getStackTrace()
  {
    return implode("\n",$GLOBALS['_stackTrace']) ;
  }
	
	/**
	* debug a variable 
	* @todo: debug to file
	*/
	function debug($var,$html=false)
	{
		if ( ! $html )
		{
			// we are in a jsonrpc request, send debug output as error message
			$this->raiseError( print_r ( $var, true ) );
		}
		else
		{
			// we can happily output as a html response
			echo "<pre>" . htmlentities(var_export( $var, true )) . "</pre>";	
		}
   	}
}


// convenience functions, may be already defined

/**
 * PHP5 file_put_contents emulation
 *
 */
if(!function_exists("file_put_contents")){
    function file_put_contents($file,$data)
    {
        @unlink($file);
        error_log($data,3,$file);
    }
}

/**
 * avoids if statements such as if($a) $c=$a; else $c=$b;
 *
 * @argument mixed 
 * @argument mixed ...
 * @return first non-null argument, otherwise false
 */ 
if(!function_exists("either")){
    function either()
    {
            $arg_list = func_get_args();
            foreach($arg_list as $arg)
                    if($arg) return $arg;
        return false;
    } 
}

/**
 * php4 equivalent of stream_get_contents
 * 
 * @param resource $resource resource handle
 */
if( ! function_exists( "stream_get_contents" ) )
{
    function stream_get_contents($resource)
    {
		$stream = "";
		while ( ! feof ( $resource ) ) 
		{ 
			$stream .= fread ( $resource );
		}
		return $stream;
    } 
}

/**
 * php4 equivalent of scandir
 * from http://www.php.net/manual/en/function.scandir.php
 * @return array list of files
 * @param string $dir
 * @param boolean $sortorder 
 */ 
if(!function_exists('scandir')) 
{
  function scandir($dir, $sortorder = 0) 
  {
    if(is_dir($dir) && $dirlist = @opendir($dir)) 
    {
      while(($file = readdir($dirlist)) !== false) 
      {
          $files[] = $file;
      }
      closedir($dirlist);
      ($sortorder == 0) ? asort($files) : rsort($files); // arsort was replaced with rsort
      return $files;
    } 
    else 
    {
      return false;  
    }
  }
}

/**
 * php4 equivalent of array_diff_key
 * from http://de3.php.net/manual/en/function.array-diff-key.php
 * @return array 
 */ 
if(!function_exists('array_diff_key')) 
{
  function array_diff_key()
  {
    $arrs = func_get_args();
    $result = array_shift($arrs);
    foreach ($arrs as $array) {
      foreach ($result as $key => $v) {
        if (array_key_exists($key, $array)) {
            unset($result[$key]);
        }
      }
    }
    return $result;
   }
}