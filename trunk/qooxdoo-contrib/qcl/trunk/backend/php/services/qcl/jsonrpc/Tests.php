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

  function method_testObjectId()
  {
    $time_start =  microtime_float();
    $obj = new qcl_object;
    $id = $obj->objectId();
    $time_end = microtime_float(); 
    $time = $time_end - $time_start;
    $this->info( "It took $time seconds to generate object id $id" );
  }
  
  function method_testEventSystem()
  {
    $obj1 = new qcl_jsonrpc_object;
    
    $obj1->addEventListener("foo",$this->objectId(),"onFoo" );
    $obj1->addEventListener("foo",$this->objectId(),"onFoo" );
    
    $obj1->dispatchEvent("foo","Foo event that should be displayed");
    $this->dispatchEvent("foo","Foo event that is not meant for this object");
    
    
  }
  
  function onFoo($data)
  {
    $this->info("Event 'foo' has been dispatched with data '$data'");
  }
  
  function method_testMessageSystem()
  {
    $obj1 = new qcl_jsonrpc_object;
    
    $this->addMessageSubscriber("bar","onBar" );
    $this->addMessageSubscriber("bar","onBar" );
    
    
    $obj1->dispatchMessage("bar","the bar is open");
  }
  
  function onBar($data)
  {
    $this->info("Messag 'bar' has been dispatched with data '$data'");
  } 
  
}

?>