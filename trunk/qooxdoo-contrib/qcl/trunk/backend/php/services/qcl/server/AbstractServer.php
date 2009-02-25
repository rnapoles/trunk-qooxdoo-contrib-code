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
 * include json class, either a wrapper around a php extension/php-only implementation
 * (php4) or built-in functions (php5)
 */
require_once dirname(__FILE__) . "/JsonWrapper.php";

/*
 * include JsonRpcError class
 */
require_once dirname(__FILE__) . "/JsonRpcError.php";

/*
 * There may be cases where all services need use of some libraries or
 * system-wide definitions.  Those may be provided by a file named
 * "global_settings.php" in the same directory as this file.  If it exists, we
 * include it.
 *
 * The global settings file may provide values for the following manifest
 * constants whose default values are otherwise provided below:
 *
 *   servicePathPrefix
 *   defaultAccessibility
 *
 */
if (file_exists("global_settings.php"))
{
  require_once "global_settings.php";
}

/**
 * The default accessibility behavior, which
 * serves as a base class for all more specialized
 * behaviors. Use setAccessibilityBehavior() to set
 * your custom subclass
 */
require_once dirname(__FILE__) . "/AccessibilityBehavior.php";

/**
 * The location of the service class directories.
 */
define("servicePathPrefix", "");

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
   * @var JsonRpcError
   */
  var $errorBehavior;


  /**
   * A prefix to the service path
   */
  var $servicePathPrefix = servicePathPrefix;

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
    if ( ! is_a( $object, "AbstractErrorBehavior") )
    {
      trigger_error("The error behavior object must subclass AbstractErrorBehvior");
    }
    $this->errorBehavior =& $object;
  }

  /**
   * Getter for error behavior object
   * @return AbstractErrorBehavior
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
    $service = $input->service;
    $method  = $input->method;
    $params  = $input->params;
    $id      = $input->id;
    $this->input = $input;

    /*
     * configure this service request properties
     */
    $this->setService( $service );
    $this->setMethod( $method );
    $this->setParams( $params );
    
    /*
     * Ok, it looks like a valid request, so we'll return an
     * error object if we encounter errors from here on out.
     */
    $errorBehavior->SetId( $this->id);

    //$this->debug("Service request: $service.$method");
    //$this->debug("Parameters: " . var_export($params,true) );

    /*
     * service components
     */
    $this->serviceComponents = $this->getServiceComponents( $service );

    /*
     * check service request
     */
    $validService = $this->checkService( $service );
    if ( ! $validService )
    {
      $this->sendErrorAndExit();
    }
     
    /*
     * load service class file
     */
    $classFile = $this->loadServiceClass( $service );
    if ( ! $classFile )
    {
      $this->sendErrorAndExit();
    }
    //$this->debug("Loaded file '$classFile'");

    /*
     * check if class is defined in this file
     */
    $this->serviceClass = $this->getServiceClass( $service );
    if ( ! $this->serviceClass )
    {
      $this->sendErrorAndExit();
    }

    /*
     * instantiate service
     */
    //$this->debug("Instantiating service class '{$this->serviceClass}'.");
    $serviceObject =& $this->getServiceObject( $this->serviceClass );
    $this->serviceObject =& $serviceObject;

    /*
     * accessibility behavior
     */
    if ( $this->accessibilityBehavior )
    {
      //$this->debug("Checking accessibility...");
      if ( ! $this->accessibilityBehavior->checkAccessibility( &$serviceObject, $method ) )
      {
        $this->setError(
          $this->accessibilityBehavior->getErrorNumber(),
          $this->accessibilityBehavior->getErrorMessage()
        );
        $this->sendErrorAndExit();
      }
    }

    /*
     * Now that we've instantiated thes service, we should find the
     * requested method by prefixing the method prefix
     */
    $method = JsonRpcMethodPrefix . $method;
    //$this->debug("Checking service method '$method'.");
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
    //$this->debug("Starting Service method {$this->serviceClass}.$method");
    $this->output = $this->callServiceMethod( &$serviceObject, $method, $params );
    //$this->debug("Done. Result:" . var_export($this->output,true) );

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
    //$this->debug("Sending response to client ...");
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
    if (ereg("^[_.a-zA-Z0-9]+$", $service) === false)
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
      if (ereg("^[a-zA-Z]", $serviceComponents[$i]) === false)
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
     * Replace all dots with slashes in the service name so we can
     * locate the service script.
     */
    $servicePath = implode( "/", $this->getServiceComponents( $service ) );

    /*
     * Try to load the requested service
     */
    $classFile = $this->servicePathPrefix . $servicePath . ".php";
    if ( file_exists( $classFile ) )
    {
      require_once $classFile;
    }
    else
    {
      /*
       * Couldn't find the requested service
       */
      $this->SetError(
        JsonRpcError_ServiceNotFound,
        "Service `$servicePath` not found."
      );
      return false;
    }
    return $classFile;
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
   * Returns the actual service object, based on the class name.
   * Instantiates
   * Override this if you want to pass additional data to the
   * service class' constructor.
   * @param string $className
   * @return Object
   */
  function &getServiceObject( $className )
  {
    $serviceObject = new $className( &$this );
    return $serviceObject;
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
        $this->serviceName .
         "`."
         );
        return false;
    }
    return true;
  }
  /**
   * Call the requested method passing it the provided params
   * plus the error object plus a reference to the server
   * instance. Override this method for a different behavior
   * @param object $serviceObject
   * @param string $method
   * @param array $params
   * @return mixed
   */
  function callServiceMethod( $serviceObject, $method, $params )
  {
    return $serviceObject->$method( $params, &$this->errorBehavior, &$this );
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
   * @param string[optional] $error
   * @return void
   */
  function sendErrorAndExit( $error=null, $code=null )
  {
    $errorBehavior =& $this->getErrorBehavior();
    if ( $errorBehavior )
    {
      if ( $error )
      {
        $errorBehavior->SetError( $code, $message );
      }
      //$this->debug("Error: " . $errorBehavior->GetErrorMessage() );
      $this->errorBehavior->SendAndExit();      
    }
    else
    {
      echo $error;
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
      @error_log(  $str . "\n",3, JsonRpcDebugFile );
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
      /* Otherwise, we need to add a call to a qooxdoo-specific function */
      $reply =
            "qx.remote.ScriptTransport._requestFinished(" .
      $scriptTransportId . ", " . $reply .
            ");";
      print $reply;
    }

    /*
     * exit script
     */
    exit;
  }

}
?>