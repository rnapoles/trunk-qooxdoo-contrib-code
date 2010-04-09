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
      "sqltype"   => "varchar(52)"
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
      "column"    => "town"
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
      "nullable"  => false,
      "column"    => "isSubscriber"
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

  public function method_testModel()
  {
    //$this->startLogging();

    $member = new Member();
    $member->deleteAll();

    $randomdata = file( qcl_realpath("qcl/test/data/model/data/randomdata.csv") );
    $subscriber = false;
    foreach( $randomdata as $line )
    {
      if ( ! trim( $line ) ) continue;
      $columns = explode( ";", $line );
      $member->create();
      $member->set( array(
        "name"        => trim($columns[0]),
        "email"       => trim($columns[1]),
        "address"     => trim($columns[2]),
        "city"        => trim($columns[3]),
        "country"     => trim($columns[4]),
        "newsletter"  => $subscriber = ! $subscriber
      ));
      $member->save();
    }

    $member = new Member();
    $query = $member->loadWhere( array(
      "name"        => array( "LIKE" , "B%"),
      "newsletter"  => true
    ) );
    $count = $query->getRowCount();

    $this->info( "We have $count newsletter subscribers that start with 'B':");
    $this->assertEquals(7,$count,null,__CLASS__,__METHOD__);

    /*
     * querying records
     */
    $subscribers = array();
    while( $member->loadNext() )
    {
      $subscribers[] = $member->getName() . " <" . $member->getEmail() . ">";
    }
    $subscribers = implode(", ", $subscribers );
    $this->info($subscribers);

    $this->assertEquals("Buck, Gabriel R. <molestie.in@eu.com>, Bolton, Graham D. <Proin@cursus.org>, Baxter, Samson V. <lobortis.mauris@odioNaminterdum.edu>, Bender, Lisandra C. <Suspendisse@Donec.edu>, Bullock, Thaddeus I. <augue.ut.lacus@eget.com>, Benson, Erin M. <at.pede.Cras@acipsum.edu>",$subscribers,null,__CLASS__,__METHOD__);

    /*
     * updating across records without changing the active record
     */
    $this->info("Making all members from China subscriber");
    $newSubscribers = $member->updateWhere(
      array( "newsletter" => true ),
      array( "country"    => "China" )
    );
    $this->info("We have $newSubscribers new subscribers from China now.");

    /*
     * deleting records: we don't like ".com" addresses from germany
     */
    $count = $member->deleteWhere(array(
      "email" => array( "LIKE", "%.com" ),
      "country" => "Germany"
    ));
    $this->info("Deleted $count .com - address from Germany.");

    /*
     * cleanup
     */
    $member->destroy();

    return "OK";
  }


  function startLogging()
  {
    $this->getLogger()->setFilterEnabled( QCL_LOG_DB, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_TABLES, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_PROPERTIES, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL_RELATIONS, true );
  }

  function endLogging()
  {
    $this->getLogger()->setFilterEnabled( QCL_LOG_DB, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_TABLES, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_PROPERTIES, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL_RELATIONS, false );
  }
}

?>