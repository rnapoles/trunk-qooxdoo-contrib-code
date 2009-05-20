<?php
require_once "qcl/datasource/controller.php";
require_once "qcl/persistence/db/Object.php";
require_once "qcl/registry/session.php";

class TestPersistence extends qcl_persistence_db_Object 
{
  var $foo = null;
  var $end;
  var $counter;
}

/**
 * Service class containing test methods
 */
class class_qcl_persistence_Tests extends qcl_datasource_controller
{
  
  /**
   * constructor. we need to go through access control, otherwise we wont have
   * a session id. 
   */
  function __construct( )
  {
    parent::__construct();
    $this->controlAccess();
  }  
  
  
  function method_testPersistence()
  { ;
    $obj =& new TestPersistence(&$this, "TestPersistence", null, $this->getSessionId() );
    $this->info('Initialized $obj->foo = ' . $obj->foo);
    $obj->foo = rand(0,100);
    $this->info('Changing $obj->foo = ' . $obj->foo);
    return $this->response();
  }

  function method_testPersistenceLocking()
  {
    $obj1 =& new TestPersistence(&$this,"TestPersistence");
    $obj1->getWriteLock();
    $obj2 =& new TestPersistence(&$this,"TestPersistence");
    $obj2->getWriteLock(); 
    return $this->response();
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
    return $this->response();
    
  }
}

?>