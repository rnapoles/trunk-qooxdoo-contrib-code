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
	}

	/**
	 * set (non-persistent) singleton instance of a class
	 * @param object $instance reference to be set as singleton
	 */
	function &setSingleton( $instance ) 
	{
        global $qcl_jsonrpc_singletons;
        $classname = get_class ( $instance );
        $qcl_jsonrpc_singletons[$classname] = &$instance;
        return $instance;
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
        global $qcl_jsonrpc_singletons;
        $instance = &$qcl_jsonrpc_singletons[$classname];
        if ( ! is_a ( $instance, $classname ) ) 
        {
            $instance = $this->getNewInstance( $classname, $controller );
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
            $path = SERVICE_PATH . implode( "/", explode("_",$pathname ) ) . ".php";
            if ( ! file_exists ( $path ) )
            {
        		$this->raiseError ( get_class($this) . "::getSingleton : Cannot instantiate class '$classname - file '" . addslashes($path) .  "' does not exist." );    	
            }
            
            // load class file
            require_once ( $path );
            
            // check class
            if ( ! class_exists ( $classname) )
            {
        		$this->raiseError ( get_class($this) . "::getSingleton : Cannot instantiate class '$classname - file '" . addslashes($path) .  "' does not contain class definition." );    	
            }
        }
        
        // instantiate object
        if ( is_a ( $this, "qcl_jsonrpc_controller" ) )
        {
        	$controller = &$this;
        }
        $instance = new $classname(&$controller);
        return $instance;
    }
   	/**
   	 * save a variable in the session 
   	 * the variables will be available on a class basis, the namespace of the 
   	 * variables is the class name.
   	 * @param string	$name	name of the variable
   	 * @param mixed		$data	data to be saved
   	 */
   	function setSessionVar ( $name, $data )
   	{
   		$varName = get_class($this);
   		$_SESSION[$varName] = &$data;
   	}
   	
   	/**
   	 * get a variable from the session 
   	 * the variables are available on a class basis, the namespace of the 
   	 * variables is the class name.
   	 * @param string	$name	name of the variable
   	 * @return reference a  reference to the session variable
   	 */
   	function &getSessionVar ( $name )
   	{
   		$varName = get_class($this);
   		return $_SESSION[$varName];
   	}
   	 
	/**
	 * log to file on server
	 */
	function log($string,$withClassName="false")
	{
		if ( false )
		{
			$message = date("y-m-j H:i:s") . " (" . get_class($this) . "): " . $string . "\n";	
		} 
		else
		{
			$message = date("y-m-j H:i:s") . ": " . $string . "\n";
		}
		$file	 = SERVICE_PATH . "bibliograph/var/log/bibliograph.log";
		if ( is_writable($file) )
		{
			error_log($message,3,$file);	
		}
	}
		
	/**
	 * raises a server error and exits
	 */
	function raiseError( $message, $number=null, $file=null, $line=null )
	{
		global $error;
		$message = get_class($this) . " - " . $message;
		if ( $file and $line )
		{
			$message .= " in $file, line $line.";
		}
		$this->log($message);
		$error->setError( $number, stripslashes( $message ) );
 		$error->SendAndExit();
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