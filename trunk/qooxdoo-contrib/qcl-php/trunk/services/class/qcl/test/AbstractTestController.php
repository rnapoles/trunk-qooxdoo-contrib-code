<?php
require_once "qcl/data/controller/Controller.php";

class qcl_test_AbstractTestController
  extends qcl_data_controller_Controller
{
  /**
   * A test controller should not require authentication
   * @var unknown_type
   */
  public $skipAuthentication = true;


  /**
   *
   * @return unknown_type
   */
  function __construct()
  {
    parent::__construct();
    $this->getLogger()->setFilterEnabled("xml",false);
    $this->getLogger()->setFilterEnabled("propertyModel",false);
  }

  /**
   * Creates a anonymous user or reuse an existing session. Returns the
   * user id of the anonymous user.
   * @return int The user id of the anoymous user
   */
  public function anonymousAccess()
  {
    if ( ! $this->getApplication() )
    {
      $this->raiseError("Cannot create anonymous access without an application instance.");
    }

    $userController = $this->getApplication()->getAccessBehavior()->getAccessController();
    if ( ! $_SESSION['sessionId'] )
    {
      $userController->grantAnonymousAccess();
      $_SESSION['sessionId'] = $userController->getSessionId();
    }
    else
    {
      $userController->setSessionId($_SESSION['sessionId']);
    }
    return $userController->createUserSession($_SESSION['sessionId']);
  }

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