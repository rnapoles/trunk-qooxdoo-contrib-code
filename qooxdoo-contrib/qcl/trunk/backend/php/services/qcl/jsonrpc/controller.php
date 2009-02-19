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

/**
 * name for file that contains configuration data
 */
define("QCL_SERVICE_CONFIG_FILE", "service.ini.php");

/*
 * log filter name for request-related messages
 */
define("QCL_LOG_REQUEST", "request");

/**
 * global var for session ids independent of the PHP session
 */
define("QCL_SESSION_ID_VAR", "QCL_SESSION_ID");

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
   * The id of the session, default to PHP session id
   * @var string
   * @access private
   */
  var $_sessionId;
  
  /**
   * Whether the request has been aborted
   */
  var $_isAborted = false;
  
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
     *
    $this->debug( "\n\n" .
      "Request for " . $this->request->service . 
      "." . $this->request->method .  
      " from " . $this->request->ip,
      QCL_LOG_REQUEST
    );
    */ 
    
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
  
  
  /**
   * Returns the serverData part of the jsonrpc request
   * @param string[optional] $key If provided, get only a key, otherwise return the map
   * @return mixed Either the value of the given key, or the whole map
   */
  function getServerData( $key=null )
  {
    $serverData = $this->request->getServerData();
    if ( is_null($key) )
    {
      return $serverData;
    }
    elseif ( is_object( $serverData ) )
    {
      return $serverData->$key;
    }
    return null;
  }
   
  
  /**
   * Returns the current session id. Defaults to PHP session id.
   * Override in parent classes for more sophisticated session handling
   * @return string session id
   */
  function getSessionId()
  {
    if ( ! $this->_sessionId )
    {
      $this->_sessionId = session_id();
    }
    return $this->_sessionId;
  }  
  
  /**
   * Sets the session id
   * @param string $sessionId
   * @return void
   */
  function setSessionId( $sessionId )
  {
    $this->_sessionId = $sessionId;
    $GLOBALS[QCL_SESSION_ID_VAR] = $sessionId;
  }
  
    
  /**
   * Creates a new session id and passes it to the client
   * @return string The session id
   */
  function createSessionId( )
  {
    /*
     * create random session id
     */
    $sessionId = md5(microtime());
    $this->_sessionId = $sessionId;
    
    /*
     * notify client of session id
     */
   //$this->debug("Creating new session id and passing it to client: $sessionId");
    $this->dispatchMessage("qcl.commands.setSessionId", $sessionId );
    
    return $sessionId;
  }  
  
  /**
   * The object types that are used by this
   * controller
   * @var array
   */
  var $modelTypes = array( "user", "role", "permission", "config" );  
  
  /**
   * reads initial configuration. looks for service.ini.php files, starting at 
   * the top-level service directory. lower-level service.ini.php files can override 
   * config directives selectively, inheriting the rest of the settings from the upper
   * level config files.
   * @todo move this into a component
   **/
  function configureService()
  {
    
    /*
     * get the components of the service name either from the dispatcher script (global var)
     * or from the class name
     * @todo remove global reference
     */
    global $serviceComponents;
    if ( ! $serviceComponents )
    {
      /*
       * get class name without prefix
       */
      $classname = get_class($this);
      if ( substr($classname, 0, strlen(JsonRpcClassPrefix)) == JsonRpcClassPrefix )
      {
        $classname = substr($classname, strlen(JsonRpcClassPrefix) );          
      }
      
      /*
       * get service components from classname
       */
      $serviceComponents = explode( "_", $classname );
    }
    
    $currPath = defined( "servicePathPrefix" ) ? servicePathPrefix : "";
    
    /*
     * configure ini data
     * @todo move into model!
     */
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
         $config = parse_ini_file ( $currPath . "/" . QCL_SERVICE_CONFIG_FILE, true );
          $this->ini = array_merge ( $this->ini, $config );
       }
    }
    
    if ( ! $found )
    {
      $this->warn("No " . QCL_SERVICE_CONFIG_FILE . " file found for " . get_class($this) . " ." );
    }
    
    //$this->debug($this->ini);
  }

  /**
   * Return service directory url
   * @return string
   */
  function getServiceDirUrl($append="")
  {
    global $serviceComponents;
    
    $serverDirUrl = "http://" . getenv (HTTP_HOST) . dirname ( $_SERVER['PHP_SELF'] ) . "/";
    
    return $serverDirUrl . $serviceComponents[0] . "/" . $append;
  }
  
  /**
   * Returns the url of the dispatcher script
   * @return string
   */
  function getDispatcherUrl()
  {
    return "http://" . getenv ( HTTP_HOST ) . dirname( $_SERVER['PHP_SELF'] ) . "/index.php"; 
  }
  
  /**
   * Returns a configuration value of the pattern "foo.bar.baz"
   * This retrieves the values set in the service.ini.php file.
   * @todo move into component
   */
  function getIniValue($path)
  {
    /*
     * if called recursively
     */
    if ( is_array($path) )
    {
      $path= $path[1];
    }
    
    $parts   = explode(".",$path);
    $value   = $this->ini;
  
    /*
     * traverse array
     */
    while( is_array($value) and $part = array_shift($parts) )
    {
      $value = $value[$part];
    }
    
    /*
     * expand strings
     */
    if ( is_string( $value ) )
    {
      $value = trim( preg_replace_callback('/\$\{([^}]+)\}/',array(&$this,"getIniValue"),$value ) );  
    }
    
    //$this->debug("Ini value '$path'= '$value'");
    
    return $value;
  }
  
  function abortRequest()
  {
    $this->_isAborted = true;  
  }
  
  function isAborted()
  {
    return $this->_isAborted;
  }
  
  //-------------------------------------------------------------
  // models
  //-------------------------------------------------------------

  /**
   * Generic getter for models. Methods exist that follow the 
   * pattern getFooModel()
   * @param string $type
   * @return qcl_db_PropertyModel
   */
  function &getModel($type)
  {
    /*
     * check type
     */
    if ( ! in_array( $type, $this->modelTypes ) )
    {
      $this->raiseError("'$type' is not a valid model type.");
    }
    
    /*
     * getter method
     */
    $getter = "get" . strtoupper($type[0]) . substr( $type, 1 ) . "Model";
    if ( ! $this->hasMethod( $getter ) )
    {
      $this->raiseError("Class has no model getter '$getter'.");
    }
    
    /*
     * get, check and return object
     */
    $obj =& $this->$getter();
    
    if ( ! is_a($obj,"qcl_db_PropertyModel" ) )
    {
      $this->raiseError( 
        $this->className() . 
        "::$getter() does not return a model object but a " .
        ( is_object($obj) ? get_class($obj) : gettype($obj) ) 
      );
    }
    
    return $obj;
  }
  
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
   * Set a part or the full response
   * @see qcl_jsonrpc_response::set()
   * @todo rename to setResponseData()
   * 
   */
  function set ( $first, $second=QCL_ARGUMENT_NOT_SET )
  {
    $this->response->set( $first, $second );
  }
  
  /**
   * Returns value for particular response key
   * @param string $key
   * @todo rename to getResponseData
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
   * Hook to return optional error response data. Returns event and message
   * data
   * @override
   * @return array
   */
  function optionalErrorResponseData()
  {
    $response =& $this->responseObject();
    return array(
      'result' => array(
        'messages' => $response->getMessages(),
        'events'   => $response->getEvents()
      )
    );
  }  
  
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
    if ( ! is_object($response) )
    {
      $this->raiseError(gettype($response));
    }
    
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
  function log( $msg, $logLevel="debug" )
  {
    $message = parent::log( $msg, $logLevel );
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
      'ServerData'  => $request->getServerData(),
      'Result'      => $response->getData(),
      'Events'      => $response->getEvents(),
      'Messages'    => $response->getMessages()
    );
    
    
    /*
     * skip if getMessages request should be ignored
     */
    if ( $request->getMethod() == "getMessages" and 
         $config->get("qcl.components.jsonrpc.MonitorWindow.skipGetMessagesRequest") )
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
    foreach ( $request->getParams() as $i =>  $p )
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
   * Overridden info method -> forwards info message to client
   * @param string $msg
   */
  function info($msg)
  {
    parent::info($msg);
    $html = "<div style='color:green'>$msg</div>";
    $this->dispatchMessage("qcl.messages.htmlDebug",$html);
  }
  

  /**
   * Overridden info method -> forwards info message to client
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