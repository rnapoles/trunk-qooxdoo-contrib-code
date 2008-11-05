<?php

/*
 * dependencies
 */
require_once "qcl/db/PersistentObject.php";

/*
 * Class to synchronize between a bibliograph database and
 * a bookends database
 */
class qcl_db_PersistentTaskRunner extends qcl_db_PersistentObject
{
  
  /**
   * Counter for the different tasks
   * the synchronizer has to perform
   */
  var $taskNumber = 0;
  
  /**
   * Flag indicating that sync has completed
   * @var bool
   */
  var $completed;

  /*
   * max execution time for the synchronization before
   * returning control to the client
   */
  var $maxExecTime = 3;

  /**
   * Configures the persistent object
   */
  function configure()
  {
    $this->raiseError("Not implemented by class " . $this->getClassName() );
  }

  /**
   * Runs the current task according to the ::taskNumber counter by 
   * calling a "::task_X()" method, X being the current task number.
   * êf the counter points to a non-existing task method, the tasks are 
   * assumed to be finished and true is returned.
   * @return mixed
   */
  function run()
  {
    /*
     * switch to first task
     */
    if ( ! $this->taskNumber )
    {
      $this->taskNumber = 1;
    }
    
    /*
     * execute task method if it exists
     */
    $methodName = "task_" . $this->taskNumber;
    if ( $this->hasMethod($methodName) )
    {
      return $this->$methodName();  
    }
    
    /*
     * or return True to indicated that task has been completed
     */
    else
    {
      $this->completed = true;
      return true;
    }
  }
  
  /**
   * Switch to next task on next request and return message to client
   * @param string $message
   * @return string
   */
  function endTask($message)
  {
    $this->taskNumber++;
    return $message;
  }
  
  /**
   * Abort with error
   * @param string $message
   * @return boolean false
   */
  function abort ( $message )
  {
    $this->setError( $message );
    return false;
  }
  
  /**
   * Returns true if all tasks have completed.
   * @return bool
   */
  function isCompleted()
  {
    return $this->completed;
  }
}

?>