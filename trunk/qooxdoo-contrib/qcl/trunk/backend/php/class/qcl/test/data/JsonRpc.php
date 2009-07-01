<?php
require_once "qcl/data/datasource/Controller.php";
require_once "qcl/registry/Session.php";

/**
 * Service class containing test methods
 */
class class_qcl_test_data_jsonrpc
  extends qcl_data_datasource_Controller
{

  function method_testRpc($params)
  {
    return "Hello World! " .  var_export($params,true);
  }

  function method_testRpcFromPHP()
  {
    require_once "qcl/http/JsonRpcRequest.php";
    $request = new qcl_http_JsonRpcRequest();
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