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
require_once "qcl/data/controller/Controller.php";

/**
 * Exception
 */
class qcl_test_AssertionException extends JsonRpcException
{
  function __construct( $msg )
  {
    parent::__construct( "Assertion failed: " . $msg . " in " . get_class($this) . ":" . $this->getLine());
  }
}

/**
 * Abstract class for test controllers
 */
class qcl_test_AbstractTestController
  extends qcl_data_controller_Controller
{

  /**
   * Analyzes a PhpRpc method's doc comment. This allows to provide non-standard
   * documentation in the sense that you can use @param $params[0], @param $params[1],
   * etc.
   *
   * @param $docComment
   * @todo rewrite more elegantly, see overridden method
   * @return unknown_type
   */
  public static function analyzeDocComment( $docComment )
  {
    $params = array();
    $return = "";
    $doc = "";
    $rpctest = "";
    $lines = explode("\n", $docComment) ;
    $mode = 0; // 0 = doc, 1 = param, 2 = return 3= rpctest
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
      elseif ( ($pos = strpos( $line, "@rpctest" )) !== false  )
      {
       $rpctest = substr( $line, $pos + 9 ) . "\n";
       $mode = 3;
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
          case 3:
            $rpctest .=  $text . "\n";
            break;
        }
      }
    }
    return array(
      "doc"     => trim($doc),
      "params"  => $params,
      "return"  => trim($return),
      "rpctest" => $rpctest
    );
  }

  /**
   * Returns the json data that can be used to run a jsonrpc console test as a string
   * The frontend needs to evaluate it.
   * @param $method
   * @return string
   */
  public function method_rpcConsoleMethodTestJson( $method )
  {
    $serviceIntrospection = new ServiceIntrospection( $this );
    $serviceIntrospection->checkServiceMethod( $method );
    $docComment = $serviceIntrospection->getDocComment( $method );
    $signature  = self::analyzeDocComment( $docComment );
    return $signature['rpctest'];
  }

  /**
   * Returns the json data to create a complete test case for all the methods
   * of a class as a string.
   * @return unknown_type
   */
  public function method_rpcConsoleClassTestJson()
  {
    $serviceIntrospection = new ServiceIntrospection( $this );
    $methods = $serviceIntrospection->method_listMethods();
    $testJsonArr = array();
    foreach( $methods as $method )
    {
      $docComment = $serviceIntrospection->getDocComment( $method );
      $signature  = self::analyzeDocComment( $docComment );
      $testJson = $signature['rpctest'];
      $service = $serviceIntrospection->getServiceName();
      if ( $testJson )
      {
        $testJsonArr[] = '"' . $service . "." . $method . '": ' . $testJson;
      }
    }
    return "({" . implode( ",", $testJsonArr )  . "})";
  }

  /**
   * Assert that both values are equal. (Uses the equality operator
   * <code>==</code>.)
   *
   * @param mixed $expected Reference value
   * @param mixed $found found value
   * @param string $msg|null Message to be shown if the assertion fails.
   *  Defauts to "Values are not equal."
   * @param string|null $class name of the class. Pass the __CLASS__ constant here.
   * @param string|null $line line number. Pass the __LINE__ constant here.
   * @return boolean true If values are equal
   */
  public function assertEquals( $expected, $found, $msg=null, $class=null, $line=null )
  {
    if ( $expected == $found ) return true;
    if ( $msg === null )   $msg   = "Values are not equal.";
    if ( $class === null ) $class = "Unknown class";
    if ( $line === null )  $line  = "Unknown line";
    throw new qcl_test_AssertionException( "$msg ($class:$line)" );
  }

}

/**
 * add capability
 */
class_system::addCapability(
  "rpctest",
  "http://qooxdoo.org/documentation/json_rpc_introspection",
  "0.1",
  array(),
  array("rpcConsoleMethodTestJson","rpcConsoleClassTestJson")
);
?>