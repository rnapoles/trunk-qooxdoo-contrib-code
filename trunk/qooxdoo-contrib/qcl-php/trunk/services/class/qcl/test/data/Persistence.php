<?php

require_once "qcl/data/persistence/db/Object.php";
require_once "qcl/test/AbstractTestController.php";

class TestPersistence extends qcl_data_persistence_db_Object
{
  var $foo = null;
  var $end;
  var $counter;
}

class TestPersistenceBehavior extends qcl_core_Object
{
  public $isPersistent = true;
  public $counter = 0;
}

/**
 * Service class containing test methods
 */
class class_qcl_test_data_Persistence
  extends qcl_test_AbstractTestController
{

  function method_testPersistence()
  {
    $sessionId = $this->skipAuthentication ? null : qcl_access_Manager::getSessionId();
    $obj = new TestPersistence("TestPersistence", null, $sessionId );
    $this->info('Initialized $obj->foo = ' . $obj->foo);
    $obj->foo = rand(0,100);
    $this->info('Changing $obj->foo = ' . $obj->foo);
    return $this->result();
  }

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

  function method_testPersistenceBehavior()
  {
    qcl_log_Logger::getInstance()->setFilterEnabled("persistence",true);
    $obj = new TestPersistenceBehavior();
    $obj->counter++;
    $this->info("Count:" . $obj->counter );
    //$obj->save();
    return $obj->counter;
  }
}

?>