<?php
/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
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

class TestObject extends qcl_core_Object
{
  public $foo = "foo";

  public $bar;

  public $baz;

  private $boo = "boo";

}

class class_qcl_test_core_Object
  extends qcl_test_AbstractTestController
{

  public function method_testObjectId()
  {
    $this->info("Testing object id creation.");
    $time_start =  microtime_float();
    $obj = new qcl_core_Object;
    $id = $obj->objectId();
    $time_end = microtime_float();
    $time = $time_end - $time_start;
    $this->info( "It took $time seconds to generate object id $id" );
    return "OK";
  }

  public function method_testPropertyBehavior()
  {
    $obj = new TestObject();

    /*
     * testing initial values
     */
    $this->assertEquals( "foo", $obj->getFoo() );

    /*
     * trying to set a non-accessible property
     */
    try
    {
      $this->assertEquals( "boo", $obj->getBoo() );
    }
    catch( qcl_core_PropertyBehaviorException $e ){}

    /*
     * setting mulitple properties at the same time
     */
    $obj->set(array(
      'foo' => "foo2",
      'bar' => "bar",
      'baz' => "baz"
    ));
    $this->assertEquals( "bar", $obj->getBar() );

    /*
     * using setFoo acccess
     */
    $obj->setBaz("bla");
    $this->assertEquals( "bla", $obj->getBaz() );


    return "OK";
  }

}
?>