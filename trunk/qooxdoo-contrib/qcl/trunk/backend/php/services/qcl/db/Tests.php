<?php
require_once "qcl/datasource/controller.php";
require_once "qcl/db/PersistentObject.php";

class TestPersistence extends qcl_db_PersistentObject 
{
  var $foo = null;
  var $end;
  var $counter;
}

/**
 * Service class containing test methods
 */
class class_qcl_db_Tests extends qcl_datasource_controller
{
  
  function method_testPersistence()
  { 
    $obj =& new TestPersistence(&$this,"TestPersistence");
    $this->info('Initialized $obj->foo = ' . $obj->foo);
    $obj->foo = rand(0,100);
    $this->info('Changing $obj->foo = ' . $obj->foo);
  }

  function method_testPersistenceLocking()
  {
    $obj1 =& new TestPersistence(&$this,"TestPersistence");
    $obj2 =& new TestPersistence(&$this,"TestPersistence");
    $obj1->getWriteLock();
    //$obj2->getWriteLock(); 
  }  

  function method_testServerProcessStatus($params)
  {
    $id       = $params[0];
    $continue = $params[1];
    
    $test =& new TestPersistence(&$this,$id); 
    
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
        $this->info("Initializing object: " . $test->end); 
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
        $this->info($html . " {$test->counter} / {$test->end} ... ");
        $percent = floor(($test->counter/$test->end) * 100); 
        $html    = "Progress $percent %";
        $this->dispatchEvent("displayServerMessage",$html);
   
      }
      else
      {
        $this->info("Action completed. Deleting object...");
        $test->delete(); 
        $this->dispatchEvent("endProcess");
      }
    }
    else
    {
      $this->info("Action aborted. Deleting object...");
      $test->delete();    
    }
    
    /*
     * return response data
     */
    return $this->getResponseData();
    
  }
}

?>