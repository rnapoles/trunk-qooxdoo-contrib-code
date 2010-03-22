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

qcl_import( "qcl_test_AbstractTestController" );
qcl_import( "qcl_data_model_db_PersistentModel" );

class PersistentClass
  extends qcl_data_model_db_PersistentModel
{
  protected $tableName = "test_persistent_db_class";

  private $properties = array(
    "name" => array(
      "check"     => "string",
      "sqltype"   => "varchar(32)",
      "init"      => "foo"
    ),
    "counter"  => array(
      "check"     => "integer",
      "sqltype"   => "int(11)",
      "init"      => 1,
      "nullable"  => false
    ),
    "flag"  => array(
      "check"     => "boolean",
      "sqltype"   => "int(1)",
      "init"      => true,
      "nullable"  => false
    ),
    "list"  => array(
      "check"     => "array",
      "serialize" => true,
      "sqltype"   => "blob",
      "init"      => array( 1,2,3)
    ),
    "object" => array(
      "check"     => "ArrayList",
      "sqltype"   => "blob",
      "serialize" => true
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
class class_qcl_test_data_model_db_PersistentModel
  extends qcl_test_AbstractTestController
{

  public function method_testModel()
  {
    $this->startLogging();

    $this->info("*** Initial data ... ");
    $model = new PersistentClass();
    $this->info( $model->data() );

    $this->info("*** Changing and saving data ... ");
    $model->setName("abcdef");
    $model->savePersistenceData();

    $this->info("*** Deleting and recreating model.. ");
    $model = null;
    $model = new TestModel();
    $this->info( $model->data() );
    $this->assertEquals("abcdef",$model->getName() );

    $this->info("*** Disposing data and recreating model.. ");
    $model->disposePersistenceData();
    $model = null;
    $model = new TestModel();
    $this->info( $model->data() );
    $this->assertEquals("foo",$model->getFoo() );

    $this->info("*** Disposing data and deleting model.. ");
    $model->disposePersistenceData();
    unset($model);

    return "OK";
  }

  private function startLogging()
  {
    qcl_log_Logger::getInstance()->setFilterEnabled( "persistence", true );
    qcl_log_Logger::getInstance()->setFilterEnabled( QCL_LOG_DB, true );
    qcl_log_Logger::getInstance()->setFilterEnabled( QCL_LOG_TABLE_MAINTENANCE, true );
  }

  private function endLogging()
  {
    qcl_log_Logger::getInstance()->setFilterEnabled("persistence",false);
    qcl_log_Logger::getInstance()->setFilterEnabled( QCL_LOG_DB, false );
    qcl_log_Logger::getInstance()->setFilterEnabled( QCL_LOG_TABLE_MAINTENANCE, false );
  }
}

?>