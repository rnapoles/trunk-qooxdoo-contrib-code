<?php
require_once "qcl/jsonrpc/controller.php";

/**
 * Service class containing test methods
 */
class class_qcl_core_Tests extends qcl_data_Controller
{
  
  function method_test()
  {
    $this->info("Test!");
    $this->set("foo","bar");
    return $this->response();
  }
  
  function method_testMixin()
  {
    $this->mixin("qcl_core_TestMixin");
    $this->info("qcl_core_TestMixin is mixed in: " . boolToStr( $this->hasMixin("qcl_core_TestMixin") ) );
    $this->info("Method 'mixedInMethod' exists: " . boolToStr($this->hasMixinMethod("mixedInMethod") ) );  
    $this->info("Calling method 'mixedInMethod': " . $this->mixedInMethod( "Success!" ) );    
  }
  
  function method_testOverloading()
  {
    $this->setFoo("foo");
    $this->info("this.foo = " . $this->getFoo() );
    $this->info("findByFoo('foo') => " . boolToStr( $this->findByFoo("foo") ) );
    $this->info("findByFoo('bar') => " . boolToStr( $this->findByFoo("bar") ) );
    return "";
  }
  
  function getProperty($property)
  {
    $value = $this->$property;
    $this->info("   getProperty('$property') = '$value'");
    return $value;
  }
  
  function setProperty($property,$value)
  {
     $this->info("   setProperty('$property','$value')");
     $this->$property = $value;
     //$this->info($this);
  }
  
  function findBy($property,$value)
  {
     $this->info("   findBy('$property','$value')");
     if ( $this->$property == $value ) return true;
     return false;
  }
  
}


class qcl_core_TestMixin
{

  function mixedInMethod( $arg )
  {
    $this->info("Mixed in class 'qcl_core_TestMixin' called with method 'mixedInMethod'!");  
    return $arg;
  }
}

?>