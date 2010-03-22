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

class Member
  extends qcl_data_model_db_ActiveRecord
{

  protected $tableName = "test_members";

  private $properties = array(
    "name" => array(
      "check"     => "string",
      "sqltype"   => "varchar(52)",
      "nullable"  => false,
    ),
    "email"  => array(
      "check"     => "string",
      "sqltype"   => "varchar(100)",
      "nullable"  => true,
    ),
    "city"  => array(
      "check"     => "string",
      "sqltype"   => "varchar(50)",
      "nullable"  => true,
    ),
    "country"  => array(
      "check"     => "string",
      "sqltype"   => "varchar(50)",
      "nullable"  => true,
    ),
    "newsletter"  => array(
      "check"     => "boolean",
      "sqltype"   => "int(1)",
      "init"      => false,
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

  public function method_testCreateRecords()
  {
    $this->startLogging();

    $model = new Member();
    $model->deleteAll();

    $randomdata = file( qcl_realpath("qcl/test/data/model/data/randomdata.csv") );
    foreach( $randomdata as $line )
    {
      if ( ! trim( $line ) ) continue;
      $columns = explode( ";", $line );
      $model->create();
      $model->set( array(
        "name"        => trim($columns[0]),
        "email"       => trim($columns[1]),
        "address"     => trim($columns[2]),
        "city"        => trim($columns[3]),
        "country"     => trim($columns[4]),
        "newsletter"  => (bool) rand(0,1)
      ));
      $model->save();
    }
    $this->endLogging();
    return "OK";
  }

  public function method_testQueries()
  {
    $this->getLogger()->setFilterEnabled( QCL_LOG_DB, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_TABLE_MAINTENANCE, true );
    $model = new Member();
    $count = $model->loadWhere( array(
      "name"        => array( "LIKE" , "B%"),
      "newsletter"  => true
    ) );
    $this->info( "We have $count newsletter subscribers that start with 'B':");
    $subscribers = array();
    while( $model->nextRecord() )
    {
      $subscribers[] = $model->getName() . " <" . $model->getEmail() . ">";
    }
    $this->info( implode(", ", $subscribers ) );
  }


  function startLogging()
  {
    //$this->getLogger()->setFilterEnabled( QCL_LOG_DB, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_TABLE_MAINTENANCE, true );
  }

  function endLogging()
  {
    $this->getLogger()->setFilterEnabled(array(QCL_LOG_DB,QCL_LOG_TABLE_MAINTENANCE),false);
  }
}

?>