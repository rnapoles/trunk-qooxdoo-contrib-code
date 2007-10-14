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
	 * create new instance and pass a reference to the instantiating
	 * object or a passed-through object to the constructor.
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
            if ( ! is_a ( $controller, "qcl_jsonrpc_controller" ) )
            {
            	$controller = &$this;
            }
            $instance = new $classname(&$controller);
        }
        return $instance;
    }
	
	/**
	 * log function
	 * @todo: implement
	 */
	function log( $string){}
		
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