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

/**
 * The base class for all service classes. Contains introspection methods
 * similar to those in xmlrpc (see http://xmlrpc-c.sourceforge.net/introspection.html)
 */
class qcl_server_Service
  extends qcl_core_Object
{

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

  /**
   * Checks whether a method name is a service method
   * @param string $method
   * @return bool
   */
  function isServiceMethod ( $method )
  {
    return (substr($method,0, strlen(JsonRpcMethodPrefix)) == JsonRpcMethodPrefix);
  }

  //-------------------------------------------------------------
  // Introspection methods
  //-------------------------------------------------------------

  /**
   * Checks for PHP5 and aborts if not present
   * @return void
   */
  function _checkPHP5()
  {
    if ( phpversion() < 5 )
    {
      $this->raiseError("Introspection is only available in PHP5");
    }
  }

  /**
   * Analyzes a PhpRpc method's doc comment. This allows to provide non-standard
   * documentation in the sense that you can use @param $params[0], @param $params[1],
   * etc.
   *
   * @param $docComment
   * @return unknown_type
   */
  function _analyzeDocComment( $docComment )
  {
    $params = array();
    $return = "";
    $doc = "";
    $lines = explode("\n", $docComment) ;
    foreach ($lines as $index => $line )
    {
      if ( $pos = strpos( $line, "@param" ) !== false  )
      {
       $params[] = substr( $line, $pos + 11 );
      }
      elseif ( $pos = strpos( $line, "@return" ) !== false  )
      {
       $return = substr( $line, $pos + 12 );
      }
      elseif ( $index < count( $lines ) -1 )
      {
        $doc .= substr( $line, strrpos( $line, "*" )+1 );
      }
    }
    return array(
      "doc"    => $doc,
      "params" => $params,
      "return" => $return
    );
  }

  //-------------------------------------------------------------
  // Introspection API
  //-------------------------------------------------------------

  /**
   * This method returns a list of the methods the server has, by name.
   * @return array
   */
  function method_listMethods()
  {
    $this->_checkPHP5();
    $class = new ReflectionClass($this->className());
    $methods = new ArrayList();
    foreach( $class->getMethods() as $method )
    {
      $name = $method->getName();
      if ( $this->isServiceMethod( $name ) )
      {
        $methods->add( substr( $name, strlen(JsonRpcMethodPrefix)  ) );
      }
    }
    return $methods->toArray();
  }

  /**
   * This method returns a description of the argument format a particular
   * method expects. The method takes one parameter. Its value is the name
   * of the method about which information is being requested.
   * The result is an array, with each element representing one method
   * signature. The array is a list of the signatures of the method.
   * There are no duplicate signatures. The list does not necessarily
   * contain all possible signatures. A signature is a description of
   * parameter and result types for a call to a method. A method can have
   * multiple signatures; for example a method might take either a host
   * name and port number or just a host name (and default the port number).
   * The array entry that represents a signature is an array of strings, with
   * at least one element. The first element tells the type of the method's
   * result. The rest tell the types of the method's parameters, in order.
   * @param string $params[0] The name of the method
   * @return array
   */
  function method_methodSignature( $params )
  {
    $this->_checkPHP5();
    list( $method ) = $params;
    $method = new ReflectionMethod( $this->className(), JsonRpcMethodPrefix . $method );
    $docComment = $method->getDocComment();
    $signature = $this->_analyzeDocComment( $docComment );
    return array_merge(
      array( $signature['return'] ),
      $signature['params']
    );
  }

  /**
   * This method returns a text description of a particular method.
   * The method takes one parameter, a string. Its value is the name of
   * the jsonrpc method about which information is being requested.
   * The result is a string. The value of that string is a text description,
   * for human use, of the method in question.
   * @param string $params[0] The name of the method
   * @return string
   */
  function method_methodHelp( $params )
  {
    $this->_checkPHP5();
    list( $method ) = $params;
    $method = new ReflectionMethod( $this->className(), JsonRpcMethodPrefix . $method );
    $docComment = $method->getDocComment();
    $signature = $this->_analyzeDocComment( $docComment );
    return $signature['doc'];
  }

}
?>