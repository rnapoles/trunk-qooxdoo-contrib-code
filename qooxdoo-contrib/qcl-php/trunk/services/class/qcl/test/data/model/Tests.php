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
require_once "qcl/data/model/Model.php";
require_once "qcl/data/model/db/ActiveRecord.php";
require_once "qcl/data/db/Timestamp.php";

class TestModel
  extends qcl_data_model_Model
{
  private $properties = array(
    "foo" => array(
      "check"     => "string",
      "apply"     => "_applyFoo",
      "init"      => "foo",
      "nullable"  => true,
      "event"     => "changeFoo"
    ),
    "bar"  => array(
      "check"     => "integer",
      "init"      => 1,
      "nullable"  => false,
      "apply"     => "_applyBar"
    ),
    "baz"  => array(
      "check"     => "boolean",
      "init"      => true,
      "nullable"  => false
    ),
    "created" => array(
      "check"    => "DateTime",
      "nullable" => true
    )
  );

  function __construct()
  {
    $this->addListener( "changeFoo", $this, "_onChangeFoo" );
    $this->addProperties( $this->properties );
    parent::__construct();
  }

  function init()
  {
    $this->set("created", new qcl_data_db_Timestamp("2010-03-17 14:20:53") );
  }

  private function valueToString( $value )
  {
    if ( is_scalar( $value ) )
    {
      return "'$value' (" . gettype( $value ) . ")";
    }
    else
    {
      return typeof( $value, true );
    }
  }

  public function _applyFoo($value, $old)
  {
    $this->info("foo was " . $this->valueToString( $old ) . ", is now " . $this->valueToString( $value )  );
  }

  public function _applyBar($value, $old)
  {
    $this->info("bar was " . $this->valueToString( $old ) . ", is now " . $this->valueToString( $value ) );
  }

  public function _onChangeFoo( qcl_event_type_DataEvent $e )
  {
    $this->info( "'changeFoo' event tells me that foo was changed to " . $this->valueToString( $e->getData() ) );
  }

}

class TestDbActiveRecord
  extends qcl_data_model_db_ActiveRecord
{

  private $properties = array(
    "foo" => array(
      "check"     => "string",
      "sqltype"   => "varchar(50)",
      "init"      => "foo",
      "nullable"  => true,
    ),
    "bar"  => array(
      "check"     => "integer",
      "sqltype"   => "int(11)",
      "init"      => 1,
      "nullable"  => false,
    ),
    "baz"  => array(
      "check"     => "boolean",
      "sqltype"   => "int(1)",
      "init"      => true,
      "nullable"  => false
    )
  );

  function __construct()
  {
    $this->addProperties( $this->properties );
    parent::__construct();
  }
}

/**
 * Service class containing test methods
 */
class class_qcl_test_data_model_Tests
  extends qcl_test_AbstractTestController
{
  public function method_testModel()
  {
    $model = new TestModel();

    $this->info( $model->data() );

    $this->assertEquals( "2010-03-17 14:20:53", (string) $model->getCreated(), null, __CLASS__, __LINE__ );
    $this->assertEquals("foo", $model->getFoo(), null, __CLASS__, __LINE__ );
    $this->assertEquals( "integer", gettype( $model->getBar() ), null, __CLASS__, __LINE__ );

    try
    {
      $model->setBar("boo"); // should raise an error
      throw new qcl_test_AssertionException("Assigning the wrong value type to a property should throw an error!");
    }
    catch( qcl_core_PropertyBehaviorException $e ){}

    // nullable
    $model->setFoo(null);
    $this->assertEquals(null, $model->getFoo(), null, __CLASS__, __LINE__ );

    try
    {
      $model->setBar(null); // should raise an error
      throw new qcl_test_AssertionException("Assigning null to a non-nullable property should throw an error!");
    }
    catch( qcl_core_PropertyBehaviorException $e ){}

    // @todo: test event behavior, doesn't work yet


    return "OK";
  }


  public function method_testDbActiveRecord()
  {
    $this->startLogging();
    $model = new TestDbActiveRecord();
    $model2 = new TestDbActiveRecord();

    //$this->debug( $model->data(), __CLASS__,__LINE__);






    $this->endLogging();
    return "OK";
  }

  function startLogging()
  {
    $this->getLogger()->setFilterEnabled(array(QCL_LOG_DB,QCL_LOG_TABLE_MAINTENANCE),true);
  }

  function endLogging()
  {
    $this->getLogger()->setFilterEnabled(array(QCL_LOG_DB,QCL_LOG_TABLE_MAINTENANCE),false);
  }
}

?>