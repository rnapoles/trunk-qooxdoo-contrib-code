<?php
/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2006-2007 Derrell Lipman
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 *  * Derrell Lipman (derrell)
 */


/**
 * JSON-RPC error origins
 */
define("JsonRpcError_Origin_Server",      1);
define("JsonRpcError_Origin_Application", 2);
define("JsonRpcError_Origin_Transport",   3); // never generated by server
define("JsonRpcError_Origin_Client",      4); // never generated by server


/*
 * JSON-RPC server-generated error codes
 */

/*
 * Error code, value -1: Script Error
 *
 * This error is raised when the service class aborts with an error,
 * either syntax (parsing) errors or runtime exceptions.
 *
 * Although in PHP, it is possible to raise a custom error using the
 * trigger_error() function, that technique is strongly discouraged when
 * using JSON RPC; rather, return an appropriate application-specific error
 * code to the client, with additional descriptive text in the JsonRpcError
 * message.  An error generated with trigger_error() will always yield an
 * error with origin=Server, code=ScriptError which makes it difficult for the
 * client application to ascertain what went wrong.  This is particularly
 * important when the application is to be localized, as it would never
 * display a message directly from the server, but instead display its own
 * message based on the error code.
 */
define("JsonRpcError_ScriptError",    -1);

/**
 * Error code, value 0: Unknown Error
 *
 * The default error code, used only when no specific error code is passed to
 * the JsonRpcError constructor.  This code should generally not be used.
 */
define("JsonRpcError_Unknown",      0);

/**
 * Error code, value 1: Illegal Service
 *
 * The service name contains illegal characters or is otherwise deemed
 * unacceptable to the JSON-RPC server.
 */
define("JsonRpcError_IllegalService",      1);

/**
 * Error code, value 2: Service Not Found
 *
 * The requested service does not exist at the JSON-RPC server.
 */
define("JsonRpcError_ServiceNotFound",     2);

/**
 * Error code, value 3: Class Not Found
 *
 * If the JSON-RPC server divides service methods into subsets (classes), this
 * indicates that the specified class was not found.  This is slightly more
 * detailed than "Method Not Found", but that error would always also be legal
 * (and true) whenever this one is returned.
 */
define("JsonRpcError_ClassNotFound",       3);

/**
 * Error code, value 4: Method Not Found
 *
 * The method specified in the request is not found in the requested service.
 */
define("JsonRpcError_MethodNotFound",      4);

/**
 * Error code, value 5: Parameter Mismatch
 *
 * If a method discovers that the parameters (arguments) provided to it do not
 * match the requisite types for the method's parameters, it should return
 * this error code to indicate so to the caller.
 */
define("JsonRpcError_ParameterMismatch",   5);

/**
 * Error code, value 6: Permission Denied
 *
 * A JSON-RPC service provider can require authentication, and that
 * authentication can be implemented such the method takes authentication
 * parameters, or such that a method or class of methods requires prior
 * authentication.  If the caller has not properly authenticated to use the
 * requested method, this error code is returned.
 */
define("JsonRpcError_PermissionDenied",    6);

/*
 * class JsonRpcError
 *
 * This is the base class for all error behaviors that are used in the
 * server classes
 */
class AbstractErrorBehavior
{
  /**
   * The error data
   * @var array
   */
  var $data;

  /**
   * The server to which this behavior is attached
   * @var AbstractServer
   */
  var $server;

  /**
   * PHP4 constructor
   * @param AbstractServer $server
   */
  function AbstractErrorBehavior( $server, $data )
  {
    $this->__construct( &$server, $data );
  }

  /**
   * PHP5 constructor
   * @param AbstractServer $server
   * @return unknown_type
   */
  function __construct( $server, $data )
  {
    /*
     * save server object
     */
    $this->server =& $server;
    
    /*
     * save error data
     */
    $this->data = array(
        "origin"  => $origin,
        "code"    => $code,
        "message" => $message
    );
  }

  /**
   * Setter for origin code
   * @param int $origin
   * @return void
   */
  function SetOrigin($origin)
  {
    $this->data["origin"] = $origin;
  }

  /**
   * Setter for error data
   * @param $code
   * @param $message
   * @return void
   */
  function SetError($code, $message)
  {
    $this->data["code"] = $code;
    $this->data["message"] = $message;
  }

  /**
   * Getter for error message
   * @return string
   */
  function GetErrorMessage()
  {
    return $this->data["message"];
  }

  /**
   * Getter for error code
   * @return int
   */
  function GetErrorCode()
  {
    return $this->data["code"];
  }

  /**
   * Setter for request id
   * @param $id
   * @return void
   */
  function SetId($id)
  {
    $this->id = $id;
  }


  /**
   * Returns the error data to the client and exits the script
   */
  function SendAndExit()
  {
    echo "Error " . $this->data['code'] . ": " . $data['message'];
    exit;
  }
}
?>