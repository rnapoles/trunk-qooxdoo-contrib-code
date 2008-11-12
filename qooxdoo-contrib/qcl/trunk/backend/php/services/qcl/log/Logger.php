<?php
/*
 * dependencies
 */
require_once "qcl/core/object.php";

/*
 * Default logger: logs to filesystem
 * @todo: use persistent object instead of session
 */
class qcl_log_Logger extends qcl_core_object
{
  
  var $filters;
  
  function __construct()
  {
    parent::__construct();
    
    $this->filters =& $_SESSION['qcl_log_Filters'];
  }
  
  /**
   * Returns singleton instance
   * @return qcl_log_Logger
   */
  function &getInstance()
  {
    return parent::getInstance( __CLASS__ );
  }
  
  /**
   * Overwrite setupLogger method to avoid indefinitive loop
   */
  function setupLogger() {}
    
  function registerFilter( $filter, $description )
  {
    if ( ! $this->filters[$filter] )
    {
      $this->filters[$filter] = array(
        'enabled'     => true,
        'description' => $description 
      );
    }
  }
 
  function setFilterEnabled( $filter, $value )
  {
    if ( !$this->filters[$filter] )
    {
      $this->raiseError("Filter $filter does not exist.");
    }
    if ( ! is_bool($value) )
    {
      $this->raiseError("Value parameter must be boolean");
    }
    $this->filters[$filter]['enabled'] = $value;
  }
  
  /**
   * Log message to file on server, if corresponding
   * filters are enabled
   * @param string $message
   * @param string|array $filters  
   * @return message written to file
   */
  function log( $msg, $filters )
  {
    
    if ( ! $filters )
    {
      $this->raiseError("You must provide at least one filter");
    }
    
    if ( is_array($msg) or is_object($msg) )
    {
      $msg = var_export ( $msg, true );
    }
    
    $found = false;
    foreach ( (array) $filters as $filter )
    {
       if ( $this->filters[$filter]  )
       {
         $found = true;
         if ( $this->filters[$filter]['enabled'] )
         {
           $message = date( "y-m-j H:i:s" );
           $message .= ": " . $msg . "\n";
           $this->writeLog( $message );
           break;  
         }
       }
    }
    
    return $found;    
  }

  /**
   * Write to log file
   * @param string $message
   */
  function writeLog( $message )
  {
    @error_log($message,3,QCL_LOG_FILE);      
  }
  
}
?>