<?php
/*
 * dependencies
 */
require_once "qcl/jsonrpc/object.php";
require_once "qcl/jsonrpc/Request.php";
require_once "qcl/jsonrpc/Response.php";

/*
 * constants
 */
define("QCL_SERVICE_CONFIG_FILE", "service.ini.php");

/**
 * Simple controller-model architecture for jsonrpc
 * Common base class for controllers
 */
class qcl_jsonrpc_controller extends qcl_jsonrpc_object
{

	/**
	 * initial configuration contained in ini.php-files in the #
	 * service class folders
	 * @see qcl_core_object::configureServie()
	 */	
	var $ini;

	/**
   * The request object 
   * @var qcl_jsonrpc_Request
   */
  var $request;
  
  
  /**
   * The response object
   * @var qcl_jsonrpc_Response
   */
  var $response;
    
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
     * request object, fetches information from current
     * request
     */
    $this->request = new qcl_jsonrpc_Request;
    
    /*
     * response object
     */
    $this->response = new qcl_jsonrpc_Response;
    
    /*
     * log request
     */
    $this->log ( 
      "Request for " . $this->request->service . 
      "." . $this->request->method .  
      " from " . $this->request->ip
    );

    /*
     * configure service
     */
		$this->configureService();
	}  

	/**
	 * Returns the current request object
	 * @return qcl_jsonrpc_Request
	 */
	function &requestObject()
	{
	  return $this->request;
	}
	
  /**
   * Returns the current response object
   * @return qcl_jsonrpc_Response
   */
  function &responseObject()
  {
    return $this->response;
  }	
	
	/**
	 * Gets the raw json input object
	 * @return JsonInput
	 */
  function &getJsonInput()
  {
    return $this->request->getJsonInput();
  }
	
	/**
	 * Returns the full path of the current service
	 * @return string
	 */
	function getServicePath()
	{
	  return $this->request->getService() . "." . $this->request->getMethod();
	}

  /**
   * Returns the parameters of the current service request
   * @return array
   */
  function getParams()
  {
    return $this->request->getParams();
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
   * @return qcl_locale_manager
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
   * @param   Mixed   $varargs  (optional) Variable number of arguments for the sprintf formatting either as an array
   * or as parameters
   */
  function tr( $msgId, $varargs=null )
  {
    if ( ! is_array($varargs) )
    {
      $varargs = func_get_args();
      array_shift($varargs);
    }
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
   * @todo: use into qcl_jsonrpc_Response object 
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
			$this->response->set($first,$value);
		}
	}
	
	/**
	 * gets value for particular result key
	 */
	function &get ( $key )
	{
		$response =& $this->getResponseObj();
	  return $this->response->get($key);
	}
	
	/**
	 * Returns response object for return to the client. 
	 * Can be overridden by child classes
	 * @return qcl_jsonrpc_Response
	 */
	function &response()
	{
		return $this->response;
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
   * Adds a message to the message stack
   * @param string $message Message name
   * @param mixed[optional] $data Message Data
   * @return void
   */
  function addMessage( $message, $data=null )
  {
    $response =& $this->responseObject();
    $response->addMessage( $message, $data );
  }

  /**
   * Returns messages on message stack
   * @return array
   */
  function &getMessages()
  {
    $response =& $this->responseObject();
    return $response->getMessages();
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
	 * Adds an event to the event stack
	 * @param mixed $event Message Event type
	 * @param mixed[optional] $data Data dispatched with event
	 */
	function addEvent ( $event, $data=null )
	{
    $reponse =& $this->responseObject();
    $reponse->addEvent( $event, $data );
	}

  /**
   * Returns messages on message stack
   * @return array
   */
  function &getEvents()
  {
    $reponse =& $this->responseObject();
    return $this->getEvents();
  }

	//-------------------------------------------------------------
  // request id & process management
  //-------------------------------------------------------------

  /**
   * Returns the unique id of the current request, if any
   * @return string
   */
  function getRequestId()
  {
    return $this->request->getRequestId();
  }

  /**
   * Rets the unique id of the current request
   * @return 
   * @param $requestId Object
   */
  function setRequestId( $requestId )
  {
    $this->request->setRequestId($requestId);
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
    $request   =& $this->requestObject();
    $response  =& $this->responseObject();
    
    $msg  = "Debugging JSON request\n";
    $msg .= "**********************************************************\n";
    $msg .= "Service: " . $request->getService() . "." . $jsonInput->getMethod() . "\n";
    $msg .= "Parameters: " . var_export($request->getParams(), true) . "\n\n";
    $msg .= "Result Data: " . var_export($response->getData(), true) . "\n\n";
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
    
    $request   =& $this->requestObject();
    $response  =& $this->responseObject();
    $config    =& $this->getConfigModel();
       
       
    /*
     * assemble debug array
     */
    $debugValue = array(
      'Parameters'  => $request->getParams(),
      'Result'      => $response->getData(),
      'Events'      => $response->getEvents(),
      'Messages'    => $response->getMessages()
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
            $request->getService() . "." .
            $request->getMethod(). "(";
            
    /*
     * parameters
     */
    foreach ( $jsonInput->params as $i =>  $p )
    {
      if ( is_string($p) ) $html .= "'$p'";
      elseif ( is_null($p) ) $html .= "null";
      elseif ( is_bool($p) ) $html .= $p ? "true" : "false";
      else $html .= $p;
      if ( $i < count($request->getParams()) -1 ) $html .= ",";
    }
    
    $html .= ")";
    
    /*
     * shorten debug output if no result data, message or event
     */
    $data     = $response->getData();
    $messages = $response->getMessages();
    $events   = $response->getEvents();
    
    if ( count($data) == 0 and
         count($messages) == 0 and
         count($events) == 0 )
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
  
  /**
   * Checks whether a method name is a service method
   * @param string $method
   * @return bool 
   */
  function isServiceMethod ( $method )
  {
    return (substr($method,0, strlen(JsonRpcMethodPrefix)) == JsonRpcMethodPrefix);
  }
  
  /**
   * Returns a list of all service methods that this class provides
   * @todo Save result so that access can be regulated by source code introspection
   * @return qcl_jsonrpc_Response
   */
  function method_services()
  {
    /*
     * get list of method names
     */
    $serviceMethods = new ArrayList;
    foreach ( $this->methods() as $method )
    {
      if ( $this->isServiceMethod( $method ) )
      {
        
        $serviceMethods->add($method);
      }
    }
    
    /*
     * parse source code - we have no idea where the functions are
     */
    $this->info("Parsing included files for method information...");
    $methodInfo = array();
    $counters   = array();
    foreach ( get_included_files() as $file )
    {
      $code = file_get_contents($file);
      foreach( $serviceMethods->toArray() as $method )
      {
        $signature = "function $method";
        $pos = strpos( strtolower($code), $signature ) ;
        if ( $pos !== false )
        {
          
          /*
           * get method name from code
           */
          $methodName = substr($code,$pos + 16, strlen( $method ) -7 );
          
          /*
           * read file into array
           */
          $lines = file($file);
          
          /*
           * forward to line with signature
           */
          for( $i=0; $i<count($lines); $i++ )
          {
            if ( strstr($lines[$i], $methodName ) ) break;  
          }
          $endDocLine = $i-1;
          
          /*
           * go back to the beginning of the documentation
           */
          for( $j = $endDocLine; $j > 0; $j--)
          {
            $line = trim($lines[$j]);
            if ( substr( $line, 0, 3 ) == "/**" ) break;
          }
          $startDocLine = $j+1;

          /*
           * now add documentation until doctags are encountered
           */
          for ( $i= $startDocLine; $i < $endDocLine; $i++)
          {
            $line = trim($lines[$i]);
            if ( substr($line,0,3 ) ==  "* @" ) break;
            $methodInfo[$methodName]['doc'] .= trim( str_replace("* ", " ", $line ) );     
          }
          
          /*
           * now parse doctags
           */
          for ( $j = $i; $j < $endDocLine; $j++ )
          {
            $line = trim($lines[$j]);
            if ( substr($line,0, 3) == "* @" ) 
            {
              $line  = trim( substr($line, 3 ) );
              $tag   = trim( substr( $line, 0, strpos( $line, " " ) ) );
              $value = trim( substr( $line, strlen($tag) ) ); 
              $counters[$method][$tag]++;
            }
            else
            {
              $value = substr($line,3);
            }
            if ( in_array($tag, array("param","todo","see") ) )
            {
              $methodInfo[$methodName][$tag][$counters[$method][$tag]-1] .= $value;
            }   
            else
            {
              $methodInfo[$methodName][$tag] .= $value;
            }
          }
        }
      }
    }
    //$this->info($methodInfo);
    $this->set("services",$methodInfo);
    return $this->response();
  }
  
}	
?>