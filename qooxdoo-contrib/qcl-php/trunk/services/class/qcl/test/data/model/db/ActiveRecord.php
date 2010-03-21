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

qcl_import( "qcl_test_AbstractTestController");
qcl_import( "qcl_data_model_db_ActiveRecord" );
qcl_import( "qcl_data_db_Timestamp" );

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
class class_qcl_test_data_model_db_ActiveRecord
  extends qcl_test_AbstractTestController
{

  public function method_testActiveRecord()
  {
    $this->startLogging();
    $model = new TestDbActiveRecord();
    $model->deleteAll();
    $bool = false;
    for( $i=0; $i<100; $i++ )
    {
      $model->create();
      $model->setFoo( "Record $i" );
      $model->setBar( $i );
      $model->setBaz( $bool = ! $bool );
      $model->save();
    }
    $this->endLogging();
    return "OK";
  }

  function startLogging()
  {
    $this->getLogger()->setFilterEnabled( QCL_LOG_DB, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_TABLE_MAINTENANCE, true );
  }

  function endLogging()
  {
    $this->getLogger()->setFilterEnabled(array(QCL_LOG_DB,QCL_LOG_TABLE_MAINTENANCE),false);
  }
}

?>