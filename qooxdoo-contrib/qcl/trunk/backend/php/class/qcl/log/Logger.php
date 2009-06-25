<?php
/*
 * dependencies
 */

/*
 * show class name in log message
 */
if ( ! defined("QCL_LOG_SHOW_CLASS_NAME") )
{
  define ("QCL_LOG_SHOW_CLASS_NAME",false);
}

/*
 * Default logger: logs to filesystem
 * @todo use persistent object instead of session
 */
class qcl_log_Logger
{

  var $filters = null;

  var $classFilters = array();

  /**
   * Constructor
   * @return unknown_type
   */
  function __construct()
  {
    /*
     * we are not calling the parent constructor to avoid
     * idefinite recursion, so we have to duplicate code
     * from the parent constructor here
     */
    $this->_class = get_class($this);
  }

  /**
   * Returns singleton instance
   * @return qcl_log_Logger
   */
  function &getInstance()
  {
    $clazz = __CLASS__;
    if ( ! isset( $GLOBALS[ $clazz ] ) )
    {
      $GLOBALS[ $clazz ] =& new $clazz;
      $GLOBALS[ $clazz ]->_registerInitialFilters();
    }
    return $GLOBALS[ $clazz ];
  }

  /**
   * Internal method to setup initial filters
   * @return unknown_type
   */
  function _registerInitialFilters()
  {
    $this->registerFilter("debug",    "Verbose debugging, all messages",false);
    $this->registerFilter("info",     "Important messages", true);
    $this->registerFilter("warn",     "Warnings", true);
    $this->registerFilter("error",    "Non-fatal errors", true);
    $this->registerFilter("framework","Framework-related debugging", false);
  }


  /**
   * Register a filter. Can be called statically.
   * @param string $filter Filter name
   * @param string $description Short description of what messages the filter is for.
   * @param bool[optional,default true] $state True if enabled, false if disabled
   */
  function registerFilter( $filter, $description=null, $state=true )
  {
    $_this =& qcl_log_Logger::getInstance();

    if ( ! $filter )
    {
      trigger_error("No filter given.");
    }

    $_this->filters[$filter] = array(
      'enabled'     => $state,
      'description' => $description
    );
  }

  /**
   * Logs a message only in a given class. Can be called statically.
   * @param $classes
   * @return unknown_type
   */
  function filterByClass($classes)
  {
    $_this =& qcl_log_Logger::getInstance();
    $_this->classFilters = $classes;
  }

  /**
   * Checks if a filter is registered. Can be called statically.
   * @param $filter
   * @return unknown_type
   */
  function isRegistered($filter)
  {
    $_this =& qcl_log_Logger::getInstance();
    return isset( $_this->filters[$filter]);
  }

  /**
   * Enables a registered filter. Can be called statically.
   * @param $filter
   * @param $value
   * @return unknown_type
   */
  function setFilterEnabled( $filter, $value )
  {
    $_this =& qcl_log_Logger::getInstance();

    if ( ! $_this->filters[$filter] )
    {
      trigger_error("Filter $filter does not exist.");
    }
    if ( ! is_bool($value) )
    {
      trigger_error("Value parameter must be boolean");
    }
    $_this->filters[$filter]['enabled'] = $value;
  }

  /**
   * Log message to file on server, if corresponding
   * filters are enabled. Can be called statically.
   * @param string $message
   * @param string|array $filters
   * @return message written to file
   */
  function log( $msg, $filters="debug" )
  {
    $_this =& qcl_log_Logger::getInstance();

    /**
     * filter by classes
     */
    if ( count( $_this->classFilters ) )
    {
      if ( ! in_array($_this->className(), $_this->classFilters) )
      {
        return;
      }
    }

    /*
     * convert non-scalar data to string
     */
    if ( is_array($msg) or is_object($msg) )
    {
      $msg = var_export ( $msg, true );
    }

    /*
     * check if a matching filter has been enabled
     */
    $found = false;
    foreach ( (array) $filters as $filter )
    {
       if ( $_this->filters[$filter]  )
       {
         $found = true;
         if ( $_this->filters[$filter]['enabled'] )
         {
           $message = date( "y-m-j H:i:s" );
           $message .= ": " . $msg . "\n";
           $_this->writeLog( $message );
           break;
         }
       }
    }

    return $found;
  }

  /**
   * Write to log file. Can be called statically.
   * @param string $message
   */
  function writeLog( $message )
  {

    /*
     * if a valid log file exists, write message to it
     */
    if( QCL_LOG_FILE and file_exists(QCL_LOG_FILE) and is_writable( QCL_LOG_FILE ) )
    {
      error_log( $message, 3, QCL_LOG_FILE );
    }

    /*
     * else, write to system log
     */
    else
    {
      error_log( $message );
    }
  }

  /**
   * Logs a message with of level "info". Can be called statically.
   * @return void
   * @param mixed $msg
   */
  function info ( $msg )
  {
    $_this =& qcl_log_Logger::getInstance();
    $_this->log ( $msg, "info" );
  }


  /**
   * Logs a message with of level "warn". Can be called statically.
   * @return void
   * @param $msg string
   */
  function warn ( $msg )
  {
    $_this =& qcl_log_Logger::getInstance();
    $_this->log ( "*** WARNING *** " . $msg, "warn" );
  }

  /**
   * Logs a message with of level "error". Can be called statically.
   * @return void
   * @param $msg string
   */
  function error ( $msg )
  {
    $_this =& qcl_log_Logger::getInstance();
    $_this->log ( "### ERROR ### " . $msg, "error" );
  }

}
?>