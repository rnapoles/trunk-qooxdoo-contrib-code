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

	/**
	 * initial configuration contained in ini.php-files in the #
	 * service class folders
	 * @see qcl_object::configureServie()
	 */	
	var $ini;

	/**
   * request information
   * @var array
   */
  var $request = array(
    'service'  => null,
    'method'   => null,
    'remoteId' => null
  );
	
	/**
	 * response data to be serialized and returned to server
	 * @access private
	 * @var array
	 */
	var $_response = array(
    'result'    => array(),
    'messages'  => array(),
    'events'    => array() 
  );
    
  /**
   * constructor , configures the service
   */
	function __construct()
  {

		/*
		 * call parent constructor first
		 */
    parent::__construct();

		/*
     * store request information
     */
    global $jsonInput;
		$this->request['service']  = $jsonInput ? $jsonInput->service : null;
    $this->request['method']   = $jsonInput ? $jsonInput->method  : null;
    $this->request['remoteIp'] = $_SERVER['REMOTE_ADDR']; 
    $this->request['params']   = $jsonInput ? $jsonInput->params  : null;
    
    /*
     * log request
     */
    $this->log ( 
      "Request for " . $this->request['service'] . 
      "." . $this->request['method'] .  
      " from " . $this->request['remoteIp']
    );

    /*
     * configure service
     */
		$this->configureService();
		
   
	}   	
	
	/**
	 * Returns the full path of the current service
	 * @return string
	 */
	function getServicePath()
	{
	  return $this->request['service'] . "." . $this->request['method'];
	}

  /**
   * Returns the parameters of the current service request
   * @return array
   */
  function getParams()
  {
    return $this->request['params'];
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
		
	  /*
	   * get the components of the service name either from the dispatcher script (global var)
	   * or from the class name
	   */
	  global $serviceComponents;
		if ( ! $serviceComponents )
		{
		  /*
		   * get class name without prefix
		   */
		  $classname = get_class($this);
		  if ( substr($classname,0,strlen(JsonRpcClassPrefix)) == JsonRpcClassPrefix )
      {
        $classname = substr($classname,strlen(JsonRpcClassPrefix));          
      }
      /*
       * get service components from classname
       */
		  $serviceComponents = explode( "_", $classname );
		}
		
		$currPath = defined( "servicePathPrefix" ) ? servicePathPrefix : "";
		$this->ini = array();
		$found = false;
    
		/*
		 *  traverse service path and look for service.ini.php files
		 */ 
		for ( $i=0; $i<count( $serviceComponents ); $i++ )
		{
			 $currPath .= $serviceComponents[$i] . "/";
			 
			 /*
			  * if config file exists, parse it and add/override config directives
			  */
			 if ( file_exists ( $currPath . "/" . QCL_SERVICE_CONFIG_FILE) )
			 {
			   $found = true;
         $config = parse_ini_file ( $currPath . "/" . QCL_SERVICE_CONFIG_FILE, true);
			 	 $this->ini = array_merge ( $this->ini, $config );
			 }
		}
    
    if ( ! $found )
    {
      $this->warn("No " . QCL_SERVICE_CONFIG_FILE . " file found for " . get_class($this) . " ." );
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
	 * Gets the url of the dispatcher script
	 */
  function getDispatcherUrl()
  {
    return "http://" . getenv (HTTP_HOST) . $_SERVER['PHP_SELF']; 
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
   * Initializes all the models needed for the controller.
   * @type abstract
   * @return void
   */
  function initializeModels()
  { 
    $this->raiseError("qcl_jsonrpc_controller::initializeModels() is abstract.");
  }
 
  /**
   * Gets the user data model 
   * @return qcl_access_user
   */
  function &getUserModel()
  {
    return $this->userModel;
  }  
  
  /**
   * Gets the permission data model 
   * @return qcl_access_permission
   */
  function &getPermissionModel()
  {
    return $this->permissionModel;
  }    

  /**
   * Gets the role data model 
   * @return qcl_access_role
   */
  function &getRoleModel()
  {
    return $this->roleModel;
  }
  
  /**
   * Gets the config data model 
   * @return qcl_config
   */
  function &getConfigModel()
  {
    return $this->configModel;
  }    	
	
	//-------------------------------------------------------------
  // translation (modeled after qooxdoo syntax)
  //-------------------------------------------------------------
  
  /**
   * gets the locale controller and sets the default locale. default is
   * a qcl_locale_manager (see there). if you want to use a different
   * controller, override this method
   * return qcl_locale_manager
   */
  function &getLocaleController()
  {
    static $localeController = null;
    if ( ! $localeController )
    {
      $localeController =& $this->getSingleton("qcl_locale_manager");
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
  // Extend message and event system to the client
  //-------------------------------------------------------------

  /**
   * dispatches a server message
   * @param string $message Message name 
   * @param mixed $data Data dispatched with message
   * @override
   */
  function dispatchMessage ( $message, $data=true )
  {
    /*
     * call parent method
     */
    parent::dispatchMessage( $message, $data );
    
    /*
     * add to resonse data
     */
    $this->addMessage( $message, $data );
  }
  
  
  /**
   * adds a message to the message stack
   * @param string $message Message name
   * @param mixed[optional] $data Message Data
   * @return void
   */
  function addMessage( $message, $data=null )
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
   * @override
   */
  function dispatchEvent ( $event, $data=true )
  {
    /*
     * call parent method
     */
    parent::dispatchEvent ( $event, $data );
    
    /*
     * add to response data
     */
    $this->addEvent( $event, $data );
  }  
  
	/**
	 * adds an event to the event stack
	 * @param mixed $event Message Event type
	 * @param mixed[optional] $data Data dispatched with event
	 */
	function addEvent ( $event, $data=null )
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
  
	/**
	 * log a message to a file on server and as a message to the client, 
	 * depending on the log level on the server and on the client
	 * @override
	 * @param string $msg
	 * @param int $logLevel  
	 * @return string message that was written to the logfile
	 */
	function log( $msg, $logLevel=QCL_LOG_DEBUG )
	{
		$message = parent::log($msg,$logLevel);
		$clientLogLevel = (int) $this->getSessionVar("qcl.logLevel.client");
		if ( $clientLogLevel and $clientLogLevel <= $logLevel)
		{
			$this->dispatchMessage("qcl.messages.log.server",$message);			
		}	
		return $message;
	}	  
	
	/**
	 * Debugs the complete jsonrpc request and response to the log file
	 */
  function debugJsonRpcRequest()
  {
    global $jsonInput;
    $resultData = $this->_response;
    
    $msg  = "Debugging JSON request\n";
    $msg .= "**********************************************************\n";
    $msg .= "Service: " . $jsonInput->service . "." . $jsonInput->method . "\n";
    $msg .= "Parameters: " . var_export($jsonInput->params, true) . "\n\n";
    $msg .= "Result Data: " . var_export($resultData, true) . "\n\n";
    $msg .= "**********************************************************\n";
  
    $this->info($msg);
  }
  
  /**
   * Debugs the compe jsonrpc request and response
   * as nicely formatted html to the client through the
   * "qcl.messages.htmlDebug" message
   */
  function debugJsonRpcRequestAsHtml()
  {
    
    global $jsonInput;
    $responseData = $this->_response;
    
    $config =& $this->getConfigModel();
       
       
    /*
     * assemble debug array
     */
    $debugValue = array(
      'Parameters'  => $jsonInput->params,
      'Result'      => $responseData['result'],
      'Events'      => $responseData['events'],
      'Messages'    => $responseData['messages']
    );
    
    
    /*
     * skip if getMessages request should be ignored
     */
    if ( $jsonInput->method == "getMessages" and $config->get("qcl.components.jsonrpc.MonitorWindow.skipGetMessagesRequest") )
    {
      return;
    }
    
    $divId = md5(microtime());
    
    /*
     * service and method
     */
    $html = "<div id='$divId' style='font-weight:bold'>" . 
            date('H:i:s') . ": " .
            $jsonInput->service . "." .
            $jsonInput->method . "(";
            
    /*
     * parameters
     */
    foreach ( $jsonInput->params as $i =>  $p )
    {
      if ( is_string($p) ) $html .= "'$p'";
      elseif ( is_null($p) ) $html .= "null";
      elseif ( is_bool($p) ) $html .= $p ? "true" : "false";
      else $html .= $p;
      if ( $i < count($jsonInput->params) -1 ) $html .= ",";
    }
    
    $html .= ")";
    
    /*
     * shorten debug output if no result data, message or event
     */
    if ( count($responseData['result']) == 0 and
         count($responseData['messages']) == 0 and
         count($responseData['events']) == 0 )
    {
      $html .= " [No content] </div>";            
    }        
    else
    {
      $html .= "</div>";
      $id    = md5(microtime());
      $html .= $this->_htmlizeValue($debugValue, $id);
      $html .= "<script>compactMenu('$id',true,'');</script>";
    }  
    
    /*
     * auto-scroll
     */
    if ( $config->get("qcl.components.jsonrpc.MonitorWindow.autoScroll") )
    {
      $html .= "<script>document.getElementById('$divId').scrollIntoView();</script>";
    }
    
    /*
     * dispatch message
     */
    $this->dispatchMessage("qcl.messages.htmlDebug",$html);
  }
  
  /**
   * Outputs a data structure as HTML for debug
   * @access private
   * @return string
   */
  function _htmlizeValue ( $value, $id='' )
  {
    $type = gettype($value);
    $html = "";
    switch ( $type )
    {  
      case "object":
      case "array": 
        $array = (array) $value;
        $count = count($array); 
        if ( $count > 0 )
        {
         $html .= "<ul class='maketree' id='$id'>"; 
          foreach($array as $key => $value )
          {
            
            if ( is_array($value) or is_object($value) )
            {
              $type  = gettype($value);
              $count = count( (array) $value );
              
              if ( $count ) 
              {
                $html .= "<li class='maketree'>$key ($type, $count elements)";
                $html .= " : " . $this->_htmlizeValue($value);
              }
              else
              {
                $html .= "<li class='maketree'>$key (empty $type)";
              }
              $html .= "</li>";   
            }
            else
            {
              $html .= "<li class='maketree'>$key  : ";
              $html .= $this->_htmlizeValue($value);
              $html .= "</li>";   
            }
          }
          $html .= "</ul>";
        }
        else
        {
          $html .= "<li class='maketree'>$key ($type) : [empty]</li>";
        }
        break;
        
      case "boolean":
        $html = "(boolean) " . ( $value ? "true" : "false" );
        break;
        
      default:
        $html = $value;
        break;
    }
    return $html;
  }
  
  /**
   * overridden info method -> forwards info message to client
   * @param string $msg
   */
  function info($msg)
  {
    parent::info($msg);
    $html = "<div style='color:green'>$msg</div>";
    $this->dispatchMessage("qcl.messages.htmlDebug",$html);
  }

  /**
   * overridden info method -> forwards info message to client
   * @param string $msg
   */
  function warn($msg)
  {
    parent::warn($msg);
    $html = "<div style='color:red'>WARN: $msg</div>";
    $this->dispatchMessage("qcl.messages.htmlDebug",$html);
  }  
  
}	
?>