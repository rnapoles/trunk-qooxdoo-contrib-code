<?php
  /*
   * qooxdoo - the new era of web development
   *
   * http://qooxdoo.org
   *
   * Copyright:
   *   2006 Derrell Lipman
   *
   * License:
   *   LGPL: http://www.gnu.org/licenses/lgpl.html
   *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
   *   See the LICENSE file in the project's top-level directory for details.
   *
   * Authors:
   *  * Derrell Lipman (derrell)
   *  * Christian Boulanger (cboulanger)
   */

qcl_import("qcl_test_AbstractTestController");

/*
 * This is the standard qooxdoo test class.  There are tests for each of the
 * primitive types here, along with standard named tests "echo", "sink" and
 * "sleep". The tests have converted to qcl service classes.
 */
class class_qcl_test_Test
  extends qcl_test_AbstractTestController
{
  /**
   * Specify method accessibility.  Default value is configured in server,
   * but may be overridden on a per-method basis here.
   *
   * @param method
   *   The name of the method (without the leading "method_") to be tested
   *   for accessibility.
   *
   * @param defaultAccessibility
   *   The default accessibility configured in the server.  (See @return for
   *   possible values.)
   *
   * @param bScriptTransportInUse (not yet implemented)
   *   Boolean indicating whether the current request was issued via
   *   ScriptTransport.
   *
   * @param bDefaultScriptTransportAllowed (not yet implemented)
   *   Boolean specifying the default value for allowing requests via
   *   ScriptTransport.
   *
   * @return
   *   One of these values:
   *     Accessibility_Public
   *     Accessibility_Domain
   *     Accessibility_Session
   *     Accessibility_Fail
   */
/*
  function GetAccessibility($method, $defaultAccessibility)
  {
      switch($method)
      {
      case "echo":
          return Accessibility_Domain;

      case "getInteger":
          return Accessibility_Session;

      case "getString":
          return Accessibility_Public;
      }

      return $defaultAccessibility;
  }
*/

  /**
   * Echo the (one and only) parameter.
   *
   * @param $msg The message to be echo'ed     *
   * @return string The object containing the result of the method;
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "echo",
   *    "params"  : ["hello"]
   *  },
   *  "checkResult" : "Client said: 'hello'"
   * }
   */
  function method_echo($msg)
  {
      return "Client said: '$msg'";
  }


  /**
   * Return an integer
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getInteger"
   *  },
   *  "checkResult" : 1
   * }
   */
  function method_getInteger()
  {
      return 1;
  }

  /**
   * Return a float value
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getFloat"
   *  },
   *  "checkResult" : 1/3
   * }
   */
  function method_getFloat()
  {
      return 1/3;
  }

  /**
   * Return a string value
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getString"
   *  },
   *  "checkResult" : "Hello world"
   * }
   */
  function method_getString()
  {
      return "Hello world";
  }

  /**
   * Return a string value
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getBadString"
   *  },
   *  "checkResult" : "<!DOCTYPE HTML \"-//IETF//DTD HTML 2.0//EN\">"
   * }
   */
  function method_getBadString()
  {
      return "<!DOCTYPE HTML \"-//IETF//DTD HTML 2.0//EN\">";
  }

  /**
   * Return an array of integer values
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getArrayInteger"
   *  },
   *  "checkResult" : [1,2,3,4]
   * }
   */
  function method_getArrayInteger()
  {
      return array(1, 2, 3, 4);
  }


  /**
   * Return an array of string values
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getArrayString"
   *  },
   *  "checkResult" : ["one", "two", "three", "four"]
   * }
   */
  function method_getArrayString()
  {
      return array("one", "two", "three", "four");
  }

  /**
   * Return an object
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getObject"
   *  },
   *  "checkResult" : {}
   * }
   */
  function method_getObject()
  {
      return new stdClass();
  }

  /**
   * Return an boolean true
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getTrue"
   *  },
   *  "checkResult" : true
   * }
   */
  function method_getTrue()
  {
      return true;
  }

  /**
   * Return boolean false
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getFalse"
   *  },
   *  "checkResult" : false
   * }
   */
  function method_getFalse()
  {
      return false;
  }

  /**
   * Return null
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getNull"
   *  },
   *  "checkResult" : null
   * }
   */
  function method_getNull()
  {
      return null;
  }

  /**
   * Checks if argument is integer
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "isInteger",
   *    "params"  : [1]
   *  },
   *  "checkResult" : true
   * }
   */
  function method_isInteger( $value )
  {
      return is_int( $value );
  }

  /**
   * Checks if argument is a float value
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "isFloat",
   *    "params"  : [1/3]
   *  },
   *  "checkResult" : true
   * }
   */
  function method_isFloat( $value )
  {
      return is_float( $value );

  }

  /**
   * Checks if argument is a string value
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "isString",
   *    "params"  : ["foo"]
   *  },
   *  "checkResult" : true
   * }
   */
  function method_isString( $value )
  {
      return is_string( $value );
  }

  /**
   * Checks if argument is a boolean value
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "isBoolean",
   *    "params"  : [true]
   *  },
   *  "checkResult" : true
   * }
   */
  function method_isBoolean( $value )
  {
      return is_bool( $value );
  }

  /**
   * Checks if argument is an array value
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "isArray",
   *    "params"  : [[1,2,3]]
   *  },
   *  "checkResult" : true
   * }
   */
  function method_isArray( $value )
  {
      return is_array( $value );
  }

  /**
   * Checks if argument is an object
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "isObject",
   *    "params"  : [{ "foo" : "bar" }]
   *  },
   *  "checkResult" : true
   * }
   */
  function method_isObject( $value )
  {
      return is_object( $value );
  }

  /**
   * Checks if argument is a null value
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "isNull",
   *    "params"  : [null]
   *  },
   *  "checkResult" : true
   * }
   */
  function method_isNull( $value )
  {
      return is_null( $value );
  }

  /**
   * Returns the parameters back to the client
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getParams",
   *    "params"  : ["foo",[1,2,3],{ "bar":"baz"}, null, false ]
   *  },
   *  "checkResult" : ["foo",[1,2,3],{ "bar":"baz"}, null, false ]
   * }
   */
  function method_getParams()
  {
    return func_get_args();
  }

  /**
   * Returns a specific argument
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getParam",
   *    "params"  : ["foo",[1,2,3],{ "bar":"baz"}, null, false ]
   *  },
   *  "checkResult" : "foo"
   * }
   */
  function method_getParam()
  {
    return func_get_arg(0);
  }

  /**
   * Returns the current timestamp
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getCurrentTimestamp",
   *    "params"  : []
   *  }
   * }
   */
  function method_getCurrentTimestamp()
  {
    include_once "services/server/lib/JSON.phps";
    $now = time();
    $obj = new stdClass();
    $obj->now = $now;
    $obj->json = new JSON_Date($now);
    return $obj;
  }


 /**
   * Throws an error
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "getError"
   *  }
   * }
   */
  function method_getError($params, $error)
  {
     throw new JsonRpcError("This is an application-provided error thrown on purpose.",1000);
  }


  /**
   * Sink all data and produce a timeout.
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "sink",
   *    "timeout" : 5,
   *    "params"  : []
   *  }
   * }
   */
  function method_sink()
  {
      sleep(5);
  }

  /**
   * Sleep for the number of seconds specified by the parameter.
   * @param int $seconds
   * @rpctest {
   *  "requestData" : {
   *    "service" : "qcl.test.Test",
   *    "method"  : "sleep",
   *    "timeout" : 10,
   *    "params"  : [1]
   *  },
   *  "checkResult" : 1
   * }
   */
  function method_sleep( $seconds )
  {
      sleep( intval( $seconds ) );
      return $seconds;
  }
}

?>