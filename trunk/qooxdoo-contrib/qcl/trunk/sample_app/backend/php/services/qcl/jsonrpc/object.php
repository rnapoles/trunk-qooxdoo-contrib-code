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
		//trigger_error("qcl_jsonrpc_object constructor called");
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

class qcl_jsonrpc_object extends patched_object {

   //-------------------------------------------------------------
   // common class variables to be overridden
   //-------------------------------------------------------------

	/**
	 * @var JsonRpcError $error
	 */
	var $error;
	
	/**
	 * initial configuration contained in ini.php-files in the #
	 * service class folders
	 * @see qcl_jsonrpc_object::configureServie()
	 */	
	var $ini;
	
	/**
	 * result value which will be serialized and returned to server
	 */
	var $result = array();

   //-------------------------------------------------------------
   // internal methods
   //-------------------------------------------------------------
	
	/**
	 * Class constructor, configures the service
	 */
	function __construct() 
	{
		parent::__construct();
		$this->configureService();
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
	 * get (non-persistent) singleton instance of class
	 * @param string $classname
	 * @return object reference to singleton instance
	 */
	function &getSingleton( $classname ) 
	{
        global $qcl_jsonrpc_singletons;
        $instance = &$qcl_jsonrpc_singletons[$classname];
        if ( ! is_object ($instance) ) 
        {
            $instance = new $classname;
        }
        return $instance;
    }

	/**
	 * set persistent singleton instance of a class
	 * @param object $instance reference to be set as singleton
	 */
	function &setPersistentSingleton( $instance ) 
	{
        $classname = get_class ( $instance );
        $_SESSION[ "qcl_jsonrpc_singleton_" . $classname ] = &$instance;
        return $instance;
    }
	
	
	/**
	 * get persistent singleton instance of class
	 * @param string $classname
	 * @return object reference to singleton instance
	 */
	function &getPersistentSingleton( $classname ) 
	{
        $instance = &$_SESSION[ "qcl_jsonrpc_singleton_" . $classname];
        if ( ! is_object ($instance) ) 
        {
            $instance = new $classname;
        }
        return $instance;
    }
	
	/**
	 * reads initial configuration. looks for service.ini.php files, starting at 
	 * the top-level service directory. lower-level service.ini.php files can override 
	 * config directives selectively, inheriting the rest of the settings from the upper
	 * level config files.
	 **/
	function configureService()
	{
		global $serviceComponents;
		$currPath = servicePathPrefix;
		$this->ini = array();
		
		// traverse service path and look for service.ini.php files 
		// 
		for ( $i=0; $i<count($serviceComponents); $i++ )
		{
			 $currPath .= $serviceComponents[$i] . "/";
			 
			 // if config file exists, parse it and add/override config directives
			 if ( file_exists ($currPath . "/service.ini.php") )
			 {
			 	$config = parse_ini_file ( $currPath . "/service.ini.php", true);
			 	$this->ini = array_merge ( $this->ini, $config );
			 }
		} 
	}

	/**
	 * assemble a result array for the json response
	 * @param mixed $first  key or hash map of key-value pairs
	 * @param mixed $value
	 */
	function set ( $first, $value=null )
	{
		if ( is_array( $first ) )
		{
			foreach( $first as $key => $value )
			{
				$this->set ( $key, $value );
			}
		}
		else
		{
			$this->result[$first] = $value;
		}
	}
	
	
	/**
	 * gets value for particular result key
	 * 
	 */
	function &get ( $key )
	{
		return $this->result[$key];
	}
	
	/**
	 * gets result for json response
	 */
	function &getResult ( $key )
	{
		return $this->result;
	}
	
	/**
	 * adds a server message
	 * @param mixed $message Message name or hash map of messages
	 * @param mixed $data Data dispatched with message
	 */
	function addMessage ( $message, $data=true )
	{
		if ( is_string ($message) )
		{
			$msg = array();
			$msg[$message]= $data;
		}
		elseif( is_array($message) )
		{
			$msg = $message;
		}
		else
		{
			trigger_error ("Invalid parameter");
		}
		
		$this->set("__messages", array_merge ( $this->get("__messages"), $msg )	);
	}
	
	/**
	* get service directory url
	*/
	function getServiceDirUrl($append="")
	{
		global $serviceComponents;
		$serverDirUrl = "http://" . getenv (HTTP_HOST) . dirname ( $_SERVER['PHP_SELF'] ) . "/";
		return $serverDirUrl . $serviceComponents[0] . "/" . $append;
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
			trigger_error( print_r ( $var, true ) );
		}
		else
		{
			// we can happily output as a html response
			echo "<pre>" . htmlentities(var_export( $var, true )) . "</pre>";	
		}
   	}
}