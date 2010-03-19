<?php

require_once "qcl/test/AbstractTestController.php";
require_once "qcl/data/persistence/db/Object.php";
require_once "qcl/data/model/db/Model.php";

class TestPersistenceBehavior extends qcl_core_Object
{
  public $isPersistent = true;
  public $counter = 0;
}

class TestPersistence extends qcl_data_model_db_Model
{
  public $isPersistent = true;
  public $foo = null;
  public $end;
  public $counter;
}

/**
 * Service class containing test methods
 */
class class_qcl_test_data_Persistence
  extends qcl_test_AbstractTestController
{

  /**
   * Tests the persistence behavior mechanism
   * @return object
   * @rpctest {
   *   "requestData" : {
   *     "method" : "testPersistenceBehavior"
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
  function method_testPersistenceBehavior()
  {
    $this->startLogging();

    $obj = new TestPersistenceBehavior();
    $obj->counter++;
    $this->info("Count:" . $obj->counter );

    //$this->endLogging();
    return $obj->counter;
  }



  /**
   * Tests the persistence of an object.
   * @return int
   * @rpctest {
   *   "requestData" : {
   *     "method" : "testPersistence"
   *   },
   *   "checkResult" : function( result )
   *   {
   *     var count = result.data;
   *     if( parseInt(count) !== NaN && count > 0 )
   *     {
   *       return true;
   *     }
   *     return "Expected: number > 0, got: " + count;
   *   }
   * }
   */
  function method_testPersistence()
  {
    $sessionId = $this->getSessionId();
    $obj = new TestPersistence("TestPersistence", null, $sessionId );
    $this->info('Initialized $obj->foo = ' . $obj->foo);
    $obj->foo = rand(1,100);
    $this->info('Changing $obj->foo = ' . $obj->foo);
    unset( $obj );
    $obj = new TestPersistence("TestPersistence", null, $sessionId );
    return $obj->foo;
  }
 //////////// not migrated ///////////

  function method_testPersistenceLocking()
  {
    $obj1 = new TestPersistence($this,"TestPersistence");
    $obj1->getWriteLock();
    $obj2 = new TestPersistence($this,"TestPersistence");
    $obj2->getWriteLock();
    return $this->result();
  }


 function method_testServerProcessStatus($params)
  {
    $id       = $params[0];
    $continue = $params[1];

    $test = new TestPersistence($this,$id);

    /*
     * continue or abort?
     */
    if ( $continue )
    {

      /*
       * initialize
       */
      if ( ! $test->end )
      {
        $test->end     = rand(5,10);
        $test->counter = 0;
        $this->info("Initializing object " . $test->instanceLabel() . " with " . $test->end . " runs." );
      }

      /*
       * action or end?
       */
      if ( $test->counter < $test->end )
      {
        /*
         * fake some action
         */
        sleep(1);

        /*
         * increment counter
         */
        $test->counter++;
        $this->info( $test->instanceLabel() . ": " . $html . " {$test->counter} / {$test->end} ... ");
        $percent = floor(($test->counter/$test->end) * 100);
        $html    = "Progress $percent %";

        /*
         * display message on client
         */
        $this->dispatchEvent("displayServerMessage",$html);

        /*
         * this resubmits the form when called from the debug
         * console
         */
        $this->dispatchMessage("qcl.commands.repeatLastRequest");

      }
      else
      {
        $this->info("Action completed. Deleting " . $test->instanceLabel() );
        $test->delete();
        $this->dispatchEvent("endProcess");
      }
    }
    else
    {
      $this->info("Action aborted. Deleting " . $test->instanceLabel() );
      $test->delete();
    }

    /*
     * return response data
     */
    return $this->result();

  }

  private function startLogging()
  {
    qcl_log_Logger::getInstance()->setFilterEnabled("persistence",true);
  }

  private function endLogging()
  {
    qcl_log_Logger::getInstance()->setFilterEnabled("persistence",false);
  }
}
?>