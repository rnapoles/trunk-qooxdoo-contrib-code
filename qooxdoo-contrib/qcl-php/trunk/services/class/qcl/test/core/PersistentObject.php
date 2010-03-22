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
qcl_import( "qcl_core_PersistentObject" );

class PersistentTestObject
  extends qcl_core_PersistentObject
{
  public $counter = 0;

  public $object = null;
}

/**
 * Service class containing test methods
 */
class class_qcl_test_core_PersistentObject
  extends qcl_test_AbstractTestController
{

  /**
   * Tests the persistence behavior mechanism
   * @return object
   * @rpctest {
   *   "requestData" : {
   *     "method" : "PersistentTestObject"
   *   },
   *   "init" : function()
   *   {
   *     this.__persistenceCounter = 0;
   *     return true;
   *   },
   *   "checkResult" : function( result )
   *   {
   *     var count = result.data;
   *     if ( parseInt(count) == NaN )
   *     {
   *       return "Result is not a number";
   *     }
   *     if ( this.__persistenceCounter == 0 )
   *     {
   *       this.__persistenceCounter = count;
   *       return "You need to run the test again to see if it worked";
   *     }
   *     this.__persistenceCounter++;
   *     if ( count !== this.__persistenceCounter )
   *     {
   *       return "Expected: " + this.__persistenceCounter + ", got: " + count;
   *     }
   *     return true;
   *   }
   * }
   */
  public function method_testCounter()
  {
    $this->startLogging();

    $obj = new PersistentTestObject();
    $obj->counter++;
    $this->info("Count:" . $obj->counter );

    //$this->endLogging();
    return $obj->counter;
  }

  public function method_testPersistentObject()
  {
    $this->startLogging();

    $obj = new PersistentTestObject();
    $obj->setObject( new DateTime("now") );
    $obj->savePersistenceData(); // this is necessary because __destruct is not called when unsetting object.
    $obj = null;

    $obj = new PersistentTestObject();
    $this->assertEquals("DateTime", typeof( $obj->getObject(), true) , "Object member was not persisted.", __CLASS__, __LINE__);

    $obj->disposePersistenceData();
    $obj = null;

    $obj = new PersistentTestObject();
    $this->assertEquals("NULL", typeof( $obj->getObject() ) , "Persistence data was not disposed.", __CLASS__, __LINE__);

    return "OK";
  }


  private function startLogging()
  {
    qcl_log_Logger::getInstance()->setFilterEnabled(QCL_LOG_PERSISTENCE,true);
  }

  private function endLogging()
  {
    qcl_log_Logger::getInstance()->setFilterEnabled(QCL_LOG_PERSISTENCE,false);
  }
}
?>