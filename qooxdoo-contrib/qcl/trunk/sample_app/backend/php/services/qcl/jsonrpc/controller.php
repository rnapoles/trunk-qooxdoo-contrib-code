<?php

// dependencies
require_once ("qcl/jsonrpc/object.php");

// constants
define("QCL_SERVICE_CONFIG_FILE", "service.ini.php");

/**
 * simple controller-model architecture for jsonrpc
 * common base class for controllers
 */

class qcl_jsonrpc_controller extends qcl_jsonrpc_object
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
	 * response data to be serialized and returned to server
	 */
	var $_response = array(
    'result'    => array(),
    'messages'  => array(),
    'events'    => array() 
  );
	
  
  /**
   * models attached to this controller
   */	
	var $_models = array();
  
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
    $this->setSingleton(&$this);
	}   	

	//-------------------------------------------------------------
  // service configuration
  //-------------------------------------------------------------
  
	/**
	 * reads initial configuration. looks for service.ini.php files, starting at 
	 * the top-level service directory. lower-level service.ini.php files can override 
	 * config directives selectively, inheriting the rest of the settings from the upper
	 * level config files.
	 **/
	function configureService()
	{
		global $serviceComponents;
		$currPath = defined(servicePathPrefix) ? servicePathPrefix : "";
		$this->ini = array();
		$found = false;
    
		// traverse service path and look for service.ini.php files 
		// 
		for ( $i=0; $i<count($serviceComponents); $i++ )
		{
			 $currPath .= $serviceComponents[$i] . "/";
			 
			 // if config file exists, parse it and add/override config directives
			 if ( file_exists ($currPath . "/" . QCL_SERVICE_CONFIG_FILE) )
			 {
			   $found = true;
         $config = parse_ini_file ( $currPath . "/" . QCL_SERVICE_CONFIG_FILE, true);
			 	 $this->ini = array_merge ( $this->ini, $config );
			 }
		}
    
    if ( ! $found )
    {
      $this->raiseError("No " . QCL_SERVICE_CONFIG_FILE . " file found for " . get_class($this) . " ." );
    }
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
	 * gets a configuration value of the pattern "foo.bar.baz"
	 * This retrieves the values set in the service.ini.php file.
	 */
	function getIniValue($path)
	{
		$parts 	= explode(".",$path);
		$value 	= $this->ini;
		while( is_array($value) and $part = array_shift($parts) )
		{
			$value = $value[$part];  
		}
		return $value;
	}

	//-------------------------------------------------------------
  // models
  //-------------------------------------------------------------
  
  /**
   * gets a model
   * @return object
   * @param string $name 
   */
  function &getModel($name)
  {
    return $this->_models[$name];
  }	
  
  /**
   * saves a model
   * @return void
   * @param string $name 
   * @param object $object 
   */
  function setModel($name,$object)
  {
    $this->_models[$name] =& $object;
  }

	//-------------------------------------------------------------
  // translation (modeled after qooxdoo syntax)
  //-------------------------------------------------------------
  
  /**
   * gets the locale controller and sets the default locale. default is
   * a qcl_locale_controller (see there). if you want to use a different
   * controller, override this method
   * return Object
   */
  function &getLocaleController()
  {
    static $localeController = null;
    if ( ! $localeController )
    {
      $localeController =& $this->getSingleton("qcl_locale_controller");
    }
    return $localeController;
  }
  
  /**
   * translates a message
   * @return  String
   * @param   String  $msgId    Message id of the string to be translated 
   * @param   Array   $varargs  (optional) Variable number of arguments for the sprintf formatting
   */
  function tr( $msgId, $varargs=array() )
  {
    $localeController =& $this->getLocaleController();
    return $localeController->tr($msgId, $varargs);
  }	
  
  /**
   * Translate a plural message.Depending on the third argument the plursl or the singular form is chosen.
   *
   * @param string   $singularMessageId Message id of the singular form (may contain format strings)
   * @param string   $pluralMessageId   Message id of the plural form (may contain format strings)
   * @param int      $count             If greater than 1 the plural form otherwhise the singular form is returned.
   * @param Array    $varargs           (optional) Variable number of arguments for the sprintf formatting
   * @return string
   */
  function trn ( $singularMessageId, $pluralMessageId, $count, $varargs=array() )
  {
    $localeController =& $this->getLocaleController();
    return $localeController->trn( $singularMessageId, $pluralMessageId, $count, $varargs );
  }

	//-------------------------------------------------------------
  // response data
  //-------------------------------------------------------------  
	
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
			$this->_response['result'][$first] =& $value;
		}
	}
	
	/**
	 * gets value for particular result key
	 * 
	 */
	function &get ( $key )
	{
		return $this->_response['result'][$key];
	}
	
	/**
	 * gets result for json response inclusing result data, events, and messages
	 * @return array
	 */
	function getResponseData()
	{
		return $this->_response;
	}

	//-------------------------------------------------------------
  // messages and events
  //-------------------------------------------------------------

	/**
	 * dispatches a server message
	 * @param string $message Message name 
	 * @param mixed $data Data dispatched with message
	 */
	function dispatchMessage ( $message, $data=true )
	{
		$this->log("Message $message"); 
    $this->addMessage( $message, $data );
	}

  /**
   * adds a message to the message stack
   * @param string $message Message name
   * @param mixed $data Message Data
   * @return void
   */
  function addMessage( $message, $data )
  {
		if ( is_string ($message) )
		{
			$this->_response['messages'][] = array(
				'name' => $message, 
				'data' => $data
			);
		}
		else
		{
			trigger_error ("Invalid message parameter");
		}
  }

  /**
   * get messages on message stack
   * @return array
   */
  function getMessages()
  {
    return $this->_response['messages'];
  }


	/**
	 * dispatches a server event
	 * @param mixed $event Message Event type
	 * @param mixed $data Data dispatched with event
	 */
	function dispatchEvent ( $event, $data=true )
	{
		$this->log("Event $event"); // debug
    $this->addEvent( $event, $data );
	}

	/**
	 * adds an event to the event stack
	 * @param mixed $event Message Event type
	 * @param mixed $data Data dispatched with event
	 */
	function addEvent ( $event, $data )
	{
		if ( is_string ($event) )
		{
			$this->_response['events'][] = array(
				'type' => $event, 
				'data' => $data
			);
		}
		else
		{
			trigger_error ("Invalid event parameter");
		}
	}

  /**
   * get messages on message stack
   * @return array
   */
  function getEvents()
  {
    return $this->_response['events'];
  }

	//-------------------------------------------------------------
  // request id & process management
  //-------------------------------------------------------------

  /**
   * gets the unique id of the current request, if any
   * @return string
   */
  function getRequestId()
  {
    return $this->_requestId;
  }

  /**
   * sets the unique id of the current request
   * @return 
   * @param $requestId Object
   */
  function setRequestId( $requestId )
  {
    $this->_requestId = $requestId;
  }

  /**
   * aborts a long-running process. call with updateServer()
   * @param string $params[1] request id
   * @param bool   $params[2] if true, remove killfile only
   */
  function method_abortRequest ( $params )
  {
    $requestId      = $params[1];
    $removeKillFile = $params[2];
    $messagefile    = QCL_TMP_PATH . $requestId;
    $killfile       = $messagefile . ".kill";
   
    if ( $removeKillFile ) 
    {
      if ( ! unlink ( $killfile ) )
      {
         $this->raiseError("qcl_jsonrpc_controller::method_abortRequest : Cannot remove kill file '$killfile'."); 
      }
      $this->dispatchEvent("requestAbortCompleted",$requestId);
      return $this->getResponseData();
    }
    if ( file_exists ( $messagefile ) ) 
    {
      if ( ! touch ( $killfile ) )
      {
         $this->raiseError("qcl_jsonrpc_controller::method_abortRequest : Cannot create kill file '$killfile'."); 
      }
      if ( ! unlink ( $messagefile ) )      
      {
         $this->raiseError("qcl_jsonrpc_controller::method_abortRequest : Cannot remove message file '$messagefile'."); 
      }
    }
    $this->dispatchEvent("requestAborted",$requestId);
    return $this->getResponseData();
  }

  
  /**
   * communicates with progress.php through message file to output a simple progress meter or log
   * @return 
   * @param mixed  $i     string message, int percent of progress or current index variable (if $count is given)
   * @param int    $count (optional) maximal number
   */
  function progress( $i="", $count=null )
  {
    $messagefile = QCL_TMP_PATH . $this->getRequestId();
    $killfile    = $messagefile . ".kill";
    
    // abort process if kill file is found
    if ( file_exists ( $killfile ) )
    {
       @unlink( $messagefile );
       @unlink( $killfile );
       $this->raiseError( "Request Aborted" ); 
    }

    if ( ! touch( $messagefile ) ) 
    {
      $this->raiseError ( "bibliograph_controller::progress : Cannot write to $messagefile.");
    }

    if ( $i === null )
    {
      // delete messagefile on a null value to terminate progress.php
      @unlink( $messagefile );
      return;
    }
    
    if ( is_numeric($i) )
    {
      if ( is_numeric( $count) )
      {
        $i = ($i/$count) * 100;
      }
      $msg = "<script> progress($i);</script>";
    }
    else
    {
      $msg = "<script> message('" . addslashes($i)  . "');</script>";
      $msg .= $i . "<br/>";
      if ($i) $this->info($i);
    }
    
    // output to log file
    error_log( $msg, 3, $messagefile );
    return true;
  }  
	 
}	


?>