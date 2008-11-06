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

  /**
   * Maximum execution time for the synchronization before
   * returning control to the client
   */
  var $maxExecTime = 3;
  
  /**
   * Timestamp for maximum execution time
   * @var int
   * @access private
   */
  var $_endTime;
  
  /**
   * Flag to indicate that process has been interrupted
   * by a different process. Not yet implemented
   * 
   */
  var $interrupted;
  
  
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
   * @return mixed True if all tasks are completed without error,
   * false if an error occurred, and string if tasks are still running.
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
     * @todo Check for interrupt
     */
    
    
    /*
     * max execution time
     */
    $this->_endTime = time() + $this->maxExecTime;

    /*
     * execute task until maximum execution time is over
     * or task exits with a boolean value (true: all completed, false: error)
     */
    do
    {
      /*
       * execute task method if it exists
       */
      $methodName = "task_" . $this->taskNumber;
      //$this->info("Time :" . time() . ", End time $this->_endTime" );
      //$this->info("Running $methodName()");
      if ( $this->hasMethod($methodName) )
      {
        $result = $this->$methodName();  
      }
      else
      {
        $this->completed = true;  
        return true;
      }
    }
    while ( ! ( is_bool($result) or $this->taskTimeout() ) );
    
    /*
     * Return value is true if all tasks are completed without error,
     * false if an error occurred, and string if tasks are still running.
     * The string is sent as a status message to the server. 
     */
    if ( $result === true )
    {
      $this->completed = true;  
    }
    return $result;
  }
  
  /**
   * Returns true if the script has consumed more time than 
   * the maximum execution time
   *
   * @return bool
   */
  function taskTimeout()
  {
    return time() > $this->_endTime;
  }
  
  /**
   * Switch to next task on next request and return message to client
   * @param string $message
   * @return string
   */
  function endTask($message)
  {
    //$this->info("End task with '$message'");
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