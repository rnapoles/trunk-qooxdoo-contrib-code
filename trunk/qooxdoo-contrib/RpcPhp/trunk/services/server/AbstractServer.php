<?php

/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2006-2009 Derrell Lipman, Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Derrell Lipman (derrell)
 *  * Christian Boulanger (cboulanger) Error-Handling and OO-style rewrite
 */


/*
 * Include json class, either a wrapper around a php extension/php-only implementation
 * (php4) or built-in functions (php4 with json-extension/php5). If you want to use
 * a custom json encoder/decoder, write a custom JsonWrapper class and include it
 * before you include this script.
 */
if ( ! class_exists("JsonWrapper") )
{
  require_once dirname(__FILE__) . "/lib/JsonWrapper.php";
}

/*
 * There may be cases where all services need use of some libraries or
 * system-wide definitions.  Those may be provided by a file named
 * "global_settings.php" in the same directory as the file that includes
 * this file (i.e. the file instantiating the server).
 *
 * The global settings file may provide values for the following manifest
 * constants whose default values are otherwise provided below:
 *
 *   servicePathPrefix
 *   defaultAccessibility
 *
 */
if ( file_exists("global_settings.php") )
{
  require_once "global_settings.php";
}

/**
 * The default accessibility behavior, which
 * serves as a base class for all more specialized
 * behaviors. Use setAccessibilityBehavior() to set
 * your custom accessibility behavior, which must subclass
 * AccessibilityBehavior
 */
require_once dirname(__FILE__) . "/access/AccessibilityBehavior.php";

/**
 * The location of the service class directories.
 * (trailing slash required). Defaults to "class"
 */
if ( ! defined("servicePathPrefix") )
{
  define( "servicePathPrefix", "class/" );
}

/**
 * How to pass the RPC parameters to the service method. Can have
 * three values:
 *
 * 1) 'array': The signature used in RpcPhp 1.0, passing all
 * parameters as an array in the first method argument, and the error
 * object as the second argument.This is the default mode (if the
 * constant is not defined by the user) and the only one that works
 * in PHP4.
 *
 * 2) 'args': Pass the parameters as a normal method call, so that
 * the method definition can use them as named arguments. This also
 * improves the ability to document the source code of the service methods.
 * This will be the standard mode in a future version of the server.
 * The error object does not need to be passed to the service method any
 * longer.
 *
 * 3) 'check': Via method introspection, this checks whether the first
 * argument of the method is called "params". If yes, use the 'array' mode.
 * If not, use the 'args' mode.
 *
 */
if ( ! defined("RpcMethodSignatureMode") )
{
  if ( phpversion() >= 5 )
  {
    define( "RpcMethodSignatureMode", "check" );
  }
  else
  {
    define( "RpcMethodSignatureMode", "array" );
  }
}

/**
 * Prefixes for RPC classes and methods
 *
 * Since you do not want to expose all classes or all methods that are
 * present in the files accessible to the server, a prefix is needed
 * for classes and methods. By default, this is "class_" for classes
 * and "method_" for methods. You might want to keep those prefixes if
 * you want to share backend class code with others (otherwise, a simple
 * search & replace takes care of quickly, too) - otherwise define the
 * following constants in global_settings.php
 */
if (! defined("JsonRpcClassPrefix"))
{
  define("JsonRpcClassPrefix", "class_");
}

if (! defined("JsonRpcMethodPrefix"))
{
  define("JsonRpcMethodPrefix", "method_");
}

/**
 * Whether the server should issue debug messages. Override the
 * debug() method or change the following constants for custom behavior
 */
if (! defined("JsonRpcDebug"))
{
  define("JsonRpcDebug", false );
}

if (! defined("JsonRpcDebugFile"))
{
  define("JsonRpcDebugFile", "/tmp/phpinfo");
}

/**
 * Whether the server should include a package index file before instantiating
 * a service class file. By default, if a file named "__index__.php" (similar to
 * python) exists in the same directory as the service class script file, it is
 * included before the service class file is included. This is useful, for example,
 * to sort out complex include dependencies before a class is instantiated.
 * If you don't want this behavior, set the JsonRpcPackageIndexFile constant
 * to null in your global_settings.php file.
 */
if (! defined("JsonRpcPackageIndexFile") )
{
  define("JsonRpcPackageIndexFile", "__index__.php" );
}

/**
 * Abstract server class, needs to be subclassed in
 * order to be used.
 * @author Derrell Lipman
 * @author Christian Boulanger
 */
class AbstractServer
{

  /**
   * Whether the server should issue debug messages
   */
  var $debug = JsonRpcDebug;

  /**
   * The file for debug messages
   * @var string
   */
  var $debugfile = JsonRpcDebugFile;

  /**
   * PHP4/PHP5-compatible wrapper object
   * @var JsonWrapper
   */
  var $json;

  /**
   * Error behavior object
   * @var AbstractError
   */
  var $errorBehavior;

  /**
   * An array of paths to the services. This will be populated
   * by the servicePathPrefix constant in the constructor, but
   * you can also manually populate it.
   * @var array
   */
  var $servicePaths;

  /**
   * The accessibility behavior object
   * @var AccessibilityBehavior
   */
  var $accessibilityBehavior;

  /**
   * The request of the id.
   * @var int
   */
  var $id;

  /**
   * The input data from the request
   * @var object
   */
  var $input;

  /**
   * The full service path
   * @var string
   */
  var $service;

  /**
   * the components of the service
   * @var array
   */
  var $serviceComponents;

  /**
   * The current service name
   * @var string
   */
  var $serviceName;

  /**
   * The current service class
   * @var string
   */
  var $serviceClass;

  /**
   * The current service object
   * @var object
   */
  var $serviceObject;

  /**
   * The current service method
   * @var string
   */
  var $method;

  /**
   * The parameters of the request
   * @var array
   */
  var $params;

  /**
   * The server data sent with the request
   * @var object
   */
  var $serverData;

  /**
   * The php session id
   */
  var $sessionId;

  /**
   * PHP4 constructor
   */
  function AbstractServer()
  {
    $this->__construct();
  }

  /**
   * PHP5 constructor
   */
  function __construct()
  {
    if ( get_class( $this ) == __CLASS__ )
    {
      trigger_error("You must subclass AbstractServer in order to use it.");
    }

    /*
     * Use servicePathPrefix constant for backwards compatibility
     */
    $this->servicePaths = array (
      dirname(__FILE__) . "/services",
      servicePathPrefix
    );

    /**
     * Hook for subclasses to do initialization stuff.
     */
    $this->initializeServer();
  }

  /**
   * Initialize the server. This serves as a hook for subclassing
   * servers.
   * @return void
   */
  function initializeServer()
  {
    trigger_error("Not implemented");
  }

  /**
   * Setter for request id
   * @param int $id
   * @return void
   */
  function setId( $id )
  {
    $this->id = $id;
  }

  /**
   * Getter for request id
   * @return int
   */
  function getId()
  {
    return $this->id;
  }

  /**
   * Setter for service name
   * @param string $service
   * @return void
   */
  function setService( $service )
  {
    $this->service = $service;
  }

  /**
   * Getter for service name
   * @return string
   */
  function getService()
  {
    return $this->service;
  }

  /**
   * Setter for service method
   * @param string $method
   * @return void
   */
  function setMethod( $method )
  {
    $this->method = $method;
  }

  /**
   * Getter for method name
   * @return string
   */
  function getMethod()
  {
    return $this->method;
  }

  /**
   * Setter for service parameters
   * @param array $params
   * @return void
   */
  function setParams( $params )
  {
    $this->params = $params;
  }

  /**
   * Getter for service parameters
   * @return string
   */
  function getParams()
  {
    return $this->params;
  }


  /**
   * Setter for server data
   * @param array $serverData
   * @return void
   */
  function setServerData( $serverData )
  {
    $this->serverData = $serverData;
  }

  /**
   * Returns the client-sent server data.
   * @param string[optional] $key If provided, get only a key, otherwise return the map
   * @return mixed Either the value of the given key, or the whole map
   */
  function getServerData( $key=null )
  {
    if ( is_null($key) )
    {
      return $this->serverData;
    }
    elseif ( is_object( $this->serverData ) )
    {
      return $this->serverData->$key;
    }
    trigger_error("Invalid parameter.");
  }

  /**
   * Setter for service paths
   * @param array|string $servicePaths
   */
  function setServicePaths( $servicePaths )
  {
    $sp = array();
    foreach ( (array) $servicePaths as $path )
    {
      if ( ! is_dir( $path ) )
      {
        trigger_error( "'$path' is not a directory." );
      }
      $sp[] = $path;
    }
    $this->servicePaths = $sp;
  }

  /**
   * Getter for service paths
   */
  function getServicePaths()
  {
    return $this->servicePaths;
  }

  /**
   * Setter for accessibility behavior object
   * @param AccessibilityBehavior $object
   * @return void
   */
  function setAccessibilityBehavior( $object )
  {
    if ( ! is_a( $object, "AccessibilityBehavior") )
    {
      trigger_error("Accessibility behavior object must subclass AccessibilityBehavior");
    }
    $this->accessibilityBehavior =& $object;
  }

  /**
   * Getter for accessibility behavior object
   * @return AccessibilityBehavior
   */
  function &getAccessibilityBehavior()
  {
    return $this->accessibilityBehavior;
  }


  /**
   * Setter for error behavior object
   * @param AbstractErrorBehavior $object
   * @return void
   */
  function setErrorBehavior( $object )
  {
    if ( ! is_a( $object, "AbstractError") )
    {
      trigger_error("The error behavior object must subclass AbstractErrorBehvior");
    }
    $this->errorBehavior =& $object;
  }

  /**
   * Getter for error behavior object
   * @return AbstractError
   */
  function &getErrorBehavior()
  {
    return $this->errorBehavior;
  }

  /**
   * Start the server
   */
  function start()
  {

    /**
     * error behavior
     */
    $errorBehavior =& $this->getErrorBehavior();
    if ( ! $errorBehavior )
    {
      trigger_error("No error behavior!");
    }

    /**
     * accessibility behavior
     */
    $accessibilityBehavior =& $this->getAccessibilityBehavior();
    if ( ! $accessibilityBehavior )
    {
      trigger_error("No accessibility behavior!");
    }

    /*
     * Check request and content type and get the
     * input data. If no data, abort with error.
     */
    $input = $this->getInput();
    if ( ! $input )
    {
      $this->sendErrorAndExit();
    }
    $this->input = $input;

    /*
     * request data
     */
    $service    = $input->service;
    $method     = $input->method;
    $params     = $input->params;
    $id         = $input->id;
    $serverData = (array) $input->server_data;

    /*
     * configure this service request properties
     */
    $this->setId( $id );
    $this->setService( $service );
    $this->setMethod( $method );
    $this->setParams( $params );
    $this->setServerData( $serverData );

    /*
     * Ok, it looks like a valid request, so we'll return an
     * error object if we encounter errors from here on out.
     */
    $errorBehavior->SetId( $this->id);

    $this->debug("Service request: $service.$method");
    $this->debug("Parameters: " . var_export($params,true) );
    $this->debug("Server Data: " . var_export($serverData,true) );

    /*
     * service components
     */
    $this->serviceComponents = $this->getServiceComponents( $service );

    /*
     * check service request
     */
    $this->debug("Checking service $service ..." );
    $validService = $this->checkService( $service );
    if ( ! $validService )
    {
      $this->sendErrorAndExit();
    }

    /*
     * load service class file
     */
    $this->debug("Loading service $service ..." );
    $classFile = $this->loadServiceClass( $service );
    if ( ! $classFile )
    {
      $this->sendErrorAndExit();
    }
    $this->debug("Loaded file '$classFile'");

    /*
     * check if class is defined in this file
     */
    $this->serviceClass = $this->getServiceClass( $service );
    if ( ! $this->serviceClass )
    {
      $this->sendErrorAndExit();
    }

    /*
     * now, start php session
     */
    $this->startSession();

    /*
     * instantiate service
     */
    $this->debug("Instantiating service class '{$this->serviceClass}'.");
    $serviceObject =& $this->getServiceObject( $this->serviceClass );
    $this->serviceObject =& $serviceObject;

    /*
     * check accessibility and abort if access is denied
     */
    $this->checkAccessibility( $serviceObject, $method );

    /*
     * Now that we've instantiated thes service, we should find the
     * requested method by prefixing the method prefix
     */
    $method = JsonRpcMethodPrefix . $method;
    $this->debug("Checking service method '$method'.");
    $validMethod = $this->checkServiceMethod( &$serviceObject, $method );
    if ( ! $validMethod )
    {
      $this->sendErrorAndExit();
    }

    /*
     * Errors from here on out will be Application-generated
     */
    $this->setErrorOrigin( JsonRpcError_Origin_Application );

    /*
     * start the service method and get its output
     */
    $this->debug("Starting Service method {$this->serviceClass}.$method");
    $this->output = $this->callServiceMethod( &$serviceObject, $method, $params );
    $this->debug("Done. " );
    //$this->debug("Result:" . var_export($this->output,true) );

    /*
     * See if the result of the function was actually an error
     */
    if ( is_a( $this->output, "JsonRpcError" ) )
    {
      /*
       * Yup, it was.  Return the error
       */
      $this->output->SendAndExit();
      /* never gets here */
    }

    /*
     * Give 'em what they came for!
     */
    $response = $this->formatOutput( $this->output );
    //$this->debug( "Formatted response: " . $response );

    /*
     * send reply
     */
    $this->debug("Sending response to client ...");
    $this->sendReply( $response, $this->scriptTransportId );
  }

  /**
   * Explode the service name into its dot-separated parts
   * @param string $service
   */
  function getServiceComponents( $service )
  {
    return explode( ".", $service );
  }

  /**
   * Ensure the requested service name is kosher.  A service name should be:
   *
   *   - a dot-separated sequences of strings; no adjacent dots
   *   - first character of each string is in [a-zA-Z]
   *   - other characters are in [_a-zA-Z0-9]
   * @param string $service
   * @return bool True if legal, false if illegal service name
   */
  function checkService( $service )
  {
    /*
     * First check for legal characters
     */
    if (preg_match("#^[_.a-zA-Z0-9]+$#", $service) === false)
    {
      /*
       * There's some illegal character in the service name
       */
      $this->setError(
      JsonRpcError_IllegalService,
          "Illegal character found in service name."
          );
          return false;
    }

    /* Now ensure there are no double dots */
    if (strstr($service, "..") !== false)
    {
      $this->setError(
      JsonRpcError_IllegalService,
          "Illegal use of two consecutive dots in service name"
          );
          return false;
    }

    /*
     * Ensure that each component begins with a letter
     */
    $serviceComponents = $this->getServiceComponents( $service );
    for ($i = 0; $i < count($serviceComponents); $i++)
    {
      if (preg_match("#^[a-zA-Z]#", $serviceComponents[$i]) === false)
      {
        $error->SetError(
        JsonRpcError_IllegalService,
              "A service name component does not begin with a letter"
              );
              return false;
      }
    }

    /*
     * service name is legal
     */
    return true;
  }

  /*
   * Loads the file containing the service class definition
   * @param string $service
   * @return string|false The name of the file if it was found, false if not.
   */
  function loadServiceClass( $service )
  {
    /*
     * check service paths
     */
    if ( ! is_array( $this->servicePaths ) )
    {
      trigger_error("servicePaths property must be set with an array of paths");
    }

    /*
     * Replace all dots with slashes in the service name so we can
     * locate the service script.
     */
    $serviceComponents = $this->getServiceComponents( $service );
    $path = implode( "/", $serviceComponents );
    $packagePath = implode( "/", array_slice( $serviceComponents, 0, -1 ) );

    /*
     * Try to load the requested service
     */
    foreach( $this->servicePaths as $prefix )
    {
      $classFile = "$prefix/$path.php";
      if ( file_exists( $classFile ) )
      {

        /*
         * if package index file exists, which loads package
         * dependencies (usually '__index__.php'), load this first
         */
        if ( JsonRpcPackageIndexFile )
        {
          $packageIndexFile = "$prefix/$packagePath/" . JsonRpcPackageIndexFile;
          if ( file_exists( $packageIndexFile ) )
          {
            $this->debug("Loading package index file '$packageIndexFile'...");
            require_once $packageIndexFile;
          }
        }

        $this->debug("Loading class file '$classFile'...");
        require_once $classFile;
        return $classFile;
      }
    }

    /*
     * Couldn't find the requested service
     */

    $serviceName = implode( ".", $serviceComponents );
    $this->SetError(
      JsonRpcError_ServiceNotFound,
      "Service `$serviceName` not found."
    );
    return false;
  }

  /**
   * Returns the name of the service class as requested by the client
   * @param string $service
   * @return string
   */
  function getServiceName( $service )
  {
    $serviceComponents = $this->getServiceComponents( $service );
    return $serviceComponents[count($serviceComponents) - 1];
  }

  /**
   * Returns the real service class name. There are a couple of variants
   * possible
   * @param string $service
   * @param array $classes When overriding this method, an array of
   * possible class name variations can be passed to this as a
   * parent method.
   * @return string|false The name of the class it exists, otherwise false
   * @author Derrell Lipman
   * @author Christian Boulanger
   */
  function getServiceClass( $service, $classes = array() )
  {

    /*
     * Try the last component of the service
     */
    $serviceName = $this->getServiceName( $service );
    $classes[] = JsonRpcClassPrefix . $serviceName;

    /*
     * or the fully qualified service name, if the class name
     * mirrors the directory structure, i.e. foo_bar_Baz if the
     * service name is foo.bar.Baz
     */
    $classes[] = JsonRpcClassPrefix . implode( "_", $this->getServiceComponents( $service ) );

    /*
     * Ensure that the class exists.  First try the short class name.
     */
    foreach ( $classes as $className )
    {
      /*
       * return true if class exists
       */
      if ( class_exists($className) ) return $className;
    }

    /*
     * class name was not found
     */
    $this->SetError(
      JsonRpcError_ClassNotFound,
      "Service class `" .
      $serviceName .
      "` not found."
    );
    return false;
  }

  /**
   * Starts or joins an existing php session. You can override
   * the cookie-based PHP session id by providing a 'sessionId'
   * key in the server_data.
   */
  function startSession()
  {
    $serverData = $this->getServerData();
    if ( isset( $serverData->sessionId ) and $serverData->sessionId )
    {
      $this->debug( "Starting session '{$serverData->sessionId}' from server_data.");
      session_id( $serverData->sessionId );
    }
    else
    {
      $this->debug( "Starting normal PHP session " . session_id() . ".");
    }
    session_start();
    $this->sessionId = session_id();
  }

  /**
   * Returns the actual service object, based on the class name.
   * Instantiates the object and returns it.
   * Override this if you want to pass additional data to the
   * service class' constructor.
   * @param string $className
   * @return Object
   */
  function &getServiceObject( $className )
  {
    $serviceObject = new $className();
    return $serviceObject;
  }

  /**
   * Check the accessibility of service object and service
   * method. Aborts request when Access is denied.
   * @param $serviceObject
   * @param $method
   * @return void
   */
  function checkAccessibility( $serviceObject, $method )
  {
    if ( $this->accessibilityBehavior )
    {
      $this->debug("Checking accessibility...");
      if ( ! $this->accessibilityBehavior->checkAccessibility( &$serviceObject, $method ) )
      {
        $this->setError(
          $this->accessibilityBehavior->getErrorNumber(),
          $this->accessibilityBehavior->getErrorMessage()
        );
        $this->sendErrorAndExit();
      }
    }
  }

  /**
   * Checks whether we have a valid service method
   * @param $serviceObject
   * @param $method
   * @return unknown_type
   */
  function checkServiceMethod( $serviceObject, $method )
  {
    if ( ! method_exists( $serviceObject, $method ) )
    {
      $this->setError(
        JsonRpcError_MethodNotFound,
         "Method `" . $method . "` not found " .
         "in service class `" .
        $this->getService() .
         "`."
         );
        return false;
    }
    return true;
  }

  /**
   * Call the requested method passing it the provided params
   * plus the error object plus a reference to the server
   * instance. Override this method for a different behavior.
   * The method handles PHP4 and PHP5.
   * @param object $serviceObject
   * @param string $method
   * @param array $params
   * @return mixed
   */
  function callServiceMethod( $serviceObject, $method, $params )
  {
    $errorBehavior =& $this->getErrorBehavior();

    /*
     * PHP 4 - Error will be caught by set_error_handler,
     * if set up.
     */
    if ( phpversion() < 5 )
    {
      $result = $serviceObject->$method( $params, $errorBehavior );
    }

    /*
     * PHP5: JsonRpcErrors can be thrown manually, also, we can
     * check the service method signature via introspection.
     * To not raise a parse error in PHP4, the code is included in
     * an external script
     */
    else
    {
      require dirname(__FILE__) . "/lib/callServiceMethod.php5";
    }
    return $result;
  }

  /**
   * Format the response string, given the service method output.
   * By default, return it as it is.
   * @param mixded $output
   * @return string
   */
  function formatOutput( $output )
  {
    return $output;
  }


  /**
   * Sets the origin of an error
   * @param int $origin
   * @return void
   */
  function setErrorOrigin( $origin )
  {
    $errorBehavior =& $this->getErrorBehavior();
    $errorBehavior->SetOrigin( $origin );
  }

  /**
   * Configures the jsonrpc error with error code
   * and error message
   * @param string $code
   * @param string $message
   * @return void
   */
  function setError( $code, $message )
  {
    $errorBehavior =& $this->getErrorBehavior();
    $errorBehavior->SetError( $code, $message );
  }

  /**
   * Called when a jsonrpc error has been set. Will send the
   * the last configured error to the client and exit the script
   * @return void
   */
  function sendErrorAndExit()
  {
    $errorBehavior =& $this->getErrorBehavior();
    if ( $errorBehavior )
    {
      $this->debug("Error: " . $errorBehavior->GetErrorMessage() );
      $this->errorBehavior->SendAndExit();
    }
    else
    {
      echo "An unknown error occurred.";
      exit;
    }

  }

  /*
   * Debug function. Define your own function if you want
   * to do something else with the debug output
   * @param string $str
   */
  function debug($str)
  {
    if ( $this->debug )
    {
      error_log(  $str . "\n",3, JsonRpcDebugFile );
    }
  }

  /**
   * Returns the jsonrpc server response
   * @param $reply
   * @return unknown_type
   */
  function sendReply( $reply )
  {
    $scriptTransportId = $this->scriptTransportId;

    /*
     * If not using ScriptTransport...
     */
    if ( ! $scriptTransportId or $scriptTransportId == ScriptTransport_NotInUse )
    {
      /*
       *  ... then just output the reply.
       */
      print $reply;
    }
    else
    {
      /*
       * Otherwise, we need to add a call to a qooxdoo-specific function
       */
      $reply =
            "qx.io.remote.transport.Script._requestFinished(" .
      $scriptTransportId . ", " . $reply .
            ");";
      print $reply;
    }

    /*
     * exit script
     */
    exit;
  }

  /**
   * Returns the url of the server
   * @return string
   */
  function getUrl()
  {
    return "http://" . getenv ( HTTP_HOST ) . $_SERVER['PHP_SELF'];
  }

}
?>