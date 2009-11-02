<?php
/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
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

/**
 * Class providing introspection methods similar to those in
 * xmlrpc (see http://xmlrpc-c.sourceforge.net/introspection.html). In order to use
 * the introspection API, your service class must extend this class or implement
 * methods forwarding to the API methods like so:
 * <pre>
 * function method_methodSignature( $method )
 * {
 *    $serviceIntrospection = new ServiceIntrospection( $this );
 *    return $serviceIntrospection->method_methodSignature( $method );
 * }
 */
class ServiceIntrospection
{

  public $className;

  /**
   * Constructor.
   * @param object|string $class Object or class name introspect
   * @return void
   */
  function __construct( $class=null )
  {
    $this->className = is_object( $class) ? get_class( $class ) : get_class( $this );
  }

  /**
   * Returns the name of the current service for use in JsonRpc requests.
   * @return string
   */
  function getServiceName()
  {
    return str_replace("_",".", substr( $this->className, strlen(JsonRpcClassPrefix) ) );
  }

  /**
   * Returns the path of the file extending / proxying this class. This works only
   * if the class name mirrors the directory structure (foo_bar_baz == foo/bar/baz.php)
   * @return string
   */
  function getFilePath()
  {
    return str_replace("_","/", substr( $this->className, strlen(JsonRpcClassPrefix) ) ) . ".php";
  }

  /**
   * Returns the method name of a service method by adding the service method
   * prefix.
   *
   * @param string $method
   * @return string
   */
  function getMethodName ( $method )
  {
    return JsonRpcMethodPrefix . $method;
  }

  /**
   * Checks whether a method name is a service method.
   *
   * @param string $method_name
   * @return bool
   */
  function isServiceMethodName ( $method_name )
  {
    return (substr( $method_name, 0, strlen(JsonRpcMethodPrefix)) == JsonRpcMethodPrefix);
  }

  /**
   * Checks whether this service class has the given service method
   *
   * @param string $method
   * @return bool
   */
  function hasServiceMethod ( $method )
  {
    return method_exists( $this, $this->getMethodName( $method ) );
  }

  /**
   * Checks whether this service class has the given service method and
   * throws an error if not.
   *
   * @param string $method
   * @return void
   * @throws JsonRpcError
   */
  function checkServiceMethod ( $method )
  {
    if ( ! $this->hasServiceMethod( $method ) )
    {
      throw new JsonRpcError(JsonRpcError_Origin_Server, "Method '$method' is invalid or does not exist.");
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
    $mode = 0; // 0 = doc, 1 = param, 2 = return
    $paramIndex = -1;
    foreach ($lines as $index => $line )
    {
      if ( ($pos = strpos( $line, "@param" )) !== false  )
      {
        $params[++$paramIndex] = substr( $line, $pos + 7 ) . " ";
        $mode = 1;
      }
      elseif ( ($pos = strpos( $line, "@return" )) !== false  )
      {
       $return = substr( $line, $pos + 8 ) . " ";
       $mode = 2;
      }
      elseif ( $index < count( $lines ) -1 )
      {
        $text = trim( substr( $line, strrpos( $line, "*" ) + 1 ) ) . " ";
        switch( $mode )
        {
          case 0:
            $doc .=  $text;
            break;
          case 1:
            $params[$paramIndex] .=  $text;
            break;
          case 2:
            $return .=  $text;
            break;
        }
      }
    }
    return array(
      "doc"    => trim($doc),
      "params" => $params,
      "return" => trim($return)
    );
  }

  /**
   * Lists all the services available in a directory.
   * @return array
   */
  function method_listServices()
  {

    $services = array();
    $path = realpath( dirname( servicePathPrefix . $this->getFilePath() ) );
    $dir = dir( $path );
    while ( false !== ( $file = $dir->read() ) )
    {
      $file = "$path/$file";
      if ( is_file( $file ) and substr( $file, -4, 4 ) == ".php" )
      {
        $content = file_get_contents( $file );
        if ( preg_match("/class class_([a-zA-Z0-9_]+)/",$content,$matches) )
        {
          $services[] = str_replace("_",".",$matches[1]);
        }
      }
    }
    return $services;
  }


  //-------------------------------------------------------------
  // Service class introspection API
  //-------------------------------------------------------------

  /**
   * This method returns a list of the methods the server has, by name.
   * @return array Array of method names
   */
  function method_listMethods()
  {
    $class = new ReflectionClass( $this->className );
    $methods = array();
    foreach( $class->getMethods() as $method )
    {
      $name = $method->getName();
      if ( $this->isServiceMethodName( $name ) )
      {
        $methods[] = substr( $name, strlen(JsonRpcMethodPrefix)  );
      }
    }
    return $methods;
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
   *
   * @param string $method The name of the method
   * @return array An array, the first element telling the type of the method's
   * result, the rest telling the types of the method's parameters and the
   * description of the parameter, separated by space, in order.
   */
  function method_methodSignature( $method )
  {
    $this->checkServiceMethod( $method );
    $method = new ReflectionMethod( $this->className, $this->getMethodName( $method ) );
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
   * @param string $method The name of the method
   * @return string The documentation text of the method.
   */
  function method_methodHelp( $method )
  {
    $this->checkServiceMethod( $method );
    $method = new ReflectionMethod( $this->className, JsonRpcMethodPrefix . $method );
    $docComment = $method->getDocComment();
    $signature = $this->_analyzeDocComment( $docComment );
    return $signature['doc'];
  }
}
?>