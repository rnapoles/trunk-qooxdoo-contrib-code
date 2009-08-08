<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */
require_once "qcl/core/Object.php";
require_once "qcl/server/Response.php";
require_once "qcl/data/Result.php";

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
class qcl_data_controller_Controller
  extends qcl_core_Object
{

  /**
   * Whether the request has been aborted
   */
  var $_isAborted = false;

  /**
   * The response data object
   * @var qcl_data_Result
   */
  var $_resultObject;

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
     * configure service
     */
    $this->configureService();

  }

  /**
   * Returns the server object
   * @return qcl_server_Server
   */
  function &getServer()
  {
    return qcl_server_Server::getInstance();
  }

  /**
   * Configures the service. Stub to be overridden
   **/
  function configureService(){}

  /**
   * Returns a configuration value of the pattern "foo.bar.baz"
   * This retrieves the values set in the service.ini.php file.
   */
  function getIniValue($path)
  {
    return qcl_application_Application::getIniValue($path);
  }

  /**
   * Abort the request without throwing an error
   * @return void
   */
  function abortRequest()
  {
    $this->_isAborted = true;
  }

  /**
   * Whether the request has been aborted by the service code
   * @return bool
   */
  function isAborted()
  {
    return $this->_isAborted;
  }

  /**
   * Returns the name of the current service for use in JsonRpc requests
   * @return unknown_type
   */
  function getServiceName()
  {
    return str_replace("_",".", substr( $this->className(), strlen(JsonRpcClassPrefix) ) );
  }

  //-------------------------------------------------------------
  // access control
  //-------------------------------------------------------------

  /**
   * Returns the current session id.
   * Alias of qcl_access_Manager::getSessionId()
   * @return string
   */
  function getSessionId()
  {
    return qcl_access_Manager::getSessionId();
  }

  /**
   * Returns the currently active user
   * Alias of qcl_access_Manager::getActiveUser()
   * @return string
   */
  function getActiveUser()
  {
    return qcl_access_Manager::getActiveUser();
  }

  /**
   * Checks if active user has the given permission.
   * Alias of qcl_access_Manager::hasPermission()
   * @param $permission
   * @return bool
   */
  function hasPermission( $permission )
  {
    return qcl_access_Manager::hasPermission( $permission );
  }

  /**
   * Checks if permission has an controller-specific
   * name. This allows to reuse a global permission for a
   * specific service class without giving the user the same
   * right in a different service class. This is a stub to be overridden
   * if this feature is to be used.
   *
   * @param string $permission
   * @return string|false Name of permission if alias exists, otherwise false
   */
  function hasPermissionAlias( $permission )
  {
    return false;
  }


  /**
   * Checks if active user has the given permission and aborts if
   * permission is not granted.
   * Alias of qcl_access_Manager::requirePermission()
   * @param string $permission
   * @return bool
   */
  function requirePermission( $permission )
  {
    return qcl_access_Manager::requirePermission( $permission );
  }

  /**
   * Checks if active user has the given role.
   * Alias of qcl_access_Manager::getActiveUser()->hasRole()
   * @param string $role
   * @return bool
   */
  function hasRole( $role )
  {
    $activeUser =& qcl_access_Manager::getActiveUser();
    return $activeUser->hasRole( $role );
  }

  //-------------------------------------------------------------
  // datasources
  //-------------------------------------------------------------


  /**
   * Returns the  datasource model with the datasource connection
   * data preloaded.
   * @param string $datasource
   * @return qcl_data_datasource_type_db_Model
   */
  function &getDatasourceModel( $datasource )
  {
    require_once "qcl/data/datasource/Manager.php";
    return qcl_data_datasource_Manager::getDatasourceModel( $datasource );
  }


  //-------------------------------------------------------------
  // response data, deprecated methods
  //-------------------------------------------------------------

  /**
   * Shorthand method to create the response data object from the
   * given class.
   * @param string $clazz
   * @return void
   * @deprecated Work with result object instead
   */
  function setResultClass( $clazz )
  {
    $path = str_replace("_", "/", $clazz ) . ".php";
    require_once $path;
    $this->setResultObject( new $clazz );
  }

  /**
   * Shorthand method to set the data object of the response object
   * @param qcl_data_Result $resultObject
   * @return void
   * @deprecated Work with result object instead
   */
  function setResultObject( $resultObject )
  {
    $this->_resultObject =& $resultObject;
  }

  /**
   * Shorthand method to set a property of the result
   * data object. Alias of setResult()
   * @param string $key
   * @param mixed $value
   * @deprecated Work with result object instead
   */
  function set ( $key, $value )
  {
    $this->_resultObject->set( $key, $value );
  }

  /**
   * Shorthand method to set a property of the result
   * data object
   * @param string $key
   * @param mixed $value
   * @deprecated Work with result object instead
   */
  function setResult ( $key, $value )
  {
    $this->_resultObject->set( $key, $value );
  }

  /**
   * Returns all puplic properties of the result data object
   * @return qcl_data_Result
   * @deprecated Work with result object instead
   */
  function &result()
  {
    return $this->_resultObject;
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

//  /**
//   * Returns a list of all service methods that this class provides. Doesn't work.
//   * @todo Save result so that access can be regulated by source code introspection
//   * @return qcl_data_Result
//   */
//  function method_services()
//  {
//    /*
//     * get list of method names
//     */
//    $serviceMethods = new ArrayList;
//    foreach ( $this->methods() as $method )
//    {
//      if ( $this->isServiceMethod( $method ) )
//      {
//
//        $serviceMethods->add($method);
//      }
//    }
//
//    /*
//     * parse source code - we have no idea where the functions are
//     */
//    $this->info("Parsing included files for method information...");
//    $methodInfo = array();
//    $counters   = array();
//    foreach ( get_included_files() as $file )
//    {
//      $code = file_get_contents($file);
//      foreach( $serviceMethods->toArray() as $method )
//      {
//        $signature = "function $method";
//        $pos = strpos( strtolower($code), $signature ) ;
//        if ( $pos !== false )
//        {
//
//          /*
//           * get method name from code
//           */
//          $methodName = substr($code,$pos + 16, strlen( $method ) -7 );
//
//          /*
//           * read file into array
//           */
//          $lines = file($file);
//
//          /*
//           * forward to line with signature
//           */
//          for( $i=0; $i<count($lines); $i++ )
//          {
//            if ( strstr($lines[$i], $methodName ) ) break;
//          }
//          $endDocLine = $i-1;
//
//          /*
//           * go back to the beginning of the documentation
//           */
//          for( $j = $endDocLine; $j > 0; $j--)
//          {
//            $line = trim($lines[$j]);
//            if ( substr( $line, 0, 3 ) == "/**" ) break;
//          }
//          $startDocLine = $j+1;
//
//          /*
//           * now add documentation until doctags are encountered
//           */
//          for ( $i= $startDocLine; $i < $endDocLine; $i++)
//          {
//            $line = trim($lines[$i]);
//            if ( substr($line,0,3 ) ==  "* @" ) break;
//            $methodInfo[$methodName]['doc'] .= trim( str_replace("* ", " ", $line ) );
//          }
//
//          /*
//           * now parse doctags
//           */
//          for ( $j = $i; $j < $endDocLine; $j++ )
//          {
//            $line = trim($lines[$j]);
//            if ( substr($line,0, 3) == "* @" )
//            {
//              $line  = trim( substr($line, 3 ) );
//              $tag   = trim( substr( $line, 0, strpos( $line, " " ) ) );
//              $value = trim( substr( $line, strlen($tag) ) );
//              $counters[$method][$tag]++;
//            }
//            else
//            {
//              $value = substr($line,3);
//            }
//            if ( in_array($tag, array("param","todo","see") ) )
//            {
//              $methodInfo[$methodName][$tag][$counters[$method][$tag]-1] .= $value;
//            }
//            else
//            {
//              $methodInfo[$methodName][$tag] .= $value;
//            }
//          }
//        }
//      }
//    }
//    //$this->info($methodInfo);
//    $this->setResult("services",$methodInfo);
//    return $this->result();
//  }

}
?>