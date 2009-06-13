<?php
/*
 * dependencies
 */
require_once "qcl/core/object.php";
require_once "qcl/jsonrpc/Request.php";
require_once "qcl/jsonrpc/Response.php";

/*
 * constants
 */

/*
 * log filter name for request-related messages
 */
define("QCL_LOG_REQUEST", "request");

/**
 * global var for session ids independent of the PHP session
 */
define("QCL_SESSION_ID_VAR", "QCL_SESSION_ID");

/**
 * Common base class for controllers. Mainly contains convenience
 * methods that proxy methods originating in other objects.
 */
class qcl_mvc_Controller extends qcl_core_object
{

  /**
   * The server object
   */
  var $_server;

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
  function __construct( $server=null )
  {

    /*
     * call parent constructor first
     */
    parent::__construct();

    /*
     * set the server. This is a bit redundant, since we have
     * a global server singleton available. Might be removed
     * eventually.
     */
    if ( is_a( $server, "JsonRpcServer" ) )
    {

      $this->_server =& $server;

      /*
       * request object, fetches information from current
       * request
       */
      $request =& $this->requestObject();
      $request->setServer( &$server );

    }

    /*
     * configure service
     */
    $this->configureService();
  }

  /**
   * Returns the server object
   * @return qcl_server_Server
   */
  function &server()
  {
    return $this->server;
  }

  /**
   * Returns the server object
   * @return qcl_server_Server
   */
  function &getServer()
  {
    return $this->server;
  }

  /**
   * Returns the current request object
   * @return qcl_jsonrpc_Request
   */
  function &requestObject()
  {
    return qcl_jsonrpc_Request::getInstance();
  }

  /**
   * Returns the current response object
   * @return qcl_jsonrpc_Response
   */
  function &responseObject()
  {
    return qcl_jsonrpc_Response::getInstance();
  }

  /**
   * The object types that are used by this
   * controller
   * @var array
   */
  var $modelTypes = array( "user", "role", "permission", "config" );

  /**
   * Configures the service. Stub to be overridden
   **/
  function configureService(){}

  /**
   * Returns a configuration value of the pattern "foo.bar.baz"
   * This retrieves the values set in the service.ini.php file.
   * @todo move into component
   */
  function getIniValue($path)
  {
    return qcl_application_Application::getIniValue($path);
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
   * @return qcl_db_model_AbstractModel
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

    if ( ! is_a($obj,"qcl_db_model_AbstractModel" ) )
    {
      $this->raiseError(
        $this->className() .
        "::$getter() does not return a model object but a " .
        ( is_object($obj) ? get_class($obj) : gettype($obj) )
      );
    }

    return $obj;
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
    $response =& $this->responseObject();
    $response->set( $first, $second );
  }

  function setResult ( $data )
  {
    $response =& $this->responseObject();
    $response->setResult( $data );
  }

  /**
   * Returns value for particular response key
   * @param string $key
   * @todo rename to getResponseData
   */
  function &get ( $key )
  {
    $response =& $this->responseObject();
    return $response->get($key);
  }

  /**
   * Returns response object for return to the client.
   * Can be overridden by child classes
   * @return qcl_jsonrpc_Response
   */
  function &response()
  {
    return qcl_jsonrpc_Response::getInstance();
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
  function getEvents()
  {
    $reponse =& $this->responseObject();
    return $reponse->getEvents();
  }

  //-------------------------------------------------------------
  // service introspection
  //-------------------------------------------------------------

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