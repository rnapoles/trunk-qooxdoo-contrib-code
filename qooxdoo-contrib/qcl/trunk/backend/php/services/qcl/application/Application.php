<?php

/**
 * The name of the file containing the initial configuration
 */
if ( ! defined("QCL_SERVICE_CONFIG_FILE") )
{
  define("QCL_SERVICE_CONFIG_FILE","service.ini.php");
}

/*
 * Dependencies 
 */
require_once "qcl/__init__.php";
require_once "qcl/core/StaticClass.php";
require_once "qcl/server/Server.php";

/**
 * Application class. All public methods of this class and of its subclasses
 * should be statically callable and work with an sigleton instance of this 
 * class internally. 
 * 
 */
class qcl_application_Application extends qcl_core_StaticClass
{
  /**
   * The server instance
   * @var AbstractServer
   */
  var $_server;
  
  /**
   * The intial configuration values, saved in the config.ini.php file
   * @var array
   */
  var $_ini = null;
  
  /**
   * Returns the version of the Bibliograph installation. Can be called
   * statically
   * @return string
   */
  function version()
  {
    return qcl_core_object::notImplemented();
  }

  /**
   * Return the application singleton instance. Extending classes
   * must define this method and call parent::getInstance(__CLASS__);
   * A subclass will share the singleton with this class, so that qcl
   * classes calling methods of this class will work with the subclasses
   * instance.
   * @param string class name
   * @return qcl_application_Application
   */
  function &getInstance( $class = __CLASS__ )
  {
    if ( ! is_object( $GLOBALS['QCL_APPLICATION_INSTANCE'] ) )
    {
      $GLOBALS['QCL_APPLICATION_INSTANCE'] =& new $class;
    }
    return $GLOBALS['QCL_APPLICATION_INSTANCE'];
  } 
  
  
  /**
   * Start a server that handles the request type (JSONRPC, POST, ...).
   * Can be called statically.
   * @param array $servicePaths An array of paths to the services used
   * by the server
   * @return void
   */
  function startServer( $servicePaths )
  {

    /*
     * if POST request, use post request server extension
     */
    if ( isset( $_REQUEST['service'] )  )
    {
      require_once "services/server/PostRpcServer.php";
      $serverObj =& PostRpcServer::getInstance();
    }
    
    /*
     * use qcl jsonrpc server extension
     */
    else
    {
      require "qcl/server/JsonRpc.php";
      $serverObj =& qcl_server_JsonRpc::getInstance();
    }
    
    /*
     * configure service paths
     */
    $serverObj->setServicePaths( $servicePaths );
    
    /*
     * save and start server
     */
    $server =& qcl_server_Server::getInstance();
    $server->serverObject =& $serverObj;
    $serverObj->start();
  }
  
 
  /**
   * Return the current server instance. Can be called statically.
   * @return AbstractServer
   */
  function &getServer()
  {
    $server =& qcl_server_Server::getInstance();
    return $server->serverObject;
  }

  /**
   * Returns the current controller instance, if any. Can be called statically
   * @return qcl_jsonrpc_controller
   */
  function &getController()
  {
    $server =& qcl_server_Server::getInstance();
    return $server->getController();
  }
  
  
  /**
   * Reads initial configuration. looks for service.ini.php file in the
   * directory of the topmost including script. Can be called statically.
   * @todo re-implement old behavior that services can ovverride individual 
   * settings by service directory
   **/
  function getIniConfig()
  {
    /*
     * get singleton instance
     */
    $_this =& qcl_application_Application::getInstance();
    
    /*
     * return config array if already parsed
     */
    if ( is_array( $_this->_ini ) )
    {
      return $_this->_ini;
    }
    
    /*
     * file containing intial configuration
     */
    $ini_path = dirname($_SERVER["PATH_TRANSLATED"]). "/" . QCL_SERVICE_CONFIG_FILE;
    if ( ! file_exists( $ini_path) )
    {
      $_this->warn("Configuration file '$ini_path' not found for " . get_class($_this) . " ." );
      return array();
    }
     
    $_this->_ini = parse_ini_file ( $ini_path, true );
    return $_this->_ini;
  }  
  
  /**
   * Returns a configuration value of the pattern "foo.bar.baz"
   * This retrieves the values set in the service.ini.php file.
   */
  function getIniValue($path)
  {

    /*
     * if called recursively
     */
    if ( is_array($path) )
    {
      $path= $path[1];
    }
    
    $_this =& qcl_application_Application::getInstance();
    $parts   = explode(".",$path);
    $value   = $_this->getIniConfig();
    
    /*
     * traverse array
     */
    while( is_array($value) and $part = array_shift($parts) )
    {
      $value = $value[$part];
    }
    
    /*
     * expand strings
     */
    if ( is_string( $value ) )
    {
      $value = trim( preg_replace_callback(
        '/\$\{([^}]+)\}/',
        array(&$_this,"getIniValue"), $value 
      ) );  
    }
    
    //$this->debug("Ini value '$path'= '$value'");
    
    return $value;
  }
  
  /**
   * Logs a message
   */
  function log( $msg, $filters)
  {
    if ( is_a($this,"qcl_application_Application") )
    {
      parent::log( $msg, $filters );
    }
    else
    {
      $_this = qcl_application_Application::getInstance();
      $_this->log( $msg, $filters );
    }
  }

  /**
   * Logs an info message 
   */
  function info( $msg )
  {
    if ( is_a($this,"qcl_application_Application") )
    {
      parent::info( $msg );
    }
    else
    {
      $_this = qcl_application_Application::getInstance();
      $_this->info( $msg, $filters );
    }
  }
  
  
  /**
   * Logs a warning 
   */
  function warn( $msg )
  {
    if ( is_a($this,"qcl_application_Application") )
    {
      parent::warn( $msg );
    }
    else
    {
      $_this = qcl_application_Application::getInstance();
      $_this->warn( $msg );
    }
  }
  
  /**
   * Raises an error, qcl-style
   */
  function raiseError( $msg )
  {
    if ( is_a($this,"qcl_application_Application") )
    {
      parent::raiseError( $msg );
    }
    else
    {
      $_this = qcl_application_Application::getInstance();
      $_this->raiseError( $msg );
    } 
  }
  
  //-------------------------------------------------------------
  // translation (modeled after qooxdoo syntax)
  //-------------------------------------------------------------
  
  /**
   * gets the locale controller and sets the default locale. default is
   * a qcl_locale_manager (see there). if you want to use a different
   * controller, override this method
   * @return qcl_locale_manager
   */
  function &getLocaleManager()
  {
    require_once "qcl/locale/manager.php";
    return qcl_locale_manager::getInstance();
  }
  
  /**
   * Translates a message. Can be called statically.
   * @return  String
   * @param   String  $msgId    Message id of the string to be translated 
   * @param   Mixed   $varargs  (optional) Variable number of arguments for the sprintf formatting either as an array
   * or as parameters
   */
  function tr( $msgId, $varargs=null )
  {
    if ( ! is_array($varargs) )
    {
      $varargs = func_get_args();
      array_shift($varargs);
    }
    $manager =& qcl_application_Application::getLocaleManager();
    return $manager->tr($msgId, $varargs);
  }  
  
  /**
   * Translate a plural message.Depending on the third argument the plursl or the singular form is chosen.
   * Can be called statically.
   *
   * @param string   $singularMessageId Message id of the singular form (may contain format strings)
   * @param string   $pluralMessageId   Message id of the plural form (may contain format strings)
   * @param int      $count             If greater than 1 the plural form otherwhise the singular form is returned.
   * @param Array    $varargs           (optional) Variable number of arguments for the sprintf formatting
   * @return string
   */
  function trn ( $singularMessageId, $pluralMessageId, $count, $varargs=array() )
  {
    $manager =& qcl_application_Application::getLocaleManager();
    return $manager->trn( $singularMessageId, $pluralMessageId, $count, $varargs );
  }
  
 
  
}
?>