<?php

// dependencies
require_once ("qcl/object.php");

/**
 * simple controller-model architecture for jsonrpc
 * common base class for controllers
 */

class qcl_jsonrpc_controller extends qcl_object
{

   //-------------------------------------------------------------
   // inistance variables
   //-------------------------------------------------------------


	/**
	 * initial configuration contained in ini.php-files in the #
	 * service class folders
	 * @see qcl_object::configureServie()
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
    * constructor , configures the service
    */
	function __construct()
   	{
		parent::__construct();
		$this->configureService();		
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
	 * gets a configuration value of the pattern "foo.bar.baz"
	 * This retrieves the values set in the service.ini.php file, but 
	 * can be (optionally) overridden by values provided by the qcl_config
	 * class $this->config
	 */
	function getConfigValue($path)
	{
		$parts 	= explode(".",$path);
		$value 	= $this->ini;
		while( is_array($value) and $part = array_shift($parts) )
		{
			$value = $value[$part];  
		}
		if ( $this->config and is_a($this->config, "qcl_config" ) )
		{
			// todo: implement
		}
		return $value;
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
			$this->result[$first] = &$value;
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
		$messages =  (array) $this->get("__messages");
		$this->log("Message $message"); // debug
		if ( is_string ($message) )
		{
			$messages[] = array(
				'name' => $message, 
				'data' => $data
			);
		}
		elseif( is_array($message) )
		{
			$messages = array_merge($messages,$message);
		}
		else
		{
			trigger_error ("Invalid parameter");
		}
		$this->set("__messages", $messages );
		
	}

	//-------------------------------------------------------------
    // message polling - put this into a separate class
    //-------------------------------------------------------------
	
	/**
	 * server messages
	 * @param string 	$params[0]	request id
	 */
	function method_getServerMessages( $params )
	{
		$requestId 	= $params[0]; 
		$className	= get_class($this);
		$sessionId 	= session_id();
		
		// get messages from database and delete them
		$db = $this->getSingleton("qcl_db_pear");
		if ( $requestId )
		{
			$whereQuery = "`session_id` = '$sessionId' AND `class` = '$className' AND `request_id` = '$requestId'";
		}
		else
		{
			$whereQuery = "`session_id` = '$sessionId' AND `class` = '$className'";			
		}

		// get messages
		$messages = $db->getAllRows("
			SELECT * FROM `messages`
			WHERE $whereQuery
		");	
		
		$this->log("### Polled for ". count($messages) . " messages.");
		
		// and delete them
		$db->execute("
			DELETE FROM `messages`
			WHERE $whereQuery
		");
		
		// send to server 
		foreach ($messages as $message )
		{ 
			$this->addMessage( $message['name'], unserialize($message['data']) );
		}
		return $this->getResult();
	}

	/**
	 * add server message
	 * @param string 	$message
	 * @param mixed		$data
	 * @param string	$requestId 	(optional)
	 */
	function addServerMessage( $name, $data, $requestId = null)
	{ 
		$className	= get_class($this);
		$sessionId 	= session_id();
		
		// create data row
		$row = array(
			'class'			=> $className,
			'session_id'	=> $sessionId,
			'request_id'	=> $requestId,
			'name'			=> $name,
			'data'			=> serialize($data)
		);
		
		// insert messages into database
		$db = $this->getSingleton("qcl_db_pear");
		$db->insert("messages",$row);
		
		return;
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

	 
}	

?>