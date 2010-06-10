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

/**
 * path to log file
 */
if ( ! defined( "QCL_LOG_PATH") )
{
  throw new JsonRpcException("You must define the QCL_LOG_PATH constant.");
}

/**
 * path to log file
 */
if ( ! defined( "QCL_LOG_FILE") )
{
  define( "QCL_LOG_FILE" ,  QCL_LOG_PATH . "qcl.log" );
}


/*
 * Default logger: logs to filesystem
 * @todo add other loggers
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
   * Register a filter.
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
   * Checks if a filter is registered.
   * @param $filter
   * @return unknown_type
   */
  public function isRegistered($filter)
  {
    return isset( $this->filters[$filter] );
  }

  /**
   * Enables a registered filter.
   * @param string|array $filter
   * @param $value
   * @return void
   */
  public function setFilterEnabled( $filter, $value )
  {
    /*
     * If array is given, set all the filters
     */
    if ( is_array( $filter) )
    {
      foreach( $filter as $f )
      {
        $this->setFilterEnabled( $f, $value );
      }
      return;
    }

    $this->checkFilter( $filter );

    if ( ! is_bool($value) )
    {
      throw new Exception("Value parameter must be boolean");
    }

    /*
     * enable/disable filter
     */
    $this->filters[$filter]['enabled'] = $value;
  }

  /**
   * Check if filter exists
   * @param string $filter
   * @return void
   */
  public function checkFilter( $filter )
  {
    if ( ! $this->isRegistered( $filter ) )
    {
      trigger_error("Filter '$filter' does not exist." );
    }
  }

  /**
   * Returns the state of the filter.
   * @param string $filter
   * @return boolean
   */
  public function isFilterEnabled( $filter )
  {
    $this->checkFilter( $filter );
    return $this->filters[$filter]['enabled'];
  }

  /**
   * Log message to file on server, if corresponding
   * filters are enabled.
   * @param string $message
   * @param string|array $filters
   * @return message written to file
   */
  public function log( $msg, $filters="debug" )
  {

    /*
     * check if a matching filter has been enabled
     */
    static $counter = 0;
    $found = false;
    foreach ( (array) $filters as $filter )
    {
       if ( $this->filters[$filter]  )
       {
         $found = true;
         if ( $this->filters[$filter]['enabled'] )
         {
           $message = date( "y-m-j H:i:s" );
           $message .=  "-" . $counter++;
           $message .= ": [$filter] $msg\n";
           $this->writeLog( $message );
           break;
         }
       }
    }

    return $found;
  }

  /**
   * Write to log file.
   * @param string $message
   */
  protected function writeLog( $message )
  {
    /*
     * if a valid log file exists or can be created, write message to it
     */
    if( QCL_LOG_FILE )
    {

      if ( is_writable( QCL_LOG_FILE )
        or is_writable( dirname( QCL_LOG_FILE ) ) )
      {
        error_log( $message, 3, QCL_LOG_FILE );
      }

      /*
       * else, throw an exception
       */
      else
      {
        throw new Exception( sprintf( "Log file '%s' is not writable.", QCL_LOG_FILE ) );
      }
    }
  }

  /**
   * Logs a message with of level "info".
   * @return void
   * @param mixed $msg
   */
  function info( $msg )
  {
    $this->log( $msg, "info" );
  }

  /**
   * Logs a message with of level "warn".
   * @return void
   * @param $msg string
   */
  function warn( $msg )
  {
    $this->log( "*** WARNING *** " . $msg, "warn" );
  }

  /**
   * Logs a message with of level "error".
   * @return void
   * @param $msg string
   */
  function error( $msg, $includeBacktrace=false )
  {
    if ( $includeBacktrace )
    {
      $msg .= "\n" . debug_get_backtrace();
    }
    $this->log( "### ERROR ### " . $msg, "error" );
  }

}
?>