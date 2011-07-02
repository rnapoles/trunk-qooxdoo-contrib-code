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

define( "QCL_LOG_DEBUG",  "debug" );
define( "QCL_LOG_INFO",  	"info" );
define( "QCL_LOG_WARN",  	"warn" );
define( "QCL_LOG_ERROR", 	"error" );

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
    $this->registerFilter(QCL_LOG_DEBUG,    "Verbose debugging, all messages",false);
    $this->registerFilter(QCL_LOG_INFO,     "Important messages", true);
    $this->registerFilter(QCL_LOG_WARN,     "Warnings", true);
    $this->registerFilter(QCL_LOG_ERROR,    "Fatal errors", true);
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
  public function log( $msg, $filters= QCL_LOG_DEBUG )
  {
    
    /*
     * check if a matching filter has been enabled
     */
    $found = false;
    foreach ( (array) $filters as $filter )
    {
       /*
        * only the core filters will be used when debugging is off
        */
       switch($filter)
       {
         case QCL_LOG_INFO:
         case QCL_LOG_WARN:
         case QCL_LOG_ERROR:
           break;
         default:
           if( ! QCL_DEBUG )
           {
             return;
           }
       }

       /*
        * check if filter is enabled
        */
       if ( $this->filters[$filter]  )
       {
         $found = true;
         if ( $this->filters[$filter]['enabled'] )
         {
           $this->writeLog( $this->formatMessage($msg, $filter ) );
           break;
         }
       }
    }

    return $found;
  }
  
  /**
   * Formats log message, adding date/time 
   */
  protected function formatMessage( $msg, $filter = "" )
  {
    static $counter = 0;
    $message = date( "y-m-j H:i:s" );
    $message .=  "-" . $counter++;
    $message .=  ($filter ? ": [$filter] " : ": " );
    $message .= "$msg\n";
    return $message;
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
        /*
         * create log file if it doesn't exist
         */
        if( ! file_exists( QCL_LOG_FILE ) )
        {
          touch( QCL_LOG_FILE );
        }

        /*
         * write message to file
         */
        error_log( $message, 3, QCL_LOG_FILE );

        /*
         * truncated logfile if maximum size has been reached
         */
        if( defined( "QCL_LOG_MAX_FILESIZE" ) and QCL_LOG_MAX_FILESIZE > 0 )
        {
          if( filesize( QCL_LOG_FILE ) > QCL_LOG_MAX_FILESIZE )
          {
            if ( @unlink( QCL_LOG_FILE ) )
            {
              touch( QCL_LOG_FILE );
            }
            else
            {
              throw new JsonRpcError("Cannot delete logfile.");
            }
          }
        }
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
    $this->log( $msg, QCL_LOG_INFO );
  }

  /**
   * Logs a message with of level "warn".
   * @return void
   * @param $msg string
   */
  function warn( $msg )
  {
    $this->log( "*** WARNING *** " . $msg, QCL_LOG_WARN );
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
    $this->log( "### ERROR ### " . $msg, QCL_LOG_ERROR );
  }
  
	/**
   * Logs a message with of level "debug". a non-scalar parameter will
   * be turned into a string dump 
   * @return void
   * @param mixed $msg 
   * @todo get file and line 
   */
  function debug( $msg, $includeBacktrace=false )
  {
    /*
     * don't do this when there is no debugging 
     */
    if ( ! QCL_LOG_DEBUG ) return; 
    
    /*
     * stringify boolean and non-scalar values 
     */
    if ( is_bool( $msg ) )
    {
      $msg = boolString( $msg );
    }
    elseif ( ! is_scalar($msg) )
    {
      $msg = typeof( $var, true ) . ": " . print_r( $msg, true ); 
    }
    
    /*
     * include a backtrace?
     */
    if ( $includeBacktrace )
    {
      $msg .= "\n" . debug_get_backtrace();
    }
    
    /*
     * log message
     */
    $this->writeLog( $this->formatMessage( ">>> DEBUG <<< " . $msg ) );
  }
  
  /**
   * Creates a divider for more clarity in log files
   */
  static function createDivider()
  {
    return str_repeat("-", 80 );
  }
  
  /**
   * Creates a divider with a timestamp
   */
  static function createDividerWithTimestamp()
  {
    return str_repeat("-", 30 ) . " " . date("d.m.Y H:i:s", time() ) . " " . str_repeat("-", 29 );
  }
  
  function divider($withTimestamp=false)
  {
    /*
     * don't do this when there is no debugging 
     */
    if ( ! QCL_LOG_DEBUG ) return; 
    
    /*
     * output with or without timestamp
     */
    if ( $withTimestamp )
    {
      $this->writeLog( self::createDividerWithTimestamp() );
    }
    else
    {
      $this->writeLog( self::createDivider() );
    }
  }
}
?>