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

/**
 * This script is included by the AbstractServer class to call the service
 * method, PHP5 style. It will be included into the file when the server
 * fully switches to PHP5.
 *
 */
try {

  /*
   * Allow new-style signature while ensuring compatibility to
   * the 1.0 style: Check the method signature through the PHP5
   * reflection API. If the first parameter is called 'params',
   * assume that the 1.0 signature is used.
   */
  if ( RpcMethodSignatureMode == "check" )
  {
    $methodObj = new ReflectionMethod(
      get_class( $serviceObject ), $method
    );
    $parameters = $methodObj->getParameters();
    if ( count($parameters) )
    {
      if ( $parameters[0]->getName() == "params" )
      {
        $mode = "array";
      }
      else
      {
        $mode = "args";
      }
    }
    else
    {
      $mode = "args";
    }
  }
  else
  {
    $mode = RpcMethodSignatureMode;
  }

  switch ( $mode )
  {
    /*
     * the old-style method signature. we pass the parameter array
     * and the error behavior object to the method.
     */
    case "array":
      $result = $serviceObject->$method(
        $params,        /* parameters */
        $errorBehavior  /* the error object */
      );
      break;

    /*
     * The new signature which will become the default in a future version:
     * the rpc parameters are passed as "normal" arguments to the method,
     * passing of the error object is no longer necessary.
     */
    case "args" :
      $result = call_user_func_array( array( $serviceObject, $method), $params );
      break;

    default:
      trigger_error("Invalid signature mode '$mode'."  );
  }

}
catch ( JsonRpcError $exception)
{
  $result = $exception;
  $result->SetId( $this->getId() );
}
catch ( Exception $exception )
{
  $result = new JsonRpcError(
    JsonRpcError_ScriptError,
    "PHP Script Error: "  . $exception->getMessage() . "in " . $exception->getFile() . ", line " . $exception->getLine(),
    JsonRpcError_Origin_Server
  );
  $result->SetId( $this->getId() );
  $this->log( $exception->getTraceAsString() );
}

?>