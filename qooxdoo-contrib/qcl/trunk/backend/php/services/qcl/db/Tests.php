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
    $obj =& new TestPersistence(&$this);
    $this->info('Initialized $obj->foo = ' . $obj->foo);
    $obj->foo = rand(0,100);
    $this->info('Changing $obj->foo = ' . $obj->foo);
  }

  function method_testPersistenceLocking()
  {
    $obj1 =& new TestPersistence(&$this);
    $obj2 =& new TestPersistence(&$this);
    $obj1->getWriteLock();
    //$obj2->getWriteLock(); 
  }  

  
}

?>