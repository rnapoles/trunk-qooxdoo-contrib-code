<?php
require_once "qcl/datasource/controller.php";

/**
 * Service class containing test methods
 */
class class_qcl_jsonrpc_Tests extends qcl_datasource_controller
{
  
  function method_testRpc($params)
  {
    return "Hello World! " .  var_export($params,true);
  }
  
  function method_testRpcFromPHP()
  {
    require_once "qcl/http/JsonRpcRequest.php";
    $request = new qcl_http_JsonRpcRequest(&$this);
    $result = $request->call(
      "qcl.jsonrpc.Tests.testRpc",
       array ( 'foo'  => "bar", 'blub' => 1 ),
       "baz",
       true
    );
    $this->info( $result ) ;
  }


  
}

?>