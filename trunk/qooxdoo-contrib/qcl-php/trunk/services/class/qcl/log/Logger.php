<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
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

  /**
   * Filters for the logger
   * @var array
   */
  private $filters = array();


  /**
   * Constructor
   * @return unknown_type
   */
  function __construct()
  {
     $this->_registerInitialFilters();
  }

  /**
   * Returns singleton instance
   * @return qcl_log_Logger
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }

  /**
   * Internal method to setup initial filters
   * @return unknown_type
   */
  private function _registerInitialFilters()
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
  public function registerFilter( $filter, $description=null, $state=true )
  {
    if ( ! $filter )
    {
      trigger_error("No filter given.");
    }

    $this->filters[$filter] = array(
      'enabled'     => $state,
      'description' => $description
    );
  }


  /**
   * Checks if a filter is registered. Can be called statically.
   * @param $filter
   * @return unknown_type
   */
  public function isRegistered($filter)
  {
    return isset( $this->filters[$filter]);
  }

  /**
   * Enables a registered filter. Can be called statically.
   * @param $filter
   * @param $value
   * @return unknown_type
   */
  public function setFilterEnabled( $filter, $value )
  {
    if ( ! $this->filters[$filter] )
    {
      trigger_error("Filter $filter does not exist.");
    }
    if ( ! is_bool($value) )
    {
      trigger_error("Value parameter must be boolean");
    }
    $this->filters[$filter]['enabled'] = $value;
  }

  /**
   * Log message to file on server, if corresponding
   * filters are enabled. Can be called statically.
   * @param string $message
   * @param string|array $filters
   * @return message written to file
   */
  public function log( $msg, $filters="debug" )
  {

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
   * Write to log file. Can be called statically.
   * @param string $message
   */
  function writeLog( $message )
  {

    /*
     * if a valid log file exists or can be created, write message to it
     */
    if( QCL_LOG_FILE and
      ( is_writable( QCL_LOG_FILE ) or is_writable( dirname( QCL_LOG_FILE ) ) ) )
    {
      error_log( $message, 3, QCL_LOG_FILE );
    }

    /*
     * else, write to system log
     */
    else
    {
      error_log( "qcl: " . $message );
    }

  }

  /**
   * Logs a message with of level "info". Can be called statically.
   * @return void
   * @param mixed $msg
   */
  function info ( $msg )
  {
    $this->log ( $msg, "info" );
  }


  /**
   * Logs a message with of level "warn". Can be called statically.
   * @return void
   * @param $msg string
   */
  function warn ( $msg )
  {
    $this->log ( "*** WARNING *** " . $msg, "warn" );
  }

  /**
   * Logs a message with of level "error". Can be called statically.
   * @return void
   * @param $msg string
   */
  function error ( $msg )
  {
    $this->log ( "### ERROR ### " . $msg, "error" );
  }

}
?>