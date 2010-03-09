<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2010 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

require_once "qcl/test/AbstractTestController.php";

/**
 * Service class containing test methods
 */
class class_qcl_test_core_Tests
  extends qcl_test_AbstractTestController
{

  public function method_testException()
  {
    throw new Exception("Testing exception handling");
  }

  // Rest is not migrated yet

  function method_test()
  {
    $this->info("Test!");
    $this->set("foo","bar");
    return $this->result();
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