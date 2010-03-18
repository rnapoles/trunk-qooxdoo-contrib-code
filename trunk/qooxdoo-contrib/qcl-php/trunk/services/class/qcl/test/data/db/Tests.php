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
require_once "qcl/data/db/adapter/PdoMysql.php";
require_once "qcl/data/db/Table.php";

/**
 * Service class containing test methods
 */
class class_qcl_test_data_db_Tests
  extends qcl_test_AbstractTestController
{
  /**
   * Returns the dsn, user and password of the database used by the application
   * @return array( dsn, user, password )
   */
  protected function getDsnUserPassword()
  {
    list( $user,$pass,$dbname, $dbtype, $host, $port )  =
      $this->getApplication()->getIniValues(array(
        "database.username","database.userpassw","database.admindb","database.type",
        "database.host","database.port"
      ) );
    return array( "$dbtype:host=$host;port=$port;dbname=$dbname", $user, $pass) ;
  }

  public function method_testPdoFetch( $table = "access_config" )
  {

    list($dsn, $user, $pass) = $this->getDsnUserPassword();

    try
    {
      $options = array(
        PDO::ATTR_PERSISTENT         => true,
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''
      );

      $dbh = new PDO( $dsn, $user, $pass, $options );

      //$table = $dbh->quote( $table );
      $stm = $dbh->prepare( "SELECT * from $table" );
      $stm->execute();

      $this->info( "Found " . $stm->rowCount() . "rows" );

      $result = array();
      while ( $row = $stm->fetch( PDO::FETCH_ASSOC ) )
      {
        $result[] = $row;
      }

      $dbh = null;
    }
    catch (PDOException $e)
    {
      $this->raiseError( $e->getMessage() );
    }
    return $result;
  }

  function startLogging()
  {
    $this->getLogger()->setFilterEnabled(array(QCL_LOG_DB,QCL_LOG_TABLE_MAINTENANCE),true);
  }

  function endLogging()
  {
    $this->getLogger()->setFilterEnabled(array(QCL_LOG_DB,QCL_LOG_TABLE_MAINTENANCE),false);
  }

  public function method_testCreateTable()
  {
    $this->startLogging();

    list($dsn, $user, $pass) = $this->getDsnUserPassword();
    $adapter = new qcl_data_db_adapter_PdoMysql( $dsn, $user, $pass );
    $table   = new qcl_data_db_Table( "qcltest", $adapter );
    if ( $result = $table->exists() )
    {
      $this->info("Table exists, deleting...");
      $table->delete();
    }
    $table->create();
    $table->addColumn( "col1", "VARCHAR(32) NULL" );
    $table->addColumn( "col2", "INT(11) NOT NULL" );
    $table->addColumn( "col3", "INT(1) NULL" );

    $table->insertRows( array(
      array( "col1" => "row1", "col2" => 1, "col3" => true ),
      array( "col1" => "row2", "col2" => 2, "col3" => false ),
      array( "col1" => "row3", "col2" => 3, "col3" => NULL )
    ) );

    /*
     * test renaming
     */
    $col3def = $table->getColumnDefinition( "col3" );
    $this->assertEquals( "int(1) NULL", $col3def );
    $table->renameColumn( "col3", "colDrei", $col3def );

    /*
     * test modifying
     */
    $col1def = $table->getColumnDefinition( "col1" );
    $table->modifyColumn( "col1", "varchar(100) NOT NULL");
    $col1def = $table->getColumnDefinition( "col1" );
    $this->assertEquals( "varchar(100) NOT NULL", $col1def, "'$col1def'" );

    /*
     * delete table
     */
    $table->delete();

    $this->endLogging();

    return "OK";
  }



}

?>